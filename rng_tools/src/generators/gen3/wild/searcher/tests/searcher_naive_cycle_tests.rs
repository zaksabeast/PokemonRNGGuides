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
                post_sweet_scent_range: CycleRange::new(46939, 120, 114940),
                specified_lead: Some(Wild3SearcherCycleData::new(500, 59017, 114940, 0.5327666666666667)),
                slowest_lead: Wild3SearcherCycleData::new(900, 11017, 114940, 1.0),
                fastest_lead: Wild3SearcherCycleData::new(18, 116857, 114940, 0.0),
                ideal_lead: Wild3SearcherCycleData::new(900, 11017, 114940, 1.0),
                common_lower_lead: Wild3SearcherCycleData::new(608, 46057, 114940, 0.9647666666666667),
                common_upper_lead: Wild3SearcherCycleData::new(868, 14857, 114940, 1.0),
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
                post_sweet_scent_range: CycleRange::new(161879, 120, 39312),
                specified_lead: Some(Wild3SearcherCycleData::new(500, 19705, 39312, 0.46723333333333333)),
                slowest_lead: Wild3SearcherCycleData::new(900, -28295, 39312, 0.0),
                fastest_lead: Wild3SearcherCycleData::new(18, 77545, 39312, 0.0),
                ideal_lead: Wild3SearcherCycleData::new(369, 35425, 39312, 0.9912333333333333),
                common_lower_lead: Wild3SearcherCycleData::new(608, 6745, 39312, 0.03523333333333333),
                common_upper_lead: Wild3SearcherCycleData::new(868, -24455, 39312, 0.0),
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
                post_sweet_scent_range: CycleRange::new(201191, 120, 10000000),
                specified_lead: Some(Wild3SearcherCycleData::new(500, -1000000, 1019705, 0.0)),
                slowest_lead: Wild3SearcherCycleData::new(900, -1000000, 971705, 0.0),
                fastest_lead: Wild3SearcherCycleData::new(18, -1000000, 1077545, 1.0),
                ideal_lead: Wild3SearcherCycleData::new(18, -1000000, 1077545, 1.0),
                common_lower_lead: Wild3SearcherCycleData::new(608, -1000000, 1006745, 0.0),
                common_upper_lead: Wild3SearcherCycleData::new(868, -1000000, 975545, 0.0),
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
