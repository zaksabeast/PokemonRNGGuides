use crate::rng::lcrng::Pokerng;
use crate::rng::Rng;
use serde::{Deserialize, Serialize};
use tsify_next::Tsify;
use wasm_bindgen::prelude::*;

#[derive(Debug, Clone, Copy, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct MirageIslandResult {
    pub day: u32,
    pub day_diff: u32,
    pub pid_pattern: u16,
    pub earliest_adv: u32,
}

fn generate_earliest_advance_count(initial_seed: u32) -> Vec<u32> {
    const EARLIEST_VALID_ADVANCE: u32 = 1501; // Earliest advance for Method-1 with most delay (Groudon) is ~1326.
    let mut earliest_adv_by_pid_pattern = vec![0u32; 0x10000];

    let mut unmatched_count: u32 = 0x10000;
    let mut pid_rng = Pokerng::new(initial_seed);
    pid_rng.advance((EARLIEST_VALID_ADVANCE) as usize);
    for pid_rng_adv in EARLIEST_VALID_ADVANCE..1_000_000 {
        // 1_000_000 to avoid infinite loop in case of bug
        let pid_pattern = pid_rng.rand::<u16>();
        let old_value = earliest_adv_by_pid_pattern[pid_pattern as usize];
        if old_value != 0 {
            continue;
        } // another earlier advance exists

        earliest_adv_by_pid_pattern[pid_pattern as usize] = pid_rng_adv;
        unmatched_count -= 1;
        if unmatched_count == 0 {
            break;
        } // all were matched
    }

    earliest_adv_by_pid_pattern
}

#[wasm_bindgen]
pub fn mirage_island_calculate(
    initial_seed: u32,
    first_day: u32,
    last_day: u32,
) -> Vec<MirageIslandResult> {
    let earliest_adv_by_pid_pattern = generate_earliest_advance_count(initial_seed);
    
    let mut mirage_island_rng:u32 = 0;
    
    let mut res:Vec<MirageIslandResult> = vec![];
    for day in 0..=last_day {
        let pid_pattern:u16 = (mirage_island_rng >> 16) as u16;

        mirage_island_rng = mirage_island_rng.wrapping_mul(0x41c64e6d).wrapping_add(0x3039);

        if day >= first_day {
            res.push(MirageIslandResult {
                day,
                day_diff: day - first_day,
                pid_pattern,
                earliest_adv:earliest_adv_by_pid_pattern[pid_pattern as usize],
            });
        }
    }
    res
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::assert_list_eq;
    
    #[test]
    fn emerald_dead_battery() {
        let results = mirage_island_calculate(0, 0, 0);
        assert_list_eq!(results, vec![MirageIslandResult {
            day: 0,
            day_diff: 0,
            pid_pattern: 0,
            earliest_adv: 18625,
        }]);
    }

    #[test]
    fn rs_dead_battery() {
        let results = mirage_island_calculate(0x5A0, 0, 0);
        assert_list_eq!(results, vec![MirageIslandResult {
            day: 0,
            day_diff: 0,
            pid_pattern: 0,
            earliest_adv: 19396,
        }]);
    }
    
    #[test]
    fn emerald_live_battery() {
        let results = mirage_island_calculate(0, 1, 2);
        assert_list_eq!(results, vec![MirageIslandResult {
            day: 1,
            day_diff: 0,
            pid_pattern: 0x0000,
            earliest_adv: 18625,
        }, MirageIslandResult {
            day: 2,
            day_diff: 1,
            pid_pattern: 0xD3DC,
            earliest_adv: 3900,
        }]);
        
        let results = mirage_island_calculate(0, 3630, 3630);
        assert_list_eq!(results, vec![MirageIslandResult {
            day: 3630,
            day_diff: 0,
            pid_pattern: 0xF306,
            earliest_adv: 75959,
        }]);
    }
    
    #[test]
    fn all_pid_patterns_have_non_zero_method_1_adv() {
        for initial_seed in vec![0u32, 0x5A0u32] {
            let earliest_adv_by_pid_pattern = generate_earliest_advance_count(initial_seed);
            for pid_pattern in 0..=0xFFFFusize {
                assert_ne!(earliest_adv_by_pid_pattern[pid_pattern], 0);
            }
        }
    }

    #[test]
    fn earliest_advance_by_pid_patterns() {
        let earliest_adv_by_pid_pattern = generate_earliest_advance_count(0x5a0);
        let expected = [19396, 13950, 5756, 33489, 42391];
        assert_list_eq!(&earliest_adv_by_pid_pattern[0..5], &expected);

        let earliest_adv_by_pid_pattern = generate_earliest_advance_count(0x0);
        let expected = [18625, 39963, 53159, 20315, 22085];
        assert_list_eq!(&earliest_adv_by_pid_pattern[0..5], &expected);
    }
}
