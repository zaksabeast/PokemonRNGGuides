use super::base_state::{BaseStatic4State, Static4State};
use crate::Species;
use crate::gen4::calc_level::{LevelCalculator, ReversedHoneyLevel, SetLevel};
use crate::gen4::game_logic::{DpptLogic, GameSpecificLogic, HgssLogic};
use crate::gen4::seed_time4::{calc_delay_from_seed, find_seedtime4};
use crate::gen4::{GameVersion, LeadAbility, StaticMethod};
use crate::generators::utils::recover_poke_rng_iv;
use crate::rng::GetRand;
use crate::rng::Rng;
use crate::rng::lcrng::PokerngR;
use crate::{Gender, Ivs, Nature, PkmFilter, iv_iter, rng::lcrng::Pokerng};
use serde::{Deserialize, Serialize};
use tsify::Tsify;
use wasm_bindgen::prelude::*;

#[derive(Debug, Clone, Copy, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub enum Static4LeadInput {
    None,
    CutecharmF,
    CutecharmM,
    Synchronize,
    Pressure,
}

#[derive(Debug, Clone, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct SearchStatic4Opts {
    pub tid: u16,
    pub sid: u16,
    pub game: GameVersion,
    pub species: Species,
    pub filter: PkmFilter,
    pub offset: usize,
    pub encounter_min_level: u8,
    pub encounter_max_level: u8,
    pub min_advance: usize,
    pub max_advance: usize,
    pub min_delay: u32,
    pub max_delay: u32,
    pub year: u32,
    pub month: Option<u32>,
    pub force_second: Option<u32>,
    pub lead: Static4LeadInput,
}

struct SeedFilters {
    offset: usize,
    min_advance: usize,
    max_advance: usize,
    year: u32,
    month: Option<u32>,
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

            rng.advance(self.offset.saturating_add(min_advance));
            let mut seed = rng.seed();

            for advance in min_advance..=max_advance {
                // Quick delay precheck before resolving the full seed time.
                let delay = calc_delay_from_seed(seed, filters.year);

                if delay >= filters.min_delay
                    && delay <= filters.max_delay
                    && let Some(seed_time) = find_seedtime4(
                        seed,
                        filters.year,
                        filters.month,
                        filters.min_delay..=filters.max_delay,
                        filters.force_second,
                    )
                {
                    let found_state = state.add_seedtime(advance, seed_time);
                    results.push(found_state);
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
            offset: opts.offset,
            min_advance: opts.min_advance,
            max_advance: opts.max_advance,
            year: opts.year,
            month: opts.month,
            min_delay: opts.min_delay,
            max_delay: opts.max_delay,
            force_second: opts.force_second,
        }
    }
}
trait SyncGate {
    fn allow_check2(check1: bool) -> bool;
}

struct NoGate;
impl SyncGate for NoGate {
    fn allow_check2(_check1: bool) -> bool {
        true
    }
}

struct GateOnCheck1;
impl SyncGate for GateOnCheck1 {
    fn allow_check2(check1: bool) -> bool {
        !check1
    }
}

/// Iterator for MethodJ/K sync lead that generates states on-demand.
/// This avoids collecting millions of intermediate states into memory.
struct MethodJKSyncStateIterator<
    Game: GameSpecificLogic,
    LevelCalc: LevelCalculator<PokerngR>,
    Gate: SyncGate,
> {
    species: Species,
    min_level: u8,
    max_level: u8,
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

    _phantom_game: std::marker::PhantomData<Game>,
    _phantom_level: std::marker::PhantomData<LevelCalc>,
    _phantom_gate: std::marker::PhantomData<Gate>,
}

impl<Game: GameSpecificLogic, LevelCalc: LevelCalculator<PokerngR>, Gate: SyncGate>
    MethodJKSyncStateIterator<Game, LevelCalc, Gate>
{
    fn new(
        species: Species,
        min_level: u8,
        max_level: u8,
        tid: u16,
        sid: u16,
        ivs: Ivs,
        seed: u32,
    ) -> Self {
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
            min_level,
            max_level,
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
            _phantom_game: std::marker::PhantomData,
            _phantom_level: std::marker::PhantomData,
            _phantom_gate: std::marker::PhantomData,
        }
    }

    fn calc_level(&self, rng: &mut PokerngR) -> u8 {
        LevelCalc::calc_level(rng, self.min_level, self.max_level, false)
    }
}

