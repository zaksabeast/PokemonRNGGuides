#[derive(Debug, Clone, Copy)]
pub struct Lcrng<const ADD: u32, const MUL: u32> {
    pub state: u32,
}

impl<const ADD: u32, const MUL: u32> Lcrng<ADD, MUL> {
    pub fn new(seed: impl Into<u32>) -> Self {
        Self { state: seed.into() }
    }

    pub fn next(&mut self) -> u32 {
        self.state = self.state.wrapping_mul(MUL).wrapping_add(ADD);
        self.state
    }

    pub fn next_u16(&mut self) -> u16 {
        (self.next() >> 16) as u16
    }

    pub fn next_rand(&mut self, maximum: u16) -> u16 {
        self.next_u16() % maximum
    }

    pub fn advance(&mut self, advances: usize) {
        for _ in 0..advances {
            self.next();
        }
    }
}

pub type Prng = Lcrng<0x6073, 0x41c64e6d>;
