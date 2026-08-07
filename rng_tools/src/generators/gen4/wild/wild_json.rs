//! Types implementing `Deserialize`, used only by the offline generator
//! (`src/bin/generate_wild4.rs`). They are not included in the final tool
//! binary. At runtime, the tool only relies on `crate::gen4::wild_static`
//! and `crate::gen4::generated_wild4`, which is produced by the generator.
//!
//! `location` and `species` are now plain names (String) coming straight
//! from the JSON. The old numeric-id + separate "map ids" text file lookup
//! (`load_map_ids` / `find_location_id`) is gone: there's no id to resolve
//! anymore, so if you still need those helpers elsewhere, keep them, but
//! they're no longer used by this generator.
//!
//! One wrinkle: "empty species" slots in the source JSON are still encoded
//! as the integer `0` instead of an empty string or being omitted (e.g.
//! `"species": 0` for an unused grass slot, or `0` inside `swarm`/`day`/
//! `night`/`radar`/`dualSlot.*`). `species_or_empty`/`species_vec_or_empty`
//! below accept either a string or a number and normalize the numeric case
//! to `""`, which is what `wild_static.rs` treats as "no override".

use serde::{Deserialize, Deserializer};

/// Accepts either a species name string, or the legacy `0` placeholder
/// (normalized to `""`).
fn species_or_empty<'de, D>(deserializer: D) -> Result<String, D::Error>
where
    D: Deserializer<'de>,
{
    #[derive(Deserialize)]
    #[serde(untagged)]
    enum StringOrNum {
        S(String),
        N(i64),
    }
    Ok(match StringOrNum::deserialize(deserializer)? {
        StringOrNum::S(s) => s,
        StringOrNum::N(_) => String::new(),
    })
}

/// Same as [`species_or_empty`], but for a JSON array (used by
/// `swarm`/`day`/`night`/`radar`/`dualSlot.*`).
fn species_vec_or_empty<'de, D>(deserializer: D) -> Result<Vec<String>, D::Error>
where
    D: Deserializer<'de>,
{
    #[derive(Deserialize)]
    #[serde(untagged)]
    enum StringOrNum {
        S(String),
        N(i64),
    }
    let raw: Vec<StringOrNum> = Vec::deserialize(deserializer)?;
    Ok(raw
        .into_iter()
        .map(|v| match v {
            StringOrNum::S(s) => s,
            StringOrNum::N(_) => String::new(),
        })
        .collect())
}

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
    pub location: String,
    pub rates: RawRates,
    pub grass: Vec<RawGrassSlot>,
    #[serde(deserialize_with = "species_vec_or_empty")]
    pub swarm: Vec<String>,
    #[serde(deserialize_with = "species_vec_or_empty")]
    pub day: Vec<String>,
    #[serde(deserialize_with = "species_vec_or_empty")]
    pub night: Vec<String>,
    #[serde(deserialize_with = "species_vec_or_empty")]
    pub radar: Vec<String>,
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

#[derive(Debug, Clone, Deserialize)]
pub struct RawGrassSlot {
    #[serde(deserialize_with = "species_or_empty")]
    pub species: String,
    pub level: u8,
}

#[derive(Debug, Clone, Deserialize)]
pub struct RawWaterSlot {
    #[serde(deserialize_with = "species_or_empty")]
    pub species: String,
    #[serde(rename = "minLevel")]
    pub min_level: u8,
    #[serde(rename = "maxLevel")]
    pub max_level: u8,
}

#[derive(Debug, Clone, Deserialize)]
pub struct RawDualSlot {
    #[serde(deserialize_with = "species_vec_or_empty")]
    pub ruby: Vec<String>,
    #[serde(deserialize_with = "species_vec_or_empty")]
    pub sapphire: Vec<String>,
    #[serde(deserialize_with = "species_vec_or_empty")]
    pub emerald: Vec<String>,
    #[serde(deserialize_with = "species_vec_or_empty")]
    pub firered: Vec<String>,
    #[serde(deserialize_with = "species_vec_or_empty")]
    pub leafgreen: Vec<String>,
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
    pub location: String,
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
    let path = std::path::Path::new(json_dir).join(filename);
    let content = std::fs::read_to_string(&path)
        .map_err(|e| anyhow::anyhow!("Cannot read {}: {}", path.display(), e))?;
    Ok(serde_json::from_str(&content)?)
}

pub fn load_honey_file(json_dir: &str, game: Game) -> anyhow::Result<RawHoneyFile> {
    let filename = match game {
        Game::Diamond => "d_honey.json",
        Game::Pearl => "p_honey.json",
        Game::Platinum => "pt_honey.json",
    };
    let path = std::path::Path::new(json_dir).join(filename);
    let content = std::fs::read_to_string(&path)
        .map_err(|e| anyhow::anyhow!("Cannot read {}: {}", path.display(), e))?;
    Ok(serde_json::from_str(&content)?)
}
