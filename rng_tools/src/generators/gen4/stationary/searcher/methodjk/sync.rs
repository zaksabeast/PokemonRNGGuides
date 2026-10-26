use crate::gen4::LeadAbility;
use crate::gen4::calc_level::LevelCalculator;
use crate::gen4::game_logic::GameSpecificLogic;
use crate::gen4::stationary::generator::encounter_strategy::encounter_slot_from_roll;
use crate::gen4::stationary::searcher::base_state::BaseStatic4State;
use crate::rng::Rng;
use crate::rng::lcrng::{Pokerng, PokerngR};
use crate::{Ivs, Nature, Species};

pub trait SyncGate {
    fn allow_check2(check1: bool) -> bool;
}

pub struct NoGate;

impl SyncGate for NoGate {
    fn allow_check2(_check1: bool) -> bool {
        true
    }
}

pub struct GateOnCheck1;

impl SyncGate for GateOnCheck1 {
    fn allow_check2(check1: bool) -> bool {
        !check1
    }
}

struct MethodJKSyncStateIterator<
    Game: GameSpecificLogic,
    LevelCalc: LevelCalculator<PokerngR>,
    Gate: SyncGate,
> {
    species: Species,
    min_level: u8,
    max_level: u8,
    wild: bool,
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
    #[allow(clippy::too_many_arguments)]
    fn new(
        species: Species,
        min_level: u8,
        max_level: u8,
        tid: u16,
        sid: u16,
        ivs: Ivs,
        seed: u32,
        wild: bool,
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
            wild,
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

    fn encounter_slot(&self, rng: &mut PokerngR) -> u8 {
        if self.wild {
            encounter_slot_from_roll(rng.rand::<u16>())
        } else {
            0
        }
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

            if !self.returned_check1 && check1 {
                self.returned_check1 = true;
                let mut seed_rng = PokerngR::new(self.full_seed);
                let level = self.calc_level(&mut seed_rng);
                let encounter_slot = self.encounter_slot(&mut seed_rng);
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
                    encounter_slot,
                ));
            }

            if !self.returned_check2 && check2 {
                self.returned_check2 = true;
                let mut seed_rng = self.rng;
                let level = self.calc_level(&mut seed_rng);
                let encounter_slot = self.encounter_slot(&mut seed_rng);
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
                    encounter_slot,
                ));
            }

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

#[allow(clippy::too_many_arguments)]
pub fn get_methodjk_sync_state<
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
    wild: bool,
) -> impl Iterator<Item = BaseStatic4State> {
    MethodJKSyncStateIterator::<Game, LevelCalc, Gate>::new(
        species, min_level, max_level, tid, sid, ivs, seed, wild,
    )
}
