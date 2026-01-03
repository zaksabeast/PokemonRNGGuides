use arrayvec::ArrayVec;
use itertools::Itertools;

use crate::{
    GenderRatio, Ivs, Nature, PkmFilter,
    gen3::{
        FASTEST_DIVIDENDS_MOD_24, FASTEST_DIVIDENDS_MOD_24_RANGE, Gen3Method, Gen3PidSpeedFilter,
        Gen3PkmFilter, SLOWEST_DIVIDENDS_MOD_24, SLOWEST_DIVIDENDS_MOD_24_RANGE,
        calculate_pid_speed, get_iv_filter_restrictiveness, get_iv1_filter_restrictiveness,
        get_iv2_filter_restrictiveness, get_pid_filter_restrictiveness, passes_pid_filter,
        reverse_find_pid_low_paths_from_pids,
        wild::{
            lcrng_distance,
            searcher::{
                IvFromStartArc, IvPath, extend_pid_low_path_to_pid_paths,
                find_iv_paths_from_iv1_seed, find_iv_paths_from_iv2_seed,
                find_pid_low_paths_from_pid_low_seed, reverse_find_iv_paths_from_min_max_ivs,
            },
        },
    },
    rng::{Rng, StateIterator, lcrng::Pokerng},
};

/**
 * PidPath represents the RNG call sequence for PID + IV generation, which represent the full Pokémon (minus its species and level).
 * Generating PidPaths that respect the filter is the most important and time-consuming step of the reverse generator.
 * */
#[derive(Default, PartialEq, Debug, Clone, Copy)]
pub struct PidPath {
    /** seed right before pid_low */
    pub seed: u32,
    pub pid_to_iv_arc: PidToIvArc,
    pub iv_arc: IvFromStartArc,
}

pub struct FindPidPathsOptions {
    pub filter: PkmFilter,
    pub gen3_filter: Gen3PkmFilter,
    pub encounter_gender_ratio: GenderRatio,
    pub methods: Vec<Gen3Method>,
    // explicit bool to improve performance
    pub consider_all_methods_124: bool,
    pub tsv: u16,
    pub initial_seed: u32,
    pub max_result_count: usize,
    pub initial_advances: usize,
    pub max_advances: usize,
}

impl Default for FindPidPathsOptions {
    fn default() -> Self {
        FindPidPathsOptions {
            filter: Default::default(),
            gen3_filter: Default::default(),
            encounter_gender_ratio: Default::default(),
            methods: vec![
                Gen3Method::Wild1,
                Gen3Method::Wild2,
                Gen3Method::Wild3,
                Gen3Method::Wild4,
                Gen3Method::Wild5,
            ],
            consider_all_methods_124: true,
            tsv: Default::default(),
            initial_seed: Default::default(),
            max_result_count: 1,
            initial_advances: Default::default(),
            max_advances: Default::default(),
        }
    }
}

#[derive(Default, Debug, PartialEq, Clone, Copy)]
pub enum PidToIvArc {
    #[default]
    WithVBlankBetweenPid,
    WithVBlankBetweenPidIv,
    WithoutVBlank,
}

impl PidPath {
    pub fn new(seed: u32, pid_to_iv_arc: PidToIvArc, iv_arc: IvFromStartArc) -> Self {
        Self {
            seed,
            pid_to_iv_arc,
            iv_arc,
        }
    }

