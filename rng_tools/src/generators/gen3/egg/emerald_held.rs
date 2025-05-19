use crate::Nature;
use crate::rng::lcrng::Pokerng;
use crate::rng::{Rng, StateIterator};
use crate::{Gender, Species, gen3_shiny};
use num_enum::FromPrimitive;
use serde::{Deserialize, Serialize};
use tsify_next::Tsify;
use wasm_bindgen::prelude::*;

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
    pid: u32,
    match_call: PokeNavTrainer,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct Gen3HeldEgg {
    pub advance: usize,
    pub redraws: usize,
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
    pub nature: Option<Nature>,
    pub gender: Option<Gender>,
}

impl Egg3HeldFilters {
    fn pass_filter(&self, egg: &Gen3HeldEgg) -> bool {
        if self.shiny && !egg.shiny {
            return false;
        }

        if let Some(nature) = self.nature {
            if egg.nature != nature {
                return false;
            }
        }

        if let Some(gender) = self.gender {
            if egg.gender != gender {
                return false;
            }
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
    pub female_has_everstone: bool,
    pub female_nature: Nature,
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
    result.sort_by(|a, b| a.advance.cmp(&b.advance));
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
    let roamer_calib = match opts.has_roamer {
        true => 1,
        false => 0,
    };
    let calibration = opts.calibration.saturating_add(roamer_calib);

    let mut generate_state_opts = GenerateStateOpts {
        go: rng,
        ordered_trainers: &ordered_trainers,
        calibration,
        has_lightning_rod: opts.has_lightning_rod,
        female_has_everstone: opts.female_has_everstone,
        female_nature: opts.female_nature,
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
    redraws: usize,
    initial_advances: usize,
    calibration: usize,
    max_advances: usize,
    has_lightning_rod: bool,
    registered_trainers: Vec<PokeNavTrainer>,
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

    let initial_advances = opts
        .redraws
        .saturating_mul(3)
        .saturating_add(opts.calibration)
        .saturating_add(opts.initial_advances);

    StateIterator::new(rng)
        .skip(1) // egg rand
        .enumerate()
        .skip(initial_advances)
        .take(opts.max_advances.saturating_add(1))
        .map(|(advance, mut rng)| NoEggMatchCall {
            advance,
            match_call: generate_match_call(&mut rng, opts.has_lightning_rod, &ordered_trainers),
        })
        .collect()
}

struct GenerateStateOpts<'a> {
    go: Pokerng,
    ordered_trainers: &'a [PokeNavTrainer],
    calibration: usize,
    has_lightning_rod: bool,
    female_has_everstone: bool,
    female_nature: Nature,
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

    let use_everstone = match opts.female_has_everstone {
        true => (go.rand::<u16>() >> 15) == 0,
        false => false,
    };

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

    if !use_everstone {
        let pid = (go.rand_max::<u16>(0xfffe) + 1) as u32 | ((trng.rand::<u16>() as u32) << 16);
        return Some(Gen3HeldEggPid {
            redraws,
            calibration,
            pid,
            advance: held_advance,
            match_call: generate_match_call(&mut go, has_lightning_rod, opts.ordered_trainers),
        });
    }

    // Stop after 17 due to vblank.
    // If we haven't found a result yet, we probably won't find one after this.
    (0..17)
        .find_map(|_| {
            let test_pid = (go.rand::<u16>() as u32) | ((trng.rand::<u16>() as u32) << 16);
            match Nature::from_pid(test_pid) == opts.female_nature {
                true => Some(test_pid),
                false => None,
            }
        })
        .map(|pid| Gen3HeldEggPid {
            redraws,
            calibration,
            pid,
            advance: held_advance,
            match_call: generate_match_call(&mut go, has_lightning_rod, opts.ordered_trainers),
        })
}

#[cfg(test)]
mod test {
    use super::Gender::*;
    use super::Nature::*;
    use super::*;
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
            female_has_everstone: false,
            female_nature: Nature::Hardy,
            tid: 0,
            sid: 0,
            lua_adjustment: false,
            egg_species: Species::Bulbasaur,
            filters: Egg3HeldFilters {
                shiny: false,
                nature: None,
                gender: None,
            },
        };

        let results = emerald_egg_held_states(&opts);
        let expected = [
            Gen3HeldEgg {
                advance: 4294967278,
                redraws: 0,
                calibration: 18,
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
            female_has_everstone: false,
            female_nature: Nature::Hardy,
            tid: 0,
            sid: 0,
            lua_adjustment: false,
            egg_species: Species::Bulbasaur,
            filters: Egg3HeldFilters {
                shiny: false,
                nature: None,
                gender: None,
            },
        };

        let results = emerald_egg_held_states(&opts);
        let expected = [
            Gen3HeldEgg {
                advance: 983,
                redraws: 0,
                calibration: 18,
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
            female_has_everstone: false,
            female_nature: Nature::Hardy,
            tid: 0,
            sid: 0,
            lua_adjustment: false,
            egg_species: Species::Bulbasaur,
            filters: Egg3HeldFilters {
                shiny: false,
                nature: None,
                gender: None,
            },
        };

        let results = emerald_egg_held_states(&opts);
        let expected = [
            Gen3HeldEgg {
                advance: 982,
                redraws: 0,
                calibration: 18,
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
            female_has_everstone: false,
            female_nature: Nature::Hardy,
            tid: 0,
            sid: 0,
            lua_adjustment: false,
            egg_species: Species::Bulbasaur,
            filters: Egg3HeldFilters {
                shiny: false,
                nature: None,
                gender: None,
            },
        };

        let results = emerald_egg_held_states(&opts);
        let expected = [
            Gen3HeldEgg {
                advance: 982,
                redraws: 0,
                calibration: 18,
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
            female_has_everstone: false,
            female_nature: Nature::Hardy,
            tid: 53821,
            sid: 11293,
            lua_adjustment: false,
            egg_species: Species::Bulbasaur,
            filters: Egg3HeldFilters {
                shiny: true,
                nature: None,
                gender: None,
            },
        };

        let results = emerald_egg_held_states(&opts);
        let expected = [Gen3HeldEgg {
            advance: 983,
            redraws: 0,
            calibration: 18,
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
    fn everstone() {
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
            female_has_everstone: true,
            female_nature: Nature::Hardy,
            tid: 0,
            sid: 0,
            lua_adjustment: false,
            egg_species: Species::Bulbasaur,
            filters: Egg3HeldFilters {
                shiny: false,
                nature: None,
                gender: None,
            },
        };

        let results = emerald_egg_held_states(&opts);
        let expected = [
            Gen3HeldEgg {
                advance: 982,
                redraws: 1,
                calibration: 18,
                pid: 0x89c7d6a,
                gender: Male,
                shiny: false,
                nature: Hardy,
                ability: 1,
                match_call: PokeNavTrainer::None,
            },
            Gen3HeldEgg {
                advance: 984,
                redraws: 0,
                calibration: 18,
                pid: 0x1404e766,
                gender: Male,
                shiny: false,
                nature: Brave,
                ability: 1,
                match_call: PokeNavTrainer::None,
            },
            Gen3HeldEgg {
                advance: 984,
                redraws: 1,
                calibration: 18,
                pid: 0x4eb1e766,
                gender: Male,
                shiny: false,
                nature: Impish,
                ability: 1,
                match_call: PokeNavTrainer::None,
            },
        ];

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
            female_has_everstone: true,
            female_nature: Nature::Hardy,
            tid: 0,
            sid: 0,
            lua_adjustment: false,
            egg_species: Species::Bulbasaur,
            filters: Egg3HeldFilters {
                shiny: false,
                nature: None,
                gender: None,
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
            female_has_everstone: true,
            female_nature: Nature::Hardy,
            tid: 0,
            sid: 0,
            lua_adjustment: false,
            egg_species: Species::Bulbasaur,
            filters: Egg3HeldFilters {
                shiny: false,
                nature: None,
                gender: None,
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
            female_has_everstone: true,
            female_nature: Nature::Hardy,
            tid: 0,
            sid: 0,
            lua_adjustment: false,
            egg_species: Species::Bulbasaur,
            filters: Egg3HeldFilters {
                shiny: false,
                nature: None,
                gender: None,
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
            female_has_everstone: false,
            female_nature: Nature::Adamant,
            tid: 0,
            sid: 0,
            lua_adjustment: false,
            egg_species: Species::Illumise,
            filters: Egg3HeldFilters {
                shiny: false,
                nature: None,
                gender: None,
            },
        };

        let result = emerald_egg_held_states(&opts);

        let expected = [
            Gen3HeldEgg {
                advance: 83,
                redraws: 0,
                calibration: 18,
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
            female_has_everstone: false,
            female_nature: Nature::Adamant,
            tid: 0,
            sid: 0,
            lua_adjustment: false,
            egg_species: Species::NidoranF,
            filters: Egg3HeldFilters {
                shiny: false,
                nature: None,
                gender: None,
            },
        };

        let result = emerald_egg_held_states(&opts);

        let expected = [
            Gen3HeldEgg {
                advance: 83,
                redraws: 0,
                calibration: 18,
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
            female_has_everstone: false,
            female_nature: Nature::Adamant,
            tid: 12345,
            sid: 54321,
            lua_adjustment: true,
            egg_species: Species::Ralts,
            filters: Egg3HeldFilters {
                shiny: true,
                nature: None,
                gender: None,
            },
        };

        let result = emerald_egg_held_states(&opts);

        let expected = [Gen3HeldEgg {
            advance: 2040,
            redraws: 0,
            calibration: 21,
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
            female_has_everstone: false,
            female_nature: Nature::Adamant,
            tid: 12345,
            sid: 54321,
            lua_adjustment: true,
            egg_species: Species::Ralts,
            filters: Egg3HeldFilters {
                shiny: true,
                nature: Option::None,
                gender: Option::None,
            },
        };

        let result = emerald_egg_held_states(&opts);

        let expected = [Gen3HeldEgg {
            advance: 2040,
            redraws: 0,
            calibration: 21,
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
            female_has_everstone: false,
            female_nature: Nature::Adamant,
            tid: 12345,
            sid: 54321,
            lua_adjustment: true,
            egg_species: Species::Ralts,
            filters: Egg3HeldFilters {
                shiny: true,
                nature: None,
                gender: None,
            },
        };

        let result = emerald_egg_held_states(&opts);

        let expected = [Gen3HeldEgg {
            advance: 2040,
            redraws: 0,
            calibration: 21,
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
            female_has_everstone: false,
            female_nature: Nature::Adamant,
            tid: 12345,
            sid: 54321,
            lua_adjustment: true,
            egg_species: Species::Ralts,
            filters: Egg3HeldFilters {
                shiny: true,
                nature: None,
                gender: None,
            },
        };

        let result = emerald_egg_held_states(&opts);

        let expected = [Gen3HeldEgg {
            advance: 6695,
            redraws: 0,
            calibration: 23,
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
            redraws: 0,
            has_lightning_rod: true,
            max_advances: 12,
            registered_trainers: register_all_trainers(),
            seed: 0,
        };

        let results = generate_no_egg_match_calls(opts);

        let expected: Vec<NoEggMatchCall> = [
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
            PokeNavTrainer::None,
        ]
        .into_iter()
        .enumerate()
        .map(|(advance, match_call)| NoEggMatchCall {
            advance: advance + 20,
            match_call,
        })
        .collect();

        assert_list_eq!(results, expected);
    }
}
