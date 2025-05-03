use crate::generators::gen3::{
    FrlgeTidSidOptions, Gen3TidSidOptions, Gen3TidSidVersionOptions, gen3_tidsid_states,
};
use crate::rng::Rng;
use crate::rng::lcrng::Pokerng;
use crate::{gen3_psv, gen3_tsv};
use serde::{Deserialize, Serialize};
use tsify_next::Tsify;
use wasm_bindgen::prelude::*;

/// ---------------------------------------------------------------------------------------------------------------------------
/// Gist:
/// To determine SID, the player inputs the advances used for TID/SID generation (target_tid_gen_adv), and the obtained TID.
/// The output is the list of possible SIDs (nearby_sids).
/// To verify which of those possible SIDs is the correct one, the player attempts to obtain a shiny Pokemon for each SID,
/// by using Method 1 with the earliest advances to obtain a shiny starter (earliest_shiny_adv).
///
/// Optimization 1: The time to validate if a SID is the correct one is very variable (depending on earliest_shiny_adv).
/// In some cases, it is faster to generate a new TID and new list of possible SIDs, rather than testing the possible
/// SIDs of the first obtained TID.
///
/// Optimization 2: Using a target_tid_gen_adv that results in the smallest average time to determine the correct SID.
/// For Emerald, the ideal target_tid_gen_adv is 1410, with an averge time of 124902 advances to determine the correct SID.
/// ---------------------------------------------------------------------------------------------------------------------------

#[derive(Debug, Clone, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct Gen3TidSidShinyResult {
    pub tid: u16,
    pub avg_adv_to_determine_sid_percentile: u8,
    pub avg_adv_to_determine_sid: usize,
    pub nearby_sids: Vec<Gen3NearbySid>,
    pub avg_adv_to_improve_tid: usize,
    pub avg_adv_if_improved: usize,
    pub should_improve_tid: bool,
}

#[derive(Debug, Clone, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct Gen3NearbySid {
    pub tid_gen_adv: usize,
    pub sid: u16,
    pub earliest_shiny_adv: usize,
}

/// TIMING_DISTR[index] is the probability that when trying to get advance X, the actual hit frame is X + 4 - index
/// ex: target is 1000, TIMING_DISTR is [4% chance that hit advance is 996, 8%: 997, 12%: 998, 16%: 999, 20%: 1000, 16%: 1001, 12%: 1002, 8%: 1003, 4%:1004]
const TIMING_DISTR: [f64; 9] = {
    let unnormalized_distr: [usize; 9] = [1, 2, 3, 4, 5, 4, 3, 2, 1];
    let mut normalized_distr: [f64; 9] = [0f64; 9];

    let mut sum: usize = 0;
    let mut i = 0;
    loop {
        sum += unnormalized_distr[i];
        i += 1;
        if i >= 9 {
            break;
        }
    }

    let mut i = 0;
    loop {
        normalized_distr[i] = unnormalized_distr[i] as f64 / sum as f64;
        i += 1;
        if i >= 9 {
            break;
        }
    }
    normalized_distr
};

const EARLIEST_VALID_ADVANCE: usize = 650; // for RSE starter
/// AVG_ATTEMPT_TO_HIT_TARGET (5) is hardcoded in the shiny starter guide.
const AVG_ATTEMPT_TO_HIT_TARGET: f64 = 1f64 / TIMING_DISTR[(TIMING_DISTR.len() - 1) / 2];

