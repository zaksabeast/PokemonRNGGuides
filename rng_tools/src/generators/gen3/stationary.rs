use crate::rng::lcrng::Pokerng;
use crate::rng::{Rng, StateIterator, lcrng};
use crate::{AbilityType, Gender, Ivs, Nature, PkmFilter, PkmState, Species, gen3_shiny};
use serde::{Deserialize, Serialize};
use tsify_next::Tsify;
use wasm_bindgen::prelude::*;

#[derive(Debug, Clone, Copy, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct Static3GeneratorResult {
    pub advance: usize,
    pub pid: u32,
    pub ivs: Ivs,
    pub ability: AbilityType,
    pub gender: Gender,
    pub nature: Nature,
    pub shiny: bool,
}

impl PkmState for Static3GeneratorResult {
    fn shiny(&self) -> bool {
        self.shiny
    }

    fn nature(&self) -> Nature {
        self.nature
    }

    fn ivs(&self) -> &Ivs {
        &self.ivs
    }

    fn ability(&self) -> AbilityType {
        self.ability
    }

    fn gender(&self) -> Gender {
        self.gender
    }
}

#[derive(Debug, Clone, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct Static3GeneratorOptions {
    pub offset: usize,
    pub initial_advances: usize,
    pub max_advances: usize,
    pub seed: u32,
    pub species: Species,
    pub bugged_roamer: bool,
    pub method4: bool,
    pub tid: u16,
    pub sid: u16,
    pub filter: PkmFilter,
}

#[derive(Debug, Clone, Copy, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct Static3SearcherResult {
    pub seed: u32,
    pub pid: u32,
    pub ivs: Ivs,
    pub ability: AbilityType,
    pub gender: Gender,
    pub nature: Nature,
    pub shiny: bool,
}

impl PkmState for Static3SearcherResult {
    fn shiny(&self) -> bool {
        self.shiny
    }

    fn nature(&self) -> Nature {
        self.nature
    }

    fn ivs(&self) -> &Ivs {
        &self.ivs
    }

    fn ability(&self) -> AbilityType {
        self.ability
    }

    fn gender(&self) -> Gender {
        self.gender
    }
}

#[derive(Debug, Clone, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct Static3SearcherOptions {
    pub tid: u16,
    pub sid: u16,
    pub method4: bool,
    pub bugged_roamer: bool,
    pub species: Species,
    pub filter: PkmFilter,
}

#[wasm_bindgen]
pub fn gen3_static_generator_states(opts: &Static3GeneratorOptions) -> Vec<Static3GeneratorResult> {
    StateIterator::new(Pokerng::new(opts.seed))
        .skip(opts.offset)
        .enumerate()
        .skip(opts.initial_advances)
        .take(opts.max_advances.saturating_add(1))
        .filter_map(|(advance, rng)| {
            let state = generate_gen3_static_state(rng, opts, advance);
            if opts.filter.pass_filter(&state) {
                Some(state)
            } else {
                None
            }
        })
        .collect()
}

pub fn gen3_static_searcher_states(opts: &Static3SearcherOptions) -> Vec<Static3SearcherResult> {
    let Ivs {
        hp: min_hp,
        atk: min_atk,
        def: min_def,
        spa: min_spa,
        spd: min_spd,
        spe: min_spe,
    } = opts.filter.min_ivs;

    let Ivs {
        hp: max_hp,
        atk: max_atk,
        def: max_def,
        spa: max_spa,
        spd: max_spd,
        spe: max_spe,
    } = opts.filter.max_ivs;

    (min_hp..=max_hp)
        .flat_map(move |hp| {
            (min_atk..=max_atk).flat_map(move |atk| {
                (min_def..=max_def).flat_map(move |def| {
                    (min_spa..=max_spa).flat_map(move |spa| {
                        (min_spd..=max_spd).flat_map(move |spd| {
                            (min_spe..=max_spe).flat_map(move |spe| {
                                search_gen3_static(
                                    Ivs {
                                        hp,
                                        atk,
                                        def,
                                        spa,
                                        spd,
                                        spe,
                                    },
                                    opts,
                                )
                            })
                        })
                    })
                })
            })
        })
        .collect()
}

