use std::{
    fs::File,
    io::{BufRead, BufReader},
    path::Path,
};

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

// Compare consecutive increments; absolute emulator frame numbers cancel out.
fn cycle_score(generated: &[CycleFrameMoment], logged: &[CycleFrameMoment]) -> (u64, usize) {
    let mut transitions = std::collections::BTreeMap::<(u8, u8), [Vec<u64>; 2]>::new();
    for (source, moments) in [generated, logged].into_iter().enumerate() {
        for pair in moments.windows(2) {
            let time = |entry: CycleFrameMoment| {
                entry.frame as u64 * VBLANK_FREQ as u64 + entry.cycle as u64
            };
            let key = (pair[0].moment as u8, pair[1].moment as u8);
            transitions.entry(key).or_default()[source].push(time(pair[1]) - time(pair[0]));
        }
    }
    let mut error = 0;
    let mut count = 0;
    for [actual, expected] in transitions.into_values() {
        // Match repeated transitions in occurrence order; retain a penalty for missing ones.
        for idx in 0..actual.len().max(expected.len()) {
            error += match (actual.get(idx), expected.get(idx)) {
                (Some(actual), Some(expected)) => actual.abs_diff(*expected),
                _ => VBLANK_FREQ as u64,
            };
            count += 1;
        }
    }
    (error, count)
}

fn has_pid_frame_change(moments: &[CycleFrameMoment]) -> bool {
    moments.windows(2).any(|pair| {
        pair[0].frame != pair[1].frame
            && matches!(
                (pair[0].moment, pair[1].moment),
                (Moment::CreateMonWithNature_RandomPidHigh, Moment::CreateMonWithNature_RandomPidLow)
                    | (Moment::CreateMonWithNature_RandomPidLow, Moment::CreateMonWithNature_RandomPidHigh)
            )
    })
}

fn calibrate_cycles(
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
        if has_pid_frame_change(&record.cycle_at_moments) {
            println!("Skipping line {} advance {}: frame changed during PID generation", line_idx + 1, record.advance);
            continue;
        }
        let initial = record.cycle_at_moments.first().expect("No logged moments");
        assert_eq!(initial.moment, Moment::TrySweetScentEncounter);
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
            vblank_cycles: record.vblank_durations,
        };
        let generated = generate_wild3(Pokerng::with_jump(0, record.advance), &opts, map_data);
        let mut generated_moments = generated.cycle_counter.get_cycle_at_moments();
        // The emulator logger omits PID halves inside the gender-constrained routine.
        if record.cycle_at_moments.iter().any(|entry| entry.moment == Moment::CreateMonWithGenderNatureLetter) {
            generated_moments.retain(|entry| !matches!(entry.moment,
                Moment::CreateMonWithNature_RandomPidLow | Moment::CreateMonWithNature_RandomPidHigh));
        }
        let (error, increments) = cycle_score(
            &generated_moments,
            &record.cycle_at_moments,
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
    assert!(total_increments > 0, "Calibration data contains no transitions");
    total_error as f64 / total_increments as f64
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
fn vanilla_route101_v2_cycle_calibration() {
    route101_cycle_calibration(Gen3Lead::Vanilla, "vanilla_route101_v2.json");
}

#[test]
fn synchronize_naive_route101_cycle_calibration() {
    route101_cycle_calibration(
        Gen3Lead::Synchronize(crate::Nature::Naive),
        "synchronize_naive_route101.json",
    );
}

#[test]
fn cute_charm_female_route101_cycle_calibration() {
    route101_cycle_calibration(Gen3Lead::CuteCharm(crate::Gender::Female), "cute_charm_female_route101.json");
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
        (Species::Wurmple, 2),
        (Species::Poochyena, 2),
        (Species::Wurmple, 2),
        (Species::Wurmple, 3),
        (Species::Poochyena, 3),
        (Species::Poochyena, 3),
        (Species::Wurmple, 3),
        (Species::Poochyena, 3),
        (Species::Zigzagoon, 2),
        (Species::Zigzagoon, 2),
        (Species::Zigzagoon, 3),
        (Species::Zigzagoon, 3),
    ];
    let map_data = Wild3MapGameData {
        map_id: "MAP_ROUTE101".into(),
        slots_by_action: vec![
            land_slots
                .into_iter()
                .map(|(species, level)| Wild3EncounterGameData {
                    min_level: level,
                    max_level: level,
                    species_data: SpeciesData { species },
                })
                .collect(),
        ],
        ..Wild3MapGameData::default()
    };
    let score = calibrate_cycles(
        opts,
        &map_data,
        &Path::new(env!("CARGO_MANIFEST_DIR"))
            .join("src/generators/gen3/wild/cycle_calibration_data/sweet_scent")
            .join(data_file),
    );
    println!("{data_file} ({lead:?}) mean absolute cycle increment error: {score:.2}");
    assert!(score.is_finite());
    assert!(score < 100.0, "{data_file} cycle increment error regressed: {score:.2}");
}

#[test]
fn cycle_score_accounts_for_frames_and_missing_transitions() {
    let logged = [
        CycleFrameMoment::new(Moment::CreateMon, 10, 280800),
        CycleFrameMoment::new(Moment::CreateBoxMon_RandomIvs1, 11, 100),
    ];
    let generated = [
        CycleFrameMoment::new(Moment::CreateMon, 0, 280800),
        CycleFrameMoment::new(Moment::CreateBoxMon_RandomIvs1, 1, 110),
    ];
    assert_eq!(cycle_score(&logged, &logged), (0, 1));
    assert_eq!(cycle_score(&generated, &logged), (10, 1));
    assert_eq!(cycle_score(&[], &logged), (VBLANK_FREQ as u64, 1));
}