/// Main entry point.
/// Given a seed (game), a target_tid_gen_adv, and the TID the player obtained in-game, returns avg_adv_to_determine_sid
/// which indicates approximately how many advance will be needed to determine their SID.
/// An avg_adv_to_determine_sid_percentile is also calculated which indicates how good avg_adv_to_determine_sid is
/// compared to the average case, and whether it's faster to reroll a new TID, or try to determine the SID for that TID
#[wasm_bindgen]
pub fn gen3_calculate_tidsid_shiny_for_tid(
    seed: u32,
    target_tid_gen_adv: usize,
    tid: u16,
) -> Gen3TidSidShinyResult {
    let earliest_shiny_advance_by_tsv = generate_earliest_shiny_advance_by_tsv(seed);
    let res_by_tid = calculate_tidsid_shiny_result_for_all_tids(
        &earliest_shiny_advance_by_tsv,
        target_tid_gen_adv,
    );
    let mut res_for_tid = res_by_tid[tid as usize].clone();

    res_for_tid.nearby_sids = sort_nearby_sids(&res_for_tid.nearby_sids);
    res_for_tid.nearby_sids = add_additional_nearby_sids(
        &res_for_tid.nearby_sids,
        &earliest_shiny_advance_by_tsv,
        target_tid_gen_adv,
        tid,
    );

    let mut better_tid_count: usize = 0;
    let mut sum_avg_adv_for_better_tid: usize = 0;
    for res in res_by_tid.iter() {
        let other_tid_if_better_than_current_tid =
            res.avg_adv_to_determine_sid < res_for_tid.avg_adv_to_determine_sid;
        if other_tid_if_better_than_current_tid {
            better_tid_count += 1;
            sum_avg_adv_for_better_tid += res.avg_adv_to_determine_sid;
        }
    }
    res_for_tid.avg_adv_to_determine_sid_percentile =
        ((better_tid_count * 100) / res_by_tid.len()) as u8;

    if better_tid_count == 0 {
        better_tid_count = 1;
    }

    const MIN_EXPECTED_IMPROV_FOR_RETRY: usize = 60 * 60 * 2; // expected improve must save at least 2 minutes
    const RETRY_OVERHEAD_ADV: usize = 1000;
    let adv_for_each_retry = target_tid_gen_adv + RETRY_OVERHEAD_ADV;
    let avg_retry_count_to_improve = 0x10000 / better_tid_count;

    let avg_avg_adv_for_better_tid = sum_avg_adv_for_better_tid / better_tid_count;

    res_for_tid.avg_adv_to_improve_tid = avg_retry_count_to_improve * adv_for_each_retry;
    res_for_tid.avg_adv_if_improved = avg_avg_adv_for_better_tid;
    // Approximatively, should_improve_tid is true if avg_adv_to_determine_sid_percentile >= 15
    res_for_tid.should_improve_tid = res_for_tid.avg_adv_to_improve_tid
        + res_for_tid.avg_adv_if_improved
        + MIN_EXPECTED_IMPROV_FOR_RETRY
        < res_for_tid.avg_adv_to_determine_sid;
    res_for_tid
}

#[wasm_bindgen]
pub fn gen3_earliest_shiny_starter_adv(initial_seed: u32, tid: u16, sid: u16) -> usize {
    generate_earliest_shiny_advance_by_tsv(initial_seed)[gen3_tsv(tid, sid) as usize]
}

/// Returns a vec associating each possible tsv with earliest shiny advance.
/// ex: vec[0b11] = 12345 means that for player with TSV == 0b11, the earliest shiny advance is 12345
fn generate_earliest_shiny_advance_by_tsv(initial_seed: u32) -> Vec<usize> {
    let mut earliest_adv_by_tsv = vec![0_usize; 0x10000 >> 3];

    let mut unmatched_count = earliest_adv_by_tsv.len();
    let mut pid_rng = Pokerng::new(initial_seed);
    pid_rng.advance(EARLIEST_VALID_ADVANCE);
    for pid_rng_adv in EARLIEST_VALID_ADVANCE..1_000_000_usize {
        // 1_000_000 to avoid infinite loop in case of bug
        let pid_high = pid_rng.rand::<u16>() as u32;
        let pid_low = pid_rng.clone().rand::<u16>() as u32;
        let tsv = gen3_psv((pid_high << 16) | pid_low);

        let old_value = earliest_adv_by_tsv[tsv as usize];

        if old_value != 0 {
            continue;
        } // another earlier advance exists

        earliest_adv_by_tsv[tsv as usize] = pid_rng_adv;
        unmatched_count -= 1;
        if unmatched_count == 0 {
            break;
        } // all were matched
    }

    earliest_adv_by_tsv
}

fn calculate_nearby_sids(target_tid_gen_adv: usize, tid: u16, count: usize) -> Vec<(u16, usize)> {
    let opts: Gen3TidSidOptions = Gen3TidSidOptions {
        version_options: Gen3TidSidVersionOptions::Frlge(FrlgeTidSidOptions { tid }),
        offset: 0, // target_tid_gen_adv includes advances from both offset and timer
        initial_advances: target_tid_gen_adv - count / 2,
        max_advances: count - 1,
        filter: None,
    };

    gen3_tidsid_states(&opts)
        .iter()
        .map(|r| (r.sid, r.advance))
        .collect()
}

