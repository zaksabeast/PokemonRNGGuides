use super::{Wild3GeneratorOptions, generate_gen3_wild};
use crate::gen3::{
    CycleAtMoment, CycleRange, Gen3Method, Wild3EncounterTable, Wild3SearcherResultMon,
    calculate_cycle_data,
};
use crate::rng::Rng;
use crate::rng::lcrng::Pokerng;
use itertools::Itertools;
use serde::{Deserialize, Serialize};
use tsify_next::Tsify;
use wasm_bindgen::prelude::*;

#[derive(Debug, Clone, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct Wild3MethodDistributionResult {
    pub searcher_res: Wild3SearcherResultMon,
    pub pre_sweet_scent_cycle_ranges: Vec<CycleRange<usize>>,
    pub method_probability: f64,
}

#[derive(Debug, Clone, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct Wild3MethodDistributionResults {
    pub results: Vec<Wild3MethodDistributionResult>,
    pub cycle_at_moments: Vec<CycleAtMoment>,
}

#[wasm_bindgen]
pub fn generate_gen3_wild_distribution(
    initial_seed: u32,
    opts: &Wild3GeneratorOptions,
    game_data: &Wild3EncounterTable,
    lead_cycle_speed: usize,
) -> Wild3MethodDistributionResults {
    let opts = Wild3GeneratorOptions {
        consider_cycles: true,
        generate_even_if_impossible: true,
        methods: vec![
            Gen3Method::Wild1,
            Gen3Method::Wild2,
            Gen3Method::Wild3,
            Gen3Method::Wild4,
            Gen3Method::Wild5,
        ],
        ..opts.clone()
    };

    let mut rng = Pokerng::new(initial_seed);
    rng.advance(opts.advance);

    let (gen_results, cycle_counter) = generate_gen3_wild(rng, &opts, game_data);
    let search_results = gen_results
        .iter()
        .map(|gen_res| {
            let gender_ratio = game_data.slots[gen_res.encounter_slot as usize].gender_ratio;
            let searcher_res = Wild3SearcherResultMon::new(
                gen_res,
                opts.tid,
                opts.sid,
                gender_ratio,
                opts.advance,
                0,
                opts.lead,
            );
            let cycle_data = calculate_cycle_data(
                &searcher_res
                    .cycle_data_by_lead
                    .as_ref()
                    .unwrap()
                    .post_sweet_scent_range,
                lead_cycle_speed,
            );
            (searcher_res, cycle_data)
        })
        .sorted_by(|(_, lhs), (_, rhs)| {
            let cmp = lhs
                .pre_sweet_scent_cycle_range
                .start
                .cmp(&rhs.pre_sweet_scent_cycle_range.start);
            if cmp != std::cmp::Ordering::Equal {
                cmp
            } else {
                lhs.pre_sweet_scent_cycle_range
                    .end()
                    .cmp(&rhs.pre_sweet_scent_cycle_range.end())
            }
        })
        .collect::<Vec<_>>();

    let dist_results = search_results
        .iter()
        .enumerate()
        .map(|(i, (searcher_res, cycle_data))| {
            if searcher_res.method != Gen3Method::Wild5 {
                let mut ranges = vec![];
                if cycle_data.pre_sweet_scent_cycle_range.len > 0 {
                    ranges.push(cycle_data.pre_sweet_scent_cycle_range);
                }

                Wild3MethodDistributionResult {
                    searcher_res: searcher_res.clone(),
                    pre_sweet_scent_cycle_ranges: ranges,
                    method_probability: cycle_data.method_probability,
                }
            } else {
                // We must exclude Wild3 ranges and their probability
                // Ex: Wild5={ranges:[[20,30]], probability: 0.10} followed by Wild3={ranges:[25,26], probability: 0.01}
                // Result: Wild5={ranges:[[20,25],[26,30]], probability: 0.09}
                let mut pre_sweet_scent_cycle_ranges_vals: Vec<usize> =
                    vec![cycle_data.pre_sweet_scent_cycle_range.start];

                let mut method_probability = cycle_data.method_probability;

                for (wild3_res, wild3_cycle_data) in search_results.iter().skip(i + 1) {
                    if wild3_res.method != Gen3Method::Wild3 {
                        break;
                    }

                    pre_sweet_scent_cycle_ranges_vals
                        .push(wild3_cycle_data.pre_sweet_scent_cycle_range.start);

                    pre_sweet_scent_cycle_ranges_vals
                        .push(wild3_cycle_data.pre_sweet_scent_cycle_range.end());

                    method_probability -= wild3_cycle_data.method_probability;
                }

                pre_sweet_scent_cycle_ranges_vals
                    .push(cycle_data.pre_sweet_scent_cycle_range.end());

                let pre_sweet_scent_cycle_ranges = pre_sweet_scent_cycle_ranges_vals
                    .windows(2)
                    .step_by(2)
                    .filter_map(|vals| {
                        let [start, end] = [vals[0], vals[1]];
                        if start > end {
                            None
                        } else {
                            Some(CycleRange::from_start_end(start, end))
                        }
                    })
                    .collect::<Vec<_>>();

                Wild3MethodDistributionResult {
                    searcher_res: searcher_res.clone(),
                    pre_sweet_scent_cycle_ranges,
                    method_probability,
                }
            }
        })
        .collect::<Vec<_>>();

    Wild3MethodDistributionResults {
        results: dist_results,
        cycle_at_moments: cycle_counter
            .cycle_at_moments
            .iter()
            .map(|cycle_at_moment| cycle_at_moment.apply_lead_pid_speed(lead_cycle_speed))
            .collect(),
    }
}

