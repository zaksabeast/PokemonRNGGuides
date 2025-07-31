use super::{CycleRange, VBLANK_FREQ};
use crate::gen3::{
    COMMON_LEAD_RANGE, CycleAndModRange, FASTEST_MODULO_CYCLE_24, SLOWEST_MODULO_CYCLE_24,
};

use serde::{Deserialize, Serialize};
use tsify_next::Tsify;
use wasm_bindgen::prelude::*;

/*
lead_pid_cycle_count: The cycle count for the operationr "lead_PID % 24".

post_sweet_scent_cycle_range: The range of cycles between the start of the Sweet Scent function
                              and when the vblank occurs in order for the method to be triggered.

pre_sweet_scent_cycle_range: The range of cycles before the Sweet Scent function is called, such as
                              the vblank occurs at the right timing for the method to be triggered.
                              It is VBLANK_FREQ - post_sweet_scent_cycle_range.
*/

/*
TODO:
- Improve calculate_method_probability by using real distribution, and consider the active map/audio.
*/

const MOST_PROBABLE_PRE_SWEET_SCENT_CYCLE: usize = 55000;

#[derive(Debug, Clone, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct Wild3SearcherCycleData {
    pub lead_pid_cycle_count: usize,
    pub pre_sweet_scent_cycle_range: CycleRange<usize>,
    pub method_probability: f64,
}

