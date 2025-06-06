use crate::generators::utils::recover_poke_rng_iv;
use crate::rng::Rng;
use crate::rng::lcrng::Pokerng;
use crate::{AbilityType, Gender, Ivs, Nature, PkmFilter, PkmState, Species, gen3_shiny};
use itertools::iproduct;
use serde::{Deserialize, Serialize};
use tsify_next::Tsify;
use wasm_bindgen::prelude::*;

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

    iproduct!(
        min_hp..=max_hp,
        min_atk..=max_atk,
        min_def..=max_def,
        min_spa..=max_spa,
        min_spd..=max_spd,
        min_spe..=max_spe
    )
    .flat_map(|(hp, atk, def, spa, spd, spe)| {
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
    .collect()
}

fn search_gen3_static(mut ivs: Ivs, opts: &Static3SearcherOptions) -> Vec<Static3SearcherResult> {
    let seeds = recover_poke_rng_iv(&ivs, opts.method4);

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

#[cfg(test)]
mod test {
    use super::*;
    use crate::gen3::{Static3GeneratorOptions, gen3_static_generator_states};

    const PERFECT_IVS: Ivs = Ivs {
        hp: 31,
        atk: 31,
        def: 31,
        spa: 31,
        spd: 31,
        spe: 31,
    };

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
                stats: None,
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
                stats: None,
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
                stats: None,
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
                stats: None,
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
                stats: None,
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
                stats: None,
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
