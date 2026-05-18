use crate::rng::mt::MT;
use serde::{Deserialize, Serialize};
use tsify::Tsify;
use wasm_bindgen::prelude::*;

#[derive(Debug, Clone, Copy, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub enum SwarmRoute {
    // dppt
    Route201,
    Route202,
    Route203,
    Route206,
    Route207,
    Route208,
    Route209,
    Route213,
    Route214,
    Route215,
    Route216,
    Route217,
    Route218,
    Route221,
    Route222,
    Route224,
    Route225,
    Route226,
    Route227,
    Route228,
    Route229,
    Route230,
    LakeVerity,
    LakeValor,
    LakeAcuity,
    ValleyWindworks,
    EternaForest,
    FuegoIronworks,

    // hgss
    Route1,
    Route3,
    Route9,
    Route12,
    Route13,
    Route19,
    Route32,
    Route25,
    Route27,
    Route34,
    Route35,
    Route38,
    Route44,
    Route45,
    Route47,
    MtMortar,
    DarkCave,
    ViridianForest,
    VermilionCity,
    VioletCity,
}

const DPPT_ROUTES: [SwarmRoute; 28] = [
    SwarmRoute::Route201,
    SwarmRoute::Route202,
    SwarmRoute::Route203,
    SwarmRoute::Route206,
    SwarmRoute::Route207,
    SwarmRoute::Route208,
    SwarmRoute::Route209,
    SwarmRoute::Route213,
    SwarmRoute::Route214,
    SwarmRoute::Route215,
    SwarmRoute::Route216,
    SwarmRoute::Route217,
    SwarmRoute::Route218,
    SwarmRoute::Route221,
    SwarmRoute::Route222,
    SwarmRoute::Route224,
    SwarmRoute::Route225,
    SwarmRoute::Route226,
    SwarmRoute::Route227,
    SwarmRoute::Route228,
    SwarmRoute::Route229,
    SwarmRoute::Route230,
    SwarmRoute::LakeVerity,
    SwarmRoute::LakeValor,
    SwarmRoute::LakeAcuity,
    SwarmRoute::ValleyWindworks,
    SwarmRoute::EternaForest,
    SwarmRoute::FuegoIronworks,
];

const HGSS_ROUTES: [SwarmRoute; 20] = [
    SwarmRoute::Route1,
    SwarmRoute::Route3,
    SwarmRoute::Route9,
    SwarmRoute::Route12,
    SwarmRoute::Route13,
    SwarmRoute::Route19,
    SwarmRoute::Route32,
    SwarmRoute::Route25,
    SwarmRoute::Route27,
    SwarmRoute::Route34,
    SwarmRoute::Route35,
    SwarmRoute::Route38,
    SwarmRoute::Route44,
    SwarmRoute::Route45,
    SwarmRoute::Route47,
    SwarmRoute::MtMortar,
    SwarmRoute::DarkCave,
    SwarmRoute::ViridianForest,
    SwarmRoute::VermilionCity,
    SwarmRoute::VioletCity,
];

#[derive(Debug, Clone, Copy, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub enum SwarmGame {
    DPPT,
    HGSS,
}

#[derive(Debug, Clone, Copy, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct SwarmOpts {
    pub seed: u32,
    pub min_advances: usize,
    pub max_advances: usize,
}

#[derive(Debug, Clone, Copy, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct SwarmEncounter {
    pub advance: usize,
    pub route: SwarmRoute,
}

#[derive(Debug, Clone, Copy, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct SwarmFinderOpts {
    pub seed: u32,
    pub min_advances: usize,
    pub max_advances: usize,
    pub wanted_route: Option<SwarmRoute>,
    pub game: SwarmGame,
}

fn get_routes(game: SwarmGame) -> &'static [SwarmRoute] {
    match game {
        SwarmGame::DPPT => &DPPT_ROUTES,
        SwarmGame::HGSS => &HGSS_ROUTES,
    }
}

fn generate_swarm(opts: &SwarmOpts, routes: &[SwarmRoute]) -> Vec<SwarmEncounter> {
    let take = opts
        .max_advances
        .saturating_sub(opts.min_advances)
        .wrapping_add(1);

    MT::new(opts.seed)
        .skip(opts.min_advances)
        .take(take)
        .enumerate()
        .map(|(i, rand)| {
            let route_index = (rand as usize) % routes.len();
            SwarmEncounter {
                advance: opts.min_advances + i,
                route: routes[route_index],
            }
        })
        .collect()
}

