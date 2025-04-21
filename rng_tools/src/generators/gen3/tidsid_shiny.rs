
/*

input tid + target
    get adv earliest shiny advance for +- 5 frames

    + average score, normal distrib

input target
    for each tid, get score
    get average score
    

for each target,
    find best average score

*/

use crate::generators::gen3::{FrlgeTidSidOptions, Gen3TidSidVersionOptions, Gen3TidSidOptions, gen3_tidsid_states};
use crate::rng::lcrng::{Pokerng};
use crate::rng::{Rng};
use itertools::Itertools;
use serde::{Deserialize, Serialize};
use tsify_next::Tsify;
use wasm_bindgen::prelude::*;

// https://docs.rs/const_for/latest/src/const_for/const_for.rs.html#5-71
macro_rules! const_for {
    ($var:pat_param in ($range:expr).step_by($step:expr) => $body:stmt) => {
        {
            let _: usize = $step;
            let mut __ite = $range.start;
            let __end = $range.end;
            let mut __is_first = true;
            let __step = $step;

            loop {
                if !__is_first {
                    __ite += __step
                }
                __is_first = false;

                let $var = __ite;

                if __ite >= __end {
                    break
                }

                $body
            }
        }
    };

    ($var:pat_param in ($range:expr).rev().step_by($step:expr) => $body:stmt) => {
        {
            let _: usize = $step;
            let mut __ite = $range.end;
            let __start = $range.start;
            let mut __is_first = true;
            let __step = $step;

            loop {
                if !__is_first {
                    if __step + __start >= __ite {
                        break
                    }
                    __ite -= __step
                }
                __is_first = false;

                if __ite <= __start {
                    break
                }

                // cannot underflow as __ite > __start
                let $var = __ite - 1;

                $body
            }
        }
    };

    ($var:pat_param in ($range:expr).rev() => $body:stmt) => {
        const_for!($var in ($range).rev().step_by(1) => $body)
    };

    ($var:pat_param in ($range:expr).step_by($step:expr).rev() => $body:stmt) => {
        const_for!($var in ($range.start..$range.end - ($range.end - $range.start - 1) % $step).rev().step_by($step) => $body)
    };

    ($var:pat_param in $range:expr => $body:stmt) => {
        const_for!($var in ($range).step_by(1) => $body)
    };
}

/** 
 * TIMING_DISTR[index] is the probability that when trying to get advance X, the actual frame is X + 4 - index
 * ex: target is 1000, TIMING_DISTR is [4% chance that hit advance is 996, 997=8%, 998=12%, 999=16%, 1000=20%, 1001=16%, 1002=12%, 1003=8%, 1004=4%]
 */
const TIMING_DISTR:[f64;9] = {
    let unnormalized_distr:[usize;9] = [1,2,3,4,5,4,3,2,1];
    let mut normalized_distr:[f64;9] = [0f64;9];
    
    let mut sum:usize = 0;
    const_for!(i in 0..9 => {
        sum += unnormalized_distr[i];
    });
    const_for!(i in 0..9 => {
        normalized_distr[i] = unnormalized_distr[i] as f64 / sum as f64;
    });
    normalized_distr
};

const AVG_ATTEMPT_TO_HIT_TARGET:f64 = 1f64 / TIMING_DISTR[(TIMING_DISTR.len() - 1) / 2];

#[derive(Debug, Clone, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct Gen3TidSidShinyResult {
    pub percentile:u8,
    pub avg_adv_for_tid:u32,
    pub sids:Vec<Gen3TidSidShinyResultPart>
}

#[derive(Debug, Clone, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct Gen3TidSidShinyResultPart {
    pub sid:u16,
    pub earliest_shiny_adv:u32,
}

