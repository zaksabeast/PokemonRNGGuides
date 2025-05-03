use crate::generators::gen3::seed::calc_seed;
use crate::rng::lcrng::{Pokerng, Xdrng};
use crate::rng::{Rng, StateIterator};
use crate::{IdFilter, RngDateTime, gen3_tsv};
use serde::{Deserialize, Serialize};
use tsify_next::Tsify;
use wasm_bindgen::prelude::*;

#[derive(Debug, Clone, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct Gen3TidSidOptions {
    pub version_options: Gen3TidSidVersionOptions,
    pub offset: usize,
    pub initial_advances: usize,
    pub max_advances: usize,
    pub filter: Option<IdFilter>,
}

#[derive(Debug, Clone, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub enum Gen3TidSidVersionOptions {
    XdColo(XdColoTidSidOptions),
    Frlge(FrlgeTidSidOptions),
    Rs(RsTidSidOptions),
}

#[derive(Debug, Clone, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct XdColoTidSidOptions {
    pub seed: u32,
}

#[derive(Debug, Clone, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct FrlgeTidSidOptions {
    pub tid: u16,
}

#[derive(Debug, Clone, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub enum RsTidSidOptions {
    DeadBattery,
    DateTime(RngDateTime),
    Seed(u16),
}

#[derive(Debug, Clone, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct Gen3TidSidResult {
    pub advance: usize,
    pub tid: u16,
    pub sid: u16,
    pub tsv: u16,
}

#[wasm_bindgen]
pub fn gen3_tidsid_states(opts: &Gen3TidSidOptions) -> Vec<Gen3TidSidResult> {
    match &opts.version_options {
        Gen3TidSidVersionOptions::Frlge(ver_opts) => {
            StateIterator::new(Pokerng::new(ver_opts.tid as u32))
                .skip(opts.offset)
                .enumerate()
                .skip(opts.initial_advances)
                .take(opts.max_advances.wrapping_add(1))
                .filter_map(|(i, rng)| {
                    let state = generate_frlge_tidsid(rng, i, ver_opts.tid);
                    let passes_filter = match &opts.filter {
                        Some(filter) => filter.filter_gen3(state.tid, state.sid),
                        None => true,
                    };
                    if passes_filter { Some(state) } else { None }
                })
                .collect()
        }
        Gen3TidSidVersionOptions::Rs(ver_opts) => {
            let seed = match ver_opts {
                RsTidSidOptions::Seed(seed) => *seed,
                RsTidSidOptions::DeadBattery => 0x5a6,
                RsTidSidOptions::DateTime(datetime) => calc_seed(datetime).unwrap_or_default(),
            };
            StateIterator::new(Pokerng::new(seed as u32))
                .skip(opts.offset)
                .enumerate()
                .skip(opts.initial_advances)
                .take(opts.max_advances.wrapping_add(1))
                .filter_map(|(i, rng)| {
                    let state = generate_rs_tidsid(rng, i);
                    let passes_filter = match &opts.filter {
                        Some(filter) => filter.filter_gen3(state.tid, state.sid),
                        None => true,
                    };
                    if passes_filter { Some(state) } else { None }
                })
                .collect()
        }
        Gen3TidSidVersionOptions::XdColo(ver_opts) => StateIterator::new(Xdrng::new(ver_opts.seed))
            .skip(opts.offset)
            .enumerate()
            .skip(opts.initial_advances)
            .take(opts.max_advances.wrapping_add(1))
            .filter_map(|(i, rng)| {
                let state = generate_xdcolo_tidsid(rng, i);
                let passes_filter = match &opts.filter {
                    Some(filter) => filter.filter_gen3(state.tid, state.sid),
                    None => true,
                };
                if passes_filter { Some(state) } else { None }
            })
            .collect(),
    }
}

fn generate_frlge_tidsid(mut rng: Pokerng, advance: usize, tid: u16) -> Gen3TidSidResult {
    let sid = rng.rand::<u16>();
    let tsv = gen3_tsv(tid, sid);
    Gen3TidSidResult {
        advance,
        tid,
        sid,
        tsv,
    }
}

fn generate_rs_tidsid(mut rng: Pokerng, advance: usize) -> Gen3TidSidResult {
    let sid = rng.rand::<u16>();
    let tid = rng.rand::<u16>();
    let tsv = gen3_tsv(tid, sid);

    Gen3TidSidResult {
        advance,
        tid,
        sid,
        tsv,
    }
}

fn generate_xdcolo_tidsid(mut rng: Xdrng, advance: usize) -> Gen3TidSidResult {
    let tid = rng.rand::<u16>();
    let sid = rng.rand::<u16>();
    let tsv = gen3_tsv(tid, sid);

    Gen3TidSidResult {
        advance,
        tid,
        sid,
        tsv,
    }
}

#[cfg(test)]
mod test {
    use super::{
        FrlgeTidSidOptions, Gen3TidSidOptions, Gen3TidSidResult, Gen3TidSidVersionOptions,
        RsTidSidOptions, XdColoTidSidOptions, gen3_tidsid_states,
    };
    use crate::assert_list_eq;

