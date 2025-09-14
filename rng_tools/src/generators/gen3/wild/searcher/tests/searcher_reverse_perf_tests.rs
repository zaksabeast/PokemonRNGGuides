use super::*;
use crate::{EncounterSlot, PokemonType};

mod utils;
use utils::{pid_paths_to_string, strs_to_string};

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
