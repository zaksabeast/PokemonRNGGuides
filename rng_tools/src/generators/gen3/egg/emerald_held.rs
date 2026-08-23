use crate::Nature;
use crate::rng::lcrng::Pokerng;
use crate::rng::{Rng, StateIterator};
use crate::{Gender, Species, gen3_shiny};
use num_enum::FromPrimitive;
use serde::{Deserialize, Serialize};
use tsify::Tsify;
use wasm_bindgen::prelude::*;

fn apply_roamer(calibration: usize, has_roamer: bool) -> usize {
    match has_roamer {
        true => calibration.wrapping_add(1),
        false => calibration,
    }
}

fn remove_roamer(calibration: usize, has_roamer: bool) -> usize {
    match has_roamer {
        true => calibration.wrapping_sub(1),
        false => calibration,
    }
}

#[derive(Default, Debug, Clone, Copy, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub enum Compatability {
    #[default]
    DontLikeEachOther = 20,
    GetAlong = 50,
    GetAlongVeryWell = 70,
}

struct Gen3HeldEggPid {
    advance: usize,
    redraws: usize,
    calibration: usize,
    has_roamer: bool,
    pid: u32,
    match_call: PokeNavTrainer,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct Gen3HeldEgg {
    pub advance: usize,
    pub redraws: usize,
    pub has_roamer: bool,
    pub calibration: usize,
    pub pid: u32,
    pub gender: Gender,
    pub shiny: bool,
    pub nature: Nature,
    pub ability: u8,
    pub match_call: PokeNavTrainer,
}

impl Gen3HeldEgg {
    fn from_pid(
        egg: &Gen3HeldEggPid,
        species: Species,
        tid: u16,
        sid: u16,
        delay: i16,
        lua_adjustment: bool,
    ) -> Self {
        let pid = egg.pid;
        let mut advance = egg
            .advance
            // Lua scripts are off by 1
            .saturating_add(lua_adjustment as usize);

        if delay > 0 {
            advance = advance.saturating_sub(delay as usize);
        } else {
            advance = advance.saturating_add(delay.unsigned_abs() as usize);
        }

        let gender = match species {
            Species::NidoranF | Species::Illumise => {
                let val = (pid & 0xFFFF) as u16;
                if val < 0x8000 {
                    Gender::Female
                } else {
                    Gender::Male
                }
            }
            _ => species.gender_from_pid(pid),
        };

        Self {
            pid,
            advance,
            gender,
            has_roamer: egg.has_roamer,
            redraws: egg.redraws,
            calibration: egg.calibration,
            nature: Nature::from_pid(pid),
            shiny: gen3_shiny(pid, tid, sid),
            ability: ((pid & 1) as u8) + 1,
            match_call: egg.match_call,
        }
    }
}

#[derive(Debug, Clone, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct Egg3HeldFilters {
    pub shiny: bool,
    pub nature: Vec<Nature>,
    pub gender: Option<Gender>,
    pub match_call: Option<PokeNavTrainer>,
}

impl Egg3HeldFilters {
    fn pass_filter(&self, egg: &Gen3HeldEgg) -> bool {
        if self.shiny && !egg.shiny {
            return false;
        }

        if !self.nature.is_empty() && !self.nature.contains(&egg.nature) {
            return false;
        }

        if let Some(gender) = self.gender
            && egg.gender != gender
        {
            return false;
        }

        if let Some(match_call) = self.match_call
            && egg.match_call != match_call
        {
            return false;
        }

        true
    }
}

#[derive(Debug, Clone, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct Egg3HeldOptions {
    pub delay: i16,
    pub initial_advances: usize,
    pub max_advances: usize,
    pub has_roamer: bool,
    pub has_lightning_rod: bool,
    pub registered_trainers: Vec<PokeNavTrainer>,
    pub calibration: usize,
    pub min_redraw: usize,
    pub max_redraw: usize,
    pub compatability: Compatability,
    pub tid: u16,
    pub sid: u16,
    pub egg_species: Species,
    pub filters: Egg3HeldFilters,
    pub lua_adjustment: bool,
    pub filter_impossible_to_hit: bool,
}

#[wasm_bindgen]
pub fn emerald_egg_held_states(opts: &Egg3HeldOptions) -> Vec<Gen3HeldEgg> {
    let mut result = StateIterator::new(Pokerng::new(0))
        .enumerate()
        .skip(opts.initial_advances)
        .take(opts.max_advances.saturating_add(1))
        .flat_map(|(advance, rng)| generate_redraw_states(rng, opts, advance))
        .collect::<Vec<Gen3HeldEgg>>();
    result.sort_by_key(|a| a.advance);
    result
}

fn generate_redraw_states(
    mut rng: Pokerng,
    opts: &Egg3HeldOptions,
    advance: usize,
) -> Vec<Gen3HeldEgg> {
    if (rng.rand::<u16>() as u32).wrapping_mul(100) / 0xffff >= (opts.compatability as u32) {
        return vec![];
    }

    let ordered_trainers = order_trainer_list(&opts.registered_trainers);
    let calibration = apply_roamer(opts.calibration, opts.has_roamer);

    let mut generate_state_opts = GenerateStateOpts {
        go: rng,
        ordered_trainers: &ordered_trainers,
        calibration,
        has_roamer: opts.has_roamer,
        has_lightning_rod: opts.has_lightning_rod,
        filter_impossible_to_hit: opts.filter_impossible_to_hit,
        advance: 0,
        redraws: 0,
    };

    (opts.min_redraw..=opts.max_redraw)
        .flat_map(|redraw| {
            generate_state_opts.redraws = redraw;
            generate_state_opts.advance = advance;
            let egg_pid = generate_state(&generate_state_opts)?;
            let spread = Gen3HeldEgg::from_pid(
                &egg_pid,
                opts.egg_species,
                opts.tid,
                opts.sid,
                opts.delay,
                opts.lua_adjustment,
            );
            if opts.filters.pass_filter(&spread) {
                Some(spread)
            } else {
                None
            }
        })
        .collect()
}

