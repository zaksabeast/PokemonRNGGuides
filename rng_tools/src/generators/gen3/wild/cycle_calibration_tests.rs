use super::{
    cycle_calibration::{calculate_cycle_score, map_pokeblock_cycle_calibration},
    *,
};
use crate::Species;

#[test]
fn wild3_cycle_calib_egg_route101() {
    map_pokeblock_cycle_calibration(
        Gen3Lead::Egg,
        Wild3Action::SweetScentLand,
        "egg_route101.jsonl",
        &route101_map_data(),
        None,
    );
}

#[test]
fn wild3_cycle_calib_vanilla_route101() {
    map_pokeblock_cycle_calibration(
        Gen3Lead::Vanilla,
        Wild3Action::SweetScentLand,
        "vanilla_route101.jsonl",
        &route101_map_data(),
        None,
    );
}

#[test]
fn wild3_cycle_calib_vanilla_route101_v2() {
    map_pokeblock_cycle_calibration(
        Gen3Lead::Vanilla,
        Wild3Action::SweetScentLand,
        "vanilla_route101_v2.jsonl",
        &route101_map_data(),
        None,
    );
}

#[test]
fn wild3_cycle_calib_synchronize_naive_route101() {
    map_pokeblock_cycle_calibration(
        Gen3Lead::Synchronize(crate::Nature::Naive),
        Wild3Action::SweetScentLand,
        "synchronize_naive_route101.jsonl",
        &route101_map_data(),
        None,
    );
}

#[test]
fn wild3_cycle_calib_cute_charm_female_route101() {
    map_pokeblock_cycle_calibration(
        Gen3Lead::CuteCharm(crate::Gender::Female),
        Wild3Action::SweetScentLand,
        "cute_charm_female_route101.jsonl",
        &route101_map_data(),
        None,
    );
}

#[test]
fn wild3_cycle_calib_cute_charm_female_route119() {
    map_pokeblock_cycle_calibration(
        Gen3Lead::CuteCharm(crate::Gender::Female),
        Wild3Action::SweetScentLand,
        "cute_charm_female_route119.jsonl",
        &route119_map_data(),
        None,
    );
}

#[test]
fn wild3_cycle_calib_cute_charm_male_desert_underpass() {
    map_pokeblock_cycle_calibration(
        Gen3Lead::CuteCharm(crate::Gender::Male),
        Wild3Action::SweetScentLand,
        "male_cute_charm_desert_underpass.jsonl",
        &desert_underpass_map_data(),
        None,
    );
}

#[test]
fn wild3_cycle_calib_synchronize_gentle_route119() {
    map_pokeblock_cycle_calibration(
        Gen3Lead::Synchronize(crate::Nature::Gentle),
        Wild3Action::SweetScentLand,
        "synchronize_gentle_route119.jsonl",
        &route119_map_data(),
        None,
    );
}

#[test]
fn wild3_cycle_calib_egg_meteor_falls_stevens_room() {
    map_pokeblock_cycle_calibration(
        Gen3Lead::Egg,
        Wild3Action::SweetScentLand,
        "egg_meteor_falls_stevens_cave.jsonl",
        &meteor_falls_stevens_cave_map_data(),
        None,
    );
}

#[test]
fn wild3_cycle_calib_static_route110() {
    map_pokeblock_cycle_calibration(
        Gen3Lead::Static,
        Wild3Action::SweetScentLand,
        "static_route110.jsonl",
        &route110_map_data(),
        None,
    );
}

#[test]
fn wild3_cycle_calib_magnet_pull_new_mauville_entrance() {
    map_pokeblock_cycle_calibration(
        Gen3Lead::MagnetPull,
        Wild3Action::SweetScentLand,
        "magnet_pull_new_mauville_entrance.jsonl",
        &new_mauville_entrance_map_data(),
        None,
    );
}

#[test]
fn wild3_cycle_calib_egg_route102_water() {
    map_pokeblock_cycle_calibration(
        Gen3Lead::Egg,
        Wild3Action::SweetScentWater,
        "egg_route102.jsonl",
        &route102_map_data(),
        None,
    );
}

