use crate::{Ivs, Nature, NatureFactor};
use serde::{Deserialize, Serialize};
use tsify_next::Tsify;
use wasm_bindgen::prelude::*;

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

#[derive(Debug, Clone, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct StatFilter {
    pub lvl: u8,
    pub base_stats: StatsValue,
    pub min_stats: StatsValue,
    pub max_stats: StatsValue,
}

pub fn gen3_calculate_hp(base_stat: u16, iv: u8, ev: u16, level: u8) -> u16 {
    if base_stat == 1 {
        return 1; // Shedinja
    }

    let n: u16 = 2 * base_stat + (iv as u16);
    (((n + ev / 4) * (level as u16)) / 100) + (level as u16) + 10
}

pub fn gen3_calculate_non_hp(
    base_stat: u16,
    iv: u8,
    ev: u16,
    level: u8,
    nature_factor: NatureFactor,
) -> u16 {
    let n: u16 =
        (((2 * base_stat + (iv as u16) + ev / 4) * (level as u16)) / 100) + 5;
    match nature_factor {
        NatureFactor::More => (n * 110) / 100,
        NatureFactor::Less => (n * 90) / 100,
        NatureFactor::Equal => n,
    }
}

#[wasm_bindgen]
pub fn gen3_calculate_minmax_stats(
    base_stats: &StatsValue,
    level: u8,
    is_min_stat: bool,
) -> StatsValue {
    let iv = if is_min_stat { 0 } else { 31 };
    let nature_factor = if is_min_stat {
        NatureFactor::Less
    } else {
        NatureFactor::More
    };

    StatsValue {
        hp: gen3_calculate_hp(base_stats.hp, iv, 0, level),
        atk: gen3_calculate_non_hp(base_stats.atk, iv, 0, level, nature_factor),
        def: gen3_calculate_non_hp(base_stats.def, iv, 0, level, nature_factor),
        spa: gen3_calculate_non_hp(base_stats.spa, iv, 0, level, nature_factor),
        spd: gen3_calculate_non_hp(base_stats.spd, iv, 0, level, nature_factor),
        spe: gen3_calculate_non_hp(base_stats.spe, iv, 0, level, nature_factor),
    }
}

#[wasm_bindgen]
pub fn gen3_calculate_stats(
    base_stats: &StatsValue,
    level: u8,
    nature: Nature,
    ivs: &Ivs,
    evs: &StatsValue,
) -> StatsValue {
    let nature_factors = nature.stat_factor();

    StatsValue {
        hp: gen3_calculate_hp(base_stats.hp, ivs.hp, evs.hp, level),
        atk: gen3_calculate_non_hp(
            base_stats.atk,
            ivs.atk,
            evs.atk,
            level,
            nature_factors.atk,
        ),
        def: gen3_calculate_non_hp(
            base_stats.def,
            ivs.def,
            evs.def,
            level,
            nature_factors.def,
        ),
        spa: gen3_calculate_non_hp(
            base_stats.spa,
            ivs.spa,
            evs.spa,
            level,
            nature_factors.spa,
        ),
        spd: gen3_calculate_non_hp(
            base_stats.spd,
            ivs.spd,
            evs.spd,
            level,
            nature_factors.spd,
        ),
        spe: gen3_calculate_non_hp(
            base_stats.spe,
            ivs.spe,
            evs.spe,
            level,
            nature_factors.spe,
        ),
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_mudkip_starter() {
        let base_stats = StatsValue {
            hp: 50,
            atk: 70,
            def: 50,
            spa: 50,
            spd: 50,
            spe: 40,
        };

        assert_eq!(
            gen3_calculate_minmax_stats(&base_stats, 5, true),
            StatsValue {
                hp: 20,
                atk: 10,
                def: 9,
                spa: 9,
                spd: 9,
                spe: 8
            }
        );

        assert_eq!(
            gen3_calculate_minmax_stats(&base_stats, 5, false),
            StatsValue {
                hp: 21,
                atk: 14,
                def: 12,
                spa: 12,
                spd: 12,
                spe: 11
            }
        );

        // Mudkip on advance 8000
        assert_eq!(gen3_calculate_hp(base_stats.hp, 27, 0, 5), 21);
        assert_eq!(
            gen3_calculate_non_hp(base_stats.atk, 30, 0, 5, NatureFactor::Equal),
            13
        );
        assert_eq!(
            gen3_calculate_non_hp(base_stats.def, 25, 0, 5, NatureFactor::More),
            12
        );
        assert_eq!(
            gen3_calculate_non_hp(base_stats.spa, 21, 0, 5, NatureFactor::Equal),
            11
        );
        assert_eq!(
            gen3_calculate_non_hp(base_stats.spd, 9, 0, 5, NatureFactor::Equal),
            10
        );
        assert_eq!(
            gen3_calculate_non_hp(base_stats.spe, 0, 0, 5, NatureFactor::Less),
            8
        );
    }
}
