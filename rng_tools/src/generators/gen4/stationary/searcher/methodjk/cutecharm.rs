use crate::gen4::LeadAbility;
use crate::gen4::calc_level::LevelCalculator;
use crate::gen4::game_logic::GameSpecificLogic;
use crate::gen4::stationary::generator::encounter_strategy::encounter_slot_from_roll;
use crate::gen4::stationary::searcher::base_state::BaseStatic4State;
use crate::gen4::stationary::searcher::opts::Static4LeadInput;
use crate::rng::Rng;
use crate::rng::lcrng::{Pokerng, PokerngR};
use crate::{Ivs, Nature, Species};

#[allow(clippy::too_many_arguments)]
pub fn get_methodjk_cutecharm<Game: GameSpecificLogic, LevelCalc: LevelCalculator<PokerngR>>(
    lead: Static4LeadInput,
    species: Species,
    min_level: u8,
    max_level: u8,
    tid: u16,
    sid: u16,
    ivs: Ivs,
    seed: u32,
    wild: bool,
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

    let encounter_slot = if wild {
        encounter_slot_from_roll(rng.rand::<u16>())
    } else {
        0
    };

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
        encounter_slot,
    );
    vec![state]
}
