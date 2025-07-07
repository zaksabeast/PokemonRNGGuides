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

pub fn calculate_hidden_power(_ivs: &Ivs) -> HiddenPower {
    //NO_PROD
    HiddenPower {
        pokemon_type: PokemonType::Dark,
        bp: 60,
    }
}
