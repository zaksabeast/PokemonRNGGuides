use crate::{
    AbilityType, Gender, Ivs, Nature, PkmState, gen3_shiny,
    rng::{Rng, lcrng::Pokerng},
};
use serde::{Deserialize, Serialize};
use tsify_next::Tsify;
use wasm_bindgen::prelude::*;

#[derive(Debug, Clone, Copy, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub enum MultibootJirachiType {
    Meteor,
    Wishmaker,
}

impl MultibootJirachiType {
    pub fn tid(&self) -> u16 {
        match self {
            MultibootJirachiType::Meteor => 30719,
            MultibootJirachiType::Wishmaker => 20043,
        }
    }
}

#[derive(Debug, Clone, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct JirachiSpread {
    pub pid: u32,
    pub ivs: Ivs,
    pub shiny: bool,
}

impl JirachiSpread {
    pub fn new(seed: u16, jirachi_type: MultibootJirachiType) -> Self {
        let mut rng = Pokerng::new(seed.into());
        let pid = ((rng.rand::<u16>() as u32) << 16) | (rng.rand::<u16>() as u32);
        let iv1 = rng.rand::<u16>();
        let iv2 = rng.rand::<u16>();
        let ivs = Ivs::new_g3(iv1, iv2);
        let shiny = gen3_shiny(pid, jirachi_type.tid(), 0);

        Self { pid, ivs, shiny }
    }
}

impl PkmState for JirachiSpread {
    fn ivs(&self) -> &Ivs {
        &self.ivs
    }

    fn shiny(&self) -> bool {
        self.shiny
    }

    fn nature(&self) -> Nature {
        Nature::from_pid(self.pid)
    }

    fn ability(&self) -> AbilityType {
        AbilityType::First
    }

    fn gender(&self) -> Gender {
        Gender::Genderless
    }
}

#[cfg(test)]
mod test {
    use super::*;
    use crate::ivs;

    #[test]
    fn notable_meteor_spreads() {
        let tests = [
            (
                0x0313,
                JirachiSpread {
                    pid: 0x34a3435f,
                    ivs: ivs!(28 / 07 / 21 / 29 / 27 / 09),
                    shiny: true,
                },
            ),
            (
                0x49d7,
                JirachiSpread {
                    pid: 0xc9e9be16,
                    ivs: ivs!(26 / 22 / 05 / 27 / 28 / 01),
                    shiny: true,
                },
            ),
            (
                0x4c8c,
                JirachiSpread {
                    pid: 0xd7bba042,
                    ivs: ivs!(26 / 25 / 26 / 23 / 18 / 23),
                    shiny: true,
                },
            ),
            (
                0x4e26,
                JirachiSpread {
                    pid: 0x2f5558ad,
                    ivs: ivs!(26 / 04 / 13 / 10 / 00 / 30),
                    shiny: true,
                },
            ),
            (
                0x5979,
                JirachiSpread {
                    pid: 0x07ff7007,
                    ivs: ivs!(26 / 03 / 17 / 07 / 29 / 15),
                    shiny: true,
                },
            ),
            (
                0x9350,
                JirachiSpread {
                    pid: 0x6d011af9,
                    ivs: ivs!(24 / 08 / 11 / 21 / 19 / 15),
                    shiny: true,
                },
            ),
            (
                0x9ea3,
                JirachiSpread {
                    pid: 0x45ab3253,
                    ivs: ivs!(24 / 07 / 15 / 18 / 16 / 00),
                    shiny: true,
                },
            ),
            (
                0xa03d,
                JirachiSpread {
                    pid: 0x9d45eabe,
                    ivs: ivs!(24 / 18 / 01 / 05 / 30 / 07),
                    shiny: true,
                },
            ),
            (
                0xe567,
                JirachiSpread {
                    pid: 0xdaf1ad0a,
                    ivs: ivs!(22 / 22 / 31 / 15 / 17 / 24),
                    shiny: true,
                },
            ),
            (
                0xf0ba,
                JirachiSpread {
                    pid: 0xb39bc465,
                    ivs: ivs!(22 / 21 / 03 / 12 / 14 / 09),
                    shiny: true,
                },
            ),
            (
                0x0a79,
                JirachiSpread {
                    pid: 0xd5cb4261,
                    ivs: ivs!(30 / 25 / 29 / 29 / 28 / 25),
                    shiny: false,
                },
            ),
            (
                0x1ad4,
                JirachiSpread {
                    pid: 0x9c309bd5,
                    ivs: ivs!(27 / 29 / 31 / 31 / 29 / 25),
                    shiny: false,
                },
            ),
            (
                0x9df6,
                JirachiSpread {
                    pid: 0xd2a8aa71,
                    ivs: ivs!(31 / 31 / 25 / 30 / 25 / 28),
                    shiny: false,
                },
            ),
            (
                0xbd9d,
                JirachiSpread {
                    pid: 0xbe845336,
                    ivs: ivs!(31 / 30 / 28 / 27 / 29 / 28),
                    shiny: false,
                },
            ),
            (
                0xd517,
                JirachiSpread {
                    pid: 0xe812b093,
                    ivs: ivs!(31 / 29 / 30 / 31 / 30 / 31),
                    shiny: false,
                },
            ),
            (
                0x0f71,
                JirachiSpread {
                    pid: 0xa7215a50,
                    ivs: ivs!(00 / 00 / 26 / 00 / 09 / 00),
                    shiny: false,
                },
            ),
            (
                0x1dea,
                JirachiSpread {
                    pid: 0x96263d9d,
                    ivs: ivs!(00 / 30 / 00 / 00 / 00 / 05),
                    shiny: false,
                },
            ),
            (
                0xa64d,
                JirachiSpread {
                    pid: 0x5f80e487,
                    ivs: ivs!(00 / 05 / 00 / 00 / 00 / 10),
                    shiny: false,
                },
            ),
            (
                0xa738,
                JirachiSpread {
                    pid: 0xc08a8fca,
                    ivs: ivs!(12 / 00 / 29 / 00 / 00 / 00),
                    shiny: false,
                },
            ),
        ];

        for (seed, expected) in tests {
            let result = JirachiSpread::new(seed, MultibootJirachiType::Meteor);
            assert_eq!(result, expected, "Seed: {seed:#06x}");
        }
    }

