use super::{calc_ab, calc_seed};
use crate::rng::mt::MT;
use crate::{RngDateTime, get_days_in_month};
use chrono::Duration;
use serde::{Deserialize, Serialize};
use tsify_next::Tsify;
use wasm_bindgen::prelude::*;

#[derive(Debug, Clone, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct SeedTime4 {
    pub datetime: RngDateTime,
    pub delay: u32,
    pub coin_flips: Vec<CoinFlip>,
}

#[derive(Debug, Clone, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct SeedTime4Options {
    pub seed: u32,
    pub year: u32,
    pub month: u32,
    pub forced_second: Option<u8>,
}

#[wasm_bindgen]
pub fn dppt_calculate_seedtime(opts: SeedTime4Options) -> Vec<SeedTime4> {
    let year = opts.year.clamp(2000, 2100);
    let month = opts.month.clamp(1, 12);
    let ab = opts.seed >> 24;
    let cd = (opts.seed >> 16) & 0xff;
    let efgh = opts.seed & 0xffff;
    let coin_flips = coin_flips(opts.seed);

    // Allow overflow seeds by setting hour to 23 and adjusting for delay
    let hour = if cd > 23 { 23 } else { cd };
    let delay = match cd > 23 {
        true => efgh
            .wrapping_add(2000)
            .wrapping_sub(year)
            .wrapping_add(cd.wrapping_sub(23).wrapping_mul(0x10000)),
        false => efgh + (2000 - year),
    };

    let mut results = vec![];

    let max_days = get_days_in_month(year as i32, month);
    for day in 1..=max_days {
        for minute in 0..60 {
            for second in 0..60 {
                if ab == calc_ab(opts.month, day, minute, second) & 0xff
                    && (opts.forced_second.is_none() || Some(second as u8) == opts.forced_second)
                {
                    results.push(SeedTime4 {
                        delay,
                        coin_flips: coin_flips.clone(),
                        datetime: RngDateTime::new(year, month, day, hour, minute, second)
                            .unwrap_or_default(),
                    });
                }
            }
        }
    }

    results
}

#[derive(Debug, Clone, Copy, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub enum CoinFlip {
    Heads,
    Tails,
}

fn coin_flips(seed: u32) -> Vec<CoinFlip> {
    MT::new(seed)
        .take(20)
        .map(|rand| match rand & 1 {
            0 => CoinFlip::Tails,
            _ => CoinFlip::Heads,
        })
        .collect()
}

#[derive(Debug, Clone, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct SeedTime4CalibrationOptions {
    pub delay_calibration: i32,
    pub second_calibration: i64,
    pub entei_route: Option<u8>,
    pub raikou_route: Option<u8>,
    pub lati_route: Option<u8>,
}

#[derive(Debug, Clone, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct SeedTime4Calibrate {
    pub seed: u32,
    pub datetime: RngDateTime,
    pub delay: u32,
    pub coin_flips: Vec<CoinFlip>,
}

#[wasm_bindgen]
pub fn dppt_calibrate_seedtime(
    seedtime: SeedTime4,
    opts: SeedTime4CalibrationOptions,
) -> Vec<SeedTime4Calibrate> {
    let mut results = vec![];
    let datetime = match seedtime.datetime.to_naive_datetime() {
        Some(datetime) => datetime,
        None => return results,
    };

    for second_offset in -opts.second_calibration..=opts.second_calibration {
        let offset = datetime + Duration::seconds(second_offset);
        for delay_offset in -opts.delay_calibration..=opts.delay_calibration {
            let abs_delay_offset = delay_offset.unsigned_abs();
            let delay = match delay_offset.is_negative() {
                true => seedtime.delay.wrapping_sub(abs_delay_offset),
                false => seedtime.delay.wrapping_add(abs_delay_offset),
            };
            let result_datetime = RngDateTime::from(offset);
            let seed = calc_seed(&result_datetime, delay);
            results.push(SeedTime4Calibrate {
                seed,
                delay,
                datetime: result_datetime,
                coin_flips: coin_flips(seed),
            });
        }
    }

    results
}

#[cfg(test)]
mod test {
    use super::*;

    mod calibrate {
        use super::CoinFlip::*;
        use super::*;
        use crate::datetime;

