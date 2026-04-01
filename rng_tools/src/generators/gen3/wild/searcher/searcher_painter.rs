use serde::{Deserialize, Serialize};
use tsify_next::Tsify;
use wasm_bindgen::prelude::*;

use crate::{gen3::wild::lcrng_distance, rng::lcrng::Pokerng};
use itertools::Itertools;

// 1 frame wait before painting is worth 20 advances after painting.
// This assumes it takes in average 10 attempts to hit the target painting frame, and
// the player waits in battle (x2 speedup) for the advances after painting.
// For each painting manip, all frames must be waited. For pokemon encounter manip
// (after painting reseeding), battle video can be used so each attempt is constant (~30s).
pub const ATTEMPT_PER_PAINTING: u64 = 10;
pub const WAIT_IN_BATTLE_FOR_BATTLE_VIDEO_SPEEDUP: u64 = 2;

// The code currently only supports initial seed 0.
const INITIAL_SEED: u32 = 0u32;

#[derive(Debug, Clone, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct Wild3PaintingAdvs {
    pub frame_before_painting: u32,
    pub adv_after_painting: u32,
}

#[derive(Debug, Clone, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct Wild3PaintingAdvsAndDur {
    pub advs: Wild3PaintingAdvs,
    pub wait_dur: u32,
}

impl Wild3PaintingAdvs {
    pub fn get_resulting_seed(&self) -> u32 {
        let mut rng = Pokerng::new(self.frame_before_painting);
        rng.jump(self.adv_after_painting as usize);
        rng.seed()
    }
}

#[derive(Debug, Clone, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct Wild3PaintingOpts {
    /** only used to penalize the score of results requiring a counter overflow.
    Ex: Getting painting adv=5 actually requires 0x1_0000_0005 advances.
     */
    pub min_frame_before_painting: u32,
    pub min_adv_after_painting: u32,
}

#[derive(Debug)]
pub struct Wild3PaintingMinMaxAdvs {
    pub frame_before_painting: u32,
    pub adv_state_right_after_painting: u32,
    pub min_adv_after_painting: u32,
}

#[derive(Debug)]
pub struct Wild3PaintingAdvFinder {
    pub opts: Wild3PaintingOpts,
    pub lookup_table: Vec<Wild3PaintingMinMaxAdvs>,
}

#[wasm_bindgen]
pub fn find_all_painting_advs_for_seed(
    opts: &Wild3PaintingOpts,
    seed: u32,
) -> Vec<Wild3PaintingAdvsAndDur> {
    let wanted_advances = lcrng_distance(0, seed);
    let finder = Wild3PaintingAdvFinder::new(opts);
    finder
        .lookup_table
        .iter()
        .map(|candidate| {
            let adv_after_painting =
                wanted_advances.wrapping_sub(candidate.adv_state_right_after_painting);

            let wait_dur = if candidate.frame_before_painting == 0 {
                evaluate_dur_to_perform_battle_video(adv_after_painting)
            } else {
                evaluate_dur_to_perform_painting(
                    candidate.frame_before_painting,
                    adv_after_painting,
                )
            };
            Wild3PaintingAdvsAndDur {
                advs: Wild3PaintingAdvs {
                    frame_before_painting: candidate.frame_before_painting,
                    adv_after_painting,
                },
                wait_dur,
            }
        })
        .collect()
}

#[wasm_bindgen]
pub fn find_fastest_advs_considering_painting(
    opts: &Wild3PaintingOpts,
    wanted_advances: Vec<usize>,
) -> Vec<Wild3PaintingAdvsAndDur> {
    let finder = Wild3PaintingAdvFinder::new(opts);
    wanted_advances
        .into_iter()
        .map(|wanted_adv| finder.find_fastest_adv_considering_painting(wanted_adv as u32))
        .collect_vec()
}

