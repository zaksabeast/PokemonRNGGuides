use crate::{
    gen4::{
        GameVersion,
        seed_time4::{SeedTime4, seedtime4_iter},
    },
    rng::{Rng, lcrng::Arng, mt::MT},
};
use serde::{Deserialize, Serialize};
use tsify::Tsify;
use wasm_bindgen::prelude::*;

#[derive(Debug, Clone, Copy, PartialEq, Eq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub enum Lottery4Prize {
    MasterBall,
    MaxRevive,
    ExpShare,
    PpUp,
    UltraBall,
    Backdrop,
    None,
}

fn count_digits_matched(tid: u16, lotto_id: u16) -> usize {
    let mut tid = tid;
    let mut lotto_id = lotto_id;
    let mut count = 0;

    for _ in 0..5 {
        if (tid % 10) != (lotto_id % 10) {
            break;
        }

        tid /= 10;
        lotto_id /= 10;
        count += 1;
    }

    count
}

fn get_prize(tid: u16, lotto_id: u16, game: GameVersion) -> Lottery4Prize {
    let matched_digits = count_digits_matched(tid, lotto_id);
    match (game, matched_digits) {
        (_, 5) => Lottery4Prize::MasterBall,
        (_, 4) => Lottery4Prize::MaxRevive,
        (_, 3) => Lottery4Prize::ExpShare,
        (_, 2) => Lottery4Prize::PpUp,
        (GameVersion::HeartGold, 1) => Lottery4Prize::UltraBall,
        (GameVersion::SoulSilver, 1) => Lottery4Prize::UltraBall,
        (GameVersion::Platinum, 1) => Lottery4Prize::UltraBall,
        (GameVersion::Diamond, 1) => Lottery4Prize::Backdrop,
        (GameVersion::Pearl, 1) => Lottery4Prize::Backdrop,
        _ => Lottery4Prize::None,
    }
}

fn get_lotto_id(seed: u32) -> u16 {
    (seed.wrapping_mul(0x41c64e6d).wrapping_add(12345) >> 16) as u16
}

fn generate_prize(seed: u32, tid: u16, game: GameVersion) -> (u16, Lottery4Prize) {
    let lotto_id = get_lotto_id(seed);
    (lotto_id, get_prize(tid, lotto_id, game))
}

struct GenerateLottery4Opts {
    tid: u16,
    game: GameVersion,
    min_mt_advance: usize,
    max_mt_advance: usize,
    prize_filter: Option<Lottery4Prize>,
}

#[derive(Debug, PartialEq)]
struct GenerateLottery4Res {
    tid: u16,
    prize: Lottery4Prize,
    mt_advance: usize,
}

fn generate_lotto_prize_from_group_seed(
    group_seed: u32,
    mt_advance: usize,
    tid: u16,
    game: GameVersion,
) -> GenerateLottery4Res {
    let lotto_seed = Arng::new(group_seed)
        // setting the group seed always skips 1
        .skip(1)
        .rand::<u32>();
    let (lotto_id, prize) = generate_prize(lotto_seed, tid, game);
    GenerateLottery4Res {
        prize,
        mt_advance,
        tid: lotto_id,
    }
}

fn generate_lotto_prizes(
    seed: u32,
    opts: &GenerateLottery4Opts,
) -> impl Iterator<Item = GenerateLottery4Res> {
    MT::new(seed)
        .enumerate()
        .skip(opts.min_mt_advance)
        .take(
            opts.max_mt_advance
                .saturating_sub(opts.min_mt_advance)
                .saturating_add(1),
        )
        .map(move |(mt_advance, group_seed)| {
            generate_lotto_prize_from_group_seed(group_seed, mt_advance, opts.tid, opts.game)
        })
        .filter(|res| {
            res.prize != Lottery4Prize::None
                && opts.prize_filter.map_or(true, |filter| res.prize == filter)
        })
}

#[derive(Debug, Clone, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct SearchLottery4Opts {
    pub min_delay: u32,
    pub max_delay: u32,
    pub year: u32,
    pub force_seconds: Option<u32>,
    pub tid: u16,
    pub game: GameVersion,
    pub min_mt_advance: usize,
    pub max_mt_advance: usize,
    pub prize_filter: Option<Lottery4Prize>,
    pub limit: usize,
}

#[derive(Debug, Clone, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct SearchLottery4Res {
    pub tid: u16,
    pub prize: Lottery4Prize,
    pub mt_advance: usize,
    pub seed_time: SeedTime4,
}

#[wasm_bindgen]
pub fn search_lotto_prizes(opts: &SearchLottery4Opts) -> Vec<SearchLottery4Res> {
    let generate_opts = GenerateLottery4Opts {
        tid: opts.tid,
        game: opts.game,
        min_mt_advance: opts.min_mt_advance,
        max_mt_advance: opts.max_mt_advance,
        prize_filter: opts.prize_filter,
    };
    seedtime4_iter(
        opts.min_delay..=opts.max_delay,
        opts.year,
        None,
        opts.force_seconds.map(|seconds| seconds..=seconds),
    )
    .flat_map(|seed_time| {
        generate_lotto_prizes(seed_time.seed, &generate_opts).map(move |lotto_res| {
            SearchLottery4Res {
                tid: lotto_res.tid,
                prize: lotto_res.prize,
                mt_advance: lotto_res.mt_advance,
                seed_time: seed_time.clone(),
            }
        })
    })
    .take(opts.limit)
    .collect()
}

