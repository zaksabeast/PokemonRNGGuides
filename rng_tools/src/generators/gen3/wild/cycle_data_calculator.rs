use serde::{Deserialize, Serialize};
use tsify::Tsify;
use wasm_bindgen::prelude::*;

use super::cdf::CdfCursor;
use super::{CycleRange, MinMidMax, VBLANK_FREQ, Wild3PlayingSong, Wild3Weather};
use crate::gen3::{
    COMMON_LEAD_RANGE, CycleAndModRange, FASTEST_MODULO_CYCLE_24, INFINITE_CYCLE,
    SLOWEST_MODULO_CYCLE_24, Wild3InitialCycleDistribution,
};

/*
lead_pid_cycle_count: The cycle count for the operation "lead_PID % 24".

post_cycle_range: The range of cycles between the start of the Pokemon encounter function
                  and when the vblank occurs in order for the method to be triggered.

initial_cycle_range: For the specific method to be triggered, the cycles at the start of
                     the Pokemon encounter function must be within the range initial_cycle_range.
                     It is VBLANK_FREQ - post_cycle_range.
*/

#[derive(Debug, Clone, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct Wild3SearcherCycleData {
    pub lead_pid_cycle_count: usize,
    pub initial_cycle_range: CycleRange<i32>,
    pub method_probability: f64,
    pub playing_song: Wild3PlayingSong,
    pub weather: Wild3Weather,
}

impl Wild3SearcherCycleData {
    pub fn new(
        lead_pid_cycle_count: usize,
        initial_cycle_start: i32,
        initial_cycle_len: usize,
        method_probability: f64,
        playing_song: Wild3PlayingSong,
        weather: Wild3Weather,
    ) -> Self {
        Wild3SearcherCycleData {
            lead_pid_cycle_count,
            initial_cycle_range: CycleRange::from_start_len(initial_cycle_start, initial_cycle_len),
            method_probability,
            playing_song,
            weather,
        }
    }
    pub fn new_default() -> Self {
        Wild3SearcherCycleData {
            lead_pid_cycle_count: 0,
            initial_cycle_range: CycleRange::from_start_len(0, 0),
            method_probability: 0f64,
            playing_song: Wild3PlayingSong::MapSong,
            weather: Wild3Weather::Sunny,
        }
    }
    pub fn new_for_test(
        lead_pid_cycle_count: usize,
        initial_cycle_start: i32,
        initial_cycle_len: usize,
        method_probability: f64,
    ) -> Self {
        Wild3SearcherCycleData::new(
            lead_pid_cycle_count,
            initial_cycle_start,
            initial_cycle_len,
            method_probability,
            Wild3PlayingSong::MapSong,
            Wild3Weather::Sunny,
        )
    }
}

#[derive(Debug, Clone, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct Wild3SearcherCycleDataByLead {
    pub post_cycle_range: CycleAndModRange,
    pub specified_lead: Option<Wild3SearcherCycleData>,
    pub slowest_lead: Wild3SearcherCycleData,
    pub fastest_lead: Wild3SearcherCycleData,
    pub ideal_lead: Wild3SearcherCycleData,
    pub common_lower_lead: Wild3SearcherCycleData,
    pub common_upper_lead: Wild3SearcherCycleData,
}

impl Wild3SearcherCycleDataByLead {
    pub fn new_default(post_cycle_range: CycleAndModRange) -> Self {
        Self {
            post_cycle_range,
            specified_lead: None,
            slowest_lead: Wild3SearcherCycleData::new_default(),
            fastest_lead: Wild3SearcherCycleData::new_default(),
            ideal_lead: Wild3SearcherCycleData::new_default(),
            common_lower_lead: Wild3SearcherCycleData::new_default(),
            common_upper_lead: Wild3SearcherCycleData::new_default(),
        }
    }
}

pub fn calculate_cycle_data_by_lead(
    post_cycle_range: &CycleAndModRange,
    egg_lead: bool,
    specified_lead_cycle_speed: Option<usize>,
    initial_cycle_distr: &[&Wild3InitialCycleDistribution],
) -> Wild3SearcherCycleDataByLead {
    if initial_cycle_distr.is_empty() {
        return Wild3SearcherCycleDataByLead::new_default(*post_cycle_range);
    }

    let data_for_lead_spd =
        |speed| find_best_cycle_data_for_lead_spd(post_cycle_range, speed, initial_cycle_distr);

    if egg_lead {
        let data = data_for_lead_spd(0);

        return Wild3SearcherCycleDataByLead {
            post_cycle_range: *post_cycle_range,
            specified_lead: Some(data.clone()),
            slowest_lead: data.clone(),
            fastest_lead: data.clone(),
            ideal_lead: data.clone(),
            common_lower_lead: data.clone(),
            common_upper_lead: data,
        };
    }

    Wild3SearcherCycleDataByLead {
        post_cycle_range: *post_cycle_range,
        specified_lead: specified_lead_cycle_speed.map(data_for_lead_spd),
        slowest_lead: data_for_lead_spd(SLOWEST_MODULO_CYCLE_24),
        fastest_lead: data_for_lead_spd(FASTEST_MODULO_CYCLE_24),
        ideal_lead: find_best_cycle_data_for_ideal_lead_spd(post_cycle_range, initial_cycle_distr),
        common_lower_lead: data_for_lead_spd(COMMON_LEAD_RANGE.start),
        common_upper_lead: data_for_lead_spd(COMMON_LEAD_RANGE.end),
    }
}

