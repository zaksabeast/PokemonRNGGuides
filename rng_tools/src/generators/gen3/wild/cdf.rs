use serde::{Deserialize, Serialize};
use tsify::Tsify;

// A Cumulative Distribution Function (CDF) gives the probability that a random variable
// will take a value less than or equal to a specific value.

#[derive(Debug, Clone, Copy, PartialEq, Serialize, Deserialize, Tsify)]
pub struct CdfKnot {
    pub cycle: f64,
    pub probability: f64,
}

pub fn cdf_less_than(knots: &[CdfKnot], cycle: f64) -> f64 {
    let index = knots.partition_point(|knot| knot.cycle < cycle);

    cdf_at_index(knots, cycle, index)
}

pub(super) fn cdf_probability(knots: &[CdfKnot], start: f64, end: f64) -> f64 {
    if end <= start {
        return 0.0;
    }

    (cdf_less_than(knots, end) - cdf_less_than(knots, start)).clamp(0.0, 1.0)
}

pub(super) fn cdf_median(knots: &[CdfKnot]) -> Option<f64> {
    let index = knots.partition_point(|knot| knot.probability < 0.5);
    let right = knots.get(index)?;
    let Some(left) = index.checked_sub(1).and_then(|index| knots.get(index)) else {
        return Some(right.cycle);
    };

    let fraction = (0.5 - left.probability) / (right.probability - left.probability);

    Some(left.cycle + fraction * (right.cycle - left.cycle))
}

fn cdf_at_index(knots: &[CdfKnot], cycle: f64, index: usize) -> f64 {
    if index == 0 {
        return 0.0;
    }

    let left = knots[index - 1];
    let Some(right) = knots.get(index) else {
        return 1.0;
    };

    if cycle == right.cycle {
        return right.probability;
    }

    left.probability
        + (right.probability - left.probability) * (cycle - left.cycle) / (right.cycle - left.cycle)
}

pub(super) struct CdfCursor<'a> {
    knots: &'a [CdfKnot],
    index: usize,
}

impl<'a> CdfCursor<'a> {
    pub(super) fn new(knots: &'a [CdfKnot], cycle: f64) -> Self {
        Self {
            knots,
            index: knots.partition_point(|knot| knot.cycle < cycle),
        }
    }

    pub(super) fn less_than(&mut self, cycle: f64) -> f64 {
        // Retain the segment between nearby queries instead of repeating a binary search.
        while self.index > 0 && self.knots[self.index - 1].cycle >= cycle {
            self.index -= 1;
        }

        while self.index < self.knots.len() && self.knots[self.index].cycle < cycle {
            self.index += 1;
        }

        cdf_at_index(self.knots, cycle, self.index)
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn cdf_lookup_and_probability_preserve_discrete_jumps() {
        let knots = [
            CdfKnot {
                cycle: 0.0,
                probability: 0.0,
            },
            CdfKnot {
                cycle: 10.0,
                probability: 0.25,
            },
            CdfKnot {
                cycle: 10.0,
                probability: 0.75,
            },
            CdfKnot {
                cycle: 20.0,
                probability: 1.0,
            },
        ];

        assert_eq!(
            [-1.0, 0.0, 5.0, 10.0, 15.0, 20.0, 21.0].map(|cycle| cdf_less_than(&knots, cycle)),
            [0.0, 0.0, 0.125, 0.25, 0.875, 1.0, 1.0]
        );
        assert_eq!(
            [
                (-1.0, 21.0),
                (0.0, 10.0),
                (10.0, 15.0),
                (10.0, 10.0),
                (15.0, 10.0)
            ]
            .map(|(start, end)| cdf_probability(&knots, start, end)),
            [1.0, 0.25, 0.625, 0.0, 0.0]
        );
        assert_eq!(cdf_probability(&[], -1.0, 21.0), 0.0);
    }

    #[test]
    fn cdf_median_preserves_fractional_values_and_point_masses() {
        let uniform = [
            CdfKnot {
                cycle: 1.0,
                probability: 0.0,
            },
            CdfKnot {
                cycle: 6.0,
                probability: 1.0,
            },
        ];
        let jump = [
            CdfKnot {
                cycle: 0.0,
                probability: 0.0,
            },
            CdfKnot {
                cycle: 10.0,
                probability: 0.25,
            },
            CdfKnot {
                cycle: 10.0,
                probability: 0.75,
            },
            CdfKnot {
                cycle: 20.0,
                probability: 1.0,
            },
        ];
        let point = [CdfKnot {
            cycle: 10.0,
            probability: 1.0,
        }];
        let incomplete = [CdfKnot {
            cycle: 10.0,
            probability: 0.25,
        }];

        assert_eq!(
            [
                cdf_median(&uniform),
                cdf_median(&jump),
                cdf_median(&point),
                cdf_median(&[]),
                cdf_median(&incomplete)
            ],
            [Some(3.5), Some(10.0), Some(10.0), None, None]
        );
    }

    #[test]
    fn cdf_cursor_handles_boundaries_repeated_knots_and_direction_changes() {
        let knots = [
            CdfKnot {
                cycle: 0.0,
                probability: 0.0,
            },
            CdfKnot {
                cycle: 10.0,
                probability: 0.25,
            },
            CdfKnot {
                cycle: 10.0,
                probability: 0.75,
            },
            CdfKnot {
                cycle: 20.0,
                probability: 1.0,
            },
        ];
        let mut cursor = CdfCursor::new(&knots, 21.0);
        let values = [21.0, 20.0, 15.0, 10.0, 5.0, 0.0, -1.0, 10.0, 15.0, 21.0]
            .map(|cycle| cursor.less_than(cycle));

        assert_eq!(
            values,
            [1.0, 1.0, 0.875, 0.25, 0.125, 0.0, 0.0, 0.25, 0.875, 1.0]
        );
    }

    #[test]
    fn cdf_cursor_handles_empty_and_single_knot_distributions() {
        let mut empty = CdfCursor::new(&[], 20.0);

        assert_eq!(
            [20.0, 10.0, 0.0].map(|cycle| empty.less_than(cycle)),
            [0.0; 3]
        );

        let knots = [CdfKnot {
            cycle: 10.0,
            probability: 1.0,
        }];
        let mut single = CdfCursor::new(&knots, 20.0);

        assert_eq!(
            [20.0, 10.0, 0.0, 20.0].map(|cycle| single.less_than(cycle)),
            [1.0, 0.0, 0.0, 1.0]
        );
    }
}
