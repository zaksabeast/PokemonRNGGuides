use super::rng_trait::{GetMaxRand, GetRand, Rng};
use std::iter::{DoubleEndedIterator, Iterator, Skip};

pub type Bwrng = Lcrng64<0x269ec3, 0x5d588b656c078965, 0x9b1ae6e9a384e6f9, 0xdedcedae9638806d>;

const fn compute_jump_table<const ADD: u64, const MUL: u64>() -> [(u64, u64); 64] {
    let mut table = [(0, 0); 64];
    table[0] = (ADD, MUL);
    let mut i = 1;
    while i < 64 {
        let (prev_add, prev_mult) = table[i - 1];
        table[i] = (
            prev_add.wrapping_mul(prev_mult.wrapping_add(1)),
            prev_mult.wrapping_mul(prev_mult),
        );
        i += 1;
    }
    table
}

const BWRNG_JUMP_TABLE: [(u64, u64); 64] = compute_jump_table::<0x269ec3, 0x5d588b656c078965>();

#[derive(Debug, Clone, Copy)]
pub struct Lcrng64<const ADD: u64, const MUL: u64, const P_ADD: u64, const P_MUL: u64> {
    state: u64,
}

impl Bwrng {
    fn get_jump(&self, advances: usize) -> (u64, u64) {
        let mut jump_add: u64 = 0;
        let mut jump_mul: u64 = 1;
        let mut jump_adv = advances;

        for (add, mul) in BWRNG_JUMP_TABLE {
            if jump_adv & 1 == 1 {
                jump_add = jump_add.wrapping_mul(mul).wrapping_add(add);
                jump_mul = jump_mul.wrapping_mul(mul);
            }
            jump_adv >>= 1;
        }

        (jump_add, jump_mul)
    }

    pub fn jump(&mut self, advances: usize) {
        let (jump_add, jump_mul) = self.get_jump(advances);
        self.state = self.state.wrapping_mul(jump_mul).wrapping_add(jump_add);
    }

    pub fn with_jump(seed: u64, advances: usize) -> Self {
        let mut rng = Self::new(seed);
        rng.jump(advances);
        rng
    }
}

impl<const A: u64, const M: u64, const PA: u64, const PM: u64> Lcrng64<A, M, PA, PM> {
    pub fn new(seed: u64) -> Self {
        Self { state: seed }
    }

    fn prev_state(&mut self) -> u64 {
        self.state = self.state.wrapping_mul(PM).wrapping_add(PA);
        self.state
    }

    fn next_state(&mut self) -> u64 {
        self.state = self.state.wrapping_mul(M).wrapping_add(A);
        self.state
    }

    fn next_u16(&mut self) -> u16 {
        (self.next_state() >> 16) as u16
    }
}

impl<const A: u64, const M: u64, const PA: u64, const PM: u64> Iterator for Lcrng64<A, M, PA, PM> {
    type Item = u64;

    fn next(&mut self) -> Option<Self::Item> {
        Some(self.next_state())
    }
}

impl<const A: u64, const M: u64, const PA: u64, const PM: u64> DoubleEndedIterator
    for Lcrng64<A, M, PA, PM>
{
    fn next_back(&mut self) -> Option<Self::Item> {
        Some(self.prev_state())
    }
}

impl<const A: u64, const M: u64, const PA: u64, const PM: u64> GetRand<u8>
    for Lcrng64<A, M, PA, PM>
{
    fn get(&mut self) -> u8 {
        self.next_u16() as u8
    }
}

impl<const A: u64, const M: u64, const PA: u64, const PM: u64> GetRand<u16>
    for Lcrng64<A, M, PA, PM>
{
    fn get(&mut self) -> u16 {
        self.next_u16()
    }
}

impl<const A: u64, const M: u64, const PA: u64, const PM: u64> GetMaxRand<u16>
    for Lcrng64<A, M, PA, PM>
{
    fn get_max(&mut self, max: u16) -> u16 {
        ((self.next().unwrap_or_default() >> 16) as u16) % max
    }
}

impl<const A: u64, const M: u64, const PA: u64, const PM: u64> GetRand<u32>
    for Lcrng64<A, M, PA, PM>
{
    fn get(&mut self) -> u32 {
        (self.next_state() >> 32) as u32
    }
}

impl<const A: u64, const M: u64, const PA: u64, const PM: u64> GetRand<u64>
    for Lcrng64<A, M, PA, PM>
{
    fn get(&mut self) -> u64 {
        self.next_state()
    }
}

impl<const A: u64, const M: u64, const PA: u64, const PM: u64> GetMaxRand<u32>
    for Lcrng64<A, M, PA, PM>
{
    fn get_max(&mut self, max: u32) -> u32 {
        (self.next_state() >> 32)
            .wrapping_mul(max as u64)
            .wrapping_shr(32) as u32
    }
}

