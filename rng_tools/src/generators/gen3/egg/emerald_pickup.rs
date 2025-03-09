use crate::rng::lcrng::{Lcrng, Rng, StateIterator};
use crate::{
    G3Idx::{self, *},
    Ivs,
};

use serde::{Deserialize, Serialize};
use tsify_next::Tsify;
use wasm_bindgen::prelude::*;

#[derive(Debug, Clone, PartialEq, Eq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub enum Gen3PickupMethod {
    EmeraldBred,
    EmeraldBredSplit,
    EmeraldBredAlternate,
}

impl Gen3PickupMethod {
    fn iv1_advance(&self) -> usize {
        match self {
            Self::EmeraldBred => 0,
            Self::EmeraldBredSplit => 0,
            Self::EmeraldBredAlternate => 0,
        }
    }

    fn iv2_advance(&self) -> usize {
        match self {
            Self::EmeraldBred => 0,
            Self::EmeraldBredSplit => 1,
            Self::EmeraldBredAlternate => 0,
        }
    }

    fn iv_inherit_advance(&self) -> usize {
        match self {
            Self::EmeraldBred => 1,
            Self::EmeraldBredSplit => 1,
            Self::EmeraldBredAlternate => 2,
        }
    }
}

#[derive(Debug, Clone, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct Egg3PickupFilter {
    pub min_ivs: Ivs,
    pub max_ivs: Ivs,
}

#[derive(Debug, Clone, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct Egg3PickupOptions {
    pub delay: usize,
    pub seed: u32,
    pub initial_advances: usize,
    pub max_advances: usize,
    pub parent_ivs: [Ivs; 2],
    pub method: Gen3PickupMethod,
    pub filter: Egg3PickupFilter,
    pub lua_adjustment: bool,
}

#[derive(Debug, Clone, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct Egg3PickupState {
    pub advance: usize,
    pub ivs: Ivs,
}

#[wasm_bindgen]
pub fn emerald_egg_pickup_states(opts: &Egg3PickupOptions) -> Vec<Egg3PickupState> {
    StateIterator::new(Lcrng::new_prng(opts.seed))
        .enumerate()
        .skip(opts.initial_advances)
        .take(opts.max_advances.saturating_add(1))
        .filter_map(|(advance, rng)| {
            let ivs = generate_pickup_ivs(opts, rng);
            if ivs.filter(&opts.filter.min_ivs, &opts.filter.max_ivs) {
                Some(Egg3PickupState {
                    advance: advance
                        // Lua scripts are off by 1
                        .saturating_add(opts.lua_adjustment as usize)
                        .saturating_sub(opts.delay),
                    ivs,
                })
            } else {
                None
            }
        })
        .collect()
}

fn generate_pickup_ivs(opts: &Egg3PickupOptions, mut rng: Lcrng) -> Ivs {
    rng.advance(opts.method.iv1_advance());
    let iv1 = rng.rand::<u16>();
    rng.advance(opts.method.iv2_advance());
    let iv2 = rng.rand::<u16>();

    let mut ivs = Ivs::new_g3(iv1, iv2);

    rng.advance(opts.method.iv_inherit_advance());
    let inherited_ivs: [usize; 3] = [
        rng.rand_max::<u16>(6).into(),
        rng.rand_max::<u16>(5).into(),
        rng.rand_max::<u16>(4).into(),
    ];
    let parent_slot: [usize; 3] = [
        rng.rand_max::<u16>(2).into(),
        rng.rand_max::<u16>(2).into(),
        rng.rand_max::<u16>(2).into(),
    ];

    let available1: [G3Idx; 6] = [Hp, Atk, Def, Spe, Spa, Spd];
    let available2: [G3Idx; 5] = [Atk, Def, Spe, Spa, Spd];
    let available3: [G3Idx; 4] = [Atk, Spe, Spa, Spd];

    let stat = available1[inherited_ivs[0]];
    ivs[stat] = opts.parent_ivs[parent_slot[0]][stat];

    let stat = available2[inherited_ivs[1]];
    ivs[stat] = opts.parent_ivs[parent_slot[1]][stat];

    let stat = available3[inherited_ivs[2]];
    ivs[stat] = opts.parent_ivs[parent_slot[2]][stat];

    ivs
}

#[cfg(test)]
mod test {
    use super::*;

