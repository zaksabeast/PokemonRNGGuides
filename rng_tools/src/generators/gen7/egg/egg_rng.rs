use crate::rng::Rng;
use crate::rng::tinymt::TinyMT;

#[derive(Debug, Clone)]
pub(super) struct EggRng {
    rng: TinyMT,
    rand_count: usize,
}

impl EggRng {
    pub(super) fn new(rng: TinyMT) -> Self {
        Self { rng, rand_count: 0 }
    }

    pub(super) fn rand(&mut self) -> u32 {
        self.rand_count += 1;

        self.rng.rand::<u32>()
    }

    /// Eggs use modulo, unlike `TinyMT`'s `rand_max`.
    pub(super) fn rand_mod(&mut self, max: u32) -> u32 {
        self.rand() % max
    }

    pub(super) fn rand_bit(&mut self) -> u32 {
        self.rand() & 1
    }

    pub(super) fn rand_count(&self) -> usize {
        self.rand_count
    }
}
