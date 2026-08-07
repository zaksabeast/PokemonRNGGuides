use crate::generators::gen4::wild::generated_wild4::{
    DIAMOND_ENTRIES, PEARL_ENTRIES, PLATINUM_ENTRIES,
};

use crate::generators::gen4::wild::wild_static::{
    Conditions, DualSlotCartridge, Game, Method, RawEntry, TimeOfDay, get_wild_pokemon_from_entries,
};

use serde::{Deserialize, Serialize};
use tsify::Tsify;
use wasm_bindgen::prelude::*;

fn entries_for_game(game: &str) -> &'static [RawEntry] {
    match game {
        "Diamond" => DIAMOND_ENTRIES,
        "Pearl" => PEARL_ENTRIES,
        "Platinum" => PLATINUM_ENTRIES,
        _ => &[],
    }
}

fn entries_for_game_enum(game: &str) -> Option<Game> {
    match game {
        "Diamond" => Some(Game::Diamond),
        "Pearl" => Some(Game::Pearl),
        "Platinum" => Some(Game::Platinum),
        _ => None,
    }
}

#[wasm_bindgen]
pub fn get_gen4_radar_locations(game: String) -> Vec<String> {
    entries_for_game(&game)
        .iter()
        .filter(|e| e.radar.iter().any(|s| !s.is_empty()))
        .map(|e| e.location.to_string())
        .collect()
}

#[derive(Clone, Debug, PartialEq, Eq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct RadarSpeciesOpts {
    pub game: String,
    pub location: String,
    /// "Day" | "Night" | null
    pub time_of_day: Option<String>,
    pub swarm_active: bool,
    /// "Ruby" | "Sapphire" | "Emerald" | "FireRed" | "LeafGreen" | null
    pub dual_slot_game: Option<String>,
}

#[derive(Clone, Debug, PartialEq, Eq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct RadarSpecies {
    pub species: String,
    pub min_level: u32,
    pub max_level: u32,
}

fn parse_time_of_day(v: &Option<String>) -> Option<TimeOfDay> {
    match v.as_deref() {
        Some("Day") => Some(TimeOfDay::Day),
        Some("Night") => Some(TimeOfDay::Night),
        _ => None,
    }
}

fn parse_dual_slot(v: &Option<String>) -> Option<DualSlotCartridge> {
    match v.as_deref() {
        Some("Ruby") => Some(DualSlotCartridge::Ruby),
        Some("Sapphire") => Some(DualSlotCartridge::Sapphire),
        Some("Emerald") => Some(DualSlotCartridge::Emerald),
        Some("FireRed") => Some(DualSlotCartridge::FireRed),
        Some("LeafGreen") => Some(DualSlotCartridge::LeafGreen),
        _ => None,
    }
}

#[wasm_bindgen]
pub fn get_gen4_radar_species(opts: RadarSpeciesOpts) -> Vec<RadarSpecies> {
    let Some(game) = entries_for_game_enum(&opts.game) else {
        return vec![];
    };

    let cond = Conditions {
        time_of_day: parse_time_of_day(&opts.time_of_day),
        swarm_active: opts.swarm_active,
        radar_active: true,
        dual_slot: parse_dual_slot(&opts.dual_slot_game),
        feebas_tile: false,
    };

    let entries = entries_for_game(&opts.game);
    let resolved = get_wild_pokemon_from_entries(entries, &opts.location, Method::Grass, &cond);
    let _ = game;

    let mut out: Vec<RadarSpecies> = Vec::new();
    for enc in resolved {
        if out.iter().any(|s| s.species == enc.species) {
            continue;
        }
        out.push(RadarSpecies {
            species: enc.species.to_string(),
            min_level: enc.min_level as u32,
            max_level: enc.max_level as u32,
        });
    }
    out
}
