use crate::PkmFilter;
use crate::Species;
use crate::gen4::Static4Method;
use serde::{Deserialize, Serialize};
use tsify::Tsify;
use wasm_bindgen::prelude::*;

#[derive(Debug, Clone, Copy, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub enum Static4LeadInput {
    None,
    CutecharmF,
    CutecharmM,
    Synchronize,
    Pressure,
}

#[derive(Debug, Clone, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct SearchStatic4Opts {
    pub tid: u16,
    pub sid: u16,
    pub species: Species,
    pub filter: PkmFilter,
    pub offset: usize,
    pub encounter_min_level: u8,
    pub encounter_max_level: u8,
    pub min_advance: usize,
    pub max_advance: usize,
    pub min_delay: u32,
    pub max_delay: u32,
    pub year: Option<u32>,
    pub month: Option<u32>,
    pub force_second: Option<u32>,
    pub lead: Static4LeadInput,
    pub method: Static4Method,
}
