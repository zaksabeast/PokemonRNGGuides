use super::poke::{Poke, SpecialTrait, possible_special_trait};
use super::{Gen2PokeFilter, Gen2Spread};
use crate::rng::gameboy::{Div, GameboyRng, Offset};
use wasm_bindgen::prelude::*;

fn generate_starter_rands(
    rng: &GameboyRng,
    a_div_1_offset: Offset,
    s_div_1_offset: Offset,
    a_div_2_offset: Offset,
    s_div_2_offset: Offset,
) -> [[u8; 2]; 2] {
    let mut poke_rng = rng.clone();
    // Advance once for the A press
    poke_rng.next();
    let r_add_0 = poke_rng.r_add;
    let r_sub_0 = poke_rng.r_sub;
    // Get the normal rand[1] values
    poke_rng.next();
    let normal_a_div_1 = poke_rng.add_div.value();
    let normal_s_div_1 = poke_rng.sub_div.value();

    let poke_a_div_1 = normal_a_div_1.wrapping_mul(2).wrapping_add(10);
    let poke_a_div_1 = a_div_1_offset.apply(poke_a_div_1);

    let poke_s_div_1 = normal_s_div_1.wrapping_mul(2).wrapping_add(10);
    let poke_s_div_1 = s_div_1_offset.apply(poke_s_div_1);

    let poke_rand_1 = GameboyRng::advance_state(r_add_0, r_sub_0, poke_a_div_1, poke_s_div_1);

    let poke_s_div_2 = poke_s_div_1.wrapping_sub(normal_s_div_1);
    // TODO: Fix this
    let poke_a_div_2 = poke_s_div_2;

    let poke_s_div_2 = s_div_2_offset.apply(poke_s_div_2);
    let poke_a_div_2 = a_div_2_offset.apply(poke_a_div_2);

    let poke_rand_2 =
        GameboyRng::advance_state(poke_rand_1[0], poke_rand_1[1], poke_a_div_2, poke_s_div_2);

    [poke_rand_1, poke_rand_2]
}

fn potential_starters(rng: &GameboyRng) -> Vec<Poke> {
    let mut result = Vec::new();

    for a_div_1_offset in -1..=1 {
        for s_div_1_offset in -1..=1 {
            for a_div_2_offset in -1..=1 {
                for s_div_2_offset in -1..=1 {
                    let [[_, atkdef], [_, spespc]] = generate_starter_rands(
                        rng,
                        Offset::from_i8(a_div_1_offset),
                        Offset::from_i8(s_div_1_offset),
                        Offset::from_i8(a_div_2_offset),
                        Offset::from_i8(s_div_2_offset),
                    );

                    let poke = Poke::new(atkdef, spespc);
                    result.push(poke);
                }
            }
        }
    }

    result
}

fn has_potential_special_starter(rng: &GameboyRng) -> SpecialTrait {
    let pokes = potential_starters(rng);
    possible_special_trait(&pokes)
}

#[wasm_bindgen]
pub fn crystal_generate_starters(
    adiv: u8,
    sdiv: u8,
    adiv_index: usize,
    sdiv_index: usize,
    state: u16,
    start_advance: usize,
    end_advance: usize,
    filter: Gen2PokeFilter,
) -> Vec<Gen2Spread> {
    let add_div = Div::new(adiv_index, adiv);
    let sub_div = Div::new(sdiv_index, sdiv);
    let mut rng = GameboyRng::new(state, add_div, sub_div);
    let mut spreads = Vec::new();
    for advance in start_advance..=end_advance {
        let special_trait = has_potential_special_starter(&rng);
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
