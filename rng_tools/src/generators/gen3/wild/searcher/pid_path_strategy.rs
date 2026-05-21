use crate::{
    gen3::{
        FASTEST_DIVIDENDS_MOD_24, get_iv_filter_restrictiveness, get_iv1_filter_restrictiveness,
        get_iv2_filter_restrictiveness, get_pid_filter_restrictiveness, passes_pid_filter_internal,
        wild::searcher::{
            FindPidPathsOptions, PidPath, extend_iv_path_to_pid_paths,
            extend_pid_low_path_to_pid_paths, find_iv_paths_from_iv1_seed,
            find_iv_paths_from_iv2_seed, find_pid_low_paths_from_pid_low_seed,
            reverse_find_iv_paths_from_min_max_ivs, reverse_find_pid_low_paths_from_pids,
        },
    },
    rng::{StateIterator, lcrng::Pokerng},
};

use super::pid_path::{get_limited_valid_pids_for_cycle_speed_filter, sort_and_take_pid_paths};

#[derive(PartialEq, Debug, Clone, Copy)]
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
    Pros: Returns results with lowest advance first, so no sorting is required.
    Cons: If the filter is very restrictive, most seeds are tested for nothing.
Reverse:
    Pros: Fastest because only promising seeds are tested.
    Cons: To guarantee results with lowest advance, all possibilities must be tested then sorted. With a loose filter, the performance deteriorates.
*/
pub fn determine_best_pid_path_strategy(opts: &FindPidPathsOptions) -> PidPathStrategy {
    if let Some(forced_search_strategy) = opts.forced_search_strategy {
        return forced_search_strategy;
    }

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
        // ReversePid only supports shiny. Shiny has ~500K possibilities.
        return PidPathStrategy::ReversePidShiny;
    }

    // With Reverse strategy, if the count is too large, the execution time becomes too long.
    if iv_possibility_count < 5_000_000.0 {
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

// PidPathStrategy::ReverseIv
//    For all possible valid ivs, reverse-find the seeds that can generate them.
//    Very quick when they are few valid ivs (ex: 4+ perfect IVs)
pub fn find_pid_paths_reverse_iv<const METHODS: u8>(
    opts: &FindPidPathsOptions,
) -> impl Iterator<Item = PidPath> {
    sort_and_take_pid_paths(
        reverse_find_iv_paths_from_min_max_ivs::<METHODS>(
            opts.filter.min_ivs,
            opts.filter.max_ivs,
            &opts.filter.hidden_power,
        )
        .flat_map(|iv_path| extend_iv_path_to_pid_paths::<METHODS>(opts, iv_path)),
        opts,
    )
}

// PidPathStrategy::ReversePid***
fn find_pid_paths_reverse_pid<const METHODS: u8>(
    opts: &FindPidPathsOptions,
    wanted_pids_it: impl Iterator<Item = u32>,
) -> impl Iterator<Item = PidPath> {
    let wanted_pids = wanted_pids_it.filter(|&pid| passes_pid_filter_internal(opts, pid));

    let it = reverse_find_pid_low_paths_from_pids::<METHODS>(wanted_pids)
        .flat_map(|pid_low_path| extend_pid_low_path_to_pid_paths::<METHODS>(opts, &pid_low_path));
    sort_and_take_pid_paths(it, opts)
}

// PidPathStrategy::ReversePidCycleSpeed
//    For all possible valid PIDs, reverse-find the seeds that can generate them.
//    Limitation: Only supports when the filter is nearly the fastest or slowest PID modulo 24
pub fn find_pid_paths_reverse_pid_cycle_speed<const METHODS: u8>(
    opts: &FindPidPathsOptions,
) -> impl Iterator<Item = PidPath> {
    let wanted_pids = get_limited_valid_pids_for_cycle_speed_filter(&opts.gen3_filter.pid_speed)
        .unwrap_or(FASTEST_DIVIDENDS_MOD_24.to_vec());

    find_pid_paths_reverse_pid::<METHODS>(opts, wanted_pids.into_iter())
}

// PidPathStrategy::ByStepShiny
//     For all possible valid PIDs, reverse-find the seeds that can generate them.
//     Limitation: Only supports shiny filter
pub fn find_pid_paths_reverse_pid_shiny<const METHODS: u8>(
    opts: &FindPidPathsOptions,
) -> impl Iterator<Item = PidPath> {
    let full_tsv: u32 = (opts.tsv as u32) << 3;

    let wanted_pids = (0..0x80000u32).map(move |partial| partial ^ ((partial ^ full_tsv) << 16));

    find_pid_paths_reverse_pid::<METHODS>(opts, wanted_pids)
}

// PidPathStrategy::ByStepIv1
//     Progressively generate the seeds from advance 0, 1, 2 ... until enough are generated. Filter by iv1 first.
pub fn find_pid_paths_by_step_iv1<const METHODS: u8>(
    opts: &FindPidPathsOptions,
) -> impl Iterator<Item = PidPath> {
    let base_rng = Pokerng::with_jump(opts.initial_seed, opts.initial_advances);
    StateIterator::new(base_rng)
        .take(opts.max_advances.saturating_add(1)) // missing +1 but overflows in wasm
        .filter_map(|mut rng| find_iv_paths_from_iv1_seed::<METHODS>(opts, &mut rng))
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
        .filter_map(|mut rng| find_iv_paths_from_iv2_seed::<METHODS>(opts, &mut rng))
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
        .flat_map(|pid_low_path| extend_pid_low_path_to_pid_paths::<METHODS>(opts, &pid_low_path))
}
