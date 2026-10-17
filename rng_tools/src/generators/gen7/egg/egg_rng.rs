use crate::rng::Rng;
use crate::rng::tinymt::TinyMT;

/// The egg RNG while an egg generates. Each rand it uses is one advance, so
/// accepting the egg moves the egg seeds forward by `used()`.
#[derive(Debug, Clone)]
pub(super) struct EggRng {
    rng: TinyMT,
    used: usize,
}

impl EggRng {
    pub(super) fn new(rng: TinyMT) -> Self {
        Self { rng, used: 0 }
    }

    pub(super) fn rand(&mut self) -> u32 {
        self.used += 1;
        self.rng.rand::<u32>()
    }

    /// Eggs use modulo, unlike `TinyMT`'s `rand_max`.
    pub(super) fn rand_mod(&mut self, max: u32) -> u32 {
        self.rand() % max
    }

    pub(super) fn rand_bit(&mut self) -> u32 {
        self.rand() & 1
    }

    pub(super) fn used(&self) -> usize {
        self.used
    }
}
