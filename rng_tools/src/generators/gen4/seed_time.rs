use std::ops::RangeInclusive;

use super::{calc_ab, calc_seed};
use crate::rng::Rng;
use crate::rng::lcrng::Pokerng;
use crate::rng::mt::MT;
use crate::{RngDateTime, Species, get_days_in_month};
use chrono::Duration;
use serde::{Deserialize, Serialize};
use tsify_next::Tsify;
use wasm_bindgen::prelude::*;

#[derive(Debug, Clone, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct SeedTime4 {
    pub seed: u32,
    pub datetime: RngDateTime,
    pub delay: u32,
    pub coin_flips: Vec<CoinFlip>,
}

impl SeedTime4 {
    pub fn new(seed: u32, datetime: RngDateTime, delay: u32) -> Self {
        Self {
            seed,
            datetime,
            delay,
            coin_flips: coin_flips(seed),
        }
    }
}

struct SeedTime4SingleMonthOptions {
    pub seed: u32,
    pub year: u32,
    pub month: u32,
    pub second_range: Option<RangeInclusive<u32>>,
    pub delay_range: Option<RangeInclusive<u32>>,
    pub find_first: bool,
}

fn dppt_calculate_single_month_seedtime(opts: SeedTime4SingleMonthOptions) -> Vec<SeedTime4> {
    let year = opts.year.clamp(2000, 2100);
    let month = opts.month.clamp(1, 12);
    let ab = opts.seed >> 24;
    let cd = (opts.seed >> 16) & 0xff;
    let efgh = opts.seed & 0xffff;

    // Allow overflow seeds by setting hour to 23 and adjusting for delay
    let hour = if cd > 23 { 23 } else { cd };
    let delay = match cd > 23 {
        true => efgh
            .wrapping_add(2000)
            .wrapping_sub(year)
            .wrapping_add(cd.wrapping_sub(23).wrapping_mul(0x10000)),
        false => efgh.wrapping_add(2000).wrapping_sub(year),
    };

    if let Some(delay_range) = opts.delay_range {
        if !delay_range.contains(&delay) {
            return vec![];
        }
    }

    let mut coin_flips_res: Option<Vec<CoinFlip>> = None;
    let mut lazy_coin_flip = || match coin_flips_res {
        Some(ref flips) => flips.clone(),
        None => {
            let new_flips = coin_flips(opts.seed);
            coin_flips_res = Some(new_flips.clone());
            new_flips
        }
    };

    let mut results = vec![];

    let second_range = opts.second_range.unwrap_or(0..=59);

    let max_days = get_days_in_month(year as i32, month);
    for day in 1..=max_days {
        for minute in 0..60 {
            for second in second_range.clone() {
                if ab == calc_ab(month, day, minute, second) & 0xff {
                    if let Some(datetime) = RngDateTime::new(year, month, day, hour, minute, second)
                    {
                        results.push(SeedTime4 {
                            seed: opts.seed,
                            delay,
                            datetime,
                            coin_flips: lazy_coin_flip(),
                        });

                        if opts.find_first {
                            return results;
                        }
                    }
                }
            }
        }
    }

    results
}

#[derive(Debug, Clone, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct SeedTime4Options {
    pub seed: u32,
    pub year: u32,
    pub month: Option<u32>,
    pub second_range: Option<RangeInclusive<u32>>,
    pub delay_range: Option<RangeInclusive<u32>>,
    pub find_first: bool,
}

#[wasm_bindgen]
pub fn dppt_calculate_seedtime(opts: SeedTime4Options) -> Vec<SeedTime4> {
    let month_range = match opts.month {
        Some(month) if (1..=12).contains(&month) => month..=month,
        _ => 1..=12,
    };

    let limit = match opts.find_first {
        true => 1,
        false => 10_000,
    };

    month_range
        .flat_map(|month| {
            dppt_calculate_single_month_seedtime(SeedTime4SingleMonthOptions {
                month,
                seed: opts.seed,
                year: opts.year,
                second_range: opts.second_range.clone(),
                delay_range: opts.delay_range.clone(),
                find_first: opts.find_first,
            })
        })
        .take(limit)
        .collect()
}

