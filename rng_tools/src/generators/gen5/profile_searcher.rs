use super::{
    ds_type::DsType, game::Gen5Game, keypresses::Keypress, language::Gen5Language, serde_utils,
};
use crate::gen5::keypresses::Gen5Buttons;
use crate::rng::Rng;
use crate::rng::mt_fast::MtFast;
use crate::{G5Idx, Ivs};
use crate::{
    RngDateTime,
    gen5::{
        sha1::Sha1,
        utils::{initial_advances_bw, initial_advances_bw2},
    },
    rng::lcrng64::Bwrng,
};
use serde::{Deserialize, Serialize};
use tsify::Tsify;
use wasm_bindgen::prelude::*;

#[derive(Debug, Clone, Copy, PartialEq, Eq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
#[repr(u8)]
pub enum Profile5Needle {
    Up = 0,
    UpRight = 1,
    Right = 2,
    DownRight = 3,
    Down = 4,
    DownLeft = 5,
    Left = 6,
    UpLeft = 7,
}

#[derive(Debug, Clone, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct Profile5SeedValidator {
    #[tsify(type = "string")]
    #[serde(
        serialize_with = "serde_utils::serialize_u64",
        deserialize_with = "serde_utils::deserialize_u64"
    )]
    seed: u64,
}

impl Profile5SeedValidator {
    fn valid(&self, seed: u64) -> bool {
        self.seed == seed
    }
}

#[derive(Debug, Clone, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct Profile5IvValidator {
    min_ivs: Ivs,
    max_ivs: Ivs,
}

impl Profile5IvValidator {
    fn valid(&self, seed: u64, game: Gen5Game) -> bool {
        let offset = match game {
            Gen5Game::Black | Gen5Game::White => 0,
            _ => 2,
        };
        let mut rng = MtFast::<8, 12, true>::new((seed >> 32) as u32, offset);
        for &i in G5Idx::ORDER.iter() {
            let iv = rng.next() as u8;
            if iv < self.min_ivs[i] || iv > self.max_ivs[i] {
                return false;
            }
        }

        true
    }
}

#[derive(Debug, Clone, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct Profile5NeedleValidator {
    needles: Vec<Profile5Needle>,
    memory_link: bool,
    unova_link: bool,
}

impl Profile5NeedleValidator {
    fn valid(&self, seed: u64, game: Gen5Game) -> bool {
        let mut advances = match game {
            Gen5Game::Black | Gen5Game::White => initial_advances_bw(seed),
            _ => initial_advances_bw2(seed, self.memory_link),
        };

        if self.unova_link && !self.memory_link {
            advances += 1;
        }

        let mut rng = Bwrng::with_jump(seed, advances);

        for &needle in &self.needles {
            let rand = rng.rand_max::<u32>(8) as u8;
            if rand != (needle as u8) {
                return false;
            }

            if self.unova_link {
                rng.advance(1);
            }
        }

        true
    }
}

#[derive(Debug, Clone, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub enum Profile5Validator {
    Needle(Profile5NeedleValidator),
    Ivs(Profile5IvValidator),
    Seed(Profile5SeedValidator),
}

#[derive(Debug, Clone, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct Profile5SearchResult {
    #[tsify(type = "string")]
    #[serde(
        serialize_with = "serde_utils::serialize_u64",
        deserialize_with = "serde_utils::deserialize_u64"
    )]
    pub seed: u64,
    pub timer0: u16,
    pub vcount: u8,
    pub vframe: u8,
    pub gx_stat: u8,
    pub second: u8,
}

#[derive(Debug, Clone, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct ProfileSearcher5 {
    #[tsify(type = "string")]
    #[serde(
        serialize_with = "serde_utils::serialize_u64",
        deserialize_with = "serde_utils::deserialize_u64"
    )]
    pub mac: u64,
    pub version: Gen5Game,
    pub buttons: Vec<Gen5Buttons>,
    pub date_time: RngDateTime,
    pub max_timer0: u16,
    pub min_timer0: u16,
    pub ds_type: DsType,
    pub language: Gen5Language,
    pub max_gx_stat: u8,
    pub min_gx_stat: u8,
    pub max_seconds: u8,
    pub min_seconds: u8,
    pub max_v_count: u8,
    pub min_v_count: u8,
    pub min_v_frame: u8,
    pub max_v_frame: u8,
    pub validator: Profile5Validator,
}