    pub fn from_method(seed: u32, method: Gen3Method) -> Self {
        Self {
            seed,
            pid_to_iv_arc: match method {
                Gen3Method::Wild3 => PidToIvArc::WithVBlankBetweenPid,
                Gen3Method::Wild2 => PidToIvArc::WithVBlankBetweenPidIv,
                _ => PidToIvArc::WithoutVBlank,
            },
            iv_arc: match method {
                Gen3Method::Wild4 => IvFromStartArc::WithVBlank,
                _ => IvFromStartArc::WithoutVBlank,
            },
        }
    }
    pub fn calc_method(iv_arc: IvFromStartArc, pid_to_iv_arc: PidToIvArc) -> Gen3Method {
        match (iv_arc, pid_to_iv_arc) {
            (IvFromStartArc::WithoutVBlank, PidToIvArc::WithoutVBlank) => Gen3Method::Wild1,
            (IvFromStartArc::WithoutVBlank, PidToIvArc::WithVBlankBetweenPid) => Gen3Method::Wild3,
            (IvFromStartArc::WithoutVBlank, PidToIvArc::WithVBlankBetweenPidIv) => {
                Gen3Method::Wild2
            }
            _ => Gen3Method::Wild4,
        }
    }
    pub fn method(&self) -> Gen3Method {
        Self::calc_method(self.iv_arc, self.pid_to_iv_arc)
    }
    pub fn nature(&self) -> Nature {
        Nature::from_pid(self.pid())
    }
    pub fn pid(&self) -> u32 {
        let mut rng = Pokerng::new(self.seed);
        let mut pid = rng.rand::<u16>() as u32;
        if self.pid_to_iv_arc == PidToIvArc::WithVBlankBetweenPid {
            rng.advance(1);
        }
        pid |= (rng.rand::<u16>() as u32) << 16;
        pid
    }
    pub fn ivs(&self) -> Ivs {
        let mut rng = Pokerng::new(self.seed);
        rng.advance(2);

        if self.pid_to_iv_arc == PidToIvArc::WithVBlankBetweenPid
            || self.pid_to_iv_arc == PidToIvArc::WithVBlankBetweenPidIv
        {
            rng.advance(1);
        }

        let iv1 = rng.rand::<u16>();

        if self.iv_arc == IvFromStartArc::WithVBlank {
            rng.advance(1);
        }

        Ivs::new_g3(iv1, rng.rand::<u16>())
    }
    pub fn adv_from_seed_0(&self) -> u32 {
        lcrng_distance(0, self.seed)
    }
}

impl std::fmt::Display for PidPath {
    fn fmt(&self, f: &mut std::fmt::Formatter) -> std::fmt::Result {
        write!(
            f,
            "Seed: {:08X}, Adv: {}, Method: {:?}, PID: {:08X}, Ivs: {}",
            self.seed,
            self.adv_from_seed_0(),
            self.method(),
            self.pid(),
            self.ivs(),
        )
    }
}

pub enum PidPathStrategy {
    ReverseIv,
    ReversePid,
    ByStepIv1,
    ByStepIv2,
    ByStepPid,
}

/** To improve performance, we want to apply the most restrictive criterias of the filter first. */
pub fn determine_best_pid_path_strategy(opts: &FindPidPathsOptions) -> PidPathStrategy {
    if get_limited_valid_pids(&opts.gen3_filter.pid_speed).is_some() {
        return PidPathStrategy::ReversePid;
    }

    let iv1_restrict = get_iv1_filter_restrictiveness(&opts.filter);
    let iv2_restrict = get_iv2_filter_restrictiveness(&opts.filter);
    let iv_restrict = get_iv_filter_restrictiveness(&opts.filter);
    let pid_restrict = get_pid_filter_restrictiveness(
        &opts.filter,
        &opts.gen3_filter,
        Some(opts.encounter_gender_ratio),
    );

    if pid_restrict < iv_restrict {
        return PidPathStrategy::ByStepPid;
    }

    if iv_restrict < 1f64 / 65_000_f64 {
        return PidPathStrategy::ReverseIv;
    }

    if iv1_restrict < iv2_restrict {
        PidPathStrategy::ByStepIv1
    } else {
        PidPathStrategy::ByStepIv2
    }
}

// For all possible valid ivs, reverse-find the seeds that can generate them.
// Very quick when they are few valid ivs (ex: 4+ perfect IVs)
pub fn find_pid_paths_reverse_iv<const METHOD3: bool>(
    opts: &FindPidPathsOptions,
) -> impl Iterator<Item = PidPath> {
    reverse_find_iv_paths_from_min_max_ivs(
        opts.filter.min_ivs,
        opts.filter.max_ivs,
        Some(&opts.filter.hidden_power),
    )
    .iter()
    .flat_map(|iv_path| extend_iv_path_to_pid_paths::<METHOD3>(opts, *iv_path))
    .sorted_by(|pid_path1, pid_path2| {
        // Limitation: initial_advances should be applied on the encounter_idx_seed, not the pid_seed
        let dist1 = lcrng_distance(opts.initial_seed, pid_path1.seed)
            .wrapping_sub(opts.initial_advances as u32);
        let dist2 = lcrng_distance(opts.initial_seed, pid_path2.seed)
            .wrapping_sub(opts.initial_advances as u32);

        dist1
            .cmp(&dist2)
            .then_with(|| (pid_path1.method() as u8).cmp(&(pid_path2.method() as u8)))
    })
    .collect::<Vec<_>>()
    .into_iter()
}

