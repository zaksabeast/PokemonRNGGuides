use serde::{Deserialize, Serialize};
use tsify::Tsify;
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

pub fn coin_flips(seed: u32, count: usize) -> Vec<CoinFlip> {
    MT::new(seed)
        .take(count)
        .map(|rand| match rand & 1 {
            0 => CoinFlip::Tails,
            _ => CoinFlip::Heads,
        })
        .collect()
}

#[derive(Debug, Clone, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct CoinFlipResult {
    pub seed: u32,
    pub coin_flips: Vec<CoinFlip>,
}

#[wasm_bindgen]
pub fn coin_flips_for_seeds(seeds: &[u32], count: usize) -> Vec<CoinFlipResult> {
    seeds
        .iter()
        .map(|&seed| CoinFlipResult {
            seed,
            coin_flips: coin_flips(seed, count),
        })
        .collect()
}

#[macro_export]
macro_rules! coin_flips {
    ($flips:expr) => {{ $crate::generators::gen4::seed_time::CoinFlip::from_pokefinder_chars($flips.chars()) }};
}
