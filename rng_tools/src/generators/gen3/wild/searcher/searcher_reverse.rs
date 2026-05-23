use arrayvec::ArrayVec;
use itertools::Itertools;

use super::*;
use crate::{
    GenderRatio,
    gen3::{
        SpeciesData, Wild3InSafariMapStatus, create_pokeblock_gen_opt,
        find_pid_paths_reverse_pid_cycle_speed, find_pid_paths_reverse_pid_shiny,
        searcher_painter::Wild3PaintingAdvFinder,
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
  - The most efficient strategy is used, depending on the user-provided filter. See determine_best_pid_path_strategy().
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
    Vailla
    Ccuc
    Ccuc_SafSuc_NoBlk
    Ccuc_SafSuc_WBlk
    Ccuc_SafFail
    Ccail
    Ccail_SafSuc_NoBlk
    Ccail_SafSuc_WBlk
    Ccail_SafFail
    SaSuc_NoBlk
    SaSuc_WBlk
    SaFail
    SaFail_SyncSuc
    SaFail_SyncFail
    SycSuc
    SycFail
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

pub const METHOD_1: u8 = 0b0001;
pub const METHOD_2: u8 = 0b0010;
pub const METHOD_3: u8 = 0b0100;
pub const METHOD_4: u8 = 0b1000;
pub const METHODS_1234: u8 = METHOD_1 | METHOD_2 | METHOD_3 | METHOD_4;

pub const fn is_considered_method(opts_methods: u8, methods_to_check: u8) -> bool {
    opts_methods & methods_to_check != 0
}

fn extend_pid_paths_to_results(
    opts: &Wild3SearcherOptions,
    iter: impl Iterator<Item = PidPath>,
) -> Vec<Vec<Wild3SearcherResultMon>> {
    let encounter_species_data = get_encounter_species_data(opts);
    let encounter_gender_ratio = encounter_species_data
        .as_ref()
        .map(|data| data.gender_ratio())
        .unwrap_or(GenderRatio::Genderless);

    let safari_status = if opts.map_setups.iter().all(|map| !map.map_data.is_safari) {
        Wild3InSafariMapStatus::Never
    } else if opts.map_setups.iter().all(|map| map.map_data.is_safari) {
        Wild3InSafariMapStatus::Always
    } else {
        Wild3InSafariMapStatus::Sometimes
    };

    let nature_gender_gen = NatureGenderSeedGenerator::new(
        &opts.leads,
        encounter_gender_ratio,
        &opts.filter.nature,
        opts.filter.gender,
        safari_status,
        opts.considered_safari_pokeblocks,
    );
    let lvl_gen = LvlPathGenerator::new(&opts.leads);
    let encounter_idx_gen = EncounterIdxPathGenerator::new(
        &opts.leads,
        &opts.map_setups,
        encounter_species_data,
        opts.using_white_flute,
    );

    iter.filter_map(|pid_path| {
        let nat_gender_paths = nature_gender_gen.extend_path_for_all_arcs(&pid_path);

        let lvl_paths = nat_gender_paths
            .iter()
            .flat_map(|nature_gender_path| lvl_gen.extend_path_for_all_arcs(nature_gender_path))
            .collect_vec();

        let encounter_paths = lvl_paths
            .iter()
            .flat_map(|lvl_path| {
                #[allow(clippy::let_and_return)] // Intermediate value is useful for debugging.
                let encounter_paths = encounter_idx_gen.extend_path_for_all_arcs(lvl_path);
                encounter_paths
            })
            .filter(|encounter_path| {
                lcrng_distance(opts.initial_seed, encounter_path.seed)
                    >= opts.initial_advances as u32
            })
            .collect_vec();

        if encounter_paths.is_empty() {
            None
        } else {
            Some(encounter_paths)
        }
    })
    .filter_map(|encounter_idx_paths| {
        let results = encounter_idx_paths
            .iter()
            .flat_map(|encounter_idx_path| {
                let map_setups = &opts.map_setups[encounter_idx_path.map_setups_idx];
                create_result(
                    encounter_idx_path,
                    opts,
                    map_setups,
                    encounter_idx_path.map_setups_idx,
                    encounter_gender_ratio,
                )
            })
            .collect_vec();

        if results.is_empty() {
            None
        } else {
            Some(results)
        }
    })
    .take(opts.max_result_count)
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
        .map(|data| data.gender_ratio())
        .unwrap_or(GenderRatio::Genderless);
    FindPidPathsOptions {
        filter: opts.filter.clone(),
        gen3_filter: opts.gen3_filter.clone(),
        encounter_gender_ratio,
        methods: opts.methods.clone(),
        tsv: gen3_tsv(opts.tid, opts.sid),
        initial_seed: opts.initial_seed,
        initial_advances: opts.initial_advances,
        max_result_count: opts.max_result_count,
        max_advances: opts.max_advances,
        painting_adv_finder: opts.painting_opts.as_ref().map(Wild3PaintingAdvFinder::new),
    }
}

pub fn search_wild3_reverse(opts: &Wild3SearcherOptions) -> Vec<Vec<Wild3SearcherResultMon>> {
    let mut methods_bits = 0;
    if opts.methods.contains(&Gen3Method::Wild1) {
        methods_bits |= METHOD_1;
    }
    if opts.methods.contains(&Gen3Method::Wild2) {
        methods_bits |= METHOD_2;
    }
    if opts.methods.contains(&Gen3Method::Wild3) {
        methods_bits |= METHOD_3;
    }
    if opts.methods.contains(&Gen3Method::Wild4) {
        methods_bits |= METHOD_4;
    }

    match methods_bits {
        0 => search_wild3_reverse_with_methods::<0>(opts),
        1 => search_wild3_reverse_with_methods::<1>(opts),
        2 => search_wild3_reverse_with_methods::<2>(opts),
        3 => search_wild3_reverse_with_methods::<3>(opts),
        4 => search_wild3_reverse_with_methods::<4>(opts),
        5 => search_wild3_reverse_with_methods::<5>(opts),
        6 => search_wild3_reverse_with_methods::<6>(opts),
        7 => search_wild3_reverse_with_methods::<7>(opts),
        8 => search_wild3_reverse_with_methods::<8>(opts),
        9 => search_wild3_reverse_with_methods::<9>(opts),
        10 => search_wild3_reverse_with_methods::<10>(opts),
        11 => search_wild3_reverse_with_methods::<11>(opts),
        12 => search_wild3_reverse_with_methods::<12>(opts),
        13 => search_wild3_reverse_with_methods::<13>(opts),
        14 => search_wild3_reverse_with_methods::<14>(opts),
        _ => search_wild3_reverse_with_methods::<15>(opts),
    }
}

pub fn search_wild3_reverse_with_methods<const METHODS: u8>(
    opts: &Wild3SearcherOptions,
) -> Vec<Vec<Wild3SearcherResultMon>> {
    let find_opts = new_find_pid_paths_options(opts);

    let strategy = determine_best_pid_path_strategy(&find_opts);

    match strategy {
        PidPathStrategy::ByStepIv1 => {
            extend_pid_paths_to_results(opts, find_pid_paths_by_step_iv1::<METHODS>(&find_opts))
        }
        PidPathStrategy::ByStepIv2 => {
            extend_pid_paths_to_results(opts, find_pid_paths_by_step_iv2::<METHODS>(&find_opts))
        }
        PidPathStrategy::ByStepPid => {
            extend_pid_paths_to_results(opts, find_pid_paths_by_step_pid::<METHODS>(&find_opts))
        }
        PidPathStrategy::ReverseIv => {
            extend_pid_paths_to_results(opts, find_pid_paths_reverse_iv::<METHODS>(&find_opts))
        }
        PidPathStrategy::ReversePidCycleSpeed => extend_pid_paths_to_results(
            opts,
            find_pid_paths_reverse_pid_cycle_speed::<METHODS>(&find_opts),
        ),
        PidPathStrategy::ReversePidShiny => extend_pid_paths_to_results(
            opts,
            find_pid_paths_reverse_pid_shiny::<METHODS>(&find_opts),
        ),
    }
}

// To improve performance during the paths generation, Egg leads are considered as Vanilla because they give identical outcome.
// However, once we reach the generator that considers cycle count, Egg and Vanilla must be treated separately.
fn get_leads(seed_lead: Gen3Lead, opts: &Wild3SearcherOptions) -> ArrayVec<Gen3Lead, 2> {
    let mut leads: ArrayVec<Gen3Lead, 2> = Default::default();
    match seed_lead {
        Gen3Lead::Vanilla => {
            if opts.leads.contains(&Gen3Lead::Egg) {
                leads.push(Gen3Lead::Egg);
            }
            if opts.leads.contains(&Gen3Lead::Vanilla) {
                leads.push(Gen3Lead::Vanilla);
            }
        }
        _ => {
            leads.push(seed_lead);
        }
    }
    leads
}

fn create_result(
    path: &EncounterIdxPath,
    opts: &Wild3SearcherOptions,
    map_setups: &Wild3MapSetups,
    map_idx: usize,
    encounter_gender_ratio: GenderRatio,
) -> Vec<Wild3SearcherResultMon> {
    let mass_outbreak_state = match path.encounter_idx_to_lvl_arc {
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

    let safari_pokeblock = if path.nature_gender_to_pid_arc.uses_safari_pokeblock() {
        Some(create_pokeblock_gen_opt(
            opts.considered_safari_pokeblocks,
            Nature::from_pid(path.pid_path.pid()),
        ))
    } else {
        None
    };

    get_leads(path.lead(encounter_gender_ratio), opts)
        .into_iter()
        .flat_map(|lead| {
            let gen_opts = Wild3GeneratorOptions {
                tid: opts.tid,
                sid: opts.sid,
                map_idx,
                action: path.action,
                methods: vec![path.pid_path.method()],
                lead,
                filter: opts.filter.clone(),
                consider_cycles: opts.consider_cycles,
                consider_rng_manipulated_lead_pid: opts.consider_rng_manipulated_lead_pid,
                generate_even_if_impossible: opts.generate_even_if_impossible,
                gen3_filter: opts.gen3_filter.clone(),
                roamer_state: Wild3RoamerState::Inactive,
                mass_outbreak_state,
                feebas_state,
                safari_pokeblock: safari_pokeblock.clone(),
                lead_cycle_speed: opts.lead_cycle_speed,
                using_white_flute: opts.using_white_flute,
            };

            generate_gen3_wild(Pokerng::new(path.seed), &gen_opts, &map_setups.map_data)
                .0
                .iter()
                .map(|gen_res| {
                    let encounter = map_setups
                        .map_data
                        .get_encounter(gen_opts.action, gen_res.encounter_idx)
                        .unwrap();
                    let advance = lcrng_distance(opts.initial_seed, path.seed) as usize;
                    Wild3SearcherResultMon::new(gen_res, &gen_opts, path.seed, advance, encounter)
                })
                .collect_vec()
        })
        .collect()
}

#[path = "tests/searcher_reverse_tests.rs"]
#[cfg(test)]
mod tests;

#[path = "tests/searcher_reverse_perf_tests.rs"]
#[cfg(test)]
mod perf_tests;
