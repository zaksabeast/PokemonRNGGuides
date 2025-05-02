use super::poke::{Poke, SpecialTrait, possible_special_trait};
use super::{Gen2PokeFilter, Gen2Spread, DivParams};
use crate::rng::gameboy::{Div, GameboyRng, Offset};
use wasm_bindgen::prelude::*;

fn generate_celebi_rands(rng: &GameboyRng, extra_consumed_rands: u8, div_off: u8) -> [[u8; 2]; 2] {
    let mut rng = rng.clone();

    for _ in 0..595 {
        rng.next();
    }

    let adiv_index = rng.add_div.index();
    let sdiv_index = rng.sub_div.index();

    rng.next_with_div_offset(Offset::Minus(0xc));

    for _ in 0..extra_consumed_rands {
        rng.next();
    }

    rng.next_with_div_inc(Offset::Plus(div_off));
    rng.add_div.set_index(adiv_index);
    rng.add_div.decrement_index(2);
    rng.sub_div.set_index(sdiv_index);
    rng.sub_div.decrement_index(2);

    for _ in 0..12 {
        rng.next();
    }

    rng.next_with_div_inc(Offset::Plus(0x6f));

    rng.add_div.set_index(0);
    rng.sub_div.set_index(3);

    let poke_rand_1 = rng.next_with_div_inc(Offset::Plus(0xc));
    let poke_rand_2 = rng.next_with_div_inc(Offset::Plus(0xe4));

    [poke_rand_1, poke_rand_2]
}

fn potential_celebis(rng: &GameboyRng) -> Vec<Poke> {
    let mut result = vec![];

    for extra_consumed_rands in [2, 3] {
        for div_off in [0xba, 0xbb] {
            let [[_, atkdef], [_, spespc]] =
                generate_celebi_rands(rng, extra_consumed_rands, div_off);
            let poke = Poke::new(atkdef, spespc);
            result.push(poke);
        }
    }

    result
}

fn has_potential_special_celebi(rng: &GameboyRng) -> SpecialTrait {
    let pokes = potential_celebis(rng);
    possible_special_trait(&pokes)
}

#[wasm_bindgen]
pub fn crystal_generate_celebi(
    config: DivParams,
    start_advance: usize,
    end_advance: usize,
    filter: Gen2PokeFilter,
) -> Vec<Gen2Spread> {
    let add_div = Div::new(adiv_index, adiv);
    let sub_div = Div::new(sdiv_index, sdiv);
    let mut rng = GameboyRng::new(state, add_div, sub_div);
    let mut spreads = Vec::new();
    for advance in start_advance..=end_advance {
        let special_trait = has_potential_special_celebi(&rng);
        if filter == special_trait {
            spreads.push(Gen2Spread {
                state: rng.state(),
                advance,
                shiny: special_trait == SpecialTrait::Shiny,
                max_dv: special_trait == SpecialTrait::MaxDv,
            });
        }
        rng.next();
    }

    spreads
}
