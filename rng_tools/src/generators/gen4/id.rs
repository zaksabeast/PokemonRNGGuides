use super::{FindSeedTime4Options, SeedTime4, calc_seed, dppt_find_seedtime};
use crate::rng::Rng;
use crate::rng::mt::MT;
use crate::{IdFilter, RngDateTime, gen3_tsv};
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
    pub seed_time: SeedTime4,
    pub tid: u16,
    pub sid: u16,
    pub tsv: u16,
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
                    seed_time: SeedTime4::new(seed, datetime.clone(), delay),
                    tid,
                    sid,
                    tsv: gen3_tsv(tid, sid),
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

                if !opts.filter.filter_gen3(tid, sid) {
                    continue;
                }

                let seed_time_opts = FindSeedTime4Options {
                    seed,
                    year: opts.year,
                    delay_range: delay..=delay,
                };

                let seed_time = dppt_find_seedtime(seed_time_opts);

                if let Some(seed_time) = seed_time {
                    results.push(Id4 {
                        seed_time,
                        tid,
                        sid,
                        tsv: gen3_tsv(tid, sid),
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
    use crate::{assert_list_eq, coin_flips, datetime};

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
            tid: 1234,
            sid: 12129,
            tsv: 1398,
            seed_time: SeedTime4 {
                seed: 0x4e16001a,
                datetime: datetime!(2021-01-01 22:18:59).unwrap(),
                delay: 5,
                coin_flips: coin_flips!("TTHTTHTHTTHHHHHHHTTH"),
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
                    coin_flips: coin_flips!("TTTTHTTTHHHHTHHTTHTT"),
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
                    coin_flips: coin_flips!("TTHTTHTHTTTTHTTTTTHT"),
                },
            },
        ];
        assert_list_eq!(results, expected);
    }
}
