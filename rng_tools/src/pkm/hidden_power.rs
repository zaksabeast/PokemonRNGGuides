use super::Ivs;
use super::pokemon_type::PokemonType;
use serde::{Deserialize, Serialize};
use tsify_next::Tsify;

#[derive(Debug, Default, Clone, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct HiddenPowerFilter {
    pub active: bool,
    // TODO: for performance, [bool, POKEMON_TYPE_COUNT] would be better
    pub pokemon_types: Vec<PokemonType>,
    pub min_bp: u8,
    pub max_bp: u8,
}

#[derive(Debug, Clone, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct HiddenPower {
    pub pokemon_type: PokemonType,
    pub bp: u8,
}

impl HiddenPower {
    pub fn from_ivs(ivs: &Ivs) -> Self {
        Self {
            pokemon_type: calculate_hidden_power_type(ivs),
            bp: calculate_hidden_power_bp(ivs),
        }
    }
    pub fn new(pokemon_type: PokemonType, bp: u8) -> Self {
        Self { pokemon_type, bp }
    }
}

pub fn calculate_hidden_power_type(ivs: &Ivs) -> PokemonType {
    let a = ivs.hp & 1;
    let b = ivs.atk & 1;
    let c = ivs.def & 1;
    let d = ivs.spe & 1;
    let e = ivs.spa & 1;
    let f = ivs.spd & 1;
    let formula_from_ivs = (a + 2 * b + 4 * c + 8 * d + 16 * e + 32 * f) as u16;
    let raw_type = (formula_from_ivs * 15 / 63) as u8;
    (raw_type + 1).into() // +1 to skip Normal type
}

pub fn calculate_hidden_power_bp(ivs: &Ivs) -> u8 {
    let a = (ivs.hp & 0b10) >> 1;
    let b = (ivs.atk & 0b10) >> 1;
    let c = (ivs.def & 0b10) >> 1;
    let d = (ivs.spe & 0b10) >> 1;
    let e = (ivs.spa & 0b10) >> 1;
    let f = (ivs.spd & 0b10) >> 1;
    let formula_from_ivs = (a + 2 * b + 4 * c + 8 * d + 16 * e + 32 * f) as u16;
    ((formula_from_ivs * 40 / 63) + 30) as u8
}

pub fn calculate_hidden_power(ivs: &Ivs) -> HiddenPower {
    HiddenPower {
        pokemon_type: calculate_hidden_power_type(ivs),
        bp: calculate_hidden_power_bp(ivs),
    }
}
