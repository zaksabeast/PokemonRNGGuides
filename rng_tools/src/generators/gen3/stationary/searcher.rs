use crate::generators::utils::recover_poke_rng_iv;
use crate::rng::Rng;
use crate::rng::lcrng::Pokerng;
use crate::{AbilityType, Gender, Ivs, Nature, PkmFilter, PkmState, Species, gen3_shiny, iv_iter};
use serde::{Deserialize, Serialize};
use tsify::Tsify;
use wasm_bindgen::prelude::*;

#[derive(Debug, Clone, Copy, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct Static3SearcherResult {
    pub pid: u32,
    pub ivs: Ivs,
    pub method4: bool,

    // derived from pid
    pub ability: AbilityType,
    pub gender: Gender,
    pub nature: Nature,
    pub shiny: bool,

    // derived from ivs
    pub hidden_power: HiddenPower,

    // from generator options
    /** advance is distance from initial_seed to seed. initial_seed is 0 if searcher finds painting seed */
    pub advance: usize,
    pub seed: u32,
}


impl Static3SearcherResult {
    pub fn new(
        gen_res: &Static3GeneratorResult,
        gen_opts: &Static3GeneratorOptions,
        seed: u32,
        advance: usize,
    ) -> Static3SearcherResultMon {
        Static3SearcherResultMon {
            pid: gen_res.pid,
            ivs: gen_res.ivs,
            method4: false,
            species: gen_opts.species,
            shiny: gen3_shiny(gen_res.pid, gen_opts.tid, gen_opts.sid),
            nature: Nature::from_pid(gen_res.pid),
            ability: AbilityType::from_gen3_pid(gen_res.pid),
            gender: gen_opts.gender_ratio
                .gender_from_pid(gen_res.pid),
            hidden_power: HiddenPower::from_ivs(&gen_res.ivs),
            advance,
            seed,
        }
    }
}

#[derive(Debug, Clone, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct Static3SearcherOptions {
    pub initial_seed: u32,
    pub tid: u16,
    pub sid: u16,
    pub initial_advances: usize,
    pub max_advances: usize,
    pub max_result_count: usize,
    pub filter: PkmFilter,
    pub gen3_filter: Gen3PkmFilter,
    pub painting_opts: Option<Wild3PaintingOpts>,
    pub species:Species,
}

#[wasm_bindgen]
pub fn search_static3_naive(opts: &Static3SearcherOptions) -> Vec<Static3SearcherResultMon> {
    let base_rng = Pokerng::with_jump(opts.initial_seed, opts.initial_advances);

    let gen_opts = Static3GeneratorOptions {
        bugged_roamer: false,
        method: Gen3StaticMethod::Static1,
        tid: opts.tid,
        sid: opts.sid,
        filter: *opts.filter,
        gen3_filter: *opts.gen3_filter,
        encounter_gender_ratio:opts.species.gender_ratio()
    };

    StateIterator::new(base_rng)
        .enumerate()
        .skip(opts.initial_advances)
        .take(opts.max_advances.saturating_add(1))
        .filter_map(|(advance, rng)| {
            generate_gen3_static(rng, opts).map|(|gen_res|{

                Static3SearcherResultMon::new(
                    gen_res,
                    &gen_opts,
                    rng.seed(),
                    advance,
                )
            })
        })
        .take(opts.max_result_count)
        .collect()
}


#[wasm_bindgen]
pub fn search_static3(opts: &Static3SearcherOptions) -> Vec<Static3SearcherResultMon> {
    search_static3_naive(opts)
    //search_static3_reverse(opts)
}



fn extend_pid_paths_to_results<I>(
    opts: &Static3SearcherOptions,
    iter: I,
) -> Vec<Static3SearcherResultMon>
where
    I: Iterator<Item = PidPath>,
{
}

#[wasm_bindgen]
pub fn search_static3_reverse(opts: &Static3SearcherOptions) -> Vec<Static3SearcherResultMon> {
    let find_opts = new_find_pid_paths_options(opts);

    let pid_paths:Vec<PidPath> = match determine_best_pid_path_strategy(&find_opts) {
        PidPathStrategy::ByStepIv1 => {
            find_pid_paths_by_step_iv1::<true>(&find_opts).collect()
        }
        PidPathStrategy::ByStepIv2 => {
            find_pid_paths_by_step_iv2::<true>(&find_opts).collect()
        }
        PidPathStrategy::ByStepPid => {
            find_pid_paths_by_step_pid::<true>(&find_opts).collect()
        }
        PidPathStrategy::ReverseIv => {
            find_pid_paths_reverse_iv::<true>(&find_opts).collect()
        }
        PidPathStrategy::ReversePidCycleSpeed => {
            find_pid_paths_reverse_pid_cycle_speed::<true>(&find_opts).collect()
        }
    };


}








#[cfg(test)]
mod test {
    use super::*;
    use crate::gen3::{Static3GeneratorOptions, gen3_static_generator_states};

    #[test]
    fn search_method4() {
        let opts = Static3SearcherOptions {
            species: Species::Groudon,
            bugged_roamer: false,
            method4: true,
            tid: 12345,
            sid: 54321,
            filter: PkmFilter {
                min_ivs: Ivs::new_all31(),
                ..Default::default()
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
                min_ivs: Ivs::new_all31(),
                ..Default::default()
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
                min_ivs: Ivs::new_all31(),
                ..Default::default()
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
                min_ivs: Ivs::new_all31(),
                ..Default::default()
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
                min_ivs: Ivs::new_all31(),
                ..Default::default()
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
                min_ivs: Ivs {
                    hp: 31,
                    atk: 7,
                    ..Default::default()
                },
                ..Default::default()
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
