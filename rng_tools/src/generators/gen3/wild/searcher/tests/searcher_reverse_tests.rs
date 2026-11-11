use super::*;
use crate::{
    EncounterSlot, HiddenPowerFilter, PokemonType, ShinyFilter, ShinyType,
    gen3::{
        FASTEST_DIVIDENDS_MOD_24_RANGE, Gen3PidSpeedFilter, Wild3PlayingSong,
        Wild3SearcherCycleOpts, Wild3SpecialEncounterGameData, Wild3Weather,
        calculate_pid_speed, search_wild3_naive,
    },
};

mod utils;
use utils::{pid_paths_to_string, strs_to_string};

#[test]
fn prepared_feebas_counts_match_naive_search_and_replay() {
    let action = Wild3Action::GoodRod;
    let distributions = vec![
        crate::gen3::wild::feebas_timing::prepared_distribution(action, 0, 219710, 279896, 279896, 0.5),
        crate::gen3::wild::feebas_timing::prepared_distribution(action, 1, 219710, 56000, 56000, 0.5),
    ];
    let options = Wild3SearcherOptions {
        initial_seed: 42,
        max_advances: 16,
        filter: PkmFilter { min_ivs: Ivs::new(16, 31, 0, 19, 28, 18), max_ivs: Ivs::new(16, 31, 0, 19, 28, 18), ..Default::default() },
        max_result_count: 1000,
        leads: vec![Gen3Lead::Egg],
        methods: vec![Gen3Method::Wild1],
        gen3_filter: Gen3PkmFilter { species: Some(Species::Feebas), ..Default::default() },
        map_setups: vec![Wild3MapSetups {
            actions: vec![action],
            feebas_states: vec![Wild3FeebasState::OnFeebasTile],
            map_data: Wild3MapGameData {
                initial_cycle_distrs: distributions,
                feebas: Some(Wild3EncounterGameData {
                    min_level: 20,
                    max_level: 30,
                    species_data: SpeciesData { species: Species::Feebas },
                }),
                ..Default::default()
            },
            ..Default::default()
        }],
        ..Default::default()
    };
    let mut naive = search_wild3_naive(&options);
    let mut reverse = search_wild3_reverse(&options);
    let key = |result: &Wild3SearcherResultMon| (result.advance, result.checkfeebas_vblank_count, result.pid);
    naive.sort_by_key(key);
    reverse.sort_by_key(key);

    assert_eq!(reverse, naive);
    assert_eq!(naive.iter().filter_map(|result| result.checkfeebas_vblank_count).sorted().dedup().collect_vec(), vec![0, 1]);

    for result in naive {
        let map = &options.map_setups[0].map_data;
        let distribution = map.initial_cycle_distrs.iter().find(|distribution| distribution.checkfeebas_vblank_count == result.checkfeebas_vblank_count).expect("prepared distribution");
        let replay = generate_wild3(Pokerng::new(result.seed), &Wild3GeneratorOptions {
            action,
            lead: result.lead,
            methods: vec![result.method],
            feebas_state: result.feebas_state,
            feebas_cycles: result.feebas_cycles,
            feebas_vblank_count: result.checkfeebas_vblank_count,
            feebas_initial_distribution: Some(distribution.clone()),
            ..Default::default()
        }, map);

        assert_eq!(replay.mon_results, vec![Wild3GeneratorMonResult {
            encounter_idx: Wild3EncounterIndex::Feebas,
            pid: result.pid,
            ivs: result.ivs,
            lvl: result.lvl,
            method: Gen3Method::Wild1,
            cycle_range: None,
            used_safari_pokeblock: None,
        }]);
        assert_eq!(result.feebas_tile, Some(crate::gen3::Wild3FeebasTile { x: 1, y: 2, cycle_counter: 219710 }));
    }
}

