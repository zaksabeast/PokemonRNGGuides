use serde::{Deserialize, Serialize};
use tsify::Tsify;
use wasm_bindgen::prelude::*;

use super::{CycleRange, MinMidMax, VBLANK_FREQ, Wild3MovementMode, Wild3Weather};
use crate::gen3::{
    COMMON_LEAD_RANGE, CycleAndModRange, FASTEST_MODULO_CYCLE_24, INFINITE_CYCLE,
    SLOWEST_MODULO_CYCLE_24, Wild3InitialCycleDistribution,
};

/*
lead_pid_cycle_count: The cycle count for the operationr "lead_PID % 24".

post_sweet_scent_cycle_range: The range of cycles between the start of the Sweet Scent function
                              and when the vblank occurs in order for the method to be triggered.

pre_sweet_scent_cycle_range: The range of cycles before the Sweet Scent function is called, such as
                              the vblank occurs at the right timing for the method to be triggered.
                              It is VBLANK_FREQ - post_sweet_scent_cycle_range.
*/

#[derive(Debug, Clone, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct Wild3SearcherCycleData {
    pub lead_pid_cycle_count: usize,
    pub pre_sweet_scent_cycle_range: CycleRange<i32>,
    pub method_probability: f64,
    pub movement: Wild3MovementMode,
    pub weather: Wild3Weather,
}

impl Wild3SearcherCycleData {
    pub fn new(
        lead_pid_cycle_count: usize,
        pre_sweet_scent_cycle_start: i32,
        pre_sweet_scent_cycle_len: usize,
        method_probability: f64,
        movement: Wild3MovementMode,
        weather: Wild3Weather,
    ) -> Self {
        Wild3SearcherCycleData {
            lead_pid_cycle_count,
            pre_sweet_scent_cycle_range: CycleRange::from_start_len(
                pre_sweet_scent_cycle_start,
                pre_sweet_scent_cycle_len,
            ),
            method_probability,
            movement,
            weather,
        }
    }
    pub fn new_for_test(
        lead_pid_cycle_count: usize,
        pre_sweet_scent_cycle_start: i32,
        pre_sweet_scent_cycle_len: usize,
        method_probability: f64,
    ) -> Self {
        Wild3SearcherCycleData::new(
            lead_pid_cycle_count,
            pre_sweet_scent_cycle_start,
            pre_sweet_scent_cycle_len,
            method_probability,
            Wild3MovementMode::OnFoot,
            Wild3Weather::Sunny,
        )
    }
}

#[derive(Debug, Clone, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct Wild3SearcherCycleDataByLead {
    pub post_sweet_scent_range: CycleAndModRange,
    pub specified_lead: Option<Wild3SearcherCycleData>,
    pub slowest_lead: Wild3SearcherCycleData,
    pub fastest_lead: Wild3SearcherCycleData,
    pub ideal_lead: Wild3SearcherCycleData,
    pub common_lower_lead: Wild3SearcherCycleData,
    pub common_upper_lead: Wild3SearcherCycleData,
}

impl Wild3SearcherCycleDataByLead {
    pub fn new_default(post_sweet_scent_range: CycleAndModRange) -> Self {
        let dummy = Wild3SearcherCycleData::new(
            0,
            0,
            0,
            0.0,
            Wild3MovementMode::OnFoot,
            Wild3Weather::Sunny,
        );

        Self {
            post_sweet_scent_range,
            specified_lead: None,
            slowest_lead: dummy.clone(),
            fastest_lead: dummy.clone(),
            ideal_lead: dummy.clone(),
            common_lower_lead: dummy.clone(),
            common_upper_lead: dummy,
        }
    }
}