fn generate_earliest_shiny_advance_by_high_tsv(initial_seed: u32) -> Vec<u32> {
    const EARLIEST_VALID_ADVANCE: u32 = 600; // for RSE starter
    let mut earliest_adv_by_high_tsv = vec![0u32; 0x10000 / 8];

    let mut unmatched_count: usize = earliest_adv_by_high_tsv.len();
    let mut pid_rng = Pokerng::new(initial_seed);
    pid_rng.advance((EARLIEST_VALID_ADVANCE) as usize);
    for pid_rng_adv in EARLIEST_VALID_ADVANCE..1_000_000 {
        // 1_000_000 to avoid infinite loop in case of bug
        let pid_high = pid_rng.rand::<u16>();
        let pid_low: u16 = pid_rng.clone().rand::<u16>();
        let tsv = pid_high ^ pid_low;
        let high_tsv = tsv >> 3;
        let old_value = earliest_adv_by_high_tsv[high_tsv as usize];
        if old_value != 0 {
            continue;
        } // another earlier advance exists

        earliest_adv_by_high_tsv[high_tsv as usize] = pid_rng_adv;
        unmatched_count -= 1;
        if unmatched_count == 0 {
            break;
        } // all were matched
    }

    earliest_adv_by_high_tsv
}

fn gen3_advs_shiny_nearby_sids(earliest_shiny_advance_by_tsv:&Vec<u32>, tid:u16, tid_gen_adv:usize) -> Vec<Gen3TidSidShinyResultPart> {
    let opts = Gen3TidSidOptions {
        version_options:Gen3TidSidVersionOptions::Frlge(FrlgeTidSidOptions { tid }),
        offset: 0, //NO_PROD 60?
        initial_advances: tid_gen_adv - TIMING_DISTR.len() / 2,
        max_advances: TIMING_DISTR.len() - 1,
        filter: None,
    };
    let state = gen3_tidsid_states(&opts);

    state.iter().map(|r|{
        let high_tsv = (tid ^ r.sid) >> 3;
        let earliest_shiny_adv = earliest_shiny_advance_by_tsv[high_tsv as usize];
        Gen3TidSidShinyResultPart { 
            sid: r.sid, earliest_shiny_adv
        }
    }).collect()    
}

