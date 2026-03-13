use super::base_state::{BaseStatic4State, Static4State};
use crate::Species;
use crate::gen4::seed_time4::{FindSeedTime4Options, find_seedtime};
use crate::gen4::{GameVersion, LeadAbility, StaticMethod};
use crate::generators::utils::recover_poke_rng_iv;
use crate::rng::Rng;
use crate::{Ivs, Nature, PkmFilter, iv_iter, rng::lcrng::Pokerng};
use serde::{Deserialize, Serialize};
use tsify_next::Tsify;
use wasm_bindgen::prelude::*;

#[derive(Debug, Clone, Copy, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub enum Static4LeadInput {
    None,
    CutecharmF,
    CutecharmM,
    Synchronize,
}

#[derive(Debug, Clone, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct SearchStatic4Opts {
    pub tid: u16,
    pub sid: u16,
    pub game: GameVersion,
    pub species: Species,
    pub filter: PkmFilter,
    pub min_advance: usize,
    pub max_advance: usize,
    pub min_delay: u32,
    pub max_delay: u32,
    pub year: u32,
    pub force_second: Option<u32>,
    pub lead: Static4LeadInput,
}

struct SeedFilters {
    min_advance: usize,
    max_advance: usize,
    year: u32,
    min_delay: u32,
    max_delay: u32,
    force_second: Option<u32>,
}

impl SeedFilters {
    fn filter(&self, states: impl Iterator<Item = BaseStatic4State>) -> Vec<Static4State> {
        let filters = self;
        let min_advance = filters.min_advance;
        let max_advance = filters.max_advance;

        let mut results = vec![];

        for state in states {
            let mut rng = Pokerng::new(state.seed).reverse();

            rng.advance(min_advance);
            let mut seed = rng.seed();

            for advance in min_advance..=max_advance {
                // Fast path: check if seed's bits encode a valid time (PokeFinder approach)
                let hour = (seed >> 16) & 0xFF;
                let delay = seed & 0xFFFF;

                if hour < 24 && delay >= filters.min_delay && delay <= filters.max_delay {
                    // Found a match! Now verify with find_seedtime if needed
                    let seed_time_opts = FindSeedTime4Options::new(
                        seed,
                        filters.year,
                        filters.min_delay..=filters.max_delay,
                        filters.force_second,
                    );
                    if let Some(seed_time) = find_seedtime(seed_time_opts) {
                        let found_state = state.add_seedtime(advance, seed_time);
                        results.push(found_state);
                    }
                }

                seed = rng.rand::<u32>();
            }
        }

        results
    }
}

impl From<&SearchStatic4Opts> for SeedFilters {
    fn from(opts: &SearchStatic4Opts) -> Self {
        Self {
            min_advance: opts.min_advance,
            max_advance: opts.max_advance,
            year: opts.year,
            min_delay: opts.min_delay,
            max_delay: opts.max_delay,
            force_second: opts.force_second,
        }
    }
}

trait GameSpecificLogic {
    fn max(rand: u16, max: u16) -> u16;
    fn sync_check(rand: u16) -> u16;
}

struct HgssLogic;

impl GameSpecificLogic for HgssLogic {
    fn max(rand: u16, max: u16) -> u16 {
        rand % max
    }

    fn sync_check(rand: u16) -> u16 {
        rand % 2
    }
}

struct DpptLogic;

impl GameSpecificLogic for DpptLogic {
    fn max(rand: u16, max: u16) -> u16 {
        rand / ((0xffff / max) + 1)
    }

    fn sync_check(rand: u16) -> u16 {
        rand >> 15
    }
}

/// Iterator for MethodJ/K sync lead that generates states on-demand.
/// This avoids collecting millions of intermediate states into memory.
struct MethodJKSyncStateIterator<Game: GameSpecificLogic> {
    species: Species,
    tid: u16,
    sid: u16,
    ivs: Ivs,
    pid: u32,
    nature: Nature,
    nature_rand: u16,

    rng: crate::rng::lcrng::PokerngR,
    full_seed: u32,
    full_seed2: u32,
    next_rng: u16,
    next_rng_2: u16,
    finished: bool,
    returned_check1: bool,
    returned_check2: bool,