#[test]
fn wild3_cycle_calib_egg_route102_old_rod() {
    map_pokeblock_cycle_calibration(
        Gen3Lead::Egg,
        Wild3Action::OldRod,
        "egg_route102.jsonl",
        &route102_map_data(),
        None,
    );
}

#[test]
fn wild3_cycle_calib_egg_route102_super_rod() {
    map_pokeblock_cycle_calibration(
        Gen3Lead::Egg,
        Wild3Action::SuperRod,
        "egg_route102.jsonl",
        &route102_map_data(),
        None,
    );
}

#[test]
fn wild3_cycle_calib_pressure_route102_old_rod() {
    map_pokeblock_cycle_calibration(
        Gen3Lead::HustleVitalSpiritPressure,
        Wild3Action::OldRod,
        "pressure_route102.jsonl",
        &route102_map_data(),
        None,
    );
}

#[test]
fn wild3_cycle_calib_magnet_pull_route111_rock_smash() {
    map_pokeblock_cycle_calibration(
        Gen3Lead::MagnetPull,
        Wild3Action::RockSmash,
        "magnet_pull_route111.jsonl",
        &route111_map_data(),
        None,
    );
}

#[test]
fn wild3_cycle_calib_vanilla_route111_rock_smash() {
    map_pokeblock_cycle_calibration(
        Gen3Lead::Vanilla,
        Wild3Action::RockSmash,
        "vanilla_route111.jsonl",
        &route111_map_data(),
        None,
    );
}

#[test]
fn wild3_cycle_calib_cute_charm_male_victory_road_b1f_rock_smash() {
    map_pokeblock_cycle_calibration(
        Gen3Lead::CuteCharm(crate::Gender::Male),
        Wild3Action::RockSmash,
        "male_cute_charm_victory_road_b1f.jsonl",
        &victory_road_b1f_map_data(),
        None,
    );
}

#[test]
fn wild3_cycle_calib_vanilla_safari_north_east_rock_smash() {
    map_pokeblock_cycle_calibration(
        Gen3Lead::Vanilla,
        Wild3Action::RockSmash,
        "vanilla_safari_north_east.jsonl",
        &safari_northeast_map_data(),
        None,
    );
}

#[test]
fn wild3_cycle_calib_vanilla_safari_middle_south_dry_sour_pokeblock() {
    map_pokeblock_cycle_calibration(
        Gen3Lead::Vanilla,
        Wild3Action::SweetScentLand,
        "vanilla_safari_middle_south_dry_sour_pokeblock.jsonl",
        &safari_south_map_data(),
        Some(Wild3SafariPokeblockGenOpt::Specific([0, 50, 0, 0, 11])),
    );
}

#[test]
fn wild3_cycle_calib_cute_charm_male_safari_middle_south_white_pokeblock() {
    map_pokeblock_cycle_calibration(
        Gen3Lead::CuteCharm(crate::Gender::Male),
        Wild3Action::SweetScentLand,
        "male_cute_charm_safari_middle_south_pokeblock_white.jsonl",
        &safari_south_map_data(),
        Some(Wild3SafariPokeblockGenOpt::Specific([1, 1, 1, 1, 0])),
    );
}

#[test]
fn wild3_cycle_calib_synchronize_brave_safari_middle_south_spicy_pokeblock() {
    map_pokeblock_cycle_calibration(
        Gen3Lead::Synchronize(crate::Nature::Brave),
        Wild3Action::SweetScentLand,
        "synchronize_brave_safari_middle_south_spicy_pokeblock.jsonl",
        &safari_south_map_data(),
        Some(Wild3SafariPokeblockGenOpt::Specific([1, 0, 0, 0, 0])),
    );
}

fn desert_underpass_map_data() -> Wild3MapGameData {
    let land_slots = [
        (Species::Ditto, 38),
        (Species::Whismur, 35),
        (Species::Ditto, 40),
        (Species::Loudred, 40),
        (Species::Ditto, 41),
        (Species::Whismur, 36),
        (Species::Loudred, 38),
        (Species::Ditto, 42),
        (Species::Whismur, 38),
        (Species::Ditto, 43),
        (Species::Loudred, 44),
        (Species::Ditto, 45),
    ];
    Wild3MapGameData {
        map_id: "MAP_DESERT_UNDERPASS".into(),
        map_internal_idx: 111,
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
    }
}

