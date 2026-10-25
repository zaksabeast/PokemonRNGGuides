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
pub struct Wild3MapCycleCalibration {
    pub min: usize,
    pub max: usize,
    pub distribution: Vec<CdfKnot>,
    pub action: Wild3Action,
    pub movement: Wild3MovementMode,
    pub weather: Wild3Weather,
}

impl Wild3MapCycleCalibration {
    pub fn new_dummy() -> Self {
        Self {
            min: 30_000,
            max: 70_000,
            distribution: vec![
                CdfKnot {
                    cycle: 30_000.0,
                    probability: 0.0,
                },
                CdfKnot {
                    cycle: 70_000.0,
                    probability: 1.0,
                },
            ],
            action: Wild3Action::SweetScentLand,
            movement: Wild3MovementMode::OnFoot,
            weather: Wild3Weather::Sunny,
        }
    }

    pub fn to_min_mid_max(&self) -> MinMidMax {
        MinMidMax::new(self.min, self.median(), self.max)
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

pub(super) fn calibration_model(
    action: Wild3Action,
    map: &Wild3MapGameData,
    movement: Wild3MovementMode,
    weather: Wild3Weather,
) -> Option<&Wild3MapCycleCalibration> {
    map.vblank_distrs.iter().find(|calibration| {
        calibration.action == action
            && calibration.movement == movement
            && calibration.weather == weather
    })
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn uniform_fixture_bounds_median_and_half_open_probabilities() {
        let calibration = Wild3MapCycleCalibration::new_dummy();

        assert_eq!(calibration.median(), 50_000);
        assert_eq!(calibration.probability(0.0, 30_000.0), 0.0);
        assert_eq!(calibration.probability(30_000.0, 70_000.0), 1.0);
        assert_eq!(calibration.probability(40_000.0, 50_000.0), 0.25);
        assert_eq!(calibration.probability(70_000.0, 80_000.0), 0.0);
        assert_eq!(calibration.probability(50_000.0, 40_000.0), 0.0);
    }

    #[test]
    fn cdf_jumps_are_excluded_at_the_upper_boundary() {
        let mut calibration = Wild3MapCycleCalibration::new_dummy();
        calibration.distribution = vec![
            CdfKnot {
                cycle: 50_000.0,
                probability: 0.0,
            },
            CdfKnot {
                cycle: 50_000.0,
                probability: 1.0,
            },
        ];

        assert_eq!(calibration.median(), 50_000);
        assert_eq!(calibration.probability(49_999.0, 50_000.0), 0.0);
        assert_eq!(calibration.probability(50_000.0, 50_001.0), 1.0);
    }

    #[test]
    fn only_supplied_calibrations_are_selected() {
        let map = Wild3MapGameData {
            vblank_distrs: vec![],
            ..Default::default()
        };

        assert_eq!(
            calibration_model(
                Wild3Action::SweetScentLand,
                &map,
                Wild3MovementMode::OnFoot,
                Wild3Weather::Sunny
            ),
            None
        );

        let map = Wild3MapGameData {
            vblank_distrs: vec![Wild3MapCycleCalibration::new_dummy()],
            ..Default::default()
        };

        assert_eq!(
            calibration_model(
                Wild3Action::SweetScentLand,
                &map,
                Wild3MovementMode::OnFoot,
                Wild3Weather::Sunny
            ),
            Some(&Wild3MapCycleCalibration::new_dummy())
        );
        assert_eq!(
            calibration_model(
                Wild3Action::SweetScentLand,
                &map,
                Wild3MovementMode::Bike,
                Wild3Weather::Sunny
            ),
            None
        );
        assert_eq!(
            calibration_model(
                Wild3Action::OldRod,
                &map,
                Wild3MovementMode::OnFoot,
                Wild3Weather::Sunny
            ),
            None
        );
    }
}