#[test]
fn test_search_find_pid_paths_by_step_filter() {
    let opts = FindPidPathsOptions {
        filter: PkmFilter {
            shiny: ShinyFilter::AnyShiny,
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
        pid_paths_to_string(find_pid_paths_by_step_iv1::<METHODS_1234>(&opts)),
        expected_results
    );

    assert_eq!(
        pid_paths_to_string(find_pid_paths_by_step_iv2::<METHODS_1234>(&opts)),
        expected_results
    );

    assert_eq!(
        pid_paths_to_string(find_pid_paths_by_step_pid::<METHODS_1234>(&opts)),
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
        pid_paths_to_string(find_pid_paths_by_step_iv1::<METHODS_1234>(&opts)),
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
        pid_paths_to_string(find_pid_paths_by_step_iv2::<METHODS_1234>(&opts)),
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
        pid_paths_to_string(find_pid_paths_by_step_pid::<METHODS_1234>(&opts)),
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
        method_bitset: METHOD_1,
        ..Default::default()
    };

    assert_eq!(
        pid_paths_to_string(find_pid_paths_by_step_iv1::<METHOD_1>(&opts)),
        strs_to_string(&[
            "Seed: F0C62AAB, Adv: 193925913, Method: Wild1, PID: 76A650A2, Ivs: 1/27/26/0/30/6",
            "Seed: 50A2A542, Adv: 193925914, Method: Wild1, PID: 6B6176A6, Ivs: 6/0/30/0/30/5",
        ])
    );

    opts.initial_advances += 1;
    assert_eq!(
        pid_paths_to_string(find_pid_paths_by_step_iv2::<METHOD_1>(&opts)),
        strs_to_string(&[
            "Seed: F0C62AAB, Adv: 193925913, Method: Wild1, PID: 76A650A2, Ivs: 1/27/26/0/30/6",
            "Seed: 50A2A542, Adv: 193925914, Method: Wild1, PID: 6B6176A6, Ivs: 6/0/30/0/30/5"
        ])
    );

    opts.initial_advances -= 3;
    assert_eq!(
        pid_paths_to_string(find_pid_paths_by_step_pid::<METHOD_1>(&opts)),
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
            nature: PkmFilter::new_nature_filter(&[Nature::Adamant]),
            gender: Some(Gender::Female),
            min_ivs: Ivs::new(12, 29, 23, 10, 14, 13),
            max_ivs: Ivs::new(12, 29, 23, 10, 14, 13),
            ability: Some(AbilityType::Second),
            ..Default::default()
        },
        gen3_filter: Gen3PkmFilter {
            species: Some(Species::Pikachu),
            ..Default::default()
        },
        ..Default::default()
    };

    options.map_setups[0].map_data.slots_by_action[Wild3Action::SweetScentLand as usize]
        [EncounterSlot::Slot0 as usize]
        .species_data
        .species = Species::Pikachu;

    // Static seed: 081A6F6E
    // Wild seed: A4893D21
    let expected_results = [Wild3SearcherResultMon {
        encounter_idx: Wild3EncounterIndex::Slot(EncounterSlot::Slot0),
        pid: 0x02FA9E49,
        advance: 3737251199,
        seed: Pokerng::with_jump(options.initial_seed, 3737251199).seed(),
        shiny: ShinyType::NotShiny,
        nature: Nature::Adamant,
        ability: AbilityType::Second,
        ivs: Ivs::new(12, 29, 23, 10, 14, 13),
        gender: Gender::Female,
        method: Gen3Method::Wild1,
        lead: Gen3Lead::Vanilla,
        hidden_power: HiddenPower::new(PokemonType::Ground, 63),
        species: Species::Pikachu,
        ..Default::default()
    }];
    assert!(does_search_wild3_reverse_support_options(&options));
    let result = search_wild3_reverse(&options);
    assert_eq!(result, expected_results);
}

