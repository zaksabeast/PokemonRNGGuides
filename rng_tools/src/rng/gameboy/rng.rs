use super::div::Div;

#[derive(Debug, Clone, Copy)]
pub enum Offset {
    Plus(u8),
    Minus(u8),
}

impl Offset {
    pub fn from_i8(value: i8) -> Self {
        if value < 0 {
            Offset::Minus(value.unsigned_abs())
        } else {
            Offset::Plus(value as u8)
        }
    }

    pub fn apply(&self, value: u8) -> u8 {
        match self {
            Offset::Plus(offset) => value.wrapping_add(*offset),
            Offset::Minus(offset) => value.wrapping_sub(*offset),
        }
    }
}

impl Default for Offset {
    fn default() -> Self {
        Offset::Plus(0)
    }
}

#[derive(Debug, Clone)]
pub struct GameboyRng {
    pub r_add: u8,
    pub r_sub: u8,
    pub add_div: Div,
    pub sub_div: Div,
}

impl GameboyRng {
    pub fn new(state: u16, add_div: Div, sub_div: Div) -> Self {
        let r_add = (state >> 8) as u8;
        let r_sub = state as u8;
        Self {
            r_add,
            r_sub,
            add_div,
            sub_div,
        }
    }

    pub fn state(&self) -> u16 {
        ((self.r_add as u16) << 8) | self.r_sub as u16
    }

    pub fn advance_state(r_add: u8, r_sub: u8, a_div: u8, s_div: u8) -> [u8; 2] {
        let (r_add, add_overload) = r_add.overflowing_add(a_div);
        let r_sub = r_sub.wrapping_sub(s_div.wrapping_add(add_overload as u8));
        [r_add, r_sub]
    }

    pub fn next_with_div_offset(&mut self, div_offset: Offset) -> [u8; 2] {
        self.add_div.next();
        self.sub_div.next();

        [self.r_add, self.r_sub] = Self::advance_state(
            self.r_add,
            self.r_sub,
            div_offset.apply(self.add_div.value()),
            div_offset.apply(self.sub_div.value()),
        );

        [self.r_add, self.r_sub]
    }

    pub fn next_with_div_inc(&mut self, div_offset: Offset) -> [u8; 2] {
        self.add_div.next();
        self.sub_div.next();

        self.add_div
            .set_value(div_offset.apply(self.add_div.value()));
        self.sub_div
            .set_value(div_offset.apply(self.sub_div.value()));

        [self.r_add, self.r_sub] = Self::advance_state(
            self.r_add,
            self.r_sub,
            self.add_div.value(),
            self.sub_div.value(),
        );

        [self.r_add, self.r_sub]
    }

    pub fn next(&mut self) -> [u8; 2] {
        self.next_with_div_offset(Offset::default())
    }

    pub fn next_u16(&mut self) -> u16 {
        let [r_add, r_sub] = self.next();
        ((r_add as u16) << 8) | r_sub as u16
    }

    pub fn adiv(&self) -> u8 {
        self.add_div.value()
    }

    pub fn sdiv(&self) -> u8 {
        self.sub_div.value()
    }
}

#[cfg(test)]
mod test {
    use super::*;

    #[test]
    fn advances_the_rng() {
        let state = 0x9fe3;
        let adiv = Div::new(468, 0x78);
        let sdiv = Div::new(16139, 0x78);
        let mut rng = GameboyRng::new(state, adiv, sdiv);
        let expected: Vec<u16> = vec![
            0x2958, 0xc5bb, 0x740b, 0x3549, 0x0874, 0xee8e, 0xe695, 0xf08b, 0x0d6d, 0x3c3e, 0x7dfd,
            0xd1a9, 0x3742, 0xafca, 0x393e, 0xd6a1, 0x85f1, 0x462e, 0x1a59, 0x0072, 0xf879, 0x036d,
            0x2050, 0x4f21, 0x91df, 0xe58b, 0x4b24, 0xc4ab, 0x4f1f, 0xec82, 0x9bd1, 0x5d0e, 0x3139,
            0x1751, 0x1057, 0x1b4c, 0x382e, 0x68fe, 0xaabc, 0xfe68, 0x6500, 0xde87, 0x69fb, 0x075c,
            0xb7ac, 0x79e9, 0x4d13, 0x342b, 0x2d31, 0x3825, 0x5607, 0x86d7, 0xc894, 0x1d3e, 0x84d7,
            0xfd5e, 0x89d1, 0x2732, 0xd782, 0x9abe, 0x6fe8, 0x5600, 0x4f05, 0x5bf9, 0x79db, 0xa9aa,
            0xec67, 0x4111, 0xa8a9, 0x222e, 0xaea2, 0x4c03, 0xfd52, 0xc08e, 0x95b8, 0x7dcf, 0x77d4,
            0x83c8, 0xa1a9, 0xd278, 0x1534, 0x6ade, 0xd276, 0x4cfb, 0xd86e, 0x77ce, 0x281c, 0xeb59,
            0xc182, 0xa999, 0xa39e, 0xb091, 0xcf72, 0x0040, 0x43fc, 0x99a6, 0x013d, 0x7bc2, 0x0834,
            0xa795,
        ];

        for (index, item) in expected.iter().enumerate() {
            assert_eq!(rng.next_u16(), *item, "Failed at {}", index);
        }
    }
}
