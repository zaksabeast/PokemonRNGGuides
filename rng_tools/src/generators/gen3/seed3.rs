use crate::RngDateTime;
use chrono::{Datelike, NaiveDate, Timelike};

pub fn calc_seed(datetime: &RngDateTime) -> Option<u16> {
    let naive_datetime = datetime.to_naive_datetime()?;
    let d = naive_datetime
        .date()
        .signed_duration_since(NaiveDate::from_ymd_opt(2000, 1, 1)?)
        .num_days() as u32
        - if naive_datetime.year() > 2000 { 366 } else { 0 }
        + 1;

    let h = naive_datetime.hour();
    let m = naive_datetime.minute();

    let seed = 1440u32
        .wrapping_mul(d)
        .wrapping_add(960u32.wrapping_mul(h / 10))
        .wrapping_add(60u32.wrapping_mul(h % 10))
        .wrapping_add(16u32.wrapping_mul(m / 10))
        .wrapping_add(m % 10);
    Some(((seed >> 16) as u16) ^ (seed as u16))
}
