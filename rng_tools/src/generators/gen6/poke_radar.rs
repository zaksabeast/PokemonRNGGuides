use super::utils::{Gen6SlotType, find_item};
use crate::rng::{Rng, StateIterator, tinymt::TinyMT};
use serde::{Deserialize, Serialize};
use tsify_next::Tsify;
use wasm_bindgen::prelude::*;

#[derive(Debug, Default, Clone, Copy, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub enum PokeRadarPatchState {
    Bad,
    Good,
    Shiny,
    #[default]
    Empty,
}

#[derive(Debug, Default, Clone, Copy, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct PokeRadarPatch {
    pub x: u8,
    pub y: u8,
    pub state: PokeRadarPatchState,
}

impl PokeRadarPatch {
    fn x(direction: u8, ring: u8, location: u8) -> u8 {
        match direction {
            0 | 1 => 3 + location - ring,
            2 => 3 - ring,
            3 => 5 + ring,
            _ => 4,
        }
    }

    fn y(direction: u8, ring: u8, location: u8) -> u8 {
        match direction {
            0 => 3 - ring,
            1 => 5 + ring,
            2 | 3 => 3 + location - ring,
            _ => 4,
        }
    }
}

#[derive(Debug, Clone, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct PokeRadarOptions {
    pub state: [u32; 4],
    pub party_count: usize,
    pub initial_advances: usize,
    pub max_advances: usize,
    pub chain: u8,
    pub bonus_music: bool,
    pub filter_shiny: bool,
    pub filter_slot: Option<u8>,
}

#[derive(Debug, Default, Clone, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub enum PokeRadarMusic {
    A,
    M,
    #[default]
    None,
}

impl PokeRadarMusic {
    fn new(rand100: u8) -> Self {
        match rand100 {
            0..2 => PokeRadarMusic::A,
            50..100 => PokeRadarMusic::M,
            _ => PokeRadarMusic::None,
        }
    }
}

#[derive(Debug, Default)]
struct PokeRadarConsolidatedState {
    advance: usize,
    state: [u32; 4],
    sync: bool,
    slot: u8,
    item_slot: u8,
    music: PokeRadarMusic,
    boosted: bool,
    patches: [PokeRadarPatch; 5],
    shiny: bool,
}

impl PokeRadarConsolidatedState {
    fn to_no_chain(self) -> PokeRadarNoChainState {
        PokeRadarNoChainState {
            advance: self.advance,
            state: self.state,
            sync: self.sync,
            slot: self.slot,
            music: self.music,
            boosted: self.boosted,
            patches: self.patches,
            shiny: self.shiny,
        }
    }

    fn to_chain(self) -> PokeRadarChainState {
        PokeRadarChainState {
            advance: self.advance,
            state: self.state,
            music: self.music,
            boosted: self.boosted,
            patches: self.patches,
            shiny: self.shiny,
        }
    }
}

#[derive(Debug, Clone, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct PokeRadarNoChainState {
    pub advance: usize,
    pub sync: bool,
    pub slot: u8,
    pub music: PokeRadarMusic,
    pub shiny: bool,
    pub boosted: bool,
    pub patches: [PokeRadarPatch; 5],
    pub state: [u32; 4],
}

#[derive(Debug, Clone, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct PokeRadarChainState {
    pub advance: usize,
    pub shiny: bool,
    pub music: PokeRadarMusic,
    pub boosted: bool,
    pub patches: [PokeRadarPatch; 5],
    pub state: [u32; 4],
}

#[derive(Debug, Clone, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub enum PokeRadarResult {
    NoChain(Vec<PokeRadarNoChainState>),
    WithChain(Vec<PokeRadarChainState>),
}

const GOOD_RATE: [u32; 4] = [23, 43, 63, 83];

fn generate_poke_radar_state(
    opts: &PokeRadarOptions,
    rng: &mut TinyMT,
    advance: usize,
) -> PokeRadarConsolidatedState {
    let mut result = PokeRadarConsolidatedState::default();
    result.state = rng.get_state();
    result.advance = advance;

    let rand100 = rng.rand_max(100);
    if opts.chain == 0 {
        result.sync = rand100 < 50;
        result.slot = Gen6SlotType::PokeRadar.slot(rng.rand_max(100) as u8);
        rng.next();
        let rand100 = rng.rand_max(100) as u8;
        result.item_slot = find_item(rand100);
        result.music = PokeRadarMusic::new(rand100);
    } else {
        rng.advance(opts.party_count * 3 + 26);
        let rand100 = rng.rand_max(100) as u8;
        result.boosted = opts.bonus_music && rand100 >= 50;
        result.music = PokeRadarMusic::new(rand100);
    }

    result.patches[..4]
        .iter_mut()
        .enumerate()
        .for_each(|(ring, patch)| {
            let ring = ring as u8;
            let direction = rng.rand_max(4) as u8;
            let location = rng.rand_max((ring as u32) * 2 + 3) as u8;

            patch.x = PokeRadarPatch::x(direction, ring, location);
            patch.y = PokeRadarPatch::y(direction, ring, location);

            if rng.rand_max(100) < GOOD_RATE[ring as usize] {
                rng.next();
                let chance: u64 = match result.boosted || opts.chain >= 40 {
                    true => 100,
                    false => 8100 - (opts.chain as u64) * 200,
                };
                let rand = rng.rand() as u64;
                patch.state = match rand * chance <= u32::MAX as u64 {
                    true => PokeRadarPatchState::Shiny,
                    false => PokeRadarPatchState::Good,
                };
            }
        });

    // 1 empty patch
    let ring = rng.rand_max(3) as usize;
    let direction = rng.rand_max(4) as u8;
    let location = rng.rand_max((ring as u32) * 2 + 3) as u8;

    let x = PokeRadarPatch::x(direction, ring as u8, location);
    let y = PokeRadarPatch::y(direction, ring as u8, location);

    result.patches[4].x = x;
    result.patches[4].y = y;
    result.patches[4].state = PokeRadarPatchState::Empty;

    result.shiny = result
        .patches
        .iter()
        .any(|patch| patch.state == PokeRadarPatchState::Shiny);
    result
}