fn calculate_earliest_shiny_for_nearby_sids(
    earliest_shiny_advance_by_tsv: &[usize],
    target_tid_gen_adv: usize,
    tid: u16,
    count: usize,
) -> Vec<Gen3NearbySid> {
    let nearby_sids = calculate_nearby_sids(target_tid_gen_adv, tid, count);

    nearby_sids
        .into_iter()
        .map(|(sid, tid_gen_adv)| {
            let tsv = gen3_tsv(tid, sid);
            let earliest_shiny_adv = earliest_shiny_advance_by_tsv[tsv as usize];
            Gen3NearbySid {
                tid_gen_adv,
                sid,
                earliest_shiny_adv,
            }
        })
        .collect()
}

const MERGE_MAX_DIFF_SHINY_EARLIEST_ADV: usize = 2;

struct AvgAdvNearbySids {
    pub earliest_shiny_adv: usize,
    pub probability: f64,
    pub nearby_sids: Vec<Gen3NearbySid>,
}

fn calculate_avg_adv_for_nearby_sids_prob_by_adv(
    nearby_sids: &[Gen3NearbySid],
) -> Vec<AvgAdvNearbySids> {
    // It's possible that multiple sids share the same tsv, meaning both sids share
    // the same earliest_shiny_adv (ex: the earliest shiny for both sid 160 and sid 166 is advance 1234).
    // In that case, by catching a pokemon on advance 1234, the player tests 2 sids at the same time, which is a lot faster.
    // I assume the player will attempt to do both sids simulatenously if their target advances are very close (+- 2 advances)
    let mut prob_by_adv: Vec<AvgAdvNearbySids> = vec![];
    for (i, nearby_sid) in nearby_sids.iter().enumerate() {
        let prob1 = TIMING_DISTR[i];
        let merge_with = prob_by_adv.iter_mut().find(|adv2| {
            adv2.earliest_shiny_adv
                .abs_diff(nearby_sid.earliest_shiny_adv)
                <= MERGE_MAX_DIFF_SHINY_EARLIEST_ADV
        });
        match merge_with {
            None => {
                prob_by_adv.push(AvgAdvNearbySids {
                    earliest_shiny_adv: nearby_sid.earliest_shiny_adv,
                    probability: prob1,
                    nearby_sids: vec![nearby_sid.clone()],
                });
            }
            Some(merge_with) => {
                merge_with.probability += prob1;
                merge_with.nearby_sids.push(nearby_sid.clone());
            }
        }
    }

    // Sort the sids to ensure fastest overall testing.
    // Attempting to hit the most probable sid is not necessarily the optimal testing approach.
    // ex:  SID 123 has 20% probability but earliest_shiny is 100k frames.
    //      SID 674 has 16% probability but earliest_shiny is 1k frames.
    //      It's more efficient to test SID 674 first.
    prob_by_adv.sort_by(|adv1, adv2| {
        let rating1 = adv1.probability / adv1.earliest_shiny_adv as f64;
        let rating2 = adv2.probability / adv2.earliest_shiny_adv as f64;
        rating2.total_cmp(&rating1)
    });

    prob_by_adv
}

/// Returns in average, how long (in advances) it will take to determine their SID.
/// It assumes optimal planning and that in average, hitting a specific advance takes AVG_ATTEMPT_TO_HIT_TARGET attempts.
/// earliest_shiny_advs_by_nearby_sid[i] is earliest_shiny_advs for sid obtained from hitting (target_tid_gen_adv - 4 + i)
/// earliest_shiny_advs_by_nearby_sid contains TIMING_DISTR elements
fn calculate_avg_adv_for_nearby_sids(nearby_sids: &[Gen3NearbySid]) -> usize {
    let prob_by_adv = calculate_avg_adv_for_nearby_sids_prob_by_adv(nearby_sids);

    let mut avg_attempt_adv: f64 = 0f64;
    let mut remaining_prob = 1.0f64;
    for adv in prob_by_adv {
        avg_attempt_adv +=
            adv.earliest_shiny_adv as f64 * AVG_ATTEMPT_TO_HIT_TARGET * remaining_prob;
        remaining_prob -= adv.probability;
    }
    avg_attempt_adv as usize
}

