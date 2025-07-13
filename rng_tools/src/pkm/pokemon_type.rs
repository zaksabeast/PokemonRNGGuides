use num_enum::FromPrimitive;
use serde::{Deserialize, Serialize};
use tsify_next::Tsify;

#[derive(
    Default, Clone, Copy, Debug, Eq, PartialEq, FromPrimitive, Tsify, Serialize, Deserialize,
)]
#[tsify(into_wasm_abi, from_wasm_abi)]
#[repr(u8)]
pub enum PokemonType {
    #[default]
    Normal = 0,
    Fighting = 1,
    Flying = 2,
    Poison = 3,
    Ground = 4,
    Rock = 5,
    Bug = 6,
    Ghost = 7,
    Steel = 8,
    Fire = 9,
    Water = 10,
    Grass = 11,
    Electric = 12,
    Psychic = 13,
    Ice = 14,
    Dragon = 15,
    Dark = 16,
    Fairy = 17,
}

pub const POKEMON_TYPE_COUNT: usize = 18;
