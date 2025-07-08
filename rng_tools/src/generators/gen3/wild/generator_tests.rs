#[cfg(test)]
mod test {
    use crate::gen3::{
        Gen3Lead, Gen3Method, Wild3GeneratorOptions, Wild3GeneratorResult, generate_gen3_wild,
    };
    use crate::rng::Rng;
    use crate::rng::lcrng::Pokerng;
    use crate::{AbilityType, Gender, GenderRatio, Nature, PkmFilter};
    use crate::{EncounterSlot, Ivs};

    #[test]
    fn test_generate_wild3_no_filter() {
        let options = Wild3GeneratorOptions {
            tid: 0,
            sid: 0,
            gender_ratio: GenderRatio::OneToOne,
            encounter_slot: None,
            methods: vec![Gen3Method::Wild1],
            advance: 9,
            map_idx: 0,
            lead: Gen3Lead::Vanilla,
            filter: PkmFilter::new_allow_all(),
            consider_cycles: false,
            consider_rng_manipulated_lead_pid: false,
        };

        let mut rng = Pokerng::new(0);
        rng.advance(options.advance);
        let result = generate_gen3_wild(rng, &options);
        let expected_result = vec![Wild3GeneratorResult {
            encounter_slot: EncounterSlot::Slot1,
            pid: 0x6E031C49,
            ivs: Ivs {
                hp: 10,
                atk: 13,
                def: 12,
                spa: 20,
                spd: 10,
                spe: 9,
            },
            method: Gen3Method::Wild1,
            cycle_range: None,
        }];
        assert_eq!(result, expected_result);
    }

