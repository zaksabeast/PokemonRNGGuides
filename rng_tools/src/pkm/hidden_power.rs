use super::pokemon_type::POKEMON_TYPE_COUNT;
use serde::{Deserialize, Serialize};
use tsify_next::Tsify;

#[derive(Debug, Clone, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct HiddenPowerFilter {
    pub pokemon_types: [bool; POKEMON_TYPE_COUNT],
    pub min_bp: u8,
    pub max_bp: u8,
}
