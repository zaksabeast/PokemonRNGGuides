//! Types implementing `Deserialize`, used only by the offline generator
//! (`src/bin/generate_wild4.rs`). They are not included in the final tool
//! binary. At runtime, the tool only relies on `crate::gen4::wild_static`
//! and `crate::gen4::generated_wild4`, which is produced by the generator.
//!
//! `load_map_ids` and `find_location_id` are still runtime code. They read
//! from a small text file, so the overhead is negligible and there was no
//! real benefit in moving them into the generator. If needed, this could be
//! changed easily by generating a `phf_map!` (or a similar static lookup) instead.

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

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum Game {
    Diamond,
    Pearl,
    Platinum,
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

#[cfg(test)]
mod tests {
    use super::*;

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
}
