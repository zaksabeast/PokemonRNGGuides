use super::console::Console;
use super::delay_timer;

fn create_entralink(phases: [f32; 2], entralink_calibration: f32) -> [f32; 2] {
    [
        (phases[0] + 250.0).floor(),
        (phases[1] - entralink_calibration).floor(),
    ]
}

pub fn create(
    console: Console,
    min_time_ms: f32,
    target_delay: f32,
    target_second: f32,
    calibration: f32,
    entralink_calibration: f32,
) -> [f32; 2] {
    let phases = delay_timer::create(
        console,
        min_time_ms,
        target_delay,
        target_second,
        calibration,
    );
    create_entralink(phases, entralink_calibration)
}

pub fn calibrate(console: Console, target_delay: f32, hit_delay: f32) -> f32 {
    delay_timer::calibrate(&console.to_calibrator(), target_delay, hit_delay)
}

#[cfg(test)]
mod test {
    use super::*;

    #[test]
    fn create() {
        let result = create_entralink([0.0, 0.0], 400.0);
        assert_eq!(result, [250.0, -400.0]);
    }
}
