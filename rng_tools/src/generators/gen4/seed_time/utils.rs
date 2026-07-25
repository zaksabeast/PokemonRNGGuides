use std::ops::RangeInclusive;

/// Calculates the delay from a given seed and year.
pub(super) fn calc_delay_from_seed(seed: u32, year: u32) -> u32 {
    let cd = (seed >> 16) & 0xff;
    let efgh = seed & 0xffff;

    match cd > 23 {
        true => efgh
            .wrapping_add(2000)
            .wrapping_sub(year)
            .wrapping_add(cd.wrapping_sub(23).wrapping_mul(0x10000)),
        false => efgh.wrapping_add(2000).wrapping_sub(year),
    }
}

pub(super) fn seedtime4_month_range(month: Option<u32>) -> RangeInclusive<u32> {
    match month {
        Some(month) if (1..=12).contains(&month) => month..=month,
        _ => 1..=12,
    }
}

pub(super) fn seedtime4_search_second_range(second: Option<u32>) -> RangeInclusive<u32> {
    match second {
        Some(second) => second..=second,
        None => 1..=58,
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    mod calc_delay_from_seed {
        use super::*;

        #[test]
        fn removes_year_offset_from_low_bits() {
            let seed = 0x860c06ef;

            assert_eq!(seed & 0xffff, 1775);
            assert_eq!(calc_delay_from_seed(seed, 2026), 1749);
        }
    }
}
