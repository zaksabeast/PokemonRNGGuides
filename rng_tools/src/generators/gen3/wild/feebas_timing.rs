use serde::{Deserialize, Serialize};
use tsify::Tsify;

use super::{CdfKnot, CycleRange, MAX_FEEBAS_VBLANK, VBLANK_FREQ, Wild3InitialCycleDistribution};

pub(super) const FISHING_CHECK_OFFSET: usize = 1186;
// Provisional assumption: CheckFeebas uses one shared uniform interrupt duration, not measured data.
// The 128-point midpoint quadrature integrates initial cycles exactly but can miss sharp duration features.
const DURATION_STEPS: usize = 128;
const MIN_DURATION: usize = 45_000;
const MAX_DURATION: usize = 65_000;

#[derive(Debug, Clone, Copy, Default, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub enum Wild3FeebasVblankSelection {
    #[default]
    MostProbable,
    Exact(usize),
}

#[derive(Clone, Copy)]
pub(super) struct FeebasCounterTiming {
    pub vblank_count: usize,
    pub min_cycle_after_check_feebas: usize,
    pub max_cycle_after_check_feebas: usize,
    pub most_probable_cycle_after_check_feebas: usize,
}

struct Scenario {
    start: f64,
    end: f64,
    shift: f64,
}

pub(super) struct FeebasTiming {
    pub probability_by_vblank: [f64; MAX_FEEBAS_VBLANK + 1],
    pub distribution: Wild3InitialCycleDistribution,
    pub counter: FeebasCounterTiming,
    pub representative_initial: usize,
    scenarios: Vec<Scenario>,
}

fn count_domain(work: usize, duration: f64, count: usize) -> Scenario {
    let frame = VBLANK_FREQ as f64;
    let work = work as f64 + FISHING_CHECK_OFFSET as f64;
    let shift = work - FISHING_CHECK_OFFSET as f64 + count as f64 * (duration - frame);
    let end = frame - work + count as f64 * (frame - duration);
    let start = if count == 0 {
        0.0
    } else {
        end - (frame - duration)
    };

    Scenario { start, end, shift }
}

fn duration_samples(steps: usize) -> impl Iterator<Item = f64> {
    (0..steps).map(move |index| {
        MIN_DURATION as f64
            + (index as f64 + 0.5) * (MAX_DURATION - MIN_DURATION) as f64 / steps as f64
    })
}

fn count_probabilities(
    work: usize,
    distr: &Wild3InitialCycleDistribution,
    steps: usize,
) -> [f64; MAX_FEEBAS_VBLANK + 1] {
    std::array::from_fn(|count| {
        duration_samples(steps)
            .map(|duration| {
                let domain = count_domain(work, duration, count);

                distr.probability(domain.start, domain.end)
            })
            .sum::<f64>()
            / steps as f64
    })
}

impl FeebasTiming {
    pub fn new(
        check_feebas_cycles: usize,
        vblank_distr: &Wild3InitialCycleDistribution,
        selection: Wild3FeebasVblankSelection,
    ) -> Self {
        let probability_by_vblank =
            count_probabilities(check_feebas_cycles, vblank_distr, DURATION_STEPS);
        let count = match selection {
            Wild3FeebasVblankSelection::Exact(count) => count,
            Wild3FeebasVblankSelection::MostProbable => {
                probability_by_vblank
                    .iter()
                    .enumerate()
                    .fold((0, -1.0), |best, (count, &probability)| {
                        if probability > best.1 {
                            (count, probability)
                        } else {
                            best
                        }
                    })
                    .0
            }
        };
        let probability = probability_by_vblank.get(count).copied().unwrap_or(0.0);
        let scenarios: Vec<_> = duration_samples(DURATION_STEPS)
            .map(|duration| {
                let domain = count_domain(check_feebas_cycles, duration, count);

                Scenario {
                    start: domain.start.max(vblank_distr.min as f64),
                    end: domain.end.min(vblank_distr.max as f64 + 1.0),
                    ..domain
                }
            })
            .collect();
        let mut events = vec![];

        for scenario in &scenarios {
            append_events(&mut events, vblank_distr, scenario);
        }

        let distribution = distribution_from_events(events, probability, vblank_distr);
        let representative = scenarios
            .iter()
            .find(|scenario| vblank_distr.probability(scenario.start, scenario.end) > 0.0);
        let representative_initial = representative.map_or(vblank_distr.median(), |scenario| {
            (((vblank_distr.min as f64).max(scenario.start)
                + (vblank_distr.max as f64).min(scenario.end))
                / 2.0) as usize
        });
        let representative_phase = representative.map_or(0, |scenario| {
            (representative_initial as f64 + scenario.shift) as usize + FISHING_CHECK_OFFSET
        });
        let counter = FeebasCounterTiming {
            vblank_count: count,
            min_cycle_after_check_feebas: distribution.min + FISHING_CHECK_OFFSET,
            max_cycle_after_check_feebas: distribution.max + FISHING_CHECK_OFFSET,
            most_probable_cycle_after_check_feebas: representative_phase,
        };

        Self {
            probability_by_vblank,
            distribution,
            counter,
            representative_initial,
            scenarios,
        }
    }

