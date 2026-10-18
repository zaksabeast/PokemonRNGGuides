use crate::rng::{GetMaxRand, GetRand, Rng};
use std::collections::VecDeque;

/// Returns preset 64 bit rands, one per advance.
#[derive(Clone)]
pub struct FakeRng {
    values: VecDeque<u64>,
}

impl FakeRng {
    pub fn new(values: &[u64]) -> Self {
        Self {
            values: values.iter().copied().collect(),
        }
    }
}

impl Iterator for FakeRng {
    type Item = u64;

    fn next(&mut self) -> Option<Self::Item> {
        Some(self.values.pop_front().expect("ran out of fake rands"))
    }
}

impl GetRand<u64> for FakeRng {
    fn get(&mut self) -> u64 {
        self.next().expect("always some")
    }
}

impl GetMaxRand<u64> for FakeRng {
    fn get_max(&mut self, max: u64) -> u64 {
        self.rand::<u64>() % max
    }
}

impl Rng for FakeRng {}
