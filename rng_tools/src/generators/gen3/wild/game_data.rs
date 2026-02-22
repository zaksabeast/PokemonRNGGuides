use serde::{Deserialize, Serialize};
use tsify_next::Tsify;
use wasm_bindgen::prelude::*;

use super::Wild3Action;
use crate::{EncounterSlot, GenderRatio, Species};

#[derive(Debug, Default, Clone, Copy, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
#[repr(u8)]
pub enum Wild3RoamerState {
    #[default]
    Inactive,
    ActiveNotInMap,
    ActiveInMapLatios,
    ActiveInMapLatias,
}

#[derive(Debug, Default, Clone, Copy, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
#[repr(u8)]
pub enum Wild3MassOutbreakState {
    #[default]
    Inactive,
    ActiveNotInMap,
    Route102Seedot,
    Route114Nuzleaf,
    Route117Seedot,
    Route120Seedot,
    Route116SkittyLvl8,
    Route116SkittyLvl15,
    Route102Surkit,
    Route114Surkit,
    Route117Surkit,
    Route120Surkit,
}

#[derive(Debug, Default, Clone, Copy, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
#[repr(u8)]
pub enum Wild3FeebasState {
    #[default]
    NotInMap,
    OnFeebasTile,
    InMapButNotOnFeebasTile,
}

#[derive(Debug, Clone, Default, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct Wild3EncounterGameData {
    pub min_level: u8,
    pub max_level: u8,
    pub species_data: SpeciesData,
}

#[derive(Debug, Clone, Default, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct SpeciesData {
    pub species: Species,
    pub gender_ratio: GenderRatio,
    pub is_electric_type: bool,
    pub is_steel_type: bool,
    // TODO for caughtMon searcher: stats
}

#[derive(Debug, Copy, Clone, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub enum Wild3EncounterIndex {
    Slot(EncounterSlot),
    Roamer(Wild3RoamerState),
    MassOutbreak(Wild3MassOutbreakState),
    Feebas,
}

impl Default for Wild3EncounterIndex {
    fn default() -> Self {
        Wild3EncounterIndex::Slot(EncounterSlot::Slot0)
    }
}

#[derive(Debug, Clone, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct Wild3MapGameData {
    pub map_id: String,
    pub slots_by_action: Vec<Vec<Wild3EncounterGameData>>,
    pub roamers: Vec<Wild3SpecialEncounterGameData<Wild3RoamerState>>,
    pub mass_outbreaks: Vec<Wild3SpecialEncounterGameData<Wild3MassOutbreakState>>,
    pub feebas: Option<Wild3EncounterGameData>,
}

#[derive(Debug, Default, Clone, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct Wild3SpecialEncounterGameData<T> {
    pub id: T,
    pub encounter_data: Wild3EncounterGameData,
}

impl Wild3MapGameData {
    pub fn get_encounter(
        &self,
        action: Wild3Action,
        encounter_idx: Wild3EncounterIndex,
    ) -> Option<&Wild3EncounterGameData> {
        match encounter_idx {
            Wild3EncounterIndex::Feebas => self.feebas.as_ref(),
            Wild3EncounterIndex::Roamer(state) => {
                let val = self.roamers.iter().find(|roamer| roamer.id == state);
                match val {
                    None => None,
                    Some(roamer) => Some(&roamer.encounter_data),
                }
            }
            Wild3EncounterIndex::MassOutbreak(state) => {
                let val = self
                    .mass_outbreaks
                    .iter()
                    .find(|mass_outbreak| mass_outbreak.id == state);
                match val {
                    None => None,
                    Some(mass_outbreak) => Some(&mass_outbreak.encounter_data),
                }
            }
            Wild3EncounterIndex::Slot(idx) => {
                let slots = self.slots_by_action.get(action as usize);
                match slots {
                    None => None,
                    Some(slots) => slots.get(idx as usize),
                }
            }
        }
    }
}

impl Default for Wild3MapGameData {
    fn default() -> Self {
        Self {
            slots_by_action: (0..=Wild3Action::RockSmash as usize)
                .map(|_i| {
                    (0..=EncounterSlot::Slot11 as usize)
                        .map(|_i| Wild3EncounterGameData::default())
                        .collect::<Vec<_>>()
                })
                .collect::<Vec<_>>(),
            map_id: String::default(),
            roamers: vec![],
            feebas: None,
            mass_outbreaks: vec![],
        }
    }
}
