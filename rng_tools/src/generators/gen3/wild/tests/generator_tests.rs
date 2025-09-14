use crate::{
    AbilityType, EncounterSlot, Gender, Ivs, Nature, PkmFilter, Species,
    gen3::{
        Gen3Lead, Gen3Method, Gen3PkmFilter, Wild3Action, Wild3EncounterGameData,
        Wild3EncounterIndex, Wild3FeebasState, Wild3GeneratorOptions, Wild3GeneratorResult,
        Wild3MapGameData, Wild3MassOutbreakState, Wild3RoamerState, Wild3SpecialEncounterGameData,
        generate_gen3_wild,
    },
    rng::lcrng::Pokerng,
};

#[test]
fn test_generate_wild3_no_filter() {
    let options = Wild3GeneratorOptions {
        methods: vec![Gen3Method::Wild1],
        ..Default::default()
    };

    let (result, _) = generate_gen3_wild(
        Pokerng::with_advances(0, 9),
        &options,
        &Wild3MapGameData::default(),
    );
    let expected_result = vec![Wild3GeneratorResult {
        encounter_idx: Wild3EncounterIndex::Slot(EncounterSlot::Slot1),
        pid: 0x6E031C49,
        ivs: Ivs::new(10, 13, 12, 20, 10, 9),
        method: Gen3Method::Wild1,
        ..Default::default()
    }];
    assert_eq!(result, expected_result);
}

#[test]
fn test_generate_wild3_with_filter() {
    let options = Wild3GeneratorOptions {
        methods: vec![Gen3Method::Wild1],
        filter: PkmFilter {
            nature: Some(Nature::Adamant),
            gender: Some(Gender::Female),
            min_ivs: Ivs::new(10, 10, 10, 10, 10, 10),
            ability: Some(AbilityType::Second),
            ..Default::default()
        },
        gen3_filter: Gen3PkmFilter {
            species: Some(Species::Abra),
            ..Default::default()
        },
        ..Default::default()
    };

    let mut game_data = Wild3MapGameData::default();
    game_data.slots_by_action[Wild3Action::SweetScentLand as usize]
        [EncounterSlot::Slot0 as usize]
        .species_data
        .species = Species::Abra;
    game_data.slots_by_action[Wild3Action::SweetScentLand as usize]
        [EncounterSlot::Slot6 as usize]
        .species_data
        .species = Species::Abra;
    game_data.slots_by_action[Wild3Action::SweetScentLand as usize]
        [EncounterSlot::Slot8 as usize]
        .species_data
        .species = Species::Abra;

    let (result, _) = generate_gen3_wild(Pokerng::new(0xA4893D21), &options, &game_data);
    let expected_result = vec![Wild3GeneratorResult {
        encounter_idx: Wild3EncounterIndex::Slot(EncounterSlot::Slot0),
        pid: 0x02FA9E49,
        ivs: Ivs::new(12, 29, 23, 10, 14, 13),
        method: Gen3Method::Wild1,
        ..Default::default()
    }];
    assert_eq!(result, expected_result);
}
#[test]
fn test_generate_wild3_shiny() {
    let options = Wild3GeneratorOptions {
        tid: 34760,
        sid: 47362,
        methods: vec![Gen3Method::Wild1],
        filter: PkmFilter {
            shiny: true,
            nature: Some(Nature::Naive),
            gender: Some(Gender::Male),
            ability: Some(AbilityType::Second),
            ..Default::default()
        },
        ..Default::default()
    };

    let rng = Pokerng::new(0x14a22065);
    let (result, _) = generate_gen3_wild(rng, &options, &Wild3MapGameData::default());
    let expected_result = vec![Wild3GeneratorResult {
        encounter_idx: Wild3EncounterIndex::Slot(EncounterSlot::Slot4),
        pid: 0x692A57E1,
        ivs: Ivs::new(0, 0, 0, 8, 13, 25),
        method: Gen3Method::Wild1,
        ..Default::default()
    }];
    assert_eq!(result, expected_result);
}

