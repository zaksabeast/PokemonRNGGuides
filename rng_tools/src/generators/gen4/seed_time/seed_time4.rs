use crate::{
    RngDateTime,
    gen4::{calc_ab, calc_seed},
    get_days_in_month,
};
use itertools::iproduct;
use serde::{Deserialize, Serialize};
use std::ops::RangeInclusive;
use tsify::Tsify;
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
    pub delay_range: RangeInclusive<u32>,
    pub limit: usize,
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

    if !opts.delay_range.contains(&delay) {
        return vec![];
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

                        if results.len() >= opts.limit {
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
    pub limit: usize,
    pub year: u32,
    pub month: Option<u32>,
    pub second_range: Option<RangeInclusive<u32>>,
    pub delay_range: RangeInclusive<u32>,
}

impl SeedTime4Options {
    pub fn new(
        seed: u32,
        limit: usize,
        year: u32,
        month: Option<u32>,
        delay_range: RangeInclusive<u32>,
        second: Option<u32>,
    ) -> Self {
        match second {
            Some(second) => Self::new_force_second(seed, limit, year, month, delay_range, second),
            None => Self::new_safe_second(seed, limit, year, month, delay_range),
        }
    }

    pub fn new_safe_second(
        seed: u32,
        limit: usize,
        year: u32,
        month: Option<u32>,
        delay_range: RangeInclusive<u32>,
    ) -> Self {
        Self {
            seed,
            limit,
            year,
            month,
            delay_range,
            second_range: Some(1..=58),
        }
    }

    pub fn new_force_second(
        seed: u32,
        limit: usize,
        year: u32,
        month: Option<u32>,
        delay_range: RangeInclusive<u32>,
        second: u32,
    ) -> Self {
        Self {
            seed,
            limit,
            year,
            month,
            delay_range,
            second_range: Some(second..=second),
        }
    }

    pub fn find_seedtime(&self) -> Option<SeedTime4> {
        calc_seedtime4(self).into_iter().next()
    }
}

#[wasm_bindgen]
pub fn calc_seedtime4(opts: &SeedTime4Options) -> Vec<SeedTime4> {
    let month_range = match opts.month {
        Some(month) if (1..=12).contains(&month) => month..=month,
        _ => 1..=12,
    };

    month_range
        .flat_map(|month| {
            calc_seedtime_for_month(SeedTime4SingleMonthOptions {
                month,
                seed: opts.seed,
                year: opts.year,
                second_range: opts.second_range.clone(),
                delay_range: opts.delay_range.clone(),
                limit: opts.limit,
            })
        })
        .take(opts.limit)
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
                limit: usize::MAX,
                year: 2032,
                month: Some(2),
                second_range: None,
                delay_range: 0..=u32::MAX,
            };
            let result = calc_seedtime4(&opts);
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
                delay_range: 0..=u32::MAX,
                limit: usize::MAX,
            };
            let result = calc_seedtime4(&opts);
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
            let opts = SeedTime4Options {
                seed: 0xDC03025B,
                year: 2000,
                month: None,
                delay_range: 601..=605,
                second_range: None,
                limit: 1,
            };
            let results = opts.find_seedtime();
            let expected = SeedTime4 {
                seed: 0xDC03025B,
                datetime: datetime!(2000-4-26 3:57:59).unwrap(),
                delay: 603,
            };

            assert_eq!(results, Some(expected));
        }

        #[test]
        fn find_seed_in_month() {
            let opts = SeedTime4Options {
                seed: 0xDC03025B,
                year: 2026,
                month: Some(5),
                delay_range: 500..=600,
                second_range: None,
                limit: usize::MAX,
            };
            let results = calc_seedtime4(&opts);
            let expected = [
                datetime!(2026-05-21 03:56:59),
                datetime!(2026-05-21 03:57:58),
                datetime!(2026-05-21 03:58:57),
                datetime!(2026-05-21 03:59:56),
                datetime!(2026-05-22 03:51:59),
                datetime!(2026-05-22 03:52:58),
                datetime!(2026-05-22 03:53:57),
                datetime!(2026-05-22 03:54:56),
                datetime!(2026-05-22 03:55:55),
                datetime!(2026-05-22 03:56:54),
                datetime!(2026-05-22 03:57:53),
                datetime!(2026-05-22 03:58:52),
                datetime!(2026-05-22 03:59:51),
                datetime!(2026-05-23 03:46:59),
                datetime!(2026-05-23 03:47:58),
                datetime!(2026-05-23 03:48:57),
                datetime!(2026-05-23 03:49:56),
                datetime!(2026-05-23 03:50:55),
                datetime!(2026-05-23 03:51:54),
                datetime!(2026-05-23 03:52:53),
                datetime!(2026-05-23 03:53:52),
                datetime!(2026-05-23 03:54:51),
                datetime!(2026-05-23 03:55:50),
                datetime!(2026-05-23 03:56:49),
                datetime!(2026-05-23 03:57:48),
                datetime!(2026-05-23 03:58:47),
                datetime!(2026-05-23 03:59:46),
                datetime!(2026-05-24 03:41:59),
                datetime!(2026-05-24 03:42:58),
                datetime!(2026-05-24 03:43:57),
                datetime!(2026-05-24 03:44:56),
                datetime!(2026-05-24 03:45:55),
                datetime!(2026-05-24 03:46:54),
                datetime!(2026-05-24 03:47:53),
                datetime!(2026-05-24 03:48:52),
                datetime!(2026-05-24 03:49:51),
                datetime!(2026-05-24 03:50:50),
                datetime!(2026-05-24 03:51:49),
                datetime!(2026-05-24 03:52:48),
                datetime!(2026-05-24 03:53:47),
                datetime!(2026-05-24 03:54:46),
                datetime!(2026-05-24 03:55:45),
                datetime!(2026-05-24 03:56:44),
                datetime!(2026-05-24 03:57:43),
                datetime!(2026-05-24 03:58:42),
                datetime!(2026-05-24 03:59:41),
                datetime!(2026-05-25 03:36:59),
                datetime!(2026-05-25 03:37:58),
                datetime!(2026-05-25 03:38:57),
                datetime!(2026-05-25 03:39:56),
                datetime!(2026-05-25 03:40:55),
                datetime!(2026-05-25 03:41:54),
                datetime!(2026-05-25 03:42:53),
                datetime!(2026-05-25 03:43:52),
                datetime!(2026-05-25 03:44:51),
                datetime!(2026-05-25 03:45:50),
                datetime!(2026-05-25 03:46:49),
                datetime!(2026-05-25 03:47:48),
                datetime!(2026-05-25 03:48:47),
                datetime!(2026-05-25 03:49:46),
                datetime!(2026-05-25 03:50:45),
                datetime!(2026-05-25 03:51:44),
                datetime!(2026-05-25 03:52:43),
                datetime!(2026-05-25 03:53:42),
                datetime!(2026-05-25 03:54:41),
                datetime!(2026-05-25 03:55:40),
                datetime!(2026-05-25 03:56:39),
                datetime!(2026-05-25 03:57:38),
                datetime!(2026-05-25 03:58:37),
                datetime!(2026-05-25 03:59:36),
                datetime!(2026-05-26 03:31:59),
                datetime!(2026-05-26 03:32:58),
                datetime!(2026-05-26 03:33:57),
                datetime!(2026-05-26 03:34:56),
                datetime!(2026-05-26 03:35:55),
                datetime!(2026-05-26 03:36:54),
                datetime!(2026-05-26 03:37:53),
                datetime!(2026-05-26 03:38:52),
                datetime!(2026-05-26 03:39:51),
                datetime!(2026-05-26 03:40:50),
                datetime!(2026-05-26 03:41:49),
                datetime!(2026-05-26 03:42:48),
                datetime!(2026-05-26 03:43:47),
                datetime!(2026-05-26 03:44:46),
                datetime!(2026-05-26 03:45:45),
                datetime!(2026-05-26 03:46:44),
                datetime!(2026-05-26 03:47:43),
                datetime!(2026-05-26 03:48:42),
                datetime!(2026-05-26 03:49:41),
                datetime!(2026-05-26 03:50:40),
                datetime!(2026-05-26 03:51:39),
                datetime!(2026-05-26 03:52:38),
                datetime!(2026-05-26 03:53:37),
                datetime!(2026-05-26 03:54:36),
                datetime!(2026-05-26 03:55:35),
                datetime!(2026-05-26 03:56:34),
                datetime!(2026-05-26 03:57:33),
                datetime!(2026-05-26 03:58:32),
                datetime!(2026-05-26 03:59:31),
                datetime!(2026-05-27 03:26:59),
                datetime!(2026-05-27 03:27:58),
                datetime!(2026-05-27 03:28:57),
                datetime!(2026-05-27 03:29:56),
                datetime!(2026-05-27 03:30:55),
                datetime!(2026-05-27 03:31:54),
                datetime!(2026-05-27 03:32:53),
                datetime!(2026-05-27 03:33:52),
                datetime!(2026-05-27 03:34:51),
                datetime!(2026-05-27 03:35:50),
                datetime!(2026-05-27 03:36:49),
                datetime!(2026-05-27 03:37:48),
                datetime!(2026-05-27 03:38:47),
                datetime!(2026-05-27 03:39:46),
                datetime!(2026-05-27 03:40:45),
                datetime!(2026-05-27 03:41:44),
                datetime!(2026-05-27 03:42:43),
                datetime!(2026-05-27 03:43:42),
                datetime!(2026-05-27 03:44:41),
                datetime!(2026-05-27 03:45:40),
                datetime!(2026-05-27 03:46:39),
                datetime!(2026-05-27 03:47:38),
                datetime!(2026-05-27 03:48:37),
                datetime!(2026-05-27 03:49:36),
                datetime!(2026-05-27 03:50:35),
                datetime!(2026-05-27 03:51:34),
                datetime!(2026-05-27 03:52:33),
                datetime!(2026-05-27 03:53:32),
                datetime!(2026-05-27 03:54:31),
                datetime!(2026-05-27 03:55:30),
                datetime!(2026-05-27 03:56:29),
                datetime!(2026-05-27 03:57:28),
                datetime!(2026-05-27 03:58:27),
                datetime!(2026-05-27 03:59:26),
                datetime!(2026-05-28 03:21:59),
                datetime!(2026-05-28 03:22:58),
                datetime!(2026-05-28 03:23:57),
                datetime!(2026-05-28 03:24:56),
                datetime!(2026-05-28 03:25:55),
                datetime!(2026-05-28 03:26:54),
                datetime!(2026-05-28 03:27:53),
                datetime!(2026-05-28 03:28:52),
                datetime!(2026-05-28 03:29:51),
                datetime!(2026-05-28 03:30:50),
                datetime!(2026-05-28 03:31:49),
                datetime!(2026-05-28 03:32:48),
                datetime!(2026-05-28 03:33:47),
                datetime!(2026-05-28 03:34:46),
                datetime!(2026-05-28 03:35:45),
                datetime!(2026-05-28 03:36:44),
                datetime!(2026-05-28 03:37:43),
                datetime!(2026-05-28 03:38:42),
                datetime!(2026-05-28 03:39:41),
                datetime!(2026-05-28 03:40:40),
                datetime!(2026-05-28 03:41:39),
                datetime!(2026-05-28 03:42:38),
                datetime!(2026-05-28 03:43:37),
                datetime!(2026-05-28 03:44:36),
                datetime!(2026-05-28 03:45:35),
                datetime!(2026-05-28 03:46:34),
                datetime!(2026-05-28 03:47:33),
                datetime!(2026-05-28 03:48:32),
                datetime!(2026-05-28 03:49:31),
                datetime!(2026-05-28 03:50:30),
                datetime!(2026-05-28 03:51:29),
                datetime!(2026-05-28 03:52:28),
                datetime!(2026-05-28 03:53:27),
                datetime!(2026-05-28 03:54:26),
                datetime!(2026-05-28 03:55:25),
                datetime!(2026-05-28 03:56:24),
                datetime!(2026-05-28 03:57:23),
                datetime!(2026-05-28 03:58:22),
                datetime!(2026-05-28 03:59:21),
                datetime!(2026-05-29 03:16:59),
                datetime!(2026-05-29 03:17:58),
                datetime!(2026-05-29 03:18:57),
                datetime!(2026-05-29 03:19:56),
                datetime!(2026-05-29 03:20:55),
                datetime!(2026-05-29 03:21:54),
                datetime!(2026-05-29 03:22:53),
                datetime!(2026-05-29 03:23:52),
                datetime!(2026-05-29 03:24:51),
                datetime!(2026-05-29 03:25:50),
                datetime!(2026-05-29 03:26:49),
                datetime!(2026-05-29 03:27:48),
                datetime!(2026-05-29 03:28:47),
                datetime!(2026-05-29 03:29:46),
                datetime!(2026-05-29 03:30:45),
                datetime!(2026-05-29 03:31:44),
                datetime!(2026-05-29 03:32:43),
                datetime!(2026-05-29 03:33:42),
                datetime!(2026-05-29 03:34:41),
                datetime!(2026-05-29 03:35:40),
                datetime!(2026-05-29 03:36:39),
                datetime!(2026-05-29 03:37:38),
                datetime!(2026-05-29 03:38:37),
                datetime!(2026-05-29 03:39:36),
                datetime!(2026-05-29 03:40:35),
                datetime!(2026-05-29 03:41:34),
                datetime!(2026-05-29 03:42:33),
                datetime!(2026-05-29 03:43:32),
                datetime!(2026-05-29 03:44:31),
                datetime!(2026-05-29 03:45:30),
                datetime!(2026-05-29 03:46:29),
                datetime!(2026-05-29 03:47:28),
                datetime!(2026-05-29 03:48:27),
                datetime!(2026-05-29 03:49:26),
                datetime!(2026-05-29 03:50:25),
                datetime!(2026-05-29 03:51:24),
                datetime!(2026-05-29 03:52:23),
                datetime!(2026-05-29 03:53:22),
                datetime!(2026-05-29 03:54:21),
                datetime!(2026-05-29 03:55:20),
                datetime!(2026-05-29 03:56:19),
                datetime!(2026-05-29 03:57:18),
                datetime!(2026-05-29 03:58:17),
                datetime!(2026-05-29 03:59:16),
                datetime!(2026-05-30 03:11:59),
                datetime!(2026-05-30 03:12:58),
                datetime!(2026-05-30 03:13:57),
                datetime!(2026-05-30 03:14:56),
                datetime!(2026-05-30 03:15:55),
                datetime!(2026-05-30 03:16:54),
                datetime!(2026-05-30 03:17:53),
                datetime!(2026-05-30 03:18:52),
                datetime!(2026-05-30 03:19:51),
                datetime!(2026-05-30 03:20:50),
                datetime!(2026-05-30 03:21:49),
                datetime!(2026-05-30 03:22:48),
                datetime!(2026-05-30 03:23:47),
                datetime!(2026-05-30 03:24:46),
                datetime!(2026-05-30 03:25:45),
                datetime!(2026-05-30 03:26:44),
                datetime!(2026-05-30 03:27:43),
                datetime!(2026-05-30 03:28:42),
                datetime!(2026-05-30 03:29:41),
                datetime!(2026-05-30 03:30:40),
                datetime!(2026-05-30 03:31:39),
                datetime!(2026-05-30 03:32:38),
                datetime!(2026-05-30 03:33:37),
                datetime!(2026-05-30 03:34:36),
                datetime!(2026-05-30 03:35:35),
                datetime!(2026-05-30 03:36:34),
                datetime!(2026-05-30 03:37:33),
                datetime!(2026-05-30 03:38:32),
                datetime!(2026-05-30 03:39:31),
                datetime!(2026-05-30 03:40:30),
                datetime!(2026-05-30 03:41:29),
                datetime!(2026-05-30 03:42:28),
                datetime!(2026-05-30 03:43:27),
                datetime!(2026-05-30 03:44:26),
                datetime!(2026-05-30 03:45:25),
                datetime!(2026-05-30 03:46:24),
                datetime!(2026-05-30 03:47:23),
                datetime!(2026-05-30 03:48:22),
                datetime!(2026-05-30 03:49:21),
                datetime!(2026-05-30 03:50:20),
                datetime!(2026-05-30 03:51:19),
                datetime!(2026-05-30 03:52:18),
                datetime!(2026-05-30 03:53:17),
                datetime!(2026-05-30 03:54:16),
                datetime!(2026-05-30 03:55:15),
                datetime!(2026-05-30 03:56:14),
                datetime!(2026-05-30 03:57:13),
                datetime!(2026-05-30 03:58:12),
                datetime!(2026-05-30 03:59:11),
                datetime!(2026-05-31 03:06:59),
                datetime!(2026-05-31 03:07:58),
                datetime!(2026-05-31 03:08:57),
                datetime!(2026-05-31 03:09:56),
                datetime!(2026-05-31 03:10:55),
                datetime!(2026-05-31 03:11:54),
                datetime!(2026-05-31 03:12:53),
                datetime!(2026-05-31 03:13:52),
                datetime!(2026-05-31 03:14:51),
                datetime!(2026-05-31 03:15:50),
                datetime!(2026-05-31 03:16:49),
                datetime!(2026-05-31 03:17:48),
                datetime!(2026-05-31 03:18:47),
                datetime!(2026-05-31 03:19:46),
                datetime!(2026-05-31 03:20:45),
                datetime!(2026-05-31 03:21:44),
                datetime!(2026-05-31 03:22:43),
                datetime!(2026-05-31 03:23:42),
                datetime!(2026-05-31 03:24:41),
                datetime!(2026-05-31 03:25:40),
                datetime!(2026-05-31 03:26:39),
                datetime!(2026-05-31 03:27:38),
                datetime!(2026-05-31 03:28:37),
                datetime!(2026-05-31 03:29:36),
                datetime!(2026-05-31 03:30:35),
                datetime!(2026-05-31 03:31:34),
                datetime!(2026-05-31 03:32:33),
                datetime!(2026-05-31 03:33:32),
                datetime!(2026-05-31 03:34:31),
                datetime!(2026-05-31 03:35:30),
                datetime!(2026-05-31 03:36:29),
                datetime!(2026-05-31 03:37:28),
                datetime!(2026-05-31 03:38:27),
                datetime!(2026-05-31 03:39:26),
                datetime!(2026-05-31 03:40:25),
                datetime!(2026-05-31 03:41:24),
                datetime!(2026-05-31 03:42:23),
                datetime!(2026-05-31 03:43:22),
                datetime!(2026-05-31 03:44:21),
                datetime!(2026-05-31 03:45:20),
                datetime!(2026-05-31 03:46:19),
                datetime!(2026-05-31 03:47:18),
                datetime!(2026-05-31 03:48:17),
                datetime!(2026-05-31 03:49:16),
                datetime!(2026-05-31 03:50:15),
                datetime!(2026-05-31 03:51:14),
                datetime!(2026-05-31 03:52:13),
                datetime!(2026-05-31 03:53:12),
                datetime!(2026-05-31 03:54:11),
                datetime!(2026-05-31 03:55:10),
                datetime!(2026-05-31 03:56:09),
                datetime!(2026-05-31 03:57:08),
                datetime!(2026-05-31 03:58:07),
                datetime!(2026-05-31 03:59:06),
            ]
            .into_iter()
            .map(|dt| SeedTime4 {
                seed: 0xDC03025B,
                datetime: dt.unwrap(),
                delay: 577,
            })
            .collect::<Vec<_>>();

            assert_list_eq!(results, expected);
        }
    }
}
