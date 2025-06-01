use super::{Wild3GeneratorOptions, Wild3GeneratorResult, generate_gen3_wild};
use crate::gen3::EncounterSlot;
use crate::gen3::Gen3Lead;
use crate::gen3::Gen3Method;
use crate::rng::StateIterator;
use crate::rng::lcrng::Pokerng;
use crate::{GenderRatio, PkmFilter};
use serde::{Deserialize, Serialize};
use tsify_next::Tsify;
use wasm_bindgen::prelude::*;

#[derive(Debug, Clone, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct Wild3SearcherOptions {
    pub initial_seed: u32,
    pub tid: u16,
    pub sid: u16,
    pub gender_ratio: GenderRatio,
    pub initial_advances: usize,
    pub max_advances: usize,
    pub max_result_count: usize,
    pub filter: PkmFilter,
    pub leads: Vec<Option<Gen3Lead>>,
    pub encounter_slots_by_map: Vec<Option<Vec<EncounterSlot>>>,
    pub methods: Vec<Gen3Method>,
}

fn search_wild3_at_given_advance(
    rng: &mut Pokerng,
    advance: usize,
    opts: &Wild3SearcherOptions,
) -> Vec<Wild3GeneratorResult> {
    let mut results: Vec<Wild3GeneratorResult> = vec![];
    for lead in opts.leads.iter() {
        for (map_idx, encounter_slots) in opts.encounter_slots_by_map.iter().enumerate() {
            for method in opts.methods.iter() {
                let gen_opts = Wild3GeneratorOptions {
                    tid: opts.tid,
                    sid: opts.sid,
                    advance,
                    map_idx,
                    gender_ratio: opts.gender_ratio,
                    encounter_slot: encounter_slots.clone(),
                    method: *method,
                    lead: *lead,
                    filter: opts.filter.clone(),
                };

                if let Some(result) = generate_gen3_wild(rng, &gen_opts) {
                    results.push(result)
                }
            }
        }
    }
    results
}

#[wasm_bindgen]
pub fn search_wild3(opts: &Wild3SearcherOptions) -> Vec<Wild3GeneratorResult> {
    let base_rng = Pokerng::new(opts.initial_seed);
    StateIterator::new(base_rng)
        .enumerate()
        .skip(opts.initial_advances)
        .take(opts.max_advances.wrapping_add(1))
        .flat_map(|(adv, mut rng)| {
            search_wild3_at_given_advance(&mut rng, adv, opts)
        })
        .take(opts.max_result_count)
        .collect::<Vec<Wild3GeneratorResult>>()
}
