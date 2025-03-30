use num_enum::FromPrimitive;
use serde::{Deserialize, Serialize};
use tsify_next::Tsify;
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
