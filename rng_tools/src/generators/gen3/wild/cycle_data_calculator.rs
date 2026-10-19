use serde::{Deserialize, Serialize};
use tsify::Tsify;
use wasm_bindgen::prelude::*;

use super::{CycleRange, VBLANK_FREQ, Wild3Action, Wild3MapGameData, Wild3CalibrationContext};
use crate::gen3::{
    COMMON_LEAD_RANGE, CycleAndModRange, FASTEST_MODULO_CYCLE_24, INFINITE_CYCLE,
    SLOWEST_MODULO_CYCLE_24,
};

/*
lead_pid_cycle_count: The cycle count for the operationr "lead_PID % 24".

post_sweet_scent_cycle_range: The range of cycles between the start of the Sweet Scent function
                              and when the vblank occurs in order for the method to be triggered.

pre_sweet_scent_cycle_range: The range of cycles before the Sweet Scent function is called, such as
                              the vblank occurs at the right timing for the method to be triggered.
                              It is VBLANK_FREQ - post_sweet_scent_cycle_range.
*/

const MOST_PROBABLE_PRE_SWEET_SCENT_CYCLE: usize = 55000;

#[derive(Debug, Clone, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct Wild3SearcherCycleData {
    pub lead_pid_cycle_count: usize,
    pub pre_sweet_scent_cycle_range: CycleRange<i32>,
    pub method_probability: f64,
}

