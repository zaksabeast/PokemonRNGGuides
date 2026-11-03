use serde::{Deserialize, Serialize};
use tsify::Tsify;

use super::cdf::cdf_quantile;
use super::{
    CdfKnot, CycleRange, MAX_FEEBAS_VBLANK, VBLANK_FREQ, Wild3Action,
    Wild3InitialCycleDistribution, Wild3PlayingSong, Wild3Weather,
};

pub(super) type Wild3VblankCycleDistribution = Wild3InitialCycleDistribution;

pub(super) const FISHING_CHECK_OFFSET: usize = 1186;
// Each scenario shares one interrupt duration across its VBlanks, independently of initial timing.
// Midpoint quantiles approximate the duration CDF; initial-cycle intervals are integrated exactly.
const SCENARIO_COUNT: usize = 128;

// This uniform duration model is provisional, not measured data.
pub(super) static DEFAULT_FEEBAS_VBLANK_DISTR: std::sync::LazyLock<Wild3VblankCycleDistribution> =
    std::sync::LazyLock::new(|| Wild3VblankCycleDistribution {
        min: 45_000,
        max: 65_000,
        distribution: vec![
            CdfKnot {
                cycle: 45_000.0,
                probability: 0.0,
            },
            CdfKnot {
                cycle: 65_000.0,
                probability: 1.0,
            },
        ],
        action: Wild3Action::OldRod,
        playing_song: Wild3PlayingSong::MapSong,
        weather: Wild3Weather::Sunny,
    });

#[derive(Debug, Clone, Copy, Default, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub enum Wild3FeebasVblankSelection {
    #[default]
    MostProbable,
    Exact(usize),
}

/** FeebasCycleCounter doesn't store probability. It only contains what's needed by the generator (which doesn't calculate likelihood). */
#[derive(Clone, Copy)]
pub(super) struct FeebasCycleCounter {
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

pub(super) struct FeebasCycleCounterWithProbability {
    pub probability_by_vblank: [f64; MAX_FEEBAS_VBLANK + 1],
    pub initial_cycle_distr: Wild3InitialCycleDistribution,
    pub cycle_counter: FeebasCycleCounter,
    pub most_probable_initial_cycle: usize,
    scenarios: Vec<Scenario>,
}

fn count_domain(check_feebas_cycles: usize, duration: f64, count: usize) -> Scenario {
    let frame = VBLANK_FREQ as f64;
    let work = check_feebas_cycles as f64 + FISHING_CHECK_OFFSET as f64;
    let shift = work - FISHING_CHECK_OFFSET as f64 + count as f64 * (duration - frame);
    let end = frame - work + count as f64 * (frame - duration);
    let start = if count == 0 {
        0.0
    } else {
        end - (frame - duration)
    };

    Scenario { start, end, shift }
}

fn duration_samples(
    vblank_cycle_distr: &Wild3VblankCycleDistribution,
    steps: usize,
) -> impl Iterator<Item = f64> + '_ {
    (0..steps).filter_map(move |index| {
        cdf_quantile(
            &vblank_cycle_distr.distribution,
            (index as f64 + 0.5) / steps as f64,
        )
    })
}

fn calculate_probability_by_vblank(
    check_feebas_cycles: usize,
    initial_cycle_distr: &Wild3InitialCycleDistribution,
    vblank_cycle_distr: &Wild3VblankCycleDistribution,
    steps: usize,
) -> [f64; MAX_FEEBAS_VBLANK + 1] {
    std::array::from_fn(|count| {
        duration_samples(vblank_cycle_distr, steps)
            .map(|duration| {
                let domain = count_domain(check_feebas_cycles, duration, count);

                initial_cycle_distr.probability(domain.start, domain.end)
            })
            .sum::<f64>()
            / steps as f64
    })
}