fn search_gen3_static(mut ivs: Ivs, opts: &Static3SearcherOptions) -> Vec<Static3SearcherResult> {
    let seeds = lcrng::recover_poke_rng_iv(&ivs, opts.method4);

    if opts.bugged_roamer {
        ivs = Ivs {
            hp: ivs.hp,
            atk: ivs.atk & 7,
            ..Default::default()
        };
    }

    seeds
        .into_iter()
        .filter_map(|seed| {
            let mut rng = Pokerng::new(seed).rev();
            let pid = ((rng.rand::<u16>() as u32) << 16) | (rng.rand::<u16>() as u32);
            let nature = Nature::from_pid(pid);
            let state = Static3SearcherResult {
                seed: rng.rand::<u32>(),
                pid,
                ivs,
                ability: AbilityType::from((pid & 1) as u8),
                gender: opts.species.gender_from_pid(pid),
                nature,
                shiny: gen3_shiny(pid, opts.tid, opts.sid),
            };
            if opts.filter.pass_filter_no_ivs(&state) {
                Some(state)
            } else {
                None
            }
        })
        .collect()
}

fn generate_gen3_static_state(
    mut rng: Pokerng,
    opts: &Static3GeneratorOptions,
    advance: usize,
) -> Static3GeneratorResult {
    let pid = (rng.rand::<u16>() as u32) | ((rng.rand::<u16>() as u32) << 16);

    let iv1 = if opts.bugged_roamer {
        rng.rand::<u16>() & 0xFF
    } else {
        rng.rand::<u16>()
    };
    if opts.method4 {
        rng.next();
    }
    let iv2 = if opts.bugged_roamer {
        0
    } else {
        rng.rand::<u16>()
    };

    let ivs = Ivs::new_g3(iv1, iv2);

    Static3GeneratorResult {
        advance,
        pid,
        ivs,
        ability: AbilityType::from((pid & 1) as u8),
        gender: opts.species.gender_from_pid(pid),
        nature: Nature::from_pid(pid),
        shiny: gen3_shiny(pid, opts.tid, opts.sid),
    }
}

#[cfg(test)]
mod test {
    use super::*;
    use crate::assert_list_eq;

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
    fn generate_method4() {
        let opts = Static3GeneratorOptions {
            offset: 0,
            initial_advances: 0,
            max_advances: 9,
            seed: 0,
            species: Species::Groudon,
            bugged_roamer: false,
            method4: true,
            tid: 12345,
            sid: 54321,
            filter: PkmFilter {
                shiny: false,
                nature: None,
                gender: None,
                min_ivs: ZERO_IVS,
                max_ivs: PERFECT_IVS,
                ability: None,
            },
        };

        let results = gen3_static_generator_states(&opts);
        let expected = vec![
            Static3GeneratorResult {
                advance: 0,
                pid: 3917348864,
                ivs: Ivs {
                    hp: 17,
                    atk: 19,
                    def: 20,
                    spa: 18,
                    spd: 3,
                    spe: 2,
                },
                ability: AbilityType::First,
                gender: Gender::Genderless,
                nature: Nature::Naive,
                shiny: false,
            },
            Static3GeneratorResult {
                advance: 1,
                pid: 1383197054,
                ivs: Ivs {
                    hp: 16,
                    atk: 13,
                    def: 12,
                    spa: 22,
                    spd: 24,
                    spe: 12,
                },
                ability: AbilityType::First,
                gender: Gender::Genderless,
                nature: Nature::Naughty,
                shiny: false,
            },
            Static3GeneratorResult {
                advance: 2,
                pid: 833639025,
                ivs: Ivs {
                    hp: 2,
                    atk: 18,
                    def: 3,
                    spa: 30,
                    spd: 11,
                    spe: 5,
                },
                ability: AbilityType::Second,
                gender: Gender::Genderless,
                nature: Nature::Hardy,
                shiny: false,
            },
            Static3GeneratorResult {
                advance: 3,
                pid: 2386702768,
                ivs: Ivs {
                    hp: 12,
                    atk: 22,
                    def: 24,
                    spa: 30,
                    spd: 25,
                    spe: 27,
                },
                ability: AbilityType::First,
                gender: Gender::Genderless,
                nature: Nature::Bashful,
                shiny: false,
            },
            Static3GeneratorResult {
                advance: 4,
                pid: 3805056578,
                ivs: Ivs {
                    hp: 5,
                    atk: 30,
                    def: 11,
                    spa: 1,
                    spd: 31,
                    spe: 19,
                },
                ability: AbilityType::First,
                gender: Gender::Genderless,
                nature: Nature::Adamant,
                shiny: false,
            },
            Static3GeneratorResult {
                advance: 5,
                pid: 2948981452,
                ivs: Ivs {
                    hp: 27,
                    atk: 30,
                    def: 25,
                    spa: 25,
                    spd: 27,
                    spe: 12,
                },
                ability: AbilityType::First,
                gender: Gender::Genderless,
                nature: Nature::Brave,
                shiny: false,
            },
            Static3GeneratorResult {
                advance: 6,
                pid: 1742450629,
                ivs: Ivs {
                    hp: 19,
                    atk: 1,
                    def: 31,
                    spa: 2,
                    spd: 31,
                    spe: 30,
                },
                ability: AbilityType::Second,
                gender: Gender::Genderless,
                nature: Nature::Naughty,
                shiny: false,
            },
            Static3GeneratorResult {
                advance: 7,
                pid: 4231227355,
                ivs: Ivs {
                    hp: 12,
                    atk: 25,
                    def: 27,
                    spa: 22,
                    spd: 18,
                    spe: 5,
                },
                ability: AbilityType::Second,
                gender: Gender::Genderless,
                nature: Nature::Bold,
                shiny: false,
            },
            Static3GeneratorResult {
                advance: 8,
                pid: 4012702771,
                ivs: Ivs {
                    hp: 30,
                    atk: 2,
                    def: 31,
                    spa: 30,
                    spd: 26,
                    spe: 22,
                },
                ability: AbilityType::Second,
                gender: Gender::Genderless,
                nature: Nature::Gentle,
                shiny: false,
            },
            Static3GeneratorResult {
                advance: 9,
                pid: 4234080044,
                ivs: Ivs {
                    hp: 5,
                    atk: 22,
                    def: 18,
                    spa: 9,
                    spd: 6,
                    spe: 29,
                },
                ability: AbilityType::First,
                gender: Gender::Genderless,
                nature: Nature::Rash,
                shiny: false,
            },
        ];

        assert_list_eq!(results, expected);
    }

