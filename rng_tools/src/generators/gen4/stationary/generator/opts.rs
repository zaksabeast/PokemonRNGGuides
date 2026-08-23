use super::LeadAbility;
use crate::gen4::Static4Method;
use crate::{Characteristic, PkmFilter, Species};
use serde::{Deserialize, Serialize};
use tsify::Tsify;
use wasm_bindgen::prelude::*;

#[derive(Debug, Clone, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct Gen4StaticOpts {
    pub tid: u16,
    pub sid: u16,
    pub initial_advances: usize,
    pub max_advances: usize,
    pub offset: usize,
    pub filter: PkmFilter,
    pub filter_level: Option<u8>,
    pub filter_characteristic: Option<Characteristic>,
    pub method: Static4Method,
    pub species: Species,
    pub encounter_min_level: u8,
    pub encounter_max_level: u8,
    pub lead: LeadAbility,
    pub seed: u32,
}
