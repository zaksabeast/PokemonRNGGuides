use serde::{Deserialize, Serialize};
use tsify::Tsify;

#[derive(Debug, Clone, Copy, PartialEq, Serialize, Deserialize, Tsify)]
pub struct CdfKnot {
    pub cycle: f64,
    pub probability: f64,
}

pub fn cdf_less_than(knots: &[CdfKnot], cycle: f64) -> f64 {
    let index = knots.partition_point(|knot| knot.cycle < cycle);
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

    left.probability + (right.probability - left.probability)
        * (cycle - left.cycle) / (right.cycle - left.cycle)
}