#[derive(
    Debug, Default, Clone, Copy, PartialEq, Eq, Tsify, Serialize, Deserialize, FromPrimitive,
)]
#[repr(u64)]
pub enum PokeNavTrainer {
    #[default]
    None = 0b0,
    AromaLadyRose = 0b1,
    RuinManiacAndres = 0b10,
    RuinManiacDusty = 0b100,
    TuberLola = 0b1000,
    TuberRicky = 0b10000,
    SisAndBroLilaRoy = 0b100000,
    CoolTrainerCristin = 0b1000000,
    CoolTrainerBrooke = 0b10000000,
    CoolTrainerWilton = 0b100000000,
    HexManiacValerie = 0b1000000000,
    LadyCindy = 0b10000000000,
    BeautyThalia = 0b100000000000,
    BeautyJessica = 0b1000000000000,
    RichBoyWinston = 0b10000000000000,
    PokemaniacSteve = 0b100000000000000,
    SwimmerTony = 0b1000000000000000,
    BlackBeltNob = 0b10000000000000000,
    BlackBeltKoji = 0b100000000000000000,
    GuitaristFernando = 0b1000000000000000000,
    GuitaristDalton = 0b10000000000000000000,
    KindlerBernie = 0b100000000000000000000,
    CamperEthan = 0b1000000000000000000000,
    OldCoupleJohnJay = 0b10000000000000000000000,
    BugManiacJeffrey = 0b100000000000000000000000,
    PsychicCameron = 0b1000000000000000000000000,
    PsychicJacki = 0b10000000000000000000000000,
    GentlemanWalter = 0b100000000000000000000000000,
    SchoolKidKaren = 0b1000000000000000000000000000,
    SchoolKidJerry = 0b10000000000000000000000000000,
    SrAndJrAnnaMeg = 0b100000000000000000000000000000,
    PokefanIsabel = 0b1000000000000000000000000000000,
    PokefanMiguel = 0b10000000000000000000000000000000,
    ExpertTimothy = 0b100000000000000000000000000000000,
    ExpertShelby = 0b1000000000000000000000000000000000,
    YoungsterCalvin = 0b10000000000000000000000000000000000,
    FishermanElliot = 0b100000000000000000000000000000000000,
    TriathleteIsaiah = 0b1000000000000000000000000000000000000,
    TriathleteMaria = 0b10000000000000000000000000000000000000,
    TriathleteAbigail = 0b100000000000000000000000000000000000000,
    TriathleteDylan = 0b1000000000000000000000000000000000000000,
    TriathleteKatelyn = 0b10000000000000000000000000000000000000000,
    TriathleteBenjamin = 0b100000000000000000000000000000000000000000,
    TriathletePablo = 0b1000000000000000000000000000000000000000000,
    DragonTamerNicolas = 0b10000000000000000000000000000000000000000000,
    BirdKeeperRobert = 0b100000000000000000000000000000000000000000000,
    NinjaBoyLao = 0b1000000000000000000000000000000000000000000000,
    BattleGirlCyndy = 0b10000000000000000000000000000000000000000000000,
    ParasolLadyMadeline = 0b100000000000000000000000000000000000000000000000,
    SwimmerJenny = 0b1000000000000000000000000000000000000000000000000,
    PicknickerDiana = 0b10000000000000000000000000000000000000000000000000,
    TwinsAmyLiv = 0b100000000000000000000000000000000000000000000000000,
    SailorErnest = 0b1000000000000000000000000000000000000000000000000000,
    SailorCory = 0b10000000000000000000000000000000000000000000000000000,
    CollectorEdwin = 0b100000000000000000000000000000000000000000000000000000,
    PkmnBreederLydia = 0b1000000000000000000000000000000000000000000000000000000,
    PkmnBreederIsaac = 0b10000000000000000000000000000000000000000000000000000000,
    PkmnBreederGabrielle = 0b100000000000000000000000000000000000000000000000000000000,
    PkmnRangerCatherine = 0b1000000000000000000000000000000000000000000000000000000000,
    PkmnRangerJackson = 0b10000000000000000000000000000000000000000000000000000000000,
    LassHaley = 0b100000000000000000000000000000000000000000000000000000000000,
    BugCatcherJames = 0b1000000000000000000000000000000000000000000000000000000000000,
    HikerTrent = 0b10000000000000000000000000000000000000000000000000000000000000,
    HikerSawyer = 0b100000000000000000000000000000000000000000000000000000000000000,
    YoungCoupleKiraDan = 0b1000000000000000000000000000000000000000000000000000000000000000,
}

fn trainers_from_bits(bits: u64) -> Vec<PokeNavTrainer> {
    (0..64_u64)
        .filter_map(|bit| {
            let mask = 1 << bit;
            match bits & mask != 0 {
                true => Some(PokeNavTrainer::from(mask)),
                false => None,
            }
        })
        .collect()
}

// Using a bit field preserves game's order of trainers
// while not caring about input order from the function caller
// or needing a separate struct of bools.
fn order_trainer_list(trainers: &[PokeNavTrainer]) -> Vec<PokeNavTrainer> {
    let registered_trainers = trainers
        .iter()
        .fold(0, |acc, &trainer| acc | trainer as u64);

    trainers_from_bits(registered_trainers)
}

fn generate_match_call(
    rng: &mut Pokerng,
    has_lightning_rod: bool,
    ordered_trainers: &[PokeNavTrainer],
) -> PokeNavTrainer {
    if ordered_trainers.is_empty() {
        return PokeNavTrainer::None;
    }

    let chance = match has_lightning_rod {
        true => 6,
        false => 3,
    };

    if rng.rand::<u16>() % 10 < chance {
        let rand = (rng.rand::<u16>() as usize) % ordered_trainers.len();
        return ordered_trainers.get(rand).copied().unwrap_or_default();
    }

    PokeNavTrainer::None
}

#[derive(Default, Debug, Clone, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct NoEggMatchCallOpts {
    seed: u32,
    initial_advances: usize,
    calibration: usize,
    max_advances: usize,
    has_lightning_rod: bool,
    has_roamer: bool,
    registered_trainers: Vec<PokeNavTrainer>,
    match_call_filter: Option<PokeNavTrainer>,
}

#[derive(Default, Debug, Clone, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct NoEggMatchCall {
    advance: usize,
    match_call: PokeNavTrainer,
}

#[wasm_bindgen]
pub fn generate_no_egg_match_calls(opts: NoEggMatchCallOpts) -> Vec<NoEggMatchCall> {
    let rng = Pokerng::new(opts.seed);
    let ordered_trainers = order_trainer_list(&opts.registered_trainers);
    let skip = apply_roamer(opts.calibration, opts.has_roamer);

    StateIterator::new(rng)
        .skip(skip)
        .enumerate()
        .skip(opts.initial_advances)
        .take(opts.max_advances.saturating_add(1))
        .filter_map(|(advance, mut rng)| {
            let match_call =
                generate_match_call(&mut rng, opts.has_lightning_rod, &ordered_trainers);
            match opts.match_call_filter {
                Some(filter) if match_call != filter => None,
                _ => Some(NoEggMatchCall {
                    advance,
                    match_call,
                }),
            }
        })
        .collect()
}

