use serde::{Deserialize, Serialize};
use tsify::Tsify;
use wasm_bindgen::prelude::*;

#[derive(Clone, Copy, Debug, PartialEq, Eq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct Keypress {
    pub value: u32,
    pub button: u16,
}

impl Keypress {
    pub fn from_buttons(buttons: &[Gen5Buttons]) -> Self {
        let mut button_bits = 0u16;
        for button in buttons {
            button_bits |= *button as u16;
        }

        Self {
            value: get_value(button_bits),
            button: button_bits,
        }
    }
}

#[derive(Debug, Copy, Clone, PartialEq, Eq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
#[repr(u16)]
pub enum Gen5Buttons {
    R = 1 << 0,      // -0x10000
    L = 1 << 1,      // -0x20000
    X = 1 << 2,      // -0x40000
    Y = 1 << 3,      // -0x80000
    A = 1 << 4,      // -0x1000000
    B = 1 << 5,      // -0x2000000
    Select = 1 << 6, // -0x4000000
    Start = 1 << 7,  // -0x8000000
    Right = 1 << 8,  // -0x10000000
    Left = 1 << 9,   // -0x20000000
    Up = 1 << 10,    // -0x40000000
    Down = 1 << 11,  // -0x80000000
}

const NONE: u16 = 0;
const LR: u16 = Gen5Buttons::L as u16 | Gen5Buttons::R as u16;
const SELECT_START: u16 = Gen5Buttons::Select as u16 | Gen5Buttons::Start as u16;
const UP_DOWN: u16 = Gen5Buttons::Up as u16 | Gen5Buttons::Down as u16;
const LEFT_RIGHT: u16 = Gen5Buttons::Left as u16 | Gen5Buttons::Right as u16;
const SOFT_RESET: u16 = LR | SELECT_START;

fn valid(button: u16, skip_lr: bool) -> bool {
    if skip_lr && (button & LR) != NONE {
        return false;
    }

    if (button & UP_DOWN) == UP_DOWN {
        return false;
    }

    if (button & LEFT_RIGHT) == LEFT_RIGHT {
        return false;
    }

    if (button & SOFT_RESET) == SOFT_RESET {
        return false;
    }

    true
}

pub fn get_all_keypresses() -> Vec<Keypress> {
    let mut results = Vec::new();

    for bits in 0u16..0x1000u16 {
        let count = bits.count_ones();
        if count <= 8 && valid(bits, false) {
            results.push(Keypress {
                value: get_value(bits),
                button: bits,
            });
        }
    }

    results
}

pub fn get_keypresses(keypresses: &[bool], skip_lr: bool) -> Vec<Keypress> {
    let mut results = Vec::new();

    for bits in 0u16..0x1000u16 {
        let count = bits.count_ones();
        let enabled = keypresses.get(count as usize).copied().unwrap_or(false);
        if count <= 8 && enabled && valid(bits, skip_lr) {
            results.push(Keypress {
                value: get_value(bits),
                button: bits,
            });
        }
    }

    results
}

pub fn get_value(button: u16) -> u32 {
    const VALUES: [u32; 12] = [
        0x10000, 0x20000, 0x40000, 0x80000, 0x1000000, 0x2000000, 0x4000000, 0x8000000, 0x10000000,
        0x20000000, 0x40000000, 0x80000000,
    ];

    let mut value: u32 = 0xff2f0000;

    let mut bits = button;
    for item in &VALUES {
        if bits & 1 != 0 {
            value -= *item;
        }
        bits >>= 1;
    }

    value
}

#[cfg(test)]
mod tests {
    use super::*;

    mod get_value {
        use super::*;

        #[test]
        fn test() {
            let res = get_value(NONE);
            assert_eq!(res, 0xff2f0000);
        }
    }

    mod get_all_keypresses {
        use crate::assert_list_eq;

        use super::*;

        #[test]
        fn test() {
            let keypresses = get_all_keypresses();
            assert_list_eq!(
                &keypresses[..10],
                &[
                    Keypress {
                        value: 0xff2f0000,
                        button: 0
                    },
                    Keypress {
                        value: 0xff2e0000,
                        button: 1
                    },
                    Keypress {
                        value: 0xff2d0000,
                        button: 2
                    },
                    Keypress {
                        value: 0xff2c0000,
                        button: 3
                    },
                    Keypress {
                        value: 0xff2b0000,
                        button: 4
                    },
                    Keypress {
                        value: 0xff2a0000,
                        button: 5
                    },
                    Keypress {
                        value: 0xff290000,
                        button: 6
                    },
                    Keypress {
                        value: 0xff280000,
                        button: 7
                    },
                    Keypress {
                        value: 0xff270000,
                        button: 8
                    },
                    Keypress {
                        value: 0xff260000,
                        button: 9
                    },
                ]
            );
        }
    }

    mod get_keypresses {
        use super::*;
        use crate::assert_list_eq;

        #[test]
        fn test() {
            let keypresses = get_keypresses(
                &[true, false, false, false, false, false, false, false, false],
                false,
            );

            assert_list_eq!(
                keypresses,
                [Keypress {
                    value: 0xff2f0000,
                    button: NONE
                },]
            );
        }
    }
}
