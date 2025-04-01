use crate::RngDateTime;
use crate::rng::lcrng::{Lcrng, Pokerng, Xdrng};
use crate::rng::{Rng, StateIterator};
use serde::{Deserialize, Serialize};
use tsify_next::Tsify;
use wasm_bindgen::prelude::*;

#[derive(Debug, Clone, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct Gen3TidSidOptions {
    version_options: Gen3TidSidVersionOptions,
    offset: usize,
    initial_advances: usize,
    max_advances: usize,
    filter: Gen3TidSidFilter,
}

#[derive(Debug, Clone, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub enum Gen3TidSidVersionOptions {
    XdColo(XdColorTidSidOptions),
    Frlge(FrlgeTidSidOptions),
    Rs(RsTidSidOptions),
}

#[derive(Debug, Clone, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct XdColorTidSidOptions {
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

#[derive(Debug, Clone, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub enum Gen3TidSidFilter {
    Tid(u16),
    Sid(u16),
    Tsv(u16),
}

impl Gen3TidSidFilter {
    fn pass_filter(&self, val: &Gen3TidSidResult) -> bool {
        match self {
            Self::Tid(i) => i == &val.tid,
            Self::Sid(i) => i == &val.sid,
            Self::Tsv(i) => i == &val.tsv,
        }
    }
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
                    let state = generate_frlge_tidsid(rng, i, ver_opts);
                    if opts.filter.pass_filter(&state) {
                        Some(state)
                    } else {
                        None
                    }
                })
                .collect()
        }
        Gen3TidSidVersionOptions::Rs(ver_opts) => {
            let seed = match ver_opts {
                RsTidSidOptions::Seed(seed) => *seed,
                RsTidSidOptions::DeadBattery => 0x5a6,
                RsTidSidOptions::DateTime(datetime) => {
                    datetime.calc_gen3_seed().unwrap_or_default()
                }
            };
            StateIterator::new(Pokerng::new(seed as u32))
                .skip(opts.offset)
                .enumerate()
                .skip(opts.initial_advances)
                .take(opts.max_advances.wrapping_add(1))
                .filter_map(|(i, rng)| {
                    let state = generate_rs_xdcolo_tidsid(rng, i);
                    if opts.filter.pass_filter(&state) {
                        Some(state)
                    } else {
                        None
                    }
                })
                .collect()
        }
        Gen3TidSidVersionOptions::XdColo(ver_opts) => StateIterator::new(Xdrng::new(ver_opts.seed))
            .skip(opts.offset)
            .enumerate()
            .skip(opts.initial_advances)
            .take(opts.max_advances.wrapping_add(1))
            .filter_map(|(i, rng)| {
                let state = generate_rs_xdcolo_tidsid(rng, i);
                if opts.filter.pass_filter(&state) {
                    Some(state)
                } else {
                    None
                }
            })
            .collect(),
    }
}

fn generate_frlge_tidsid(
    mut rng: Pokerng,
    advance: usize,
    opts: &FrlgeTidSidOptions,
) -> Gen3TidSidResult {
    let sid = rng.rand::<u16>();
    let tsv = (opts.tid ^ sid) >> 3;
    Gen3TidSidResult {
        advance,
        tid: opts.tid,
        sid,
        tsv,
    }
}

fn generate_rs_xdcolo_tidsid<const A: u32, const M: u32, const PA: u32, const PM: u32>(
    mut rng: Lcrng<A, M, PA, PM>,
    advance: usize,
) -> Gen3TidSidResult {
    let sid = rng.rand::<u16>();
    let tid = rng.rand::<u16>();
    let tsv = (tid ^ sid) >> 3;

    Gen3TidSidResult {
        advance,
        tid,
        sid,
        tsv,
    }
}
