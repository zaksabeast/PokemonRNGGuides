use super::egg_rng::EggRng;
use crate::gen6_psv;

/// How the egg's PID is made. The Masuda Method and Shiny Charm roll it from
/// the egg RNG, retrying until it's shiny or out of rolls. Without either, the
/// main RNG makes the PID when the egg is accepted, which isn't supported yet.
pub(super) trait EggPidStrategy {
    const ROLLS: u8;

    fn roll(rng: &mut EggRng, tsv: u16) -> u32 {
        let mut pid = 0;
        for _ in 0..Self::ROLLS {
            pid = rng.rand();
            if gen6_psv(pid) == tsv {
                break;
            }
        }
        pid
    }
}

pub(super) struct ShinyCharm;

impl EggPidStrategy for ShinyCharm {
    const ROLLS: u8 = 2;
}

pub(super) struct MasudaMethod;

impl EggPidStrategy for MasudaMethod {
    const ROLLS: u8 = 6;
}

pub(super) struct MasudaAndShinyCharm;

impl EggPidStrategy for MasudaAndShinyCharm {
    const ROLLS: u8 = 8;
}
