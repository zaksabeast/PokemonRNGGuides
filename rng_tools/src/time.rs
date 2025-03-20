use chrono::{Datelike, NaiveDate, NaiveDateTime, Timelike};
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

#[derive(Debug, Clone, PartialEq, Tsify, Serialize, Deserialize)]
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

#[macro_export]
macro_rules! datetime {
    ($year:literal-$month:literal-$day:literal $hour:literal:$minute:literal:$second:literal) => {{ RngDateTime::new($year, $month, $day, $hour, $minute, $second) }};
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
