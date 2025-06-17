use chrono::{Datelike, Duration, NaiveDate, NaiveDateTime, Timelike};
use serde::{Deserialize, Serialize};
use tsify_next::Tsify;
use wasm_bindgen::prelude::*;

#[derive(Debug, Clone, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct RngDate {
    pub year: u32,
    pub month: u32,
    pub day: u32,
}

impl RngDate {
    pub fn to_naive_date(&self) -> Option<NaiveDate> {
        let year = self.year.try_into().ok()?;
        NaiveDate::from_ymd_opt(year, self.month, self.day)
    }
}

impl From<NaiveDate> for RngDate {
    fn from(date: NaiveDate) -> Self {
        RngDate {
            year: date.year().try_into().unwrap_or(2000),
            month: date.month(),
            day: date.day(),
        }
    }
}

#[derive(Debug, Clone, PartialEq, Eq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct RngDateTime {
    pub year: u32,
    pub month: u32,
    pub day: u32,
    pub hour: u32,
    pub minute: u32,
    pub second: u32,
}

impl Default for RngDateTime {
    fn default() -> Self {
        RngDateTime {
            year: 2000,
            month: 1,
            day: 1,
            hour: 0,
            minute: 0,
            second: 0,
        }
    }
}

impl RngDateTime {
    pub fn new(
        year: u32,
        month: u32,
        day: u32,
        hour: u32,
        minute: u32,
        second: u32,
    ) -> Option<Self> {
        let year = year.try_into().ok()?;
        let result = NaiveDate::from_ymd_opt(year, month, day)?
            .and_hms_opt(hour, minute, second)?
            .into();
        Some(result)
    }

    pub fn to_naive_datetime(&self) -> Option<NaiveDateTime> {
        let year = self.year.try_into().ok()?;
        NaiveDate::from_ymd_opt(year, self.month, self.day)?.and_hms_opt(
            self.hour,
            self.minute,
            self.second,
        )
    }

    pub fn as_seconds_iterator(&mut self) -> SecondsIterator {
        SecondsIterator::new(self)
    }
}

impl From<NaiveDateTime> for RngDateTime {
    fn from(datetime: NaiveDateTime) -> Self {
        RngDateTime {
            year: datetime.year().try_into().unwrap_or(2000),
            month: datetime.month(),
            day: datetime.day(),
            hour: datetime.hour(),
            minute: datetime.minute(),
            second: datetime.second(),
        }
    }
}

pub struct SecondsIterator<'a> {
    returned_initial: bool,
    rng_datetime: &'a mut RngDateTime,
}

impl<'a> SecondsIterator<'a> {
    fn new(rng_datetime: &'a mut RngDateTime) -> Self {
        Self {
            returned_initial: false,
            rng_datetime,
        }
    }
}

impl Iterator for SecondsIterator<'_> {
    type Item = RngDateTime;

    fn next(&mut self) -> Option<Self::Item> {
        if !self.returned_initial {
            self.returned_initial = true;
            return Some(self.rng_datetime.clone());
        }

        let mut datetime = self.rng_datetime.to_naive_datetime()?;
        datetime = datetime.checked_add_signed(Duration::seconds(1))?;
        *self.rng_datetime = RngDateTime::from(datetime);
        Some(self.rng_datetime.clone())
    }
}

#[macro_export]
macro_rules! datetime {
    ($year:literal-$month:literal-$day:literal $hour:literal:$minute:literal:$second:literal) => {{ $crate::RngDateTime::new($year, $month, $day, $hour, $minute, $second) }};
}

fn get_days_in_month_opt(year: i32, month: u32) -> Option<u32> {
    let next_month = NaiveDate::from_ymd_opt(
        match month {
            12 => year + 1,
            _ => year,
        },
        match month {
            12 => 1,
            _ => month + 1,
        },
        1,
    )?;
    let start_of_month = NaiveDate::from_ymd_opt(year, month, 1)?;
    let days_in_month = next_month.signed_duration_since(start_of_month).num_days();
    days_in_month.try_into().ok()
}

pub fn get_days_in_month(year: i32, month: u32) -> u32 {
    // Lazily return 0 if the month is invalid
    get_days_in_month_opt(year, month).unwrap_or_default()
}

#[cfg(test)]
mod test {
    use super::*;
    use crate::assert_list_eq;

    mod seconds_iterator {
        use super::*;

        #[test]
        fn iterates() {
            let results = datetime!(2025-1-1 0:0:0)
                .unwrap()
                .as_seconds_iterator()
                .take(5)
                .collect::<Vec<RngDateTime>>();
            let expected = vec![
                datetime!(2025-1-1 0:0:0).unwrap(),
                datetime!(2025-1-1 0:0:1).unwrap(),
                datetime!(2025-1-1 0:0:2).unwrap(),
                datetime!(2025-1-1 0:0:3).unwrap(),
                datetime!(2025-1-1 0:0:4).unwrap(),
            ];
            assert_list_eq!(results, expected);
        }

        #[test]
        fn handles_overflow() {
            let results = datetime!(2025-12-31 23:59:59)
                .unwrap()
                .as_seconds_iterator()
                .take(2)
                .collect::<Vec<_>>();
            let expected = [
                datetime!(2025-12-31 23:59:59).unwrap(),
                datetime!(2026-1-1 0:0:0).unwrap(),
            ];
            assert_eq!(results, expected);
        }
    }
}
