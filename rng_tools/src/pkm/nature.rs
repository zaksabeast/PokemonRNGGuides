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

pub struct NatureStatFactor {
    pub atk: i8,
    pub def: i8,
    pub spa: i8,
    pub spd: i8,
    pub spe: i8,
}

pub const NATURE_STAT_FACTORS:[NatureStatFactor;25] = [
    NatureStatFactor { atk: 0, def:0, spa:0, spd:0, spe: 0 },
    NatureStatFactor { atk:1, def:-1, spa:0, spd:0, spe: 0 },
    NatureStatFactor { atk:1, def:0, spa:-1, spd:0, spe: 0 },
    NatureStatFactor { atk:1, def:0, spa:0, spd:-1, spe: 0 },
    NatureStatFactor { atk:1, def:0, spa:0, spd:0, spe: 1 },
    NatureStatFactor { atk:-1, def:1, spa:0, spd:0, spe: 0 },
    NatureStatFactor { atk: 0, def:0, spa:0, spd:0, spe: 0 },
    NatureStatFactor { atk: 0, def:1, spa:-1, spd:0, spe: 0 },
    NatureStatFactor { atk: 0, def:1, spa:0, spd:-1, spe: 0 },
    NatureStatFactor { atk: 0, def:1, spa:0, spd:0, spe: 1 },
    NatureStatFactor { atk:-1, def:0, spa:1, spd:0, spe: 0 },
    NatureStatFactor { atk: 0, def:-1, spa:1, spd:0, spe: 0 },
    NatureStatFactor { atk: 0, def:0, spa:0, spd:0, spe: 0 },
    NatureStatFactor { atk: 0, def:0, spa:1, spd:-1, spe: 0 },
    NatureStatFactor { atk: 0, def:0, spa:1, spd:0, spe: -1 },
    NatureStatFactor { atk:-1, def:0, spa:0, spd:1, spe: 0 },
    NatureStatFactor { atk: 0, def:-1, spa:0, spd:1, spe: 0 },
    NatureStatFactor { atk: 0, def:0, spa:-1, spd:1, spe: 0 },
    NatureStatFactor { atk: 0, def:0, spa:0, spd:0, spe: 0 },
    NatureStatFactor { atk: 0, def:0, spa:0, spd:1, spe: -1 },
    NatureStatFactor { atk:-1, def:0, spa:0, spd:0, spe: 1 },
    NatureStatFactor { atk: 0, def:-1, spa:0, spd:0, spe: 1 },
    NatureStatFactor { atk: 0, def:0, spa:-1, spd:0, spe: 1 },
    NatureStatFactor { atk: 0, def:0, spa:0, spd:-1, spe: 1 },
    NatureStatFactor { atk: 0, def:0, spa:0, spd:0, spe: 0 },
];