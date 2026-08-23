use super::utils::{Gen6SlotType, find_item};
use crate::rng::{Rng, StateIterator, tinymt::TinyMT};
use serde::{Deserialize, Serialize};
use tsify::Tsify;
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
    pub seed: u32,
    pub party_count: usize,
    pub initial_advances: usize,
    pub max_advances: usize,
    pub chain: u8,
    pub bonus_music: bool,
    pub filter_shiny: bool,
    pub filter_slot: Option<u8>,
}

#[derive(Debug, Default, Clone, Copy, PartialEq, Tsify, Serialize, Deserialize)]
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
    fn to_no_chain(&self) -> PokeRadarNoChainState {
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

    fn to_chain(&self) -> PokeRadarChainState {
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
    let mut result = PokeRadarConsolidatedState {
        advance,
        state: rng.get_state(),
        ..Default::default()
    };

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

            // Default to Bad; update to Good/Shiny if good rate check passes
            patch.state = PokeRadarPatchState::Bad;

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
    let rng = TinyMT::new(opts.seed);
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
    use crate::assert_list_eq;

    #[derive(Debug, PartialEq)]
    struct TinyFinderState {
        advance: usize,
        shiny: bool,
        music: PokeRadarMusic,
        state: [u32; 4],
    }

    impl From<PokeRadarNoChainState> for TinyFinderState {
        fn from(state: PokeRadarNoChainState) -> Self {
            TinyFinderState {
                advance: state.advance,
                shiny: state.shiny,
                music: state.music,
                state: state.state,
            }
        }
    }

    impl From<PokeRadarChainState> for TinyFinderState {
        fn from(state: PokeRadarChainState) -> Self {
            TinyFinderState {
                advance: state.advance,
                shiny: state.shiny,
                music: state.music,
                state: state.state,
            }
        }
    }

    #[derive(Debug, PartialEq)]
    struct TinyFinderNoChainState {
        advance: usize,
        sync: bool,
        slot: u8,
        music: PokeRadarMusic,
        state: [u32; 4],
    }

    impl From<PokeRadarNoChainState> for TinyFinderNoChainState {
        fn from(state: PokeRadarNoChainState) -> Self {
            TinyFinderNoChainState {
                advance: state.advance,
                sync: state.sync,
                slot: state.slot,
                music: state.music,
                state: state.state,
            }
        }
    }

    fn parse_tinyfinder(str: &str) -> Vec<TinyFinderState> {
        str.lines()
            .map(|raw_line| {
                let line = raw_line.trim();

                if line.is_empty() {
                    panic!("Empty line in TinyFinder data");
                }

                let mut parts = line.split("\t");
                let advance: usize = parts.next().unwrap().parse().unwrap();
                let shiny: bool = parts.next().unwrap() == "True";
                let music_str = parts.next().unwrap();
                let mut state: [u32; 4] = [
                    u32::from_str_radix(parts.next().unwrap(), 16).unwrap(),
                    u32::from_str_radix(parts.next().unwrap(), 16).unwrap(),
                    u32::from_str_radix(parts.next().unwrap(), 16).unwrap(),
                    u32::from_str_radix(parts.next().unwrap(), 16).unwrap(),
                ];
                state.reverse();

                let music = match music_str {
                    "M" => PokeRadarMusic::M,
                    "A" => PokeRadarMusic::A,
                    "-" => PokeRadarMusic::None,
                    _ => panic!("Unknown music string: {}", music_str),
                };

                TinyFinderState {
                    advance,
                    shiny,
                    music,
                    state,
                }
            })
            .collect()
    }

    fn parse_tinyfinder_no_chain(str: &str) -> Vec<TinyFinderNoChainState> {
        str.lines()
            .map(|raw_line| {
                let line = raw_line.trim();

                if line.is_empty() {
                    panic!("Empty line in TinyFinder no-chain data");
                }

                let mut parts = line.split("\t");
                let advance: usize = parts.next().unwrap().parse().unwrap();
                let sync: bool = parts.next().unwrap() == "True";
                let slot: u8 = parts.next().unwrap().parse().unwrap();
                let _species = parts.next().unwrap(); // Not used in tests
                let _level = parts.next().unwrap(); // Not used in tests
                let music_str = parts.next().unwrap();
                let _held_item = parts.next().unwrap(); // Not used in tests
                let mut state: [u32; 4] = [
                    u32::from_str_radix(parts.next().unwrap(), 16).unwrap(),
                    u32::from_str_radix(parts.next().unwrap(), 16).unwrap(),
                    u32::from_str_radix(parts.next().unwrap(), 16).unwrap(),
                    u32::from_str_radix(parts.next().unwrap(), 16).unwrap(),
                ];
                state.reverse();

                let music = match music_str {
                    "M" => PokeRadarMusic::M,
                    "A" => PokeRadarMusic::A,
                    "-" => PokeRadarMusic::None,
                    _ => panic!("Unknown music string: {}", music_str),
                };

                TinyFinderNoChainState {
                    advance,
                    sync,
                    slot,
                    music,
                    state,
                }
            })
            .collect()
    }

    macro_rules! tinyfinder {
        ($file:expr) => {
            parse_tinyfinder(include_str!($file))
        };
    }

    macro_rules! tinyfinder_no_chain {
        ($file:expr) => {
            parse_tinyfinder_no_chain(include_str!($file))
        };
    }

    #[test]
    fn poke_radar_no_filter_no_chain_no_party() {
        let opts = PokeRadarOptions {
            seed: 0xaabbccdd,
            initial_advances: 0,
            max_advances: 100,
            party_count: 1,
            chain: 0,
            bonus_music: false,
            filter_shiny: false,
            filter_slot: None,
        };
        let results = generate_poke_radar_states(opts);
        let expected = tinyfinder_no_chain!("test_data/poke_radar_no_filter_no_chain_no_party.txt");
        if let PokeRadarResult::NoChain(results) = results {
            let results = results
                .into_iter()
                .map(TinyFinderNoChainState::from)
                .collect::<Vec<_>>();
            assert_list_eq!(results, expected);
        } else {
            panic!("Expected NoChain result");
        }
    }

    #[test]
    fn poke_radar_no_filter_no_chain_party() {
        let opts = PokeRadarOptions {
            seed: 0xaabbccdd,
            initial_advances: 0,
            max_advances: 100,
            party_count: 5,
            chain: 0,
            bonus_music: false,
            filter_shiny: false,
            filter_slot: None,
        };
        let results = generate_poke_radar_states(opts);
        let expected = tinyfinder_no_chain!("test_data/poke_radar_no_filter_no_chain_party.txt");
        if let PokeRadarResult::NoChain(results) = results {
            let results = results
                .into_iter()
                .map(TinyFinderNoChainState::from)
                .collect::<Vec<_>>();
            assert_list_eq!(results, expected);
        } else {
            panic!("Expected NoChain result");
        }
    }

    #[test]
    fn poke_radar_filter_chain_party() {
        let opts = PokeRadarOptions {
            seed: 0xaabbccdd,
            initial_advances: 15000,
            max_advances: 15000,
            party_count: 5,
            chain: 4,
            bonus_music: false,
            filter_shiny: true,
            filter_slot: None,
        };
        let results = generate_poke_radar_states(opts);
        let expected = tinyfinder!("test_data/poke_radar_filter_chain_party.txt");
        if let PokeRadarResult::WithChain(results) = results {
            let results = results
                .into_iter()
                .map(TinyFinderState::from)
                .collect::<Vec<_>>();
            assert_list_eq!(results, expected);
        } else {
            panic!("Expected WithChain result");
        }
    }

    #[test]
    fn poke_radar_no_filter_chain_party() {
        let opts = PokeRadarOptions {
            seed: 0xaabbccdd,
            initial_advances: 15000,
            max_advances: 100,
            party_count: 5,
            chain: 4,
            bonus_music: false,
            filter_shiny: false,
            filter_slot: None,
        };
        let results = generate_poke_radar_states(opts);
        let expected = tinyfinder!("test_data/poke_radar_no_filter_chain_party.txt");
        if let PokeRadarResult::WithChain(results) = results {
            let results = results
                .into_iter()
                .map(TinyFinderState::from)
                .collect::<Vec<_>>();
            assert_list_eq!(results, expected);
        } else {
            panic!("Expected WithChain result");
        }
    }

    #[test]
    fn poke_radar_filter_slot() {
        let opts = PokeRadarOptions {
            seed: 0xaabbccdd,
            initial_advances: 0,
            max_advances: 100,
            party_count: 1,
            chain: 0,
            bonus_music: false,
            filter_shiny: false,
            filter_slot: Some(3),
        };
        let results = generate_poke_radar_states(opts);
        let expected = tinyfinder_no_chain!("test_data/poke_radar_filter_slot.txt");
        if let PokeRadarResult::NoChain(results) = results {
            let results = results
                .into_iter()
                .map(TinyFinderNoChainState::from)
                .collect::<Vec<_>>();
            assert_list_eq!(results, expected);
        } else {
            panic!("Expected NoChain result");
        }
    }

    #[test]
    fn do_not_filter_slot_on_chain() {
        let opts = PokeRadarOptions {
            seed: 0xaabbccdd,
            initial_advances: 15000,
            max_advances: 100,
            party_count: 5,
            chain: 4,
            bonus_music: false,
            filter_shiny: false,
            filter_slot: Some(10),
        };
        let results = generate_poke_radar_states(opts);
        let expected = tinyfinder!("test_data/do_not_filter_slot_on_chain.txt");
        if let PokeRadarResult::WithChain(results) = results {
            let results = results
                .into_iter()
                .map(TinyFinderState::from)
                .collect::<Vec<_>>();
            assert_list_eq!(results, expected);
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

    #[test]
    fn generates_chain_patches() {
        let opts = PokeRadarOptions {
            seed: 0xaabbccdd,
            initial_advances: 0,
            max_advances: 20,
            party_count: 5,
            chain: 4,
            bonus_music: false,
            filter_shiny: false,
            filter_slot: None,
        };
        let results = generate_poke_radar_states(opts);
        let expected = [
            [
                PokeRadarPatch {
                    x: 5,
                    y: 3,
                    state: Bad,
                },
                PokeRadarPatch {
                    x: 4,
                    y: 2,
                    state: Good,
                },
                PokeRadarPatch {
                    x: 1,
                    y: 5,
                    state: Bad,
                },
                PokeRadarPatch {
                    x: 4,
                    y: 8,
                    state: Good,
                },
                PokeRadarPatch {
                    x: 2,
                    y: 1,
                    state: Empty,
                },
            ],
            [
                PokeRadarPatch {
                    x: 5,
                    y: 3,
                    state: Good,
                },
                PokeRadarPatch {
                    x: 2,
                    y: 6,
                    state: Bad,
                },
                PokeRadarPatch {
                    x: 1,
                    y: 7,
                    state: Good,
                },
                PokeRadarPatch {
                    x: 0,
                    y: 5,
                    state: Bad,
                },
                PokeRadarPatch {
                    x: 4,
                    y: 5,
                    state: Empty,
                },
            ],
            [
                PokeRadarPatch {
                    x: 3,
                    y: 3,
                    state: Bad,
                },
                PokeRadarPatch {
                    x: 5,
                    y: 2,
                    state: Bad,
                },
                PokeRadarPatch {
                    x: 1,
                    y: 5,
                    state: Bad,
                },
                PokeRadarPatch {
                    x: 4,
                    y: 8,
                    state: Good,
                },
                PokeRadarPatch {
                    x: 2,
                    y: 1,
                    state: Empty,
                },
            ],
            [
                PokeRadarPatch {
                    x: 4,
                    y: 3,
                    state: Good,
                },
                PokeRadarPatch {
                    x: 2,
                    y: 5,
                    state: Bad,
                },
                PokeRadarPatch {
                    x: 4,
                    y: 7,
                    state: Bad,
                },
                PokeRadarPatch {
                    x: 0,
                    y: 5,
                    state: Bad,
                },
                PokeRadarPatch {
                    x: 4,
                    y: 5,
                    state: Empty,
                },
            ],
            [
                PokeRadarPatch {
                    x: 3,
                    y: 5,
                    state: Bad,
                },
                PokeRadarPatch {
                    x: 6,
                    y: 5,
                    state: Bad,
                },
                PokeRadarPatch {
                    x: 7,
                    y: 4,
                    state: Good,
                },
                PokeRadarPatch {
                    x: 0,
                    y: 7,
                    state: Good,
                },
                PokeRadarPatch {
                    x: 4,
                    y: 6,
                    state: Empty,
                },
            ],
            [
                PokeRadarPatch {
                    x: 5,
                    y: 3,
                    state: Bad,
                },
                PokeRadarPatch {
                    x: 2,
                    y: 5,
                    state: Bad,
                },
                PokeRadarPatch {
                    x: 4,
                    y: 7,
                    state: Bad,
                },
                PokeRadarPatch {
                    x: 0,
                    y: 5,
                    state: Bad,
                },
                PokeRadarPatch {
                    x: 4,
                    y: 5,
                    state: Empty,
                },
            ],
            [
                PokeRadarPatch {
                    x: 3,
                    y: 5,
                    state: Bad,
                },
                PokeRadarPatch {
                    x: 2,
                    y: 6,
                    state: Bad,
                },
                PokeRadarPatch {
                    x: 6,
                    y: 7,
                    state: Good,
                },
                PokeRadarPatch {
                    x: 2,
                    y: 0,
                    state: Good,
                },
                PokeRadarPatch {
                    x: 4,
                    y: 2,
                    state: Empty,
                },
            ],
            [
                PokeRadarPatch {
                    x: 5,
                    y: 4,
                    state: Bad,
                },
                PokeRadarPatch {
                    x: 6,
                    y: 4,
                    state: Bad,
                },
                PokeRadarPatch {
                    x: 7,
                    y: 5,
                    state: Bad,
                },
                PokeRadarPatch {
                    x: 8,
                    y: 0,
                    state: Good,
                },
                PokeRadarPatch {
                    x: 3,
                    y: 3,
                    state: Empty,
                },
            ],
            [
                PokeRadarPatch {
                    x: 3,
                    y: 4,
                    state: Bad,
                },
                PokeRadarPatch {
                    x: 4,
                    y: 6,
                    state: Bad,
                },
                PokeRadarPatch {
                    x: 1,
                    y: 5,
                    state: Bad,
                },
                PokeRadarPatch {
                    x: 2,
                    y: 0,
                    state: Good,
                },
                PokeRadarPatch {
                    x: 4,
                    y: 2,
                    state: Empty,
                },
            ],
            [
                PokeRadarPatch {
                    x: 3,
                    y: 5,
                    state: Bad,
                },
                PokeRadarPatch {
                    x: 5,
                    y: 6,
                    state: Bad,
                },
                PokeRadarPatch {
                    x: 1,
                    y: 6,
                    state: Good,
                },
                PokeRadarPatch {
                    x: 0,
                    y: 2,
                    state: Good,
                },
                PokeRadarPatch {
                    x: 1,
                    y: 2,
                    state: Empty,
                },
            ],
            [
                PokeRadarPatch {
                    x: 5,
                    y: 4,
                    state: Bad,
                },
                PokeRadarPatch {
                    x: 6,
                    y: 5,
                    state: Bad,
                },
                PokeRadarPatch {
                    x: 7,
                    y: 1,
                    state: Good,
                },
                PokeRadarPatch {
                    x: 5,
                    y: 8,
                    state: Good,
                },
                PokeRadarPatch {
                    x: 2,
                    y: 2,
                    state: Empty,
                },
            ],
            [
                PokeRadarPatch {
                    x: 4,
                    y: 5,
                    state: Bad,
                },
                PokeRadarPatch {
                    x: 2,
                    y: 5,
                    state: Bad,
                },
                PokeRadarPatch {
                    x: 2,
                    y: 1,
                    state: Bad,
                },
                PokeRadarPatch {
                    x: 0,
                    y: 2,
                    state: Good,
                },
                PokeRadarPatch {
                    x: 1,
                    y: 2,
                    state: Empty,
                },
            ],
            [
                PokeRadarPatch {
                    x: 5,
                    y: 5,
                    state: Bad,
                },
                PokeRadarPatch {
                    x: 2,
                    y: 6,
                    state: Good,
                },
                PokeRadarPatch {
                    x: 1,
                    y: 3,
                    state: Good,
                },
                PokeRadarPatch {
                    x: 0,
                    y: 4,
                    state: Good,
                },
                PokeRadarPatch {
                    x: 2,
                    y: 3,
                    state: Empty,
                },
            ],
            [
                PokeRadarPatch {
                    x: 5,
                    y: 4,
                    state: Bad,
                },
                PokeRadarPatch {
                    x: 6,
                    y: 2,
                    state: Good,
                },
                PokeRadarPatch {
                    x: 4,
                    y: 7,
                    state: Good,
                },
                PokeRadarPatch {
                    x: 0,
                    y: 1,
                    state: Good,
                },
                PokeRadarPatch {
                    x: 4,
                    y: 6,
                    state: Empty,
                },
            ],
            [
                PokeRadarPatch {
                    x: 3,
                    y: 4,
                    state: Bad,
                },
                PokeRadarPatch {
                    x: 3,
                    y: 2,
                    state: Bad,
                },
                PokeRadarPatch {
                    x: 1,
                    y: 3,
                    state: Good,
                },
                PokeRadarPatch {
                    x: 0,
                    y: 4,
                    state: Good,
                },
                PokeRadarPatch {
                    x: 2,
                    y: 3,
                    state: Empty,
                },
            ],
            [
                PokeRadarPatch {
                    x: 3,
                    y: 5,
                    state: Good,
                },
                PokeRadarPatch {
                    x: 2,
                    y: 3,
                    state: Bad,
                },
                PokeRadarPatch {
                    x: 4,
                    y: 1,
                    state: Bad,
                },
                PokeRadarPatch {
                    x: 0,
                    y: 1,
                    state: Good,
                },
                PokeRadarPatch {
                    x: 4,
                    y: 6,
                    state: Empty,
                },
            ],
            [
                PokeRadarPatch {
                    x: 5,
                    y: 3,
                    state: Bad,
                },
                PokeRadarPatch {
                    x: 2,
                    y: 4,
                    state: Good,
                },
                PokeRadarPatch {
                    x: 1,
                    y: 5,
                    state: Good,
                },
                PokeRadarPatch {
                    x: 0,
                    y: 4,
                    state: Good,
                },
                PokeRadarPatch {
                    x: 5,
                    y: 4,
                    state: Empty,
                },
            ],
            [
                PokeRadarPatch {
                    x: 3,
                    y: 3,
                    state: Bad,
                },
                PokeRadarPatch {
                    x: 2,
                    y: 3,
                    state: Bad,
                },
                PokeRadarPatch {
                    x: 4,
                    y: 1,
                    state: Bad,
                },
                PokeRadarPatch {
                    x: 0,
                    y: 1,
                    state: Good,
                },
                PokeRadarPatch {
                    x: 4,
                    y: 6,
                    state: Empty,
                },
            ],
            [
                PokeRadarPatch {
                    x: 4,
                    y: 5,
                    state: Bad,
                },
                PokeRadarPatch {
                    x: 4,
                    y: 6,
                    state: Good,
                },
                PokeRadarPatch {
                    x: 1,
                    y: 2,
                    state: Good,
                },
                PokeRadarPatch {
                    x: 0,
                    y: 3,
                    state: Good,
                },
                PokeRadarPatch {
                    x: 5,
                    y: 2,
                    state: Empty,
                },
            ],
            [
                PokeRadarPatch {
                    x: 3,
                    y: 4,
                    state: Bad,
                },
                PokeRadarPatch {
                    x: 2,
                    y: 3,
                    state: Bad,
                },
                PokeRadarPatch {
                    x: 1,
                    y: 4,
                    state: Good,
                },
                PokeRadarPatch {
                    x: 0,
                    y: 5,
                    state: Good,
                },
                PokeRadarPatch {
                    x: 1,
                    y: 7,
                    state: Empty,
                },
            ],
        ];
        if let PokeRadarResult::WithChain(results) = results {
            let results = results
                .into_iter()
                .map(|res| res.patches)
                .collect::<Vec<_>>();
            assert_list_eq!(results, expected);
        } else {
            panic!("Expected WithChain result");
        }
    }

    #[test]
    fn generates_shiny_patches() {
        let opts = PokeRadarOptions {
            seed: 0xaabbccdd,
            initial_advances: 15000,
            max_advances: 15000,
            party_count: 5,
            chain: 4,
            bonus_music: false,
            filter_shiny: true,
            filter_slot: None,
        };
        let results = generate_poke_radar_states(opts);
        let expected = [[
            PokeRadarPatch {
                x: 3,
                y: 4,
                state: Bad,
            },
            PokeRadarPatch {
                x: 2,
                y: 6,
                state: Good,
            },
            PokeRadarPatch {
                x: 7,
                y: 6,
                state: Shiny,
            },
            PokeRadarPatch {
                x: 2,
                y: 0,
                state: Good,
            },
            PokeRadarPatch {
                x: 2,
                y: 2,
                state: Empty,
            },
        ]];
        if let PokeRadarResult::WithChain(results) = results {
            let results = results
                .into_iter()
                .map(|res| res.patches)
                .collect::<Vec<_>>();
            assert_list_eq!(results, expected);
        } else {
            panic!("Expected WithChain result");
        }
    }
}