#[test]
fn test_search_reverse_wild2_synchronize_success() {
    let mut options = Wild3SearcherOptions {
        methods: vec![Gen3Method::Wild2],
        max_result_count: 2,
        leads: vec![Gen3Lead::Synchronize(Nature::Quirky)],
        filter: PkmFilter {
            nature: PkmFilter::new_nature_filter(&[Nature::Quirky]),
            min_ivs: Ivs::new(6, 5, 5, 5, 5, 5),
            max_ivs: Ivs::new(8, 5, 5, 5, 5, 5),
            ..Default::default()
        },
        gen3_filter: Gen3PkmFilter {
            species: Some(Species::Pikachu),
            ..Default::default()
        },
        ..Default::default()
    };

    let slots =
        &mut options.map_setups[0].map_data.slots_by_action[Wild3Action::SweetScentLand as usize];
    slots[EncounterSlot::Slot1 as usize].species_data.species = Species::Pikachu;
    slots[EncounterSlot::Slot5 as usize].species_data.species = Species::Pikachu;
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
            seed: Pokerng::with_jump(options.initial_seed, 1160779594).seed(),
            shiny: ShinyType::NotShiny,
            nature: Nature::Quirky,
            ability: AbilityType::First,
            ivs: Ivs::new(7, 5, 5, 5, 5, 5),
            gender: Gender::Male,
            method: Gen3Method::Wild2,
            lead: Gen3Lead::Synchronize(Nature::Quirky),
            hidden_power: HiddenPower::new(PokemonType::Dark, 30),
            species: Species::Pikachu,
            ..Default::default()
        },
        Wild3SearcherResultMon {
            encounter_idx: Wild3EncounterIndex::Slot(EncounterSlot::Slot5),
            pid: 188109474,
            advance: 1160779592,
            seed: Pokerng::with_jump(options.initial_seed, 1160779592).seed(),
            shiny: ShinyType::NotShiny,
            nature: Nature::Quirky,
            ability: AbilityType::First,
            ivs: Ivs::new(7, 5, 5, 5, 5, 5),
            gender: Gender::Male,
            method: Gen3Method::Wild2,
            lead: Gen3Lead::Synchronize(Nature::Quirky),
            hidden_power: HiddenPower::new(PokemonType::Dark, 30),
            species: Species::Pikachu,
            ..Default::default()
        },
    ];
    assert!(does_search_wild3_reverse_support_options(&options));
    let result = search_wild3_reverse(&options);
    assert_eq!(result, expected_results);
}

#[test]
fn test_search_reverse_wild4_cute_charm_success() {
    let mut options = Wild3SearcherOptions {
        methods: vec![Gen3Method::Wild4],
        max_result_count: 1,
        leads: vec![Gen3Lead::CuteCharm(Gender::Male)],
        filter: PkmFilter {
            nature: PkmFilter::new_nature_filter(&[Nature::Mild]),
            min_ivs: Ivs::new(5, 5, 5, 5, 9, 5),
            max_ivs: Ivs::new(5, 5, 5, 5, 9, 5),
            ..Default::default()
        },
        gen3_filter: Gen3PkmFilter {
            species: Some(Species::Pikachu),
            ..Default::default()
        },
        ..Default::default()
    };

    let slots =
        &mut options.map_setups[0].map_data.slots_by_action[Wild3Action::SweetScentLand as usize];
    slots[EncounterSlot::Slot1 as usize].species_data.species = Species::Pikachu;
    // Note: A seed also exists for Slot0

    // Wild seeds:
    // 9B65682D	1: Zubat	12	75AE8232	No	Mild	0: Inner Focus	5	5	5	5	9	5	Dark	30	♀

    let expected_results = [Wild3SearcherResultMon {
        encounter_idx: Wild3EncounterIndex::Slot(EncounterSlot::Slot1),
        pid: 1974370866,
        advance: 1805496635,
        seed: Pokerng::with_jump(options.initial_seed, 1805496635).seed(),
        shiny: ShinyType::NotShiny,
        nature: Nature::Mild,
        ability: AbilityType::First,
        ivs: Ivs::new(5, 5, 5, 5, 9, 5),
        gender: Gender::Female,
        method: Gen3Method::Wild4,
        lead: Gen3Lead::CuteCharm(Gender::Male),
        hidden_power: HiddenPower::new(PokemonType::Dark, 30),
        species: Species::Pikachu,
        ..Default::default()
    }];
    assert!(does_search_wild3_reverse_support_options(&options));
    let result = search_wild3_reverse(&options);
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
            nature: PkmFilter::new_nature_filter(&[Nature::Jolly]),
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
        seed: Pokerng::with_jump(options.initial_seed, 2001).seed(),
        shiny: ShinyType::NotShiny,
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
    assert!(does_search_wild3_reverse_support_options(&options));
    let result = search_wild3_reverse(&options);
    assert_eq!(result, expected_results);
}

