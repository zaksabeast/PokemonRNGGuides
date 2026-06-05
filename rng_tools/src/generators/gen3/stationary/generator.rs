use arrayvec::ArrayVec;

use crate::gen3::{Gen3PkmFilter, passes_iv1_filter, passes_iv2_filter, passes_pid_filter};
use crate::rng::Rng;
use crate::rng::lcrng::Pokerng;
use crate::{GenderRatio, Ivs, PkmFilter, gen3_tsv};
use serde::{Deserialize, Serialize};
use tsify::Tsify;
use wasm_bindgen::prelude::*;

#[derive(Debug, Clone, Copy, PartialEq, Eq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub enum Gen3StaticMethod {
    Static1,
    Static4,
}

#[derive(Debug, Clone, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct Static3GeneratorOptions {
    pub bugged_roamer: bool,
    pub methods: Vec<Gen3StaticMethod>,
    pub tid: u16,
    pub sid: u16,
    pub filter: PkmFilter,
    pub gen3_filter: Gen3PkmFilter,
    pub encounter_gender_ratio: GenderRatio,
}

#[derive(Debug, Clone, Copy, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct Static3GeneratorResult {
    pub pid: u32,
    pub ivs: Ivs,
    pub method: Gen3StaticMethod,
}

#[wasm_bindgen]
pub fn generate_gen3_static_wasm(
    initial_seed: u32,
    advances: usize,
    opts: &Static3GeneratorOptions,
) -> Vec<Static3GeneratorResult> {
    let res = generate_gen3_static(Pokerng::with_jump(initial_seed, advances), opts);
    match res {
        None => vec![],
        Some(res) => res.to_vec(),
    }
}

pub(super) fn generate_gen3_static(
    mut rng: Pokerng,
    opts: &Static3GeneratorOptions,
) -> Option<ArrayVec<Static3GeneratorResult, 2>> {
    let pid = (rng.rand::<u16>() as u32) | ((rng.rand::<u16>() as u32) << 16);

    if !passes_pid_filter(
        &opts.filter,
        &opts.gen3_filter,
        Some(opts.encounter_gender_ratio),
        pid,
        gen3_tsv(opts.tid, opts.sid),
    ) {
        return None;
    }

    let iv1 = if opts.bugged_roamer {
        rng.rand::<u16>() & 0xFF
    } else {
        rng.rand::<u16>()
    };

    if !passes_iv1_filter(&opts.filter.min_ivs, &opts.filter.max_ivs, iv1) {
        return None;
    }

    opts.methods
        .iter()
        .filter_map(|method| {
            let mut rng2 = rng.clone();
            if *method == Gen3StaticMethod::Static4 {
                rng2.next();
            }

            let iv2 = if opts.bugged_roamer {
                0
            } else {
                rng2.rand::<u16>()
            };

            if !passes_iv2_filter(&opts.filter.min_ivs, &opts.filter.max_ivs, iv2) {
                return None;
            }

            Some(Static3GeneratorResult {
                pid,
                ivs: Ivs::new_g3(iv1, iv2),
                method: *method,
            })
        })
        .collect::<ArrayVec<Static3GeneratorResult, 2>>()
        .into()
}

#[cfg(test)]
mod test {
    use super::*;

    fn opts(methods: Vec<Gen3StaticMethod>) -> Static3GeneratorOptions {
        Static3GeneratorOptions {
            bugged_roamer: false,
            methods,
            tid: 12345,
            sid: 54321,
            filter: PkmFilter::new_allow_all(),
            gen3_filter: Gen3PkmFilter::default(),
            encounter_gender_ratio: GenderRatio::Genderless,
        }
    }

    #[test]
    fn generate_gen3_static_method1() {
        let results =
            generate_gen3_static_wasm(1431655765, 0, &opts(vec![Gen3StaticMethod::Static1]));

        assert_eq!(
            results,
            vec![Static3GeneratorResult {
                pid: 2828921363,
                ivs: Ivs::new(17, 7, 31, 29, 13, 14),
                method: Gen3StaticMethod::Static1,
            }]
        );
    }

    #[test]
    fn generate_gen3_static_method4() {
        let results = generate_gen3_static_wasm(1234, 0, &opts(vec![Gen3StaticMethod::Static4]));

        assert_eq!(
            results,
            vec![Static3GeneratorResult {
                pid: 491392486,
                ivs: Ivs::new(8, 4, 12, 13, 23, 16),
                method: Gen3StaticMethod::Static4,
            }]
        );
    }

    #[test]
    fn generate_gen3_static_method14() {
        let results = generate_gen3_static_wasm(
            565645,
            0,
            &opts(vec![Gen3StaticMethod::Static1, Gen3StaticMethod::Static4]),
        );

        assert_eq!(
            results,
            vec![
                Static3GeneratorResult {
                    pid: 863069428,
                    ivs: Ivs::new(7, 8, 4, 13, 22, 22),
                    method: Gen3StaticMethod::Static1,
                },
                Static3GeneratorResult {
                    pid: 863069428,
                    ivs: Ivs::new(7, 8, 4, 19, 1, 13),
                    method: Gen3StaticMethod::Static4,
                },
            ]
        );
    }

    #[test]
    fn generate_gen3_static_bugged_roamer() {
        let mut opts = opts(vec![Gen3StaticMethod::Static1]);
        opts.bugged_roamer = true;

        let results = generate_gen3_static_wasm(0, 0, &opts);

        assert_eq!(
            results,
            vec![Static3GeneratorResult {
                pid: 0xE97E0000,
                ivs: Ivs::new(17, 3, 0, 0, 0, 0),
                method: Gen3StaticMethod::Static1,
            }]
        );
    }
}