pub struct FindSeedTime4Options {
    pub seed: u32,
    pub year: u32,
    pub delay_range: RangeInclusive<u32>,
    pub second_range: Option<RangeInclusive<u32>>,
}

impl FindSeedTime4Options {
    pub fn new(
        seed: u32,
        year: u32,
        delay_range: RangeInclusive<u32>,
        second: Option<u32>,
    ) -> Self {
        match second {
            Some(second) => Self::new_force_second(seed, year, delay_range, second),
            None => Self::new_safe_second(seed, year, delay_range),
        }
    }

    pub fn new_safe_second(seed: u32, year: u32, delay_range: RangeInclusive<u32>) -> Self {
        Self {
            seed,
            year,
            delay_range,
            second_range: Some(1..=58),
        }
    }

    pub fn new_force_second(
        seed: u32,
        year: u32,
        delay_range: RangeInclusive<u32>,
        second: u32,
    ) -> Self {
        Self {
            seed,
            year,
            delay_range,
            second_range: Some(second..=second),
        }
    }
}

pub fn dppt_find_seedtime(opts: FindSeedTime4Options) -> Option<SeedTime4> {
    let opts = SeedTime4Options {
        seed: opts.seed,
        year: opts.year,
        month: None,
        second_range: opts.second_range,
        delay_range: Some(opts.delay_range),
        find_first: true,
    };
    dppt_calculate_seedtime(opts).into_iter().next()
}

#[derive(Debug, Clone, Copy, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub enum CoinFlip {
    Heads,
    Tails,
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
    ($flips:expr) => {{
        let s = $flips;
        s.chars()
            .map(|c| match c {
                'H' => $crate::generators::gen4::seed_time::CoinFlip::Heads,
                'T' => $crate::generators::gen4::seed_time::CoinFlip::Tails,
                _ => $crate::generators::gen4::seed_time::CoinFlip::Heads, // Default to Heads for any invalid character
            })
            .collect::<Vec<$crate::generators::gen4::seed_time::CoinFlip>>()
    }};
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
#[derive(Debug, Clone, PartialEq, Tsify, Serialize, Deserialize, Copy)]
pub struct RoamerLocation {
    pub roamer: Species,
    pub location: u16,
}
impl RoamerLocation {
    fn new(roamer: Species) -> Self {
        RoamerLocation {
            roamer,
            location: 0,
        }
    }
}

#[derive(Debug, Clone, PartialEq, Tsify, Serialize, Deserialize, Copy)]
pub struct RoamerSet {
    pub entei: bool,
    pub raikou: bool,
    pub latios: bool,
    pub latias: bool,
}

fn get_route_j(seed: u32, roamer: &mut RoamerLocation) {
    let roamer_rand = (seed >> 16) as u16 & 15;

    roamer.location = if roamer_rand < 11 {
        roamer_rand + 29
    } else {
        roamer_rand + 31
    };
}

fn get_route_k(seed: u32, roamer: &mut RoamerLocation) {
    let roamer_rand = (seed >> 16) as u16 % 25;

    let location = if roamer_rand > 21 {
        if roamer_rand == 22 {
            24
        } else if roamer_rand == 23 {
            26
        } else {
            28
        }
    } else {
        roamer_rand + 1
    };

    roamer.location = location;
}

