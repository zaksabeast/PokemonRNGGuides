use super::roamers::{HgssRoamers, hgss_roamer_result};
use crate::rng::lcrng::Pokerng;
use serde::{Deserialize, Serialize};
use tsify::Tsify;
use wasm_bindgen::prelude::*;

#[derive(Debug, Clone, PartialEq, Tsify, Serialize, Deserialize, Copy)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub enum ElmCall {
    E,
    K,
    P,
}

impl ElmCall {
    fn from_rand(rand: u32) -> Self {
        match (rand >> 16) as u16 % 3 {
            0 => ElmCall::E,
            1 => ElmCall::K,
            _ => ElmCall::P,
        }
    }
}

pub(super) fn elm_calls(seed: u32, skip: usize, count: usize) -> Vec<ElmCall> {
    Pokerng::new(seed)
        .skip(skip)
        .take(count)
        .map(ElmCall::from_rand)
        .collect()
}

#[derive(Debug, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct ElmCallAdvanceOpts {
    pub seed: u32,
    pub initial_advances: usize,
    pub max_advances: usize,
}

#[derive(Debug, Clone, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct ElmCallAdvanceState {
    pub advance: usize,
    pub elm_call: ElmCall,
}

impl ElmCallAdvanceState {
    fn new(rand: u32, advance: usize) -> Self {
        Self {
            advance,
            elm_call: ElmCall::from_rand(rand),
        }
    }
}

#[derive(Debug, Clone, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct ElmCallResult {
    pub seed: u32,
    pub elm_calls: Vec<ElmCall>,
}

#[wasm_bindgen]
pub fn get_elm_calls(opts: &ElmCallAdvanceOpts) -> Vec<ElmCallAdvanceState> {
    Pokerng::new(opts.seed)
        .enumerate()
        .skip(opts.initial_advances)
        .take(opts.max_advances.wrapping_add(1))
        .map(|(advance, rand)| ElmCallAdvanceState::new(rand, advance))
        .collect()
}

#[derive(Debug, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct ElmCallsForSeedsOpts {
    pub seeds: Vec<u32>,
    pub count: usize,
    pub roamers: HgssRoamers,
}

#[wasm_bindgen]
pub fn elm_calls_for_seeds(opts: ElmCallsForSeedsOpts) -> Vec<ElmCallResult> {
    opts.seeds
        .iter()
        .map(|&seed| {
            let roamer_advances = hgss_roamer_result(seed, &opts.roamers).advances;
            ElmCallResult {
                seed,
                elm_calls: elm_calls(seed, roamer_advances, opts.count),
            }
        })
        .collect()
}

#[macro_export]
macro_rules! elm_calls {
    ($flips:expr) => {{
        let s = $flips;
        s.chars()
            .map(|c| match c {
                'E' => $crate::generators::gen4::seed_time::elm_call::ElmCall::E,
                'K' => $crate::generators::gen4::seed_time::elm_call::ElmCall::K,
                'P' => $crate::generators::gen4::seed_time::elm_call::ElmCall::P,
                _ => $crate::generators::gen4::seed_time::elm_call::ElmCall::E,
            })
            .collect::<Vec<$crate::generators::gen4::seed_time::elm_call::ElmCall>>()
    }};
}

#[cfg(test)]
mod test {
    use super::*;
    use crate::gen4::seed_time::roamers::JohtoRoamerRoute;

    #[test]
    fn no_roamers() {
        let opts = ElmCallsForSeedsOpts {
            seeds: vec![0],
            count: 2,
            roamers: HgssRoamers::default(),
        };
        let results = elm_calls_for_seeds(opts);
        assert_eq!(results[0].elm_calls, vec![ElmCall::E, ElmCall::P]);
    }

    #[test]
    fn skips_roamer_advances() {
        let opts = ElmCallsForSeedsOpts {
            seeds: vec![0],
            count: 2,
            roamers: HgssRoamers {
                raikou: Some(JohtoRoamerRoute::Route42),
                entei: None,
                lati: None,
            },
        };
        let results = elm_calls_for_seeds(opts);
        assert_eq!(results[0].elm_calls, vec![ElmCall::P, ElmCall::E]);
    }
}
