use super::GetRand;
use super::Rng;

#[derive(Clone, Copy, Debug, PartialEq, Eq, Default)]
pub struct TinyMT {
    state: [u32; 4],
}

impl TinyMT {
    pub fn new(seed: u32) -> Self {
        let mut state = [seed, 0x8f7011ee, 0xfc78ff1f, 0x3793fdff];

        for i in 1..8 {
            state[i & 3] ^= (state[(i - 1) & 3] ^ (state[(i - 1) & 3] >> 30))
                .wrapping_mul(1812433253)
                .wrapping_add(i as u32);
        }

        let mut rng = Self { state };

        for _ in 0..8 {
            rng.next_state();
        }

        rng
    }

    pub fn from_state(state: [u32; 4]) -> Self {
        Self { state }
    }

    pub fn next_state(&mut self) {
        let mut y = self.state[3];
        let mut x = (self.state[0] & 0x7FFFFFFF) ^ self.state[1] ^ self.state[2];

        x ^= x << 1;
        y ^= (y >> 1) ^ x;

        self.state[0] = self.state[1];
        self.state[1] = self.state[2] ^ ((y & 1) * 0x8f7011ee);
        self.state[2] = x ^ (y << 10) ^ ((y & 1) * 0xfc78ff1f);
        self.state[3] = y;
    }

    pub fn get_state(&self) -> [u32; 4] {
        self.state
    }

    fn temper(&mut self) -> u32 {
        let mut t0 = self.state[3];
        let t1 = self.state[0].wrapping_add(self.state[2] >> 8);

        t0 ^= t1;
        if t1 & 1 == 1 {
            t0 ^= 0x3793fdff;
        }

        t0
    }

    fn next_u32(&mut self) -> u32 {
        self.next_state();
        self.temper()
    }
}

impl Iterator for TinyMT {
    type Item = u32;

    fn next(&mut self) -> Option<u32> {
        Some(self.next_u32())
    }
}

impl GetRand<u32> for TinyMT {
    fn get(&mut self) -> u32 {
        self.next().unwrap()
    }
}

impl Rng for TinyMT {}

#[cfg(test)]
mod test {
    use super::*;

    #[test]
    fn should_generate_random_values() {
        let mut rng = TinyMT::new(0);
        rng.state = [0x11112222, 0x33334444, 0x55556666, 0x77778888];

        for _ in 0..156 {
            rng.next_state();
        }

        assert_eq!(rng.rand::<u32>(), 0x670e7a39);
        assert_eq!(rng.get_state(), [
            0x5a385202, 0xd9905227, 0x90ffb4e5, 0x3dc72b8f
        ]);
    }

    #[test]
    fn should_not_fail_from_state_overflow() {
        let mut rng = TinyMT::new(0);
        rng.state = [0xffffffff, 0xffffffff, 0xffffffff, 0xffffffff];

        assert_eq!(rng.rand::<u32>(), 0x7c78fb);
        assert_eq!(rng.get_state(), [
            0xffffffff, 0x708fee11, 0x7c78fb1e, 0x00000001
        ]);
    }
}