fn roamer_check(seed: u32, roamer_opts: RoamerSet) -> Vec<RoamerLocation> {
    let mut rng = Pokerng::new(seed);
    let mut results = Vec::new();

    if roamer_opts.raikou == true {
        let mut roamer = RoamerLocation::new(Species::Raikou);
        get_route_j(rng.rand::<u32>(), &mut roamer);
        results.push(roamer)
    }
    if roamer_opts.entei == true {
        let mut roamer = RoamerLocation::new(Species::Entei);
        get_route_j(rng.rand::<u32>(), &mut roamer);
        results.push(roamer)
    }
    if roamer_opts.latios == true {
        let mut roamer = RoamerLocation::new(Species::Latios);
        get_route_k(rng.rand::<u32>(), &mut roamer);
        results.push(roamer)
    }
    if roamer_opts.latias == true {
        let mut roamer = RoamerLocation::new(Species::Latias);
        get_route_k(rng.rand::<u32>(), &mut roamer);
        results.push(roamer)
    }
    results
}
#[derive(Debug, Clone, PartialEq, Tsify, Serialize, Deserialize, Copy)]
pub enum ElmCall {
    E,
    K,
    P,
}

fn get_elm_calls(seed: u32) -> Vec<ElmCall> {
    Pokerng::new(seed)
        .take(20)
        .map(|rand| match (rand >> 16) as u16 % 3 {
            0 => ElmCall::E,
            1 => ElmCall::K,
            _ => ElmCall::P,
        })
        .collect()
}

#[macro_export]
macro_rules! elm_calls {
    ($flips:expr) => {{
        let s = $flips;
        s.chars()
            .map(|c| match c {
                'E' => $crate::generators::gen4::seed_time::ElmCall::E,
                'K' => $crate::generators::gen4::seed_time::ElmCall::K,
                'P' => $crate::generators::gen4::seed_time::ElmCall::P,
                _ => $crate::generators::gen4::seed_time::ElmCall::E, // Default to E for invalid characters
            })
            .collect::<Vec<$crate::generators::gen4::seed_time::ElmCall>>()
    }};
}
#[derive(Debug, Clone, PartialEq, Tsify, Serialize, Deserialize)]
pub struct HgssSeedTime4 {
    pub seed: u32,
    pub datetime: RngDateTime,
    pub delay: u32,
    pub roamer: Vec<RoamerLocation>,
    pub elm: Vec<ElmCall>,
}

pub fn hgss_find_seedtime(opts: FindSeedTime4Options, roamer: RoamerSet) -> Option<HgssSeedTime4> {
    let opts = SeedTime4Options {
        seed: opts.seed,
        year: opts.year,
        month: None,
        second_range: opts.second_range,
        delay_range: Some(opts.delay_range),
        find_first: true,
    };
    hgss_calculate_seedtime(opts, roamer).into_iter().next()
}

pub fn hgss_calculate_seedtime(opts: SeedTime4Options, roamer: RoamerSet) -> Vec<HgssSeedTime4> {
    let month_range = match opts.month {
        Some(month) if (1..=12).contains(&month) => month..=month,
        _ => 1..=12,
    };

    let limit = match opts.find_first {
        true => 1,
        false => 10_000,
    };

    month_range
        .flat_map(|month| {
            hgss_calculate_single_month_seedtime(
                SeedTime4SingleMonthOptions {
                    month,
                    seed: opts.seed,
                    year: opts.year,
                    second_range: opts.second_range.clone(),
                    delay_range: opts.delay_range.clone(),
                    find_first: opts.find_first,
                },
                roamer,
            )
        })
        .take(limit)
        .collect()
}

