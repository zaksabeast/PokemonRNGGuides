use itertools::Itertools;
use serde::{Deserialize, Serialize};
use tsify::Tsify;
use wasm_bindgen::prelude::*;

use super::Wild3GeneratorOptions;
use super::Wild3FeebasState;
use crate::rng::Rng;
use crate::{
    gen3::{
        CycleFrameMoment, CycleRange, Gen3Method, Wild3GeneratorCycleOpts, generate_wild3,
        Wild3FeebasTileId, Wild3InitialCycleDistribution, Wild3MapGameData, Wild3PlayingSong,
        Wild3SearcherResultMon, Wild3Weather, calculate_cycle_data_for_specific_lead_spd,
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
    pub feebas_probability_by_vblank: Option<Vec<f64>>,
    pub omitted_emu_log: bool,
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
    feebas_tile: Option<Wild3FeebasTileId>,
) -> Wild3MethodDistributionResults {
    let base_initial_cycle_distr =
        game_data.get_initial_cycle_distr(opts.action, playing_song, weather, None);
    let rng = Pokerng::with_jump(initial_seed, advances);
    let mut check_rng = rng;
    let applicable_check =
        opts.action.is_fishing() && opts.feebas_state != Wild3FeebasState::NotInMap;
    let timed_check = applicable_check && check_rng.rand::<u16>() % 100 <= 49;
    let feebas_distributions = game_data
        .initial_cycle_distrs
        .iter()
        .filter(|distribution| {
            distribution.action == opts.action
                && distribution.playing_song == playing_song
                && distribution.weather == weather
                && distribution.feebas_tile == feebas_tile
        })
        .collect_vec();
    let selected = feebas_distributions
        .iter()
        .copied()
        .filter(|distribution| {
            distribution.feebas_vblank_count.is_some()
                && distribution.feebas_vblank_count_probability > 0.0
                && opts.feebas_vblank_count.is_none_or(|count| {
                    distribution.feebas_vblank_count == Some(count)
                })
        })
        .max_by(|left, right| {
            left.feebas_vblank_count_probability
                .total_cmp(&right.feebas_vblank_count_probability)
        })
        .filter(|_| timed_check);
    let mut probabilities = vec![];
    for distribution in feebas_distributions {
        if let Some(count) = distribution.feebas_vblank_count {
            probabilities.resize(probabilities.len().max(count + 1), 0.0);
            probabilities[count] = distribution.feebas_vblank_count_probability;
        }
    }

    if timed_check && selected.is_none() {
        return Wild3MethodDistributionResults {
            results: vec![],
            cycle_at_moments: vec![],
            feebas_probability_by_vblank: Some(probabilities),
            omitted_emu_log: initial_cycle.is_some() && vblank_cycles.is_some(),
        };
    }

    let feebas_vblank_count = selected
        .and_then(|distribution| distribution.feebas_vblank_count)
        .or(opts.feebas_vblank_count);

    let cycle_opts_for_cycle = match (initial_cycle, vblank_cycles) {
        (Some(initial_cycle), Some(vblank_cycles)) => {
            Wild3GeneratorCycleOpts::CycleAtMomentWithEmuLog {
                lead_cycle_spd,
                initial_cycle,
                vblank_cycles,
            }
        }
        _ => Wild3GeneratorCycleOpts::CycleAtMomentNoEmuLog {
            initial_cycle: base_initial_cycle_distr.median(),
            feebas_initial_cycle: selected.unwrap_or(base_initial_cycle_distr).median(),
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

    let trace_opts = Wild3GeneratorOptions {
        cycle_opts: cycle_opts_for_cycle,
        methods: methods.clone(),
        feebas_vblank_count,
        ..opts.clone()
    };
    let cycle_at_moments = generate_cycle_at_moments(rng, &trace_opts, game_data);

    let initial_cycle_distr = selected.unwrap_or(base_initial_cycle_distr);

    let results = generate_dist_results(
        rng,
        advances,
        &Wild3GeneratorOptions {
            cycle_opts: Wild3GeneratorCycleOpts::LikelihoodForLead {
                min_max_initial_cycle: base_initial_cycle_distr.to_min_max(),
                feebas_min_max_initial_cycle: initial_cycle_distr.to_min_max(),
                lead_cycle_spd,
            },
            methods,
            feebas_vblank_count,
            ..opts.clone()
        },
        game_data,
        initial_cycle_distr,
    );

    Wild3MethodDistributionResults {
        results,
        cycle_at_moments,
        feebas_probability_by_vblank: timed_check.then_some(probabilities),
        omitted_emu_log: false,
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
        gen3::{Gen3Method, Moment, Wild3Action, Wild3EncounterGameData, Wild3MapGameData},
    };

    #[test]
    fn selects_feebas_distributions_for_requested_tile() {
        let distribution = |tile, vblank_count, probability| Wild3InitialCycleDistribution {
            feebas_tile: Some(tile),
            feebas_vblank_count: Some(vblank_count),
            feebas_vblank_count_probability: probability,
            ..Wild3InitialCycleDistribution::new_default(Wild3Action::GoodRod).clone()
        };
        let mut game_data = Wild3MapGameData::default();
        game_data.feebas = Some(Wild3EncounterGameData::default());
        game_data.initial_cycle_distrs = vec![
            distribution(4, 1, 0.3),
            distribution(4, 2, 0.7),
            distribution(5, 0, 1.0),
        ];
        let opts = Wild3GeneratorOptions {
            action: Wild3Action::GoodRod,
            feebas_state: Wild3FeebasState::OnFeebasTile,
            ..Default::default()
        };

        let result = generate_gen3_wild_distribution(
            38,
            0,
            &opts,
            &game_data,
            700,
            Wild3PlayingSong::MapSong,
            Wild3Weather::Sunny,
            None,
            None,
            Some(4),
        );

        assert_eq!(result.feebas_probability_by_vblank, Some(vec![0.0, 0.3, 0.7]));
        assert!(!result.results.is_empty());
        assert!(result.results.iter().all(|res| res.searcher_res.feebas_vblank_count == Some(2)));
    }

    #[derive(Debug, PartialEq)]
    struct ResultForTest {
        pub method: Gen3Method,
        pub initial_cycle_range: CycleRange<i32>,
        pub method_probability: f64,
    }
    impl ResultForTest {
        pub fn new_from_dist_res(dist_res: &Wild3MethodDistributionResult) -> Self {
            Self {
                method: dist_res.searcher_res.method,
                initial_cycle_range: dist_res.initial_cycle_range,
                method_probability: dist_res.method_probability,
            }
        }
        pub fn new(
            method: Gen3Method,
            method_probability: f64,
            initial_cycle_range: CycleRange<i32>,
        ) -> Self {
            Self {
                method,
                initial_cycle_range,
                method_probability,
            }
        }
    }

    #[ignore]
    #[test]
    fn test_distribution_generator() {
        let opts = Wild3GeneratorOptions::default();
        let dist_results = generate_gen3_wild_distribution(
            0,
            44,
            &opts,
            &Wild3MapGameData::default(),
            700,
            Wild3PlayingSong::MapSong,
            Wild3Weather::Sunny,
            None,
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
            .map(|result| result.initial_cycle_range)
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
                CycleRange::from_start_end(164153, 174003),
            ),
            ResultForTest::new(
                Gen3Method::Wild3,
                0.0,
                CycleRange::from_start_end(164073, 164153),
            ),
            ResultForTest::new(
                Gen3Method::Wild5,
                0.0,
                CycleRange::from_start_end(152197, 164073),
            ),
            ResultForTest::new(
                Gen3Method::Wild5,
                0.0,
                CycleRange::from_start_end(120207, 152197),
            ),
            ResultForTest::new(
                Gen3Method::Wild5,
                0.0,
                CycleRange::from_start_end(108299, 120207),
            ),
            ResultForTest::new(
                Gen3Method::Wild5,
                0.0,
                CycleRange::from_start_end(96352, 108299),
            ),
            ResultForTest::new(
                Gen3Method::Wild5,
                0.0,
                CycleRange::from_start_end(95335, 96352),
            ),
            ResultForTest::new(
                Gen3Method::Wild5,
                0.0,
                CycleRange::from_start_end(86465, 95335),
            ),
            ResultForTest::new(
                Gen3Method::Wild3,
                0.0,
                CycleRange::from_start_end(86385, 86465),
            ),
            ResultForTest::new(
                Gen3Method::Wild5,
                0.0,
                CycleRange::from_start_end(80510, 86385),
            ),
            ResultForTest::new(
                Gen3Method::Wild3,
                0.0,
                CycleRange::from_start_end(80430, 80510),
            ),
            ResultForTest::new(
                Gen3Method::Wild5,
                0.4499666666666667,
                CycleRange::from_start_end(61501, 80430),
            ),
            ResultForTest::new(
                Gen3Method::Wild5,
                0.3284666666666667,
                CycleRange::from_start_end(51647, 61501),
            ),
            ResultForTest::new(
                Gen3Method::Wild3,
                0.0026666666666666666,
                CycleRange::from_start_end(51567, 51647),
            ),
            ResultForTest::new(
                Gen3Method::Wild5,
                0.16436666666666666,
                CycleRange::from_start_end(46636, 51567),
            ),
            ResultForTest::new(
                Gen3Method::Wild2,
                0.054533333333333336,
                CycleRange::from_start_end(-76464, 46636),
            ),
            ResultForTest::new(
                Gen3Method::Wild4,
                0.0,
                CycleRange::from_start_end(-118720, -76464),
            ),
            ResultForTest::new(
                Gen3Method::Wild1,
                0.0,
                CycleRange::from_start_end(-1000000, -118720),
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
            CycleFrameMoment::new(Moment::TryGetAbilityInfluencedWildMonIndex, 0, 75270),
            CycleFrameMoment::new(Moment::ChooseWildMonIndex_Land, 0, 92494),
            CycleFrameMoment::new(Moment::ChooseWildMonIndex_Land_Random, 0, 92506),
            CycleFrameMoment::new(Moment::ChooseWildMonLevel, 0, 93248),
            CycleFrameMoment::new(Moment::ChooseWildMonLevel_RandomLvl, 0, 93311),
            CycleFrameMoment::new(Moment::CreateWildMon, 0, 111305),
            CycleFrameMoment::new(Moment::PickWildMonNature, 0, 142330),
            CycleFrameMoment::new(Moment::PickWildMonNature_RandomPickNature, 0, 159713),
            CycleFrameMoment::new(Moment::CreateMonWithNature, 0, 160331),
            CycleFrameMoment::new(Moment::CreateMon, 1, 61924),
            CycleFrameMoment::new(Moment::CreateBoxMon_RandomIvs1, 1, 185024),
            CycleFrameMoment::new(Moment::CreateBoxMon_RandomIvs2, 1, 227280),
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
