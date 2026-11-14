use crate::gen4::GameVersion;
use crate::gen4::seed_time::ab::build_seedtime4_ab_lookup_with_minutes;
use crate::gen4::seed_time::{
    GEN4_YEARS, SeedTime4, generate_seedtime4_from_datetime_delay, relative_gen4_datetimes,
    seedtime4_iter_with_lookup, seedtime4_search_second_range,
};
use crate::rng::Rng;
use crate::rng::mt::MT;
use crate::{IdFilter, RngDateTime, gen3_tsv};
use itertools::iproduct;
use serde::{Deserialize, Serialize};
use std::ops::RangeInclusive;
use tsify::Tsify;
use wasm_bindgen::prelude::*;

#[derive(Debug, Clone, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct Id4Options {
    pub min_delay: u32,
    pub max_delay: u32,
    pub game_datetime: RngDateTime,
    pub game: GameVersion,
    pub filter: IdFilter,
}

#[derive(Debug, Clone, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct Id4 {
    pub seed_time: SeedTime4,
    /// The in-game clock time to target, which can differ from the seed's datetime.
    pub game_datetime: RngDateTime,
    pub tid: u16,
    pub sid: u16,
    pub tsv: u16,
}

/// Searches a minute centered on the target, so hits in the previous or next minute are found.
const ID_CALIBRATION_SECOND_OFFSET: i32 = 30;

/// HGSS seeds the ID 3 seconds after the in-game clock time the player targets.
const HGSS_ID_SEED_SECOND_OFFSET: u32 = 3;

fn id_seed_second_offset(game: GameVersion) -> u32 {
    match game {
        GameVersion::HeartGold | GameVersion::SoulSilver => HGSS_ID_SEED_SECOND_OFFSET,
        GameVersion::Diamond | GameVersion::Pearl | GameVersion::Platinum => 0,
    }
}

fn id_game_datetime(seed_datetime: &RngDateTime, seed_second_offset: u32) -> Option<RngDateTime> {
    if seed_second_offset == 0 {
        return Some(seed_datetime.clone());
    }

    let game_datetime = seed_datetime.add_seconds(-i64::from(seed_second_offset))?;
    GEN4_YEARS
        .contains(&(game_datetime.year as i32))
        .then_some(game_datetime)
}

/// Shifts targetable game seconds to seed seconds, wrapping a forced second into the next minute.
fn id_seed_second_range(force_second: Option<u32>, seed_second_offset: u32) -> RangeInclusive<u32> {
    match force_second {
        Some(second) => {
            let seed_second = (second + seed_second_offset) % 60;
            seed_second..=seed_second
        }
        None => {
            let game_seconds = seedtime4_search_second_range(None);
            (game_seconds.start() + seed_second_offset)..=*game_seconds.end()
        }
    }
}

/// A forced second that wraps puts the game time a minute before the seed time,
/// so seed minute 0 is skipped to keep the game time in the seed's hour, day, and year.
fn id_seed_minute_range(force_second: Option<u32>, seed_second_offset: u32) -> RangeInclusive<u32> {
    match force_second {
        Some(second) if second + seed_second_offset >= 60 => 1..=59,
        _ => 0..=59,
    }
}

/// Returns the ID if it passes the filter and its game datetime is one a gen 4 clock can show.
fn filtered_id4(seed_time: SeedTime4, filter: &IdFilter, seed_second_offset: u32) -> Option<Id4> {
    let mut rng = MT::new(seed_time.seed);
    rng.rand::<u32>();

    let sidtid = rng.rand::<u32>();
    let tid = sidtid as u16;
    let sid = (sidtid >> 16) as u16;

    if !filter.filter_gen3(tid, sid) {
        return None;
    }

    let game_datetime = id_game_datetime(&seed_time.datetime, seed_second_offset)?;

    Some(Id4 {
        seed_time,
        game_datetime,
        tid,
        sid,
        tsv: gen3_tsv(tid, sid),
    })
}

#[wasm_bindgen]
pub fn generate_gen4_ids(opts: Id4Options) -> Vec<Id4> {
    let Id4Options {
        min_delay,
        max_delay,
        game_datetime,
        game,
        filter,
    } = opts;

    let seed_second_offset = id_seed_second_offset(game);
    let Some(seed_datetime) = game_datetime.add_seconds(i64::from(seed_second_offset)) else {
        return vec![];
    };
    let datetime_iter = relative_gen4_datetimes(&seed_datetime, ID_CALIBRATION_SECOND_OFFSET);

    generate_seedtime4_from_datetime_delay(iproduct!(datetime_iter, min_delay..=max_delay))
        .filter_map(|seed_time| filtered_id4(seed_time, &filter, seed_second_offset))
        .collect()
}

