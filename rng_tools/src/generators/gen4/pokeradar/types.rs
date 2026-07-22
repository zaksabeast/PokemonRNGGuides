use serde::{Deserialize, Serialize};
use tsify::Tsify;

#[derive(Clone, Copy, PartialEq, Eq, Debug, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub enum BattleResult {
    Catch,
    Win,
}

#[derive(Clone, Copy, PartialEq, Eq, Debug, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub enum ShakeType {
    Slow,
    Fast,
}

#[derive(Clone, Debug, PartialEq, Eq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct Patch {
    pub ring: i32,
    pub gx: i32,
    pub gz: i32,
    pub continue_chain: bool,
    pub is_shiny: bool,
    pub shake_type: ShakeType,
}

#[derive(Clone, Debug, PartialEq, Eq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct SimulateAdvanceResult {
    pub patches: Vec<Patch>,
    pub seed_after_patch: u32,
}
