use serde::{Deserialize, Serialize};
use tsify::Tsify;

#[repr(usize)]
#[derive(Debug, Clone, Copy, PartialEq, Eq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub enum VoltorbFlipLevel {
    Lvl1 = 0,
    Lvl2 = 1,
    Lvl3 = 2,
    Lvl4 = 3,
    Lvl5 = 4,
    Lvl6 = 5,
    Lvl7 = 6,
    Lvl8 = 7,
}

#[derive(Debug, PartialEq, Eq)]
pub struct VoltorbFlipConfig {
    pub voltorbs: usize,
    pub twos: usize,
    pub threes: usize,
    pub max_free_per_row_col: usize,
    pub max_free_total: usize,
}

type LevelConfig = [VoltorbFlipConfig; 10];

const LVL1_CONFIG: LevelConfig = [
    VoltorbFlipConfig {
        voltorbs: 6,
        twos: 3,
        threes: 1,
        max_free_per_row_col: 3,
        max_free_total: 3,
    },
    VoltorbFlipConfig {
        voltorbs: 6,
        twos: 0,
        threes: 3,
        max_free_per_row_col: 2,
        max_free_total: 2,
    },
    VoltorbFlipConfig {
        voltorbs: 6,
        twos: 5,
        threes: 0,
        max_free_per_row_col: 3,
        max_free_total: 4,
    },
    VoltorbFlipConfig {
        voltorbs: 6,
        twos: 2,
        threes: 2,
        max_free_per_row_col: 3,
        max_free_total: 3,
    },
    VoltorbFlipConfig {
        voltorbs: 6,
        twos: 4,
        threes: 1,
        max_free_per_row_col: 3,
        max_free_total: 4,
    },
    VoltorbFlipConfig {
        voltorbs: 6,
        twos: 3,
        threes: 1,
        max_free_per_row_col: 3,
        max_free_total: 3,
    },
    VoltorbFlipConfig {
        voltorbs: 6,
        twos: 0,
        threes: 3,
        max_free_per_row_col: 2,
        max_free_total: 2,
    },
    VoltorbFlipConfig {
        voltorbs: 6,
        twos: 5,
        threes: 0,
        max_free_per_row_col: 3,
        max_free_total: 4,
    },
    VoltorbFlipConfig {
        voltorbs: 6,
        twos: 2,
        threes: 2,
        max_free_per_row_col: 3,
        max_free_total: 3,
    },
    VoltorbFlipConfig {
        voltorbs: 6,
        twos: 4,
        threes: 1,
        max_free_per_row_col: 3,
        max_free_total: 4,
    },
];

const LVL2_CONFIG: LevelConfig = [
    VoltorbFlipConfig {
        voltorbs: 7,
        twos: 1,
        threes: 3,
        max_free_per_row_col: 2,
        max_free_total: 3,
    },
    VoltorbFlipConfig {
        voltorbs: 7,
        twos: 6,
        threes: 0,
        max_free_per_row_col: 3,
        max_free_total: 4,
    },
    VoltorbFlipConfig {
        voltorbs: 7,
        twos: 3,
        threes: 2,
        max_free_per_row_col: 2,
        max_free_total: 3,
    },
    VoltorbFlipConfig {
        voltorbs: 7,
        twos: 0,
        threes: 4,
        max_free_per_row_col: 2,
        max_free_total: 3,
    },
    VoltorbFlipConfig {
        voltorbs: 7,
        twos: 5,
        threes: 1,
        max_free_per_row_col: 3,
        max_free_total: 4,
    },
    VoltorbFlipConfig {
        voltorbs: 7,
        twos: 1,
        threes: 3,
        max_free_per_row_col: 2,
        max_free_total: 2,
    },
    VoltorbFlipConfig {
        voltorbs: 7,
        twos: 6,
        threes: 0,
        max_free_per_row_col: 3,
        max_free_total: 3,
    },
    VoltorbFlipConfig {
        voltorbs: 7,
        twos: 3,
        threes: 2,
        max_free_per_row_col: 2,
        max_free_total: 2,
    },
    VoltorbFlipConfig {
        voltorbs: 7,
        twos: 0,
        threes: 4,
        max_free_per_row_col: 2,
        max_free_total: 2,
    },
    VoltorbFlipConfig {
        voltorbs: 7,
        twos: 5,
        threes: 1,
        max_free_per_row_col: 3,
        max_free_total: 3,
    },
];