    pub fn probability(&self) -> f64 {
        self.probability_by_vblank.get(self.counter.vblank_count).copied().unwrap_or(0.0)
    }

    // Shared interrupt duration makes the inverse timing domain a union, so display its envelope.
    pub fn original_range(&self, range: CycleRange<i32>) -> CycleRange<i32> {
        let mut start = f64::INFINITY;
        let mut end = f64::NEG_INFINITY;

        for scenario in &self.scenarios {
            let left = (range.start as f64 - scenario.shift).max(scenario.start);
            let right =
                ((range.start as f64 + range.len as f64) - scenario.shift).min(scenario.end);
            if left < right {
                start = start.min(left);
                end = end.max(right);
            }
        }

        if start >= end {
            return CycleRange::from_start_len(0, 0);
        }

        CycleRange::from_start_end(start.floor() as i32, end.ceil() as i32)
    }
}

fn append_events(
    events: &mut Vec<(f64, f64, f64)>,
    distr: &Wild3InitialCycleDistribution,
    scenario: &Scenario,
) {
    for pair in distr.distribution.windows(2) {
        let [left, right] = [pair[0], pair[1]];
        let mass = right.probability - left.probability;
        if left.cycle == right.cycle {
            if scenario.start <= left.cycle && left.cycle < scenario.end {
                events.push((left.cycle + scenario.shift, 0.0, mass));
            }

            continue;
        }

        let start = left.cycle.max(scenario.start);
        let end = right.cycle.min(scenario.end);
        if start >= end {
            continue;
        }

        let slope = mass / (right.cycle - left.cycle);
        events.push((start + scenario.shift, slope, 0.0));
        events.push((end + scenario.shift, -slope, 0.0));
    }
}

