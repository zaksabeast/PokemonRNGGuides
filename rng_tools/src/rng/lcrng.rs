use super::rng_trait::{GetMaxRand, GetRand, Rng};
use std::iter::{DoubleEndedIterator, Iterator, Rev, Skip};

pub type Pokerng = Lcrng<0x6073, 0x41c64e6d>;
pub const POKERNG_JUMP_TABLE: [[(u32, u32); 256]; 4] = compute_jump_table::<0x6073, 0x41c64e6d>();

pub type PokerngR = Lcrng<0xa3561a1, 0xeeb9eb65>;
pub const POKERNGR_JUMP_TABLE: [[(u32, u32); 256]; 4] =
    compute_jump_table::<0xa3561a1, 0xeeb9eb65>();

pub type Xdrng = Lcrng<0x269EC3, 0x343FD>;
pub const XDRNG_JUMP_TABLE: [[(u32, u32); 256]; 4] = compute_jump_table::<0x269EC3, 0x343FD>();

pub type XdrngR = Lcrng<0xA170F641, 0xB9B33155>;
pub const XDRNGR_JUMP_TABLE: [[(u32, u32); 256]; 4] =
    compute_jump_table::<0xA170F641, 0xB9B33155>();

const fn compute_jump_table<const ADD: u32, const MUL: u32>() -> [[(u32, u32); 256]; 4] {
    let mut bit_table = [(0, 0); 32];
    bit_table[0] = (MUL, ADD);

    let mut i = 1;
    while i < 32 {
        let (prev_mul, prev_add) = bit_table[i - 1];
        bit_table[i] = (
            prev_mul.wrapping_mul(prev_mul),
            prev_add.wrapping_mul(prev_mul.wrapping_add(1)),
        );
        i += 1;
    }

    let mut table = [[(1, 0); 256]; 4];
    let mut byte = 0;
    while byte < 4 {
        let mut value = 1;
        while value < 256 {
            let mut mult = 1u32;
            let mut add = 0u32;
            let mut bit = 0;
            while bit < 8 {
                if (value & (1 << bit)) != 0 {
                    let (bit_mult, bit_add) = bit_table[byte * 8 + bit];
                    add = add.wrapping_mul(bit_mult).wrapping_add(bit_add);
                    mult = mult.wrapping_mul(bit_mult);
                }
                bit += 1;
            }
            table[byte][value] = (mult, add);
            value += 1;
        }
        byte += 1;
    }

    table
}

const fn compute_jump_pair<const ADD: u32, const MUL: u32, const ADV: usize>() -> (u32, u32) {
    let mut advances = ADV;
    let mut result_mul = 1u32;
    let mut result_add = 0u32;
    let mut jump_mul = MUL;
    let mut jump_add = ADD;

    while advances != 0 {
        if (advances & 1) != 0 {
            result_add = result_add.wrapping_mul(jump_mul).wrapping_add(jump_add);
            result_mul = result_mul.wrapping_mul(jump_mul);
        }

        jump_add = jump_add.wrapping_mul(jump_mul.wrapping_add(1));
        jump_mul = jump_mul.wrapping_mul(jump_mul);
        advances >>= 1;
    }

    (result_mul, result_add)
}

#[derive(Debug, Clone, Copy)]
pub struct Lcrng<const ADD: u32, const MUL: u32> {
    state: u32,
}

impl Pokerng {
    pub fn reverse(self) -> PokerngR {
        PokerngR::new(self.state)
    }
}

impl PokerngR {
    pub fn reverse(self) -> Pokerng {
        Pokerng::new(self.state)
    }
}

impl Xdrng {
    pub fn reverse(self) -> XdrngR {
        XdrngR::new(self.state)
    }
}

impl XdrngR {
    pub fn reverse(self) -> Xdrng {
        Xdrng::new(self.state)
    }
}

impl<const A: u32, const M: u32> Lcrng<A, M> {
    pub fn new(seed: u32) -> Self {
        Self { state: seed }
    }

    pub fn seed(&self) -> u32 {
        self.state
    }

