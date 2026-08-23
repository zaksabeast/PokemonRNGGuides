const fn next(curr_state: u32, i: u32) -> u32 {
    0x6c078965u32
        .wrapping_mul(curr_state ^ (curr_state >> 30))
        .wrapping_add(i)
}

/// SIZE cannot exceed 227
/// If the fast parameter is true skip the last bit shift operation and shift by 27 during shuffle (only in gen 5)
pub struct MtFast<const SIZE: usize, const FULL_SIZE: usize, const FAST: bool> {
    state: [u32; FULL_SIZE],
    index: usize,
}

impl<const SIZE: usize, const FULL_SIZE: usize, const FAST: bool> MtFast<SIZE, FULL_SIZE, FAST> {
    pub fn new(seed: u32, advances: usize) -> Self {
        debug_assert!(
            SIZE + 4 == FULL_SIZE,
            "Full size must be 4 greater than size"
        );
        debug_assert!(SIZE <= 227, "Size exceeds range of MTFast");

        let mut state = [0; FULL_SIZE];

        let mut curr_state = seed;
        for i in 1..(SIZE + 2) {
            state[i - 1] = curr_state;
            curr_state = next(curr_state, i as u32);
        }

        for i in (SIZE + 2)..397 {
            curr_state = next(curr_state, i as u32);
        }

        for i in 0..SIZE {
            let m0 = state[i];
            let m1 = state[i + 1];
            curr_state = next(curr_state, (i + 397) as u32);

            let y = (m0 & 0x80000000) | (m1 & 0x7fffffff);

            let mut y1 = y >> 1;
            if y & 1 != 0 {
                y1 ^= 0x9908b0df;
            }

            // Temper results while shuffling
            let mut y = y1 ^ curr_state;
            y ^= y >> 11;
            y ^= (y << 7) & 0x9d2c5680;
            if FAST {
                y ^= (y << 15) & 0xe8000000;
                y >>= 27;
            } else {
                y ^= (y << 15) & 0xefc60000;
                y ^= y >> 18;
            }

            state[i] = y;
        }

        Self {
            state,
            index: advances,
        }
    }

    /// Can panic if called more than FULL_SIZE times
    pub fn next(&mut self) -> u32 {
        let result = self.state[self.index];
        self.index += 1;
        result
    }
}

#[cfg(test)]
mod test {
    use super::*;
    use crate::assert_list_eq;

    #[test]
    fn rands() {
        let expected = [24, 4, 18, 5, 26, 0, 31, 12];
        let mut rng = MtFast::<8, 12, true>::new(0x5e89803c, 0);
        let res = [
            rng.next(),
            rng.next(),
            rng.next(),
            rng.next(),
            rng.next(),
            rng.next(),
            rng.next(),
            rng.next(),
        ];

        assert_list_eq!(res, expected);
    }

    #[test]
    fn advance() {
        let expected = [5, 4, 27, 10, 7, 17];
        let mut rng = MtFast::<8, 12, true>::new(0x490eabda, 2);
        let res = [
            rng.next(),
            rng.next(),
            rng.next(),
            rng.next(),
            rng.next(),
            rng.next(),
        ];

        assert_eq!(res, expected);
    }
}