struct GenerateStateOpts<'a> {
    go: Pokerng,
    ordered_trainers: &'a [PokeNavTrainer],
    calibration: usize,
    has_roamer: bool,
    has_lightning_rod: bool,
    advance: usize,
    redraws: usize,
    filter_impossible_to_hit: bool,
}

fn generate_state(opts: &GenerateStateOpts) -> Option<Gen3HeldEggPid> {
    let mut go = opts.go;
    let redraws = opts.redraws;
    let advance = opts.advance;
    let calibration = opts.calibration;
    let has_lightning_rod = opts.has_lightning_rod;

    let offset = redraws.wrapping_mul(3).wrapping_add(calibration);
    // PokeFinder lets held_advance can wrap backwards as a u32
    // So we want to duplicate that behavior here.
    let held_advance = (advance as u32).wrapping_sub(calibration as u32) as usize;
    let seed = ((advance).wrapping_add(1).wrapping_sub(offset)) & 0xffff;
    let mut trng = Pokerng::new(seed as u32);

    // Filter out any results that are impossible to hit
    if opts.filter_impossible_to_hit
        && redraws
            .saturating_mul(180 /* ~3 seconds of video frames per redraw */)
            .saturating_add(1800 /* ~30 seconds of video frames to load the game */)
            >= held_advance
    {
        // Impossible to hit
        return None;
    }

    let pid = (go.rand_max::<u16>(0xfffe) + 1) as u32 | ((trng.rand::<u16>() as u32) << 16);
    Some(Gen3HeldEggPid {
        redraws,
        calibration: remove_roamer(calibration, opts.has_roamer),
        has_roamer: opts.has_roamer,
        pid,
        advance: held_advance,
        match_call: generate_match_call(&mut go, has_lightning_rod, opts.ordered_trainers),
    })
}

#[cfg(test)]
mod test {
    use itertools::Itertools;

    use super::Gender::*;
    use super::Nature::*;
    use super::*;
    use crate::AbilityType;
    use crate::assert_list_eq;

    fn register_all_trainers() -> Vec<PokeNavTrainer> {
        trainers_from_bits(u64::MAX)
    }

    #[test]
    fn generates_results() {
        let opts = Egg3HeldOptions {
            delay: 0,
            filter_impossible_to_hit: false,
            compatability: Compatability::DontLikeEachOther,
            calibration: 18,
            has_roamer: false,
            has_lightning_rod: false,
            registered_trainers: vec![],
            initial_advances: 0,
            max_advances: 10,
            min_redraw: 0,
            max_redraw: 5,
            tid: 0,
            sid: 0,
            lua_adjustment: false,
            egg_species: Species::Bulbasaur,
            filters: Egg3HeldFilters {
                shiny: false,
                nature: vec![],
                gender: None,
                match_call: None,
            },
        };

        let results = emerald_egg_held_states(&opts);
        let expected = [
            Gen3HeldEgg {
                advance: 4294967278,
                redraws: 0,
                calibration: 18,
                has_roamer: false,
                pid: 0xf042e97f,
                gender: Male,
                shiny: false,
                nature: Mild,
                ability: 2,
                match_call: PokeNavTrainer::None,
            },
            Gen3HeldEgg {
                advance: 4294967278,
                redraws: 1,
                calibration: 18,
                has_roamer: false,
                pid: 0x2aefe97f,
                gender: Male,
                shiny: false,
                nature: Lonely,
                ability: 2,
                match_call: PokeNavTrainer::None,
            },
            Gen3HeldEgg {
                advance: 4294967278,
                redraws: 2,
                calibration: 18,
                has_roamer: false,
                pid: 0x659ce97f,
                gender: Male,
                shiny: false,
                nature: Relaxed,
                ability: 2,
                match_call: PokeNavTrainer::None,
            },
            Gen3HeldEgg {
                advance: 4294967278,
                redraws: 3,
                calibration: 18,
                has_roamer: false,
                pid: 0xa049e97f,
                gender: Male,
                shiny: false,
                nature: Jolly,
                ability: 2,
                match_call: PokeNavTrainer::None,
            },
            Gen3HeldEgg {
                advance: 4294967278,
                redraws: 4,
                calibration: 18,
                has_roamer: false,
                pid: 0xdaf6e97f,
                gender: Male,
                shiny: false,
                nature: Rash,
                ability: 2,
                match_call: PokeNavTrainer::None,
            },
            Gen3HeldEgg {
                advance: 4294967278,
                redraws: 5,
                calibration: 18,
                has_roamer: false,
                pid: 0x15a3e97f,
                gender: Male,
                shiny: false,
                nature: Naughty,
                ability: 2,
                match_call: PokeNavTrainer::None,
            },
            Gen3HeldEgg {
                advance: 4294967281,
                redraws: 0,
                calibration: 18,
                has_roamer: false,
                pid: 0xb5958e43,
                gender: Male,
                shiny: false,
                nature: Naughty,
                ability: 2,
                match_call: PokeNavTrainer::None,
            },
            Gen3HeldEgg {
                advance: 4294967281,
                redraws: 1,
                calibration: 18,
                has_roamer: false,
                pid: 0xf0428e43,
                gender: Male,
                shiny: false,
                nature: Timid,
                ability: 2,
                match_call: PokeNavTrainer::None,
            },
            Gen3HeldEgg {
                advance: 4294967281,
                redraws: 2,
                calibration: 18,
                has_roamer: false,
                pid: 0x2aef8e43,
                gender: Male,
                shiny: false,
                nature: Calm,
                ability: 2,
                match_call: PokeNavTrainer::None,
            },
            Gen3HeldEgg {
                advance: 4294967281,
                redraws: 3,
                calibration: 18,
                has_roamer: false,
                pid: 0x659c8e43,
                gender: Male,
                shiny: false,
                nature: Lonely,
                ability: 2,
                match_call: PokeNavTrainer::None,
            },
            Gen3HeldEgg {
                advance: 4294967281,
                redraws: 4,
                calibration: 18,
                has_roamer: false,
                pid: 0xa0498e43,
                gender: Male,
                shiny: false,
                nature: Relaxed,
                ability: 2,
                match_call: PokeNavTrainer::None,
            },
            Gen3HeldEgg {
                advance: 4294967281,
                redraws: 5,
                calibration: 18,
                has_roamer: false,
                pid: 0xdaf68e43,
                gender: Male,
                shiny: false,
                nature: Jolly,
                ability: 2,
                match_call: PokeNavTrainer::None,
            },
        ];

        assert_list_eq!(results, expected);
    }

