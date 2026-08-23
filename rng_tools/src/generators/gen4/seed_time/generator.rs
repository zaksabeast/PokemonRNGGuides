use super::ab::{AbParts, build_seedtime4_ab_lookup};
use super::seed_time4::SeedTime4;
use super::utils::{calc_delay_from_seed, seedtime4_search_second_range};
use crate::RngDateTime;
use itertools::iproduct;
use serde::{Deserialize, Serialize};
use std::ops::RangeInclusive;
use tsify::Tsify;
use wasm_bindgen::prelude::*;

/// Calculates a gen 4 seed from a given datetime and delay.
pub fn calc_seed(datetime: &RngDateTime, delay: u32) -> u32 {
    let year = datetime.year;
    let month = datetime.month;
    let day = datetime.day;
    let hour = datetime.hour;
    let minute = datetime.minute;
    let second = datetime.second;

    let ab = AbParts {
        month,
        day,
        minute,
        second,
    }
    .calc_ab();
    let cd = hour & 0xff;

    ((ab << 24) | (cd << 16))
        .wrapping_add(delay)
        .wrapping_add(year)
        .wrapping_sub(2000)
}

#[derive(Debug, Default, Clone, PartialEq, Eq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct Seed4CalcOpts {
    pub datetime: RngDateTime,
    pub seconds_increment: usize,
    pub min_delay: u32,
    pub max_delay: u32,
}

fn seedtime4_from_datetime_delay(datetime: RngDateTime, delay: u32) -> SeedTime4 {
    let seed = calc_seed(&datetime, delay);
    SeedTime4::new(seed, datetime, delay)
}

pub fn generate_seedtime4_from_datetime_delay<I>(pairs: I) -> impl Iterator<Item = SeedTime4>
where
    I: Iterator<Item = (RngDateTime, u32)>,
{
    pairs.map(|(datetime, delay)| seedtime4_from_datetime_delay(datetime, delay))
}

/// Generates a list of SeedTime4 structs.
#[wasm_bindgen]
pub fn generate_seedtime4s(opts: Seed4CalcOpts) -> Vec<SeedTime4> {
    let Seed4CalcOpts {
        mut datetime,
        seconds_increment,
        min_delay,
        max_delay,
    } = opts;
    let datetime_iter = datetime
        .as_seconds_iterator()
        .take(seconds_increment.saturating_add(1));

    generate_seedtime4_from_datetime_delay(iproduct!(datetime_iter, min_delay..=max_delay))
        .collect()
}

/// Generates an iterator of SeedTime4 structs.
/// Useful for efficiently searching for seeds without allocating a large vector.
pub fn seedtime4_iter(
    delay_range: RangeInclusive<u32>,
    year: u32,
    month: Option<u32>,
    second_range: Option<RangeInclusive<u32>>,
) -> impl Iterator<Item = SeedTime4> {
    let clamped_year = year.clamp(2000, 2100);
    let ab_lookup = build_seedtime4_ab_lookup(clamped_year, month, second_range.clone());
    let cloned_delays = delay_range.clone();
    iproduct!(cloned_delays, 0..=0xff_u32, 0..24_u32).filter_map(move |(delay, ab, cd)| {
        let seed = ((ab << 24) | (cd << 16))
            .wrapping_add(delay)
            .wrapping_add(year)
            .wrapping_sub(2000);
        let delay = calc_delay_from_seed(seed, clamped_year);
        if !delay_range.contains(&delay) {
            return None;
        }

        let AbParts {
            month,
            day,
            minute,
            second,
        } = ab_lookup[ab as usize]?;

        Some(SeedTime4 {
            seed,
            delay,
            datetime: RngDateTime {
                year: clamped_year,
                month,
                day,
                hour: cd,
                minute,
                second,
            },
        })
    })
}

