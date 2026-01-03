use crate::rng::lcrng::POKERNG_JUMP_TABLE;

pub fn lcrng_distance(mut start: u32, end: u32) -> u32 {
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

#[cfg(test)]
mod test {
    use super::*;

    #[test]
    fn test_lcrng_distance() {
        assert_eq!(lcrng_distance(0, 0xEA55834D), 475);
        assert_eq!(lcrng_distance(0, 0x7700E49D), 1259);
    }
}