fn hgss_calculate_single_month_seedtime(
    opts: SeedTime4SingleMonthOptions,
    roamer: RoamerSet,
) -> Vec<HgssSeedTime4> {
    let year = opts.year.clamp(2000, 2100);
    let month = opts.month.clamp(1, 12);
    let ab = opts.seed >> 24;
    let cd = (opts.seed >> 16) & 0xff;
    let efgh = opts.seed & 0xffff;

    // Allow overflow seeds by setting hour to 23 and adjusting for delay
    let hour = if cd > 23 { 23 } else { cd };
    let delay = match cd > 23 {
        true => efgh
            .wrapping_add(2000)
            .wrapping_sub(year)
            .wrapping_add(cd.wrapping_sub(23).wrapping_mul(0x10000)),
        false => efgh.wrapping_add(2000).wrapping_sub(year),
    };

    if let Some(delay_range) = opts.delay_range {
        if !delay_range.contains(&delay) {
            return vec![];
        }
    }
    let elm = get_elm_calls(opts.seed);
    let roamer = roamer_check(opts.seed, roamer);

    let mut results = vec![];

    let second_range = opts.second_range.unwrap_or(0..=59);

    let max_days = get_days_in_month(year as i32, month);
    for day in 1..=max_days {
        for minute in 0..60 {
            for second in second_range.clone() {
                if ab == calc_ab(month, day, minute, second) & 0xff {
                    if let Some(datetime) = RngDateTime::new(year, month, day, hour, minute, second)
                    {
                        results.push(HgssSeedTime4 {
                            seed: opts.seed,
                            delay,
                            datetime,
                            roamer: roamer.clone(),
                            elm: elm.clone(),
                        });

                        if opts.find_first {
                            return results;
                        }
                    }
                }
            }
        }
    }

    results
}

#[cfg(test)]
mod test {
    use super::*;

    mod calibrate {
        use super::*;
        use crate::{assert_list_eq, datetime};

