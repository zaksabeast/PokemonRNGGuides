use super::base_state::BaseStatic4State;
use super::opts::Static4LeadInput;
use crate::Species;
use crate::gen4::LeadAbility;
use crate::rng::Rng;
use crate::rng::lcrng::Pokerng;
use crate::{Ivs, Nature};

pub fn get_method1_states(
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
        0,
    );
    std::iter::once(state)
}
