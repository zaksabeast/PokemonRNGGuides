use super::calibrator::Calibrator;
use super::console::Console;
use super::min_time::to_minimum_length;
use super::second_timer;

const CLOSE_THRESHOLD: f32 = 167.0;
const UPDATE_FACTOR: f32 = 1.0;
const CLOSE_UPDATE_FACTOR: f32 = 0.75;

pub fn create(
    console: Console,
    target_delay: f32,
    target_second: f32,
    calibration: f32,
) -> [f32; 2] {
    let calibrator = console.to_calibrator();
    [
        create_phase_1(&calibrator, target_delay, target_second, calibration),
        create_phase_2(&calibrator, target_delay, calibration),
    ]
}

fn create_phase_1(
    calibrator: &Calibrator,
    target_delay: f32,
    target_second: f32,
    calibration: f32,
) -> f32 {
    to_minimum_length(
        second_timer::create(target_second, calibration) - calibrator.to_ms(target_delay),
    )
}

fn create_phase_2(calibrator: &Calibrator, target_delay: f32, calibration: f32) -> f32 {
    calibrator.to_ms(target_delay) - calibration
}

pub fn calibrate(calibrator: &Calibrator, target_delay: f32, hit_delay: f32) -> f32 {
    let delta = calibrator.to_ms(hit_delay) - calibrator.to_ms(target_delay);
    if delta.abs() <= CLOSE_THRESHOLD {
        delta * CLOSE_UPDATE_FACTOR
    } else {
        delta * UPDATE_FACTOR
    }
}

#[cfg(test)]
mod test {
    use super::*;

    #[test]
    fn create() {
        let calibrator = Calibrator::new(1.0);
        let phase1 = create_phase_1(&calibrator, 600.0, 50.0, 0.0);
        let phase2 = create_phase_2(&calibrator, 600.0, 0.0);
        let result = [phase1, phase2];
        assert_eq!(result, [49_600.0, 600.0]);
    }

    mod calibrate {
        use super::*;

        #[test]
        fn zero() {
            let calibrator = Calibrator::new(1.0);
            let result = calibrate(&calibrator, 0.0, 0.0);
            assert_eq!(result, 0.0);
        }

        #[test]
        fn less_than_close_threshold() {
            let calibrator = Calibrator::new(1.0);
            let result = calibrate(&calibrator, 0.0, 1.0);
            assert_eq!(result, 0.75);
        }

        #[test]
        fn greater_than_close_threshold() {
            let calibrator = Calibrator::new(1.0);
            let result = calibrate(&calibrator, 0.0, CLOSE_THRESHOLD + 1.0);
            assert_eq!(result, 168.0);
        }

        #[test]
        fn equal_to_close_threshold() {
            let calibrator = Calibrator::new(1.0);
            let result = calibrate(&calibrator, 0.0, CLOSE_THRESHOLD);
            assert_eq!(result, 125.25);
        }
    }
}
