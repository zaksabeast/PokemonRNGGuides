use std::{fs::File, io::{BufRead, BufReader}, path::Path};

use serde::Deserialize;

use super::*;
use crate::{Species, rng::lcrng::Pokerng};

#[derive(Deserialize)]
#[serde(rename_all = "camelCase")]
struct CalibrationRecord {
    advance: usize,
    #[serde(rename = "leadPID")]
    lead_pid: String,
    vblank_durations: Vec<usize>,
    cycle_at_moments: Vec<CycleFrameMoment>,
}

// Frames in emulator logs are absolute; the generator starts at frame zero.
fn cycle_score(generated: &[CycleFrameMoment], logged: &[CycleFrameMoment]) -> (u64, usize) {
    let initial_frame = logged[0].frame;
    let mut error = 0;
    let mut count = 0;
    for moment_idx in 0..MOMENT_COUNT {
        let mut actual = generated.iter().filter(|entry| entry.moment as usize == moment_idx);
        let mut expected = logged.iter().filter(|entry| entry.moment as usize == moment_idx);
        loop {
            match (actual.next(), expected.next()) {
                (None, None) => break,
                (Some(actual), Some(expected)) => {
                    let actual_cycle = actual.frame as u64 * VBLANK_FREQ as u64 + actual.cycle as u64;
                    let expected_cycle = (expected.frame - initial_frame) as u64
                        * VBLANK_FREQ as u64 + expected.cycle as u64;
                    error += actual_cycle.abs_diff(expected_cycle);
                }
                _ => error += VBLANK_FREQ as u64,
            }
            count += 1;
        }
    }
    (error, count)
}

fn calibrate_cycles(
    mut opts: Wild3GeneratorOptions,
    map_data: &Wild3MapGameData,
    data_input: &Path,
) -> f64 {
    let file = File::open(data_input).expect("Could not open calibration data");
    let mut total_error = 0;
    let mut total_moments = 0;
    for (line_idx, line) in BufReader::new(file).lines().enumerate() {
        let line = line.expect("Could not read calibration data");
        if line.trim().is_empty() {
            continue;
        }
        let mut record: CalibrationRecord = serde_json::from_str(&line)
            .unwrap_or_else(|err| panic!("Invalid calibration JSON on line {}: {err}", line_idx + 1));
        record.cycle_at_moments.dedup();
        let initial = record.cycle_at_moments.first().expect("No logged moments");
        assert_eq!(initial.moment, Moment::TrySweetScentEncounter);
        let lead_cycle_spd = if opts.lead == Gen3Lead::Egg {
            0
        } else {
            calculate_pid_speed(u32::from_str_radix(&record.lead_pid, 16).expect("Invalid lead PID"))
        };
        opts.cycle_opts = Wild3GeneratorCycleOpts::CycleAtMomentWithEmuLog {
            lead_cycle_spd,
            initial_cycle_at_sweet_scent: initial.cycle,
            vblank_cycles: record.vblank_durations,
        };
        let generated = generate_wild3(Pokerng::with_jump(0, record.advance), &opts, map_data);
        let (error, moments) = cycle_score(
            &generated.cycle_counter.get_cycle_at_moments(),
            &record.cycle_at_moments,
        );
        println!("line {} advance {}: {:.2} cycles", line_idx + 1, record.advance, error as f64 / moments as f64);
        total_error += error;
        total_moments += moments;
    }
    assert!(total_moments > 0, "Calibration data contains no moments");
    total_error as f64 / total_moments as f64
}

#[test]
fn egg_route101_cycle_calibration() {
    route101_cycle_calibration(Gen3Lead::Egg, "egg_route101.json");
}

#[test]
fn vanilla_route101_cycle_calibration() {
    route101_cycle_calibration(Gen3Lead::Vanilla, "vanilla_route101.json");
}

#[test]
fn synchronize_naive_route101_cycle_calibration() {
    route101_cycle_calibration(Gen3Lead::Synchronize(crate::Nature::Naive), "synchronize_naive_route101.json");
}

fn route101_cycle_calibration(lead: Gen3Lead, data_file: &str) {
    let opts = Wild3GeneratorOptions {
        lead,
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
    let land_slots = [
        (Species::Wurmple, 2), (Species::Poochyena, 2),
        (Species::Wurmple, 2), (Species::Wurmple, 3),
        (Species::Poochyena, 3), (Species::Poochyena, 3),
        (Species::Wurmple, 3), (Species::Poochyena, 3),
        (Species::Zigzagoon, 2), (Species::Zigzagoon, 2),
        (Species::Zigzagoon, 3), (Species::Zigzagoon, 3),
    ];
    let map_data = Wild3MapGameData {
        map_id: "MAP_ROUTE101".into(),
        slots_by_action: vec![land_slots.into_iter().map(|(species, level)| Wild3EncounterGameData {
            min_level: level,
            max_level: level,
            species_data: SpeciesData { species },
        }).collect()],
        ..Wild3MapGameData::default()
    };
    let score = calibrate_cycles(opts, &map_data, &Path::new(env!("CARGO_MANIFEST_DIR"))
        .join("src/generators/gen3/wild/cycle_calibration_data")
        .join(data_file));
    println!("{lead:?} Route 101 mean absolute cycle error: {score:.2}");
    assert!(score.is_finite());
}

#[test]
fn cycle_score_accounts_for_frames_and_missing_moments() {
    let logged = [CycleFrameMoment::new(Moment::CreateMon, 10, 100)];
    assert_eq!(cycle_score(&[CycleFrameMoment::new(Moment::CreateMon, 0, 100)], &logged), (0, 1));
    assert_eq!(cycle_score(&[CycleFrameMoment::new(Moment::CreateMon, 1, 110)], &logged), (VBLANK_FREQ as u64 + 10, 1));
    assert_eq!(cycle_score(&[], &logged), (VBLANK_FREQ as u64, 1));
}