    #[test]
    fn xdcolo() {
        let opts = Gen3TidSidOptions {
            version_options: Gen3TidSidVersionOptions::XdColo(XdColoTidSidOptions { seed: 0 }),
            offset: 0,
            initial_advances: 0,
            max_advances: 9,
            filter: None,
        };
        let results = gen3_tidsid_states(&opts);
        let expected = vec![
            Gen3TidSidResult {
                advance: 0,
                tid: 38,
                sid: 7719,
                tsv: 960,
            },
            Gen3TidSidResult {
                advance: 1,
                tid: 7719,
                sid: 54006,
                tsv: 6554,
            },
            Gen3TidSidResult {
                advance: 2,
                tid: 54006,
                sid: 2437,
                tsv: 7022,
            },
            Gen3TidSidResult {
                advance: 3,
                tid: 2437,
                sid: 41623,
                tsv: 5474,
            },
            Gen3TidSidResult {
                advance: 4,
                tid: 41623,
                sid: 11797,
                tsv: 4496,
            },
            Gen3TidSidResult {
                advance: 5,
                tid: 11797,
                sid: 8365,
                tsv: 471,
            },
            Gen3TidSidResult {
                advance: 6,
                tid: 8365,
                sid: 32285,
                tsv: 3030,
            },
            Gen3TidSidResult {
                advance: 7,
                tid: 32285,
                sid: 43218,
                tsv: 6873,
            },
            Gen3TidSidResult {
                advance: 8,
                tid: 43218,
                sid: 30612,
                tsv: 7144,
            },
            Gen3TidSidResult {
                advance: 9,
                tid: 30612,
                sid: 38621,
                tsv: 7209,
            },
        ];

        assert_list_eq!(results, expected);
    }

    #[test]
    fn frlge() {
        let opts = Gen3TidSidOptions {
            version_options: Gen3TidSidVersionOptions::Frlge(FrlgeTidSidOptions { tid: 0 }),
            offset: 0,
            initial_advances: 0,
            max_advances: 9,
            filter: None,
        };
        let results = gen3_tidsid_states(&opts);
        let expected = vec![
            Gen3TidSidResult {
                advance: 0,
                tid: 0,
                sid: 0,
                tsv: 0,
            },
            Gen3TidSidResult {
                advance: 1,
                tid: 0,
                sid: 59774,
                tsv: 7471,
            },
            Gen3TidSidResult {
                advance: 2,
                tid: 0,
                sid: 21105,
                tsv: 2638,
            },
            Gen3TidSidResult {
                advance: 3,
                tid: 0,
                sid: 12720,
                tsv: 1590,
            },
            Gen3TidSidResult {
                advance: 4,
                tid: 0,
                sid: 36418,
                tsv: 4552,
            },
            Gen3TidSidResult {
                advance: 5,
                tid: 0,
                sid: 58060,
                tsv: 7257,
            },
            Gen3TidSidResult {
                advance: 6,
                tid: 0,
                sid: 44997,
                tsv: 5624,
            },
            Gen3TidSidResult {
                advance: 7,
                tid: 0,
                sid: 26587,
                tsv: 3323,
            },
            Gen3TidSidResult {
                advance: 8,
                tid: 0,
                sid: 64563,
                tsv: 8070,
            },
            Gen3TidSidResult {
                advance: 9,
                tid: 0,
                sid: 61228,
                tsv: 7653,
            },
        ];

        assert_list_eq!(results, expected);
    }

    #[test]
    fn rs_seed() {
        let opts = Gen3TidSidOptions {
            version_options: Gen3TidSidVersionOptions::Rs(RsTidSidOptions::Seed(0)),
            offset: 0,
            initial_advances: 0,
            max_advances: 9,
            filter: None,
        };
        let results = gen3_tidsid_states(&opts);
        let expected = vec![
            Gen3TidSidResult {
                advance: 0,
                tid: 59774,
                sid: 0,
                tsv: 7471,
            },
            Gen3TidSidResult {
                advance: 1,
                tid: 21105,
                sid: 59774,
                tsv: 5985,
            },
            Gen3TidSidResult {
                advance: 2,
                tid: 12720,
                sid: 21105,
                tsv: 3192,
            },
            Gen3TidSidResult {
                advance: 3,
                tid: 36418,
                sid: 12720,
                tsv: 6142,
            },
            Gen3TidSidResult {
                advance: 4,
                tid: 58060,
                sid: 36418,
                tsv: 3473,
            },
            Gen3TidSidResult {
                advance: 5,
                tid: 44997,
                sid: 58060,
                tsv: 2465,
            },
            Gen3TidSidResult {
                advance: 6,
                tid: 26587,
                sid: 44997,
                tsv: 6403,
            },
            Gen3TidSidResult {
                advance: 7,
                tid: 64563,
                sid: 26587,
                tsv: 4989,
            },
            Gen3TidSidResult {
                advance: 8,
                tid: 61228,
                sid: 64563,
                tsv: 611,
            },
            Gen3TidSidResult {
                advance: 9,
                tid: 64606,
                sid: 61228,
                tsv: 622,
            },
        ];

        assert_list_eq!(results, expected);
    }
}
