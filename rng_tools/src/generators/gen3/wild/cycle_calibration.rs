use std::{
    fs::File,
    io::{BufRead, BufReader},
    path::Path,
};

use serde::Deserialize;

use super::*;
use crate::rng::lcrng::Pokerng;

const CYCLE_ERROR_BUFFER: f64 = 50.0;

#[derive(Deserialize)]
#[serde(rename_all = "camelCase")]
struct CalibrationRecord {
    advance: usize,
    #[serde(rename = "leadPID")]
    lead_pid: String,
    vblank_durations: Vec<usize>,
    cycle_at_moments: Vec<CycleFrameMoment>,
}

// Only keep the first PID low and the last PID high across all frames.
pub(super) fn filter_important_moments(moments: &[CycleFrameMoment]) -> Vec<CycleFrameMoment> {
    let first_pid_low = moments
        .iter()
        .position(|entry| entry.moment == Moment::CreateMonWithNature_RandomPidLow);
    let last_pid_high = moments
        .iter()
        .rposition(|entry| entry.moment == Moment::CreateMonWithNature_RandomPidHigh);
    moments
        .iter()
        .enumerate()
        .filter(|(index, entry)| match entry.moment {
            Moment::CreateMonWithNature_RandomPidLow => Some(*index) == first_pid_low,
            Moment::CreateMonWithNature_RandomPidHigh => Some(*index) == last_pid_high,
            _ => true,
        })
        .map(|(_, entry)| *entry)
        .collect()
}

pub(super) fn calculate_cycle_score(
    generated: &[CycleFrameMoment],
    logged: &[CycleFrameMoment],
    vblank_durations: &[usize],
) -> (u64, usize) {
    #[derive(Default)]
    struct TransitionIncrements {
        generated_increments: Vec<u64>,
        logged_increments: Vec<u64>,
    }

    let mut transitions =
        std::collections::BTreeMap::<(Moment, Moment), TransitionIncrements>::new();
    for (source, moments) in [generated, logged].into_iter().enumerate() {
        let moments = filter_important_moments(moments);
        let initial_frame = moments.first().map_or(0, |entry| entry.frame);
        for pair in moments.windows(2) {
            let time = |entry: CycleFrameMoment| {
                entry.frame as u64 * VBLANK_FREQ as u64 + entry.cycle as u64
            };
            let key = (pair[0].moment, pair[1].moment);
            let vblank_cycles = (pair[0].frame - initial_frame..pair[1].frame - initial_frame)
                .map(|frame| {
                    vblank_durations
                        .get(frame)
                        .copied()
                        .unwrap_or_else(|| get_min_mid_max_vblank_cycle_duration().mid)
                        as u64
                })
                .sum::<u64>();

            // Substract vblanks because it causes a big difference if the moment at vblank is slightly different
            // between generated and logged.
            let cycle_incr = (time(pair[1]) - time(pair[0]))
                .checked_sub(vblank_cycles)
                .expect("VBlank duration exceeds the recorded transition interval");
            let transition = transitions.entry(key).or_default();
            let increments = if source == 0 {
                &mut transition.generated_increments
            } else {
                &mut transition.logged_increments
            };
            increments.push(cycle_incr);
        }
    }

    const PENALTY_FOR_MISSING_MOMENT: u64 = VBLANK_FREQ as u64;
    let mut error = 0;
    let mut count = 0;
    for TransitionIncrements {
        generated_increments: actual,
        logged_increments: expected,
    } in transitions.into_values()
    {
        // Match repeated transitions in occurrence order; retain a penalty for missing ones.
        for idx in 0..actual.len().max(expected.len()) {
            error += match (actual.get(idx), expected.get(idx)) {
                (Some(actual), Some(expected)) => actual.abs_diff(*expected),
                _ => PENALTY_FOR_MISSING_MOMENT,
            };
            count += 1;
        }
    }
    (error, count)
}

pub(super) fn is_wild3(moments: &[CycleFrameMoment]) -> bool {
    moments.windows(2).any(|pair| {
        pair[0].frame != pair[1].frame
            && matches!(
                (pair[0].moment, pair[1].moment),
                (
                    Moment::CreateMonWithNature_RandomPidHigh,
                    Moment::CreateMonWithNature_RandomPidLow
                ) | (
                    Moment::CreateMonWithNature_RandomPidLow,
                    Moment::CreateMonWithNature_RandomPidHigh
                ) | (Moment::CreateMonWithGenderNatureLetter, Moment::CreateMon)
            )
    })
}

