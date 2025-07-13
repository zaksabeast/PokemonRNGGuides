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

#[derive(Debug, Clone, Copy, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub enum CoinFlip {
    Heads,
    Tails,
}

#[derive(Debug, Clone, PartialEq, Tsify, Serialize, Deserialize, Copy)]
pub enum ElmCall {
    E,
    K,
    P,
}

#[derive(Debug, Clone, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct SeedTime4 {
    pub seed: u32,
    pub datetime: RngDateTime,
    pub delay: u32,
}

impl SeedTime4 {
    pub fn new(seed: u32, datetime: RngDateTime, delay: u32) -> Self {
        Self {
            seed,
            datetime,
            delay,
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

#[derive(Debug, Clone, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct HgssSeedTime4Options {
    pub seed: u32,
    pub year: u32,
    pub month: Option<u32>,
    pub second_range: Option<RangeInclusive<u32>>,
    pub delay_range: Option<RangeInclusive<u32>>,
    pub find_first: bool,
    pub roamer: RoamerSet,
}

#[derive(Debug, Clone, PartialEq, Tsify, Serialize, Deserialize)]
pub struct HgssSeedTime4 {
    pub seed: u32,
    pub datetime: RngDateTime,
    pub delay: u32,
    pub roamer: Vec<RoamerLocation>,
    pub elm: Vec<ElmCall>,
}

#[derive(Debug, Clone, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct DpptSeedTime4 {
    pub seed: u32,
    pub datetime: RngDateTime,
    pub delay: u32,
    pub coin_flips: Vec<CoinFlip>,
}

impl DpptSeedTime4 {
    pub fn new(seed: u32, datetime: RngDateTime, delay: u32) -> Self {
        Self {
            seed,
            datetime,
            delay,
            coin_flips: coin_flips(seed),
        }
    }
}

#[macro_export]
macro_rules! convert_seedtime {
    ($input:expr, $target:ident, { $($extra_field:ident : $value:expr),* $(,)? }) => {
        $target {
            seed: $input.seed,
            delay: $input.delay,
            datetime: $input.datetime.clone(),
            $($extra_field: $value),*
        }
    };
}

#[macro_export]
macro_rules! build_seedtime_opts {
    ($find_opts:expr) => {
        SeedTime4Options {
            seed: $find_opts.seed,
            year: $find_opts.year,
            month: None,
            second_range: $find_opts.second_range.clone(),
            delay_range: Some($find_opts.delay_range.clone()),
            find_first: true,
        }
    };
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

#[macro_export]
macro_rules! calculate_seedtime {
    (from_optional_month: $opts:expr, $target:ident,{ $($extra_field:ident : $value:expr),*$(,)? }) => {{
        let opts = $opts;
        let month = match opts.month {
            Some(m) => m,
            None => return vec![],
        };
        calculate_seedtime!(core: opts, month, $target,{
                                    $($extra_field: $value),*
                                } )
    }};

    // Form 2: Given plain u32 month and opts
    (core: $opts:expr, $month:expr,$target:ident, { $($extra_field:ident : $value:expr),*$(,)? }) => {{
        let opts = $opts;
        'macro_scope: {
            let year = opts.year.clamp(2000, 2100);
            let month = $month.clamp(1, 12);
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
                    break 'macro_scope vec![];
                }
            }

            let mut results = vec![];

            let second_range = opts.second_range.unwrap_or(0..=59);

            let max_days = get_days_in_month(year as i32, month);
            for day in 1..=max_days {
                for minute in 0..60 {
                    for second in second_range.clone() {
                        if ab == calc_ab(month, day, minute, second) & 0xff {
                            if let Some(datetime) =
                                RngDateTime::new(year, month, day, hour, minute, second)
                            {
                            let seedtime = SeedTime4 {
                                seed: opts.seed,
                                delay,
                                datetime,
                            };
                            let result = convert_seedtime!(
                                seedtime,
                                $target,
                                {
                                    $($extra_field: $value),*
                                }
                            );
                            results.push(result);

                                if opts.find_first {
                                    break 'macro_scope results;
                                }
                            }
                        }
                    }
                }
            }
            results
        }
    }};
}