impl ProfileSearcher5 {
    fn sha(&self, vframe: u8, gx_stat: u8) -> Sha1 {
        Sha1::new(
            self.version,
            self.language,
            self.ds_type,
            self.mac,
            vframe,
            gx_stat,
        )
    }

    pub fn valid(&self, seed: u64) -> bool {
        match &self.validator {
            Profile5Validator::Needle(validator) => validator.valid(seed, self.version),
            Profile5Validator::Ivs(validator) => validator.valid(seed, self.version),
            Profile5Validator::Seed(validator) => validator.valid(seed),
        }
    }

    pub fn search(&self) -> Vec<Profile5SearchResult> {
        let datetime = self.date_time.to_naive_datetime();
        if datetime.is_none() {
            return vec![];
        }
        let date = datetime.unwrap().date();

        let button_bits = Keypress::from_buttons(&self.buttons);
        let hour = self.date_time.hour as u8;
        let minute = self.date_time.minute as u8;

        let mut results = vec![];

        for vframe in self.min_v_frame..=self.max_v_frame {
            for gx_stat in self.min_gx_stat..=self.max_gx_stat {
                let mut sha = self.sha(vframe, gx_stat);
                sha.set_date(&date);
                sha.set_button(button_bits.value);

                for timer0 in self.min_timer0..=self.max_timer0 {
                    for vcount in self.min_v_count..=self.max_v_count {
                        sha.set_timer0(timer0, vcount);
                        let alpha = sha.precompute();

                        for second in self.min_seconds..=self.max_seconds {
                            sha.set_time_hms(hour, minute, second, self.ds_type);
                            let seed = sha.hash_seed(alpha);

                            if self.valid(seed) {
                                results.push(Profile5SearchResult {
                                    seed,
                                    timer0,
                                    vcount,
                                    vframe,
                                    gx_stat,
                                    second,
                                });
                            }
                        }
                    }
                }
            }
        }

        results
    }
}

