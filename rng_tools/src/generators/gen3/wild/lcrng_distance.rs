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
    lcrng_distance_from_zero(end).wrapping_sub(lcrng_distance_from_zero(start))
}

fn lcrng_distance_from_zero(mut state: u32) -> u32 {
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
    let mut byte = 0_usize;

    while byte < 4 {
        let (jump_mult, jump_add) = POKERNG_JUMP_TABLE[byte][(jump & 0xff) as usize];
        add = add.wrapping_mul(jump_mult).wrapping_add(jump_add);
        mult = mult.wrapping_mul(jump_mult);

        jump >>= 8;
        byte += 1;
    }

    (mult, add)
}

const fn bit_jump_params(i: usize) -> (u32, u32) {
    POKERNG_JUMP_TABLE[i / 8][1 << (i % 8)]
}

const fn lcrng_distance_const(mut start: u32, end: u32) -> u32 {
    let mut count = 0_u32;
    let mut p = 1_u32;
    let mut i = 0_usize;

    while start != end {
        let (mult, add) = bit_jump_params(i);

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

    pub fn lcrng_distance_common_impl(mut start: u32, end: u32) -> u32 {
        const POKERNG_JUMP_TABLE: [(u32, u32); 32] = [
            (0x41C64E6D, 0x6073),
            (0xC2A29A69, 0xE97E7B6A),
            (0xEE067F11, 0x31B0DDE4),
            (0xCFDDDF21, 0x67DBB608),
            (0x5F748241, 0xCBA72510),
            (0x8B2E1481, 0x1D29AE20),
            (0x76006901, 0xBA84EC40),
            (0x1711D201, 0x79F01880),
            (0xBE67A401, 0x8793100),
            (0xDDDF4801, 0x6B566200),
            (0x3FFE9001, 0x803CC400),
            (0x90FD2001, 0xA6B98800),
            (0x65FA4001, 0xE6731000),
            (0xDBF48001, 0x30E62000),
            (0xF7E90001, 0xF1CC4000),
            (0xEFD20001, 0x23988000),
            (0xDFA40001, 0x47310000),
            (0xBF480001, 0x8E620000),
            (0x7E900001, 0x1CC40000),
            (0xFD200001, 0x39880000),
            (0xFA400001, 0x73100000),
            (0xF4800001, 0xE6200000),
            (0xE9000001, 0xCC400000),
            (0xD2000001, 0x98800000),
            (0xA4000001, 0x31000000),
            (0x48000001, 0x62000000),
            (0x90000001, 0xC4000000),
            (0x20000001, 0x88000000),
            (0x40000001, 0x10000000),
            (0x80000001, 0x20000000),
            (0x1, 0x40000000),
            (0x1, 0x80000000),
        ];

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

    #[test]
    fn test_lcrng_distance() {
        assert_eq!(lcrng_distance(0, 0xEA55834D), 475);
        assert_eq!(lcrng_distance(0, 0x7700E49D), 1259);

        assert_eq!(lcrng_distance(0xEA55834D, 0x7700E49D), 784);
        assert_eq!(
            lcrng_distance(0x7700E49D, 0xEA55834D),
            475_u32.wrapping_sub(1259)
        );
        assert_eq!(lcrng_distance(0x12345678, 0x0B71C18B), 1);
        assert_eq!(lcrng_distance(0x12345678, 0x5C704960), 1000);
    }

    // cargo test --release benchmark_lcrng_distance_random_start_and_end -- --ignored --nocapture
    #[test]
    #[ignore]
    fn benchmark_lcrng_distance_random_start_and_end() {
        use std::{hint::black_box, time::Instant};

        const ITERATIONS: usize = 1_000_000_000;

        fn next_random(state: &mut u32) -> u32 {
            *state ^= *state << 13;
            *state ^= *state >> 17;
            *state ^= *state << 5;
            *state
        }

        let mut random_state = 0x1234_5678_u32;
        let mut common_checksum = 0_u32;
        let start_time = Instant::now();

        for _ in 0..ITERATIONS {
            let start = next_random(&mut random_state);
            let end = next_random(&mut random_state);
            common_checksum = common_checksum
                .wrapping_add(lcrng_distance_common_impl(black_box(start), black_box(end)));
        }

        println!(
            "lcrng_distance_common_impl random start and end: {:?} (checksum {})",
            start_time.elapsed(),
            common_checksum
        );

        random_state = 0x1234_5678;
        let mut lookup_checksum = 0_u32;
        let start_time = Instant::now();

        for _ in 0..ITERATIONS {
            let start = next_random(&mut random_state);
            let end = next_random(&mut random_state);
            lookup_checksum =
                lookup_checksum.wrapping_add(lcrng_distance(black_box(start), black_box(end)));
        }

        println!(
            "lcrng_distance random start and end: {:?} (checksum {})",
            start_time.elapsed(),
            lookup_checksum
        );

        assert_eq!(lookup_checksum, common_checksum);
    }
}
