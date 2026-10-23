use serde::{Deserialize, Serialize};
use tsify::Tsify;

use super::cycle_distribution::{CdfKnot, cdf_less_than};
use super::{MinMidMax, Wild3Action, Wild3MapGameData};

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
    pub fn to_min_mid_max(&self) -> MinMidMax {
        MinMidMax::new(self.min, self.median(), self.max)
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
pub fn test_vblank_calibration() -> Wild3MapCycleCalibration {
    Wild3MapCycleCalibration {
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

#[cfg(test)]
mod tests {
    use super::*;
    use crate::gen3::{
        CycleRange, Wild3GeneratorCycleOpts, Wild3SearcherCycleOpts, calculate_method_probability,
    };

    #[test]
    fn weather_selects_the_requested_bounds_and_probability() {
        let sunny = test_vblank_calibration();
        let mut rain = sunny.clone();
        rain.weather = Wild3Weather::Rain;
        rain.min = 40_000;
        rain.max = 80_000;
        rain.distribution
            .iter_mut()
            .for_each(|knot| knot.cycle += 10_000.0);
        let map = Wild3MapGameData {
            vblank_distrs: vec![sunny, rain],
            ..Default::default()
        };

        assert_eq!(
            map.get_min_mid_max_pre_sweet_scent_cycle(
                Wild3Action::SweetScentLand,
                Wild3MovementMode::OnFoot,
                Wild3Weather::Sunny,
            ),
            MinMidMax::new(30_000, 50_000, 70_000)
        );
        assert_eq!(
            map.get_min_mid_max_pre_sweet_scent_cycle(
                Wild3Action::SweetScentLand,
                Wild3MovementMode::OnFoot,
                Wild3Weather::Rain,
            ),
            MinMidMax::new(40_000, 60_000, 80_000)
        );
        assert_eq!(
            map.get_min_mid_max_pre_sweet_scent_cycle(
                Wild3Action::SweetScentLand,
                Wild3MovementMode::OnFoot,
                Wild3Weather::Thunderstorm,
            ),
            MinMidMax::new(0, 55_000, 280_895)
        );
        let range = CycleRange::from_start_len(30_000, 10_000);

        assert_eq!(
            calculate_method_probability(
                &range,
                Wild3Action::SweetScentLand,
                &map,
                Wild3MovementMode::OnFoot,
                Wild3Weather::Sunny
            ),
            0.25
        );
        assert_eq!(
            calculate_method_probability(
                &range,
                Wild3Action::SweetScentLand,
                &map,
                Wild3MovementMode::OnFoot,
                Wild3Weather::Rain
            ),
            0.0
        );
    }

    #[test]
    fn searcher_options_preserve_weather_for_known_and_unknown_lead_speeds() {
        let known = Wild3SearcherCycleOpts::Calibrate {
            weather: Wild3Weather::Rain,
            movement: Wild3MovementMode::OnFoot,
            lead_cycle_speed: Some(500),
        };
        let unknown = Wild3SearcherCycleOpts::Calibrate {
            weather: Wild3Weather::Thunderstorm,
            movement: Wild3MovementMode::Bike,
            lead_cycle_speed: None,
        };

        assert_eq!(
            known.generator_cycle_opts(),
            Wild3GeneratorCycleOpts::LikelihoodForLead {
                weather: Wild3Weather::Rain,
                consider_bike: false,
                lead_cycle_spd: 500,
            }
        );
        assert_eq!(
            unknown.generator_cycle_opts(),
            Wild3GeneratorCycleOpts::Searching {
                weather: Wild3Weather::Thunderstorm,
                consider_bike: true,
                generate_even_if_impossible: true,
                consider_rng_manipulated_lead_pid: true,
            }
        );
    }

    #[test]
    fn uniform_fixture_bounds_median_and_half_open_probabilities() {
        let calibration = test_vblank_calibration();

        assert_eq!(calibration.median(), 50_000);
        assert_eq!(calibration.probability(0.0, 30_000.0), 0.0);
        assert_eq!(calibration.probability(30_000.0, 70_000.0), 1.0);
        assert_eq!(calibration.probability(40_000.0, 50_000.0), 0.25);
        assert_eq!(calibration.probability(70_000.0, 80_000.0), 0.0);
        assert_eq!(calibration.probability(50_000.0, 40_000.0), 0.0);
    }

    #[test]
    fn cdf_jumps_are_excluded_at_the_upper_boundary() {
        let mut calibration = test_vblank_calibration();
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
            vblank_distrs: vec![test_vblank_calibration()],
            ..Default::default()
        };

        assert_eq!(
            calibration_model(
                Wild3Action::SweetScentLand,
                &map,
                Wild3MovementMode::OnFoot,
                Wild3Weather::Sunny
            ),
            Some(&test_vblank_calibration())
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
