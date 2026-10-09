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

// Compare CPU-work increments, excluding recorded VBlank time from each timeline.
fn cycle_score(
    generated: &[CycleFrameMoment],
    logged: &[CycleFrameMoment],
    vblank_durations: &[usize],
) -> (u64, usize) {
    let mut transitions = std::collections::BTreeMap::<(u8, u8), [Vec<u64>; 2]>::new();
    for (source, moments) in [generated, logged].into_iter().enumerate() {
        let initial_frame = moments.first().map_or(0, |entry| entry.frame);
        for pair in moments.windows(2) {
            let time = |entry: CycleFrameMoment| {
                entry.frame as u64 * VBLANK_FREQ as u64 + entry.cycle as u64
            };
            let key = (pair[0].moment as u8, pair[1].moment as u8);
            let vblank_cycles = (pair[0].frame - initial_frame..pair[1].frame - initial_frame)
                .map(|frame| {
                    vblank_durations.get(frame).copied()
                        .unwrap_or_else(|| get_min_mid_max_vblank_cycle_duration().1) as u64
                })
                .sum::<u64>();
            let cpu_cycles = (time(pair[1]) - time(pair[0]))
                .checked_sub(vblank_cycles)
                .expect("VBlank duration exceeds the recorded transition interval");
            transitions.entry(key).or_default()[source].push(cpu_cycles);
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
        let initial_moment = if opts.action.is_fishing() {
            Moment::FishingWildEncounter
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
        // Fishing recordings start after the zero-cost encounter wrapper.
        if opts.action.is_fishing() {
            assert_eq!(generated_moments[0].moment, Moment::Fishing_StartEncounter);
            generated_moments.remove(0);
        }
        // The emulator logger omits PID halves inside the gender-constrained routine.
        if record.cycle_at_moments.iter().any(|entry| entry.moment == Moment::CreateMonWithGenderNatureLetter) {
            generated_moments.retain(|entry| !matches!(entry.moment,
                Moment::CreateMonWithNature_RandomPidLow | Moment::CreateMonWithNature_RandomPidHigh));
        }
        let (error, increments) = cycle_score(
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

#[test]
fn cute_charm_female_route119_cycle_calibration() {
    route119_cycle_calibration(
        Gen3Lead::CuteCharm(crate::Gender::Female),
        "cute_charm_female_route119.json",
    );
}

#[test]
fn synchronize_gentle_route119_cycle_calibration() {
    route119_cycle_calibration(
        Gen3Lead::Synchronize(crate::Nature::Gentle),
        "synchronize_gentle_route119.json",
    );
}

#[test]
fn egg_meteor_falls_stevens_room_cycle_calibration() {
    let land_slots = [
        (Species::Golbat, 33),
        (Species::Golbat, 35),
        (Species::Golbat, 33),
        (Species::Solrock, 35),
        (Species::Solrock, 33),
        (Species::Solrock, 37),
        (Species::Golbat, 35),
        (Species::Solrock, 39),
        (Species::Golbat, 38),
        (Species::Golbat, 40),
        (Species::Golbat, 38),
        (Species::Golbat, 40),
    ];
    let map_data = Wild3MapGameData {
        map_id: "MAP_METEOR_FALLS_STEVENS_CAVE".into(),
        map_internal_idx: 123,
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
    map_cycle_calibration(
        Gen3Lead::Egg,
        "egg_meteor_falls_stevens_cave.json",
        &map_data,
    );
}

#[test]
fn static_route110_cycle_calibration() {
    let land_slots = [
        (Species::Poochyena, 12),
        (Species::Electrike, 12),
        (Species::Gulpin, 12),
        (Species::Electrike, 13),
        (Species::Minun, 13),
        (Species::Oddish, 13),
        (Species::Minun, 13),
        (Species::Gulpin, 13),
        (Species::Wingull, 12),
        (Species::Wingull, 12),
        (Species::Plusle, 12),
        (Species::Plusle, 13),
    ];
    let map_data = Wild3MapGameData {
        map_id: "MAP_ROUTE110".into(),
        map_internal_idx: 5,
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
    map_cycle_calibration(Gen3Lead::Static, "static_route110.json", &map_data);
}

#[test]
fn magnet_pull_new_mauville_entrance_cycle_calibration() {
    let land_slots = [
        (Species::Voltorb, 24),
        (Species::Magnemite, 24),
        (Species::Voltorb, 25),
        (Species::Magnemite, 25),
        (Species::Voltorb, 23),
        (Species::Magnemite, 23),
        (Species::Voltorb, 26),
        (Species::Magnemite, 26),
        (Species::Voltorb, 22),
        (Species::Magnemite, 22),
        (Species::Voltorb, 22),
        (Species::Magnemite, 22),
    ];
    let map_data = Wild3MapGameData {
        map_id: "MAP_NEW_MAUVILLE_ENTRANCE".into(),
        map_internal_idx: 71,
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
    map_cycle_calibration(
        Gen3Lead::MagnetPull,
        "magnet_pull_new_mauville_entrance.json",
        &map_data,
    );
}

fn route119_cycle_calibration(lead: Gen3Lead, data_file: &str) {
    let land_slots = [
        (Species::Zigzagoon, 25),
        (Species::Linoone, 25),
        (Species::Zigzagoon, 27),
        (Species::Oddish, 25),
        (Species::Linoone, 27),
        (Species::Oddish, 26),
        (Species::Oddish, 27),
        (Species::Oddish, 24),
        (Species::Tropius, 25),
        (Species::Tropius, 26),
        (Species::Tropius, 27),
        (Species::Kecleon, 25),
    ];
    let map_data = Wild3MapGameData {
        map_id: "MAP_ROUTE119".into(),
        map_internal_idx: 33,
        slots_by_action: vec![land_slots.into_iter().map(|(species, level)| {
            Wild3EncounterGameData {
                min_level: level,
                max_level: level,
                species_data: SpeciesData { species },
            }
        }).collect()],
        ..Wild3MapGameData::default()
    };
    map_cycle_calibration(lead, data_file, &map_data);
}

fn route101_cycle_calibration(lead: Gen3Lead, data_file: &str) {
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
        map_internal_idx: 0,
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
    map_cycle_calibration(lead, data_file, &map_data);
}

#[test]
fn egg_route102_water_cycle_calibration() {
    let water_slots = [
        (Species::Marill, 20, 30),
        (Species::Marill, 10, 20),
        (Species::Marill, 30, 35),
        (Species::Marill, 5, 10),
        (Species::Goldeen, 20, 30),
    ];
    let map_data = Wild3MapGameData {
        map_id: "MAP_ROUTE102".into(),
        map_internal_idx: 1,
        slots_by_action: vec![
            vec![],
            water_slots
                .into_iter()
                .map(|(species, min_level, max_level)| Wild3EncounterGameData {
                    min_level,
                    max_level,
                    species_data: SpeciesData { species },
                })
                .collect(),
        ],
        ..Wild3MapGameData::default()
    };
    map_action_cycle_calibration(
        Gen3Lead::Egg,
        Wild3Action::SweetScentWater,
        "egg_route102.json",
        &map_data,
    );
}

#[test]
fn egg_route102_old_rod_cycle_calibration() {
    route102_old_rod_cycle_calibration(Gen3Lead::Egg, "egg_route102.json");
}

#[test]
fn pressure_route102_old_rod_cycle_calibration() {
    route102_old_rod_cycle_calibration(
        Gen3Lead::HustleVitalSpiritPressure,
        "pressure_route102.json",
    );
}

fn route102_old_rod_cycle_calibration(lead: Gen3Lead, data_file: &str) {
    let fishing_slots = [
        (Species::Magikarp, 5, 10),
        (Species::Goldeen, 5, 10),
    ];
    let map_data = Wild3MapGameData {
        map_id: "MAP_ROUTE102".into(),
        map_internal_idx: 1,
        slots_by_action: vec![
            vec![],
            vec![],
            fishing_slots
                .into_iter()
                .map(|(species, min_level, max_level)| Wild3EncounterGameData {
                    min_level,
                    max_level,
                    species_data: SpeciesData { species },
                })
                .collect(),
        ],
        ..Wild3MapGameData::default()
    };
    map_action_cycle_calibration(
        lead,
        Wild3Action::OldRod,
        data_file,
        &map_data,
    );
}

#[test]
fn magnet_pull_route111_rock_smash_cycle_calibration() {
    route111_rock_smash_cycle_calibration(Gen3Lead::MagnetPull, "magnet_pull_route111.json");
}

#[test]
fn vanilla_route111_rock_smash_cycle_calibration() {
    route111_rock_smash_cycle_calibration(Gen3Lead::Vanilla, "vanilla_route111.json");
}

fn route111_rock_smash_cycle_calibration(lead: Gen3Lead, data_file: &str) {
    let rock_smash_slots = [(10, 15), (5, 10), (15, 20), (15, 20), (15, 20)];
    let mut slots_by_action = vec![vec![]; Wild3Action::RockSmash as usize + 1];
    slots_by_action[Wild3Action::RockSmash as usize] = rock_smash_slots
        .into_iter()
        .map(|(min_level, max_level)| Wild3EncounterGameData {
            min_level,
            max_level,
            species_data: SpeciesData { species: Species::Geodude },
        })
        .collect();
    let map_data = Wild3MapGameData {
        map_id: "MAP_ROUTE111".into(),
        map_internal_idx: 6,
        slots_by_action,
        rock_smash_rate: 20,
        ..Wild3MapGameData::default()
    };
    map_action_cycle_calibration(
        lead,
        Wild3Action::RockSmash,
        data_file,
        &map_data,
    );
}

#[test]
fn vanilla_safari_north_east_rock_smash_cycle_calibration() {
    let rock_smash_slots = [(25, 30), (20, 25), (30, 35), (30, 35), (35, 40)];
    let mut slots_by_action = vec![vec![]; Wild3Action::RockSmash as usize + 1];
    slots_by_action[Wild3Action::RockSmash as usize] = rock_smash_slots
        .into_iter()
        .map(|(min_level, max_level)| Wild3EncounterGameData {
            min_level,
            max_level,
            species_data: SpeciesData { species: Species::Shuckle },
        })
        .collect();
    let map_data = Wild3MapGameData {
        map_id: "MAP_SAFARI_ZONE_NORTHEAST".into(),
        map_internal_idx: 98,
        slots_by_action,
        rock_smash_rate: 25,
        is_safari: true,
        ..Wild3MapGameData::default()
    };
    map_action_cycle_calibration(
        Gen3Lead::Vanilla,
        Wild3Action::RockSmash,
        "vanilla_safari_north_east.json",
        &map_data,
    );
}

#[test]
fn vanilla_safari_middle_south_dry_sour_pokeblock_cycle_calibration() {
    safari_middle_south_pokeblock_cycle_calibration(
        Gen3Lead::Vanilla,
        "vanilla_safari_middle_south_dry_sour_pokeblock.json",
        [0, 50, 0, 0, 11],
    );
}

#[test]
fn synchronize_brave_safari_middle_south_spicy_pokeblock_cycle_calibration() {
    safari_middle_south_pokeblock_cycle_calibration(
        Gen3Lead::Synchronize(crate::Nature::Brave),
        "synchronize_brave_safari_middle_south_spicy_pokeblock.json",
        [1, 0, 0, 0, 0],
    );
}

fn safari_middle_south_pokeblock_cycle_calibration(
    lead: Gen3Lead,
    data_file: &str,
    flavors: [u8; 5],
) {
    let land_slots = [
        (Species::Oddish, 25),
        (Species::Oddish, 27),
        (Species::Girafarig, 25),
        (Species::Girafarig, 27),
        (Species::Natu, 25),
        (Species::Doduo, 25),
        (Species::Gloom, 25),
        (Species::Wobbuffet, 27),
        (Species::Pikachu, 25),
        (Species::Wobbuffet, 27),
        (Species::Pikachu, 27),
        (Species::Wobbuffet, 29),
    ];
    let map_data = Wild3MapGameData {
        map_id: "MAP_SAFARI_ZONE_SOUTH".into(),
        map_internal_idx: 20,
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
        is_safari: true,
        actions_with_safari_pokeblock: vec![Wild3Action::SweetScentLand],
        ..Wild3MapGameData::default()
    };
    map_pokeblock_cycle_calibration(
        lead,
        Wild3Action::SweetScentLand,
        data_file,
        &map_data,
        Some(Wild3SafariPokeblockGenOpt::Specific(flavors)),
    );
}

fn map_cycle_calibration(lead: Gen3Lead, data_file: &str, map_data: &Wild3MapGameData) {
    map_action_cycle_calibration(lead, Wild3Action::SweetScentLand, data_file, map_data);
}

fn map_action_cycle_calibration(
    lead: Gen3Lead,
    action: Wild3Action,
    data_file: &str,
    map_data: &Wild3MapGameData,
) {
    map_pokeblock_cycle_calibration(lead, action, data_file, map_data, None);
}

fn map_pokeblock_cycle_calibration(
    lead: Gen3Lead,
    action: Wild3Action,
    data_file: &str,
    map_data: &Wild3MapGameData,
    safari_pokeblock: Option<Wild3SafariPokeblockGenOpt>,
) {
    let data_dir = match action {
        Wild3Action::SweetScentLand => "sweet_scent_land",
        Wild3Action::SweetScentWater => "sweet_scent_water",
        Wild3Action::OldRod => "old_fishing",
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
    let score = calibrate_cycles(
        opts,
        map_data,
        &Path::new(env!("CARGO_MANIFEST_DIR"))
            .join("src/generators/gen3/wild/cycle_calibration_data")
            .join(data_dir)
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
    assert_eq!(cycle_score(&logged, &logged, &[50]), (0, 1));
    assert_eq!(cycle_score(&generated, &logged, &[50]), (10, 1));
    assert_eq!(cycle_score(&[], &logged, &[50]), (VBLANK_FREQ as u64, 1));
}

#[test]
fn cycle_score_excludes_vblank_when_it_moves_between_transitions() {
    let generated = [
        CycleFrameMoment::new(Moment::CreateMon, 0, VBLANK_FREQ - 100),
        CycleFrameMoment::new(Moment::CreateBoxMon_RandomIvs1, 0, VBLANK_FREQ - 20),
        CycleFrameMoment::new(Moment::CreateBoxMon_RandomIvs2, 1, 50040),
    ];
    let logged = [
        CycleFrameMoment::new(Moment::CreateMon, 10, VBLANK_FREQ - 100),
        CycleFrameMoment::new(Moment::CreateBoxMon_RandomIvs1, 11, 50010),
        CycleFrameMoment::new(Moment::CreateBoxMon_RandomIvs2, 11, 50070),
    ];
    // The work intervals are [80, 60] and [110, 60], despite different VBlank placement.
    assert_eq!(cycle_score(&generated, &logged, &[50000]), (30, 2));
}

#[test]
fn cycle_score_subtracts_each_crossed_vblank_duration() {
    let generated = [
        CycleFrameMoment::new(Moment::CreateMon, 0, 0),
        CycleFrameMoment::new(Moment::CreateBoxMon_RandomIvs1, 0, 200000),
    ];
    let logged = [
        CycleFrameMoment::new(Moment::CreateMon, 10, 200000),
        CycleFrameMoment::new(Moment::CreateBoxMon_RandomIvs1, 12, 100000),
    ];
    assert_eq!(
        cycle_score(&generated, &logged, &[50000, 60000]),
        (2 * VBLANK_FREQ as u64 - 410000, 1),
    );
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
    assert_eq!(cycle_score(&early, &logged, &[]), (1000, 3));
    assert_eq!(cycle_score(&late, &logged, &[]), (1000, 3));
    assert_eq!(cycle_score(&make([1000, 1100, 1200, 1300]), &logged, &[]), (0, 3));
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