    #[test]
    fn generate_method1() {
        let opts = Static3GeneratorOptions {
            offset: 0,
            initial_advances: 0,
            max_advances: 9,
            seed: 1431655765,
            species: Species::Totodile,
            bugged_roamer: false,
            method4: false,
            tid: 12345,
            sid: 54321,
            filter: PkmFilter {
                shiny: false,
                nature: None,
                gender: None,
                min_ivs: ZERO_IVS,
                max_ivs: PERFECT_IVS,
                ability: None,
            },
        };

        let results = gen3_static_generator_states(&opts);
        let expected = vec![
            Static3GeneratorResult {
                advance: 0,
                pid: 2828921363,
                ivs: Ivs {
                    hp: 17,
                    atk: 7,
                    def: 31,
                    spa: 29,
                    spd: 13,
                    spe: 14,
                },
                ability: AbilityType::Second,
                gender: Gender::Female,
                nature: Nature::Jolly,
                shiny: false,
            },
            Static3GeneratorResult {
                advance: 1,
                pid: 2096212125,
                ivs: Ivs {
                    hp: 14,
                    atk: 29,
                    def: 13,
                    spa: 8,
                    spd: 5,
                    spe: 12,
                },
                ability: AbilityType::Second,
                gender: Gender::Male,
                nature: Nature::Hardy,
                shiny: false,
            },
            Static3GeneratorResult {
                advance: 2,
                pid: 934182129,
                ivs: Ivs {
                    hp: 12,
                    atk: 8,
                    def: 5,
                    spa: 22,
                    spd: 17,
                    spe: 24,
                },
                ability: AbilityType::Second,
                gender: Gender::Male,
                nature: Nature::Naughty,
                shiny: false,
            },
            Static3GeneratorResult {
                advance: 3,
                pid: 2500605870,
                ivs: Ivs {
                    hp: 24,
                    atk: 22,
                    def: 17,
                    spa: 21,
                    spd: 9,
                    spe: 19,
                },
                ability: AbilityType::First,
                gender: Gender::Male,
                nature: Nature::Calm,
                shiny: false,
            },
            Static3GeneratorResult {
                advance: 4,
                pid: 1188599052,
                ivs: Ivs {
                    hp: 19,
                    atk: 21,
                    def: 9,
                    spa: 20,
                    spd: 8,
                    spe: 17,
                },
                ability: AbilityType::First,
                gender: Gender::Female,
                nature: Nature::Brave,
                shiny: false,
            },
            Static3GeneratorResult {
                advance: 5,
                pid: 649283288,
                ivs: Ivs {
                    hp: 17,
                    atk: 20,
                    def: 8,
                    spa: 12,
                    spd: 8,
                    spe: 10,
                },
                ability: AbilityType::First,
                gender: Gender::Male,
                nature: Nature::Jolly,
                shiny: false,
            },
            Static3GeneratorResult {
                advance: 6,
                pid: 579937971,
                ivs: Ivs {
                    hp: 10,
                    atk: 12,
                    def: 8,
                    spa: 27,
                    spd: 7,
                    spe: 24,
                },
                ability: AbilityType::Second,
                gender: Gender::Male,
                nature: Nature::Gentle,
                shiny: false,
            },
            Static3GeneratorResult {
                advance: 7,
                pid: 2710184593,
                ivs: Ivs {
                    hp: 24,
                    atk: 27,
                    def: 7,
                    spa: 6,
                    spd: 2,
                    spe: 1,
                },
                ability: AbilityType::Second,
                gender: Gender::Male,
                nature: Nature::Bashful,
                shiny: false,
            },
            Static3GeneratorResult {
                advance: 8,
                pid: 2675483018,
                ivs: Ivs {
                    hp: 1,
                    atk: 6,
                    def: 2,
                    spa: 0,
                    spd: 2,
                    spe: 10,
                },
                ability: AbilityType::First,
                gender: Gender::Male,
                nature: Nature::Bashful,
                shiny: false,
            },
            Static3GeneratorResult {
                advance: 9,
                pid: 2294390648,
                ivs: Ivs {
                    hp: 10,
                    atk: 0,
                    def: 2,
                    spa: 27,
                    spd: 25,
                    spe: 1,
                },
                ability: AbilityType::First,
                gender: Gender::Male,
                nature: Nature::Careful,
                shiny: false,
            },
        ];

        assert_list_eq!(results, expected);
    }

