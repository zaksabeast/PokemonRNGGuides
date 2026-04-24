use crate::{G3Idx, impl_stat_index};
use serde::{Deserialize, Serialize};
use tsify::Tsify;
use wasm_bindgen::prelude::*;

/// Represents any value that could be related to a stat.
/// For example, evs, calculated stats, future predicted values associated with individual stats, etc.
#[derive(Debug, Clone, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct StatsValue {
    pub hp: u16,
    pub atk: u16,
    pub def: u16,
    pub spa: u16,
    pub spd: u16,
    pub spe: u16,
}

impl StatsValue {
    pub fn new_all0() -> StatsValue {
        StatsValue {
            hp: 0,
            atk: 0,
            def: 0,
            spa: 0,
            spd: 0,
            spe: 0,
        }
    }
}

impl_stat_index!(G3Idx, StatsValue, u16);

#[macro_export]
macro_rules! stats {
    ($hp:literal / $atk:literal / $def:literal / $spa:literal / $spd:literal / $spe:literal) => {{
        const STATS: StatsValue = $crate::StatsValue {
            hp: $hp,
            atk: $atk,
            def: $def,
            spa: $spa,
            spd: $spd,
            spe: $spe,
        };
        STATS
    }};
}
