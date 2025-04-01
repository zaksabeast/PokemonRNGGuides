use super::super::{console::Console, second_timer};
use serde::{Deserialize, Serialize};
use tsify_next::Tsify;
use wasm_bindgen::prelude::*;

#[derive(Debug, Clone, Copy, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct Gen5StandardTimerSettings {
    pub console: Console,
    pub min_time_ms: f32,
    pub target_second: f32,
    pub calibration: f32,
}

fn create(settings: Gen5StandardTimerSettings) -> f32 {
    second_timer::create(
        settings.min_time_ms,
        settings.target_second,
        settings.calibration,
    )
}

fn calibrate(settings: Gen5StandardTimerSettings, hit_second: f32) -> Gen5StandardTimerSettings {
    let calibration = second_timer::calibrate(settings.target_second, hit_second);
    let calibration = settings
        .console
        .to_calibrator()
        .calibrate_to_delays(calibration);
    Gen5StandardTimerSettings {
        calibration: settings.calibration + calibration,
        ..settings
    }
}

#[wasm_bindgen]
pub fn create_gen5_standard_timer(settings: Gen5StandardTimerSettings) -> Vec<f32> {
    vec![create(settings)]
}

#[wasm_bindgen]
pub fn calibrate_gen5_standard_timer(
    settings: Gen5StandardTimerSettings,
    hit_second: f32,
) -> Gen5StandardTimerSettings {
    calibrate(settings, hit_second)
}

#[cfg(test)]
mod test {
    use super::*;

    #[test]
    fn test_create() {
        let settings = Gen5StandardTimerSettings {
            console: Console::ThreeDs,
            min_time_ms: 14000.0,
            target_second: 50.0,
            calibration: -95.0,
        };
        assert_eq!(create(settings), 50105.0);
    }

    #[test]
    fn test_calibrate() {
        let settings = Gen5StandardTimerSettings {
            console: Console::ThreeDs,
            min_time_ms: 14000.0,
            target_second: 50.0,
            calibration: -95.0,
        };
        let settings = calibrate(settings, 49.0);
        assert_eq!(settings.calibration, -66.0);
        assert_eq!(create(settings), 50134.0);
    }
}