fn route101_map_data() -> Wild3MapGameData {
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
    Wild3MapGameData {
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
    }
}

fn route119_map_data() -> Wild3MapGameData {
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
    Wild3MapGameData {
        map_id: "MAP_ROUTE119".into(),
        map_internal_idx: 33,
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
    }
}

fn route102_map_data() -> Wild3MapGameData {
    let water_slots = [
        (Species::Marill, 20, 30),
        (Species::Marill, 10, 20),
        (Species::Marill, 30, 35),
        (Species::Marill, 5, 10),
        (Species::Goldeen, 20, 30),
    ];
    let fishing_slots = [(Species::Magikarp, 5, 10), (Species::Goldeen, 5, 10)];
    let super_rod_levels = [(25, 30), (30, 35), (20, 25), (35, 40), (40, 45)];
    Wild3MapGameData {
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
            fishing_slots
                .into_iter()
                .map(|(species, min_level, max_level)| Wild3EncounterGameData {
                    min_level,
                    max_level,
                    species_data: SpeciesData { species },
                })
                .collect(),
            vec![],
            super_rod_levels
                .into_iter()
                .map(|(min_level, max_level)| Wild3EncounterGameData {
                    min_level,
                    max_level,
                    species_data: SpeciesData {
                        species: Species::Corphish,
                    },
                })
                .collect(),
        ],
        ..Wild3MapGameData::default()
    }
}

fn route111_map_data() -> Wild3MapGameData {
    let rock_smash_slots = [(10, 15), (5, 10), (15, 20), (15, 20), (15, 20)];
    let mut slots_by_action = vec![vec![]; Wild3Action::RockSmash as usize + 1];
    slots_by_action[Wild3Action::RockSmash as usize] = rock_smash_slots
        .into_iter()
        .map(|(min_level, max_level)| Wild3EncounterGameData {
            min_level,
            max_level,
            species_data: SpeciesData {
                species: Species::Geodude,
            },
        })
        .collect();
    Wild3MapGameData {
        map_id: "MAP_ROUTE111".into(),
        map_internal_idx: 6,
        slots_by_action,
        rock_smash_rate: 20,
        ..Wild3MapGameData::default()
    }
}

fn victory_road_b1f_map_data() -> Wild3MapGameData {
    let rock_smash_slots = [
        (Species::Graveler, 30, 40),
        (Species::Geodude, 30, 40),
        (Species::Graveler, 35, 40),
        (Species::Graveler, 35, 40),
        (Species::Graveler, 35, 40),
    ];
    let mut slots_by_action = vec![vec![]; Wild3Action::RockSmash as usize + 1];
    slots_by_action[Wild3Action::RockSmash as usize] = rock_smash_slots
        .into_iter()
        .map(|(species, min_level, max_level)| Wild3EncounterGameData {
            min_level,
            max_level,
            species_data: SpeciesData { species },
        })
        .collect();
    Wild3MapGameData {
        map_id: "MAP_VICTORY_ROAD_B1F".into(),
        map_internal_idx: 75,
        slots_by_action,
        rock_smash_rate: 20,
        ..Wild3MapGameData::default()
    }
}

fn safari_south_map_data() -> Wild3MapGameData {
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
    Wild3MapGameData {
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
    }
}

fn meteor_falls_stevens_cave_map_data() -> Wild3MapGameData {
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
    Wild3MapGameData {
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
    }
}

fn route110_map_data() -> Wild3MapGameData {
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
    Wild3MapGameData {
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
    }
}

fn new_mauville_entrance_map_data() -> Wild3MapGameData {
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
    Wild3MapGameData {
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
    }
}

fn safari_northeast_map_data() -> Wild3MapGameData {
    let rock_smash_slots = [(25, 30), (20, 25), (30, 35), (30, 35), (35, 40)];
    let mut slots_by_action = vec![vec![]; Wild3Action::RockSmash as usize + 1];
    slots_by_action[Wild3Action::RockSmash as usize] = rock_smash_slots
        .into_iter()
        .map(|(min_level, max_level)| Wild3EncounterGameData {
            min_level,
            max_level,
            species_data: SpeciesData {
                species: Species::Shuckle,
            },
        })
        .collect();
    Wild3MapGameData {
        map_id: "MAP_SAFARI_ZONE_NORTHEAST".into(),
        map_internal_idx: 98,
        slots_by_action,
        rock_smash_rate: 25,
        is_safari: true,
        ..Wild3MapGameData::default()
    }
}

