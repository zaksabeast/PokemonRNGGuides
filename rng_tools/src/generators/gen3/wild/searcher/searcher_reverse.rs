use itertools::Itertools;

use super::*;
use crate::{
    GenderRatio,
    gen3::{
        SpeciesData, find_pid_paths_reverse_pid,
        wild::{
            lcrng_distance,
            searcher::{
                EncounterIdxPath, EncounterIdxPathGenerator, EncounterIdxToLvlArc,
                FindPidPathsOptions, LvlPathGenerator, NatureGenderSeedGenerator, PidPath,
                PidPathStrategy, determine_best_pid_path_strategy, find_pid_paths_by_step_iv1,
                find_pid_paths_by_step_iv2, find_pid_paths_by_step_pid, find_pid_paths_reverse_iv,
            },
        },
    },
    gen3_tsv,
    rng::lcrng::Pokerng,
};

/*
Functional goal of the searcher:
  - Find the <opts.max_results_count> Pokemon with the fewest advances resulting that respect the filter.

Key concepts:
  - Node: A RNG state (seed) at a key RNG call moment. Ex: RNG state when determining the level.
  - Arc: Link between 2 nodes. It represents the impact of RNG calls and vblanks. Ex: Whether Magnet Pull ability is triggered or not.
  - Path: Sequence of arcs leading to a node. Ex: MassOutbreak + LvlNotHustle + SynchronizeSuccess + WithVBLankBetweenPidIv.
    - EncounterIdxPath represents the entire generation of a Pokemon, resulting from the player action.
    - PidPath represents the pid + ivs of the generated Pokemon.
  - Extending a path: Adding new arcs to an existing path, to reach new nodes.
       A node normally has multiple outgoing arcs, one for each possibilities. Ex: Vanilla, SynchronizeSuccess, CuteCharmSuccess

Technical approach:
  1- Find PID paths respecting the filter.
  2- Extend the PID paths until reaching the start of the wild encounter (start of Sweet Scent).

Finding PID paths:
  - The most efficient strategy is used, depending on the user-provided filter.
    - ByStepIv1: Filter by iv1 first
    - ByStepIv2: Filter by iv2 first
    - ByStepPid: Filter by PID first
    - ReverseIv: Reverse search from the wanted IVs
    - ReversePid: Reverse search from the wanted PID
*/

/*
===Nodes and Arcs===

EncounterIdxPath(MapSetup)
    Swarm
    Roamer
    SlotVanilla
    SlotMagnetPull
    SlotStatic
LvlPath
    Vanilla
    Hustle
NatureGenderPath
    Vanilla
    SynchronizeSuccess
    SynchronizeFailure
    CuteCharmSuccess
    CuteCharmFailure
PidPath (knows Iv arc)
    WithoutVBlank
    WithVBLankBetweenPid
    WithVBLankBetweenPidIv
IvPath
    WithVBLank
    WithoutVBlank
PidLowPath (doesn't know Iv arc)
    WithoutVBlank
    WithVBLank
*/

fn extend_pid_paths_to_results<I>(
    opts: &Wild3SearcherOptions,
    iter: I,
) -> Vec<Vec<Wild3SearcherResultMon>>
where
    I: Iterator<Item = PidPath>,
{
    let encounter_species_data = get_encounter_species_data(opts);
    let encounter_gender_ratio = encounter_species_data
        .as_ref()
        .map(|data| data.gender_ratio)
        .unwrap_or(GenderRatio::Genderless);

    let nature_gender_gen = NatureGenderSeedGenerator::new(
        &opts.leads,
        encounter_gender_ratio,
        opts.filter.nature,
        opts.filter.gender,
    );
    let lvl_gen = LvlPathGenerator::new(&opts.leads);
    let encouter_idx_gen =
        EncounterIdxPathGenerator::new(&opts.leads, &opts.map_setups, encounter_species_data);

    iter.filter_map(|pid_path| {
        let vec = nature_gender_gen
            .extend_path_for_all_arcs(&pid_path)
            .iter()
            .flat_map(|nature_gender_path| lvl_gen.extend_path_for_all_arcs(nature_gender_path))
            .flat_map(|lvl_path| encouter_idx_gen.extend_path_for_all_arcs(&lvl_path))
            .collect_vec();
        if vec.is_empty() { None } else { Some(vec) }
    })
    .filter_map(|encounter_idx_paths| {
        let vec = encounter_idx_paths
            .iter()
            .flat_map(|encounter_idx_path| {
                let map_setups = &opts.map_setups[encounter_idx_path.map_setups_idx];
                create_result(encounter_idx_path, opts, map_setups, encounter_gender_ratio)
            })
            .collect_vec();
        if vec.is_empty() { None } else { Some(vec) }
    })
    .take(opts.max_result_count) // Limitation: No guaranteed to have at least 1 result with >0 % likelihood
    .filter(|vec| !vec.is_empty())
    .collect_vec()
}

fn get_encounter_species_data(opts: &Wild3SearcherOptions) -> Option<SpeciesData> {
    opts.gen3_filter.species.and_then(|species| {
        opts.map_setups
            .iter()
            .find_map(|map_setups| map_setups.get_encounter_species_data(species))
    })
}

