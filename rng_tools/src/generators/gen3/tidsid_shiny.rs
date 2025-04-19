
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
const MINIMAL_ADV:usize = 600;

#[wasm_bindgen]
pub fn gen3_earliest_shiny_starter_adv(seed:u32, tid:u16, sid:u16) -> usize {    
  for i in 0..100 {
    let initial_advances = std::cmp::max(i * 100_000, MINIMAL_ADV);
    let opts = Static3GeneratorOptions {
        offset: 0,
        initial_advances: initial_advances,
        max_advances: 100_000,
        seed,
        species: Species::Mudkip,
        bugged_roamer: false, // doesn't matter
        method4: false,
        tid,
        sid,
        filter: PkmFilter {
            shiny: true,
            nature: None,
            gender: None,
            ability: None,
            min_ivs: Ivs { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0, },            
            max_ivs: Ivs { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 },
            stats: None,
        },
    };

    let results = gen3_static_generator_states(&opts);

    if !results.is_empty() {
        return results[0].advance;
    }
  }
  // error
  0
}

pub fn gen3_advs_shiny_nearby_sids(seed:u32, tid:u16, tid_gen_adv:usize) -> Vec<usize> {
    let opts = Gen3TidSidOptions {
        version_options:Gen3TidSidVersionOptions::Frlge(FrlgeTidSidOptions { tid }),
        offset: 0, //NO_PROD 60?
        initial_advances: tid_gen_adv - MORE_LESS_ADV,
        max_advances: MORE_LESS_ADV * 2,
        filter: None,
    };
    let state = gen3_tidsid_states(&opts);

    state.iter().map(|r|{
        gen3_earliest_shiny_starter_adv(seed, tid, r.sid)
    }).collect()    
}

fn evaluate_avg_adv_for_probable_sids(earliest_shiny_advs:&Vec<usize>) -> usize {
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


pub fn gen3_earliest_shiny_starter_advs_all_tids(seed:u32, tid_gen_adv:usize) -> Vec<Vec<usize>> {
    let advs_all_tids:Vec<Vec<usize>> = (0..=0xFFFF).into_iter().map(|tid|{
        gen3_advs_shiny_nearby_sids(seed, tid, tid_gen_adv)
    }).collect();

    advs_all_tids
}

fn evaluate_avg_adv_for_all_tids(advs_by_tid:Vec<Vec<usize>>) -> usize {
    advs_by_tid.iter().map(|advs_for_tid|{
        evaluate_avg_adv_for_probable_sids(advs_for_tid)
    }).sum::<usize>() / advs_by_tid.len()
}

pub fn gen3_calculate_avg_adv_for_all_tids(seed:u32, tid_gen_adv:usize) -> usize {
    let advs = gen3_earliest_shiny_starter_advs_all_tids(seed, tid_gen_adv);
    evaluate_avg_adv_for_all_tids(advs) 
}


#[cfg(test)]
mod test {
    use super::*;
    use crate::assert_list_eq;

    #[test]
    fn generate_method4() {
        let avg = gen3_calculate_avg_adv_for_all_tids(0, 1000);
        println!("avg {}", avg);
        assert_eq!(true, false);
    }
}
