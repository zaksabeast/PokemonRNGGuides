use super::console::Console;
use super::entralink_timer;
use serde::{Deserialize, Serialize};
use tsify_next::Tsify;

const ENTRALINK_FRAME_RATE: f32 = 0.837_148_9;

fn create_enhanded_entralink(
    phases: [f32; 2],
    target_advances: f32,
    frame_rate: f32,
    frame_calibration: f32,
) -> [f32; 3] {
    let phase2 = (target_advances / frame_rate) * 1000.0 + frame_calibration;
    [phases[0].floor(), phases[1].floor(), phase2.floor()]
}

#[derive(Debug, Clone, Copy, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct Gen5EntralinkPlusTimerSettings {
    pub console: Console,
    pub min_time_ms: f32,
    pub target_delay: f32,
    pub target_second: f32,
    pub target_advances: f32,
    pub calibration: f32,
    pub entralink_calibration: f32,
    pub frame_calibration: f32,
}

pub fn create(opts: &Gen5EntralinkPlusTimerSettings) -> [f32; 3] {
    let phases = entralink_timer::create(
        opts.console,
        opts.min_time_ms,
        opts.target_delay,
        opts.target_second,
        opts.calibration,
        opts.entralink_calibration,
    );

    create_enhanded_entralink(
        phases,
        opts.target_advances,
        ENTRALINK_FRAME_RATE,
        opts.frame_calibration,
    )
}

pub fn calibrate(target_advances: f32, hit_advances: f32) -> f32 {
    ((target_advances - hit_advances) / ENTRALINK_FRAME_RATE) * 1000.0
}

#[cfg(test)]
mod test {
    use super::*;

    #[test]
    fn create() {
        let result = create_enhanded_entralink([1.0, 2.0], 3.0, 0.837148929, 6.0);
        assert_eq!(result, [1.0, 2.0, 3589.0]);
    }

    mod calibrate {
        use super::*;

        #[test]
        fn target_equals_hit() {
            let result = calibrate(1.0, 1.0);
            assert_eq!(result, 0.0);
        }

        #[test]
        fn target_less_than_hit() {
            let result = calibrate(1.0, 2.0);
            assert_eq!(result, -1194.5305851308087);
        }

        #[test]
        fn target_greater_than_hit() {
            let result = calibrate(1.0, 0.0);
            assert_eq!(result, 1194.5305851308087);
        }
    }
}