#[wasm_bindgen]
pub fn generate_poke_radar_states(opts: PokeRadarOptions) -> PokeRadarResult {
    let rng = TinyMT::from_state(opts.state);
    let states = StateIterator::new(rng)
        .enumerate()
        .skip(opts.initial_advances)
        .take(opts.max_advances)
        .filter_map(|(advance, mut rng)| {
            let radar_state = generate_poke_radar_state(&opts, &mut rng, advance);

            if opts.filter_shiny && !radar_state.shiny {
                return None;
            }

            if opts.chain == 0
                && opts.filter_slot.is_some()
                && Some(radar_state.slot) != opts.filter_slot
            {
                return None;
            }

            Some(radar_state)
        });

    match opts.chain {
        0 => PokeRadarResult::NoChain(states.map(|state| state.to_no_chain()).collect()),
        _ => PokeRadarResult::WithChain(states.map(|state| state.to_chain()).collect()),
    }
}

#[cfg(test)]
mod test {
    use super::PokeRadarPatchState::*;
    use super::*;

    #[test]
    fn poke_radar_no_filter_no_chain_no_party() {
        let opts = PokeRadarOptions {
            state: [0x304ACD77, 0x03D159CC, 0x69689233, 0x342C0F10],
            initial_advances: 0,
            max_advances: 10,
            party_count: 1,
            chain: 0,
            bonus_music: false,
            filter_shiny: false,
            filter_slot: None,
        };
        let result = generate_poke_radar_states(opts);
        let expected = [
            PokeRadarNoChainState {
                advance: 0,
                sync: false,
                slot: 6,
                music: PokeRadarMusic::M,
                shiny: false,
                boosted: false,
                patches: [
                    PokeRadarPatch {
                        x: 3,
                        y: 4,
                        state: Good,
                    },
                    PokeRadarPatch {
                        x: 3,
                        y: 2,
                        state: Empty,
                    },
                    PokeRadarPatch {
                        x: 2,
                        y: 1,
                        state: Empty,
                    },
                    PokeRadarPatch {
                        x: 7,
                        y: 0,
                        state: Good,
                    },
                    PokeRadarPatch {
                        x: 7,
                        y: 7,
                        state: Empty,
                    },
                ],
                state: [0x304ACD77, 0x03D159CC, 0x69689233, 0x342C0F10],
            },
            PokeRadarNoChainState {
                advance: 1,
                sync: false,
                slot: 10,
                music: PokeRadarMusic::M,
                shiny: false,
                boosted: false,
                patches: [
                    PokeRadarPatch {
                        x: 3,
                        y: 5,
                        state: Empty,
                    },
                    PokeRadarPatch {
                        x: 3,
                        y: 2,
                        state: Good,
                    },
                    PokeRadarPatch {
                        x: 6,
                        y: 1,
                        state: Good,
                    },
                    PokeRadarPatch {
                        x: 1,
                        y: 0,
                        state: Good,
                    },
                    PokeRadarPatch {
                        x: 7,
                        y: 7,
                        state: Empty,
                    },
                ],
                state: [0x03D159CC, 0x69689233, 0x53190B98, 0xC12F0300],
            },
            PokeRadarNoChainState {
                advance: 2,
                sync: false,
                slot: 6,
                music: PokeRadarMusic::None,
                shiny: false,
                boosted: false,
                patches: [
                    PokeRadarPatch {
                        x: 5,
                        y: 3,
                        state: Good,
                    },
                    PokeRadarPatch {
                        x: 2,
                        y: 2,
                        state: Good,
                    },
                    PokeRadarPatch {
                        x: 7,
                        y: 2,
                        state: Good,
                    },
                    PokeRadarPatch {
                        x: 8,
                        y: 7,
                        state: Good,
                    },
                    PokeRadarPatch {
                        x: 2,
                        y: 4,
                        state: Empty,
                    },
                ],
                state: [0x69689233, 0xDC691A76, 0xD1911BB6, 0xEB59C229],
            },
            PokeRadarNoChainState {
                advance: 3,
                sync: false,
                slot: 7,
                music: PokeRadarMusic::None,
                shiny: false,
                boosted: false,
                patches: [
                    PokeRadarPatch {
                        x: 5,
                        y: 3,
                        state: Good,
                    },
                    PokeRadarPatch {
                        x: 2,
                        y: 2,
                        state: Empty,
                    },
                    PokeRadarPatch {
                        x: 7,
                        y: 1,
                        state: Good,
                    },
                    PokeRadarPatch {
                        x: 8,
                        y: 7,
                        state: Empty,
                    },
                    PokeRadarPatch {
                        x: 7,
                        y: 7,
                        state: Empty,
                    },
                ],
                state: [0xDC691A76, 0xD1911BB6, 0xBFED1415, 0x33449728],
            },
            PokeRadarNoChainState {
                advance: 4,
                sync: false,
                slot: 5,
                music: PokeRadarMusic::M,
                shiny: false,
                boosted: false,
                patches: [
                    PokeRadarPatch {
                        x: 3,
                        y: 3,
                        state: Empty,
                    },
                    PokeRadarPatch {
                        x: 2,
                        y: 2,
                        state: Good,
                    },
                    PokeRadarPatch {
                        x: 7,
                        y: 2,
                        state: Good,
                    },
                    PokeRadarPatch {
                        x: 8,
                        y: 7,
                        state: Good,
                    },
                    PokeRadarPatch {
                        x: 2,
                        y: 4,
                        state: Empty,
                    },
                ],
                state: [0xD1911BB6, 0x309D05FB, 0xCDCCCD60, 0x7CD9E2C3],
            },
            PokeRadarNoChainState {
                advance: 5,
                sync: true,
                slot: 2,
                music: PokeRadarMusic::None,
                shiny: false,
                boosted: false,
                patches: [
                    PokeRadarPatch {
                        x: 3,
                        y: 3,
                        state: Empty,
                    },
                    PokeRadarPatch {
                        x: 2,
                        y: 2,
                        state: Empty,
                    },
                    PokeRadarPatch {
                        x: 7,
                        y: 1,
                        state: Good,
                    },
                    PokeRadarPatch {
                        x: 8,
                        y: 7,
                        state: Empty,
                    },
                    PokeRadarPatch {
                        x: 7,
                        y: 7,
                        state: Empty,
                    },
                ],
                state: [0x309D05FB, 0x42BCDC8E, 0xD8A2DE68, 0xB7F466D5],
            },
            PokeRadarNoChainState {
                advance: 6,
                sync: true,
                slot: 9,
                music: PokeRadarMusic::None,
                shiny: false,
                boosted: false,
                patches: [
                    PokeRadarPatch {
                        x: 4,
                        y: 5,
                        state: Good,
                    },
                    PokeRadarPatch {
                        x: 6,
                        y: 2,
                        state: Good,
                    },
                    PokeRadarPatch {
                        x: 7,
                        y: 6,
                        state: Empty,
                    },
                    PokeRadarPatch {
                        x: 8,
                        y: 8,
                        state: Empty,
                    },
                    PokeRadarPatch {
                        x: 2,
                        y: 4,
                        state: Empty,
                    },
                ],
                state: [0x42BCDC8E, 0xD8A2DE68, 0xD2F76927, 0x138B5C98],
            },
            PokeRadarNoChainState {
                advance: 7,
                sync: false,
                slot: 2,
                music: PokeRadarMusic::None,
                shiny: false,
                boosted: false,
                patches: [
                    PokeRadarPatch {
                        x: 3,
                        y: 3,
                        state: Good,
                    },
                    PokeRadarPatch {
                        x: 6,
                        y: 3,
                        state: Good,
                    },
                    PokeRadarPatch {
                        x: 7,
                        y: 7,
                        state: Empty,
                    },
                    PokeRadarPatch {
                        x: 8,
                        y: 7,
                        state: Good,
                    },
                    PokeRadarPatch {
                        x: 2,
                        y: 6,
                        state: Empty,
                    },
                ],
                state: [0xD8A2DE68, 0x5D8778C9, 0xF0791F5C, 0xC3754E97],
            },
            PokeRadarNoChainState {
                advance: 8,
                sync: true,
                slot: 3,
                music: PokeRadarMusic::M,
                shiny: false,
                boosted: false,
                patches: [
                    PokeRadarPatch {
                        x: 3,
                        y: 3,
                        state: Empty,
                    },
                    PokeRadarPatch {
                        x: 6,
                        y: 2,
                        state: Good,
                    },
                    PokeRadarPatch {
                        x: 7,
                        y: 6,
                        state: Empty,
                    },
                    PokeRadarPatch {
                        x: 8,
                        y: 8,
                        state: Empty,
                    },
                    PokeRadarPatch {
                        x: 2,
                        y: 4,
                        state: Empty,
                    },
                ],
                state: [0x5D8778C9, 0x7F090EB2, 0x4B125918, 0xBD2A23DB],
            },
            PokeRadarNoChainState {
                advance: 9,
                sync: true,
                slot: 3,
                music: PokeRadarMusic::None,
                shiny: false,
                boosted: false,
                patches: [
                    PokeRadarPatch {
                        x: 5,
                        y: 3,
                        state: Good,
                    },
                    PokeRadarPatch {
                        x: 2,
                        y: 2,
                        state: Empty,
                    },
                    PokeRadarPatch {
                        x: 7,
                        y: 7,
                        state: Empty,
                    },
                    PokeRadarPatch {
                        x: 8,
                        y: 7,
                        state: Good,
                    },
                    PokeRadarPatch {
                        x: 2,
                        y: 6,
                        state: Empty,
                    },
                ],
                state: [0x7F090EB2, 0xC46248F6, 0x2BD2C2BA, 0x591B4393],
            },
        ];
        if let PokeRadarResult::NoChain(result) = result {
            assert_eq!(result.len(), expected.len());
            result
                .into_iter()
                .zip(expected.into_iter())
                .enumerate()
                .for_each(|(index, (result, expected))| {
                    assert_eq!(result, expected, "index: {}", index);
                });
        } else {
            panic!("Expected NoChain result");
        }
    }

