use super::utils::seedtime4_month_range;
use crate::get_days_in_month;
use std::ops::RangeInclusive;

#[derive(Debug, Clone, Copy, Eq, PartialEq)]
pub struct AbParts {
    pub month: u32,
    pub day: u32,
    pub minute: u32,
    pub second: u32,
}

impl AbParts {
    /// Calculates the ab value from the month, day, minute, and second.
    pub fn calc_ab(&self) -> u32 {
        self.month
            .wrapping_mul(self.day)
            .wrapping_add(self.minute)
            .wrapping_add(self.second)
            & 0xff
    }
}

pub type SeedTime4AbLookup = [Option<AbParts>; 256];

/// Builds a lookup table for SeedTime4 ab seed generation.
pub fn build_seedtime4_ab_lookup(
    year: u32,
    month: Option<u32>,
    second_range: Option<RangeInclusive<u32>>,
) -> SeedTime4AbLookup {
    let year = year.clamp(2000, 2100);
    let mut lookup = [None; 256];
    let mut remaining = 256;
    let second_range = second_range.unwrap_or(0..=59);

    for month in seedtime4_month_range(month) {
        let max_days = get_days_in_month(year as i32, month);

        for day in 1..=max_days {
            for minute in 0..60 {
                for second in second_range.clone() {
                    if second > 59 {
                        continue;
                    }

                    let ab = AbParts {
                        month,
                        day,
                        minute,
                        second,
                    }
                    .calc_ab() as usize;
                    if lookup[ab].is_some() {
                        continue;
                    }

                    lookup[ab] = Some(AbParts {
                        month,
                        day,
                        minute,
                        second,
                    });
                    remaining -= 1;

                    if remaining == 0 {
                        return lookup;
                    }
                }
            }
        }
    }

    lookup
}
