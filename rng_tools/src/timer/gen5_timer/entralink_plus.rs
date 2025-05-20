use crate::timer::enhanced_entralink_timer::Gen5EntralinkPlusTimerSettings;

use super::super::{console::Console, enhanced_entralink_timer, entralink_timer, second_timer};
use wasm_bindgen::prelude::*;

fn get_second_calibration(console: Console, target_second: f32, hit_second: f32) -> f32 {
    let calibration = second_timer::calibrate(target_second, hit_second);
    console.to_calibrator().calibrate_to_delays(calibration)
}

fn get_entralink_calibration(console: Console, target_delay: f32, hit_delay: f32) -> f32 {
    let calibration = entralink_timer::calibrate(console, target_delay, hit_delay);
    console.to_calibrator().calibrate_to_delays(calibration)
}

fn get_advances_calibration(target_advances: f32, hit_advances: f32) -> f32 {
    enhanced_entralink_timer::calibrate(target_advances, hit_advances)
}

fn create(settings: &Gen5EntralinkPlusTimerSettings) -> [f32; 3] {
    enhanced_entralink_timer::create(settings)
}

fn calibrate(
    settings: Gen5EntralinkPlusTimerSettings,
    hit_second: f32,
    hit_delay: f32,
    hit_advances: f32,
) -> Gen5EntralinkPlusTimerSettings {
    let mut calibration = settings.calibration;
    let mut entralink_calibration = settings.entralink_calibration;
    let mut frame_calibration = settings.frame_calibration;

    if hit_second != settings.target_second {
        calibration += get_second_calibration(settings.console, settings.target_second, hit_second);
    }

    if hit_delay != settings.target_delay {
        entralink_calibration +=
            get_entralink_calibration(settings.console, settings.target_delay, hit_delay);
    }

    if hit_advances != settings.target_advances {
        frame_calibration += get_advances_calibration(settings.target_advances, hit_advances)
    }
    Gen5EntralinkPlusTimerSettings {
        calibration,
        entralink_calibration,
        frame_calibration,
        ..settings
    }
}

#[wasm_bindgen]
pub fn create_gen5_entralink_plus_timer(settings: &Gen5EntralinkPlusTimerSettings) -> Vec<f32> {
    create(settings).to_vec()
}

#[wasm_bindgen]
pub fn calibrate_gen5_entralink_plus_timer(
    settings: Gen5EntralinkPlusTimerSettings,
    hit_second: f32,
    hit_delay: f32,
    hit_advances: f32,
) -> Gen5EntralinkPlusTimerSettings {
    calibrate(settings, hit_second, hit_delay, hit_advances)
}

#[cfg(test)]
mod test {
    use super::*;

    #[test]
    fn test_create() {
        let settings = Gen5EntralinkPlusTimerSettings {
            console: Console::ThreeDs,
            min_time_ms: 14000.0,
            target_delay: 1200.0,
            target_second: 50.0,
            target_advances: 100.0,
            calibration: -95.0,
            entralink_calibration: 256.0,
            frame_calibration: 0.0,
        };
        assert_eq!(create(&settings), [30296.0, 19897.0, 119453.0]);
    }

    #[test]
    fn test_calibrate() {
        let settings = Gen5EntralinkPlusTimerSettings {
            console: Console::ThreeDs,
            min_time_ms: 14000.0,
            target_delay: 1200.0,
            target_second: 50.0,
            target_advances: 100.0,
            calibration: -95.0,
            entralink_calibration: 256.0,
            frame_calibration: 0.0,
        };
        let settings = calibrate(settings, 49.0, 1199.0, 99.0);
        assert_eq!(settings.calibration, -66.0);
        assert_eq!(settings.entralink_calibration, 255.0);
        assert_eq!(settings.frame_calibration, 1194.5306);
        assert_eq!(create(&settings), [30325.0, 19869.0, 120647.0]);
    }
}
