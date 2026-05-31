use crate::gen3::{
    FindPidPathsOptions, Gen3Method, Gen3PkmFilter, PidPath, PidPathStrategy,
    find_pid_paths_by_step_iv1, find_pid_paths_by_step_iv2, find_pid_paths_by_step_pid,
    find_pid_paths_reverse_iv, find_pid_paths_reverse_pid_cycle_speed_low_high,
    find_pid_paths_reverse_pid_cycle_speed_mid, find_pid_paths_reverse_pid_shiny,
    searcher_painter::{Wild3PaintingAdvFinder, Wild3PaintingOpts},
};
use crate::gen3::searcher_reverse::{METHOD_1, METHOD_4};
use crate::rng::lcrng::Pokerng;
use crate::rng::StateIterator;
use crate::{
    AbilityType, Gender, HiddenPower, Ivs, Nature, PkmFilter, Species, gen3_shiny, gen3_tsv,
};
use serde::{Deserialize, Serialize};
use tsify::Tsify;
use wasm_bindgen::prelude::*;

use super::{Gen3StaticMethod, Static3GeneratorOptions, Static3GeneratorResult, generate_gen3_static};
use crate::gen3::{determine_best_pid_path_strategy, wild::lcrng_distance};

#[derive(Debug, Clone, Copy, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct Static3SearcherResult {
    pub pid: u32,
    pub ivs: Ivs,
    pub method: Gen3StaticMethod,

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
    ) -> Static3SearcherResult {
        Static3SearcherResult {
            pid: gen_res.pid,
            ivs: gen_res.ivs,
            method: gen_res.method,
            shiny: gen3_shiny(gen_res.pid, gen_opts.tid, gen_opts.sid),
            nature: Nature::from_pid(gen_res.pid),
            ability: AbilityType::from_gen3_pid(gen_res.pid),
            gender: gen_opts.encounter_gender_ratio
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
    pub species: Species,
    pub bugged_roamer: bool,
    pub methods: Vec<Gen3StaticMethod>,
}

#[wasm_bindgen]
pub fn search_static3_naive(opts: &Static3SearcherOptions) -> Vec<Static3SearcherResult> {
    let base_rng = Pokerng::with_jump(opts.initial_seed, opts.initial_advances);

    let gen_opts = Static3GeneratorOptions {
        bugged_roamer: opts.bugged_roamer,
        methods: opts.methods.clone(),
        tid: opts.tid,
        sid: opts.sid,
        filter: opts.filter.clone(),
        gen3_filter: opts.gen3_filter.clone(),
        encounter_gender_ratio: opts.species.gender_ratio(),
    };

    StateIterator::new(base_rng)
        .enumerate()
        .take(opts.max_advances.saturating_add(1))
        .flat_map(|(advance, rng)| {
            let seed = rng.seed();
            generate_gen3_static(rng, &gen_opts)
                .into_iter()
                .flatten()
                .map(move |gen_res| Static3SearcherResult::new(&gen_res, &gen_opts, seed, advance))
        })
        .take(opts.max_result_count)
        .collect()
}


#[wasm_bindgen]
pub fn search_static3(opts: &Static3SearcherOptions) -> Vec<Static3SearcherResult> {
    search_static3_reverse(opts)
    // for debug: search_static3_naive(opts)
}

fn extend_pid_paths_to_results<I>(
    opts: &Static3SearcherOptions,
    iter: I,
) -> Vec<Static3SearcherResult>
where
    I: Iterator<Item = PidPath>,
{
    iter.map(|pid_path|{
        let pid = pid_path.pid();
        let ivs = pid_path.ivs();
        let method = if pid_path.method() == Gen3Method::Wild1 {
            Gen3StaticMethod::Static1
        } else {
            Gen3StaticMethod::Static4
        };

        let advance = lcrng_distance(opts.initial_seed, pid_path.seed) as usize;

        Static3SearcherResult {
            pid,
            ivs,
            method,
            shiny: gen3_shiny(pid, opts.tid, opts.sid),
            nature: Nature::from_pid(pid),
            ability: AbilityType::from_gen3_pid(pid),
            gender: opts.species.gender_ratio()
                .gender_from_pid(pid),
            hidden_power: HiddenPower::from_ivs(&ivs),
            advance,
            seed: pid_path.seed,
        }
    }).collect()
}

#[wasm_bindgen]
pub fn search_static3_reverse(opts: &Static3SearcherOptions) -> Vec<Static3SearcherResult> {
    let find_opts = new_find_pid_paths_options(opts);

    match find_opts.method_bitset {
        0 => search_static3_reverse_with_methods::<0>(opts),
        1 => search_static3_reverse_with_methods::<1>(opts),
        8 => search_static3_reverse_with_methods::<8>(opts),
        _ => search_static3_reverse_with_methods::<9>(opts),
    }
}

fn new_find_pid_paths_options(opts: &Static3SearcherOptions) -> FindPidPathsOptions {
    let mut method_bitset = 0;
    if opts.methods.contains(&Gen3StaticMethod::Static1) {
        method_bitset |= METHOD_1;
    }
    if opts.methods.contains(&Gen3StaticMethod::Static4) {
        method_bitset |= METHOD_4;
    }

    FindPidPathsOptions {
        filter: opts.filter.clone(),
        gen3_filter: opts.gen3_filter.clone(),
        encounter_gender_ratio: opts.species.gender_ratio(),
        method_bitset,
        tsv: gen3_tsv(opts.tid, opts.sid),
        initial_seed: opts.initial_seed,
        initial_advances: opts.initial_advances,
        max_result_count: opts.max_result_count,
        max_advances: opts.max_advances,
        painting_adv_finder: opts.painting_opts.as_ref().map(Wild3PaintingAdvFinder::new),
    }
}

pub fn search_static3_reverse_with_methods<const METHODS: u8>(opts: &Static3SearcherOptions) -> Vec<Static3SearcherResult> {
    let find_opts = new_find_pid_paths_options(opts);

    let strategy = determine_best_pid_path_strategy(&find_opts);

    match strategy {
        PidPathStrategy::ByStepIv1 => {
            extend_pid_paths_to_results(opts, find_pid_paths_by_step_iv1::<METHODS>(&find_opts))
        }
        PidPathStrategy::ByStepIv2 => {
            extend_pid_paths_to_results(opts, find_pid_paths_by_step_iv2::<METHODS>(&find_opts))
        }
        PidPathStrategy::ByStepPid => {
            extend_pid_paths_to_results(opts, find_pid_paths_by_step_pid::<METHODS>(&find_opts))
        }
        PidPathStrategy::ReverseIv => {
            extend_pid_paths_to_results(opts, find_pid_paths_reverse_iv::<METHODS>(&find_opts))
        }
        PidPathStrategy::ReversePidCycleSpeedLowHigh => extend_pid_paths_to_results(
            opts,
            find_pid_paths_reverse_pid_cycle_speed_low_high::<METHODS>(&find_opts),
        ),
        PidPathStrategy::ReversePidCycleSpeedMid => extend_pid_paths_to_results(
            opts,
            find_pid_paths_reverse_pid_cycle_speed_mid::<METHODS>(&find_opts),
        ),
        PidPathStrategy::ReversePidShiny => extend_pid_paths_to_results(
            opts,
            find_pid_paths_reverse_pid_shiny::<METHODS>(&find_opts),
        ),
    }
}

#[cfg(any())]
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