impl Wild3SearcherCycleData {
    pub fn new(
        lead_pid_cycle_count: usize,
        pre_sweet_scent_cycle_start: usize,
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
    pub slowest_lead: Wild3SearcherCycleData,
    pub fastest_lead: Wild3SearcherCycleData,
    pub ideal_lead: Wild3SearcherCycleData,
    pub common_lower_lead: Wild3SearcherCycleData,
    pub common_upper_lead: Wild3SearcherCycleData,
}

pub fn calculate_cycle_data_by_lead(
    post_sweet_scent_range: &CycleAndModRange,
    egg_lead: bool,
) -> Wild3SearcherCycleDataByLead {
    if egg_lead {
        // cycle_data is useful even with egg lead to know the likelihood of hitting the method.
        let cycle_data = calculate_cycle_data(post_sweet_scent_range, 0);

        Wild3SearcherCycleDataByLead {
            post_sweet_scent_range:*post_sweet_scent_range,
            slowest_lead: cycle_data.clone(),
            fastest_lead: cycle_data.clone(),
            ideal_lead: cycle_data.clone(),
            common_lower_lead: cycle_data.clone(),
            common_upper_lead: cycle_data.clone(),
        }
    } else {
        let ideal_lead_pid_cycle_count =
            calculate_ideal_lead_pid_cycle_count(post_sweet_scent_range);

        Wild3SearcherCycleDataByLead {
            post_sweet_scent_range:*post_sweet_scent_range,
            slowest_lead: calculate_cycle_data(post_sweet_scent_range, SLOWEST_MODULO_CYCLE_24),
            fastest_lead: calculate_cycle_data(post_sweet_scent_range, FASTEST_MODULO_CYCLE_24),
            ideal_lead: calculate_cycle_data(post_sweet_scent_range, ideal_lead_pid_cycle_count),
            common_lower_lead: calculate_cycle_data(
                post_sweet_scent_range,
                COMMON_LEAD_RANGE.start,
            ),
            common_upper_lead: calculate_cycle_data(post_sweet_scent_range, COMMON_LEAD_RANGE.end),
        }
    }
}

pub fn calculate_cycle_data(
    post_sweet_scent_mod_range: &CycleAndModRange,
    lead_pid_cycle_count: usize,
) -> Wild3SearcherCycleData {
    let post_sweet_scent_range =
        post_sweet_scent_mod_range.apply_mod_cycle_count(lead_pid_cycle_count);
    let pre_sweet_scent_cycle_range =
        calculate_pre_sweet_scent_cycle_range(&post_sweet_scent_range);
    let method_probability = calculate_method_probability(&pre_sweet_scent_cycle_range);

    Wild3SearcherCycleData {
        lead_pid_cycle_count,
        pre_sweet_scent_cycle_range,
        method_probability,
    }
}

pub fn is_method_possible_to_trigger(
    post_sweet_scent_mod_range: &CycleAndModRange,
    is_egg: bool,
    consider_rng_manipulated_lead_pid: bool,
) -> bool {
    if is_egg {
        return calculate_method_probability_from_mod_range(post_sweet_scent_mod_range, 0) > 0f64;
    }

    // if consider_rng_manipulated_lead_pid is false, all common lead PIDs must have a non-zero probability of hitting the method
    if !consider_rng_manipulated_lead_pid {
        return calculate_method_probability_from_mod_range(
            post_sweet_scent_mod_range,
            COMMON_LEAD_RANGE.start,
        ) > 0f64
            && calculate_method_probability_from_mod_range(
                post_sweet_scent_mod_range,
                COMMON_LEAD_RANGE.end,
            ) > 0f64;
    }

    // if consider_rng_manipulated_lead_pid is true, we only need 1 lead PID to have a non-zero probability
    let ideal_lead_pid = calculate_ideal_lead_pid_cycle_count(post_sweet_scent_mod_range);

    if ideal_lead_pid > FASTEST_MODULO_CYCLE_24 && ideal_lead_pid < SLOWEST_MODULO_CYCLE_24 {
        // It is possible to hit the perfect cycle count (MOST_PROBABLE_PRE_SWEET_SCENT_CYCLE), which means the method can be triggered.
        return true;
    }

    calculate_method_probability_from_mod_range(post_sweet_scent_mod_range, FASTEST_MODULO_CYCLE_24)
        > 0f64
        || calculate_method_probability_from_mod_range(
            post_sweet_scent_mod_range,
            SLOWEST_MODULO_CYCLE_24,
        ) > 0f64
}

fn calculate_ideal_lead_pid_cycle_count(post_sweet_scent_range: &CycleAndModRange) -> usize {
    let mod_count = post_sweet_scent_range.start.mod_count();
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

    let total_diff = pre_sweet_scent_mid_cycle - MOST_PROBABLE_PRE_SWEET_SCENT_CYCLE as i64;
    let ideal_diff_by_mod = total_diff / mod_count as i64;
    ideal_diff_by_mod.clamp(
        FASTEST_MODULO_CYCLE_24 as i64,
        SLOWEST_MODULO_CYCLE_24 as i64,
    ) as usize
}

fn calculate_pre_sweet_scent_cycle_range(
    post_sweet_scent_range: &CycleRange<usize>,
) -> CycleRange<usize> {
    if post_sweet_scent_range.start >= VBLANK_FREQ {
        // Impossible to hit the method. There can't be more than VBLANK_FREQ cycles between the start of the Sweet
        // Scent function and the vblank.
        return CycleRange::from_start_end(0, 0);
    }

    let pre_sweet_scent_end = VBLANK_FREQ - post_sweet_scent_range.start;
    let pre_sweet_scent_start = pre_sweet_scent_end.saturating_sub(post_sweet_scent_range.len);

    CycleRange::from_start_end(pre_sweet_scent_start, pre_sweet_scent_end)
}

pub fn calculate_method_probability(pre_sweet_scent_range: &CycleRange<usize>) -> f64 {
    if pre_sweet_scent_range.len == 0 {
        return 0.0;
    }

    // Constant probability in the range 45K - 65K cycles (over-simplification of the real probability)
    let overlap_start = std::cmp::max(
        pre_sweet_scent_range.start,
        MOST_PROBABLE_PRE_SWEET_SCENT_CYCLE - 10_000,
    );
    let overlap_end = std::cmp::min(
        pre_sweet_scent_range.end(),
        MOST_PROBABLE_PRE_SWEET_SCENT_CYCLE + 10_000,
    );

    if overlap_end <= overlap_start {
        return 0.0; // No overlap
    }

    let overlap_len = overlap_end - overlap_start;
    overlap_len as f64 / (65_000 - 45_000) as f64
}

pub fn calculate_method_probability_from_mod_range(
    post_sweet_scent_mod_range: &CycleAndModRange,
    pid_cycle_count: usize,
) -> f64 {
    let post_sweet_scent_range = post_sweet_scent_mod_range.apply_mod_cycle_count(pid_cycle_count);
    let pre_sweet_scent_cycle_range =
        calculate_pre_sweet_scent_cycle_range(&post_sweet_scent_range);
    calculate_method_probability(&pre_sweet_scent_cycle_range)
}
