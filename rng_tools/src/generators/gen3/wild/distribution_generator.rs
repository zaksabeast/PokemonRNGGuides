use super::{Wild3GeneratorOptions, generate_gen3_wild};
use crate::gen3::{
    CycleRange, Gen3Method, Wild3EncounterTable, Wild3SearcherResultMon, calculate_cycle_data,
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

fn get_pre_range_start_cycle(res: &Wild3SearcherResultMon) -> usize {
    // pre_range.start is based on post_range.end()
    res.cycle_data_by_lead
        .as_ref()
        .unwrap()
        .post_sweet_scent_range
        .end()
        .cycle
}

#[wasm_bindgen]
pub fn generate_gen3_wild_distribution(
    initial_seed: u32,
    opts: &Wild3GeneratorOptions,
    game_data: &Wild3EncounterTable,
    lead_cycle_speed: usize,
) -> Vec<Wild3MethodDistributionResult> {
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

    let gen_results = generate_gen3_wild(rng, &opts, game_data);
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
            lhs.pre_sweet_scent_cycle_range
                .start
                .cmp(&rhs.pre_sweet_scent_cycle_range.start)
        })
        .collect::<Vec<_>>();

    search_results
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
                // We must exclude Wild3 ranges and probability
                // Ex: Wild5={ranges:[[20,30]], probability: 0.10} followed by Wild3={ranges:[25,26], probability: 0.01}
                // Result: Wild5={ranges:[[20,25],[26,30]], probability: 0.09}
                let mut pre_sweet_scent_cycle_ranges_vals: Vec<usize> =
                    vec![cycle_data.pre_sweet_scent_cycle_range.start];

                let mut method_probability = cycle_data.method_probability;

                for other_res_idx in i + 1..search_results.len() {
                    let (wild3_res, wild3_cycle_data) = &search_results[other_res_idx];
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

                println!("{:?}", pre_sweet_scent_cycle_ranges_vals);
                let pre_sweet_scent_cycle_ranges = pre_sweet_scent_cycle_ranges_vals
                    .windows(2)
                    .step_by(2)
                    .filter_map(|vals| {
                        let [start, end] = [vals[0], vals[1]];
                        println!("{} {}", start, end);
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
        .collect()
}

#[cfg(test)]
mod test {
    use std::iter::Cycle;

    use super::*;

    use crate::{HiddenPower, PokemonType, assert_list_eq};

    use crate::gen3::{Gen3Lead, Gen3Method, Wild3EncounterTable, Wild3SearcherResultMon};
    use crate::{AbilityType, EncounterSlot, Gender, Ivs, Nature};

    #[derive(Debug)]
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
            consider_cycles: true,
            generate_even_if_impossible: true,
            advance: 1,
            methods: vec![
                Gen3Method::Wild1,
                Gen3Method::Wild2,
                Gen3Method::Wild3,
                Gen3Method::Wild4,
                Gen3Method::Wild5,
            ],
            ..Default::default()
        };
        let results =
            generate_gen3_wild_distribution(0, &opts, &Wild3EncounterTable::default(), 775)
                .iter()
                .map(|dist_res| ResultForTest::new_from_dist_res(dist_res))
                .collect::<Vec<_>>();

        /*

        [
        ReducedResult { method: Wild4, pre_sweet_scent_cycle_ranges: [CycleRange { start: 0, len: 26394 }], method_probability: 0.0 },
        ReducedResult { method: Wild1, pre_sweet_scent_cycle_ranges: [], method_probability: 0.0 },
        ReducedResult { method: Wild2, pre_sweet_scent_cycle_ranges: [CycleRange { start: 26394, len: 115597 }], method_probability: 1.0 },
        ReducedResult { method: Wild5, pre_sweet_scent_cycle_ranges: [CycleRange { start: 141991, len: 8917 }, CycleRange { start: 150988, len: 4980 }, CycleRange { start: 156048, len: 13209 }, CycleRange { start: 169337, len: 2918 }], method_probability: 0.0 },
        ReducedResult { method: Wild3, pre_sweet_scent_cycle_ranges: [CycleRange { start: 150908, len: 80 }], method_probability: 0.0 },
        ReducedResult { method: Wild3, pre_sweet_scent_cycle_ranges: [CycleRange { start: 155968, len: 80 }], method_probability: 0.0 },
        ReducedResult { method: Wild3, pre_sweet_scent_cycle_ranges: [CycleRange { start: 169257, len: 80 }], method_probability: 0.0 }]
        */
        let expected_results = [
            ResultForTest::new(
                Gen3Method::Wild4,
                0f64,
                &[CycleRange::from_start_len(0, 26394)],
            ),
            ResultForTest::new(Gen3Method::Wild1, 0f64, &[]),
        ];
        println!("{:?}", results);
        assert_eq!(false, true);
        //assert_list_eq!(result, expected_results);
    }
}
