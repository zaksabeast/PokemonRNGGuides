//! Compact Emerald calibration distributions. Raw logs are used only by the offline extractor.
use serde::{Deserialize, Serialize};
use tsify::Tsify;
use wasm_bindgen::prelude::*;
use super::{Wild3Action, Wild3MapGameData, VBLANK_FREQ};
use super::cycle_distribution::{ConvolvedCdf, PiecewiseCdf};

#[path = "vblank_calibration_data.rs"]
mod data;

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub struct CycleCalibrationSummary {
    pub min: usize,
    pub median: usize,
    pub max: usize,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum Wild3CalibrationSong { Route101, Route104, Route110, PetalburgWoods, Route113, SafariZone, RgSeviiCave }

#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize, Tsify)]
pub enum Wild3MovementMode { OnFoot, Bike }

#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize, Tsify)]
pub enum Wild3SoundMode { Unspecified, Mono, Stereo }

#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize, Tsify)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct Wild3CalibrationContext {
    pub action: Wild3Action,
    pub movement: Wild3MovementMode,
    pub sound_mode: Wild3SoundMode,
}

impl Wild3CalibrationContext {
    pub fn walking(action: Wild3Action) -> Self {
        Self { action, movement: Wild3MovementMode::OnFoot, sound_mode: Wild3SoundMode::Unspecified }
    }
}

#[derive(Debug, Clone, Copy, Serialize, Tsify)]
pub struct CalibrationProvenance {
    pub source: &'static str,
    pub sha256: &'static str,
    pub attempts: usize,
    pub distinct_frames: usize,
    pub frame_start: usize,
    pub frame_end: usize,
    pub duplicate_attempts: usize,
    pub missing_frames: usize,
    pub song_loop_frames: f64,
    pub incomplete_loop: bool,
    pub max_cdf_error: f64,
    pub safety_margin_cycles: usize,
}

#[derive(Debug, Clone, Copy)]
pub struct ComponentDistribution {
    pub summary: CycleCalibrationSummary,
    pub cdf: PiecewiseCdf,
    pub provenance: CalibrationProvenance,
}

#[derive(Debug, Clone, Copy)]
pub struct Wild3MapCycleCalibration {
    pub map_internal_idx: usize,
    pub song: Wild3CalibrationSong,
    pub context: Wild3CalibrationContext,
    pub non_audio: CycleCalibrationSummary,
    pub distribution: &'static ComponentDistribution,
    pub combined_median: usize,
    pub joint_correction: Option<ComponentDistribution>,
}

const WALKING_LAND: Wild3CalibrationContext = Wild3CalibrationContext {
    action: Wild3Action::SweetScentLand,
    movement: Wild3MovementMode::OnFoot,
    sound_mode: Wild3SoundMode::Unspecified,
};