#[cfg(test)]
mod tests {
    use super::*;

    mod count_digits_matched {
        use super::*;

        #[test]
        fn test_count_digits_matched() {
            assert_eq!(count_digits_matched(12345, 12345), 5);
            assert_eq!(count_digits_matched(12345, 02345), 4);
            assert_eq!(count_digits_matched(12345, 00345), 3);
            assert_eq!(count_digits_matched(12345, 00045), 2);
            assert_eq!(count_digits_matched(12345, 00005), 1);
            assert_eq!(count_digits_matched(12345, 00000), 0);
        }
    }

    mod generate_prize {
        use super::*;
        use crate::assert_list_eq;

        #[test]
        fn generate() {
            let res = Arng::new(0xcdac7830)
                .take(5)
                .map(|seed| generate_prize(seed, 723, GameVersion::HeartGold))
                .collect::<Vec<_>>();

            let expected: [(u16, Lottery4Prize); 5] = [
                (33104, Lottery4Prize::None),
                (37633, Lottery4Prize::UltraBall),
                (51286, Lottery4Prize::None),
                (723, Lottery4Prize::MasterBall),
                (36130, Lottery4Prize::None),
            ];

            assert_list_eq!(res, expected);
        }
    }

    mod search_lotto_prizes {
        use super::*;
        use crate::{assert_list_eq, datetime};

        #[test]
        fn ztest() {
            let opts = SearchLottery4Opts {
                min_delay: 800,
                max_delay: 1000,
                year: 2000,
                force_seconds: None,
                tid: 0,
                game: GameVersion::Diamond,
                min_mt_advance: 20,
                max_mt_advance: 30,
                prize_filter: None,
                limit: 100,
            };
            let res = search_lotto_prizes(&opts);
            println!("res: {:?}", res);
        }