    #[test]
    fn poke_radar_no_filter_no_chain_party() {
        let opts = PokeRadarOptions {
            state: [0x304ACD77, 0x03D159CC, 0x69689233, 0x342C0F10],
            initial_advances: 0,
            max_advances: 10,
            party_count: 5,
            chain: 0,
            bonus_music: false,
            filter_shiny: false,
            filter_slot: None,
        };
        let result = generate_poke_radar_states(opts);
        let expected = [
            PokeRadarNoChainState {
                advance: 0,
                sync: false,
                slot: 6,
                music: PokeRadarMusic::M,
                shiny: false,
                boosted: false,
                patches: [
                    PokeRadarPatch {
                        x: 3,
                        y: 4,
                        state: Good,
                    },
                    PokeRadarPatch {
                        x: 3,
                        y: 2,
                        state: Empty,
                    },
                    PokeRadarPatch {
                        x: 2,
                        y: 1,
                        state: Empty,
                    },
                    PokeRadarPatch {
                        x: 7,
                        y: 0,
                        state: Good,
                    },
                    PokeRadarPatch {
                        x: 7,
                        y: 7,
                        state: Empty,
                    },
                ],
                state: [0x304ACD77, 0x03D159CC, 0x69689233, 0x342C0F10],
            },
            PokeRadarNoChainState {
                advance: 1,
                sync: false,
                slot: 10,
                music: PokeRadarMusic::M,
                shiny: false,
                boosted: false,
                patches: [
                    PokeRadarPatch {
                        x: 3,
                        y: 5,
                        state: Empty,
                    },
                    PokeRadarPatch {
                        x: 3,
                        y: 2,
                        state: Good,
                    },
                    PokeRadarPatch {
                        x: 6,
                        y: 1,
                        state: Good,
                    },
                    PokeRadarPatch {
                        x: 1,
                        y: 0,
                        state: Good,
                    },
                    PokeRadarPatch {
                        x: 7,
                        y: 7,
                        state: Empty,
                    },
                ],
                state: [0x03D159CC, 0x69689233, 0x53190B98, 0xC12F0300],
            },
            PokeRadarNoChainState {
                advance: 2,
                sync: false,
                slot: 6,
                music: PokeRadarMusic::None,
                shiny: false,
                boosted: false,
                patches: [
                    PokeRadarPatch {
                        x: 5,
                        y: 3,
                        state: Good,
                    },
                    PokeRadarPatch {
                        x: 2,
                        y: 2,
                        state: Good,
                    },
                    PokeRadarPatch {
                        x: 7,
                        y: 2,
                        state: Good,
                    },
                    PokeRadarPatch {
                        x: 8,
                        y: 7,
                        state: Good,
                    },
                    PokeRadarPatch {
                        x: 2,
                        y: 4,
                        state: Empty,
                    },
                ],
                state: [0x69689233, 0xDC691A76, 0xD1911BB6, 0xEB59C229],
            },
            PokeRadarNoChainState {
                advance: 3,
                sync: false,
                slot: 7,
                music: PokeRadarMusic::None,
                shiny: false,
                boosted: false,
                patches: [
                    PokeRadarPatch {
                        x: 5,
                        y: 3,
                        state: Good,
                    },
                    PokeRadarPatch {
                        x: 2,
                        y: 2,
                        state: Empty,
                    },
                    PokeRadarPatch {
                        x: 7,
                        y: 1,
                        state: Good,
                    },
                    PokeRadarPatch {
                        x: 8,
                        y: 7,
                        state: Empty,
                    },
                    PokeRadarPatch {
                        x: 7,
                        y: 7,
                        state: Empty,
                    },
                ],
                state: [0xDC691A76, 0xD1911BB6, 0xBFED1415, 0x33449728],
            },
            PokeRadarNoChainState {
                advance: 4,
                sync: false,
                slot: 5,
                music: PokeRadarMusic::M,
                shiny: false,
                boosted: false,
                patches: [
                    PokeRadarPatch {
                        x: 3,
                        y: 3,
                        state: Empty,
                    },
                    PokeRadarPatch {
                        x: 2,
                        y: 2,
                        state: Good,
                    },
                    PokeRadarPatch {
                        x: 7,
                        y: 2,
                        state: Good,
                    },
                    PokeRadarPatch {
                        x: 8,
                        y: 7,
                        state: Good,
                    },
                    PokeRadarPatch {
                        x: 2,
                        y: 4,
                        state: Empty,
                    },
                ],
                state: [0xD1911BB6, 0x309D05FB, 0xCDCCCD60, 0x7CD9E2C3],
            },
            PokeRadarNoChainState {
                advance: 5,
                sync: true,
                slot: 2,
                music: PokeRadarMusic::None,
                shiny: false,
                boosted: false,
                patches: [
                    PokeRadarPatch {
                        x: 3,
                        y: 3,
                        state: Empty,
                    },
                    PokeRadarPatch {
                        x: 2,
                        y: 2,
                        state: Empty,
                    },
                    PokeRadarPatch {
                        x: 7,
                        y: 1,
                        state: Good,
                    },
                    PokeRadarPatch {
                        x: 8,
                        y: 7,
                        state: Empty,
                    },
                    PokeRadarPatch {
                        x: 7,
                        y: 7,
                        state: Empty,
                    },
                ],
                state: [0x309D05FB, 0x42BCDC8E, 0xD8A2DE68, 0xB7F466D5],
            },
            PokeRadarNoChainState {
                advance: 6,
                sync: true,
                slot: 9,
                music: PokeRadarMusic::None,
                shiny: false,
                boosted: false,
                patches: [
                    PokeRadarPatch {
                        x: 4,
                        y: 5,
                        state: Good,
                    },
                    PokeRadarPatch {
                        x: 6,
                        y: 2,
                        state: Good,
                    },
                    PokeRadarPatch {
                        x: 7,
                        y: 6,
                        state: Empty,
                    },
                    PokeRadarPatch {
                        x: 8,
                        y: 8,
                        state: Empty,
                    },
                    PokeRadarPatch {
                        x: 2,
                        y: 4,
                        state: Empty,
                    },
                ],
                state: [0x42BCDC8E, 0xD8A2DE68, 0xD2F76927, 0x138B5C98],
            },
            PokeRadarNoChainState {
                advance: 7,
                sync: false,
                slot: 2,
                music: PokeRadarMusic::None,
                shiny: false,
                boosted: false,
                patches: [
                    PokeRadarPatch {
                        x: 3,
                        y: 3,
                        state: Good,
                    },
                    PokeRadarPatch {
                        x: 6,
                        y: 3,
                        state: Good,
                    },
                    PokeRadarPatch {
                        x: 7,
                        y: 7,
                        state: Empty,
                    },
                    PokeRadarPatch {
                        x: 8,
                        y: 7,
                        state: Good,
                    },
                    PokeRadarPatch {
                        x: 2,
                        y: 6,
                        state: Empty,
                    },
                ],
                state: [0xD8A2DE68, 0x5D8778C9, 0xF0791F5C, 0xC3754E97],
            },
            PokeRadarNoChainState {
                advance: 8,
                sync: true,
                slot: 3,
                music: PokeRadarMusic::M,
                shiny: false,
                boosted: false,
                patches: [
                    PokeRadarPatch {
                        x: 3,
                        y: 3,
                        state: Empty,
                    },
                    PokeRadarPatch {
                        x: 6,
                        y: 2,
                        state: Good,
                    },
                    PokeRadarPatch {
                        x: 7,
                        y: 6,
                        state: Empty,
                    },
                    PokeRadarPatch {
                        x: 8,
                        y: 8,
                        state: Empty,
                    },
                    PokeRadarPatch {
                        x: 2,
                        y: 4,
                        state: Empty,
                    },
                ],
                state: [0x5D8778C9, 0x7F090EB2, 0x4B125918, 0xBD2A23DB],
            },
            PokeRadarNoChainState {
                advance: 9,
                sync: true,
                slot: 3,
                music: PokeRadarMusic::None,
                shiny: false,
                boosted: false,
                patches: [
                    PokeRadarPatch {
                        x: 5,
                        y: 3,
                        state: Good,
                    },
                    PokeRadarPatch {
                        x: 2,
                        y: 2,
                        state: Empty,
                    },
                    PokeRadarPatch {
                        x: 7,
                        y: 7,
                        state: Empty,
                    },
                    PokeRadarPatch {
                        x: 8,
                        y: 7,
                        state: Good,
                    },
                    PokeRadarPatch {
                        x: 2,
                        y: 6,
                        state: Empty,
                    },
                ],
                state: [0x7F090EB2, 0xC46248F6, 0x2BD2C2BA, 0x591B4393],
            },
        ];
        if let PokeRadarResult::NoChain(result) = result {
            assert_eq!(result.len(), expected.len());
            result
                .into_iter()
                .zip(expected.into_iter())
                .enumerate()
                .for_each(|(index, (result, expected))| {
                    assert_eq!(result, expected, "index: {}", index);
                });
        } else {
            panic!("Expected NoChain result");
        }
    }

