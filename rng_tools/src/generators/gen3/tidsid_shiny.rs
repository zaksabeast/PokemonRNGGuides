
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

pub fn gen3_advs_shiny_nearby_sids(earliest_shiny_advance_by_tsv:&Vec<u32>, tid:u16, tid_gen_adv:usize) -> Vec<u32> {
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
        earliest_shiny_advance_by_tsv[high_tsv as usize]
    }).collect()    
}

fn evaluate_avg_adv_for_probable_sids(earliest_shiny_advs:&Vec<u32>) -> usize {
    if earliest_shiny_advs.is_empty() {
        return 0;
    }

    let mid = (earliest_shiny_advs.len() - 1) / 2; // ex: +- 5.   0,1,2,3,4,5,6,7,8,9,10
    let pond_not_normalized:Vec<usize> = (0..earliest_shiny_advs.len()).map(|i|{
        let dist_to_mid = if i > mid { i - mid } else { mid - i };
        mid + 1 - dist_to_mid
    }).collect();

    let pond_sum:usize = pond_not_normalized.iter().sum();
    let pond:Vec<f64> = pond_not_normalized.into_iter().map(|p|{
        (p as f64) / (pond_sum as f64)
    }).collect();

    let pondered_scores:Vec<f64> = earliest_shiny_advs.into_iter().enumerate().map(|(i,adv)|{
        (*adv as f64) * pond[i]
    }).collect();

    pondered_scores.iter().sum::<f64>() as usize
}


pub fn gen3_earliest_shiny_starter_advs_all_tids(earliest_shiny_advance_by_tsv:&Vec<u32>, tid_gen_adv:usize) -> Vec<Vec<u32>> {
    let advs_all_tids:Vec<Vec<u32>> = (0..=0xFFFF).into_iter().map(|tid|{
        gen3_advs_shiny_nearby_sids(earliest_shiny_advance_by_tsv, tid, tid_gen_adv)
    }).collect();

    advs_all_tids
}

fn evaluate_avg_adv_for_all_tids(advs_by_tid:Vec<Vec<u32>>) -> u32 {
    let sum = advs_by_tid.iter().map(|advs_for_tid|{
        evaluate_avg_adv_for_probable_sids(advs_for_tid) as usize
    }).sum::<usize>();
    return (sum / advs_by_tid.len()) as u32
}

pub fn gen3_calculate_avg_adv_for_all_tids(earliest_shiny_advance_by_tsv:&Vec<u32>, tid_gen_adv:usize) -> u32 {
    let advs = gen3_earliest_shiny_starter_advs_all_tids(earliest_shiny_advance_by_tsv, tid_gen_adv);
    evaluate_avg_adv_for_all_tids(advs) 
}


#[cfg(test)]
mod test {
    use super::*;
    use crate::assert_list_eq;

    #[test]
    fn calculate_avg_adv_for_all_tids() {
        let earliest_shiny_advance_by_tsv = generate_earliest_shiny_advance_by_high_tsv(0);

        for tid_gen_adv in 950..1050 {
            let avg = gen3_calculate_avg_adv_for_all_tids(&earliest_shiny_advance_by_tsv, tid_gen_adv);
            println!("tid_gen_adv = {}, avg = {}", tid_gen_adv, avg);
        }
        assert_eq!(true, false);
    }
}
