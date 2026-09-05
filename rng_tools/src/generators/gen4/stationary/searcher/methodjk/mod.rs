mod cutecharm;
mod no_lead;
mod sync;

use crate::gen4::calc_level::LevelCalculator;
use crate::gen4::game_logic::GameSpecificLogic;
use crate::gen4::stationary::searcher::base_state::BaseStatic4State;
use crate::gen4::stationary::searcher::opts::Static4LeadInput;
use crate::rng::lcrng::PokerngR;
use crate::{Ivs, Species};
use cutecharm::get_methodjk_cutecharm;
use no_lead::get_methodjk_no_lead_state;
pub use sync::{GateOnCheck1, NoGate, get_methodjk_sync_state};

#[allow(clippy::too_many_arguments)]
pub fn get_methodjk_states<
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
    wild: bool,
) -> Box<dyn Iterator<Item = BaseStatic4State>> {
    match lead {
        Static4LeadInput::Synchronize => {
            Box::new(get_methodjk_sync_state::<Game, LevelCalc, NoGate>(
                species, min_level, max_level, tid, sid, ivs, seed, wild,
            ))
        }
        Static4LeadInput::CutecharmF | Static4LeadInput::CutecharmM => Box::new(
            get_methodjk_cutecharm::<Game, LevelCalc>(
                lead, species, min_level, max_level, tid, sid, ivs, seed, wild,
            )
            .into_iter(),
        ),
        Static4LeadInput::None => Box::new(get_methodjk_no_lead_state::<Game, LevelCalc>(
            species, min_level, max_level, tid, sid, ivs, seed, false, wild,
        )),
        Static4LeadInput::Pressure => Box::new(get_methodjk_no_lead_state::<Game, LevelCalc>(
            species, min_level, max_level, tid, sid, ivs, seed, true, wild,
        )),
    }
}