    #[test]
    fn poke_radar_filter_chain_party() {
        let opts = PokeRadarOptions {
            state: [0x304ACD77, 0x03D159CC, 0x69689233, 0x342C0F10],
            initial_advances: 15000,
            max_advances: 15000,
            party_count: 5,
            chain: 4,
            bonus_music: false,
            filter_shiny: true,
            filter_slot: None,
        };
        let result = generate_poke_radar_states(opts);
        let expected = [
            PokeRadarChainState {
                advance: 16718,
                shiny: true,
                music: PokeRadarMusic::M,
                boosted: false,
                patches: [
                    PokeRadarPatch {
                        x: 3,
                        y: 5,
                        state: Empty,
                    },
                    PokeRadarPatch {
                        x: 6,
                        y: 5,
                        state: Empty,
                    },
                    PokeRadarPatch {
                        x: 3,
                        y: 1,
                        state: Shiny,
                    },
                    PokeRadarPatch {
                        x: 8,
                        y: 4,
                        state: Good,
                    },
                    PokeRadarPatch {
                        x: 2,
                        y: 2,
                        state: Empty,
                    },
                ],
                state: [0x027F3932, 0xBD3278F6, 0x82A5E8B0, 0xB4C4ACAE],
            },
            PokeRadarChainState {
                advance: 16721,
                shiny: true,
                music: PokeRadarMusic::None,
                boosted: false,
                patches: [
                    PokeRadarPatch {
                        x: 5,
                        y: 5,
                        state: Empty,
                    },
                    PokeRadarPatch {
                        x: 3,
                        y: 2,
                        state: Shiny,
                    },
                    PokeRadarPatch {
                        x: 7,
                        y: 4,
                        state: Good,
                    },
                    PokeRadarPatch {
                        x: 0,
                        y: 5,
                        state: Good,
                    },
                    PokeRadarPatch {
                        x: 2,
                        y: 4,
                        state: Empty,
                    },
                ],
                state: [0xC6449083, 0x425F8A93, 0x464B94FF, 0x9F6C7C1F],
            },
            PokeRadarChainState {
                advance: 16724,
                shiny: true,
                music: PokeRadarMusic::M,
                boosted: false,
                patches: [
                    PokeRadarPatch {
                        x: 3,
                        y: 3,
                        state: Shiny,
                    },
                    PokeRadarPatch {
                        x: 6,
                        y: 4,
                        state: Good,
                    },
                    PokeRadarPatch {
                        x: 1,
                        y: 5,
                        state: Good,
                    },
                    PokeRadarPatch {
                        x: 5,
                        y: 8,
                        state: Good,
                    },
                    PokeRadarPatch {
                        x: 1,
                        y: 4,
                        state: Empty,
                    },
                ],
                state: [0x1ABDF9C0, 0x40B7D205, 0xCBD89A51, 0x8564D8A9],
            },
            PokeRadarChainState {
                advance: 24407,
                shiny: true,
                music: PokeRadarMusic::None,
                boosted: false,
                patches: [
                    PokeRadarPatch {
                        x: 3,
                        y: 5,
                        state: Empty,
                    },
                    PokeRadarPatch {
                        x: 5,
                        y: 6,
                        state: Good,
                    },
                    PokeRadarPatch {
                        x: 1,
                        y: 7,
                        state: Empty,
                    },
                    PokeRadarPatch {
                        x: 2,
                        y: 0,
                        state: Shiny,
                    },
                    PokeRadarPatch {
                        x: 7,
                        y: 1,
                        state: Empty,
                    },
                ],
                state: [0x112A335B, 0xA49A53BB, 0x5A37B667, 0x32EDDA89],
            },
            PokeRadarChainState {
                advance: 24409,
                shiny: true,
                music: PokeRadarMusic::None,
                boosted: false,
                patches: [
                    PokeRadarPatch {
                        x: 3,
                        y: 4,
                        state: Empty,
                    },
                    PokeRadarPatch {
                        x: 3,
                        y: 2,
                        state: Empty,
                    },
                    PokeRadarPatch {
                        x: 1,
                        y: 7,
                        state: Empty,
                    },
                    PokeRadarPatch {
                        x: 2,
                        y: 0,
                        state: Shiny,
                    },
                    PokeRadarPatch {
                        x: 7,
                        y: 1,
                        state: Empty,
                    },
                ],
                state: [0x5A37B667, 0xF2C97A67, 0x64A709E0, 0x13A77899],
            },
            PokeRadarChainState {
                advance: 24410,
                shiny: true,
                music: PokeRadarMusic::M,
                boosted: false,
                patches: [
                    PokeRadarPatch {
                        x: 5,
                        y: 5,
                        state: Good,
                    },
                    PokeRadarPatch {
                        x: 2,
                        y: 6,
                        state: Empty,
                    },
                    PokeRadarPatch {
                        x: 2,
                        y: 1,
                        state: Shiny,
                    },
                    PokeRadarPatch {
                        x: 8,
                        y: 1,
                        state: Empty,
                    },
                    PokeRadarPatch {
                        x: 7,
                        y: 7,
                        state: Empty,
                    },
                ],
                state: [0xF2C97A67, 0xEBD7180E, 0xD2B9653F, 0x4E9E8AF5],
            },
            PokeRadarChainState {
                advance: 24412,
                shiny: true,
                music: PokeRadarMusic::M,
                boosted: false,
                patches: [
                    PokeRadarPatch {
                        x: 3,
                        y: 3,
                        state: Empty,
                    },
                    PokeRadarPatch {
                        x: 2,
                        y: 6,
                        state: Empty,
                    },
                    PokeRadarPatch {
                        x: 2,
                        y: 1,
                        state: Shiny,
                    },
                    PokeRadarPatch {
                        x: 8,
                        y: 1,
                        state: Empty,
                    },
                    PokeRadarPatch {
                        x: 7,
                        y: 7,
                        state: Empty,
                    },
                ],
                state: [0x5DC974D1, 0x4CF8330B, 0x9B1E2951, 0xF11E7701],
            },
            PokeRadarChainState {
                advance: 24415,
                shiny: true,
                music: PokeRadarMusic::M,
                boosted: false,
                patches: [
                    PokeRadarPatch {
                        x: 3,
                        y: 5,
                        state: Empty,
                    },
                    PokeRadarPatch {
                        x: 3,
                        y: 2,
                        state: Shiny,
                    },
                    PokeRadarPatch {
                        x: 7,
                        y: 2,
                        state: Empty,
                    },
                    PokeRadarPatch {
                        x: 8,
                        y: 4,
                        state: Empty,
                    },
                    PokeRadarPatch {
                        x: 4,
                        y: 6,
                        state: Empty,
                    },
                ],
                state: [0x92FDD273, 0x116FF956, 0x13F0AE9C, 0xCA6E992A],
            },
        ];
        if let PokeRadarResult::WithChain(result) = result {
            assert_eq!(result.len(), expected.len());
            result
                .into_iter()
                .zip(expected.into_iter())
                .enumerate()
                .for_each(|(index, (result, expected))| {
                    assert_eq!(result, expected, "index: {}", index);
                });
        } else {
            panic!("Expected WithChain result");
        }
    }

