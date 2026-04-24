use crate::impl_stat_index;
use crate::pkm::{G3Idx, G5Idx};
use itertools::iproduct;
use serde::{Deserialize, Serialize};
use tsify::Tsify;

#[cfg(test)]
#[macro_export]
macro_rules! ivs {
    ($hp:literal / $atk:literal / $def:literal / $spa:literal / $spd:literal / $spe:literal) => {{
        const IV: Ivs = $crate::Ivs {
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

impl IvFilter {
    pub fn new_allow_all() -> Self {
        Self {
            min_ivs: Ivs::new_all0(),
            max_ivs: Ivs::new_all31(),
        }
    }
}

impl Default for IvFilter {
    fn default() -> Self {
        Self::new_allow_all()
    }
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
            // If the range is 0 to 31, it means we don't care about this IV, so it passes the filter,
            // otherwise it fails because we don't know the IV.
            _ => min == 0 && max == 31,
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
    pub fn new(hp: u8, atk: u8, def: u8, spa: u8, spd: u8, spe: u8) -> Self {
        Self {
            hp,
            atk,
            def,
            spe,
            spa,
            spd,
        }
    }
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

    #[cfg(test)]
    pub fn from_pokefinder_strs(parts: &[&str]) -> Self {
        if parts.len() != 6 {
            panic!("Expected 6 IVs, got {}", parts.len());
        }

        Self {
            hp: parts[0].parse().unwrap(),
            atk: parts[1].parse().unwrap(),
            def: parts[2].parse().unwrap(),
            spa: parts[3].parse().unwrap(),
            spd: parts[4].parse().unwrap(),
            spe: parts[5].parse().unwrap(),
        }
    }
}

impl std::fmt::Display for Ivs {
    fn fmt(&self, f: &mut std::fmt::Formatter) -> std::fmt::Result {
        write!(
            f,
            "{}/{}/{}/{}/{}/{}",
            self.hp, self.atk, self.def, self.spa, self.spd, self.spe,
        )
    }
}

pub fn iv_iter(min_ivs: Ivs, max_ivs: Ivs) -> impl Iterator<Item = Ivs> {
    let Ivs {
        hp: min_hp,
        atk: min_atk,
        def: min_def,
        spa: min_spa,
        spd: min_spd,
        spe: min_spe,
    } = min_ivs;

    let Ivs {
        hp: max_hp,
        atk: max_atk,
        def: max_def,
        spa: max_spa,
        spd: max_spd,
        spe: max_spe,
    } = max_ivs;

    iproduct!(
        min_hp..=max_hp,
        min_atk..=max_atk,
        min_def..=max_def,
        min_spa..=max_spa,
        min_spd..=max_spd,
        min_spe..=max_spe
    )
    .map(|(hp, atk, def, spa, spd, spe)| Ivs {
        hp,
        atk,
        def,
        spa,
        spd,
        spe,
    })
}

impl_stat_index!(G3Idx, Ivs, u8);
impl_stat_index!(G3Idx, PartialIvs, Option<u8>);
impl_stat_index!(G3Idx, InheritedIvs, InheritedIv);

impl_stat_index!(G5Idx, Ivs, u8);
impl_stat_index!(G5Idx, PartialIvs, Option<u8>);
impl_stat_index!(G5Idx, InheritedIvs, InheritedIv);

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