impl FeebasCycleCounterWithProbability {
    pub fn new(
        check_feebas_cycles: usize,
        initial_cycle_distr: &Wild3InitialCycleDistribution,
        vblank_cycle_distr: &Wild3VblankCycleDistribution,
        selection: Wild3FeebasVblankSelection,
    ) -> Self {
        let probability_by_vblank = calculate_probability_by_vblank(
            check_feebas_cycles,
            initial_cycle_distr,
            vblank_cycle_distr,
            SCENARIO_COUNT,
        );
        let count = match selection {
            Wild3FeebasVblankSelection::Exact(count) => count,
            Wild3FeebasVblankSelection::MostProbable => probability_by_vblank
                .iter()
                .enumerate()
                .max_by(|(_, left), (_, right)| left.total_cmp(right))
                .map(|(index, _)| index)
                .unwrap_or(0),
        };
        let probability = probability_by_vblank.get(count).copied().unwrap_or(0.0);
        let scenarios: Vec<_> = duration_samples(vblank_cycle_distr, SCENARIO_COUNT)
            .map(|duration| {
                let domain = count_domain(check_feebas_cycles, duration, count);

                Scenario {
                    start: domain.start.max(initial_cycle_distr.min as f64),
                    end: domain.end.min(initial_cycle_distr.max as f64 + 1.0),
                    ..domain
                }
            })
            .collect();
        let mut events = vec![];

        for scenario in &scenarios {
            append_events(&mut events, initial_cycle_distr, scenario);
        }

        let representative = scenarios
            .iter()
            .find(|scenario| initial_cycle_distr.probability(scenario.start, scenario.end) > 0.0);
        let most_probable_initial_cycle =
            representative.map_or(initial_cycle_distr.median(), |scenario| {
                (((initial_cycle_distr.min as f64).max(scenario.start)
                    + (initial_cycle_distr.max as f64).min(scenario.end))
                    / 2.0) as usize
            });
        let representative_phase = representative.map_or(0, |scenario| {
            (most_probable_initial_cycle as f64 + scenario.shift) as usize + FISHING_CHECK_OFFSET
        });
        let initial_cycle_distr =
            initial_cycle_distr_from_events(events, probability, initial_cycle_distr);
        let cycle_counter = FeebasCycleCounter {
            vblank_count: count,
            min_cycle_after_check_feebas: initial_cycle_distr.min + FISHING_CHECK_OFFSET,
            max_cycle_after_check_feebas: initial_cycle_distr.max + FISHING_CHECK_OFFSET,
            most_probable_cycle_after_check_feebas: representative_phase,
        };

        Self {
            probability_by_vblank,
            initial_cycle_distr,
            cycle_counter,
            most_probable_initial_cycle,
            scenarios,
        }
    }

