use crate::rng::lcrng::Lcrng;
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
    StateIterator::new(Lcrng::new_prng(opts.seed))
        .skip(opts.initial_advances + opts.offset)
        .take(opts.max_advances.saturating_add(1))
        .enumerate()
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
    mut rng: Lcrng,
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
    fn rse_method4() {
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

        assert_eq!(results, expected);
    }
}