    pub const fn get_jump_table() -> &'static [[(u32, u32); 256]; 4] {
        match A {
            0x6073 => &POKERNG_JUMP_TABLE,
            0xa3561a1 => &POKERNGR_JUMP_TABLE,
            0x269EC3 => &XDRNG_JUMP_TABLE,
            0xA170F641 => &XDRNGR_JUMP_TABLE,
            _ => panic!("error. invalid ADD generic constant"),
        }
    }
    pub const fn get_reverse_jump_table() -> &'static [[(u32, u32); 256]; 4] {
        match A {
            0x6073 => &POKERNGR_JUMP_TABLE,
            0xa3561a1 => &POKERNG_JUMP_TABLE,
            0x269EC3 => &XDRNGR_JUMP_TABLE,
            0xA170F641 => &XDRNG_JUMP_TABLE,
            _ => panic!("error. invalid ADD generic constant"),
        }
    }

    pub fn with_advances(seed: u32, advance: usize) -> Self {
        let mut rng = Self::new(seed);
        rng.advance(advance);
        rng
    }

    pub fn with_jump(seed: u32, advances: usize) -> Self {
        let mut rng = Self::new(seed);
        rng.jump(advances);
        rng
    }

    pub fn jump(&mut self, advances: usize) {
        let table = Self::get_jump_table();
        let mut byte = 0;
        while byte < 4 {
            let (mult, add) = table[byte][(advances >> (byte * 8)) & 0xff];
            self.state = self.state.wrapping_mul(mult).wrapping_add(add);
            byte += 1;
        }
    }
    pub fn jump_const<const ADVANCES: usize>(&mut self) {
        let (mult, add) = compute_jump_pair::<A, M, ADVANCES>();
        self.state = self.state.wrapping_mul(mult).wrapping_add(add);
    }

    pub fn reverse_jump(&mut self, advances: usize) {
        let table = Self::get_reverse_jump_table();
        let mut byte = 0;
        while byte < 4 {
            let (mult, add) = table[byte][(advances >> (byte * 8)) & 0xff];
            self.state = self.state.wrapping_mul(mult).wrapping_add(add);
            byte += 1;
        }
    }

    pub fn reverse_jump_const<const ADVANCES: usize>(&mut self) {
        let (mult, add) = match A {
            0x6073 => compute_jump_pair::<0xa3561a1, 0xeeb9eb65, ADVANCES>(),
            0xa3561a1 => compute_jump_pair::<0x6073, 0x41c64e6d, ADVANCES>(),
            0x269EC3 => compute_jump_pair::<0xA170F641, 0xB9B33155, ADVANCES>(),
            0xA170F641 => compute_jump_pair::<0x269EC3, 0x343FD, ADVANCES>(),
            _ => panic!("error. invalid ADD generic constant"),
        };
        self.state = self.state.wrapping_mul(mult).wrapping_add(add);
    }

    pub fn prev_rand(&mut self) -> u16 {
        let ret = (self.state >> 16) as u16;
        self.prev_state();
        ret
    }

    const fn prev_mul_add(&self) -> (u32, u32) {
        Self::get_reverse_jump_table()[0][1]
    }

    fn prev_state(&mut self) -> u32 {
        let (prev_mul, prev_add) = self.prev_mul_add();
        self.state = self.state.wrapping_mul(prev_mul).wrapping_add(prev_add);
        self.state
    }

    fn next_state(&mut self) -> u32 {
        self.state = self.state.wrapping_mul(M).wrapping_add(A);
        self.state
    }

    fn next_u16(&mut self) -> u16 {
        (self.next_state() >> 16) as u16
    }
}

impl<const A: u32, const M: u32> Iterator for Lcrng<A, M> {
    type Item = u32;

    fn next(&mut self) -> Option<Self::Item> {
        Some(self.next_state())
    }
}

impl<const A: u32, const M: u32> DoubleEndedIterator for Lcrng<A, M> {
    fn next_back(&mut self) -> Option<Self::Item> {
        Some(self.prev_state())
    }
}

impl<const A: u32, const M: u32> GetRand<u8> for Lcrng<A, M> {
    fn get(&mut self) -> u8 {
        self.next_u16() as u8
    }
}

impl<const A: u32, const M: u32> GetRand<u16> for Lcrng<A, M> {
    fn get(&mut self) -> u16 {
        self.next_u16()
    }
}

impl<const A: u32, const M: u32> GetMaxRand<u16> for Lcrng<A, M> {
    fn get_max(&mut self, max: u16) -> u16 {
        ((self.next().unwrap_or_default() >> 16) as u16) % max
    }
}