impl<const A: u64, const M: u64, const PA: u64, const PM: u64> GetRand<u32>
    for Skip<Lcrng64<A, M, PA, PM>>
{
    fn get(&mut self) -> u32 {
        (self.next().unwrap_or_default() >> 32) as u32
    }
}

impl<const A: u64, const M: u64, const PA: u64, const PM: u64> Rng for Lcrng64<A, M, PA, PM> {}

#[cfg(test)]
mod test {
    use super::*;
    use crate::assert_list_eq;

    #[test]
    fn produces_correct_rands() {
        #[rustfmt::skip]
        let expected: [u64; 100] = [
          0x0000000000269EC3, 0x7188D00C55AE9CB2, 0x0AF528D3A0C3B2FD, 0x0A8B4E34C910A194,
          0xC83FB970153A9227, 0x0C45453A2B8A2726, 0xCC28FE8936A566C1, 0x229675654EAC71E8,
          0x38C7575F507CB74B, 0x67795501267F125A, 0xC0AAEBC7A9910645, 0x06F2A159CA9C04FC,
          0xC9E3DDA4E143722F, 0x08D1DD28EB26D24E, 0x94CB488B35255589, 0x9D8474851566AED0,
          0x36360093ECE6E6D3, 0x8B8FEA145C8B9B02, 0x6493EA8F4E3CD88D, 0x46DD090ED5E68364,
          0xCC5BBE828824F937, 0x6FF68634849C6076, 0x2E18C7366CB1D351, 0x5B78109BFF9C56B8,
          0xFE6019CA82454D5B, 0x99D6470AFD60D6AA, 0x09F3B03660E249D5, 0xF26384AC33C3BCCC,
          0xDFABBE2065FD473F, 0x28AF4E334EED719E, 0x2B65413DF8F40019, 0x0E7F4341592709A0,
          0x093A15BED4140AE3, 0x9617817B76176552, 0x5531C0A479D87A1D, 0x044D9AF97EB35134,
          0xE08A0BEA1BC67C47, 0xCC27101887E8A5C6, 0x17E440D33010FBE1, 0xF39A9D89DCCC6788,
          0x69D5E479B4EB3F6B, 0x9856953D25D3E6FA, 0x839BE73D1C328965, 0xF21512648960E09C,
          0x62AA0122FFD6B84F, 0x47835E8436A89CEE, 0x66A0D0207F29E6A9, 0x8E3A6C0132BE1070,
          0x64B31EF26EFF0AF3, 0x05C8D7831846FBA2, 0x6EB807B9CA3F97AD, 0x110E9B83F5240B04,
          0xFE976675FE601B57, 0x97C6182B3E13F716, 0x0E0F39BF36DBE071, 0x2CBD47141F19A458,
          0x07FC19559C9F8D7B, 0x9D7C022BF02D434A, 0x7071C2B00A0AC4F5, 0x598791DF7880706C,
          0x4C569E33E9F0C55F, 0x15C39F019F5D543E, 0x566C3B7A47C00939, 0xAF8278456068C340,
          0xE8C1317370B8E703, 0xA3CF259101CF5DF2, 0x33916AF559DB313D, 0x2668F9B7D5A5B0D4,
          0xC57884A23BF2D667, 0x18E1BFD0EC835466, 0xB2E9096FEEEB8101, 0x9E25F3473E210D28,
          0xEC41A8976F53378B, 0x8A0117DE9D81EB9A, 0x37DC3CD314B3FC85, 0xA0C94C4880EF6C3C,
          0xB478B57C452C6E6F, 0xE3F994A4EAD0978E, 0xBAFC3764526F67C9, 0x4B11E0D3C7242210,
          0x626CD9CB96129F13, 0xD4A0E9BF8A258C42, 0x47C083BC46D446CD, 0x612476BCF76542A4,
          0xE0F9CB88CE3FAD77, 0x86711138655BBDB6, 0xF1E41DD70DD8DD91, 0x1B65DFDDC03FA1F8,
          0x2B76A748F4B73D9B, 0x869880E5AFA6DFEA, 0x06625EF772373015, 0x55AEAAD3C53AD40C,
          0x4BCC1CE6282AB37F, 0xE532754C2F8766DE, 0x0E66982DAEB10259, 0x3091307442AD2CE0,
          0x5E358B97B59D3323, 0xF169B9B9F17E8692, 0x9F3E216E4313D85D, 0xE7FE42E93C4FC074,
        ];

        let results = Bwrng::new(0).take(100).collect::<Vec<_>>();

        assert_list_eq!(results, expected);
    }

    #[test]
    fn can_reverse() {
        let mut rng = Bwrng::new(0);
        assert_eq!(rng.nth(100), Some(0x37c76c6eacc7a087));
        assert_eq!(rng.nth_back(100), Some(0));
    }

    #[test]
    fn can_jump() {
        let mut rng = Bwrng::new(0);
        rng.jump(100);
        assert_eq!(rng.next(), Some(0x37c76c6eacc7a087));
    }
}
