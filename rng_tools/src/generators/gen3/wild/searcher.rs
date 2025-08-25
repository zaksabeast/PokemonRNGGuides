use super::{
    Wild3FeebasState, Wild3GeneratorOptions, Wild3GeneratorResult, Wild3MassOutbreakState,
    Wild3RoamerState, generate_gen3_wild,
};
use crate::gen3::{
    Gen3Lead, Gen3Method, Gen3PkmFilter, Wild3Action, Wild3EncounterGameData, Wild3EncounterIndex,
    Wild3MapGameData, Wild3SearcherCycleDataByLead, calculate_cycle_data_by_lead,
};
use crate::rng::StateIterator;
use crate::rng::lcrng::Pokerng;
use crate::{
    AbilityType, Gender, GenderRatio, HiddenPower, Ivs, Nature, PkmFilter, Species, gen3_shiny,
};
use itertools::iproduct;
use serde::{Deserialize, Serialize};
use tsify_next::Tsify;
use wasm_bindgen::prelude::*;

#[derive(Debug, Clone, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct Wild3MapSetups {
    pub map_data: Wild3MapGameData,
    pub actions: Vec<Wild3Action>,
    pub roamer_states: Vec<Wild3RoamerState>,
    pub mass_outbreak_states: Vec<Wild3MassOutbreakState>,
    pub feebas_states: Vec<Wild3FeebasState>,
}

impl Default for Wild3MapSetups {
    fn default() -> Self {
        Self {
            map_data: Wild3MapGameData::default(),
            actions: vec![Wild3Action::SweetScentLand],
            roamer_states: vec![Wild3RoamerState::Inactive],
            mass_outbreak_states: vec![Wild3MassOutbreakState::Inactive],
            feebas_states: vec![Wild3FeebasState::NotInMap],
        }
    }
}

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
    pub gen3_filter: Gen3PkmFilter,
    pub leads: Vec<Gen3Lead>,
    pub map_setups: Vec<Wild3MapSetups>,
    pub methods: Vec<Gen3Method>,
    pub consider_cycles: bool,
    pub consider_rng_manipulated_lead_pid: bool,
    pub generate_even_if_impossible: bool,
}

impl Default for Wild3SearcherOptions {
    fn default() -> Self {
        Self {
            initial_seed: 0,
            tid: 0,
            sid: 0,
            gender_ratio: GenderRatio::default(),
            initial_advances: 0,
            max_advances: 0,
            max_result_count: 0,
            filter: PkmFilter::default(),
            gen3_filter: Gen3PkmFilter::default(),
            leads: vec![],
            map_setups: vec![Wild3MapSetups::default()],
            methods: vec![],
            consider_cycles: false,
            consider_rng_manipulated_lead_pid: false,
            generate_even_if_impossible: false,
        }
    }
}

#[derive(Debug, Clone, Default, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct Wild3SearcherResultMon {
    pub pid: u32,
    pub ivs: Ivs,
    pub method: Gen3Method,
    pub encounter_idx: Wild3EncounterIndex,
    pub lvl: u8,

    pub cycle_data_by_lead: Option<Wild3SearcherCycleDataByLead>,

    pub species: Species,

    // derived from pid
    pub ability: AbilityType,
    pub gender: Gender,
    pub nature: Nature,
    pub shiny: bool,

    // derived from ivs
    pub hidden_power: HiddenPower,

    // from generator options
    pub advance: usize,
    pub lead: Gen3Lead,
    pub map_idx: usize,
    pub action: Wild3Action,
    pub roamer_state: Wild3RoamerState,
    pub feebas_state: Wild3FeebasState,
    pub mass_outbreak_state: Wild3MassOutbreakState,
}

impl Wild3SearcherResultMon {
    pub fn new(
        gen_res: &Wild3GeneratorResult,
        gen_opts: &Wild3GeneratorOptions,
        advance: usize,
        encounter: &Wild3EncounterGameData,
    ) -> Wild3SearcherResultMon {
        let cycle_data_by_lead = match gen_res.cycle_range {
            Some(cycle_range) => {
                let is_egg = matches!(gen_opts.lead, Gen3Lead::Egg);
                Some(calculate_cycle_data_by_lead(&cycle_range, is_egg))
            }
            _ => None,
        };

        Wild3SearcherResultMon {
            pid: gen_res.pid,
            ivs: gen_res.ivs,
            method: gen_res.method,
            encounter_idx: gen_res.encounter_idx,
            lvl: gen_res.lvl,
            cycle_data_by_lead,
            species: encounter.species,
            shiny: gen3_shiny(gen_res.pid, gen_opts.tid, gen_opts.sid),
            nature: Nature::from_pid(gen_res.pid),
            ability: AbilityType::from_gen3_pid(gen_res.pid),
            gender: encounter.gender_ratio.gender_from_pid(gen_res.pid),
            hidden_power: HiddenPower::from_ivs(&gen_res.ivs),
            advance,
            map_idx: gen_opts.map_idx,
            lead: gen_opts.lead,
            action: gen_opts.action,
            roamer_state: gen_opts.roamer_state,
            feebas_state: gen_opts.feebas_state,
            mass_outbreak_state: gen_opts.mass_outbreak_state,
        }
    }
}

fn search_wild3_at_given_advance(
    rng: Pokerng,
    advance: usize,
    opts: &Wild3SearcherOptions,
) -> Vec<Wild3SearcherResultMon> {
    let mut results: Vec<Wild3SearcherResultMon> = vec![];

    let lead_encounter_products = iproduct!(opts.leads.iter(), opts.map_setups.iter().enumerate());

    for (lead, (map_idx, map_setups)) in lead_encounter_products {
        let map_state_products = iproduct!(
            &map_setups.actions,
            &map_setups.roamer_states,
            &map_setups.mass_outbreak_states,
            &map_setups.feebas_states
        );
        for (action, roamer_state, mass_outbreak_state, feebas_state) in map_state_products {
            let gen_opts = Wild3GeneratorOptions {
                tid: opts.tid,
                sid: opts.sid,
                map_idx,
                action: *action,
                methods: opts.methods.clone(),
                lead: *lead,
                filter: opts.filter.clone(),
                consider_cycles: opts.consider_cycles,
                consider_rng_manipulated_lead_pid: opts.consider_rng_manipulated_lead_pid,
                generate_even_if_impossible: opts.generate_even_if_impossible,
                gen3_filter: opts.gen3_filter.clone(),
                roamer_state: *roamer_state,
                mass_outbreak_state: *mass_outbreak_state,
                feebas_state: *feebas_state,
            };

            generate_gen3_wild(rng, &gen_opts, &map_setups.map_data)
                .0
                .iter()
                .for_each(|gen_res| {
                    let encounter = map_setups
                        .map_data
                        .get_encounter(gen_opts.action, gen_res.encounter_idx)
                        .unwrap();
                    results.push(Wild3SearcherResultMon::new(
                        gen_res, &gen_opts, advance, encounter,
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
