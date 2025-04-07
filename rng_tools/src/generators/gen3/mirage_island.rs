use crate::rng::lcrng::{Lcrng,Pokerng};
use crate::rng::{Rng, StateIterator};
use serde::{Deserialize, Serialize};
use tsify_next::Tsify;
use wasm_bindgen::prelude::*;

pub type Mirageislandrng = Lcrng<0x3039, 0x41c64e6d, 1, 1>;

#[derive(Debug, Clone, Copy, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct ResultColumnData {
    pub day: u32,
    pub dayDiff: u32,
    pub pidPattern: u16,
    pub earliestAdv: u32,
}

fn get_high_pid_from_rng(rng: Mirageislandrng) : u16 {
  (rng.clone().next() >> 16) as u16
}



class EarliestAdvCalculator {
  constructor(private initialSeed: number) {}

  /**
   * earliestAdvanceByPidPattern[PidPattern] = earliestMethod1Advance.
   * null until the first getEarliestAdvanceCount call
   */
  private earliestAdvanceByPidPattern: Uint32Array | null = null;

  private generateEarliestAdvanceCount() {
    const EARLIEST_VALID_ADVANCE = 1000; // Earliest advance for Kecleon with turbo fire A is ~816
    const earliestAdvByPidPattern = new Uint32Array(0x10000);

    let unmatchedCount = 0x10000;
    let pidRng = BigInt(this.initialSeed);
    for (let pidRngAdv = 0; pidRngAdv < 1_000_000; pidRngAdv++) {
      // 1_000_000 to avoid infinite loop in case of bug
      pidRng = advancePidRng(pidRng);

      if (pidRngAdv < EARLIEST_VALID_ADVANCE) continue;

      const pidPattern = Number(getHighPidFromRng(pidRng));
      const oldValue = earliestAdvByPidPattern[pidPattern];
      if (oldValue !== 0) continue; // another earlier advance exists

      earliestAdvByPidPattern[pidPattern] = pidRngAdv;
      unmatchedCount--;
      if (unmatchedCount === 0) break; // all were matched
    }

    if (unmatchedCount !== 0)
      console.error(
        "Error: earliestAdvByPidPattern are missing some values. This means some PID pattern won't have a earliest advance.",
      );

    return earliestAdvByPidPattern;
  }
  getEarliestAdvanceCount(pidPattern: number) {
    if (this.earliestAdvanceByPidPattern === null)
      this.earliestAdvanceByPidPattern = this.generateEarliestAdvanceCount();
    return this.earliestAdvanceByPidPattern[pidPattern];
  }
}

struct EarliestAdvCalculator {
  initial_seed:u32,
  earliest_advance_by_pid_pattern:Vec<u32>,
}

impl EarliestAdvCalculator {
  /**
   * earliestAdvanceByPidPattern[PidPattern] = earliestMethod1Advance.
   * null until the first getEarliestAdvanceCount call
   */

  fn generate_earliest_advance_count(&self) : Vec<u32> {
    let EARLIEST_VALID_ADVANCE:u32 = 1500; // Earliest advance for Method-1 with most delay (Groudon) is ~1326.
    let earliestAdvByPidPattern = vec![];
    earliestAdvByPidPattern.resize(0x10000);

    let mut unmatchedCount:u32 = 0x10000;
    let mut pidRng = Pokerng::new(self.initial_seed);
    for pidRngAdv in 0..1_000_000 {
      // 1_000_000 to avoid infinite loop in case of bug
      pidRng.advance();

      if pidRngAdv < EARLIEST_VALID_ADVANCE { continue; }

      let pid_pattern = get_high_pid_from_rng(pidRng);
      let old_value = earliestAdvByPidPattern[pidPattern as usize].unwrap();
      if old_value !== 0 { continue; } // another earlier advance exists

      earliestAdvByPidPattern[pidPattern] = pidRngAdv;
      unmatchedCount -= 1;
      if unmatchedCount === 0 { break; } // all were matched
    }

    return earliestAdvByPidPattern;
  }
  pub get_earliest_advance_count(&mut self, pidPattern: u16) {
    if self.earliestAdvanceByPidPattern.is_empty()
      self.earliestAdvanceByPidPattern = self.generate_earliest_advance_count();
    return self.earliestAdvanceByPidPattern[pidPattern as usize].unwrap();
  }
}