#[test]
fn test_generate_wild3_synch() {
    let options = Wild3GeneratorOptions {
        methods: vec![Gen3Method::Wild1],
        lead: Gen3Lead::Synchronize(Nature::Hardy),
        ..Default::default()
    };

    let (result, _) = generate_gen3_wild(
        Pokerng::new(0x14a22065),
        &options,
        &Wild3MapGameData::default(),
    );
    let expected_result = vec![Wild3GeneratorResult {
        pid: 0x3A5DEC53,
        method: Gen3Method::Wild1,
        ivs: Ivs::new(0, 4, 15, 8, 25, 13),
        encounter_idx: Wild3EncounterIndex::Slot(EncounterSlot::Slot4),
        ..Default::default()
    }];
    assert_eq!(result, expected_result);
}

#[test]
fn test_generate_wild3_cute_charm_activated() {
    let options = Wild3GeneratorOptions {
        methods: vec![Gen3Method::Wild1],
        lead: Gen3Lead::CuteCharm(Gender::Female),
        ..Default::default()
    };

    let (result, _) = generate_gen3_wild(
        Pokerng::with_advances(0, 2),
        &options,
        &Wild3MapGameData::default(),
    );
    let expected_result = vec![Wild3GeneratorResult {
        encounter_idx: Wild3EncounterIndex::Slot(EncounterSlot::Slot0),
        pid: 0x722DEBE7,
        ivs: Ivs::new(28, 1, 26, 0, 14, 16),
        method: Gen3Method::Wild1,
        ..Default::default()
    }];
    assert_eq!(result, expected_result);
}

#[test]
fn test_generate_wild3_all_methods() {
    let options = Wild3GeneratorOptions {
        methods: vec![
            Gen3Method::Wild1,
            Gen3Method::Wild2,
            Gen3Method::Wild3,
            Gen3Method::Wild4,
            Gen3Method::Wild5,
        ],
        ..Default::default()
    };

    let (result, _) = generate_gen3_wild(
        Pokerng::with_advances(0, 2),
        &options,
        &Wild3MapGameData::default(),
    );
    let expected_result = vec![
        Wild3GeneratorResult {
            encounter_idx: Wild3EncounterIndex::Slot(EncounterSlot::Slot0),
            pid: 2570972118,
            ivs: Ivs::new(28, 21, 30, 29, 18, 7),
            method: Gen3Method::Wild5,
            ..Default::default()
        },
        Wild3GeneratorResult {
            encounter_idx: Wild3EncounterIndex::Slot(EncounterSlot::Slot0),
            pid: 1636667768,
            ivs: Ivs::new(18, 20, 5, 29, 19, 24),
            method: Gen3Method::Wild3,
            ..Default::default()
        },
        Wild3GeneratorResult {
            encounter_idx: Wild3EncounterIndex::Slot(EncounterSlot::Slot0),
            pid: 1036881243,
            ivs: Ivs::new(19, 28, 1, 5, 8, 17),
            method: Gen3Method::Wild5,
            ..Default::default()
        },
        Wild3GeneratorResult {
            encounter_idx: Wild3EncounterIndex::Slot(EncounterSlot::Slot0),
            pid: 1671314793,
            ivs: Ivs::new(13, 20, 26, 20, 24, 22),
            method: Gen3Method::Wild2,
            ..Default::default()
        },
        Wild3GeneratorResult {
            encounter_idx: Wild3EncounterIndex::Slot(EncounterSlot::Slot0),
            pid: 1671314793,
            ivs: Ivs::new(9, 9, 7, 20, 24, 22),
            method: Gen3Method::Wild4,
            ..Default::default()
        },
        Wild3GeneratorResult {
            encounter_idx: Wild3EncounterIndex::Slot(EncounterSlot::Slot0),
            pid: 1671314793,
            ivs: Ivs::new(9, 9, 7, 20, 26, 13),
            method: Gen3Method::Wild1,
            ..Default::default()
        },
    ];
    assert_eq!(result, expected_result);
}

#[test]
fn test_generate_wild3_egg_lead() {
    let options = Wild3GeneratorOptions {
        methods: vec![Gen3Method::Wild4],
        lead: Gen3Lead::Egg,
        ..Default::default()
    };

    let (result, _) = generate_gen3_wild(
        Pokerng::with_advances(0, 1234),
        &options,
        &Wild3MapGameData::default(),
    );
    let expected_result = vec![Wild3GeneratorResult {
        encounter_idx: Wild3EncounterIndex::Slot(EncounterSlot::Slot1),
        pid: 1996552928,
        ivs: Ivs::new(23, 27, 7, 20, 15, 31),
        method: Gen3Method::Wild4,
        ..Default::default()
    }];
    assert_eq!(result, expected_result);
}

