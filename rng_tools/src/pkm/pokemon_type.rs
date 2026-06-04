use num_enum::FromPrimitive;
use serde::{Deserialize, Serialize};
use tsify::Tsify;

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

impl PokemonType {
    #[cfg(test)]
    pub fn from_str(str: &str) -> Self {
        match str {
            "Normal" => PokemonType::Normal,
            "Fighting" => PokemonType::Fighting,
            "Flying" => PokemonType::Flying,
            "Poison" => PokemonType::Poison,
            "Ground" => PokemonType::Ground,
            "Rock" => PokemonType::Rock,
            "Bug" => PokemonType::Bug,
            "Ghost" => PokemonType::Ghost,
            "Steel" => PokemonType::Steel,
            "Fire" => PokemonType::Fire,
            "Water" => PokemonType::Water,
            "Grass" => PokemonType::Grass,
            "Electric" => PokemonType::Electric,
            "Psychic" => PokemonType::Psychic,
            "Ice" => PokemonType::Ice,
            "Dragon" => PokemonType::Dragon,
            "Dark" => PokemonType::Dark,
            "Fairy" => PokemonType::Fairy,
            _ => panic!("Unknown type: {}", str),
        }
    }
}

pub const POKEMON_TYPE_COUNT: usize = 18;
