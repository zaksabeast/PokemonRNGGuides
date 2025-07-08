use super::Ivs;
use super::pokemon_type::PokemonType;
use serde::{Deserialize, Serialize};
use tsify_next::Tsify;

#[derive(Debug, Clone, PartialEq, Tsify, Serialize, Deserialize)]
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

pub fn calculate_hidden_power_type(ivs: &Ivs) -> PokemonType {
    let a = ivs.hp & 1;
    let b = ivs.atk & 1;
    let c = ivs.def & 1;
    let d = ivs.spe & 1;
    let e = ivs.spa & 1;
    let f = ivs.spd & 1;
    let formula_from_ivs = a + 2 * b + 4 * c + 8 * d + 16 * e + 32 * f;
    let raw_type = formula_from_ivs * 15 / 63;
    (raw_type + 1).into() // Hidden Power types are 1-indexed
}

pub fn calculate_hidden_power_bp(ivs: &Ivs) -> u8 {
    let a = (ivs.hp & 10) >> 1;
    let b = (ivs.atk & 10) >> 1;
    let c = (ivs.def & 10) >> 1;
    let d = (ivs.spe & 10) >> 1;
    let e = (ivs.spa & 10) >> 1;
    let f = (ivs.spd & 10) >> 1;
    let formula_from_ivs = a + 2 * b + 4 * c + 8 * d + 16 * e + 32 * f;
    (formula_from_ivs * 40 / 63) + 30
}

pub fn calculate_hidden_power(ivs: &Ivs) -> HiddenPower {
    HiddenPower {
        pokemon_type: calculate_hidden_power_type(ivs),
        bp: calculate_hidden_power_bp(ivs),
    }
}
