use arrayvec::ArrayVec;
use itertools::Itertools;

use crate::{
    GenderRatio, Ivs, Nature, PkmFilter,
    gen3::{
        FASTEST_DIVIDENDS_MOD_24, FASTEST_DIVIDENDS_MOD_24_RANGE, Gen3Method, Gen3PidSpeedFilter,
        Gen3PkmFilter, SLOWEST_DIVIDENDS_MOD_24, SLOWEST_DIVIDENDS_MOD_24_RANGE,
        calculate_pid_speed, passes_pid_filter,
        searcher_painter::Wild3PaintingAdvFinder,
        wild::{
            lcrng_distance,
            searcher::{IvFromStartArc, IvPath},
        },
    },
    rng::{Rng, lcrng::Pokerng},
};

use super::{
    pid_path_strategy::PidPathStrategy,
    searcher_main::searcher_reverse::{
        METHOD_1, METHOD_2, METHOD_3, METHOD_4, is_considered_method,
    },
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
            ],
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

pub(super) fn sort_and_take_pid_paths(
    pid_paths: impl Iterator<Item = PidPath>,
    opts: &FindPidPathsOptions,
) -> impl Iterator<Item = PidPath> {
    // PidPath respects the Pokémon filter. However, we don't know yet if a setup exists that will trigger
    // that particular encounter.
    // At worst, the odds are ~1%. For safety, we keep at least 1000.
    let take_count = std::cmp::max(1000, opts.max_result_count.saturating_mul(100));

    pid_paths.k_smallest_by_key(take_count, |pid_path| get_path_score(opts, pid_path))
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

pub fn extend_iv_path_to_pid_paths<const METHODS: u8>(
    opts: &FindPidPathsOptions,
    iv_path: IvPath,
) -> ArrayVec<PidPath, 3> {
    let mut pid_paths: ArrayVec<PidPath, 3> = Default::default();

    match iv_path.iv_arc {
        IvFromStartArc::WithoutVBlank => {
            if is_considered_method(METHODS, METHOD_1) {
                if let Some(no_vblank_pid_path) =
                    extend_iv_path_to_pid_path_no_vblank(opts, iv_path)
                {
                    pid_paths.push(no_vblank_pid_path);
                }
            }
            if is_considered_method(METHODS, METHOD_2) {
                if let Some(wild2_pid_path) = extend_iv_path_to_pid_path_wild2(opts, iv_path) {
                    pid_paths.push(wild2_pid_path);
                }
            }
            if is_considered_method(METHODS, METHOD_3) {
                if let Some(wild3_pid_path) = extend_iv_path_to_pid_path_wild3(opts, iv_path) {
                    pid_paths.push(wild3_pid_path);
                }
            }
        }
        IvFromStartArc::WithVBlank => {
            if is_considered_method(METHODS, METHOD_4) {
                if let Some(no_vblank_pid_path) =
                    extend_iv_path_to_pid_path_no_vblank(opts, iv_path)
                {
                    pid_paths.push(no_vblank_pid_path);
                }
            }
        }
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
