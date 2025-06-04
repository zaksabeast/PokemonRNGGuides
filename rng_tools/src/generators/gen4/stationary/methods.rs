use crate::{Nature, Species};
use serde::{Deserialize, Serialize};
use tsify_next::Tsify;

#[derive(Debug, Clone, PartialEq, Tsify, Serialize, Deserialize, Copy)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub enum GameVersion {
    Diamond,
    Pearl,
    Platinum,
    HeartGold,
    SoulSilver,
}
#[derive(Debug, Clone, PartialEq, Tsify, Serialize, Deserialize, Copy)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub enum StaticEncounterId {
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

impl StaticEncounterId {
    pub fn species(self) -> Species {
        match self {
            StaticEncounterId::Chikorita => Species::Chikorita,
            StaticEncounterId::Cyndaquil => Species::Cyndaquil,
            StaticEncounterId::Totodile => Species::Totodile,
            StaticEncounterId::Chimchar => Species::Chimchar,
            StaticEncounterId::Piplup => Species::Piplup,
            StaticEncounterId::Turtwig => Species::Turtwig,
            StaticEncounterId::Charmander => Species::Charmander,
            StaticEncounterId::Squirtle => Species::Squirtle,
            StaticEncounterId::Bulbasaur => Species::Bulbasaur,
            StaticEncounterId::Treecko => Species::Treecko,
            StaticEncounterId::Mudkip => Species::Mudkip,
            StaticEncounterId::Torchic => Species::Torchic,
            StaticEncounterId::Omanyte => Species::Omanyte,
            StaticEncounterId::Kabuto => Species::Kabuto,
            StaticEncounterId::Aerodactyl => Species::Aerodactyl,
            StaticEncounterId::Lileep => Species::Lileep,
            StaticEncounterId::Anorith => Species::Anorith,
            StaticEncounterId::Cranidos => Species::Cranidos,
            StaticEncounterId::Shieldon => Species::Shieldon,
            StaticEncounterId::Eevee => Species::Eevee,
            StaticEncounterId::Porygon => Species::Porygon,
            StaticEncounterId::Togepi => Species::Togepi,
            StaticEncounterId::Riolu => Species::Riolu,
            StaticEncounterId::Drifloon => Species::Drifloon,
            StaticEncounterId::Spiritomb => Species::Spiritomb,
            StaticEncounterId::Rotom => Species::Rotom,
            StaticEncounterId::Lugia => Species::Lugia,
            StaticEncounterId::HoOh => Species::HoOh,
            StaticEncounterId::Dialga => Species::Dialga,
            StaticEncounterId::Palkia => Species::Palkia,
            StaticEncounterId::Giratina => Species::Giratina,
            StaticEncounterId::Regice => Species::Regice,
            StaticEncounterId::Regirock => Species::Regirock,
            StaticEncounterId::Registeel => Species::Registeel,
            StaticEncounterId::Uxie => Species::Uxie,
            StaticEncounterId::Azelf => Species::Azelf,
            StaticEncounterId::Heatran => Species::Heatran,
            StaticEncounterId::Regigigas => Species::Regigigas,
            StaticEncounterId::Mesprit => Species::Mesprit,
            StaticEncounterId::Cresselia => Species::Cresselia,
            StaticEncounterId::Zapdos => Species::Zapdos,
            StaticEncounterId::Articuno => Species::Articuno,
            StaticEncounterId::Moltres => Species::Moltres,
            StaticEncounterId::Tentacool => Species::Tentacool,
            StaticEncounterId::Dratini => Species::Dratini,
            StaticEncounterId::Tyrogue => Species::Tyrogue,
            StaticEncounterId::Mareep => Species::Mareep,
            StaticEncounterId::Wooper => Species::Wooper,
            StaticEncounterId::Slugma => Species::Slugma,
            StaticEncounterId::MrMime => Species::MrMime,
            StaticEncounterId::Abra => Species::Abra,
            StaticEncounterId::Ekans => Species::Ekans,
            StaticEncounterId::Raikou => Species::Raikou,
            StaticEncounterId::Entei => Species::Entei,
            StaticEncounterId::Suicune => Species::Suicune,
            StaticEncounterId::Voltorb => Species::Voltorb,
            StaticEncounterId::Snorlax => Species::Snorlax,
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

#[derive(Debug, Clone, PartialEq, Tsify, Serialize, Deserialize, Copy)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub enum LeadAbilities {
    CutecharmF,
    CutecharmM,
    Synchronize(Nature),
}