pub fn calculate_cycle_data_by_lead(
    post_sweet_scent_range: &CycleAndModRange,
    egg_lead: bool,
    specified_lead_cycle_speed: Option<usize>,
    initial_cycle_distr: &[&Wild3InitialCycleDistribution],
) -> Wild3SearcherCycleDataByLead {
    let mut best: Option<Wild3SearcherCycleDataByLead> = None;

    for distr in initial_cycle_distr {
        let candidate = cycle_data_by_lead_for_distribution(
            post_sweet_scent_range,
            egg_lead,
            specified_lead_cycle_speed,
            distr,
        );
        let Some(best) = best.as_mut() else {
            best = Some(candidate);

            continue;
        };

        if let (Some(best), Some(candidate)) = (&mut best.specified_lead, candidate.specified_lead)
        {
            retain_more_probable(best, candidate);
        }

        retain_more_probable(&mut best.slowest_lead, candidate.slowest_lead);
        retain_more_probable(&mut best.fastest_lead, candidate.fastest_lead);
        retain_more_probable(&mut best.ideal_lead, candidate.ideal_lead);
        retain_more_probable(&mut best.common_lower_lead, candidate.common_lower_lead);
        retain_more_probable(&mut best.common_upper_lead, candidate.common_upper_lead);
    }

    best.unwrap_or_else(|| Wild3SearcherCycleDataByLead::new_default(*post_sweet_scent_range))
}

fn retain_more_probable(best: &mut Wild3SearcherCycleData, candidate: Wild3SearcherCycleData) {
    if candidate.method_probability > best.method_probability {
        *best = candidate;
    }
}

fn cycle_data_by_lead_for_distribution(
    range: &CycleAndModRange,
    egg_lead: bool,
    specified_lead_cycle_speed: Option<usize>,
    distr: &Wild3InitialCycleDistribution,
) -> Wild3SearcherCycleDataByLead {
    if egg_lead {
        let data = calculate_cycle_data_for_specific_lead_spd(range, 0, distr);

        return Wild3SearcherCycleDataByLead {
            post_sweet_scent_range: *range,
            specified_lead: Some(data.clone()),
            slowest_lead: data.clone(),
            fastest_lead: data.clone(),
            ideal_lead: data.clone(),
            common_lower_lead: data.clone(),
            common_upper_lead: data,
        };
    }

    let ideal_lead = calculate_ideal_lead_cycle_data(range, distr);
    let data_for_speed = |speed| {
        if speed == ideal_lead.lead_pid_cycle_count || range.start.lead_pid_mod == 0 {
            Wild3SearcherCycleData {
                lead_pid_cycle_count: speed,
                ..ideal_lead.clone()
            }
        } else {
            calculate_cycle_data_for_specific_lead_spd(range, speed, distr)
        }
    };

    Wild3SearcherCycleDataByLead {
        post_sweet_scent_range: *range,
        specified_lead: specified_lead_cycle_speed.map(data_for_speed),
        slowest_lead: data_for_speed(SLOWEST_MODULO_CYCLE_24),
        fastest_lead: data_for_speed(FASTEST_MODULO_CYCLE_24),
        common_lower_lead: data_for_speed(COMMON_LEAD_RANGE.start),
        common_upper_lead: data_for_speed(COMMON_LEAD_RANGE.end),
        ideal_lead,
    }
}

#[wasm_bindgen]
pub fn calculate_cycle_data_for_specific_lead_spd(
    post_sweet_scent_mod_range: &CycleAndModRange,
    lead_pid_cycle_count: usize,
    distr: &Wild3InitialCycleDistribution,
) -> Wild3SearcherCycleData {
    let post_sweet_scent_range =
        post_sweet_scent_mod_range.apply_mod_cycle_count(lead_pid_cycle_count);
    let pre_sweet_scent_cycle_range =
        calculate_pre_sweet_scent_cycle_range(&post_sweet_scent_range);

    Wild3SearcherCycleData {
        lead_pid_cycle_count,
        pre_sweet_scent_cycle_range,
        method_probability: distr.probability_for_range(&pre_sweet_scent_cycle_range),
        movement: distr.movement,
        weather: distr.weather,
    }
}

const EPSILON: f64 = 1e-12;

#[wasm_bindgen]
pub fn calculate_ideal_lead_pid_cycle_count(
    range: &CycleAndModRange,
    distr: &Wild3InitialCycleDistribution,
) -> usize {
    calculate_ideal_lead_cycle_data(range, distr).lead_pid_cycle_count
}

