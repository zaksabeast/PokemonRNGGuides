//! Monotone CDFs with optional jumps, and exact convolution of their linear segments.
#[derive(Debug, Clone, Copy)]
pub struct CdfKnot {
    pub cycle: f64,
    pub probability: f64,
    pub integral: f64,
}

#[derive(Debug, Clone, Copy)]
pub struct PiecewiseCdf {
    pub knots: &'static [CdfKnot],
}

impl PiecewiseCdf {
    /// P(X < x). Using the left limit preserves half-open cycle intervals at atoms.
    pub fn less_than(&self, x: f64) -> f64 {
        let i = self.knots.partition_point(|k| k.cycle < x);
        if i == 0 {
            return 0.0;
        }
        let left = self.knots[i - 1];
        if i == self.knots.len() {
            return 1.0;
        }
        let right = self.knots[i];
        if x == right.cycle {
            return right.probability;
        }
        left.probability
            + (right.probability - left.probability) * (x - left.cycle) / (right.cycle - left.cycle)
    }

    fn primitive(&self, x: f64) -> f64 {
        let i = self.knots.partition_point(|k| k.cycle <= x);
        if i == 0 {
            return 0.0;
        }
        let left = self.knots[i - 1];
        let width = x - left.cycle;
        if i == self.knots.len() {
            return left.integral + width;
        }
        let right = self.knots[i];
        let slope = (right.probability - left.probability) / (right.cycle - left.cycle);
        left.integral + width * left.probability + 0.5 * slope * width * width
    }

    pub fn integral_between(&self, start: f64, end: f64) -> f64 {
        if end <= start {
            return 0.0;
        }
        self.primitive(end) - self.primitive(start)
    }
}

#[derive(Debug, Clone, Copy)]
pub struct ConvolvedCdf {
    pub audio: PiecewiseCdf,
    pub non_audio: PiecewiseCdf,
    pub min: usize,
    pub max: usize,
}

impl ConvolvedCdf {
    pub fn less_than(&self, x: f64) -> f64 {
        if x <= self.min as f64 {
            return 0.0;
        }
        if x > self.max as f64 {
            return 1.0;
        }
        let mut probability = 0.0;
        for pair in self.non_audio.knots.windows(2) {
            let a = pair[0];
            let b = pair[1];
            let mass = b.probability - a.probability;
            if mass <= 0.0 {
                continue;
            }
            if b.cycle == a.cycle {
                probability += mass * self.audio.less_than(x - a.cycle);
            } else {
                probability += mass / (b.cycle - a.cycle)
                    * self.audio.integral_between(x - b.cycle, x - a.cycle);
            }
        }
        probability.clamp(0.0, 1.0)
    }

    pub fn probability(&self, start: f64, end: f64) -> f64 {
        if end <= start {
            return 0.0;
        }
        (self.less_than(end) - self.less_than(start)).clamp(0.0, 1.0)
    }
}

#[cfg(test)]
mod tests {
    impl ConvolvedCdf {
        pub fn median(&self) -> usize {
            let mut lo = self.min as f64;
            let mut hi = self.max as f64;
            for _ in 0..48 {
                let mid = (lo + hi) / 2.0;
                if self.less_than(mid) < 0.5 {
                    lo = mid;
                } else {
                    hi = mid;
                }
            }
            // Remove floating-point bisection noise before rounding up integer cycles.
            (hi - 1e-7).ceil() as usize
        }
    }

    use super::*;
    const UNIFORM: PiecewiseCdf = PiecewiseCdf {
        knots: &[
            CdfKnot {
                cycle: 0.0,
                probability: 0.0,
                integral: 0.0,
            },
            CdfKnot {
                cycle: 2.0,
                probability: 1.0,
                integral: 1.0,
            },
        ],
    };
    const ATOM: PiecewiseCdf = PiecewiseCdf {
        knots: &[
            CdfKnot {
                cycle: 3.0,
                probability: 0.0,
                integral: 0.0,
            },
            CdfKnot {
                cycle: 3.0,
                probability: 1.0,
                integral: 0.0,
            },
        ],
    };

    #[test]
    fn uniform_convolution_is_triangular() {
        let cdf = ConvolvedCdf {
            audio: UNIFORM,
            non_audio: UNIFORM,
            min: 0,
            max: 4,
        };
        assert!((cdf.less_than(1.0) - 0.125).abs() < 1e-12);
        assert!((cdf.less_than(3.0) - 0.875).abs() < 1e-12);
        assert!((cdf.probability(1.0, 3.0) - 0.75).abs() < 1e-12);
        assert_eq!(cdf.probability(-10.0, 10.0), 1.0);
        assert_eq!(cdf.probability(4.0, 5.0), 0.0);
        assert_eq!(cdf.probability(2.0, 1.0), 0.0);
        assert_eq!(cdf.median(), 2);
    }

    #[test]
    fn atoms_preserve_half_open_boundaries_and_translation() {
        let atom = ConvolvedCdf {
            audio: ATOM,
            non_audio: ATOM,
            min: 6,
            max: 6,
        };
        assert_eq!(atom.probability(6.0, 7.0), 1.0);
        assert_eq!(atom.probability(5.0, 6.0), 0.0);
        let shifted = ConvolvedCdf {
            audio: UNIFORM,
            non_audio: ATOM,
            min: 3,
            max: 5,
        };
        assert!((shifted.less_than(4.0) - 0.5).abs() < 1e-12);
        let reversed = ConvolvedCdf {
            audio: ATOM,
            non_audio: UNIFORM,
            min: 3,
            max: 5,
        };
        assert!((reversed.less_than(4.0) - 0.5).abs() < 1e-12);
    }
}
