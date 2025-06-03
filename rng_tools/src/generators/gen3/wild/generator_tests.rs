#[cfg(test)]
mod test {
    use crate::Ivs;
    use crate::gen3::EncounterSlot;
    use crate::gen3::Gen3Lead;
    use crate::gen3::Gen3Method;
    use crate::gen3::{Wild3GeneratorOptions, Wild3GeneratorResult, generate_gen3_wild};
    use crate::rng::Rng;
    use crate::rng::lcrng::Pokerng;
    use crate::{AbilityType, Gender, GenderRatio, Nature, PkmFilter};

    #[test]
    fn test_generate_wild3_no_filter() {
        let options = Wild3GeneratorOptions {
            tid: 0,
            sid: 0,
            gender_ratio: GenderRatio::OneToOne,
            encounter_slot: None,
            method: Gen3Method::Wild1,
            advance: 9,
            map_idx: 0,
            lead: None,
            filter: PkmFilter::new_allow_all(),
        };

        let mut rng = Pokerng::new(0);
        rng.advance(options.advance);
        let result = generate_gen3_wild(&mut rng, &options);
        let expected_result = Some(Wild3GeneratorResult {
            advance: 9,
            map_idx: 0,
            encounter_slot: EncounterSlot::Slot1,
            pid: 0x6E031C49,
            shiny: false,
            nature: Nature::Lax,
            ability: AbilityType::Second,
            ivs: Ivs {
                hp: 10,
                atk: 13,
                def: 12,
                spa: 20,
                spd: 10,
                spe: 9,
            },
            gender: Gender::Female,
            synch: false,
            method: Gen3Method::Wild1,
            lead: None,
            cute_charm: false,
        });
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
            method: Gen3Method::Wild1,
            lead: None,
            filter: PkmFilter {
                shiny: false,
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
                max_ivs: Ivs::new_all31(),
                ability: Some(AbilityType::Second),
                stats: None,
            },
        };

        let mut rng = Pokerng::new(0x346A4A45);
        rng.advance(options.advance);
        let result = generate_gen3_wild(&mut rng, &options);
        let expected_result = Some(Wild3GeneratorResult {
            advance: 908,
            map_idx: 0,
            encounter_slot: EncounterSlot::Slot0,
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
            synch: false,
            method: Gen3Method::Wild1,
            lead: None,
            cute_charm: false,
        });
        assert_eq!(result, expected_result);
    }
    #[test]
    fn test_generate_wild3_shiny() {
        let options = Wild3GeneratorOptions {
            tid: 34760,
            sid: 47362,
            gender_ratio: GenderRatio::OneToOne,
            encounter_slot: None,
            method: Gen3Method::Wild1,
            advance: 0,
            map_idx: 0,
            lead: None,
            filter: PkmFilter {
                shiny: true,
                nature: Some(Nature::Naive),
                gender: Some(Gender::Male),
                min_ivs: Ivs::new_all0(),
                max_ivs: Ivs::new_all31(),
                ability: Some(AbilityType::Second),
                stats: None,
            },
        };

        let mut rng = Pokerng::new(0x14a22065);
        let result = generate_gen3_wild(&mut rng, &options);
        let expected_result = Some(Wild3GeneratorResult {
            advance: 0,
            map_idx: 0,
            encounter_slot: EncounterSlot::Slot4,
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
            synch: false,
            method: Gen3Method::Wild1,
            lead: None,
            cute_charm: false,
        });
        assert_eq!(result, expected_result);
    }

    #[test]
    fn test_generate_wild3_synch() {
        let options = Wild3GeneratorOptions {
            tid: 12345,
            sid: 54321,
            gender_ratio: GenderRatio::OneToOne,
            encounter_slot: None,
            method: Gen3Method::Wild1,
            advance: 0,
            map_idx: 0,
            lead: Some(Gen3Lead::Synchronize(Nature::Hardy)),
            filter: PkmFilter::new_allow_all(),
        };

        let mut rng = Pokerng::new(0x14a22065);
        let result = generate_gen3_wild(&mut rng, &options);
        let expected_result = Some(Wild3GeneratorResult {
            advance: 0,
            map_idx: 0,
            encounter_slot: EncounterSlot::Slot4,
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
            synch: false,
            method: Gen3Method::Wild1,
            lead: Some(Gen3Lead::Synchronize(Nature::Hardy)),
            cute_charm: false,
        });
        assert_eq!(result, expected_result);
    }

    #[test]
    fn test_generate_wild3_cute_charm_activated() {
        let options = Wild3GeneratorOptions {
            tid: 0,
            sid: 0,
            gender_ratio: GenderRatio::OneToOne,
            encounter_slot: None,
            method: Gen3Method::Wild1,
            advance: 2,
            map_idx: 0,
            lead: Some(Gen3Lead::CuteCharm(Gender::Female)),
            filter: PkmFilter::new_allow_all(),
        };

        let mut rng = Pokerng::new(0);
        rng.advance(options.advance);
        let result = generate_gen3_wild(&mut rng, &options);
        let expected_result = Some(Wild3GeneratorResult {
            advance: 2,
            map_idx: 0,
            encounter_slot: EncounterSlot::Slot0,
            pid: 0x722DEBE7,
            shiny: false,
            nature: Nature::Timid,
            ability: AbilityType::Second,
            ivs: Ivs {
                hp: 28,
                atk: 1,
                def: 26,
                spa: 0,
                spd: 14,
                spe: 16,
            },
            gender: Gender::Male,
            synch: false,
            cute_charm: true,
            method: Gen3Method::Wild1,
            lead: Some(Gen3Lead::CuteCharm(Gender::Female)),
        });
        assert_eq!(result, expected_result);
    }
}
