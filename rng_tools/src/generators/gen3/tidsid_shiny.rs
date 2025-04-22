use crate::generators::gen3::{FrlgeTidSidOptions, Gen3TidSidVersionOptions, Gen3TidSidOptions, gen3_tidsid_states};
use crate::rng::lcrng::Pokerng;
use crate::rng::Rng;
use serde::{Deserialize, Serialize};
use tsify_next::Tsify;
use wasm_bindgen::prelude::*;

/// Glossary
///   htsv: high-bits-trainer-shiny-value which is (TID xor SID) >> 3
///   tid_gen_adv: the number of advances for TID/SID generation for Gen3TidSidOptions (advance between selecting the player name, and entering the map)
///   nearby_sids: the list of possible SIDs given the tid_gen_adv and TID obtained, assuming the player hit near its target advance (within TIMING_DISTR / 2 advances).
///   earliest_shiny_adv: Given a TID and SID, the earliest advance to obtain a shiny starter with Method 1

/// TIMING_DISTR[index] is the probability that when trying to get advance X, the actual hit frame is X + 4 - index
/// ex: target is 1000, TIMING_DISTR is [4% chance that hit advance is 996, 8%: 997, 12%: 998, 16%: 999, 20%: 1000, 16%: 1001, 12%: 1002, 8%: 1003, 4%:1004]
const TIMING_DISTR:[f64;9] = {
    let unnormalized_distr:[usize;9] = [1,2,3,4,5,4,3,2,1];
    let mut normalized_distr:[f64;9] = [0f64;9];
    
    let mut sum:usize = 0;
    let mut i = 0;
    loop {
        sum += unnormalized_distr[i];
        i += 1;
        if i >= 9 { break; }
    }

    let mut i = 0;
    loop {
        normalized_distr[i] = unnormalized_distr[i] as f64 / sum as f64;
        i += 1;
        if i >= 9 { break; }
    }
    normalized_distr
};

const AVG_ATTEMPT_TO_HIT_TARGET:f64 = 1f64 / TIMING_DISTR[(TIMING_DISTR.len() - 1) / 2];

#[derive(Debug, Clone, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct Gen3TidSidShinyResult {
    pub avg_adv_to_determine_sid_percentile:u8,
    pub avg_adv_to_determine_sid:u32,
    pub nearby_sids:Vec<Gen3EarliestShinyForNearbySid>
}

#[derive(Debug, Clone, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct Gen3EarliestShinyForNearbySid {
    pub sid:u16,
    pub earliest_shiny_adv:u32,
}

/// Returns a vec associating each possible htsv with earliest shiny advance.
/// ex: vec[0b11] = 12345 means that for player with TID xor SID == 0b00000000_00011***, the earliest shiny advance is 12345
fn generate_earliest_shiny_advance_by_htsv(initial_seed: u32) -> Vec<u32> {
    const EARLIEST_VALID_ADVANCE: u32 = 600; // for RSE starter
    let mut earliest_adv_by_htsv = vec![0u32; 0x10000 >> 3];

    let mut unmatched_count: usize = earliest_adv_by_htsv.len();
    let mut pid_rng = Pokerng::new(initial_seed);
    pid_rng.advance((EARLIEST_VALID_ADVANCE) as usize);
    for pid_rng_adv in EARLIEST_VALID_ADVANCE..1_000_000 {
        // 1_000_000 to avoid infinite loop in case of bug
        let pid_high = pid_rng.rand::<u16>();
        let pid_low: u16 = pid_rng.clone().rand::<u16>();
        let tsv = pid_high ^ pid_low;
        let htsv = tsv >> 3;
        let old_value = earliest_adv_by_htsv[htsv as usize];
        if old_value != 0 {
            continue;
        } // another earlier advance exists

        earliest_adv_by_htsv[htsv as usize] = pid_rng_adv;
        unmatched_count -= 1;
        if unmatched_count == 0 {
            break;
        } // all were matched
    }

    earliest_adv_by_htsv
}

fn calculate_nearby_sids(tid_gen_adv:usize, tid:u16) -> Vec<u16> {
    let opts = Gen3TidSidOptions {
        version_options:Gen3TidSidVersionOptions::Frlge(FrlgeTidSidOptions { tid }),
        offset: 0, //NO_PROD
        initial_advances: tid_gen_adv - TIMING_DISTR.len() / 2,
        max_advances: TIMING_DISTR.len() - 1,
        filter: None,
    };
    
    gen3_tidsid_states(&opts).iter().map(|r|{
        r.sid
    }).collect()    
}