fn calculate_avg_adv_for_probable_sids_prob_by_adv(earliest_shiny_advs:&Vec<u32>) -> Vec<(u32, f64)> {
    // It's possible that multiple sids share the same high_tsv, meaning both sids share
    // the same earliest_shiny_adv (ex: the earliest shiny for both sid 145 and sid 547 is advance 1234). 
    // In that case, by catching a pokemon on advance 1234, the player tests 2 sids at the same time, which is a lot faster.
    // I assume the player will attempt to do both sids if their target advances are very close (+- 2 advances)
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
/**
 * Returns in average, how long (in advances) it will take to determine their SID.
 * It assumes optimal planning and that in average, hitting a specific advance takes AVG_ATTEMPT_TO_HIT_TARGET attempts.
 * */
fn calculate_avg_adv_for_probable_sids(earliest_shiny_advs:&Vec<u32>) -> u32 {
    let prob_by_adv = calculate_avg_adv_for_probable_sids_prob_by_adv(earliest_shiny_advs);


    let mut avg_attempt_adv:f64 = 0f64;
    let mut remaining_prob = 1.0f64;
    for (adv, prob) in prob_by_adv {
        avg_attempt_adv += adv as f64 * AVG_ATTEMPT_TO_HIT_TARGET * remaining_prob;
        remaining_prob -= prob;
    }
    avg_attempt_adv as u32
}

fn gen3_earliest_shiny_starter_advs_all_tids(earliest_shiny_advance_by_tsv:&Vec<u32>, tid_gen_adv:usize) -> Vec<Vec<Gen3TidSidShinyResultPart>> {
    let advs_all_tids:Vec<Vec<Gen3TidSidShinyResultPart>> = (0..=0xFFFF).into_iter().map(|tid|{
        gen3_advs_shiny_nearby_sids(earliest_shiny_advance_by_tsv, tid, tid_gen_adv)
    }).collect();

    advs_all_tids
}

fn calculate_avg_adv_for_all_sids(seed:u32, tid_gen_adv:usize) -> (Vec<Vec<Gen3TidSidShinyResultPart>>, Vec<u32>) {
    let earliest_shiny_advance_by_tsv = generate_earliest_shiny_advance_by_high_tsv(seed);
    let advs_by_tid = gen3_earliest_shiny_starter_advs_all_tids(&earliest_shiny_advance_by_tsv, tid_gen_adv);

    let avg_adv_by_tid:Vec<u32> = advs_by_tid.iter().map(|advs_for_tid|{
        calculate_avg_adv_for_probable_sids(&advs_for_tid.iter().map(|r|{ r.earliest_shiny_adv }).collect())
    }).collect();

    (advs_by_tid, avg_adv_by_tid)
}

#[wasm_bindgen]
pub fn gen3_calculate_tidsid_shiny_for_tid(seed:u32, tid:u16, tid_gen_adv:usize) -> Gen3TidSidShinyResult {
    let (advs_by_tid, avg_adv_by_tid) = calculate_avg_adv_for_all_sids(seed, tid_gen_adv);

    let sorted_avg_adv_by_tid:Vec<u32> = avg_adv_by_tid.clone().into_iter().sorted().collect();
    
    let avg_adv_for_tid = avg_adv_by_tid[tid as usize];

    let res = sorted_avg_adv_by_tid.binary_search_by(|r|{
        r.cmp(&avg_adv_for_tid)   
    });

    let idx = res.unwrap();
    let percentile = (idx * 100) / sorted_avg_adv_by_tid.len();
    
    Gen3TidSidShinyResult {
        percentile:percentile as u8,
        avg_adv_for_tid:avg_adv_for_tid,
        sids:advs_by_tid[tid as usize].clone(),
    }
}

#[cfg(test)]
mod test {
    use super::*;
    use crate::assert_list_eq;


    #[test]
    fn all_tsv_have_non_zero_method_1_adv() {
        for initial_seed in vec![0u32, 0x5A0u32] {
            let earliest_adv_by_tsv = generate_earliest_shiny_advance_by_high_tsv(initial_seed);
            for tsv in 0..=(0xFFFFusize/8) {
                assert_ne!(earliest_adv_by_tsv[tsv], 0);
            }
        }
    }

    

    #[test]
    fn test_generate_earliest_shiny_advance_by_high_tsv() {
        let earliest_adv_by_tsv = generate_earliest_shiny_advance_by_high_tsv(0);
        assert_eq!(earliest_adv_by_tsv[0/8], 2763);
        assert_eq!(earliest_adv_by_tsv[8/8], 9547);
        assert_eq!(earliest_adv_by_tsv[2568/8], 811);
    }

    
    #[test]
    fn test_gen3_advs_shiny_nearby_sids() {
        let earliest_adv_by_tsv = generate_earliest_shiny_advance_by_high_tsv(0);
        let sids = gen3_advs_shiny_nearby_sids(&earliest_adv_by_tsv, 0, 1000);
        assert_list_eq!(sids, vec![
            Gen3TidSidShinyResultPart { sid: 41072, earliest_shiny_adv: 1132 }, 
            Gen3TidSidShinyResultPart { sid: 37330, earliest_shiny_adv: 2516 }, 
            Gen3TidSidShinyResultPart { sid: 48775, earliest_shiny_adv: 4604 }, 
            Gen3TidSidShinyResultPart { sid: 57250, earliest_shiny_adv: 1051 }, 
            Gen3TidSidShinyResultPart { sid: 44185, earliest_shiny_adv: 9979 }, 
            Gen3TidSidShinyResultPart { sid: 20917, earliest_shiny_adv: 10424 }, 
            Gen3TidSidShinyResultPart { sid: 4295, earliest_shiny_adv: 5805 }, 
            Gen3TidSidShinyResultPart { sid: 11292, earliest_shiny_adv: 2049 }, 
            Gen3TidSidShinyResultPart { sid: 43529, earliest_shiny_adv: 2282 }, 
            Gen3TidSidShinyResultPart { sid: 59237, earliest_shiny_adv: 4075 }, 
            Gen3TidSidShinyResultPart { sid: 6451, earliest_shiny_adv: 4137 },
        ]);

        let sids = gen3_advs_shiny_nearby_sids(&earliest_adv_by_tsv, 11, 1000);

        assert_list_eq!(sids, vec![
            Gen3TidSidShinyResultPart { sid: 60533, earliest_shiny_adv: 12233 }, 
            Gen3TidSidShinyResultPart { sid: 28404, earliest_shiny_adv: 10961 }, 
            Gen3TidSidShinyResultPart { sid: 45158, earliest_shiny_adv: 8818 }, 
            Gen3TidSidShinyResultPart { sid: 53788, earliest_shiny_adv: 2062 }, 
            Gen3TidSidShinyResultPart { sid: 3217, earliest_shiny_adv: 14275 }, 
            Gen3TidSidShinyResultPart { sid: 54186, earliest_shiny_adv: 16714 },
            Gen3TidSidShinyResultPart { sid: 43398, earliest_shiny_adv: 3696 }, 
            Gen3TidSidShinyResultPart { sid: 13575, earliest_shiny_adv: 8984 }, 
            Gen3TidSidShinyResultPart { sid: 17283, earliest_shiny_adv: 39080 }, 
            Gen3TidSidShinyResultPart { sid: 17192, earliest_shiny_adv: 9176 }, 
            Gen3TidSidShinyResultPart { sid: 57488, earliest_shiny_adv: 27667 }
        ]);
    }
    
    #[test]
    fn test_calculate_avg_adv_for_probable_sids() {

        assert_list_eq!(calculate_avg_adv_for_probable_sids_prob_by_adv(&vec![110,210,310,410,500,400,300,200,100]), vec![
            (500, 0.2), (400, 0.16), (200, 0.08), (100, 0.04), (300, 0.12), (410, 0.16), (310, 0.12), (210, 0.08), (110, 0.04)
        ]);
        
        assert_list_eq!(calculate_avg_adv_for_probable_sids_prob_by_adv(&vec![110,200,310,410,500,400,300,200,100]), vec![
            (200, 0.16), (500, 0.2), (400, 0.16), (100, 0.04), (300, 0.12), (410, 0.16), (310, 0.12), (110, 0.04)
        ]);

        assert_eq!(calculate_avg_adv_for_probable_sids(&vec![110,210,310,410,500,400,300,200,100]), 7140);
        assert_eq!(calculate_avg_adv_for_probable_sids(&vec![110,200,310,410,500,400,300,200,100]), 6206);
        assert_eq!(calculate_avg_adv_for_probable_sids(&vec![480,485,490,495,500,505,510,515,520]), 9480);

    }
    

    #[test]
    fn test_calculate_tidsid_shiny_for_tid() {
        let res = gen3_calculate_tidsid_shiny_for_tid(0, 11, 1000);
        assert_eq!(res.avg_adv_for_tid, 177737);
        assert_eq!(res.percentile, 88);
        
        let res = gen3_calculate_tidsid_shiny_for_tid(0, 12, 1000);
        assert_eq!(res.avg_adv_for_tid, 145510);
        assert_eq!(res.percentile, 72);

        //println!("{:?}", res);
        //assert_eq!(true, false);

        /*
        tid = 11, sid: 17283, earliest_shiny_adv: 39080 
            
        
        let earliest_shiny_advance_by_tsv = generate_earliest_shiny_advance_by_high_tsv(0);

        for tid_gen_adv in 950..1050 {
            let avg = gen3_calculate_avg_adv_for_all_tids(&earliest_shiny_advance_by_tsv, tid_gen_adv);
            println!("tid_gen_adv = {}, avg = {}", tid_gen_adv, avg);
        }
        assert_eq!(true, false);*/
    }
}
