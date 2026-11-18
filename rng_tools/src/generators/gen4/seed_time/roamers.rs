use crate::rng::Rng;
use crate::rng::lcrng::Pokerng;
use serde::{Deserialize, Serialize};
use tsify::Tsify;
use wasm_bindgen::prelude::*;

#[derive(Default, Debug, Clone, Copy, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct HgssRoamers {
    pub raikou: Option<JohtoRoamerRoute>,
    pub entei: Option<JohtoRoamerRoute>,
    pub lati: Option<KantoRoamerRoute>,
}

#[derive(Default, Debug, Clone, Copy, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct HgssRoamerResult {
    pub raikou: Option<JohtoRoamerRoute>,
    pub entei: Option<JohtoRoamerRoute>,
    pub lati: Option<KantoRoamerRoute>,
    pub advances: usize,
}

#[derive(Debug, Clone, Copy, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub enum JohtoRoamerRoute {
    Route29,
    Route30,
    Route31,
    Route32,
    Route33,
    Route34,
    Route35,
    Route36,
    Route37,
    Route38,
    Route39,
    Route42,
    Route43,
    Route44,
    Route45,
    Route46,
}

impl JohtoRoamerRoute {
    const ALL: [Self; 16] = [
        Self::Route29,
        Self::Route30,
        Self::Route31,
        Self::Route32,
        Self::Route33,
        Self::Route34,
        Self::Route35,
        Self::Route36,
        Self::Route37,
        Self::Route38,
        Self::Route39,
        Self::Route42,
        Self::Route43,
        Self::Route44,
        Self::Route45,
        Self::Route46,
    ];

    fn from_rand(rand: u16) -> Self {
        Self::ALL[(rand & 15) as usize]
    }
}

#[derive(Debug, Clone, Copy, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub enum KantoRoamerRoute {
    Route1,
    Route2,
    Route3,
    Route4,
    Route5,
    Route6,
    Route7,
    Route8,
    Route9,
    Route10,
    Route11,
    Route12,
    Route13,
    Route14,
    Route15,
    Route16,
    Route17,
    Route18,
    Route19,
    Route20,
    Route21,
    Route22,
    Route24,
    Route26,
    Route28,
}

impl KantoRoamerRoute {
    const ALL: [Self; 25] = [
        Self::Route1,
        Self::Route2,
        Self::Route3,
        Self::Route4,
        Self::Route5,
        Self::Route6,
        Self::Route7,
        Self::Route8,
        Self::Route9,
        Self::Route10,
        Self::Route11,
        Self::Route12,
        Self::Route13,
        Self::Route14,
        Self::Route15,
        Self::Route16,
        Self::Route17,
        Self::Route18,
        Self::Route19,
        Self::Route20,
        Self::Route21,
        Self::Route22,
        Self::Route24,
        Self::Route26,
        Self::Route28,
    ];

    fn from_rand(rand: u16) -> Self {
        Self::ALL[(rand % 25) as usize]
    }
}

fn next_route<Route: Copy + PartialEq>(
    rng: &mut Pokerng,
    advances: &mut usize,
    previous_route: Option<Route>,
    get_route: fn(u16) -> Route,
) -> Option<Route> {
    let previous_route = previous_route?;

    loop {
        *advances += 1;
        let route = get_route(rng.rand::<u16>());
        if route != previous_route {
            return Some(route);
        }
    }
}

pub fn hgss_roamer_result(seed: u32, roamers: &HgssRoamers) -> HgssRoamerResult {
    let mut rng = Pokerng::new(seed);
    let mut advances = 0;

    let raikou = next_route(
        &mut rng,
        &mut advances,
        roamers.raikou,
        JohtoRoamerRoute::from_rand,
    );
    let entei = next_route(
        &mut rng,
        &mut advances,
        roamers.entei,
        JohtoRoamerRoute::from_rand,
    );
    let lati = next_route(
        &mut rng,
        &mut advances,
        roamers.lati,
        KantoRoamerRoute::from_rand,
    );

    HgssRoamerResult {
        raikou,
        entei,
        lati,
        advances,
    }
}

#[wasm_bindgen]
pub fn get_hgss_roamers(seed: u32, roamers: HgssRoamers) -> HgssRoamerResult {
    hgss_roamer_result(seed, &roamers)
}

#[cfg(test)]
mod test {
    use super::*;

    #[test]
    fn no_roamers() {
        let result = hgss_roamer_result(0x12345678, &HgssRoamers::default());
        assert_eq!(result, HgssRoamerResult::default());
    }

    #[test]
    fn all_roamers() {
        let roamers = HgssRoamers {
            raikou: Some(JohtoRoamerRoute::Route42),
            entei: Some(JohtoRoamerRoute::Route42),
            lati: Some(KantoRoamerRoute::Route1),
        };
        let result = hgss_roamer_result(0, &roamers);
        let expected = HgssRoamerResult {
            raikou: Some(JohtoRoamerRoute::Route29),
            entei: Some(JohtoRoamerRoute::Route45),
            lati: Some(KantoRoamerRoute::Route6),
            advances: 3,
        };
        assert_eq!(result, expected);
    }

    #[test]
    fn rerolls_previous_route() {
        let roamers = HgssRoamers {
            raikou: Some(JohtoRoamerRoute::Route29),
            entei: None,
            lati: None,
        };
        let result = hgss_roamer_result(0, &roamers);
        let expected = HgssRoamerResult {
            raikou: Some(JohtoRoamerRoute::Route45),
            entei: None,
            lati: None,
            advances: 2,
        };
        assert_eq!(result, expected);
    }

    #[test]
    fn rerolls_later_roamer() {
        let roamers = HgssRoamers {
            raikou: Some(JohtoRoamerRoute::Route42),
            entei: Some(JohtoRoamerRoute::Route45),
            lati: None,
        };
        let result = hgss_roamer_result(0, &roamers);
        let expected = HgssRoamerResult {
            raikou: Some(JohtoRoamerRoute::Route29),
            entei: Some(JohtoRoamerRoute::Route30),
            lati: None,
            advances: 3,
        };
        assert_eq!(result, expected);
    }

    #[test]
    fn route_tables() {
        assert_eq!(JohtoRoamerRoute::from_rand(10), JohtoRoamerRoute::Route39);
        assert_eq!(JohtoRoamerRoute::from_rand(11), JohtoRoamerRoute::Route42);
        assert_eq!(JohtoRoamerRoute::from_rand(16), JohtoRoamerRoute::Route29);
        assert_eq!(KantoRoamerRoute::from_rand(21), KantoRoamerRoute::Route22);
        assert_eq!(KantoRoamerRoute::from_rand(22), KantoRoamerRoute::Route24);
        assert_eq!(KantoRoamerRoute::from_rand(25), KantoRoamerRoute::Route1);
    }
}