#[test]
fn test_search_reverse_wild3_feebas_no_cyles() {
    let mut options = Wild3SearcherOptions {
        max_advances: 20_000,
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

    options.map_setups[0].map_data.initial_cycle_distrs.push(
        crate::gen3::wild::feebas_timing::prepared_distribution(Wild3Action::SuperRod, 0, 0, 46186, 76186, 1.0));

    let expected_results = [Wild3SearcherResultMon {
        encounter_idx: Wild3EncounterIndex::Feebas,
        pid: 1969203656,
        advance: 15522,
        seed: Pokerng::with_jump(options.initial_seed, 15522).seed(),
        shiny: ShinyType::NotShiny,
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
        checkfeebas_vblank_count: Some(0),
        feebas_tile: Some(crate::gen3::Wild3FeebasTile { x: 1, y: 2, cycle_counter: 0 }),
        ..Default::default()
    }];
    assert!(does_search_wild3_reverse_support_options(&options));
    let result = search_wild3_reverse(&options);
    assert_eq!(result, expected_results);
}

#[test]
fn test_search_reverse_wild3_feebas_many_cyles() {
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
        max_advances: 20_000,
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

    options.map_setups[0].map_data.initial_cycle_distrs.extend([
        crate::gen3::wild::feebas_timing::prepared_distribution(Wild3Action::SuperRod, 0, 100_000, 146186, 176186, 1.0),
        crate::gen3::wild::feebas_timing::prepared_distribution(Wild3Action::SuperRod, 2, 500_000, 74400, 104400, 1.0),
    ]);

    let expected_mon = Wild3SearcherResultMon {
        encounter_idx: Wild3EncounterIndex::Feebas,
        pid: 1969203656,
        advance: 15522,
        seed: Pokerng::with_jump(options.initial_seed, 15522).seed(),
        shiny: ShinyType::NotShiny,
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
        feebas_cycles: 100_000,
        checkfeebas_vblank_count: Some(0),
        feebas_tile: Some(crate::gen3::Wild3FeebasTile { x: 1, y: 2, cycle_counter: 100_000 }),
        ..Default::default()
    };
    let expected_results = [
        expected_mon.clone(),
        Wild3SearcherResultMon {
            advance: 15520,
            seed: Pokerng::with_jump(options.initial_seed, 15520).seed(),
            feebas_cycles: 500_000,
            checkfeebas_vblank_count: Some(2),
            feebas_tile: Some(crate::gen3::Wild3FeebasTile { x: 1, y: 2, cycle_counter: 500_000 }),
            ..expected_mon
        },
    ];
    assert!(does_search_wild3_reverse_support_options(&options));
    let result = search_wild3_reverse(&options);
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
            nature: PkmFilter::new_nature_filter(&[Nature::Gentle]),
            ..Default::default()
        },
        gen3_filter: Gen3PkmFilter {
            pid_speed: Gen3PidSpeedFilter {
                active: true,
                min_cycle_count: *FASTEST_DIVIDENDS_MOD_24_RANGE.start(),
                max_cycle_count: *FASTEST_DIVIDENDS_MOD_24_RANGE.end(),
            },
            species: Some(Species::Shuckle),
            ..Default::default()
        },
        ..Default::default()
    };

    let expected_results = [Wild3SearcherResultMon {
        encounter_idx: Wild3EncounterIndex::Slot(EncounterSlot::Slot7),
        pid: 121,
        advance: 820775165,
        seed: Pokerng::with_jump(options.initial_seed, 820775165).seed(),
        shiny: ShinyType::NotShiny,
        nature: Nature::Gentle,
        ability: AbilityType::Second,
        ivs: Ivs::new(23, 29, 20, 20, 31, 30),
        gender: Gender::Female,
        method: Gen3Method::Wild3,
        lead: Gen3Lead::Vanilla,
        hidden_power: HiddenPower::new(PokemonType::Fire, 56),
        species: Species::Shuckle,
        ..Default::default()
    }];
    assert!(does_search_wild3_reverse_support_options(&options));
    let result = search_wild3_reverse(&options);
    assert_eq!(result, expected_results);
}