#[derive(Debug, Clone, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct Id4SearchOptions {
    pub min_delay: u32,
    pub max_delay: u32,
    pub year: u32,
    pub game: GameVersion,
    pub filter: IdFilter,
    /// Forces the game second, not the seed second.
    pub force_second: Option<u32>,
}

#[wasm_bindgen]
pub fn search_gen4_ids(opts: Id4SearchOptions) -> Vec<Id4> {
    let seed_second_offset = id_seed_second_offset(opts.game);
    let ab_lookup = build_seedtime4_ab_lookup_with_minutes(
        opts.year,
        None,
        id_seed_minute_range(opts.force_second, seed_second_offset),
        Some(id_seed_second_range(opts.force_second, seed_second_offset)),
    );

    seedtime4_iter_with_lookup(opts.min_delay..=opts.max_delay, opts.year, ab_lookup)
        .filter_map(|seed_time| filtered_id4(seed_time, &opts.filter, seed_second_offset))
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
            game: GameVersion::Platinum,
            force_second: None,
        };
        let results = search_gen4_ids(opts);
        let expected = [Id4 {
            tid: 1234,
            sid: 12129,
            tsv: 1398,
            seed_time: SeedTime4 {
                seed: 0x4e16001a,
                datetime: datetime!(2021-01-01 22:19:58).unwrap(),
                delay: 5,
            },
            game_datetime: datetime!(2021-01-01 22:19:58).unwrap(),
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
            game: GameVersion::Platinum,
            force_second: Some(30),
        };
        let results = search_gen4_ids(opts);
        let expected = [Id4 {
            tid: 1234,
            sid: 12129,
            tsv: 1398,
            seed_time: SeedTime4 {
                seed: 0x4e16001a,
                datetime: datetime!(2021-01-01 22:47:30).unwrap(),
                delay: 5,
            },
            game_datetime: datetime!(2021-01-01 22:47:30).unwrap(),
        }];

        assert_list_eq!(results, expected);
    }

    #[test]
    fn search_hgss() {
        let opts = Id4SearchOptions {
            filter: IdFilter::Tid(1234),
            min_delay: 0,
            max_delay: 10,
            year: 2021,
            game: GameVersion::HeartGold,
            force_second: None,
        };
        let results = search_gen4_ids(opts);
        let expected = [Id4 {
            tid: 1234,
            sid: 12129,
            tsv: 1398,
            seed_time: SeedTime4 {
                seed: 0x4e16001a,
                datetime: datetime!(2021-01-01 22:19:58).unwrap(),
                delay: 5,
            },
            game_datetime: datetime!(2021-01-01 22:19:55).unwrap(),
        }];

        assert_list_eq!(results, expected);
    }

    #[test]
    fn search_hgss_forces_game_second() {
        let opts = Id4SearchOptions {
            filter: IdFilter::Tid(1234),
            min_delay: 0,
            max_delay: 10,
            year: 2021,
            game: GameVersion::SoulSilver,
            force_second: Some(27),
        };
        let results = search_gen4_ids(opts);
        let expected = [Id4 {
            tid: 1234,
            sid: 12129,
            tsv: 1398,
            seed_time: SeedTime4 {
                seed: 0x4e16001a,
                datetime: datetime!(2021-01-01 22:47:30).unwrap(),
                delay: 5,
            },
            game_datetime: datetime!(2021-01-01 22:47:27).unwrap(),
        }];

        assert_list_eq!(results, expected);
    }

    #[test]
    fn search_hgss_wraps_forced_game_second_into_next_minute() {
        let opts = Id4SearchOptions {
            filter: IdFilter::Tid(1234),
            min_delay: 0,
            max_delay: 10,
            year: 2021,
            game: GameVersion::HeartGold,
            force_second: Some(58),
        };
        let results = search_gen4_ids(opts);
        let expected = [Id4 {
            tid: 1234,
            sid: 12129,
            tsv: 1398,
            seed_time: SeedTime4 {
                seed: 0x4e16001a,
                datetime: datetime!(2021-01-18 22:59:01).unwrap(),
                delay: 5,
            },
            game_datetime: datetime!(2021-01-18 22:58:58).unwrap(),
        }];

        assert_list_eq!(results, expected);
    }

    #[test]
    fn search_hgss_finds_wrapped_forced_second_in_2000() {
        // Seed 0x02000258 can be hit at 2000-01-01 00:00:01, but its game time is in 1999.
        // 2000-07-29 00:54:01 hits the same seed with a game time in 2000.
        let opts = Id4SearchOptions {
            filter: IdFilter::Tid(40105),
            min_delay: 600,
            max_delay: 600,
            year: 2000,
            game: GameVersion::HeartGold,
            force_second: Some(58),
        };
        let results = search_gen4_ids(opts);
        let expected = [Id4 {
            tid: 40105,
            sid: 53735,
            tsv: 2473,
            seed_time: SeedTime4 {
                seed: 0x02000258,
                datetime: datetime!(2000-07-29 00:54:01).unwrap(),
                delay: 600,
            },
            game_datetime: datetime!(2000-07-29 00:53:58).unwrap(),
        }];

        assert_list_eq!(results, expected);
    }

    #[test]
    fn generate() {
        let opts = Id4Options {
            min_delay: 5000,
            max_delay: 6000,
            game_datetime: datetime!(2021-03-23 11:58:30).unwrap(),
            game: GameVersion::Platinum,
            filter: IdFilter::Tid(1234),
        };

        let results = generate_gen4_ids(opts);
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
                game_datetime: datetime!(2021-03-23 11:58:37).unwrap(),
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
                game_datetime: datetime!(2021-03-23 11:58:49).unwrap(),
            },
        ];
        assert_list_eq!(results, expected);
    }

    #[test]
    fn generate_includes_previous_minute() {
        let opts = Id4Options {
            min_delay: 5709,
            max_delay: 5709,
            game_datetime: datetime!(2021-03-23 11:59:10).unwrap(),
            game: GameVersion::Platinum,
            filter: IdFilter::Tid(1234),
        };

        let results = generate_gen4_ids(opts);
        let expected = [Id4 {
            tid: 1234,
            sid: 22909,
            tsv: 2997,
            seed_time: SeedTime4 {
                seed: 0xb00b1662,
                datetime: datetime!(2021-03-23 11:58:49).unwrap(),
                delay: 5709,
            },
            game_datetime: datetime!(2021-03-23 11:58:49).unwrap(),
        }];
        assert_list_eq!(results, expected);
    }

    #[test]
    fn generate_hgss_centers_on_seed_datetime() {
        // The seed is 31 seconds after the target, so it's only in range after the 3 second shift.
        let opts = Id4Options {
            min_delay: 5709,
            max_delay: 5709,
            game_datetime: datetime!(2021-03-23 11:58:18).unwrap(),
            game: GameVersion::HeartGold,
            filter: IdFilter::Tid(1234),
        };

        let results = generate_gen4_ids(opts);
        let expected = [Id4 {
            tid: 1234,
            sid: 22909,
            tsv: 2997,
            seed_time: SeedTime4 {
                seed: 0xb00b1662,
                datetime: datetime!(2021-03-23 11:58:49).unwrap(),
                delay: 5709,
            },
            game_datetime: datetime!(2021-03-23 11:58:46).unwrap(),
        }];
        assert_list_eq!(results, expected);
    }

    #[test]
    fn generate_dppt_keeps_first_seconds_of_2000() {
        let opts = Id4Options {
            min_delay: 600,
            max_delay: 600,
            game_datetime: datetime!(2000-01-01 00:00:00).unwrap(),
            game: GameVersion::Diamond,
            filter: IdFilter::Tid(40105),
        };

        let results = generate_gen4_ids(opts);
        let expected = [Id4 {
            tid: 40105,
            sid: 53735,
            tsv: 2473,
            seed_time: SeedTime4 {
                seed: 0x02000258,
                datetime: datetime!(2000-01-01 00:00:01).unwrap(),
                delay: 600,
            },
            game_datetime: datetime!(2000-01-01 00:00:01).unwrap(),
        }];
        assert_list_eq!(results, expected);
    }

    #[test]
    fn generate_hgss_drops_game_times_before_2000() {
        // Same seed as the DPPt test, but its HGSS game time is 1999-12-31 23:59:58.
        let opts = Id4Options {
            min_delay: 600,
            max_delay: 600,
            game_datetime: datetime!(2000-01-01 00:00:00).unwrap(),
            game: GameVersion::HeartGold,
            filter: IdFilter::Tid(40105),
        };

        let results = generate_gen4_ids(opts);
        let expected: [Id4; 0] = [];
        assert_list_eq!(results, expected);
    }

    #[test]
    fn generate_hgss_keeps_first_game_seconds_of_2000() {
        let opts = Id4Options {
            min_delay: 600,
            max_delay: 600,
            game_datetime: datetime!(2000-01-01 00:00:00).unwrap(),
            game: GameVersion::HeartGold,
            filter: IdFilter::Tid(40480),
        };

        let results = generate_gen4_ids(opts);
        let expected = [Id4 {
            tid: 40480,
            sid: 58814,
            tsv: 3955,
            seed_time: SeedTime4 {
                seed: 0x05000258,
                datetime: datetime!(2000-01-01 00:00:04).unwrap(),
                delay: 600,
            },
            game_datetime: datetime!(2000-01-01 00:00:01).unwrap(),
        }];
        assert_list_eq!(results, expected);
    }
}
