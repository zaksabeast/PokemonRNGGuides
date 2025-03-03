mod celebi;
mod poke;
mod researcher;
mod starter;

use poke::SpecialTrait;
use serde::{Deserialize, Serialize};
use tsify_next::Tsify;
use wasm_bindgen::prelude::*;

#[derive(Debug, Clone, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct Gen2Spread {
    pub state: u16,
    pub advance: usize,
    pub shiny: bool,
    pub max_dv: bool,
}

#[derive(Debug, Clone, Copy, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub enum Gen2PokeFilter {
    Any,
    Shiny,
    MaxDv,
}

impl PartialEq<SpecialTrait> for Gen2PokeFilter {
    fn eq(&self, other: &SpecialTrait) -> bool {
        matches!(
            (self, other),
            (Gen2PokeFilter::Shiny, SpecialTrait::Shiny)
                | (Gen2PokeFilter::MaxDv, SpecialTrait::MaxDv)
                | (Gen2PokeFilter::Any, SpecialTrait::Shiny)
                | (Gen2PokeFilter::Any, SpecialTrait::MaxDv)
        )
    }
}