    #[test]
    fn reasonable_initial_advances() {
        let opts = Egg3HeldOptions {
            delay: 0,
            filter_impossible_to_hit: false,
            compatability: Compatability::DontLikeEachOther,
            calibration: 18,
            has_roamer: false,
            has_lightning_rod: false,
            registered_trainers: vec![],
            initial_advances: 1000,
            max_advances: 10,
            min_redraw: 0,
            max_redraw: 5,
            tid: 0,
            sid: 0,
            lua_adjustment: false,
            egg_species: Species::Bulbasaur,
            filters: Egg3HeldFilters {
                shiny: false,
                nature: vec![],
                gender: None,
                match_call: None,
            },
        };

        let results = emerald_egg_held_states(&opts);
        let expected = [
            Gen3HeldEgg {
                advance: 983,
                redraws: 0,
                calibration: 18,
                has_roamer: false,
                pid: 0xd23d2c1d,
                gender: Female,
                shiny: false,
                nature: Quirky,
                ability: 2,
                match_call: PokeNavTrainer::None,
            },
            Gen3HeldEgg {
                advance: 983,
                redraws: 1,
                calibration: 18,
                has_roamer: false,
                pid: 0xcea2c1d,
                gender: Female,
                shiny: false,
                nature: Lax,
                ability: 2,
                match_call: PokeNavTrainer::None,
            },
            Gen3HeldEgg {
                advance: 983,
                redraws: 2,
                calibration: 18,
                has_roamer: false,
                pid: 0x47972c1d,
                gender: Female,
                shiny: false,
                nature: Modest,
                ability: 2,
                match_call: PokeNavTrainer::None,
            },
            Gen3HeldEgg {
                advance: 983,
                redraws: 3,
                calibration: 18,
                has_roamer: false,
                pid: 0x82452c1d,
                gender: Female,
                shiny: false,
                nature: Relaxed,
                ability: 2,
                match_call: PokeNavTrainer::None,
            },
            Gen3HeldEgg {
                advance: 983,
                redraws: 4,
                calibration: 18,
                has_roamer: false,
                pid: 0xbcf22c1d,
                gender: Female,
                shiny: false,
                nature: Jolly,
                ability: 2,
                match_call: PokeNavTrainer::None,
            },
            Gen3HeldEgg {
                advance: 983,
                redraws: 5,
                calibration: 18,
                has_roamer: false,
                pid: 0xf79f2c1d,
                gender: Female,
                shiny: false,
                nature: Rash,
                ability: 2,
                match_call: PokeNavTrainer::None,
            },
            Gen3HeldEgg {
                advance: 984,
                redraws: 0,
                calibration: 18,
                has_roamer: false,
                pid: 0x1404aa0a,
                gender: Female,
                shiny: false,
                nature: Rash,
                ability: 1,
                match_call: PokeNavTrainer::None,
            },
            Gen3HeldEgg {
                advance: 984,
                redraws: 1,
                calibration: 18,
                has_roamer: false,
                pid: 0x4eb1aa0a,
                gender: Female,
                shiny: false,
                nature: Hardy,
                ability: 1,
                match_call: PokeNavTrainer::None,
            },
            Gen3HeldEgg {
                advance: 984,
                redraws: 2,
                calibration: 18,
                has_roamer: false,
                pid: 0x895eaa0a,
                gender: Female,
                shiny: false,
                nature: Docile,
                ability: 1,
                match_call: PokeNavTrainer::None,
            },
            Gen3HeldEgg {
                advance: 984,
                redraws: 3,
                calibration: 18,
                has_roamer: false,
                pid: 0xc40baa0a,
                gender: Female,
                shiny: false,
                nature: Serious,
                ability: 1,
                match_call: PokeNavTrainer::None,
            },
            Gen3HeldEgg {
                advance: 984,
                redraws: 4,
                calibration: 18,
                has_roamer: false,
                pid: 0xfeb8aa0a,
                gender: Female,
                shiny: false,
                nature: Bashful,
                ability: 1,
                match_call: PokeNavTrainer::None,
            },
            Gen3HeldEgg {
                advance: 984,
                redraws: 5,
                calibration: 18,
                has_roamer: false,
                pid: 0x3965aa0a,
                gender: Female,
                shiny: false,
                nature: Adamant,
                ability: 1,
                match_call: PokeNavTrainer::None,
            },
            Gen3HeldEgg {
                advance: 987,
                redraws: 0,
                calibration: 18,
                has_roamer: false,
                pid: 0xd957c6ec,
                gender: Male,
                shiny: false,
                nature: Adamant,
                ability: 1,
                match_call: PokeNavTrainer::None,
            },
            Gen3HeldEgg {
                advance: 987,
                redraws: 1,
                calibration: 18,
                has_roamer: false,
                pid: 0x1404c6ec,
                gender: Male,
                shiny: false,
                nature: Jolly,
                ability: 1,
                match_call: PokeNavTrainer::None,
            },
            Gen3HeldEgg {
                advance: 987,
                redraws: 2,
                calibration: 18,
                has_roamer: false,
                pid: 0x4eb1c6ec,
                gender: Male,
                shiny: false,
                nature: Rash,
                ability: 1,
                match_call: PokeNavTrainer::None,
            },
            Gen3HeldEgg {
                advance: 987,
                redraws: 3,
                calibration: 18,
                has_roamer: false,
                pid: 0x895ec6ec,
                gender: Male,
                shiny: false,
                nature: Hardy,
                ability: 1,
                match_call: PokeNavTrainer::None,
            },
            Gen3HeldEgg {
                advance: 987,
                redraws: 4,
                calibration: 18,
                has_roamer: false,
                pid: 0xc40bc6ec,
                gender: Male,
                shiny: false,
                nature: Docile,
                ability: 1,
                match_call: PokeNavTrainer::None,
            },
            Gen3HeldEgg {
                advance: 987,
                redraws: 5,
                calibration: 18,
                has_roamer: false,
                pid: 0xfeb8c6ec,
                gender: Male,
                shiny: false,
                nature: Serious,
                ability: 1,
                match_call: PokeNavTrainer::None,
            },
        ];

        assert_list_eq!(results, expected);
    }