fn generate_then_calculate_cycle_score(
    mut opts: Wild3GeneratorOptions,
    map_data: &Wild3MapGameData,
    data_input: &Path,
) -> f64 {
    let file = File::open(data_input).expect("Could not open calibration data");
    let mut total_error = 0;
    let mut total_increments = 0;
    for (line_idx, line) in BufReader::new(file).lines().enumerate() {
        let line = line.expect("Could not read calibration data");
        if line.trim().is_empty() {
            continue;
        }
        let mut record: CalibrationRecord = serde_json::from_str(&line).unwrap_or_else(|err| {
            panic!("Invalid calibration JSON on line {}: {err}", line_idx + 1)
        });
        record.cycle_at_moments.dedup();

        // Ignore Wild3 because it alters the number of events, which makes big differences with the generator.
        if is_wild3(&record.cycle_at_moments) {
            println!(
                "Skipping line {} advance {}: frame changed during PID generation",
                line_idx + 1,
                record.advance
            );
            continue;
        }

        let initial = record.cycle_at_moments.first().expect("No logged moments");
        let initial_moment = if opts.action.is_fishing() {
            Moment::Fishing_StartEncounter
        } else if opts.action == Wild3Action::RockSmash {
            Moment::RockSmashWildEncounter
        } else {
            Moment::TrySweetScentEncounter
        };
        assert_eq!(initial.moment, initial_moment);
        let lead_cycle_spd = if opts.lead == Gen3Lead::Egg {
            0
        } else {
            calculate_pid_speed(
                u32::from_str_radix(&record.lead_pid, 16).expect("Invalid lead PID"),
            )
        };
        opts.cycle_opts = Wild3GeneratorCycleOpts::CycleAtMomentWithEmuLog {
            lead_cycle_spd,
            initial_cycle_at_sweet_scent: initial.cycle,
            vblank_cycles: record.vblank_durations.clone(),
        };
        let generated = generate_wild3(Pokerng::with_jump(0, record.advance), &opts, map_data);
        let mut generated_moments = generated.cycle_counter.get_cycle_at_moments();
        // The emulator logger omits PID halves inside the gender-constrained routine.
        if record
            .cycle_at_moments
            .iter()
            .any(|entry| entry.moment == Moment::CreateMonWithGenderNatureLetter)
        {
            generated_moments.retain(|entry| {
                !matches!(
                    entry.moment,
                    Moment::CreateMonWithNature_RandomPidLow
                        | Moment::CreateMonWithNature_RandomPidHigh
                )
            });
        }
        let (error, increments) = calculate_cycle_score(
            &generated_moments,
            &record.cycle_at_moments,
            &record.vblank_durations,
        );
        println!(
            "line {} advance {}: {:.2} cycles",
            line_idx + 1,
            record.advance,
            error as f64 / increments as f64
        );
        total_error += error;
        total_increments += increments;
    }
    assert!(
        total_increments > 0,
        "Calibration data contains no transitions"
    );
    total_error as f64 / total_increments as f64
}

pub(super) fn map_pokeblock_cycle_calibration(
    lead: Gen3Lead,
    action: Wild3Action,
    data_file: &str,
    map_data: &Wild3MapGameData,
    safari_pokeblock: Option<Wild3SafariPokeblockGenOpt>,
    baseline_cycle_error: f64,
) {
    let data_dir = match action {
        Wild3Action::SweetScentLand => "sweet_scent_land",
        Wild3Action::SweetScentWater => "sweet_scent_water",
        Wild3Action::OldRod => "old_fishing",
        Wild3Action::SuperRod => "super_fishing",
        Wild3Action::RockSmash => "rock_smash",
        _ => panic!("Unsupported calibration action: {action:?}"),
    };
    let opts = Wild3GeneratorOptions {
        lead,
        action,
        safari_pokeblock,
        methods: vec![
            Gen3Method::Wild1,
            Gen3Method::Wild2,
            Gen3Method::Wild3,
            Gen3Method::Wild4,
            Gen3Method::Wild5,
        ],
        using_white_flute: false,
        cycle_opts: Wild3GeneratorCycleOpts::CycleAtMomentWithEmuLog {
            lead_cycle_spd: 0,
            initial_cycle_at_sweet_scent: 0,
            vblank_cycles: vec![],
        },
        ..Wild3GeneratorOptions::default()
    };
    let score = generate_then_calculate_cycle_score(
        opts,
        map_data,
        &Path::new(env!("CARGO_MANIFEST_DIR"))
            .join("src/generators/gen3/wild/cycle_calibration_data")
            .join(data_dir)
            .join(data_file),
    );
    println!("{data_file} ({lead:?}) mean absolute cycle increment error: {score:.2}");
    assert!(score.is_finite());
    let max_cycle_error = baseline_cycle_error + CYCLE_ERROR_BUFFER;
    assert!(
        score <= max_cycle_error,
        "{data_file} cycle increment error regressed: {score:.2} exceeds {max_cycle_error:.2} (baseline {baseline_cycle_error:.2} + buffer {CYCLE_ERROR_BUFFER:.2})"
    );
}