fn is_subset(
    range: &std::ops::RangeInclusive<usize>,
    subset: &std::ops::RangeInclusive<usize>,
) -> bool {
    range.contains(subset.start()) && range.contains(subset.end())
}

fn get_limited_valid_pids(pid_speed_filter: &Gen3PidSpeedFilter) -> Option<Vec<u32>> {
    match pid_speed_filter.cycle_count_range() {
        None => None,
        Some(wanted_range) => {
            let potential_pids = if is_subset(&FASTEST_DIVIDENDS_MOD_24_RANGE, &wanted_range) {
                Some(FASTEST_DIVIDENDS_MOD_24)
            } else if is_subset(&SLOWEST_DIVIDENDS_MOD_24_RANGE, &wanted_range) {
                Some(SLOWEST_DIVIDENDS_MOD_24)
            } else {
                None
            };

            potential_pids.map(|potential_pids| {
                potential_pids
                    .iter()
                    .filter(|pid| wanted_range.contains(&calculate_pid_speed(**pid)))
                    .cloned()
                    .collect()
            })
        }
    }
}

// For all possible valid PIDs, reverse-find the seeds that can generate them.
// Very quick when they are few valid PIDs
// Limitation: Only supports when the filter is nearly the fastest or slowest PID modulo 24
pub fn find_pid_paths_reverse_pid<const METHOD3: bool>(
    opts: &FindPidPathsOptions,
) -> impl Iterator<Item = PidPath> {
    let wanted_pids = get_limited_valid_pids(&opts.gen3_filter.pid_speed)
        .unwrap_or(FASTEST_DIVIDENDS_MOD_24.to_vec());

    reverse_find_pid_low_paths_from_pids(&wanted_pids)
        .iter()
        .flat_map(|pid_low_path| extend_pid_low_path_to_pid_paths(opts, pid_low_path))
        .sorted_by(|pid_path1, pid_path2| {
            // Limitation: initial_advances should be applied on the encounter_idx_seed, not the pid_seed
            let dist1 = lcrng_distance(opts.initial_seed, pid_path1.seed)
                .wrapping_sub(opts.initial_advances as u32);
            let dist2 = lcrng_distance(opts.initial_seed, pid_path2.seed)
                .wrapping_sub(opts.initial_advances as u32);

            dist1
                .cmp(&dist2)
                .then_with(|| (pid_path1.method() as u8).cmp(&(pid_path2.method() as u8)))
        })
        .collect::<Vec<_>>()
        .into_iter()
}

// Progressively generate the seeds from advance 0, 1, 2 ... until enough are generated. Filter by iv1 first.
pub fn find_pid_paths_by_step_iv1<const METHOD3: bool>(
    opts: &FindPidPathsOptions,
) -> impl Iterator<Item = PidPath> {
    let base_rng = Pokerng::with_jump(opts.initial_seed, opts.initial_advances);
    StateIterator::new(base_rng)
        .take(opts.max_advances.saturating_add(1)) // missing +1 but overflows in wasm
        .filter_map(|mut rng| find_iv_paths_from_iv1_seed(opts, &mut rng))
        .flatten()
        .flat_map(|iv_path| extend_iv_path_to_pid_paths::<METHOD3>(opts, iv_path))
}

// Progressively generate the seeds from advance 0, 1, 2 ... until enough are generated. Filter by iv2 first.
pub fn find_pid_paths_by_step_iv2<const METHOD3: bool>(
    opts: &FindPidPathsOptions,
) -> impl Iterator<Item = PidPath> {
    let base_rng = Pokerng::with_jump(opts.initial_seed, opts.initial_advances);
    StateIterator::new(base_rng)
        .take(opts.max_advances.saturating_add(1)) // missing +1 but overflows in wasm
        .filter_map(|mut rng| find_iv_paths_from_iv2_seed(opts, &mut rng))
        .flatten()
        .flat_map(|iv_path| extend_iv_path_to_pid_paths::<METHOD3>(opts, iv_path))
}