/// Returns a Gen3TidSidShinyResult for each possible TID. Their percentile is not initialized yet.
fn calculate_tidsid_shiny_result_for_all_tids(
    earliest_shiny_advance_by_tsv: &[usize],
    target_tid_gen_adv: usize,
) -> Vec<Gen3TidSidShinyResult> {
    (0..=0xFFFF)
        .map(|tid| {
            let nearby_sids = calculate_earliest_shiny_for_nearby_sids(
                earliest_shiny_advance_by_tsv,
                target_tid_gen_adv,
                tid,
                TIMING_DISTR.len(),
            );
            let avg_adv_to_determine_sid = calculate_avg_adv_for_nearby_sids(&nearby_sids);
            Gen3TidSidShinyResult {
                tid,
                avg_adv_to_determine_sid,
                nearby_sids,
                avg_adv_to_determine_sid_percentile: 0, // not init yet
                avg_adv_to_improve_tid: 0,
                avg_adv_if_improved: 0,
                should_improve_tid: false,
            }
        })
        .collect()
}

/// Sort nearby sids in the optimal order to minimize the advances to determine the correct SID
fn sort_nearby_sids(nearby_sids: &[Gen3NearbySid]) -> Vec<Gen3NearbySid> {
    let nearby_sids_by_priority_order = calculate_avg_adv_for_nearby_sids_prob_by_adv(nearby_sids);

    let mut res: Vec<Gen3NearbySid> = vec![];
    for priorized_nearby_sids in nearby_sids_by_priority_order {
        res.extend(priorized_nearby_sids.nearby_sids.into_iter());
    }
    res
}

fn add_additional_nearby_sids(
    nearby_sids: &[Gen3NearbySid],
    earliest_shiny_advance_by_tsv: &[usize],
    target_tid_gen_adv: usize,
    tid: u16,
) -> Vec<Gen3NearbySid> {
    let mut larger_nearby_sids = calculate_earliest_shiny_for_nearby_sids(
        earliest_shiny_advance_by_tsv,
        target_tid_gen_adv,
        tid,
        99,
    );
    larger_nearby_sids.sort_by(|ns1, ns2| {
        let diff1 = ns1.tid_gen_adv.abs_diff(target_tid_gen_adv);
        let diff2 = ns2.tid_gen_adv.abs_diff(target_tid_gen_adv);
        if diff1 != diff2 {
            diff1.cmp(&diff2)
        } else {
            ns1.tid_gen_adv.cmp(&ns2.tid_gen_adv)
        }
    });
    let mut nearby_sids = nearby_sids.to_vec();

    larger_nearby_sids.iter().for_each(|new_nearby_sid| {
        if !nearby_sids.iter().any(|ns| ns == new_nearby_sid) {
            nearby_sids.push(new_nearby_sid.clone());
        }
    });
    nearby_sids
}

/// Other entry point.
/// Returns find the tid_gen_adv that results in the lowest average advance needed to determine SID.
/// tid_gen_adv in range (900, 2000), best for emerald is tid_gen_adv=1410.
/// This means ideally, player should aim for tid_gen_adv 1410 to determine their SID faster.
/// To simplify the site, the result of the function (1410) is hardcoded in the shiny starter guide.
/// If the formula were to change, find_best_tid_gen_adv needs to be executed again to obtain the
/// new best tid_gen_adv.
#[allow(dead_code)]
fn find_best_tid_gen_adv(seed: u32, tid_gen_adv_min: usize, tid_gen_adv_max: usize) -> usize {
    let earliest_shiny_advance_by_tsv = generate_earliest_shiny_advance_by_tsv(seed);

    let avg_adv_by_tid_gen_adv: Vec<usize> = (tid_gen_adv_min..=tid_gen_adv_max)
        .map(|tid_gen_adv| {
            calculate_avg_adv_for_all_tids(&earliest_shiny_advance_by_tsv, tid_gen_adv)
        })
        .collect();

    let mid = (TIMING_DISTR.len() - 1) / 2;
    struct Advs {
        pub tidsid_adv: usize,
        pub method1_adv: usize,
    }
    let mut avg_adv_by_tid_gen_adv_with_nearby: Vec<Advs> = avg_adv_by_tid_gen_adv
        .iter()
        .enumerate()
        .map(|(i, _adv)| {
            let mut sum: f64 = 0f64;
            for (j, prob) in TIMING_DISTR.iter().enumerate() {
                let ideal_idx = i as i32 - mid as i32 + j as i32;
                let idx = if ideal_idx < 0 {
                    0
                } else if ideal_idx >= avg_adv_by_tid_gen_adv.len() as i32 {
                    avg_adv_by_tid_gen_adv.len() - 1
                } else {
                    ideal_idx as usize
                };
                sum += avg_adv_by_tid_gen_adv[idx] as f64 * prob;
            }
            Advs {
                tidsid_adv: i + tid_gen_adv_min,
                method1_adv: sum as usize,
            }
        })
        .collect();

    avg_adv_by_tid_gen_adv_with_nearby.sort_by(|a, b| a.method1_adv.cmp(&b.method1_adv));

    avg_adv_by_tid_gen_adv_with_nearby[0].tidsid_adv
}

