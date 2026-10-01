use super::{
    BLINK_STEPS, LONG_COOLDOWN_STEPS, SHORT_COOLDOWN_STEPS, has_long_cooldown, starts_blink,
};
use crate::rng::{Rng, sfmt::Sfmt};

/// 3DSRNGTool never scans for blinks before this advance.
const MIN_SCAN_ADVANCE: usize = 418;

/// Blink flag for one RNG advance, using 3DSRNGTool's values.
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum BlinkFlag {
    /// No NPC is mid-blink.
    Safe,
    /// A blink starts here while every NPC was idle.
    Blink,
    /// An NPC may be mid-blink or in a short cooldown.
    Unsafe,
    /// A blink starts here while another NPC may already be mid-blink.
    UnsafeBlink,
}

impl BlinkFlag {
    /// Matches 3DSRNGTool's "Safe F Only".
    pub fn is_safe(self) -> bool {
        matches!(self, Self::Safe | Self::Blink)
    }
}

struct BlinkFlagScanner {
    /// Positioned at `advance`.
    rng: Sfmt,
    advance: usize,
    other_model_count: usize,
    short_unsafe_advances: usize,
    long_unsafe_advances: usize,
    unsafe_advances_left: usize,
}

impl BlinkFlagScanner {
    /// Flags depend on earlier advances, so this scans from up to one long
    /// unsafe range before `anchor_advance` and discards flags before `start_advance`.
    fn new(seed: u32, model_count: usize, anchor_advance: usize, start_advance: usize) -> Self {
        let other_model_count = model_count - 1;
        let long_unsafe_advances = (BLINK_STEPS + LONG_COOLDOWN_STEPS) as usize * other_model_count;
        let warm_up_advance = anchor_advance
            .min(start_advance)
            .saturating_sub(long_unsafe_advances)
            .max(MIN_SCAN_ADVANCE);

        let mut rng = Sfmt::new(seed);
        rng.advance(warm_up_advance);

        let mut scanner = Self {
            rng,
            advance: warm_up_advance,
            other_model_count,
            short_unsafe_advances: (BLINK_STEPS + SHORT_COOLDOWN_STEPS) as usize
                * other_model_count,
            long_unsafe_advances,
            unsafe_advances_left: 0,
        };
        scanner.advance_by(start_advance - warm_up_advance);
        scanner
    }

    fn advance_by(&mut self, count: usize) {
        for _ in 0..count {
            self.next_flag();
        }
    }

    /// Another blink before this one ends, or a long blink cooldown,
    /// means the NPCs could stay unsafe for longer.
    fn is_long_unsafe(&self) -> bool {
        let mut rng = self.rng.clone();
        let blinks_again = (0..BLINK_STEPS as usize * self.other_model_count)
            .any(|_| starts_blink(rng.next_u64()));
        blinks_again || has_long_cooldown(rng.next_u64())
    }

    fn next_flag(&mut self) -> BlinkFlag {
        self.advance += 1;

        if starts_blink(self.rng.next_u64()) {
            let was_unsafe = self.unsafe_advances_left > 0;
            self.unsafe_advances_left = if was_unsafe || self.is_long_unsafe() {
                self.long_unsafe_advances
            } else {
                self.short_unsafe_advances
            };
            return if was_unsafe {
                BlinkFlag::UnsafeBlink
            } else {
                BlinkFlag::Blink
            };
        }

        if self.unsafe_advances_left > 0 {
            self.unsafe_advances_left -= 1;
            return BlinkFlag::Unsafe;
        }

        BlinkFlag::Safe
    }
}

impl Iterator for BlinkFlagScanner {
    type Item = (usize, BlinkFlag);

    fn next(&mut self) -> Option<Self::Item> {
        let advance = self.advance;
        Some((advance, self.next_flag()))
    }
}

/// `(advance, flag)` for every advance from `start_advance` onward.
///
/// The lookback for earlier blinks is measured from `anchor_advance`, so
/// searches with the same anchor agree no matter where they start.
///
/// Returns `None` with 0 NPCs.
pub fn blink_flags(
    seed: u32,
    model_count: usize,
    anchor_advance: usize,
    start_advance: usize,
) -> Option<impl Iterator<Item = (usize, BlinkFlag)>> {
    if model_count < 2 {
        return None;
    }

    let scan_start = start_advance.max(MIN_SCAN_ADVANCE);
    let unscanned = (start_advance..scan_start).map(|advance| (advance, BlinkFlag::Safe));
    Some(unscanned.chain(BlinkFlagScanner::new(
        seed,
        model_count,
        anchor_advance,
        scan_start,
    )))
}

pub fn next_safe_advances(
    seed: u32,
    model_count: usize,
    anchor_advance: usize,
    start_advance: usize,
    safe_advance_count: usize,
    max_scan: usize,
) -> Option<Vec<usize>> {
    Some(
        blink_flags(seed, model_count, anchor_advance, start_advance)?
            .take(max_scan.saturating_add(1))
            .filter(|(_, flag)| flag.is_safe())
            .map(|(advance, _)| advance)
            .take(safe_advance_count)
            .collect(),
    )
}

#[cfg(test)]
mod test {
    use super::*;
    use crate::gen7::model_count_from_npcs;

    const SEED: u32 = 0xdeadbeef;

