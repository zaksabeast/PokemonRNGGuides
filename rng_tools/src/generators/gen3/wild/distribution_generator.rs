use itertools::Itertools;
use serde::{Deserialize, Serialize};
use tsify::Tsify;
use wasm_bindgen::prelude::*;

use super::Wild3GeneratorOptions;
use crate::{
    gen3::{
        CycleFrameMoment, CycleRange, Gen3Method, Wild3GeneratorCycleOpts, Wild3MapGameData,
        Wild3SearcherResultMon, calculate_cycle_data, generate_wild3, generate_wild3_old,
    },
    rng::lcrng::Pokerng,
};

#[derive(Debug, Clone, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct Wild3MethodDistributionResult {
    pub searcher_res: Wild3SearcherResultMon,
    pub pre_sweet_scent_cycle_range: CycleRange<i32>,
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
    initial_cycle_at_sweet_scent: Option<usize>,
    vblank_cycles: Option<Vec<usize>>,
) -> Wild3MethodDistributionResults {
    let cycle_opts_for_cycle = match (initial_cycle_at_sweet_scent, vblank_cycles) {
        (Some(initial_cycle_at_sweet_scent), Some(vblank_cycles)) => {
            Wild3GeneratorCycleOpts::CycleAtMomentWithEmuLog {
                lead_cycle_spd,
                initial_cycle_at_sweet_scent,
                vblank_cycles,
            }
        }
        _ => Wild3GeneratorCycleOpts::CycleAtMomentNoEmuLog { lead_cycle_spd },
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
            cycle_opts: Wild3GeneratorCycleOpts::LikelihoodForLead { lead_cycle_spd },
            methods,
            ..opts.clone()
        },
        game_data,
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
) -> Vec<Wild3MethodDistributionResult> {
    let generated = generate_wild3_old(rng, opts, game_data);
    let cycle_instability = generated.cycle_counter.cycle_instability;
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
                cycle_instability,
            );
            let cycle_data = calculate_cycle_data(
                &searcher_res
                    .cycle_data_by_lead
                    .as_ref()
                    .unwrap()
                    .post_sweet_scent_range,
                opts.action,
                lead_cycle_spd,
            );

            Wild3MethodDistributionResult {
                searcher_res,
                pre_sweet_scent_cycle_range: cycle_data.pre_sweet_scent_cycle_range,
                method_probability: cycle_data.method_probability,
            }
        })
        .collect()
}

// TODO: Create generate_gen3_wild_distribution_with_emu_log()
/*
initial_seed: u32,
advances: usize,
opts: &Wild3GeneratorOptions,
game_data: &Wild3MapGameData,
lead_cycle_speed: usize,

    CycleAtMomentWithEmuLog {
        lead_cycle_spd: usize,
        initial_cycle_at_sweet_scent: usize,
        vblank_cycles: Vec<usize>,
    },
*/

#[cfg(test)]
mod test {
    use super::*;
    use crate::{
        assert_list_eq,
        gen3::{Gen3Method, Moment, Wild3MapGameData},
    };

    #[derive(Debug, PartialEq)]
    struct ResultForTest {
        pub method: Gen3Method,
        pub pre_sweet_scent_cycle_range: CycleRange<i32>,
        pub method_probability: f64,
    }
    impl ResultForTest {
        pub fn new_from_dist_res(dist_res: &Wild3MethodDistributionResult) -> Self {
            Self {
                method: dist_res.searcher_res.method,
                pre_sweet_scent_cycle_range: dist_res.pre_sweet_scent_cycle_range,
                method_probability: dist_res.method_probability,
            }
        }
        pub fn new(
            method: Gen3Method,
            method_probability: f64,
            pre_sweet_scent_cycle_range: CycleRange<i32>,
        ) -> Self {
            Self {
                method,
                pre_sweet_scent_cycle_range,
                method_probability,
            }
        }
    }

    #[test]
    fn test_distribution_generator() {
        let opts = Wild3GeneratorOptions::default();
        let dist_results = generate_gen3_wild_distribution(
            0,
            44,
            &opts,
            &Wild3MapGameData::default(),
            700,
            None,
            None,
        );

        let results = dist_results
            .results
            .iter()
            .map(ResultForTest::new_from_dist_res)
            .collect::<Vec<_>>();

        let expected_results = [ResultForTest::new(
            Gen3Method::Wild5,
            0.0,
            CycleRange::from_start_len(0, 10142),
        )];
        assert_list_eq!(results, expected_results);

        let expected_cycle_at_moments = [
            CycleFrameMoment::new(Moment::TrySweetScentEncounter, 0, 55000),
            CycleFrameMoment::new(Moment::SweetScentWildEncounter, 0, 55000),
            CycleFrameMoment::new(Moment::TryStartRoamerEncounter, 0, 55000),
            CycleFrameMoment::new(Moment::DoMassOutbreakEncounterTest, 0, 55000),
            CycleFrameMoment::new(Moment::TryGenerateWildMon, 0, 55000),
            CycleFrameMoment::new(Moment::TryGetAbilityInfluencedWildMonIndex, 0, 55000),
            CycleFrameMoment::new(Moment::TryGetAbilityInfluencedWildMonIndex, 0, 55000),
            CycleFrameMoment::new(Moment::ChooseWildMonIndex_Land, 0, 55000),
            CycleFrameMoment::new(Moment::ChooseWildMonIndex_Land_Random, 0, 89459),
            CycleFrameMoment::new(Moment::ChooseWildMonLevel, 0, 90318),
            CycleFrameMoment::new(Moment::ChooseWildMonLevel_RandomLvl, 0, 90318),
            CycleFrameMoment::new(Moment::CreateWildMon, 0, 90933),
            CycleFrameMoment::new(Moment::PickWildMonNature, 0, 144278),
            CycleFrameMoment::new(Moment::PickWildMonNature_RandomPickNature, 0, 144278),
            CycleFrameMoment::new(Moment::CreateMonWithNature, 0, 156138),
            CycleFrameMoment::new(Moment::CreateMonWithNature_RandomPidLow, 0, 156138),
            CycleFrameMoment::new(Moment::CreateMonWithNature_RandomPidHigh, 1, 59086),
            CycleFrameMoment::new(Moment::CreateMon, 1, 59086),
            CycleFrameMoment::new(Moment::CreateBoxMon_RandomIvs1, 1, 181321),
            CycleFrameMoment::new(Moment::CreateBoxMon_RandomIvs2, 1, 222880),
        ];
        assert_list_eq!(dist_results.cycle_at_moments, expected_cycle_at_moments);
    }
}