impl Wild3PaintingAdvFinder {
    pub fn new(opts: &Wild3PaintingOpts) -> Wild3PaintingAdvFinder {
        Wild3PaintingAdvFinder {
            opts: opts.clone(),
            lookup_table: create_lookup_painting_table(opts),
        }
    }
    pub fn find_fastest_adv_considering_painting_from_seed(
        &self,
        wanted_seed: u32,
    ) -> Wild3PaintingAdvsAndDur {
        self.find_fastest_adv_considering_painting(lcrng_distance(INITIAL_SEED, wanted_seed))
    }
    pub fn find_fastest_adv_considering_painting(
        &self,
        wanted_adv: u32,
    ) -> Wild3PaintingAdvsAndDur {
        let best_paint = self.find_fastest_adv_with_painting(wanted_adv);

        let non_paint = Wild3PaintingAdvsAndDur {
            advs: Wild3PaintingAdvs {
                frame_before_painting: 0,
                adv_after_painting: wanted_adv,
            },
            wait_dur: evaluate_dur_to_perform_battle_video(wanted_adv),
        };

        match best_paint {
            None => non_paint,
            Some(best_paint) => {
                if best_paint.wait_dur < non_paint.wait_dur {
                    best_paint
                } else {
                    non_paint
                }
            }
        }
    }

    fn find_fastest_adv_with_painting(&self, wanted_adv: u32) -> Option<Wild3PaintingAdvsAndDur> {
        // Finds first element that is >= wanted_adv.
        let init_idx = self
            .lookup_table
            .partition_point(|el| el.min_adv_after_painting < wanted_adv);

        let mut current_best: Option<Wild3PaintingAdvs> = None;
        let mut current_score = 0xFFFF_FFFFu32;

        for dist in 1..=self.lookup_table.len() {
            let idx = if dist <= init_idx {
                init_idx - dist
            } else {
                (self.lookup_table.len() + init_idx) - dist // Wrap around
            };
            // for dist = 2 and len = 5, the order is: 1,0,4,3,2

            let candidate = &self.lookup_table[idx];
            let candidate_advs = Wild3PaintingAdvs {
                frame_before_painting: candidate.frame_before_painting,
                adv_after_painting: wanted_adv
                    .wrapping_sub(candidate.adv_state_right_after_painting),
            };
            let adv_after_painting =
                wanted_adv.wrapping_sub(candidate.adv_state_right_after_painting);

            if candidate.frame_before_painting < self.opts.min_frame_before_painting {
                continue;
            }

            let candidate_score = evaluate_dur_to_perform_painting(
                candidate.frame_before_painting,
                adv_after_painting,
            );

            match current_best {
                None => {
                    current_best = Some(candidate_advs);
                    current_score = candidate_score;
                }
                Some(_) => {
                    if candidate_score < current_score {
                        current_score = candidate_score;
                        current_best = Some(candidate_advs);
                    } else {
                        // All future candidates will have a higher adv_after_painting, but possibly
                        // a lower frame_before_painting.
                        // If even with the lowest possible frame_before_painting (0), the score is still worse,
                        // we can stop early.
                        let score_lower_bound_for_future_candidates =
                            evaluate_dur_to_perform_painting(0, adv_after_painting);
                        if score_lower_bound_for_future_candidates > current_score {
                            break;
                        }
                    }
                }
            }
        }

        current_best.map(|current_best| Wild3PaintingAdvsAndDur {
            advs: current_best,
            wait_dur: current_score,
        })
    }
}

#[wasm_bindgen]
pub fn evaluate_dur_to_perform_painting(
    frame_before_painting: u32,
    adv_after_painting: u32,
) -> u32 {
    const TIME_FOR_VALIDATING_PAINTING: u64 = 3600 * 5; // ~4.5 minutes to create battle video + catching high-level pokemon. +0.5 min buffer.
    let total_time_before =
        (frame_before_painting as u64 + TIME_FOR_VALIDATING_PAINTING) * ATTEMPT_PER_PAINTING;
    let total_time_after = adv_after_painting as u64 / 2; // assumes waiting in battle

    let ret_u64 = total_time_before + total_time_after;
    if ret_u64 > u32::MAX as u64 {
        u32::MAX
    } else {
        ret_u64 as u32
    }
}