    #[test]
    fn generate_bugged_roamer() {
        let opts = Static3GeneratorOptions {
            offset: 0,
            initial_advances: 0,
            max_advances: 9,
            seed: 0,
            species: Species::Latias,
            bugged_roamer: true,
            method4: false,
            tid: 12345,
            sid: 54321,
            filter: PkmFilter {
                shiny: false,
                nature: None,
                gender: None,
                min_ivs: ZERO_IVS,
                max_ivs: PERFECT_IVS,
                ability: None,
            },
        };

        let results = gen3_static_generator_states(&opts);
        let expected = vec![
            Static3GeneratorResult {
                advance: 0,
                pid: 0xE97E0000,
                ivs: Ivs {
                    hp: 17,
                    atk: 3,
                    def: 0,
                    spa: 0,
                    spd: 0,
                    spe: 0,
                },
                ability: AbilityType::First,
                gender: Gender::Female,
                nature: Nature::Naive,
                shiny: false,
            },
            Static3GeneratorResult {
                advance: 1,
                pid: 0x5271E97E,
                ivs: Ivs {
                    hp: 16,
                    atk: 5,
                    def: 0,
                    spa: 0,
                    spd: 0,
                    spe: 0,
                },
                ability: AbilityType::First,
                gender: Gender::Female,
                nature: Nature::Naughty,
                shiny: false,
            },
            Static3GeneratorResult {
                advance: 2,
                pid: 0x31B05271,
                ivs: Ivs {
                    hp: 2,
                    atk: 2,
                    def: 0,
                    spa: 0,
                    spd: 0,
                    spe: 0,
                },
                ability: AbilityType::Second,
                gender: Gender::Female,
                nature: Nature::Hardy,
                shiny: false,
            },
            Static3GeneratorResult {
                advance: 3,
                pid: 0x8E4231B0,
                ivs: Ivs {
                    hp: 12,
                    atk: 6,
                    def: 0,
                    spa: 0,
                    spd: 0,
                    spe: 0,
                },
                ability: AbilityType::First,
                gender: Gender::Female,
                nature: Nature::Bashful,
                shiny: false,
            },
            Static3GeneratorResult {
                advance: 4,
                pid: 0xE2CC8E42,
                ivs: Ivs {
                    hp: 5,
                    atk: 6,
                    def: 0,
                    spa: 0,
                    spd: 0,
                    spe: 0,
                },
                ability: AbilityType::First,
                gender: Gender::Female,
                nature: Nature::Adamant,
                shiny: false,
            },
            Static3GeneratorResult {
                advance: 5,
                pid: 0xAFC5E2CC,
                ivs: Ivs {
                    hp: 27,
                    atk: 6,
                    def: 0,
                    spa: 0,
                    spd: 0,
                    spe: 0,
                },
                ability: AbilityType::First,
                gender: Gender::Female,
                nature: Nature::Brave,
                shiny: false,
            },
            Static3GeneratorResult {
                advance: 6,
                pid: 0x67DBAFC5,
                ivs: Ivs {
                    hp: 19,
                    atk: 1,
                    def: 0,
                    spa: 0,
                    spd: 0,
                    spe: 0,
                },
                ability: AbilityType::Second,
                gender: Gender::Female,
                nature: Nature::Naughty,
                shiny: false,
            },
            Static3GeneratorResult {
                advance: 7,
                pid: 0xFC3367DB,
                ivs: Ivs {
                    hp: 12,
                    atk: 1,
                    def: 0,
                    spa: 0,
                    spd: 0,
                    spe: 0,
                },
                ability: AbilityType::Second,
                gender: Gender::Female,
                nature: Nature::Bold,
                shiny: false,
            },
            Static3GeneratorResult {
                advance: 8,
                pid: 0xEF2CFC33,
                ivs: Ivs {
                    hp: 30,
                    atk: 2,
                    def: 0,
                    spa: 0,
                    spd: 0,
                    spe: 0,
                },
                ability: AbilityType::Second,
                gender: Gender::Female,
                nature: Nature::Gentle,
                shiny: false,
            },
            Static3GeneratorResult {
                advance: 9,
                pid: 0xFC5EEF2C,
                ivs: Ivs {
                    hp: 5,
                    atk: 6,
                    def: 0,
                    spa: 0,
                    spd: 0,
                    spe: 0,
                },
                ability: AbilityType::First,
                gender: Gender::Female,
                nature: Nature::Rash,
                shiny: false,
            },
        ];

        assert_list_eq!(results, expected);
    }

