use serde::{Deserialize, Serialize};
use tsify_next::Tsify;
use wasm_bindgen::prelude::*;

use crate::rng::mt::MT;

#[derive(Debug, Clone, Copy, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub enum CoinFlip {
    Heads,
    Tails,
}

impl CoinFlip {
    #[cfg(test)]
    pub fn from_str(str: &str) -> Vec<Self> {
        Self::from_pokefinder_chars(str.chars())
    }

    #[cfg(test)]
    pub fn from_pokefinder_chars(chrs: impl Iterator<Item = char>) -> Vec<Self> {
        chrs.filter(|chr| matches!(chr, 'H' | 'T'))
            .map(|chr| match chr {
                'H' => CoinFlip::Heads,
                'T' => CoinFlip::Tails,
                _ => CoinFlip::Heads,
            })
            .collect()
    }
}

pub fn coin_flips(seed: u32) -> Vec<CoinFlip> {
    MT::new(seed)
        .take(20)
        .map(|rand| match rand & 1 {
            0 => CoinFlip::Tails,
            _ => CoinFlip::Heads,
        })
        .collect()
}

#[macro_export]
macro_rules! coin_flips {
    ($flips:expr) => {{ $crate::generators::gen4::seed_time::CoinFlip::from_pokefinder_chars($flips.chars()) }};
}