    _phantom: std::marker::PhantomData<Game>,
}

impl<Game: GameSpecificLogic> MethodJKSyncStateIterator<Game> {
    fn new(species: Species, tid: u16, sid: u16, ivs: Ivs, seed: u32) -> Self {
        let mut rng = Pokerng::new(seed).reverse();

        let pidh = rng.rand::<u16>() as u32;
        let pidl = rng.rand::<u16>() as u32;
        let pid = (pidh << 16) | pidl;

        let nature_rand = (pid % 25) as u16;
        let nature = Nature::from(nature_rand as u8);

        let full_seed = rng.rand::<u32>();
        let full_seed2 = rng.rand::<u32>();

        let next_rng = (full_seed >> 16) as u16;
        let next_rng_2 = (full_seed2 >> 16) as u16;

        MethodJKSyncStateIterator {
            species,
            tid,
            sid,
            ivs,
            pid,
            nature,
            nature_rand,
            rng,
            full_seed,
            full_seed2,
            next_rng,
            next_rng_2,
            finished: false,
            returned_check1: false,
            returned_check2: false,
            _phantom: std::marker::PhantomData,
        }
    }
}

impl<Game: GameSpecificLogic> Iterator for MethodJKSyncStateIterator<Game> {
    type Item = BaseStatic4State;

    fn next(&mut self) -> Option<Self::Item> {
        loop {
            if self.finished {
                return None;
            }

            let check1 = Game::sync_check(self.next_rng) == 0;
            let check2 = Game::sync_check(self.next_rng_2) == 1
                && Game::max(self.next_rng, 25) == self.nature_rand;

            // Yield check1 result if applicable and not yet returned
            if !self.returned_check1 && check1 {
                self.returned_check1 = true;
                return Some(BaseStatic4State::new(
                    self.full_seed2,
                    self.species,
                    self.nature,
                    self.pid,
                    self.tid,
                    self.sid,
                    self.ivs,
                    LeadAbility::Synchronize(self.nature),
                ));
            }

            // Yield check2 result if applicable and not yet returned
            if !self.returned_check2 && check2 {
                self.returned_check2 = true;
                return Some(BaseStatic4State::new(
                    self.rng.clone().rand::<u32>(),
                    self.species,
                    self.nature,
                    self.pid,
                    self.tid,
                    self.sid,
                    self.ivs,
                    LeadAbility::Synchronize(self.nature),
                ));
            }

            // Advance to next iteration
            let hunt_nature = (((self.next_rng as u32) << 16 | self.next_rng_2 as u32) % 25) as u16;

            self.full_seed = self.rng.rand::<u32>();
            self.full_seed2 = self.rng.rand::<u32>();

            self.next_rng = (self.full_seed >> 16) as u16;
            self.next_rng_2 = (self.full_seed2 >> 16) as u16;

            self.returned_check1 = false;
            self.returned_check2 = false;

            if hunt_nature == self.nature_rand {
                self.finished = true;
            }
        }
    }
}

fn get_methodjk_sync_state<Game: GameSpecificLogic>(
    species: Species,
    tid: u16,
    sid: u16,
    ivs: Ivs,
    seed: u32,
) -> impl Iterator<Item = BaseStatic4State> {
    MethodJKSyncStateIterator::<Game>::new(species, tid, sid, ivs, seed)
}

fn get_methodjk_cutecharm<Game: GameSpecificLogic>(
    lead: Static4LeadInput,
    species: Species,
    tid: u16,
    sid: u16,
    ivs: Ivs,
    seed: u32,
) -> Vec<BaseStatic4State> {
    let mut rng = Pokerng::new(seed).reverse();

    let gender_threshold = species.gender_ratio();

    let buffer: u32 = match lead {
        Static4LeadInput::CutecharmF => 25 * ((gender_threshold as u32 / 25) + 1),
        _ => 0,
    };

    let nature_rand = Game::max(rng.rand::<u16>(), 25);
    let nature = Nature::from(nature_rand as u8);
    let full_seed = rng.rand::<u32>();

    if Game::max((full_seed >> 16) as u16, 3) == 0 {
        return vec![];
    }

    let pid = buffer + nature_rand as u32;
    let mut seed_rng = Pokerng::new(full_seed).rev();
    let origin_seed = seed_rng.rand::<u32>();

    let out_lead = match lead {
        Static4LeadInput::CutecharmF => LeadAbility::CutecharmF,
        _ => LeadAbility::CutecharmM,
    };

    let state = BaseStatic4State::new(origin_seed, species, nature, pid, tid, sid, ivs, out_lead);
    vec![state]
}