fn calculate_ideal_lead_cycle_data(
    range: &CycleAndModRange,
    distr: &Wild3InitialCycleDistribution,
) -> Wild3SearcherCycleData {
    if range.start.lead_pid_mod == 0 {
        return calculate_cycle_data_for_specific_lead_spd(range, 0, distr);
    }

    let first_range = calculate_pre_sweet_scent_cycle_range(
        &range.apply_mod_cycle_count(FASTEST_MODULO_CYCLE_24),
    );
    let first_start = first_range.start as f64;
    let mut start_cursor =
        super::vblank_calibration::CdfCursor::new(&distr.distribution, first_start);
    let mut end_cursor = super::vblank_calibration::CdfCursor::new(
        &distr.distribution,
        first_start + first_range.len as f64,
    );
    let mut best = None;
    let mut best_probability = 0.0;

    for speed in FASTEST_MODULO_CYCLE_24..=SLOWEST_MODULO_CYCLE_24 {
        let initial_range =
            calculate_pre_sweet_scent_cycle_range(&range.apply_mod_cycle_count(speed));
        let start = initial_range.start as f64;
        let end = start + initial_range.len as f64;
        let probability = if end <= start {
            0.0
        } else {
            (end_cursor.less_than(end) - start_cursor.less_than(start)).clamp(0.0, 1.0)
        };

        if probability.is_nan() || probability <= best_probability {
            continue;
        }

        best_probability = probability;
        best = Some(Wild3SearcherCycleData {
            lead_pid_cycle_count: speed,
            pre_sweet_scent_cycle_range: initial_range,
            method_probability: probability,
            movement: distr.movement,
            weather: distr.weather,
        });

        if best_probability > 1.0 - EPSILON {
            break;
        }
    }

    best.unwrap_or_else(|| calculate_cycle_data_for_specific_lead_spd(range, 0, distr))
}

fn calculate_pre_sweet_scent_cycle_range(
    post_sweet_scent_range: &CycleRange<usize>,
) -> CycleRange<i32> {
    let pre_sweet_scent_end = VBLANK_FREQ as i32 - post_sweet_scent_range.start as i32;

    if post_sweet_scent_range.len >= INFINITE_CYCLE {
        let start = -1_000_000;
        CycleRange::<i32> {
            start,
            len: (pre_sweet_scent_end - start) as usize,
        }
    } else {
        let pre_sweet_scent_start = pre_sweet_scent_end - post_sweet_scent_range.len as i32;

        CycleRange::from_start_len(pre_sweet_scent_start, post_sweet_scent_range.len)
    }
}

// Limitation: Feebas hasn't been updated with the new vblank calibration logic.
pub fn get_default_min_mid_max_vblank_cycle_duration_for_feebas() -> MinMidMax {
    MinMidMax::new(45_000, 55_000, 65_000)
}