    #[test]
    fn compatability_get_along() {
        let opts = Egg3HeldOptions {
            delay: 0,
            filter_impossible_to_hit: false,
            compatability: Compatability::GetAlong,
            calibration: 18,
            has_roamer: false,
            has_lightning_rod: false,
            registered_trainers: vec![],
            initial_advances: 1000,
            max_advances: 3,
            min_redraw: 0,
            max_redraw: 1,
            tid: 0,
            sid: 0,
            lua_adjustment: false,
            egg_species: Species::Bulbasaur,
            filters: Egg3HeldFilters {
                shiny: false,
                nature: vec![],
                gender: None,
                match_call: None,
            },
        };

        let results = emerald_egg_held_states(&opts);
        let expected = [
            Gen3HeldEgg {
                advance: 982,
                redraws: 0,
                calibration: 18,
                has_roamer: false,
                pid: 0x907710c8,
                gender: Male,
                shiny: false,
                nature: Lax,
                ability: 1,
                match_call: PokeNavTrainer::None,
            },
            Gen3HeldEgg {
                advance: 982,
                redraws: 1,
                calibration: 18,
                has_roamer: false,
                pid: 0xcb2410c8,
                gender: Male,
                shiny: false,
                nature: Modest,
                ability: 1,
                match_call: PokeNavTrainer::None,
            },
            Gen3HeldEgg {
                advance: 983,
                redraws: 0,
                calibration: 18,
                has_roamer: false,
                pid: 0xd23d2c1d,
                gender: Female,
                shiny: false,
                nature: Quirky,
                ability: 2,
                match_call: PokeNavTrainer::None,
            },
            Gen3HeldEgg {
                advance: 983,
                redraws: 1,
                calibration: 18,
                has_roamer: false,
                pid: 0xcea2c1d,
                gender: Female,
                shiny: false,
                nature: Lax,
                ability: 2,
                match_call: PokeNavTrainer::None,
            },
            Gen3HeldEgg {
                advance: 984,
                redraws: 0,
                calibration: 18,
                has_roamer: false,
                pid: 0x1404aa0a,
                gender: Female,
                shiny: false,
                nature: Rash,
                ability: 1,
                match_call: PokeNavTrainer::None,
            },
            Gen3HeldEgg {
                advance: 984,
                redraws: 1,
                calibration: 18,
                has_roamer: false,
                pid: 0x4eb1aa0a,
                gender: Female,
                shiny: false,
                nature: Hardy,
                ability: 1,
                match_call: PokeNavTrainer::None,
            },
        ];

        assert_list_eq!(results, expected);
    }

    #[test]
    fn compatability_get_along_well() {
        let opts = Egg3HeldOptions {
            delay: 0,
            filter_impossible_to_hit: false,
            compatability: Compatability::GetAlongVeryWell,
            calibration: 18,
            has_roamer: false,
            has_lightning_rod: false,
            registered_trainers: vec![],
            initial_advances: 1000,
            max_advances: 3,
            min_redraw: 0,
            max_redraw: 1,
            tid: 0,
            sid: 0,
            lua_adjustment: false,
            egg_species: Species::Bulbasaur,
            filters: Egg3HeldFilters {
                shiny: false,
                nature: vec![],
                gender: None,
                match_call: None,
            },
        };

        let results = emerald_egg_held_states(&opts);
        let expected = [
            Gen3HeldEgg {
                advance: 982,
                redraws: 0,
                calibration: 18,
                has_roamer: false,
                pid: 0x907710c8,
                gender: Male,
                shiny: false,
                nature: Lax,
                ability: 1,
                match_call: PokeNavTrainer::None,
            },
            Gen3HeldEgg {
                advance: 982,
                redraws: 1,
                calibration: 18,
                has_roamer: false,
                pid: 0xcb2410c8,
                gender: Male,
                shiny: false,
                nature: Modest,
                ability: 1,
                match_call: PokeNavTrainer::None,
            },
            Gen3HeldEgg {
                advance: 983,
                redraws: 0,
                calibration: 18,
                has_roamer: false,
                pid: 0xd23d2c1d,
                gender: Female,
                shiny: false,
                nature: Quirky,
                ability: 2,
                match_call: PokeNavTrainer::None,
            },
            Gen3HeldEgg {
                advance: 983,
                redraws: 1,
                calibration: 18,
                has_roamer: false,
                pid: 0xcea2c1d,
                gender: Female,
                shiny: false,
                nature: Lax,
                ability: 2,
                match_call: PokeNavTrainer::None,
            },
            Gen3HeldEgg {
                advance: 984,
                redraws: 0,
                calibration: 18,
                has_roamer: false,
                pid: 0x1404aa0a,
                gender: Female,
                shiny: false,
                nature: Rash,
                ability: 1,
                match_call: PokeNavTrainer::None,
            },
            Gen3HeldEgg {
                advance: 984,
                redraws: 1,
                calibration: 18,
                has_roamer: false,
                pid: 0x4eb1aa0a,
                gender: Female,
                shiny: false,
                nature: Hardy,
                ability: 1,
                match_call: PokeNavTrainer::None,
            },
            Gen3HeldEgg {
                advance: 985,
                redraws: 0,
                calibration: 18,
                has_roamer: false,
                pid: 0x55cae766,
                gender: Male,
                shiny: false,
                nature: Calm,
                ability: 1,
                match_call: PokeNavTrainer::None,
            },
            Gen3HeldEgg {
                advance: 985,
                redraws: 1,
                calibration: 18,
                has_roamer: false,
                pid: 0x9077e766,
                gender: Male,
                shiny: false,
                nature: Lonely,
                ability: 1,
                match_call: PokeNavTrainer::None,
            },
        ];

        assert_list_eq!(results, expected);
    }

    #[test]
    fn shiny_filter() {
        let opts = Egg3HeldOptions {
            delay: 0,
            filter_impossible_to_hit: false,
            compatability: Compatability::GetAlong,
            calibration: 18,
            has_roamer: false,
            has_lightning_rod: false,
            registered_trainers: vec![],
            initial_advances: 1000,
            max_advances: 3,
            min_redraw: 0,
            max_redraw: 1,
            tid: 53821,
            sid: 11293,
            lua_adjustment: false,
            egg_species: Species::Bulbasaur,
            filters: Egg3HeldFilters {
                shiny: true,
                nature: vec![],
                gender: None,
                match_call: None,
            },
        };

        let results = emerald_egg_held_states(&opts);
        let expected = [Gen3HeldEgg {
            advance: 983,
            redraws: 0,
            calibration: 18,
            has_roamer: false,
            pid: 0xD23D2C1D,
            shiny: true,
            nature: Nature::Quirky,
            ability: 2,
            gender: Gender::Female,
            match_call: PokeNavTrainer::None,
        }];

        assert_list_eq!(results, expected);
    }

    #[test]
    fn positive_delay() {
        let mut opts = Egg3HeldOptions {
            delay: 0,
            filter_impossible_to_hit: false,
            compatability: Compatability::GetAlong,
            calibration: 18,
            has_roamer: false,
            has_lightning_rod: false,
            registered_trainers: vec![],
            initial_advances: 1000,
            max_advances: 3,
            min_redraw: 0,
            max_redraw: 1,
            tid: 0,
            sid: 0,
            lua_adjustment: false,
            egg_species: Species::Bulbasaur,
            filters: Egg3HeldFilters {
                shiny: false,
                nature: vec![],
                gender: None,
                match_call: None,
            },
        };

        let first_results = emerald_egg_held_states(&opts);
        opts.delay = 10;
        let second_results = emerald_egg_held_states(&opts)
            .into_iter()
            .map(|mut egg| {
                egg.advance = egg.advance.saturating_add(10);
                egg
            })
            .collect::<Vec<_>>();

        assert_list_eq!(first_results, second_results);
    }