/// Iterator for MethodJ/K no lead that generates states on-demand.
/// This avoids collecting millions of intermediate states into memory.
struct MethodJKNoLeadStateIterator<Game: GameSpecificLogic> {
    species: Species,
    tid: u16,
    sid: u16,
    ivs: Ivs,
    pid: u32,
    nature_rand: u16,
    nature: Nature,

    rng: crate::rng::lcrng::PokerngR,
    full_seed: u32,
    next_rng: u16,
    next_rng_2: u16,
    finished: bool,

    _phantom: std::marker::PhantomData<Game>,
}

impl<Game: GameSpecificLogic> MethodJKNoLeadStateIterator<Game> {
    fn new(species: Species, tid: u16, sid: u16, ivs: Ivs, seed: u32) -> Self {
        let mut rng = Pokerng::new(seed).reverse();

        let pidh = rng.rand::<u16>() as u32;
        let pidl = rng.rand::<u16>() as u32;
        let pid = (pidh << 16) | pidl;

        let nature_rand = (pid % 25) as u16;
        let nature = Nature::from(nature_rand as u8);

        let full_seed = rng.rand::<u32>();
        let next_rng = (full_seed >> 16) as u16;
        let next_rng_2 = rng.rand::<u16>();

        MethodJKNoLeadStateIterator {
            species,
            tid,
            sid,
            ivs,
            pid,
            nature_rand,
            nature,
            rng,
            full_seed,
            next_rng,
            next_rng_2,
            finished: false,
            _phantom: std::marker::PhantomData,
        }
    }
}

impl<Game: GameSpecificLogic> Iterator for MethodJKNoLeadStateIterator<Game> {
    type Item = BaseStatic4State;

    fn next(&mut self) -> Option<Self::Item> {
        loop {
            if self.finished {
                return None;
            }

            if Game::max(self.next_rng, 25) == self.nature_rand {
                let mut seed_rng = Pokerng::new(self.full_seed).rev();
                let origin_seed = seed_rng.rand::<u32>();

                let result = Some(BaseStatic4State::new(
                    origin_seed,
                    self.species,
                    self.nature,
                    self.pid,
                    self.tid,
                    self.sid,
                    self.ivs,
                    LeadAbility::None,
                ));

                // Advance before returning to prepare for next iteration
                let hunt_nature =
                    (((self.next_rng as u32) << 16 | self.next_rng_2 as u32) % 25) as u16;
                self.full_seed = self.rng.rand::<u32>();
                self.next_rng = (self.full_seed >> 16) as u16;
                self.next_rng_2 = self.rng.rand::<u16>();

                if hunt_nature == self.nature_rand {
                    self.finished = true;
                }

                return result;
            }

            // Advance and check termination
            let hunt_nature = (((self.next_rng as u32) << 16 | self.next_rng_2 as u32) % 25) as u16;
            self.full_seed = self.rng.rand::<u32>();
            self.next_rng = (self.full_seed >> 16) as u16;
            self.next_rng_2 = self.rng.rand::<u16>();

            if hunt_nature == self.nature_rand {
                self.finished = true;
            }
        }
    }
}

fn get_methodjk_no_lead_state<Game: GameSpecificLogic>(
    species: Species,
    tid: u16,
    sid: u16,
    ivs: Ivs,
    seed: u32,
) -> impl Iterator<Item = BaseStatic4State> {
    MethodJKNoLeadStateIterator::<Game>::new(species, tid, sid, ivs, seed)
}

