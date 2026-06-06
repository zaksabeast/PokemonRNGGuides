use crate::gen4::seed_time4::{SeedTime4, seedtime4_from_pairs, seedtime4_search_iter};
use crate::rng::Rng;
use crate::rng::mt::MT;
use crate::{IdFilter, RngDateTime, gen3_tsv};
use itertools::iproduct;
use serde::{Deserialize, Serialize};
use tsify::Tsify;
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
    pub seed_time: SeedTime4,
    pub tid: u16,
    pub sid: u16,
    pub tsv: u16,
}

#[wasm_bindgen]
pub fn generate_dppt_ids(opts: Id4Options) -> Vec<Id4> {
    let Id4Options {
        min_delay,
        max_delay,
        datetime,
        filter,
    } = opts;

    let datetime_iter = (0..60).map(move |second| {
        let mut datetime = datetime.clone();
        datetime.second = second;
        datetime
    });

    seedtime4_from_pairs(iproduct!(datetime_iter, min_delay..=max_delay))
        .filter_map(|seed_time| {
            let mut rng = MT::new(seed_time.seed);
            rng.rand::<u32>();

            let sidtid = rng.rand::<u32>();
            let tid = sidtid as u16;
            let sid = (sidtid >> 16) as u16;

            filter.filter_gen3(tid, sid).then(|| Id4 {
                seed_time,
                tid,
                sid,
                tsv: gen3_tsv(tid, sid),
            })
        })
        .collect()
}

#[derive(Debug, Clone, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct Id4SearchOptions {
    pub min_delay: u32,
    pub max_delay: u32,
    pub year: u32,
    pub filter: IdFilter,
    pub force_second: Option<u32>,
}

#[wasm_bindgen]
pub fn search_dppt_ids(opts: Id4SearchOptions) -> Vec<Id4> {
    seedtime4_search_iter(
        opts.min_delay..=opts.max_delay,
        opts.year,
        None,
        opts.force_second,
    )
    .filter_map(|seed_time| {
        let mut rng = MT::new(seed_time.seed);
        rng.rand::<u32>();

        let sidtid = rng.rand::<u32>();
        let tid = sidtid as u16;
        let sid = (sidtid >> 16) as u16;

        opts.filter.filter_gen3(tid, sid).then(|| Id4 {
            seed_time,
            tid,
            sid,
            tsv: gen3_tsv(tid, sid),
        })
    })
    .collect()
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
            force_second: None,
        };
        let results = search_dppt_ids(opts);
        let expected = [Id4 {
            tid: 1234,
            sid: 12129,
            tsv: 1398,
            seed_time: SeedTime4 {
                seed: 0x4e16001a,
                datetime: datetime!(2021-01-01 22:19:58).unwrap(),
                delay: 5,
            },
        }];

        assert_list_eq!(results, expected);
    }

    #[test]
    fn search_with_second() {
        let opts = Id4SearchOptions {
            filter: IdFilter::Tid(1234),
            min_delay: 0,
            max_delay: 10,
            year: 2021,
            force_second: Some(30),
        };
        let results = search_dppt_ids(opts);
        let expected = [Id4 {
            tid: 1234,
            sid: 12129,
            tsv: 1398,
            seed_time: SeedTime4 {
                seed: 0x4e16001a,
                datetime: datetime!(2021-01-01 22:47:30).unwrap(),
                delay: 5,
            },
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
                tid: 1234,
                sid: 11608,
                tsv: 1329,
                seed_time: SeedTime4 {
                    seed: 0xa40b13f3,
                    datetime: datetime!(2021-03-23 11:58:37).unwrap(),
                    delay: 5086,
                },
            },
            Id4 {
                tid: 1234,
                sid: 22909,
                tsv: 2997,
                seed_time: SeedTime4 {
                    seed: 0xb00b1662,
                    datetime: datetime!(2021-03-23 11:58:49).unwrap(),
                    delay: 5709,
                },
            },
        ];
        assert_list_eq!(results, expected);
    }
}