fn calculate_earliest_shiny_for_nearby_sids(earliest_shiny_advance_by_tsv:&Vec<u32>, tid_gen_adv:usize, tid:u16) -> Vec<Gen3EarliestShinyForNearbySid> {
    let nearby_sids = calculate_nearby_sids(tid_gen_adv, tid);

    nearby_sids.iter().map(|sid|{
        let htsv = (tid ^ sid) >> 3;
        let earliest_shiny_adv = earliest_shiny_advance_by_tsv[htsv as usize];
        Gen3EarliestShinyForNearbySid { 
            sid:*sid, 
            earliest_shiny_adv
        }
    }).collect()    
}

fn calculate_avg_adv_for_nearby_sids_prob_by_adv(earliest_shiny_advs:&Vec<u32>) -> Vec<(u32, f64)> {
    // It's possible that multiple sids share the same htsv, meaning both sids share
    // the same earliest_shiny_adv (ex: the earliest shiny for both sid 160 and sid 166 is advance 1234). 
    // In that case, by catching a pokemon on advance 1234, the player tests 2 sids at the same time, which is a lot faster.
    // I assume the player will attempt to do both sids simulatenously if their target advances are very close (+- 2 advances)
    const MERGE_MAX_DIFF:u32 = 2;
    let mut prob_by_adv:Vec<(u32, f64)> = vec![];
    for (i, adv1) in earliest_shiny_advs.iter().enumerate() {
        let prob1 = TIMING_DISTR[i];
        let merge_with = prob_by_adv.iter_mut().find(|(adv2, _prob2)|{
            adv2.abs_diff(*adv1) <= MERGE_MAX_DIFF
        });
        match merge_with {
            None => {
                prob_by_adv.push((*adv1, prob1));
            },
            Some(merge_with) => {
                merge_with.1 += prob1;
            }
        }
    }

    // Sort the sids to ensure fastest overall testing.
    // Attempting to hit the most probable sid is not necessarily the optimal testing approach.
    // ex:  SID 123 has 20% probability but earliest_shiny is 100k frames.
    //      SID 674 has 16% probability but earliest_shiny is 1k frames.
    //      It's more efficient to test SID 674 first.
    prob_by_adv.sort_by(|(adv1, prob1),(adv2, prob2)|{
        let rating1 = *prob1 / *adv1 as f64;
        let rating2 = *prob2 / *adv2 as f64;
        rating2.total_cmp(&rating1)
    });

    prob_by_adv
}

/// Returns in average, how long (in advances) it will take to determine their SID.
/// It assumes optimal planning and that in average, hitting a specific advance takes AVG_ATTEMPT_TO_HIT_TARGET attempts.
/// earliest_shiny_advs_by_nearby_sid[i] is earliest_shiny_advs for sid obtained from hitting (target tid_gen_adv - 4 + i)
/// earliest_shiny_advs_by_nearby_sid contains TIMING_DISTR elements
fn calculate_avg_adv_for_nearby_sids(earliest_shiny_advs_by_nearby_sid:&Vec<u32>) -> u32 {
    let prob_by_adv = calculate_avg_adv_for_nearby_sids_prob_by_adv(earliest_shiny_advs_by_nearby_sid);

    let mut avg_attempt_adv:f64 = 0f64;
    let mut remaining_prob = 1.0f64;
    for (adv, prob) in prob_by_adv {
        avg_attempt_adv += adv as f64 * AVG_ATTEMPT_TO_HIT_TARGET * remaining_prob;
        remaining_prob -= prob;
    }
    avg_attempt_adv as u32
}

/// Returns a Gen3TidSidShinyResult for each possible TID. Their percentile is not initialized yet.
fn calculate_tidsid_shiny_result_for_all_tids(seed:u32, tid_gen_adv:usize) -> Vec<Gen3TidSidShinyResult> {
    let earliest_shiny_advance_by_tsv = generate_earliest_shiny_advance_by_htsv(seed);

    (0..=0xFFFF).into_iter().map(|tid|{
        let nearby_sids = calculate_earliest_shiny_for_nearby_sids(&earliest_shiny_advance_by_tsv, tid_gen_adv, tid);
        let earliest_shiny_advs_by_nearby_sid = nearby_sids.iter().map(|r|{ r.earliest_shiny_adv }).collect();
        let avg_adv_to_determine_sid = calculate_avg_adv_for_nearby_sids(&earliest_shiny_advs_by_nearby_sid);
        Gen3TidSidShinyResult {
            avg_adv_to_determine_sid_percentile:0, // not init yet
            avg_adv_to_determine_sid,
            nearby_sids,
        }
    }).collect()
}