impl<const A: u32, const M: u32> GetRand<u32> for Lcrng<A, M> {
    fn get(&mut self) -> u32 {
        self.next_state()
    }
}

impl<const A: u32, const M: u32> GetRand<u8> for Skip<Lcrng<A, M>> {
    fn get(&mut self) -> u8 {
        GetRand::<u16>::get(self) as u8
    }
}

impl<const A: u32, const M: u32> GetRand<u16> for Skip<Lcrng<A, M>> {
    fn get(&mut self) -> u16 {
        (self.next().unwrap_or_default() >> 16) as u16
    }
}

impl<const A: u32, const M: u32> GetRand<u32> for Skip<Lcrng<A, M>> {
    fn get(&mut self) -> u32 {
        self.next().unwrap_or_default()
    }
}

impl<const A: u32, const M: u32> GetRand<u8> for Rev<Lcrng<A, M>> {
    fn get(&mut self) -> u8 {
        GetRand::<u16>::get(self) as u8
    }
}

impl<const A: u32, const M: u32> GetRand<u16> for Rev<Lcrng<A, M>> {
    fn get(&mut self) -> u16 {
        (self.next().unwrap_or_default() >> 16) as u16
    }
}

impl<const A: u32, const M: u32> GetRand<u32> for Rev<Lcrng<A, M>> {
    fn get(&mut self) -> u32 {
        self.next().unwrap()
    }
}

impl<const A: u32, const M: u32> Rng for Lcrng<A, M> {}

#[cfg(test)]
mod test {
    use super::*;
    use crate::assert_list_eq;

    #[test]
    fn test_pokerng_reverse_jump() {
        let list = vec![1u32, 2, 745742, 4775656, 34324934, 76553];
        list.iter().for_each(|&advs| {
            let mut rng_naive = Pokerng::new(advs);
            let mut rng_jump = Pokerng::new(advs);
            for _ in 0..advs {
                rng_naive.prev_state();
            }
            rng_jump.reverse_jump(advs as usize);
            println!("{}", advs);
            assert_eq!(rng_naive.seed(), rng_jump.seed());
        });
    }

    #[test]
    fn produces_correct_rands() {
        let expected: [u32; 105] = [
            0x00006073, 0xe97e7b6a, 0x52713895, 0x31b0dde4, 0x8e425287, 0xe2cca5ee, 0xafc58ac9,
            0x67dbb608, 0xfc3351db, 0xef2cf4b2, 0xfc5ecc3d, 0xcac5ec6c, 0xebd6f26f, 0x993d6bb6,
            0x7abcb0f1, 0xcba72510, 0x5dd60843, 0x91784efa, 0x27a62ce5, 0x618d43f4, 0x1692a757,
            0xcfb8227e, 0x375d7419, 0x30806d18, 0x407c23ab, 0x48fbaa42, 0x3213fa8d, 0xfee7047c,
            0xdfa3113f, 0x3d69ea46, 0x639e7441, 0x1d29ae20, 0xea8d4413, 0x6296268a, 0x9268d535,
            0xa3974e04, 0x1c49d027, 0x6e03e30e, 0x31aa5169, 0xaa890828, 0xd3c5097b, 0xc3eae3d2,
            0x82d95cdd, 0xe0c6408c, 0x945c840f, 0x4e3b2cd6, 0x5a5fab91, 0x24289b30, 0xfbb313e3,
            0xbfe1021a, 0x7b8e3185, 0x007ffc14, 0x40c4ccf7, 0xc848e79e, 0xbfd122b9, 0x38b68738,
            0x903b034b, 0xfb23a162, 0x7d23f32d, 0xbe34a09c, 0xda004adf, 0x706a3366, 0xdfc556e1,
            0xba84ec40, 0xe41477b3, 0x60a1e1aa, 0x2b2b41d5, 0x8f384e24, 0xb6a09dc7, 0x4160302e,
            0x1636e809, 0xf009ea48, 0xb54b111b, 0x260ee2f2, 0xb6a8bd7d, 0x7b4324ac, 0xf9cb65af,
            0x68effdf6, 0xafd47631, 0x745fa150, 0xc3be6f83, 0xe061c53a, 0x98950625, 0x84f14434,
            0x11ba4297, 0x2462bcbe, 0xcc80a159, 0xa7c43158, 0xb7a232eb, 0xa855a882, 0x1c5cbbcd,
            0xa242ccbc, 0x863ad47f, 0xad058c86, 0x11d20981, 0xb019ba60, 0x57fdfb53, 0x4ee9acca,
            0xba607e75, 0x451bde44, 0x172ebb67, 0x34a98d4e, 0x2d934ea9, 0x09665c68, 0x112d68bb,
        ];

        let results = Pokerng::new(0).take(105).collect::<Vec<_>>();

        assert_list_eq!(results, expected);
    }

