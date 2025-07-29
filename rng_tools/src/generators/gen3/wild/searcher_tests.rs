#[cfg(test)]
mod test {
    use crate::{HiddenPower, HiddenPowerFilter, PokemonType, assert_list_eq};

    use crate::gen3::{
        Gen3EncounterInfo, Gen3EncounterType, Gen3Lead, Gen3Method, Gen3PkmFilter,
        Wild3SearcherOptions, Wild3SearcherResultMon, search_wild3, Wild3EncounterTable
    };
    use crate::{AbilityType, EncounterSlot, Gender, Ivs, Nature, PkmFilter};

    fn default_encounter_info_by_map() -> Vec<Gen3EncounterInfo> {
        vec![Gen3EncounterInfo {
            encounter_table:Wild3EncounterTable::default(),
            slots: None,
        }]
    }

    #[test]
    fn test_search_wild3_no_filter() {
        let options = Wild3SearcherOptions {
            leads: vec![Gen3Lead::Vanilla],
            encounter_info_by_map: default_encounter_info_by_map(),
            methods: vec![Gen3Method::Wild1],
            max_advances: 2,
            max_result_count: 10_000,
            ..Default::default()
        };

        let expected_results = [
            Wild3SearcherResultMon {
                advance: 0,
                map_idx: 0,
                encounter_slot: EncounterSlot::Slot0,
                cycle_data_by_lead: None,
                pid: 0xFC3367DB,
                shiny: false,
                nature: Nature::Bold,
                ability: AbilityType::Second,
                ivs: Ivs::new(12, 25, 27, 2, 31, 30),
                gender: Gender::Male,
                method: Gen3Method::Wild1,
                lead: Gen3Lead::Vanilla,
                hidden_power: HiddenPower::new(PokemonType::Water, 68),
            },
            Wild3SearcherResultMon {
                advance: 1,
                map_idx: 0,
                encounter_slot: EncounterSlot::Slot5,
                cycle_data_by_lead: None,
                pid: 0x60A1E414,
                shiny: false,
                nature: Nature::Calm,
                ability: AbilityType::First,
                ivs: Ivs::new(11, 25, 10, 25, 3, 24),
                gender: Gender::Female,
                method: Gen3Method::Wild1,
                lead: Gen3Lead::Vanilla,
                hidden_power: HiddenPower::new(PokemonType::Psychic, 53),
            },
            Wild3SearcherResultMon {
                advance: 2,
                map_idx: 0,
                encounter_slot: EncounterSlot::Slot0,
                cycle_data_by_lead: None,
                pid: 0x639E3D69,
                shiny: false,
                nature: Nature::Bashful,
                ability: AbilityType::Second,
                ivs: Ivs::new(9, 9, 7, 20, 26, 13),
                gender: Gender::Female,
                method: Gen3Method::Wild1,
                lead: Gen3Lead::Vanilla,
                hidden_power: HiddenPower::new(PokemonType::Ground, 52),
            },
        ];
        let result = search_wild3(&options);
        assert_list_eq!(result, expected_results);
    }

    #[test]
    fn test_search_wild3_with_filter() {
        let options = Wild3SearcherOptions {
            initial_seed: 0x346A4A45,
            encounter_info_by_map: vec![Gen3EncounterInfo {
                encounter_table: Wild3EncounterTable::default(),
                slots: Some(vec![
                    EncounterSlot::Slot0,
                    EncounterSlot::Slot6,
                    EncounterSlot::Slot8,
                ]),
            }],
            methods: vec![Gen3Method::Wild1],
            initial_advances: 60,
            max_advances: 3540,
            max_result_count: 10_000,
            leads: vec![Gen3Lead::Vanilla],
            filter: PkmFilter {
                nature: Some(Nature::Adamant),
                gender: Some(Gender::Female),
                min_ivs: Ivs::new(10, 10, 10, 10, 10, 10),
                ability: Some(AbilityType::Second),
                ..Default::default()
            },
            ..Default::default()
        };
        let expected_results = [
            Wild3SearcherResultMon {
                advance: 908,
                map_idx: 0,
                encounter_slot: EncounterSlot::Slot0,
                cycle_data_by_lead: None,
                pid: 0x02FA9E49,
                shiny: false,
                nature: Nature::Adamant,
                ability: AbilityType::Second,
                ivs: Ivs::new(12, 29, 23, 10, 14, 13),
                gender: Gender::Female,
                method: Gen3Method::Wild1,
                lead: Gen3Lead::Vanilla,
                hidden_power: HiddenPower::new(PokemonType::Ground, 63),
            },
            Wild3SearcherResultMon {
                advance: 3543,
                map_idx: 0,
                encounter_slot: EncounterSlot::Slot0,
                cycle_data_by_lead: None,
                pid: 0xA44D455D,
                shiny: false,
                nature: Nature::Adamant,
                ability: AbilityType::Second,
                ivs: Ivs::new(31, 13, 30, 26, 21, 24),
                gender: Gender::Female,
                method: Gen3Method::Wild1,
                lead: Gen3Lead::Vanilla,
                hidden_power: HiddenPower::new(PokemonType::Fire, 43),
            },
            Wild3SearcherResultMon {
                advance: 3577,
                map_idx: 0,
                encounter_slot: EncounterSlot::Slot6,
                cycle_data_by_lead: None,
                pid: 0xA44D455D,
                shiny: false,
                nature: Nature::Adamant,
                ability: AbilityType::Second,
                ivs: Ivs::new(31, 13, 30, 26, 21, 24),
                gender: Gender::Female,
                method: Gen3Method::Wild1,
                lead: Gen3Lead::Vanilla,
                hidden_power: HiddenPower::new(PokemonType::Fire, 43),
            },
        ];
        let result = search_wild3(&options);
        assert_list_eq!(result, expected_results);
    }