// Internal wild-header indices, not UI indices or map group/number pairs.
pub const WILD3_MAP_CYCLE_CALIBRATIONS: &[Wild3MapCycleCalibration] = &[
    Wild3MapCycleCalibration { map_internal_idx: 0, song: Wild3CalibrationSong::Route101,
        context: WALKING_LAND, non_audio: data::ROUTE101_NON_AUDIO.summary, distribution: &data::ROUTE101_NON_AUDIO, combined_median: data::ROUTE101_COMBINED_MEDIAN, joint_correction: data::ROUTE101_JOINT_CORRECTION },
    Wild3MapCycleCalibration { map_internal_idx: 1, song: Wild3CalibrationSong::Route101,
        context: WALKING_LAND, non_audio: data::ROUTE102_NON_AUDIO.summary, distribution: &data::ROUTE102_NON_AUDIO, combined_median: data::ROUTE102_COMBINED_MEDIAN, joint_correction: data::ROUTE102_JOINT_CORRECTION },
    Wild3MapCycleCalibration { map_internal_idx: 2, song: Wild3CalibrationSong::Route101,
        context: WALKING_LAND, non_audio: data::ROUTE103_NON_AUDIO.summary, distribution: &data::ROUTE103_NON_AUDIO, combined_median: data::ROUTE103_COMBINED_MEDIAN, joint_correction: data::ROUTE103_JOINT_CORRECTION },
    Wild3MapCycleCalibration { map_internal_idx: 3, song: Wild3CalibrationSong::Route104,
        context: WALKING_LAND, non_audio: data::ROUTE104_NON_AUDIO.summary, distribution: &data::ROUTE104_NON_AUDIO, combined_median: data::ROUTE104_COMBINED_MEDIAN, joint_correction: data::ROUTE104_JOINT_CORRECTION },
    Wild3MapCycleCalibration { map_internal_idx: 5, song: Wild3CalibrationSong::Route110,
        context: WALKING_LAND, non_audio: data::ROUTE110_NON_AUDIO.summary, distribution: &data::ROUTE110_NON_AUDIO, combined_median: data::ROUTE110_COMBINED_MEDIAN, joint_correction: data::ROUTE110_JOINT_CORRECTION },
    Wild3MapCycleCalibration { map_internal_idx: 14, song: Wild3CalibrationSong::PetalburgWoods,
        context: WALKING_LAND, non_audio: data::PETALBURG_WOODS_NON_AUDIO.summary, distribution: &data::PETALBURG_WOODS_NON_AUDIO, combined_median: data::PETALBURG_WOODS_COMBINED_MEDIAN, joint_correction: data::PETALBURG_WOODS_JOINT_CORRECTION },
    Wild3MapCycleCalibration { map_internal_idx: 8, song: Wild3CalibrationSong::Route113,
        context: WALKING_LAND, non_audio: data::ROUTE113_NON_AUDIO.summary, distribution: &data::ROUTE113_NON_AUDIO, combined_median: data::ROUTE113_COMBINED_MEDIAN, joint_correction: data::ROUTE113_JOINT_CORRECTION },
    Wild3MapCycleCalibration { map_internal_idx: 20, song: Wild3CalibrationSong::SafariZone,
        context: WALKING_LAND, non_audio: data::SAFARI_ZONE_SOUTH_NON_AUDIO.summary, distribution: &data::SAFARI_ZONE_SOUTH_NON_AUDIO, combined_median: data::SAFARI_ZONE_SOUTH_COMBINED_MEDIAN, joint_correction: data::SAFARI_ZONE_SOUTH_JOINT_CORRECTION },
    Wild3MapCycleCalibration { map_internal_idx: 114, song: Wild3CalibrationSong::RgSeviiCave,
        context: WALKING_LAND, non_audio: data::ALTERING_CAVE_NON_AUDIO.summary, distribution: &data::ALTERING_CAVE_NON_AUDIO, combined_median: data::ALTERING_CAVE_COMBINED_MEDIAN, joint_correction: data::ALTERING_CAVE_JOINT_CORRECTION },
];

// Default music assignments from Emerald map headers, using the encounter array order.
// Only songs with a recorded calibration need entries. Runtime music overrides are not
// represented by Wild3MapGameData (including Route 118's position-dependent music).
fn default_calibration_song(map: &Wild3MapGameData) -> Option<Wild3CalibrationSong> {
    match map.map_internal_idx {
        0 | 1 | 2 => Some(Wild3CalibrationSong::Route101),
        3 | 4 | 10 | 27 | 28 | 29 | 30 | 31 => Some(Wild3CalibrationSong::Route104),
        5 | 6 | 7 | 9 | 11 => Some(Wild3CalibrationSong::Route110),
        14 | 15 | 16 | 17 | 23 | 24 | 26 | 45 | 112 | 113 => Some(Wild3CalibrationSong::PetalburgWoods),
        8 => Some(Wild3CalibrationSong::Route113),
        20 | 72 | 73 | 74 | 97 | 98 => Some(Wild3CalibrationSong::SafariZone),
        114..=122 => Some(Wild3CalibrationSong::RgSeviiCave),
        _ => None,
    }
}

pub fn wild3_map_cycle_calibration(map: &Wild3MapGameData) -> &'static Wild3MapCycleCalibration {
    WILD3_MAP_CYCLE_CALIBRATIONS.iter()
        .find(|c| c.map_internal_idx == map.map_internal_idx)
        .or_else(|| {
            let song = default_calibration_song(map)?;
            WILD3_MAP_CYCLE_CALIBRATIONS.iter().find(|c| c.song == song)
        })
        .unwrap_or(&WILD3_MAP_CYCLE_CALIBRATIONS[0])
}

