use super::SeedTime4;
use crate::RngDateTime;
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

#[wasm_bindgen]
pub fn calc_gen4_seeds(datetime: &RngDateTime, min_delay: u32, max_delay: u32) -> Vec<SeedTime4> {
    (min_delay..=max_delay)
        .map(|delay| {
            let seed = calc_seed(datetime, delay);
            SeedTime4::new(seed, datetime.clone(), delay)
        })
        .collect()
}
