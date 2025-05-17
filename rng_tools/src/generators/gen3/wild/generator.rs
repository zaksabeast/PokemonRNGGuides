use crate::Ivs;
use crate::gen3::EncounterSlot;
use crate::gen3::Gen3Ability;
use crate::gen3::Gen3Lead;
use crate::gen3::Gen3Method;
use crate::gen3::ShinyType;
use crate::rng::Rng;
use crate::rng::lcrng::Pokerng;
use crate::{Gender, GenderRatio, Nature, gen3_shiny};

pub struct Gen3WOpts {
    shiny_type: Option<ShinyType>,
    ability: Option<Gen3Ability>,
    gender: Option<Gender>,
    nature: Option<Nature>,
    iv_range: (Ivs, Ivs),
    tid: u16,
    sid: u16,
    gender_ratio: GenderRatio,
    encounter_slot: Option<Vec<EncounterSlot>>,
    method: Option<Gen3Method>,
    min_advances: usize,
    max_advances: usize,
    synchronize: Option<Gen3Lead>,
}

#[derive(Debug, PartialEq)]
pub struct GeneratedPokemon {
    pid: u32,
    shiny: bool,
    ability: Gen3Ability,
    gender: Gender,
    ivs: Ivs,
    nature: Nature,
    advances: usize,
    encounter_slot: EncounterSlot,
    synch: bool,
}

pub fn generate_pokemon(rng: &mut Pokerng, settings: &Gen3WOpts) -> Option<GeneratedPokemon> {
    rng.rand::<u32>(); // unknown

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
        Some(Gen3Lead::Synchronize) => {
            if (rng.rand::<u16>() & 1) == 0 {
                // if synchronized, nature set doesn't matter
                nature_rand = 0;
                is_synch = true;
            } else {
                nature_rand = (rng.rand::<u16>() % 25) as u8;
            }
        }
    };

    //let pid = (rng.rand::<u16>() as u32) | ((rng.rand::<u16>() as u32) << 16);
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

    let ability = Gen3Ability::from_pid(pid);
    if let Some(wanted_ability) = settings.ability {
        if ability != wanted_ability {
            return None;
        }
    }
    let rate: u8 = (pid & 0xFF) as u8;
    let gender = GenderRatio::gender(&settings.gender_ratio, rate);
    if let Some(wanted_gender) = settings.gender {
        if gender != wanted_gender {
            return None;
        }
    }

    if !Ivs::filter(&ivs, &settings.iv_range.0, &settings.iv_range.1) {
        return None;
    }

    let nature = Nature::from(nature_rand);
    if let Some(wanted_nature) = settings.nature {
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
        advances: 0,
        encounter_slot,
        synch: is_synch,
    })
}

pub fn generate_3wild(settings: &Gen3WOpts, seed: u32) -> Vec<GeneratedPokemon> {
    let mut results: Vec<GeneratedPokemon> = Vec::new();
    let mut advances = settings.min_advances;

    while advances <= settings.max_advances {
        let mut rng = Pokerng::new(seed);
        rng.advance(advances);
        let mut temp_rng = rng;
        if let Some(mut pokemon) = generate_pokemon(&mut temp_rng, settings) {
            pokemon.advances = advances + 1;
            results.push(pokemon);
        }
        advances += 1;
        if advances > settings.max_advances {
            break;
        }
    }

    results.into_iter().collect()
}

#[cfg(test)]
mod test {

    use super::*;

