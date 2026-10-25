use itertools::Itertools;
use serde::{Deserialize, Serialize};
use tsify::Tsify;
use wasm_bindgen::prelude::*;

use super::{
    CycleRange, MinMidMax, VBLANK_FREQ, Wild3Action, Wild3MapGameData, Wild3MovementMode,
    Wild3Weather,
};
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

pub fn calculate_cycle_data_by_lead(
    post_sweet_scent_range: &CycleAndModRange,
    egg_lead: bool,
    specified_lead_cycle_speed: Option<usize>,
    initial_cycle_distr: &[&Wild3InitialCycleDistribution],
) -> Wild3SearcherCycleDataByLead {
    // Step 1: Generate Wild3SearcherCycleDataByLead for each possible initial_cycle_setup
    let res_by_distr = initial_cycle_distr
        .iter()
        .map(|distr| {
            if egg_lead {
                // cycle_data is useful even with egg lead to know the likelihood of hitting the method.
                let cycle_data =
                    calculate_cycle_data_for_specific_lead_spd(post_sweet_scent_range, 0, distr);

                Wild3SearcherCycleDataByLead {
                    post_sweet_scent_range: *post_sweet_scent_range,
                    specified_lead: Some(cycle_data.clone()),
                    slowest_lead: cycle_data.clone(),
                    fastest_lead: cycle_data.clone(),
                    ideal_lead: cycle_data.clone(),
                    common_lower_lead: cycle_data.clone(),
                    common_upper_lead: cycle_data.clone(),
                }
            } else {
                let ideal_lead_pid_cycle_count =
                    calculate_ideal_lead_pid_cycle_count(post_sweet_scent_range, distr);

                Wild3SearcherCycleDataByLead {
                    post_sweet_scent_range: *post_sweet_scent_range,
                    specified_lead: specified_lead_cycle_speed.map(|spd| {
                        calculate_cycle_data_for_specific_lead_spd(
                            post_sweet_scent_range,
                            spd,
                            distr,
                        )
                    }),
                    slowest_lead: calculate_cycle_data_for_specific_lead_spd(
                        post_sweet_scent_range,
                        SLOWEST_MODULO_CYCLE_24,
                        distr,
                    ),
                    fastest_lead: calculate_cycle_data_for_specific_lead_spd(
                        post_sweet_scent_range,
                        FASTEST_MODULO_CYCLE_24,
                        distr,
                    ),
                    ideal_lead: calculate_cycle_data_for_specific_lead_spd(
                        post_sweet_scent_range,
                        ideal_lead_pid_cycle_count,
                        distr,
                    ),
                    common_lower_lead: calculate_cycle_data_for_specific_lead_spd(
                        post_sweet_scent_range,
                        COMMON_LEAD_RANGE.start,
                        distr,
                    ),
                    common_upper_lead: calculate_cycle_data_for_specific_lead_spd(
                        post_sweet_scent_range,
                        COMMON_LEAD_RANGE.end,
                        distr,
                    ),
                }
            }
        })
        .collect_vec();

    // Step 2: Select the best initial_cycle_setup for each lead_cycle_speed.

    let dummy_cycle_data = || {
        Wild3SearcherCycleData::new(0, 0, 0, 0.0, Wild3MovementMode::OnFoot, Wild3Weather::Sunny)
    };

    let find_best =
        |select: fn(&Wild3SearcherCycleDataByLead) -> Option<&Wild3SearcherCycleData>| {
            res_by_distr
                .iter()
                .filter_map(select)
                .reduce(|best, candidate| {
                    if candidate.method_probability > best.method_probability {
                        candidate
                    } else {
                        best
                    }
                })
                .cloned()
        };

    let best_specified_lead = find_best(|data| data.specified_lead.as_ref())
        .or_else(|| (egg_lead || specified_lead_cycle_speed.is_some()).then(dummy_cycle_data));
    let best_slowest_lead =
        find_best(|data| Some(&data.slowest_lead)).unwrap_or_else(dummy_cycle_data);
    let best_fastest_lead =
        find_best(|data| Some(&data.fastest_lead)).unwrap_or_else(dummy_cycle_data);
    let best_ideal_lead = find_best(|data| Some(&data.ideal_lead)).unwrap_or_else(dummy_cycle_data);
    let best_common_lower_lead =
        find_best(|data| Some(&data.common_lower_lead)).unwrap_or_else(dummy_cycle_data);
    let best_common_upper_lead =
        find_best(|data| Some(&data.common_upper_lead)).unwrap_or_else(dummy_cycle_data);

    Wild3SearcherCycleDataByLead {
        post_sweet_scent_range: *post_sweet_scent_range,
        specified_lead: best_specified_lead,
        slowest_lead: best_slowest_lead,
        fastest_lead: best_fastest_lead,
        ideal_lead: best_ideal_lead,
        common_lower_lead: best_common_lower_lead,
        common_upper_lead: best_common_upper_lead,
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
    if range.start.lead_pid_mod == 0 {
        return 0;
    }

    let probability = |speed| {
        let initial_range =
            calculate_pre_sweet_scent_cycle_range(&range.apply_mod_cycle_count(speed));
        distr.probability_for_range(&initial_range)
    };

    let mut best_spd = 0;
    let mut best_probability = 0f64;

    for speed in FASTEST_MODULO_CYCLE_24..=SLOWEST_MODULO_CYCLE_24 {
        let score = probability(speed);
        if score > best_probability {
            best_spd = speed;
            best_probability = score;
            if best_probability > 1f64 - EPSILON {
                break;
            }
        }
    }
    best_spd
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
