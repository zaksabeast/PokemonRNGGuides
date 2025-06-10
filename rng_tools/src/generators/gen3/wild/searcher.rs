use super::{Wild3GeneratorOptions, Wild3GeneratorResult, generate_gen3_wild};
use crate::gen3::{Gen3Lead, Gen3Method};
use crate::rng::StateIterator;
use crate::rng::lcrng::Pokerng;
use crate::{AbilityType, EncounterSlot, Gender, GenderRatio, Ivs, Nature, PkmFilter, gen3_shiny};
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

#[derive(Debug, Clone, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct Wild3SearcherResultMon {
    pub pid: u32,
    pub ivs: Ivs,
    pub method: Gen3Method,
    pub encounter_slot: EncounterSlot,

    // derived from pid
    pub ability: AbilityType,
    pub gender: Gender,
    pub nature: Nature,
    pub shiny: bool,

    // derived from searcher context
    pub advance: usize,
    pub lead: Option<Gen3Lead>,
    pub map_idx: usize,
}

impl Wild3SearcherResultMon {
    pub fn new(
        gen_res: &Wild3GeneratorResult,
        opts: &Wild3SearcherOptions,
        advance: usize,
        map_idx: usize,
        lead: Option<Gen3Lead>,
    ) -> Wild3SearcherResultMon {
        Wild3SearcherResultMon {
            pid: gen_res.pid,
            ivs: gen_res.ivs,
            method: gen_res.method,
            encounter_slot: gen_res.encounter_slot,

            shiny: gen3_shiny(gen_res.pid, opts.tid, opts.sid),
            nature: Nature::from_pid(gen_res.pid),
            ability: AbilityType::from_gen3_pid(gen_res.pid),
            gender: opts.gender_ratio.gender_from_pid(gen_res.pid),

            advance,
            map_idx,
            lead,
        }
    }
}

fn search_wild3_at_given_advance(
    rng: &mut Pokerng,
    advance: usize,
    opts: &Wild3SearcherOptions,
) -> Vec<Wild3SearcherResultMon> {
    let mut results: Vec<Wild3SearcherResultMon> = vec![];
    for lead in opts.leads.iter() {
        for (map_idx, encounter_slots) in opts.encounter_slots_by_map.iter().enumerate() {
            let gen_opts = Wild3GeneratorOptions {
                tid: opts.tid,
                sid: opts.sid,
                advance,
                map_idx,
                gender_ratio: opts.gender_ratio,
                encounter_slot: encounter_slots.clone(),
                methods: opts.methods.clone(),
                lead: *lead,
                filter: opts.filter.clone(),
            };

            generate_gen3_wild(rng, &gen_opts)
                .iter()
                .for_each(|gen_res| {
                    results.push(Wild3SearcherResultMon::new(
                        gen_res, opts, advance, map_idx, *lead,
                    ));
                });
        }
    }
    results
}

#[wasm_bindgen]
pub fn search_wild3(opts: &Wild3SearcherOptions) -> Vec<Wild3SearcherResultMon> {
    let base_rng = Pokerng::new(opts.initial_seed);
    StateIterator::new(base_rng)
        .enumerate()
        .skip(opts.initial_advances)
        .take(opts.max_advances.wrapping_add(1))
        .flat_map(|(adv, mut rng)| search_wild3_at_given_advance(&mut rng, adv, opts))
        .take(opts.max_result_count)
        .collect::<Vec<Wild3SearcherResultMon>>()
}
