use crate::{AbilityType, Characteristic, Gender, HiddenPower, InheritedIvs, Nature, PokemonType};

#[derive(Debug, Eq, PartialEq)]
pub struct PokefinderEgg4 {
    pub seed: Option<u32>,
    pub held_advances: usize,
    pub pickup_advances: usize,
    pub pid: u32,
    pub shiny: bool,
    pub nature: Nature,
    pub ability: AbilityType,
    pub ivs: InheritedIvs,
    pub hidden_power: HiddenPower,
    pub gender: Gender,
    pub characteristic: Option<Characteristic>,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
enum Egg4ParserMode {
    Generator,
    Searcher,
}

fn parse_pokefinder_egg4_line(line: &str, mode: Egg4ParserMode) -> PokefinderEgg4 {
    let is_searcher = mode == Egg4ParserMode::Searcher;
    let parts: Vec<&str> = line.split('\t').collect();

    // Searcher starts with seed, generator doesn't
    let offset = is_searcher.then(|| 1).unwrap_or_default();

    let seed = is_searcher.then(|| u32::from_str_radix(parts[0], 16).unwrap());
    let held_advances = parts[offset].parse().unwrap();
    let pickup_advances = parts[offset + 1].parse().unwrap();

    // Generator has Chatot here, but searcher doesn't
    // so we don't need the offset after this.
    let pid = u32::from_str_radix(parts[3], 16).unwrap();
    let shiny = parts[4] != "No";
    let nature = Nature::from_str(parts[5]);
    let ability = AbilityType::from_pokefinder_str(parts[6]);
    let ivs = InheritedIvs::from_pokefinder_strs(&parts[7..13]);
    let hp_type = PokemonType::from_str(parts[13]);
    let hp_value = parts[14].parse().unwrap();
    let hidden_power = HiddenPower::new(hp_type, hp_value);
    let gender = Gender::from_pokefinder_str(parts[15]);
    let characteristic = (!is_searcher).then(|| Characteristic::from_pokefinder_str(parts[16]));

    PokefinderEgg4 {
        seed,
        held_advances,
        pickup_advances,
        pid,
        shiny,
        nature,
        ability,
        ivs,
        hidden_power,
        gender,
        characteristic,
    }
}

fn parse_pokefinder_egg4_lines(lines: &str, mode: Egg4ParserMode) -> Vec<PokefinderEgg4> {
    lines
        .lines()
        .map(|line| parse_pokefinder_egg4_line(line, mode))
        .collect()
}

pub fn parse_pokefinder_egg4_generator_lines(lines: &str) -> Vec<PokefinderEgg4> {
    parse_pokefinder_egg4_lines(lines, Egg4ParserMode::Generator)
}

pub fn parse_pokefinder_egg4_searcher_lines(lines: &str) -> Vec<PokefinderEgg4> {
    parse_pokefinder_egg4_lines(lines, Egg4ParserMode::Searcher)
}
