use itertools::{Itertools, iproduct};
use serde::{Deserialize, Serialize};
use tsify_next::Tsify;
use wasm_bindgen::prelude::*;

use super::super::{
    Wild3FeebasState, Wild3GeneratorOptions, Wild3GeneratorResult, Wild3MassOutbreakState,
    Wild3RoamerState, generate_gen3_wild,
};
use crate::{
    AbilityType, Gender, GenderRatio, HiddenPower, Ivs, Nature, PkmFilter, Species,
    gen3::{
        Gen3Lead, Gen3Method, Gen3PkmFilter, SpeciesData, search_wild3_reverse,
        wild::{
            Wild3Action, Wild3EncounterGameData, Wild3EncounterIndex, Wild3MapGameData,
            Wild3SearcherCycleDataByLead, calculate_cycle_data_by_lead,
        },
    },
    gen3_shiny,
    rng::{StateIterator, lcrng::Pokerng},
};

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

impl Wild3MapSetups {
    pub fn get_encounter_species_data(&self, species: Species) -> Option<SpeciesData> {
        let mut encounter_game_datas: Vec<&Wild3EncounterGameData> = vec![];

        encounter_game_datas.extend(
            self.map_data
                .slots_by_action
                .iter()
                .flatten()
                .collect::<Vec<_>>(),
        );

        if let Some(feebas) = self.map_data.feebas.as_ref() {
            encounter_game_datas.push(feebas);
        }
        encounter_game_datas.extend(
            self.map_data
                .mass_outbreaks
                .iter()
                .map(|mass_outbreak| &mass_outbreak.encounter_data),
        );
        encounter_game_datas.extend(
            self.map_data
                .roamers
                .iter()
                .map(|roamer| &roamer.encounter_data),
        );

        for encounter_game_data in encounter_game_datas {
            if encounter_game_data.species_data.species == species {
                return Some(SpeciesData {
                    species,
                    gender_ratio: encounter_game_data.species_data.gender_ratio,
                    is_electric_type: encounter_game_data.species_data.is_electric_type,
                    is_steel_type: encounter_game_data.species_data.is_steel_type,
                });
            }
        }
        None
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
            species: encounter.species_data.species,
            shiny: gen3_shiny(gen_res.pid, gen_opts.tid, gen_opts.sid),
            nature: Nature::from_pid(gen_res.pid),
            ability: AbilityType::from_gen3_pid(gen_res.pid),
            gender: encounter
                .species_data
                .gender_ratio
                .gender_from_pid(gen_res.pid),
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

// Workaround because it's not possible to return Vec<Vec<T>> in wasm
#[derive(Debug, Clone, Default, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct VecWrapperForWasm {
    pub vec: Vec<Wild3SearcherResultMon>,
}

#[wasm_bindgen]
pub fn search_wild3(opts: &Wild3SearcherOptions) -> Vec<VecWrapperForWasm> {
    search_wild3_reverse(opts)
        .into_iter()
        .map(|vec| VecWrapperForWasm { vec })
        .collect_vec()
}

#[path = "searcher_naive.rs"]
pub mod searcher_naive;

#[path = "searcher_reverse.rs"]
pub mod searcher_reverse;