    #[test]
    fn poke_radar_no_filter_chain_party() {
        let opts = PokeRadarOptions {
            state: [0x304ACD77, 0x03D159CC, 0x69689233, 0x342C0F10],
            initial_advances: 15000,
            max_advances: 6,
            party_count: 5,
            chain: 4,
            bonus_music: false,
            filter_shiny: false,
            filter_slot: None,
        };
        let result = generate_poke_radar_states(opts);
        let expected = [
            PokeRadarChainState {
                advance: 15000,
                shiny: false,
                music: PokeRadarMusic::M,
                boosted: false,
                patches: [
                    PokeRadarPatch {
                        x: 3,
                        y: 5,
                        state: Empty,
                    },
                    PokeRadarPatch {
                        x: 6,
                        y: 6,
                        state: Empty,
                    },
                    PokeRadarPatch {
                        x: 4,
                        y: 1,
                        state: Good,
                    },
                    PokeRadarPatch {
                        x: 8,
                        y: 0,
                        state: Good,
                    },
                    PokeRadarPatch {
                        x: 5,
                        y: 4,
                        state: Empty,
                    },
                ],
                state: [0x8292558A, 0x026C9D5F, 0x3B3E9D20, 0xE258208E],
            },
            PokeRadarChainState {
                advance: 15001,
                shiny: false,
                music: PokeRadarMusic::None,
                boosted: false,
                patches: [
                    PokeRadarPatch {
                        x: 3,
                        y: 3,
                        state: Empty,
                    },
                    PokeRadarPatch {
                        x: 6,
                        y: 6,
                        state: Good,
                    },
                    PokeRadarPatch {
                        x: 3,
                        y: 1,
                        state: Good,
                    },
                    PokeRadarPatch {
                        x: 6,
                        y: 0,
                        state: Good,
                    },
                    PokeRadarPatch {
                        x: 7,
                        y: 3,
                        state: Empty,
                    },
                ],
                state: [0x026C9D5F, 0x3B3E9D20, 0x9F7BA61F, 0xDF34CED6],
            },
            PokeRadarChainState {
                advance: 15002,
                shiny: false,
                music: PokeRadarMusic::None,
                boosted: false,
                patches: [
                    PokeRadarPatch {
                        x: 5,
                        y: 3,
                        state: Empty,
                    },
                    PokeRadarPatch {
                        x: 6,
                        y: 2,
                        state: Empty,
                    },
                    PokeRadarPatch {
                        x: 2,
                        y: 7,
                        state: Good,
                    },
                    PokeRadarPatch {
                        x: 2,
                        y: 8,
                        state: Good,
                    },
                    PokeRadarPatch {
                        x: 6,
                        y: 5,
                        state: Empty,
                    },
                ],
                state: [0x3B3E9D20, 0x100BB7F1, 0x470E61BF, 0x5AD4431D],
            },
            PokeRadarChainState {
                advance: 15003,
                shiny: false,
                music: PokeRadarMusic::None,
                boosted: false,
                patches: [
                    PokeRadarPatch {
                        x: 5,
                        y: 5,
                        state: Empty,
                    },
                    PokeRadarPatch {
                        x: 4,
                        y: 2,
                        state: Good,
                    },
                    PokeRadarPatch {
                        x: 7,
                        y: 1,
                        state: Good,
                    },
                    PokeRadarPatch {
                        x: 8,
                        y: 0,
                        state: Good,
                    },
                    PokeRadarPatch {
                        x: 6,
                        y: 6,
                        state: Empty,
                    },
                ],
                state: [0x100BB7F1, 0xC87E7051, 0x86C9A6AD, 0xC3F3BF21],
            },
            PokeRadarChainState {
                advance: 15004,
                shiny: false,
                music: PokeRadarMusic::M,
                boosted: false,
                patches: [
                    PokeRadarPatch {
                        x: 5,
                        y: 5,
                        state: Good,
                    },
                    PokeRadarPatch {
                        x: 3,
                        y: 2,
                        state: Good,
                    },
                    PokeRadarPatch {
                        x: 5,
                        y: 1,
                        state: Good,
                    },
                    PokeRadarPatch {
                        x: 8,
                        y: 6,
                        state: Good,
                    },
                    PokeRadarPatch {
                        x: 2,
                        y: 2,
                        state: Empty,
                    },
                ],
                state: [0xC87E7051, 0x86C9A6AD, 0xD8CA3B17, 0x41CEC3A6],
            },
            PokeRadarChainState {
                advance: 15005,
                shiny: false,
                music: PokeRadarMusic::M,
                boosted: false,
                patches: [
                    PokeRadarPatch {
                        x: 5,
                        y: 3,
                        state: Empty,
                    },
                    PokeRadarPatch {
                        x: 2,
                        y: 6,
                        state: Good,
                    },
                    PokeRadarPatch {
                        x: 2,
                        y: 7,
                        state: Empty,
                    },
                    PokeRadarPatch {
                        x: 8,
                        y: 0,
                        state: Good,
                    },
                    PokeRadarPatch {
                        x: 6,
                        y: 6,
                        state: Empty,
                    },
                ],
                state: [0x86C9A6AD, 0xD8CA3B17, 0x84D7163D, 0x5BAF9448],
            },
        ];
        if let PokeRadarResult::WithChain(result) = result {
            assert_eq!(result.len(), expected.len());
            result
                .into_iter()
                .zip(expected.into_iter())
                .enumerate()
                .for_each(|(index, (result, expected))| {
                    assert_eq!(result, expected, "index: {}", index);
                });
        } else {
            panic!("Expected WithChain result");
        }
    }

