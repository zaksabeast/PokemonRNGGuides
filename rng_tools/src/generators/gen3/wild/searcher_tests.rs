#[cfg(test)]
mod test {
    use crate::assert_list_eq;

    use crate::EncounterSlot;
    use crate::Ivs;
    use crate::gen3::Gen3Lead;
    use crate::gen3::Gen3Method;
    use crate::gen3::search_wild3;
    use crate::gen3::{Wild3SearcherOptions, Wild3SearcherResultMon};
    use crate::{AbilityType, Gender, GenderRatio, Nature, PkmFilter};

    #[test]
    fn test_search_wild3_no_filter() {
        let options = Wild3SearcherOptions {
            initial_seed: 0,
            leads: vec![Gen3Lead::Vanilla],
            encounter_slots_by_map: vec![None],
            methods: vec![Gen3Method::Wild1],
            tid: 0,
            sid: 0,
            gender_ratio: GenderRatio::OneToOne,
            initial_advances: 0,
            max_advances: 2,
            max_result_count: 10_000,
            filter: PkmFilter::new_allow_all(),
            consider_cycles: false,
            consider_rng_manipulated_lead_pid: false,
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
                ivs: Ivs {
                    hp: 12,
                    atk: 25,
                    def: 27,
                    spa: 2,
                    spd: 31,
                    spe: 30,
                },
                gender: Gender::Male,
                method: Gen3Method::Wild1,
                lead: Gen3Lead::Vanilla,
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
                ivs: Ivs {
                    hp: 11,
                    atk: 25,
                    def: 10,
                    spa: 25,
                    spd: 3,
                    spe: 24,
                },
                gender: Gender::Female,
                method: Gen3Method::Wild1,
                lead: Gen3Lead::Vanilla,
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
                ivs: Ivs {
                    hp: 9,
                    atk: 9,
                    def: 7,
                    spa: 20,
                    spd: 26,
                    spe: 13,
                },
                gender: Gender::Female,
                method: Gen3Method::Wild1,
                lead: Gen3Lead::Vanilla,
            },
        ];
        let result = search_wild3(&options);
        assert_list_eq!(result, expected_results);
    }

    #[test]
    fn test_search_wild3_with_filter() {
        let options = Wild3SearcherOptions {
            initial_seed: 0x346A4A45,
            tid: 12345,
            sid: 54321,
            gender_ratio: GenderRatio::OneToOne,
            encounter_slots_by_map: vec![Some(vec![
                EncounterSlot::Slot0,
                EncounterSlot::Slot6,
                EncounterSlot::Slot8,
            ])],
            methods: vec![Gen3Method::Wild1],
            initial_advances: 60,
            max_advances: 3540,
            max_result_count: 10_000,
            leads: vec![Gen3Lead::Vanilla],
            consider_cycles: false,
            consider_rng_manipulated_lead_pid: false,
            filter: PkmFilter {
                nature: Some(Nature::Adamant),
                gender: Some(Gender::Female),
                min_ivs: Ivs {
                    hp: 10,
                    atk: 10,
                    def: 10,
                    spa: 10,
                    spd: 10,
                    spe: 10,
                },
                ability: Some(AbilityType::Second),
                ..Default::default()
            },
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
                ivs: Ivs {
                    hp: 12,
                    atk: 29,
                    def: 23,
                    spa: 10,
                    spd: 14,
                    spe: 13,
                },
                gender: Gender::Female,
                method: Gen3Method::Wild1,
                lead: Gen3Lead::Vanilla,
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
                ivs: Ivs {
                    hp: 31,
                    atk: 13,
                    def: 30,
                    spa: 26,
                    spd: 21,
                    spe: 24,
                },
                gender: Gender::Female,
                method: Gen3Method::Wild1,
                lead: Gen3Lead::Vanilla,
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
                ivs: Ivs {
                    hp: 31,
                    atk: 13,
                    def: 30,
                    spa: 26,
                    spd: 21,
                    spe: 24,
                },
                gender: Gender::Female,
                method: Gen3Method::Wild1,
                lead: Gen3Lead::Vanilla,
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
            gender_ratio: GenderRatio::OneToOne,
            encounter_slots_by_map: vec![None],
            methods: vec![Gen3Method::Wild1],
            initial_advances: 0,
            max_advances: 10,
            max_result_count: 10_000,
            consider_cycles: false,
            consider_rng_manipulated_lead_pid: false,
            leads: vec![Gen3Lead::Vanilla],
            filter: PkmFilter {
                shiny: true,
                nature: Some(Nature::Naive),
                gender: Some(Gender::Male),
                ability: Some(AbilityType::Second),
                ..Default::default()
            },
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
            ivs: Ivs {
                hp: 0,
                atk: 0,
                def: 0,
                spa: 8,
                spd: 13,
                spe: 25,
            },
            gender: Gender::Male,
            method: Gen3Method::Wild1,
            lead: Gen3Lead::Vanilla,
        }];
        let result = search_wild3(&options);
        assert_list_eq!(result, expected_results);
    }

    #[test]
    fn test_search_wild3_synchronize() {
        let options = Wild3SearcherOptions {
            initial_seed: 0x14a22065,
            tid: 12345,
            sid: 54321,
            gender_ratio: GenderRatio::OneToOne,
            encounter_slots_by_map: vec![None],
            methods: vec![Gen3Method::Wild1],
            consider_cycles: false,
            consider_rng_manipulated_lead_pid: false,
            initial_advances: 0,
            max_advances: 2,
            max_result_count: 10_000,
            leads: vec![Gen3Lead::Synchronize(Nature::Hardy)],
            filter: PkmFilter::new_allow_all(),
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
                ivs: Ivs {
                    hp: 0,
                    atk: 4,
                    def: 15,
                    spa: 8,
                    spd: 25,
                    spe: 13,
                },
                gender: Gender::Female,
                method: Gen3Method::Wild1,
                lead: Gen3Lead::Synchronize(Nature::Hardy),
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
                ivs: Ivs {
                    hp: 18,
                    atk: 20,
                    def: 2,
                    spa: 13,
                    spd: 0,
                    spe: 15,
                },
                gender: Gender::Female,
                method: Gen3Method::Wild1,
                lead: Gen3Lead::Synchronize(Nature::Hardy),
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
                ivs: Ivs {
                    hp: 7,
                    atk: 10,
                    def: 25,
                    spa: 11,
                    spd: 26,
                    spe: 22,
                },
                gender: Gender::Female,
                method: Gen3Method::Wild1,
                lead: Gen3Lead::Synchronize(Nature::Hardy),
            },
        ];
        let result = search_wild3(&options);
        assert_list_eq!(result, expected_results);
    }

    #[test]
    fn test_search_wild3_all_methods() {
        let options = Wild3SearcherOptions {
            initial_seed: 0,
            tid: 0x1234,
            sid: 0x4321,
            gender_ratio: GenderRatio::OneToOne,
            encounter_slots_by_map: vec![None],
            methods: vec![
                Gen3Method::Wild1,
                Gen3Method::Wild2,
                Gen3Method::Wild3,
                Gen3Method::Wild4,
                Gen3Method::Wild5,
            ],
            consider_cycles: false,
            consider_rng_manipulated_lead_pid: false,
            initial_advances: 5000,
            max_advances: 1000,
            max_result_count: 10_000,
            leads: vec![Gen3Lead::Vanilla],
            filter: PkmFilter {
                shiny: true,
                max_ivs: Ivs::new_all31(),
                ..Default::default()
            },
        };
        let expected_results = [
            Wild3SearcherResultMon {
                pid: 2495399342,
                ivs: Ivs {
                    hp: 21,
                    atk: 24,
                    def: 8,
                    spa: 26,
                    spd: 20,
                    spe: 25,
                },
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
            },
            Wild3SearcherResultMon {
                pid: 2495399342,
                ivs: Ivs {
                    hp: 21,
                    atk: 24,
                    def: 8,
                    spa: 26,
                    spd: 20,
                    spe: 25,
                },
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
            },
        ];
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
            encounter_slots_by_map: vec![None],
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
