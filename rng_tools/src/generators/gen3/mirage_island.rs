use crate::rng::lcrng::{Lcrng,Pokerng};
use crate::rng::Rng;
use serde::{Deserialize, Serialize};
use tsify_next::Tsify;
use wasm_bindgen::prelude::*;

pub type Mirageislandrng = Lcrng<0x3039, 0x41c64e6d, 1, 1>;

#[derive(Debug, Clone, Copy, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct MirageIslandResult {
    pub day: u32,
    pub day_diff: u32,
    pub pid_pattern: u16,
    pub earliest_adv: u32,
}

fn get_high_pid_from_rng(rng: Pokerng) -> u16 {
    (rng.clone().next().unwrap() >> 16) as u16
}

fn generate_earliest_advance_count(initial_seed:u32) -> Vec<u32> {
    const EARLIEST_VALID_ADVANCE:u32 = 1500; // Earliest advance for Method-1 with most delay (Groudon) is ~1326.
    let mut earliest_adv_by_pid_pattern = vec![0u32; 0x10000];
    
    let mut unmatched_count:u32 = 0x10000;
    let mut pid_rng = Pokerng::new(initial_seed);
    pid_rng.advance((EARLIEST_VALID_ADVANCE) as usize);
    for pid_rng_adv in EARLIEST_VALID_ADVANCE..1_000_000 {
        // 1_000_000 to avoid infinite loop in case of bug
        pid_rng.advance(1);
        if pid_rng_adv < EARLIEST_VALID_ADVANCE { continue; }
        
        let pid_pattern = get_high_pid_from_rng(pid_rng);
        let old_value = earliest_adv_by_pid_pattern[pid_pattern as usize];
        if old_value != 0 { continue; } // another earlier advance exists
        
        earliest_adv_by_pid_pattern[pid_pattern as usize] = pid_rng_adv;
        unmatched_count -= 1;
        if unmatched_count == 0 { break; } // all were matched
    }
    
    return earliest_adv_by_pid_pattern;
}

#[wasm_bindgen]
pub fn mirage_island_calculate(
    initial_seed: u32,
    first_day: u32,
    last_day: u32,
) -> Vec<MirageIslandResult> {
    let earliest_adv_by_pid_pattern = generate_earliest_advance_count(initial_seed);
    let mut mirage_island_rng = Mirageislandrng::new(0);
    if first_day != 0 {
        mirage_island_rng.advance((first_day - 1) as usize);
    }
    
    (first_day..=last_day).map(|day|{
        let day_diff = day - first_day;
        let pid_pattern:u16 = mirage_island_rng.rand();

        MirageIslandResult {
            day,
            day_diff,
            pid_pattern,
            earliest_adv:earliest_adv_by_pid_pattern[pid_pattern as usize],
        }
    })
    .collect()
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::assert_list_eq;
    
    #[test]
    fn emerald_dead_battery() {
        let val = mirage_island_calculate(0, 0, 0);
        assert_list_eq!(val, vec![MirageIslandResult {
            day: 0,
            day_diff: 0,
            pid_pattern: 0,
            earliest_adv: 18624,
        }]);
    }

    #[test]
    fn rs_dead_battery() {
        let val = mirage_island_calculate(0x5A0, 0, 0);
        assert_list_eq!(val, vec![MirageIslandResult {
            day: 0,
            day_diff: 0,
            pid_pattern: 0,
            earliest_adv: 19395,
        }]);
    }
    
    #[test]
    fn emerald_live_battery() {
        let val = mirage_island_calculate(0, 3633, 3635);
        assert_list_eq!(val, vec![MirageIslandResult {
            day: 3633,
            day_diff: 0,
            pid_pattern: 0xF99F,
            earliest_adv: 105936,
        },
        MirageIslandResult {
            day: 3634,
            day_diff: 1,
            pid_pattern: 0x6B74,
            earliest_adv: 23792,
        },
        MirageIslandResult {
            day: 3635,
            day_diff: 2,
            pid_pattern: 0xEACE,
            earliest_adv: 60397,
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
}