// Progressively generate the seeds from advance 0, 1, 2 ... until enough are generated. Filter by pid first.
pub fn find_pid_paths_by_step_pid<const METHOD3: bool>(
    opts: &FindPidPathsOptions,
) -> impl Iterator<Item = PidPath> {
    let base_rng = Pokerng::with_jump(opts.initial_seed, opts.initial_advances);
    StateIterator::new(base_rng)
        .take(opts.max_advances.saturating_add(1)) // missing +1 but overflows in wasm
        .filter_map(|rng| find_pid_low_paths_from_pid_low_seed::<METHOD3>(opts, rng))
        .flatten()
        .flat_map(|pid_low_path| extend_pid_low_path_to_pid_paths(opts, &pid_low_path))
}

pub fn extend_iv_path_to_pid_paths<const METHOD3: bool>(
    opts: &FindPidPathsOptions,
    iv_path: IvPath,
) -> ArrayVec<PidPath, 3> {
    let mut pid_paths: ArrayVec<PidPath, 3> = Default::default();
    if let Some(no_vblank_pid_path) = extend_iv_path_to_pid_path_no_vblank(opts, iv_path) {
        pid_paths.push(no_vblank_pid_path);
    }
    if iv_path.iv_arc == IvFromStartArc::WithoutVBlank {
        if let Some(wild2_pid_path) = extend_iv_path_to_pid_path_wild2(opts, iv_path) {
            pid_paths.push(wild2_pid_path);
        }
        if METHOD3 {
            if let Some(wild3_pid_path) = extend_iv_path_to_pid_path_wild3(opts, iv_path) {
                pid_paths.push(wild3_pid_path);
            }
        }
    }
    // To improve performance for the common case where consider_all_methods_124 is true, we filter by consider_all_methods_124 at the end.
    if !opts.consider_all_methods_124 {
        pid_paths.retain(|pid_path| opts.methods.contains(&pid_path.method()));
    }
    pid_paths
}

fn extend_iv_path_to_pid_path_no_vblank(
    opts: &FindPidPathsOptions,
    iv_path: IvPath,
) -> Option<PidPath> {
    let mut rng = Pokerng::new(iv_path.seed); //next_u16 returns iv2

    let pid = ((rng.prev_rand() as u32) << 16) | (rng.prev_rand() as u32);

    if passes_pid_filter_internal(opts, pid) {
        let pid_path = PidPath::new(rng.seed(), PidToIvArc::WithoutVBlank, iv_path.iv_arc);
        assert_eq!(pid, pid_path.pid());
        Some(pid_path)
    } else {
        None
    }
}

fn passes_pid_filter_internal(opts: &FindPidPathsOptions, pid: u32) -> bool {
    passes_pid_filter(
        &opts.filter,
        &opts.gen3_filter,
        Some(opts.encounter_gender_ratio),
        pid,
        opts.tsv,
    )
}

fn extend_iv_path_to_pid_path_wild2(
    opts: &FindPidPathsOptions,
    iv_path: IvPath,
) -> Option<PidPath> {
    let mut rng = Pokerng::new(iv_path.seed);

    rng.prev_rand(); // v-blank between PID and IV

    let pid = ((rng.prev_rand() as u32) << 16) | (rng.prev_rand() as u32);

    if passes_pid_filter_internal(opts, pid) {
        let pid_path = PidPath::new(
            rng.seed(),
            PidToIvArc::WithVBlankBetweenPidIv,
            iv_path.iv_arc,
        );
        assert_eq!(pid, pid_path.pid());
        Some(pid_path)
    } else {
        None
    }
}

fn extend_iv_path_to_pid_path_wild3(
    opts: &FindPidPathsOptions,
    iv_path: IvPath,
) -> Option<PidPath> {
    let mut rng = Pokerng::new(iv_path.seed);

    let mut pid = (rng.prev_rand() as u32) << 16;

    rng.prev_rand(); // v-blank between PID_low and PID_high

    pid |= rng.prev_rand() as u32;

    if passes_pid_filter_internal(opts, pid) {
        let pid_path = PidPath::new(rng.seed(), PidToIvArc::WithVBlankBetweenPid, iv_path.iv_arc);
        assert_eq!(pid, pid_path.pid());
        Some(pid_path)
    } else {
        None
    }
}

#[path = "tests/pid_path_tests.rs"]
#[cfg(test)]
mod tests;
