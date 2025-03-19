use super::console::Console;
use super::delay_timer;
use serde::{Deserialize, Serialize};
use tsify_next::Tsify;
use wasm_bindgen::prelude::*;

#[derive(Debug, Clone, Copy, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct Gen4TimerSettings {
    pub console: Console,
    pub min_time_ms: f32,
    pub target_delay: f32,
    pub target_second: f32,
    pub calibrated_delay: f32,
    pub calibrated_second: f32,
}

fn get_calibration(console: Console, calibrated_delay: f32, calibrated_second: f32) -> f32 {
    console
        .to_calibrator()
        .create_calibration(calibrated_delay, calibrated_second)
}

pub fn create(settings: Gen4TimerSettings) -> [f32; 2] {
    let [phase1, phase2] = delay_timer::create(
        settings.console,
        settings.min_time_ms,
        settings.target_delay,
        settings.target_second,
        get_calibration(
            settings.console,
            settings.calibrated_delay,
            settings.calibrated_second,
        ),
    );
    [phase1.floor(), phase2.floor()]
}

pub fn calibrate(settings: Gen4TimerSettings, hit_delay: f32) -> Gen4TimerSettings {
    if hit_delay <= 0.0 {
        return settings;
    }

    let calibrator = settings.console.to_calibrator();
    let calibration = calibrator.to_delays(delay_timer::calibrate(
        &calibrator,
        settings.target_delay,
        hit_delay,
    ));

    Gen4TimerSettings {
        calibrated_delay: settings.calibrated_delay + calibration,
        ..settings
    }
}

#[wasm_bindgen]
pub fn create_gen4_timer(settings: Gen4TimerSettings) -> Vec<f32> {
    create(settings).to_vec()
}

#[wasm_bindgen]
pub fn calibrate_gen4_timer(settings: Gen4TimerSettings, hit_delay: f32) -> Gen4TimerSettings {
    calibrate(settings, hit_delay)
}

#[cfg(test)]
mod test {
    use super::*;

    #[test]
    fn test_create() {
        let settings = Gen4TimerSettings {
            console: Console::NDSSLOT1,
            min_time_ms: 14000.0,
            calibrated_delay: 500.0,
            calibrated_second: 14.0,
            target_delay: 600.0,
            target_second: 50.0,
        };
        let result = create(settings);
        assert_eq!(result, [34537.0, 15662.0]);

        let settings = Gen4TimerSettings {
            console: Console::NDSSLOT1,
            min_time_ms: 14000.0,
            calibrated_delay: 399.0,
            calibrated_second: 14.0,
            target_delay: 600.0,
            target_second: 50.0,
        };
        let result = create(settings);
        assert_eq!(result, [32849.0, 17350.0]);
    }

    #[test]
    fn test_calibrate() {
        let settings = Gen4TimerSettings {
            console: Console::NDSSLOT1,
            min_time_ms: 14000.0,
            calibrated_delay: 500.0,
            calibrated_second: 14.0,
            target_delay: 600.0,
            target_second: 50.0,
        };
        let settings = calibrate(settings, 500.0);
        assert_eq!(settings.calibrated_delay, 400.0);
        let result = create(settings);
        assert_eq!(result, [32866.0, 17333.0]);
    }
}
