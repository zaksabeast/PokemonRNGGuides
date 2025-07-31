use super::{Wild3GeneratorOptions, Wild3GeneratorResult, generate_gen3_wild};
use crate::gen3::{
    Gen3Lead, Gen3Method, Gen3PkmFilter, Wild3EncounterTable, 
    Wild3SearcherCycleDataByLead, calculate_cycle_data_by_lead,
};
use crate::rng::lcrng::Pokerng;
use crate::rng::{StateIterator};
use crate::{
    AbilityType, EncounterSlot, Gender, GenderRatio, HiddenPower, Ivs, Nature, PkmFilter,
    gen3_shiny,
};
use serde::{Deserialize, Serialize};
use tsify_next::Tsify;
use wasm_bindgen::prelude::*;

#[derive(Debug, Clone, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct Gen3EncounterInfo {
    pub encounter_table: Wild3EncounterTable,
    pub slots: Option<Vec<EncounterSlot>>,
}

#[derive(Debug, Clone, Default, PartialEq, Tsify, Serialize, Deserialize)]
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
    pub gen3_filter: Gen3PkmFilter,
    pub leads: Vec<Gen3Lead>,
    pub encounter_info_by_map: Vec<Gen3EncounterInfo>,
    pub methods: Vec<Gen3Method>,
    pub consider_cycles: bool,
    pub consider_rng_manipulated_lead_pid: bool,
    pub generate_even_if_impossible: bool,
}

#[derive(Debug, Clone, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct Wild3SearcherResultMon {
    pub pid: u32,
    pub ivs: Ivs,
    pub method: Gen3Method,
    pub encounter_slot: EncounterSlot,

    pub cycle_data_by_lead: Option<Wild3SearcherCycleDataByLead>,

    // derived from pid
    pub ability: AbilityType,
    pub gender: Gender,
    pub nature: Nature,
    pub shiny: bool,

    // derived from ivs
    pub hidden_power: HiddenPower,

    // derived from searcher context
    pub advance: usize,
    pub lead: Gen3Lead,
    pub map_idx: usize,
}

impl Wild3SearcherResultMon {
    pub fn new(
        gen_res: &Wild3GeneratorResult,
        tid: u16,
        sid: u16,
        gender_ratio: GenderRatio,
        advance: usize,
        map_idx: usize,
        lead: Gen3Lead,
    ) -> Wild3SearcherResultMon {
        let cycle_data_by_lead = match gen_res.cycle_range {
            Some(cycle_range) => {
                let is_egg = matches!(lead, Gen3Lead::Egg);
                Some(calculate_cycle_data_by_lead(&cycle_range, is_egg))
            }
            _ => None,
        };

        Wild3SearcherResultMon {
            pid: gen_res.pid,
            ivs: gen_res.ivs,
            method: gen_res.method,
            encounter_slot: gen_res.encounter_slot,
            cycle_data_by_lead,
            shiny: gen3_shiny(gen_res.pid, tid, sid),
            nature: Nature::from_pid(gen_res.pid),
            ability: AbilityType::from_gen3_pid(gen_res.pid),
            gender: gender_ratio.gender_from_pid(gen_res.pid),
            hidden_power: HiddenPower::from_ivs(&gen_res.ivs),
            advance,
            map_idx,
            lead,
        }
    }
}

fn search_wild3_at_given_advance(
    rng: Pokerng,
    advance: usize,
    opts: &Wild3SearcherOptions,
) -> Vec<Wild3SearcherResultMon> {
    let mut results: Vec<Wild3SearcherResultMon> = vec![];
    for lead in opts.leads.iter() {
        for (map_idx, encounter_info) in opts.encounter_info_by_map.iter().enumerate() {
            let gen_opts = Wild3GeneratorOptions {
                tid: opts.tid,
                sid: opts.sid,
                advance,
                map_idx,
                encounter_slot: encounter_info.slots.clone(),
                methods: opts.methods.clone(),
                lead: *lead,
                filter: opts.filter.clone(),
                consider_cycles: opts.consider_cycles,
                consider_rng_manipulated_lead_pid: opts.consider_rng_manipulated_lead_pid,
                generate_even_if_impossible: opts.generate_even_if_impossible,
                gen3_filter: opts.gen3_filter.clone(),
            };

            generate_gen3_wild(rng, &gen_opts, &encounter_info.encounter_table)
                .iter()
                .for_each(|gen_res| {
                    let gender_ratio = encounter_info.encounter_table.slots
                        [gen_res.encounter_slot as usize]
                        .gender_ratio;
                    results.push(Wild3SearcherResultMon::new(
                        gen_res,
                        opts.tid,
                        opts.sid,
                        gender_ratio,
                        advance,
                        map_idx,
                        *lead,
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
        .flat_map(|(adv, rng)| search_wild3_at_given_advance(rng, adv, opts))
        .take(opts.max_result_count)
        .collect::<Vec<Wild3SearcherResultMon>>()
}