#[cfg(test)]
mod test {
    use super::*;
    use crate::assert_list_eq;
    use crate::gen3::{Gen3Method, Moment, Wild3EncounterTable};

    #[derive(Debug, PartialEq)]
    struct ResultForTest {
        pub method: Gen3Method,
        pub pre_sweet_scent_cycle_ranges: Vec<CycleRange<usize>>,
        pub method_probability: f64,
    }
    impl ResultForTest {
        pub fn new_from_dist_res(dist_res: &Wild3MethodDistributionResult) -> Self {
            Self {
                method: dist_res.searcher_res.method,
                pre_sweet_scent_cycle_ranges: dist_res.pre_sweet_scent_cycle_ranges.clone(),
                method_probability: dist_res.method_probability,
            }
        }
        pub fn new(
            method: Gen3Method,
            method_probability: f64,
            pre_sweet_scent_cycle_ranges: &[CycleRange<usize>],
        ) -> Self {
            Self {
                method,
                pre_sweet_scent_cycle_ranges: pre_sweet_scent_cycle_ranges.to_vec(),
                method_probability,
            }
        }
    }

    #[test]
    fn test_distribution_generator() {
        let opts = Wild3GeneratorOptions {
            advance: 44,
            ..Default::default()
        };
        let dist_results =
            generate_gen3_wild_distribution(0, &opts, &Wild3EncounterTable::default(), 700);

        let results = dist_results
            .results
            .iter()
            .map(|dist_res| ResultForTest::new_from_dist_res(dist_res))
            .collect::<Vec<_>>();

        let expected_results = [
            ResultForTest::new(Gen3Method::Wild4, 0.0, &[]),
            ResultForTest::new(Gen3Method::Wild1, 0.0, &[]),
            ResultForTest::new(
                Gen3Method::Wild2,
                0.2237,
                &[CycleRange::from_start_len(0, 49474)],
            ),
            ResultForTest::new(
                Gen3Method::Wild5,
                0.7074,
                &[
                    CycleRange::from_start_len(49474, 4114),
                    CycleRange::from_start_len(53668, 10034),
                ],
            ),
            ResultForTest::new(
                Gen3Method::Wild3,
                0.004f64,
                &[CycleRange::from_start_len(53588, 80)],
            ),
            ResultForTest::new(
                Gen3Method::Wild5,
                0.0649,
                &[
                    CycleRange::from_start_len(63702, 19271),
                    CycleRange::from_start_len(83053, 5983),
                    CycleRange::from_start_len(89116, 9032),
                ],
            ),
            ResultForTest::new(
                Gen3Method::Wild3,
                0.0,
                &[CycleRange::from_start_len(82973, 80)],
            ),
            ResultForTest::new(
                Gen3Method::Wild3,
                0.0,
                &[CycleRange::from_start_len(89036, 80)],
            ),
            ResultForTest::new(
                Gen3Method::Wild5,
                0.0,
                &[CycleRange::from_start_len(98148, 1035)],
            ),
            ResultForTest::new(
                Gen3Method::Wild5,
                0.0,
                &[CycleRange::from_start_len(99183, 12163)],
            ),
            ResultForTest::new(
                Gen3Method::Wild5,
                0.0,
                &[CycleRange::from_start_len(111346, 12124)],
            ),
            ResultForTest::new(
                Gen3Method::Wild5,
                0.0,
                &[CycleRange::from_start_len(123470, 32566)],
            ),
            ResultForTest::new(
                Gen3Method::Wild5,
                0.0,
                &[
                    CycleRange::from_start_len(156036, 12092),
                    CycleRange::from_start_len(168208, 10030),
                ],
            ),
            ResultForTest::new(
                Gen3Method::Wild3,
                0.0,
                &[CycleRange::from_start_len(168128, 80)],
            ),
        ];
        assert_list_eq!(results, expected_results);

        let expected_cycle_at_moments = [
            CycleAtMoment::new(Moment::ChooseWildMonIndex_Land_Random, 35035),
            CycleAtMoment::new(Moment::ChooseWildMonLevel_RandomLvl, 35894),
            CycleAtMoment::new(Moment::PickWildMonNature_RandomPickNature, 90430),
            CycleAtMoment::new(Moment::CreateMonWithNature_RandomPidLowFirst, 102578),
            CycleAtMoment::new(Moment::CreateMonWithNature_RandomPidHighLast, 231422),
            CycleAtMoment::new(Moment::CreateBoxMon_RandomIvs1, 353657),
            CycleAtMoment::new(Moment::CreateBoxMon_RandomIvs2, 395216),
        ];
        assert_list_eq!(dist_results.cycle_at_moments, expected_cycle_at_moments);
    }
}