/// Returns the average advance needed to determine SID for a given tid_gen_adv,
/// assuming all TID have same probability of occuring.
fn calculate_avg_adv_for_all_tids(
    earliest_shiny_advance_by_tsv: &[usize],
    tid_gen_adv: usize,
) -> usize {
    let res_by_tid =
        calculate_tidsid_shiny_result_for_all_tids(earliest_shiny_advance_by_tsv, tid_gen_adv);
    let mut sum: usize = 0;
    let len = res_by_tid.len();
    for res in res_by_tid.iter() {
        sum += res.avg_adv_to_determine_sid;
    }
    (sum / len) as usize
}

#[cfg(test)]
mod test {
    use super::*;
    use crate::assert_list_eq;

    #[test]
    fn all_tsv_have_non_zero_method_1_adv() {
        for initial_seed in [0u32, 0x5A0u32] {
            let earliest_adv_by_tsv = generate_earliest_shiny_advance_by_tsv(initial_seed);
            for tsv in 0..=(0xFFFFusize >> 3) {
                assert_ne!(earliest_adv_by_tsv[tsv], 0);
            }
        }
    }

    #[test]
    fn test_generate_earliest_shiny_advance_by_tsv() {
        let earliest_adv_by_tsv = generate_earliest_shiny_advance_by_tsv(0);
        assert_eq!(earliest_adv_by_tsv[0 >> 3], 2763);
        assert_eq!(earliest_adv_by_tsv[8 >> 3], 9547);
        assert_eq!(earliest_adv_by_tsv[2568 >> 3], 811);
    }

    #[test]
    fn test_gen3_advs_shiny_nearby_sids() {
        let earliest_adv_by_tsv = generate_earliest_shiny_advance_by_tsv(0);
        let sids = calculate_earliest_shiny_for_nearby_sids(
            &earliest_adv_by_tsv,
            1000,
            0,
            TIMING_DISTR.len(),
        );
        assert_list_eq!(
            sids,
            [
                Gen3NearbySid {
                    tid_gen_adv: 996,
                    sid: 37330,
                    earliest_shiny_adv: 2516
                },
                Gen3NearbySid {
                    tid_gen_adv: 997,
                    sid: 48775,
                    earliest_shiny_adv: 4604
                },
                Gen3NearbySid {
                    tid_gen_adv: 998,
                    sid: 57250,
                    earliest_shiny_adv: 1051
                },
                Gen3NearbySid {
                    tid_gen_adv: 999,
                    sid: 44185,
                    earliest_shiny_adv: 9979
                },
                Gen3NearbySid {
                    tid_gen_adv: 1000,
                    sid: 20917,
                    earliest_shiny_adv: 10424
                },
                Gen3NearbySid {
                    tid_gen_adv: 1001,
                    sid: 4295,
                    earliest_shiny_adv: 5805
                },
                Gen3NearbySid {
                    tid_gen_adv: 1002,
                    sid: 11292,
                    earliest_shiny_adv: 2049
                },
                Gen3NearbySid {
                    tid_gen_adv: 1003,
                    sid: 43529,
                    earliest_shiny_adv: 2282
                },
                Gen3NearbySid {
                    tid_gen_adv: 1004,
                    sid: 59237,
                    earliest_shiny_adv: 4075
                },
            ]
        );

        let sids = calculate_earliest_shiny_for_nearby_sids(
            &earliest_adv_by_tsv,
            1000,
            11,
            TIMING_DISTR.len(),
        );

        assert_list_eq!(
            sids,
            [
                Gen3NearbySid {
                    tid_gen_adv: 996,
                    sid: 28404,
                    earliest_shiny_adv: 10961
                },
                Gen3NearbySid {
                    tid_gen_adv: 997,
                    sid: 45158,
                    earliest_shiny_adv: 8818
                },
                Gen3NearbySid {
                    tid_gen_adv: 998,
                    sid: 53788,
                    earliest_shiny_adv: 2062
                },
                Gen3NearbySid {
                    tid_gen_adv: 999,
                    sid: 3217,
                    earliest_shiny_adv: 14275
                },
                Gen3NearbySid {
                    tid_gen_adv: 1000,
                    sid: 54186,
                    earliest_shiny_adv: 16714
                },
                Gen3NearbySid {
                    tid_gen_adv: 1001,
                    sid: 43398,
                    earliest_shiny_adv: 3696
                },
                Gen3NearbySid {
                    tid_gen_adv: 1002,
                    sid: 13575,
                    earliest_shiny_adv: 8984
                },
                Gen3NearbySid {
                    tid_gen_adv: 1003,
                    sid: 17283,
                    earliest_shiny_adv: 39080
                },
                Gen3NearbySid {
                    tid_gen_adv: 1004,
                    sid: 17192,
                    earliest_shiny_adv: 9176
                },
            ]
        );
    }