    #[test]
    fn can_reverse() {
        let mut rng = Pokerng::new(0);
        assert_eq!(rng.nth(100), Some(0x172ebb67));
        assert_eq!(rng.nth_back(100), Some(0));
    }

    #[test]
    fn can_rev_iterator() {
        let mut rng = Pokerng::new(0xe97e7b6a).rev();
        assert_eq!(rng.next(), Some(0x00006073));
        assert_eq!(rng.rand::<u32>(), 0);
    }

    #[test]
    fn demo_rands() {
        // Get free iteration tools, like advancing and collecting
        let result: Vec<u32> = Pokerng::new(0).skip(0).take(4).collect();
        assert_eq!(result, [0x00006073, 0xe97e7b6a, 0x52713895, 0x31b0dde4]);

        // Advance without chaining
        let mut rng = Pokerng::new(0);
        rng.next_state();
        assert_eq!(rng.rand::<u16>(), 0xe97e);

        // Custom behavior for different types, such as u32 being u16 << 16 | u16
        assert_eq!(rng.rand::<u32>(), 0x52713895);
    }

    fn pokerng_jump_common_impl(mut state: u32, mut advances: usize) -> u32 {
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

        for (mult, add) in POKERNG_JUMP_TABLE {
            if (advances & 1) != 0 {
                state = state.wrapping_mul(mult).wrapping_add(add);
            }
            advances >>= 1;
            if advances == 0 {
                break;
            }
        }

        state
    }

    // cargo test --release benchmark_pokerng_with_jump_random_seed_and_advances -- --ignored --nocapture
    #[test]
    #[ignore]
    fn benchmark_pokerng_with_jump_random_seed_and_advances() {
        use std::{hint::black_box, time::Instant};

        const ITERATIONS: usize = 1000_000_000;

        fn next_random(state: &mut u32) -> u32 {
            *state ^= *state << 13;
            *state ^= *state >> 17;
            *state ^= *state << 5;
            *state
        }

        let mut random_state = 0x1234_5678_u32;
        let mut with_jump_checksum = 0_u32;
        let start_time = Instant::now();

        for _ in 0..ITERATIONS {
            let seed = next_random(&mut random_state);
            let advances = next_random(&mut random_state) as usize;
            with_jump_checksum = with_jump_checksum
                .wrapping_add(Pokerng::with_jump(black_box(seed), black_box(advances)).seed());
        }

        let with_jump_elapsed = start_time.elapsed();

        random_state = 0x1234_5678_u32;
        let mut common_impl_checksum = 0_u32;
        let start_time = Instant::now();

        for _ in 0..ITERATIONS {
            let seed = next_random(&mut random_state);
            let advances = next_random(&mut random_state) as usize;
            common_impl_checksum = common_impl_checksum.wrapping_add(pokerng_jump_common_impl(
                black_box(seed),
                black_box(advances),
            ));
        }

        let common_impl_elapsed = start_time.elapsed();

        println!(
            "Pokerng::with_jump random seed and advances: {:?} (checksum {})",
            with_jump_elapsed, with_jump_checksum
        );
        println!(
            "pokerng_jump_common_impl random seed and advances: {:?} (checksum {})",
            common_impl_elapsed, common_impl_checksum
        );

        assert_eq!(with_jump_checksum, common_impl_checksum);
    }