    #[test]
    fn test_wild_gen() {
        let seed = 0;
        let options = Gen3WOpts {
            shiny_type: None,
            ability: None,
            gender: None,
            nature: None,
            iv_range: (
                Ivs {
                    atk: 0,
                    hp: 0,
                    def: 0,
                    spa: 0,
                    spd: 0,
                    spe: 0,
                },
                Ivs {
                    hp: 31,
                    atk: 31,
                    def: 31,
                    spa: 31,
                    spd: 31,
                    spe: 31,
                },
            ),
            tid: 0,
            sid: 0,
            gender_ratio: GenderRatio::OneToOne,
            encounter_slot: None,
            method: Some(Gen3Method::H1),
            min_advances: 0,
            max_advances: 10,
            synchronize: None,
        };

        let expected_results = vec![
            GeneratedPokemon {
                pid: 0x60A1E414,
                shiny: false,
                ability: Gen3Ability::Ability0,
                gender: Gender::Female,
                ivs: Ivs {
                    hp: 11,
                    atk: 25,
                    def: 10,
                    spa: 25,
                    spd: 3,
                    spe: 24,
                },
                nature: Nature::Calm,
                advances: 1,
                encounter_slot: EncounterSlot::Slot5,
                synch: false,
            },
            GeneratedPokemon {
                pid: 0x639E3D69,
                shiny: false,
                ability: Gen3Ability::Ability1,
                gender: Gender::Female,
                ivs: Ivs {
                    hp: 9,
                    atk: 9,
                    def: 7,
                    spa: 20,
                    spd: 26,
                    spe: 13,
                },
                nature: Nature::Bashful,
                advances: 2,
                encounter_slot: EncounterSlot::Slot0,
                synch: false,
            },
            GeneratedPokemon {
                pid: 0xAD05863A,
                shiny: false,
                ability: Gen3Ability::Ability0,
                gender: Gender::Female,
                ivs: Ivs {
                    hp: 18,
                    atk: 14,
                    def: 4,
                    spa: 0,
                    spd: 12,
                    spe: 25,
                },
                nature: Nature::Timid,
                advances: 3,
                encounter_slot: EncounterSlot::Slot1,
                synch: false,
            },
            GeneratedPokemon {
                pid: 0x945CE0C6,
                shiny: false,
                ability: Gen3Ability::Ability0,
                gender: Gender::Male,
                ivs: Ivs {
                    hp: 27,
                    atk: 17,
                    def: 19,
                    spa: 18,
                    spd: 22,
                    spe: 31,
                },
                nature: Nature::Sassy,
                advances: 4,
                encounter_slot: EncounterSlot::Slot0,
                synch: false,
            },
            GeneratedPokemon {
                pid: 0x91785DD6,
                shiny: false,
                ability: Gen3Ability::Ability0,
                gender: Gender::Male,
                ivs: Ivs {
                    hp: 6,
                    atk: 29,
                    def: 9,
                    spa: 12,
                    spd: 24,
                    spe: 13,
                },
                nature: Nature::Serious,
                advances: 5,
                encounter_slot: EncounterSlot::Slot4,
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
            ability: Some(Gen3Ability::Ability1),
            gender: Some(Gender::Female),
            nature: Some(Nature::Adamant),
            iv_range: (
                Ivs {
                    atk: 10,
                    hp: 10,
                    def: 10,
                    spa: 10,
                    spd: 10,
                    spe: 10,
                },
                Ivs {
                    hp: 31,
                    atk: 31,
                    def: 31,
                    spa: 31,
                    spd: 31,
                    spe: 31,
                },
            ),
            tid: 12345,
            sid: 54321,
            gender_ratio: GenderRatio::OneToOne,
            encounter_slot: Some(vec![
                EncounterSlot::Slot0,
                EncounterSlot::Slot6,
                EncounterSlot::Slot8,
            ]),
            method: Some(Gen3Method::H1),
            min_advances: 60,
            max_advances: 4000,
            synchronize: None,
        };
        let expected_results = vec![
            GeneratedPokemon {
                pid: 0x02FA9E49,
                shiny: false,
                ability: Gen3Ability::Ability1,
                gender: Gender::Female,
                ivs: Ivs {
                    hp: 12,
                    atk: 29,
                    def: 23,
                    spa: 10,
                    spd: 14,
                    spe: 13,
                },
                nature: Nature::Adamant,
                advances: 908,
                encounter_slot: EncounterSlot::Slot0,
                synch: false,
            },
            GeneratedPokemon {
                pid: 0xA44D455D,
                shiny: false,
                ability: Gen3Ability::Ability1,
                gender: Gender::Female,
                ivs: Ivs {
                    hp: 31,
                    atk: 13,
                    def: 30,
                    spa: 26,
                    spd: 21,
                    spe: 24,
                },
                nature: Nature::Adamant,
                advances: 3543,
                encounter_slot: EncounterSlot::Slot0,
                synch: false,
            },
            GeneratedPokemon {
                pid: 0xA44D455D,
                shiny: false,
                ability: Gen3Ability::Ability1,
                gender: Gender::Female,
                ivs: Ivs {
                    hp: 31,
                    atk: 13,
                    def: 30,
                    spa: 26,
                    spd: 21,
                    spe: 24,
                },
                nature: Nature::Adamant,
                advances: 3577,
                encounter_slot: EncounterSlot::Slot6,
                synch: false,
            },
            GeneratedPokemon {
                pid: 0xA44D455D,
                shiny: false,
                ability: Gen3Ability::Ability1,
                gender: Gender::Female,
                ivs: Ivs {
                    hp: 31,
                    atk: 13,
                    def: 30,
                    spa: 26,
                    spd: 21,
                    spe: 24,
                },
                nature: Nature::Adamant,
                advances: 3621,
                encounter_slot: EncounterSlot::Slot8,
                synch: false,
            },
        ];
        let result = generate_3wild(&options, seed);
        for (i, expected) in expected_results.iter().enumerate() {
            assert_eq!(result.get(i), Some(expected), "Mismatch at index {}", i);
        }
    }
}