const LVL3_CONFIG: LevelConfig = [
    VoltorbFlipConfig {
        voltorbs: 8,
        twos: 2,
        threes: 3,
        max_free_per_row_col: 2,
        max_free_total: 3,
    },
    VoltorbFlipConfig {
        voltorbs: 8,
        twos: 7,
        threes: 0,
        max_free_per_row_col: 3,
        max_free_total: 4,
    },
    VoltorbFlipConfig {
        voltorbs: 8,
        twos: 4,
        threes: 2,
        max_free_per_row_col: 3,
        max_free_total: 4,
    },
    VoltorbFlipConfig {
        voltorbs: 8,
        twos: 1,
        threes: 4,
        max_free_per_row_col: 2,
        max_free_total: 3,
    },
    VoltorbFlipConfig {
        voltorbs: 8,
        twos: 6,
        threes: 1,
        max_free_per_row_col: 4,
        max_free_total: 3,
    },
    VoltorbFlipConfig {
        voltorbs: 8,
        twos: 2,
        threes: 3,
        max_free_per_row_col: 2,
        max_free_total: 2,
    },
    VoltorbFlipConfig {
        voltorbs: 8,
        twos: 7,
        threes: 0,
        max_free_per_row_col: 3,
        max_free_total: 3,
    },
    VoltorbFlipConfig {
        voltorbs: 8,
        twos: 4,
        threes: 2,
        max_free_per_row_col: 3,
        max_free_total: 3,
    },
    VoltorbFlipConfig {
        voltorbs: 8,
        twos: 1,
        threes: 4,
        max_free_per_row_col: 2,
        max_free_total: 2,
    },
    VoltorbFlipConfig {
        voltorbs: 8,
        twos: 6,
        threes: 1,
        max_free_per_row_col: 3,
        max_free_total: 3,
    },
];

const LVL4_CONFIG: LevelConfig = [
    VoltorbFlipConfig {
        voltorbs: 8,
        twos: 3,
        threes: 3,
        max_free_per_row_col: 4,
        max_free_total: 3,
    },
    VoltorbFlipConfig {
        voltorbs: 8,
        twos: 0,
        threes: 5,
        max_free_per_row_col: 2,
        max_free_total: 3,
    },
    VoltorbFlipConfig {
        voltorbs: 10,
        twos: 8,
        threes: 0,
        max_free_per_row_col: 4,
        max_free_total: 5,
    },
    VoltorbFlipConfig {
        voltorbs: 10,
        twos: 5,
        threes: 2,
        max_free_per_row_col: 3,
        max_free_total: 4,
    },
    VoltorbFlipConfig {
        voltorbs: 10,
        twos: 2,
        threes: 4,
        max_free_per_row_col: 3,
        max_free_total: 4,
    },
    VoltorbFlipConfig {
        voltorbs: 8,
        twos: 3,
        threes: 3,
        max_free_per_row_col: 3,
        max_free_total: 3,
    },
    VoltorbFlipConfig {
        voltorbs: 8,
        twos: 0,
        threes: 5,
        max_free_per_row_col: 2,
        max_free_total: 2,
    },
    VoltorbFlipConfig {
        voltorbs: 10,
        twos: 8,
        threes: 0,
        max_free_per_row_col: 4,
        max_free_total: 4,
    },
    VoltorbFlipConfig {
        voltorbs: 10,
        twos: 5,
        threes: 2,
        max_free_per_row_col: 3,
        max_free_total: 3,
    },
    VoltorbFlipConfig {
        voltorbs: 10,
        twos: 2,
        threes: 4,
        max_free_per_row_col: 3,
        max_free_total: 3,
    },
];

