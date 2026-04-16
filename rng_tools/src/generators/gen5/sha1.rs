use super::ds_type::DsType;
use super::game::Gen5Game;
use super::language::Gen5Language;
use super::nazos::get_nazo;
use crate::rng::Rng;
use crate::rng::lcrng64::Bwrng;
use chrono::NaiveDate;
use once_cell::sync::Lazy;
use std::convert::TryInto;

// Gen 5 sha1 constants
const DATA_10: u32 = 0x00000000;
const DATA_11: u32 = 0x00000000;
const DATA_13: u32 = 0x80000000;
const DATA_14: u32 = 0x00000000;
const DATA_15: u32 = 0x000001a0;

const DATE_ENTRIES: usize = 36525;
const TIME_ENTRIES: usize = 86400;

fn compute_bcd(val: u32) -> u32 {
    ((val / 10) << 4) + (val % 10)
}

fn compute_weekday(year: u32, month: u32, day: u32) -> u32 {
    let a = if month < 3 { 1 } else { 0 };
    let y = year + 4800 - a;
    let m = month + 12 * a - 3;
    let jd = day + ((153 * m + 2) / 5) + (365 * y) + (y / 4) - (y / 100) + (y / 400) - 32045;
    (jd + 1) % 7
}

fn compute_date_values() -> Vec<u32> {
    let days: [u32; 12] = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    let mut dates = Vec::with_capacity(DATE_ENTRIES);

    for year in 0..100_u32 {
        let y = compute_bcd(year) << 24;
        for month in 1..=12_u32 {
            let m = compute_bcd(month) << 16;

            let mut max_days = days[(month - 1) as usize];
            if month == 2 && (year % 4) == 0 {
                max_days += 1;
            }

            for day in 1..=max_days {
                let d = compute_bcd(day) << 8;
                dates.push(y | m | d | compute_weekday(year + 2000, month, day));
            }
        }
    }

    dates
}

fn compute_time_values() -> Vec<u32> {
    let mut times = Vec::with_capacity(TIME_ENTRIES);

    for hour in 0..24_u32 {
        let mut h = compute_bcd(hour) << 24;
        if hour >= 12 {
            h |= 0x40000000;
        }
        for minute in 0..60_u32 {
            let m = compute_bcd(minute) << 16;
            for second in 0..60_u32 {
                let s = compute_bcd(second) << 8;
                times.push(h | m | s);
            }
        }
    }

    times
}

static DATE_VALUES: Lazy<Vec<u32>> = Lazy::new(compute_date_values);
static TIME_VALUES: Lazy<Vec<u32>> = Lazy::new(compute_time_values);

fn v32x4_store(address: &mut [u32], value: [u32; 4]) {
    address[..4].copy_from_slice(&value);
}

fn v32x4_load(address: &[u32]) -> [u32; 4] {
    [address[0], address[1], address[2], address[3]]
}

fn v32x4_rotl(x: [u32; 4]) -> [u32; 4] {
    [
        x[0].rotate_left(2),
        x[1].rotate_left(2),
        x[2].rotate_left(2),
        x[3].rotate_left(2),
    ]
}

fn v32x4_xor(a: [u32; 4], b: [u32; 4]) -> [u32; 4] {
    [a[0] ^ b[0], a[1] ^ b[1], a[2] ^ b[2], a[3] ^ b[3]]
}

fn calc_w_simd(data: &mut [u32], i: usize) {
    let t = v32x4_xor(
        v32x4_xor(v32x4_load(&data[i - 6..]), v32x4_load(&data[i - 16..])),
        v32x4_xor(v32x4_load(&data[i - 28..]), v32x4_load(&data[i - 32..])),
    );

    v32x4_store(&mut data[i..], v32x4_rotl(t));
}

fn calc_w(data: &mut [u32; 80], i: usize) -> u32 {
    let val = (data[i - 3] ^ data[i - 8] ^ data[i - 14] ^ data[i - 16]).rotate_left(1);
    data[i] = val;
    val
}

fn section1_calc(a: u32, b: &mut u32, c: u32, d: u32, e: u32, t: &mut u32, input: u32) {
    *t = a
        .rotate_left(5)
        .wrapping_add((*b & c) | (!*b & d))
        .wrapping_add(e)
        .wrapping_add(0x5a827999)
        .wrapping_add(input);
    *b = (*b).rotate_right(2);
}

fn section2_calc(a: u32, b: &mut u32, c: u32, d: u32, e: u32, t: &mut u32, input: u32) {
    *t = a
        .rotate_left(5)
        .wrapping_add(*b ^ c ^ d)
        .wrapping_add(e)
        .wrapping_add(0x6ed9eba1)
        .wrapping_add(input);
    *b = (*b).rotate_right(2);
}