    // cargo test --release benchmark_reverse_jump_const_vs_prev_rand -- --ignored --nocapture
    #[test]
    #[ignore]
    fn benchmark_reverse_jump_const_vs_prev_rand() {
        use std::{hint::black_box, time::Instant};

        const ITERATIONS: usize = 100_000_000;

        const ADV: usize = 100;

        fn next_random(state: &mut u32) -> u32 {
            *state ^= *state << 13;
            *state ^= *state >> 17;
            *state ^= *state << 5;
            *state
        }

        let mut random_state = 0x1234_5678_u32;
        let mut reverse_jump_const_checksum = 0_u32;
        let start_time = Instant::now();

        for _ in 0..ITERATIONS {
            let seed = next_random(&mut random_state);
            let mut rng = Pokerng::new(black_box(seed));
            rng.reverse_jump_const::<ADV>();
            reverse_jump_const_checksum =
                reverse_jump_const_checksum.wrapping_add(black_box(rng.seed()));
        }

        let reverse_jump_const_elapsed = start_time.elapsed();

        random_state = 0x1234_5678_u32;
        let mut prev_rand_checksum = 0_u32;
        let start_time = Instant::now();

        for _ in 0..ITERATIONS {
            let seed = next_random(&mut random_state);
            let mut rng = Pokerng::new(black_box(seed));
            for _ in 0..ADV {
                rng.prev_rand();
            }
            prev_rand_checksum = prev_rand_checksum.wrapping_add(black_box(rng.seed()));
        }

        let prev_rand_elapsed = start_time.elapsed();

        println!(
            "Pokerng::reverse_jump_const::<{}>: {:?} (checksum {})",
            ADV, reverse_jump_const_elapsed, reverse_jump_const_checksum
        );
        println!(
            "Pokerng::prev_rand {} times: {:?} (checksum {})",
            ADV, prev_rand_elapsed, prev_rand_checksum
        );

        assert_eq!(reverse_jump_const_checksum, prev_rand_checksum);
    }

    // cargo test --release benchmark_jump_const_vs_rand -- --ignored --nocapture
    #[test]
    #[ignore]
    fn benchmark_jump_const_vs_rand() {
        use std::{hint::black_box, time::Instant};

        const ITERATIONS: usize = 100_000_000;

        fn next_random(state: &mut u32) -> u32 {
            *state ^= *state << 13;
            *state ^= *state >> 17;
            *state ^= *state << 5;
            *state
        }

        let mut random_state = 0x1234_5678_u32;
        let mut jump_const_checksum = 0_u32;
        let start_time = Instant::now();

        const ADV: usize = 100;

        for _ in 0..ITERATIONS {
            let seed = next_random(&mut random_state);
            let mut rng = Pokerng::new(black_box(seed));

            //rng.state = rng.state.wrapping_mul(mul15).wrapping_add(add15);
            rng.jump_const::<ADV>();
            jump_const_checksum = jump_const_checksum.wrapping_add(black_box(rng.seed()));
        }

        let jump_const_elapsed = start_time.elapsed();

        random_state = 0x1234_5678_u32;
        let mut prev_rand_checksum = 0_u32;
        let start_time = Instant::now();

        for _ in 0..ITERATIONS {
            let seed = next_random(&mut random_state);
            let mut rng = Pokerng::new(black_box(seed));
            rng.advance(ADV);
            prev_rand_checksum = prev_rand_checksum.wrapping_add(black_box(rng.seed()));
        }

        let prev_rand_elapsed = start_time.elapsed();

        println!(
            "Pokerng::jump_const::<{}>: {:?} (checksum {})",
            ADV, jump_const_elapsed, jump_const_checksum
        );
        println!(
            "Pokerng::advance {} times: {:?} (checksum {})",
            ADV, prev_rand_elapsed, prev_rand_checksum
        );

        assert_eq!(jump_const_checksum, prev_rand_checksum);
    }

    #[test]
    fn test_jump_const() {
        const SEED: u32 = 0x1234_5678;

        macro_rules! assert_jump_const {
            ($advances:expr) => {{
                let mut rng = Pokerng::new(SEED);
                rng.jump_const::<$advances>();
                assert_eq!(rng.seed(), Pokerng::with_jump(SEED, $advances).seed());
            }};
        }

        assert_jump_const!(0);
        assert_jump_const!(1);
        assert_jump_const!(2);
        assert_jump_const!(3);
        assert_jump_const!(10);
        assert_jump_const!(255);
        assert_jump_const!(256);
        assert_jump_const!(65_535);
        assert_jump_const!(65_536);
        assert_jump_const!(1_234_567);
    }
}
