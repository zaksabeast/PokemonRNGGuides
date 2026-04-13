use crate::rng::lcrng::Pokerng;
use serde::{Deserialize, Serialize};
use tsify::Tsify;
use wasm_bindgen::prelude::*;

#[derive(Debug, Clone, PartialEq, Tsify, Serialize, Deserialize, Copy)]
pub enum ElmCall {
    E,
    K,
    P,
}

// Todo: Remove after tool is built
#[allow(dead_code)]
fn get_elm_calls(seed: u32) -> Vec<ElmCall> {
    Pokerng::new(seed)
        .take(20)
        .map(|rand| match (rand >> 16) as u16 % 3 {
            0 => ElmCall::E,
            1 => ElmCall::K,
            _ => ElmCall::P,
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
                _ => $crate::generators::gen4::seed_time::ElmCall::E, // Default to E for invalid characters
            })
            .collect::<Vec<$crate::generators::gen4::seed_time::ElmCall>>()
    }};
}