const LVL5_CONFIG: LevelConfig = [
    VoltorbFlipConfig {
        voltorbs: 10,
        twos: 7,
        threes: 1,
        max_free_per_row_col: 4,
        max_free_total: 5,
    },
    VoltorbFlipConfig {
        voltorbs: 10,
        twos: 4,
        threes: 3,
        max_free_per_row_col: 3,
        max_free_total: 4,
    },
    VoltorbFlipConfig {
        voltorbs: 10,
        twos: 1,
        threes: 5,
        max_free_per_row_col: 3,
        max_free_total: 4,
    },
    VoltorbFlipConfig {
        voltorbs: 10,
        twos: 9,
        threes: 0,
        max_free_per_row_col: 4,
        max_free_total: 5,
    },
    VoltorbFlipConfig {
        voltorbs: 10,
        twos: 6,
        threes: 2,
        max_free_per_row_col: 4,
        max_free_total: 5,
    },
    VoltorbFlipConfig {
        voltorbs: 10,
        twos: 7,
        threes: 1,
        max_free_per_row_col: 4,
        max_free_total: 4,
    },
    VoltorbFlipConfig {
        voltorbs: 10,
        twos: 4,
        threes: 3,
        max_free_per_row_col: 3,
        max_free_total: 3,
    },
    VoltorbFlipConfig {
        voltorbs: 10,
        twos: 1,
        threes: 5,
        max_free_per_row_col: 3,
        max_free_total: 3,
    },
    VoltorbFlipConfig {
        voltorbs: 10,
        twos: 9,
        threes: 0,
        max_free_per_row_col: 4,
        max_free_total: 4,
    },
    VoltorbFlipConfig {
        voltorbs: 10,
        twos: 6,
        threes: 2,
        max_free_per_row_col: 4,
        max_free_total: 4,
    },
];

const LVL6_CONFIG: LevelConfig = [
    VoltorbFlipConfig {
        voltorbs: 10,
        twos: 3,
        threes: 4,
        max_free_per_row_col: 3,
        max_free_total: 4,
    },
    VoltorbFlipConfig {
        voltorbs: 10,
        twos: 0,
        threes: 6,
        max_free_per_row_col: 3,
        max_free_total: 4,
    },
    VoltorbFlipConfig {
        voltorbs: 10,
        twos: 8,
        threes: 1,
        max_free_per_row_col: 4,
        max_free_total: 5,
    },
    VoltorbFlipConfig {
        voltorbs: 10,
        twos: 5,
        threes: 3,
        max_free_per_row_col: 4,
        max_free_total: 5,
    },
    VoltorbFlipConfig {
        voltorbs: 10,
        twos: 2,
        threes: 5,
        max_free_per_row_col: 3,
        max_free_total: 4,
    },
    VoltorbFlipConfig {
        voltorbs: 10,
        twos: 3,
        threes: 4,
        max_free_per_row_col: 3,
        max_free_total: 3,
    },
    VoltorbFlipConfig {
        voltorbs: 10,
        twos: 0,
        threes: 6,
        max_free_per_row_col: 3,
        max_free_total: 3,
    },
    VoltorbFlipConfig {
        voltorbs: 10,
        twos: 8,
        threes: 1,
        max_free_per_row_col: 4,
        max_free_total: 4,
    },
    VoltorbFlipConfig {
        voltorbs: 10,
        twos: 5,
        threes: 3,
        max_free_per_row_col: 4,
        max_free_total: 4,
    },
    VoltorbFlipConfig {
        voltorbs: 10,
        twos: 2,
        threes: 5,
        max_free_per_row_col: 3,
        max_free_total: 3,
    },
];

