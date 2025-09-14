use super::*;
use crate::{
    EncounterSlot, PokemonType,
    gen3::{FASTEST_DIVIDENDS_MOD_24_RANGE, Gen3PidSpeedFilter, Wild3SpecialEncounterGameData},
};

mod utils;
use utils::{pid_paths_to_string, strs_to_string};

#[test]
fn test_search_find_pid_paths_by_step_filter() {
    let opts = FindPidPathsOptions {
        filter: PkmFilter {
            shiny: true,
            min_ivs: Ivs::new(0, 0, 0, 0, 0, 0),
            max_ivs: Ivs::new(0, 15, 15, 15, 0, 0),
            ..Default::default()
        },
        initial_advances: 193925000,
        max_advances: 1000,
        ..Default::default()
    };

    let expected_results = strs_to_string(&[
        "Seed: 6B61F77C, Adv: 193925916, Method: Wild1, PID: 78057806, Ivs: 0/0/2/15/0/0",
    ]);

    assert_eq!(
        pid_paths_to_string(find_pid_paths_by_step_iv1::<true>(&opts)),
        expected_results
    );

    assert_eq!(
        pid_paths_to_string(find_pid_paths_by_step_iv2::<true>(&opts)),
        expected_results
    );

    assert_eq!(
        pid_paths_to_string(find_pid_paths_by_step_pid::<true>(&opts)),
        expected_results
    );
}

#[test]
fn test_search_find_pid_paths_by_step_no_filter() {
    let mut opts = FindPidPathsOptions {
        initial_advances: 193925915,
        max_advances: 1,
        ..Default::default()
    };

    assert_eq!(
        pid_paths_to_string(find_pid_paths_by_step_iv1::<true>(&opts)),
        strs_to_string(&[
            "Seed: C1223018, Adv: 193925912, Method: Wild2, PID: 50A2F0C6, Ivs: 1/27/26/0/30/6",
            "Seed: C1223018, Adv: 193925912, Method: Wild3, PID: 76A6F0C6, Ivs: 1/27/26/0/30/6",
            "Seed: F0C62AAB, Adv: 193925913, Method: Wild1, PID: 76A650A2, Ivs: 1/27/26/0/30/6",
            "Seed: F0C62AAB, Adv: 193925913, Method: Wild2, PID: 76A650A2, Ivs: 6/0/30/0/30/5",
            "Seed: F0C62AAB, Adv: 193925913, Method: Wild3, PID: 6B6150A2, Ivs: 6/0/30/0/30/5",
            "Seed: F0C62AAB, Adv: 193925913, Method: Wild4, PID: 76A650A2, Ivs: 1/27/26/0/30/5",
            "Seed: 50A2A542, Adv: 193925914, Method: Wild1, PID: 6B6176A6, Ivs: 6/0/30/0/30/5",
            "Seed: 50A2A542, Adv: 193925914, Method: Wild4, PID: 6B6176A6, Ivs: 6/0/30/0/2/0"
        ])
    );

    opts.initial_advances += 1;
    assert_eq!(
        pid_paths_to_string(find_pid_paths_by_step_iv2::<true>(&opts)),
        strs_to_string(&[
            "Seed: C1223018, Adv: 193925912, Method: Wild2, PID: 50A2F0C6, Ivs: 1/27/26/0/30/6",
            "Seed: C1223018, Adv: 193925912, Method: Wild3, PID: 76A6F0C6, Ivs: 1/27/26/0/30/6",
            "Seed: C1223018, Adv: 193925912, Method: Wild4, PID: 50A2F0C6, Ivs: 6/21/29/0/30/6",
            "Seed: F0C62AAB, Adv: 193925913, Method: Wild1, PID: 76A650A2, Ivs: 1/27/26/0/30/6",
            "Seed: F0C62AAB, Adv: 193925913, Method: Wild2, PID: 76A650A2, Ivs: 6/0/30/0/30/5",
            "Seed: F0C62AAB, Adv: 193925913, Method: Wild3, PID: 6B6150A2, Ivs: 6/0/30/0/30/5",
            "Seed: F0C62AAB, Adv: 193925913, Method: Wild4, PID: 76A650A2, Ivs: 1/27/26/0/30/5",
            "Seed: 50A2A542, Adv: 193925914, Method: Wild1, PID: 6B6176A6, Ivs: 6/0/30/0/30/5"
        ])
    );

    opts.initial_advances -= 3;
    assert_eq!(
        pid_paths_to_string(find_pid_paths_by_step_pid::<true>(&opts)),
        strs_to_string(&[
            "Seed: F0C62AAB, Adv: 193925913, Method: Wild1, PID: 76A650A2, Ivs: 1/27/26/0/30/6",
            "Seed: F0C62AAB, Adv: 193925913, Method: Wild2, PID: 76A650A2, Ivs: 6/0/30/0/30/5",
            "Seed: F0C62AAB, Adv: 193925913, Method: Wild3, PID: 6B6150A2, Ivs: 6/0/30/0/30/5",
            "Seed: F0C62AAB, Adv: 193925913, Method: Wild4, PID: 76A650A2, Ivs: 1/27/26/0/30/5",
            "Seed: 50A2A542, Adv: 193925914, Method: Wild1, PID: 6B6176A6, Ivs: 6/0/30/0/30/5",
            "Seed: 50A2A542, Adv: 193925914, Method: Wild2, PID: 6B6176A6, Ivs: 5/0/30/0/2/0",
            "Seed: 50A2A542, Adv: 193925914, Method: Wild3, PID: 780676A6, Ivs: 5/0/30/0/2/0",
            "Seed: 50A2A542, Adv: 193925914, Method: Wild4, PID: 6B6176A6, Ivs: 6/0/30/0/2/0"
        ])
    );
}

