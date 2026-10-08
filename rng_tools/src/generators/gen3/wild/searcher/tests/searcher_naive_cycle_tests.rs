use crate::{
    AbilityType, EncounterSlot, Gender, HiddenPower, Ivs, Nature, PkmFilter, PokemonType, Species,
    assert_list_eq,
    gen3::{
        CycleRange, Gen3Lead, Gen3Method, Wild3EncounterIndex, Wild3SearcherCycleData,
        Wild3SearcherCycleDataByLead, Wild3SearcherOptions, Wild3SearcherResultMon,
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
        cycle_opts: crate::gen3::Wild3SearcherCycleOpts::Calibrate {
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
                post_sweet_scent_range: CycleRange::new(76716, 80, 115100),
                specified_lead: Some(Wild3SearcherCycleData::new(500, 49080, 115100, 0.864)),
                slowest_lead: Wild3SearcherCycleData::new(900, 17080, 115100, 1.0),
                fastest_lead: Wild3SearcherCycleData::new(18, 87640, 115100, 0.0),
                ideal_lead: Wild3SearcherCycleData::new(900, 17080, 115100, 1.0),
                common_lower_lead: Wild3SearcherCycleData::new(608, 40440, 115100, 1.0),
                common_upper_lead: Wild3SearcherCycleData::new(868, 19640, 115100, 1.0),
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
                post_sweet_scent_range: CycleRange::new(191816, 80, 39376),
                specified_lead: Some(Wild3SearcherCycleData::new(500, 9704, 39376, 0.136)),
                slowest_lead: Wild3SearcherCycleData::new(900, -22296, 39376, 0.0),
                fastest_lead: Wild3SearcherCycleData::new(18, 48264, 39376, 0.8912),
                ideal_lead: Wild3SearcherCycleData::new(179, 35384, 39376, 0.992),
                common_lower_lead: Wild3SearcherCycleData::new(608, 1064, 39376, 0.0),
                common_upper_lead: Wild3SearcherCycleData::new(868, -19736, 39376, 0.0),
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
                post_sweet_scent_range: CycleRange::new(231192, 80, 10000000),
                specified_lead: Some(Wild3SearcherCycleData::new(500, -1000000, 1009704, 0.0)),
                slowest_lead: Wild3SearcherCycleData::new(900, -1000000, 977704, 0.0),
                fastest_lead: Wild3SearcherCycleData::new(18, -1000000, 1048264, 0.1088),
                ideal_lead: Wild3SearcherCycleData::new(18, -1000000, 1048264, 0.1088),
                common_lower_lead: Wild3SearcherCycleData::new(608, -1000000, 1001064, 0.0),
                common_upper_lead: Wild3SearcherCycleData::new(868, -1000000, 980264, 0.0),
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
