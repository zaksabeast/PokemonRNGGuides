use crate::rng::Rng;
use crate::rng::tinymt::TinyMT;
use serde::{Deserialize, Serialize};
use tsify_next::Tsify;
use wasm_bindgen::prelude::*;

#[derive(Debug, Clone, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct Gen6Id {
    pub tid: u16,
    pub sid: u16,
    pub advances: u32,
    pub tinmt_state: [u32; 4],
}

impl Gen6Id {
    fn new(sidtid: u32, advances: u32, tinmt_state: [u32; 4]) -> Self {
        Self {
            sid: (sidtid >> 16) as u16,
            tid: sidtid as u16,
            advances,
            tinmt_state,
        }
    }
}

#[wasm_bindgen]
pub fn generate_gen6_id(seed: u32, min_advances: u32, max_advances: u32) -> Vec<Gen6Id> {
    let mut rng = TinyMT::new(seed);

    for _ in 0..min_advances {
        rng.next();
    }

    (min_advances..max_advances)
        .map(|advances| Gen6Id::new(rng.rand::<u32>(), advances, rng.get_state()))
        .collect()
}