    const MALE_IVS: Ivs = Ivs {
        hp: 1,
        atk: 2,
        def: 3,
        spa: 4,
        spd: 5,
        spe: 6,
    };
    const FEMALE_IVS: Ivs = Ivs {
        hp: 7,
        atk: 8,
        def: 9,
        spa: 10,
        spd: 11,
        spe: 12,
    };
    const ZERO_IVS: Ivs = Ivs {
        hp: 0,
        atk: 0,
        def: 0,
        spa: 0,
        spd: 0,
        spe: 0,
    };
    const PERFECT_IVS: Ivs = Ivs {
        hp: 31,
        atk: 31,
        def: 31,
        spa: 31,
        spd: 31,
        spe: 31,
    };

    #[test]
    fn generate_emberald_bred_results() {
        let opts = Egg3PickupOptions {
            delay: 0,
            parent_ivs: [MALE_IVS, FEMALE_IVS],
            method: Gen3PickupMethod::EmeraldBred,
            initial_advances: 0,
            max_advances: 10,
            seed: 0,
            lua_adjustment: false,
            filter: Egg3PickupFilter {
                min_ivs: ZERO_IVS,
                max_ivs: PERFECT_IVS,
            },
        };

        let result = emerald_egg_pickup_states(&opts);
        let expected_result = [
            Egg3PickupState {
                advance: 0,
                ivs: Ivs {
                    hp: 7,
                    atk: 8,
                    def: 0,
                    spa: 10,
                    spd: 26,
                    spe: 30,
                },
            },
            Egg3PickupState {
                advance: 1,
                ivs: Ivs {
                    hp: 30,
                    atk: 8,
                    def: 26,
                    spa: 10,
                    spd: 20,
                    spe: 6,
                },
            },
            Egg3PickupState {
                advance: 2,
                ivs: Ivs {
                    hp: 17,
                    atk: 19,
                    def: 20,
                    spa: 10,
                    spd: 5,
                    spe: 6,
                },
            },
            Egg3PickupState {
                advance: 3,
                ivs: Ivs {
                    hp: 16,
                    atk: 13,
                    def: 12,
                    spa: 18,
                    spd: 11,
                    spe: 6,
                },
            },
            Egg3PickupState {
                advance: 4,
                ivs: Ivs {
                    hp: 2,
                    atk: 2,
                    def: 3,
                    spa: 10,
                    spd: 24,
                    spe: 12,
                },
            },
            Egg3PickupState {
                advance: 5,
                ivs: Ivs {
                    hp: 12,
                    atk: 22,
                    def: 24,
                    spa: 10,
                    spd: 11,
                    spe: 12,
                },
            },
            Egg3PickupState {
                advance: 6,
                ivs: Ivs {
                    hp: 5,
                    atk: 30,
                    def: 9,
                    spa: 4,
                    spd: 25,
                    spe: 6,
                },
            },
            Egg3PickupState {
                advance: 7,
                ivs: Ivs {
                    hp: 27,
                    atk: 30,
                    def: 25,
                    spa: 10,
                    spd: 5,
                    spe: 19,
                },
            },
            Egg3PickupState {
                advance: 8,
                ivs: Ivs {
                    hp: 19,
                    atk: 1,
                    def: 31,
                    spa: 25,
                    spd: 11,
                    spe: 6,
                },
            },
            Egg3PickupState {
                advance: 9,
                ivs: Ivs {
                    hp: 12,
                    atk: 2,
                    def: 9,
                    spa: 2,
                    spd: 5,
                    spe: 30,
                },
            },
            Egg3PickupState {
                advance: 10,
                ivs: Ivs {
                    hp: 30,
                    atk: 2,
                    def: 31,
                    spa: 22,
                    spd: 5,
                    spe: 5,
                },
            },
        ];

        assert_eq!(result.len(), expected_result.len());
        result
            .into_iter()
            .zip(expected_result.into_iter())
            .for_each(|(result, expected)| {
                assert_eq!(result, expected);
            });
    }