    #[test]
    fn poke_radar_filter_slot() {
        let opts = PokeRadarOptions {
            state: [0x304ACD77, 0x03D159CC, 0x69689233, 0x342C0F10],
            initial_advances: 0,
            max_advances: 10,
            party_count: 1,
            chain: 0,
            bonus_music: false,
            filter_shiny: false,
            filter_slot: Some(3),
        };
        let result = generate_poke_radar_states(opts);
        let expected = [
            PokeRadarNoChainState {
                advance: 8,
                sync: true,
                slot: 3,
                music: PokeRadarMusic::M,
                shiny: false,
                boosted: false,
                patches: [
                    PokeRadarPatch {
                        x: 3,
                        y: 3,
                        state: Empty,
                    },
                    PokeRadarPatch {
                        x: 6,
                        y: 2,
                        state: Good,
                    },
                    PokeRadarPatch {
                        x: 7,
                        y: 6,
                        state: Empty,
                    },
                    PokeRadarPatch {
                        x: 8,
                        y: 8,
                        state: Empty,
                    },
                    PokeRadarPatch {
                        x: 2,
                        y: 4,
                        state: Empty,
                    },
                ],
                state: [0x5D8778C9, 0x7F090EB2, 0x4B125918, 0xBD2A23DB],
            },
            PokeRadarNoChainState {
                advance: 9,
                sync: true,
                slot: 3,
                music: PokeRadarMusic::None,
                shiny: false,
                boosted: false,
                patches: [
                    PokeRadarPatch {
                        x: 5,
                        y: 3,
                        state: Good,
                    },
                    PokeRadarPatch {
                        x: 2,
                        y: 2,
                        state: Empty,
                    },
                    PokeRadarPatch {
                        x: 7,
                        y: 7,
                        state: Empty,
                    },
                    PokeRadarPatch {
                        x: 8,
                        y: 7,
                        state: Good,
                    },
                    PokeRadarPatch {
                        x: 2,
                        y: 6,
                        state: Empty,
                    },
                ],
                state: [0x7F090EB2, 0xC46248F6, 0x2BD2C2BA, 0x591B4393],
            },
        ];
        if let PokeRadarResult::NoChain(result) = result {
            assert_eq!(result.len(), expected.len());
            result
                .into_iter()
                .zip(expected.into_iter())
                .enumerate()
                .for_each(|(index, (result, expected))| {
                    assert_eq!(result, expected, "index: {}", index);
                });
        } else {
            panic!("Expected NoChain result");
        }
    }