/// Main entry point. 
/// Given a seed (game), a tid_gen_adv which should ideally by 1505 (see find_best_tid_gen_adv), and the TID the player obtained in-game,
/// returns avg_adv_to_determine_sid which indicates approximately how many advance will be needed to determine their SID
/// and avg_adv_to_determine_sid_percentile which indicates how good avg_adv_to_determine_sid is compared to other TID
/// avg_adv_to_determine_sid_percentile can be used to determine if it's faster to reroll a new TID, or try to determine the SID for that TID
#[wasm_bindgen]
pub fn gen3_calculate_tidsid_shiny_for_tid(seed:u32, tid_gen_adv:usize, tid:u16) -> Gen3TidSidShinyResult {
    let res_by_tid = calculate_tidsid_shiny_result_for_all_tids(seed, tid_gen_adv);
    let mut res_for_tid = res_by_tid[tid as usize].clone();
    
    let mut worse_than_count:usize = 0;
    for res in res_by_tid.iter() {
        let is_worse = res_for_tid.avg_adv_to_determine_sid > res.avg_adv_to_determine_sid;
        if is_worse {
            worse_than_count += 1;
        }
    }
    res_for_tid.avg_adv_to_determine_sid_percentile = ((worse_than_count * 100) / res_by_tid.len()) as u8;
    res_for_tid
}

/// Returns the average advance needed to determine SID for a given tid_gen_adv, 
/// assuming all TID have same probability of occuring.
pub fn calculate_avg_adv_for_all_tids(seed:u32, tid_gen_adv:usize) -> u32 {
    let res_by_tid = calculate_tidsid_shiny_result_for_all_tids(seed, tid_gen_adv);
    let mut sum:usize = 0;
    let len = res_by_tid.len();
    for res in res_by_tid.iter() {
        sum += res.avg_adv_to_determine_sid as usize;
    }
    (sum / len) as u32
}

/// Returns find the tid_gen_adv that results in the lowest average advance needed to determine SID.
/// tid_gen_adv in range (900, 2000), best is (adv=1505, avg=124902) and worst is (adv=1987, avg=125744)
/// This means ideally, player should aim for tid_gen_adv 1505 to determine their SID faster.
pub fn find_best_tid_gen_adv(seed:u32, tid_gen_adv_min:usize, tid_gen_adv_max:usize) -> usize {
    let avg_adv_by_tid_gen_adv:Vec<u32> = (tid_gen_adv_min..=tid_gen_adv_max).map(|tid_gen_adv|{
        calculate_avg_adv_for_all_tids(seed, tid_gen_adv)
    }).collect();

    let mid = (TIMING_DISTR.len() - 1) / 2;
    let mut avg_adv_by_tid_gen_adv_with_nearby:Vec<(usize, u32)> = avg_adv_by_tid_gen_adv.iter().enumerate().map(|(i,_adv)|{
        let mut sum:f64 = 0f64;
        for (j, prob) in TIMING_DISTR.iter().enumerate() {
            let ideal_idx = i as i32 - mid as i32 + j as i32;
            let idx = if ideal_idx < 0 { 
                0 as usize
            } else if ideal_idx >= avg_adv_by_tid_gen_adv.len() as i32 { 
                avg_adv_by_tid_gen_adv.len() - 1
            } else {
                ideal_idx as usize
            };
            sum += avg_adv_by_tid_gen_adv[idx] as f64 * prob;
        }
        (i + tid_gen_adv_min, sum as u32)
    }).collect();

    avg_adv_by_tid_gen_adv_with_nearby.sort_by(|a,b|{
        a.1.cmp(&b.1)
    });

    avg_adv_by_tid_gen_adv_with_nearby[0].0
}

#[cfg(test)]
mod test {
    use super::*;
    use crate::assert_list_eq;

    #[test]
    fn all_tsv_have_non_zero_method_1_adv() {
        for initial_seed in vec![0u32, 0x5A0u32] {
            let earliest_adv_by_tsv = generate_earliest_shiny_advance_by_htsv(initial_seed);
            for tsv in 0..=(0xFFFFusize >> 3) {
                assert_ne!(earliest_adv_by_tsv[tsv], 0);
            }
        }
    }    

    #[test]
    fn test_generate_earliest_shiny_advance_by_htsv() {
        let earliest_adv_by_tsv = generate_earliest_shiny_advance_by_htsv(0);
        assert_eq!(earliest_adv_by_tsv[0 >> 3], 2763);
        assert_eq!(earliest_adv_by_tsv[8 >> 3], 9547);
        assert_eq!(earliest_adv_by_tsv[2568 >> 3], 811);
    }
    