#[test]
fn test_search_find_pid_paths_by_step_filter_method() {
    let mut opts = FindPidPathsOptions {
        initial_advances: 193925915,
        max_advances: 1,
        methods: vec![Gen3Method::Wild1],
        consider_all_methods_124: false,
        ..Default::default()
    };

    assert_eq!(
        pid_paths_to_string(find_pid_paths_by_step_iv1::<true>(&opts)),
        strs_to_string(&[
            "Seed: F0C62AAB, Adv: 193925913, Method: Wild1, PID: 76A650A2, Ivs: 1/27/26/0/30/6",
            "Seed: 50A2A542, Adv: 193925914, Method: Wild1, PID: 6B6176A6, Ivs: 6/0/30/0/30/5",
        ])
    );

    opts.initial_advances += 1;
    assert_eq!(
        pid_paths_to_string(find_pid_paths_by_step_iv2::<true>(&opts)),
        strs_to_string(&[
            "Seed: F0C62AAB, Adv: 193925913, Method: Wild1, PID: 76A650A2, Ivs: 1/27/26/0/30/6",
            "Seed: 50A2A542, Adv: 193925914, Method: Wild1, PID: 6B6176A6, Ivs: 6/0/30/0/30/5"
        ])
    );

    opts.initial_advances -= 3;
    assert_eq!(
        pid_paths_to_string(find_pid_paths_by_step_pid::<true>(&opts)),
        strs_to_string(&[
            "Seed: F0C62AAB, Adv: 193925913, Method: Wild1, PID: 76A650A2, Ivs: 1/27/26/0/30/6",
            "Seed: 50A2A542, Adv: 193925914, Method: Wild1, PID: 6B6176A6, Ivs: 6/0/30/0/30/5",
        ])
    );
}

