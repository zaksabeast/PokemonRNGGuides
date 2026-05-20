use std::cmp::Ordering;

use arrayvec::ArrayVec;
use itertools::Itertools;

use crate::{
    GenderRatio, Ivs, Nature, PkmFilter,
    gen3::{
        FASTEST_DIVIDENDS_MOD_24, FASTEST_DIVIDENDS_MOD_24_RANGE, Gen3Method, Gen3PidSpeedFilter,
        Gen3PkmFilter, SLOWEST_DIVIDENDS_MOD_24, SLOWEST_DIVIDENDS_MOD_24_RANGE,
        calculate_pid_speed, get_iv_filter_restrictiveness, get_iv1_filter_restrictiveness,
        get_iv2_filter_restrictiveness, get_pid_filter_restrictiveness, passes_pid_filter,
        searcher_painter::Wild3PaintingAdvFinder,
        wild::{
            lcrng_distance,
            searcher::{IvFromStartArc, IvPath},
        },
    },
    rng::{Rng, lcrng::Pokerng},
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
    #[cfg(debug_assertions)]
    pub adv: u32,
}

pub struct FindPidPathsOptions {
    pub filter: PkmFilter,
    pub gen3_filter: Gen3PkmFilter,
    pub encounter_gender_ratio: GenderRatio,
    pub methods: Vec<Gen3Method>,
    // explicit bool to improve performance, to avoid calling methods.contains() in the common case
    pub consider_all_methods_124: bool,
    pub tsv: u16,
    pub initial_seed: u32,
    pub max_result_count: usize,
    pub initial_advances: usize,
    pub max_advances: usize,
    pub painting_adv_finder: Option<Wild3PaintingAdvFinder>,
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
            painting_adv_finder: None,
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
            #[cfg(debug_assertions)]
            adv: lcrng_distance(0, seed),
        }
    }

    pub fn from_method(seed: u32, method: Gen3Method) -> Self {
        Self::new(
            seed,
            match method {
                Gen3Method::Wild3 => PidToIvArc::WithVBlankBetweenPid,
                Gen3Method::Wild2 => PidToIvArc::WithVBlankBetweenPidIv,
                _ => PidToIvArc::WithoutVBlank,
            },
            match method {
                Gen3Method::Wild4 => IvFromStartArc::WithVBlank,
                _ => IvFromStartArc::WithoutVBlank,
            },
        )
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
    ReversePidCycleSpeed,
    ReversePidShiny,
    ByStepIv1,
    ByStepIv2,
    ByStepPid,
}

/** To improve performance, we want to apply the most restrictive criterias of the filter first.

ByStep:
    Pros: Returns results with lowest advance first.
    Cons: If filter is very restrictive, the performance is bad.
Reverse:
    Pros: Fastest
    Cons: To guarantee results with lowest advance, all possible IVs must be explored. With a loose filter, it can be impossible to explore them all.
*/
pub fn determine_best_pid_path_strategy(opts: &FindPidPathsOptions) -> PidPathStrategy {
    if get_limited_valid_pids_for_cycle_speed_filter(&opts.gen3_filter.pid_speed).is_some() {
        return PidPathStrategy::ReversePidCycleSpeed;
    }

    let iv_restrict = get_iv_filter_restrictiveness(&opts.filter);
    let pid_restrict = get_pid_filter_restrictiveness(
        &opts.filter,
        &opts.gen3_filter,
        Some(opts.encounter_gender_ratio),
    );

    let iv_possibility_count = iv_restrict * 4294967296.0f64;
    let pid_possibility_count = pid_restrict * 4294967296.0f64;

    if pid_possibility_count < iv_possibility_count && opts.filter.shiny {
        // ReversePid only supports shiny. Shiny only has ~500K possibilities.
        return PidPathStrategy::ReversePidShiny;
    }

    // With Reverse strategy, we must sort the possibilities to return those with lowest advance first.
    // If the count is too large, the execution time becomes too long.
    if iv_possibility_count < 1_000_000.0 {
        return PidPathStrategy::ReverseIv;
    }

    if pid_restrict < iv_restrict {
        return PidPathStrategy::ByStepPid;
    }

    let iv1_restrict = get_iv1_filter_restrictiveness(&opts.filter);
    let iv2_restrict = get_iv2_filter_restrictiveness(&opts.filter);

    if iv1_restrict < iv2_restrict {
        PidPathStrategy::ByStepIv1
    } else {
        PidPathStrategy::ByStepIv2
    }
}

pub(super) fn sort_pid_paths(
    pid_paths: impl Iterator<Item = PidPath>,
    opts: &FindPidPathsOptions,
) -> Vec<PidPath> {
    pid_paths
        .sorted_by(|pid_path1, pid_path2| compare_paths(opts, pid_path1, pid_path2))
        .collect::<Vec<_>>()
}

fn get_path_score(opts: &FindPidPathsOptions, pid_path: &PidPath) -> u32 {
    // We assume min_advances is respected. This is supposed to be valided by the caller.

    // Limitation: score should be calculated using encounter_idx_seed, not the pid_seed.
    // But that this point, encounter_idx_seed isn't known yet. In most cases, the impact is minimal.
    match &opts.painting_adv_finder {
        None => lcrng_distance(opts.initial_seed, pid_path.seed),
        Some(painting_adv_finder) => {
            painting_adv_finder
                .find_fastest_adv_considering_painting_from_seed(pid_path.seed)
                .wait_dur
        }
    }
}

fn compare_paths(opts: &FindPidPathsOptions, pid_path1: &PidPath, pid_path2: &PidPath) -> Ordering {
    let dist1 = get_path_score(opts, pid_path1);

    let dist2 = get_path_score(opts, pid_path2);

    dist1
        .cmp(&dist2)
        .then_with(|| (pid_path1.method() as u8).cmp(&(pid_path2.method() as u8)))
}

fn is_subset(
    range: &std::ops::RangeInclusive<usize>,
    subset: &std::ops::RangeInclusive<usize>,
) -> bool {
    range.contains(subset.start()) && range.contains(subset.end())
}

pub(super) fn get_limited_valid_pids_for_cycle_speed_filter(
    pid_speed_filter: &Gen3PidSpeedFilter,
) -> Option<Vec<u32>> {
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

    // To improve performance for the common case, we previously assumed that consider_all_methods_124 was true. We need to filter here.
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

pub fn passes_pid_filter_internal(opts: &FindPidPathsOptions, pid: u32) -> bool {
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