#[wasm_bindgen]
pub fn mirage_island_calculate(
    initial_seed: u16,
    first_day: u32,
    last_day: u32,
) -> Vec<ResultColumnData> {


    StateIterator::new(Pokerng::new(tid.into()))
        .enumerate()
        .skip(initial_advances)
        .take(max_advances)
        .flat_map(|(advances, mut rng)| {
            let sid3 = rng.rand::<u16>();
            let sid2 = rng.rand::<u16>();
            rng.advance(2);

            if feebas_seed != generate_feebas_seed(rng) {
                return vec![];
            }

            vec![
                FeebasSidResult {
                    sid: sid3,
                    advances,
                    vblanks: 3,
                },
                FeebasSidResult {
                    sid: sid2,
                    advances: advances + 1,
                    vblanks: 2,
                },
            ]
        })
        .collect()
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::assert_list_eq;

    #[test]
    fn test_generate_feebas_seed() {
        let result = generate_feebas_seed(Pokerng::new(0xaabb));
        assert_eq!(result, 41779);
    }

    #[test]
    fn test_emerald_sid_from_spots() {
        let results = emerald_sid_from_feebas_seed(14223, 0xad4f, 0, 300_000);
        let expected = [
            FeebasSidResult {
                sid: 34159,
                advances: 1810,
                vblanks: 3,
            },
            FeebasSidResult {
                sid: 27105,
                advances: 1811,
                vblanks: 2,
            },
            FeebasSidResult {
                sid: 30561,
                advances: 282651,
                vblanks: 3,
            },
            FeebasSidResult {
                sid: 31118,
                advances: 282652,
                vblanks: 2,
            },
            FeebasSidResult {
                sid: 27948,
                advances: 282657,
                vblanks: 3,
            },
            FeebasSidResult {
                sid: 39625,
                advances: 282658,
                vblanks: 2,
            },
            FeebasSidResult {
                sid: 39625,
                advances: 282658,
                vblanks: 3,
            },
            FeebasSidResult {
                sid: 57826,
                advances: 282659,
                vblanks: 2,
            },
            FeebasSidResult {
                sid: 28480,
                advances: 282664,
                vblanks: 3,
            },
            FeebasSidResult {
                sid: 4087,
                advances: 282665,
                vblanks: 2,
            },
            FeebasSidResult {
                sid: 4087,
                advances: 282665,
                vblanks: 3,
            },
            FeebasSidResult {
                sid: 53059,
                advances: 282666,
                vblanks: 2,
            },
            FeebasSidResult {
                sid: 61650,
                advances: 282671,
                vblanks: 3,
            },
            FeebasSidResult {
                sid: 42187,
                advances: 282672,
                vblanks: 2,
            },
            FeebasSidResult {
                sid: 42187,
                advances: 282672,
                vblanks: 3,
            },
            FeebasSidResult {
                sid: 53956,
                advances: 282673,
                vblanks: 2,
            },
            FeebasSidResult {
                sid: 53956,
                advances: 282673,
                vblanks: 3,
            },
            FeebasSidResult {
                sid: 53173,
                advances: 282674,
                vblanks: 2,
            },
        ];
        assert_list_eq!(results, expected);
    }

    #[test]
    fn test_rs_sid_from_spots() {
        let results = rs_sid_from_feebas_seed(52548, 0xebf6, 0, 500_000);
        let expected = [FeebasSidResult {
            sid: 4132,
            advances: 90715,
            vblanks: 2,
        }];
        assert_list_eq!(results, expected);
    }
}
