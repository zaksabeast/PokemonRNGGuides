#[cfg(test)]
mod test {
    use crate::gen3::Gen3EncounterType;
    use crate::gen3::{
        Gen3Lead, Gen3Method, Wild3EncounterTable, Wild3GeneratorOptions, Wild3GeneratorResult,
        generate_gen3_wild,
    };
    use crate::rng::Rng;
    use crate::rng::lcrng::Pokerng;
    use crate::{AbilityType, Gender, Nature, PkmFilter};
    use crate::{EncounterSlot, Ivs};

    #[test]
    fn test_generate_wild3_no_filter() {
        let options = Wild3GeneratorOptions {
            methods: vec![Gen3Method::Wild1],
            advance: 9,
            ..Default::default()
        };

        let mut rng = Pokerng::new(0);
        rng.advance(options.advance);
        let result = generate_gen3_wild(rng, &options, &Wild3EncounterTable::default());
        let expected_result = vec![Wild3GeneratorResult {
            encounter_slot: EncounterSlot::Slot1,
            pid: 0x6E031C49,
            ivs: Ivs::new(10, 13, 12, 20, 10, 9),
            method: Gen3Method::Wild1,
            cycle_range: None,
        }];
        assert_eq!(result, expected_result);
    }

    #[test]
    fn test_generate_wild3_with_filter() {
        let options = Wild3GeneratorOptions {
            advance: 908,
            encounter_slot: Some(vec![
                EncounterSlot::Slot0,
                EncounterSlot::Slot6,
                EncounterSlot::Slot8,
            ]),
            methods: vec![Gen3Method::Wild1],
            filter: PkmFilter {
                nature: Some(Nature::Adamant),
                gender: Some(Gender::Female),
                min_ivs: Ivs::new(10, 10, 10, 10, 10, 10),
                ability: Some(AbilityType::Second),
                ..Default::default()
            },
            ..Default::default()
        };

        let mut rng = Pokerng::new(0x346A4A45);
        rng.advance(options.advance);
        let result = generate_gen3_wild(rng, &options, &Wild3EncounterTable::default());
        let expected_result = vec![Wild3GeneratorResult {
            encounter_slot: EncounterSlot::Slot0,
            pid: 0x02FA9E49,
            ivs: Ivs::new(12, 29, 23, 10, 14, 13),
            method: Gen3Method::Wild1,
            cycle_range: None,
        }];
        assert_eq!(result, expected_result);
    }
    #[test]
    fn test_generate_wild3_shiny() {
        let options = Wild3GeneratorOptions {
            tid: 34760,
            sid: 47362,
            methods: vec![Gen3Method::Wild1],
            filter: PkmFilter {
                shiny: true,
                nature: Some(Nature::Naive),
                gender: Some(Gender::Male),
                ability: Some(AbilityType::Second),
                ..Default::default()
            },
            ..Default::default()
        };

        let rng = Pokerng::new(0x14a22065);
        let result = generate_gen3_wild(rng, &options, &Wild3EncounterTable::default());
        let expected_result = vec![Wild3GeneratorResult {
            encounter_slot: EncounterSlot::Slot4,
            pid: 0x692A57E1,
            ivs: Ivs::new(0, 0, 0, 8, 13, 25),
            method: Gen3Method::Wild1,
            cycle_range: None,
        }];
        assert_eq!(result, expected_result);
    }

    #[test]
    fn test_generate_wild3_synch() {
        let options = Wild3GeneratorOptions {
            methods: vec![Gen3Method::Wild1],
            lead: Gen3Lead::Synchronize(Nature::Hardy),
            ..Default::default()
        };

        let rng = Pokerng::new(0x14a22065);
        let result = generate_gen3_wild(rng, &options, &Wild3EncounterTable::default());
        let expected_result = vec![Wild3GeneratorResult {
            pid: 0x3A5DEC53,
            method: Gen3Method::Wild1,
            ivs: Ivs::new(0, 4, 15, 8, 25, 13),
            encounter_slot: EncounterSlot::Slot4,
            cycle_range: None,
        }];
        assert_eq!(result, expected_result);
    }

    #[test]
    fn test_generate_wild3_cute_charm_activated() {
        let options = Wild3GeneratorOptions {
            methods: vec![Gen3Method::Wild1],
            advance: 2,
            lead: Gen3Lead::CuteCharm(Gender::Female),
            ..Default::default()
        };

        let mut rng = Pokerng::new(0);
        rng.advance(options.advance);
        let result = generate_gen3_wild(rng, &options, &Wild3EncounterTable::default());
        let expected_result = vec![Wild3GeneratorResult {
            encounter_slot: EncounterSlot::Slot0,
            pid: 0x722DEBE7,
            ivs: Ivs::new(28, 1, 26, 0, 14, 16),
            method: Gen3Method::Wild1,
            cycle_range: None,
        }];
        assert_eq!(result, expected_result);
    }