    #[test]
    fn test_search_wild3_shiny() {
        let options = Wild3SearcherOptions {
            initial_seed: 0x14a22065,
            tid: 34760,
            sid: 47362,
            encounter_info_by_map: default_encounter_info_by_map(),
            methods: vec![Gen3Method::Wild1],
            max_advances: 10,
            max_result_count: 10_000,
            leads: vec![Gen3Lead::Vanilla],
            filter: PkmFilter {
                shiny: true,
                nature: Some(Nature::Naive),
                gender: Some(Gender::Male),
                ability: Some(AbilityType::Second),
                ..Default::default()
            },
            ..Default::default()
        };
        let expected_results = [Wild3SearcherResultMon {
            advance: 0,
            map_idx: 0,
            encounter_slot: EncounterSlot::Slot4,
            cycle_data_by_lead: None,
            pid: 0x692A57E1,
            shiny: true,
            nature: Nature::Naive,
            ability: AbilityType::Second,
            ivs: Ivs::new(0, 0, 0, 8, 13, 25),
            gender: Gender::Male,
            method: Gen3Method::Wild1,
            lead: Gen3Lead::Vanilla,
            hidden_power: HiddenPower::new(PokemonType::Water, 30),
        }];
        let result = search_wild3(&options);
        assert_list_eq!(result, expected_results);
    }

    #[test]
    fn test_search_wild3_synchronize() {
        let options = Wild3SearcherOptions {
            initial_seed: 0x14a22065,
            encounter_info_by_map: default_encounter_info_by_map(),
            methods: vec![Gen3Method::Wild1],
            max_advances: 2,
            max_result_count: 10_000,
            leads: vec![Gen3Lead::Synchronize(Nature::Hardy)],
            ..Default::default()
        };
        let expected_results = [
            Wild3SearcherResultMon {
                advance: 0,
                map_idx: 0,
                encounter_slot: EncounterSlot::Slot4,
                cycle_data_by_lead: None,
                pid: 0x3A5DEC53,
                shiny: false,
                nature: Nature::Hardy,
                ability: AbilityType::Second,
                ivs: Ivs::new(0, 4, 15, 8, 25, 13),
                gender: Gender::Female,
                method: Gen3Method::Wild1,
                lead: Gen3Lead::Synchronize(Nature::Hardy),
                hidden_power: HiddenPower::new(PokemonType::Grass, 32),
            },
            Wild3SearcherResultMon {
                advance: 1,
                map_idx: 0,
                encounter_slot: EncounterSlot::Slot9,
                cycle_data_by_lead: None,
                pid: 0x95BC176C,
                shiny: false,
                nature: Nature::Careful,
                ability: AbilityType::First,
                ivs: Ivs::new(18, 20, 2, 13, 0, 15),
                gender: Gender::Female,
                method: Gen3Method::Wild1,
                lead: Gen3Lead::Synchronize(Nature::Hardy),
                hidden_power: HiddenPower::new(PokemonType::Bug, 38),
            },
            Wild3SearcherResultMon {
                advance: 2,
                map_idx: 0,
                encounter_slot: EncounterSlot::Slot7,
                cycle_data_by_lead: None,
                pid: 0x7697C055,
                shiny: false,
                nature: Nature::Hasty,
                ability: AbilityType::Second,
                ivs: Ivs::new(7, 10, 25, 11, 26, 22),
                gender: Gender::Female,
                method: Gen3Method::Wild1,
                lead: Gen3Lead::Synchronize(Nature::Hardy),
                hidden_power: HiddenPower::new(PokemonType::Bug, 67),
            },
        ];
        let result = search_wild3(&options);
        assert_list_eq!(result, expected_results);
    }

