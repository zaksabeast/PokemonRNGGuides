use crate::{Gender, Nature};
use serde::{Deserialize, Serialize};
use tsify_next::Tsify;
use wasm_bindgen::prelude::wasm_bindgen;

#[derive(Clone, Copy, Debug, Eq, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub enum Gen3Method {
    Wild1,
    Wild2,
    Wild4,
}

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
    pub fn thresholds() -> &'static [(EncounterSlot, u8)] {
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
}

impl EncounterSlot {
    pub fn from_rand(rand: u8) -> Self {
        for (slot, threshold) in Self::thresholds() {
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

#[derive(Clone, Copy, Debug, Eq, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub enum Gen3Lead {
    Synchronize(Nature),
    CuteCharm(Gender),
}