    #[test]
    fn negative_delay() {
        let mut opts = Egg3HeldOptions {
            delay: 0,
            filter_impossible_to_hit: false,
            compatability: Compatability::GetAlong,
            calibration: 18,
            has_roamer: false,
            has_lightning_rod: false,
            registered_trainers: vec![],
            initial_advances: 1000,
            max_advances: 3,
            min_redraw: 0,
            max_redraw: 1,
            tid: 0,
            sid: 0,
            lua_adjustment: false,
            egg_species: Species::Bulbasaur,
            filters: Egg3HeldFilters {
                shiny: false,
                nature: vec![],
                gender: None,
                match_call: None,
            },
        };

        let first_results = emerald_egg_held_states(&opts);
        opts.delay = -10;
        let second_results = emerald_egg_held_states(&opts)
            .into_iter()
            .map(|mut egg| {
                egg.advance = egg.advance.saturating_sub(10);
                egg
            })
            .collect::<Vec<_>>();

        assert_list_eq!(first_results, second_results);
    }

    #[test]
    fn lua_adjustment() {
        let mut opts = Egg3HeldOptions {
            delay: 0,
            filter_impossible_to_hit: false,
            compatability: Compatability::GetAlong,
            calibration: 18,
            has_roamer: false,
            has_lightning_rod: false,
            registered_trainers: vec![],
            initial_advances: 1000,
            max_advances: 3,
            min_redraw: 0,
            max_redraw: 1,
            tid: 0,
            sid: 0,
            lua_adjustment: false,
            egg_species: Species::Bulbasaur,
            filters: Egg3HeldFilters {
                shiny: false,
                nature: vec![],
                gender: None,
                match_call: None,
            },
        };

        let first_results = emerald_egg_held_states(&opts);
        opts.lua_adjustment = true;
        let second_results = emerald_egg_held_states(&opts)
            .into_iter()
            .map(|mut egg| {
                egg.advance = egg.advance.saturating_sub(1);
                egg
            })
            .collect::<Vec<_>>();

        assert_list_eq!(first_results, second_results);
    }

    #[test]
    fn illumise_gender() {
        let opts = Egg3HeldOptions {
            delay: 0,
            filter_impossible_to_hit: false,
            compatability: Compatability::GetAlong,
            calibration: 18,
            has_roamer: false,
            has_lightning_rod: false,
            registered_trainers: vec![],
            initial_advances: 101,
            max_advances: 5,
            min_redraw: 0,
            max_redraw: 0,
            tid: 0,
            sid: 0,
            lua_adjustment: false,
            egg_species: Species::Illumise,
            filters: Egg3HeldFilters {
                shiny: false,
                nature: vec![],
                gender: None,
                match_call: None,
            },
        };

        let result = emerald_egg_held_states(&opts);

        let expected = [
            Gen3HeldEgg {
                advance: 83,
                redraws: 0,
                calibration: 18,
                has_roamer: false,
                pid: 0x95122D94,
                shiny: false,
                nature: Nature::Hardy,
                ability: 1,
                gender: Gender::Female,
                match_call: PokeNavTrainer::None,
            },
            Gen3HeldEgg {
                advance: 84,
                redraws: 0,
                calibration: 18,
                has_roamer: false,
                pid: 0xD6D80967,
                shiny: false,
                nature: Nature::Relaxed,
                ability: 2,
                gender: Gender::Female,
                match_call: PokeNavTrainer::None,
            },
            Gen3HeldEgg {
                advance: 85,
                redraws: 0,
                calibration: 18,
                has_roamer: false,
                pid: 0x189E112E,
                shiny: false,
                nature: Nature::Calm,
                ability: 1,
                gender: Gender::Female,
                match_call: PokeNavTrainer::None,
            },
            Gen3HeldEgg {
                advance: 86,
                redraws: 0,
                calibration: 18,
                has_roamer: false,
                pid: 0x5A65A1E1,
                shiny: false,
                nature: Nature::Quiet,
                ability: 2,
                gender: Gender::Male,
                match_call: PokeNavTrainer::None,
            },
            Gen3HeldEgg {
                advance: 88,
                redraws: 0,
                calibration: 18,
                has_roamer: false,
                pid: 0xDDF173C5,
                shiny: false,
                nature: Nature::Quirky,
                ability: 2,
                gender: Gender::Female,
                match_call: PokeNavTrainer::None,
            },
        ];

        assert_list_eq!(result, expected);
    }

    #[test]
    fn nidoranf_gender() {
        let opts = Egg3HeldOptions {
            delay: 0,
            filter_impossible_to_hit: false,
            compatability: Compatability::GetAlong,
            calibration: 18,
            has_roamer: false,
            has_lightning_rod: false,
            registered_trainers: vec![],
            initial_advances: 101,
            max_advances: 5,
            min_redraw: 0,
            max_redraw: 0,
            tid: 0,
            sid: 0,
            lua_adjustment: false,
            egg_species: Species::NidoranF,
            filters: Egg3HeldFilters {
                shiny: false,
                nature: vec![],
                gender: None,
                match_call: None,
            },
        };

        let result = emerald_egg_held_states(&opts);

        let expected = [
            Gen3HeldEgg {
                advance: 83,
                redraws: 0,
                calibration: 18,
                has_roamer: false,
                pid: 0x95122D94,
                shiny: false,
                nature: Nature::Hardy,
                ability: 1,
                gender: Gender::Female,
                match_call: PokeNavTrainer::None,
            },
            Gen3HeldEgg {
                advance: 84,
                redraws: 0,
                calibration: 18,
                has_roamer: false,
                pid: 0xD6D80967,
                shiny: false,
                nature: Nature::Relaxed,
                ability: 2,
                gender: Gender::Female,
                match_call: PokeNavTrainer::None,
            },
            Gen3HeldEgg {
                advance: 85,
                redraws: 0,
                calibration: 18,
                has_roamer: false,
                pid: 0x189E112E,
                shiny: false,
                nature: Nature::Calm,
                ability: 1,
                gender: Gender::Female,
                match_call: PokeNavTrainer::None,
            },
            Gen3HeldEgg {
                advance: 86,
                redraws: 0,
                calibration: 18,
                has_roamer: false,
                pid: 0x5A65A1E1,
                shiny: false,
                nature: Nature::Quiet,
                ability: 2,
                gender: Gender::Male,
                match_call: PokeNavTrainer::None,
            },
            Gen3HeldEgg {
                advance: 88,
                redraws: 0,
                calibration: 18,
                has_roamer: false,
                pid: 0xDDF173C5,
                shiny: false,
                nature: Nature::Quirky,
                ability: 2,
                gender: Gender::Female,
                match_call: PokeNavTrainer::None,
            },
        ];

        assert_list_eq!(result, expected);
    }