impl Wild3SearcherCycleData {
    pub fn new(
        lead_pid_cycle_count: usize,
        pre_sweet_scent_cycle_start: i32,
        pre_sweet_scent_cycle_len: usize,
        method_probability: f64,
    ) -> Self {
        Wild3SearcherCycleData {
            lead_pid_cycle_count,
            pre_sweet_scent_cycle_range: CycleRange::from_start_len(
                pre_sweet_scent_cycle_start,
                pre_sweet_scent_cycle_len,
            ),
            method_probability,
        }
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
    action: Wild3Action,
    egg_lead: bool,
    specified_lead_cycle_speed: Option<usize>,
    map_data: &Wild3MapGameData,
    context: Option<Wild3CalibrationContext>,
) -> Wild3SearcherCycleDataByLead {
    let calculate_cycle_data = |range: &CycleAndModRange, action, speed| {
        calculate_cycle_data(range, action, speed, map_data, context)
    };
    if egg_lead {
        // cycle_data is useful even with egg lead to know the likelihood of hitting the method.
        let cycle_data = calculate_cycle_data(post_sweet_scent_range, action, 0);

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
        let ideal_lead_pid_cycle_count = calculate_ideal_lead_pid_cycle_count(
            post_sweet_scent_range, action, map_data, context);

        Wild3SearcherCycleDataByLead {
            post_sweet_scent_range: *post_sweet_scent_range,
            specified_lead: specified_lead_cycle_speed
                .map(|spd| calculate_cycle_data(post_sweet_scent_range, action, spd)),
            slowest_lead: calculate_cycle_data(
                post_sweet_scent_range,
                action,
                SLOWEST_MODULO_CYCLE_24,
            ),
            fastest_lead: calculate_cycle_data(
                post_sweet_scent_range,
                action,
                FASTEST_MODULO_CYCLE_24,
            ),
            ideal_lead: calculate_cycle_data(
                post_sweet_scent_range,
                action,
                ideal_lead_pid_cycle_count,
            ),
            common_lower_lead: calculate_cycle_data(
                post_sweet_scent_range,
                action,
                COMMON_LEAD_RANGE.start,
            ),
            common_upper_lead: calculate_cycle_data(
                post_sweet_scent_range,
                action,
                COMMON_LEAD_RANGE.end,
            ),
        }
    }
}

#[wasm_bindgen]
pub fn calculate_cycle_data(
    post_sweet_scent_mod_range: &CycleAndModRange,
    action: Wild3Action,
    lead_pid_cycle_count: usize,
    map_data: &Wild3MapGameData,
    context: Option<Wild3CalibrationContext>,
) -> Wild3SearcherCycleData {
    let post_sweet_scent_range =
        post_sweet_scent_mod_range.apply_mod_cycle_count(lead_pid_cycle_count);
    let pre_sweet_scent_cycle_range =
        calculate_pre_sweet_scent_cycle_range(&post_sweet_scent_range);
    let method_probability = calculate_method_probability_with_context(
        &pre_sweet_scent_cycle_range,
        action,
        map_data,
        context,
    );

    Wild3SearcherCycleData {
        lead_pid_cycle_count,
        pre_sweet_scent_cycle_range,
        method_probability,
    }
}

pub fn is_method_possible_to_trigger(
    range: &CycleAndModRange, action: Wild3Action, is_egg: bool,
    consider_rng_manipulated_lead_pid: bool, lead_cycle_speed: Option<usize>,
    map: &Wild3MapGameData, context: Option<Wild3CalibrationContext>,
) -> bool {
    let (min, _, max) = get_min_mid_max_pre_sweet_scent_cycle_with_context(action, map, context);
    let overlaps = |speed| {
        let pre = calculate_pre_sweet_scent_cycle_range(&range.apply_mod_cycle_count(speed));
        pre.len > 0 && (pre.start as i64) <= max as i64
            && pre.start as i64 + pre.len as i64 > min as i64
    };
    if is_egg { return overlaps(0); }
    if let Some(speed) = lead_cycle_speed { return overlaps(speed); }
    if !consider_rng_manipulated_lead_pid {
        return overlaps(COMMON_LEAD_RANGE.start) && overlaps(COMMON_LEAD_RANGE.end);
    }
    (FASTEST_MODULO_CYCLE_24..=SLOWEST_MODULO_CYCLE_24).any(overlaps)
}

#[wasm_bindgen]
pub fn calculate_ideal_lead_pid_cycle_count(
    range: &CycleAndModRange, action: Wild3Action, map: &Wild3MapGameData,
    context: Option<Wild3CalibrationContext>,
) -> usize {
    if range.start.lead_pid_mod == 0 { return 0; }
    let Some((model, _)) = super::vblank_calibration::calibration_model(action, map, context) else {
        return calculate_ideal_lead_pid_cycle_count_at_cycle(range, MOST_PROBABLE_PRE_SWEET_SCENT_CYCLE);
    };
    let probability = |speed| {
        let pre = calculate_pre_sweet_scent_cycle_range(&range.apply_mod_cycle_count(speed));
        model.probability(pre.start as f64, pre.start as f64 + pre.len as f64)
    };
    let median = super::vblank_calibration::wild3_map_cycle_calibration(map).combined_median;
    let mut best = calculate_ideal_lead_pid_cycle_count_at_cycle(range, median);
    let mut best_probability = probability(best);
    if best_probability >= 1.0 - 1e-12 { return best; }
    for speed in FASTEST_MODULO_CYCLE_24..=SLOWEST_MODULO_CYCLE_24 {
        let score = probability(speed);
        if score > best_probability + 1e-12 { best = speed; best_probability = score; }
    }
    best
}

pub fn calculate_ideal_lead_pid_cycle_count_at_cycle(
    post_sweet_scent_range: &CycleAndModRange,
    representative_cycle: usize,
) -> usize {
    let mod_count = post_sweet_scent_range.start.lead_pid_mod;
    if mod_count == 0 {
        // Should only occurs with egg lead
        return 0;
    }

    /*
    ex: cycle_range is (start=200k + 100 * modulo, len=10k).
    mid_cycle_from_sweet_scent_func_start is 205k. (For best chances to trigger the method, there should be 205k cycles after the start of the SweetScent function and the vblank)
    pre_sweet_scent_mid_cycle is 75k (280k - 205k). (For best chances to trigger the method, there should be 75k cycles before the start of the SweetScent function)

    The most probable cycle count before SweetScent is 55k (constant).
    To reach 75k, we need to add 20k cycles from lead PID modulo.
    Lead PID modulo is called 100 times, so we want to ideally add 200 cycles per modulo.
    */
    let mid_cycle_from_sweet_scent_func_start =
        post_sweet_scent_range.start.cycle + (post_sweet_scent_range.len / 2);
    let pre_sweet_scent_mid_cycle =
        VBLANK_FREQ as i64 - mid_cycle_from_sweet_scent_func_start as i64;

    let total_diff = pre_sweet_scent_mid_cycle - representative_cycle as i64;
    let ideal_diff_by_mod = total_diff / mod_count as i64;
    ideal_diff_by_mod.clamp(
        FASTEST_MODULO_CYCLE_24 as i64,
        SLOWEST_MODULO_CYCLE_24 as i64,
    ) as usize
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

pub fn get_min_mid_max_pre_sweet_scent_cycle(action: Wild3Action) -> (usize, usize, usize) {
    get_min_mid_max_pre_sweet_scent_cycle_for_map(action, &Wild3MapGameData::default())
}

pub fn get_min_mid_max_pre_sweet_scent_cycle_for_map(
    action: Wild3Action, map_data: &Wild3MapGameData,
) -> (usize, usize, usize) {
    get_min_mid_max_pre_sweet_scent_cycle_with_context(action, map_data, None)
}

pub fn get_min_mid_max_pre_sweet_scent_cycle_with_context(
    action: Wild3Action, map: &Wild3MapGameData, context: Option<Wild3CalibrationContext>,
) -> (usize, usize, usize) {
    if let Some(bounds) = super::vblank_calibration::calibration_filter_bounds(action, map, context) {
        return bounds;
    }
    match action {
        Wild3Action::SweetScentLand => (0, MOST_PROBABLE_PRE_SWEET_SCENT_CYCLE, VBLANK_FREQ - 1),
        Wild3Action::RockSmash => (30_000, 52_500, 75_000),
        _ => (45_000, MOST_PROBABLE_PRE_SWEET_SCENT_CYCLE, 75_000),
    }
}

pub fn get_min_mid_max_vblank_cycle_duration() -> (usize, usize, usize) {
    (45_000, 55_000, 65000)
}

#[wasm_bindgen]
pub fn calculate_method_probability(
    range: &CycleRange<i32>, action: Wild3Action, map: &Wild3MapGameData,
    context: Option<Wild3CalibrationContext>,
) -> f64 {
    calculate_method_probability_with_context(range, action, map, context)
}

pub fn calculate_method_probability_for_map(
    range: &CycleRange<i32>, action: Wild3Action, map: &Wild3MapGameData,
) -> f64 {
    calculate_method_probability_with_context(range, action, map, None)
}

pub fn calculate_method_probability_with_context(
    range: &CycleRange<i32>, action: Wild3Action, map: &Wild3MapGameData,
    context: Option<Wild3CalibrationContext>,
) -> f64 {
    if range.len == 0 { return 0.0; }
    let start = range.start as f64;
    let end = start + range.len as f64;
    if let Some((model, _)) = super::vblank_calibration::calibration_model(action, map, context) {
        return model.probability(start, end);
    }
    let (min, _, max) = get_min_mid_max_pre_sweet_scent_cycle_with_context(action, map, context);
    let overlap = (end.min(max as f64) - start.max(min as f64)).max(0.0);
    overlap / (max - min) as f64
}

pub fn calculate_method_probability_from_mod_range(
    range: &CycleAndModRange, action: Wild3Action, pid_cycle_count: usize,
    map: &Wild3MapGameData, context: Option<Wild3CalibrationContext>,
) -> f64 {
    let post = range.apply_mod_cycle_count(pid_cycle_count);
    let pre = calculate_pre_sweet_scent_cycle_range(&post);
    calculate_method_probability_with_context(&pre, action, map, context)
}