fn get_methodjk_states<Game: GameSpecificLogic + 'static>(
    lead: Static4LeadInput,
    species: Species,
    tid: u16,
    sid: u16,
    ivs: Ivs,
    seed: u32,
) -> Box<dyn Iterator<Item = BaseStatic4State>> {
    match lead {
        Static4LeadInput::Synchronize => Box::new(get_methodjk_sync_state::<Game>(
            species, tid, sid, ivs, seed,
        )),
        Static4LeadInput::CutecharmF | Static4LeadInput::CutecharmM => {
            Box::new(get_methodjk_cutecharm::<Game>(lead, species, tid, sid, ivs, seed).into_iter())
        }
        Static4LeadInput::None => Box::new(get_methodjk_no_lead_state::<Game>(
            species, tid, sid, ivs, seed,
        )),
    }
}

fn get_method1_states(
    _lead: Static4LeadInput,
    species: Species,
    tid: u16,
    sid: u16,
    ivs: Ivs,
    seed: u32,
) -> impl Iterator<Item = BaseStatic4State> {
    let mut rng = Pokerng::new(seed).rev();

    let pidh = (rng.rand::<u16>() as u32) << 16;
    let pidl = rng.rand::<u16>() as u32;

    let pid = pidh | pidl;
    let nature = Nature::from((pid % 25) as u8);
    let origin_seed = rng.rand::<u32>();

    let state = BaseStatic4State::new(
        origin_seed,
        species,
        nature,
        pid,
        tid,
        sid,
        ivs,
        LeadAbility::None,
    );
    std::iter::once(state)
}

// Mappers might return different types of iterators,
// so we use a macro to avoid having to write the same code for each method
macro_rules! search_iv_seeds {
    ($ivs:expr, $opts:expr, $mapper:expr) => {{
        let seeds = recover_poke_rng_iv(&$ivs, false);
        let states = seeds.into_iter().flat_map(move |seed| {
            $mapper($opts.lead, $opts.species, $opts.tid, $opts.sid, $ivs, seed)
        });
        // Don't check IVs since the states were derived from matching ivs
        states.filter(|state| $opts.filter.pass_filter_no_ivs(state))
    }};
}

macro_rules! search_seeds {
    ($opts:expr, $mapper:expr) => {{
        let states = iv_iter($opts.filter.min_ivs, $opts.filter.max_ivs)
            .flat_map(|ivs| search_iv_seeds!(ivs, $opts, $mapper));
        SeedFilters::from($opts).filter(states)
    }};
}

