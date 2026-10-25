use serde::{Deserialize, Serialize};
use tsify::Tsify;

use crate::gen3::CycleRange;

use super::{MinMidMax, Wild3Action, Wild3MapGameData};

#[derive(Debug, Clone, Copy, PartialEq, Serialize, Deserialize, Tsify)]
pub struct CdfKnot {
    pub cycle: f64,
    pub probability: f64,
}

pub fn cdf_less_than(knots: &[CdfKnot], cycle: f64) -> f64 {
    let index = knots.partition_point(|knot| knot.cycle < cycle);
    if index == 0 {
        return 0.0;
    }

    let left = knots[index - 1];
    let Some(right) = knots.get(index) else {
        return 1.0;
    };

    if cycle == right.cycle {
        return right.probability;
    }

    left.probability
        + (right.probability - left.probability) * (cycle - left.cycle) / (right.cycle - left.cycle)
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize, Tsify)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub enum Wild3MovementMode {
    OnFoot,
    Bike,
    Surf,
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
    pub movement: Wild3MovementMode,
    pub weather: Wild3Weather,
}

impl Wild3InitialCycleDistribution {
    pub fn new_default(action: Wild3Action) -> &'static Self {
        static DEFAULTS_INITIAL_DISTRS_BY_ACTION: std::sync::LazyLock<
            [Wild3InitialCycleDistribution; 6],
        > = std::sync::LazyLock::new(|| {
            [
                Wild3Action::SweetScentLand,
                Wild3Action::SweetScentWater,
                Wild3Action::OldRod,
                Wild3Action::GoodRod,
                Wild3Action::SuperRod,
                Wild3Action::RockSmash,
            ]
            .map(Wild3InitialCycleDistribution::build_default)
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
        let movement = if action == Wild3Action::SweetScentWater {
            Wild3MovementMode::Surf
        } else {
            Wild3MovementMode::OnFoot
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
            movement,
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
        if end <= start {
            return 0.0;
        }

        (cdf_less_than(&self.distribution, end) - cdf_less_than(&self.distribution, start))
            .clamp(0.0, 1.0)
    }

    pub fn median(&self) -> usize {
        let index = self
            .distribution
            .partition_point(|knot| knot.probability < 0.5);
        let Some(right) = self.distribution.get(index) else {
            return self.min + (self.max - self.min) / 2;
        };

        let Some(left) = index
            .checked_sub(1)
            .and_then(|index| self.distribution.get(index))
        else {
            return right.cycle.ceil() as usize;
        };

        let fraction = (0.5 - left.probability) / (right.probability - left.probability);

        (left.cycle + fraction * (right.cycle - left.cycle)).ceil() as usize
    }
}
