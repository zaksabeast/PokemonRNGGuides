use crate::rng::Rng;

use super::{GetMaxRand, GetRand};

#[derive(Clone, Debug, PartialEq, Eq)]
pub struct MT {
    index: usize,
    mt: [u32; 624],
}

impl MT {
    pub fn new(seed: u32) -> Self {
        let mut rng = Self::default();
        rng.init(seed);
        rng
    }

    fn blank_mt() -> Self {
        Self {
            mt: [0; 624],
            index: 0,
        }
    }

    fn init(&mut self, seed: u32) {
        self.mt[0] = seed;

        let mut state = seed;
        for i in 1..624 {
            state = (state ^ (state >> 30))
                .wrapping_mul(0x6c078965)
                .wrapping_add(i);
            self.mt[i as usize] = state;
        }
    }

    fn next_rand(&mut self) -> u32 {
        self.inline_shuffle();
        let mut y = self.mt[self.index];
        self.index = (self.index + 1) % 624;
        y ^= y >> 11;
        y ^= (y << 7) & 0x9d2c5680;
        y ^= (y << 15) & 0xefc60000;
        y ^= y >> 18;
        y
    }

    fn inline_shuffle(&mut self) {
        let i = self.index;
        match i {
            0..227 => {
                let y = (self.mt[i] & 0x80000000) | (self.mt[i + 1] & 0x7fffffff);
                self.mt[i] = self.mt[i + 397] ^ (y >> 1) ^ (y & 1).wrapping_mul(0x9908b0df);
            }
            227..623 => {
                let y = (self.mt[i] & 0x80000000) | (self.mt[i + 1] & 0x7fffffff);
                self.mt[i] = self.mt[i - 227] ^ (y >> 1) ^ (y & 1).wrapping_mul(0x9908b0df);
            }
            _ => {
                let y = (self.mt[623] & 0x80000000) | (self.mt[0] & 0x7fffffff);
                self.mt[623] = self.mt[396] ^ (y >> 1) ^ (y & 1).wrapping_mul(0x9908b0df);
            }
        }
    }

    pub fn current_state(&self) -> u32 {
        let index = match self.index {
            624 => 0,
            i => i,
        };
        self.mt[index]
    }
}

impl Default for MT {
    fn default() -> Self {
        Self::blank_mt()
    }
}

impl GetRand<u8> for MT {
    fn get(&mut self) -> u8 {
        (self.next_rand() >> 16) as u8
    }
}

impl GetRand<u16> for MT {
    fn get(&mut self) -> u16 {
        (self.next_rand() >> 16) as u16
    }
}

impl GetRand<u32> for MT {
    fn get(&mut self) -> u32 {
        self.next_rand()
    }
}

impl GetMaxRand<u32> for MT {
    fn get_max(&mut self, max: u32) -> u32 {
        (self.next().unwrap() as u64)
            .wrapping_mul(max as u64)
            .wrapping_shr(32) as u32
    }
}

impl Iterator for MT {
    type Item = u32;

    fn next(&mut self) -> Option<Self::Item> {
        Some(self.next_rand())
    }
}

impl Rng for MT {}

#[cfg(test)]
mod test {
    use super::*;

    #[test]
    fn rands() {
        let expected = [
            0x71816e99, 0x7450caae, 0x68d90b33, 0xa4f1d1cb, 0x74d58bdd, 0xde9d9480, 0x8f07049c,
            0xc2c010bc, 0x4b896dbd, 0x82546356, 0xe358d063, 0xf3c69e79, 0x8523eb2b, 0x0ba35df3,
            0xf4f9bc83, 0xa8a14e32, 0xc7b6f396, 0x5332f6aa, 0x71d7e4c5, 0x296fab40, 0xb09419c8,
            0x53e93f72, 0x151b4e3a, 0xa847397b, 0xc7206f76, 0x29eff108, 0x86d9a0c8, 0xadad310b,
            0x0589501b, 0xc62980a8, 0x428d24fe, 0x2f378b3b, 0x41451573, 0xa9ec251c, 0x8e06b642,
            0xe62b2f7d, 0x7756015a, 0xb41d5ba0, 0x91b8dd3d, 0xfe9cc6d4, 0x6b20937e, 0x4a1fcf30,
            0x15e63023, 0xf490ff54, 0x257090a5, 0x08a5c82b, 0xb5a9e677, 0x5f1e0163, 0xb02fbbeb,
            0xa3236cc0, 0x619ed4e2, 0x7306e3c0, 0xc904640d, 0xd0df6f08, 0xf87d8291, 0x57897959,
            0x1352725c, 0xdd4fa64f, 0x7b971daf, 0xb82bba71, 0xe5dc3c1f, 0xe12dc49d, 0x8c84316a,
            0xa64a2bee, 0x90628b8c, 0x0924001d, 0x1c0caed6, 0xb6114836, 0x0a09e855, 0xb1af1261,
            0x31f903cc, 0x8b9680ec, 0xdae7a215, 0xa93365c8, 0x29203dbc, 0x41088bbe, 0x69efc99f,
            0x49700e08, 0xfe14d498, 0xc871cc40, 0xb8c635f7, 0x1279070f, 0x3fbefb8b, 0x982b52a4,
            0x7caea029, 0xb608106c, 0x5530066b, 0x3700168d, 0x82d4fa4b, 0x8dc92888, 0x339d33d2,
            0xf689c34d, 0xe88abcfa, 0x4ac16b72, 0x52f3c014, 0x7cd4d1e7, 0x96856c10, 0x636d1302,
            0x86cf40aa, 0x830574b5,
        ];
        let result = MT::new(0xaabbccdd)
            .skip(600)
            .take(100)
            .collect::<Vec<u32>>();

        assert_eq!(expected.len(), result.len());

        expected
            .into_iter()
            .zip(result.into_iter())
            .enumerate()
            .for_each(|(advances, (expected, actual))| {
                assert_eq!(actual, expected, "Mismatch at advance {}", advances);
            });
    }
}
