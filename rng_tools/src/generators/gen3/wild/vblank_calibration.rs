//! Precomputed Emerald land Sweet Scent calibration. No raw logs are needed at runtime.
use super::{Wild3Action, Wild3MapGameData};

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub struct CycleCalibrationSummary {
    pub min: usize,
    pub median: usize,
    pub max: usize,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum Wild3CalibrationSong {
    Route101,
}

#[derive(Debug, Clone, Copy)]
pub struct Wild3MapCycleCalibration {
    pub map_internal_idx: usize,
    pub song: Wild3CalibrationSong,
    pub non_audio: CycleCalibrationSummary,
}

// Extracted from route101_walk_sweet_scent.txt (2,022 completed attempts).
// Audio: m4aSoundMain entry -> TryReceiveLinkBattleData entry.
// Non-audio: VBlankIntr -> TrySweetScentEncounter, excluding that audio interval.
const ROUTE101_AUDIO: CycleCalibrationSummary = CycleCalibrationSummary {
    min: 24_444, median: 48_005, max: 62_238,
};
const ROUTE101_NON_AUDIO: CycleCalibrationSummary = CycleCalibrationSummary {
    min: 10_242, median: 10_250, max: 10_274,
};

// map_internal_idx is the wild-header index, not the UI map_idx or map group/number.
// Route 101 is index 0 in EMERALD_MAPS_BY_INTERNAL_IDX.
pub const WILD3_MAP_CYCLE_CALIBRATIONS: &[Wild3MapCycleCalibration] = &[
    Wild3MapCycleCalibration {
        map_internal_idx: 0,
        song: Wild3CalibrationSong::Route101,
        non_audio: ROUTE101_NON_AUDIO,
    },
];

pub fn wild3_map_cycle_calibration(map_data: &Wild3MapGameData) -> &'static Wild3MapCycleCalibration {
    WILD3_MAP_CYCLE_CALIBRATIONS.iter()
        .find(|entry| entry.map_internal_idx == map_data.map_internal_idx)
        .unwrap_or(&WILD3_MAP_CYCLE_CALIBRATIONS[0])
}

pub fn wild3_audio_cycle_calibration(song: Wild3CalibrationSong) -> CycleCalibrationSummary {
    match song {
        Wild3CalibrationSong::Route101 => ROUTE101_AUDIO,
    }
}

pub(super) fn calibrated_pre_sweet_scent_cycles(
    action: Wild3Action,
    map_data: &Wild3MapGameData,
) -> Option<(usize, usize, usize)> {
    // Do not apply a walking land calibration to unmeasured encounter actions.
    if action != Wild3Action::SweetScentLand {
        return None;
    }
    let map = wild3_map_cycle_calibration(map_data);
    let audio = wild3_audio_cycle_calibration(map.song);
    let non_audio = map.non_audio;
    // Summed extrema are conservative versus the observed joint extrema.
    // The middle is a sum of component medians, not an exact joint median.
    Some((audio.min + non_audio.min,
        audio.median + non_audio.median,
        audio.max + non_audio.max))
}

#[cfg(test)]
mod tests {
    use super::*;

    fn map_data(map_internal_idx: usize) -> Wild3MapGameData {
        Wild3MapGameData { map_internal_idx, ..Wild3MapGameData::default() }
    }

    #[test]
    fn route101_components_and_fallback() {
        assert_eq!(calibrated_pre_sweet_scent_cycles(Wild3Action::SweetScentLand, &map_data(0)),
            Some((34_686, 58_255, 72_512)));
        assert_eq!(calibrated_pre_sweet_scent_cycles(Wild3Action::SweetScentLand, &map_data(usize::MAX)),
            calibrated_pre_sweet_scent_cycles(Wild3Action::SweetScentLand, &map_data(0)));
        assert_eq!(wild3_audio_cycle_calibration(Wild3CalibrationSong::Route101), ROUTE101_AUDIO);
        assert_eq!(wild3_map_cycle_calibration(&map_data(0)).non_audio, ROUTE101_NON_AUDIO);
    }

    #[test]
    fn other_actions_are_not_calibrated_from_land() {
        for action in [Wild3Action::SweetScentWater, Wild3Action::OldRod,
            Wild3Action::GoodRod, Wild3Action::SuperRod, Wild3Action::RockSmash] {
            assert_eq!(calibrated_pre_sweet_scent_cycles(action, &map_data(0)), None);
        }
    }

    #[test]
    fn generator_initialization_and_probability_use_the_same_support() {
        use crate::gen3::{CycleFrameCounter, CycleRange, Wild3GeneratorCycleOpts,
            Wild3GeneratorOptions, calculate_method_probability_for_map};
        let opts = Wild3GeneratorOptions {
            action: Wild3Action::SweetScentLand,
            cycle_opts: Wild3GeneratorCycleOpts::LikelihoodForLead { lead_cycle_spd: 0 },
            ..Wild3GeneratorOptions::default()
        };
        match CycleFrameCounter::new(&opts, &map_data(0)) {
            CycleFrameCounter::MinMaxRange { min_max_cycles, .. } => {
                assert_eq!(min_max_cycles.min_cycle.cycle, 34_686);
                assert_eq!(min_max_cycles.max_cycle.cycle, 72_512);
            }
            _ => panic!("Expected calibrated range"),
        }
        let probability = |start, len| calculate_method_probability_for_map(
            &CycleRange::from_start_len(start, len), Wild3Action::SweetScentLand, &map_data(0));
        assert_eq!(probability(34_000, 686), 0.0);
        assert_eq!(probability(72_512, 100), 0.0);
        assert_eq!(probability(34_686, 37_826), 1.0);
        // This interval was incorrectly excluded by the old 45,000-cycle lower bound.
        assert!(probability(35_000, 100) > 0.0);
        assert_eq!(calculate_method_probability_for_map(
            &CycleRange::from_start_len(35_000, 100), Wild3Action::SweetScentLand, &map_data(usize::MAX)),
            probability(35_000, 100));
    }

    #[test]
    fn unmeasured_actions_keep_existing_bounds() {
        use crate::gen3::get_min_mid_max_pre_sweet_scent_cycle_for_map;
        for action in [Wild3Action::SweetScentWater, Wild3Action::OldRod,
            Wild3Action::GoodRod, Wild3Action::SuperRod] {
            assert_eq!(get_min_mid_max_pre_sweet_scent_cycle_for_map(action, &map_data(99)),
                (45_000, 55_000, 75_000));
        }
        assert_eq!(get_min_mid_max_pre_sweet_scent_cycle_for_map(Wild3Action::RockSmash, &map_data(99)),
            (30_000, 52_500, 75_000));
    }
}
