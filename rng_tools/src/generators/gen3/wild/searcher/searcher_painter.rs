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

// Painting is only worth doing if wanted advances is >= 200_000.
// The value must be the same as the one in in UI files.
const DONT_USE_PAINTING_IF_BELOW_ADV: u32 = 200_000;

#[derive(Debug, Clone, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct Wild3PaintingAdvs {
    pub frame_before_painting: u32,
    pub adv_after_painting: u32,
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
pub fn find_painting_advs_for_seed(opts: &Wild3PaintingOpts, seed: u32) -> Vec<Wild3PaintingAdvs> {
    let wanted_advances = lcrng_distance(0, seed);
    let finder = Wild3PaintingAdvFinder::new(opts);
    finder
        .lookup_table
        .iter()
        .map(|candidate| Wild3PaintingAdvs {
            frame_before_painting: candidate.frame_before_painting,
            adv_after_painting: wanted_advances
                .wrapping_sub(candidate.adv_state_right_after_painting),
        })
        .collect()
}

#[wasm_bindgen]
pub fn find_fastest_painting_advs(
    opts: &Wild3PaintingOpts,
    wanted_advances: Vec<usize>,
) -> Vec<Wild3PaintingAdvs> {
    let finder = Wild3PaintingAdvFinder::new(opts);
    wanted_advances
        .into_iter()
        .map(|wanted_adv| finder.find_fastest_painting_adv(wanted_adv as u32))
        .collect_vec()
}

impl Wild3PaintingAdvFinder {
    pub fn new(opts: &Wild3PaintingOpts) -> Wild3PaintingAdvFinder {
        Wild3PaintingAdvFinder {
            opts: opts.clone(),
            lookup_table: create_lookup_painting_table(opts),
        }
    }
    pub fn find_fastest_painting_adv_from_seed(&self, wanted_seed: u32) -> Wild3PaintingAdvs {
        self.find_fastest_painting_adv(lcrng_distance(INITIAL_SEED, wanted_seed))
    }
    pub fn find_fastest_painting_adv(&self, wanted_adv: u32) -> Wild3PaintingAdvs {
        if wanted_adv >= self.opts.min_frame_before_painting
            && wanted_adv < DONT_USE_PAINTING_IF_BELOW_ADV
        {
            return Wild3PaintingAdvs {
                frame_before_painting: 0,
                adv_after_painting: wanted_adv,
            };
        }

        // Finds first element that is >= wanted_adv.
        let init_idx = self
            .lookup_table
            .partition_point(|el| el.min_adv_after_painting < wanted_adv);

        let mut current_best: Option<Wild3PaintingAdvs> = None;
        let mut current_score = 0xFFFF_FFFFu64;

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

            let additional_frame_before_painting =
                if candidate.frame_before_painting < self.opts.min_frame_before_painting {
                    // Not enough time to do painting. We need to wait until it overflows back to 0.
                    0x1_0000_0000u64
                } else {
                    0
                };

            // TODO centralize the score (time) to do painting
            let candidate_score_from_after =
                adv_after_painting as u64 / WAIT_IN_BATTLE_FOR_BATTLE_VIDEO_SPEEDUP;

            let candidate_score = (candidate.frame_before_painting as u64
                + additional_frame_before_painting)
                .saturating_mul(ATTEMPT_PER_PAINTING)
                + candidate_score_from_after;

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
                        let score_lower_bound_for_future_candidates = candidate_score_from_after;
                        if score_lower_bound_for_future_candidates > current_score {
                            break;
                        }
                    }
                }
            }
        }

        current_best.unwrap_or(Wild3PaintingAdvs {
            frame_before_painting: 0,
            adv_after_painting: wanted_adv,
        })
    }
}

pub fn evaluate_time_to_perform_painting(
    frame_before_painting: u64,
    adv_after_painting: u32,
) -> u64 {
    let candidate_score = (candidate.frame_before_painting as u64
        + additional_frame_before_painting)
        .saturating_mul(ATTEMPT_PER_PAINTING)
        + candidate_score_from_after;
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
    ) -> Wild3PaintingAdvs {
        let finder = Wild3PaintingAdvFinder::new(opts);
        let fastest = finder.find_fastest_painting_adv(wanted_adv);

        let resulting_adv = lcrng_distance(INITIAL_SEED, fastest.get_resulting_seed());
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
            Wild3PaintingAdvs {
                frame_before_painting: 0xae1c, // 44572
                adv_after_painting: 33604,
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
            Wild3PaintingAdvs {
                frame_before_painting: 0xfb9a, // 64410
                adv_after_painting: 35740,
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
            Wild3PaintingAdvs {
                frame_before_painting: 0,
                adv_after_painting: 10_000,
            }
        );

        assert_eq!(
            find_fastest_painting_adv_for_test(
                &Wild3PaintingOpts {
                    min_frame_before_painting: 10_001,
                    min_adv_after_painting: 0,
                },
                10_000
            ),
            Wild3PaintingAdvs {
                frame_before_painting: 24691,
                adv_after_painting: 9999,
            }
        );
    }
}
