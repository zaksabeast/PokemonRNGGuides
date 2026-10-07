use itertools::Itertools;
use serde::{Deserialize, Serialize};
use tsify::Tsify;
use wasm_bindgen::prelude::*;

use super::Wild3GeneratorOptions;
use crate::{
    gen3::{
        CycleFrameMoment, CycleRange, Gen3Method, Wild3GeneratorCycleOpts, Wild3MapGameData,
        Wild3SearcherResultMon, calculate_cycle_data, generate_wild3,
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
    let generated = generate_wild3(rng, opts, game_data);
    let cycle_instability = generated.cycle_counter.get_cycle_instability();
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

        let sorted_ranges = dist_results
            .results
            .iter()
            .map(|result| result.pre_sweet_scent_cycle_range)
            .sorted_by_key(|range| range.start)
            .collect::<Vec<_>>();
        for pair in sorted_ranges.windows(2) {
            assert!(pair[0].start + pair[0].len as i32 <= pair[1].start);
        }
        let total_probability: f64 = dist_results
            .results
            .iter()
            .map(|result| result.method_probability)
            .sum();
        assert!((total_probability - 1.0).abs() < 1e-10);

        let expected_results = [
            ResultForTest::new(
                Gen3Method::Wild5,
                0.0,
                CycleRange::from_start_end(165930, 175780),
            ),
            ResultForTest::new(
                Gen3Method::Wild3,
                0.0,
                CycleRange::from_start_end(165850, 165930),
            ),
            ResultForTest::new(
                Gen3Method::Wild5,
                0.0,
                CycleRange::from_start_end(153974, 165850),
            ),
            ResultForTest::new(
                Gen3Method::Wild5,
                0.0,
                CycleRange::from_start_end(121984, 153974),
            ),
            ResultForTest::new(
                Gen3Method::Wild5,
                0.0,
                CycleRange::from_start_end(110076, 121984),
            ),
            ResultForTest::new(
                Gen3Method::Wild5,
                0.0,
                CycleRange::from_start_end(98129, 110076),
            ),
            ResultForTest::new(
                Gen3Method::Wild5,
                0.0,
                CycleRange::from_start_end(97112, 98129),
            ),
            ResultForTest::new(
                Gen3Method::Wild5,
                0.0,
                CycleRange::from_start_end(88242, 97112),
            ),
            ResultForTest::new(
                Gen3Method::Wild3,
                0.0,
                CycleRange::from_start_end(88162, 88242),
            ),
            ResultForTest::new(
                Gen3Method::Wild5,
                0.0,
                CycleRange::from_start_end(82287, 88162),
            ),
            ResultForTest::new(
                Gen3Method::Wild3,
                0.0,
                CycleRange::from_start_end(82207, 82287),
            ),
            ResultForTest::new(
                Gen3Method::Wild5,
                0.3907333333333333,
                CycleRange::from_start_end(63278, 82207),
            ),
            ResultForTest::new(
                Gen3Method::Wild5,
                0.3284666666666667,
                CycleRange::from_start_end(53424, 63278),
            ),
            ResultForTest::new(
                Gen3Method::Wild3,
                0.0026666666666666666,
                CycleRange::from_start_end(53344, 53424),
            ),
            ResultForTest::new(
                Gen3Method::Wild5,
                0.16436666666666666,
                CycleRange::from_start_end(48413, 53344),
            ),
            ResultForTest::new(
                Gen3Method::Wild2,
                0.11376666666666667,
                CycleRange::from_start_end(-74527, 48413),
            ),
            ResultForTest::new(
                Gen3Method::Wild4,
                0.0,
                CycleRange::from_start_end(-116719, -74527),
            ),
            ResultForTest::new(
                Gen3Method::Wild1,
                0.0,
                CycleRange::from_start_end(-1000000, -116719),
            ),
        ];
        assert_list_eq!(results, expected_results);

        let expected_cycle_at_moments = [
            CycleFrameMoment::new(Moment::TrySweetScentEncounter, 0, 55000),
            CycleFrameMoment::new(Moment::SweetScentWildEncounter, 0, 57001),
            CycleFrameMoment::new(Moment::TryStartRoamerEncounter, 0, 57745),
            CycleFrameMoment::new(Moment::DoMassOutbreakEncounterTest, 0, 57878),
            CycleFrameMoment::new(Moment::TryGenerateWildMon, 0, 57962),
            CycleFrameMoment::new(Moment::TryGetAbilityInfluencedWildMonIndex, 0, 58029),
            CycleFrameMoment::new(Moment::TryGetAbilityInfluencedWildMonIndex, 0, 74829),
            CycleFrameMoment::new(Moment::ChooseWildMonIndex_Land, 0, 91629),
            CycleFrameMoment::new(Moment::ChooseWildMonIndex_Land_Random, 0, 91641),
            CycleFrameMoment::new(Moment::ChooseWildMonLevel, 0, 92383),
            CycleFrameMoment::new(Moment::ChooseWildMonLevel_RandomLvl, 0, 92446),
            CycleFrameMoment::new(Moment::CreateWildMon, 0, 109896),
            CycleFrameMoment::new(Moment::PickWildMonNature, 0, 140377),
            CycleFrameMoment::new(Moment::PickWildMonNature_RandomPickNature, 0, 157216),
            CycleFrameMoment::new(Moment::CreateMonWithNature, 0, 157834),
            CycleFrameMoment::new(Moment::CreateMon, 1, 59427),
            CycleFrameMoment::new(Moment::CreateBoxMon_RandomIvs1, 1, 182367),
            CycleFrameMoment::new(Moment::CreateBoxMon_RandomIvs2, 1, 224559),
        ];

        // Filter out CreateMonWithNature_RandomPidHigh/Low
        let cycle_at_moments = dist_results
            .cycle_at_moments
            .into_iter()
            .filter(|moment| {
                !matches!(
                    moment.moment,
                    Moment::CreateMonWithNature_RandomPidHigh
                        | Moment::CreateMonWithNature_RandomPidLow
                )
            })
            .collect::<Vec<_>>();

        assert_list_eq!(cycle_at_moments, expected_cycle_at_moments);
    }
}
