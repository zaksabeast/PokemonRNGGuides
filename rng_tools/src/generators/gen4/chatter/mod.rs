use crate::rng::lcrng::Pokerng;
use serde::{Deserialize, Serialize};
use tsify::Tsify;
use wasm_bindgen::prelude::*;

#[derive(Debug, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub enum ChatterPitch {
    Low,
    MediumLow,
    Medium,
    MediumHigh,
    High,
}

impl ChatterPitch {
    fn from_value(value: u8) -> Self {
        use ChatterPitch::*;
        match value {
            0..20 => Low,
            20..40 => MediumLow,
            40..60 => Medium,
            60..80 => MediumHigh,
            _ => High,
        }
    }

    #[cfg(test)]
    fn from_pokefinder_str(str: &str) -> Self {
        match str {
            "L" => ChatterPitch::Low,
            "ML" => ChatterPitch::MediumLow,
            "M" => ChatterPitch::Medium,
            "MH" => ChatterPitch::MediumHigh,
            "H" => ChatterPitch::High,
            _ => panic!("Unknown pitch string: {}", str),
        }
    }
}

fn get_pitch(rand: u32) -> u8 {
    ((rand % 8192).wrapping_mul(100) >> 13) as u8
}

#[derive(Debug, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct ChatterOpts {
    pub seed: u32,
    pub initial_advances: usize,
    pub max_advances: usize,
}

#[derive(Debug, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct ChatterState {
    pub pitch: ChatterPitch,
    pub pitch_value: u8,
    pub advance: usize,
}

impl ChatterState {
    fn new(rand: u32, advance: usize) -> Self {
        let pitch_value = get_pitch(rand);
        Self {
            advance,
            pitch_value,
            pitch: ChatterPitch::from_value(pitch_value),
        }
    }
}

#[wasm_bindgen]
pub fn get_chatters(opts: &ChatterOpts) -> Vec<ChatterState> {
    Pokerng::new(opts.seed)
        .enumerate()
        .skip(opts.initial_advances)
        .take(opts.max_advances.wrapping_add(1))
        .map(|(advance, rand)| ChatterState::new(rand >> 16, advance))
        .collect()
}

#[cfg(test)]
mod tests {
    use crate::assert_list_eq;

    use super::*;

    fn parse_chatters(str: &str) -> Vec<ChatterState> {
        str.lines()
            .map(|raw_line| {
                let line = raw_line.trim();

                if line.is_empty() {
                    panic!("Empty line in chatter data");
                }

                let mut parts = line.split("\t");
                let advance: usize = parts.next().unwrap().parse().unwrap();
                let _elm_call = parts.next().unwrap(); // Not used in tests
                let mut pitch_and_value_str = parts.next().unwrap().split_whitespace();
                let pitch_str = pitch_and_value_str.next().unwrap();
                let pitch_value: u8 = pitch_and_value_str.next().unwrap().parse().unwrap();

                ChatterState {
                    advance,
                    pitch_value,
                    pitch: ChatterPitch::from_pokefinder_str(pitch_str),
                }
            })
            .collect()
    }

    macro_rules! pokefinder {
        ($file:expr) => {
            parse_chatters(include_str!($file))
        };
    }

    #[test]
    fn base() {
        let opts = ChatterOpts {
            seed: 0,
            initial_advances: 0,
            max_advances: 200,
        };
        let result = get_chatters(&opts);
        let expected = pokefinder!("test_data/base.txt");
        assert_list_eq!(result, expected);
    }

    #[test]
    fn initial_advances() {
        let opts = ChatterOpts {
            seed: 0,
            initial_advances: 10,
            max_advances: 200,
        };
        let result = get_chatters(&opts);
        let expected = pokefinder!("test_data/initial_advances.txt");
        assert_list_eq!(result, expected);
    }
}
