use serde::{Deserialize, Serialize};
use tsify::Tsify;
use wasm_bindgen::prelude::*;

use super::vblank_calibration::calibration_model;
use super::{
    MOST_PROBABLE_PRE_SWEET_SCENT_CYCLE, MinMidMax, VBLANK_FREQ, Wild3Action,
    Wild3MapCycleCalibration, Wild3MovementMode, Wild3Weather,
};
use crate::{EncounterSlot, GenderRatio, Nature, PokemonType, Species};

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

#[derive(Debug, Clone, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub enum Wild3SafariPokeblockGenOpt {
    Specific([u8; 5]), // Spicy, Dry, Sweet, Bitter, Sour
    ForSearching {
        wanted_nature: Nature,
        consider_all_safari_pokeblocks: bool,
    },
}

#[derive(Debug, Clone, Default, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct Wild3EncounterGameData {
    pub min_level: u8,
    pub max_level: u8,
    pub species_data: SpeciesData,
}

#[derive(Debug, Clone, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct SpeciesData {
    pub species: Species,
}

impl Default for SpeciesData {
    fn default() -> Self {
        Self {
            species: Species::Shuckle,
        } // Must have GenderRatio::OneToOne, not be electric nor steel type.
    }
}

impl SpeciesData {
    pub fn gender_ratio(&self) -> GenderRatio {
        self.species.gender_ratio()
    }
    pub fn is_electric_type(&self) -> bool {
        self.species
            .personal()
            .types
            .contains(&PokemonType::Electric)
    }
    pub fn is_steel_type(&self) -> bool {
        self.species.personal().types.contains(&PokemonType::Steel)
    }
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
    pub map_internal_idx: usize,
    pub slots_by_action: Vec<Vec<Wild3EncounterGameData>>,
    pub roamers: Vec<Wild3SpecialEncounterGameData<Wild3RoamerState>>,
    pub mass_outbreaks: Vec<Wild3SpecialEncounterGameData<Wild3MassOutbreakState>>,
    pub feebas: Option<Wild3EncounterGameData>,
    pub rock_smash_rate: u32,
    pub is_safari: bool,
    pub actions_with_safari_pokeblock: Vec<Wild3Action>, // Not all actions have a pokeblock feeder nearby
    pub vblank_distrs: Vec<Wild3MapCycleCalibration>,
}

#[derive(Debug, Default, Clone, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct Wild3SpecialEncounterGameData<T> {
    pub id: T,
    pub encounter_data: Wild3EncounterGameData,
}

#[wasm_bindgen]
pub fn get_encounter_for_wild3_map_game_data(
    map_data: Wild3MapGameData,
    action: Wild3Action,
    encounter_idx: Wild3EncounterIndex,
) -> Option<Wild3EncounterGameData> {
    map_data.get_encounter(action, encounter_idx).cloned()
}

impl Wild3MapGameData {
    pub fn get_initial_cycle_distrs(
        &self,
        action: Wild3Action,
        consider_weather: bool,
        consider_bike: bool,
    ) -> Vec<&Wild3MapCycleCalibration> {
        self.vblank_distrs
            .iter()
            .filter(|calibration| {
                calibration.action == action
                    && (consider_weather || calibration.weather == Wild3Weather::Sunny)
                    && (consider_bike || calibration.movement == Wild3MovementMode::OnFoot)
            })
            .collect()
    }

    pub fn get_min_max_initial_cycle_from_distrs(
        &self,
        distrs: [&Wild3MapCycleCalibration],
    ) -> (usize, usize) {
        distrs
            .iter()
            .map(|calibration| (calibration.min, calibration.max))
            .reduce(|(min, max), (next_min, next_max)| (min.min(next_min), max.max(next_max)))
            .unwrap_or((0, VBLANK_FREQ - 1)) //NO_PROD
    }

    pub fn get_min_max_initial_cycle(
        &self,
        action: Wild3Action,
        movement: Wild3MovementMode,
        weather: Wild3Weather,
    ) -> (usize, usize) {
        calibration_model(action, self, movement, weather)
            .map(|model| (model.min, model.max))
            .unwrap_or((0, 0)) //NO_PROD
    }

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
        #[cfg(test)]
        let vblank_distrs = [
            Wild3Action::SweetScentLand,
            Wild3Action::SweetScentWater,
            Wild3Action::OldRod,
            Wild3Action::GoodRod,
            Wild3Action::SuperRod,
            Wild3Action::RockSmash,
        ]
        .into_iter()
        .map(|action| {
            let movement = if action == Wild3Action::SweetScentWater {
                Wild3MovementMode::Surf
            } else {
                Wild3MovementMode::OnFoot
            };

            Wild3MapCycleCalibration {
                action,
                movement,
                ..Wild3MapCycleCalibration::new_dummy()
            }
        })
        .collect();

        #[cfg(not(test))]
        let vblank_distrs = vec![];

        Self {
            vblank_distrs,
            slots_by_action: (0..=Wild3Action::RockSmash as usize)
                .map(|_i| {
                    (0..=EncounterSlot::Slot11 as usize)
                        .map(|_i| Wild3EncounterGameData::default())
                        .collect::<Vec<_>>()
                })
                .collect::<Vec<_>>(),
            map_id: String::default(),
            map_internal_idx: 0,
            roamers: vec![],
            feebas: None,
            mass_outbreaks: vec![],
            rock_smash_rate: 20,
            is_safari: false,
            actions_with_safari_pokeblock: vec![],
        }
    }
}