#[test]
fn test_generate_wild3_fishing() {
    let options = Wild3GeneratorOptions {
        methods: vec![Gen3Method::Wild1],
        action: Wild3Action::GoodRod,
        ..Default::default()
    };

    let (result, _) = generate_gen3_wild(
        Pokerng::with_advances(0, 234),
        &options,
        &Wild3MapGameData::default(),
    );
    let expected_result = vec![Wild3GeneratorResult {
        encounter_idx: Wild3EncounterIndex::Slot(EncounterSlot::Slot1),
        pid: 4072166945,
        ivs: Ivs::new(15, 0, 10, 2, 28, 7),
        method: Gen3Method::Wild1,
        ..Default::default()
    }];
    assert_eq!(result, expected_result);
}

#[test]
fn test_generate_wild3_feebas() {
    let mut options = Wild3GeneratorOptions {
        action: Wild3Action::GoodRod,
        methods: vec![Gen3Method::Wild1],
        feebas_state: Wild3FeebasState::OnFeebasTile,
        generate_even_if_impossible: true,
        ..Default::default()
    };
    let mut game_data = Wild3MapGameData::default();
    game_data.feebas = Some(Wild3EncounterGameData::default());

    // if fishing on Feebas tile, gets feebas
    let (result, _) = generate_gen3_wild(Pokerng::new(0), &options, &game_data);
    assert_eq!(
        result,
        vec![Wild3GeneratorResult {
            encounter_idx: Wild3EncounterIndex::Feebas,
            pid: 4231227355,
            ivs: Ivs::new(12, 25, 27, 2, 31, 30),
            method: Gen3Method::Wild1,
            ..Default::default()
        }]
    );

    //if not on Feebas tile, doesn't get feebas
    options.feebas_state = Wild3FeebasState::InMapButNotOnFeebasTile;
    let (result, _) = generate_gen3_wild(Pokerng::new(0), &options, &game_data);
    assert!(!result.is_empty());
    assert!(!matches!(
        result[0].encounter_idx,
        Wild3EncounterIndex::Feebas
    ));

    //if not fishing, doesn't get feebas
    options.action = Wild3Action::SweetScentLand;
    options.feebas_state = Wild3FeebasState::InMapButNotOnFeebasTile;
    let (result, _) = generate_gen3_wild(Pokerng::new(0), &options, &game_data);
    assert!(!result.is_empty());
    assert!(!matches!(
        result[0].encounter_idx,
        Wild3EncounterIndex::Feebas
    ));

    //if advance is 1, doesn't get feebas
    options.action = Wild3Action::OldRod;
    options.feebas_state = Wild3FeebasState::OnFeebasTile;
    let (result, _) = generate_gen3_wild(Pokerng::with_advances(0, 1), &options, &game_data);
    assert!(!result.is_empty());
    assert!(!matches!(
        result[0].encounter_idx,
        Wild3EncounterIndex::Feebas
    ));
}

#[test]
fn test_generate_wild3_roamer() {
    let mut options = Wild3GeneratorOptions {
        action: Wild3Action::SweetScentLand,
        methods: vec![Gen3Method::Wild1],
        roamer_state: Wild3RoamerState::ActiveInMapLatios,
        generate_even_if_impossible: true,
        ..Default::default()
    };
    let mut game_data = Wild3MapGameData::default();
    game_data.roamers.push(Wild3SpecialEncounterGameData {
        id: Wild3RoamerState::ActiveInMapLatios,
        ..Default::default()
    });

    // if roamer is active, gets roamer
    let (result, _) = generate_gen3_wild(Pokerng::new(0), &options, &game_data);
    assert!(!result.is_empty());
    // the roamer PID/IVs aren't tested, because they are generated when the Pokémon starts roaming
    assert!(matches!(
        result[0].encounter_idx,
        Wild3EncounterIndex::Roamer(Wild3RoamerState::ActiveInMapLatios)
    ));

    //if no roamer, doesn't get roamer
    options.roamer_state = Wild3RoamerState::Inactive;
    let (result, _) = generate_gen3_wild(Pokerng::new(0), &options, &game_data);
    assert!(!result.is_empty());
    assert!(!matches!(
        result[0].encounter_idx,
        Wild3EncounterIndex::Roamer(Wild3RoamerState::ActiveInMapLatios)
    ));

    // if roamer is active but fishing, doesn't get roamer
    options.action = Wild3Action::GoodRod;
    options.roamer_state = Wild3RoamerState::ActiveInMapLatios;
    let (result, _) = generate_gen3_wild(Pokerng::new(0), &options, &game_data);
    assert!(!result.is_empty());
    assert!(!matches!(
        result[0].encounter_idx,
        Wild3EncounterIndex::Roamer(Wild3RoamerState::ActiveInMapLatios)
    ));
}

