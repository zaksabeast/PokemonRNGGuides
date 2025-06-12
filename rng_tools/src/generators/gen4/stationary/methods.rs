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

#[derive(Debug, Clone, Copy, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub enum Static4Species {
    Turtwig,
    Chimchar,
    Piplup,
    Cyndaquil,
    Chikorita,
    Totodile,
    Charmander,
    Squirtle,
    Bulbasaur,
    Treecko,
    Mudkip,
    Torchic,
    Omanyte,
    Kabuto,
    Aerodactyl,
    Lileep,
    Anorith,
    Cranidos,
    Shieldon,
    Eevee,
    Porygon,
    Togepi,
    Riolu,
    Drifloon,
    Spiritomb,
    Rotom,
    Lugia,
    HoOh,
    Dialga,
    Palkia,
    Giratina,
    Regice,
    Regirock,
    Registeel,
    Uxie,
    Azelf,
    Heatran,
    Regigigas,
    Mesprit,
    Cresselia,
    Zapdos,
    Articuno,
    Moltres,
    Tentacool,
    Dratini,
    Tyrogue,
    Mareep,
    Wooper,
    Slugma,
    MrMime,
    Abra,
    Ekans,
    Raikou,
    Entei,
    Suicune,
    Voltorb,
    Snorlax,
}

impl Static4Species {
    pub fn species(self) -> Species {
        match self {
            Static4Species::Chikorita => Species::Chikorita,
            Static4Species::Cyndaquil => Species::Cyndaquil,
            Static4Species::Totodile => Species::Totodile,
            Static4Species::Chimchar => Species::Chimchar,
            Static4Species::Piplup => Species::Piplup,
            Static4Species::Turtwig => Species::Turtwig,
            Static4Species::Charmander => Species::Charmander,
            Static4Species::Squirtle => Species::Squirtle,
            Static4Species::Bulbasaur => Species::Bulbasaur,
            Static4Species::Treecko => Species::Treecko,
            Static4Species::Mudkip => Species::Mudkip,
            Static4Species::Torchic => Species::Torchic,
            Static4Species::Omanyte => Species::Omanyte,
            Static4Species::Kabuto => Species::Kabuto,
            Static4Species::Aerodactyl => Species::Aerodactyl,
            Static4Species::Lileep => Species::Lileep,
            Static4Species::Anorith => Species::Anorith,
            Static4Species::Cranidos => Species::Cranidos,
            Static4Species::Shieldon => Species::Shieldon,
            Static4Species::Eevee => Species::Eevee,
            Static4Species::Porygon => Species::Porygon,
            Static4Species::Togepi => Species::Togepi,
            Static4Species::Riolu => Species::Riolu,
            Static4Species::Drifloon => Species::Drifloon,
            Static4Species::Spiritomb => Species::Spiritomb,
            Static4Species::Rotom => Species::Rotom,
            Static4Species::Lugia => Species::Lugia,
            Static4Species::HoOh => Species::HoOh,
            Static4Species::Dialga => Species::Dialga,
            Static4Species::Palkia => Species::Palkia,
            Static4Species::Giratina => Species::Giratina,
            Static4Species::Regice => Species::Regice,
            Static4Species::Regirock => Species::Regirock,
            Static4Species::Registeel => Species::Registeel,
            Static4Species::Uxie => Species::Uxie,
            Static4Species::Azelf => Species::Azelf,
            Static4Species::Heatran => Species::Heatran,
            Static4Species::Regigigas => Species::Regigigas,
            Static4Species::Mesprit => Species::Mesprit,
            Static4Species::Cresselia => Species::Cresselia,
            Static4Species::Zapdos => Species::Zapdos,
            Static4Species::Articuno => Species::Articuno,
            Static4Species::Moltres => Species::Moltres,
            Static4Species::Tentacool => Species::Tentacool,
            Static4Species::Dratini => Species::Dratini,
            Static4Species::Tyrogue => Species::Tyrogue,
            Static4Species::Mareep => Species::Mareep,
            Static4Species::Wooper => Species::Wooper,
            Static4Species::Slugma => Species::Slugma,
            Static4Species::MrMime => Species::MrMime,
            Static4Species::Abra => Species::Abra,
            Static4Species::Ekans => Species::Ekans,
            Static4Species::Raikou => Species::Raikou,
            Static4Species::Entei => Species::Entei,
            Static4Species::Suicune => Species::Suicune,
            Static4Species::Voltorb => Species::Voltorb,
            Static4Species::Snorlax => Species::Snorlax,
        }
    }
}

pub fn dpt_method_jk(species: Species) -> bool {
    matches!(
        species,
        Species::Regigigas
            | Species::Heatran
            | Species::Dialga
            | Species::Palkia
            | Species::Giratina
            | Species::Regice
            | Species::Regirock
            | Species::Registeel
            | Species::Uxie
            | Species::Azelf
            | Species::Drifloon
            | Species::Spiritomb
            | Species::Rotom
    )
}

pub fn hgss_method_jk(species: Species) -> bool {
    matches!(
        species,
        Species::HoOh
            | Species::Lugia
            | Species::Articuno
            | Species::Zapdos
            | Species::Moltres
            | Species::Mewtwo
            | Species::Dialga
            | Species::Suicune
            | Species::Palkia
            | Species::Giratina
            | Species::Voltorb
            | Species::Snorlax
    )
}

#[derive(Debug, Clone, Copy, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
#[derive(Default)]
pub enum LeadAbilities {
    #[default]
    None,
    CutecharmF,
    CutecharmM,
    Synchronize(Nature),
}
