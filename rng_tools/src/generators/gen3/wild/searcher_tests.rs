

//TODO: add back the tests

#[cfg(test)]
mod test {

    use crate::assert_list_eq;

    use crate::Ivs;
    use crate::gen3::EncounterSlot;
    use crate::gen3::Gen3Lead;
    use crate::gen3::Gen3Method;
    use crate::rng::Rng;
    use crate::rng::lcrng::Pokerng;
    use crate::{AbilityType, Gender, GenderRatio, Nature, PkmFilter};
    use crate::gen3::{generate_gen3_wild, Wild3GeneratorResult,Wild3SearcherOptions, Wild3GeneratorOptions};


    #[test]
    fn test_wild_gen() {
        let seed = 0;
        let options = Wild3SearcherOptions {
            shiny:false,
            tid: 0,
            sid: 0,
            gender_ratio: GenderRatio::OneToOne,
            encounter_slot: None,
            method: Gen3Method::H1,
            initial_advances: 0,
            max_advances: 9,
            synchronize: None,
            filter: PkmFilter {
                shiny: false,
                nature: None,
                gender: None,
                min_ivs: Ivs {
                    hp: 0,
                    atk: 0,
                    def: 0,
                    spa: 0,
                    spd: 0,
                    spe: 0,
                },
                max_ivs: Ivs {
                    hp: 31,
                    atk: 31,
                    def: 31,
                    spa: 31,
                    spd: 31,
                    spe: 31,
                },
                ability: None,
                stats: None,
            },
        };

        let expected_results = [
            GeneratedPokemon {
                advance: 0,
                encounter_slot: EncounterSlot::Slot0,
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
                synch: false,
            },
            GeneratedPokemon {
                advance: 1,
                encounter_slot: EncounterSlot::Slot5,
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
                synch: false,
            },
            GeneratedPokemon {
                advance: 2,
                encounter_slot: EncounterSlot::Slot0,
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
                synch: false,
            },
            GeneratedPokemon {
                advance: 3,
                encounter_slot: EncounterSlot::Slot1,
                pid: 0xAD05863A,
                shiny: false,
                nature: Nature::Timid,
                ability: AbilityType::First,
                ivs: Ivs {
                    hp: 18,
                    atk: 14,
                    def: 4,
                    spa: 0,
                    spd: 12,
                    spe: 25,
                },
                gender: Gender::Female,
                synch: false,
            },
            GeneratedPokemon {
                advance: 4,
                encounter_slot: EncounterSlot::Slot0,
                pid: 0x945CE0C6,
                shiny: false,
                nature: Nature::Sassy,
                ability: AbilityType::First,
                ivs: Ivs {
                    hp: 27,
                    atk: 17,
                    def: 19,
                    spa: 18,
                    spd: 22,
                    spe: 31,
                },
                gender: Gender::Male,
                synch: false,
            },
            GeneratedPokemon {
                advance: 5,
                encounter_slot: EncounterSlot::Slot4,
                pid: 0x91785DD6,
                shiny: false,
                nature: Nature::Serious,
                ability: AbilityType::First,
                ivs: Ivs {
                    hp: 6,
                    atk: 29,
                    def: 9,
                    spa: 12,
                    spd: 24,
                    spe: 13,
                },
                gender: Gender::Male,
                synch: false,
            },
            GeneratedPokemon {
                advance: 6,
                encounter_slot: EncounterSlot::Slot9,
                pid: 0xDFC5706A,
                shiny: false,
                nature: Nature::Jolly,
                ability: AbilityType::First,
                ivs: Ivs {
                    hp: 4,
                    atk: 20,
                    def: 14,
                    spa: 0,
                    spd: 25,
                    spe: 20,
                },
                gender: Gender::Female,
                synch: false,
            },
            GeneratedPokemon {
                advance: 7,
                encounter_slot: EncounterSlot::Slot7,
                pid: 0x618D27A6,
                shiny: false,
                nature: Nature::Adamant,
                ability: AbilityType::First,
                ivs: Ivs {
                    hp: 18,
                    atk: 20,
                    def: 5,
                    spa: 29,
                    spd: 19,
                    spe: 24,
                },
                gender: Gender::Male,
                synch: false,
            },
            GeneratedPokemon {
                advance: 8,
                encounter_slot: EncounterSlot::Slot4,
                pid: 0x1692618D,
                shiny: false,
                nature: Nature::Docile,
                ability: AbilityType::Second,
                ivs: Ivs {
                    hp: 24,
                    atk: 29,
                    def: 19,
                    spa: 26,
                    spd: 13,
                    spe: 29,
                },
                gender: Gender::Male,
                synch: false,
            },
            GeneratedPokemon {
                advance: 9,
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
            },
        ];
        let result = generate_3wild(&options, seed);
        assert_list_eq!(result, expected_results);
    }
    #[test]
    fn test_wild_genwfil() {
        let seed = 0x346A4A45;
        let options = Gen3WOpts {
            shiny_type: None,
            tid: 12345,
            sid: 54321,
            gender_ratio: GenderRatio::OneToOne,
            encounter_slot: Some(vec![
                EncounterSlot::Slot0,
                EncounterSlot::Slot6,
                EncounterSlot::Slot8,
            ]),
            method: Gen3Method::H1,
            initial_advances: 60,
            max_advances: 3625,
            synchronize: None,
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
                max_ivs: Ivs {
                    hp: 31,
                    atk: 31,
                    def: 31,
                    spa: 31,
                    spd: 31,
                    spe: 31,
                },
                ability: Some(AbilityType::Second),
                stats: None,
            },
        };
        let expected_results = [
            GeneratedPokemon {
                advance: 908,
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
            },
            GeneratedPokemon {
                advance: 3543,
                encounter_slot: EncounterSlot::Slot0,
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
                synch: false,
            },
            GeneratedPokemon {
                advance: 3577,
                encounter_slot: EncounterSlot::Slot6,
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
                synch: false,
            },
            GeneratedPokemon {
                advance: 3621,
                encounter_slot: EncounterSlot::Slot8,
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
                synch: false,
            },
        ];
        let result = generate_3wild(&options, seed);
        assert_list_eq!(result, expected_results);
    }
    #[test]
    fn test_wild_genwshin() {
        let seed = 0x14a22065;
        let options = Gen3WOpts {
            shiny_type: Some(ShinyType::Star),
            tid: 34760,
            sid: 47362,
            gender_ratio: GenderRatio::OneToOne,
            encounter_slot: None,
            method: Gen3Method::H1,
            initial_advances: 0,
            max_advances: 10,
            synchronize: None,
            filter: PkmFilter {
                shiny: true,
                nature: Some(Nature::Naive),
                gender: Some(Gender::Male),
                min_ivs: Ivs {
                    hp: 0,
                    atk: 0,
                    def: 0,
                    spa: 0,
                    spd: 0,
                    spe: 0,
                },
                max_ivs: Ivs {
                    hp: 31,
                    atk: 31,
                    def: 31,
                    spa: 31,
                    spd: 31,
                    spe: 31,
                },
                ability: Some(AbilityType::Second),
                stats: None,
            },
        };
        let expected_results = [GeneratedPokemon {
            advance: 0,
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
        }];
        let result = generate_3wild(&options, seed);
        assert_list_eq!(result, expected_results);
    }
    #[test]
    fn test_wild_gensynch() {
        let seed = 0x14a22065;
        let options = Gen3WOpts {
            shiny_type: None,
            tid: 12345,
            sid: 54321,
            gender_ratio: GenderRatio::OneToOne,
            encounter_slot: None,
            method: Gen3Method::H1,
            initial_advances: 0,
            max_advances: 4,
            synchronize: Some(Gen3Lead::Synchronize(Nature::Hardy)),
            filter: PkmFilter {
                shiny: false,
                nature: None,
                gender: None,
                min_ivs: Ivs {
                    hp: 0,
                    atk: 0,
                    def: 0,
                    spa: 0,
                    spd: 0,
                    spe: 0,
                },
                max_ivs: Ivs {
                    hp: 31,
                    atk: 31,
                    def: 31,
                    spa: 31,
                    spd: 31,
                    spe: 31,
                },
                ability: None,
                stats: None,
            },
        };
        let expected_results = [
            GeneratedPokemon {
                advance: 0,
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
            },
            GeneratedPokemon {
                advance: 1,
                encounter_slot: EncounterSlot::Slot9,
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
                synch: false,
            },
            GeneratedPokemon {
                advance: 2,
                encounter_slot: EncounterSlot::Slot7,
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
                synch: false,
            },
            GeneratedPokemon {
                advance: 3,
                encounter_slot: EncounterSlot::Slot1,
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
                synch: true,
            },
            GeneratedPokemon {
                advance: 4,
                encounter_slot: EncounterSlot::Slot5,
                pid: 0x57E115F6,
                shiny: false,
                nature: Nature::Naive,
                ability: AbilityType::First,
                ivs: Ivs {
                    hp: 10,
                    atk: 9,
                    def: 26,
                    spa: 0,
                    spd: 0,
                    spe: 0,
                },
                gender: Gender::Male,
                synch: false,
            },
        ];
        let result = generate_3wild(&options, seed);
        assert_list_eq!(result, expected_results);
    }
}