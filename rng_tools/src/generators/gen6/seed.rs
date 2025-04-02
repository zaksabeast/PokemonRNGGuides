use crate::{RngDate, RngDateTime, rng::mt::MT};
use chrono::{DateTime, NaiveDateTime};
use serde::{Deserialize, Serialize};
use tsify_next::Tsify;
use wasm_bindgen::prelude::*;

const EPOCH_OFFSET_3DS: i64 = 946684800000; // Jan 1, 2000

#[derive(Clone, Copy)]
struct CitraMs(u64);

#[derive(Clone, Copy)]
struct UnixMs(u64);

impl From<UnixMs> for CitraMs {
    fn from(unix_ms: UnixMs) -> Self {
        CitraMs(unix_ms.0.saturating_sub(EPOCH_OFFSET_3DS as u64))
    }
}

impl From<CitraMs> for UnixMs {
    fn from(citra_ms: CitraMs) -> Self {
        UnixMs(citra_ms.0.saturating_add(EPOCH_OFFSET_3DS as u64))
    }
}

impl From<NaiveDateTime> for UnixMs {
    fn from(datetime: NaiveDateTime) -> Self {
        let time_ms = datetime.and_utc().timestamp_millis() as u64;
        UnixMs(time_ms)
    }
}

impl From<UnixMs> for NaiveDateTime {
    fn from(unix_ms: UnixMs) -> Self {
        DateTime::from_timestamp_millis(unix_ms.0 as i64)
            .unwrap_or_default()
            .naive_utc()
    }
}

impl From<CitraMs> for NaiveDateTime {
    fn from(citra_ms: CitraMs) -> Self {
        UnixMs::from(citra_ms).into()
    }
}

impl From<NaiveDateTime> for CitraMs {
    fn from(datetime: NaiveDateTime) -> Self {
        UnixMs::from(datetime).into()
    }
}

impl CitraMs {
    fn checked_add(self, rhs: CitraMs) -> Option<CitraMs> {
        self.0.checked_add(rhs.0).map(CitraMs)
    }

    fn checked_sub(self, rhs: CitraMs) -> Option<CitraMs> {
        self.0.checked_sub(rhs.0).map(CitraMs)
    }
}

fn get_save_param(seed: u32, ms: CitraMs) -> u32 {
    seed.wrapping_sub(ms.0 as u32)
}

fn get_time_ms(seed: u32, save_param: u32) -> CitraMs {
    let os_ms = seed.wrapping_sub(save_param) as u64;
    CitraMs(os_ms)
}

#[derive(Debug, Clone, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct Seed6Options {
    pub advance_400_seed: u32,
    pub current_save_param: u32,
    pub target_seed: u32,
    pub target_date: RngDate,
    pub is_oras: bool,
}

#[derive(Debug, Clone, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct Seed6State {
    pub seed: u32,
    pub save_param: u32,
    pub save_advance: usize,
    pub datetime: RngDateTime,
}

const MS_IN_DAY: u64 = 86400000;
const MILLIS_IN_SECOND: usize = 1000;

fn _find_seed6_state(opts: Seed6Options) -> Option<Vec<Seed6State>> {
    let save_delay = match opts.is_oras {
        true => 25,
        false => 23,
    };
    let rands: std::collections::HashMap<_, _> = MT::new(opts.advance_400_seed)
        .skip(save_delay)
        .take(200000)
        .enumerate()
        .map(|(i, rand)| (rand, i))
        .collect();

    let advance_400_ms_offset = get_time_ms(opts.advance_400_seed, opts.current_save_param);
    let target_ms: CitraMs = opts
        .target_date
        .to_naive_date()?
        .and_hms_opt(0, 0, 0)?
        .into();

    let start = target_ms.checked_add(advance_400_ms_offset)?.0;
    let end = start.saturating_add(MS_IN_DAY);

    let result = (start..end)
        .step_by(MILLIS_IN_SECOND)
        .filter_map(|millis| {
            let millis = CitraMs(millis);
            let save_param = get_save_param(opts.target_seed, millis);
            let save_advance = *rands.get(&save_param)?;

            let datetime: NaiveDateTime = millis.checked_sub(advance_400_ms_offset)?.into();

            Some(Seed6State {
                seed: opts.target_seed,
                save_param,
                datetime: datetime.into(),
                save_advance,
            })
        })
        .collect();

    Some(result)
}

#[wasm_bindgen]
pub fn find_seed6_state(opts: Seed6Options) -> Vec<Seed6State> {
    _find_seed6_state(opts).unwrap_or_default()
}

#[cfg(test)]
mod test {
    use super::*;
    use crate::assert_list_eq;
    use chrono::{NaiveDate, NaiveTime};

    #[test]
    fn find_seed() {
        let results = find_seed6_state(Seed6Options {
            advance_400_seed: 0x2d139ab4,
            current_save_param: 0x2d0e851e,
            target_seed: 0xf00df00d,
            target_date: RngDate {
                year: 2025,
                month: 3,
                day: 23,
            },
            is_oras: true,
        });
        let expected = [
            Seed6State {
                seed: 0xf00df00d,
                save_param: 0x99ae8e97,
                save_advance: 73289,
                datetime: RngDateTime {
                    year: 2025,
                    month: 3,
                    day: 23,
                    hour: 4,
                    minute: 1,
                    second: 48,
                },
            },
            Seed6State {
                seed: 0xf00df00d,
                save_param: 0x97e2c777,
                save_advance: 194737,
                datetime: RngDateTime {
                    year: 2025,
                    month: 3,
                    day: 23,
                    hour: 12,
                    minute: 24,
                    second: 0,
                },
            },
            Seed6State {
                seed: 0xf00df00d,
                save_param: 0x970df317,
                save_advance: 95886,
                datetime: RngDateTime {
                    year: 2025,
                    month: 3,
                    day: 23,
                    hour: 16,
                    minute: 16,
                    second: 28,
                },
            },
        ];
        assert_list_eq!(results, expected);
    }

    #[test]
    fn save_param() {
        let seed = 0xaabbccdd;
        let millis = NaiveDateTime::new(
            NaiveDate::from_ymd_opt(2000, 1, 30).unwrap(),
            NaiveTime::from_hms_milli_opt(19, 49, 40, 377).unwrap(),
        );
        let save_param: u32 = get_save_param(seed, millis.into());
        assert_eq!(save_param, 0x11223344);
    }
}
