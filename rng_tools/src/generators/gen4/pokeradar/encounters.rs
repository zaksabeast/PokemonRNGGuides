use crate::generators::gen4::wild::generated_wild4::{
    DIAMOND_ENTRIES, PEARL_ENTRIES, PLATINUM_ENTRIES,
};
use crate::generators::gen4::wild::wild_static::{RawEntry, RawGrassSlot};
use serde::{Deserialize, Serialize};
use tsify::Tsify;
use wasm_bindgen::prelude::*;

#[derive(Clone, Debug, PartialEq, Eq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct RadarEncounter {
    pub location: String,
    pub species: String,
    pub min_level: u32,
    pub max_level: u32,
    /// "Radar" | "Swarm" | "Day" | "Night" | "DualSlot"
    pub source: String,
    /// Valorizzato solo quando source == "DualSlot":
    /// "Ruby" | "Sapphire" | "Emerald" | "FireRed" | "LeafGreen"
    pub dual_slot_game: Option<String>,
}

fn entries_for_game(game: &str) -> &'static [RawEntry] {
    match game {
        "Diamond" => DIAMOND_ENTRIES,
        "Pearl" => PEARL_ENTRIES,
        "Platinum" => PLATINUM_ENTRIES,
        _ => &[],
    }
}

// Il PokeRadar non ha una sua tabella di livelli: il livello e' quello
// dell'incontro a piedi (grass) della stessa specie in quella location.
fn level_range_for_species(grass: &[RawGrassSlot], species: &str) -> (u32, u32) {
    let mut min_level = u32::MAX;
    let mut max_level = 0u32;
    for slot in grass.iter().filter(|s| s.species == species) {
        let lvl = slot.level as u32;
        min_level = min_level.min(lvl);
        max_level = max_level.max(lvl);
    }
    if min_level == u32::MAX {
        (0, 0)
    } else {
        (min_level, max_level)
    }
}

#[allow(clippy::too_many_arguments)]
fn push_unique(
    out: &mut Vec<RadarEncounter>,
    seen: &mut Vec<(String, String, String)>,
    location: &str,
    species: &str,
    grass: &[RawGrassSlot],
    source: &str,
    dual_slot_game: Option<&str>,
) {
    if species.is_empty() {
        return;
    }

    let key = (location.to_string(), species.to_string(), source.to_string());
    if seen.contains(&key) {
        return;
    }
    seen.push(key);

    let (min_level, max_level) = level_range_for_species(grass, species);

    out.push(RadarEncounter {
        location: location.to_string(),
        species: species.to_string(),
        min_level,
        max_level,
        source: source.to_string(),
        dual_slot_game: dual_slot_game.map(|s| s.to_string()),
    });
}

#[wasm_bindgen]
pub fn get_gen4_radar_encounters(game: String) -> Vec<RadarEncounter> {
    let mut out = Vec::new();
    let mut seen: Vec<(String, String, String)> = Vec::new();

    for entry in entries_for_game(&game) {
        for species in entry.radar.iter().copied().filter(|s| !s.is_empty()) {
            push_unique(&mut out, &mut seen, entry.location, species, entry.grass, "Radar", None);
        }
        for species in entry.swarm.iter().copied().filter(|s| !s.is_empty()) {
            push_unique(&mut out, &mut seen, entry.location, species, entry.grass, "Swarm", None);
        }
        for species in entry.day.iter().copied().filter(|s| !s.is_empty()) {
            push_unique(&mut out, &mut seen, entry.location, species, entry.grass, "Day", None);
        }
        for species in entry.night.iter().copied().filter(|s| !s.is_empty()) {
            push_unique(&mut out, &mut seen, entry.location, species, entry.grass, "Night", None);
        }

        let dual_slot_tables: [(&str, &[&str]); 5] = [
            ("Ruby", entry.dual_slot.ruby),
            ("Sapphire", entry.dual_slot.sapphire),
            ("Emerald", entry.dual_slot.emerald),
            ("FireRed", entry.dual_slot.firered),
            ("LeafGreen", entry.dual_slot.leafgreen),
        ];
        for (game_name, species_list) in dual_slot_tables {
            for species in species_list.iter().copied().filter(|s| !s.is_empty()) {
                push_unique(
                    &mut out,
                    &mut seen,
                    entry.location,
                    species,
                    entry.grass,
                    "DualSlot",
                    Some(game_name),
                );
            }
        }
    }

    out
}