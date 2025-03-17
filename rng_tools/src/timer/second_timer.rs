use super::min_time::to_minimum_length;

pub fn create(target_second: f32, calibration: f32) -> f32 {
    to_minimum_length(target_second * 1000.0 + calibration + 200.0)
}

pub fn calibrate(target_second: f32, hit_second: f32) -> f32 {
    if hit_second < target_second {
        ((target_second - hit_second) * 1000.0) - 500.0
    } else if hit_second > target_second {
        ((target_second - hit_second) * 1000.0) + 500.0
    } else {
        0.0
    }
}

#[cfg(test)]
mod test {
    use super::*;

    mod create {
        use super::*;

        #[test]
        fn less_than_min_length() {
            assert_eq!(create(1.0, 0.0), 61_200.0);
        }

        #[test]
        fn greater_than_min_length() {
            assert_eq!(create(50.0, 0.0), 50_200.0);
        }
    }

    mod calibrate {
        use super::*;

        #[test]
        fn equal() {
            assert_eq!(calibrate(1.0, 1.0), 0.0);
        }

        #[test]
        fn less_than() {
            assert_eq!(calibrate(1.0, 0.0), 500.0);
        }

        #[test]
        fn greater_than() {
            assert_eq!(calibrate(1.0, 2.0), -500.0);
        }
    }
}
