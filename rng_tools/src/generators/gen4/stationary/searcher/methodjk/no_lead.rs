use crate::gen4::LeadAbility;
use crate::gen4::calc_level::LevelCalculator;
use crate::gen4::game_logic::GameSpecificLogic;
use crate::gen4::stationary::generator::encounter_strategy::encounter_slot_from_roll;
use crate::gen4::stationary::searcher::base_state::BaseStatic4State;
use crate::rng::Rng;
use crate::rng::lcrng::{Pokerng, PokerngR};
use crate::{Ivs, Nature, Species};

struct MethodJKNoPidLeadStateIterator<Game: GameSpecificLogic, LevelCalc: LevelCalculator<PokerngR>>
{
    species: Species,
    min_level: u8,
    max_level: u8,
    pressure: bool,
    wild: bool,
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
    #[allow(clippy::too_many_arguments)]
    fn new(
        species: Species,
        min_level: u8,
        max_level: u8,
        tid: u16,
        sid: u16,
        ivs: Ivs,
        seed: u32,
        pressure: bool,
        wild: bool,
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
            wild,
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

                let encounter_slot = if self.wild {
                    encounter_slot_from_roll(seed_rng.rand::<u16>())
                } else {
                    0
                };

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
                    encounter_slot,
                ));

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

#[allow(clippy::too_many_arguments)]
pub fn get_methodjk_no_lead_state<Game: GameSpecificLogic, LevelCalc: LevelCalculator<PokerngR>>(
    species: Species,
    min_level: u8,
    max_level: u8,
    tid: u16,
    sid: u16,
    ivs: Ivs,
    seed: u32,
    pressure: bool,
    wild: bool,
) -> impl Iterator<Item = BaseStatic4State> {
    MethodJKNoPidLeadStateIterator::<Game, LevelCalc>::new(
        species, min_level, max_level, tid, sid, ivs, seed, pressure, wild,
    )
}
