use crate::rng::gameboy::{Div, GameboyRng};
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub struct Gen2RngState {
    pub rand: u16,
    pub advance: usize,
    pub add_div: u8,
    pub sub_div: u8,
}

#[wasm_bindgen]
pub fn gen2_generate_rng_states(
    adiv: u8,
    sdiv: u8,
    adiv_index: usize,
    sdiv_index: usize,
    state: u16,
    start_advance: usize,
    end_advance: usize,
) -> Vec<Gen2RngState> {
    let adiv = Div::new(adiv_index, adiv);
    let sdiv = Div::new(sdiv_index, sdiv);
    let mut rng = GameboyRng::new(state, adiv, sdiv);
    ((start_advance + 1)..end_advance)
        .map(|advance| {
            let rand = rng.next_u16();
            Gen2RngState {
                rand,
                advance,
                add_div: rng.adiv(),
                sub_div: rng.sdiv(),
            }
        })
        .collect()
}
