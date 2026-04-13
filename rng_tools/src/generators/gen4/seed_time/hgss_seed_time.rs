use super::{elm_call::ElmCall, roamers::RoamerLocation};
use crate::RngDateTime;
use serde::{Deserialize, Serialize};
use tsify::Tsify;
use wasm_bindgen::prelude::*;

#[derive(Debug, Clone, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct HgssSeedTime4 {
    pub seed: u32,
    pub datetime: RngDateTime,
    pub delay: u32,
    pub roamer: Vec<RoamerLocation>,
    pub elm: Vec<ElmCall>,
}