    #[test]
    fn generate_emberald_bred_split_results() {
        let opts = Egg3PickupOptions {
            delay: 0,
            parent_ivs: [MALE_IVS, FEMALE_IVS],
            method: Gen3PickupMethod::EmeraldBredSplit,
            initial_advances: 0,
            max_advances: 10,
            seed: 0,
            lua_adjustment: false,
            filter: Egg3PickupFilter {
                min_ivs: ZERO_IVS,
                max_ivs: PERFECT_IVS,
            },
        };

        let result = emerald_egg_pickup_states(&opts);
        let expected_result = [
            Egg3PickupState {
                advance: 0,
                ivs: Ivs {
                    hp: 0,
                    atk: 8,
                    def: 0,
                    spa: 10,
                    spd: 20,
                    spe: 6,
                },
            },
            Egg3PickupState {
                advance: 1,
                ivs: Ivs {
                    hp: 30,
                    atk: 11,
                    def: 26,
                    spa: 10,
                    spd: 5,
                    spe: 6,
                },
            },
            Egg3PickupState {
                advance: 2,
                ivs: Ivs {
                    hp: 17,
                    atk: 19,
                    def: 20,
                    spa: 18,
                    spd: 11,
                    spe: 6,
                },
            },
            Egg3PickupState {
                advance: 3,
                ivs: Ivs {
                    hp: 16,
                    atk: 2,
                    def: 12,
                    spa: 10,
                    spd: 24,
                    spe: 12,
                },
            },
            Egg3PickupState {
                advance: 4,
                ivs: Ivs {
                    hp: 2,
                    atk: 18,
                    def: 3,
                    spa: 10,
                    spd: 11,
                    spe: 12,
                },
            },
            Egg3PickupState {
                advance: 5,
                ivs: Ivs {
                    hp: 12,
                    atk: 22,
                    def: 9,
                    spa: 4,
                    spd: 25,
                    spe: 6,
                },
            },
            Egg3PickupState {
                advance: 6,
                ivs: Ivs {
                    hp: 5,
                    atk: 30,
                    def: 11,
                    spa: 10,
                    spd: 5,
                    spe: 19,
                },
            },
            Egg3PickupState {
                advance: 7,
                ivs: Ivs {
                    hp: 27,
                    atk: 30,
                    def: 25,
                    spa: 25,
                    spd: 11,
                    spe: 6,
                },
            },
            Egg3PickupState {
                advance: 8,
                ivs: Ivs {
                    hp: 19,
                    atk: 2,
                    def: 9,
                    spa: 2,
                    spd: 5,
                    spe: 30,
                },
            },
            Egg3PickupState {
                advance: 9,
                ivs: Ivs {
                    hp: 12,
                    atk: 2,
                    def: 27,
                    spa: 22,
                    spd: 5,
                    spe: 5,
                },
            },
            Egg3PickupState {
                advance: 10,
                ivs: Ivs {
                    hp: 30,
                    atk: 2,
                    def: 31,
                    spa: 10,
                    spd: 26,
                    spe: 22,
                },
            },
        ];

        assert_eq!(result.len(), expected_result.len());
        result
            .into_iter()
            .zip(expected_result.into_iter())
            .for_each(|(result, expected)| {
                assert_eq!(result, expected);
            });
    }

