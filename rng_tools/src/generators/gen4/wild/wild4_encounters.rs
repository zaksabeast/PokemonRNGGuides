//! Query engine for the raw encounter JSON data used by
//! Diamond/Pearl/Platinum wild encounters and honey trees.
//!
//! The slot override logic for swarm/day/night/radar/dualSlot/form
//! is taken directly from PokéFinder's source code (https://github.com/Admiral-Fish/PokeFinder, GPLv3),
//! specifically `Core/Gen4/Encounters4.cpp`, in the functions
//! `modifySwarmDPPt`, `modifyTimeDPPt`, `modifyRadar`, `modifyDual`,
//! `getForm`, and `getDPPtHoney`.
//!
//! Exact grass slot mapping (12 slots, indexed 0-11):
//! - swarm         -> slots 0, 1
//! - day / night   -> slots 2, 3
//! - radar         -> slots 4, 5, 10, 11 (4 slots, NOT contiguous)
//! - dualSlot.*    -> slots 8, 9
//! - form          -> NOT a slot override. These are two boolean flags
//!                    that determine the West/East form of Shellos
//!                    and Gastrodon wherever they appear
//! - slots 6, 7     -> reserved for Great Marsh / Trophy Garden, which are
//!                    not included in the raw JSON (selected externally
//!                    by the player/config).
//!
//! Extra details found in the source code (not present in the JSON,
//! hardcoded in the game):
//! - Mt. Coronet B1F (location 22): when fishing with the Old, Good,
//!   or Super Rod, there is a 50% chance of encountering Feebas
//!   as an additional independent slot.
//!   It does not replace any of the five normal fishing slots.
//! - Honey trees: Munchlax is not simply enabled/disabled. Its appearance
//!   depends on the player's TID/SID. See `get_muchlax_trees` in the
//!   `honey_tree` module (reused here, not reimplemented) for the
//!   tid/sid -> tree dedup logic.

use crate::gen4::honey_tree::{HoneyTreeLocation, get_muchlax_trees};
use serde::Deserialize;
use std::collections::HashMap;
use std::fs;
use std::path::Path;

#[derive(Debug, Clone, Deserialize)]
pub struct RawEncountersFile {
    pub file: String,
    #[serde(rename = "compressedSize")]
    pub compressed_size: u32,
    #[serde(rename = "decompressedSize")]
    pub decompressed_size: u32,
    pub entries: Vec<RawEntry>,
}

#[derive(Debug, Clone, Deserialize)]
pub struct RawEntry {
    pub location: u32,
    pub rates: RawRates,
    pub grass: Vec<RawGrassSlot>,
    pub swarm: Vec<u16>,
    pub day: Vec<u16>,
    pub night: Vec<u16>,
    pub radar: Vec<u16>,
    pub form: Vec<u8>,
    #[serde(rename = "dualSlot")]
    pub dual_slot: RawDualSlot,
    pub surf: Vec<RawWaterSlot>,
    #[serde(rename = "oldRod")]
    pub old_rod: Vec<RawWaterSlot>,
    #[serde(rename = "goodRod")]
    pub good_rod: Vec<RawWaterSlot>,
    #[serde(rename = "superRod")]
    pub super_rod: Vec<RawWaterSlot>,
}

#[derive(Debug, Clone, Deserialize)]
pub struct RawRates {
    pub grass: u32,
    pub surf: u32,
    #[serde(rename = "oldRod")]
    pub old_rod: u32,
    #[serde(rename = "goodRod")]
    pub good_rod: u32,
    #[serde(rename = "superRod")]
    pub super_rod: u32,
}

#[derive(Debug, Clone, Copy, Deserialize)]
pub struct RawGrassSlot {
    pub species: u16,
    pub level: u8,
}

#[derive(Debug, Clone, Copy, Deserialize)]
pub struct RawWaterSlot {
    pub species: u16,
    #[serde(rename = "minLevel")]
    pub min_level: u8,
    #[serde(rename = "maxLevel")]
    pub max_level: u8,
}

#[derive(Debug, Clone, Deserialize)]
pub struct RawDualSlot {
    pub ruby: Vec<u16>,
    pub sapphire: Vec<u16>,
    pub emerald: Vec<u16>,
    pub firered: Vec<u16>,
    pub leafgreen: Vec<u16>,
}

#[derive(Debug, Clone, Deserialize)]
pub struct RawHoneyFile {
    pub file: String,
    #[serde(rename = "compressedSize")]
    pub compressed_size: u32,
    #[serde(rename = "decompressedSize")]
    pub decompressed_size: u32,
    pub entries: Vec<RawHoneyEntry>,
}

