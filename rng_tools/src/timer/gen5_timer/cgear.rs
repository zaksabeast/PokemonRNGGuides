use super::super::{console::Console, delay_timer};
use serde::{Deserialize, Serialize};
use tsify_next::Tsify;
use wasm_bindgen::prelude::*;

#[derive(Debug, Clone, Copy, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct Gen5CGearTimerSettings {
    pub console: Console,
    pub target_delay: f32,
    pub target_second: f32,
    pub calibration: f32,
}

fn create(settings: Gen5CGearTimerSettings) -> [f32; 2] {
    let [phase1, phase2] = delay_timer::create(
        settings.console,
        settings.target_delay,
        settings.target_second,
        settings.calibration,
    );
    [phase1.floor(), phase2.floor()]
}

fn calibrate(settings: Gen5CGearTimerSettings, hit_delay: f32) -> Gen5CGearTimerSettings {
    let calibrator = settings.console.to_calibrator();
    let calibration = delay_timer::calibrate(&calibrator, settings.target_delay, hit_delay);
    let calibration = calibrator.calibrate_to_delays(calibration);
    Gen5CGearTimerSettings {
        calibration: settings.calibration + calibration,
        ..settings
    }
}

#[wasm_bindgen]
pub fn create_gen5_cgear_timer(settings: Gen5CGearTimerSettings) -> Vec<f32> {
    create(settings).to_vec()
}

#[wasm_bindgen]
pub fn calibrate_gen5_cgear_timer(
    settings: Gen5CGearTimerSettings,
    hit_delay: f32,
) -> Gen5CGearTimerSettings {
    calibrate(settings, hit_delay)
}

#[cfg(test)]
mod test {
    use super::*;

    #[test]
    fn test_create() {
        let settings = Gen5CGearTimerSettings {
            console: Console::THREEDS,
            target_delay: 1200.0,
            target_second: 50.0,
            calibration: -95.0,
        };
        assert_eq!(create(settings), [30046.0, 20153.0]);
    }

    #[test]
    fn test_calibrate() {
        let settings = Gen5CGearTimerSettings {
            console: Console::THREEDS,
            target_delay: 1200.0,
            target_second: 50.0,
            calibration: -95.0,
        };
        let settings = calibrate(settings, 1199.0);
        assert_eq!(settings.calibration, -96.0);
        assert_eq!(create(settings), [30045.0, 20154.0]);
    }
}
