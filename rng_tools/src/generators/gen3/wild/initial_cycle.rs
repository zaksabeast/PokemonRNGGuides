use serde::{Deserialize, Serialize};
use tsify::Tsify;

use crate::gen3::CycleRange;

use super::cdf::{CdfKnot, cdf_median, cdf_probability};
use super::{ALL_WILD3_ACTIONS, Wild3Action};

#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize, Tsify)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub enum Wild3PlayingSong {
    MapSong,
    BikeSong,
    SurfSong,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize, Tsify, Default)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub enum Wild3Weather {
    #[default]
    Sunny,
    Rain,
    Thunderstorm,
}

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize, Tsify)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct Wild3InitialCycleDistribution {
    pub min: usize,
    pub max: usize,
    pub distribution: Vec<CdfKnot>,
    pub action: Wild3Action,
    pub playing_song: Wild3PlayingSong,
    pub weather: Wild3Weather,
}

impl Wild3InitialCycleDistribution {
    pub fn new_default(action: Wild3Action) -> &'static Self {
        static DEFAULTS_INITIAL_DISTRS_BY_ACTION: std::sync::LazyLock<
            [Wild3InitialCycleDistribution; 6],
        > = std::sync::LazyLock::new(|| {
            ALL_WILD3_ACTIONS.map(Wild3InitialCycleDistribution::build_default)
        });

        &DEFAULTS_INITIAL_DISTRS_BY_ACTION[action as usize]
    }

    fn build_default(action: Wild3Action) -> Self {
        let min = if action == Wild3Action::RockSmash {
            30_000
        } else {
            45_000
        };
        let max = 75_000;
        let playing_song = if action == Wild3Action::SweetScentWater {
            Wild3PlayingSong::SurfSong
        } else {
            Wild3PlayingSong::MapSong
        };

        Self {
            min,
            max,
            distribution: vec![
                CdfKnot {
                    cycle: min as f64,
                    probability: 0.0,
                },
                CdfKnot {
                    cycle: max as f64,
                    probability: 1.0,
                },
            ],
            action,
            playing_song,
            weather: Wild3Weather::Sunny,
        }
    }

    pub fn to_min_max(&self) -> (usize, usize) {
        (self.min, self.max)
    }

    pub fn probability_for_range(&self, range: &CycleRange<i32>) -> f64 {
        let start = range.start as f64;
        let end = start + range.len as f64;

        self.probability(start, end)
    }

    pub fn probability(&self, start: f64, end: f64) -> f64 {
        cdf_probability(&self.distribution, start, end)
    }

    pub fn median(&self) -> usize {
        match cdf_median(&self.distribution) {
            Some(cycle) => cycle.ceil() as usize,
            None => self.min + (self.max - self.min) / 2,
        }
    }
}