#[test]
fn test_generate_wild3_magnet_pull() {
    let mut options = Wild3GeneratorOptions {
        action: Wild3Action::SweetScentLand,
        methods: vec![Gen3Method::Wild1],
        lead: Gen3Lead::MagnetPull,
        generate_even_if_impossible: true,
        ..Default::default()
    };
    let mut game_data = Wild3MapGameData::default();

    let (result, _) = generate_gen3_wild(Pokerng::new(0), &options, &game_data);

    // magnet pull has no effect if there's no steel type
    assert_eq!(
        result,
        vec![Wild3GeneratorResult {
            encounter_idx: Wild3EncounterIndex::Slot(EncounterSlot::Slot5),
            pid: 1621222420,
            ivs: Ivs::new(11, 25, 10, 25, 3, 24),
            method: Gen3Method::Wild1,
            ..Default::default()
        }]
    );

    game_data.slots_by_action[Wild3Action::SweetScentLand as usize]
        [EncounterSlot::Slot11 as usize]
        .species_data
        .is_steel_type = true;

    //magnet pull changed the slot for the steel type
    let (result, _) = generate_gen3_wild(Pokerng::new(0), &options, &game_data);
    assert_eq!(
        result,
        vec![Wild3GeneratorResult {
            encounter_idx: Wild3EncounterIndex::Slot(EncounterSlot::Slot11),
            pid: 1621222420,
            ivs: Ivs::new(11, 25, 10, 25, 3, 24),
            method: Gen3Method::Wild1,
            ..Default::default()
        }]
    );

    // magnet pull has no effect for water encounters even with steel type
    options.action = Wild3Action::SweetScentWater;
    let (result, _) = generate_gen3_wild(Pokerng::new(0), &options, &game_data);
    assert_eq!(
        result,
        vec![Wild3GeneratorResult {
            encounter_idx: Wild3EncounterIndex::Slot(EncounterSlot::Slot0),
            pid: 4231227355,
            ivs: Ivs::new(12, 25, 27, 2, 31, 30),
            method: Gen3Method::Wild1,
            ..Default::default()
        }]
    );
}

#[test]
fn test_generate_wild3_static() {
    let mut options = Wild3GeneratorOptions {
        action: Wild3Action::SweetScentLand,
        methods: vec![Gen3Method::Wild1],
        lead: Gen3Lead::Static,
        generate_even_if_impossible: true,
        ..Default::default()
    };
    let mut game_data = Wild3MapGameData::default();

    let (result, _) = generate_gen3_wild(Pokerng::new(0), &options, &game_data);

    // Static has no effect if no electric type
    assert_eq!(
        result,
        vec![Wild3GeneratorResult {
            encounter_idx: Wild3EncounterIndex::Slot(EncounterSlot::Slot5),
            pid: 1621222420,
            ivs: Ivs::new(11, 25, 10, 25, 3, 24),
            method: Gen3Method::Wild1,
            ..Default::default()
        }]
    );

    game_data.slots_by_action[Wild3Action::SweetScentLand as usize]
        [EncounterSlot::Slot11 as usize]
        .species_data
        .is_electric_type = true;

    //magnet pull changed the slot for the electric type
    let (result, _) = generate_gen3_wild(Pokerng::new(0), &options, &game_data);
    assert_eq!(
        result,
        vec![Wild3GeneratorResult {
            encounter_idx: Wild3EncounterIndex::Slot(EncounterSlot::Slot11),
            pid: 1621222420,
            ivs: Ivs::new(11, 25, 10, 25, 3, 24),
            method: Gen3Method::Wild1,
            ..Default::default()
        }]
    );

    // Static has no effect for fishing encounters
    options.action = Wild3Action::OldRod;
    let (result, _) = generate_gen3_wild(Pokerng::new(0), &options, &game_data);
    assert_eq!(
        result,
        vec![Wild3GeneratorResult {
            encounter_idx: Wild3EncounterIndex::Slot(EncounterSlot::Slot0),
            pid: 4231227355,
            ivs: Ivs::new(12, 25, 27, 2, 31, 30),
            method: Gen3Method::Wild1,
            ..Default::default()
        }]
    );
}