    #[test]
    fn do_not_filter_slot_on_chain() {
        let opts = PokeRadarOptions {
            state: [0x304ACD77, 0x03D159CC, 0x69689233, 0x342C0F10],
            initial_advances: 15000,
            max_advances: 6,
            party_count: 5,
            chain: 4,
            bonus_music: false,
            filter_shiny: false,
            filter_slot: Some(10),
        };
        let result = generate_poke_radar_states(opts);
        let expected = [
            PokeRadarChainState {
                advance: 15000,
                shiny: false,
                music: PokeRadarMusic::M,
                boosted: false,
                patches: [
                    PokeRadarPatch {
                        x: 3,
                        y: 5,
                        state: Empty,
                    },
                    PokeRadarPatch {
                        x: 6,
                        y: 6,
                        state: Empty,
                    },
                    PokeRadarPatch {
                        x: 4,
                        y: 1,
                        state: Good,
                    },
                    PokeRadarPatch {
                        x: 8,
                        y: 0,
                        state: Good,
                    },
                    PokeRadarPatch {
                        x: 5,
                        y: 4,
                        state: Empty,
                    },
                ],
                state: [0x8292558A, 0x026C9D5F, 0x3B3E9D20, 0xE258208E],
            },
            PokeRadarChainState {
                advance: 15001,
                shiny: false,
                music: PokeRadarMusic::None,
                boosted: false,
                patches: [
                    PokeRadarPatch {
                        x: 3,
                        y: 3,
                        state: Empty,
                    },
                    PokeRadarPatch {
                        x: 6,
                        y: 6,
                        state: Good,
                    },
                    PokeRadarPatch {
                        x: 3,
                        y: 1,
                        state: Good,
                    },
                    PokeRadarPatch {
                        x: 6,
                        y: 0,
                        state: Good,
                    },
                    PokeRadarPatch {
                        x: 7,
                        y: 3,
                        state: Empty,
                    },
                ],
                state: [0x026C9D5F, 0x3B3E9D20, 0x9F7BA61F, 0xDF34CED6],
            },
            PokeRadarChainState {
                advance: 15002,
                shiny: false,
                music: PokeRadarMusic::None,
                boosted: false,
                patches: [
                    PokeRadarPatch {
                        x: 5,
                        y: 3,
                        state: Empty,
                    },
                    PokeRadarPatch {
                        x: 6,
                        y: 2,
                        state: Empty,
                    },
                    PokeRadarPatch {
                        x: 2,
                        y: 7,
                        state: Good,
                    },
                    PokeRadarPatch {
                        x: 2,
                        y: 8,
                        state: Good,
                    },
                    PokeRadarPatch {
                        x: 6,
                        y: 5,
                        state: Empty,
                    },
                ],
                state: [0x3B3E9D20, 0x100BB7F1, 0x470E61BF, 0x5AD4431D],
            },
            PokeRadarChainState {
                advance: 15003,
                shiny: false,
                music: PokeRadarMusic::None,
                boosted: false,
                patches: [
                    PokeRadarPatch {
                        x: 5,
                        y: 5,
                        state: Empty,
                    },
                    PokeRadarPatch {
                        x: 4,
                        y: 2,
                        state: Good,
                    },
                    PokeRadarPatch {
                        x: 7,
                        y: 1,
                        state: Good,
                    },
                    PokeRadarPatch {
                        x: 8,
                        y: 0,
                        state: Good,
                    },
                    PokeRadarPatch {
                        x: 6,
                        y: 6,
                        state: Empty,
                    },
                ],
                state: [0x100BB7F1, 0xC87E7051, 0x86C9A6AD, 0xC3F3BF21],
            },
            PokeRadarChainState {
                advance: 15004,
                shiny: false,
                music: PokeRadarMusic::M,
                boosted: false,
                patches: [
                    PokeRadarPatch {
                        x: 5,
                        y: 5,
                        state: Good,
                    },
                    PokeRadarPatch {
                        x: 3,
                        y: 2,
                        state: Good,
                    },
                    PokeRadarPatch {
                        x: 5,
                        y: 1,
                        state: Good,
                    },
                    PokeRadarPatch {
                        x: 8,
                        y: 6,
                        state: Good,
                    },
                    PokeRadarPatch {
                        x: 2,
                        y: 2,
                        state: Empty,
                    },
                ],
                state: [0xC87E7051, 0x86C9A6AD, 0xD8CA3B17, 0x41CEC3A6],
            },
            PokeRadarChainState {
                advance: 15005,
                shiny: false,
                music: PokeRadarMusic::M,
                boosted: false,
                patches: [
                    PokeRadarPatch {
                        x: 5,
                        y: 3,
                        state: Empty,
                    },
                    PokeRadarPatch {
                        x: 2,
                        y: 6,
                        state: Good,
                    },
                    PokeRadarPatch {
                        x: 2,
                        y: 7,
                        state: Empty,
                    },
                    PokeRadarPatch {
                        x: 8,
                        y: 0,
                        state: Good,
                    },
                    PokeRadarPatch {
                        x: 6,
                        y: 6,
                        state: Empty,
                    },
                ],
                state: [0x86C9A6AD, 0xD8CA3B17, 0x84D7163D, 0x5BAF9448],
            },
        ];
        if let PokeRadarResult::WithChain(result) = result {
            assert_eq!(result.len(), expected.len());
            result
                .into_iter()
                .zip(expected.into_iter())
                .enumerate()
                .for_each(|(index, (result, expected))| {
                    assert_eq!(result, expected, "index: {}", index);
                });
        } else {
            panic!("Expected WithChain result");
        }
    }

    #[test]
    fn poke_radar_music() {
        for i in 0..2 {
            assert_eq!(PokeRadarMusic::new(i), PokeRadarMusic::A);
        }

        for i in 2..50 {
            assert_eq!(PokeRadarMusic::new(i), PokeRadarMusic::None);
        }

        for i in 50..100 {
            assert_eq!(PokeRadarMusic::new(i), PokeRadarMusic::M);
        }
    }
}