#[test]
fn cycle_score_weights_early_and_late_errors_equally() {
    let moments = [
        Moment::TrySweetScentEncounter,
        Moment::SweetScentWildEncounter,
        Moment::TryStartRoamerEncounter,
        Moment::DoMassOutbreakEncounterTest,
    ];
    let make = |cycles: [usize; 4]| {
        std::array::from_fn::<_, 4, _>(|idx| CycleFrameMoment::new(moments[idx], 0, cycles[idx]))
    };
    let logged = make([0, 100, 200, 300]);
    let early = make([0, 1100, 1200, 1300]);
    let late = make([0, 100, 200, 1300]);
    assert_eq!(cycle_score(&early, &logged), (1000, 3));
    assert_eq!(cycle_score(&late, &logged), (1000, 3));
    assert_eq!(cycle_score(&make([1000, 1100, 1200, 1300]), &logged), (0, 3));
}

#[test]
fn shared_entry_cycles_apply_to_all_leads() {
    let map_data = Wild3MapGameData::default();
    for lead in [
        Gen3Lead::Egg,
        Gen3Lead::Vanilla,
        Gen3Lead::Synchronize(crate::Nature::Naive),
        Gen3Lead::CuteCharm(crate::Gender::Male),
        Gen3Lead::CuteCharm(crate::Gender::Female),
        Gen3Lead::MagnetPull,
        Gen3Lead::Static,
        Gen3Lead::HustleVitalSpiritPressure,
    ] {
        let opts = Wild3GeneratorOptions {
            lead,
            methods: vec![Gen3Method::Wild1],
            cycle_opts: Wild3GeneratorCycleOpts::CycleAtMomentWithEmuLog {
                lead_cycle_spd: 0,
                initial_cycle_at_sweet_scent: 0,
                vblank_cycles: vec![],
            },
            ..Default::default()
        };
        let generated = generate_wild3(Pokerng::with_jump(0, 44), &opts, &map_data);
        let moments = generated.cycle_counter.get_cycle_at_moments();
        let time = |moment| {
            let entry = moments.iter().find(|entry| entry.moment == moment).unwrap();
            entry.frame * VBLANK_FREQ + entry.cycle
        };
        assert_eq!(
            time(Moment::SweetScentWildEncounter) - time(Moment::TrySweetScentEncounter),
            2001,
            "{lead:?}"
        );
        assert_eq!(
            time(Moment::TryStartRoamerEncounter) - time(Moment::SweetScentWildEncounter),
            744,
            "{lead:?}"
        );
        assert_eq!(
            time(Moment::ChooseWildMonLevel_RandomLvl) - time(Moment::ChooseWildMonLevel),
            63,
            "{lead:?}"
        );
    }
}

#[test]
fn lead_pid_speed_changes_ability_check_cycles() {
    let map_data = Wild3MapGameData::default();
    for lead in [Gen3Lead::Vanilla, Gen3Lead::Synchronize(crate::Nature::Naive)] {
        let mut durations = Vec::new();
        for lead_cycle_spd in [18, 768] {
            let opts = Wild3GeneratorOptions {
                lead,
                methods: vec![Gen3Method::Wild1],
                cycle_opts: Wild3GeneratorCycleOpts::CycleAtMomentWithEmuLog {
                    lead_cycle_spd,
                    initial_cycle_at_sweet_scent: 0,
                    vblank_cycles: vec![],
                },
                ..Default::default()
            };
            let generated = generate_wild3(Pokerng::with_jump(0, 44), &opts, &map_data);
            let moments = generated.cycle_counter.get_cycle_at_moments();
            let checks: Vec<_> = moments.iter()
                .filter(|entry| entry.moment == Moment::TryGetAbilityInfluencedWildMonIndex)
                .collect();
            assert_eq!(checks.len(), 2);
            durations.push(checks[1].frame * VBLANK_FREQ + checks[1].cycle
                - (checks[0].frame * VBLANK_FREQ + checks[0].cycle));
        }
        assert_eq!(durations[1] - durations[0], 16 * (768 - 18), "{lead:?}");
    }
}
#[test]
fn pid_frame_change_filter_checks_both_directions() {
    let low = Moment::CreateMonWithNature_RandomPidLow;
    let high = Moment::CreateMonWithNature_RandomPidHigh;
    for (first, second) in [(low, high), (high, low)] {
        assert!(has_pid_frame_change(&[
            CycleFrameMoment::new(first, 10, 280800),
            CycleFrameMoment::new(second, 11, 54000),
        ]));
        assert!(!has_pid_frame_change(&[
            CycleFrameMoment::new(first, 10, 100),
            CycleFrameMoment::new(second, 10, 180),
        ]));
    }
    assert!(!has_pid_frame_change(&[
        CycleFrameMoment::new(Moment::CreateBoxMon_RandomIvs1, 10, 280800),
        CycleFrameMoment::new(Moment::CreateBoxMon_RandomIvs2, 11, 54000),
    ]));
    assert!(!has_pid_frame_change(&[]));
}