const LVL7_CONFIG: LevelConfig = [
    VoltorbFlipConfig {
        voltorbs: 10,
        twos: 7,
        threes: 2,
        max_free_per_row_col: 4,
        max_free_total: 5,
    },
    VoltorbFlipConfig {
        voltorbs: 10,
        twos: 4,
        threes: 4,
        max_free_per_row_col: 4,
        max_free_total: 5,
    },
    VoltorbFlipConfig {
        voltorbs: 13,
        twos: 1,
        threes: 6,
        max_free_per_row_col: 3,
        max_free_total: 4,
    },
    VoltorbFlipConfig {
        voltorbs: 13,
        twos: 9,
        threes: 1,
        max_free_per_row_col: 5,
        max_free_total: 6,
    },
    VoltorbFlipConfig {
        voltorbs: 10,
        twos: 6,
        threes: 3,
        max_free_per_row_col: 4,
        max_free_total: 5,
    },
    VoltorbFlipConfig {
        voltorbs: 10,
        twos: 7,
        threes: 2,
        max_free_per_row_col: 4,
        max_free_total: 4,
    },
    VoltorbFlipConfig {
        voltorbs: 10,
        twos: 4,
        threes: 4,
        max_free_per_row_col: 4,
        max_free_total: 4,
    },
    VoltorbFlipConfig {
        voltorbs: 13,
        twos: 1,
        threes: 6,
        max_free_per_row_col: 3,
        max_free_total: 3,
    },
    VoltorbFlipConfig {
        voltorbs: 13,
        twos: 9,
        threes: 1,
        max_free_per_row_col: 5,
        max_free_total: 5,
    },
    VoltorbFlipConfig {
        voltorbs: 10,
        twos: 6,
        threes: 3,
        max_free_per_row_col: 4,
        max_free_total: 4,
    },
];

const LVL8_CONFIG: LevelConfig = [
    VoltorbFlipConfig {
        voltorbs: 10,
        twos: 0,
        threes: 7,
        max_free_per_row_col: 3,
        max_free_total: 4,
    },
    VoltorbFlipConfig {
        voltorbs: 10,
        twos: 8,
        threes: 2,
        max_free_per_row_col: 5,
        max_free_total: 6,
    },
    VoltorbFlipConfig {
        voltorbs: 10,
        twos: 5,
        threes: 4,
        max_free_per_row_col: 4,
        max_free_total: 5,
    },
    VoltorbFlipConfig {
        voltorbs: 10,
        twos: 2,
        threes: 6,
        max_free_per_row_col: 4,
        max_free_total: 5,
    },
    VoltorbFlipConfig {
        voltorbs: 10,
        twos: 7,
        threes: 3,
        max_free_per_row_col: 5,
        max_free_total: 6,
    },
    VoltorbFlipConfig {
        voltorbs: 10,
        twos: 0,
        threes: 7,
        max_free_per_row_col: 3,
        max_free_total: 3,
    },
    VoltorbFlipConfig {
        voltorbs: 10,
        twos: 8,
        threes: 2,
        max_free_per_row_col: 5,
        max_free_total: 5,
    },
    VoltorbFlipConfig {
        voltorbs: 10,
        twos: 5,
        threes: 4,
        max_free_per_row_col: 4,
        max_free_total: 4,
    },
    VoltorbFlipConfig {
        voltorbs: 10,
        twos: 2,
        threes: 6,
        max_free_per_row_col: 4,
        max_free_total: 4,
    },
    VoltorbFlipConfig {
        voltorbs: 10,
        twos: 7,
        threes: 3,
        max_free_per_row_col: 5,
        max_free_total: 5,
    },
];

pub const BOARD_CONFIGS: [LevelConfig; 8] = [
    LVL1_CONFIG,
    LVL2_CONFIG,
    LVL3_CONFIG,
    LVL4_CONFIG,
    LVL5_CONFIG,
    LVL6_CONFIG,
    LVL7_CONFIG,
    LVL8_CONFIG,
];

pub fn select_board(level: VoltorbFlipLevel, rand: u32) -> &'static VoltorbFlipConfig {
    let board_id = (rand % 100 / 10) as usize;
    &BOARD_CONFIGS[level as usize][board_id]
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn select_board_lvl3() {
        let result = select_board(VoltorbFlipLevel::Lvl3, 44);
        let expected = &LVL3_CONFIG[4];
        assert_eq!(result, expected);
    }
}