fn distribution_from_events(
    mut events: Vec<(f64, f64, f64)>,
    probability: f64,
    original: &Wild3InitialCycleDistribution,
) -> Wild3InitialCycleDistribution {
    events.sort_by(|left, right| left.0.total_cmp(&right.0));
    let mut knots = vec![];
    let mut slope = 0.0;
    let mut mass = 0.0;
    let mut previous = events.first().map_or(0.0, |event| event.0);
    let normalization = probability * DURATION_STEPS as f64;

    for (cycle, slope_delta, jump) in events {
        mass += slope * (cycle - previous);
        if normalization > 0.0 {
            knots.push(CdfKnot {
                cycle,
                probability: (mass / normalization).clamp(0.0, 1.0),
            });
            mass += jump;
            knots.push(CdfKnot {
                cycle,
                probability: (mass / normalization).clamp(0.0, 1.0),
            });
        }

        slope += slope_delta;
        previous = cycle;
    }

    Wild3InitialCycleDistribution {
        min: knots.first().map_or(0, |knot| knot.cycle.floor() as usize),
        max: knots.last().map_or(0, |knot| knot.cycle.ceil() as usize),
        distribution: knots,
        ..original.clone()
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::gen3::{Wild3Action, apply_cycles_causing_vblanks_on_cycle_counter};

    fn uniform(min: usize, max: usize) -> Wild3InitialCycleDistribution {
        Wild3InitialCycleDistribution {
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
            ..Wild3InitialCycleDistribution::new_default(Wild3Action::OldRod).clone()
        }
    }

    #[test]
    fn work_ending_at_interrupt_boundary_includes_the_interrupt() {
        assert_eq!(
            [
                (100, 0),
                (100, 280795),
                (100, 280796),
                (100, 506692),
                (100, 958484)
            ]
            .map(|(cycle, work)| apply_cycles_causing_vblanks_on_cycle_counter(cycle, work, 55000)),
            [(100, 0), (280895, 0), (55000, 1), (55000, 2), (55000, 4)]
        );
    }

    #[test]
    fn count_mass_includes_fishing_entry_offset_and_ties_choose_lower_count() {
        let distr = uniform(45000, 75000);
        assert_eq!(
            count_probabilities(0, &distr, 128),
            [1.0, 0.0, 0.0, 0.0, 0.0]
        );
        let timing = FeebasTiming::new(219710, &distr, Wild3FeebasVblankSelection::MostProbable);

        assert_eq!(
            (timing.counter.vblank_count, timing.probability_by_vblank),
            (0, [0.5, 0.5, 0.0, 0.0, 0.0])
        );
        assert!((timing.distribution.probability(264710.0, 279710.0) - 1.0).abs() < 1e-10);
    }

    #[test]
    fn impossible_selection_has_no_conditional_distribution() {
        let timing = FeebasTiming::new(
            0,
            &uniform(45000, 75000),
            Wild3FeebasVblankSelection::Exact(99),
        );

        assert_eq!(
            (
                timing.counter.vblank_count,
                timing.probability(),
                timing.distribution.distribution
            ),
            (99, 0.0, vec![])
        );
    }

    #[test]
    fn ten_percent_count_and_quarter_conditional_method_gives_joint_mass() {
        let timing = FeebasTiming::new(
            231710,
            &uniform(45000, 75000),
            Wild3FeebasVblankSelection::Exact(0),
        );

        assert!((timing.probability() - 0.1).abs() < 1e-10);
        assert!((timing.distribution.probability(276710.0, 277460.0) - 0.25).abs() < 1e-10);
        assert!(
            (timing.probability() * timing.distribution.probability(276710.0, 277460.0)
                - 0.025)
                .abs()
                < 1e-10
        );
    }

    #[test]
    fn conditioning_changes_method_mass_and_preserves_original_range() {
        let timing = FeebasTiming::new(
            219710,
            &uniform(45000, 75000),
            Wild3FeebasVblankSelection::Exact(1),
        );
        let joint = timing.distribution.probability(0.0, 53814.0) * timing.probability();

        assert!((joint - 1.0 / 12.0).abs() < 0.00001);
        assert_eq!(
            timing.original_range(CycleRange::from_start_end(0, 53814)),
            CycleRange::from_start_end(60000, 69922)
        );
        assert!((timing.distribution.probability(0.0, 280896.0) - 1.0).abs() < 1e-10);
    }

    #[test]
    fn duration_resolution_matches_finer_quadrature() {
        let distr = uniform(45000, 75000);

        for work in [0, 200000, 219710, 430000, 650000, 800000] {
            let coarse = count_probabilities(work, &distr, 128);
            let fine = count_probabilities(work, &distr, 4096);
            let total: f64 = coarse.iter().sum();
            assert!((total - 1.0).abs() < 1e-10);

            for (coarse, fine) in coarse.iter().zip(fine.iter()) {
                assert!((coarse - fine).abs() < 0.0001);
            }
        }
    }

    #[test]
    fn narrow_initial_cycle_domain_is_integrated_without_sampling() {
        let timing = FeebasTiming::new(
            219710,
            &uniform(59999, 60001),
            Wild3FeebasVblankSelection::MostProbable,
        );

        assert_eq!(timing.probability(), 0.5);
        assert_eq!(timing.counter.vblank_count, 0);
    }

    #[test]
    fn automatic_count_follows_work_duration() {
        let selections = [0, 500000, 800000].map(|work| {
            let timing = FeebasTiming::new(
                work,
                &uniform(45000, 75000),
                Wild3FeebasVblankSelection::MostProbable,
            );

            (timing.counter.vblank_count, timing.probability())
        });

        assert_eq!(selections, [(0, 1.0), (2, 1.0), (3, 1.0)]);
    }

    #[test]
    fn point_mass_at_crossing_belongs_to_the_next_count() {
        let timing = FeebasTiming::new(
            219710,
            &uniform(60000, 60000),
            Wild3FeebasVblankSelection::MostProbable,
        );

        assert_eq!(
            (timing.counter.vblank_count, timing.probability()),
            (1, 1.0)
        );
        assert_eq!(timing.distribution.probability(0.0, 280896.0), 1.0);
    }
}
