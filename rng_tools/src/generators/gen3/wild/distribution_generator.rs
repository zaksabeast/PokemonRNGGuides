use itertools::Itertools;
use serde::{Deserialize, Serialize};
use tsify::Tsify;
use wasm_bindgen::prelude::*;

use super::Wild3GeneratorOptions;
use crate::{
    gen3::{
        CycleFrameMoment, CycleRange, Gen3Method, Wild3GeneratorCycleOpts,
        Wild3InitialCycleDistribution, Wild3MapGameData, Wild3PlayingSong, Wild3SearcherResultMon,
        Wild3Weather, calculate_cycle_data_for_specific_lead_spd, generate_wild3,
    },
    rng::lcrng::Pokerng,
};

#[derive(Debug, Clone, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct Wild3MethodDistributionResult {
    pub searcher_res: Wild3SearcherResultMon,
    pub initial_cycle_range: CycleRange<i32>,
    pub method_probability: f64,
}

#[derive(Debug, Clone, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct Wild3MethodDistributionResults {
    pub results: Vec<Wild3MethodDistributionResult>,
    pub cycle_at_moments: Vec<CycleFrameMoment>,
}

#[wasm_bindgen]
pub fn generate_gen3_wild_distribution(
    initial_seed: u32,
    advances: usize,
    opts: &Wild3GeneratorOptions,
    game_data: &Wild3MapGameData,
    lead_cycle_spd: usize,
    playing_song: Wild3PlayingSong,
    weather: Wild3Weather,
    initial_cycle: Option<usize>,
    vblank_cycles: Option<Vec<usize>>,
) -> Wild3MethodDistributionResults {
    let initial_cycle_distr = game_data.get_initial_cycle_distr(
        opts.action,
        playing_song,
        weather,
        opts.feebas_vblank_count,
    );

    let cycle_opts_for_cycle = match (initial_cycle, vblank_cycles) {
        (Some(initial_cycle), Some(vblank_cycles)) => {
            Wild3GeneratorCycleOpts::CycleAtMomentWithEmuLog {
                lead_cycle_spd,
                initial_cycle,
                vblank_cycles,
            }
        }
        _ => Wild3GeneratorCycleOpts::CycleAtMomentNoEmuLog {
            initial_cycle: initial_cycle_distr.median(),
            lead_cycle_spd,
            playing_song,
        },
    };

    let methods = vec![
        Gen3Method::Wild1,
        Gen3Method::Wild2,
        Gen3Method::Wild3,
        Gen3Method::Wild4,
        Gen3Method::Wild5,
    ];

    let rng = Pokerng::with_jump(initial_seed, advances);

    let cycle_at_moments = generate_cycle_at_moments(
        rng,
        &Wild3GeneratorOptions {
            cycle_opts: cycle_opts_for_cycle,
            methods: methods.clone(),
            ..opts.clone()
        },
        game_data,
    );

    let results = generate_dist_results(
        rng,
        advances,
        &Wild3GeneratorOptions {
            cycle_opts: Wild3GeneratorCycleOpts::LikelihoodForLead {
                min_max_initial_cycle: initial_cycle_distr.to_min_max(),
                lead_cycle_spd,
            },
            methods,
            ..opts.clone()
        },
        game_data,
        initial_cycle_distr,
    );

    Wild3MethodDistributionResults {
        results,
        cycle_at_moments,
    }
}

fn generate_cycle_at_moments(
    rng: Pokerng,
    opts: &Wild3GeneratorOptions,
    game_data: &Wild3MapGameData,
) -> Vec<CycleFrameMoment> {
    let generated = generate_wild3(rng, opts, game_data);
    generated.cycle_counter.get_cycle_at_moments()
}

fn generate_dist_results(
    rng: Pokerng,
    advances: usize,
    opts: &Wild3GeneratorOptions,
    game_data: &Wild3MapGameData,
    initial_cycle_distr: &Wild3InitialCycleDistribution,
) -> Vec<Wild3MethodDistributionResult> {
    let generated = generate_wild3(rng, opts, game_data);
    let lead_cycle_spd = opts.cycle_opts.lead_cycle_spd().unwrap();

    generated
        .mon_results
        .iter()
        .sorted_by_key(|data| data.cycle_range.unwrap().start.cycle)
        .map(|gen_res| {
            let encounter = game_data
                .get_encounter(opts.action, gen_res.encounter_idx)
                .unwrap();

            let searcher_res = Wild3SearcherResultMon::new(
                gen_res,
                opts,
                rng.seed(),
                advances,
                encounter,
                &[initial_cycle_distr],
            );
            let cycle_data = calculate_cycle_data_for_specific_lead_spd(
                &searcher_res
                    .cycle_data_by_lead
                    .as_ref()
                    .unwrap()
                    .post_cycle_range,
                lead_cycle_spd,
                initial_cycle_distr,
            );

            Wild3MethodDistributionResult {
                searcher_res,
                initial_cycle_range: cycle_data.initial_cycle_range,
                method_probability: cycle_data.method_probability, // It already includes initial_cycle_distr.feebas_vblank_count_probability
            }
        })
        .collect()
}

#[cfg(test)]
#[path = "searcher/tests/distribution_generator_tests.rs"]
mod distribution_generator_tests;