#[wasm_bindgen]
pub fn search_profile5(profile_searcher: &ProfileSearcher5) -> Vec<Profile5SearchResult> {
    profile_searcher.search()
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::{assert_list_eq, datetime};

    mod seed_searcher {
        use super::*;

        #[test]
        fn black1() {
            let searcher = ProfileSearcher5 {
                mac: 0x9bf123456,
                version: Gen5Game::Black,
                language: Gen5Language::English,
                buttons: vec![],
                date_time: datetime!(2000-1-1 0:0:0).unwrap(),
                max_timer0: 0x608,
                min_timer0: 0x608,
                ds_type: DsType::DS,
                min_gx_stat: 5,
                max_gx_stat: 6,
                min_v_count: 0x2e,
                max_v_count: 0x2e,
                min_seconds: 0,
                max_seconds: 0,
                min_v_frame: 5,
                max_v_frame: 5,
                validator: Profile5Validator::Seed(Profile5SeedValidator {
                    seed: 0x5e89803c95fe8240,
                }),
            };

            let res = searcher.search();
            assert_list_eq!(
                &res,
                &[Profile5SearchResult {
                    seed: 0x5e89803c95fe8240,
                    timer0: 0x608,
                    vcount: 0x2e,
                    vframe: 5,
                    gx_stat: 6,
                    second: 0,
                }]
            );
        }

        #[test]
        fn black2() {
            let searcher = ProfileSearcher5 {
                mac: 0x9bf123456,
                version: Gen5Game::Black2,
                language: Gen5Language::English,
                buttons: vec![],
                date_time: datetime!(2000-1-1 0:0:0).unwrap(),
                ds_type: DsType::DS,
                min_gx_stat: 6,
                max_gx_stat: 6,
                min_v_count: 0x48,
                max_v_count: 0x48,
                max_timer0: 0x972,
                min_timer0: 0x972,
                min_seconds: 0,
                max_seconds: 0,
                min_v_frame: 5,
                max_v_frame: 5,
                validator: Profile5Validator::Seed(Profile5SeedValidator {
                    seed: 0x490eabda126d5432,
                }),
            };

            let res = searcher.search();
            assert_list_eq!(
                &res,
                &[Profile5SearchResult {
                    seed: 0x490eabda126d5432,
                    timer0: 0x972,
                    vcount: 0x48,
                    vframe: 5,
                    gx_stat: 6,
                    second: 0,
                }]
            );
        }

        #[test]
        fn with_buttons() {
            let searcher = ProfileSearcher5 {
                mac: 0x9bf123456,
                version: Gen5Game::Black,
                language: Gen5Language::English,
                buttons: vec![Gen5Buttons::R, Gen5Buttons::Select, Gen5Buttons::Left],
                date_time: datetime!(2000-1-1 0:0:0).unwrap(),
                max_timer0: 0x608,
                min_timer0: 0x608,
                ds_type: DsType::DS,
                min_gx_stat: 6,
                max_gx_stat: 6,
                min_v_count: 0x2e,
                max_v_count: 0x2e,
                min_seconds: 0,
                max_seconds: 0,
                min_v_frame: 5,
                max_v_frame: 5,
                validator: Profile5Validator::Seed(Profile5SeedValidator {
                    seed: 0xba4b3add4b48536b,
                }),
            };

            let res = searcher.search();
            assert_list_eq!(
                &res,
                &[Profile5SearchResult {
                    seed: 0xba4b3add4b48536b,
                    timer0: 0x608,
                    vcount: 0x2e,
                    vframe: 5,
                    gx_stat: 6,
                    second: 0,
                }]
            );
        }
    }

    mod needle_searcher {
        use super::*;

        #[test]
        fn black1() {
            let searcher = ProfileSearcher5 {
                date_time: datetime!(2000-1-1 0:0:0).unwrap(),
                min_seconds: 0,
                max_seconds: 59,
                min_v_count: 0x2e,
                max_v_count: 0x2e,
                max_timer0: 0x608,
                min_timer0: 0x608,
                min_gx_stat: 6,
                max_gx_stat: 6,
                min_v_frame: 5,
                max_v_frame: 5,
                version: Gen5Game::Black,
                language: Gen5Language::English,
                ds_type: DsType::DS,
                mac: 0x9bf123456,
                buttons: vec![],
                validator: Profile5Validator::Needle(Profile5NeedleValidator {
                    memory_link: false,
                    unova_link: false,
                    needles: vec![
                        Profile5Needle::DownLeft,
                        Profile5Needle::Down,
                        Profile5Needle::Up,
                        Profile5Needle::DownLeft,
                    ],
                }),
            };

            let res = searcher.search();
            assert_list_eq!(
                &res,
                &[Profile5SearchResult {
                    seed: 0x5e89803c95fe8240,
                    timer0: 0x608,
                    vcount: 0x2e,
                    vframe: 5,
                    gx_stat: 6,
                    second: 0,
                }]
            );
        }

        #[test]
        fn black2_unova_link() {
            let searcher = ProfileSearcher5 {
                date_time: datetime!(2000-1-1 0:0:0).unwrap(),
                min_seconds: 0,
                max_seconds: 59,
                min_v_count: 0x48,
                max_v_count: 0x48,
                max_timer0: 0x972,
                min_timer0: 0x972,
                min_gx_stat: 6,
                max_gx_stat: 6,
                min_v_frame: 5,
                max_v_frame: 5,
                version: Gen5Game::Black2,
                language: Gen5Language::English,
                ds_type: DsType::DS,
                mac: 0x9bf123456,
                buttons: vec![],
                validator: Profile5Validator::Needle(Profile5NeedleValidator {
                    memory_link: false,
                    unova_link: true,
                    needles: vec![
                        Profile5Needle::UpLeft,
                        Profile5Needle::Down,
                        Profile5Needle::UpLeft,
                        Profile5Needle::Up,
                    ],
                }),
            };

            let res = searcher.search();
            assert_list_eq!(
                &res,
                &[Profile5SearchResult {
                    seed: 0x490eabda126d5432,
                    timer0: 0x972,
                    vcount: 0x48,
                    vframe: 5,
                    gx_stat: 6,
                    second: 0,
                }]
            );
        }

        #[test]
        fn black2_unova_link_memory_link() {
            let searcher = ProfileSearcher5 {
                date_time: datetime!(2000-1-1 0:0:0).unwrap(),
                min_seconds: 0,
                max_seconds: 59,
                min_v_count: 0x48,
                max_v_count: 0x48,
                max_timer0: 0x972,
                min_timer0: 0x972,
                min_gx_stat: 6,
                max_gx_stat: 6,
                min_v_frame: 5,
                max_v_frame: 5,
                version: Gen5Game::Black2,
                language: Gen5Language::English,
                ds_type: DsType::DS,
                mac: 0x9bf123456,
                buttons: vec![],
                validator: Profile5Validator::Needle(Profile5NeedleValidator {
                    memory_link: true,
                    unova_link: true,
                    needles: vec![
                        Profile5Needle::Up,
                        Profile5Needle::UpRight,
                        Profile5Needle::Up,
                        Profile5Needle::UpLeft,
                    ],
                }),
            };

            let res = searcher.search();
            assert_list_eq!(
                &res,
                &[Profile5SearchResult {
                    seed: 0x490eabda126d5432,
                    timer0: 0x972,
                    vcount: 0x48,
                    vframe: 5,
                    gx_stat: 6,
                    second: 0,
                }]
            );
        }
    }

    mod iv_searcher {
        use super::*;
        use crate::ivs;

        #[test]
        fn black1() {
            let searcher = ProfileSearcher5 {
                mac: 0x9bf123456,
                version: Gen5Game::Black,
                language: Gen5Language::English,
                buttons: vec![],
                date_time: datetime!(2000-1-1 0:0:0).unwrap(),
                max_timer0: 0x608,
                min_timer0: 0x608,
                ds_type: DsType::DS,
                min_gx_stat: 6,
                max_gx_stat: 6,
                min_v_count: 0x2e,
                max_v_count: 0x2e,
                min_seconds: 0,
                max_seconds: 0,
                min_v_frame: 5,
                max_v_frame: 5,
                validator: Profile5Validator::Ivs(Profile5IvValidator {
                    min_ivs: ivs!(24 / 4 / 18 / 5 / 26 / 0),
                    max_ivs: ivs!(24 / 4 / 18 / 5 / 26 / 0),
                }),
            };

            let res = searcher.search();
            assert_list_eq!(
                &res,
                &[Profile5SearchResult {
                    seed: 0x5e89803c95fe8240,
                    timer0: 0x608,
                    vcount: 0x2e,
                    vframe: 5,
                    gx_stat: 6,
                    second: 0,
                }]
            );
        }

        #[test]
        fn black2() {
            let searcher = ProfileSearcher5 {
                mac: 0x9bf123456,
                version: Gen5Game::Black2,
                language: Gen5Language::English,
                buttons: vec![],
                date_time: datetime!(2000-1-1 0:0:0).unwrap(),
                ds_type: DsType::DS,
                min_gx_stat: 6,
                max_gx_stat: 6,
                min_v_count: 0x48,
                max_v_count: 0x48,
                max_timer0: 0x972,
                min_timer0: 0x972,
                min_seconds: 0,
                max_seconds: 0,
                min_v_frame: 5,
                max_v_frame: 5,
                validator: Profile5Validator::Ivs(Profile5IvValidator {
                    min_ivs: ivs!(5 / 4 / 27 / 10 / 7 / 17),
                    max_ivs: ivs!(5 / 4 / 27 / 10 / 7 / 17),
                }),
            };

            let res = searcher.search();
            assert_list_eq!(
                &res,
                &[Profile5SearchResult {
                    seed: 0x490eabda126d5432,
                    timer0: 0x972,
                    vcount: 0x48,
                    vframe: 5,
                    gx_stat: 6,
                    second: 0,
                }]
            );
        }
    }
}
