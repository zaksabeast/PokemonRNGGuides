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

#[wasm_bindgen]
pub fn generate_gen3_wild_distribution(
    initial_seed: u32,
    opts: &Wild3GeneratorOptions,
    game_data: &Wild3EncounterTable,
    lead_cycle_speed: usize,
) -> Vec<Wild3MethodDistributionResult> {
    assert_eq!(opts.consider_cycles, true);
    assert_eq!(opts.generate_even_if_impossible, true);
    assert_eq!(
        opts.methods,
        vec![
            Gen3Method::Wild1,
            Gen3Method::Wild2,
            Gen3Method::Wild3,
            Gen3Method::Wild4,
            Gen3Method::Wild5
        ]
    );

    let mut rng = Pokerng::new(initial_seed);
    rng.advance(opts.advance);

    let gen_results = generate_gen3_wild(rng, opts, game_data);
    let search_results = gen_results
        .iter()
        .map(|gen_res| {
            let gender_ratio = game_data.slots[gen_res.encounter_slot as usize].gender_ratio;
            Wild3SearcherResultMon::new(
                gen_res,
                opts.tid,
                opts.sid,
                gender_ratio,
                opts.advance,
                0,
                opts.lead,
            )
        })
        .sorted_by(|lhs, rhs| {
            // sort in ascending order by pre_range.start.
            // pre_range.start is based on post_range.end()
            let lhs_start = lhs
                .cycle_data_by_lead
                .as_ref()
                .unwrap()
                .post_sweet_scent_range
                .end()
                .cycle;
            let rhs_start = rhs
                .cycle_data_by_lead
                .as_ref()
                .unwrap()
                .post_sweet_scent_range
                .end()
                .cycle;
            rhs_start.cmp(&lhs_start)
        })
        .collect::<Vec<_>>();

    search_results
        .iter()
        .enumerate()
        .map(|(i, searcher_res)| {
            let cycle_data = calculate_cycle_data(
                &searcher_res
                    .cycle_data_by_lead
                    .as_ref()
                    .unwrap()
                    .post_sweet_scent_range,
                lead_cycle_speed,
            );

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
                println!(
                    "cycle_data: {} {}",
                    cycle_data.pre_sweet_scent_cycle_range.start,
                    cycle_data.pre_sweet_scent_cycle_range.end()
                );

                // We must exclude Wild3 ranges and probability
                // Ex: Wild5={ranges:[[20,30]], probability: 0.10} followed by Wild3={ranges:[25,26], probability: 0.01}
                // Result: Wild5={ranges:[[20,25],[26,30]], probability: 0.09}
                let mut pre_sweet_scent_cycle_ranges: Vec<CycleRange<usize>> =
                    vec![CycleRange::<usize> {
                        start: cycle_data.pre_sweet_scent_cycle_range.start,
                        len: 0,
                    }];
                let mut method_probability = cycle_data.method_probability;

                for other_res_idx in i + 1..search_results.len() {
                    let other_res = &search_results[other_res_idx];
                    if other_res.method != Gen3Method::Wild3 {
                        break;
                    }
                    let other_cycle_data = calculate_cycle_data(
                        &other_res
                            .cycle_data_by_lead
                            .as_ref()
                            .unwrap()
                            .post_sweet_scent_range,
                        lead_cycle_speed,
                    );

                    pre_sweet_scent_cycle_ranges
                        .last_mut()
                        .unwrap()
                        .set_end(other_cycle_data.pre_sweet_scent_cycle_range.start);

                    pre_sweet_scent_cycle_ranges.push(CycleRange::<usize> {
                        start: other_cycle_data.pre_sweet_scent_cycle_range.end(),
                        len: 0,
                    });

                    method_probability -= other_cycle_data.method_probability;
                }

                pre_sweet_scent_cycle_ranges
                    .last_mut()
                    .unwrap()
                    .set_end(cycle_data.pre_sweet_scent_cycle_range.end());

                println!("res: {:?}", pre_sweet_scent_cycle_ranges);

                pre_sweet_scent_cycle_ranges.retain(|res| res.len > 0);

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
    use super::*;

    use crate::{HiddenPower, PokemonType, assert_list_eq};

    use crate::gen3::{Gen3Lead, Gen3Method, Wild3EncounterTable, Wild3SearcherResultMon};
    use crate::{AbilityType, EncounterSlot, Gender, Ivs, Nature};

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
        let result =
            generate_gen3_wild_distribution(0, &opts, &Wild3EncounterTable::default(), 775);

        let expected_results = [Wild3MethodDistributionResult {
            searcher_res: Wild3SearcherResultMon {
                advance: 1,
                map_idx: 0,
                encounter_slot: EncounterSlot::Slot0,
                cycle_data_by_lead: None,
                pid: 0xFC3367DB,
                shiny: false,
                nature: Nature::Bold,
                ability: AbilityType::Second,
                ivs: Ivs::new(12, 25, 27, 2, 31, 30),
                gender: Gender::Male,
                method: Gen3Method::Wild1,
                lead: Gen3Lead::Vanilla,
                hidden_power: HiddenPower::new(PokemonType::Water, 68),
            },
            pre_sweet_scent_cycle_ranges: vec![],
            method_probability: 0f64,
        }];
        println!("{:?}", result);
        assert_eq!(false, true);
        //assert_list_eq!(result, expected_results);
    }
}
