use super::{
    Gen3EncounterType,
};
use crate::{EncounterSlot, GenderRatio, Species};
use serde::{Deserialize, Serialize};
use tsify_next::Tsify;
use wasm_bindgen::prelude::*;

#[derive(Debug, Clone, Default, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct Wild3EncounterSlotInfo {
    pub min_level: u8,
    pub max_level: u8,
    pub species: Species,
    pub gender_ratio: GenderRatio,
    pub is_electric_type: bool,
    pub is_steel_type: bool,
}

#[derive(Debug, Clone, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct Wild3EncounterTable {
    pub map_id: String,
    pub encounter_type: Gen3EncounterType,
    pub slots: Vec<Wild3EncounterSlotInfo>,
}

impl Default for Wild3EncounterTable {
    fn default() -> Self {
        Self {
            slots: (0..=EncounterSlot::Slot11 as usize)
                .map(|_i| Wild3EncounterSlotInfo::default())
                .collect::<Vec<_>>(),
            map_id: String::default(),
            encounter_type: Gen3EncounterType::default(),
        }
    }
}