    #[test]
    fn test_generate_wild3_all_methods() {
        let options = Wild3GeneratorOptions {
            methods: vec![
                Gen3Method::Wild1,
                Gen3Method::Wild2,
                Gen3Method::Wild3,
                Gen3Method::Wild4,
                Gen3Method::Wild5,
            ],
            advance: 2,
            ..Default::default()
        };

        let mut rng = Pokerng::new(0);
        rng.advance(options.advance);
        let result = generate_gen3_wild(rng, &options, &Wild3EncounterTable::default());
        let expected_result = vec![
            Wild3GeneratorResult {
                encounter_slot: EncounterSlot::Slot0,
                pid: 2570972118,
                ivs: Ivs::new(28, 21, 30, 29, 18, 7),
                method: Gen3Method::Wild5,
                cycle_range: None,
            },
            Wild3GeneratorResult {
                encounter_slot: EncounterSlot::Slot0,
                pid: 1636667768,
                ivs: Ivs::new(18, 20, 5, 29, 19, 24),
                method: Gen3Method::Wild3,
                cycle_range: None,
            },
            Wild3GeneratorResult {
                encounter_slot: EncounterSlot::Slot0,
                pid: 1036881243,
                ivs: Ivs::new(19, 28, 1, 5, 8, 17),
                method: Gen3Method::Wild5,
                cycle_range: None,
            },
            Wild3GeneratorResult {
                encounter_slot: EncounterSlot::Slot0,
                pid: 1671314793,
                ivs: Ivs::new(13, 20, 26, 20, 24, 22),
                method: Gen3Method::Wild2,
                cycle_range: None,
            },
            Wild3GeneratorResult {
                encounter_slot: EncounterSlot::Slot0,
                pid: 1671314793,
                ivs: Ivs::new(9, 9, 7, 20, 24, 22),
                method: Gen3Method::Wild4,
                cycle_range: None,
            },
            Wild3GeneratorResult {
                encounter_slot: EncounterSlot::Slot0,
                pid: 1671314793,
                ivs: Ivs::new(9, 9, 7, 20, 26, 13),
                method: Gen3Method::Wild1,
                cycle_range: None,
            },
        ];
        assert_eq!(result, expected_result);
    }

    #[test]
    fn test_generate_wild3_egg_lead() {
        let options = Wild3GeneratorOptions {
            methods: vec![Gen3Method::Wild4],
            advance: 1234,
            lead: Gen3Lead::Egg,
            ..Default::default()
        };

        let mut rng = Pokerng::new(0);
        rng.advance(options.advance);
        let result = generate_gen3_wild(rng, &options, &Wild3EncounterTable::default());
        let expected_result = vec![Wild3GeneratorResult {
            encounter_slot: EncounterSlot::Slot1,
            pid: 1996552928,
            ivs: Ivs::new(23, 27, 7, 20, 15, 31),
            method: Gen3Method::Wild4,
            cycle_range: None,
        }];
        assert_eq!(result, expected_result);
    }

    #[test]
    fn test_generate_wild3_fishing() {
        let options = Wild3GeneratorOptions {
            methods: vec![Gen3Method::Wild1],
            advance: 234,
            ..Default::default()
        };
        let mut game_data = Wild3EncounterTable::default();
        game_data.encounter_type = Gen3EncounterType::GoodRod;

        let mut rng = Pokerng::new(0);
        rng.advance(options.advance);
        let result = generate_gen3_wild(rng, &options, &game_data);
        let expected_result = vec![Wild3GeneratorResult {
            encounter_slot: EncounterSlot::Slot1,
            pid: 4072166945,
            ivs: Ivs::new(15, 0, 10, 2, 28, 7),
            method: Gen3Method::Wild1,
            cycle_range: None,
        }];
        assert_eq!(result, expected_result);
    }

    /*
    // Kept to help future debugging
    #[test]
    fn test_generate_wild3_debug() {
        let options = Wild3GeneratorOptions {
            tid: 0,
            sid: 0,
            gender_ratio: GenderRatio::SevenToOne,
            encounter_slot: None,
            encounter_type: Gen3EncounterType::Land,
            methods: vec![Gen3Method::Wild1],
            advance: 1234,
            map_idx: 0,
            lead: Gen3Lead::CuteCharm(Gender::Female),
            filter: PkmFilter::new_allow_all(),
        };

        let mut rng = Pokerng::new(0);
        rng.advance(options.advance);
        let result = generate_gen3_wild(rng, &options);

        println!("{:?}", result);
        assert!(false);
    }
    */
}