#[test]
fn test_search_reverse_wild3_rock_smash() {
    let mut options = Wild3SearcherOptions {
        methods: vec![Gen3Method::Wild1],
        max_result_count: 1,
        leads: vec![Gen3Lead::Vanilla],
        filter: PkmFilter {
            nature: PkmFilter::new_nature_filter(&[Nature::Calm]),
            min_ivs: Ivs::new(11, 25, 10, 25, 3, 24),
            max_ivs: Ivs::new(11, 25, 10, 25, 3, 24),
            ..Default::default()
        },
        gen3_filter: Gen3PkmFilter {
            species: Some(Species::Shuckle),
            ..Default::default()
        },
        cycle_opts: Wild3SearcherCycleOpts::Inactive,
        ..Default::default()
    };

    options.map_setups[0].actions = vec![Wild3Action::RockSmash];

    let expected_results = [Wild3SearcherResultMon {
        encounter_idx: Wild3EncounterIndex::Slot(EncounterSlot::Slot1),
        pid: 1621222420,
        advance: 0,
        seed: options.initial_seed,
        shiny: ShinyType::NotShiny,
        nature: Nature::Calm,
        ability: AbilityType::First,
        ivs: Ivs::new(11, 25, 10, 25, 3, 24),
        gender: Gender::Female,
        method: Gen3Method::Wild1,
        lead: Gen3Lead::Vanilla,
        hidden_power: HiddenPower::new(PokemonType::Psychic, 53),
        species: Species::Shuckle,
        action: Wild3Action::RockSmash,
        ..Default::default()
    }];
    assert!(does_search_wild3_reverse_support_options(&options));
    let result = search_wild3_reverse(&options);
    assert_eq!(result, expected_results);

    // test no encounter
    options.initial_advances = 2;
    assert!(does_search_wild3_reverse_support_options(&options));
    let result = search_wild3_reverse(&options);
    assert!(result.is_empty());
}

#[test]
fn test_search_reverse_wild3_rock_smash_white_flute() {
    let mut options = Wild3SearcherOptions {
        initial_advances: 2040529972 - 100, // seed = 0x20 minus 100 adv
        max_advances: 200,
        methods: vec![Gen3Method::Wild1],
        max_result_count: 1,
        leads: vec![Gen3Lead::Vanilla],
        filter: PkmFilter {
            nature: PkmFilter::new_nature_filter(&[Nature::from_pid(662075637)]),
            min_ivs: Ivs::new(7, 25, 18, 3, 21, 6),
            max_ivs: Ivs::new(7, 25, 18, 3, 21, 6),
            ..Default::default()
        },
        gen3_filter: Gen3PkmFilter {
            species: Some(Species::Shuckle),
            ..Default::default()
        },
        cycle_opts: Wild3SearcherCycleOpts::Inactive,
        using_white_flute: true,
        ..Default::default()
    };

    options.map_setups[0].actions = vec![Wild3Action::RockSmash];
    assert!(does_search_wild3_reverse_support_options(&options));
    let result = search_wild3_reverse(&options);
    assert!(!result.is_empty());

    options.using_white_flute = false;
    assert!(does_search_wild3_reverse_support_options(&options));
    let result = search_wild3_reverse(&options);
    assert!(result.is_empty());
}

fn create_safari_southeast_map_setups() -> Vec<Wild3MapSetups> {
    let encounter = |min_level, max_level, species| Wild3EncounterGameData {
        min_level,
        max_level,
        species_data: SpeciesData { species },
    };

    vec![Wild3MapSetups {
        map_data: Wild3MapGameData {
            map_id: "MAP_SAFARI_ZONE_SOUTHEAST".to_string(),
            slots_by_action: vec![
                vec![
                    encounter(33, 33, Species::Sunkern),
                    encounter(34, 34, Species::Mareep),
                    encounter(35, 35, Species::Sunkern),
                    encounter(36, 36, Species::Mareep),
                    encounter(34, 34, Species::Aipom),
                    encounter(33, 33, Species::Spinarak),
                    encounter(35, 35, Species::Hoothoot),
                    encounter(34, 34, Species::Snubbull),
                    encounter(36, 36, Species::Stantler),
                    encounter(37, 37, Species::Gligar),
                    encounter(39, 39, Species::Stantler),
                    encounter(40, 40, Species::Gligar),
                ],
                vec![],
                vec![],
                vec![],
                vec![],
                vec![],
            ],
            is_safari: true,
            rock_smash_rate: 0,
            actions_with_safari_pokeblock: vec![
                Wild3Action::SweetScentLand,
                Wild3Action::SweetScentWater,
                Wild3Action::OldRod,
                Wild3Action::GoodRod,
                Wild3Action::SuperRod,
            ],
            ..Default::default()
        },
        ..Default::default()
    }]
}