        #[test]
        fn set1() {
            let seedtime = SeedTime4 {
                datetime: datetime!(2000-11-05 23:56:59).unwrap(),
                delay: 10800349,

                coin_flips: vec![
                    Heads, Tails, Heads, Tails, Heads, Heads, Heads, Tails, Heads, Heads, Heads,
                    Heads, Tails, Tails, Tails, Heads, Heads, Tails, Heads, Tails,
                ],
            };
            let opts = SeedTime4CalibrationOptions {
                delay_calibration: 3,
                second_calibration: 1,
                entei_route: None,
                raikou_route: None,
                lati_route: None,
            };
            let result = dppt_calibrate_seedtime(seedtime, opts);
            let expected = [
                SeedTime4Calibrate {
                    seed: 0xa9bbccda,
                    datetime: datetime!(2000-11-05 23:56:58).unwrap(),
                    delay: 10800346,
                    coin_flips: vec![
                        Heads, Heads, Tails, Tails, Tails, Heads, Tails, Tails, Heads, Tails,
                        Heads, Heads, Heads, Heads, Heads, Tails, Heads, Heads, Tails, Heads,
                    ],
                },
                SeedTime4Calibrate {
                    seed: 0xa9bbccdb,
                    datetime: datetime!(2000-11-05 23:56:58).unwrap(),
                    delay: 10800347,
                    coin_flips: vec![
                        Heads, Tails, Tails, Tails, Tails, Tails, Tails, Tails, Heads, Heads,
                        Heads, Tails, Tails, Tails, Heads, Tails, Heads, Tails, Heads, Tails,
                    ],
                },
                SeedTime4Calibrate {
                    seed: 0xa9bbccdc,
                    datetime: datetime!(2000-11-05 23:56:58).unwrap(),
                    delay: 10800348,
                    coin_flips: vec![
                        Tails, Heads, Tails, Tails, Heads, Heads, Heads, Heads, Heads, Heads,
                        Heads, Heads, Tails, Tails, Heads, Tails, Heads, Tails, Heads, Heads,
                    ],
                },
                SeedTime4Calibrate {
                    seed: 0xa9bbccdd,
                    datetime: datetime!(2000-11-05 23:56:58).unwrap(),
                    delay: 10800349,
                    coin_flips: vec![
                        Heads, Tails, Tails, Heads, Heads, Heads, Heads, Heads, Heads, Heads,
                        Tails, Tails, Tails, Tails, Heads, Heads, Heads, Heads, Heads, Heads,
                    ],
                },
                SeedTime4Calibrate {
                    seed: 0xa9bbccde,
                    datetime: datetime!(2000-11-05 23:56:58).unwrap(),
                    delay: 10800350,
                    coin_flips: vec![
                        Tails, Tails, Tails, Tails, Tails, Heads, Tails, Heads, Heads, Heads,
                        Heads, Tails, Tails, Tails, Tails, Heads, Heads, Heads, Heads, Tails,
                    ],
                },
                SeedTime4Calibrate {
                    seed: 0xa9bbccdf,
                    datetime: datetime!(2000-11-05 23:56:58).unwrap(),
                    delay: 10800351,
                    coin_flips: vec![
                        Heads, Tails, Heads, Tails, Heads, Heads, Tails, Tails, Tails, Tails,
                        Heads, Heads, Heads, Tails, Heads, Heads, Heads, Heads, Heads, Heads,
                    ],
                },
                SeedTime4Calibrate {
                    seed: 0xa9bbcce0,
                    datetime: datetime!(2000-11-05 23:56:58).unwrap(),
                    delay: 10800352,
                    coin_flips: vec![
                        Heads, Heads, Tails, Heads, Tails, Heads, Tails, Tails, Tails, Tails,
                        Tails, Heads, Heads, Tails, Tails, Tails, Heads, Heads, Heads, Heads,
                    ],
                },
                SeedTime4Calibrate {
                    seed: 0xaabbccda,
                    datetime: datetime!(2000-11-05 23:56:59).unwrap(),
                    delay: 10800346,
                    coin_flips: vec![
                        Tails, Tails, Tails, Tails, Heads, Heads, Tails, Heads, Tails, Tails,
                        Tails, Tails, Tails, Tails, Heads, Tails, Tails, Heads, Heads, Heads,
                    ],
                },
                SeedTime4Calibrate {
                    seed: 0xaabbccdb,
                    datetime: datetime!(2000-11-05 23:56:59).unwrap(),
                    delay: 10800347,
                    coin_flips: vec![
                        Tails, Tails, Tails, Heads, Heads, Tails, Heads, Tails, Tails, Heads,
                        Tails, Heads, Tails, Heads, Tails, Tails, Heads, Heads, Tails, Heads,
                    ],
                },
                SeedTime4Calibrate {
                    seed: 0xaabbccdc,
                    datetime: datetime!(2000-11-05 23:56:59).unwrap(),
                    delay: 10800348,
                    coin_flips: vec![
                        Heads, Heads, Tails, Tails, Tails, Tails, Tails, Tails, Heads, Tails,
                        Heads, Heads, Heads, Heads, Heads, Heads, Tails, Tails, Tails, Tails,
                    ],
                },
                SeedTime4Calibrate {
                    seed: 0xaabbccdd,
                    datetime: datetime!(2000-11-05 23:56:59).unwrap(),
                    delay: 10800349,
                    coin_flips: vec![
                        Heads, Tails, Heads, Tails, Heads, Heads, Heads, Tails, Heads, Heads,
                        Heads, Heads, Tails, Tails, Tails, Heads, Heads, Tails, Heads, Tails,
                    ],
                },
                SeedTime4Calibrate {
                    seed: 0xaabbccde,
                    datetime: datetime!(2000-11-05 23:56:59).unwrap(),
                    delay: 10800350,
                    coin_flips: vec![
                        Tails, Heads, Heads, Tails, Tails, Tails, Heads, Heads, Tails, Heads,
                        Tails, Tails, Tails, Heads, Heads, Tails, Heads, Tails, Heads, Heads,
                    ],
                },
                SeedTime4Calibrate {
                    seed: 0xaabbccdf,
                    datetime: datetime!(2000-11-05 23:56:59).unwrap(),
                    delay: 10800351,
                    coin_flips: vec![
                        Heads, Tails, Tails, Tails, Tails, Heads, Heads, Tails, Heads, Heads,
                        Tails, Heads, Tails, Heads, Heads, Heads, Heads, Tails, Heads, Heads,
                    ],
                },
                SeedTime4Calibrate {
                    seed: 0xaabbcce0,
                    datetime: datetime!(2000-11-05 23:56:59).unwrap(),
                    delay: 10800352,
                    coin_flips: vec![
                        Heads, Tails, Tails, Heads, Heads, Heads, Tails, Tails, Heads, Tails,
                        Tails, Tails, Heads, Tails, Heads, Heads, Tails, Heads, Tails, Heads,
                    ],
                },
                SeedTime4Calibrate {
                    seed: 0x70bbccda,
                    datetime: datetime!(2000-11-05 23:57:00).unwrap(),
                    delay: 10800346,
                    coin_flips: vec![
                        Heads, Tails, Heads, Heads, Tails, Tails, Tails, Heads, Heads, Heads,
                        Tails, Tails, Heads, Tails, Tails, Tails, Heads, Tails, Heads, Heads,
                    ],
                },
                SeedTime4Calibrate {
                    seed: 0x70bbccdb,
                    datetime: datetime!(2000-11-05 23:57:00).unwrap(),
                    delay: 10800347,
                    coin_flips: vec![
                        Heads, Heads, Heads, Tails, Heads, Heads, Tails, Heads, Heads, Tails,
                        Tails, Tails, Heads, Tails, Tails, Heads, Heads, Tails, Tails, Heads,
                    ],
                },
                SeedTime4Calibrate {
                    seed: 0x70bbccdc,
                    datetime: datetime!(2000-11-05 23:57:00).unwrap(),
                    delay: 10800348,
                    coin_flips: vec![
                        Heads, Tails, Heads, Heads, Tails, Tails, Tails, Heads, Tails, Heads,
                        Tails, Heads, Heads, Heads, Tails, Heads, Tails, Heads, Heads, Heads,
                    ],
                },
                SeedTime4Calibrate {
                    seed: 0x70bbccdd,
                    datetime: datetime!(2000-11-05 23:57:00).unwrap(),
                    delay: 10800349,
                    coin_flips: vec![
                        Tails, Heads, Heads, Heads, Heads, Heads, Heads, Heads, Tails, Tails,
                        Tails, Tails, Tails, Tails, Heads, Heads, Heads, Tails, Tails, Heads,
                    ],
                },
                SeedTime4Calibrate {
                    seed: 0x70bbccde,
                    datetime: datetime!(2000-11-05 23:57:00).unwrap(),
                    delay: 10800350,
                    coin_flips: vec![
                        Heads, Tails, Tails, Heads, Heads, Tails, Tails, Tails, Heads, Tails,
                        Heads, Tails, Heads, Heads, Heads, Tails, Heads, Tails, Tails, Tails,
                    ],
                },
                SeedTime4Calibrate {
                    seed: 0x70bbccdf,
                    datetime: datetime!(2000-11-05 23:57:00).unwrap(),
                    delay: 10800351,
                    coin_flips: vec![
                        Tails, Heads, Heads, Tails, Tails, Heads, Tails, Heads, Heads, Tails,
                        Heads, Heads, Tails, Tails, Tails, Heads, Heads, Heads, Heads, Heads,
                    ],
                },
                SeedTime4Calibrate {
                    seed: 0x70bbcce0,
                    datetime: datetime!(2000-11-05 23:57:00).unwrap(),
                    delay: 10800352,
                    coin_flips: vec![
                        Tails, Tails, Tails, Heads, Tails, Tails, Heads, Heads, Tails, Heads,
                        Tails, Tails, Heads, Heads, Heads, Tails, Heads, Tails, Heads, Tails,
                    ],
                },
            ];

            assert_eq!(result.len(), expected.len());
            result
                .into_iter()
                .zip(expected.into_iter())
                .enumerate()
                .for_each(|(index, (result, expected))| {
                    assert_eq!(result, expected, "index: {}", index);
                });
        }
    }

