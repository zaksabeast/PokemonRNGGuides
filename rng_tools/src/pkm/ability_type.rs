use num_enum::FromPrimitive;
use serde::{Deserialize, Serialize};
use tsify::Tsify;
use wasm_bindgen::prelude::*;

#[derive(Debug, Default, Clone, Copy, PartialEq, FromPrimitive, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
#[repr(u8)]
pub enum AbilityType {
    #[default]
    First = 0,
    Second = 1,
    Hidden = 2,
}

impl AbilityType {
    pub fn from_gen3_pid(pid: u32) -> Self {
        if pid & 1 == 0 {
            AbilityType::First
        } else {
            AbilityType::Second
        }
    }

    #[cfg(test)]
    pub fn from_pokefinder_str(str: &str) -> Self {
        let first = str.split_whitespace().next().unwrap();
        match first {
            "0:" => AbilityType::First,
            "1:" => AbilityType::Second,
            "h:" => AbilityType::Hidden,
            _ => panic!("Unknown ability string: {}", str),
        }
    }
}

#[wasm_bindgen]
pub fn get_ability_type_from_gen3_pid(pid: u32) -> AbilityType {
    AbilityType::from_gen3_pid(pid)
}