impl<Game: GameSpecificLogic, LevelCalc: LevelCalculator<PokerngR>, Gate: SyncGate> Iterator
    for MethodJKSyncStateIterator<Game, LevelCalc, Gate>
{
    type Item = BaseStatic4State;

    fn next(&mut self) -> Option<Self::Item> {
        loop {
            if self.finished {
                return None;
            }

            let check1 = Game::sync_check(self.next_rng) == 0;
            let check2 = Gate::allow_check2(check1)
                && Game::sync_check(self.next_rng_2) == 1
                && Game::max(self.next_rng, 25) == self.nature_rand;

            // Yield check1 result if applicable and not yet returned
            if !self.returned_check1 && check1 {
                self.returned_check1 = true;
                let mut seed_rng = PokerngR::new(self.full_seed);
                let level = self.calc_level(&mut seed_rng);
                let origin_seed = seed_rng.rand::<u32>();
                return Some(BaseStatic4State::new(
                    origin_seed,
                    self.species,
                    self.nature,
                    level,
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
                let mut seed_rng = self.rng;
                let level = self.calc_level(&mut seed_rng);
                let origin_seed = seed_rng.rand::<u32>();
                return Some(BaseStatic4State::new(
                    origin_seed,
                    self.species,
                    self.nature,
                    level,
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

fn get_methodjk_sync_state<
    Game: GameSpecificLogic,
    LevelCalc: LevelCalculator<PokerngR>,
    Gate: SyncGate,
>(
    species: Species,
    min_level: u8,
    max_level: u8,
    tid: u16,
    sid: u16,
    ivs: Ivs,
    seed: u32,
) -> impl Iterator<Item = BaseStatic4State> {
    MethodJKSyncStateIterator::<Game, LevelCalc, Gate>::new(
        species, min_level, max_level, tid, sid, ivs, seed,
    )
}

fn get_methodjk_cutecharm<Game: GameSpecificLogic, LevelCalc: LevelCalculator<PokerngR>>(
    lead: Static4LeadInput,
    species: Species,
    min_level: u8,
    max_level: u8,
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

    if Game::max(rng.rand::<u16>(), 3) == 0 {
        return vec![];
    }

    let level = LevelCalc::calc_level(&mut rng, min_level, max_level, false);

    let pid = buffer + nature_rand as u32;
    let origin_seed = rng.clone().rand::<u32>();

    let out_lead = match lead {
        Static4LeadInput::CutecharmF => LeadAbility::CutecharmF,
        _ => LeadAbility::CutecharmM,
    };

    let state = BaseStatic4State::new(
        origin_seed,
        species,
        nature,
        level,
        pid,
        tid,
        sid,
        ivs,
        out_lead,
    );
    vec![state]
}

/// Iterator for MethodJ/K no lead that generates states on-demand.
/// This avoids collecting millions of intermediate states into memory.
struct MethodJKNoPidLeadStateIterator<Game: GameSpecificLogic, LevelCalc: LevelCalculator<PokerngR>>
{
    species: Species,
    min_level: u8,
    max_level: u8,
    pressure: bool,
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

    _phantom_game: std::marker::PhantomData<Game>,
    _phantom_level: std::marker::PhantomData<LevelCalc>,
}

impl<Game: GameSpecificLogic, LevelCalc: LevelCalculator<PokerngR>>
    MethodJKNoPidLeadStateIterator<Game, LevelCalc>
{
    fn new(
        species: Species,
        min_level: u8,
        max_level: u8,
        tid: u16,
        sid: u16,
        ivs: Ivs,
        seed: u32,
        pressure: bool,
    ) -> Self {
        let mut rng = Pokerng::new(seed).reverse();

        let pidh = rng.rand::<u16>() as u32;
        let pidl = rng.rand::<u16>() as u32;
        let pid = (pidh << 16) | pidl;

        let nature_rand = (pid % 25) as u16;
        let nature = Nature::from(nature_rand as u8);

        let full_seed = rng.rand::<u32>();
        let next_rng = (full_seed >> 16) as u16;
        let next_rng_2 = rng.rand::<u16>();

        MethodJKNoPidLeadStateIterator {
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
            min_level,
            max_level,
            pressure,
            finished: false,
            _phantom_game: std::marker::PhantomData,
            _phantom_level: std::marker::PhantomData,
        }
    }
}

impl<Game: GameSpecificLogic, LevelCalc: LevelCalculator<PokerngR>> Iterator
    for MethodJKNoPidLeadStateIterator<Game, LevelCalc>
{
    type Item = BaseStatic4State;

    fn next(&mut self) -> Option<Self::Item> {
        loop {
            if self.finished {
                return None;
            }

            if Game::max(self.next_rng, 25) == self.nature_rand {
                let mut seed_rng = Pokerng::new(self.full_seed).reverse();
                let level = LevelCalc::calc_level(
                    &mut seed_rng,
                    self.min_level,
                    self.max_level,
                    self.pressure,
                );
                let origin_seed = seed_rng.rand::<u32>();

                let result = Some(BaseStatic4State::new(
                    origin_seed,
                    self.species,
                    self.nature,
                    level,
                    self.pid,
                    self.tid,
                    self.sid,
                    self.ivs,
                    match self.pressure {
                        true => LeadAbility::Pressure,
                        false => LeadAbility::None,
                    },
                ));

                // Advance before returning to prepare for next iteration
                let hunt_nature =
                    (((self.next_rng as u32) << 16 | self.next_rng_2 as u32) % 25) as u16;

                if hunt_nature == self.nature_rand {
                    self.finished = true;
                }

                self.full_seed = self.rng.rand::<u32>();
                self.next_rng = (self.full_seed >> 16) as u16;
                self.next_rng_2 = self.rng.rand::<u16>();

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

fn get_methodjk_no_lead_state<Game: GameSpecificLogic, LevelCalc: LevelCalculator<PokerngR>>(
    species: Species,
    min_level: u8,
    max_level: u8,
    tid: u16,
    sid: u16,
    ivs: Ivs,
    seed: u32,
    pressure: bool,
) -> impl Iterator<Item = BaseStatic4State> {
    MethodJKNoPidLeadStateIterator::<Game, LevelCalc>::new(
        species, min_level, max_level, tid, sid, ivs, seed, pressure,
    )
}

fn get_methodjk_states<
    Game: GameSpecificLogic + 'static,
    LevelCalc: LevelCalculator<PokerngR> + 'static,
>(
    lead: Static4LeadInput,
    species: Species,
    min_level: u8,
    max_level: u8,
    tid: u16,
    sid: u16,
    ivs: Ivs,
    seed: u32,
) -> Box<dyn Iterator<Item = BaseStatic4State>> {
    match lead {
        Static4LeadInput::Synchronize => {
            Box::new(get_methodjk_sync_state::<Game, LevelCalc, NoGate>(
                species, min_level, max_level, tid, sid, ivs, seed,
            ))
        }
        Static4LeadInput::CutecharmF | Static4LeadInput::CutecharmM => Box::new(
            get_methodjk_cutecharm::<Game, LevelCalc>(
                lead, species, min_level, max_level, tid, sid, ivs, seed,
            )
            .into_iter(),
        ),
        Static4LeadInput::None => Box::new(get_methodjk_no_lead_state::<Game, LevelCalc>(
            species, min_level, max_level, tid, sid, ivs, seed, false,
        )),
        Static4LeadInput::Pressure => Box::new(get_methodjk_no_lead_state::<Game, LevelCalc>(
            species, min_level, max_level, tid, sid, ivs, seed, true,
        )),
    }
}

fn get_method1_states(
    _lead: Static4LeadInput,
    species: Species,
    min_level: u8,
    _max_level: u8,
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
        min_level,
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
            $mapper(
                $opts.lead,
                $opts.species,
                $opts.encounter_min_level,
                $opts.encounter_max_level,
                $opts.tid,
                $opts.sid,
                $ivs,
                seed,
            )
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
        StaticMethod::J => search_seeds!(opts, get_methodjk_states::<DpptLogic, SetLevel>),
        StaticMethod::K => search_seeds!(opts, get_methodjk_states::<HgssLogic, SetLevel>),
        StaticMethod::Honey => {
            search_seeds!(opts, get_methodjk_states::<DpptLogic, ReversedHoneyLevel>)
        }
    }
}

fn get_radar_states(
    lead: Static4LeadInput,
    species: Species,
    _min_level: u8,
    max_level: u8,
    tid: u16,
    sid: u16,
    ivs: Ivs,
    seed: u32,
) -> Vec<BaseStatic4State> {
    match lead {
        Static4LeadInput::Pressure => vec![],
        Static4LeadInput::Synchronize => {
            get_methodjk_sync_state::<DpptLogic, SetLevel, GateOnCheck1>(
                species, max_level, max_level, tid, sid, ivs, seed,
            )
            .collect()
        }
        _ => get_methodjk_states::<DpptLogic, SetLevel>(
            lead, species, max_level, max_level, tid, sid, ivs, seed,
        )
        .collect(),
    }
}

#[wasm_bindgen]
pub fn search_static4_radar(opts: &SearchStatic4Opts) -> Vec<Static4State> {
    search_seeds!(opts, get_radar_states)
}

fn shiny_pid_rev<R: Rng + GetRand<u16>>(rng: &mut R, tsv: u16) -> u32 {
    let mut low: u16 = 0;
    for j in (3..=15).rev() {
        low |= (rng.rand::<u16>() % 2) << j;
    }
    let mut high = rng.rand::<u16>() % 8;
    low |= rng.rand::<u16>() % 8;
    high |= (low ^ tsv) & 0xfff8;
    ((high as u32) << 16) | (low as u32)
}

fn get_radar_shiny_states(
    lead: Static4LeadInput,
    species: Species,
    _min_level: u8,
    max_level: u8,
    tid: u16,
    sid: u16,
    ivs: Ivs,
    seed: u32,
) -> Vec<BaseStatic4State> {
    if lead == Static4LeadInput::Pressure {
        return vec![];
    }

    let tsv = tid ^ sid;
    let mut rng = Pokerng::new(seed).reverse();

    let cute_charm = matches!(
        lead,
        Static4LeadInput::CutecharmF | Static4LeadInput::CutecharmM
    ) && !species.is_fixed_gender();

    let cute_charm_check = |pid: u32| -> bool {
        match lead {
            Static4LeadInput::CutecharmF => species.gender_from_pid(pid) == Gender::Male,
            Static4LeadInput::CutecharmM => species.gender_from_pid(pid) == Gender::Female,
            _ => false,
        }
    };

    let pid = shiny_pid_rev(&mut rng, tsv);
    let nature_rand = (pid % 25) as u16;
    let nature = Nature::from(nature_rand as u8);

    let out_lead = match lead {
        Static4LeadInput::CutecharmF => LeadAbility::CutecharmF,
        Static4LeadInput::CutecharmM => LeadAbility::CutecharmM,
        Static4LeadInput::Synchronize => LeadAbility::Synchronize(nature),
        _ => LeadAbility::None,
    };

    let mut states = Vec::new();

    if lead == Static4LeadInput::Synchronize || cute_charm {
        let gender_threshold = species.gender_ratio() as u32;
        let gender = (pid & 0xff) < gender_threshold;

        loop {
            let mut test = rng;
            let valid = if lead == Static4LeadInput::Synchronize {
                DpptLogic::max(test.rand::<u16>(), 2) == 0
            } else {
                DpptLogic::max(test.rand::<u16>(), 3) != 0 && cute_charm_check(pid)
            };

            if valid {
                let origin_seed = test.rand::<u32>();
                states.push(BaseStatic4State::new(
                    origin_seed,
                    species,
                    nature,
                    max_level,
                    pid,
                    tid,
                    sid,
                    ivs,
                    out_lead,
                ));
            }

            let hunt_pid = shiny_pid_rev(&mut rng, tsv);
            let hunt_nature = (hunt_pid % 25) as u16;
            let hunt_gender = (hunt_pid & 0xff) < gender_threshold;

            if cute_charm && gender == hunt_gender {
                break;
            }
            if hunt_nature == nature_rand {
                break;
            }
        }
    } else {
        let origin_seed = rng.rand::<u32>();
        states.push(BaseStatic4State::new(
            origin_seed,
            species,
            nature,
            max_level,
            pid,
            tid,
            sid,
            ivs,
            out_lead,
        ));
    }

    states
}

#[wasm_bindgen]
pub fn search_static4_radar_shiny(opts: &SearchStatic4Opts) -> Vec<Static4State> {
    search_seeds!(opts, get_radar_shiny_states)
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::{AbilityType, Characteristic, Gender, Species};

    fn parse_honey_states(lead: LeadAbility, str: &str) -> Vec<BaseStatic4State> {
        let mut results: Vec<BaseStatic4State> = Vec::new();
        for raw_line in str.lines() {
            let line = raw_line.trim();

            if line.is_empty() {
                continue;
            }

            let parts: Vec<&str> = line.split("\t").collect();
            let seed = u32::from_str_radix(parts[0], 16).unwrap();
            let advance: usize = parts[1].parse().unwrap();
            // item
            // slot
            let level: u8 = parts[4].parse().unwrap();
            let pid = u32::from_str_radix(parts[5], 16).unwrap();
            let shiny = parts[6] != "No";
            let nature = Nature::from_str(parts[7]);
            let ability = AbilityType::from_pokefinder_str(parts[8]);
            let ivs = Ivs::from_pokefinder_strs(&parts[9..][..6]);
            let gender = Gender::from_pokefinder_str(parts[17]);
            let characteristic = Characteristic::from_pokefinder_str(parts[18]);

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
                level,
            });
        }
        results
    }

    macro_rules! pokefinder_honey {
        ($lead:expr, $file:expr) => {
            parse_honey_states($lead, include_str!($file))
        };
    }

    fn parse_static_states(lead: LeadAbility, str: &str) -> Vec<BaseStatic4State> {
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

                // The level is not included in the static pokefinder output
                level: 0,
            });
        }
        results
    }

    macro_rules! pokefinder_static {
        ($lead:expr, $file:expr) => {
            parse_static_states($lead, include_str!($file))
        };
    }

    mod method1 {
        use super::*;
        use crate::{assert_list_eq, datetime, ivs};

        #[test]
        fn offset_10() {
            let opts = SearchStatic4Opts {
                tid: 12345,
                sid: 54321,
                offset: 10,
                year: 2000,
                month: None,
                encounter_min_level: 0,
                encounter_max_level: 0,
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
            let expected = pokefinder_static!(LeadAbility::None, "test_data/method1/offset_10.txt");

            assert_list_eq!(results, expected);
        }

        #[test]
        fn min_advance_0() {
            let opts = SearchStatic4Opts {
                tid: 12345,
                sid: 54321,
                offset: 0,
                year: 2000,
                month: None,
                encounter_min_level: 0,
                encounter_max_level: 0,
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
            let expected =
                pokefinder_static!(LeadAbility::None, "test_data/method1/min_advance_0.txt");

            assert_list_eq!(results, expected);
        }

        #[test]
        fn min_advance_40() {
            let opts = SearchStatic4Opts {
                tid: 12345,
                sid: 54321,
                offset: 0,
                year: 2000,
                month: None,
                encounter_min_level: 0,
                encounter_max_level: 0,
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
            let expected =
                pokefinder_static!(LeadAbility::None, "test_data/method1/min_advance_40.txt");

            assert_list_eq!(results, expected);
        }

        #[test]
        fn delay_range_uses_decoded_delay() {
            let datetime = datetime!(2026-05-14 12:34:30).unwrap();
            let seed = crate::gen4::calc_seed(&datetime, 1749);
            let state = BaseStatic4State::new(
                seed,
                Species::Omanyte,
                Nature::Hardy,
                1,
                0,
                12345,
                54321,
                ivs!(0 / 0 / 0 / 0 / 0 / 0),
                LeadAbility::None,
            );

            let results = SeedFilters {
                offset: 0,
                min_advance: 0,
                max_advance: 0,
                year: datetime.year,
                month: Some(datetime.month),
                min_delay: 800,
                max_delay: 1750,
                force_second: Some(datetime.second),
            }
            .filter(std::iter::once(state));

            assert_eq!(results.len(), 1);
            assert_eq!(results[0].seed_time.delay, 1749);
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
                offset: 0,
                lead: Static4LeadInput::None,
                game: GameVersion::Diamond,
                species: Species::Drifloon,
                filter: PkmFilter {
                    min_ivs: ivs!(30 / 30 / 30 / 20 / 20 / 20),
                    ..Default::default()
                },
                year: 2000,
                month: None,
                encounter_min_level: 0,
                encounter_max_level: 0,
                min_delay: 800,
                max_delay: 900,
                min_advance: 0,
                max_advance: 30,
                force_second: None,
            };
            let results = search_static4(&opts);
            let expected = pokefinder_static!(LeadAbility::None, "test_data/methodj/no_lead.txt");

            assert_list_eq!(results, expected);
        }

        #[test]
        fn pressure() {
            let opts = SearchStatic4Opts {
                tid: 12345,
                sid: 54321,
                offset: 0,
                lead: Static4LeadInput::Pressure,
                game: GameVersion::Diamond,
                species: Species::Drifloon,
                filter: PkmFilter {
                    min_ivs: ivs!(30 / 30 / 30 / 20 / 20 / 20),
                    ..Default::default()
                },
                year: 2000,
                month: None,
                encounter_min_level: 0,
                encounter_max_level: 0,
                min_delay: 800,
                max_delay: 900,
                min_advance: 0,
                max_advance: 30,
                force_second: None,
            };
            let results = search_static4(&opts);
            // Pressure is a no-op for static Pokemon, so same behavior as no lead
            let expected =
                pokefinder_static!(LeadAbility::Pressure, "test_data/methodj/no_lead.txt");

            assert_list_eq!(results, expected);
        }

        #[test]
        fn cutecharm_m() {
            let opts = SearchStatic4Opts {
                tid: 12345,
                sid: 54321,
                offset: 0,
                game: GameVersion::Diamond,
                species: Species::Drifloon,
                lead: Static4LeadInput::CutecharmM,
                filter: PkmFilter {
                    min_ivs: ivs!(30 / 30 / 30 / 20 / 20 / 20),
                    ..Default::default()
                },
                year: 2000,
                month: None,
                encounter_min_level: 0,
                encounter_max_level: 0,
                min_delay: 800,
                max_delay: 900,
                min_advance: 0,
                max_advance: 30,
                force_second: None,
            };
            let results = search_static4(&opts);
            let expected =
                pokefinder_static!(LeadAbility::CutecharmM, "test_data/methodj/cutecharm_m.txt");

            assert_list_eq!(results, expected);
        }

        #[test]
        fn cutecharm_f() {
            let opts = SearchStatic4Opts {
                tid: 12345,
                sid: 54321,
                offset: 0,
                game: GameVersion::Diamond,
                species: Species::Drifloon,
                lead: Static4LeadInput::CutecharmF,
                filter: PkmFilter {
                    min_ivs: ivs!(30 / 30 / 30 / 20 / 20 / 20),
                    ..Default::default()
                },
                year: 2000,
                month: None,
                encounter_min_level: 0,
                encounter_max_level: 0,
                min_delay: 800,
                max_delay: 900,
                min_advance: 0,
                max_advance: 30,
                force_second: None,
            };
            let results = search_static4(&opts);
            let expected =
                pokefinder_static!(LeadAbility::CutecharmF, "test_data/methodj/cutecharm_f.txt");

            assert_list_eq!(results, expected);
        }

        #[test]
        fn sync() {
            let opts = SearchStatic4Opts {
                tid: 12345,
                sid: 54321,
                offset: 0,
                game: GameVersion::Diamond,
                species: Species::Drifloon,
                lead: Static4LeadInput::Synchronize,
                filter: PkmFilter {
                    min_ivs: ivs!(30 / 30 / 30 / 25 / 25 / 20),
                    ..Default::default()
                },
                year: 2000,
                month: None,
                encounter_min_level: 0,
                encounter_max_level: 0,
                min_delay: 800,
                max_delay: 801,
                min_advance: 0,
                max_advance: 200,
                force_second: None,
            };
            let results = search_static4(&opts);
            let expected = pokefinder_static!(LeadAbility::None, "test_data/methodj/sync.txt")
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
                offset: 0,
                species: Species::Snorlax,
                game: GameVersion::SoulSilver,
                lead: Static4LeadInput::None,
                filter: PkmFilter {
                    min_ivs: ivs!(30 / 30 / 30 / 20 / 20 / 20),
                    ..Default::default()
                },
                encounter_min_level: 0,
                encounter_max_level: 0,
                min_advance: 0,
                max_advance: 30,
                min_delay: 800,
                max_delay: 900,
                year: 2000,
                month: None,
                force_second: None,
            };
            let results = search_static4(&opts);
            let expected = pokefinder_static!(LeadAbility::None, "test_data/methodk/no_lead.txt");

            assert_list_eq!(results, expected);
        }

        #[test]
        fn pressure() {
            let opts = SearchStatic4Opts {
                tid: 12345,
                sid: 54321,
                offset: 0,
                species: Species::Snorlax,
                game: GameVersion::SoulSilver,
                lead: Static4LeadInput::Pressure,
                filter: PkmFilter {
                    min_ivs: ivs!(30 / 30 / 30 / 20 / 20 / 20),
                    ..Default::default()
                },
                encounter_min_level: 0,
                encounter_max_level: 0,
                min_advance: 0,
                max_advance: 30,
                min_delay: 800,
                max_delay: 900,
                year: 2000,
                month: None,
                force_second: None,
            };
            let results = search_static4(&opts);
            // Pressure is a no-op for static Pokemon, so same behavior as no lead
            let expected =
                pokefinder_static!(LeadAbility::Pressure, "test_data/methodk/no_lead.txt");

            assert_list_eq!(results, expected);
        }

        #[test]
        fn sync() {
            let opts = SearchStatic4Opts {
                tid: 12345,
                sid: 54321,
                offset: 0,
                species: Species::Snorlax,
                game: GameVersion::SoulSilver,
                lead: Static4LeadInput::Synchronize,
                filter: PkmFilter {
                    min_ivs: ivs!(30 / 30 / 30 / 25 / 25 / 20),
                    ..Default::default()
                },
                encounter_min_level: 0,
                encounter_max_level: 0,
                min_advance: 0,
                max_advance: 200,
                min_delay: 800,
                max_delay: 801,
                year: 2000,
                month: None,
                force_second: None,
            };
            let results = search_static4(&opts);
            let expected = pokefinder_static!(LeadAbility::None, "test_data/methodk/sync.txt")
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
                offset: 0,
                species: Species::Snorlax,
                game: GameVersion::SoulSilver,
                lead: Static4LeadInput::CutecharmF,
                filter: PkmFilter {
                    min_ivs: ivs!(30 / 30 / 30 / 20 / 20 / 20),
                    ..Default::default()
                },
                encounter_min_level: 0,
                encounter_max_level: 0,
                min_advance: 0,
                max_advance: 30,
                min_delay: 800,
                max_delay: 900,
                year: 2000,
                month: None,
                force_second: None,
            };
            let results = search_static4(&opts);
            let expected =
                pokefinder_static!(LeadAbility::CutecharmF, "test_data/methodk/cutecharm_f.txt");

            assert_list_eq!(results, expected);
        }

        #[test]
        fn cutecharm_m() {
            let opts = SearchStatic4Opts {
                tid: 12345,
                sid: 54321,
                offset: 0,
                species: Species::Snorlax,
                game: GameVersion::SoulSilver,
                lead: Static4LeadInput::CutecharmM,
                filter: PkmFilter {
                    min_ivs: ivs!(30 / 30 / 30 / 20 / 20 / 20),
                    ..Default::default()
                },
                encounter_min_level: 0,
                encounter_max_level: 0,
                min_advance: 0,
                max_advance: 30,
                min_delay: 800,
                max_delay: 900,
                year: 2000,
                month: None,
                force_second: None,
            };
            let results = search_static4(&opts);
            let expected =
                pokefinder_static!(LeadAbility::CutecharmM, "test_data/methodk/cutecharm_m.txt");

            assert_list_eq!(results, expected);
        }
    }

    mod method_honey {
        use super::*;
        use crate::{assert_list_eq, ivs};

        #[test]
        fn no_lead() {
            let opts = SearchStatic4Opts {
                tid: 12345,
                sid: 54321,
                offset: 0,
                species: Species::Munchlax,
                game: GameVersion::Diamond,
                lead: Static4LeadInput::None,
                filter: PkmFilter {
                    min_ivs: ivs!(30 / 30 / 30 / 20 / 20 / 20),
                    ..Default::default()
                },
                encounter_min_level: 5,
                encounter_max_level: 15,
                min_advance: 0,
                max_advance: 30,
                min_delay: 800,
                max_delay: 900,
                year: 2000,
                month: None,
                force_second: None,
            };
            let results = search_static4(&opts);
            let expected =
                pokefinder_honey!(LeadAbility::None, "test_data/method_honey/no_lead.txt");

            assert_list_eq!(results, expected);
        }

        #[test]
        fn sync() {
            let opts = SearchStatic4Opts {
                tid: 12345,
                sid: 54321,
                offset: 0,
                species: Species::Munchlax,
                game: GameVersion::Diamond,
                lead: Static4LeadInput::Synchronize,
                filter: PkmFilter {
                    min_ivs: ivs!(30 / 30 / 30 / 25 / 25 / 20),
                    ..Default::default()
                },
                encounter_min_level: 5,
                encounter_max_level: 15,
                min_advance: 0,
                max_advance: 200,
                min_delay: 800,
                max_delay: 801,
                year: 2000,
                month: None,
                force_second: None,
            };
            let results = search_static4(&opts);
            let expected = pokefinder_honey!(LeadAbility::None, "test_data/method_honey/sync.txt")
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
                offset: 0,
                species: Species::Munchlax,
                game: GameVersion::Diamond,
                lead: Static4LeadInput::CutecharmF,
                filter: PkmFilter {
                    min_ivs: ivs!(30 / 30 / 30 / 20 / 20 / 20),
                    ..Default::default()
                },
                encounter_min_level: 5,
                encounter_max_level: 15,
                min_advance: 0,
                max_advance: 30,
                min_delay: 800,
                max_delay: 900,
                year: 2000,
                month: None,
                force_second: None,
            };
            let results = search_static4(&opts);
            let expected = pokefinder_honey!(
                LeadAbility::CutecharmF,
                "test_data/method_honey/cutecharm_f.txt"
            );

            assert_list_eq!(results, expected);
        }

        #[test]
        fn cutecharm_m() {
            let opts = SearchStatic4Opts {
                tid: 12345,
                sid: 54321,
                offset: 0,
                species: Species::Munchlax,
                game: GameVersion::Diamond,
                lead: Static4LeadInput::CutecharmM,
                filter: PkmFilter {
                    min_ivs: ivs!(30 / 30 / 30 / 20 / 20 / 20),
                    ..Default::default()
                },
                encounter_min_level: 5,
                encounter_max_level: 15,
                min_advance: 0,
                max_advance: 30,
                min_delay: 800,
                max_delay: 900,
                year: 2000,
                month: None,
                force_second: None,
            };
            let results = search_static4(&opts);
            let expected = pokefinder_honey!(
                LeadAbility::CutecharmM,
                "test_data/method_honey/cutecharm_m.txt"
            );

            assert_list_eq!(results, expected);
        }

        #[test]
        fn pressure() {
            let opts = SearchStatic4Opts {
                tid: 12345,
                sid: 54321,
                offset: 0,
                species: Species::Munchlax,
                game: GameVersion::Diamond,
                lead: Static4LeadInput::Pressure,
                filter: PkmFilter {
                    min_ivs: ivs!(30 / 30 / 30 / 20 / 20 / 20),
                    ..Default::default()
                },
                encounter_min_level: 5,
                encounter_max_level: 15,
                min_advance: 0,
                max_advance: 30,
                min_delay: 800,
                max_delay: 900,
                year: 2000,
                month: None,
                force_second: None,
            };
            let results = search_static4(&opts);
            let expected =
                pokefinder_honey!(LeadAbility::Pressure, "test_data/method_honey/pressure.txt");

            assert_list_eq!(results, expected);
        }
    }

    mod method_radar {
        use super::*;
        use crate::{assert_list_eq, ivs};

        #[test]
        fn no_lead() {
            let opts = SearchStatic4Opts {
                tid: 39259,
                sid: 25081,
                offset: 0,
                game: GameVersion::Platinum,
                species: Species::Snover,
                lead: Static4LeadInput::None,
                filter: PkmFilter {
                    min_ivs: ivs!(28 / 28 / 28 / 28 / 28 / 28),
                    ..Default::default()
                },
                year: 2000,
                month: None,
                encounter_min_level: 33,
                encounter_max_level: 33,
                min_delay: 800,
                max_delay: 900,
                min_advance: 0,
                max_advance: 30,
                force_second: None,
            };
            let results = search_static4_radar(&opts);
            let expected =
                pokefinder_honey!(LeadAbility::None, "test_data/method_pokeradar/no_lead.txt");

            assert_list_eq!(results, expected);
        }

        #[test]
        fn sync() {
            let opts = SearchStatic4Opts {
                tid: 39259,
                sid: 25081,
                offset: 0,
                game: GameVersion::Platinum,
                species: Species::Snover,
                lead: Static4LeadInput::Synchronize,
                filter: PkmFilter {
                    min_ivs: ivs!(28 / 28 / 28 / 28 / 28 / 28),
                    ..Default::default()
                },
                year: 2000,
                month: None,
                encounter_min_level: 33,
                encounter_max_level: 33,
                min_delay: 800,
                max_delay: 900,
                min_advance: 0,
                max_advance: 5,
                force_second: None,
            };
            let results = search_static4_radar(&opts);
            let expected =
                pokefinder_honey!(LeadAbility::None, "test_data/method_pokeradar/sync.txt")
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
                tid: 39259,
                sid: 25081,
                offset: 0,
                game: GameVersion::Platinum,
                species: Species::Snover,
                lead: Static4LeadInput::CutecharmF,
                filter: PkmFilter {
                    min_ivs: ivs!(28 / 28 / 28 / 28 / 28 / 28),
                    ..Default::default()
                },
                year: 2000,
                month: None,
                encounter_min_level: 33,
                encounter_max_level: 33,
                min_delay: 800,
                max_delay: 900,
                min_advance: 0,
                max_advance: 30,
                force_second: None,
            };
            let results = search_static4_radar(&opts);
            let expected = pokefinder_honey!(
                LeadAbility::CutecharmF,
                "test_data/method_pokeradar/cutecharm_f.txt"
            );

            assert_list_eq!(results, expected);
        }

        #[test]
        fn cutecharm_m() {
            let opts = SearchStatic4Opts {
                tid: 39259,
                sid: 25081,
                offset: 0,
                game: GameVersion::Platinum,
                species: Species::Snover,
                lead: Static4LeadInput::CutecharmM,
                filter: PkmFilter {
                    min_ivs: ivs!(28 / 28 / 28 / 28 / 28 / 28),
                    ..Default::default()
                },
                year: 2000,
                month: None,
                encounter_min_level: 33,
                encounter_max_level: 33,
                min_delay: 800,
                max_delay: 900,
                min_advance: 0,
                max_advance: 30,
                force_second: None,
            };
            let results = search_static4_radar(&opts);
            let expected = pokefinder_honey!(
                LeadAbility::CutecharmM,
                "test_data/method_pokeradar/cutecharm_m.txt"
            );

            assert_list_eq!(results, expected);
        }
    }

    mod method_radar_shiny {
        use super::*;
        use crate::{assert_list_eq, ivs};

        #[test]
        fn no_lead() {
            let opts = SearchStatic4Opts {
                tid: 39259,
                sid: 25081,
                offset: 0,
                game: GameVersion::Platinum,
                species: Species::Snover,
                lead: Static4LeadInput::None,
                filter: PkmFilter {
                    min_ivs: ivs!(28 / 28 / 28 / 28 / 28 / 28),
                    ..Default::default()
                },
                year: 2000,
                month: None,
                encounter_min_level: 33,
                encounter_max_level: 33,
                min_delay: 800,
                max_delay: 900,
                min_advance: 0,
                max_advance: 30,
                force_second: None,
            };
            let results = search_static4_radar_shiny(&opts);
            let expected = pokefinder_honey!(
                LeadAbility::None,
                "test_data/method_shiny_pokeradar/no_lead.txt"
            );

            assert_list_eq!(results, expected);
        }

        #[test]
        fn sync() {
            let opts = SearchStatic4Opts {
                tid: 39259,
                sid: 25081,
                offset: 0,
                game: GameVersion::Platinum,
                species: Species::Snover,
                lead: Static4LeadInput::Synchronize,
                filter: PkmFilter {
                    min_ivs: ivs!(28 / 28 / 28 / 28 / 28 / 28),
                    ..Default::default()
                },
                year: 2000,
                month: None,
                encounter_min_level: 33,
                encounter_max_level: 33,
                min_delay: 800,
                max_delay: 900,
                min_advance: 0,
                max_advance: 5,
                force_second: None,
            };
            let results = search_static4_radar_shiny(&opts);
            let expected = pokefinder_honey!(
                LeadAbility::None,
                "test_data/method_shiny_pokeradar/sync.txt"
            )
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
                tid: 39259,
                sid: 25081,
                offset: 0,
                game: GameVersion::Platinum,
                species: Species::Snover,
                lead: Static4LeadInput::CutecharmF,
                filter: PkmFilter {
                    min_ivs: ivs!(28 / 28 / 28 / 28 / 28 / 28),
                    ..Default::default()
                },
                year: 2000,
                month: None,
                encounter_min_level: 33,
                encounter_max_level: 33,
                min_delay: 800,
                max_delay: 900,
                min_advance: 0,
                max_advance: 30,
                force_second: None,
            };
            let results = search_static4_radar_shiny(&opts);
            let expected = pokefinder_honey!(
                LeadAbility::CutecharmF,
                "test_data/method_shiny_pokeradar/cutecharm_f.txt"
            );

            assert_list_eq!(results, expected);
        }

        #[test]
        fn cutecharm_m() {
            let opts = SearchStatic4Opts {
                tid: 39259,
                sid: 25081,
                offset: 0,
                game: GameVersion::Platinum,
                species: Species::Snover,
                lead: Static4LeadInput::CutecharmM,
                filter: PkmFilter {
                    min_ivs: ivs!(28 / 28 / 28 / 28 / 28 / 28),
                    ..Default::default()
                },
                year: 2000,
                month: None,
                encounter_min_level: 33,
                encounter_max_level: 33,
                min_delay: 800,
                max_delay: 900,
                min_advance: 0,
                max_advance: 30,
                force_second: None,
            };
            let results = search_static4_radar_shiny(&opts);
            let expected = pokefinder_honey!(
                LeadAbility::CutecharmM,
                "test_data/method_shiny_pokeradar/cutecharm_m.txt"
            );

            assert_list_eq!(results, expected);
        }
    }
}
