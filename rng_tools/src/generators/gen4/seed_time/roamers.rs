use crate::Species;
use crate::rng::Rng;
use crate::rng::lcrng::Pokerng;
use serde::{Deserialize, Serialize};
use tsify::Tsify;
use wasm_bindgen::prelude::*;

#[derive(Debug, Clone, PartialEq, Tsify, Serialize, Deserialize, Copy)]
pub struct RoamerLocation {
    pub roamer: Species,
    pub location: u16,
}

impl RoamerLocation {
    fn new(roamer: Species) -> Self {
        RoamerLocation {
            roamer,
            location: 0,
        }
    }
}

fn get_route_j(rand: u16) -> u16 {
    let roamer_rand = rand & 15;

    if roamer_rand < 11 {
        roamer_rand + 29
    } else {
        roamer_rand + 31
    }
}

fn get_route_k(rand: u16) -> u16 {
    let roamer_rand = rand % 25;

    match roamer_rand {
        22 => 24,
        23 => 26,
        24 => 28,
        _ => roamer_rand + 1,
    }
}

#[derive(Default, Debug, Clone, PartialEq, Tsify, Serialize, Deserialize, Copy)]
pub struct RoamerSet {
    pub entei: bool,
    pub raikou: bool,
    pub latios: bool,
    pub latias: bool,
}

// Todo: Remove after tool is built
#[allow(dead_code)]
fn roamer_check(seed: u32, roamer_opts: RoamerSet) -> Vec<RoamerLocation> {
    let mut rng = Pokerng::new(seed);
    let mut results = Vec::new();

    if roamer_opts.raikou {
        let mut roamer = RoamerLocation::new(Species::Raikou);
        roamer.location = get_route_j(rng.rand::<u16>());
        results.push(roamer)
    }
    if roamer_opts.entei {
        let mut roamer = RoamerLocation::new(Species::Entei);
        roamer.location = get_route_j(rng.rand::<u16>());
        results.push(roamer)
    }
    if roamer_opts.latios {
        let mut roamer = RoamerLocation::new(Species::Latios);
        roamer.location = get_route_k(rng.rand::<u16>());
        results.push(roamer)
    }
    if roamer_opts.latias {
        let mut roamer = RoamerLocation::new(Species::Latias);
        roamer.location = get_route_k(rng.rand::<u16>());
        results.push(roamer)
    }
    results
}
