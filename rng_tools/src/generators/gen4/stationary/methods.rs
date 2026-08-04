use crate::Nature;
use serde::{Deserialize, Serialize};
use tsify::Tsify;
use wasm_bindgen::prelude::*;

#[derive(Debug, Clone, Copy, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub enum Static4Method {
    One,
    DpptJ,
    HgssK,
    Honey,
    Radar,
    ShinyRadar,
}

#[derive(Debug, Clone, Copy, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
#[derive(Default)]
pub enum LeadAbility {
    #[default]
    None,
    CutecharmF,
    CutecharmM,
    Synchronize(Nature),
    Pressure,
}
