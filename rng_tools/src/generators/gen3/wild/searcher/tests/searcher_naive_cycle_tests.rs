use crate::gen3::Wild3MapGameData;
use crate::gen3::Wild3MapSetups;
use crate::gen3::Wild3MovementMode;
use crate::gen3::Wild3Weather;
use crate::{
    AbilityType, EncounterSlot, Gender, HiddenPower, Ivs, Nature, PkmFilter, PokemonType,
    ShinyType, Species, assert_list_eq,
    gen3::{
        CycleRange, Gen3Lead, Gen3Method, Wild3EncounterIndex, Wild3SearcherCycleData,
        Wild3SearcherCycleDataByLead, Wild3SearcherCycleOpts, Wild3SearcherOptions,
        Wild3SearcherResultMon, search_wild3_naive,
    },
    rng::lcrng::Pokerng,
};
#[test]
fn test_search_wild3_cycle_methods_1_2_4() {
    let options = Wild3SearcherOptions {
        map_setups: vec![Wild3MapSetups {
            map_data: Wild3MapGameData::default(),
            ..Default::default()
        }],
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
            weather: Wild3Weather::Sunny,
            movement: Wild3MovementMode::OnFoot,
            lead_cycle_speed: 500,
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
                post_sweet_scent_range: CycleRange::new(75276, 80, 115175),
                specified_lead: Some(Wild3SearcherCycleData::new(
                    500,
                    50445,
                    115175,
                    0.48887499999999995,
                )),
                slowest_lead: Wild3SearcherCycleData::new(900, 18445, 115175, 1.0),
                fastest_lead: Wild3SearcherCycleData::new(18, 89005, 115175, 0.0),
                ideal_lead: Wild3SearcherCycleData::new(900, 18445, 115175, 1.0),
                common_lower_lead: Wild3SearcherCycleData::new(
                    608,
                    41805,
                    115175,
                    0.7048749999999999,
                ),
                common_upper_lead: Wild3SearcherCycleData::new(868, 21005, 115175, 1.0),
            }),
            ability: AbilityType::Second,
            gender: Gender::Male,
            nature: Nature::Naive,
            shiny: ShinyType::NotShiny,
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
                post_sweet_scent_range: CycleRange::new(190451, 80, 39309),
                specified_lead: Some(Wild3SearcherCycleData::new(500, 11136, 39309, 0.511125)),
                slowest_lead: Wild3SearcherCycleData::new(900, -20864, 39309, 0.0),
                fastest_lead: Wild3SearcherCycleData::new(18, 49696, 39309, 0.5076),
                ideal_lead: Wild3SearcherCycleData::new(259, 30416, 39309, 0.9827250000000001),
                common_lower_lead: Wild3SearcherCycleData::new(608, 2496, 39309, 0.295125),
                common_upper_lead: Wild3SearcherCycleData::new(868, -18304, 39309, 0.0),
            }),
            ability: AbilityType::Second,
            gender: Gender::Male,
            nature: Nature::Naive,
            shiny: ShinyType::NotShiny,
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
                post_sweet_scent_range: CycleRange::new(229760, 80, 10000000),
                specified_lead: Some(Wild3SearcherCycleData::new(500, -1000000, 1011136, 0.0)),
                slowest_lead: Wild3SearcherCycleData::new(900, -1000000, 979136, 0.0),
                fastest_lead: Wild3SearcherCycleData::new(18, -1000000, 1049696, 0.4924),
                ideal_lead: Wild3SearcherCycleData::new(18, -1000000, 1049696, 0.4924),
                common_lower_lead: Wild3SearcherCycleData::new(608, -1000000, 1002496, 0.0),
                common_upper_lead: Wild3SearcherCycleData::new(868, -1000000, 981696, 0.0),
            }),
            ability: AbilityType::Second,
            gender: Gender::Male,
            nature: Nature::Naive,
            shiny: ShinyType::NotShiny,
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