#[test]
fn test_search_reverse_wild3_safari_egg_gligar_has_result() {
    let options = Wild3SearcherOptions {
        initial_advances: 5000,
        max_advances: 2000,
        max_result_count: 1,
        filter: PkmFilter {
            nature: PkmFilter::new_nature_filter(&[Nature::from_pid(0xEEC476DC)]),
            min_ivs: Ivs::new(10, 31, 28, 26, 0, 16),
            max_ivs: Ivs::new(10, 31, 28, 26, 0, 16),
            ..Default::default()
        },
        gen3_filter: Gen3PkmFilter {
            species: Some(Species::Gligar),
            ..Default::default()
        },
        leads: vec![Gen3Lead::Egg],
        map_setups: create_safari_southeast_map_setups(),
        methods: vec![Gen3Method::Wild1],
        cycle_opts: Wild3SearcherCycleOpts::SearchNewTarget {
            consider_weather: false,
            consider_bike: false,
            consider_rng_manipulated_lead_pid: true,
            generate_even_if_impossible: true,
        },
        using_white_flute: true,
        considered_safari_pokeblocks: Wild3SafariPokeblockSearchOpt::None,
        ..Default::default()
    };

    let result_naive = search_wild3_naive(&options);
    assert!(!result_naive.is_empty());

    assert!(does_search_wild3_reverse_support_options(&options));
    let result = search_wild3_reverse(&options);
    assert!(!result.is_empty());
}

#[test]
fn test_search_reverse_wild3_safari_cute_charm_pokeblock_hoothoot_has_result() {
    let options = Wild3SearcherOptions {
        initial_seed: 6297,
        initial_advances: 190000,
        max_advances: 2000,
        max_result_count: 99999,
        filter: PkmFilter {
            nature: PkmFilter::new_nature_filter(&[Nature::Jolly]),
            gender: Some(Gender::Male),
            min_ivs: Ivs::new(30, 24, 3, 20, 14, 9),
            max_ivs: Ivs::new(30, 24, 3, 20, 14, 9),
            ability: Some(AbilityType::Second),
            ..Default::default()
        },
        gen3_filter: Gen3PkmFilter {
            lvl: Some(35),
            species: Some(Species::Hoothoot),
            ..Default::default()
        },
        leads: vec![Gen3Lead::CuteCharm(Gender::Female)],
        map_setups: create_safari_southeast_map_setups(),
        methods: vec![Gen3Method::Wild4],
        cycle_opts: Wild3SearcherCycleOpts::Calibrate {
            weather: Wild3Weather::Sunny,
            playing_song: Wild3PlayingSong::MapSong,
            lead_cycle_speed: 18,
        },
        considered_safari_pokeblocks: Wild3SafariPokeblockSearchOpt::Specific([0, 0, 1, 0, 0]),
        ..Default::default()
    };

    let result = search_wild3_naive(&options);
    assert!(!result.is_empty());

    assert!(does_search_wild3_reverse_support_options(&options));
    let result = search_wild3_reverse(&options);
    assert!(!result.is_empty());
}

#[test]
fn test_search_reverse_wild2_synchronize_multiple_natures() {
    let mut options = Wild3SearcherOptions {
        methods: vec![Gen3Method::Wild2],
        max_result_count: 20,
        leads: vec![
            Gen3Lead::Synchronize(Nature::Lonely),
            Gen3Lead::Synchronize(Nature::Quirky),
        ],
        filter: PkmFilter {
            nature: PkmFilter::new_nature_filter(&[Nature::Lonely, Nature::Quirky]),
            min_ivs: Ivs::new(6, 5, 5, 5, 5, 5),
            max_ivs: Ivs::new(8, 5, 5, 5, 5, 5),
            ..Default::default()
        },
        gen3_filter: Gen3PkmFilter {
            species: Some(Species::Pikachu),
            ..Default::default()
        },
        ..Default::default()
    };

    let slots =
        &mut options.map_setups[0].map_data.slots_by_action[Wild3Action::SweetScentLand as usize];
    slots[EncounterSlot::Slot1 as usize].species_data.species = Species::Pikachu;
    slots[EncounterSlot::Slot5 as usize].species_data.species = Species::Pikachu;

    assert!(does_search_wild3_reverse_support_options(&options));
    let result = search_wild3_reverse(&options);
    assert!(result.iter().any(|mon| mon.nature == Nature::Lonely));
    assert!(result.iter().any(|mon| mon.nature == Nature::Quirky));

    assert!(
        result.iter().all(|mon| {
            matches!(
                mon.lead,
                Gen3Lead::Synchronize(nature) if nature == mon.nature
            )
        }),
        "all results should use the synchronize lead matching their nature"
    );
}

