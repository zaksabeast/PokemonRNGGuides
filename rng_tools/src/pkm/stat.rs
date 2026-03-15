use crate::{Ivs, Nature, NatureFactor, NatureStatFactor};
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

pub fn calculate_hp(base_stat: u16, iv: u8, ev: u16, level: u8) -> u16 {
    if base_stat == 1 {
        return 1; // Shedinja
    }

    let n = 2 * base_stat + (iv as u16);
    let level = level as u16;
    (((n + ev / 4) * level) / 100) + level + 10
}

pub fn calculate_non_hp(
    base_stat: u16,
    iv: u8,
    ev: u16,
    level: u8,
    nature_factor: NatureFactor,
) -> u16 {
    let n: u16 = (((2 * base_stat + (iv as u16) + ev / 4) * (level as u16)) / 100) + 5;
    match nature_factor {
        NatureFactor::More => (n * 110) / 100,
        NatureFactor::Less => (n * 90) / 100,
        NatureFactor::Equal => n,
    }
}

#[wasm_bindgen]
pub fn calculate_minmax_stats(
    base_stats: &StatsValue,
    level: u8,
    is_min_stat: bool,
    nature: Option<Nature>,
) -> StatsValue {
    let iv = if is_min_stat { 0 } else { 31 };

    let nature_factors = match nature {
        None => {
            let fact = if is_min_stat {
                NatureFactor::Less
            } else {
                NatureFactor::More
            };
            &NatureStatFactor {
                atk: fact,
                def: fact,
                spa: fact,
                spd: fact,
                spe: fact,
            }
        }
        Some(nature) => nature.stat_factor(),
    };

    StatsValue {
        hp: calculate_hp(base_stats.hp, iv, 0, level),
        atk: calculate_non_hp(base_stats.atk, iv, 0, level, nature_factors.atk),
        def: calculate_non_hp(base_stats.def, iv, 0, level, nature_factors.def),
        spa: calculate_non_hp(base_stats.spa, iv, 0, level, nature_factors.spa),
        spd: calculate_non_hp(base_stats.spd, iv, 0, level, nature_factors.spd),
        spe: calculate_non_hp(base_stats.spe, iv, 0, level, nature_factors.spe),
    }
}

static ARRAY_0_31: [u8; 32] = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25,
    26, 27, 28, 29, 30, 31,
];

static ARRAY_31_0: [u8; 32] = [
    31, 30, 29, 28, 27, 26, 25, 24, 23, 22, 21, 20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8,
    7, 6, 5, 4, 3, 2, 1, 0,
];

#[wasm_bindgen]
pub fn calculate_min_ivs_from_stats(
    base_stats: &StatsValue,
    level: u8,
    nature: Nature,
    stats: &StatsValue,
) -> Option<Ivs> {
    let nature_factors = nature.stat_factor();

    // Ex: stats.hp == 11
    // Iv:      0,  1,  2,  3,  4,  5
    // CalcHp   10, 10, 11, 11, 12, 12
    // RetVal:  T,  T,  F,  F,  F,  F
    // partition_point  ^

    let hp = ARRAY_0_31.partition_point(|iv| calculate_hp(base_stats.hp, *iv, 0, level) < stats.hp)
        as u8;
    let atk = ARRAY_0_31.partition_point(|iv| {
        calculate_non_hp(base_stats.atk, *iv, 0, level, nature_factors.atk) < stats.atk
    }) as u8;
    let def = ARRAY_0_31.partition_point(|iv| {
        calculate_non_hp(base_stats.def, *iv, 0, level, nature_factors.def) < stats.def
    }) as u8;
    let spa = ARRAY_0_31.partition_point(|iv| {
        calculate_non_hp(base_stats.spa, *iv, 0, level, nature_factors.spa) < stats.spa
    }) as u8;
    let spd = ARRAY_0_31.partition_point(|iv| {
        calculate_non_hp(base_stats.spd, *iv, 0, level, nature_factors.spd) < stats.spd
    }) as u8;
    let spe = ARRAY_0_31.partition_point(|iv| {
        calculate_non_hp(base_stats.spe, *iv, 0, level, nature_factors.spe) < stats.spe
    }) as u8;

    if hp > 31 || atk > 31 || def > 31 || spa > 31 || spd > 31 || spe > 31 {
        None
    } else {
        Some(Ivs {
            hp,
            atk,
            def,
            spa,
            spd,
            spe,
        })
    }
}