#[test]
fn test_search_reverse_wild1_vanilla() {
    let mut options = Wild3SearcherOptions {
        methods: vec![Gen3Method::Wild1],
        max_result_count: 1,
        leads: vec![Gen3Lead::Vanilla],
        filter: PkmFilter {
            nature: Some(Nature::Adamant),
            gender: Some(Gender::Female),
            min_ivs: Ivs::new(12, 29, 23, 10, 14, 13),
            max_ivs: Ivs::new(12, 29, 23, 10, 14, 13),
            ability: Some(AbilityType::Second),
            ..Default::default()
        },
        gen3_filter: Gen3PkmFilter {
            species: Some(Species::Shuckle),
            ..Default::default()
        },
        ..Default::default()
    };

    options.map_setups[0].map_data.slots_by_action[Wild3Action::SweetScentLand as usize]
        [EncounterSlot::Slot0 as usize]
        .species_data
        .species = Species::Shuckle;

    // Static seed: 081A6F6E
    // Wild seed: A4893D21
    let expected_results = [Wild3SearcherResultMon {
        encounter_idx: Wild3EncounterIndex::Slot(EncounterSlot::Slot0),
        pid: 0x02FA9E49,
        advance: 3737251199,
        shiny: false,
        nature: Nature::Adamant,
        ability: AbilityType::Second,
        ivs: Ivs::new(12, 29, 23, 10, 14, 13),
        gender: Gender::Female,
        method: Gen3Method::Wild1,
        lead: Gen3Lead::Vanilla,
        hidden_power: HiddenPower::new(PokemonType::Ground, 63),
        species: Species::Shuckle,
        ..Default::default()
    }];
    let result = search_wild3_reverse(&options)
        .into_iter()
        .flatten()
        .collect_vec();
    assert_eq!(result, expected_results);
}

#[test]
fn test_search_reverse_wild2_synchronize_success() {
    let mut options = Wild3SearcherOptions {
        methods: vec![Gen3Method::Wild2],
        max_result_count: 2,
        leads: vec![Gen3Lead::Synchronize(Nature::Quirky)],
        filter: PkmFilter {
            nature: Some(Nature::Quirky),
            min_ivs: Ivs::new(6, 5, 5, 5, 5, 5),
            max_ivs: Ivs::new(8, 5, 5, 5, 5, 5),
            ..Default::default()
        },
        gen3_filter: Gen3PkmFilter {
            species: Some(Species::Shuckle),
            ..Default::default()
        },
        ..Default::default()
    };

    let slots =
        &mut options.map_setups[0].map_data.slots_by_action[Wild3Action::SweetScentLand as usize];
    slots[EncounterSlot::Slot1 as usize].species_data.species = Species::Shuckle;
    slots[EncounterSlot::Slot5 as usize].species_data.species = Species::Shuckle;
    // Note: A seed also exists for Slot0

    // Wild seeds:
    // 8F6E01F2	1: Zubat	12	0B3652A2	No	Quirky	0: Inner Focus	7	5	5	5	5	5	Dark	30	♂
    // B2B63148	5: Zubat	12	0B3652A2	No	Quirky	0: Inner Focus	7	5	5	5	5	5	Dark	30	♂
    // 39AB5340	0: Zubat	10	0B3652A2	No	Quirky	0: Inner Focus	7	5	5	5	5	5	Dark	30	♂

    let expected_results = [
        Wild3SearcherResultMon {
            encounter_idx: Wild3EncounterIndex::Slot(EncounterSlot::Slot1),
            pid: 188109474,
            advance: 1160779594,
            shiny: false,
            nature: Nature::Quirky,
            ability: AbilityType::First,
            ivs: Ivs::new(7, 5, 5, 5, 5, 5),
            gender: Gender::Male,
            method: Gen3Method::Wild2,
            lead: Gen3Lead::Synchronize(Nature::Quirky),
            hidden_power: HiddenPower::new(PokemonType::Dark, 30),
            species: Species::Shuckle,
            ..Default::default()
        },
        Wild3SearcherResultMon {
            encounter_idx: Wild3EncounterIndex::Slot(EncounterSlot::Slot5),
            pid: 188109474,
            advance: 1160779592,
            shiny: false,
            nature: Nature::Quirky,
            ability: AbilityType::First,
            ivs: Ivs::new(7, 5, 5, 5, 5, 5),
            gender: Gender::Male,
            method: Gen3Method::Wild2,
            lead: Gen3Lead::Synchronize(Nature::Quirky),
            hidden_power: HiddenPower::new(PokemonType::Dark, 30),
            species: Species::Shuckle,
            ..Default::default()
        },
    ];
    let result = search_wild3_reverse(&options)
        .into_iter()
        .flatten()
        .collect_vec();
    assert_eq!(result, expected_results);
}

