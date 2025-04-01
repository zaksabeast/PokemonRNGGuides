use super::seed4::calc_seed;
use crate::rng::Rng;
use crate::rng::mt::MT;
use crate::{IdFilter, RngDateTime};
use serde::{Deserialize, Serialize};
use tsify_next::Tsify;
use wasm_bindgen::prelude::*;

#[derive(Debug, Clone, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct Id4Options {
    pub min_delay: u32,
    pub max_delay: u32,
    pub datetime: RngDateTime,
    pub filter: IdFilter,
}

#[derive(Debug, Clone, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct Id4 {
    pub seed: u32,
    pub delay: u32,
    pub tid: u16,
    pub sid: u16,
    pub tsv: u16,
    pub seconds: u8,
}

#[wasm_bindgen]
pub fn generate_dppt_ids(opts: Id4Options) -> Vec<Id4> {
    let mut results = vec![];
    let Id4Options {
        min_delay,
        max_delay,
        mut datetime,
        filter,
    } = opts;

    for seconds in 0..60 {
        datetime.second = seconds;
        for delay in min_delay..=max_delay {
            let seed = calc_seed(&datetime, delay);
            let mut rng = MT::new(seed);
            rng.rand::<u32>();
            let sidtid = rng.rand::<u32>();
            let tid = sidtid as u16;
            let sid = (sidtid >> 16) as u16;

            if filter.filter_gen3(tid, sid) {
                results.push(Id4 {
                    seed,
                    delay,
                    tid,
                    sid,
                    tsv: (tid ^ sid) >> 3,
                    seconds: seconds as u8,
                });
            }
        }
    }

    results
}

#[derive(Debug, Clone, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct Id4SearchOptions {
    pub min_delay: u32,
    pub max_delay: u32,
    pub year: u32,
    pub filter: IdFilter,
}

#[wasm_bindgen]
pub fn search_dppt_ids(opts: Id4SearchOptions) -> Vec<Id4> {
    let mut results = vec![];

    for delay in opts.min_delay..=opts.max_delay {
        for ab in 0..=0xffu32 {
            for cd in 0..24u32 {
                let seed = ((ab << 24) | (cd << 16))
                    .wrapping_add(delay)
                    .wrapping_add(opts.year)
                    .wrapping_sub(2000);

                let mut rng = MT::new(seed);
                rng.rand::<u32>();

                let sidtid = rng.rand::<u32>();
                let tid = sidtid as u16;
                let sid = (sidtid >> 16) as u16;

                if opts.filter.filter_gen3(tid, sid) {
                    results.push(Id4 {
                        seed,
                        tid,
                        sid,
                        delay,
                        tsv: (tid ^ sid) >> 3,
                        seconds: 0,
                    });
                }
            }
        }
    }

    results
}

#[cfg(test)]
mod test {
    use super::*;
    use crate::{assert_list_eq, datetime};

    #[test]
    fn search() {
        let opts = Id4SearchOptions {
            filter: IdFilter::Tid(1234),
            min_delay: 0,
            max_delay: 10,
            year: 2021,
        };
        let results = search_dppt_ids(opts);
        let expected = [Id4 {
            seed: 0x4e16001a,
            tid: 1234,
            sid: 12129,
            tsv: 1398,
            delay: 5,
            seconds: 0,
        }];

        assert_list_eq!(results, expected);
    }

    #[test]
    fn generate() {
        let opts = Id4Options {
            min_delay: 5000,
            max_delay: 6000,
            datetime: datetime!(2021-03-23 11:58:00).unwrap(),
            filter: IdFilter::Tid(1234),
        };

        let results = generate_dppt_ids(opts);
        let expected = [
            Id4 {
                seed: 0xa40b13f3,
                tid: 1234,
                sid: 11608,
                tsv: 1329,
                delay: 5086,
                seconds: 37,
            },
            Id4 {
                seed: 0xb00b1662,
                tid: 1234,
                sid: 22909,
                tsv: 2997,
                delay: 5709,
                seconds: 49,
            },
        ];
        assert_list_eq!(results, expected);
    }
}
