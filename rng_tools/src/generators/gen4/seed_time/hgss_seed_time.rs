use super::elm_call::{ElmCall, elm_calls};
use super::roamers::{HgssRoamerResult, HgssRoamers, hgss_roamer_result};
use super::{SeedTime4, relative_seedtime4s};
use crate::RngDateTime;
use serde::{Deserialize, Serialize};
use tsify::Tsify;
use wasm_bindgen::prelude::*;

#[derive(Debug, Clone, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct HgssSeedTime4 {
    pub seed: u32,
    pub datetime: RngDateTime,
    pub delay: u32,
    pub roamers: HgssRoamerResult,
    pub elm_calls: Vec<ElmCall>,
}

impl HgssSeedTime4 {
    fn new(seedtime: SeedTime4, roamers: &HgssRoamers, elm_call_count: usize) -> Self {
        let roamers = hgss_roamer_result(seedtime.seed, roamers);
        Self {
            elm_calls: elm_calls(seedtime.seed, roamers.advances, elm_call_count),
            roamers,
            seed: seedtime.seed,
            datetime: seedtime.datetime,
            delay: seedtime.delay,
        }
    }
}

#[derive(Debug, Clone, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct RelativeHgssSeedtimeOpts {
    pub seedtime: SeedTime4,
    pub delay_offset: i32,
    pub second_offset: i32,
    pub elm_call_count: usize,
    pub roamers: HgssRoamers,
}

/// Generates a list of seed times relative to a given seed time, with specified offsets for delay and seconds.
/// Useful for finding seeds that are close to a known seed time, such as when calibrating an HGSS RNG.
#[wasm_bindgen]
pub fn get_relative_hgss_seedtimes(opts: RelativeHgssSeedtimeOpts) -> Vec<HgssSeedTime4> {
    relative_seedtime4s(&opts.seedtime, opts.delay_offset, opts.second_offset)
        .into_iter()
        .map(|seedtime| HgssSeedTime4::new(seedtime, &opts.roamers, opts.elm_call_count))
        .collect()
}

#[cfg(test)]
mod test {
    use super::*;

    mod get_relative_hgss_seedtimes {
        use super::*;
        use crate::gen4::seed_time::roamers::{JohtoRoamerRoute, KantoRoamerRoute};
        use crate::{assert_list_eq, datetime, elm_calls};

        #[test]
        fn includes_roamers_and_elm_calls() {
            let opts = RelativeHgssSeedtimeOpts {
                seedtime: SeedTime4 {
                    seed: 0x00001234,
                    datetime: datetime!(2026-05-28 00:57:59).unwrap(),
                    delay: 4634,
                },
                delay_offset: 1,
                second_offset: 0,
                elm_call_count: 3,
                roamers: HgssRoamers {
                    raikou: Some(JohtoRoamerRoute::Route42),
                    entei: None,
                    lati: Some(KantoRoamerRoute::Route1),
                },
            };
            let results = get_relative_hgss_seedtimes(opts);
            let expected = vec![
                HgssSeedTime4 {
                    seed: 0x00001233,
                    datetime: datetime!(2026-05-28 00:57:59).unwrap(),
                    delay: 4633,
                    roamers: HgssRoamerResult {
                        raikou: Some(JohtoRoamerRoute::Route34),
                        entei: None,
                        lati: Some(KantoRoamerRoute::Route21),
                        advances: 2,
                    },
                    elm_calls: elm_calls!("KEK"),
                },
                HgssSeedTime4 {
                    seed: 0x00001234,
                    datetime: datetime!(2026-05-28 00:57:59).unwrap(),
                    delay: 4634,
                    roamers: HgssRoamerResult {
                        raikou: Some(JohtoRoamerRoute::Route30),
                        entei: None,
                        lati: Some(KantoRoamerRoute::Route17),
                        advances: 3,
                    },
                    elm_calls: elm_calls!("KEK"),
                },
                HgssSeedTime4 {
                    seed: 0x00001235,
                    datetime: datetime!(2026-05-28 00:57:59).unwrap(),
                    delay: 4635,
                    roamers: HgssRoamerResult {
                        raikou: Some(JohtoRoamerRoute::Route31),
                        entei: None,
                        lati: Some(KantoRoamerRoute::Route13),
                        advances: 2,
                    },
                    elm_calls: elm_calls!("KPP"),
                },
            ];

            assert_list_eq!(results, expected);
        }
    }
}
