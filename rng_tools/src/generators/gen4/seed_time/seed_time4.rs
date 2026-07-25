use crate::RngDateTime;
use serde::{Deserialize, Serialize};
use tsify::Tsify;
use wasm_bindgen::prelude::*;

#[derive(Debug, Clone, Eq, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct SeedTime4 {
    pub seed: u32,
    pub datetime: RngDateTime,
    pub delay: u32,
}

impl SeedTime4 {
    pub fn new(seed: u32, datetime: RngDateTime, delay: u32) -> Self {
        Self {
            seed,
            datetime,
            delay,
        }
    }
}
