use num_enum::FromPrimitive;
use serde::{Deserialize, Serialize};
use std::ops::{Index, IndexMut};
use tsify_next::Tsify;

#[derive(Debug, Default, Clone, Copy, PartialEq, Eq, Tsify, Serialize, Deserialize)]
pub struct Ivs {
    pub hp: u8,
    pub atk: u8,
    pub def: u8,
    pub spa: u8,
    pub spd: u8,
    pub spe: u8,
}

impl Ivs {
    pub fn new_g3(iv1: u16, iv2: u16) -> Self {
        Self {
            hp: (iv1 & 31) as u8,
            atk: ((iv1 >> 5) & 31) as u8,
            def: ((iv1 >> 10) & 31) as u8,
            spe: (iv2 & 31) as u8,
            spa: ((iv2 >> 5) & 31) as u8,
            spd: ((iv2 >> 10) & 31) as u8,
        }
    }

    pub fn filter(&self, min: &Self, max: &Self) -> bool {
        self.hp >= min.hp
            && self.hp <= max.hp
            && self.atk >= min.atk
            && self.atk <= max.atk
            && self.def >= min.def
            && self.def <= max.def
            && self.spa >= min.spa
            && self.spa <= max.spa
            && self.spd >= min.spd
            && self.spd <= max.spd
            && self.spe >= min.spe
            && self.spe <= max.spe
    }
}

#[derive(Debug, Clone, Copy, FromPrimitive)]
#[repr(u8)]
pub enum G3Idx {
    #[num_enum(default)]
    Hp = 0,
    Atk = 1,
    Def = 2,
    Spe = 3,
    Spa = 4,
    Spd = 5,
}

impl<T: Into<G3Idx>> Index<T> for Ivs {
    type Output = u8;

    fn index(&self, index: T) -> &u8 {
        match index.into() {
            G3Idx::Hp => &self.hp,
            G3Idx::Atk => &self.atk,
            G3Idx::Def => &self.def,
            G3Idx::Spe => &self.spe,
            G3Idx::Spa => &self.spa,
            G3Idx::Spd => &self.spd,
        }
    }
}

impl<T: Into<G3Idx>> IndexMut<T> for Ivs {
    fn index_mut(&mut self, index: T) -> &mut u8 {
        match index.into() {
            G3Idx::Hp => &mut self.hp,
            G3Idx::Atk => &mut self.atk,
            G3Idx::Def => &mut self.def,
            G3Idx::Spe => &mut self.spe,
            G3Idx::Spa => &mut self.spa,
            G3Idx::Spd => &mut self.spd,
        }
    }
}

#[cfg(test)]
mod test {
    use super::*;

    #[test]
    fn apply_filters() {
        let min = Ivs {
            hp: 31,
            atk: 0,
            def: 31,
            spa: 0,
            spd: 0,
            spe: 0,
        };
        let max = Ivs {
            hp: 31,
            atk: 31,
            def: 31,
            spa: 31,
            spd: 31,
            spe: 31,
        };

        let passes = Ivs {
            hp: 31,
            atk: 31,
            def: 31,
            spa: 31,
            spd: 31,
            spe: 31,
        };

        let fails_hp = Ivs {
            hp: 20,
            atk: 31,
            def: 31,
            spa: 31,
            spd: 31,
            spe: 31,
        };

        assert!(passes.filter(&min, &max));
        assert!(!fails_hp.filter(&min, &max));
    }
}
