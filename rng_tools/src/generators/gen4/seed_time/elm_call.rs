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

fn get_elm_calls(seed: u32, count: usize) -> Vec<ElmCall> {
    Pokerng::new(seed)
        .take(count)
        .map(|rand| match (rand >> 16) as u16 % 3 {
            0 => ElmCall::E,
            1 => ElmCall::K,
            _ => ElmCall::P,
        })
        .collect()
}

#[derive(Debug, Clone, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct ElmCallResult {
    pub seed: u32,
    pub elm_calls: Vec<ElmCall>,
}

#[wasm_bindgen]
pub fn elm_calls_for_seeds(seeds: &[u32], count: usize) -> Vec<ElmCallResult> {
    seeds
        .iter()
        .map(|&seed| ElmCallResult {
            seed,
            elm_calls: get_elm_calls(seed, count),
        })
        .collect()
}

#[macro_export]
macro_rules! elm_calls {
    ($flips:expr) => {{
        let s = $flips;
        s.chars()
            .map(|c| match c {
                'E' => $crate::generators::gen4::seed_time::ElmCall::E,
                'K' => $crate::generators::gen4::seed_time::ElmCall::K,
                'P' => $crate::generators::gen4::seed_time::ElmCall::P,
                _ => $crate::generators::gen4::seed_time::ElmCall::E,
            })
            .collect::<Vec<$crate::generators::gen4::seed_time::ElmCall>>()
    }};
}