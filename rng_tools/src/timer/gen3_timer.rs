use super::{console::Console, frame_timer};
use serde::{Deserialize, Serialize};
use tsify_next::Tsify;
use wasm_bindgen::prelude::*;

#[derive(Debug, Clone, Copy, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct Gen3TimerSettings {
    pub console: Console,
    pub pre_timer: f32,
    pub target_frame: f32,
    pub calibration: f32,
}

fn create(settings: Gen3TimerSettings) -> [f32; 2] {
    let [phase1, phase2] = frame_timer::create(
        settings.console.to_calibrator(),
        settings.pre_timer,
        settings.target_frame,
        settings.calibration,
    );
    [phase1.floor(), phase2.floor()]
}

fn calibrate(settings: Gen3TimerSettings, hit_frame: f32) -> Gen3TimerSettings {
    let calibration = settings.calibration
        + frame_timer::calibrate(
            settings.console.to_calibrator(),
            settings.target_frame,
            hit_frame,
        );
    Gen3TimerSettings {
        calibration,
        ..settings
    }
}

#[wasm_bindgen]
pub fn create_gen3_timer(settings: Gen3TimerSettings) -> Vec<f32> {
    create(settings).to_vec()
}

#[wasm_bindgen]
pub fn calibrate_gen3_timer(settings: Gen3TimerSettings, hit_frame: f32) -> Gen3TimerSettings {
    calibrate(settings, hit_frame)
}

#[cfg(test)]
mod test {
    use super::*;

    #[test]
    fn double_calibrate() {
        let settings = Gen3TimerSettings {
            console: Console::Gba,
            pre_timer: 5000.0,
            target_frame: 1000.0,
            calibration: 0.0,
        };
        let settings = calibrate(settings, 900.0);
        let settings = calibrate(settings, 600.0);
        let result = create(settings);
        assert_eq!(settings.calibration, 8371.354);
        assert_eq!(result, [5000.0, 25114.0]);
    }
}
