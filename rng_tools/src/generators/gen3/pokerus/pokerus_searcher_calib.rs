use crate::gen3::pokerus::pokerus_generator::{
    PickUpItem, Pokerus3GeneratorOptions, Pokerus3GeneratorResult, gen3_pokerus_generate,
};

use crate::rng::StateIterator;
use crate::rng::lcrng::Pokerng;
use arrayvec::ArrayVec;
use serde::{Deserialize, Serialize};
use tsify::Tsify;
use wasm_bindgen::prelude::*;

// RS (dead battery) and emerald are supported.

pub const RS_INITIAL_SEED: u32 = 0x5a0;
pub const EMERALD_INITIAL_SEED: u32 = 0;

#[derive(Debug, Default, Clone, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct Pokerus3SearcherForCalibOptions {
    pub initial_advance_before_pickup: usize,
    pub max_advances: usize,
    pub gen_opts: Pokerus3GeneratorOptions,
    pub max_result_count: usize,
    #[serde(with = "crate::serde_utils::arrayvec::option")]
    pub filter_pickup_items: Option<ArrayVec<PickUpItem, 6>>,
    pub filter_gives_pokerus: Option<bool>,
}

#[wasm_bindgen]
pub fn gen3_pokerus_search_for_calib(
    opts: &Pokerus3SearcherForCalibOptions,
) -> Vec<Pokerus3GeneratorResult> {
    let initial_seed = if opts.gen_opts.is_emerald_game {
        EMERALD_INITIAL_SEED
    } else {
        RS_INITIAL_SEED
    };

    let rng = Pokerng::with_jump(initial_seed, opts.initial_advance_before_pickup);

    StateIterator::new(rng)
        .take(opts.max_advances.saturating_add(1))
        .filter_map(|rng| {
            let res = gen3_pokerus_generate::<true>(rng, &opts.gen_opts);

            if let Some(filter_gives_pokerus) = opts.filter_gives_pokerus {
                if filter_gives_pokerus != res.gives_pokerus {
                    return None;
                }
            }

            if let Some(filter_pickup_items) = &opts.filter_pickup_items {
                if *filter_pickup_items != *res.pickup_items.as_ref().unwrap() {
                    return None;
                }
            }

            Some(res)
        })
        .take(opts.max_result_count)
        .collect()
}