#[derive(Debug, Clone, Deserialize)]
pub struct RawHoneyEntry {
    pub location: u32,
    pub normal: Vec<RawWaterSlot>,
    pub rare: Vec<RawWaterSlot>,
    pub munchlax: Vec<RawWaterSlot>,
}

const GRASS_SLOT_RATES: [u32; 12] = [20, 20, 10, 10, 10, 10, 5, 5, 4, 4, 1, 1];
const WATER_SLOT_RATES: [u32; 5] = [60, 30, 5, 4, 1];

const MT_CORONET_B1F_LOCATION: u32 = 22;
const FEEBAS_SPECIES: u16 = 349;
const FEEBAS_MIN_LEVEL: u8 = 10;
const FEEBAS_MAX_LEVEL: u8 = 20;

const SHELLOS_SPECIES: u16 = 422;
const GASTRODON_SPECIES: u16 = 423;

const FEEBAS_RATE_PERCENT_WHEN_TILE: u32 = 50;

const HONEY_TREE_MAP_IDS: [u32; 21] = [
    145, 146, 147, 148, 149, 150, 156, 157, 159, 160, 161, 162, 163, 164, 167, 169, 170, 7, 8, 9,
    183,
];

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum Game {
    Diamond,
    Pearl,
    Platinum,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum Method {
    Grass,
    Surf,
    OldRod,
    GoodRod,
    SuperRod,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum TimeOfDay {
    Day,
    Night,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum DualSlotCartridge {
    Ruby,
    Sapphire,
    Emerald,
    FireRed,
    LeafGreen,
}

#[derive(Debug, Clone, Default)]
pub struct Conditions {
    pub time_of_day: Option<TimeOfDay>,
    pub swarm_active: bool,
    pub radar_active: bool,
    pub dual_slot: Option<DualSlotCartridge>,
    pub feebas_tile: bool,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub struct ResolvedEncounter {
    pub species: u16,
    pub form: u8,
    pub min_level: u8,
    pub max_level: u8,
    pub rate_percent: u32,
    pub slot: usize,
}

pub fn load_encounters_file(json_dir: &str, game: Game) -> anyhow::Result<RawEncountersFile> {
    let filename = match game {
        Game::Diamond => "diamond.json",
        Game::Pearl => "pearl.json",
        Game::Platinum => "platinum.json",
    };
    let path = Path::new(json_dir).join(filename);
    let content = fs::read_to_string(&path)
        .map_err(|e| anyhow::anyhow!("impossibile leggere {}: {}", path.display(), e))?;
    Ok(serde_json::from_str(&content)?)
}

pub fn load_honey_file(json_dir: &str, game: Game) -> anyhow::Result<RawHoneyFile> {
    let filename = match game {
        Game::Diamond => "d_honey.json",
        Game::Pearl => "p_honey.json",
        Game::Platinum => "pt_honey.json",
    };
    let path = Path::new(json_dir).join(filename);
    let content = fs::read_to_string(&path)
        .map_err(|e| anyhow::anyhow!("impossibile leggere {}: {}", path.display(), e))?;
    Ok(serde_json::from_str(&content)?)
}

pub fn load_map_ids(path: &str) -> anyhow::Result<HashMap<u32, String>> {
    let content = fs::read_to_string(path)?;
    let mut map = HashMap::new();
    for line in content.lines() {
        let line = line.trim();
        if line.is_empty() {
            continue;
        }
        let (id_str, name) = if let Some(pair) = line.split_once(',') {
            pair
        } else if let Some(pair) = line.split_once(':') {
            pair
        } else if let Some(pair) = line.split_once('\t') {
            pair
        } else {
            continue;
        };
        if let Ok(id) = id_str.trim().parse::<u32>() {
            map.insert(id, name.trim().to_string());
        }
    }
    Ok(map)
}

pub fn find_location_id(map: &HashMap<u32, String>, name: &str) -> Option<u32> {
    map.iter()
        .find(|(_, v)| v.eq_ignore_ascii_case(name))
        .map(|(k, _)| *k)
}

pub fn get_wild_pokemon(
    data: &RawEncountersFile,
    location: u32,
    method: Method,
    cond: &Conditions,
) -> Vec<ResolvedEncounter> {
    let entry = match data.entries.iter().find(|e| e.location == location) {
        Some(e) => e,
        None => return vec![],
    };

    match method {
        Method::Grass => resolve_grass(entry, cond),
        Method::Surf => resolve_water(&entry.surf, &WATER_SLOT_RATES, entry, false),
        Method::OldRod => resolve_water(&entry.old_rod, &WATER_SLOT_RATES, entry, cond.feebas_tile),
        Method::GoodRod => {
            resolve_water(&entry.good_rod, &WATER_SLOT_RATES, entry, cond.feebas_tile)
        }
        Method::SuperRod => {
            resolve_water(&entry.super_rod, &WATER_SLOT_RATES, entry, cond.feebas_tile)
        }
    }
}

fn resolve_grass(entry: &RawEntry, cond: &Conditions) -> Vec<ResolvedEncounter> {
    let mut species: Vec<u16> = entry.grass.iter().map(|s| s.species).collect();
    let levels: Vec<u8> = entry.grass.iter().map(|s| s.level).collect();

    if cond.swarm_active {
        set_slot(&mut species, 0, entry.swarm.first().copied());
        set_slot(&mut species, 1, entry.swarm.get(1).copied());
    }

    if let Some(tod) = cond.time_of_day {
        let arr = match tod {
            TimeOfDay::Day => &entry.day,
            TimeOfDay::Night => &entry.night,
        };
        set_slot(&mut species, 2, arr.first().copied());
        set_slot(&mut species, 3, arr.get(1).copied());
    }

    if cond.radar_active {
        set_slot(&mut species, 4, entry.radar.first().copied());
        set_slot(&mut species, 5, entry.radar.get(1).copied());
        set_slot(&mut species, 10, entry.radar.get(2).copied());
        set_slot(&mut species, 11, entry.radar.get(3).copied());
    }

    if let Some(cart) = cond.dual_slot {
        let arr: &[u16] = match cart {
            DualSlotCartridge::Ruby => &entry.dual_slot.ruby,
            DualSlotCartridge::Sapphire => &entry.dual_slot.sapphire,
            DualSlotCartridge::Emerald => &entry.dual_slot.emerald,
            DualSlotCartridge::FireRed => &entry.dual_slot.firered,
            DualSlotCartridge::LeafGreen => &entry.dual_slot.leafgreen,
        };
        set_slot(&mut species, 8, arr.first().copied());
        set_slot(&mut species, 9, arr.get(1).copied());
    }

    species
        .iter()
        .zip(levels.iter())
        .zip(GRASS_SLOT_RATES.iter())
        .enumerate()
        .filter(|(_, ((sp, _), _))| **sp != 0)
        .map(|(i, ((sp, lvl), rate))| ResolvedEncounter {
            species: *sp,
            form: shellos_gastrodon_form(*sp, entry),
            min_level: *lvl,
            max_level: *lvl,
            rate_percent: *rate,
            slot: i,
        })
        .collect()
}

fn resolve_water(
    slots: &[RawWaterSlot],
    rates: &[u32; 5],
    entry: &RawEntry,
    feebas_tile: bool,
) -> Vec<ResolvedEncounter> {
    let mut out: Vec<ResolvedEncounter> = slots
        .iter()
        .zip(rates.iter())
        .enumerate()
        .filter(|(_, (s, _))| s.species != 0)
        .map(|(i, (s, rate))| ResolvedEncounter {
            species: s.species,
            form: shellos_gastrodon_form(s.species, entry),
            min_level: s.min_level,
            max_level: s.max_level,
            rate_percent: *rate,
            slot: i,
        })
        .collect();

    if feebas_tile && entry.location == MT_CORONET_B1F_LOCATION {
        out.push(ResolvedEncounter {
            species: FEEBAS_SPECIES,
            form: 0,
            min_level: FEEBAS_MIN_LEVEL,
            max_level: FEEBAS_MAX_LEVEL,
            rate_percent: FEEBAS_RATE_PERCENT_WHEN_TILE,
            slot: 5,
        });
    }

    out
}

fn shellos_gastrodon_form(species: u16, entry: &RawEntry) -> u8 {
    if species == SHELLOS_SPECIES {
        if entry.form.first().copied().unwrap_or(0) == 0 {
            1
        } else {
            0
        }
    } else if species == GASTRODON_SPECIES {
        if entry.form.get(1).copied().unwrap_or(0) == 0 {
            1
        } else {
            0
        }
    } else {
        0
    }
}

fn set_slot(species: &mut [u16], idx: usize, value: Option<u16>) {
    if let (Some(v), Some(slot)) = (value, species.get_mut(idx)) {
        if v != 0 {
            *slot = v;
        }
    }
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum HoneyGroup {
    Normal,
    Rare,
    Munchlax,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub struct HoneyResolvedEncounter {
    pub species: u16,
    pub min_level: u8,
    pub max_level: u8,
    pub group: HoneyGroup,
    pub slot: usize,
}

fn tree_id_from_location(location: u32) -> Option<u8> {
    HONEY_TREE_MAP_IDS
        .iter()
        .position(|&id| id == location)
        .map(|i| i as u8)
}

pub fn get_honey_tree_pokemon(
    data: &RawHoneyFile,
    location: u32,
    tid: u16,
    sid: u16,
) -> Vec<HoneyResolvedEncounter> {
    let entry = match data.entries.iter().find(|e| e.location == location) {
        Some(e) => e,
        None => return vec![],
    };

    let munchlax_available = match tree_id_from_location(location) {
        Some(tree_id) => get_muchlax_trees(tid, sid).contains(&HoneyTreeLocation::from(tree_id)),
        None => false,
    };

    let mut seen: Vec<u16> = Vec::new();
    let mut out = Vec::new();

    let mut push_group = |slots: &[RawWaterSlot], group: HoneyGroup| {
        for (i, s) in slots.iter().enumerate() {
            if s.species == 0 || seen.contains(&s.species) {
                continue;
            }
            seen.push(s.species);
            out.push(HoneyResolvedEncounter {
                species: s.species,
                min_level: s.min_level,
                max_level: s.max_level,
                group,
                slot: i,
            });
        }
    };

    push_group(&entry.normal, HoneyGroup::Normal);
    push_group(&entry.rare, HoneyGroup::Rare);
    if munchlax_available {
        push_group(&entry.munchlax, HoneyGroup::Munchlax);
    }

    out
}

pub fn merge_by_species(mut list: Vec<ResolvedEncounter>) -> Vec<ResolvedEncounter> {
    list.sort_by_key(|e| (e.species, e.form));
    let mut out: Vec<ResolvedEncounter> = Vec::new();
    for enc in list {
        if let Some(last) = out.last_mut() {
            if last.species == enc.species && last.form == enc.form {
                last.rate_percent += enc.rate_percent;
                last.min_level = last.min_level.min(enc.min_level);
                last.max_level = last.max_level.max(enc.max_level);
                continue;
            }
        }
        out.push(enc);
    }
    out
}

// ---------------------------------------------------------------------
// Example usage (for testing/debugging):
// ---------------------------------------------------------------------
//
// let data = load_encounters_file("json", Game::Platinum)?;
// let map_ids = load_map_ids("map_ids.txt")?;
// let location = find_location_id(&map_ids, "Route 201").unwrap();
//
// let cond = Conditions {
//     time_of_day: Some(TimeOfDay::Night),
//     swarm_active: false,
//     radar_active: false,
//     dual_slot: None,
//     feebas_tile: false,
// };
//
// let results = get_wild_pokemon(&data, location, Method::Grass, &cond);
// for r in merge_by_species(results) {
//     println!(
//         "species#{} (form {}) lv{}-{} ({}%) [slot {}]",
//         r.species, r.form, r.min_level, r.max_level, r.rate_percent, r.slot
//     );
// }
//
// Honey tree
// let honey = load_honey_file("json", Game::Platinum)?;
// for r in get_honey_tree_pokemon(&honey, 145, profile_tid, profile_sid) {
//     println!("{:?} species#{} lv{}-{}", r.group, r.species, r.min_level, r.max_level);
// }
#[cfg(test)]
mod tests {
    use super::*;

    const LOCATION_0_JSON: &str = r#"
    {
        "location": 0,
        "rates": { "grass": 0, "surf": 10, "oldRod": 25, "goodRod": 50, "superRod": 75 },
        "grass": [
            {"species":0,"level":0},{"species":0,"level":0},{"species":0,"level":0},
            {"species":0,"level":0},{"species":0,"level":0},{"species":0,"level":0},
            {"species":0,"level":0},{"species":0,"level":0},{"species":0,"level":0},
            {"species":0,"level":0},{"species":0,"level":0},{"species":0,"level":0}
        ],
        "swarm": [0,0],
        "day": [0,0],
        "night": [0,0],
        "radar": [0,0,0,0],
        "form": [0,0],
        "dualSlot": {
            "ruby": [0,0], "sapphire": [0,0], "emerald": [0,0],
            "firered": [0,0], "leafgreen": [0,0]
        },
        "surf": [
            {"species":72,"minLevel":20,"maxLevel":30},
            {"species":422,"minLevel":20,"maxLevel":30},
            {"species":73,"minLevel":20,"maxLevel":40},
            {"species":73,"minLevel":20,"maxLevel":40},
            {"species":423,"minLevel":20,"maxLevel":40}
        ],
        "oldRod": [
            {"species":129,"minLevel":4,"maxLevel":6},
            {"species":129,"minLevel":3,"maxLevel":7},
            {"species":129,"minLevel":5,"maxLevel":10},
            {"species":129,"minLevel":5,"maxLevel":10},
            {"species":129,"minLevel":5,"maxLevel":15}
        ],
        "goodRod": [
            {"species":129,"minLevel":15,"maxLevel":20},
            {"species":456,"minLevel":15,"maxLevel":20},
            {"species":129,"minLevel":10,"maxLevel":25},
            {"species":456,"minLevel":10,"maxLevel":25},
            {"species":456,"minLevel":10,"maxLevel":25}
        ],
        "superRod": [
            {"species":130,"minLevel":30,"maxLevel":55},
            {"species":457,"minLevel":30,"maxLevel":40},
            {"species":120,"minLevel":20,"maxLevel":50},
            {"species":457,"minLevel":40,"maxLevel":55},
            {"species":457,"minLevel":40,"maxLevel":55}
        ]
    }
    "#;

    const LOCATION_SYNTH_JSON: &str = r#"
    {
        "location": 999,
        "rates": { "grass": 20, "surf": 0, "oldRod": 0, "goodRod": 0, "superRod": 0 },
        "grass": [
            {"species":1,"level":10},{"species":2,"level":10},
            {"species":3,"level":11},{"species":4,"level":11},
            {"species":5,"level":12},{"species":6,"level":12},
            {"species":7,"level":13},{"species":8,"level":13},
            {"species":9,"level":14},{"species":10,"level":14},
            {"species":11,"level":15},{"species":12,"level":15}
        ],
        "swarm": [100,101],
        "day": [200,201],
        "night": [300,301],
        "radar": [400,401,402,403],
        "form": [0,0],
        "dualSlot": {
            "ruby": [500,501], "sapphire": [0,0], "emerald": [0,0],
            "firered": [0,0], "leafgreen": [0,0]
        },
        "surf": [], "oldRod": [], "goodRod": [], "superRod": []
    }
    "#;

    /// Entry for location 22 (Mt Coronet Upper B1F) to test Feebas.
    const LOCATION_22_JSON: &str = r#"
    {
        "location": 22,
        "rates": { "grass": 0, "surf": 0, "oldRod": 30, "goodRod": 30, "superRod": 30 },
        "grass": [
            {"species":0,"level":0},{"species":0,"level":0},{"species":0,"level":0},
            {"species":0,"level":0},{"species":0,"level":0},{"species":0,"level":0},
            {"species":0,"level":0},{"species":0,"level":0},{"species":0,"level":0},
            {"species":0,"level":0},{"species":0,"level":0},{"species":0,"level":0}
        ],
        "swarm": [0,0], "day": [0,0], "night": [0,0], "radar": [0,0,0,0], "form": [0,0],
        "dualSlot": {
            "ruby": [0,0], "sapphire": [0,0], "emerald": [0,0],
            "firered": [0,0], "leafgreen": [0,0]
        },
        "surf": [],
        "oldRod": [
            {"species":129,"minLevel":10,"maxLevel":20},
            {"species":129,"minLevel":10,"maxLevel":20},
            {"species":129,"minLevel":10,"maxLevel":20},
            {"species":129,"minLevel":10,"maxLevel":20},
            {"species":129,"minLevel":10,"maxLevel":20}
        ],
        "goodRod": [], "superRod": []
    }
    "#;

    const HONEY_145_JSON: &str = r#"
    {
        "location": 145,
        "normal": [
            {"species":415,"minLevel":5,"maxLevel":15},
            {"species":265,"minLevel":5,"maxLevel":15},
            {"species":412,"minLevel":5,"maxLevel":15},
            {"species":420,"minLevel":5,"maxLevel":15},
            {"species":190,"minLevel":5,"maxLevel":15},
            {"species":190,"minLevel":5,"maxLevel":15}
        ],
        "rare": [
            {"species":412,"minLevel":5,"maxLevel":15},
            {"species":420,"minLevel":5,"maxLevel":15},
            {"species":415,"minLevel":5,"maxLevel":15},
            {"species":190,"minLevel":5,"maxLevel":15},
            {"species":190,"minLevel":5,"maxLevel":15},
            {"species":214,"minLevel":5,"maxLevel":15}
        ],
        "munchlax": [
            {"species":446,"minLevel":5,"maxLevel":15},
            {"species":446,"minLevel":5,"maxLevel":15},
            {"species":446,"minLevel":5,"maxLevel":15},
            {"species":446,"minLevel":5,"maxLevel":15},
            {"species":446,"minLevel":5,"maxLevel":15},
            {"species":446,"minLevel":5,"maxLevel":15}
        ]
    }
    "#;

    fn honey_entry_at_unknown_location() -> RawHoneyEntry {
        let mut e: RawHoneyEntry = serde_json::from_str(HONEY_145_JSON).unwrap();
        e.location = 9999;
        e
    }

    fn wrap_entries(entries: Vec<RawEntry>) -> RawEncountersFile {
        RawEncountersFile {
            file: "test.bin".to_string(),
            compressed_size: 0,
            decompressed_size: 0,
            entries,
        }
    }

    fn entry_from(json: &str) -> RawEntry {
        serde_json::from_str(json).unwrap()
    }

    #[test]
    fn parses_location_0_from_real_sample() {
        let entry = entry_from(LOCATION_0_JSON);
        assert_eq!(entry.location, 0);
        assert_eq!(entry.grass.len(), 12);
        assert_eq!(entry.surf.len(), 5);
        assert_eq!(entry.old_rod[0].species, 129);
    }

    #[test]
    fn grass_all_zero_species_returns_empty() {
        let data = wrap_entries(vec![entry_from(LOCATION_0_JSON)]);
        let result = get_wild_pokemon(&data, 0, Method::Grass, &Conditions::default());
        assert!(result.is_empty());
    }

    #[test]
    fn grass_base_slots_no_conditions() {
        let data = wrap_entries(vec![entry_from(LOCATION_SYNTH_JSON)]);
        let result = get_wild_pokemon(&data, 999, Method::Grass, &Conditions::default());

        assert_eq!(result.len(), 12);
        let species: Vec<u16> = result.iter().map(|e| e.species).collect();
        assert_eq!(species, vec![1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);

        assert_eq!(result[0].rate_percent, 20);
        assert_eq!(result[0].min_level, 10);
        assert_eq!(result[0].max_level, 10);
    }

    #[test]
    fn grass_swarm_overrides_only_slots_0_and_1() {
        let data = wrap_entries(vec![entry_from(LOCATION_SYNTH_JSON)]);
        let cond = Conditions {
            swarm_active: true,
            ..Default::default()
        };
        let result = get_wild_pokemon(&data, 999, Method::Grass, &cond);
        let species: Vec<u16> = result.iter().map(|e| e.species).collect();
        assert_eq!(species, vec![100, 101, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
    }

    #[test]
    fn grass_day_overrides_only_slots_2_and_3() {
        let data = wrap_entries(vec![entry_from(LOCATION_SYNTH_JSON)]);
        let cond = Conditions {
            time_of_day: Some(TimeOfDay::Day),
            ..Default::default()
        };
        let result = get_wild_pokemon(&data, 999, Method::Grass, &cond);
        let species: Vec<u16> = result.iter().map(|e| e.species).collect();
        assert_eq!(species, vec![1, 2, 200, 201, 5, 6, 7, 8, 9, 10, 11, 12]);
    }

    #[test]
    fn grass_night_overrides_only_slots_2_and_3() {
        let data = wrap_entries(vec![entry_from(LOCATION_SYNTH_JSON)]);
        let cond = Conditions {
            time_of_day: Some(TimeOfDay::Night),
            ..Default::default()
        };
        let result = get_wild_pokemon(&data, 999, Method::Grass, &cond);
        let species: Vec<u16> = result.iter().map(|e| e.species).collect();
        assert_eq!(species, vec![1, 2, 300, 301, 5, 6, 7, 8, 9, 10, 11, 12]);
    }

    #[test]
    fn grass_radar_overrides_slots_4_5_10_11_not_contiguous() {
        let data = wrap_entries(vec![entry_from(LOCATION_SYNTH_JSON)]);
        let cond = Conditions {
            radar_active: true,
            ..Default::default()
        };
        let result = get_wild_pokemon(&data, 999, Method::Grass, &cond);
        let species: Vec<u16> = result.iter().map(|e| e.species).collect();
        assert_eq!(species, vec![1, 2, 3, 4, 400, 401, 7, 8, 9, 10, 402, 403]);
    }

    #[test]
    fn grass_dual_slot_overrides_only_slots_8_and_9() {
        let data = wrap_entries(vec![entry_from(LOCATION_SYNTH_JSON)]);
        let cond = Conditions {
            dual_slot: Some(DualSlotCartridge::Ruby),
            ..Default::default()
        };
        let result = get_wild_pokemon(&data, 999, Method::Grass, &cond);
        let species: Vec<u16> = result.iter().map(|e| e.species).collect();
        assert_eq!(species, vec![1, 2, 3, 4, 5, 6, 7, 8, 500, 501, 11, 12]);
    }

    #[test]
    fn grass_dual_slot_other_cartridge_is_zero_so_no_override() {
        let data = wrap_entries(vec![entry_from(LOCATION_SYNTH_JSON)]);
        let cond = Conditions {
            dual_slot: Some(DualSlotCartridge::Sapphire),
            ..Default::default()
        };
        let result = get_wild_pokemon(&data, 999, Method::Grass, &cond);
        let species: Vec<u16> = result.iter().map(|e| e.species).collect();
        assert_eq!(species, vec![1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
    }

    #[test]
    fn grass_multiple_conditions_are_disjoint_and_all_apply() {
        let data = wrap_entries(vec![entry_from(LOCATION_SYNTH_JSON)]);
        let cond = Conditions {
            swarm_active: true,
            time_of_day: Some(TimeOfDay::Day),
            radar_active: true,
            dual_slot: Some(DualSlotCartridge::Ruby),
            feebas_tile: false,
        };
        let result = get_wild_pokemon(&data, 999, Method::Grass, &cond);
        let species: Vec<u16> = result.iter().map(|e| e.species).collect();
        assert_eq!(
            species,
            vec![100, 101, 200, 201, 400, 401, 7, 8, 500, 501, 402, 403]
        );
    }

    #[test]
    fn surf_returns_correct_species_levels_and_rates_in_slot_order() {
        let data = wrap_entries(vec![entry_from(LOCATION_0_JSON)]);
        let result = get_wild_pokemon(&data, 0, Method::Surf, &Conditions::default());

        assert_eq!(result.len(), 5);
        let expected_species = [72, 422, 73, 73, 423];
        let expected_rates = [60, 30, 5, 4, 1];
        for (i, enc) in result.iter().enumerate() {
            assert_eq!(enc.species, expected_species[i], "slot {i}");
            assert_eq!(enc.rate_percent, expected_rates[i], "slot {i}");
            assert_eq!(enc.slot, i);
        }
        assert_eq!(result[0].min_level, 20);
        assert_eq!(result[0].max_level, 30);
    }

    #[test]
    fn surf_shellos_and_gastrodon_get_west_form_when_flags_are_zero() {
        let data = wrap_entries(vec![entry_from(LOCATION_0_JSON)]);
        let result = get_wild_pokemon(&data, 0, Method::Surf, &Conditions::default());

        let shellos = result
            .iter()
            .find(|e| e.species == SHELLOS_SPECIES)
            .unwrap();
        let gastrodon = result
            .iter()
            .find(|e| e.species == GASTRODON_SPECIES)
            .unwrap();
        assert_eq!(shellos.form, 1);
        assert_eq!(gastrodon.form, 1);
    }

    #[test]
    fn old_rod_returns_correct_species_and_level_ranges() {
        let data = wrap_entries(vec![entry_from(LOCATION_0_JSON)]);
        let result = get_wild_pokemon(&data, 0, Method::OldRod, &Conditions::default());

        assert_eq!(result.len(), 5);
        assert!(result.iter().all(|e| e.species == 129));
        assert_eq!(result[0].min_level, 4);
        assert_eq!(result[0].max_level, 6);
        assert_eq!(result[4].min_level, 5);
        assert_eq!(result[4].max_level, 15);
    }

    #[test]
    fn good_rod_returns_mixed_species() {
        let data = wrap_entries(vec![entry_from(LOCATION_0_JSON)]);
        let result = get_wild_pokemon(&data, 0, Method::GoodRod, &Conditions::default());
        let species: Vec<u16> = result.iter().map(|e| e.species).collect();
        assert_eq!(species, vec![129, 456, 129, 456, 456]);
    }

    #[test]
    fn super_rod_returns_correct_species() {
        let data = wrap_entries(vec![entry_from(LOCATION_0_JSON)]);
        let result = get_wild_pokemon(&data, 0, Method::SuperRod, &Conditions::default());
        let species: Vec<u16> = result.iter().map(|e| e.species).collect();
        assert_eq!(species, vec![130, 457, 120, 457, 457]);
    }

    #[test]
    fn feebas_tile_replaces_slot_5_at_mt_coronet_b1f() {
        let data = wrap_entries(vec![entry_from(LOCATION_22_JSON)]);
        let cond = Conditions {
            feebas_tile: true,
            ..Default::default()
        };
        let result = get_wild_pokemon(&data, 22, Method::OldRod, &cond);
        assert_eq!(result.len(), 6);

        let feebas = result.iter().find(|e| e.slot == 5).unwrap();
        assert_eq!(feebas.species, FEEBAS_SPECIES);
        assert_eq!(feebas.min_level, FEEBAS_MIN_LEVEL);
        assert_eq!(feebas.max_level, FEEBAS_MAX_LEVEL);
        assert_eq!(feebas.rate_percent, FEEBAS_RATE_PERCENT_WHEN_TILE);

        assert!(
            result
                .iter()
                .filter(|e| e.slot != 5)
                .all(|e| e.species == 129)
        );
        assert_eq!(result.iter().filter(|e| e.slot != 5).count(), 5);
    }

    #[test]
    fn feebas_tile_false_does_not_replace_anything() {
        let data = wrap_entries(vec![entry_from(LOCATION_22_JSON)]);
        let result = get_wild_pokemon(&data, 22, Method::OldRod, &Conditions::default());
        assert!(result.iter().all(|e| e.species == 129));
    }

    #[test]
    fn feebas_tile_true_but_wrong_location_does_not_replace() {
        let data = wrap_entries(vec![entry_from(LOCATION_0_JSON)]);
        let cond = Conditions {
            feebas_tile: true,
            ..Default::default()
        };
        let result = get_wild_pokemon(&data, 0, Method::OldRod, &cond);
        assert!(result.iter().all(|e| e.species == 129));
        assert!(!result.iter().any(|e| e.species == FEEBAS_SPECIES));
    }

    fn honey_data_with(entries: Vec<RawHoneyEntry>) -> RawHoneyFile {
        RawHoneyFile {
            file: "test_honey.bin".to_string(),
            compressed_size: 0,
            decompressed_size: 0,
            entries,
        }
    }

    #[test]
    fn honey_tree_dedups_species_across_normal_and_rare() {
        let entry: RawHoneyEntry = serde_json::from_str(HONEY_145_JSON).unwrap();
        let data = honey_data_with(vec![entry]);

        let munchlax_trees = get_muchlax_trees(0, 0);
        assert!(munchlax_trees.contains(&HoneyTreeLocation::from(0u8)));

        let result = get_honey_tree_pokemon(&data, 145, 0, 0);

        let species: Vec<u16> = result.iter().map(|e| e.species).collect();
        assert_eq!(species, vec![415, 265, 412, 420, 190, 214, 446]);

        let groups: Vec<HoneyGroup> = result.iter().map(|e| e.group).collect();
        assert_eq!(
            groups,
            vec![
                HoneyGroup::Normal,
                HoneyGroup::Normal,
                HoneyGroup::Normal,
                HoneyGroup::Normal,
                HoneyGroup::Normal,
                HoneyGroup::Rare,
                HoneyGroup::Munchlax,
            ]
        );
    }

    #[test]
    fn honey_tree_without_valid_tree_id_never_includes_munchlax() {
        let entry = honey_entry_at_unknown_location(); // location 9999
        let data = honey_data_with(vec![entry]);

        let result = get_honey_tree_pokemon(&data, 9999, 0, 0);
        assert!(!result.iter().any(|e| e.group == HoneyGroup::Munchlax));
        assert!(!result.iter().any(|e| e.species == 446));
    }

    #[test]
    fn honey_tree_unknown_location_returns_empty() {
        let data = honey_data_with(vec![]);
        let result = get_honey_tree_pokemon(&data, 145, 0, 0);
        assert!(result.is_empty());
    }

    #[test]
    fn tree_id_from_location_matches_known_list() {
        assert_eq!(tree_id_from_location(145), Some(0));
        assert_eq!(tree_id_from_location(183), Some(20));
        assert_eq!(tree_id_from_location(9999), None);
    }

    #[test]
    fn load_map_ids_parses_real_csv_format() {
        let mut path = std::env::temp_dir();
        path.push("wild4_query_test_map_ids.txt");
        let content = "0,Canalave City\n140,Route 201\n183,Floaroma Meadow\n";
        fs::write(&path, content).unwrap();

        let map = load_map_ids(path.to_str().unwrap()).unwrap();
        assert_eq!(map.get(&0).map(String::as_str), Some("Canalave City"));
        assert_eq!(map.get(&140).map(String::as_str), Some("Route 201"));
        assert_eq!(map.get(&183).map(String::as_str), Some("Floaroma Meadow"));

        let found = find_location_id(&map, "Route 201");
        assert_eq!(found, Some(140));

        fs::remove_file(&path).ok();
    }

    #[test]
    fn merge_by_species_sums_rates_and_widens_level_range() {
        let list = vec![
            ResolvedEncounter {
                species: 129,
                form: 0,
                min_level: 5,
                max_level: 10,
                rate_percent: 20,
                slot: 0,
            },
            ResolvedEncounter {
                species: 129,
                form: 0,
                min_level: 3,
                max_level: 8,
                rate_percent: 10,
                slot: 4,
            },
            ResolvedEncounter {
                species: 130,
                form: 0,
                min_level: 20,
                max_level: 20,
                rate_percent: 1,
                slot: 11,
            },
        ];
        let merged = merge_by_species(list);
        assert_eq!(merged.len(), 2);
        let m129 = merged.iter().find(|e| e.species == 129).unwrap();
        assert_eq!(m129.rate_percent, 30);
        assert_eq!(m129.min_level, 3);
        assert_eq!(m129.max_level, 10);
    }
}