//Function path way is dppt_find_seedtime -> dppt_calculate_seedtime ->dppt_calculate_single_month_seedtime. hgaa does not have find_seedtime first step, but is the same.

pub fn dppt_find_seedtime(opts: FindSeedTime4Options) -> Option<DpptSeedTime4> {
    let opts = build_seedtime_opts!(opts);
    dppt_calculate_seedtime(opts).into_iter().next()
}

#[wasm_bindgen]
pub fn dppt_calculate_seedtime(opts: SeedTime4Options) -> Vec<DpptSeedTime4> {
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

fn dppt_calculate_single_month_seedtime(opts: SeedTime4SingleMonthOptions) -> Vec<DpptSeedTime4> {
    let seed = opts.seed;
    let month = opts.month;
    let mut coin_flips_res: Option<Vec<CoinFlip>> = None;
    let mut lazy_coin_flip = || match coin_flips_res {
        Some(ref flips) => flips.clone(),
        None => {
            let new_flips = coin_flips(seed);
            coin_flips_res = Some(new_flips.clone());
            new_flips
        }
    };
    calculate_seedtime!(core:opts, month, DpptSeedTime4, {
            coin_flips: lazy_coin_flip(),
    })
}

pub fn hgss_calculate_seedtime(opts: HgssSeedTime4Options) -> Vec<HgssSeedTime4> {
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
            hgss_calculate_single_month_seedtime(HgssSeedTime4Options {
                month: Some(month),
                seed: opts.seed,
                year: opts.year,
                second_range: opts.second_range.clone(),
                delay_range: opts.delay_range.clone(),
                find_first: opts.find_first,
                roamer: opts.roamer,
            })
        })
        .take(limit)
        .collect()
}

