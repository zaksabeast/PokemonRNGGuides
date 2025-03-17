pub struct Calibrator {
    framerate: f32,
}

impl Calibrator {
    pub fn new(framerate: f32) -> Self {
        Self { framerate }
    }

    pub fn to_delays(&self, milliseconds: f32) -> f32 {
        (milliseconds / self.framerate).floor()
    }

    pub fn to_ms(&self, delays: f32) -> f32 {
        delays * self.framerate
    }

    pub fn create_calibration(&self, delays: f32, seconds: f32) -> f32 {
        self.to_ms(delays - self.to_delays(seconds * 1000.0))
    }

    pub fn calibrate_to_delays(&self, milliseconds: f32) -> f32 {
        self.to_delays(milliseconds)
    }
}

#[cfg(test)]
mod test {
    use super::*;

    mod to_delays {
        use super::*;

        #[test]
        fn partial_frame() {
            let calibrator = Calibrator::new(1.0);
            assert_eq!(calibrator.to_delays(1.25), 1.0);
            assert_eq!(calibrator.to_delays(1.5), 1.0);
            assert_eq!(calibrator.to_delays(1.75), 1.0);
        }

        #[test]
        fn whole_frame() {
            let calibrator = Calibrator::new(1.0);
            assert_eq!(calibrator.to_delays(1.0), 1.0);
            assert_eq!(calibrator.to_delays(2.0), 2.0);
            assert_eq!(calibrator.to_delays(3.0), 3.0);
        }
    }

    #[test]
    fn to_ms() {
        let calibrator = Calibrator::new(1.0);
        assert_eq!(calibrator.to_ms(1.0), 1.0);
        assert_eq!(calibrator.to_ms(2.0), 2.0);
        assert_eq!(calibrator.to_ms(3.0), 3.0);

        let calibrator = Calibrator::new(1.5);
        assert_eq!(calibrator.to_ms(1.0), 1.5);
        assert_eq!(calibrator.to_ms(2.0), 3.0);
        assert_eq!(calibrator.to_ms(3.0), 4.5);

        let calibrator = Calibrator::new(2.0);
        assert_eq!(calibrator.to_ms(1.0), 2.0);
        assert_eq!(calibrator.to_ms(2.0), 4.0);
        assert_eq!(calibrator.to_ms(3.0), 6.0);
    }
}
