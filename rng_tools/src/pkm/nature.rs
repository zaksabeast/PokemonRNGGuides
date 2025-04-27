use num_enum::FromPrimitive;
use serde::{Deserialize, Serialize};
use tsify_next::Tsify;

#[derive(Clone, Copy, Debug, Eq, PartialEq, FromPrimitive, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
#[repr(u8)]
pub enum Nature {
    #[num_enum(default)]
    Hardy = 0,
    Lonely = 1,
    Brave = 2,
    Adamant = 3,
    Naughty = 4,
    Bold = 5,
    Docile = 6,
    Relaxed = 7,
    Impish = 8,
    Lax = 9,
    Timid = 10,
    Hasty = 11,
    Serious = 12,
    Jolly = 13,
    Naive = 14,
    Modest = 15,
    Mild = 16,
    Quiet = 17,
    Bashful = 18,
    Rash = 19,
    Calm = 20,
    Gentle = 21,
    Sassy = 22,
    Careful = 23,
    Quirky = 24,
}

impl Nature {
    pub fn from_pid(pid: u32) -> Self {
        ((pid % 25) as u8).into()
    }
}

impl Default for Nature {
    fn default() -> Self {
        Self::Hardy
    }
}

#[derive(Copy, Clone)]
pub enum NatureFactor {
  More,
  Less,
  Equal,
}

pub struct NatureStatFactor {
    pub atk: NatureFactor,
    pub def: NatureFactor,
    pub spa: NatureFactor,
    pub spd: NatureFactor,
    pub spe: NatureFactor,
}

pub const NATURE_STAT_FACTORS:[NatureStatFactor;25] = [
    /*Hardy */    NatureStatFactor { atk: NatureFactor::Equal, def: NatureFactor::Equal, spe: NatureFactor::Equal, spa: NatureFactor::Equal, spd: NatureFactor::Equal },
    /*Lonely */   NatureStatFactor { atk: NatureFactor::More, def: NatureFactor::Less, spe: NatureFactor::Equal, spa: NatureFactor::Equal, spd: NatureFactor::Equal },
    /*Brave */    NatureStatFactor { atk: NatureFactor::More, def: NatureFactor::Equal, spe: NatureFactor::Less, spa: NatureFactor::Equal, spd: NatureFactor::Equal },
    /*Adamant */  NatureStatFactor { atk: NatureFactor::More, def: NatureFactor::Equal, spe: NatureFactor::Equal, spa: NatureFactor::Less, spd: NatureFactor::Equal },
    /*Naughty */  NatureStatFactor { atk: NatureFactor::More, def: NatureFactor::Equal, spe: NatureFactor::Equal, spa: NatureFactor::Equal, spd: NatureFactor::More },
    /*Bold */     NatureStatFactor { atk: NatureFactor::Less, def: NatureFactor::More, spe: NatureFactor::Equal, spa: NatureFactor::Equal, spd: NatureFactor::Equal },
    /*Docile */   NatureStatFactor { atk: NatureFactor::Equal, def: NatureFactor::Equal, spe: NatureFactor::Equal, spa: NatureFactor::Equal, spd: NatureFactor::Equal },
    /*Relaxed */  NatureStatFactor { atk: NatureFactor::Equal, def: NatureFactor::More, spe: NatureFactor::Less, spa: NatureFactor::Equal, spd: NatureFactor::Equal },
    /*Impish */   NatureStatFactor { atk: NatureFactor::Equal, def: NatureFactor::More, spe: NatureFactor::Equal, spa: NatureFactor::Less, spd: NatureFactor::Equal },
    /*Lax */      NatureStatFactor { atk: NatureFactor::Equal, def: NatureFactor::More, spe: NatureFactor::Equal, spa: NatureFactor::Equal, spd: NatureFactor::More },
    /*Timid */    NatureStatFactor { atk: NatureFactor::Less, def: NatureFactor::Equal, spe: NatureFactor::More, spa: NatureFactor::Equal, spd: NatureFactor::Equal },
    /*Hasty */    NatureStatFactor { atk: NatureFactor::Equal, def: NatureFactor::Less, spe: NatureFactor::More, spa: NatureFactor::Equal, spd: NatureFactor::Equal },
    /*Serious */  NatureStatFactor { atk: NatureFactor::Equal, def: NatureFactor::Equal, spe: NatureFactor::Equal, spa: NatureFactor::Equal, spd: NatureFactor::Equal },
    /*Jolly */    NatureStatFactor { atk: NatureFactor::Equal, def: NatureFactor::Equal, spe: NatureFactor::More, spa: NatureFactor::Less, spd: NatureFactor::Equal },
    /*Naive */    NatureStatFactor { atk: NatureFactor::Equal, def: NatureFactor::Equal, spe: NatureFactor::More, spa: NatureFactor::Equal, spd: NatureFactor::Less },
    /*Modest */   NatureStatFactor { atk: NatureFactor::Less, def: NatureFactor::Equal, spe: NatureFactor::Equal, spa: NatureFactor::More, spd: NatureFactor::Equal },
    /*Mild */     NatureStatFactor { atk: NatureFactor::Equal, def: NatureFactor::Less, spe: NatureFactor::Equal, spa: NatureFactor::More, spd: NatureFactor::Equal },
    /*Quiet */    NatureStatFactor { atk: NatureFactor::Equal, def: NatureFactor::Equal, spe: NatureFactor::Less, spa: NatureFactor::More, spd: NatureFactor::Equal },
    /*Bashful */  NatureStatFactor { atk: NatureFactor::Equal, def: NatureFactor::Equal, spe: NatureFactor::Equal, spa: NatureFactor::Equal, spd: NatureFactor::Equal },
    /*Rash */     NatureStatFactor { atk: NatureFactor::Equal, def: NatureFactor::Equal, spe: NatureFactor::Equal, spa: NatureFactor::More, spd: NatureFactor::Less },
    /*Calm */     NatureStatFactor { atk: NatureFactor::Less, def: NatureFactor::Equal, spe: NatureFactor::Equal, spa: NatureFactor::Equal, spd: NatureFactor::More },
    /*Gentle */   NatureStatFactor { atk: NatureFactor::Equal, def: NatureFactor::Less, spe: NatureFactor::Equal, spa: NatureFactor::Equal, spd: NatureFactor::More },
    /*Sassy */    NatureStatFactor { atk: NatureFactor::Equal, def: NatureFactor::Equal, spe: NatureFactor::Less, spa: NatureFactor::Equal, spd: NatureFactor::More },
    /*Careful */  NatureStatFactor { atk: NatureFactor::Equal, def: NatureFactor::Equal, spe: NatureFactor::Equal, spa: NatureFactor::Less, spd: NatureFactor::More },
    /*Quirky */   NatureStatFactor { atk: NatureFactor::Equal, def: NatureFactor::Equal, spe: NatureFactor::Equal, spa: NatureFactor::Equal, spd: NatureFactor::Equal },
];