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
    Slot12 = 12,
}

#[wasm_bindgen]
#[derive(
    Copy, Clone, Debug, Eq, PartialEq, FromPrimitive, IntoPrimitive, Serialize, Deserialize,
)]
#[repr(u8)]
pub enum Gen3Ability {
    Ability0 = 0,
    Ability1 = 1,
}

impl SingleFilter for Gen3Ability {}

#[wasm_bindgen]
#[derive(Copy, Clone, Debug, Eq, PartialEq, Serialize, Deserialize)]
pub enum Gen3Lead {
    Synchronize,
}

impl_display!(Gen3Lead);

#[wasm_bindgen]
#[derive(Copy, Clone, Debug, Eq, PartialEq, Serialize, Deserialize)]
pub enum ShinyType {
    Star,
    Square,
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
