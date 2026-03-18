use crate::{Nature, Species};
use serde::{Deserialize, Serialize};
use tsify_next::Tsify;
use wasm_bindgen::prelude::*;

#[derive(Debug, Clone, Copy, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub enum GameVersion {
    Diamond,
    Pearl,
    Platinum,
    HeartGold,
    SoulSilver,
}

fn dpt_method_jk(species: Species) -> bool {
    matches!(
        species,
        Species::Azelf
            | Species::Darkrai
            | Species::Dialga
            | Species::Drifloon
            | Species::Giratina_Altered
            | Species::Giratina_Origin
            | Species::Heatran
            | Species::Palkia
            | Species::Regice
            | Species::Regigigas
            | Species::Regirock
            | Species::Registeel
            | Species::Rotom_Normal
            | Species::Shaymin_Land
            | Species::Spiritomb
            | Species::Uxie
    )
}

fn hgss_method_jk(species: Species) -> bool {
    matches!(
        species,
        Species::HoOh
            | Species::Lugia
            | Species::Articuno
            | Species::Zapdos
            | Species::Moltres
            | Species::Mewtwo
            | Species::Suicune
            | Species::Voltorb
            | Species::Snorlax
            | Species::Lapras
            | Species::Electrode
            | Species::Sudowoodo
            | Species::Latias
            | Species::Latios
            | Species::Groudon
            | Species::Kyogre
            | Species::Rayquaza
    )
}

pub enum StaticMethod {
    One,
    J,
    K,
}

impl StaticMethod {
    pub fn new(game: GameVersion, species: Species) -> StaticMethod {
        match game {
            GameVersion::Diamond | GameVersion::Pearl | GameVersion::Platinum
                if dpt_method_jk(species) =>
            {
                StaticMethod::J
            }
            GameVersion::HeartGold | GameVersion::SoulSilver if hgss_method_jk(species) => {
                StaticMethod::K
            }
            _ => StaticMethod::One,
        }
    }
}

#[derive(Debug, Clone, Copy, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
#[derive(Default)]
pub enum LeadAbility {
    #[default]
    None,
    CutecharmF,
    CutecharmM,
    Synchronize(Nature),
}