fn new_find_pid_paths_options(opts: &Wild3SearcherOptions) -> FindPidPathsOptions {
    let encounter_gender_ratio = get_encounter_species_data(opts)
        .map(|data| data.gender_ratio)
        .unwrap_or(GenderRatio::Genderless);
    FindPidPathsOptions {
        filter: opts.filter.clone(),
        gen3_filter: opts.gen3_filter.clone(),
        encounter_gender_ratio,
        methods: opts.methods.clone(),
        consider_all_methods_124: opts.methods.contains(&Gen3Method::Wild1)
            && opts.methods.contains(&Gen3Method::Wild2)
            && opts.methods.contains(&Gen3Method::Wild4),
        tsv: gen3_tsv(opts.tid, opts.sid),
        initial_seed: opts.initial_seed,
        initial_advances: opts.initial_advances,
        max_result_count: opts.max_result_count,
        max_advances: opts.max_advances,
    }
}

pub fn search_wild3_reverse(opts: &Wild3SearcherOptions) -> Vec<Vec<Wild3SearcherResultMon>> {
    let find_opts = new_find_pid_paths_options(opts);

    if find_opts.methods.contains(&Gen3Method::Wild3) {
        match determine_best_pid_path_strategy(&find_opts) {
            PidPathStrategy::ByStepIv1 => {
                extend_pid_paths_to_results(opts, find_pid_paths_by_step_iv1::<true>(&find_opts))
            }
            PidPathStrategy::ByStepIv2 => {
                extend_pid_paths_to_results(opts, find_pid_paths_by_step_iv2::<true>(&find_opts))
            }
            PidPathStrategy::ByStepPid => {
                extend_pid_paths_to_results(opts, find_pid_paths_by_step_pid::<true>(&find_opts))
            }
            PidPathStrategy::ReverseIv => {
                extend_pid_paths_to_results(opts, find_pid_paths_reverse_iv::<true>(&find_opts))
            }
            PidPathStrategy::ReversePid => {
                extend_pid_paths_to_results(opts, find_pid_paths_reverse_pid::<true>(&find_opts))
            }
        }
    } else {
        match determine_best_pid_path_strategy(&find_opts) {
            PidPathStrategy::ByStepIv1 => {
                extend_pid_paths_to_results(opts, find_pid_paths_by_step_iv1::<false>(&find_opts))
            }
            PidPathStrategy::ByStepIv2 => {
                extend_pid_paths_to_results(opts, find_pid_paths_by_step_iv2::<false>(&find_opts))
            }
            PidPathStrategy::ByStepPid => {
                extend_pid_paths_to_results(opts, find_pid_paths_by_step_pid::<false>(&find_opts))
            }
            PidPathStrategy::ReverseIv => {
                extend_pid_paths_to_results(opts, find_pid_paths_reverse_iv::<false>(&find_opts))
            }
            PidPathStrategy::ReversePid => {
                extend_pid_paths_to_results(opts, find_pid_paths_reverse_pid::<false>(&find_opts))
            }
        }
    }
}

fn create_result(
    seed: &EncounterIdxPath,
    opts: &Wild3SearcherOptions,
    map_setups: &Wild3MapSetups,
    encounter_gender_ratio: GenderRatio,
) -> Vec<Wild3SearcherResultMon> {
    let mass_outbreak_state = match seed.encounter_idx_to_lvl_arc {
        EncounterIdxToLvlArc::MassOutbreakSuccess(mass_outbreak_state) => mass_outbreak_state,
        _ => Wild3MassOutbreakState::Inactive,
    };

    let feebas_state = if opts.gen3_filter.species == Some(Species::Feebas)
        && map_setups
            .feebas_states
            .contains(&Wild3FeebasState::OnFeebasTile)
    {
        Wild3FeebasState::OnFeebasTile
    } else {
        Wild3FeebasState::NotInMap
    };

    let gen_opts = Wild3GeneratorOptions {
        tid: opts.tid,
        sid: opts.sid,
        map_idx: 0,
        action: seed.action,
        methods: vec![seed.pid_path.method()],
        lead: seed.lead(encounter_gender_ratio),
        filter: opts.filter.clone(),
        consider_cycles: opts.consider_cycles,
        consider_rng_manipulated_lead_pid: opts.consider_rng_manipulated_lead_pid,
        generate_even_if_impossible: opts.generate_even_if_impossible,
        gen3_filter: opts.gen3_filter.clone(),
        roamer_state: Wild3RoamerState::Inactive,
        mass_outbreak_state,
        feebas_state,
    };

    generate_gen3_wild(Pokerng::new(seed.seed), &gen_opts, &map_setups.map_data)
        .0
        .iter()
        .map(|gen_res| {
            let encounter = map_setups
                .map_data
                .get_encounter(gen_opts.action, gen_res.encounter_idx)
                .unwrap();
            let advance = lcrng_distance(opts.initial_seed, seed.seed) as usize;
            Wild3SearcherResultMon::new(gen_res, &gen_opts, advance, encounter)
        })
        .collect()
}

#[path = "tests/searcher_reverse_tests.rs"]
#[cfg(test)]
mod tests;

#[path = "tests/searcher_reverse_perf_tests.rs"]
#[cfg(test)]
mod perf_tests;