#[test]
fn test_search_reverse_wild4_cute_charm_success() {
    let mut options = Wild3SearcherOptions {
        methods: vec![Gen3Method::Wild4],
        max_result_count: 1,
        leads: vec![Gen3Lead::CuteCharm(Gender::Male)],
        filter: PkmFilter {
            nature: Some(Nature::Mild),
            min_ivs: Ivs::new(5, 5, 5, 5, 9, 5),
            max_ivs: Ivs::new(5, 5, 5, 5, 9, 5),
            ..Default::default()
        },
        gen3_filter: Gen3PkmFilter {
            species: Some(Species::Shuckle),
            ..Default::default()
        },
        ..Default::default()
    };

    let slots =
        &mut options.map_setups[0].map_data.slots_by_action[Wild3Action::SweetScentLand as usize];
    slots[EncounterSlot::Slot1 as usize].species_data.species = Species::Shuckle;
    // Note: A seed also exists for Slot0

    // Wild seeds:
    // 9B65682D	1: Zubat	12	75AE8232	No	Mild	0: Inner Focus	5	5	5	5	9	5	Dark	30	♀

    let expected_results = [Wild3SearcherResultMon {
        encounter_idx: Wild3EncounterIndex::Slot(EncounterSlot::Slot1),
        pid: 1974370866,
        advance: 1805496635,
        shiny: false,
        nature: Nature::Mild,
        ability: AbilityType::First,
        ivs: Ivs::new(5, 5, 5, 5, 9, 5),
        gender: Gender::Female,
        method: Gen3Method::Wild4,
        lead: Gen3Lead::CuteCharm(Gender::Male),
        hidden_power: HiddenPower::new(PokemonType::Dark, 30),
        species: Species::Shuckle,
        ..Default::default()
    }];
    let result = search_wild3_reverse(&options)
        .into_iter()
        .flatten()
        .collect_vec();
    assert_eq!(result, expected_results);
}

#[test]
fn test_search_reverse_wild3_mass_outbreak() {
    // advance 2001
    //209553 - 209632 0%	Wild3	Seedot	915D3A93	No	29	22	12	6	28	10
    let mut options = Wild3SearcherOptions {
        methods: vec![Gen3Method::Wild3],
        max_result_count: 1,
        leads: vec![Gen3Lead::Vanilla],
        filter: PkmFilter {
            nature: Some(Nature::Jolly),
            min_ivs: Ivs::new(29, 22, 12, 6, 28, 10),
            max_ivs: Ivs::new(29, 22, 12, 6, 28, 10),
            ..Default::default()
        },
        gen3_filter: Gen3PkmFilter {
            species: Some(Species::Seedot),
            ..Default::default()
        },
        ..Default::default()
    };

    options.map_setups[0]
        .map_data
        .mass_outbreaks
        .push(Wild3SpecialEncounterGameData {
            id: Wild3MassOutbreakState::Route102Seedot,
            encounter_data: Wild3EncounterGameData {
                species_data: SpeciesData {
                    species: Species::Seedot,
                    ..Default::default()
                },
                ..Default::default()
            },
        });

    options.map_setups[0]
        .mass_outbreak_states
        .push(Wild3MassOutbreakState::Route102Seedot);

    let expected_results = [Wild3SearcherResultMon {
        encounter_idx: Wild3EncounterIndex::MassOutbreak(Wild3MassOutbreakState::Route102Seedot),
        pid: 2438806163,
        advance: 2001,
        shiny: false,
        nature: Nature::Jolly,
        ability: AbilityType::Second,
        ivs: Ivs::new(29, 22, 12, 6, 28, 10),
        gender: Gender::Male,
        method: Gen3Method::Wild3,
        lead: Gen3Lead::Vanilla,
        hidden_power: HiddenPower::new(PokemonType::Fighting, 46),
        species: Species::Seedot,
        mass_outbreak_state: Wild3MassOutbreakState::Route102Seedot,
        ..Default::default()
    }];
    let result = search_wild3_reverse(&options)
        .into_iter()
        .flatten()
        .collect_vec();
    assert_eq!(result, expected_results);
}

