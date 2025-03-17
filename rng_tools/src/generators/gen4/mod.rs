use chrono::{Datelike, NaiveDateTime, Timelike};

fn calc_seed(datetime: &NaiveDateTime, delay: u32) -> u32 {
    let year = datetime.year() as u32;
    let month = datetime.month() as u32;
    let day = datetime.day() as u32;
    let time = datetime.time();
    let hour = time.hour() as u32;
    let minute = time.minute() as u32;
    let second = time.second() as u32;

    let ab = month
        .wrapping_mul(day)
        .wrapping_add(minute)
        .wrapping_add(second)
        & 0xff;
    let cd = hour & 0xff;

    ((ab << 24) | (cd << 16))
        .wrapping_add(delay)
        .wrapping_add(year)
        .wrapping_sub(2000)
}

#[cfg(test)]
mod test {
    use super::*;

    mod calc_seed {
        use super::*;
        use chrono::{NaiveDate, NaiveTime};

        #[test]
        fn set1() {
            let test_params = [
                ((2025, 5, 30, 6, 59, 26), 5300, 0xeb0614cd),
                ((2025, 5, 30, 06, 59, 26), 5300, 0xeb0614cd),
                ((2025, 5, 31, 06, 54, 26), 5300, 0xeb0614cd),
                ((2025, 6, 25, 06, 59, 26), 5300, 0xeb0614cd),
                ((2025, 6, 26, 06, 53, 26), 5300, 0xeb0614cd),
                ((2025, 6, 27, 06, 47, 26), 5300, 0xeb0614cd),
                ((2025, 6, 28, 06, 41, 26), 5300, 0xeb0614cd),
                ((2025, 6, 29, 06, 35, 26), 5300, 0xeb0614cd),
                ((2025, 6, 30, 06, 29, 26), 5300, 0xeb0614cd),
                ((2000, 2, 26, 23, 59, 59), 10800349, 0xaabbccdd),
                ((2000, 2, 27, 23, 57, 59), 10800349, 0xaabbccdd),
                ((2000, 2, 27, 23, 58, 58), 10800349, 0xaabbccdd),
                ((2005, 01, 01, 17, 00, 16), 4364, 0x11111111),
                ((2005, 01, 01, 17, 01, 15), 4364, 0x11111111),
                ((2005, 01, 01, 17, 02, 14), 4364, 0x11111111),
                ((2005, 01, 01, 17, 03, 13), 4364, 0x11111111),
            ];

            test_params
                .into_iter()
                .enumerate()
                .for_each(|(index, (datetime, delay, expected))| {
                    let datetime = NaiveDateTime::new(
                        NaiveDate::from_ymd_opt(datetime.0, datetime.1, datetime.2).unwrap(),
                        NaiveTime::from_hms_opt(datetime.3, datetime.4, datetime.5).unwrap(),
                    );
                    let result = calc_seed(&datetime, delay);
                    assert_eq!(result, expected, "index: {}", index);
                });
        }
    }
}
