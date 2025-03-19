use super::super::{console::Console, entralink_timer, second_timer};
use serde::{Deserialize, Serialize};
use tsify_next::Tsify;
use wasm_bindgen::prelude::*;

fn get_second_calibration(console: Console, target_second: f32, hit_second: f32) -> f32 {
    let calibration = second_timer::calibrate(target_second, hit_second);
    console.to_calibrator().calibrate_to_delays(calibration)
}

fn get_entralink_calibration(console: Console, target_delay: f32, hit_delay: f32) -> f32 {
    let calibration = entralink_timer::calibrate(console, target_delay, hit_delay);
    console.to_calibrator().calibrate_to_delays(calibration)
}

#[derive(Debug, Clone, Copy, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct Gen5EntralinkTimerSettings {
    pub console: Console,
    pub min_time_ms: f32,
    pub target_delay: f32,
    pub target_second: f32,
    pub calibration: f32,
    pub entralink_calibration: f32,
}

fn create(settings: Gen5EntralinkTimerSettings) -> [f32; 2] {
    entralink_timer::create(
        settings.console,
        settings.min_time_ms,
        settings.target_delay,
        settings.target_second,
        settings.calibration,
        settings.entralink_calibration,
    )
}

fn calibrate(
    settings: Gen5EntralinkTimerSettings,
    hit_second: f32,
    hit_delay: f32,
) -> Gen5EntralinkTimerSettings {
    let mut calibration = settings.calibration;
    let mut entralink_calibration = settings.entralink_calibration;
    if hit_second != settings.target_second {
        calibration += get_second_calibration(settings.console, settings.target_delay, hit_second);
    }

    if hit_delay != settings.target_delay {
        entralink_calibration +=
            get_entralink_calibration(settings.console, settings.target_delay, hit_delay);
    }

    Gen5EntralinkTimerSettings {
        calibration,
        entralink_calibration,
        ..settings
    }
}

#[wasm_bindgen]
pub fn create_gen5_entralink_timer(settings: Gen5EntralinkTimerSettings) -> Vec<f32> {
    create(settings).to_vec()
}

#[wasm_bindgen]
pub fn calibrate_gen5_entralink_timer(
    settings: Gen5EntralinkTimerSettings,
    hit_second: f32,
    hit_delay: f32,
) -> Gen5EntralinkTimerSettings {
    calibrate(settings, hit_second, hit_delay)
}

#[cfg(test)]
mod test {

    use super::*;

    #[test]
    fn test_create() {
        let settings = Gen5EntralinkTimerSettings {
            console: Console::THREEDS,
            min_time_ms: 14000.0,
            target_delay: 1200.0,
            target_second: 50.0,
            calibration: 892.0,
            entralink_calibration: 256.0,
        };
        assert_eq!(create(settings), [31283.0, 18910.0]);
    }

    #[test]
    fn test_calibrate() {
        let settings = Gen5EntralinkTimerSettings {
            console: Console::THREEDS,
            min_time_ms: 14000.0,
            target_delay: 1200.0,
            target_second: 50.0,
            calibration: 892.0,
            entralink_calibration: 256.0,
        };
        let settings = calibrate(settings, 49.0, 1199.0);
        assert_eq!(settings.calibration, 69721.0);
        assert_eq!(settings.entralink_calibration, 255.0);
        assert_eq!(create(settings), [100112.0, -49918.0]);
    }
}