/// Generates an iterator of SeedTime4 structs with a forced second value.
pub fn seedtime4_iter_with_second(
    delay_range: RangeInclusive<u32>,
    year: u32,
    month: Option<u32>,
    second: Option<u32>,
) -> impl Iterator<Item = SeedTime4> {
    seedtime4_iter(
        delay_range,
        year,
        month,
        Some(seedtime4_search_second_range(second)),
    )
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::datetime;
    use crate::gen4::seed_time::find_seedtime4_with_lookup;

    #[derive(Debug, Clone, PartialEq)]
    pub struct SeedTime4Options {
        pub seed: u32,
        pub year: u32,
        pub month: Option<u32>,
        pub second_range: Option<RangeInclusive<u32>>,
        pub delay_range: RangeInclusive<u32>,
    }

    impl SeedTime4Options {
        pub fn find_seedtime(&self) -> Option<SeedTime4> {
            let ab_lookup =
                build_seedtime4_ab_lookup(self.year, self.month, self.second_range.clone());
            find_seedtime4_with_lookup(self.seed, self.year, &self.delay_range, &ab_lookup)
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

    mod calc_gen4_seeds {
        use super::*;
        use crate::{assert_list_eq, datetime};

        #[test]
        fn iterates_datetime_and_delay_ranges() {
            let opts = Seed4CalcOpts {
                datetime: datetime!(2026-05-14 12:34:30).unwrap(),
                seconds_increment: 1,
                min_delay: 1749,
                max_delay: 1750,
            };
            let result = generate_seedtime4s(opts);
            let expected = [
                SeedTime4::new(
                    calc_seed(&datetime!(2026-05-14 12:34:30).unwrap(), 1749),
                    datetime!(2026-05-14 12:34:30).unwrap(),
                    1749,
                ),
                SeedTime4::new(
                    calc_seed(&datetime!(2026-05-14 12:34:30).unwrap(), 1750),
                    datetime!(2026-05-14 12:34:30).unwrap(),
                    1750,
                ),
                SeedTime4::new(
                    calc_seed(&datetime!(2026-05-14 12:34:31).unwrap(), 1749),
                    datetime!(2026-05-14 12:34:31).unwrap(),
                    1749,
                ),
                SeedTime4::new(
                    calc_seed(&datetime!(2026-05-14 12:34:31).unwrap(), 1750),
                    datetime!(2026-05-14 12:34:31).unwrap(),
                    1750,
                ),
            ];

            assert_list_eq!(result, expected);
        }
    }

    mod seedtime4_iter {
        use super::*;

        #[test]
        fn matches_find_seedtime_without_forced_second() {
            let delay_range = 601..=605;
            let year = 2000;
            let month = None;
            let second_range = None;

            let results = seedtime4_iter(delay_range.clone(), year, month, second_range.clone())
                .take(64)
                .collect::<Vec<_>>();

            for result in results {
                let expected = SeedTime4Options {
                    seed: result.seed,
                    year,
                    month,
                    second_range: second_range.clone(),
                    delay_range: delay_range.clone(),
                }
                .find_seedtime();

                assert_eq!(Some(result), expected);
            }
        }

        #[test]
        fn matches_find_seedtime_with_forced_second_and_month() {
            let delay_range = 740..=780;
            let year = 2000;
            let month = Some(4);
            let second_range = Some(56..=56);

            let results = seedtime4_iter(delay_range.clone(), year, month, second_range.clone())
                .take(64)
                .collect::<Vec<_>>();

            for result in results {
                let expected = SeedTime4Options {
                    seed: result.seed,
                    year,
                    month,
                    second_range: second_range.clone(),
                    delay_range: delay_range.clone(),
                }
                .find_seedtime();

                assert_eq!(Some(result), expected);
            }
        }
    }

    mod seedtime4_search_iter {
        use super::*;
        use crate::assert_list_eq;

        #[test]
        fn matches_new_without_forced_second() {
            let delay_range = 601..=605;
            let year = 2000;
            let month = None;
            let second = None;

            let results = seedtime4_iter_with_second(delay_range.clone(), year, month, second)
                .take(64)
                .collect::<Vec<_>>();

            for result in results {
                let expected = SeedTime4Options {
                    year,
                    month,
                    seed: result.seed,
                    delay_range: delay_range.clone(),
                    second_range: Some(seedtime4_search_second_range(second)),
                }
                .find_seedtime();

                assert_eq!(Some(result), expected);
            }
        }

        #[test]
        fn matches_new_with_forced_second_and_month() {
            let delay_range = 740..=780;
            let year = 2000;
            let month = Some(4);
            let second = Some(56);

            let results = seedtime4_iter_with_second(delay_range.clone(), year, month, second)
                .take(64)
                .collect::<Vec<_>>();
            let expected = [
                SeedTime4 {
                    seed: 0x3c0002e4,
                    datetime: datetime!(2000-04-01 00:00:56).unwrap(),
                    delay: 740,
                },
                SeedTime4 {
                    seed: 0x3c0102e4,
                    datetime: datetime!(2000-04-01 01:00:56).unwrap(),
                    delay: 740,
                },
                SeedTime4 {
                    seed: 0x3c0202e4,
                    datetime: datetime!(2000-04-01 02:00:56).unwrap(),
                    delay: 740,
                },
                SeedTime4 {
                    seed: 0x3c0302e4,
                    datetime: datetime!(2000-04-01 03:00:56).unwrap(),
                    delay: 740,
                },
                SeedTime4 {
                    seed: 0x3c0402e4,
                    datetime: datetime!(2000-04-01 04:00:56).unwrap(),
                    delay: 740,
                },
                SeedTime4 {
                    seed: 0x3c0502e4,
                    datetime: datetime!(2000-04-01 05:00:56).unwrap(),
                    delay: 740,
                },
                SeedTime4 {
                    seed: 0x3c0602e4,
                    datetime: datetime!(2000-04-01 06:00:56).unwrap(),
                    delay: 740,
                },
                SeedTime4 {
                    seed: 0x3c0702e4,
                    datetime: datetime!(2000-04-01 07:00:56).unwrap(),
                    delay: 740,
                },
                SeedTime4 {
                    seed: 0x3c0802e4,
                    datetime: datetime!(2000-04-01 08:00:56).unwrap(),
                    delay: 740,
                },
                SeedTime4 {
                    seed: 0x3c0902e4,
                    datetime: datetime!(2000-04-01 09:00:56).unwrap(),
                    delay: 740,
                },
                SeedTime4 {
                    seed: 0x3c0a02e4,
                    datetime: datetime!(2000-04-01 10:00:56).unwrap(),
                    delay: 740,
                },
                SeedTime4 {
                    seed: 0x3c0b02e4,
                    datetime: datetime!(2000-04-01 11:00:56).unwrap(),
                    delay: 740,
                },
                SeedTime4 {
                    seed: 0x3c0c02e4,
                    datetime: datetime!(2000-04-01 12:00:56).unwrap(),
                    delay: 740,
                },
                SeedTime4 {
                    seed: 0x3c0d02e4,
                    datetime: datetime!(2000-04-01 13:00:56).unwrap(),
                    delay: 740,
                },
                SeedTime4 {
                    seed: 0x3c0e02e4,
                    datetime: datetime!(2000-04-01 14:00:56).unwrap(),
                    delay: 740,
                },
                SeedTime4 {
                    seed: 0x3c0f02e4,
                    datetime: datetime!(2000-04-01 15:00:56).unwrap(),
                    delay: 740,
                },
                SeedTime4 {
                    seed: 0x3c1002e4,
                    datetime: datetime!(2000-04-01 16:00:56).unwrap(),
                    delay: 740,
                },
                SeedTime4 {
                    seed: 0x3c1102e4,
                    datetime: datetime!(2000-04-01 17:00:56).unwrap(),
                    delay: 740,
                },
                SeedTime4 {
                    seed: 0x3c1202e4,
                    datetime: datetime!(2000-04-01 18:00:56).unwrap(),
                    delay: 740,
                },
                SeedTime4 {
                    seed: 0x3c1302e4,
                    datetime: datetime!(2000-04-01 19:00:56).unwrap(),
                    delay: 740,
                },
                SeedTime4 {
                    seed: 0x3c1402e4,
                    datetime: datetime!(2000-04-01 20:00:56).unwrap(),
                    delay: 740,
                },
                SeedTime4 {
                    seed: 0x3c1502e4,
                    datetime: datetime!(2000-04-01 21:00:56).unwrap(),
                    delay: 740,
                },
                SeedTime4 {
                    seed: 0x3c1602e4,
                    datetime: datetime!(2000-04-01 22:00:56).unwrap(),
                    delay: 740,
                },
                SeedTime4 {
                    seed: 0x3c1702e4,
                    datetime: datetime!(2000-04-01 23:00:56).unwrap(),
                    delay: 740,
                },
                SeedTime4 {
                    seed: 0x3d0002e4,
                    datetime: datetime!(2000-04-01 00:01:56).unwrap(),
                    delay: 740,
                },
                SeedTime4 {
                    seed: 0x3d0102e4,
                    datetime: datetime!(2000-04-01 01:01:56).unwrap(),
                    delay: 740,
                },
                SeedTime4 {
                    seed: 0x3d0202e4,
                    datetime: datetime!(2000-04-01 02:01:56).unwrap(),
                    delay: 740,
                },
                SeedTime4 {
                    seed: 0x3d0302e4,
                    datetime: datetime!(2000-04-01 03:01:56).unwrap(),
                    delay: 740,
                },
                SeedTime4 {
                    seed: 0x3d0402e4,
                    datetime: datetime!(2000-04-01 04:01:56).unwrap(),
                    delay: 740,
                },
                SeedTime4 {
                    seed: 0x3d0502e4,
                    datetime: datetime!(2000-04-01 05:01:56).unwrap(),
                    delay: 740,
                },
                SeedTime4 {
                    seed: 0x3d0602e4,
                    datetime: datetime!(2000-04-01 06:01:56).unwrap(),
                    delay: 740,
                },
                SeedTime4 {
                    seed: 0x3d0702e4,
                    datetime: datetime!(2000-04-01 07:01:56).unwrap(),
                    delay: 740,
                },
                SeedTime4 {
                    seed: 0x3d0802e4,
                    datetime: datetime!(2000-04-01 08:01:56).unwrap(),
                    delay: 740,
                },
                SeedTime4 {
                    seed: 0x3d0902e4,
                    datetime: datetime!(2000-04-01 09:01:56).unwrap(),
                    delay: 740,
                },
                SeedTime4 {
                    seed: 0x3d0a02e4,
                    datetime: datetime!(2000-04-01 10:01:56).unwrap(),
                    delay: 740,
                },
                SeedTime4 {
                    seed: 0x3d0b02e4,
                    datetime: datetime!(2000-04-01 11:01:56).unwrap(),
                    delay: 740,
                },
                SeedTime4 {
                    seed: 0x3d0c02e4,
                    datetime: datetime!(2000-04-01 12:01:56).unwrap(),
                    delay: 740,
                },
                SeedTime4 {
                    seed: 0x3d0d02e4,
                    datetime: datetime!(2000-04-01 13:01:56).unwrap(),
                    delay: 740,
                },
                SeedTime4 {
                    seed: 0x3d0e02e4,
                    datetime: datetime!(2000-04-01 14:01:56).unwrap(),
                    delay: 740,
                },
                SeedTime4 {
                    seed: 0x3d0f02e4,
                    datetime: datetime!(2000-04-01 15:01:56).unwrap(),
                    delay: 740,
                },
                SeedTime4 {
                    seed: 0x3d1002e4,
                    datetime: datetime!(2000-04-01 16:01:56).unwrap(),
                    delay: 740,
                },
                SeedTime4 {
                    seed: 0x3d1102e4,
                    datetime: datetime!(2000-04-01 17:01:56).unwrap(),
                    delay: 740,
                },
                SeedTime4 {
                    seed: 0x3d1202e4,
                    datetime: datetime!(2000-04-01 18:01:56).unwrap(),
                    delay: 740,
                },
                SeedTime4 {
                    seed: 0x3d1302e4,
                    datetime: datetime!(2000-04-01 19:01:56).unwrap(),
                    delay: 740,
                },
                SeedTime4 {
                    seed: 0x3d1402e4,
                    datetime: datetime!(2000-04-01 20:01:56).unwrap(),
                    delay: 740,
                },
                SeedTime4 {
                    seed: 0x3d1502e4,
                    datetime: datetime!(2000-04-01 21:01:56).unwrap(),
                    delay: 740,
                },
                SeedTime4 {
                    seed: 0x3d1602e4,
                    datetime: datetime!(2000-04-01 22:01:56).unwrap(),
                    delay: 740,
                },
                SeedTime4 {
                    seed: 0x3d1702e4,
                    datetime: datetime!(2000-04-01 23:01:56).unwrap(),
                    delay: 740,
                },
                SeedTime4 {
                    seed: 0x3e0002e4,
                    datetime: datetime!(2000-04-01 00:02:56).unwrap(),
                    delay: 740,
                },
                SeedTime4 {
                    seed: 0x3e0102e4,
                    datetime: datetime!(2000-04-01 01:02:56).unwrap(),
                    delay: 740,
                },
                SeedTime4 {
                    seed: 0x3e0202e4,
                    datetime: datetime!(2000-04-01 02:02:56).unwrap(),
                    delay: 740,
                },
                SeedTime4 {
                    seed: 0x3e0302e4,
                    datetime: datetime!(2000-04-01 03:02:56).unwrap(),
                    delay: 740,
                },
                SeedTime4 {
                    seed: 0x3e0402e4,
                    datetime: datetime!(2000-04-01 04:02:56).unwrap(),
                    delay: 740,
                },
                SeedTime4 {
                    seed: 0x3e0502e4,
                    datetime: datetime!(2000-04-01 05:02:56).unwrap(),
                    delay: 740,
                },
                SeedTime4 {
                    seed: 0x3e0602e4,
                    datetime: datetime!(2000-04-01 06:02:56).unwrap(),
                    delay: 740,
                },
                SeedTime4 {
                    seed: 0x3e0702e4,
                    datetime: datetime!(2000-04-01 07:02:56).unwrap(),
                    delay: 740,
                },
                SeedTime4 {
                    seed: 0x3e0802e4,
                    datetime: datetime!(2000-04-01 08:02:56).unwrap(),
                    delay: 740,
                },
                SeedTime4 {
                    seed: 0x3e0902e4,
                    datetime: datetime!(2000-04-01 09:02:56).unwrap(),
                    delay: 740,
                },
                SeedTime4 {
                    seed: 0x3e0a02e4,
                    datetime: datetime!(2000-04-01 10:02:56).unwrap(),
                    delay: 740,
                },
                SeedTime4 {
                    seed: 0x3e0b02e4,
                    datetime: datetime!(2000-04-01 11:02:56).unwrap(),
                    delay: 740,
                },
                SeedTime4 {
                    seed: 0x3e0c02e4,
                    datetime: datetime!(2000-04-01 12:02:56).unwrap(),
                    delay: 740,
                },
                SeedTime4 {
                    seed: 0x3e0d02e4,
                    datetime: datetime!(2000-04-01 13:02:56).unwrap(),
                    delay: 740,
                },
                SeedTime4 {
                    seed: 0x3e0e02e4,
                    datetime: datetime!(2000-04-01 14:02:56).unwrap(),
                    delay: 740,
                },
                SeedTime4 {
                    seed: 0x3e0f02e4,
                    datetime: datetime!(2000-04-01 15:02:56).unwrap(),
                    delay: 740,
                },
            ];

            assert_list_eq!(results, expected);
        }
    }
}
