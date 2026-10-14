use crate::{
    AbilityType, EncounterSlot, Gender, HiddenPower, Ivs, Nature, PkmFilter, PokemonType, Species,
    assert_list_eq,
    gen3::{
        CycleRange, Gen3Lead, Gen3Method, Wild3EncounterIndex, Wild3SearcherCycleData,
        Wild3SearcherCycleDataByLead, Wild3SearcherCycleOpts, Wild3SearcherOptions, Wild3SearcherResultMon,
        search_wild3_naive,
    },
    rng::lcrng::Pokerng,
};
#[test]
fn test_search_wild3_cycle_methods_1_2_4() {
    let options = Wild3SearcherOptions {
        methods: vec![
            Gen3Method::Wild1,
            Gen3Method::Wild2,
            Gen3Method::Wild3,
            Gen3Method::Wild4,
            Gen3Method::Wild5,
        ],
        initial_advances: 65,
        max_result_count: 10,
        cycle_opts: Wild3SearcherCycleOpts::Calibrate {
            lead_cycle_speed: Some(500),
        },
        leads: vec![Gen3Lead::Vanilla],
        filter: PkmFilter {
            nature: PkmFilter::new_nature_filter(&[Nature::Naive]),
            gender: Some(Gender::Male),
            ..Default::default()
        },
        ..Default::default()
    };
    let expected_results = [
        Wild3SearcherResultMon {
            pid: 2695989139,
            ivs: Ivs::new(25, 22, 31, 3, 13, 6),
            method: Gen3Method::Wild2,
            encounter_idx: Wild3EncounterIndex::Slot(EncounterSlot::Slot1),
            cycle_data_by_lead: Some(Wild3SearcherCycleDataByLead {
                post_sweet_scent_range: CycleRange::new(76716, 80, 115175),
                specified_lead: Some(Wild3SearcherCycleData::new(500, 49005, 115175, 0.8665)),
                slowest_lead: Wild3SearcherCycleData::new(900, 17005, 115175, 1.0),
                fastest_lead: Wild3SearcherCycleData::new(18, 87565, 115175, 0.0),
                ideal_lead: Wild3SearcherCycleData::new(900, 17005, 115175, 1.0),
                common_lower_lead: Wild3SearcherCycleData::new(608, 40365, 115175, 1.0),
                common_upper_lead: Wild3SearcherCycleData::new(868, 19565, 115175, 1.0),
            }),
            ability: AbilityType::Second,
            gender: Gender::Male,
            nature: Nature::Naive,
            shiny: false,
            advance: 65,
            seed: Pokerng::with_jump(options.initial_seed, 65).seed(),
            lead: Gen3Lead::Vanilla,
            map_idx: 0,
            hidden_power: HiddenPower::new(PokemonType::Psychic, 49),
            species: Species::Shuckle,
            ..Default::default()
        },
        Wild3SearcherResultMon {
            pid: 2695989139,
            ivs: Ivs::new(25, 8, 4, 3, 13, 6),
            method: Gen3Method::Wild4,
            encounter_idx: Wild3EncounterIndex::Slot(EncounterSlot::Slot1),
            cycle_data_by_lead: Some(Wild3SearcherCycleDataByLead {
                post_sweet_scent_range: CycleRange::new(191891, 80, 39309),
                specified_lead: Some(Wild3SearcherCycleData::new(500, 9696, 39309, 0.1335)),
                slowest_lead: Wild3SearcherCycleData::new(900, -22304, 39309, 0.0),
                fastest_lead: Wild3SearcherCycleData::new(18, 48256, 39309, 0.8914666666666666),
                ideal_lead: Wild3SearcherCycleData::new(179, 35376, 39309, 0.9895),
                common_lower_lead: Wild3SearcherCycleData::new(608, 1056, 39309, 0.0),
                common_upper_lead: Wild3SearcherCycleData::new(868, -19744, 39309, 0.0),
            }),
            ability: AbilityType::Second,
            gender: Gender::Male,
            nature: Nature::Naive,
            shiny: false,
            advance: 65,
            seed: Pokerng::with_jump(options.initial_seed, 65).seed(),
            lead: Gen3Lead::Vanilla,
            map_idx: 0,
            hidden_power: HiddenPower::new(PokemonType::Electric, 45),
            species: Species::Shuckle,
            ..Default::default()
        },
        Wild3SearcherResultMon {
            pid: 2695989139,
            ivs: Ivs::new(25, 8, 4, 22, 31, 25),
            method: Gen3Method::Wild1,
            encounter_idx: Wild3EncounterIndex::Slot(EncounterSlot::Slot1),
            cycle_data_by_lead: Some(Wild3SearcherCycleDataByLead {
                post_sweet_scent_range: CycleRange::new(231200, 80, 10000000),
                specified_lead: Some(Wild3SearcherCycleData::new(500, -1000000, 1009696, 0.0)),
                slowest_lead: Wild3SearcherCycleData::new(900, -1000000, 977696, 0.0),
                fastest_lead: Wild3SearcherCycleData::new(18, -1000000, 1048256, 0.10853333333333333),
                ideal_lead: Wild3SearcherCycleData::new(18, -1000000, 1048256, 0.10853333333333333),
                common_lower_lead: Wild3SearcherCycleData::new(608, -1000000, 1001056, 0.0),
                common_upper_lead: Wild3SearcherCycleData::new(868, -1000000, 980256, 0.0),
            }),
            ability: AbilityType::Second,
            gender: Gender::Male,
            nature: Nature::Naive,
            shiny: false,
            advance: 65,
            seed: Pokerng::with_jump(options.initial_seed, 65).seed(),
            lead: Gen3Lead::Vanilla,
            map_idx: 0,
            hidden_power: HiddenPower::new(PokemonType::Water, 60),
            species: Species::Shuckle,
            ..Default::default()
        },
    ];
    let result = search_wild3_naive(&options);
    assert_list_eq!(result, expected_results);
}
