use super::calibrator::Calibrator;

fn create_phase(calibrator: Calibrator, target_frame: f32, calibration: f32) -> f32 {
    calibrator.to_ms(target_frame) + calibration
}

pub fn create(
    calibrator: Calibrator,
    pre_timer: f32,
    target_frame: f32,
    calibration: f32,
) -> [f32; 2] {
    [
        pre_timer,
        create_phase(calibrator, target_frame, calibration),
    ]
}

pub fn calibrate(calibrator: Calibrator, target_frame: f32, hit_frame: f32) -> f32 {
    calibrator.to_ms(target_frame - hit_frame)
}

#[cfg(test)]
mod test {
    use super::*;

    #[test]
    fn test_create() {
        let calibrator = Calibrator::new(1.0);
        let result = create(calibrator, 5000.0, 1000.0, 0.0);
        assert_eq!(result, [5000.0, 1000.0]);
    }

    mod calibrate {
        use super::*;

        #[test]
        fn target_equals_hit() {
            let calibrator = Calibrator::new(1.0);
            let result = calibrate(calibrator, 0.0, 0.0);
            assert_eq!(result, 0.0);
        }

        #[test]
        fn target_greater_than_hit() {
            let calibrator = Calibrator::new(1.0);
            let result = calibrate(calibrator, 1000.0, 950.0);
            assert_eq!(result, 50.0);
        }

        #[test]
        fn target_less_than_hit() {
            let calibrator = Calibrator::new(1.0);
            let result = calibrate(calibrator, 1000.0, 1050.0);
            assert_eq!(result, -50.0);
        }
    }
}