    pub fn probability(&self) -> f64 {
        self.probability_by_vblank
            .get(self.cycle_counter.vblank_count)
            .copied()
            .unwrap_or(0.0)
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
    initial_cycle_distr: &Wild3InitialCycleDistribution,
    scenario: &Scenario,
) {
    for pair in initial_cycle_distr.distribution.windows(2) {
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

fn initial_cycle_distr_from_events(
    mut events: Vec<(f64, f64, f64)>,
    probability: f64,
    initial_cycle_distr: &Wild3InitialCycleDistribution,
) -> Wild3InitialCycleDistribution {
    events.sort_by(|left, right| left.0.total_cmp(&right.0));
    let mut knots = vec![];
    let mut slope = 0.0;
    let mut mass = 0.0;
    let mut previous = events.first().map_or(0.0, |event| event.0);
    let normalization = probability * SCENARIO_COUNT as f64;

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
        ..initial_cycle_distr.clone()
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
        let initial_cycle_distr = uniform(45000, 75000);
        assert_eq!(
            calculate_probability_by_vblank(
                0,
                &initial_cycle_distr,
                &DEFAULT_FEEBAS_VBLANK_DISTR,
                128
            ),
            [1.0, 0.0, 0.0, 0.0, 0.0]
        );
        let timing = FeebasCycleCounterWithProbability::new(
            219710,
            &initial_cycle_distr,
            &DEFAULT_FEEBAS_VBLANK_DISTR,
            Wild3FeebasVblankSelection::MostProbable,
        );

        assert_eq!(
            (
                timing.cycle_counter.vblank_count,
                timing.probability_by_vblank
            ),
            (0, [0.5, 0.5, 0.0, 0.0, 0.0])
        );
        assert!((timing.initial_cycle_distr.probability(264710.0, 279710.0) - 1.0).abs() < 1e-10);
    }

    #[test]
    fn impossible_selection_has_no_conditional_distribution() {
        let timing = FeebasCycleCounterWithProbability::new(
            0,
            &uniform(45000, 75000),
            &DEFAULT_FEEBAS_VBLANK_DISTR,
            Wild3FeebasVblankSelection::Exact(99),
        );

        assert_eq!(
            (
                timing.cycle_counter.vblank_count,
                timing.probability(),
                timing.initial_cycle_distr.distribution
            ),
            (99, 0.0, vec![])
        );
    }

    #[test]
    fn ten_percent_count_and_quarter_conditional_method_gives_joint_mass() {
        let timing = FeebasCycleCounterWithProbability::new(
            231710,
            &uniform(45000, 75000),
            &DEFAULT_FEEBAS_VBLANK_DISTR,
            Wild3FeebasVblankSelection::Exact(0),
        );

        assert!((timing.probability() - 0.1).abs() < 1e-10);
        assert!((timing.initial_cycle_distr.probability(276710.0, 277460.0) - 0.25).abs() < 1e-10);
        assert!(
            (timing.probability() * timing.initial_cycle_distr.probability(276710.0, 277460.0)
                - 0.025)
                .abs()
                < 1e-10
        );
    }

    #[test]
    fn conditioning_changes_method_mass_and_preserves_original_range() {
        let timing = FeebasCycleCounterWithProbability::new(
            219710,
            &uniform(45000, 75000),
            &DEFAULT_FEEBAS_VBLANK_DISTR,
            Wild3FeebasVblankSelection::Exact(1),
        );
        let joint = timing.initial_cycle_distr.probability(0.0, 53814.0) * timing.probability();

        assert!((joint - 1.0 / 12.0).abs() < 0.00001);
        assert_eq!(
            timing.original_range(CycleRange::from_start_end(0, 53814)),
            CycleRange::from_start_end(60000, 69922)
        );
        assert!((timing.initial_cycle_distr.probability(0.0, 280896.0) - 1.0).abs() < 1e-10);
    }

    #[test]
    fn duration_resolution_matches_finer_quadrature() {
        let initial_cycle_distr = uniform(45000, 75000);

        for work in [0, 200000, 219710, 430000, 650000, 800000] {
            let coarse = calculate_probability_by_vblank(
                work,
                &initial_cycle_distr,
                &DEFAULT_FEEBAS_VBLANK_DISTR,
                128,
            );
            let fine = calculate_probability_by_vblank(
                work,
                &initial_cycle_distr,
                &DEFAULT_FEEBAS_VBLANK_DISTR,
                4096,
            );
            let total: f64 = coarse.iter().sum();
            assert!((total - 1.0).abs() < 1e-10);

            for (coarse, fine) in coarse.iter().zip(fine.iter()) {
                assert!((coarse - fine).abs() < 0.0001);
            }
        }
    }

    #[test]
    fn narrow_initial_cycle_domain_is_integrated_without_sampling() {
        let timing = FeebasCycleCounterWithProbability::new(
            219710,
            &uniform(59999, 60001),
            &DEFAULT_FEEBAS_VBLANK_DISTR,
            Wild3FeebasVblankSelection::MostProbable,
        );

        assert_eq!(timing.probability(), 0.5);
        assert_eq!(timing.cycle_counter.vblank_count, 0);
    }

    #[test]
    fn automatic_count_follows_work_duration() {
        let selections = [0, 500000, 800000].map(|work| {
            let timing = FeebasCycleCounterWithProbability::new(
                work,
                &uniform(45000, 75000),
                &DEFAULT_FEEBAS_VBLANK_DISTR,
                Wild3FeebasVblankSelection::MostProbable,
            );

            (timing.cycle_counter.vblank_count, timing.probability())
        });

        assert_eq!(selections, [(0, 1.0), (2, 1.0), (3, 1.0)]);
    }

    #[test]
    fn point_mass_at_crossing_belongs_to_the_next_count() {
        let timing = FeebasCycleCounterWithProbability::new(
            219710,
            &uniform(60000, 60000),
            &DEFAULT_FEEBAS_VBLANK_DISTR,
            Wild3FeebasVblankSelection::MostProbable,
        );

        assert_eq!(
            (timing.cycle_counter.vblank_count, timing.probability()),
            (1, 1.0)
        );
        assert_eq!(timing.initial_cycle_distr.probability(0.0, 280896.0), 1.0);
    }

    #[test]
    fn initial_cycles_and_interrupt_durations_have_separate_distributions() {
        let vblank_cycle_distr = Wild3VblankCycleDistribution {
            distribution: vec![
                CdfKnot {
                    cycle: 45000.0,
                    probability: 0.0,
                },
                CdfKnot {
                    cycle: 45000.0,
                    probability: 0.75,
                },
                CdfKnot {
                    cycle: 65000.0,
                    probability: 0.75,
                },
                CdfKnot {
                    cycle: 65000.0,
                    probability: 1.0,
                },
            ],
            ..uniform(45000, 65000)
        };
        let counters = [1, 2].map(|count| {
            let timing = FeebasCycleCounterWithProbability::new(
                440606,
                &uniform(60000, 60000),
                &vblank_cycle_distr,
                Wild3FeebasVblankSelection::Exact(count),
            );

            (
                timing.probability_by_vblank,
                timing.cycle_counter.vblank_count,
                timing.cycle_counter.min_cycle_after_check_feebas,
                timing.cycle_counter.max_cycle_after_check_feebas,
                timing.cycle_counter.most_probable_cycle_after_check_feebas,
                timing.most_probable_initial_cycle,
            )
        });

        assert_eq!(
            counters,
            [
                (
                    [0.0, 0.75, 0.25, 0.0, 0.0],
                    1,
                    265896,
                    265896,
                    265896,
                    60000
                ),
                ([0.0, 0.75, 0.25, 0.0, 0.0], 2, 70000, 70000, 70000, 60000),
            ]
        );
        assert_eq!(
            calculate_probability_by_vblank(
                440606,
                &uniform(45000, 45000),
                &vblank_cycle_distr,
                128
            ),
            [0.0, 1.0, 0.0, 0.0, 0.0]
        );
    }
}
