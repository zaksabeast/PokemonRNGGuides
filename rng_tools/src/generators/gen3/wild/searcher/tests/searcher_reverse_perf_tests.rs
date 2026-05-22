use super::*;
use crate::{EncounterSlot, PokemonType};

mod utils;
use utils::{pid_paths_to_string, strs_to_string};

// cargo test test_search_perf_find_pid_paths_by_step --release

#[test]
fn test_search_perf_find_pid_paths_by_step() {
    if cfg!(debug_assertions) {
        return;
    }

    let opts = FindPidPathsOptions {
        filter: PkmFilter {
            shiny: true,
            min_ivs: Ivs::new(0, 0, 0, 0, 0, 0),
            max_ivs: Ivs::new(0, 15, 15, 15, 0, 0),
            ..Default::default()
        },
        max_advances: u32::MAX as usize,
        ..Default::default()
    };

    let expected_results = strs_to_string(&[
        "Seed: 6B61F77C, Adv: 193925916, Method: Wild1, PID: 78057806, Ivs: 0/0/2/15/0/0",
        "Seed: F30F418C, Adv: 197533996, Method: Wild3, PID: 61B961BF, Ivs: 0/4/6/3/0/0",
        "Seed: D2C61885, Adv: 438131507, Method: Wild2, PID: D5A8D5AF, Ivs: 0/1/12/8/0/0",
        "Seed: 4D1A4FB0, Adv: 1182006448, Method: Wild4, PID: 2A992A9B, Ivs: 0/12/4/13/0/0",
        "Seed: ABA548F6, Adv: 1307276110, Method: Wild1, PID: 55D955DF, Ivs: 0/0/12/5/0/0",
        "Seed: 76261800, Adv: 1395759104, Method: Wild1, PID: 798E7988, Ivs: 0/8/3/1/0/0",
        "Seed: EB61F77C, Adv: 2341409564, Method: Wild1, PID: F805F806, Ivs: 0/0/2/15/0/0",
        "Seed: 730F418C, Adv: 2345017644, Method: Wild3, PID: E1B9E1BF, Ivs: 0/4/6/3/0/0",
        "Seed: 52C61885, Adv: 2585615155, Method: Wild2, PID: 55A855AF, Ivs: 0/1/12/8/0/0",
        "Seed: CD1A4FB0, Adv: 3329490096, Method: Wild4, PID: AA99AA9B, Ivs: 0/12/4/13/0/0",
        "Seed: 2BA548F6, Adv: 3454759758, Method: Wild1, PID: D5D9D5DF, Ivs: 0/0/12/5/0/0",
        "Seed: F6261800, Adv: 3543242752, Method: Wild1, PID: F98EF988, Ivs: 0/8/3/1/0/0",
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
fn test_search_reverse_perf_vanilla() {
    if cfg!(debug_assertions) {
        return;
    }

    let mut options = Wild3SearcherOptions {
        methods: vec![Gen3Method::Wild1, Gen3Method::Wild2, Gen3Method::Wild4],
        max_result_count: 1,
        max_advances: 1,
        leads: vec![Gen3Lead::Vanilla],
        filter: PkmFilter {
            shiny: true,
            min_ivs: Ivs::new(0, 0, 0, 0, 0, 0),
            max_ivs: Ivs::new(0, 15, 15, 15, 0, 0),
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

    let expected_results = [
        Wild3SearcherResultMon {
            encounter_idx: Wild3EncounterIndex::Slot(EncounterSlot::Slot0),
            pid: 2013624326,
            advance: 193925907,
            seed: Pokerng::with_jump(options.initial_seed, 193925907).seed(),
            shiny: true,
            nature: Nature::Lonely,
            ability: AbilityType::First,
            ivs: Ivs::new(0, 0, 2, 15, 0, 0),
            gender: Gender::Female,
            method: Gen3Method::Wild1,
            lead: Gen3Lead::Vanilla,
            hidden_power: HiddenPower::new(PokemonType::Ground, 42),
            species: Species::Shuckle,
            ..Default::default()
        },
        Wild3SearcherResultMon {
            encounter_idx: Wild3EncounterIndex::Slot(EncounterSlot::Slot0),
            pid: 2013624326,
            advance: 193925889,
            seed: Pokerng::with_jump(options.initial_seed, 193925889).seed(),
            shiny: true,
            nature: Nature::Lonely,
            ability: AbilityType::First,
            ivs: Ivs::new(0, 0, 2, 15, 0, 0),
            gender: Gender::Female,
            method: Gen3Method::Wild1,
            lead: Gen3Lead::Vanilla,
            hidden_power: HiddenPower::new(PokemonType::Ground, 42),
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
fn test_search_perf_find_pid_paths_reverse_iv() {
    if cfg!(debug_assertions) {
        return;
    }

    let opts = FindPidPathsOptions {
        filter: PkmFilter {
            shiny: true,
            min_ivs: Ivs::new(0, 0, 0, 0, 0, 0),
            max_ivs: Ivs::new(20, 20, 20, 20, 20, 20), // ~85M
            ..Default::default()
        },
        methods: vec![Gen3Method::Wild1],
        tsv: 1234,
        ..Default::default()
    };

    assert!(find_pid_paths_reverse_iv::<METHOD_1>(&opts).count() > 0);
}

#[test]
fn test_search_perf_find_pid_paths_reverse_pid_shiny() {
    if cfg!(debug_assertions) {
        return;
    }

    let opts = FindPidPathsOptions {
        filter: PkmFilter {
            shiny: true,
            min_ivs: Ivs::new(0, 0, 0, 0, 0, 0),
            max_ivs: Ivs::new(15, 15, 15, 15, 15, 15), // ~16M
            ..Default::default()
        },
        methods: vec![Gen3Method::Wild1],
        tsv: 1234,
        ..Default::default()
    };

    assert!(find_pid_paths_reverse_iv::<METHOD_1>(&opts).count() > 0);
}

#[test]
fn test_search_perf_find_pid_paths_shiny_feebas() {
    if cfg!(debug_assertions) {
        return;
    }
    let mut options = Wild3SearcherOptions {
        initial_seed: 0,
        tid: 44772,
        sid: 31562,
        initial_advances: 1000,
        max_advances: 10_000_000,
        max_result_count: 2000,
        filter: PkmFilter {
            shiny: true,
            nature: Some(Nature::Bold),
            gender: Some(Gender::Female),
            min_ivs: Ivs::new(25, 0, 25, 25, 25, 25),
            max_ivs: Ivs::new(31, 31, 31, 31, 31, 31),
            ..Default::default()
        },
        gen3_filter: Gen3PkmFilter {
            species: Some(Species::Feebas),
            ..Default::default()
        },
        leads: vec![
            Gen3Lead::Vanilla,
            Gen3Lead::Egg,
            Gen3Lead::MagnetPull,
            Gen3Lead::Static,
            Gen3Lead::HustleVitalSpiritPressure,
            Gen3Lead::CuteCharm(Gender::Male),
            Gen3Lead::CuteCharm(Gender::Female),
            Gen3Lead::Synchronize(Nature::Hardy),
            Gen3Lead::Synchronize(Nature::Lonely),
            Gen3Lead::Synchronize(Nature::Brave),
            Gen3Lead::Synchronize(Nature::Adamant),
            Gen3Lead::Synchronize(Nature::Naughty),
            Gen3Lead::Synchronize(Nature::Bold),
            Gen3Lead::Synchronize(Nature::Docile),
            Gen3Lead::Synchronize(Nature::Relaxed),
            Gen3Lead::Synchronize(Nature::Impish),
            Gen3Lead::Synchronize(Nature::Lax),
            Gen3Lead::Synchronize(Nature::Timid),
            Gen3Lead::Synchronize(Nature::Hasty),
            Gen3Lead::Synchronize(Nature::Serious),
            Gen3Lead::Synchronize(Nature::Jolly),
            Gen3Lead::Synchronize(Nature::Naive),
            Gen3Lead::Synchronize(Nature::Modest),
            Gen3Lead::Synchronize(Nature::Mild),
            Gen3Lead::Synchronize(Nature::Quiet),
            Gen3Lead::Synchronize(Nature::Bashful),
            Gen3Lead::Synchronize(Nature::Rash),
            Gen3Lead::Synchronize(Nature::Calm),
            Gen3Lead::Synchronize(Nature::Gentle),
            Gen3Lead::Synchronize(Nature::Sassy),
            Gen3Lead::Synchronize(Nature::Careful),
            Gen3Lead::Synchronize(Nature::Quirky),
        ],
        methods: vec![Gen3Method::Wild1, Gen3Method::Wild2, Gen3Method::Wild4],
        consider_cycles: true,
        using_white_flute: true,
        considered_safari_pokeblocks: Wild3SafariPokeblockSearchOpt::SoloOnly,
        ..Default::default()
    };

    options.map_setups[0].map_data.feebas = Some(Wild3EncounterGameData {
        min_level: 20,
        max_level: 25,
        species_data: SpeciesData {
            species: Species::Feebas,
        },
    });
    options.map_setups[0].actions = vec![
        Wild3Action::OldRod,
        Wild3Action::GoodRod,
        Wild3Action::SuperRod,
    ];
    options.map_setups[0].feebas_states = vec![Wild3FeebasState::OnFeebasTile];

    let results = search_wild3_reverse(&options)
        .into_iter()
        .flatten()
        .collect_vec();
    assert!(!results.is_empty());

    let first_result = &results[0];
    assert_eq!(
        (first_result.pid, first_result.ivs),
        (2499166555, Ivs::new(31, 22, 25, 28, 26, 26))
    );
}
