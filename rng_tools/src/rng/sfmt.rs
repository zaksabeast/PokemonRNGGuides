use super::GetRand;
use super::Rng;

const MEXP: usize = 19937;
const N: usize = MEXP / 128 + 1;
const N32: usize = N * 4;
const POS1: usize = 122;
const SL1: u32 = 18;
const SR1: u32 = 11;
const MSK: [u32; 4] = [0xdfffffef, 0xddfecb7f, 0xbffaffff, 0xbffffff6];
const PARITY: [u32; 4] = [0x00000001, 0x00000000, 0x00000000, 0x13c9e684];

/// SFMT-19937, the main RNG in Gen 7.
///
/// One RNG advance is one 64 bit output (two 32 bit outputs).
#[derive(Clone, Debug, PartialEq, Eq)]
pub struct Sfmt {
    state: [u32; N32],
    index: usize,
}

impl Sfmt {
    pub fn new(seed: u32) -> Self {
        let mut state = [0; N32];
        state[0] = seed;
        for i in 1..N32 {
            state[i] = (state[i - 1] ^ (state[i - 1] >> 30))
                .wrapping_mul(1812433253)
                .wrapping_add(i as u32);
        }

        let mut rng = Self { state, index: N32 };
        rng.period_certification();
        rng
    }

    fn period_certification(&mut self) {
        let inner = self
            .state
            .iter()
            .zip(PARITY)
            .fold(0, |inner, (state, parity)| inner ^ (state & parity));

        if inner.count_ones() % 2 == 1 {
            return;
        }

        if let Some((state, parity)) = self
            .state
            .iter_mut()
            .zip(PARITY)
            .find(|(_, parity)| *parity != 0)
        {
            *state ^= 1 << parity.trailing_zeros();
        }
    }

    fn gen_rand_all(&mut self) {
        let p = &mut self.state;
        let mut a = 0;
        let mut b = POS1 * 4;
        let mut c = (N - 2) * 4;
        let mut d = (N - 1) * 4;

        while a < N32 {
            p[a + 3] = p[a + 3]
                ^ (p[a + 3] << 8)
                ^ (p[a + 2] >> 24)
                ^ (p[c + 3] >> 8)
                ^ ((p[b + 3] >> SR1) & MSK[3])
                ^ (p[d + 3] << SL1);
            p[a + 2] = p[a + 2]
                ^ (p[a + 2] << 8)
                ^ (p[a + 1] >> 24)
                ^ (p[c + 3] << 24)
                ^ (p[c + 2] >> 8)
                ^ ((p[b + 2] >> SR1) & MSK[2])
                ^ (p[d + 2] << SL1);
            p[a + 1] = p[a + 1]
                ^ (p[a + 1] << 8)
                ^ (p[a] >> 24)
                ^ (p[c + 2] << 24)
                ^ (p[c + 1] >> 8)
                ^ ((p[b + 1] >> SR1) & MSK[1])
                ^ (p[d + 1] << SL1);
            p[a] = p[a]
                ^ (p[a] << 8)
                ^ (p[c + 1] << 24)
                ^ (p[c] >> 8)
                ^ ((p[b] >> SR1) & MSK[0])
                ^ (p[d] << SL1);

            c = d;
            d = a;
            a += 4;
            b += 4;
            if b >= N32 {
                b = 0;
            }
        }
    }

    pub fn next_u32(&mut self) -> u32 {
        if self.index >= N32 {
            self.gen_rand_all();
            self.index = 0;
        }
        let result = self.state[self.index];
        self.index += 1;
        result
    }

    /// One RNG advance: the low half is drawn first, then the high half.
    pub fn next_u64(&mut self) -> u64 {
        let low = self.next_u32() as u64;
        let high = self.next_u32() as u64;
        low | (high << 32)
    }

    /// Takes a `u64` because usize is 32 bits in wasm, and 2 u32s per
    /// advance overflows it past 2^31 advances.
    fn skip_u32(&mut self, count: u64) {
        let mut remaining = count;
        loop {
            let available = (N32 - self.index) as u64;
            if remaining <= available {
                self.index += remaining as usize;
                return;
            }
            remaining -= available;
            self.gen_rand_all();
            self.index = 0;
        }
    }
}

impl Iterator for Sfmt {
    type Item = u64;

    fn next(&mut self) -> Option<Self::Item> {
        Some(self.next_u64())
    }
}

impl GetRand<u64> for Sfmt {
    fn get(&mut self) -> u64 {
        self.next_u64()
    }
}

impl Rng for Sfmt {
    /// Skips `count` RNG advances (64 bit outputs).
    fn advance(&mut self, count: usize) {
        self.skip_u32(count as u64 * 2);
    }
}

#[cfg(test)]
mod test {
    use super::*;

    #[test]
    fn matches_3dsrngtool_seed_0() {
        let rng = Sfmt::new(0);
        let expected = [
            0x0FCF240A2E0CAA58,
            0x5F814E263E796292,
            0xCB7902B7C91A29CD,
            0x33777FA1BF590DAE,
            0x1DB4DB25C172AF5F,
            0x58127EB94EA0F791,
            0x8A3A07C7FCFE053B,
            0xBCE1774982F4623B,
            0x2A433ED876023B4B,
            0x0D06A63EAF726166,
        ];
        assert_eq!(rng.take(10).collect::<Vec<u64>>(), expected);
    }

    #[test]
    fn matches_3dsrngtool_seed_deadbeef() {
        let rng = Sfmt::new(0xdeadbeef);
        let expected = [
            0xECCB1E499021D572,
            0x2A3EAD68C1D6657E,
            0x4E7C95666CD1A03D,
            0xE4BA591475F2D4FC,
            0xC9AF4E9519F63CF5,
            0x83C180CD6170602D,
            0x9ECA75F4E1D8D474,
            0x01CF8B59C6F4A852,
            0x873B180D9B35F43D,
            0xCDE5CD47EB0FAEA5,
        ];
        assert_eq!(rng.take(10).collect::<Vec<u64>>(), expected);
    }

    #[test]
    fn matches_3dsrngtool_after_advancing() {
        for (advance, expected) in [(1000, 0x808A55925584D81F), (5000, 0xD491EBB15FBDFE2E)] {
            let mut rng = Sfmt::new(0xdeadbeef);
            rng.advance(advance);
            assert_eq!(rng.next_u64(), expected, "advance {advance}");
        }
    }

    #[test]
    fn next_u64_combines_two_u32s() {
        let mut a = Sfmt::new(0x12345678);
        let mut b = a.clone();
        let low = b.next_u32() as u64;
        let high = b.next_u32() as u64;
        assert_eq!(a.next_u64(), low | (high << 32));
    }

    #[test]
    fn advance_matches_stepping() {
        // 5000 advances cross several state refills (312 advances each).
        for count in [0, 1, 311, 312, 313, 1000, 5000] {
            let mut stepped = Sfmt::new(0xdeadbeef);
            let mut advanced = stepped.clone();

            for _ in 0..count {
                stepped.next_u64();
            }
            advanced.advance(count);

            assert_eq!(stepped, advanced, "count {count}");
            assert_eq!(stepped.next_u64(), advanced.next_u64(), "count {count}");
        }
    }

    #[test]
    fn advance_from_mid_block() {
        let mut stepped = Sfmt::new(0);
        stepped.next_u64();
        let mut advanced = stepped.clone();

        for _ in 0..700 {
            stepped.next_u64();
        }
        advanced.advance(700);

        assert_eq!(stepped.next_u64(), advanced.next_u64());
    }
}
