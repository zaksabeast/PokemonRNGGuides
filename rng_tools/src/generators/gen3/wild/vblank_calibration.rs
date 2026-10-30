use serde::{Deserialize, Serialize};
use tsify::Tsify;

use crate::gen3::CycleRange;

use super::{ALL_WILD3_ACTIONS, Wild3Action};

#[derive(Debug, Clone, Copy, PartialEq, Serialize, Deserialize, Tsify)]
pub struct CdfKnot {
    pub cycle: f64,
    pub probability: f64,
}

pub fn cdf_less_than(knots: &[CdfKnot], cycle: f64) -> f64 {
    let index = knots.partition_point(|knot| knot.cycle < cycle);

    cdf_at_index(knots, cycle, index)
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
        // Lead-speed sweeps move toward earlier cycles; retain the segment between queries.
        while self.index > 0 && self.knots[self.index - 1].cycle >= cycle {
            self.index -= 1;
        }

        while self.index < self.knots.len() && self.knots[self.index].cycle < cycle {
            self.index += 1;
        }

        cdf_at_index(self.knots, cycle, self.index)
    }
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize, Tsify)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub enum PlayingSong {
    MapSong,
    BikeSong,
    SurfSong,
    DivingSong,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize, Tsify, Default)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub enum Wild3Weather {
    #[default]
    Sunny,
    Rain,
    Thunderstorm,
}

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize, Tsify)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct Wild3InitialCycleDistribution {
    pub min: usize,
    pub max: usize,
    pub distribution: Vec<CdfKnot>,
    pub action: Wild3Action,
    pub playing_song: PlayingSong,
    pub weather: Wild3Weather,
}

impl Wild3InitialCycleDistribution {
    pub fn new_default(action: Wild3Action) -> &'static Self {
        static DEFAULTS_INITIAL_DISTRS_BY_ACTION: std::sync::LazyLock<
            [Wild3InitialCycleDistribution; 6],
        > = std::sync::LazyLock::new(|| {
            ALL_WILD3_ACTIONS.map(Wild3InitialCycleDistribution::build_default)
        });

        &DEFAULTS_INITIAL_DISTRS_BY_ACTION[action as usize]
    }

    fn build_default(action: Wild3Action) -> Self {
        let min = if action == Wild3Action::RockSmash {
            30_000
        } else {
            45_000
        };
        let max = 75_000;
        let playing_song = if action == Wild3Action::SweetScentWater {
            PlayingSong::SurfSong
        } else {
            PlayingSong::MapSong
        };

        Self {
            min,
            max,
            distribution: vec![
                CdfKnot {
                    cycle: min as f64,
                    probability: 0.0,
                },
                CdfKnot {
                    cycle: max as f64,
                    probability: 1.0,
                },
            ],
            action,
            playing_song,
            weather: Wild3Weather::Sunny,
        }
    }

    pub fn to_min_max(&self) -> (usize, usize) {
        (self.min, self.max)
    }

    pub fn probability_for_range(&self, range: &CycleRange<i32>) -> f64 {
        let start = range.start as f64;
        let end = start + range.len as f64;

        self.probability(start, end)
    }

    pub fn probability(&self, start: f64, end: f64) -> f64 {
        if end <= start {
            return 0.0;
        }

        (cdf_less_than(&self.distribution, end) - cdf_less_than(&self.distribution, start))
            .clamp(0.0, 1.0)
    }

    pub fn median(&self) -> usize {
        let index = self
            .distribution
            .partition_point(|knot| knot.probability < 0.5);
        let Some(right) = self.distribution.get(index) else {
            return self.min + (self.max - self.min) / 2;
        };

        let Some(left) = index
            .checked_sub(1)
            .and_then(|index| self.distribution.get(index))
        else {
            return right.cycle.ceil() as usize;
        };

        let fraction = (0.5 - left.probability) / (right.probability - left.probability);

        (left.cycle + fraction * (right.cycle - left.cycle)).ceil() as usize
    }
}

#[cfg(test)]
mod tests {
    use super::*;

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