fn hgss_calculate_single_month_seedtime(opts: HgssSeedTime4Options) -> Vec<HgssSeedTime4> {
    let seed = opts.seed;
    let mut elm_calls_res: Option<Vec<ElmCall>> = None;

    let mut lazy_elm_calls = || match elm_calls_res {
        Some(ref calls) => calls.clone(),
        None => {
            let new_calls = get_elm_calls(seed);
            elm_calls_res = Some(new_calls.clone());
            new_calls
        }
    };
    let roamer = roamer_check(opts.seed, opts.roamer);
    calculate_seedtime!(from_optional_month:opts, HgssSeedTime4, {

        roamer: roamer.clone(),
        elm: lazy_elm_calls(),
    })
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

#[wasm_bindgen]
pub fn dppt_calibrate_seedtime(
    seedtime: DpptSeedTime4,
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

fn get_route_j(rand: u16) -> u16 {
    let roamer_rand = rand & 15;

    if roamer_rand < 11 {
        roamer_rand + 29
    } else {
        roamer_rand + 31
    }
}

fn get_route_k(rand: u16) -> u16 {
    let roamer_rand = rand % 25;

    if roamer_rand > 21 {
        if roamer_rand == 22 {
            24
        } else if roamer_rand == 23 {
            26
        } else {
            28
        }
    } else {
        roamer_rand + 1
    }
}

fn roamer_check(seed: u32, roamer_opts: RoamerSet) -> Vec<RoamerLocation> {
    let mut rng = Pokerng::new(seed);
    let mut results = Vec::new();

    if roamer_opts.raikou {
        let mut roamer = RoamerLocation::new(Species::Raikou);
        roamer.location = get_route_j(rng.rand::<u16>());
        results.push(roamer)
    }
    if roamer_opts.entei {
        let mut roamer = RoamerLocation::new(Species::Entei);
        roamer.location = get_route_j(rng.rand::<u16>());
        results.push(roamer)
    }
    if roamer_opts.latios {
        let mut roamer = RoamerLocation::new(Species::Latios);
        roamer.location = get_route_k(rng.rand::<u16>());
        results.push(roamer)
    }
    if roamer_opts.latias {
        let mut roamer = RoamerLocation::new(Species::Latias);
        roamer.location = get_route_k(rng.rand::<u16>());
        results.push(roamer)
    }
    results
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

#[cfg(test)]
mod test {
    use super::*;

    mod calibrate {
        use super::*;
        use crate::{assert_list_eq, datetime};

        #[test]
        fn set1() {
            let seedtime = DpptSeedTime4 {
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
                DpptSeedTime4 {
                    seed: 0xaabbccdd,
                    datetime: datetime!(2032-02-26 23:59:59).unwrap(),
                    delay: 10800317,
                    coin_flips: coin_flips.clone(),
                },
                DpptSeedTime4 {
                    seed: 0xaabbccdd,
                    datetime: datetime!(2032-02-27 23:57:59).unwrap(),
                    delay: 10800317,
                    coin_flips: coin_flips.clone(),
                },
                DpptSeedTime4 {
                    seed: 0xaabbccdd,
                    datetime: datetime!(2032-02-27 23:58:58).unwrap(),
                    delay: 10800317,
                    coin_flips: coin_flips.clone(),
                },
                DpptSeedTime4 {
                    seed: 0xaabbccdd,
                    datetime: datetime!(2032-02-27 23:59:57).unwrap(),
                    delay: 10800317,
                    coin_flips: coin_flips.clone(),
                },
                DpptSeedTime4 {
                    seed: 0xaabbccdd,
                    datetime: datetime!(2032-02-28 23:55:59).unwrap(),
                    delay: 10800317,
                    coin_flips: coin_flips.clone(),
                },
                DpptSeedTime4 {
                    seed: 0xaabbccdd,
                    datetime: datetime!(2032-02-28 23:56:58).unwrap(),
                    delay: 10800317,
                    coin_flips: coin_flips.clone(),
                },
                DpptSeedTime4 {
                    seed: 0xaabbccdd,
                    datetime: datetime!(2032-02-28 23:57:57).unwrap(),
                    delay: 10800317,
                    coin_flips: coin_flips.clone(),
                },
                DpptSeedTime4 {
                    seed: 0xaabbccdd,
                    datetime: datetime!(2032-02-28 23:58:56).unwrap(),
                    delay: 10800317,
                    coin_flips: coin_flips.clone(),
                },
                DpptSeedTime4 {
                    seed: 0xaabbccdd,
                    datetime: datetime!(2032-02-28 23:59:55).unwrap(),
                    delay: 10800317,
                    coin_flips: coin_flips.clone(),
                },
                DpptSeedTime4 {
                    seed: 0xaabbccdd,
                    datetime: datetime!(2032-02-29 23:53:59).unwrap(),
                    delay: 10800317,
                    coin_flips: coin_flips.clone(),
                },
                DpptSeedTime4 {
                    seed: 0xaabbccdd,
                    datetime: datetime!(2032-02-29 23:54:58).unwrap(),
                    delay: 10800317,
                    coin_flips: coin_flips.clone(),
                },
                DpptSeedTime4 {
                    seed: 0xaabbccdd,
                    datetime: datetime!(2032-02-29 23:55:57).unwrap(),
                    delay: 10800317,
                    coin_flips: coin_flips.clone(),
                },
                DpptSeedTime4 {
                    seed: 0xaabbccdd,
                    datetime: datetime!(2032-02-29 23:56:56).unwrap(),
                    delay: 10800317,
                    coin_flips: coin_flips.clone(),
                },
                DpptSeedTime4 {
                    seed: 0xaabbccdd,
                    datetime: datetime!(2032-02-29 23:57:55).unwrap(),
                    delay: 10800317,
                    coin_flips: coin_flips.clone(),
                },
                DpptSeedTime4 {
                    seed: 0xaabbccdd,
                    datetime: datetime!(2032-02-29 23:58:54).unwrap(),
                    delay: 10800317,
                    coin_flips: coin_flips.clone(),
                },
                DpptSeedTime4 {
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
                DpptSeedTime4 {
                    seed: 0xaabbccdd,
                    datetime: datetime!(2032-02-28 23:58:56).unwrap(),
                    delay: 10800317,
                    coin_flips: coin_flips.clone(),
                },
                DpptSeedTime4 {
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
            let expected = DpptSeedTime4 {
                seed: 0xDC03025B,
                datetime: datetime!(2000-4-26 3:57:59).unwrap(),
                delay: 603,
                coin_flips: coin_flips!("HHTTTTTHTHTHHTTTHHTT"),
            };

            assert_eq!(results, Some(expected));
        }
        #[test]
        fn hgss_multi_result() {
            let opts = HgssSeedTime4Options {
                seed: 0xDC03025B,
                year: 2025,
                month: Some(4),
                second_range: Some(59..=59),
                delay_range: Some(500..=650),
                find_first: false,
                roamer: RoamerSet {
                    entei: true,
                    raikou: true,
                    latios: false,
                    latias: false,
                },
            };
            let result = hgss_calculate_seedtime(opts);
            let expected = [
                HgssSeedTime4 {
                    seed: 0xDC03025B,
                    datetime: datetime!(2025-4-26 3:57:59).unwrap(),
                    delay: 578,
                    roamer: vec![
                        RoamerLocation {
                            roamer: Species::Raikou,
                            location: 31,
                        },
                        RoamerLocation {
                            roamer: Species::Entei,
                            location: 42,
                        },
                    ],
                    elm: elm_calls!("EKEPPKKEPEPPPKPPEEEP"),
                },
                HgssSeedTime4 {
                    seed: 0xDC03025B,
                    datetime: datetime!(2025-4-27 3:53:59).unwrap(),
                    delay: 578,
                    roamer: vec![
                        RoamerLocation {
                            roamer: Species::Raikou,
                            location: 31,
                        },
                        RoamerLocation {
                            roamer: Species::Entei,
                            location: 42,
                        },
                    ],
                    elm: elm_calls!("EKEPPKKEPEPPPKPPEEEP"),
                },
                HgssSeedTime4 {
                    seed: 0xDC03025B,
                    datetime: datetime!(2025-4-28 3:49:59).unwrap(),
                    delay: 578,
                    roamer: vec![
                        RoamerLocation {
                            roamer: Species::Raikou,
                            location: 31,
                        },
                        RoamerLocation {
                            roamer: Species::Entei,
                            location: 42,
                        },
                    ],
                    elm: elm_calls!("EKEPPKKEPEPPPKPPEEEP"),
                },
                HgssSeedTime4 {
                    seed: 0xDC03025B,
                    datetime: datetime!(2025-4-29 3:45:59).unwrap(),
                    delay: 578,
                    roamer: vec![
                        RoamerLocation {
                            roamer: Species::Raikou,
                            location: 31,
                        },
                        RoamerLocation {
                            roamer: Species::Entei,
                            location: 42,
                        },
                    ],
                    elm: elm_calls!("EKEPPKKEPEPPPKPPEEEP"),
                },
                HgssSeedTime4 {
                    seed: 0xDC03025B,
                    datetime: datetime!(2025-4-30 3:41:59).unwrap(),
                    delay: 578,
                    roamer: vec![
                        RoamerLocation {
                            roamer: Species::Raikou,
                            location: 31,
                        },
                        RoamerLocation {
                            roamer: Species::Entei,
                            location: 42,
                        },
                    ],
                    elm: elm_calls!("EKEPPKKEPEPPPKPPEEEP"),
                },
            ];

            assert_eq!(result, expected);
        }
        #[test]
        fn hgss_1result() {
            let opts = HgssSeedTime4Options {
                seed: 0xDC03025B,
                year: 2025,
                month: Some(4),
                second_range: Some(1..=59),
                delay_range: Some(500..=650),
                find_first: true,
                roamer: RoamerSet {
                    entei: true,
                    raikou: true,
                    latios: false,
                    latias: false,
                },
            };
            let result = hgss_calculate_seedtime(opts);
            let expected = [HgssSeedTime4 {
                seed: 0xDC03025B,
                datetime: datetime!(2025-4-26 3:57:59).unwrap(),
                delay: 578,
                roamer: vec![
                    RoamerLocation {
                        roamer: Species::Raikou,
                        location: 31,
                    },
                    RoamerLocation {
                        roamer: Species::Entei,
                        location: 42,
                    },
                ],
                elm: elm_calls!("EKEPPKKEPEPPPKPPEEEP"),
            }];

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