    #[test]
    fn test_search_wild3_all_methods() {
        let options = Wild3SearcherOptions {
            tid: 0x1234,
            sid: 0x4321,
            encounter_info_by_map: default_encounter_info_by_map(),
            methods: vec![
                Gen3Method::Wild1,
                Gen3Method::Wild2,
                Gen3Method::Wild3,
                Gen3Method::Wild4,
                Gen3Method::Wild5,
            ],
            initial_advances: 5000,
            max_advances: 1000,
            max_result_count: 10_000,
            leads: vec![Gen3Lead::Vanilla],
            filter: PkmFilter {
                shiny: true,
                max_ivs: Ivs::new_all31(),
                ..Default::default()
            },
            ..Default::default()
        };
        let expected_results = [
            Wild3SearcherResultMon {
                pid: 2495399342,
                ivs: Ivs::new(21, 24, 8, 26, 20, 25),
                method: Gen3Method::Wild3,
                encounter_slot: EncounterSlot::Slot6,
                cycle_data_by_lead: None,
                ability: AbilityType::First,
                gender: Gender::Male,
                nature: Nature::Quiet,
                shiny: true,
                advance: 5022,
                lead: Gen3Lead::Vanilla,
                map_idx: 0,
                hidden_power: HiddenPower::new(PokemonType::Poison, 40),
            },
            Wild3SearcherResultMon {
                pid: 2495399342,
                ivs: Ivs::new(21, 24, 8, 26, 20, 25),
                method: Gen3Method::Wild3,
                encounter_slot: EncounterSlot::Slot9,
                cycle_data_by_lead: None,
                ability: AbilityType::First,
                gender: Gender::Male,
                nature: Nature::Quiet,
                shiny: true,
                advance: 5080,
                lead: Gen3Lead::Vanilla,
                map_idx: 0,
                hidden_power: HiddenPower::new(PokemonType::Poison, 40),
            },
        ];
        let result = search_wild3(&options);
        assert_list_eq!(result, expected_results);
    }

    #[test]
    fn test_search_wild3_hidden_power() {
        let options = Wild3SearcherOptions {
            encounter_info_by_map: default_encounter_info_by_map(),
            methods: vec![Gen3Method::Wild1],
            initial_advances: 440,
            max_advances: 10,
            max_result_count: 1,
            leads: vec![Gen3Lead::Vanilla],
            filter: PkmFilter {
                hidden_power: HiddenPowerFilter {
                    active: true,
                    pokemon_types: vec![PokemonType::Flying, PokemonType::Fire],
                    min_bp: 67,
                    max_bp: 69,
                },
                ..Default::default()
            },
            ..Default::default()
        };
        let expected_results = [Wild3SearcherResultMon {
            pid: 3070009587,
            ivs: Ivs::new(28, 5, 15, 10, 6, 30),
            method: Gen3Method::Wild1,
            encounter_slot: EncounterSlot::Slot0,
            cycle_data_by_lead: None,
            ability: AbilityType::Second,
            gender: Gender::Male,
            nature: Nature::Serious,
            shiny: false,
            advance: 445,
            lead: Gen3Lead::Vanilla,
            map_idx: 0,
            hidden_power: HiddenPower::new(PokemonType::Flying, 68),
        }];
        let result = search_wild3(&options);
        assert_list_eq!(result, expected_results);
    }

    #[test]
    fn test_search_wild3_max_size() {
        let options = Wild3SearcherOptions {
            encounter_info_by_map: default_encounter_info_by_map(),
            methods: vec![Gen3Method::Wild1],
            initial_advances: 121000,
            max_advances: 1000,
            max_result_count: 1,
            leads: vec![Gen3Lead::Vanilla],
            gen3_filter: Gen3PkmFilter {
                max_size: true,
                ..Default::default()
            },
            ..Default::default()
        };
        let expected_results = [Wild3SearcherResultMon {
            pid: 1686167762,
            ivs: Ivs::new(25, 16, 21, 18, 0, 31),
            method: Gen3Method::Wild1,
            encounter_slot: EncounterSlot::Slot6,
            cycle_data_by_lead: None,
            ability: AbilityType::First,
            gender: Gender::Male,
            nature: Nature::Serious,
            shiny: false,
            advance: 121132,
            lead: Gen3Lead::Vanilla,
            map_idx: 0,
            hidden_power: HiddenPower::new(PokemonType::Ground, 45),
        }];
        let result = search_wild3(&options);
        assert_list_eq!(result, expected_results);
    }
    /*
    // Kept to help future debugging
    #[test]
    fn test_search_wild3_debug() {
        let options = Wild3SearcherOptions {
            initial_seed: 0,
            tid: 0,
            sid: 0,
            gender_ratio: GenderRatio::OneToOne,
            encounter_info_by_map: default_encounter_info_by_map(),
            methods: vec![Gen3Method::Wild2],
            initial_advances: 1005,
            max_advances: 0,
            max_result_count: 10_000,
            consider_cycles: false,
            consider_rng_manipulated_lead_pid:false,
            leads: vec![Gen3Lead::Vanilla],
            filter: PkmFilter::new_allow_all(),
        };

        let results = search_wild3( &options);

        println!("{:?}", results);
        assert!(false);
    }
    */
}
