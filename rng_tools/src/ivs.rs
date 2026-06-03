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
    pub fn new(parent_ivs: &[PartialIvs; 2], slot: usize, stat: G3Idx) -> InheritedIv {
        match slot {
            0 => InheritedIv::Parent1(parent_ivs[0][stat]),
            _ => InheritedIv::Parent2(parent_ivs[1][stat]),
        }
    }

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

    pub fn value(&self) -> Option<u8> {
        match self {
            InheritedIv::Random(iv) => Some(*iv),
            InheritedIv::Parent1(Some(iv)) => Some(*iv),
            InheritedIv::Parent2(Some(iv)) => Some(*iv),
            _ => None,
        }
    }

    #[cfg(test)]
    fn parent_source(&self) -> Option<u8> {
        match self {
            InheritedIv::Parent1(_) => Some(1),
            InheritedIv::Parent2(_) => Some(2),
            InheritedIv::Random(_) => None,
        }
    }

    #[cfg(test)]
    pub fn from_pokefinder_str(str: &str) -> Self {
        match str {
            "A" => InheritedIv::Parent1(None),
            "B" => InheritedIv::Parent2(None),
            _ => {
                let iv: u8 = str.parse().unwrap();
                InheritedIv::Random(iv)
            }
        }
    }

    #[cfg(test)]
    pub fn is_parent_or_value_eq(&self, other: &Self) -> bool {
        let parents_match = match (self.parent_source(), other.parent_source()) {
            (Some(left), Some(right)) => left == right,
            _ => true,
        };

        let values_match = match (self.value(), other.value()) {
            (Some(left), Some(right)) => left == right,
            _ => true,
        };

        parents_match && values_match
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

    pub fn try_as_ivs(&self) -> Option<Ivs> {
        Some(Ivs {
            hp: self.hp.value()?,
            atk: self.atk.value()?,
            def: self.def.value()?,
            spa: self.spa.value()?,
            spd: self.spd.value()?,
            spe: self.spe.value()?,
        })
    }

    #[cfg(test)]
    pub fn from_pokefinder_strs(parts: &[&str]) -> Self {
        if parts.len() != 6 {
            panic!("Expected 6 IVs, got {}", parts.len());
        }

        Self {
            hp: InheritedIv::from_pokefinder_str(parts[0]),
            atk: InheritedIv::from_pokefinder_str(parts[1]),
            def: InheritedIv::from_pokefinder_str(parts[2]),
            spa: InheritedIv::from_pokefinder_str(parts[3]),
            spd: InheritedIv::from_pokefinder_str(parts[4]),
            spe: InheritedIv::from_pokefinder_str(parts[5]),
        }
    }

    #[cfg(test)]
    pub fn is_parent_or_value_eq(&self, other: &Self) -> bool {
        self.hp.is_parent_or_value_eq(&other.hp)
            && self.atk.is_parent_or_value_eq(&other.atk)
            && self.def.is_parent_or_value_eq(&other.def)
            && self.spa.is_parent_or_value_eq(&other.spa)
            && self.spd.is_parent_or_value_eq(&other.spd)
            && self.spe.is_parent_or_value_eq(&other.spe)
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

impl PartialIvs {
    pub fn new_all31() -> Self {
        Self {
            hp: Some(31),
            atk: Some(31),
            def: Some(31),
            spa: Some(31),
            spd: Some(31),
            spe: Some(31),
        }
    }
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

    mod is_parent_or_value_eq {
        use super::*;

        #[test]
        fn value_is_equal() {
            let parent1_31 = InheritedIv::Parent1(Some(31));
            let parent2_31 = InheritedIv::Parent2(Some(31));
            let random_31 = InheritedIv::Random(31);

            assert!(random_31.is_parent_or_value_eq(&parent1_31));
            assert!(random_31.is_parent_or_value_eq(&parent2_31));
            assert!(random_31.is_parent_or_value_eq(&random_31));
            assert!(parent1_31.is_parent_or_value_eq(&random_31));
            assert!(parent2_31.is_parent_or_value_eq(&random_31));
        }

        #[test]
        fn value_is_not_equal() {
            let parent1_30 = InheritedIv::Parent1(Some(30));
            let parent2_30 = InheritedIv::Parent2(Some(30));
            let random_31 = InheritedIv::Random(31);

            assert!(!random_31.is_parent_or_value_eq(&parent1_30));
            assert!(!random_31.is_parent_or_value_eq(&parent2_30));
            assert!(!parent1_30.is_parent_or_value_eq(&random_31));
            assert!(!parent2_30.is_parent_or_value_eq(&random_31));
        }

        #[test]
        fn parent_is_equal() {
            let parent1_31 = InheritedIv::Parent1(Some(31));
            let parent1_unknown = InheritedIv::Parent1(None);

            let parent2_31 = InheritedIv::Parent2(Some(31));
            let parent2_unknown = InheritedIv::Parent2(None);

            assert!(parent1_31.is_parent_or_value_eq(&parent1_unknown));
            assert!(parent1_unknown.is_parent_or_value_eq(&parent1_31));
            assert!(parent2_31.is_parent_or_value_eq(&parent2_unknown));
            assert!(parent2_unknown.is_parent_or_value_eq(&parent2_31));
        }

        #[test]
        fn mismatched_parent_is_not_equal() {
            let parent1_31 = InheritedIv::Parent1(Some(31));
            let parent2_31 = InheritedIv::Parent2(Some(31));

            assert!(!parent1_31.is_parent_or_value_eq(&parent2_31));
            assert!(!parent2_31.is_parent_or_value_eq(&parent1_31));
        }
    }
}