    #[test]
    fn all_match_calls() {
        let opts = Egg3HeldOptions {
            delay: 0,
            filter_impossible_to_hit: false,
            compatability: Compatability::GetAlong,
            calibration: 21,
            has_roamer: false,
            has_lightning_rod: true,
            registered_trainers: register_all_trainers(),
            initial_advances: 2000,
            max_advances: 2100,
            min_redraw: 0,
            max_redraw: 0,
            tid: 12345,
            sid: 54321,
            lua_adjustment: true,
            egg_species: Species::Ralts,
            filters: Egg3HeldFilters {
                shiny: true,
                nature: vec![],
                gender: None,
                match_call: None,
            },
        };

        let result = emerald_egg_held_states(&opts);

        let expected = [Gen3HeldEgg {
            advance: 2040,
            redraws: 0,
            calibration: 21,
            has_roamer: false,
            pid: 0x2441C04C,
            shiny: true,
            nature: Nature::Rash,
            ability: 1,
            gender: Gender::Female,
            match_call: PokeNavTrainer::GuitaristFernando,
        }];

        assert_list_eq!(result, expected);
    }

    #[test]
    fn partial_match_calls() {
        use PokeNavTrainer::*;
        let opts = Egg3HeldOptions {
            delay: 0,
            filter_impossible_to_hit: false,
            compatability: Compatability::GetAlong,
            calibration: 21,
            has_roamer: false,
            has_lightning_rod: true,
            registered_trainers: vec![
                AromaLadyRose,
                RuinManiacAndres,
                RuinManiacDusty,
                TuberLola,
                TuberRicky,
                SisAndBroLilaRoy,
                CoolTrainerCristin,
                CoolTrainerBrooke,
                CoolTrainerWilton,
                HexManiacValerie,
            ],
            initial_advances: 2000,
            max_advances: 2100,
            min_redraw: 0,
            max_redraw: 0,
            tid: 12345,
            sid: 54321,
            lua_adjustment: true,
            egg_species: Species::Ralts,
            filters: Egg3HeldFilters {
                shiny: true,
                nature: vec![],
                gender: Option::None,
                match_call: Option::None,
            },
        };

        let result = emerald_egg_held_states(&opts);

        let expected = [Gen3HeldEgg {
            advance: 2040,
            redraws: 0,
            calibration: 21,
            has_roamer: false,
            pid: 0x2441C04C,
            shiny: true,
            nature: Nature::Rash,
            ability: 1,
            gender: Gender::Female,
            match_call: PokeNavTrainer::RuinManiacDusty,
        }];

        assert_list_eq!(result, expected);
    }

    #[test]
    fn filter_match_calls() {
        let opts = Egg3HeldOptions {
            delay: 0,
            filter_impossible_to_hit: false,
            compatability: Compatability::GetAlong,
            calibration: 21,
            has_roamer: false,
            has_lightning_rod: true,
            registered_trainers: register_all_trainers(),
            initial_advances: 2000,
            max_advances: 100,
            min_redraw: 0,
            max_redraw: 0,
            tid: 12345,
            sid: 54321,
            lua_adjustment: true,
            egg_species: Species::Ralts,
            filters: Egg3HeldFilters {
                shiny: false,
                nature: vec![],
                gender: None,
                match_call: Some(PokeNavTrainer::FishermanElliot),
            },
        };

        let result = emerald_egg_held_states(&opts);

        let expected = [
            Gen3HeldEgg {
                advance: 1996,
                redraws: 0,
                has_roamer: false,
                calibration: 21,
                pid: 0xd62b19f8,
                gender: Male,
                shiny: false,
                nature: Calm,
                ability: 1,
                match_call: PokeNavTrainer::FishermanElliot,
            },
            Gen3HeldEgg {
                advance: 2042,
                redraws: 0,
                has_roamer: false,
                calibration: 21,
                pid: 0xa7cdf7d3,
                gender: Male,
                shiny: false,
                nature: Calm,
                ability: 2,
                match_call: PokeNavTrainer::FishermanElliot,
            },
        ];

        assert_list_eq!(result, expected);
    }

    #[test]
    fn no_lightning_rod_match_calls() {
        let opts = Egg3HeldOptions {
            delay: 0,
            filter_impossible_to_hit: false,
            compatability: Compatability::GetAlong,
            calibration: 21,
            has_roamer: false,
            has_lightning_rod: false,
            registered_trainers: register_all_trainers(),
            initial_advances: 2000,
            max_advances: 2100,
            min_redraw: 0,
            max_redraw: 0,
            tid: 12345,
            sid: 54321,
            lua_adjustment: true,
            egg_species: Species::Ralts,
            filters: Egg3HeldFilters {
                shiny: true,
                nature: vec![],
                gender: None,
                match_call: None,
            },
        };

        let result = emerald_egg_held_states(&opts);

        let expected = [Gen3HeldEgg {
            advance: 2040,
            redraws: 0,
            calibration: 21,
            has_roamer: false,
            pid: 0x2441C04C,
            shiny: true,
            nature: Nature::Rash,
            ability: 1,
            gender: Gender::Female,
            match_call: PokeNavTrainer::None,
        }];

        assert_list_eq!(result, expected);
    }

    #[test]
    fn roamer_rod_match_calls() {
        let opts = Egg3HeldOptions {
            delay: 0,
            filter_impossible_to_hit: false,
            compatability: Compatability::GetAlong,
            calibration: 22,
            has_roamer: true,
            has_lightning_rod: true,
            registered_trainers: register_all_trainers(),
            initial_advances: 6600,
            max_advances: 200,
            min_redraw: 0,
            max_redraw: 0,
            tid: 12345,
            sid: 54321,
            lua_adjustment: true,
            egg_species: Species::Ralts,
            filters: Egg3HeldFilters {
                shiny: true,
                nature: vec![],
                gender: None,
                match_call: None,
            },
        };

        let result = emerald_egg_held_states(&opts);

        let expected = [Gen3HeldEgg {
            advance: 6695,
            redraws: 0,
            calibration: 22,
            has_roamer: true,
            pid: 0x292DCD22,
            shiny: true,
            nature: Nature::Modest,
            ability: 1,
            gender: Gender::Female,
            match_call: PokeNavTrainer::CoolTrainerCristin,
        }];

        assert_eq!(result, expected);
    }

