use crate::rng::Rng;
use crate::rng::lcrng::Pokerng;
use arrayvec::ArrayVec;
use serde::{Deserialize, Serialize};
use tsify::Tsify;
use wasm_bindgen::prelude::*;

/*
Definitions:
    Setup: Input for the generator (see Pokerus3GeneratorOptions). Ex: has_entered_hall_of_fame

    Setup quality: A setup is better than another if it's easiest to calibrate (more frequent items near target)
                   and has multiple advances resulting in pokerus.

    Generator: For a given setup, return the Pokerus result (item/pokerus given).

    There are 2 searchers (check pokerus_searcher.rs):
        - Calibration: For a given setup and filter, generate each outcome for all advances from the initial seed until max_advances.
        - Reverse: Find the best setup, for all (or a subset) of seeds. Can only be used to find seeds giving pokerus.
*/

const PICKUP_ITEM_CHANCE_RS: [u16; 11] = [30, 40, 50, 60, 70, 80, 90, 95, 99, 0xFFFF, 0xFFFF];
const PICKUP_ITEM_CHANCE_EMERALD: [u16; 11] = [30, 40, 50, 60, 70, 80, 90, 94, 98, 99, 0xFFFF];

pub type PickUpItem = i8;
pub const NO_ITEM: i8 = -1;

#[derive(Debug, Default, Clone, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct Pokerus3SearcherReverseOptions {}

#[derive(Debug, Default, Clone, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct Pokerus3GeneratorOptions {
    pub is_emerald_game: bool,
    pub entered_hall_of_fame: bool,
    pub can_have_new_mass_outbreak: bool,
    pub has_empty_pokenews_slot: bool,
    pub level_up: bool,
    pub pickup_pokemon_count: usize,
}

#[derive(Debug, Clone, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct Pokerus3GeneratorResult {
    pub seed_at_pickup: u32,
    #[serde(with = "crate::serde_utils::arrayvec::option")]
    pub pickup_items: Option<ArrayVec<PickUpItem, 6>>,
    pub gives_pokerus: bool,
    pub gives_item: bool,
}

// To improve performance of searcher_reverse, item ids are not calculated if WITH_ITEM_IDS is false.
pub fn gen3_pokerus_generate<const WITH_ITEM_IDS: bool>(
    mut rng: Pokerng,
    gen_opts: &Pokerus3GeneratorOptions,
) -> Pokerus3GeneratorResult {
    let initial_rng = rng.clone();

    let pickup_item_table = if gen_opts.is_emerald_game {
        &PICKUP_ITEM_CHANCE_EMERALD
    } else {
        &PICKUP_ITEM_CHANCE_RS
    };

    let (pickup_items, gives_item): (Option<ArrayVec<PickUpItem, 6>>, bool) = if WITH_ITEM_IDS {
        let mut gives_item = false;
        let pickup_items = Some(
            (0..gen_opts.pickup_pokemon_count)
                .map(|_| {
                    if rng.rand::<u16>() % 10 == 0 {
                        let chance = rng.rand::<u16>() % 100;

                        for (i, item) in pickup_item_table.iter().enumerate() {
                            if chance < *item {
                                gives_item = true;
                                return i as i8;
                            }
                        }
                        NO_ITEM // Error
                    } else {
                        NO_ITEM
                    }
                })
                .collect(),
        );

        (pickup_items, gives_item)
    } else {
        let mut gives_item = false;
        for _ in 0..gen_opts.pickup_pokemon_count {
            if rng.rand::<u16>() % 10 == 0 {
                rng.rand::<u16>();
                gives_item = true;
            }
        }
        (None, gives_item)
    };

    // vblanks between pickup and TV shows. Either 4 (~80% of the time) or 6 (~20%). The tool assumes 4.
    rng.jump_const::<4>();

    if gen_opts.entered_hall_of_fame {
        if gen_opts.has_empty_pokenews_slot {
            rng.rand::<u16>();
        }
        if gen_opts.can_have_new_mass_outbreak && rng.rand::<u16>() <= 0x147 {
            rng.rand::<u16>();
        }
    }
    rng.rand::<u16>(); // TV pokenew for not catching the Pokémon

    // vblanks between TV shows and Pokerus
    rng.jump_const::<74>();

    if gen_opts.level_up {
        rng.jump_const::<2>();
    }

    let pokerus_rng = rng.rand::<u16>();
    let gives_pokerus = pokerus_rng == 0x4000 || pokerus_rng == 0x8000 || pokerus_rng == 0xC000;

    Pokerus3GeneratorResult {
        seed_at_pickup: initial_rng.seed(),
        pickup_items,
        gives_item,
        gives_pokerus,
    }
}

pub fn get_min_max_advance_before_pickup(gen_opts: &Pokerus3GeneratorOptions) -> (usize, usize) {
    let mut min = 0usize;
    let mut max = 0usize;

    min += gen_opts.pickup_pokemon_count;
    max += gen_opts.pickup_pokemon_count * 2;

    min += 4;
    max += 4;

    if gen_opts.entered_hall_of_fame {
        if gen_opts.has_empty_pokenews_slot {
            min += 1;
            max += 1;
        }
        if gen_opts.can_have_new_mass_outbreak {
            min += 1;
            max += 2;
        }
    }
    min += 1;
    max += 1;

    min += 74;
    max += 74;

    if gen_opts.level_up {
        min += 2;
        max += 2;
    }

    // more or less 1 for safety
    min -= 1;
    max += 1;
    (min, max)
}
