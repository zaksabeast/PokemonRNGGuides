use crate::rng::lcrng::Pokerng;
use crate::rng::{Rng, StateIterator};
use crate::{Gender, IvFilter, Ivs, Nature, Species, gen3_shiny};
use serde::{Deserialize, Serialize};
use tsify_next::Tsify;
use wasm_bindgen::prelude::*;

#[derive(Debug, Clone, Copy, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct Static3Result {
    pub advance: usize,
    pub pid: u32,
    pub ivs: Ivs,
    pub ability: u8,
    pub gender: Gender,
    pub nature: Nature,
    pub shiny: bool,
}

#[derive(Debug, Clone, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct Static3Filter {
    pub shiny: bool,
    pub nature: Option<Nature>,
    pub gender: Option<Gender>,
    pub ivs: IvFilter,
    pub ability: Option<u8>,
}

impl Static3Filter {
    fn pass_filter(&self, state: &Static3Result) -> bool {
        if self.shiny && !state.shiny {
            return false;
        }

        if let Some(nature) = self.nature {
            if state.nature != nature {
                return false;
            }
        }

        if let Some(gender) = self.gender {
            if state.gender != gender {
                return false;
            }
        }

        if !state.ivs.filter(&self.ivs.min_ivs, &self.ivs.max_ivs) {
            return false;
        }

        if let Some(ability) = self.ability {
            if ability != state.ability {
                return false;
            }
        }

        true
    }
}

#[derive(Debug, Clone, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct Static3Options {
    pub offset: usize,
    pub initial_advances: usize,
    pub max_advances: usize,
    pub seed: u32,
    pub species: Species,
    pub bugged_roamer: bool,
    pub method4: bool,
    pub tid: u16,
    pub sid: u16,
    pub filter: Static3Filter,
}