fn audio_distribution(song: Wild3CalibrationSong) -> &'static ComponentDistribution {
    match song {
        Wild3CalibrationSong::Route101 => &data::ROUTE101_AUDIO,
        Wild3CalibrationSong::Route104 => &data::ROUTE104_AUDIO,
        Wild3CalibrationSong::Route110 => &data::ROUTE110_AUDIO,
        Wild3CalibrationSong::PetalburgWoods => &data::PETALBURG_WOODS_AUDIO,
        Wild3CalibrationSong::Route113 => &data::ROUTE113_AUDIO,
        Wild3CalibrationSong::SafariZone => &data::SAFARI_ZONE_AUDIO,
        Wild3CalibrationSong::RgSeviiCave => &data::RG_SEVII_CAVE_AUDIO,
    }
}

pub fn wild3_audio_cycle_calibration(song: Wild3CalibrationSong) -> CycleCalibrationSummary {
    audio_distribution(song).summary
}

#[derive(Debug, Clone, Copy)]
pub(super) struct CalibratedCycleDistribution {
    pub min: usize,
    pub max: usize,
    independent: ConvolvedCdf,
    joint: Option<PiecewiseCdf>,
}

impl CalibratedCycleDistribution {
    pub fn probability(&self, start: f64, end: f64) -> f64 {
        if end <= start { return 0.0; }
        match self.joint {
            Some(cdf) => (cdf.less_than(end) - cdf.less_than(start)).clamp(0.0, 1.0),
            None => self.independent.probability(start, end),
        }
    }

    #[cfg(test)]
    fn median(&self) -> usize {
        let Some(cdf) = self.joint else { return self.independent.median(); };
        let mut lo = self.min as f64;
        let mut hi = self.max as f64;
        for _ in 0..48 {
            let mid = (lo + hi) / 2.0;
            if cdf.less_than(mid) < 0.5 { lo = mid; } else { hi = mid; }
        }
        (hi - 1e-7).ceil() as usize
    }
}

pub(super) fn calibration_model(
    action: Wild3Action, map: &Wild3MapGameData, context: Option<Wild3CalibrationContext>,
) -> Option<(CalibratedCycleDistribution, bool)> {
    let context = context.unwrap_or_else(|| Wild3CalibrationContext::walking(action));
    if action != Wild3Action::SweetScentLand || context != WALKING_LAND { return None; }
    let map_calibration = wild3_map_cycle_calibration(map);
    let audio = audio_distribution(map_calibration.song);
    let non_audio = map_calibration.distribution;
    let min = audio.summary.min + non_audio.summary.min;
    let max = audio.summary.max + non_audio.summary.max;
    Some((CalibratedCycleDistribution { min, max,
        independent: ConvolvedCdf { audio: audio.cdf, non_audio: non_audio.cdf, min, max },
        joint: map_calibration.joint_correction.map(|c| c.cdf),
    }, map_calibration.map_internal_idx != map.map_internal_idx))
}

/// An unmeasured context must not be excluded by another map's empirical bounds.
pub(super) fn calibration_filter_bounds(
    action: Wild3Action, map: &Wild3MapGameData, context: Option<Wild3CalibrationContext>,
) -> Option<(usize, usize, usize)> {
    let (model, fallback) = calibration_model(action, map, context)?;
    let median = wild3_map_cycle_calibration(map).combined_median;
    let calibration = wild3_map_cycle_calibration(map);
    let margin = audio_distribution(calibration.song).provenance.safety_margin_cycles
        + calibration.distribution.provenance.safety_margin_cycles;
    Some(if fallback { (0, median, VBLANK_FREQ - 1) }
        else { (model.min.saturating_sub(margin), median,
            model.max.saturating_add(margin).min(VBLANK_FREQ - 1)) })
}