#[wasm_bindgen]
pub fn evaluate_dur_to_perform_battle_video(adv_after_painting: u32) -> u32 {
    const TIME_FOR_CREATING_BATTLE_VIDEO: u32 = 3600 * 3; // ~3 minutes
    adv_after_painting / 2 + TIME_FOR_CREATING_BATTLE_VIDEO
}

pub fn create_lookup_painting_table(opts: &Wild3PaintingOpts) -> Vec<Wild3PaintingMinMaxAdvs> {
    let mut min_max_advs = (0..0x10000u32)
        .flat_map(|i| {
            let adv_state_right_after_painting = lcrng_distance(INITIAL_SEED, i);
            let min_adv_after_painting =
                adv_state_right_after_painting.wrapping_add(opts.min_adv_after_painting);

            vec![Wild3PaintingMinMaxAdvs {
                frame_before_painting: i,
                adv_state_right_after_painting,
                min_adv_after_painting,
            }]
        })
        .collect_vec();

    min_max_advs.sort_by(|a, b| a.min_adv_after_painting.cmp(&b.min_adv_after_painting));

    /*
    min_max_advs = {
        {frame_before_painting = 345, adv_state_right_after_painting = 678, min_adv_after_painting = 1678,
            This means reseeding after 345 advances will set the rng to (adv = 678), and it starts respecting min_adv_after_painting at (adv = 1678).
    }
    */

    min_max_advs
}

#[cfg(test)]
mod test {
    use super::*;

    pub fn find_fastest_painting_adv_for_test(
        opts: &Wild3PaintingOpts,
        wanted_adv: u32,
    ) -> Wild3PaintingAdvsAndDur {
        let finder = Wild3PaintingAdvFinder::new(opts);
        let fastest = finder.find_fastest_adv_considering_painting(wanted_adv);

        let resulting_adv = lcrng_distance(INITIAL_SEED, fastest.advs.get_resulting_seed());
        assert_eq!(resulting_adv, wanted_adv);

        return fastest;
    }

    #[test]
    fn test_find_fastest_painting_adv() {
        assert_eq!(
            find_fastest_painting_adv_for_test(
                &Wild3PaintingOpts {
                    min_frame_before_painting: 0,
                    min_adv_after_painting: 0,
                },
                lcrng_distance(0, 0x91291100) // 100_000_000
            ),
            Wild3PaintingAdvsAndDur {
                advs: Wild3PaintingAdvs {
                    frame_before_painting: 5625,
                    adv_after_painting: 168585,
                },
                wait_dur: 320542,
            }
        );

        assert_eq!(
            find_fastest_painting_adv_for_test(
                &Wild3PaintingOpts {
                    min_frame_before_painting: 0,
                    min_adv_after_painting: 1000,
                },
                lcrng_distance(0, 0x183C26F6) // 12345678
            ),
            Wild3PaintingAdvsAndDur {
                advs: Wild3PaintingAdvs {
                    frame_before_painting: 12467,
                    adv_after_painting: 381965,
                },
                wait_dur: 495652,
            }
        );

        assert_eq!(
            find_fastest_painting_adv_for_test(
                &Wild3PaintingOpts {
                    min_frame_before_painting: 0,
                    min_adv_after_painting: 0,
                },
                10_000
            ),
            Wild3PaintingAdvsAndDur {
                advs: Wild3PaintingAdvs {
                    frame_before_painting: 0,
                    adv_after_painting: 10_000,
                },
                wait_dur: 15800,
            }
        );

        assert_eq!(
            find_fastest_painting_adv_for_test(
                &Wild3PaintingOpts {
                    min_frame_before_painting: 0,
                    min_adv_after_painting: 0,
                },
                400_000
            ),
            Wild3PaintingAdvsAndDur {
                advs: Wild3PaintingAdvs {
                    frame_before_painting: 0,
                    adv_after_painting: 400000,
                },
                wait_dur: 210800,
            }
        );
    }
}
