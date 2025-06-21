use super::SeedTime4;
use crate::RngDateTime;
use itertools::iproduct;
use serde::{Deserialize, Serialize};
use tsify_next::Tsify;
use wasm_bindgen::prelude::*;

pub fn calc_ab(month: u32, day: u32, minute: u32, second: u32) -> u32 {
    month
        .wrapping_mul(day)
        .wrapping_add(minute)
        .wrapping_add(second)
        & 0xff
}

pub fn calc_seed(datetime: &RngDateTime, delay: u32) -> u32 {
    let year = datetime.year;
    let month = datetime.month;
    let day = datetime.day;
    let hour = datetime.hour;
    let minute = datetime.minute;
    let second = datetime.second;

    let ab = calc_ab(month, day, minute, second);
    let cd = hour & 0xff;

    ((ab << 24) | (cd << 16))
        .wrapping_add(delay)
        .wrapping_add(year)
        .wrapping_sub(2000)
}

#[derive(Debug, Default, Clone, PartialEq, Eq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct Seed4CalcOpts {
    pub datetime: RngDateTime,
    pub seconds_increment: usize,
    pub min_delay: u32,
    pub max_delay: u32,
}

#[wasm_bindgen]
pub fn calc_gen4_seeds(opts: Seed4CalcOpts) -> Vec<SeedTime4> {
    let Seed4CalcOpts {
        mut datetime,
        seconds_increment,
        min_delay,
        max_delay,
    } = opts;
    let datetime_iter = datetime
        .as_seconds_iterator()
        .take(seconds_increment.saturating_add(1));
    iproduct!(datetime_iter, min_delay..=max_delay)
        .map(|(datetime, delay)| {
            let seed = calc_seed(&datetime, delay);
            SeedTime4::new(seed, datetime.clone(), delay)
        })
        .collect()
}
