use serde::{Deserialize, Serialize};
use tsify_next::Tsify;
use wasm_bindgen::prelude::wasm_bindgen;

use crate::gen3::Gen3EncounterType;

#[derive(Clone, Copy, Debug, Eq, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub enum EncounterSlot {
    Slot0 = 0,
    Slot1 = 1,
    Slot2 = 2,
    Slot3 = 3,
    Slot4 = 4,
    Slot5 = 5,
    Slot6 = 6,
    Slot7 = 7,
    Slot8 = 8,
    Slot9 = 9,
    Slot10 = 10,
    Slot11 = 11,
}

impl EncounterSlot {
    pub fn thresholds_land() -> &'static [(EncounterSlot, u8)] {
        use EncounterSlot::*;
        &[
            (Slot0, 20),
            (Slot1, 40),
            (Slot2, 50),
            (Slot3, 60),
            (Slot4, 70),
            (Slot5, 80),
            (Slot6, 85),
            (Slot7, 90),
            (Slot8, 94),
            (Slot9, 98),
            (Slot10, 99),
            (Slot11, 100),
        ]
    }

    pub fn thresholds_water() -> &'static [(EncounterSlot, u8)] {
        use EncounterSlot::*;
        &[
            (Slot0, 60),
            (Slot1, 60 + 30),
            (Slot2, 60 + 30 + 5),
            (Slot3, 60 + 30 + 5 + 4),
            (Slot4, 60 + 30 + 5 + 4 + 1),
        ]
    }

    pub fn thresholds_rock_smash() -> &'static [(EncounterSlot, u8)] {
        use EncounterSlot::*;
        &[
            (Slot0, 60),
            (Slot1, 60 + 30),
            (Slot2, 60 + 30 + 5),
            (Slot3, 60 + 30 + 5 + 4),
            (Slot4, 60 + 30 + 5 + 4 + 1),
        ]
    }

    pub fn thresholds_old_rod() -> &'static [(EncounterSlot, u8)] {
        use EncounterSlot::*;
        &[(Slot0, 70), (Slot1, 70 + 30)]
    }

    pub fn thresholds_good_rod() -> &'static [(EncounterSlot, u8)] {
        use EncounterSlot::*;
        &[(Slot0, 60), (Slot1, 60 + 20), (Slot2, 60 + 20 + 20)]
    }

    pub fn thresholds_super_rod() -> &'static [(EncounterSlot, u8)] {
        use EncounterSlot::*;
        &[
            (Slot0, 40),
            (Slot1, 40 + 40),
            (Slot2, 40 + 40 + 15),
            (Slot3, 40 + 40 + 15 + 4),
            (Slot4, 40 + 40 + 15 + 4 + 1),
        ]
    }

    pub fn gen3_thresholds(encounter_type: Gen3EncounterType) -> &'static [(EncounterSlot, u8)] {
        match encounter_type {
            Gen3EncounterType::Land => Self::thresholds_land(),
            Gen3EncounterType::Water => Self::thresholds_water(),
            Gen3EncounterType::OldRod => Self::thresholds_old_rod(),
            Gen3EncounterType::GoodRod => Self::thresholds_good_rod(),
            Gen3EncounterType::SuperRod => Self::thresholds_super_rod(),
            Gen3EncounterType::RockSmash => Self::thresholds_rock_smash(),
        }
    }
}

impl EncounterSlot {
    pub fn from_rand(rand: u8, thresholds: &[(EncounterSlot, u8)]) -> Self {
        for (slot, threshold) in thresholds.iter() {
            if rand < *threshold {
                return *slot;
            }
        }
        EncounterSlot::Slot0 // default to Slot0 if below first threshold
    }

    pub fn passes_filter(filter: Option<&[EncounterSlot]>, actual: EncounterSlot) -> bool {
        match filter {
            Some(slots) => slots.contains(&actual),
            None => true,
        }
    }
}