fn section3_calc(a: u32, b: &mut u32, c: u32, d: u32, e: u32, t: &mut u32, input: u32) {
    *t = a
        .rotate_left(5)
        .wrapping_add((*b & c) | ((*b | c) & d))
        .wrapping_add(e)
        .wrapping_add(0x8f1bbcdc)
        .wrapping_add(input);
    *b = (*b).rotate_right(2);
}

fn section4_calc(a: u32, b: &mut u32, c: u32, d: u32, e: u32, t: &mut u32, input: u32) {
    *t = a
        .rotate_left(5)
        .wrapping_add(*b ^ c ^ d)
        .wrapping_add(e)
        .wrapping_add(0xca62c1d6)
        .wrapping_add(input);
    *b = (*b).rotate_right(2);
}

pub struct Sha1 {
    data: [u32; 80],
}

impl Sha1 {
    pub fn new(
        version: Gen5Game,
        language: Gen5Language,
        ds_type: DsType,
        mac: u64,
        vframe: u8,
        gx_stat: u8,
    ) -> Self {
        let mut data = [0u32; 80];

        let nazos = get_nazo(language, version, ds_type);
        data[0..5].copy_from_slice(nazos);

        data[6] = (mac & 0xffff) as u32;
        data[7] = ((mac >> 16) as u32) ^ ((vframe as u32) << 24) ^ (gx_stat as u32);

        data[10] = DATA_10;
        data[11] = DATA_11;
        data[13] = DATA_13;
        data[14] = DATA_14;
        data[15] = DATA_15;

        // Precompute data[18]
        calc_w(&mut data, 18);
        Self { data }
    }

    pub fn precompute(&mut self) -> [u32; 5] {
        let mut a = 0x67452301;
        let mut b = 0xefcdab89;
        let mut c = 0x98badcfe;
        let mut d = 0x10325476;
        let mut e = 0xc3d2e1f0;

        let mut t: u32 = 0;

        // Section 1: 0-8
        section1_calc(a, &mut b, c, d, e, &mut t, self.data[0]);
        section1_calc(t, &mut a, b, c, d, &mut e, self.data[1]);
        section1_calc(e, &mut t, a, b, c, &mut d, self.data[2]);
        section1_calc(d, &mut e, t, a, b, &mut c, self.data[3]);
        section1_calc(c, &mut d, e, t, a, &mut b, self.data[4]);
        section1_calc(b, &mut c, d, e, t, &mut a, self.data[5]);
        section1_calc(a, &mut b, c, d, e, &mut t, self.data[6]);
        section1_calc(t, &mut a, b, c, d, &mut e, self.data[7]);
        section1_calc(e, &mut t, a, b, c, &mut d, self.data[8]);

        // Select values will be the same for same date
        self.data[16] = (DATA_13 ^ self.data[8] ^ self.data[2] ^ self.data[0]).rotate_left(1);
        self.data[19] = (self.data[16] ^ DATA_11 ^ self.data[5] ^ self.data[3]).rotate_left(1);
        self.data[21] = (self.data[18] ^ DATA_13 ^ self.data[7] ^ self.data[5]).rotate_left(1);
        self.data[22] = (self.data[19] ^ DATA_14 ^ self.data[8] ^ self.data[6]).rotate_left(1);
        self.data[24] = (self.data[21] ^ self.data[16] ^ DATA_10 ^ self.data[8]).rotate_left(1);
        self.data[27] = (self.data[24] ^ self.data[19] ^ DATA_13 ^ DATA_11).rotate_left(1);
        self.data[30] = (self.data[27] ^ self.data[22] ^ self.data[16] ^ DATA_14).rotate_left(1);

        [d, e, t, a, b]
    }

    pub fn set_button(&mut self, button: u32) {
        self.data[12] = button;
    }

    pub fn set_date(&mut self, date: &NaiveDate) {
        let base = chrono::NaiveDate::from_ymd_opt(2000, 1, 1).unwrap();
        let days = date.signed_duration_since(base).num_days();
        let idx: usize = days.try_into().unwrap_or(0usize);
        self.data[8] = DATE_VALUES[idx];
    }

    pub fn set_timer0(&mut self, timer0: u16, vcount: u8) {
        let val = ((vcount as u32) << 16) | (timer0 as u32);
        self.data[5] = val.swap_bytes();
    }

    pub fn set_time_hms(&mut self, hour: u8, minute: u8, second: u8, ds_type: DsType) {
        let secs = (hour as u32) * 3600 + (minute as u32) * 60 + (second as u32);
        self.set_time(secs, ds_type);
    }

    pub fn set_time(&mut self, time: u32, ds_type: DsType) {
        let mut val = TIME_VALUES[time as usize];
        if time >= 43200 && ds_type == DsType::DS3 {
            val ^= 0x40000000;
        }
        self.data[9] = val;
    }

