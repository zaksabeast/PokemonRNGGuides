use wasm_bindgen::prelude::wasm_bindgen;

#[wasm_bindgen]
#[derive(Copy, Clone, Debug, Eq, PartialEq)]
pub enum Gen3Method {
    H1,
    H2,
    H4,
}

#[wasm_bindgen]
#[derive(Copy, Clone, Debug, Eq, PartialEq)]
#[repr(u8)]
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

    pub fn passes_filter(filter: Option<EncounterSlot>, actual: EncounterSlot) -> bool {
        match filter {
            Some(desired) => desired == actual,
            None => true,
        }
    }
}

#[wasm_bindgen]
#[derive(Copy, Clone, Debug, Eq, PartialEq)]
#[repr(u8)]
pub enum Gen3Ability {
    Ability0 = 0,
    Ability1 = 1,
}

impl Gen3Ability {
    pub fn from_pid(pid: u32) -> Self {
        if pid & 1 == 0 {
            Gen3Ability::Ability0
        } else {
            Gen3Ability::Ability1
        }
    }
}

impl SingleFilter for Gen3Ability {}
impl MultiFilter for EncounterSlot {}
impl MultiFilter for ShinyType {}

#[wasm_bindgen]
#[derive(Copy, Clone, Debug, Eq, PartialEq)]
pub enum Gen3Lead {
    Synchronize,
}

#[wasm_bindgen]
#[derive(Copy, Clone, Debug, Eq, PartialEq)]
pub enum ShinyType {
    Star,
    Square,
    NotShiny,
}

pub trait SingleFilter: Sized + PartialEq {
    fn passes_filter(filter: Option<Self>, value: Self) -> bool {
        filter.map(|filter| filter == value).unwrap_or(true)
    }
}

pub trait MultiFilter: Sized + PartialEq {
    fn passes_filter(filter: &[Self], value: Option<Self>) -> bool {
        if filter.len() == 0 {
            return true;
        }

        value
            .map(|value| filter.contains(&value))
            .unwrap_or_default()
    }
}
