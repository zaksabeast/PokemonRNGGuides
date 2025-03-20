use crate::IdFilter;
use crate::rng::tinymt::TinyMT;
use crate::rng::{Rng, StateIterator};
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
    pub tinymt_state: [u32; 4],
}

impl Gen6Id {
    fn new(sidtid: u32, advances: usize, tinymt_state: [u32; 4]) -> Self {
        let sid = (sidtid >> 16) as u16;
        let tid = sidtid as u16;
        let tsv = (tid ^ sid) >> 4;
        Self {
            sid,
            tid,
            tsv,
            advances,
            tinymt_state,
        }
    }
}

#[derive(Debug, Clone, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct OrasIdOptions {
    pub state: [u32; 4],
    pub initial_advances: usize,
    pub max_advances: usize,
    pub filter: Option<IdFilter>,
}

#[wasm_bindgen]
pub fn generate_oras_id(opts: OrasIdOptions) -> Vec<Gen6Id> {
    StateIterator::new(TinyMT::from_state(opts.state))
        .enumerate()
        .skip(opts.initial_advances)
        .take(opts.max_advances)
        .filter_map(|(advances, mut rng)| {
            let state = rng.get_state();
            let id = Gen6Id::new(rng.rand::<u32>(), advances, state);
            let passes_filter = match &opts.filter {
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

#[cfg(test)]
mod test {
    use super::*;

    #[test]
    fn test_generate_gen6_id() {
        let opts = OrasIdOptions {
            state: [0xdddddddd, 0xcccccccc, 0xbbbbbbbb, 0xaaaaaaaa],
            initial_advances: 0,
            max_advances: 20,
            filter: None,
        };
        let result = generate_oras_id(opts);

        let expected = [
            Gen6Id {
                advances: 0,
                tid: 21457,
                sid: 19792,
                tsv: 0488,
                tinymt_state: [0xDDDDDDDD, 0xCCCCCCCC, 0xBBBBBBBB, 0xAAAAAAAA],
            },
            Gen6Id {
                advances: 1,
                tid: 43611,
                sid: 63806,
                tsv: 1334,
                tinymt_state: [0xCCCCCCCC, 0x34CBAA55, 0x838704E1, 0x80000001],
            },
            Gen6Id {
                advances: 2,
                tid: 36004,
                sid: 63972,
                tsv: 1876,
                tinymt_state: [0x34CBAA55, 0x0CF7150F, 0xF2627D97, 0xCC80A689],
            },
            Gen6Id {
                advances: 3,
                tid: 38430,
                sid: 14702,
                tsv: 2807,
                tinymt_state: [0x0CF7150F, 0xF2627D97, 0xD0292F57, 0xF423B29A],
            },
            Gen6Id {
                advances: 4,
                tid: 28992,
                sid: 20037,
                tsv: 1008,
                tinymt_state: [0xF2627D97, 0xD0292F57, 0xA94AD051, 0xFDF6A386],
            },
            Gen6Id {
                advances: 5,
                tid: 07720,
                sid: 04770,
                tsv: 0200,
                tinymt_state: [0xD0292F57, 0xA94AD051, 0x20D55FB3, 0x9E0F75F6],
            },
            Gen6Id {
                advances: 6,
                tid: 32846,
                sid: 32988,
                tsv: 0009,
                tinymt_state: [0xA94AD051, 0x20D55FB3, 0x2660A9DF, 0xBBD32ED2],
            },
            Gen6Id {
                advances: 7,
                tid: 30953,
                sid: 20595,
                tsv: 0649,
                tinymt_state: [0x20D55FB3, 0x2660A9DF, 0x9F4E9A47, 0x963BD3FC],
            },
            Gen6Id {
                advances: 8,
                tid: 36740,
                sid: 03645,
                tsv: 2075,
                tinymt_state: [0x2660A9DF, 0x103E8BA9, 0xF84CB762, 0x772B8E7F],
            },
            Gen6Id {
                advances: 9,
                tid: 05325,
                sid: 31155,
                tsv: 1751,
                tinymt_state: [0x103E8BA9, 0xF84CB762, 0x75EE4F3C, 0x1E89F67C],
            },
            Gen6Id {
                advances: 10,
                tid: 06278,
                sid: 41815,
                tsv: 3005,
                tinymt_state: [0xF84CB762, 0xFA9E5ED2, 0xFCB90706, 0xB769995B],
            },
            Gen6Id {
                advances: 11,
                tid: 21756,
                sid: 10203,
                tsv: 1842,
                tinymt_state: [0xFA9E5ED2, 0xFCB90706, 0x072483DA, 0x6E61662C],
            },
            Gen6Id {
                advances: 12,
                tid: 47184,
                sid: 30183,
                tsv: 3291,
                tinymt_state: [0xFCB90706, 0x072483DA, 0xD5E8CE12, 0xDA55BB28],
            },
            Gen6Id {
                advances: 13,
                tid: 01753,
                sid: 22238,
                tsv: 1280,
                tinymt_state: [0x072483DA, 0xD5E8CE12, 0x70786752, 0x45E0B9EE],
            },
            Gen6Id {
                advances: 14,
                tid: 23953,
                sid: 36205,
                tsv: 3343,
                tinymt_state: [0xD5E8CE12, 0xFF0876BC, 0x29CE5CB1, 0x80CC9AB7],
            },
            Gen6Id {
                advances: 15,
                tid: 42232,
                sid: 34876,
                tsv: 0716,
                tinymt_state: [0xFF0876BC, 0xA6BE4D5F, 0x1EE4E73E, 0x45D9FBCD],
            },
            Gen6Id {
                advances: 16,
                tid: 48032,
                sid: 39223,
                tsv: 0553,
                tinymt_state: [0xA6BE4D5F, 0x1EE4E73E, 0x407A5567, 0x2EC2634C],
            },
            Gen6Id {
                advances: 17,
                tid: 48831,
                sid: 65194,
                tsv: 1025,
                tinymt_state: [0x1EE4E73E, 0x407A5567, 0x812E810A, 0xB1C253E0],
            },
            Gen6Id {
                advances: 18,
                tid: 23538,
                sid: 54906,
                tsv: 2264,
                tinymt_state: [0x407A5567, 0x0E5E90E4, 0x50173EEA, 0x89F32FE5],
            },
            Gen6Id {
                advances: 19,
                tid: 44051,
                sid: 62564,
                tsv: 1415,
                tinymt_state: [0x0E5E90E4, 0x50173EEA, 0x5882BDBB, 0xEF5EB5AC],
            },
        ];

        assert_eq!(result.len(), 20);
        result
            .into_iter()
            .zip(expected.into_iter())
            .enumerate()
            .for_each(|(index, (result, expected))| {
                assert_eq!(result, expected, "index: {}", index);
            });
    }
}
