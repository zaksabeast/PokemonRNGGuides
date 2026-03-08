use crate::{
    RngDateTime,
    gen4::{calc_ab, calc_seed},
    get_days_in_month,
};
use itertools::iproduct;
use serde::{Deserialize, Serialize};
use std::ops::RangeInclusive;
use tsify_next::Tsify;
use wasm_bindgen::prelude::*;

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

fn calc_seedtime_for_month(opts: SeedTime4SingleMonthOptions) -> Vec<SeedTime4> {
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
pub struct SeedTime4Options {
    pub seed: u32,
    pub year: u32,
    pub month: Option<u32>,
    pub second_range: Option<RangeInclusive<u32>>,
    pub delay_range: Option<RangeInclusive<u32>>,
    pub find_first: bool,
}

pub fn find_seedtime(opts: FindSeedTime4Options) -> Option<SeedTime4> {
    let opts = SeedTime4Options {
        seed: opts.seed,
        year: opts.year,
        month: None,
        second_range: opts.second_range.clone(),
        delay_range: Some(opts.delay_range.clone()),
        find_first: true,
    };
    calc_seedtime4(opts).into_iter().next()
}

#[wasm_bindgen]
pub fn calc_seedtime4(opts: SeedTime4Options) -> Vec<SeedTime4> {
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
            calc_seedtime_for_month(SeedTime4SingleMonthOptions {
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

#[derive(Debug, Default, Clone, PartialEq, Eq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct Seed4CalcOpts {
    pub datetime: RngDateTime,
    pub seconds_increment: usize,
    pub min_delay: u32,
    pub max_delay: u32,
}

#[wasm_bindgen]
pub fn calc_gen4_seeds(opts: Seed4CalcOpts) -> Vec<SeedTime4> {
    let Seed4CalcOpts {
        mut datetime,
        seconds_increment,
        min_delay,
        max_delay,
    } = opts;
    let datetime_iter = datetime
        .as_seconds_iterator()
        .take(seconds_increment.saturating_add(1));
    iproduct!(datetime_iter, min_delay..=max_delay)
        .map(|(datetime, delay)| {
            let seed = calc_seed(&datetime, delay);
            SeedTime4::new(seed, datetime.clone(), delay)
        })
        .collect()
}

#[cfg(test)]
mod tests {
    use super::*;

    mod calc_seedtime4 {
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
            let result = calc_seedtime4(opts);
            let expected = [
                SeedTime4 {
                    seed: 0xaabbccdd,
                    datetime: datetime!(2032-02-26 23:59:59).unwrap(),
                    delay: 10800317,
                },
                SeedTime4 {
                    seed: 0xaabbccdd,
                    datetime: datetime!(2032-02-27 23:57:59).unwrap(),
                    delay: 10800317,
                },
                SeedTime4 {
                    seed: 0xaabbccdd,
                    datetime: datetime!(2032-02-27 23:58:58).unwrap(),
                    delay: 10800317,
                },
                SeedTime4 {
                    seed: 0xaabbccdd,
                    datetime: datetime!(2032-02-27 23:59:57).unwrap(),
                    delay: 10800317,
                },
                SeedTime4 {
                    seed: 0xaabbccdd,
                    datetime: datetime!(2032-02-28 23:55:59).unwrap(),
                    delay: 10800317,
                },
                SeedTime4 {
                    seed: 0xaabbccdd,
                    datetime: datetime!(2032-02-28 23:56:58).unwrap(),
                    delay: 10800317,
                },
                SeedTime4 {
                    seed: 0xaabbccdd,
                    datetime: datetime!(2032-02-28 23:57:57).unwrap(),
                    delay: 10800317,
                },
                SeedTime4 {
                    seed: 0xaabbccdd,
                    datetime: datetime!(2032-02-28 23:58:56).unwrap(),
                    delay: 10800317,
                },
                SeedTime4 {
                    seed: 0xaabbccdd,
                    datetime: datetime!(2032-02-28 23:59:55).unwrap(),
                    delay: 10800317,
                },
                SeedTime4 {
                    seed: 0xaabbccdd,
                    datetime: datetime!(2032-02-29 23:53:59).unwrap(),
                    delay: 10800317,
                },
                SeedTime4 {
                    seed: 0xaabbccdd,
                    datetime: datetime!(2032-02-29 23:54:58).unwrap(),
                    delay: 10800317,
                },
                SeedTime4 {
                    seed: 0xaabbccdd,
                    datetime: datetime!(2032-02-29 23:55:57).unwrap(),
                    delay: 10800317,
                },
                SeedTime4 {
                    seed: 0xaabbccdd,
                    datetime: datetime!(2032-02-29 23:56:56).unwrap(),
                    delay: 10800317,
                },
                SeedTime4 {
                    seed: 0xaabbccdd,
                    datetime: datetime!(2032-02-29 23:57:55).unwrap(),
                    delay: 10800317,
                },
                SeedTime4 {
                    seed: 0xaabbccdd,
                    datetime: datetime!(2032-02-29 23:58:54).unwrap(),
                    delay: 10800317,
                },
                SeedTime4 {
                    seed: 0xaabbccdd,
                    datetime: datetime!(2032-02-29 23:59:53).unwrap(),
                    delay: 10800317,
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
            let result = calc_seedtime4(opts);
            let expected = [
                SeedTime4 {
                    seed: 0xaabbccdd,
                    datetime: datetime!(2032-02-28 23:58:56).unwrap(),
                    delay: 10800317,
                },
                SeedTime4 {
                    seed: 0xaabbccdd,
                    datetime: datetime!(2032-02-29 23:56:56).unwrap(),
                    delay: 10800317,
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
            let results = find_seedtime(opts);
            let expected = SeedTime4 {
                seed: 0xDC03025B,
                datetime: datetime!(2000-4-26 3:57:59).unwrap(),
                delay: 603,
            };

            assert_eq!(results, Some(expected));
        }
    }
}