    #[test]
    fn generate_method1_with_initial_advances() {
        let opts = Static3GeneratorOptions {
            offset: 0,
            initial_advances: 10,
            max_advances: 4,
            seed: 0x55555555,
            species: Species::Totodile,
            bugged_roamer: false,
            method4: false,
            tid: 12345,
            sid: 54321,
            filter: PkmFilter {
                shiny: false,
                nature: None,
                gender: None,
                min_ivs: ZERO_IVS,
                max_ivs: PERFECT_IVS,
                ability: None,
            },
        };

        let results = gen3_static_generator_states(&opts);
        let expected = vec![
            Static3GeneratorResult {
                advance: 10,
                pid: 0x880A88C1,
                shiny: false,
                nature: Nature::Calm,
                ability: AbilityType::Second,
                ivs: Ivs {
                    hp: 1,
                    atk: 27,
                    def: 25,
                    spa: 28,
                    spd: 26,
                    spe: 19,
                },
                gender: Gender::Male,
            },
            Static3GeneratorResult {
                advance: 11,
                pid: 0x6761880A,
                shiny: false,
                nature: Nature::Mild,
                ability: AbilityType::First,
                ivs: Ivs {
                    hp: 19,
                    atk: 28,
                    def: 26,
                    spa: 12,
                    spd: 16,
                    spe: 17,
                },
                gender: Gender::Female,
            },
            Static3GeneratorResult {
                advance: 12,
                pid: 0x6B936761,
                shiny: false,
                nature: Nature::Rash,
                ability: AbilityType::Second,
                ivs: Ivs {
                    hp: 17,
                    atk: 12,
                    def: 16,
                    spa: 9,
                    spd: 0,
                    spe: 10,
                },
                gender: Gender::Male,
            },
            Static3GeneratorResult {
                advance: 13,
                pid: 0xC1916B93,
                shiny: false,
                nature: Nature::Sassy,
                ability: AbilityType::Second,
                ivs: Ivs {
                    hp: 10,
                    atk: 9,
                    def: 0,
                    spa: 15,
                    spd: 4,
                    spe: 26,
                },
                gender: Gender::Male,
            },
            Static3GeneratorResult {
                advance: 14,
                pid: 0x012AC191,
                shiny: false,
                nature: Nature::Docile,
                ability: AbilityType::Second,
                ivs: Ivs {
                    hp: 26,
                    atk: 15,
                    def: 4,
                    spa: 21,
                    spd: 16,
                    spe: 22,
                },
                gender: Gender::Male,
            },
        ];

        assert_list_eq!(results, expected);
    }