#[derive(Debug, Clone, Serialize, Tsify)]
#[tsify(into_wasm_abi)]
pub struct Wild3CalibrationInfo {
    pub context: Wild3CalibrationContext,
    pub fallback: bool,
    pub supported: bool,
    pub empirical_bounds: bool,
    pub independent_full_loop_validation: bool,
    pub audio: Option<CalibrationProvenance>,
    pub non_audio: Option<CalibrationProvenance>,
    pub joint_correction: Option<CalibrationProvenance>,
}

#[wasm_bindgen]
pub fn get_wild3_calibration_info(
    action: Wild3Action, map: &Wild3MapGameData, context: Option<Wild3CalibrationContext>,
) -> Wild3CalibrationInfo {
    let context = context.unwrap_or_else(|| Wild3CalibrationContext::walking(action));
    let model = calibration_model(action, map, Some(context));
    let map_calibration = wild3_map_cycle_calibration(map);
    Wild3CalibrationInfo {
        context, supported: model.is_some(), fallback: model.is_none_or(|(_, fallback)| fallback),
        empirical_bounds: model.is_some(), independent_full_loop_validation: false,
        audio: model.map(|_| audio_distribution(map_calibration.song).provenance),
        non_audio: model.map(|_| map_calibration.distribution.provenance),
        joint_correction: model.and_then(|_| map_calibration.joint_correction.map(|c| c.provenance)),
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    fn map(index: usize) -> Wild3MapGameData {
        Wild3MapGameData { map_internal_idx: index, ..Default::default() }
    }

    #[test]
    fn measured_maps_share_audio_but_keep_separate_non_audio_and_bounds() {
        let expected = [(0, 34_686, 72_512), (1, 34_686, 72_512), (2, 34_686, 72_512),
            (3, 43_025, 76_319), (5, 41_571, 73_493),
            (14, 34_400, 70_987), (8, 36_138, 69_469), (20, 42_238, 68_168)];
        for (index, min, max) in expected {
            let (model, fallback) = calibration_model(Wild3Action::SweetScentLand, &map(index), None).unwrap();
            assert!(!fallback);
            assert_eq!((model.min, model.max), (min, max));
            assert_eq!(model.probability(min as f64, max as f64 + 1.0), 1.0);
            assert!(model.median() >= min && model.median() <= max);
            let info = get_wild3_calibration_info(Wild3Action::SweetScentLand, &map(index), None);
            assert!(!info.fallback);
            assert!(!info.audio.unwrap().incomplete_loop);
        }
        assert!(std::ptr::eq(audio_distribution(wild3_map_cycle_calibration(&map(0)).song),
            audio_distribution(wild3_map_cycle_calibration(&map(1)).song)));
        assert_ne!(wild3_map_cycle_calibration(&map(0)).distribution.provenance.source,
            wild3_map_cycle_calibration(&map(1)).distribution.provenance.source);
    }

    #[test]
    fn altering_cave_uses_its_measured_song_and_bounds() {
        let (model, fallback) = calibration_model(Wild3Action::SweetScentLand, &map(114), None).unwrap();
        assert!(!fallback);
        assert_eq!((model.min, model.max), (42_052, 70_087));
        let info = get_wild3_calibration_info(Wild3Action::SweetScentLand, &map(114), None);
        let audio = info.audio.unwrap();
        assert_eq!(audio.source, "altering_cave_walk_sweet_scent.txt");
        assert_eq!(audio.attempts, 5523);
        assert!(audio.incomplete_loop);
        assert_eq!(wild3_map_cycle_calibration(&map(114)).song, Wild3CalibrationSong::RgSeviiCave);
    }

    #[test]
    fn fallback_is_explicit_and_does_not_narrow_filtering() {
        let bounds = calibration_filter_bounds(Wild3Action::SweetScentLand, &map(999), None).unwrap();
        assert_eq!((bounds.0, bounds.2), (0, VBLANK_FREQ - 1));
        assert!(get_wild3_calibration_info(Wild3Action::SweetScentLand, &map(999), None).fallback);
        let bike = Wild3CalibrationContext { movement: Wild3MovementMode::Bike, ..WALKING_LAND };
        assert!(calibration_model(Wild3Action::SweetScentLand, &map(0), Some(bike)).is_none());
        for action in [Wild3Action::SweetScentWater, Wild3Action::OldRod, Wild3Action::RockSmash] {
            assert!(calibration_model(action, &map(0), None).is_none());
        }
    }

    #[test]
    fn generated_cdfs_are_monotone_normalized_and_preserve_support() {
        for component in [&data::ROUTE101_AUDIO, &data::ROUTE104_AUDIO, &data::ROUTE110_AUDIO,
            &data::ROUTE101_NON_AUDIO, &data::ROUTE102_NON_AUDIO, &data::ROUTE103_NON_AUDIO,
            &data::ROUTE104_NON_AUDIO, &data::ROUTE110_NON_AUDIO,
            &data::PETALBURG_WOODS_AUDIO, &data::PETALBURG_WOODS_NON_AUDIO,
            &data::ROUTE113_AUDIO, &data::ROUTE113_NON_AUDIO,
            &data::SAFARI_ZONE_AUDIO, &data::SAFARI_ZONE_SOUTH_NON_AUDIO] {
            let knots = component.cdf.knots;
            assert_eq!(knots[0].probability, 0.0);
            assert_eq!(knots.last().unwrap().probability, 1.0);
            assert_eq!(knots[0].cycle, component.summary.min as f64);
            assert_eq!(knots.last().unwrap().cycle, component.summary.max as f64);
            assert!(component.provenance.max_cdf_error <= 0.0025);
            for pair in knots.windows(2) {
                assert!(pair[0].cycle <= pair[1].cycle);
                assert!(pair[0].probability <= pair[1].probability);
                let expected = pair[0].integral + (pair[1].cycle - pair[0].cycle)
                    * (pair[0].probability + pair[1].probability) / 2.0;
                assert!((pair[1].integral - expected).abs() < 1e-8);
            }
        }
    }

    #[test]
    fn initial_bounds_and_likelihood_use_the_same_context() {
        use crate::gen3::{CycleFrameCounter, CycleRange, Wild3GeneratorCycleOpts,
            Wild3GeneratorOptions, calculate_method_probability_with_context};
        for index in [0, 1, 2, 3, 5, 8, 14, 20, 114] {
            let map = map(index);
            let (model, _) = calibration_model(Wild3Action::SweetScentLand, &map, None).unwrap();
            assert_eq!(model.median(), wild3_map_cycle_calibration(&map).combined_median);
            let opts = Wild3GeneratorOptions {
                cycle_opts: Wild3GeneratorCycleOpts::LikelihoodForLead { lead_cycle_spd: 0 },
                ..Default::default()
            };
            match CycleFrameCounter::new(&opts, &map) {
                CycleFrameCounter::MinMaxRange { min_max_cycles, .. } => {
                    assert_eq!(min_max_cycles.min_cycle.cycle, model.min);
                    assert_eq!(min_max_cycles.max_cycle.cycle, model.max);
                }
                _ => panic!("Expected calibrated range"),
            }
            let p = |start, len| calculate_method_probability_with_context(
                &CycleRange::from_start_len(start, len), Wild3Action::SweetScentLand, &map, None);
            assert_eq!(p(model.min as i32 - 10, 10), 0.0);
            assert_eq!(p(model.max as i32 + 1, 10), 0.0);
            assert_eq!(p(model.min as i32, model.max - model.min + 1), 1.0);
            assert_eq!(p(50_000, 0), 0.0);
        }
    }

    #[test]
    fn ideal_speed_maximizes_the_model_probability() {
        use crate::gen3::{CycleRange, CycleAndModRange, calculate_cycle_data,
            calculate_ideal_lead_pid_cycle_count, FASTEST_MODULO_CYCLE_24, SLOWEST_MODULO_CYCLE_24};
        for index in [0, 3, 5] {
            for len in [256, 8_192, 39_309] {
                let map = map(index);
                let range: CycleAndModRange = CycleRange::new(190_451, 80, len);
                let best = calculate_ideal_lead_pid_cycle_count(&range, Wild3Action::SweetScentLand, &map, None);
                let score = calculate_cycle_data(&range, Wild3Action::SweetScentLand, best, &map, None).method_probability;
                for speed in FASTEST_MODULO_CYCLE_24..=SLOWEST_MODULO_CYCLE_24 {
                    assert!(score + 1e-12 >= calculate_cycle_data(&range, Wild3Action::SweetScentLand,
                        speed, &map, None).method_probability);
                }
            }
        }
    }

    #[test]
    fn missing_context_deserializes_and_unmeasured_actions_keep_legacy_estimates() {
        use crate::gen3::{Wild3GeneratorOptions, get_min_mid_max_pre_sweet_scent_cycle_for_map,
            calculate_method_probability_with_context, CycleRange};
        let mut json = serde_json::to_value(Wild3GeneratorOptions::default()).unwrap();
        json.as_object_mut().unwrap().remove("calibration_context");
        let options: Wild3GeneratorOptions = serde_json::from_value(json).unwrap();
        assert!(options.calibration_context.is_none());
        for action in [Wild3Action::OldRod, Wild3Action::GoodRod, Wild3Action::SuperRod, Wild3Action::SweetScentWater] {
            assert_eq!(get_min_mid_max_pre_sweet_scent_cycle_for_map(action, &map(3)), (45_000, 55_000, 75_000));
            assert_eq!(calculate_method_probability_with_context(&CycleRange::from_start_len(45_000, 15_000),
                action, &map(3), None), 0.5);
        }
        assert_eq!(get_min_mid_max_pre_sweet_scent_cycle_for_map(Wild3Action::RockSmash, &map(3)),
            (30_000, 52_500, 75_000));
    }

    #[test]
    fn petalburg_uses_the_measured_joint_correction() {
        let map = map(14);
        let calibration = wild3_map_cycle_calibration(&map);
        let joint = calibration.joint_correction.expect("Petalburg needs a joint model");
        let (model, fallback) = calibration_model(Wild3Action::SweetScentLand, &map, None).unwrap();
        assert!(!fallback);
        assert_eq!((joint.summary.min, joint.summary.max), (34_418, 70_955));
        assert!(get_wild3_calibration_info(Wild3Action::SweetScentLand, &map, None).joint_correction.is_some());
        let difference = joint.cdf.knots.iter().map(|k| {
            let threshold = k.cycle + 1e-7;
            let corrected = model.probability(0.0, threshold);
            assert!((corrected - joint.cdf.less_than(threshold)).abs() < 1e-12);
            (corrected - model.independent.less_than(threshold)).abs()
        }).fold(0.0_f64, f64::max);
        assert!(difference > 0.02);
    }

    #[test]
    fn fallback_uses_the_first_calibrated_map_with_the_same_default_song() {
        for (index, expected) in [(31, 3), (10, 3), (6, 5), (11, 5),
            (15, 14), (112, 14), (72, 20), (98, 20)] {
            let requested = map(index);
            let selected = wild3_map_cycle_calibration(&requested);
            assert_eq!(selected.map_internal_idx, expected);
            assert_eq!(selected.distribution.provenance.sha256,
                wild3_map_cycle_calibration(&map(expected)).distribution.provenance.sha256);
            assert_eq!(Some(selected.song), default_calibration_song(&requested));
            assert!(get_wild3_calibration_info(Wild3Action::SweetScentLand, &requested, None).fallback);
            let bounds = calibration_filter_bounds(Wild3Action::SweetScentLand, &requested, None).unwrap();
            assert_eq!((bounds.0, bounds.2), (0, VBLANK_FREQ - 1));
        }
    }

    #[test]
    fn exact_matches_win_and_unavailable_songs_use_route101() {
        for calibrated in WILD3_MAP_CYCLE_CALIBRATIONS {
            let requested = map(calibrated.map_internal_idx);
            let selected = wild3_map_cycle_calibration(&requested);
            assert_eq!(selected.map_internal_idx, calibrated.map_internal_idx);
            assert_eq!(selected.distribution.provenance.sha256, calibrated.distribution.provenance.sha256);
            assert_eq!(default_calibration_song(&requested), Some(calibrated.song));
        }
        // Victory Road and Route 119 have no recorded song model; 999 is unknown.
        for index in [19, 33, 999] {
            assert_eq!(wild3_map_cycle_calibration(&map(index)).map_internal_idx, 0);
        }
    }
}