#[wasm_bindgen]
pub fn search_static4(opts: &SearchStatic4Opts) -> Vec<Static4State> {
    match StaticMethod::new(opts.game, opts.species) {
        StaticMethod::One => search_seeds!(opts, get_method1_states),
        StaticMethod::J => search_seeds!(opts, get_methodjk_states::<DpptLogic>),
        StaticMethod::K => search_seeds!(opts, get_methodjk_states::<HgssLogic>),
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::{AbilityType, Characteristic, Gender, Species};

    fn parse_base_states(lead: LeadAbility, str: &str) -> Vec<BaseStatic4State> {
        let mut results: Vec<BaseStatic4State> = Vec::new();
        for raw_line in str.lines() {
            let line = raw_line.trim();

            if line.is_empty() {
                continue;
            }

            let parts: Vec<&str> = line.split("\t").collect();
            let seed = u32::from_str_radix(parts[0], 16).unwrap();
            let advance: usize = parts[1].parse().unwrap();
            let pid = u32::from_str_radix(parts[2], 16).unwrap();
            let shiny = parts[3] != "No";
            let nature = Nature::from_str(parts[4]);
            let ability = AbilityType::from_pokefinder_str(parts[5]);
            let ivs = Ivs::from_pokefinder_strs(&parts[6..][..6]);
            let gender = Gender::from_pokefinder_str(parts[14]);
            let characteristic = Characteristic::from_pokefinder_str(parts[15]);

            results.push(BaseStatic4State {
                seed,
                advance,
                pid,
                ivs,
                ability,
                gender,
                nature,
                shiny,
                characteristic,
                lead,
            });
        }
        results
    }

    macro_rules! pokefinder {
        ($lead:expr, $file:expr) => {
            parse_base_states($lead, include_str!($file))
        };
    }

    mod method1 {
        use super::*;
        use crate::{assert_list_eq, ivs};

        #[test]
        fn min_advance_0() {
            let opts = SearchStatic4Opts {
                tid: 12345,
                sid: 54321,
                year: 2000,
                min_delay: 800,
                max_delay: 900,
                min_advance: 0,
                max_advance: 30,
                force_second: None,
                game: GameVersion::Diamond,
                species: Species::Omanyte,
                lead: Static4LeadInput::None,
                filter: PkmFilter {
                    min_ivs: ivs!(30 / 30 / 30 / 20 / 20 / 20),
                    ..Default::default()
                },
            };

            let results = search_static4(&opts);
            let expected = pokefinder!(LeadAbility::None, "test_data/method1/min_advance_0.txt");

            assert_list_eq!(results, expected);
        }

        #[test]
        fn min_advance_40() {
            let opts = SearchStatic4Opts {
                tid: 12345,
                sid: 54321,
                year: 2000,
                min_delay: 800,
                max_delay: 900,
                min_advance: 40,
                max_advance: 60,
                force_second: None,
                game: GameVersion::Diamond,
                species: Species::Omanyte,
                lead: Static4LeadInput::None,
                filter: PkmFilter {
                    min_ivs: ivs!(30 / 30 / 30 / 20 / 20 / 20),
                    ..Default::default()
                },
            };

            let results = search_static4(&opts);
            let expected = pokefinder!(LeadAbility::None, "test_data/method1/min_advance_40.txt");

            assert_list_eq!(results, expected);
        }
    }

    mod methodj {
        use super::*;
        use crate::{assert_list_eq, ivs};

        #[test]
        fn no_lead() {
            let opts = SearchStatic4Opts {
                tid: 12345,
                sid: 54321,
                lead: Static4LeadInput::None,
                game: GameVersion::Diamond,
                species: Species::Drifloon,
                filter: PkmFilter {
                    min_ivs: ivs!(30 / 30 / 30 / 20 / 20 / 20),
                    ..Default::default()
                },
                year: 2000,
                min_delay: 800,
                max_delay: 900,
                min_advance: 0,
                max_advance: 30,
                force_second: None,
            };
            let results = search_static4(&opts);
            let expected = pokefinder!(LeadAbility::None, "test_data/methodj/no_lead.txt");

            assert_list_eq!(results, expected);
        }

        #[test]
        fn cutecharm_m() {
            let opts = SearchStatic4Opts {
                tid: 12345,
                sid: 54321,
                game: GameVersion::Diamond,
                species: Species::Drifloon,
                lead: Static4LeadInput::CutecharmM,
                filter: PkmFilter {
                    min_ivs: ivs!(30 / 30 / 30 / 20 / 20 / 20),
                    ..Default::default()
                },
                year: 2000,
                min_delay: 800,
                max_delay: 900,
                min_advance: 0,
                max_advance: 30,
                force_second: None,
            };
            let results = search_static4(&opts);
            let expected =
                pokefinder!(LeadAbility::CutecharmM, "test_data/methodj/cutecharm_m.txt");

            assert_list_eq!(results, expected);
        }

        #[test]
        fn cutecharm_f() {
            let opts = SearchStatic4Opts {
                tid: 12345,
                sid: 54321,
                game: GameVersion::Diamond,
                species: Species::Drifloon,
                lead: Static4LeadInput::CutecharmF,
                filter: PkmFilter {
                    min_ivs: ivs!(30 / 30 / 30 / 20 / 20 / 20),
                    ..Default::default()
                },
                year: 2000,
                min_delay: 800,
                max_delay: 900,
                min_advance: 0,
                max_advance: 30,
                force_second: None,
            };
            let results = search_static4(&opts);
            let expected =
                pokefinder!(LeadAbility::CutecharmF, "test_data/methodj/cutecharm_f.txt");

            assert_list_eq!(results, expected);
        }

        #[test]
        fn sync() {
            let opts = SearchStatic4Opts {
                tid: 12345,
                sid: 54321,
                game: GameVersion::Diamond,
                species: Species::Drifloon,
                lead: Static4LeadInput::Synchronize,
                filter: PkmFilter {
                    min_ivs: ivs!(30 / 30 / 30 / 25 / 25 / 20),
                    ..Default::default()
                },
                year: 2000,
                min_delay: 800,
                max_delay: 801,
                min_advance: 0,
                max_advance: 200,
                force_second: None,
            };
            let results = search_static4(&opts);
            let expected = pokefinder!(LeadAbility::None, "test_data/methodj/sync.txt")
                .into_iter()
                .map(|mut state| {
                    state.lead = LeadAbility::Synchronize(state.nature);
                    state
                })
                .collect::<Vec<_>>();

            assert_list_eq!(results, expected);
        }
    }

    mod methodk {
        use super::*;
        use crate::{assert_list_eq, ivs};

        #[test]
        fn no_lead() {
            let opts = SearchStatic4Opts {
                tid: 12345,
                sid: 54321,
                species: Species::Snorlax,
                game: GameVersion::SoulSilver,
                lead: Static4LeadInput::None,
                filter: PkmFilter {
                    min_ivs: ivs!(30 / 30 / 30 / 20 / 20 / 20),
                    ..Default::default()
                },
                min_advance: 0,
                max_advance: 30,
                min_delay: 800,
                max_delay: 900,
                year: 2000,
                force_second: None,
            };
            let results = search_static4(&opts);
            let expected = pokefinder!(LeadAbility::None, "test_data/methodk/no_lead.txt");

            assert_list_eq!(results, expected);
        }

        #[test]
        fn sync() {
            let opts = SearchStatic4Opts {
                tid: 12345,
                sid: 54321,
                species: Species::Snorlax,
                game: GameVersion::SoulSilver,
                lead: Static4LeadInput::Synchronize,
                filter: PkmFilter {
                    min_ivs: ivs!(30 / 30 / 30 / 25 / 25 / 20),
                    ..Default::default()
                },
                min_advance: 0,
                max_advance: 200,
                min_delay: 800,
                max_delay: 801,
                year: 2000,
                force_second: None,
            };
            let results = search_static4(&opts);
            let expected = pokefinder!(LeadAbility::None, "test_data/methodk/sync.txt")
                .into_iter()
                .map(|mut state| {
                    state.lead = LeadAbility::Synchronize(state.nature);
                    state
                })
                .collect::<Vec<_>>();

            assert_list_eq!(results, expected);
        }

        #[test]
        fn cutecharm_f() {
            let opts = SearchStatic4Opts {
                tid: 12345,
                sid: 54321,
                species: Species::Snorlax,
                game: GameVersion::SoulSilver,
                lead: Static4LeadInput::CutecharmF,
                filter: PkmFilter {
                    min_ivs: ivs!(30 / 30 / 30 / 20 / 20 / 20),
                    ..Default::default()
                },
                min_advance: 0,
                max_advance: 30,
                min_delay: 800,
                max_delay: 900,
                year: 2000,
                force_second: None,
            };
            let results = search_static4(&opts);
            let expected =
                pokefinder!(LeadAbility::CutecharmF, "test_data/methodk/cutecharm_f.txt");

            assert_list_eq!(results, expected);
        }

        #[test]
        fn cutecharm_m() {
            let opts = SearchStatic4Opts {
                tid: 12345,
                sid: 54321,
                species: Species::Snorlax,
                game: GameVersion::SoulSilver,
                lead: Static4LeadInput::CutecharmM,
                filter: PkmFilter {
                    min_ivs: ivs!(30 / 30 / 30 / 20 / 20 / 20),
                    ..Default::default()
                },
                min_advance: 0,
                max_advance: 30,
                min_delay: 800,
                max_delay: 900,
                year: 2000,
                force_second: None,
            };
            let results = search_static4(&opts);
            let expected =
                pokefinder!(LeadAbility::CutecharmM, "test_data/methodk/cutecharm_m.txt");

            assert_list_eq!(results, expected);
        }
    }
}