    mod calculate_times {
        use super::CoinFlip::*;
        use super::*;
        use crate::datetime;

        #[test]
        fn without_forced_second() {
            let opts = SeedTime4Options {
                seed: 0xaabbccdd,
                year: 2032,
                month: 2,
                forced_second: None,
            };
            let coin_flips = vec![
                Heads, Tails, Heads, Tails, Heads, Heads, Heads, Tails, Heads, Heads, Heads, Heads,
                Tails, Tails, Tails, Heads, Heads, Tails, Heads, Tails,
            ];
            let result = dppt_calculate_seedtime(opts);
            let expected = [
                SeedTime4 {
                    datetime: datetime!(2032-02-26 23:59:59).unwrap(),
                    delay: 10800317,
                    coin_flips: coin_flips.clone(),
                },
                SeedTime4 {
                    datetime: datetime!(2032-02-27 23:57:59).unwrap(),
                    delay: 10800317,
                    coin_flips: coin_flips.clone(),
                },
                SeedTime4 {
                    datetime: datetime!(2032-02-27 23:58:58).unwrap(),
                    delay: 10800317,
                    coin_flips: coin_flips.clone(),
                },
                SeedTime4 {
                    datetime: datetime!(2032-02-27 23:59:57).unwrap(),
                    delay: 10800317,
                    coin_flips: coin_flips.clone(),
                },
                SeedTime4 {
                    datetime: datetime!(2032-02-28 23:55:59).unwrap(),
                    delay: 10800317,
                    coin_flips: coin_flips.clone(),
                },
                SeedTime4 {
                    datetime: datetime!(2032-02-28 23:56:58).unwrap(),
                    delay: 10800317,
                    coin_flips: coin_flips.clone(),
                },
                SeedTime4 {
                    datetime: datetime!(2032-02-28 23:57:57).unwrap(),
                    delay: 10800317,
                    coin_flips: coin_flips.clone(),
                },
                SeedTime4 {
                    datetime: datetime!(2032-02-28 23:58:56).unwrap(),
                    delay: 10800317,
                    coin_flips: coin_flips.clone(),
                },
                SeedTime4 {
                    datetime: datetime!(2032-02-28 23:59:55).unwrap(),
                    delay: 10800317,
                    coin_flips: coin_flips.clone(),
                },
                SeedTime4 {
                    datetime: datetime!(2032-02-29 23:53:59).unwrap(),
                    delay: 10800317,
                    coin_flips: coin_flips.clone(),
                },
                SeedTime4 {
                    datetime: datetime!(2032-02-29 23:54:58).unwrap(),
                    delay: 10800317,
                    coin_flips: coin_flips.clone(),
                },
                SeedTime4 {
                    datetime: datetime!(2032-02-29 23:55:57).unwrap(),
                    delay: 10800317,
                    coin_flips: coin_flips.clone(),
                },
                SeedTime4 {
                    datetime: datetime!(2032-02-29 23:56:56).unwrap(),
                    delay: 10800317,
                    coin_flips: coin_flips.clone(),
                },
                SeedTime4 {
                    datetime: datetime!(2032-02-29 23:57:55).unwrap(),
                    delay: 10800317,
                    coin_flips: coin_flips.clone(),
                },
                SeedTime4 {
                    datetime: datetime!(2032-02-29 23:58:54).unwrap(),
                    delay: 10800317,
                    coin_flips: coin_flips.clone(),
                },
                SeedTime4 {
                    datetime: datetime!(2032-02-29 23:59:53).unwrap(),
                    delay: 10800317,
                    coin_flips: coin_flips.clone(),
                },
            ];

            assert_eq!(result.len(), expected.len());
            result
                .into_iter()
                .zip(expected.into_iter())
                .enumerate()
                .for_each(|(index, (result, expected))| {
                    assert_eq!(result, expected, "index: {}", index);
                });
        }