fn find_best_cycle_data_for_lead_spd(
    range: &CycleAndModRange,
    lead_spd: usize,
    initial_cycle_distrs: &[&Wild3InitialCycleDistribution],
) -> Wild3SearcherCycleData {
    let initial_range = calculate_initial_cycle_range(&range.apply_mod_cycle_count(lead_spd));
    let candidates = initial_cycle_distrs
        .iter()
        .map(|distr| Wild3SearcherCycleData {
            lead_pid_cycle_count: lead_spd,
            initial_cycle_range: initial_range,
            method_probability: distr.probability_for_range(&initial_range),
            playing_song: distr.playing_song,
            weather: distr.weather,
        });

    find_best_cycle_data(candidates).unwrap_or_else(Wild3SearcherCycleData::new_default)
}

fn find_best_cycle_data_for_ideal_lead_spd(
    range: &CycleAndModRange,
    initial_cycle_distrs: &[&Wild3InitialCycleDistribution],
) -> Wild3SearcherCycleData {
    find_best_cycle_data(
        initial_cycle_distrs
            .iter()
            .map(|distr| calculate_ideal_lead_cycle_data(range, distr)),
    )
    .unwrap_or_else(Wild3SearcherCycleData::new_default)
}

fn find_best_cycle_data(
    candidates: impl IntoIterator<Item = Wild3SearcherCycleData>,
) -> Option<Wild3SearcherCycleData> {
    let mut best: Option<Wild3SearcherCycleData> = None;

    for candidate in candidates {
        let improves_best = best
            .as_ref()
            .is_none_or(|best| candidate.method_probability > best.method_probability);
        if !improves_best {
            continue;
        }

        if candidate.method_probability == 1.0 {
            return Some(candidate);
        }

        best = Some(candidate);
    }

    best
}

#[wasm_bindgen]
pub fn calculate_cycle_data_for_specific_lead_spd(
    post_cycle_mod_range: &CycleAndModRange,
    lead_pid_cycle_count: usize,
    distr: &Wild3InitialCycleDistribution,
) -> Wild3SearcherCycleData {
    let post_cycle_range = post_cycle_mod_range.apply_mod_cycle_count(lead_pid_cycle_count);
    let initial_cycle_range = calculate_initial_cycle_range(&post_cycle_range);

    Wild3SearcherCycleData {
        lead_pid_cycle_count,
        initial_cycle_range,
        method_probability: distr.probability_for_range(&initial_cycle_range),
        playing_song: distr.playing_song,
        weather: distr.weather,
    }
}

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

    let initial_range =
        calculate_initial_cycle_range(&range.apply_mod_cycle_count(FASTEST_MODULO_CYCLE_24));
    let initial_start = initial_range.start as f64;
    let mut start_cursor = CdfCursor::new(&distr.distribution, initial_start);
    let mut end_cursor = CdfCursor::new(
        &distr.distribution,
        initial_start + initial_range.len as f64,
    );
    let candidates = (FASTEST_MODULO_CYCLE_24..=SLOWEST_MODULO_CYCLE_24).filter_map(|speed| {
        let initial_range = calculate_initial_cycle_range(&range.apply_mod_cycle_count(speed));
        let start = initial_range.start as f64;
        let end = start + initial_range.len as f64;
        let probability = if end <= start {
            0.0
        } else {
            (end_cursor.less_than(end) - start_cursor.less_than(start)).clamp(0.0, 1.0)
        };

        if probability.is_nan() || probability <= 0.0 {
            return None;
        }

        Some(Wild3SearcherCycleData {
            lead_pid_cycle_count: speed,
            initial_cycle_range: initial_range,
            method_probability: probability,
            playing_song: distr.playing_song,
            weather: distr.weather,
        })
    });

    find_best_cycle_data(candidates)
        .unwrap_or_else(|| calculate_cycle_data_for_specific_lead_spd(range, 0, distr))
}

fn calculate_initial_cycle_range(post_cycle_range: &CycleRange<usize>) -> CycleRange<i32> {
    let initial_cycle_end = VBLANK_FREQ as i32 - post_cycle_range.start as i32;

    if post_cycle_range.len >= INFINITE_CYCLE {
        let start = -1_000_000;
        CycleRange::<i32> {
            start,
            len: (initial_cycle_end - start) as usize,
        }
    } else {
        let initial_cycle_start = initial_cycle_end - post_cycle_range.len as i32;

        CycleRange::from_start_len(initial_cycle_start, post_cycle_range.len)
    }
}

// Limitation: Feebas hasn't been updated with the new initial cycle calibration logic.
pub fn get_default_min_mid_max_vblank_cycle_duration_for_feebas() -> MinMidMax {
    MinMidMax::new(45_000, 55_000, 65_000)
}

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
            playing_song: Wild3PlayingSong::MapSong,
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
    fn best_cycle_data_helpers_select_first_perfect_distribution() {
        let first = distribution_with_64_knots();
        let mut second = first.clone();
        second.distribution[31].cycle = 31_500.0;
        second.weather = Wild3Weather::Rain;
        let mut third = second.clone();
        third.weather = Wild3Weather::Thunderstorm;
        let range = CycleAndModRange::new(216_896, 100, 500);
        let distributions = [&first, &second, &third];
        let expected = Wild3SearcherCycleData::new(
            320,
            31_500,
            500,
            1.0,
            Wild3PlayingSong::MapSong,
            Wild3Weather::Rain,
        );

        assert_eq!(
            find_best_cycle_data_for_lead_spd(&range, 320, &distributions),
            expected
        );
        assert_eq!(
            find_best_cycle_data_for_ideal_lead_spd(&range, &distributions),
            expected
        );
        let default = Wild3SearcherCycleData::new_for_test(0, 0, 0, 0.0);

        assert_eq!(find_best_cycle_data_for_lead_spd(&range, 320, &[]), default);
        assert_eq!(
            find_best_cycle_data_for_ideal_lead_spd(&range, &[]),
            default
        );
    }
}