    #[test]
    fn notable_wishmaker_spreads() {
        let tests = [
            (
                0x353d,
                JirachiSpread {
                    pid: 0xba7df435,
                    ivs: ivs!(24 / 03 / 30 / 12 / 16 / 11),
                    shiny: true,
                },
            ),
            (
                0x3d60,
                JirachiSpread {
                    pid: 0xeb0da543,
                    ivs: ivs!(15 / 28 / 29 / 03 / 00 / 07),
                    shiny: true,
                },
            ),
            (
                0x7236,
                JirachiSpread {
                    pid: 0x2ec1608d,
                    ivs: ivs!(31 / 23 / 26 / 29 / 18 / 05),
                    shiny: true,
                },
            ),
            (
                0x7360,
                JirachiSpread {
                    pid: 0xbf98f1d5,
                    ivs: ivs!(29 / 10 / 31 / 25 / 23 / 21),
                    shiny: true,
                },
            ),
            (
                0x9359,
                JirachiSpread {
                    pid: 0xbcfaf2b0,
                    ivs: ivs!(03 / 12 / 12 / 07 / 11 / 09),
                    shiny: true,
                },
            ),
            (
                0xa030,
                JirachiSpread {
                    pid: 0x4633087d,
                    ivs: ivs!(21 / 31 / 31 / 18 / 24 / 19),
                    shiny: true,
                },
            ),
            (
                0xcf37,
                JirachiSpread {
                    pid: 0x7b053548,
                    ivs: ivs!(11 / 08 / 06 / 14 / 05 / 20),
                    shiny: true,
                },
            ),
            (
                0xecdd,
                JirachiSpread {
                    pid: 0x987ed636,
                    ivs: ivs!(19 / 07 / 10 / 19 / 10 / 16),
                    shiny: true,
                },
            ),
            (
                0xf500,
                JirachiSpread {
                    pid: 0xc90e8744,
                    ivs: ivs!(10 / 00 / 10 / 10 / 26 / 12),
                    shiny: true,
                },
            ),
            (
                0x0a79,
                JirachiSpread {
                    pid: 0xd5cb4261,
                    ivs: ivs!(30 / 25 / 29 / 29 / 28 / 25),
                    shiny: false,
                },
            ),
            (
                0x1ad4,
                JirachiSpread {
                    pid: 0x9c309bd5,
                    ivs: ivs!(27 / 29 / 31 / 31 / 29 / 25),
                    shiny: false,
                },
            ),
            (
                0x9df6,
                JirachiSpread {
                    pid: 0xd2a8aa71,
                    ivs: ivs!(31 / 31 / 25 / 30 / 25 / 28),
                    shiny: false,
                },
            ),
            (
                0xbd9d,
                JirachiSpread {
                    pid: 0xbe845336,
                    ivs: ivs!(31 / 30 / 28 / 27 / 29 / 28),
                    shiny: false,
                },
            ),
            (
                0xd517,
                JirachiSpread {
                    pid: 0xe812b093,
                    ivs: ivs!(31 / 29 / 30 / 31 / 30 / 31),
                    shiny: false,
                },
            ),
            (
                0x0f71,
                JirachiSpread {
                    pid: 0xa7215a50,
                    ivs: ivs!(00 / 00 / 26 / 00 / 09 / 00),
                    shiny: false,
                },
            ),
            (
                0x1dea,
                JirachiSpread {
                    pid: 0x96263d9d,
                    ivs: ivs!(00 / 30 / 00 / 00 / 00 / 05),
                    shiny: false,
                },
            ),
            (
                0xa64d,
                JirachiSpread {
                    pid: 0x5f80e487,
                    ivs: ivs!(00 / 05 / 00 / 00 / 00 / 10),
                    shiny: false,
                },
            ),
            (
                0xa738,
                JirachiSpread {
                    pid: 0xc08a8fca,
                    ivs: ivs!(12 / 00 / 29 / 00 / 00 / 00),
                    shiny: false,
                },
            ),
        ];

        for (seed, expected) in tests {
            let result = JirachiSpread::new(seed, MultibootJirachiType::Wishmaker);
            assert_eq!(result, expected, "Seed: {seed:#06x}");
        }
    }
}