        #[test]
        fn with_forced_second() {
            let opts = SeedTime4Options {
                seed: 0xaabbccdd,
                year: 2032,
                month: 2,
                forced_second: Some(56),
            };
            let coin_flips = vec![
                Heads, Tails, Heads, Tails, Heads, Heads, Heads, Tails, Heads, Heads, Heads, Heads,
                Tails, Tails, Tails, Heads, Heads, Tails, Heads, Tails,
            ];
            let result = dppt_calculate_seedtime(opts);
            let expected = [
                SeedTime4 {
                    datetime: datetime!(2032-02-28 23:58:56).unwrap(),
                    delay: 10800317,
                    coin_flips: coin_flips.clone(),
                },
                SeedTime4 {
                    datetime: datetime!(2032-02-29 23:56:56).unwrap(),
                    delay: 10800317,
                    coin_flips: coin_flips.clone(),
                },
            ];

            assert_eq!(result.len(), expected.len());
            result
                .into_iter()
                .zip(expected.into_iter())
                .enumerate()
                .for_each(|(index, (result, expected))| {
                    assert_eq!(result, expected, "index: {}", index);
                });
        }
    }

    mod calc_seed {
        use super::*;

        #[test]
        fn set1() {
            let test_params = [
                ((2025, 5, 30, 6, 59, 26), 5300, 0xeb0614cd),
                ((2025, 5, 30, 06, 59, 26), 5300, 0xeb0614cd),
                ((2025, 5, 31, 06, 54, 26), 5300, 0xeb0614cd),
                ((2025, 6, 25, 06, 59, 26), 5300, 0xeb0614cd),
                ((2025, 6, 26, 06, 53, 26), 5300, 0xeb0614cd),
                ((2025, 6, 27, 06, 47, 26), 5300, 0xeb0614cd),
                ((2025, 6, 28, 06, 41, 26), 5300, 0xeb0614cd),
                ((2025, 6, 29, 06, 35, 26), 5300, 0xeb0614cd),
                ((2025, 6, 30, 06, 29, 26), 5300, 0xeb0614cd),
                ((2000, 2, 26, 23, 59, 59), 10800349, 0xaabbccdd),
                ((2000, 2, 27, 23, 57, 59), 10800349, 0xaabbccdd),
                ((2000, 2, 27, 23, 58, 58), 10800349, 0xaabbccdd),
                ((2005, 01, 01, 17, 00, 16), 4364, 0x11111111),
                ((2005, 01, 01, 17, 01, 15), 4364, 0x11111111),
                ((2005, 01, 01, 17, 02, 14), 4364, 0x11111111),
                ((2005, 01, 01, 17, 03, 13), 4364, 0x11111111),
            ];

            test_params
                .into_iter()
                .enumerate()
                .for_each(|(index, (datetime, delay, expected))| {
                    let datetime = RngDateTime::new(
                        datetime.0, datetime.1, datetime.2, datetime.3, datetime.4, datetime.5,
                    )
                    .expect("invalid datetime");
                    let result = calc_seed(&datetime, delay);
                    assert_eq!(result, expected, "index: {}", index);
                });
        }
    }
}