    #[test]
    fn match_call() {
        let opts = NoEggMatchCallOpts {
            initial_advances: 0,
            calibration: 20,
            has_lightning_rod: true,
            has_roamer: false,
            max_advances: 12,
            registered_trainers: register_all_trainers(),
            seed: 0,
            match_call_filter: None,
        };

        let results = generate_no_egg_match_calls(opts);

        let expected: Vec<NoEggMatchCall> = [
            PokeNavTrainer::None,
            PokeNavTrainer::None,
            PokeNavTrainer::AromaLadyRose,
            PokeNavTrainer::None,
            PokeNavTrainer::None,
            PokeNavTrainer::GuitaristDalton,
            PokeNavTrainer::None,
            PokeNavTrainer::FishermanElliot,
            PokeNavTrainer::TriathleteBenjamin,
            PokeNavTrainer::PokefanIsabel,
            PokeNavTrainer::TriathleteBenjamin,
            PokeNavTrainer::RichBoyWinston,
            PokeNavTrainer::OldCoupleJohnJay,
        ]
        .into_iter()
        .enumerate()
        .map(|(advance, match_call)| NoEggMatchCall {
            advance,
            match_call,
        })
        .collect();

        assert_list_eq!(results, expected);
    }

    #[test]
    fn match_call_filter() {
        let opts = NoEggMatchCallOpts {
            initial_advances: 0,
            calibration: 20,
            has_lightning_rod: true,
            has_roamer: false,
            max_advances: 12,
            registered_trainers: register_all_trainers(),
            seed: 0,
            match_call_filter: Some(PokeNavTrainer::TriathleteBenjamin),
        };

        let results = generate_no_egg_match_calls(opts);

        let expected: [NoEggMatchCall; 2] = [
            NoEggMatchCall {
                advance: 8,
                match_call: PokeNavTrainer::TriathleteBenjamin,
            },
            NoEggMatchCall {
                advance: 10,
                match_call: PokeNavTrainer::TriathleteBenjamin,
            },
        ];

        assert_list_eq!(results, expected);
    }

    mod pokefinder {
        use super::*;

        fn parse_pokefinder(str: &str) -> Vec<Gen3HeldEgg> {
            str.lines()
                .map(|raw_line| {
                    let line = raw_line.trim();

                    if line.is_empty() {
                        panic!("Empty line in chatter data");
                    }

                    let parts: Vec<&str> = line.split("\t").collect();
                    let advance: usize = parts[0].parse().unwrap();
                    let redraws: usize = parts[2].parse().unwrap();
                    let pid = u32::from_str_radix(parts[3], 16).unwrap();
                    let shiny = parts[4] != "No";
                    let nature = Nature::from_str(parts[5]);
                    let ability = AbilityType::from_pokefinder_str(parts[6]);
                    let gender = Gender::from_pokefinder_str(parts[15]);

                    Gen3HeldEgg {
                        advance: advance + (redraws * 3),
                        redraws,
                        has_roamer: false,
                        calibration: 18,
                        pid,
                        gender,
                        shiny,
                        nature,
                        ability: (ability as u8) + 1,
                        match_call: PokeNavTrainer::None,
                    }
                })
                .collect()
        }

        macro_rules! pokefinder {
            ($file:expr) => {
                parse_pokefinder(include_str!($file))
            };
        }

        fn clear_match_call(results: Vec<Gen3HeldEgg>) -> Vec<Gen3HeldEgg> {
            results
                .into_iter()
                .map(|egg| Gen3HeldEgg {
                    match_call: PokeNavTrainer::None,
                    ..egg
                })
                .collect()
        }

        fn sort(eggs: Vec<Gen3HeldEgg>) -> Vec<Gen3HeldEgg> {
            eggs.into_iter()
                .sorted_by(|a, b| a.redraws.cmp(&b.redraws).then(a.advance.cmp(&b.advance)))
                .collect()
        }

        #[test]
        fn dont_like_each_other() {
            let opts = Egg3HeldOptions {
                delay: 0,
                filter_impossible_to_hit: false,
                compatability: Compatability::DontLikeEachOther,
                calibration: 18,
                has_roamer: false,
                has_lightning_rod: false,
                registered_trainers: vec![],
                initial_advances: 100,
                max_advances: 100,
                min_redraw: 0,
                max_redraw: 5,
                tid: 12345,
                sid: 54321,
                lua_adjustment: false,
                egg_species: Species::Bulbasaur,
                filters: Egg3HeldFilters {
                    shiny: false,
                    nature: vec![],
                    gender: None,
                    match_call: None,
                },
            };

            let results = sort(clear_match_call(emerald_egg_held_states(&opts)));
            let expected = sort(pokefinder!("test_data/held/dont_like_each_other.txt"));

            assert_list_eq!(results, expected);
        }

        #[test]
        fn get_along() {
            let opts = Egg3HeldOptions {
                delay: 0,
                filter_impossible_to_hit: false,
                compatability: Compatability::GetAlong,
                calibration: 18,
                has_roamer: false,
                has_lightning_rod: false,
                registered_trainers: vec![],
                initial_advances: 100,
                max_advances: 100,
                min_redraw: 0,
                max_redraw: 5,
                tid: 0,
                sid: 0,
                lua_adjustment: false,
                egg_species: Species::Bulbasaur,
                filters: Egg3HeldFilters {
                    shiny: false,
                    nature: vec![],
                    gender: None,
                    match_call: None,
                },
            };

            let results = sort(clear_match_call(emerald_egg_held_states(&opts)));
            let expected = sort(pokefinder!("test_data/held/get_along.txt"));

            assert_list_eq!(results, expected);
        }

        #[test]
        fn get_along_well() {
            let opts = Egg3HeldOptions {
                delay: 0,
                filter_impossible_to_hit: false,
                compatability: Compatability::GetAlongVeryWell,
                calibration: 18,
                has_roamer: false,
                has_lightning_rod: false,
                registered_trainers: vec![],
                initial_advances: 100,
                max_advances: 100,
                min_redraw: 0,
                max_redraw: 5,
                tid: 0,
                sid: 0,
                lua_adjustment: false,
                egg_species: Species::Bulbasaur,
                filters: Egg3HeldFilters {
                    shiny: false,
                    nature: vec![],
                    gender: None,
                    match_call: None,
                },
            };

            let results = sort(clear_match_call(emerald_egg_held_states(&opts)));
            let expected = sort(pokefinder!("test_data/held/get_along_very_well.txt"));

            assert_list_eq!(results, expected);
        }
    }
}
