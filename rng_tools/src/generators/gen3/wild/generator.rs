use crate::Ivs;
use crate::gen3::EncounterSlot;
use crate::gen3::Gen3Lead;
use crate::gen3::Gen3Method;
use crate::rng::Rng;
use crate::rng::StateIterator;
use crate::rng::lcrng::Pokerng;
use crate::{AbilityType, Gender, GenderRatio, Nature, PkmFilter, ShinyType, gen3_shiny};

pub struct Gen3WOpts {
    pub shiny_type: Option<ShinyType>,
    pub tid: u16,
    pub sid: u16,
    pub gender_ratio: GenderRatio,
    pub encounter_slot: Option<Vec<EncounterSlot>>,
    pub method: Option<Gen3Method>,
    pub initial_advances: usize,
    pub max_advances: usize,
    pub synchronize: Option<Gen3Lead>,
    pub filter: PkmFilter,
}

#[derive(Debug, PartialEq)]
pub struct GeneratedPokemon {
    pub pid: u32,
    pub shiny: bool,
    pub ability: AbilityType,
    pub gender: Gender,
    pub ivs: Ivs,
    pub nature: Nature,
    pub advance: usize,
    pub encounter_slot: EncounterSlot,
    pub synch: bool,
}

pub fn generate_pokemon(rng: &mut Pokerng, settings: &Gen3WOpts) -> Option<GeneratedPokemon> {
    let encounter_rand = ((rng.rand::<u32>() >> 16) % 100) as u8;
    let encounter_slot = EncounterSlot::from_rand(encounter_rand);

    if !EncounterSlot::passes_filter(settings.encounter_slot.as_deref(), encounter_slot) {
        return None;
    }
    rng.rand::<u32>(); // level

    let nature_rand: u8;
    let mut is_synch = false;

    match settings.synchronize {
        None => {
            nature_rand = (rng.rand::<u16>() % 25) as u8;
        }
        Some(Gen3Lead::Synchronize(lead_nature)) => {
            if (rng.rand::<u16>() & 1) == 0 {
                println!("Synchronize succeeded");
                nature_rand = lead_nature.into();
                is_synch = true;
            } else {
                println!("Synchronize failed");
                nature_rand = (rng.rand::<u16>() % 25) as u8;
            }
        }
    };

    let mut pid: u32;
    loop {
        let pid_low = rng.rand::<u16>() as u32;
        let pid_high = rng.rand::<u16>() as u32;
        pid = (pid_high << 16) | pid_low;
        if pid % 25 == nature_rand as u32 {
            break;
        }
    }

    let iv1: u16;
    let iv2: u16;

    match settings.method.unwrap_or(Gen3Method::H1) {
        Gen3Method::H1 => {
            iv1 = rng.rand::<u16>();
            iv2 = rng.rand::<u16>();
        }
        Gen3Method::H2 => {
            rng.rand::<u16>(); // skip one
            iv1 = rng.rand::<u16>();
            iv2 = rng.rand::<u16>();
        }
        Gen3Method::H4 => {
            iv1 = rng.rand::<u16>();
            rng.rand::<u16>(); // skip one
            iv2 = rng.rand::<u16>();
        }
    };

    let ivs = Ivs::new_g3(iv1, iv2);

    // Filters
    let shiny = gen3_shiny(pid, settings.tid, settings.sid);
    if let Some(wanted) = settings.shiny_type {
        if (shiny && wanted == ShinyType::NotShiny) || (!shiny && wanted != ShinyType::NotShiny) {
            return None;
        }
    }

    let ability = AbilityType::from_gen3_pid(pid);
    if let Some(wanted_ability) = settings.filter.ability {
        if ability != wanted_ability {
            return None;
        }
    }
    let rate: u8 = (pid & 0xFF) as u8;
    let gender = GenderRatio::gender(&settings.gender_ratio, rate);
    if let Some(wanted_gender) = settings.filter.gender {
        if gender != wanted_gender {
            return None;
        }
    }

    if !Ivs::filter(&ivs, &settings.filter.min_ivs, &settings.filter.max_ivs) {
        return None;
    }

    let nature = Nature::from(nature_rand);
    if let Some(wanted_nature) = settings.filter.nature {
        if nature != wanted_nature {
            return None;
        }
    }

    Some(GeneratedPokemon {
        pid,
        shiny,
        ability,
        gender,
        ivs,
        nature,
        advance: 0,
        encounter_slot,
        synch: is_synch,
    })
}

pub fn generate_3wild(settings: &Gen3WOpts, seed: u32) -> Vec<GeneratedPokemon> {
    let results: Vec<GeneratedPokemon> = Vec::new();
    let base_rng = Pokerng::new(seed);
    StateIterator::new(base_rng)
        .enumerate()
        .skip(settings.initial_advances)
        .take(settings.max_advances.wrapping_add(1))
        .filter_map(|(adv, mut rng)| {
            let mut pkm = generate_pokemon(&mut rng, settings)?;
            pkm.advance = adv;
            Some(pkm)
        })
        .collect::<Vec<GeneratedPokemon>>()
}

#[cfg(test)]
mod test {

    use super::*;

    #[test]
    fn test_wild_gen() {
        let seed = 0;
        let options = Gen3WOpts {
            shiny_type: None,
            tid: 0,
            sid: 0,
            gender_ratio: GenderRatio::OneToOne,
            encounter_slot: None,
            method: Some(Gen3Method::H1),
            initial_advances: 0,
            max_advances: 10,
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
        for (i, expected) in expected_results.iter().enumerate() {
            assert_eq!(result.get(i), Some(expected), "Mismatch at index {}", i);
        }
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
            method: Some(Gen3Method::H1),
            initial_advances: 60,
            max_advances: 4000,
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
        for (i, expected) in expected_results.iter().enumerate() {
            assert_eq!(result.get(i), Some(expected), "Mismatch at index {}", i);
        }
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
            method: Some(Gen3Method::H1),
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
        for (i, expected) in expected_results.iter().enumerate() {
            assert_eq!(result.get(i), Some(expected), "Mismatch at index {}", i);
        }
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
            method: Some(Gen3Method::H1),
            initial_advances: 0,
            max_advances: 10,
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
        for (i, expected) in expected_results.iter().enumerate() {
            assert_eq!(result.get(i), Some(expected), "Mismatch at index {}", i);
        }
    }
}