#[test]
fn test_search_reverse_wild3_feebas() {
    let mut options = Wild3SearcherOptions {
        methods: vec![Gen3Method::Wild2],
        max_result_count: 1,
        leads: vec![Gen3Lead::Vanilla],
        filter: PkmFilter {
            min_ivs: Ivs::new(6, 27, 31, 31, 31, 31),
            max_ivs: Ivs::new(6, 27, 31, 31, 31, 31),
            ..Default::default()
        },
        gen3_filter: Gen3PkmFilter {
            species: Some(Species::Feebas),
            ..Default::default()
        },
        ..Default::default()
    };

    options.map_setups[0].actions = vec![Wild3Action::SuperRod];
    options.map_setups[0].feebas_states = vec![Wild3FeebasState::OnFeebasTile];
    options.map_setups[0].map_data.feebas = Some(Wild3EncounterGameData {
        species_data: SpeciesData {
            species: Species::Feebas,
            ..Default::default()
        },
        ..Default::default()
    });

    let expected_results = [Wild3SearcherResultMon {
        encounter_idx: Wild3EncounterIndex::Feebas,
        pid: 1969203656,
        advance: 15522,
        shiny: false,
        nature: Nature::Docile,
        ability: AbilityType::First,
        ivs: Ivs::new(6, 27, 31, 31, 31, 31),
        gender: Gender::Male,
        method: Gen3Method::Wild2,
        lead: Gen3Lead::Vanilla,
        hidden_power: HiddenPower::new(PokemonType::Dragon, 70),
        species: Species::Feebas,
        feebas_state: Wild3FeebasState::OnFeebasTile,
        action: Wild3Action::SuperRod,
        ..Default::default()
    }];
    let result = search_wild3_reverse(&options)
        .into_iter()
        .flatten()
        .collect_vec();
    assert_eq!(result, expected_results);
}

#[test]
fn test_search_reverse_pid_spd() {
    let options = Wild3SearcherOptions {
        methods: vec![
            Gen3Method::Wild1,
            Gen3Method::Wild2,
            Gen3Method::Wild3,
            Gen3Method::Wild4,
        ],
        max_result_count: 1,
        leads: vec![Gen3Lead::Vanilla],
        filter: PkmFilter {
            nature: Some(Nature::Gentle),
            ..Default::default()
        },
        gen3_filter: Gen3PkmFilter {
            pid_speed: Gen3PidSpeedFilter {
                active: true,
                min_cycle_count: *FASTEST_DIVIDENDS_MOD_24_RANGE.start(),
                max_cycle_count: *FASTEST_DIVIDENDS_MOD_24_RANGE.end(),
            },
            ..Default::default()
        },
        ..Default::default()
    };

    let expected_results = [Wild3SearcherResultMon {
        encounter_idx: Wild3EncounterIndex::Slot(EncounterSlot::Slot7),
        pid: 121,
        advance: 820775165,
        shiny: false,
        nature: Nature::Gentle,
        ability: AbilityType::Second,
        ivs: Ivs::new(23, 29, 20, 20, 31, 30),
        gender: Gender::Female,
        method: Gen3Method::Wild3,
        lead: Gen3Lead::Vanilla,
        hidden_power: HiddenPower::new(PokemonType::Fire, 56),
        ..Default::default()
    }];
    let result = search_wild3_reverse(&options)
        .into_iter()
        .flatten()
        .collect_vec();
    assert_eq!(result, expected_results);
}