        #[test]
        fn search() {
            let opts = SearchLottery4Opts {
                min_delay: 800,
                max_delay: 801,
                year: 2026,
                force_seconds: None,
                tid: 12345,
                game: GameVersion::HeartGold,
                min_mt_advance: 0,
                max_mt_advance: 1,
                prize_filter: Some(Lottery4Prize::ExpShare),
                limit: 100,
            };
            let res = search_lotto_prizes(&opts);
            let expected = [
                SearchLottery4Res {
                    tid: 36345,
                    prize: Lottery4Prize::ExpShare,
                    mt_advance: 0,
                    seed_time: SeedTime4 {
                        seed: 0x209033a,
                        datetime: datetime!(2026-01-01 09:00:01).unwrap(),
                        delay: 800,
                    },
                },
                SearchLottery4Res {
                    tid: 37345,
                    prize: Lottery4Prize::ExpShare,
                    mt_advance: 0,
                    seed_time: SeedTime4 {
                        seed: 0x60b033a,
                        datetime: datetime!(2026-01-01 11:00:05).unwrap(),
                        delay: 800,
                    },
                },
                SearchLottery4Res {
                    tid: 23345,
                    prize: Lottery4Prize::ExpShare,
                    mt_advance: 1,
                    seed_time: SeedTime4 {
                        seed: 0x1505033a,
                        datetime: datetime!(2026-01-01 05:00:20).unwrap(),
                        delay: 800,
                    },
                },
                SearchLottery4Res {
                    tid: 29345,
                    prize: Lottery4Prize::ExpShare,
                    mt_advance: 0,
                    seed_time: SeedTime4 {
                        seed: 0x890c033a,
                        datetime: datetime!(2026-01-19 12:59:59).unwrap(),
                        delay: 800,
                    },
                },
                SearchLottery4Res {
                    tid: 25345,
                    prize: Lottery4Prize::ExpShare,
                    mt_advance: 1,
                    seed_time: SeedTime4 {
                        seed: 0x9201033a,
                        datetime: datetime!(2026-01-28 01:59:59).unwrap(),
                        delay: 800,
                    },
                },
                SearchLottery4Res {
                    tid: 345,
                    prize: Lottery4Prize::ExpShare,
                    mt_advance: 0,
                    seed_time: SeedTime4 {
                        seed: 0xaa12033a,
                        datetime: datetime!(2026-02-26 18:59:59).unwrap(),
                        delay: 800,
                    },
                },
                SearchLottery4Res {
                    tid: 18345,
                    prize: Lottery4Prize::ExpShare,
                    mt_advance: 0,
                    seed_time: SeedTime4 {
                        seed: 0xad0a033a,
                        datetime: datetime!(2026-02-28 10:58:59).unwrap(),
                        delay: 800,
                    },
                },
                SearchLottery4Res {
                    tid: 47345,
                    prize: Lottery4Prize::ExpShare,
                    mt_advance: 0,
                    seed_time: SeedTime4 {
                        seed: 0xad13033a,
                        datetime: datetime!(2026-02-28 19:58:59).unwrap(),
                        delay: 800,
                    },
                },
                SearchLottery4Res {
                    tid: 44345,
                    prize: Lottery4Prize::ExpShare,
                    mt_advance: 1,
                    seed_time: SeedTime4 {
                        seed: 0xb913033a,
                        datetime: datetime!(2026-03-23 19:57:59).unwrap(),
                        delay: 800,
                    },
                },
                SearchLottery4Res {
                    tid: 19345,
                    prize: Lottery4Prize::ExpShare,
                    mt_advance: 1,
                    seed_time: SeedTime4 {
                        seed: 0xc301033a,
                        datetime: datetime!(2026-03-26 01:58:59).unwrap(),
                        delay: 800,
                    },
                },
                SearchLottery4Res {
                    tid: 19345,
                    prize: Lottery4Prize::ExpShare,
                    mt_advance: 1,
                    seed_time: SeedTime4 {
                        seed: 0xdf13033a,
                        datetime: datetime!(2026-04-27 19:56:59).unwrap(),
                        delay: 800,
                    },
                },
                SearchLottery4Res {
                    tid: 53345,
                    prize: Lottery4Prize::ExpShare,
                    mt_advance: 1,
                    seed_time: SeedTime4 {
                        seed: 0xf903033a,
                        datetime: datetime!(2026-05-27 03:55:59).unwrap(),
                        delay: 800,
                    },
                },
                SearchLottery4Res {
                    tid: 58345,
                    prize: Lottery4Prize::ExpShare,
                    mt_advance: 0,
                    seed_time: SeedTime4 {
                        seed: 0x4e0b033b,
                        datetime: datetime!(2026-01-01 11:18:59).unwrap(),
                        delay: 801,
                    },
                },
                SearchLottery4Res {
                    tid: 51345,
                    prize: Lottery4Prize::ExpShare,
                    mt_advance: 1,
                    seed_time: SeedTime4 {
                        seed: 0x5a06033b,
                        datetime: datetime!(2026-01-01 06:30:59).unwrap(),
                        delay: 801,
                    },
                },
                SearchLottery4Res {
                    tid: 43345,
                    prize: Lottery4Prize::ExpShare,
                    mt_advance: 1,
                    seed_time: SeedTime4 {
                        seed: 0x700f033b,
                        datetime: datetime!(2026-01-01 15:52:59).unwrap(),
                        delay: 801,
                    },
                },
                SearchLottery4Res {
                    tid: 16345,
                    prize: Lottery4Prize::ExpShare,
                    mt_advance: 1,
                    seed_time: SeedTime4 {
                        seed: 0x890f033b,
                        datetime: datetime!(2026-01-19 15:59:59).unwrap(),
                        delay: 801,
                    },
                },
                SearchLottery4Res {
                    tid: 45345,
                    prize: Lottery4Prize::ExpShare,
                    mt_advance: 0,
                    seed_time: SeedTime4 {
                        seed: 0x8d10033b,
                        datetime: datetime!(2026-01-23 16:59:59).unwrap(),
                        delay: 801,
                    },
                },
                SearchLottery4Res {
                    tid: 8345,
                    prize: Lottery4Prize::ExpShare,
                    mt_advance: 0,
                    seed_time: SeedTime4 {
                        seed: 0xa005033b,
                        datetime: datetime!(2026-02-21 05:59:59).unwrap(),
                        delay: 801,
                    },
                },
                SearchLottery4Res {
                    tid: 26345,
                    prize: Lottery4Prize::ExpShare,
                    mt_advance: 0,
                    seed_time: SeedTime4 {
                        seed: 0xc211033b,
                        datetime: datetime!(2026-03-26 17:57:59).unwrap(),
                        delay: 801,
                    },
                },
                SearchLottery4Res {
                    tid: 7345,
                    prize: Lottery4Prize::ExpShare,
                    mt_advance: 1,
                    seed_time: SeedTime4 {
                        seed: 0xdf0c033b,
                        datetime: datetime!(2026-04-27 12:56:59).unwrap(),
                        delay: 801,
                    },
                },
                SearchLottery4Res {
                    tid: 64345,
                    prize: Lottery4Prize::ExpShare,
                    mt_advance: 0,
                    seed_time: SeedTime4 {
                        seed: 0xe110033b,
                        datetime: datetime!(2026-04-27 16:58:59).unwrap(),
                        delay: 801,
                    },
                },
                SearchLottery4Res {
                    tid: 39345,
                    prize: Lottery4Prize::ExpShare,
                    mt_advance: 1,
                    seed_time: SeedTime4 {
                        seed: 0xf201033b,
                        datetime: datetime!(2026-05-25 01:58:59).unwrap(),
                        delay: 801,
                    },
                },
                SearchLottery4Res {
                    tid: 35345,
                    prize: Lottery4Prize::ExpShare,
                    mt_advance: 1,
                    seed_time: SeedTime4 {
                        seed: 0xfa01033b,
                        datetime: datetime!(2026-05-27 01:56:59).unwrap(),
                        delay: 801,
                    },
                },
            ];

            assert_list_eq!(res, expected);
        }
    }
}
