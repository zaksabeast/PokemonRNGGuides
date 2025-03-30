use crate::rng::tinymt::TinyMT;
use crate::rng::{Rng, StateIterator};
use crate::{IdFilter, RngDateTime};
use chrono::TimeDelta;
use serde::{Deserialize, Serialize};
use tsify_next::Tsify;
use wasm_bindgen::prelude::*;

#[derive(Debug, Clone, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct Gen6Id {
    pub tid: u16,
    pub sid: u16,
    pub tsv: u16,
    pub advances: usize,
    pub seed: u32,
    pub datetime: RngDateTime,
    pub tinymt_state: [u32; 4],
}

impl Gen6Id {
    fn new(
        sidtid: u32,
        advances: usize,
        tinymt_state: [u32; 4],
        seed: u32,
        datetime: RngDateTime,
    ) -> Self {
        let sid = (sidtid >> 16) as u16;
        let tid = sidtid as u16;
        let tsv = (tid ^ sid) >> 4;
        Self {
            sid,
            tid,
            tsv,
            advances,
            seed,
            datetime,
            tinymt_state,
        }
    }
}

#[derive(Debug, Clone, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct OrasIdOptions {
    pub start_seed: u32,
    pub start_datetime: RngDateTime,
    pub only_start_seed: bool,
    pub initial_advances: usize,
    pub max_advances: usize,
    pub filter_id: Option<IdFilter>,
}

fn generate_oras_id_for_seed(seed: u32, opts: &OrasIdOptions) -> Vec<Gen6Id> {
    StateIterator::new(TinyMT::new(seed))
        .enumerate()
        .skip(opts.initial_advances)
        .take(opts.max_advances)
        .filter_map(|(advances, mut rng)| {
            let state = rng.get_state();
            let seconds = seed.wrapping_sub(opts.start_seed) / 1000;
            let delta = TimeDelta::seconds(seconds.into());
            let datetime = opts
                .start_datetime
                .to_naive_datetime()?
                .checked_add_signed(delta)?
                .into();
            let id = Gen6Id::new(rng.rand::<u32>(), advances, state, seed, datetime);
            let passes_filter = match &opts.filter_id {
                Some(filter) => filter.filter_gen6(id.tid, id.sid),
                None => true,
            };
            match passes_filter {
                true => Some(id),
                false => None,
            }
        })
        .collect()
}

#[wasm_bindgen]
pub fn generate_oras_id(opts: OrasIdOptions) -> Vec<Gen6Id> {
    let end_seed = match opts.only_start_seed {
        true => opts.start_seed,
        false => opts.start_seed.saturating_add(31622400),
    };
    (opts.start_seed..=end_seed)
        .step_by(1000)
        .flat_map(|seed| generate_oras_id_for_seed(seed, &opts))
        .collect()
}

#[cfg(test)]
mod test {
    use super::*;

    #[test]
    fn test_generate_gen6_id() {
        let opts = OrasIdOptions {
            start_seed: 0,
            start_datetime: RngDateTime::new(2000, 1, 1, 2, 16, 33).unwrap(),
            only_start_seed: false,
            initial_advances: 0,
            max_advances: 20,
            filter_id: Some(IdFilter::Tid(12345)),
        };
        let result = generate_oras_id(opts);

        let expected = [
            Gen6Id {
                tid: 12345,
                sid: 48123,
                tsv: 2236,
                advances: 1,
                seed: 0x7d03e8,
                datetime: RngDateTime::new(2000, 1, 1, 4, 33, 6).unwrap(),
                tinymt_state: [0x1106bcb3, 0xb91f34a1, 0xf718a976, 0x98c9588d],
            },
            Gen6Id {
                tid: 12345,
                sid: 59168,
                tsv: 3441,
                advances: 15,
                seed: 0x999c38,
                datetime: RngDateTime::new(2000, 1, 1, 5, 4, 20).unwrap(),
                tinymt_state: [0x791d4f99, 0x25e9de94, 0xc1511cf1, 0x6094df32],
            },
            Gen6Id {
                tid: 12345,
                sid: 3019,
                tsv: 959,
                advances: 12,
                seed: 0x9b9bf0,
                datetime: RngDateTime::new(2000, 1, 1, 5, 6, 31).unwrap(),
                tinymt_state: [0xbe4b8ecf, 0x9758355d, 0xe3ff809, 0x59995d6f],
            },
            Gen6Id {
                tid: 12345,
                sid: 24853,
                tsv: 1298,
                advances: 2,
                seed: 0xcc6438,
                datetime: RngDateTime::new(2000, 1, 1, 5, 59, 48).unwrap(),
                tinymt_state: [0x92e492be, 0x49d17758, 0x81ab2d16, 0x78badbf2],
            },
            Gen6Id {
                tid: 12345,
                sid: 18885,
                tsv: 1951,
                advances: 4,
                seed: 0x1327520,
                datetime: RngDateTime::new(2000, 1, 1, 7, 51, 17).unwrap(),
                tinymt_state: [0xe512b502, 0xb0e65145, 0xe6123ac5, 0xedeaff99],
            },
            Gen6Id {
                tid: 12345,
                sid: 57941,
                tsv: 3366,
                advances: 0,
                seed: 0x133f7d8,
                datetime: RngDateTime::new(2000, 1, 1, 7, 52, 56).unwrap(),
                tinymt_state: [0x3c086789, 0xfddd85d3, 0x981c4071, 0xa4ca8f67],
            },
            Gen6Id {
                tid: 12345,
                sid: 61714,
                tsv: 3090,
                advances: 9,
                seed: 0x1b5fd00,
                datetime: RngDateTime::new(2000, 1, 1, 10, 14, 57).unwrap(),
                tinymt_state: [0x29401af1, 0xa39eeb14, 0x1c43f457, 0x9184c5e1],
            },
            Gen6Id {
                tid: 12345,
                sid: 31032,
                tsv: 1168,
                advances: 6,
                seed: 0x1c61230,
                datetime: RngDateTime::new(2000, 1, 1, 10, 32, 31).unwrap(),
                tinymt_state: [0x21e030f6, 0x4830c33f, 0x74298000, 0x1a8bc5a7],
            },
        ];

        assert_eq!(result.len(), 8);
        result
            .into_iter()
            .zip(expected.into_iter())
            .enumerate()
            .for_each(|(index, (result, expected))| {
                assert_eq!(result, expected, "index: {}", index);
            });
    }
}