    #[test]
    fn generate_emberald_bred_alternate_results() {
        let opts = Egg3PickupOptions {
            delay: 0,
            parent_ivs: [MALE_IVS, FEMALE_IVS],
            method: Gen3PickupMethod::EmeraldBredAlternate,
            initial_advances: 0,
            max_advances: 10,
            seed: 0,
            lua_adjustment: false,
            filter: Egg3PickupFilter {
                min_ivs: ZERO_IVS,
                max_ivs: PERFECT_IVS,
            },
        };

        let result = emerald_egg_pickup_states(&opts);
        let expected_result = [
            Egg3PickupState {
                advance: 0,
                ivs: Ivs {
                    hp: 0,
                    atk: 8,
                    def: 0,
                    spa: 10,
                    spd: 26,
                    spe: 6,
                },
            },
            Egg3PickupState {
                advance: 1,
                ivs: Ivs {
                    hp: 30,
                    atk: 11,
                    def: 26,
                    spa: 10,
                    spd: 5,
                    spe: 6,
                },
            },
            Egg3PickupState {
                advance: 2,
                ivs: Ivs {
                    hp: 17,
                    atk: 19,
                    def: 20,
                    spa: 13,
                    spd: 11,
                    spe: 6,
                },
            },
            Egg3PickupState {
                advance: 3,
                ivs: Ivs {
                    hp: 16,
                    atk: 2,
                    def: 12,
                    spa: 10,
                    spd: 3,
                    spe: 2,
                },
            },
            Egg3PickupState {
                advance: 4,
                ivs: Ivs {
                    hp: 2,
                    atk: 18,
                    def: 3,
                    spa: 10,
                    spd: 24,
                    spe: 12,
                },
            },
            Egg3PickupState {
                advance: 5,
                ivs: Ivs {
                    hp: 12,
                    atk: 22,
                    def: 9,
                    spa: 4,
                    spd: 11,
                    spe: 6,
                },
            },
            Egg3PickupState {
                advance: 6,
                ivs: Ivs {
                    hp: 5,
                    atk: 30,
                    def: 11,
                    spa: 10,
                    spd: 5,
                    spe: 27,
                },
            },
            Egg3PickupState {
                advance: 7,
                ivs: Ivs {
                    hp: 27,
                    atk: 30,
                    def: 25,
                    spa: 1,
                    spd: 11,
                    spe: 6,
                },
            },
            Egg3PickupState {
                advance: 8,
                ivs: Ivs {
                    hp: 19,
                    atk: 2,
                    def: 9,
                    spa: 25,
                    spd: 5,
                    spe: 12,
                },
            },
            Egg3PickupState {
                advance: 9,
                ivs: Ivs {
                    hp: 12,
                    atk: 2,
                    def: 27,
                    spa: 2,
                    spd: 5,
                    spe: 30,
                },
            },
            Egg3PickupState {
                advance: 10,
                ivs: Ivs {
                    hp: 30,
                    atk: 2,
                    def: 31,
                    spa: 10,
                    spd: 18,
                    spe: 5,
                },
            },
        ];

        assert_eq!(result.len(), expected_result.len());
        result
            .into_iter()
            .zip(expected_result.into_iter())
            .for_each(|(result, expected)| {
                assert_eq!(result, expected);
            });
    }

    #[test]
    fn apply_filters() {
        let opts = Egg3PickupOptions {
            delay: 0,
            parent_ivs: [MALE_IVS, FEMALE_IVS],
            method: Gen3PickupMethod::EmeraldBred,
            initial_advances: 0,
            max_advances: 10,
            seed: 0,
            lua_adjustment: false,
            filter: Egg3PickupFilter {
                min_ivs: Ivs {
                    hp: 10,
                    atk: 10,
                    def: 10,
                    spa: 10,
                    spd: 10,
                    spe: 10,
                },
                max_ivs: Ivs {
                    hp: 25,
                    atk: 25,
                    def: 25,
                    spa: 25,
                    spd: 25,
                    spe: 25,
                },
            },
        };

        let result = emerald_egg_pickup_states(&opts);
        assert_eq!(result, [Egg3PickupState {
            advance: 5,
            ivs: Ivs {
                hp: 12,
                atk: 22,
                def: 24,
                spa: 10,
                spd: 11,
                spe: 12
            }
        }]);
    }

    #[test]
    fn delay() {
        let mut opts = Egg3PickupOptions {
            delay: 0,
            parent_ivs: [MALE_IVS, FEMALE_IVS],
            method: Gen3PickupMethod::EmeraldBred,
            initial_advances: 100,
            max_advances: 10,
            seed: 0,
            lua_adjustment: false,
            filter: Egg3PickupFilter {
                min_ivs: ZERO_IVS,
                max_ivs: PERFECT_IVS,
            },
        };
        let first_result = emerald_egg_pickup_states(&opts);

        opts.delay = 10;
        let second_result = emerald_egg_pickup_states(&opts);

        first_result
            .into_iter()
            .zip(second_result.into_iter())
            .for_each(|(first, mut second)| {
                second.advance = second.advance.saturating_add(10);
                assert_eq!(first, second);
            });
    }

    #[test]
    fn lua_adjustment() {
        let mut opts = Egg3PickupOptions {
            delay: 0,
            parent_ivs: [MALE_IVS, FEMALE_IVS],
            method: Gen3PickupMethod::EmeraldBred,
            initial_advances: 100,
            max_advances: 10,
            seed: 0,
            lua_adjustment: false,
            filter: Egg3PickupFilter {
                min_ivs: ZERO_IVS,
                max_ivs: PERFECT_IVS,
            },
        };
        let first_result = emerald_egg_pickup_states(&opts);

        opts.lua_adjustment = true;
        let second_result = emerald_egg_pickup_states(&opts);

        first_result
            .into_iter()
            .zip(second_result.into_iter())
            .for_each(|(first, mut second)| {
                second.advance = second.advance.saturating_sub(1);
                assert_eq!(first, second);
            });
    }
}