    pub fn hash_seed(&mut self, alpha: [u32; 5]) -> u64 {
        let mut a = alpha[0];
        let mut b = alpha[1];
        let mut c = alpha[2];
        let mut d = alpha[3];
        let mut e = alpha[4];

        let mut t: u32 = 0;

        // 0-8 already computed

        // Section 1: 0-19
        section1_calc(a, &mut b, c, d, e, &mut t, self.data[9]);
        section1_calc(t, &mut a, b, c, d, &mut e, 0x00000000); // self.data[10] is constant 0
        section1_calc(e, &mut t, a, b, c, &mut d, 0x00000000); // self.data[11] is constant 0
        section1_calc(d, &mut e, t, a, b, &mut c, self.data[12]);
        section1_calc(c, &mut d, e, t, a, &mut b, 0x80000000); // self.data[13] is constant 0x80000000
        section1_calc(b, &mut c, d, e, t, &mut a, 0x00000000); // self.data[14] is constant 0
        section1_calc(a, &mut b, c, d, e, &mut t, 0x000001a0); // self.data[15] is constant 0x000001a0
        section1_calc(t, &mut a, b, c, d, &mut e, self.data[16]);
        section1_calc(e, &mut t, a, b, c, &mut d, calc_w(&mut self.data, 17));
        section1_calc(d, &mut e, t, a, b, &mut c, self.data[18]);
        section1_calc(c, &mut d, e, t, a, &mut b, self.data[19]);

        // Section 2: 20 - 39
        section2_calc(b, &mut c, d, e, t, &mut a, calc_w(&mut self.data, 20));
        section2_calc(a, &mut b, c, d, e, &mut t, self.data[21]);
        section2_calc(t, &mut a, b, c, d, &mut e, self.data[22]);
        section2_calc(e, &mut t, a, b, c, &mut d, calc_w(&mut self.data, 23));
        section2_calc(d, &mut e, t, a, b, &mut c, self.data[24]);
        section2_calc(c, &mut d, e, t, a, &mut b, calc_w(&mut self.data, 25));
        section2_calc(b, &mut c, d, e, t, &mut a, calc_w(&mut self.data, 26));
        section2_calc(a, &mut b, c, d, e, &mut t, self.data[27]);
        section2_calc(t, &mut a, b, c, d, &mut e, calc_w(&mut self.data, 28));
        section2_calc(e, &mut t, a, b, c, &mut d, calc_w(&mut self.data, 29));
        section2_calc(d, &mut e, t, a, b, &mut c, self.data[30]);
        section2_calc(c, &mut d, e, t, a, &mut b, calc_w(&mut self.data, 31));
        calc_w_simd(&mut self.data, 32);
        section2_calc(b, &mut c, d, e, t, &mut a, self.data[32]);
        section2_calc(a, &mut b, c, d, e, &mut t, self.data[33]);
        section2_calc(t, &mut a, b, c, d, &mut e, self.data[34]);
        section2_calc(e, &mut t, a, b, c, &mut d, self.data[35]);
        calc_w_simd(&mut self.data, 36);
        section2_calc(d, &mut e, t, a, b, &mut c, self.data[36]);
        section2_calc(c, &mut d, e, t, a, &mut b, self.data[37]);
        section2_calc(b, &mut c, d, e, t, &mut a, self.data[38]);
        section2_calc(a, &mut b, c, d, e, &mut t, self.data[39]);

        // Section 3: 40 - 59
        calc_w_simd(&mut self.data, 40);
        section3_calc(t, &mut a, b, c, d, &mut e, self.data[40]);
        section3_calc(e, &mut t, a, b, c, &mut d, self.data[41]);
        section3_calc(d, &mut e, t, a, b, &mut c, self.data[42]);
        section3_calc(c, &mut d, e, t, a, &mut b, self.data[43]);
        calc_w_simd(&mut self.data, 44);
        section3_calc(b, &mut c, d, e, t, &mut a, self.data[44]);
        section3_calc(a, &mut b, c, d, e, &mut t, self.data[45]);
        section3_calc(t, &mut a, b, c, d, &mut e, self.data[46]);
        section3_calc(e, &mut t, a, b, c, &mut d, self.data[47]);
        calc_w_simd(&mut self.data, 48);
        section3_calc(d, &mut e, t, a, b, &mut c, self.data[48]);
        section3_calc(c, &mut d, e, t, a, &mut b, self.data[49]);
        section3_calc(b, &mut c, d, e, t, &mut a, self.data[50]);
        section3_calc(a, &mut b, c, d, e, &mut t, self.data[51]);
        calc_w_simd(&mut self.data, 52);
        section3_calc(t, &mut a, b, c, d, &mut e, self.data[52]);
        section3_calc(e, &mut t, a, b, c, &mut d, self.data[53]);
        section3_calc(d, &mut e, t, a, b, &mut c, self.data[54]);
        section3_calc(c, &mut d, e, t, a, &mut b, self.data[55]);
        calc_w_simd(&mut self.data, 56);
        section3_calc(b, &mut c, d, e, t, &mut a, self.data[56]);
        section3_calc(a, &mut b, c, d, e, &mut t, self.data[57]);
        section3_calc(t, &mut a, b, c, d, &mut e, self.data[58]);
        section3_calc(e, &mut t, a, b, c, &mut d, self.data[59]);

        // Section 4: 60 - 79
        calc_w_simd(&mut self.data, 60);
        section4_calc(d, &mut e, t, a, b, &mut c, self.data[60]);
        section4_calc(c, &mut d, e, t, a, &mut b, self.data[61]);
        section4_calc(b, &mut c, d, e, t, &mut a, self.data[62]);
        section4_calc(a, &mut b, c, d, e, &mut t, self.data[63]);
        calc_w_simd(&mut self.data, 64);
        section4_calc(t, &mut a, b, c, d, &mut e, self.data[64]);
        section4_calc(e, &mut t, a, b, c, &mut d, self.data[65]);
        section4_calc(d, &mut e, t, a, b, &mut c, self.data[66]);
        section4_calc(c, &mut d, e, t, a, &mut b, self.data[67]);
        calc_w_simd(&mut self.data, 68);
        section4_calc(b, &mut c, d, e, t, &mut a, self.data[68]);
        section4_calc(a, &mut b, c, d, e, &mut t, self.data[69]);
        section4_calc(t, &mut a, b, c, d, &mut e, self.data[70]);
        section4_calc(e, &mut t, a, b, c, &mut d, self.data[71]);
        calc_w_simd(&mut self.data, 72);
        section4_calc(d, &mut e, t, a, b, &mut c, self.data[72]);
        section4_calc(c, &mut d, e, t, a, &mut b, self.data[73]);
        section4_calc(b, &mut c, d, e, t, &mut a, self.data[74]);
        section4_calc(a, &mut b, c, d, e, &mut t, self.data[75]);
        calc_w_simd(&mut self.data, 76);
        section4_calc(t, &mut a, b, c, d, &mut e, self.data[76]);
        section4_calc(e, &mut t, a, b, c, &mut d, self.data[77]);
        section4_calc(d, &mut e, t, a, b, &mut c, self.data[78]);
        section4_calc(c, &mut d, e, t, a, &mut b, self.data[79]);

        let part1 = (b).wrapping_add(0x67452301).swap_bytes();
        let part2 = (c).wrapping_add(0xefcdab89).swap_bytes();

        let seed = ((part2 as u64) << 32) | (part1 as u64);
        Bwrng::new(seed).rand()
    }
}

