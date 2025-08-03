
use serde::{Deserialize, Serialize};
use tsify_next::Tsify;
use wasm_bindgen::prelude::*;

#[derive(Debug, Clone, Default, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct Gen3PidSpeedFilter {
    pub active: bool,
    pub min_cycle_count: usize,
    pub max_cycle_count: usize,
}

#[derive(Debug, Clone, Default, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct Gen3PkmFilter {
    pub max_size: bool,
    pub pid_speed: Gen3PidSpeedFilter,
}
