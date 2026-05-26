use crate::rng::lcrng::POKERNG_JUMP_TABLE;
use wasm_bindgen::prelude::*;

#[derive(Clone, Copy)]
struct DistanceLookup {
    mult: u32,
    add: u32,
    distance: u32,
}

const EMPTY_LOOKUP: DistanceLookup = DistanceLookup {
    mult: 1,
    add: 0,
    distance: 0,
};

const DISTANCE_LOOKUP: [[DistanceLookup; 0x100]; 4] = build_distance_lookup();

#[wasm_bindgen]
pub fn lcrng_distance(start: u32, end: u32) -> u32 {
    if start == 0 {
        lcrng_distance_from_zero(end)
    } else {
        lcrng_distance_from_non_zero(start, end)
    }
}

pub fn lcrng_distance_from_non_zero(mut start: u32, end: u32) -> u32 {
    let mut count = 0_u32;
    let mut p = 1_u32;

    for (mult, add) in POKERNG_JUMP_TABLE {
        if start == end {
            break;
        }

        if ((start ^ end) & p) != 0 {
            start = mult.wrapping_mul(start).wrapping_add(add);
            count += p;
        }
        p <<= 1
    }

    count
}

pub fn lcrng_distance_from_zero(mut state: u32) -> u32 {
    let mut distance = 0_u32;
    let mut byte = 0_usize;

    while state != 0 {
        let partial = ((state >> (byte * 8)) & 0xff) as usize;
        let lookup = DISTANCE_LOOKUP[byte][partial];
        state = state.wrapping_mul(lookup.mult).wrapping_add(lookup.add);
        distance = distance.wrapping_sub(lookup.distance);
        byte += 1;
    }

    distance
}

const fn build_distance_lookup() -> [[DistanceLookup; 0x100]; 4] {
    let mut lookup = [[EMPTY_LOOKUP; 0x100]; 4];
    let mut byte = 0_usize;

    while byte < 4 {
        let mut partial = 0_usize;

        while partial < 0x100 {
            lookup[byte][partial] = gen_lookup(byte, partial as u32);
            partial += 1;
        }

        byte += 1;
    }

    lookup
}

const fn gen_lookup(byte: usize, partial: u32) -> DistanceLookup {
    let distance = lcrng_distance_const(partial << (byte * 8), 0);
    let (mult, add) = jump_params(distance);

    DistanceLookup {
        mult,
        add,
        distance,
    }
}

const fn jump_params(mut jump: u32) -> (u32, u32) {
    let mut mult = 1_u32;
    let mut add = 0_u32;
    let mut i = 0_usize;

    while jump != 0 {
        if (jump & 1) != 0 {
            let (jump_mult, jump_add) = POKERNG_JUMP_TABLE[i];
            add = add.wrapping_mul(jump_mult).wrapping_add(jump_add);
            mult = mult.wrapping_mul(jump_mult);
        }

        jump >>= 1;
        i += 1;
    }

    (mult, add)
}

const fn lcrng_distance_const(mut start: u32, end: u32) -> u32 {
    let mut count = 0_u32;
    let mut p = 1_u32;
    let mut i = 0_usize;

    while start != end {
        let (mult, add) = POKERNG_JUMP_TABLE[i];

        if ((start ^ end) & p) != 0 {
            start = start.wrapping_mul(mult).wrapping_add(add);
            count = count.wrapping_add(p);
        }

        p <<= 1;
        i += 1;
    }

    count
}

#[cfg(test)]
mod test {
    use super::*;
    use std::{
        hint::black_box,
        time::{Duration, Instant},
    };

    #[test]
    fn test_lcrng_distance() {
        assert_eq!(lcrng_distance(0, 0xEA55834D), 475);
        assert_eq!(lcrng_distance(0, 0x7700E49D), 1259);
    }

    #[test]
    fn test_lcrng_distance_from_zero() {
        assert_eq!(lcrng_distance_from_zero(0), 0);
        assert_eq!(lcrng_distance_from_zero(0xEA55834D), 475);
        assert_eq!(lcrng_distance_from_zero(0x7700E49D), 1259);
        assert_eq!(
            lcrng_distance_from_zero(0xDEADBEEF),
            lcrng_distance(0, 0xDEADBEEF)
        );
    }

    fn benchmark_lcrng_distance_from_zero() -> (Duration, u32) {
        let mut checksum = 0_u32;
        let start_time = Instant::now();

        for i in 0..=u32::MAX {
            checksum = checksum.wrapping_add(lcrng_distance_from_zero(black_box(i)));
        }

        (start_time.elapsed(), checksum)
    }

    fn benchmark_lcrng_distance_from_non_zero() -> (Duration, u32) {
        let mut checksum = 0_u32;
        let start_time = Instant::now();

        for i in 0..=u32::MAX {
            checksum = checksum.wrapping_add(lcrng_distance_from_non_zero(0, black_box(i)));
        }

        (start_time.elapsed(), checksum)
    }

    // cargo test --release benchmark_lcrng_distance_from_zero_vs_non_zero -- --ignored --nocapture
    #[test]
    #[ignore]
    fn benchmark_lcrng_distance_from_zero_vs_non_zero() {
        let (from_zero_duration, from_zero_checksum) = benchmark_lcrng_distance_from_zero();
        let (from_non_zero_duration, from_non_zero_checksum) =
            benchmark_lcrng_distance_from_non_zero();

        assert_eq!(from_zero_checksum, from_non_zero_checksum);

        println!(
            "lcrng_distance_from_zero: {:?} (checksum {})",
            from_zero_duration, from_zero_checksum
        );
        println!(
            "lcrng_distance_from_non_zero: {:?} (checksum {})",
            from_non_zero_duration, from_non_zero_checksum
        );
    }
}
