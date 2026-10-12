use std::{
    fs::File,
    io::{BufRead, BufReader},
    path::Path,
};

use serde::Deserialize;

use super::{VBLANK_FREQ, get_min_mid_max_vblank_cycle_duration};

// The emulator's recording schema is independent of the production generator's
// moment names, so importing new recordings cannot change its results or ABI.
#[derive(Debug, Clone, Copy, PartialEq, Deserialize)]
#[allow(non_camel_case_types)]
#[repr(u8)]
enum Moment {
    Fishing_StartEncounter,
    GenerateFishingWildMon,
    ChooseWildMonIndex_Fishing,
    WildEncounterCheck,
    EncounterOddsCheck,
    TrySweetScentEncounter,
    SweetScentWildEncounter,
    TryStartRoamerEncounter,
    DoMassOutbreakEncounterTest,
    SetUpMassOutbreakEncounter,
    TryGenerateWildMon,
    TryGetAbilityInfluencedWildMonIndex,
    TryGetRandomWildMonIndexByType,
    ChooseWildMonIndex_Land,
    ChooseWildMonIndex_WaterRock,
    ChooseWildMonLevel,
    CreateWildMon,
    PickWildMonNature,
    CreateMonWithNature,
    CreateMonWithGenderNatureLetter,
    CreateMon,
    RockSmashWildEncounter,
    FishingWildEncounter,
    CheckFeebas,
    ChooseWildMonIndex_Land_Random,
    ChooseWildMonIndex_WaterRock_Random,
    ChooseWildMonIndex_Fishing_Random,
    ChooseWildMonLevel_RandomLvl,
    PickWildMonNature_RandomTestSynchro,
    CreateWildMon_RandomTestCuteCharm,
    PickWildMonNature_RandomPickNature,
    CreateMonWithNature_RandomPidLow,
    CreateMonWithNature_RandomPidHigh,
    CreateBoxMon_RandomIvs1,
    CreateBoxMon_RandomIvs2,
}

#[derive(Debug, Clone, Copy, PartialEq, Deserialize)]
struct CycleFrameMoment {
    moment: Moment,
    frame: usize,
    cycle: usize,
}

impl CycleFrameMoment {
    fn new(moment: Moment, frame: usize, cycle: usize) -> Self {
        Self {
            moment,
            frame,
            cycle,
        }
    }
}

#[derive(Deserialize)]
#[serde(rename_all = "camelCase")]
struct CalibrationRecord {
    advance: usize,
    #[serde(rename = "leadPID")]
    lead_pid: String,
    vblank_durations: Vec<usize>,
    cycle_at_moments: Vec<CycleFrameMoment>,
}

// Keep the same PID endpoints per frame as the compact calibration recordings.
fn important_moments(moments: &[CycleFrameMoment]) -> Vec<CycleFrameMoment> {
    let mut bounds = std::collections::BTreeMap::new();
    for (idx, entry) in moments.iter().enumerate() {
        if matches!(entry.moment,
            Moment::CreateMonWithNature_RandomPidLow | Moment::CreateMonWithNature_RandomPidHigh)
        {
            let key = (entry.frame, entry.moment as u8);
            bounds.entry(key).or_insert((idx, idx)).1 = idx;
        }
    }
    moments.iter().enumerate().filter_map(|(idx, entry)| {
        match bounds.get(&(entry.frame, entry.moment as u8)) {
            Some(&(first, last)) if idx != first && idx != last => None,
            _ => Some(*entry),
        }
    }).collect()
}

// Compare CPU-work increments, excluding recorded VBlank time from each timeline.
fn cycle_score(
    generated: &[CycleFrameMoment],
    logged: &[CycleFrameMoment],
    vblank_durations: &[usize],
) -> (u64, usize) {
    let mut transitions = std::collections::BTreeMap::<(u8, u8), [Vec<u64>; 2]>::new();
    for (source, moments) in [generated, logged].into_iter().enumerate() {
        let moments = important_moments(moments);
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
    // Compressed PID spans still represent all of the generated RNG transitions.
    // Preserve their weight so removing intermediate log entries does not raise
    // the mean error solely by shrinking the denominator.
    (error, count.max(generated.len().saturating_sub(1)))
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
#[test]
fn cycle_score_preserves_compressed_pid_transition_weight() {
    let low = Moment::CreateMonWithNature_RandomPidLow;
    let high = Moment::CreateMonWithNature_RandomPidHigh;
    let generated = [
        CycleFrameMoment::new(low, 0, 100),
        CycleFrameMoment::new(high, 0, 180),
        CycleFrameMoment::new(low, 0, 1100),
        CycleFrameMoment::new(high, 0, 1180),
        CycleFrameMoment::new(low, 0, 2100),
        CycleFrameMoment::new(high, 0, 2180),
    ];
    let mut logged = important_moments(&generated);
    logged[2].cycle += 30;
    logged[3].cycle += 30;
    assert_eq!(cycle_score(&generated, &logged, &[]), (30, 5));
}

#[test]
fn calibration_recordings_are_valid() {
    let root = Path::new(env!("CARGO_MANIFEST_DIR"))
        .join("src/generators/gen3/wild/cycle_calibration_data");
    let mut files = 0;
    for (directory, initial_moment) in [
        ("sweet_scent_land", Moment::TrySweetScentEncounter),
        ("sweet_scent_water", Moment::TrySweetScentEncounter),
        ("old_fishing", Moment::FishingWildEncounter),
        ("rock_smash", Moment::RockSmashWildEncounter),
    ] {
        for entry in std::fs::read_dir(root.join(directory)).unwrap() {
            let path = entry.unwrap().path();
            if path.extension().and_then(|extension| extension.to_str()) != Some("json") {
                continue;
            }
            files += 1;
            let mut records = 0;
            let file = File::open(&path).unwrap();
            for (idx, line) in BufReader::new(file).lines().enumerate() {
                let line = line.unwrap();
                if line.trim().is_empty() {
                    continue;
                }
                let context = format!("{}:{}", path.display(), idx + 1);
                let mut record: CalibrationRecord = serde_json::from_str(&line)
                    .unwrap_or_else(|err| panic!("{context}: {err}"));
                assert!(u32::from_str_radix(&record.lead_pid, 16).is_ok(), "{context}: invalid lead PID");
                assert!(record.advance > 0, "{context}: missing advance");
                record.cycle_at_moments.dedup();
                let first = record.cycle_at_moments.first().expect("No recorded moments");
                assert_eq!(first.moment, initial_moment, "{context}");
                for pair in record.cycle_at_moments.windows(2) {
                    let time = |entry: CycleFrameMoment| entry.frame as u64 * VBLANK_FREQ as u64 + entry.cycle as u64;
                    assert!(time(pair[1]) >= time(pair[0]), "{context}: non-monotonic timeline");
                }
                assert_eq!(cycle_score(&record.cycle_at_moments, &record.cycle_at_moments, &record.vblank_durations).0, 0, "{context}");
                records += 1;
            }
            assert!(records > 0, "{} contains no recordings", path.display());
        }
    }
    assert_eq!(files, 20, "Calibration corpus changed; review its coverage");
}