    fn flags_in(model_count: usize, min: usize, max: usize) -> Vec<BlinkFlag> {
        blink_flags(SEED, model_count, min, min)
            .unwrap()
            .take(max - min + 1)
            .map(|(_, flag)| flag)
            .collect()
    }

    fn rand_at(seed: u32, advance: usize) -> u64 {
        let mut rng = Sfmt::new(seed);
        rng.advance(advance);
        rng.next_u64()
    }

    #[test]
    fn zero_npcs_is_not_supported() {
        assert!(blink_flags(SEED, 1, 1000, 1000).is_none());
        assert_eq!(next_safe_advances(SEED, 1, 1000, 1000, 10, 1000), None);
    }

    #[test]
    fn flags_start_at_the_start_advance() {
        let advances: Vec<usize> = blink_flags(SEED, 3, 1000, 1000)
            .unwrap()
            .take(3)
            .map(|(advance, _)| advance)
            .collect();
        assert_eq!(advances, vec![1000, 1001, 1002]);
    }

    #[test]
    fn blinks_are_flagged_where_the_rand_says_so() {
        let flags = flags_in(3, 1000, 3000);

        for (offset, flag) in flags.into_iter().enumerate() {
            let is_blink = starts_blink(rand_at(SEED, 1000 + offset));
            let flagged_blink = matches!(flag, BlinkFlag::Blink | BlinkFlag::UnsafeBlink);
            assert_eq!(is_blink, flagged_blink, "advance {}", 1000 + offset);
        }
    }

    #[test]
    fn a_blink_makes_the_next_advances_unsafe() {
        let model_count = 3;
        let flags = flags_in(model_count, 1000, 3000);
        let short = (BLINK_STEPS + SHORT_COOLDOWN_STEPS) as usize * (model_count - 1);

        let first_blink = flags
            .iter()
            .position(|flag| *flag == BlinkFlag::Blink)
            .expect("no blink in range");

        // At least the short unsafe range follows, unless another blink restarts it.
        for flag in &flags[first_blink + 1..=first_blink + short] {
            assert!(!flag.is_safe() || *flag == BlinkFlag::Blink, "{flag:?}");
        }
    }

    #[test]
    fn range_start_does_not_change_flags() {
        // Each range looks back far enough, so overlapping advances agree.
        let whole = flags_in(4, 1000, 2000);
        for min in [1100, 1337, 1500, 1999] {
            let part = flags_in(4, min, 2000);
            assert_eq!(part, whole[min - 1000..], "min {min}");
        }
    }

    #[test]
    fn advances_below_418_stay_safe() {
        let flags = flags_in(3, 400, 500);
        assert!(flags[..18].iter().all(|flag| *flag == BlinkFlag::Safe));
        assert_eq!(flags[18..], flags_in(3, 418, 500));
        assert_eq!(flags_in(3, 0, 10), vec![BlinkFlag::Safe; 11]);
    }

    #[test]
    fn next_safe_advances_matches_flags() {
        let flags = flags_in(3, 1000, 2000);
        let expected: Vec<usize> = flags
            .iter()
            .enumerate()
            .filter(|(_, flag)| flag.is_safe())
            .map(|(offset, _)| 1000 + offset)
            .take(10)
            .collect();

        assert_eq!(
            next_safe_advances(SEED, 3, 1000, 1000, 10, 1000),
            Some(expected)
        );
    }

    #[test]
    fn next_safe_advances_stops_at_max_scan() {
        let safe = next_safe_advances(SEED, 3, 1000, 1000, usize::MAX, 50).unwrap();
        assert!(safe.iter().all(|advance| (1000..=1050).contains(advance)));
    }

    // With 2 NPCs, the blink at 3713 makes the blink at 3756 unsafe, which
    // keeps advances unsafe until 3838. "Show More" searches again from after
    // the last result, so a search from 3796 has to agree with one from 3700.
    #[test]
    fn later_start_sees_earlier_blinks() {
        let model_count = model_count_from_npcs(2);
        let from_earlier: Vec<usize> =
            next_safe_advances(SEED, model_count, 3700, 3700, usize::MAX, 200)
                .unwrap()
                .into_iter()
                .filter(|advance| *advance >= 3796)
                .collect();
        let from_later =
            next_safe_advances(SEED, model_count, 3700, 3796, usize::MAX, 104).unwrap();

        assert_eq!(from_earlier.first(), Some(&3839));
        assert_eq!(from_later, from_earlier);
    }

    // 3DSRNGTool with Safe F Only, seed 0xDEADBEEF, advances 1000-1200.
    #[test]
    fn matches_3dsrngtool_2_npcs() {
        let expected: Vec<usize> = (1000..=1200).collect();
        let model_count = model_count_from_npcs(2);

        assert_eq!(
            next_safe_advances(SEED, model_count, 1000, 1000, usize::MAX, 200),
            Some(expected)
        );
    }

    // 3DSRNGTool with Safe F Only, seed 0xDEADBEEF, advances 1000-1200.
    // A blink just before 1000 makes 1000-1038 unsafe.
    #[test]
    fn matches_3dsrngtool_4_npcs() {
        let expected: Vec<usize> = (1039..=1200).collect();
        let model_count = model_count_from_npcs(4);

        assert_eq!(
            next_safe_advances(SEED, model_count, 1000, 1000, usize::MAX, 200),
            Some(expected)
        );
    }
}
