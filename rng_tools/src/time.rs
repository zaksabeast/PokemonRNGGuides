use chrono::{Datelike, NaiveDate};
use serde::{Deserialize, Serialize};
use tsify_next::Tsify;
use wasm_bindgen::prelude::*;

#[derive(Debug, Clone, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct RngDate {
    pub year: i32,
    pub month: u32,
    pub day: u32,
}

impl RngDate {
    pub fn to_naive_date(&self) -> Option<NaiveDate> {
        NaiveDate::from_ymd_opt(self.year, self.month, self.day)
    }
}

impl From<NaiveDate> for RngDate {
    fn from(date: NaiveDate) -> Self {
        RngDate {
            year: date.year(),
            month: date.month(),
            day: date.day(),
        }
    }
}