#[wasm_bindgen]
pub fn gen3_static_states(opts: &Static3Options) -> Vec<Static3Result> {
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

fn generate_gen3_static_state(
    mut rng: Pokerng,
    opts: &Static3Options,
    advance: usize,
) -> Static3Result {
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

    Static3Result {
        advance,
        pid,
        ivs,
        ability: (pid & 1) as u8,
        gender: opts.species.gender(pid),
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
        let opts = Static3Options {
            offset: 0,
            initial_advances: 0,
            max_advances: 9,
            seed: 0,
            species: Species::Groudon,
            bugged_roamer: false,
            method4: true,
            tid: 12345,
            sid: 54321,
            filter: Static3Filter {
                shiny: false,
                nature: None,
                gender: None,
                ivs: IvFilter {
                    min_ivs: ZERO_IVS,
                    max_ivs: PERFECT_IVS,
                },
                ability: None,
            },
        };

        let results = gen3_static_states(&opts);
        let expected = vec![
            Static3Result {
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
                ability: 0,
                gender: Gender::Genderless,
                nature: Nature::Naive,
                shiny: false,
            },
            Static3Result {
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
                ability: 0,
                gender: Gender::Genderless,
                nature: Nature::Naughty,
                shiny: false,
            },
            Static3Result {
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
                ability: 1,
                gender: Gender::Genderless,
                nature: Nature::Hardy,
                shiny: false,
            },
            Static3Result {
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
                ability: 0,
                gender: Gender::Genderless,
                nature: Nature::Bashful,
                shiny: false,
            },
            Static3Result {
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
                ability: 0,
                gender: Gender::Genderless,
                nature: Nature::Adamant,
                shiny: false,
            },
            Static3Result {
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
                ability: 0,
                gender: Gender::Genderless,
                nature: Nature::Brave,
                shiny: false,
            },
            Static3Result {
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
                ability: 1,
                gender: Gender::Genderless,
                nature: Nature::Naughty,
                shiny: false,
            },
            Static3Result {
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
                ability: 1,
                gender: Gender::Genderless,
                nature: Nature::Bold,
                shiny: false,
            },
            Static3Result {
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
                ability: 1,
                gender: Gender::Genderless,
                nature: Nature::Gentle,
                shiny: false,
            },
            Static3Result {
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
                ability: 0,
                gender: Gender::Genderless,
                nature: Nature::Rash,
                shiny: false,
            },
        ];

        assert_list_eq!(results, expected);
    }

    #[test]
    fn generate_method1() {
        let opts = Static3Options {
            offset: 0,
            initial_advances: 0,
            max_advances: 9,
            seed: 1431655765,
            species: Species::Totodile,
            bugged_roamer: false,
            method4: false,
            tid: 12345,
            sid: 54321,
            filter: Static3Filter {
                shiny: false,
                nature: None,
                gender: None,
                ivs: IvFilter {
                    min_ivs: ZERO_IVS,
                    max_ivs: PERFECT_IVS,
                },
                ability: None,
            },
        };

        let results = gen3_static_states(&opts);
        let expected = vec![
            Static3Result {
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
                ability: 1,
                gender: Gender::Female,
                nature: Nature::Jolly,
                shiny: false,
            },
            Static3Result {
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
                ability: 1,
                gender: Gender::Male,
                nature: Nature::Hardy,
                shiny: false,
            },
            Static3Result {
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
                ability: 1,
                gender: Gender::Male,
                nature: Nature::Naughty,
                shiny: false,
            },
            Static3Result {
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
                ability: 0,
                gender: Gender::Male,
                nature: Nature::Calm,
                shiny: false,
            },
            Static3Result {
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
                ability: 0,
                gender: Gender::Female,
                nature: Nature::Brave,
                shiny: false,
            },
            Static3Result {
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
                ability: 0,
                gender: Gender::Male,
                nature: Nature::Jolly,
                shiny: false,
            },
            Static3Result {
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
                ability: 1,
                gender: Gender::Male,
                nature: Nature::Gentle,
                shiny: false,
            },
            Static3Result {
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
                ability: 1,
                gender: Gender::Male,
                nature: Nature::Bashful,
                shiny: false,
            },
            Static3Result {
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
                ability: 0,
                gender: Gender::Male,
                nature: Nature::Bashful,
                shiny: false,
            },
            Static3Result {
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
                ability: 0,
                gender: Gender::Male,
                nature: Nature::Careful,
                shiny: false,
            },
        ];

        assert_list_eq!(results, expected);
    }

    #[test]
    fn generate_bugged_roamer() {
        let opts = Static3Options {
            offset: 0,
            initial_advances: 0,
            max_advances: 9,
            seed: 0,
            species: Species::Latias,
            bugged_roamer: true,
            method4: false,
            tid: 12345,
            sid: 54321,
            filter: Static3Filter {
                shiny: false,
                nature: None,
                gender: None,
                ivs: IvFilter {
                    min_ivs: ZERO_IVS,
                    max_ivs: PERFECT_IVS,
                },
                ability: None,
            },
        };

        let results = gen3_static_states(&opts);
        let expected = vec![
            Static3Result {
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
                ability: 0,
                gender: Gender::Female,
                nature: Nature::Naive,
                shiny: false,
            },
            Static3Result {
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
                ability: 0,
                gender: Gender::Female,
                nature: Nature::Naughty,
                shiny: false,
            },
            Static3Result {
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
                ability: 1,
                gender: Gender::Female,
                nature: Nature::Hardy,
                shiny: false,
            },
            Static3Result {
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
                ability: 0,
                gender: Gender::Female,
                nature: Nature::Bashful,
                shiny: false,
            },
            Static3Result {
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
                ability: 0,
                gender: Gender::Female,
                nature: Nature::Adamant,
                shiny: false,
            },
            Static3Result {
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
                ability: 0,
                gender: Gender::Female,
                nature: Nature::Brave,
                shiny: false,
            },
            Static3Result {
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
                ability: 1,
                gender: Gender::Female,
                nature: Nature::Naughty,
                shiny: false,
            },
            Static3Result {
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
                ability: 1,
                gender: Gender::Female,
                nature: Nature::Bold,
                shiny: false,
            },
            Static3Result {
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
                ability: 1,
                gender: Gender::Female,
                nature: Nature::Gentle,
                shiny: false,
            },
            Static3Result {
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
                ability: 0,
                gender: Gender::Female,
                nature: Nature::Rash,
                shiny: false,
            },
        ];

        assert_list_eq!(results, expected);
    }

    #[test]
    fn generate_method1_with_initial_advances() {
        let opts = Static3Options {
            offset: 0,
            initial_advances: 10,
            max_advances: 4,
            seed: 0x55555555,
            species: Species::Totodile,
            bugged_roamer: false,
            method4: false,
            tid: 12345,
            sid: 54321,
            filter: Static3Filter {
                shiny: false,
                nature: None,
                gender: None,
                ivs: IvFilter {
                    min_ivs: ZERO_IVS,
                    max_ivs: PERFECT_IVS,
                },
                ability: None,
            },
        };

        let results = gen3_static_states(&opts);
        let expected = vec![
            Static3Result {
                advance: 10,
                pid: 0x880A88C1,
                shiny: false,
                nature: Nature::Calm,
                ability: 1,
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
            Static3Result {
                advance: 11,
                pid: 0x6761880A,
                shiny: false,
                nature: Nature::Mild,
                ability: 0,
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
            Static3Result {
                advance: 12,
                pid: 0x6B936761,
                shiny: false,
                nature: Nature::Rash,
                ability: 1,
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
            Static3Result {
                advance: 13,
                pid: 0xC1916B93,
                shiny: false,
                nature: Nature::Sassy,
                ability: 1,
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
            Static3Result {
                advance: 14,
                pid: 0x012AC191,
                shiny: false,
                nature: Nature::Docile,
                ability: 1,
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
}