        #[test]
        fn set1() {
            let seedtime = SeedTime4 {
                seed: 0xa9bbccda,
                datetime: datetime!(2000-11-05 23:56:59).unwrap(),
                delay: 10800349,
                coin_flips: coin_flips!("HTHTHHHTHHTHHHTTHTH"),
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
                    coin_flips: coin_flips!("HHTTTHTTHTHHHHHTHHTH"),
                },
                SeedTime4Calibrate {
                    seed: 0xa9bbccdb,
                    datetime: datetime!(2000-11-05 23:56:58).unwrap(),
                    delay: 10800347,
                    coin_flips: coin_flips!("HTTTTTTTHHHTTTHTHTHT"),
                },
                SeedTime4Calibrate {
                    seed: 0xa9bbccdc,
                    datetime: datetime!(2000-11-05 23:56:58).unwrap(),
                    delay: 10800348,
                    coin_flips: coin_flips!("THTTHHHHHHHHTTHTHTHH"),
                },
                SeedTime4Calibrate {
                    seed: 0xa9bbccdd,
                    datetime: datetime!(2000-11-05 23:56:58).unwrap(),
                    delay: 10800349,
                    coin_flips: coin_flips!("HTTHHHHHHHTTTTHHHHHH"),
                },
                SeedTime4Calibrate {
                    seed: 0xa9bbccde,
                    datetime: datetime!(2000-11-05 23:56:58).unwrap(),
                    delay: 10800350,
                    coin_flips: coin_flips!("TTTTTHTHHHHTTTTHHHHT"),
                },
                SeedTime4Calibrate {
                    seed: 0xa9bbccdf,
                    datetime: datetime!(2000-11-05 23:56:58).unwrap(),
                    delay: 10800351,
                    coin_flips: coin_flips!("HTHTHHTTTTHHHTHHHHHH"),
                },
                SeedTime4Calibrate {
                    seed: 0xa9bbcce0,
                    datetime: datetime!(2000-11-05 23:56:58).unwrap(),
                    delay: 10800352,
                    coin_flips: coin_flips!("HHTHTHTTTTTHHTTTHHHH"),
                },
                SeedTime4Calibrate {
                    seed: 0xaabbccda,
                    datetime: datetime!(2000-11-05 23:56:59).unwrap(),
                    delay: 10800346,
                    coin_flips: coin_flips!("TTTTHHTHTTTTTTHTTHHH"),
                },
                SeedTime4Calibrate {
                    seed: 0xaabbccdb,
                    datetime: datetime!(2000-11-05 23:56:59).unwrap(),
                    delay: 10800347,
                    coin_flips: coin_flips!("TTTHHTHTTHTHTHTTHHTH"),
                },
                SeedTime4Calibrate {
                    seed: 0xaabbccdc,
                    datetime: datetime!(2000-11-05 23:56:59).unwrap(),
                    delay: 10800348,
                    coin_flips: coin_flips!("HHTTTTTTHTHHHHHHTTTT"),
                },
                SeedTime4Calibrate {
                    seed: 0xaabbccdd,
                    datetime: datetime!(2000-11-05 23:56:59).unwrap(),
                    delay: 10800349,
                    coin_flips: coin_flips!("HTHTHHHTHHHHTTTHHTHT"),
                },
                SeedTime4Calibrate {
                    seed: 0xaabbccde,
                    datetime: datetime!(2000-11-05 23:56:59).unwrap(),
                    delay: 10800350,
                    coin_flips: coin_flips!("THHTTTHHTHTTTHHTHTHH"),
                },
                SeedTime4Calibrate {
                    seed: 0xaabbccdf,
                    datetime: datetime!(2000-11-05 23:56:59).unwrap(),
                    delay: 10800351,
                    coin_flips: coin_flips!("HTTTTHHTHHTHTHHHHTHH"),
                },
                SeedTime4Calibrate {
                    seed: 0xaabbcce0,
                    datetime: datetime!(2000-11-05 23:56:59).unwrap(),
                    delay: 10800352,
                    coin_flips: coin_flips!("HTTHHHTTHTTTHTHHTHTH"),
                },
                SeedTime4Calibrate {
                    seed: 0x70bbccda,
                    datetime: datetime!(2000-11-05 23:57:00).unwrap(),
                    delay: 10800346,
                    coin_flips: coin_flips!("HTHHTTTHHHTTHTTTHTHH"),
                },
                SeedTime4Calibrate {
                    seed: 0x70bbccdb,
                    datetime: datetime!(2000-11-05 23:57:00).unwrap(),
                    delay: 10800347,
                    coin_flips: coin_flips!("HHHTHHTHHTTTHTTHHTTH"),
                },
                SeedTime4Calibrate {
                    seed: 0x70bbccdc,
                    datetime: datetime!(2000-11-05 23:57:00).unwrap(),
                    delay: 10800348,
                    coin_flips: coin_flips!("HTHHTTTHTHTHHHTHTHHH"),
                },
                SeedTime4Calibrate {
                    seed: 0x70bbccdd,
                    datetime: datetime!(2000-11-05 23:57:00).unwrap(),
                    delay: 10800349,
                    coin_flips: coin_flips!("THHHHHHHTTTTTTHHHTTH"),
                },
                SeedTime4Calibrate {
                    seed: 0x70bbccde,
                    datetime: datetime!(2000-11-05 23:57:00).unwrap(),
                    delay: 10800350,
                    coin_flips: coin_flips!("HTTHHTTTHTHTHHHTHTTT"),
                },
                SeedTime4Calibrate {
                    seed: 0x70bbccdf,
                    datetime: datetime!(2000-11-05 23:57:00).unwrap(),
                    delay: 10800351,
                    coin_flips: coin_flips!("THHTTHTHHTHHTTTHHHHH"),
                },
                SeedTime4Calibrate {
                    seed: 0x70bbcce0,
                    datetime: datetime!(2000-11-05 23:57:00).unwrap(),
                    delay: 10800352,
                    coin_flips: coin_flips!("TTTHTTHHTHTTHHHTHTHT"),
                },
            ];

