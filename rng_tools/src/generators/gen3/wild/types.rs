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
pub enum Gen3Lead {
    Synchronize(Nature),
    CuteCharm(Gender),
}

#[derive(Clone, Copy, Debug, Eq, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub enum Gen3EncounterType {
    Land,
    Water,
    Fishing,
    RockSmash,
}