    #[test]
    fn test_gen3_advs_shiny_nearby_sids() {
        let earliest_adv_by_tsv = generate_earliest_shiny_advance_by_htsv(0);
        let sids = calculate_earliest_shiny_for_nearby_sids(&earliest_adv_by_tsv, 1000, 0);
        assert_list_eq!(sids, vec![
            Gen3EarliestShinyForNearbySid { sid: 37330, earliest_shiny_adv: 2516 }, 
            Gen3EarliestShinyForNearbySid { sid: 48775, earliest_shiny_adv: 4604 }, 
            Gen3EarliestShinyForNearbySid { sid: 57250, earliest_shiny_adv: 1051 }, 
            Gen3EarliestShinyForNearbySid { sid: 44185, earliest_shiny_adv: 9979 }, 
            Gen3EarliestShinyForNearbySid { sid: 20917, earliest_shiny_adv: 10424 }, 
            Gen3EarliestShinyForNearbySid { sid: 4295, earliest_shiny_adv: 5805 }, 
            Gen3EarliestShinyForNearbySid { sid: 11292, earliest_shiny_adv: 2049 }, 
            Gen3EarliestShinyForNearbySid { sid: 43529, earliest_shiny_adv: 2282 }, 
            Gen3EarliestShinyForNearbySid { sid: 59237, earliest_shiny_adv: 4075 }, 
        ]);

        let sids = calculate_earliest_shiny_for_nearby_sids(&earliest_adv_by_tsv, 1000, 11);

        assert_list_eq!(sids, vec![
            Gen3EarliestShinyForNearbySid { sid: 28404, earliest_shiny_adv: 10961 }, 
            Gen3EarliestShinyForNearbySid { sid: 45158, earliest_shiny_adv: 8818 }, 
            Gen3EarliestShinyForNearbySid { sid: 53788, earliest_shiny_adv: 2062 }, 
            Gen3EarliestShinyForNearbySid { sid: 3217, earliest_shiny_adv: 14275 }, 
            Gen3EarliestShinyForNearbySid { sid: 54186, earliest_shiny_adv: 16714 },
            Gen3EarliestShinyForNearbySid { sid: 43398, earliest_shiny_adv: 3696 }, 
            Gen3EarliestShinyForNearbySid { sid: 13575, earliest_shiny_adv: 8984 }, 
            Gen3EarliestShinyForNearbySid { sid: 17283, earliest_shiny_adv: 39080 }, 
            Gen3EarliestShinyForNearbySid { sid: 17192, earliest_shiny_adv: 9176 }, 
        ]);
    }
    
    #[test]
    fn test_calculate_avg_adv_for_nearby_sids() {

        assert_list_eq!(calculate_avg_adv_for_nearby_sids_prob_by_adv(&vec![110,210,310,410,500,400,300,200,100]), vec![
            (500, 0.2), (400, 0.16), (200, 0.08), (100, 0.04), (300, 0.12), (410, 0.16), (310, 0.12), (210, 0.08), (110, 0.04)
        ]);
        
        assert_list_eq!(calculate_avg_adv_for_nearby_sids_prob_by_adv(&vec![110,200,310,410,500,400,300,200,100]), vec![
            (200, 0.16), (500, 0.2), (400, 0.16), (100, 0.04), (300, 0.12), (410, 0.16), (310, 0.12), (110, 0.04)
        ]);

        assert_eq!(calculate_avg_adv_for_nearby_sids(&vec![110,210,310,410,500,400,300,200,100]), 7140);
        assert_eq!(calculate_avg_adv_for_nearby_sids(&vec![110,200,310,410,500,400,300,200,100]), 6206);
        assert_eq!(calculate_avg_adv_for_nearby_sids(&vec![480,485,490,495,500,505,510,515,520]), 9480);
    }
    
    #[test]
    fn test_calculate_tidsid_shiny_for_tid() {
        let res = gen3_calculate_tidsid_shiny_for_tid(0, 1000, 11);
        assert_eq!(res.avg_adv_to_determine_sid, 177737);
        assert_eq!(res.avg_adv_to_determine_sid_percentile, 88);
        
        let res = gen3_calculate_tidsid_shiny_for_tid(0, 1000, 12);
        assert_eq!(res.avg_adv_to_determine_sid, 145510);
        assert_eq!(res.avg_adv_to_determine_sid_percentile, 72);
    }
}