            assert_list_eq!(result, expected);
        }
    }

    mod calculate_times {
        use super::CoinFlip::*;
        use super::*;
        use crate::{assert_list_eq, datetime};

        #[test]
        fn without_forced_second() {
            let opts = SeedTime4Options {
                seed: 0xaabbccdd,
                year: 2032,
                month: Some(2),
                second_range: None,
                delay_range: None,
                find_first: false,
            };
            let coin_flips = coin_flips!("HTHTHHHTHHHHTTTHHTHT");
            let result = dppt_calculate_seedtime(opts);
            let expected = [
                SeedTime4 {
                    seed: 0xaabbccdd,
                    datetime: datetime!(2032-02-26 23:59:59).unwrap(),
                    delay: 10800317,
                    coin_flips: coin_flips.clone(),
                },
                SeedTime4 {
                    seed: 0xaabbccdd,
                    datetime: datetime!(2032-02-27 23:57:59).unwrap(),
                    delay: 10800317,
                    coin_flips: coin_flips.clone(),
                },
                SeedTime4 {
                    seed: 0xaabbccdd,
                    datetime: datetime!(2032-02-27 23:58:58).unwrap(),
                    delay: 10800317,
                    coin_flips: coin_flips.clone(),
                },
                SeedTime4 {
                    seed: 0xaabbccdd,
                    datetime: datetime!(2032-02-27 23:59:57).unwrap(),
                    delay: 10800317,
                    coin_flips: coin_flips.clone(),
                },
                SeedTime4 {
                    seed: 0xaabbccdd,
                    datetime: datetime!(2032-02-28 23:55:59).unwrap(),
                    delay: 10800317,
                    coin_flips: coin_flips.clone(),
                },
                SeedTime4 {
                    seed: 0xaabbccdd,
                    datetime: datetime!(2032-02-28 23:56:58).unwrap(),
                    delay: 10800317,
                    coin_flips: coin_flips.clone(),
                },
                SeedTime4 {
                    seed: 0xaabbccdd,
                    datetime: datetime!(2032-02-28 23:57:57).unwrap(),
                    delay: 10800317,
                    coin_flips: coin_flips.clone(),
                },
                SeedTime4 {
                    seed: 0xaabbccdd,
                    datetime: datetime!(2032-02-28 23:58:56).unwrap(),
                    delay: 10800317,
                    coin_flips: coin_flips.clone(),
                },
                SeedTime4 {
                    seed: 0xaabbccdd,
                    datetime: datetime!(2032-02-28 23:59:55).unwrap(),
                    delay: 10800317,
                    coin_flips: coin_flips.clone(),
                },
                SeedTime4 {
                    seed: 0xaabbccdd,
                    datetime: datetime!(2032-02-29 23:53:59).unwrap(),
                    delay: 10800317,
                    coin_flips: coin_flips.clone(),
                },
                SeedTime4 {
                    seed: 0xaabbccdd,
                    datetime: datetime!(2032-02-29 23:54:58).unwrap(),
                    delay: 10800317,
                    coin_flips: coin_flips.clone(),
                },
                SeedTime4 {
                    seed: 0xaabbccdd,
                    datetime: datetime!(2032-02-29 23:55:57).unwrap(),
                    delay: 10800317,
                    coin_flips: coin_flips.clone(),
                },
                SeedTime4 {
                    seed: 0xaabbccdd,
                    datetime: datetime!(2032-02-29 23:56:56).unwrap(),
                    delay: 10800317,
                    coin_flips: coin_flips.clone(),
                },
                SeedTime4 {
                    seed: 0xaabbccdd,
                    datetime: datetime!(2032-02-29 23:57:55).unwrap(),
                    delay: 10800317,
                    coin_flips: coin_flips.clone(),
                },
                SeedTime4 {
                    seed: 0xaabbccdd,
                    datetime: datetime!(2032-02-29 23:58:54).unwrap(),
                    delay: 10800317,
                    coin_flips: coin_flips.clone(),
                },
                SeedTime4 {
                    seed: 0xaabbccdd,
                    datetime: datetime!(2032-02-29 23:59:53).unwrap(),
                    delay: 10800317,
                    coin_flips: coin_flips.clone(),
                },
            ];

            assert_list_eq!(result, expected);
        }

        #[test]
        fn with_forced_second() {
            let opts = SeedTime4Options {
                seed: 0xaabbccdd,
                year: 2032,
                month: Some(2),
                second_range: Some(56..=56),
                delay_range: None,
                find_first: false,
            };
            let coin_flips = vec![
                Heads, Tails, Heads, Tails, Heads, Heads, Heads, Tails, Heads, Heads, Heads, Heads,
                Tails, Tails, Tails, Heads, Heads, Tails, Heads, Tails,
            ];
            let result = dppt_calculate_seedtime(opts);
            let expected = [
                SeedTime4 {
                    seed: 0xaabbccdd,
                    datetime: datetime!(2032-02-28 23:58:56).unwrap(),
                    delay: 10800317,
                    coin_flips: coin_flips.clone(),
                },
                SeedTime4 {
                    seed: 0xaabbccdd,
                    datetime: datetime!(2032-02-29 23:56:56).unwrap(),
                    delay: 10800317,
                    coin_flips: coin_flips.clone(),
                },
            ];

            assert_list_eq!(result, expected);
        }

        #[test]
        fn find_single_seed_after_first_month() {
            let opts = FindSeedTime4Options {
                seed: 0xDC03025B,
                year: 2000,
                delay_range: 601..=605,
                second_range: None,
            };
            let results = dppt_find_seedtime(opts);
            let expected = SeedTime4 {
                seed: 0xDC03025B,
                datetime: datetime!(2000-4-26 3:57:59).unwrap(),
                delay: 603,
                coin_flips: coin_flips!("HHTTTTTHTHTHHTTTHHTT"),
            };

            assert_eq!(results, Some(expected));
        }
        #[test]
        fn hgss_time() {
            let opts = FindSeedTime4Options {
                seed: 0xad090311,
                year: 2032,
                second_range: None,
                delay_range: 750..=753,
            };
            let roamer = RoamerSet {
                entei: true,
                raikou: true,
                latios: false,
                latias: true,
            };
            let result = hgss_find_seedtime(opts, roamer);
            let expected = Some(HgssSeedTime4 {
                seed: 2903048977,
                datetime: RngDateTime {
                    year: 2032,
                    month: 2,
                    day: 28,
                    hour: 9,
                    minute: 58,
                    second: 59,
                },
                delay: 753,
                roamer: vec![
                    RoamerLocation {
                        roamer: Species::Raikou,
                        location: 42,
                    },
                    RoamerLocation {
                        roamer: Species::Entei,
                        location: 39,
                    },
                    RoamerLocation {
                        roamer: Species::Latias,
                        location: 20,
                    },
                ],
                elm: elm_calls!("KEPKKEKKEPKEEEEKEKEE"),
            });

            assert_eq!(result, expected);
        }
        #[test]
        fn hgss_time_force_second() {
            let opts = FindSeedTime4Options {
                seed: 0x24130c1f,
                year: 2032,
                second_range: Some(30..=31),
                delay_range: 3000..=3080,
            };
            let roamer = RoamerSet {
                entei: true,
                raikou: true,
                latios: false,
                latias: false,
            };
            let result = hgss_find_seedtime(opts, roamer);
            let expected = Some(HgssSeedTime4 {
                seed: 605228063,
                datetime: RngDateTime {
                    year: 2032,
                    month: 1,
                    day: 1,
                    hour: 19,
                    minute: 4,
                    second: 31,
                },
                delay: 3071,
                roamer: vec![
                    RoamerLocation {
                        roamer: Species::Raikou,
                        location: 36,
                    },
                    RoamerLocation {
                        roamer: Species::Entei,
                        location: 36,
                    },
                ],
                elm: elm_calls!("EKKKPKPEPKKPEEEPEKKE"),
            });

            assert_eq!(result, expected);
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
