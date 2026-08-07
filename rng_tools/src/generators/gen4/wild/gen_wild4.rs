use anyhow::Context;
use std::fmt::Write as _;
use std::fs;

use crate::generators::gen4::wild::wild_json::{
    self, Game, RawDualSlot, RawEntry, RawGrassSlot, RawHoneyEntry, RawWaterSlot,
};

pub fn run(json_dir: &str, out_path: &str) -> anyhow::Result<()> {
    let mut out = String::new();
    writeln!(out, "// Auto-generated file — do not edit by hand.")?;
    writeln!(
        out,
        "// Re-run the generator after updating the source JSON."
    )?;
    writeln!(out, "#![allow(clippy::all)]")?;
    writeln!(out)?;
    writeln!(out, "use crate::generators::gen4::wild::wild_static::{{")?;
    writeln!(
        out,
        "    RawDualSlot, RawEntry, RawGrassSlot, RawHoneyEntry, RawRates, RawWaterSlot,"
    )?;
    writeln!(out, "}};")?;
    writeln!(out)?;

    for (game, const_name) in [
        (Game::Diamond, "DIAMOND_ENTRIES"),
        (Game::Pearl, "PEARL_ENTRIES"),
        (Game::Platinum, "PLATINUM_ENTRIES"),
    ] {
        let data = wild_json::load_encounters_file(json_dir, game)
            .with_context(|| format!("loading encounters for {game:?}"))?;
        write_entries_const(&mut out, const_name, &data.entries)?;
    }

    for (game, const_name) in [
        (Game::Diamond, "DIAMOND_HONEY"),
        (Game::Pearl, "PEARL_HONEY"),
        (Game::Platinum, "PLATINUM_HONEY"),
    ] {
        let data = wild_json::load_honey_file(json_dir, game)
            .with_context(|| format!("loading honey trees for {game:?}"))?;
        write_honey_const(&mut out, const_name, &data.entries)?;
    }

    fs::write(out_path, out).with_context(|| format!("writing {out_path}"))?;
    println!("Wrote {out_path}");
    Ok(())
}

fn write_entries_const(
    out: &mut String,
    const_name: &str,
    entries: &[RawEntry],
) -> anyhow::Result<()> {
    writeln!(out, "pub static {const_name}: &[RawEntry] = &[")?;
    for e in entries {
        writeln!(out, "    RawEntry {{")?;
        // location is now a name (String), not a numeric id: needs {:?} to
        // come out as a quoted &'static str literal.
        writeln!(out, "        location: {:?},", e.location)?;
        writeln!(
            out,
            "        rates: RawRates {{ grass: {}, surf: {}, old_rod: {}, good_rod: {}, super_rod: {} }},",
            e.rates.grass, e.rates.surf, e.rates.old_rod, e.rates.good_rod, e.rates.super_rod
        )?;
        writeln!(out, "        grass: &{},", fmt_grass_slots(&e.grass))?;
        // swarm/day/night/radar/dual_slot are Vec<String>: {:?} already
        // produces valid `["Name", "Other"]` array-of-&str literal syntax.
        writeln!(out, "        swarm: &{:?},", e.swarm)?;
        writeln!(out, "        day: &{:?},", e.day)?;
        writeln!(out, "        night: &{:?},", e.night)?;
        writeln!(out, "        radar: &{:?},", e.radar)?;
        writeln!(out, "        form: &{:?},", e.form)?;
        writeln!(out, "        dual_slot: {},", fmt_dual_slot(&e.dual_slot))?;
        writeln!(out, "        surf: &{},", fmt_water_slots(&e.surf))?;
        writeln!(out, "        old_rod: &{},", fmt_water_slots(&e.old_rod))?;
        writeln!(out, "        good_rod: &{},", fmt_water_slots(&e.good_rod))?;
        writeln!(
            out,
            "        super_rod: &{},",
            fmt_water_slots(&e.super_rod)
        )?;
        writeln!(out, "    }},")?;
    }
    writeln!(out, "];")?;
    writeln!(out)?;
    Ok(())
}

fn write_honey_const(
    out: &mut String,
    const_name: &str,
    entries: &[RawHoneyEntry],
) -> anyhow::Result<()> {
    writeln!(out, "pub static {const_name}: &[RawHoneyEntry] = &[")?;
    for e in entries {
        writeln!(out, "    RawHoneyEntry {{")?;
        writeln!(out, "        location: {:?},", e.location)?;
        writeln!(out, "        normal: &{},", fmt_water_slots(&e.normal))?;
        writeln!(out, "        rare: &{},", fmt_water_slots(&e.rare))?;
        writeln!(out, "        munchlax: &{},", fmt_water_slots(&e.munchlax))?;
        writeln!(out, "    }},")?;
    }
    writeln!(out, "];")?;
    writeln!(out)?;
    Ok(())
}

fn fmt_grass_slots(slots: &[RawGrassSlot]) -> String {
    let items: Vec<String> = slots
        .iter()
        .map(|s| {
            // species is now a name: {:?} quotes/escapes it as a &str literal.
            format!(
                "RawGrassSlot {{ species: {:?}, level: {} }}",
                s.species, s.level
            )
        })
        .collect();
    format!("[{}]", items.join(", "))
}

fn fmt_water_slots(slots: &[RawWaterSlot]) -> String {
    let items: Vec<String> = slots
        .iter()
        .map(|s| {
            format!(
                "RawWaterSlot {{ species: {:?}, min_level: {}, max_level: {} }}",
                s.species, s.min_level, s.max_level
            )
        })
        .collect();
    format!("[{}]", items.join(", "))
}

fn fmt_dual_slot(d: &RawDualSlot) -> String {
    format!(
        "RawDualSlot {{ ruby: &{:?}, sapphire: &{:?}, emerald: &{:?}, firered: &{:?}, leafgreen: &{:?} }}",
        d.ruby, d.sapphire, d.emerald, d.firered, d.leafgreen
    )
}
