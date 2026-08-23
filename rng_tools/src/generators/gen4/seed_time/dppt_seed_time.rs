use super::coin_flips::{CoinFlip, coin_flips};
use super::{SeedTime4, calc_seed};
use crate::RngDateTime;
use chrono::Duration;
use serde::{Deserialize, Serialize};
use std::ops::RangeInclusive;
use tsify::Tsify;
use wasm_bindgen::prelude::*;

#[derive(Debug, Clone, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct DpptSeedTime4 {
    pub seed: u32,
    pub datetime: RngDateTime,
    pub delay: u32,
    pub coin_flips: Vec<CoinFlip>,
}

impl DpptSeedTime4 {
    pub fn new(seed: u32, datetime: RngDateTime, delay: u32, coin_flip_count: usize) -> Self {
        Self {
            seed,
            datetime,
            delay,
            coin_flips: coin_flips(seed, coin_flip_count),
        }
    }
}

#[derive(Debug, Clone, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct RelativeDpptSeedtimeOpts {
    pub seedtime: SeedTime4,
    pub delay_offset: i32,
    pub second_offset: i32,
    pub coin_flip_count: usize,
}

impl RelativeDpptSeedtimeOpts {
    fn second_range(&self) -> RangeInclusive<i32> {
        -self.second_offset..=self.second_offset
    }

    fn delay_range(&self) -> RangeInclusive<i32> {
        -self.delay_offset..=self.delay_offset
    }
}

/// Generates a list of seed times relative to a given seed time, with specified offsets for delay and seconds.
/// Useful for finding seeds that are close to a known seed time, such as when calibrating a DPPT RNG.
#[wasm_bindgen]
pub fn get_relative_dppt_seedtimes(opts: RelativeDpptSeedtimeOpts) -> Vec<DpptSeedTime4> {
    let datetime = opts.seedtime.datetime.to_naive_datetime();
    let datetime = match datetime {
        Some(dt) => dt,
        None => return vec![],
    };

    let mut results = vec![];

    for second_offset in opts.second_range() {
        for delay_offset in opts.delay_range() {
            let offset_datetime = datetime + Duration::seconds(second_offset as i64);
            let datetime = RngDateTime::from(offset_datetime);
            let delay = opts.seedtime.delay.wrapping_add(delay_offset as u32);
            let seed = calc_seed(&datetime, delay);
            results.push(DpptSeedTime4::new(
                seed,
                datetime,
                delay,
                opts.coin_flip_count,
            ));
        }
    }

    results
}

#[cfg(test)]
mod test {
    use super::*;

    mod get_relative_dppt_seedtimes {
        use super::*;
        use crate::{assert_list_eq, datetime};

        fn parse_pokefinder_output(output: &str) -> Vec<DpptSeedTime4> {
            let mut results: Vec<DpptSeedTime4> = Vec::new();
            for raw_line in output.lines() {
                let line = raw_line.trim();

                if line.is_empty() {
                    continue;
                }

                let parts: Vec<&str> = line.split("\t").collect();
                let seed = u32::from_str_radix(parts[0], 16).unwrap();
                let datetime = RngDateTime::from_pokefinder_str(parts[1]).unwrap();
                let delay = parts[2].parse::<u32>().unwrap();
                let coin_flips = CoinFlip::from_pokefinder_chars(parts[3].chars());

                results.push(DpptSeedTime4 {
                    seed,
                    datetime,
                    delay,
                    coin_flips,
                })
            }
            results
        }

        macro_rules! pokefinder {
            ($file:expr) => {
                parse_pokefinder_output(include_str!($file))
            };
        }

        #[test]
        fn matches_pokefinder() {
            let opts = RelativeDpptSeedtimeOpts {
                seedtime: SeedTime4 {
                    seed: 0x00001234,
                    datetime: datetime!(2026-05-28 00:57:59).unwrap(),
                    delay: 4634,
                },
                delay_offset: 5,
                second_offset: 5,
                coin_flip_count: 20,
            };
            let results = get_relative_dppt_seedtimes(opts);
            let expected = pokefinder!("test_data/calc_dppt_seedtimes/matches_pokefinder.txt");

            assert_list_eq!(results, expected);
        }
    }
}
