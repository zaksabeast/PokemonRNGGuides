use num_enum::FromPrimitive;
use serde::{Deserialize, Serialize};
use std::ops::{Index, IndexMut};
use tsify_next::Tsify;

macro_rules! impl_index_g3idx {
    ($ty:ty, $item:ty) => {
        impl std::ops::Index<G3Idx> for $ty {
            type Output = $item;

            fn index(&self, index: G3Idx) -> &Self::Output {
                match index {
                    G3Idx::Hp => &self.hp,
                    G3Idx::Atk => &self.atk,
                    G3Idx::Def => &self.def,
                    G3Idx::Spe => &self.spe,
                    G3Idx::Spa => &self.spa,
                    G3Idx::Spd => &self.spd,
                }
            }
        }

        impl std::ops::IndexMut<G3Idx> for $ty {
            fn index_mut(&mut self, index: G3Idx) -> &mut Self::Output {
                match index {
                    G3Idx::Hp => &mut self.hp,
                    G3Idx::Atk => &mut self.atk,
                    G3Idx::Def => &mut self.def,
                    G3Idx::Spe => &mut self.spe,
                    G3Idx::Spa => &mut self.spa,
                    G3Idx::Spd => &mut self.spd,
                }
            }
        }
    };
}

#[cfg(test)]
#[macro_export]
macro_rules! ivs {
    ($hp:literal / $atk:literal / $def:literal / $spa:literal / $spd:literal / $spe:literal) => {{
        const IV: Ivs = Ivs {
            hp: $hp,
            atk: $atk,
            def: $def,
            spa: $spa,
            spd: $spd,
            spe: $spe,
        };
        IV
    }};
}

#[derive(Debug, Clone, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct IvFilter {
    pub min_ivs: Ivs,
    pub max_ivs: Ivs,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub enum InheritedIv {
    // We'll always know a randomly generated IV
    Random(u8),
    // We might not know parent IVs
    Parent1(Option<u8>),
    Parent2(Option<u8>),
}

impl InheritedIv {
    pub fn filter(&self, min: u8, max: u8) -> bool {
        match self {
            InheritedIv::Random(iv) => *iv >= min && *iv <= max,
            InheritedIv::Parent1(Some(iv)) => *iv >= min && *iv <= max,
            InheritedIv::Parent2(Some(iv)) => *iv >= min && *iv <= max,
            _ => true, // If we don't know the IV, we assume it passes the filter
        }
    }
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct InheritedIvs {
    pub hp: InheritedIv,
    pub atk: InheritedIv,
    pub def: InheritedIv,
    pub spa: InheritedIv,
    pub spd: InheritedIv,
    pub spe: InheritedIv,
}

impl InheritedIvs {
    pub fn filter(&self, min: &Ivs, max: &Ivs) -> bool {
        [
            self.hp.filter(min.hp, max.hp),
            self.atk.filter(min.atk, max.atk),
            self.def.filter(min.def, max.def),
            self.spa.filter(min.spa, max.spa),
            self.spd.filter(min.spd, max.spd),
            self.spe.filter(min.spe, max.spe),
        ]
        .iter()
        .all(|&x| x)
    }
}

#[derive(Debug, Default, Clone, Copy, PartialEq, Eq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct PartialIvs {
    pub hp: Option<u8>,
    pub atk: Option<u8>,
    pub def: Option<u8>,
    pub spa: Option<u8>,
    pub spd: Option<u8>,
    pub spe: Option<u8>,
}

#[derive(Debug, Default, Clone, Copy, PartialEq, Eq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct Ivs {
    pub hp: u8,
    pub atk: u8,
    pub def: u8,
    pub spa: u8,
    pub spd: u8,
    pub spe: u8,
}

impl Ivs {
    pub fn new_all0() -> Self {
        Self {
            hp: 0,
            atk: 0,
            def: 0,
            spe: 0,
            spa: 0,
            spd: 0,
        }
    }
    pub fn new_all31() -> Self {
        Self {
            hp: 31,
            atk: 31,
            def: 31,
            spe: 31,
            spa: 31,
            spd: 31,
        }
    }
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

impl_index_g3idx!(Ivs, u8);
impl_index_g3idx!(PartialIvs, Option<u8>);
impl_index_g3idx!(InheritedIvs, InheritedIv);

impl From<Ivs> for InheritedIvs {
    fn from(ivs: Ivs) -> Self {
        Self {
            hp: InheritedIv::Random(ivs.hp),
            atk: InheritedIv::Random(ivs.atk),
            def: InheritedIv::Random(ivs.def),
            spa: InheritedIv::Random(ivs.spa),
            spd: InheritedIv::Random(ivs.spd),
            spe: InheritedIv::Random(ivs.spe),
        }
    }
}

impl From<Ivs> for PartialIvs {
    fn from(ivs: Ivs) -> Self {
        Self {
            hp: ivs.hp.into(),
            atk: ivs.atk.into(),
            def: ivs.def.into(),
            spa: ivs.spa.into(),
            spd: ivs.spd.into(),
            spe: ivs.spe.into(),
        }
    }
}

#[derive(Debug, Clone, Copy, FromPrimitive)]
#[repr(u8)]
pub enum G6Idx {
    #[num_enum(default)]
    Hp = 0,
    Atk = 1,
    Def = 2,
    Spa = 3,
    Spd = 4,
    Spe = 5,
}

impl Index<G6Idx> for Ivs {
    type Output = u8;

    fn index(&self, index: G6Idx) -> &u8 {
        match index {
            G6Idx::Hp => &self.hp,
            G6Idx::Atk => &self.atk,
            G6Idx::Def => &self.def,
            G6Idx::Spe => &self.spe,
            G6Idx::Spa => &self.spa,
            G6Idx::Spd => &self.spd,
        }
    }
}

impl IndexMut<G6Idx> for Ivs {
    fn index_mut(&mut self, index: G6Idx) -> &mut u8 {
        match index {
            G6Idx::Hp => &mut self.hp,
            G6Idx::Atk => &mut self.atk,
            G6Idx::Def => &mut self.def,
            G6Idx::Spe => &mut self.spe,
            G6Idx::Spa => &mut self.spa,
            G6Idx::Spd => &mut self.spd,
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