    #[test]
    fn search_method4() {
        let opts = Static3SearcherOptions {
            species: Species::Groudon,
            bugged_roamer: false,
            method4: true,
            tid: 12345,
            sid: 54321,
            filter: PkmFilter {
                shiny: false,
                nature: None,
                gender: None,
                min_ivs: PERFECT_IVS,
                max_ivs: PERFECT_IVS,
                ability: None,
            },
        };

        let results = gen3_static_searcher_states(&opts);
        assert_eq!(results.len(), 4);

        let mut opts = Static3GeneratorOptions {
            offset: 0,
            initial_advances: 0,
            max_advances: 0,
            seed: 0,
            species: Species::Groudon,
            bugged_roamer: false,
            method4: true,
            tid: 12345,
            sid: 54321,
            filter: PkmFilter {
                shiny: false,
                nature: None,
                gender: None,
                min_ivs: PERFECT_IVS,
                max_ivs: PERFECT_IVS,
                ability: None,
            },
        };

        results.into_iter().for_each(|result| {
            opts.seed = result.seed;
            let generated = gen3_static_generator_states(&opts);
            assert_eq!(generated.len(), 1);
            let generated = generated[0];
            assert_eq!(generated.pid, result.pid);
            assert_eq!(generated.shiny, result.shiny);
            assert_eq!(generated.nature, result.nature);
            assert_eq!(generated.gender, result.gender);
            assert_eq!(generated.ability, result.ability);
            assert_eq!(generated.ivs, result.ivs);
        })
    }

    #[test]
    fn search_method1() {
        let opts = Static3SearcherOptions {
            species: Species::Totodile,
            bugged_roamer: false,
            method4: false,
            tid: 12345,
            sid: 54321,
            filter: PkmFilter {
                shiny: false,
                nature: None,
                gender: None,
                min_ivs: PERFECT_IVS,
                max_ivs: PERFECT_IVS,
                ability: None,
            },
        };

        let results = gen3_static_searcher_states(&opts);
        assert_eq!(results.len(), 6);

        let mut opts = Static3GeneratorOptions {
            offset: 0,
            initial_advances: 0,
            max_advances: 0,
            seed: 0,
            species: Species::Totodile,
            bugged_roamer: false,
            method4: false,
            tid: 12345,
            sid: 54321,
            filter: PkmFilter {
                shiny: false,
                nature: None,
                gender: None,
                min_ivs: PERFECT_IVS,
                max_ivs: PERFECT_IVS,
                ability: None,
            },
        };

        results.into_iter().for_each(|result| {
            opts.seed = result.seed;
            let generated = gen3_static_generator_states(&opts);
            assert_eq!(generated.len(), 1);
            let generated = generated[0];
            assert_eq!(generated.pid, result.pid);
            assert_eq!(generated.shiny, result.shiny);
            assert_eq!(generated.nature, result.nature);
            assert_eq!(generated.gender, result.gender);
            assert_eq!(generated.ability, result.ability);
            assert_eq!(generated.ivs, result.ivs);
        })
    }

    #[test]
    fn search_bugged_roamer() {
        let opts = Static3SearcherOptions {
            species: Species::Latios,
            bugged_roamer: true,
            method4: false,
            tid: 12345,
            sid: 54321,
            filter: PkmFilter {
                shiny: false,
                nature: None,
                gender: None,
                min_ivs: PERFECT_IVS,
                max_ivs: PERFECT_IVS,
                ability: None,
            },
        };

        let results = gen3_static_searcher_states(&opts);
        assert_eq!(results.len(), 6);

        let mut opts = Static3GeneratorOptions {
            offset: 0,
            initial_advances: 0,
            max_advances: 0,
            seed: 0,
            species: Species::Latios,
            bugged_roamer: true,
            method4: false,
            tid: 12345,
            sid: 54321,
            filter: PkmFilter {
                shiny: false,
                nature: None,
                gender: None,
                min_ivs: Ivs {
                    hp: 31,
                    atk: 7,
                    ..Default::default()
                },
                max_ivs: PERFECT_IVS,
                ability: None,
            },
        };

        results.into_iter().for_each(|result| {
            opts.seed = result.seed;
            let generated = gen3_static_generator_states(&opts);
            assert_eq!(generated.len(), 1);
            let generated = generated[0];
            assert_eq!(generated.pid, result.pid);
            assert_eq!(generated.shiny, result.shiny);
            assert_eq!(generated.nature, result.nature);
            assert_eq!(generated.gender, result.gender);
            assert_eq!(generated.ability, result.ability);
            assert_eq!(generated.ivs, result.ivs);
        })
    }
}
