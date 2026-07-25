use super::ab::{AbParts, SeedTime4AbLookup, build_seedtime4_ab_lookup};
use super::seed_time4::SeedTime4;
use super::utils::{calc_delay_from_seed, seedtime4_search_second_range};
use crate::RngDateTime;
use crate::time::is_leap_year;
use std::ops::RangeInclusive;

fn needs_leap_lookup(month: Option<u32>) -> bool {
    matches!(month, None | Some(2))
}

fn calc_delay_year_base(seed: u32) -> i64 {
    let cd = (seed >> 16) & 0xff;
    let efgh = seed & 0xffff;
    let overflow = match cd > 23 {
        true => i64::from(cd.wrapping_sub(23).wrapping_mul(0x10000)),
        false => 0,
    };

    i64::from(efgh) + 2000 + overflow
}

fn get_candidate_years(seed: u32, delay_range: &RangeInclusive<u32>) -> RangeInclusive<u32> {
    let base = calc_delay_year_base(seed);
    let start = (base - i64::from(*delay_range.end())).max(2000);
    let end = (base - i64::from(*delay_range.start())).min(2100);

    match start > end {
        // Intentionally empty range
        true => RangeInclusive::new(1, 0),
        false => start as u32..=end as u32,
    }
}

/// A searcher for SeedTime4 values based on a given seed, year, and delay range.
pub enum SeedTime4Searcher {
    FixedYear {
        year: u32,
        delay_range: RangeInclusive<u32>,
        ab_lookup: SeedTime4AbLookup,
    },
    AnyYear {
        delay_range: RangeInclusive<u32>,
        common_lookup: SeedTime4AbLookup,
        // Put this lookup in a box to avoid the large size difference between the two variants of this enum
        leap_lookup: Option<Box<SeedTime4AbLookup>>,
    },
}

impl SeedTime4Searcher {
    pub fn new(
        year: Option<u32>,
        month: Option<u32>,
        delay_range: RangeInclusive<u32>,
        second: Option<u32>,
    ) -> Self {
        let second_range = Some(seedtime4_search_second_range(second));

        match year {
            Some(year) => {
                let clamped_year = year.clamp(2000, 2100);
                let ab_lookup = build_seedtime4_ab_lookup(clamped_year, month, second_range);

                Self::FixedYear {
                    year: clamped_year,
                    delay_range,
                    ab_lookup,
                }
            }
            None => {
                let common_lookup = build_seedtime4_ab_lookup(2001, month, second_range.clone());
                let leap_lookup = needs_leap_lookup(month)
                    .then(|| build_seedtime4_ab_lookup(2000, month, second_range));
                let leap_lookup = leap_lookup.map(Box::new);

                Self::AnyYear {
                    delay_range,
                    common_lookup,
                    leap_lookup,
                }
            }
        }
    }

    /// Finds parameters for a given seed.
    pub fn find(&self, seed: u32) -> Option<SeedTime4> {
        match self {
            Self::FixedYear {
                year,
                delay_range,
                ab_lookup,
            } => find_seedtime4_with_lookup(seed, *year, delay_range, ab_lookup),
            Self::AnyYear {
                delay_range,
                common_lookup,
                leap_lookup,
            } => {
                for year in get_candidate_years(seed, delay_range) {
                    let ab_lookup = match is_leap_year(year) {
                        true => leap_lookup
                            .as_ref()
                            .map(|lookup| lookup.as_ref())
                            .unwrap_or(common_lookup),
                        false => common_lookup,
                    };

                    if let Some(seed_time) =
                        find_seedtime4_with_lookup(seed, year, delay_range, ab_lookup)
                    {
                        return Some(seed_time);
                    }
                }

                None
            }
        }
    }
}

/// Finds a SeedTime4 for a given seed, year, and delay range using a lookup table.
pub fn find_seedtime4_with_lookup(
    seed: u32,
    year: u32,
    delay_range: &RangeInclusive<u32>,
    ab_lookup: &SeedTime4AbLookup,
) -> Option<SeedTime4> {
    let clamped_year = year.clamp(2000, 2100);
    let delay = calc_delay_from_seed(seed, clamped_year);
    if !delay_range.contains(&delay) {
        return None;
    }

    let AbParts {
        month,
        day,
        minute,
        second,
    } = ab_lookup[(seed >> 24) as usize]?;
    let cd = (seed >> 16) & 0xff;
    let hour = if cd > 23 { 23 } else { cd };

    Some(SeedTime4 {
        seed,
        delay,
        datetime: RngDateTime {
            year: clamped_year,
            month,
            day,
            hour,
            minute,
            second,
        },
    })
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::assert_list_eq;

    mod get_candidate_years {
        use super::*;

        #[test]
        fn narrowed_by_delay_range() {
            let years = get_candidate_years(0xDC03025B, &(601..=605)).collect::<Vec<_>>();

            assert_list_eq!(years, [2000, 2001, 2002]);
        }

        #[test]
        fn can_be_empty() {
            let years = get_candidate_years(0xDC03025B, &(0..=10)).collect::<Vec<_>>();

            assert!(years.is_empty());
        }
    }

    mod seedtime4_search_lookup {
        use super::*;
        use crate::datetime;

        #[test]
        fn finds_first_matching_year_when_year_is_optional() {
            let seed = 0x860c06ef;

            let result = SeedTime4Searcher::new(None, Some(5), 1749..=1750, Some(30)).find(seed);
            let expected = Some(SeedTime4 {
                seed,
                datetime: datetime!(2025-05-09 12:59:30).unwrap(),
                delay: 1750,
            });

            assert_eq!(result, expected);
            assert_eq!(result.unwrap().datetime.year, 2025);
        }
    }
}
