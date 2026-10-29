use crate::gen4::game_logic::{DpptLogic, GameSpecificLogic};
use crate::rng::Rng;
use crate::rng::lcrng::{Pokerng, PokerngR};

pub trait EncounterStrategy {
    fn generate_encounter_slot(rng: &mut Pokerng) -> u8;
    fn generate_encounter_slot_reverse(rng: &mut PokerngR) -> u8;
}

pub fn encounter_slot_from_roll(value: u16) -> u8 {
    let scaled = DpptLogic::max(value, 100);
    match scaled {
        0..=19 => 0,
        20..=39 => 1,
        40..=49 => 2,
        50..=59 => 3,
        60..=69 => 4,
        70..=79 => 5,
        80..=84 => 6,
        85..=89 => 7,
        90..=93 => 8,
        94..=97 => 9,
        98 => 10,
        _ => 11,
    }
}

pub struct StaticEncounter;

impl EncounterStrategy for StaticEncounter {
    fn generate_encounter_slot(_rng: &mut Pokerng) -> u8 {
        0
    }

    fn generate_encounter_slot_reverse(_rng: &mut PokerngR) -> u8 {
        0
    }
}

pub struct WildEncounter;

impl EncounterStrategy for WildEncounter {
    fn generate_encounter_slot(rng: &mut Pokerng) -> u8 {
        encounter_slot_from_roll(rng.rand::<u16>())
    }

    fn generate_encounter_slot_reverse(rng: &mut PokerngR) -> u8 {
        encounter_slot_from_roll(rng.rand::<u16>())
    }
}