    #[test]
    fn test_calculate_avg_adv_for_nearby_sids() {
        fn to_nearby_sid(earliest_shiny_advs: &[usize]) -> Vec<Gen3NearbySid> {
            earliest_shiny_advs
                .into_iter()
                .map(|earliest_shiny_adv| Gen3NearbySid {
                    earliest_shiny_adv: *earliest_shiny_adv,
                    tid_gen_adv: 0,
                    sid: 0,
                })
                .collect()
        }

        fn calculate_avg_adv_for_nearby_sids_prob_by_adv_wrap(
            earliest_shiny_advs: &[usize],
        ) -> Vec<(usize, f64)> {
            calculate_avg_adv_for_nearby_sids_prob_by_adv(&to_nearby_sid(earliest_shiny_advs))
                .iter()
                .map(|res| (res.earliest_shiny_adv, res.probability))
                .collect()
        }
        assert_list_eq!(
            calculate_avg_adv_for_nearby_sids_prob_by_adv_wrap(&[
                110, 210, 310, 410, 500, 400, 300, 200, 100
            ]),
            [
                (500, 0.2),
                (400, 0.16),
                (200, 0.08),
                (100, 0.04),
                (300, 0.12),
                (410, 0.16),
                (310, 0.12),
                (210, 0.08),
                (110, 0.04)
            ]
        );

        assert_list_eq!(
            calculate_avg_adv_for_nearby_sids_prob_by_adv_wrap(&[
                110, 200, 310, 410, 500, 400, 300, 200, 100
            ]),
            [
                (200, 0.16),
                (500, 0.2),
                (400, 0.16),
                (100, 0.04),
                (300, 0.12),
                (410, 0.16),
                (310, 0.12),
                (110, 0.04)
            ]
        );

        assert_eq!(
            calculate_avg_adv_for_nearby_sids(&to_nearby_sid(&[
                110, 210, 310, 410, 500, 400, 300, 200, 100
            ])),
            7140
        );
        assert_eq!(
            calculate_avg_adv_for_nearby_sids(&to_nearby_sid(&[
                110, 200, 310, 410, 500, 400, 300, 200, 100
            ])),
            6206
        );
        assert_eq!(
            calculate_avg_adv_for_nearby_sids(&to_nearby_sid(&[
                480, 485, 490, 495, 500, 505, 510, 515, 520
            ])),
            9480
        );
    }

    #[test]
    fn test_calculate_tidsid_shiny_for_tid() {
        let res = gen3_calculate_tidsid_shiny_for_tid(0, 1000, 11);
        assert_eq!(res.avg_adv_to_determine_sid, 177737);
        assert_eq!(res.avg_adv_to_determine_sid_percentile, 87);
        assert_eq!(res.avg_adv_if_improved, 114441);
        assert_eq!(res.avg_adv_to_improve_tid, 2000);
        assert_eq!(res.should_improve_tid, true);

        let res = gen3_calculate_tidsid_shiny_for_tid(0, 1000, 13564);
        assert_eq!(res.avg_adv_to_determine_sid, 50563);
        assert_eq!(res.avg_adv_to_determine_sid_percentile, 0);
        assert_eq!(res.should_improve_tid, false);

        let res = gen3_calculate_tidsid_shiny_for_tid(0, 1000, 4);
        assert_eq!(res.avg_adv_to_determine_sid, 78367);
        assert_eq!(res.avg_adv_if_improved, 66135);
        assert_eq!(res.avg_adv_to_improve_tid, 16000);
        assert_eq!(res.should_improve_tid, false);
    }
}