#[test]
fn wild3_cycle_calib_gender_constrained_pid_frame_crossing() {
    use super::cycle_calibration::is_wild3;

    // The logger omits PID halves in this routine, so its full interval is
    // the only available witness of a crossing during PID generation.
    let start = CycleFrameMoment::new(Moment::CreateMonWithGenderNatureLetter, 10, 189828);
    assert!(is_wild3(&[
        start,
        CycleFrameMoment::new(Moment::CreateMon, 11, 78555),
    ]));
    assert!(!is_wild3(&[
        start,
        CycleFrameMoment::new(Moment::CreateMon, 10, 200000),
    ]));
    assert!(!is_wild3(&[
        CycleFrameMoment::new(Moment::CreateMon, 10, 200000),
        CycleFrameMoment::new(Moment::CreateBoxMon_RandomIvs1, 11, 100000),
    ]));
}

#[test]
fn wild3_cycle_calib_filter_important_moments_across_frames() {
    let moments = [
        CycleFrameMoment::new(Moment::CreateMonWithNature, 0, 10),
        CycleFrameMoment::new(Moment::CreateMonWithNature_RandomPidLow, 0, 20),
        CycleFrameMoment::new(Moment::CreateMonWithNature_RandomPidHigh, 0, 100),
        CycleFrameMoment::new(Moment::CreateMonWithNature_RandomPidLow, 1, 20),
        CycleFrameMoment::new(Moment::CreateMonWithNature_RandomPidHigh, 1, 100),
        CycleFrameMoment::new(Moment::CreateMon, 1, 200),
    ];
    assert_eq!(
        super::cycle_calibration::filter_important_moments(&moments),
        vec![moments[0], moments[1], moments[4], moments[5]]
    );
}

#[test]
fn wild3_cycle_calib_calculate_cycle_score_with_missing_transitions() {
    let logged = [
        CycleFrameMoment::new(Moment::CreateMon, 10, 280800),
        CycleFrameMoment::new(Moment::CreateBoxMon_RandomIvs1, 11, 100),
    ];
    let generated = [
        CycleFrameMoment::new(Moment::CreateMon, 0, 280800),
        CycleFrameMoment::new(Moment::CreateBoxMon_RandomIvs1, 1, 110),
    ];
    assert_eq!(calculate_cycle_score(&logged, &logged, &[50]), (0, 1));
    assert_eq!(calculate_cycle_score(&generated, &logged, &[50]), (10, 1));
    assert_eq!(
        calculate_cycle_score(&[], &logged, &[50]),
        (VBLANK_FREQ as u64, 1)
    );
}

#[test]
fn wild3_cycle_calib_calculate_cycle_score_with_vblanks() {
    // Test 1
    let generated = [
        CycleFrameMoment::new(Moment::CreateMon, 0, 0),
        CycleFrameMoment::new(Moment::CreateBoxMon_RandomIvs1, 0, 200000),
    ];
    let logged = [
        CycleFrameMoment::new(Moment::CreateMon, 10, 200000),
        CycleFrameMoment::new(Moment::CreateBoxMon_RandomIvs1, 12, 100000),
    ];
    assert_eq!(
        calculate_cycle_score(&generated, &logged, &[50000, 60000]),
        (2 * VBLANK_FREQ as u64 - 410000, 1),
    );

    // Test 2
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
    assert_eq!(
        calculate_cycle_score(&generated, &logged, &[50000]),
        (30, 2)
    );
}

#[test]
fn wild3_cycle_calib_calculate_cycle_score_with_early_late() {
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
    assert_eq!(calculate_cycle_score(&early, &logged, &[]), (1000, 3));
    assert_eq!(calculate_cycle_score(&late, &logged, &[]), (1000, 3));
    assert_eq!(
        calculate_cycle_score(&make([1000, 1100, 1200, 1300]), &logged, &[]),
        (0, 3)
    );
}
