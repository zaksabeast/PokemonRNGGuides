use crate::generators::gen4::swarm::{SwarmRoute, DPPT_ROUTES, HGSS_ROUTES};
use crate::rng::mt::MT;
use serde::{Deserialize, Serialize};
use tsify::Tsify;
use wasm_bindgen::prelude::*;

#[derive(Debug, Clone, Copy, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub enum SwarmGame {
    DPPT,
    HGSS,
}

//Input
#[derive(Debug, Clone, Copy, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct SwarmFinderOpts {
    pub seed: u32,
    pub min_advances: usize,
    pub max_advances: usize,
    pub wanted_route: SwarmRoute,
    pub game: SwarmGame,
}

//Output
#[derive(Debug, Clone, Copy, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct SwarmFinderResult {
    pub advance: usize,
    pub route: SwarmRoute,
}

//Filter the seed for desidered Pokémon. 
//If it is the desired one: include it in the result
#[wasm_bindgen]
pub fn find_swarm_advances(opts: SwarmFinderOpts) -> Vec<SwarmFinderResult> {
    let routes: &[SwarmRoute] = match opts.game {
        SwarmGame::DPPT => &DPPT_ROUTES,
        SwarmGame::HGSS => &HGSS_ROUTES,
    };

    let take = opts.max_advances.saturating_sub(opts.min_advances).wrapping_add(1);

    MT::new(opts.seed)
        .skip(opts.min_advances)
        .take(take)
        .enumerate()
        .filter_map(|(i, rand)| {
            let route = routes[(rand as usize) % routes.len()];
            if route == opts.wanted_route {
                Some(SwarmFinderResult {
                    advance: opts.min_advances + i,
                    route,
                })
            } else {
                None
            }
        })
        .collect()
}
