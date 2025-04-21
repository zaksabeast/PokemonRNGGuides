
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

use crate::generators::gen3::seed::calc_seed;
use crate::generators::gen3::{Static3GeneratorOptions,gen3_static_generator_states, FrlgeTidSidOptions, Gen3TidSidVersionOptions, Gen3TidSidOptions, gen3_tidsid_states};
use crate::rng::lcrng::{Pokerng, Xdrng};
use crate::rng::{Rng, StateIterator};
use crate::{IdFilter, RngDateTime, Ivs, PkmFilter, Species, };
use itertools::Itertools;
use serde::{Deserialize, Serialize};
use tsify_next::Tsify;
use wasm_bindgen::prelude::*;

const MORE_LESS_ADV:usize = 5;

#[derive(Debug, Clone, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct Gen3TidSidShinyResult {
    pub percentile:u8,
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
        initial_advances: tid_gen_adv - MORE_LESS_ADV,
        max_advances: MORE_LESS_ADV * 2,
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

fn evaluate_avg_adv_for_probable_sids(earliest_shiny_advs:&Vec<Gen3TidSidShinyResultPart>) -> u32 {
    if earliest_shiny_advs.is_empty() {
        return 0;
    }

    let filtered_earliest_shiny_advs:Vec<Gen3TidSidShinyResultPart> = earliest_shiny_advs.iter().enumerate().filter_map(|(i, adv)|{
        let to_remove = earliest_shiny_advs.iter().skip(i + 1).any(|adv2|{
            if adv.earliest_shiny_adv >= adv2.earliest_shiny_adv { 
                adv.earliest_shiny_adv < adv2.earliest_shiny_adv + MORE_LESS_ADV as u32 
            } else {
                adv2.earliest_shiny_adv < adv.earliest_shiny_adv + MORE_LESS_ADV as u32
            } 
        });
        if to_remove {
            None
        } else {
            Some(adv.clone())
        }
    }).collect();

    let mid = (filtered_earliest_shiny_advs.len() - 1) / 2; // ex: +- 5.   0,1,2,3,4,5,6,7,8,9,10
    let pond_not_normalized:Vec<usize> = (0..filtered_earliest_shiny_advs.len()).map(|i|{
        let dist_to_mid = if i > mid { i - mid } else { mid - i };
        mid + 1 - dist_to_mid
    }).collect();

    let pond_sum:usize = pond_not_normalized.iter().sum();
    let pond:Vec<f64> = pond_not_normalized.into_iter().map(|p|{
        (p as f64) / (pond_sum as f64)
    }).collect();

    let pondered_scores:Vec<f64> = filtered_earliest_shiny_advs.into_iter().enumerate().map(|(i,adv)|{
        (adv.earliest_shiny_adv as f64) * pond[i]
    }).collect();

    pondered_scores.iter().sum::<f64>() as u32
}


fn gen3_earliest_shiny_starter_advs_all_tids(earliest_shiny_advance_by_tsv:&Vec<u32>, tid_gen_adv:usize) -> Vec<Vec<Gen3TidSidShinyResultPart>> {
    let advs_all_tids:Vec<Vec<Gen3TidSidShinyResultPart>> = (0..=0xFFFF).into_iter().map(|tid|{
        gen3_advs_shiny_nearby_sids(earliest_shiny_advance_by_tsv, tid, tid_gen_adv)
    }).collect();

    advs_all_tids
}


#[wasm_bindgen]
pub fn gen3_calculate_tidsid_shiny_for_tid(seed:u32, tid:u16, tid_gen_adv:usize) -> Gen3TidSidShinyResult {
    let earliest_shiny_advance_by_tsv = generate_earliest_shiny_advance_by_high_tsv(seed);
    let advs_by_tid = gen3_earliest_shiny_starter_advs_all_tids(&earliest_shiny_advance_by_tsv, tid_gen_adv);

    let ratings:Vec<u32> = advs_by_tid.iter().map(|advs_for_tid|{
        evaluate_avg_adv_for_probable_sids(advs_for_tid)
    }).collect();

    let rating_for_tid = ratings[tid as usize];

    let sorted_ratings:Vec<u32> = ratings.into_iter().sorted().collect();
    let res = sorted_ratings.binary_search_by(|r|{
        r.cmp(&rating_for_tid)   
    });

    let idx = res.unwrap();
    let percentile = (idx * 100) / sorted_ratings.len();
    //gen3_advs_shiny_nearby_sids(
    
    Gen3TidSidShinyResult {
        percentile:percentile as u8,
        sids:advs_by_tid[tid as usize].clone(),
    }
}

#[cfg(test)]
mod test {
    use super::*;
    use crate::assert_list_eq;



    //NO_PROD add test, let earliest_shiny_advance_by_tsv = generate_earliest_shiny_advance_by_high_tsv(seed);
    // seems wrong. different than pokefinder for  tid = 11, sid: 17283,  xor=17288 -> high_tsv=2161

    #[test]
    fn calculate_avg_adv_for_all_tids() {
        
        //assert_eq!(0xE373 ^ 0xA02F, 0);  // 17244 -> high_tsv 2155
        //assert_eq!(11 ^ 17283, 0); // 17288 -> high_tsv=2161
         
        for tid_gen_adv in 0..12 {
            let res = gen3_calculate_tidsid_shiny_for_tid(0, tid_gen_adv, 1000);
            println!("tid = {}, percentile = {:?}", tid_gen_adv, res.percentile);
        }
        assert_eq!(1, 0);
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
