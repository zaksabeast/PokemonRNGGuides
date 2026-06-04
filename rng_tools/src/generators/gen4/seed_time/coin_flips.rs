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

#[derive(Debug, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct CoinFlipAdvanceOpts {
    pub seed: u32,
    pub initial_advances: usize,
    pub max_advances: usize,
}

#[derive(Debug, Clone, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct CoinFlipAdvanceState {
    pub advance: usize,
    pub coin_flip: CoinFlip,
}

impl CoinFlipAdvanceState {
    fn new(rand: u32, advance: usize) -> Self {
        Self {
            advance,
            coin_flip: match rand & 1 {
                0 => CoinFlip::Tails,
                _ => CoinFlip::Heads,
            },
        }
    }
}

#[derive(Debug, Clone, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct CoinFlipResult {
    pub seed: u32,
    pub coin_flips: Vec<CoinFlip>,
}

#[wasm_bindgen]
pub fn get_coin_flips(opts: &CoinFlipAdvanceOpts) -> Vec<CoinFlipAdvanceState> {
    MT::new(opts.seed)
        .enumerate()
        .skip(opts.initial_advances)
        .take(opts.max_advances.wrapping_add(1))
        .map(|(advance, rand)| CoinFlipAdvanceState::new(rand, advance))
        .collect()
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
    ($flips:expr) => {{
        $crate::generators::gen4::seed_time::coin_flips::CoinFlip::from_pokefinder_chars(
            $flips.chars(),
        )
    }};
}

#[cfg(test)]
mod tests {
    use super::*;

    mod coin_flips {
        use super::*;
        use crate::assert_list_eq;

        #[test]
        fn base() {
            let seed = 0;
            let count = 20;

            let result = coin_flips(seed, count);
            let expected = coin_flips!("THHTHHHHHHHTTHTTTTTH");
            assert_list_eq!(result, expected);
        }
    }

    mod get_coin_flips {
        use super::*;
        use crate::assert_list_eq;

        #[test]
        fn base() {
            let opts = CoinFlipAdvanceOpts {
                seed: 0,
                initial_advances: 0,
                max_advances: 4,
            };

            let result = get_coin_flips(&opts);

            let expected: Vec<CoinFlipAdvanceState> = coin_flips(opts.seed, opts.max_advances + 1)
                .into_iter()
                .enumerate()
                .map(|(advance, coin_flip)| CoinFlipAdvanceState { advance, coin_flip })
                .collect();

            assert_list_eq!(result, expected);
        }

        #[test]
        fn initial_advances() {
            let opts = CoinFlipAdvanceOpts {
                seed: 0,
                initial_advances: 2,
                max_advances: 3,
            };

            let result = get_coin_flips(&opts);

            let expected: Vec<CoinFlipAdvanceState> =
                coin_flips(opts.seed, opts.initial_advances + opts.max_advances + 1)
                    .into_iter()
                    .enumerate()
                    .skip(opts.initial_advances)
                    .map(|(advance, coin_flip)| CoinFlipAdvanceState { advance, coin_flip })
                    .collect();

            assert_list_eq!(result, expected);
        }
    }
}