#[test]
fn test_search_reverse_wild3_feebas_on_feebas_tile() {
    let encounter = |min_level, max_level, species| Wild3EncounterGameData {
        min_level,
        max_level,
        species_data: SpeciesData { species },
    };
    let mut options = Wild3SearcherOptions {
        initial_advances: 59783,
        max_advances: 0,
        max_result_count: 10,
        filter: PkmFilter {
            nature: PkmFilter::new_nature_filter(&[Nature::Serious]),
            gender: Some(Gender::Male),
            min_ivs: Ivs::new(1, 6, 23, 9, 7, 1),
            max_ivs: Ivs::new(1, 6, 23, 9, 7, 1),
            ..Default::default()
        },
        gen3_filter: Gen3PkmFilter {
            lvl: Some(23),
            species: Some(Species::Feebas),
            ..Default::default()
        },
        leads: vec![Gen3Lead::Vanilla],
        map_setups: vec![Wild3MapSetups {
            map_data: Wild3MapGameData {
                map_id: "MAP_ROUTE119".to_string(),
                slots_by_action: vec![
                    vec![],
                    vec![],
                    vec![
                        encounter(5, 10, Species::Magikarp),
                        encounter(5, 10, Species::Tentacool),
                    ],
                    vec![],
                    vec![],
                    vec![],
                ],
                roamers: vec![Wild3SpecialEncounterGameData {
                    id: Wild3RoamerState::ActiveInMapLatias,
                    encounter_data: encounter(40, 40, Species::Latias),
                }],
                feebas: Some(encounter(20, 25, Species::Feebas)),
                is_safari: false,
                rock_smash_rate: 0,
                actions_with_safari_pokeblock: vec![],
                ..Default::default()
            },
            actions: vec![Wild3Action::OldRod],
            feebas_states: vec![Wild3FeebasState::OnFeebasTile],
            ..Default::default()
        }],
        methods: vec![Gen3Method::Wild2],
        cycle_opts: Wild3SearcherCycleOpts::Calibrate {
            weather: Wild3Weather::Sunny,
            playing_song: Wild3PlayingSong::MapSong,
            lead_cycle_speed: calculate_pid_speed(0x7933A9CB),
        },
        using_white_flute: false,
        ..Default::default()
    };

    options.map_setups[0].map_data.initial_cycle_distrs.push(
        crate::gen3::wild::feebas_timing::prepared_distribution(Wild3Action::OldRod, 1, 350226, 160516, 210516, 1.0));

    let results: Vec<Wild3SearcherResultMon> = search_wild3_naive(&options);
    assert!(!results.is_empty());

    assert!(does_search_wild3_reverse_support_options(&options));
    let results = search_wild3_reverse(&options);
    assert!(!results.is_empty());
}

#[test]
fn test_search_reverse_wild3_hidden_power_grass_70() {
    let options = Wild3SearcherOptions {
        methods: vec![Gen3Method::Wild4],
        leads: vec![Gen3Lead::Vanilla],
        max_result_count: 20,
        max_advances: 100_000,
        gen3_filter: Gen3PkmFilter {
            species: Some(Species::Shuckle),
            ..Default::default()
        },
        filter: PkmFilter {
            min_ivs: Ivs::new(30, 30, 30, 30, 30, 30),
            hidden_power: HiddenPowerFilter {
                active: true,
                pokemon_types: vec![PokemonType::Grass],
                min_bp: 70,
                max_bp: 70,
            },
            ..Default::default()
        },
        ..Default::default()
    };

    assert!(does_search_wild3_reverse_support_options(&options));
    assert_eq!(
        determine_best_pid_path_strategy(&new_find_pid_paths_options(&options)),
        PidPathStrategy::ReverseIv
    );
    let results = search_wild3(&options);
    assert!(!results.is_empty());
    for result in results.iter().flat_map(|group| &group.vec) {
        assert_eq!(
            result.hidden_power,
            HiddenPower::new(PokemonType::Grass, 70)
        );
        assert_eq!(HiddenPower::from_ivs(&result.ivs), result.hidden_power);
    }
}