#[cfg(test)]
mod test {
    use super::*;

    mod section1_calc {
        use super::*;

        #[test]
        fn test() {
            let a = 0x67452301;
            let mut b = 0xefcdab89;
            let c = 0x98badcfe;
            let d = 0x10325476;
            let e = 0xc3d2e1f0;
            let mut t: u32 = 0;

            section1_calc(a, &mut b, c, d, e, &mut t, 0x12345678);
            assert_eq!(t, 0xb1e8ef2b);
            assert_eq!(b, 0x7bf36ae2);
        }
    }

    mod hash_seed {
        use super::*;
        use crate::gen5::keypresses::Keypress;

        #[test]
        fn black1() {
            let mut sha1 = Sha1::new(
                Gen5Game::Black,
                Gen5Language::English,
                DsType::DS,
                0x9bf123456,
                5,
                6,
            );
            sha1.set_button(Keypress::from_buttons(&[]).value);
            sha1.set_timer0(0x608, 0x2e);
            sha1.set_date(&NaiveDate::from_ymd_opt(2000, 1, 1).unwrap());
            sha1.set_time_hms(0, 0, 0, DsType::DS);

            let alpha = sha1.precompute();
            let seed = sha1.hash_seed(alpha);
            assert_eq!(seed, 0x5e89803c95fe8240);
        }
    }

    mod precompute {
        use super::*;

        #[test]
        fn test() {
            let mut sha1 = Sha1::new(
                Gen5Game::Black,
                Gen5Language::English,
                DsType::DS,
                41860346966,
                5,
                6,
            );

            for i in 0..10 {
                sha1.data[i] = 0x11111111_u32 * ((i as u32) + 1); // arbitrary test pattern
            }

            let alpha = sha1.precompute();
            assert_eq!(
                alpha,
                [0xa16e054a, 0xeff8febc, 0xfca6d6f6, 0x2b684e92, 0xceb08977,]
            );
        }
    }
}