#[wasm_bindgen]
pub fn calculate_max_ivs_from_stats(
    base_stats: &StatsValue,
    level: u8,
    nature: Nature,
    stats: &StatsValue,
) -> Option<Ivs> {
    let nature_factors = nature.stat_factor();

    // Ex: stats.hp == 11
    // Iv:      31, 30, 29, 28, 27, 26
    // CalcHp:  12, 12, 12, 11, 11, 10
    // RetVal:  T,  T,  T,  F,  F,  F
    // partition_point      ^

    let hp = ARRAY_31_0.partition_point(|iv| calculate_hp(base_stats.hp, *iv, 0, level) > stats.hp);
    let atk = ARRAY_31_0.partition_point(|iv| {
        calculate_non_hp(base_stats.atk, *iv, 0, level, nature_factors.atk) > stats.atk
    });
    let def = ARRAY_31_0.partition_point(|iv| {
        calculate_non_hp(base_stats.def, *iv, 0, level, nature_factors.def) > stats.def
    });
    let spa = ARRAY_31_0.partition_point(|iv| {
        calculate_non_hp(base_stats.spa, *iv, 0, level, nature_factors.spa) > stats.spa
    });
    let spd = ARRAY_31_0.partition_point(|iv| {
        calculate_non_hp(base_stats.spd, *iv, 0, level, nature_factors.spd) > stats.spd
    });
    let spe = ARRAY_31_0.partition_point(|iv| {
        calculate_non_hp(base_stats.spe, *iv, 0, level, nature_factors.spe) > stats.spe
    });

    if hp > 31 || atk > 31 || def > 31 || spa > 31 || spd > 31 || spe > 31 {
        None
    } else {
        Some(Ivs {
            hp: ARRAY_31_0[hp],
            atk: ARRAY_31_0[atk],
            def: ARRAY_31_0[def],
            spa: ARRAY_31_0[spa],
            spd: ARRAY_31_0[spd],
            spe: ARRAY_31_0[spe],
        })
    }
}

#[wasm_bindgen]
pub fn calculate_stats(
    base_stats: &StatsValue,
    level: u8,
    nature: Nature,
    ivs: &Ivs,
    evs: &StatsValue,
) -> StatsValue {
    let nature_factors = nature.stat_factor();

    StatsValue {
        hp: calculate_hp(base_stats.hp, ivs.hp, evs.hp, level),
        atk: calculate_non_hp(base_stats.atk, ivs.atk, evs.atk, level, nature_factors.atk),
        def: calculate_non_hp(base_stats.def, ivs.def, evs.def, level, nature_factors.def),
        spa: calculate_non_hp(base_stats.spa, ivs.spa, evs.spa, level, nature_factors.spa),
        spd: calculate_non_hp(base_stats.spd, ivs.spd, evs.spd, level, nature_factors.spd),
        spe: calculate_non_hp(base_stats.spe, ivs.spe, evs.spe, level, nature_factors.spe),
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_calculate_minmax_ivs_from_stats() {
        let base_stats = StatsValue {
            hp: 50,
            atk: 70,
            def: 50,
            spa: 50,
            spd: 50,
            spe: 40,
        };

        assert_eq!(
            calculate_min_ivs_from_stats(
                &base_stats,
                10,
                Nature::Adamant,
                &StatsValue {
                    hp: 31,
                    atk: 22,
                    def: 15,
                    spa: 14,
                    spd: 15,
                    spe: 13
                }
            ),
            Some(Ivs {
                hp: 10,
                atk: 10,
                def: 0,
                spa: 10,
                spd: 0,
                spe: 0
            })
        );

        assert_eq!(
            calculate_max_ivs_from_stats(
                &base_stats,
                10,
                Nature::Adamant,
                &StatsValue {
                    hp: 31,
                    atk: 22,
                    def: 15,
                    spa: 14,
                    spd: 15,
                    spe: 13
                }
            ),
            Some(Ivs {
                hp: 19,
                atk: 19,
                def: 9,
                spa: 19,
                spd: 9,
                spe: 9
            })
        );

        assert_eq!(
            calculate_min_ivs_from_stats(
                &base_stats,
                10,
                Nature::Adamant,
                &StatsValue {
                    hp: 100,
                    atk: 22,
                    def: 15,
                    spa: 14,
                    spd: 15,
                    spe: 13
                }
            ),
            None
        );

        assert_eq!(
            calculate_max_ivs_from_stats(
                &base_stats,
                10,
                Nature::Adamant,
                &StatsValue {
                    hp: 10,
                    atk: 22,
                    def: 15,
                    spa: 14,
                    spd: 15,
                    spe: 13
                }
            ),
            None
        );
    }

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
            calculate_minmax_stats(&base_stats, 5, true, None),
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
            calculate_minmax_stats(&base_stats, 5, false, None),
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
        assert_eq!(calculate_hp(base_stats.hp, 27, 0, 5), 21);
        assert_eq!(
            calculate_non_hp(base_stats.atk, 30, 0, 5, NatureFactor::Equal),
            13
        );
        assert_eq!(
            calculate_non_hp(base_stats.def, 25, 0, 5, NatureFactor::More),
            12
        );
        assert_eq!(
            calculate_non_hp(base_stats.spa, 21, 0, 5, NatureFactor::Equal),
            11
        );
        assert_eq!(
            calculate_non_hp(base_stats.spd, 9, 0, 5, NatureFactor::Equal),
            10
        );
        assert_eq!(
            calculate_non_hp(base_stats.spe, 0, 0, 5, NatureFactor::Less),
            8
        );
    }
}