    #[test]
    fn test_generate_wild3_with_filter() {
        let options = Wild3GeneratorOptions {
            advance: 908,
            map_idx: 0,
            tid: 12345,
            sid: 54321,
            gender_ratio: GenderRatio::OneToOne,
            encounter_slot: Some(vec![
                EncounterSlot::Slot0,
                EncounterSlot::Slot6,
                EncounterSlot::Slot8,
            ]),
            methods: vec![Gen3Method::Wild1],
            lead: Gen3Lead::Vanilla,
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
            consider_cycles: false,
            consider_rng_manipulated_lead_pid: false,
        };

        let mut rng = Pokerng::new(0x346A4A45);
        rng.advance(options.advance);
        let result = generate_gen3_wild(rng, &options);
        let expected_result = vec![Wild3GeneratorResult {
            encounter_slot: EncounterSlot::Slot0,
            pid: 0x02FA9E49,
            ivs: Ivs {
                hp: 12,
                atk: 29,
                def: 23,
                spa: 10,
                spd: 14,
                spe: 13,
            },
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
            gender_ratio: GenderRatio::OneToOne,
            encounter_slot: None,
            methods: vec![Gen3Method::Wild1],
            advance: 0,
            map_idx: 0,
            lead: Gen3Lead::Vanilla,
            filter: PkmFilter {
                shiny: true,
                nature: Some(Nature::Naive),
                gender: Some(Gender::Male),
                ability: Some(AbilityType::Second),
                ..Default::default()
            },
            consider_cycles: false,
            consider_rng_manipulated_lead_pid: false,
        };

        let rng = Pokerng::new(0x14a22065);
        let result = generate_gen3_wild(rng, &options);
        let expected_result = vec![Wild3GeneratorResult {
            encounter_slot: EncounterSlot::Slot4,
            pid: 0x692A57E1,
            ivs: Ivs {
                hp: 0,
                atk: 0,
                def: 0,
                spa: 8,
                spd: 13,
                spe: 25,
            },
            method: Gen3Method::Wild1,
            cycle_range: None,
        }];
        assert_eq!(result, expected_result);
    }

    #[test]
    fn test_generate_wild3_synch() {
        let options = Wild3GeneratorOptions {
            tid: 12345,
            sid: 54321,
            gender_ratio: GenderRatio::OneToOne,
            encounter_slot: None,
            methods: vec![Gen3Method::Wild1],
            advance: 0,
            map_idx: 0,
            lead: Gen3Lead::Synchronize(Nature::Hardy),
            filter: PkmFilter::new_allow_all(),
            consider_cycles: false,
            consider_rng_manipulated_lead_pid: false,
        };

        let rng = Pokerng::new(0x14a22065);
        let result = generate_gen3_wild(rng, &options);
        let expected_result = vec![Wild3GeneratorResult {
            pid: 0x3A5DEC53,
            method: Gen3Method::Wild1,
            ivs: Ivs {
                hp: 0,
                atk: 4,
                def: 15,
                spa: 8,
                spd: 25,
                spe: 13,
            },
            encounter_slot: EncounterSlot::Slot4,
            cycle_range: None,
        }];
        assert_eq!(result, expected_result);
    }

    #[test]
    fn test_generate_wild3_cute_charm_activated() {
        let options = Wild3GeneratorOptions {
            tid: 0,
            sid: 0,
            gender_ratio: GenderRatio::OneToOne,
            encounter_slot: None,
            methods: vec![Gen3Method::Wild1],
            advance: 2,
            map_idx: 0,
            lead: Gen3Lead::CuteCharm(Gender::Female),
            filter: PkmFilter::new_allow_all(),
            consider_cycles: false,
            consider_rng_manipulated_lead_pid: false,
        };

        let mut rng = Pokerng::new(0);
        rng.advance(options.advance);
        let result = generate_gen3_wild(rng, &options);
        let expected_result = vec![Wild3GeneratorResult {
            encounter_slot: EncounterSlot::Slot0,
            pid: 0x722DEBE7,
            ivs: Ivs {
                hp: 28,
                atk: 1,
                def: 26,
                spa: 0,
                spd: 14,
                spe: 16,
            },
            method: Gen3Method::Wild1,
            cycle_range: None,
        }];
        assert_eq!(result, expected_result);
    }

    #[test]
    fn test_generate_wild3_all_methods() {
        let options = Wild3GeneratorOptions {
            tid: 0,
            sid: 0,
            gender_ratio: GenderRatio::OneToOne,
            encounter_slot: None,
            methods: vec![
                Gen3Method::Wild1,
                Gen3Method::Wild2,
                Gen3Method::Wild3,
                Gen3Method::Wild4,
                Gen3Method::Wild5,
            ],
            advance: 2,
            map_idx: 0,
            lead: Gen3Lead::Vanilla,
            filter: PkmFilter::new_allow_all(),
            consider_cycles: false,
            consider_rng_manipulated_lead_pid: false,
        };

        let mut rng = Pokerng::new(0);
        rng.advance(options.advance);
        let result = generate_gen3_wild(rng, &options);
        let expected_result = vec![
            Wild3GeneratorResult {
                encounter_slot: EncounterSlot::Slot0,
                pid: 2570972118,
                ivs: Ivs {
                    hp: 28,
                    atk: 21,
                    def: 30,
                    spa: 29,
                    spd: 18,
                    spe: 7,
                },
                method: Gen3Method::Wild5,
                cycle_range: None,
            },
            Wild3GeneratorResult {
                encounter_slot: EncounterSlot::Slot0,
                pid: 1636667768,
                ivs: Ivs {
                    hp: 18,
                    atk: 20,
                    def: 5,
                    spa: 29,
                    spd: 19,
                    spe: 24,
                },
                method: Gen3Method::Wild3,
                cycle_range: None,
            },
            Wild3GeneratorResult {
                encounter_slot: EncounterSlot::Slot0,
                pid: 1671314793,
                ivs: Ivs {
                    hp: 13,
                    atk: 20,
                    def: 26,
                    spa: 20,
                    spd: 24,
                    spe: 22,
                },
                method: Gen3Method::Wild2,
                cycle_range: None,
            },
            Wild3GeneratorResult {
                encounter_slot: EncounterSlot::Slot0,
                pid: 1671314793,
                ivs: Ivs {
                    hp: 9,
                    atk: 9,
                    def: 7,
                    spa: 20,
                    spd: 24,
                    spe: 22,
                },
                method: Gen3Method::Wild4,
                cycle_range: None,
            },
            Wild3GeneratorResult {
                encounter_slot: EncounterSlot::Slot0,
                pid: 1671314793,
                ivs: Ivs {
                    hp: 9,
                    atk: 9,
                    def: 7,
                    spa: 20,
                    spd: 26,
                    spe: 13,
                },
                method: Gen3Method::Wild1,
                cycle_range: None,
            },
        ];
        assert_eq!(result, expected_result);
    }

    #[test]
    fn test_generate_wild3_egg_lead() {
        let options = Wild3GeneratorOptions {
            tid: 0,
            sid: 0,
            gender_ratio: GenderRatio::OneToOne,
            encounter_slot: None,
            methods: vec![Gen3Method::Wild4],
            advance: 1234,
            map_idx: 0,
            lead: Gen3Lead::Egg,
            filter: PkmFilter::new_allow_all(),
            consider_cycles: false,
            consider_rng_manipulated_lead_pid: false,
        };

        let mut rng = Pokerng::new(0);
        rng.advance(options.advance);
        let result = generate_gen3_wild(rng, &options);
        let expected_result = vec![Wild3GeneratorResult {
            encounter_slot: EncounterSlot::Slot1,
            pid: 1996552928,
            ivs: Ivs {
                hp: 23,
                atk: 27,
                def: 7,
                spa: 20,
                spd: 15,
                spe: 31,
            },
            method: Gen3Method::Wild4,
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