#[test]
fn test_generate_wild3_hustle() {
    let mut options = Wild3GeneratorOptions {
        action: Wild3Action::SweetScentLand,
        methods: vec![Gen3Method::Wild1],
        generate_even_if_impossible: true,
        ..Default::default()
    };
    let mut game_data = Wild3MapGameData::default();

    for slot in game_data.slots_by_action[Wild3Action::SweetScentLand as usize].iter_mut() {
        slot.min_level = 1;
        slot.max_level = 100;
    }

    let (result, _) = generate_gen3_wild(Pokerng::with_advances(0, 2), &options, &game_data);

    // Normal behaviour
    assert_eq!(
        result,
        vec![Wild3GeneratorResult {
            encounter_idx: Wild3EncounterIndex::Slot(EncounterSlot::Slot0),
            pid: 1671314793,
            ivs: Ivs::new(9, 9, 7, 20, 26, 13),
            method: Gen3Method::Wild1,
            lvl: 77,
            ..Default::default()
        }]
    );

    // With Hustle, level changes
    options.lead = Gen3Lead::HustleVitalSpiritPressure;
    let (result, _) = generate_gen3_wild(Pokerng::with_advances(0, 1), &options, &game_data);

    assert_eq!(
        result,
        vec![Wild3GeneratorResult {
            encounter_idx: Wild3EncounterIndex::Slot(EncounterSlot::Slot5),
            pid: 1671314793,
            ivs: Ivs::new(9, 9, 7, 20, 26, 13),
            method: Gen3Method::Wild1,
            lvl: 100,
            ..Default::default()
        }]
    );
}

#[test]
fn test_generate_wild3_mass_outbreak() {
    let mut options = Wild3GeneratorOptions {
        action: Wild3Action::SweetScentLand,
        methods: vec![Gen3Method::Wild1],
        generate_even_if_impossible: true,
        mass_outbreak_state: Wild3MassOutbreakState::Route102Seedot,
        ..Default::default()
    };
    let mut game_data = Wild3MapGameData::default();
    game_data
        .mass_outbreaks
        .push(Wild3SpecialEncounterGameData {
            id: Wild3MassOutbreakState::Route102Seedot,
            ..Default::default()
        });

    let (result, _) = generate_gen3_wild(Pokerng::with_advances(0, 2), &options, &game_data);

    assert_eq!(
        result,
        vec![Wild3GeneratorResult {
            encounter_idx: Wild3EncounterIndex::MassOutbreak(
                Wild3MassOutbreakState::Route102Seedot
            ),
            pid: 1671314793,
            ivs: Ivs::new(9, 9, 7, 20, 26, 13),
            method: Gen3Method::Wild1,
            ..Default::default()
        }]
    );

    // if fishing, doesn't get mass outbreak
    options.action = Wild3Action::GoodRod;
    let (result, _) = generate_gen3_wild(Pokerng::with_advances(0, 2), &options, &game_data);
    assert!(!result.is_empty());
    assert!(!matches!(
        result[0].encounter_idx,
        Wild3EncounterIndex::MassOutbreak(Wild3MassOutbreakState::Route102Seedot)
    ));
}

/*
// Kept to help future debugging
#[test]
fn test_generate_wild3_debug() {
    let options = Wild3GeneratorOptions {
        tid: 0,
        sid: 0,
        gender_ratio: GenderRatio::SevenToOne,
        encounter_idx: None,
        action: Gen3WildAction::Land,
        methods: vec![Gen3Method::Wild1],
        advance: 1234,
        map_idx: 0,
        lead: Gen3Lead::CuteCharm(Gender::Female),
        filter: PkmFilter::new_allow_all(),
    };

    let mut rng = Pokerng::new(0);
    rng.advance(options.advance);
    let (result,_) = generate_gen3_wild(rng, &options);

    println!("{:?}", result);
    assert!(false);
}
*/