// Limitation: Feebas hasn't been updated with the new vblank calibration logic.
pub fn get_default_min_mid_max_initial_cycle_for_feebas() -> MinMidMax {
    MinMidMax::new(45_000, 55_000, 75_000)
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::gen3::{CdfKnot, Wild3Action};

    fn distribution_with_64_knots() -> Wild3InitialCycleDistribution {
        Wild3InitialCycleDistribution {
            min: 0,
            max: 63_000,
            distribution: (0..64)
                .map(|index| CdfKnot {
                    cycle: f64::from(index * 1000),
                    probability: if index < 32 { 0.0 } else { 1.0 },
                })
                .collect(),
            action: Wild3Action::SweetScentLand,
            movement: Wild3MovementMode::OnFoot,
            weather: Wild3Weather::Sunny,
        }
    }

    #[test]
    fn ideal_lead_64_knots_preserves_first_maximum() {
        let distr = distribution_with_64_knots();
        let range = CycleAndModRange::new(216_896, 100, 500);

        assert_eq!(
            calculate_ideal_lead_cycle_data(&range, &distr),
            Wild3SearcherCycleData::new_for_test(320, 31_500, 500, 0.5)
        );
    }

    #[test]
    fn ideal_lead_handles_constant_empty_and_infinite_ranges() {
        let distr = distribution_with_64_knots();
        let cases = [
            (
                CycleAndModRange::new(248_896, 0, 500),
                Wild3SearcherCycleData::new_for_test(0, 31_500, 500, 0.5),
            ),
            (
                CycleAndModRange::new(281_896, 100, 500),
                Wild3SearcherCycleData::new_for_test(0, -1500, 500, 0.0),
            ),
            (
                CycleAndModRange::new(216_896, 100, 0),
                Wild3SearcherCycleData::new_for_test(0, 64_000, 0, 0.0),
            ),
            (
                CycleAndModRange::new(216_896, 100, INFINITE_CYCLE),
                Wild3SearcherCycleData::new_for_test(18, -1_000_000, 1_062_200, 1.0),
            ),
        ];

        for (range, expected) in cases {
            assert_eq!(calculate_ideal_lead_cycle_data(&range, &distr), expected);
        }
    }

    #[test]
    fn cycle_data_by_lead_keeps_first_distribution_on_ties() {
        let first = distribution_with_64_knots();
        let mut second = first.clone();
        second.weather = Wild3Weather::Rain;
        let range = CycleAndModRange::new(216_896, 100, 500);

        assert_eq!(
            calculate_cycle_data_by_lead(&range, false, Some(320), &[&first, &second]),
            Wild3SearcherCycleDataByLead {
                post_sweet_scent_range: range,
                specified_lead: Some(Wild3SearcherCycleData::new_for_test(320, 31_500, 500, 0.5)),
                slowest_lead: Wild3SearcherCycleData::new_for_test(900, -26_500, 500, 0.0),
                fastest_lead: Wild3SearcherCycleData::new_for_test(18, 61_700, 500, 0.0),
                ideal_lead: Wild3SearcherCycleData::new_for_test(320, 31_500, 500, 0.5),
                common_lower_lead: Wild3SearcherCycleData::new_for_test(608, 2700, 500, 0.0),
                common_upper_lead: Wild3SearcherCycleData::new_for_test(868, -23_300, 500, 0.0),
            }
        );
    }

    #[test]
    fn cycle_data_by_lead_selects_better_egg_distribution() {
        let first = distribution_with_64_knots();
        let mut second = first.clone();
        second.distribution[31].cycle = 31_500.0;
        second.weather = Wild3Weather::Rain;
        let range = CycleAndModRange::new(248_896, 0, 500);
        let expected = Wild3SearcherCycleData::new(
            0,
            31_500,
            500,
            1.0,
            Wild3MovementMode::OnFoot,
            Wild3Weather::Rain,
        );

        assert_eq!(
            calculate_cycle_data_by_lead(&range, true, None, &[&first, &second]),
            Wild3SearcherCycleDataByLead {
                post_sweet_scent_range: range,
                specified_lead: Some(expected.clone()),
                slowest_lead: expected.clone(),
                fastest_lead: expected.clone(),
                ideal_lead: expected.clone(),
                common_lower_lead: expected.clone(),
                common_upper_lead: expected,
            }
        );
    }

    #[test]
    fn cycle_data_by_lead_handles_no_distributions() {
        let range = CycleAndModRange::new(216_896, 100, 500);
        let dummy = Wild3SearcherCycleData::new_for_test(0, 0, 0, 0.0);
        let expected = Wild3SearcherCycleDataByLead {
            post_sweet_scent_range: range,
            specified_lead: None,
            slowest_lead: dummy.clone(),
            fastest_lead: dummy.clone(),
            ideal_lead: dummy.clone(),
            common_lower_lead: dummy.clone(),
            common_upper_lead: dummy.clone(),
        };

        assert_eq!(Wild3SearcherCycleDataByLead::new_default(range), expected);

        assert_eq!(
            calculate_cycle_data_by_lead(&range, false, None, &[]),
            expected
        );

        assert_eq!(
            calculate_cycle_data_by_lead(&range, true, None, &[]),
            expected
        );
        assert_eq!(
            calculate_cycle_data_by_lead(&range, false, Some(320), &[]),
            expected
        );
    }
}