#[wasm_bindgen]
pub fn generate_hgss_swarm(opts: &SwarmOpts) -> Vec<SwarmEncounter> {
    generate_swarm(opts, &HGSS_ROUTES)
}

#[wasm_bindgen]
pub fn generate_dppt_swarm(opts: &SwarmOpts) -> Vec<SwarmEncounter> {
    generate_swarm(opts, &DPPT_ROUTES)
}

#[wasm_bindgen]
pub fn find_swarm_advances(opts: SwarmFinderOpts) -> Vec<SwarmEncounter> {
    let routes = get_routes(opts.game);
    let take = opts
        .max_advances
        .saturating_sub(opts.min_advances)
        .wrapping_add(1);

    MT::new(opts.seed)
        .skip(opts.min_advances)
        .take(take)
        .enumerate()
        .filter_map(|(i, rand)| {
            let route = routes[(rand as usize) % routes.len()];
            let res = SwarmEncounter {
                advance: opts.min_advances + i,
                route,
            };
            match opts.wanted_route {
                None => Some(res),
                Some(wanted) if wanted == route => Some(res),
                _ => None,
            }
        })
        .collect()
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::assert_list_eq;
    use SwarmRoute::*;

    #[test]
    fn hgss() {
        let opts = SwarmOpts {
            seed: 0xabcd,
            min_advances: 10,
            max_advances: 20,
        };
        let results = generate_hgss_swarm(&opts);
        let expected = [
            Route1, Route34, Route13, MtMortar, Route1, Route12, DarkCave, VioletCity, Route47,
            Route9, MtMortar,
        ]
        .iter()
        .enumerate()
        .map(|(i, &route)| SwarmEncounter {
            advance: opts.min_advances + i,
            route,
        })
        .collect::<Vec<SwarmEncounter>>();
        assert_list_eq!(results, expected);
    }

    #[test]
    fn dppt() {
        let opts = SwarmOpts {
            seed: 0xabcd,
            min_advances: 10,
            max_advances: 20,
        };
        let results = generate_dppt_swarm(&opts);
        let expected = [
            Route218, Route221, Route214, Route228, Route225, Route228, Route225, Route217,
            Route203, Route216, Route213,
        ]
        .iter()
        .enumerate()
        .map(|(i, &route)| SwarmEncounter {
            advance: opts.min_advances + i,
            route,
        })
        .collect::<Vec<SwarmEncounter>>();
        assert_list_eq!(results, expected);
    }

    #[test]
    fn find_swarm_advances_unfiltered_dppt() {
        let opts = SwarmFinderOpts {
            seed: 0xabcd,
            min_advances: 10,
            max_advances: 20,
            wanted_route: None,
            game: SwarmGame::DPPT,
        };
        let results = find_swarm_advances(opts);
        let expected = [
            Route218, Route221, Route214, Route228, Route225, Route228, Route225, Route217,
            Route203, Route216, Route213,
        ]
        .iter()
        .enumerate()
        .map(|(i, &route)| SwarmEncounter {
            advance: opts.min_advances + i,
            route,
        })
        .collect::<Vec<SwarmEncounter>>();
        assert_list_eq!(results, expected);
    }

    #[test]
    fn find_swarm_advances_unfiltered_hgss() {
        let opts = SwarmFinderOpts {
            seed: 0xabcd,
            min_advances: 10,
            max_advances: 20,
            wanted_route: None,
            game: SwarmGame::HGSS,
        };
        let results = find_swarm_advances(opts);
        let expected = [
            Route1, Route34, Route13, MtMortar, Route1, Route12, DarkCave, VioletCity, Route47,
            Route9, MtMortar,
        ]
        .iter()
        .enumerate()
        .map(|(i, &route)| SwarmEncounter {
            advance: opts.min_advances + i,
            route,
        })
        .collect::<Vec<SwarmEncounter>>();
        assert_list_eq!(results, expected);
    }

    #[test]
    fn find_swarm_advances_filtered() {
        let opts = SwarmFinderOpts {
            seed: 0xabcd,
            min_advances: 10,
            max_advances: 20,
            wanted_route: Some(Route1),
            game: SwarmGame::HGSS,
        };
        let results = find_swarm_advances(opts);
        let expected = [
            SwarmEncounter { advance: 10, route: Route1 },
            SwarmEncounter { advance: 14, route: Route1 },
        ];
        assert_list_eq!(results, expected);
    }
}
