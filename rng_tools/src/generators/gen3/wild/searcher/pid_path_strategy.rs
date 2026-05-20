use itertools::Itertools;

use crate::{
    gen3::{
        FASTEST_DIVIDENDS_MOD_24, passes_pid_filter_internal,
        wild::searcher::{
            FindPidPathsOptions, PidPath, extend_iv_path_to_pid_paths,
            extend_pid_low_path_to_pid_paths, find_iv_paths_from_iv1_seed,
            find_iv_paths_from_iv2_seed, find_pid_low_paths_from_pid_low_seed,
            reverse_find_iv_paths_from_min_max_ivs, reverse_find_pid_low_paths_from_pids,
        },
    },
    rng::{StateIterator, lcrng::Pokerng},
};

use super::pid_path::{get_limited_valid_pids_for_cycle_speed_filter, sort_pid_paths};

// PidPathStrategy::ReverseIv
//    For all possible valid ivs, reverse-find the seeds that can generate them.
//    Very quick when they are few valid ivs (ex: 4+ perfect IVs)
pub fn find_pid_paths_reverse_iv<const METHODS: u8>(
    opts: &FindPidPathsOptions,
) -> impl Iterator<Item = PidPath> {
    sort_pid_paths(
        reverse_find_iv_paths_from_min_max_ivs(
            opts.filter.min_ivs,
            opts.filter.max_ivs,
            Some(&opts.filter.hidden_power),
        )
        .iter()
        .flat_map(|iv_path| extend_iv_path_to_pid_paths::<METHODS>(opts, *iv_path)),
        opts,
    )
    .into_iter()
}

// PidPathStrategy::ReversePid***
fn find_pid_paths_reverse_pid<const METHODS: u8>(
    opts: &FindPidPathsOptions,
    wanted_pids: Vec<u32>,
) -> Vec<PidPath> {
    let wanted_pids = wanted_pids
        .into_iter()
        .filter(|&pid| passes_pid_filter_internal(opts, pid));

    let it = reverse_find_pid_low_paths_from_pids::<METHODS>(wanted_pids)
        .flat_map(|pid_low_path| extend_pid_low_path_to_pid_paths(opts, &pid_low_path));
    sort_pid_paths(it, opts)
}

// PidPathStrategy::ReversePidCycleSpeed
//    For all possible valid PIDs, reverse-find the seeds that can generate them.
//    Limitation: Only supports when the filter is nearly the fastest or slowest PID modulo 24
pub fn find_pid_paths_reverse_pid_cycle_speed<const METHODS: u8>(
    opts: &FindPidPathsOptions,
) -> impl Iterator<Item = PidPath> {
    let wanted_pids = get_limited_valid_pids_for_cycle_speed_filter(&opts.gen3_filter.pid_speed)
        .unwrap_or(FASTEST_DIVIDENDS_MOD_24.to_vec());

    find_pid_paths_reverse_pid::<METHODS>(opts, wanted_pids).into_iter()
}

// PidPathStrategy::ByStepShiny
//     For all possible valid PIDs, reverse-find the seeds that can generate them.
//     Limitation: Only supports shiny filter
pub fn find_pid_paths_reverse_pid_shiny<const METHODS: u8>(
    opts: &FindPidPathsOptions,
) -> impl Iterator<Item = PidPath> {
    let full_tsv: u32 = (opts.tsv as u32) << 3;

    let wanted_pids = (0..0x80000u32)
        .map(move |partial| partial ^ ((partial ^ full_tsv) << 16))
        .collect_vec();

    find_pid_paths_reverse_pid::<METHODS>(opts, wanted_pids).into_iter()
}

// PidPathStrategy::ByStepIv1
//     Progressively generate the seeds from advance 0, 1, 2 ... until enough are generated. Filter by iv1 first.
pub fn find_pid_paths_by_step_iv1<const METHODS: u8>(
    opts: &FindPidPathsOptions,
) -> impl Iterator<Item = PidPath> {
    let base_rng = Pokerng::with_jump(opts.initial_seed, opts.initial_advances);
    StateIterator::new(base_rng)
        .take(opts.max_advances.saturating_add(1)) // missing +1 but overflows in wasm
        .filter_map(|mut rng| find_iv_paths_from_iv1_seed(opts, &mut rng))
        .flatten()
        .flat_map(|iv_path| extend_iv_path_to_pid_paths::<METHODS>(opts, iv_path))
}

// PidPathStrategy::ByStepIv2
//     Progressively generate the seeds from advance 0, 1, 2 ... until enough are generated. Filter by iv2 first.
pub fn find_pid_paths_by_step_iv2<const METHODS: u8>(
    opts: &FindPidPathsOptions,
) -> impl Iterator<Item = PidPath> {
    let base_rng = Pokerng::with_jump(opts.initial_seed, opts.initial_advances);
    StateIterator::new(base_rng)
        .take(opts.max_advances.saturating_add(1)) // missing +1 but overflows in wasm
        .filter_map(|mut rng| find_iv_paths_from_iv2_seed(opts, &mut rng))
        .flatten()
        .flat_map(|iv_path| extend_iv_path_to_pid_paths::<METHODS>(opts, iv_path))
}

// PidPathStrategy::ByStepPid
//     Progressively generate the seeds from advance 0, 1, 2 ... until enough are generated. Filter by pid first.
pub fn find_pid_paths_by_step_pid<const METHODS: u8>(
    opts: &FindPidPathsOptions,
) -> impl Iterator<Item = PidPath> {
    let base_rng = Pokerng::with_jump(opts.initial_seed, opts.initial_advances);
    StateIterator::new(base_rng)
        .take(opts.max_advances.saturating_add(1)) // missing +1 but overflows in wasm
        .filter_map(|rng| find_pid_low_paths_from_pid_low_seed::<METHODS>(opts, rng))
        .flatten()
        .flat_map(|pid_low_path| extend_pid_low_path_to_pid_paths(opts, &pid_low_path))
}
