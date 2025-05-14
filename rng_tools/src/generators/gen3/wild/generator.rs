use crate::gen3::EncounterSlot;
use crate::gen3::Gen3Ability;
use crate::gen3::Gen3Lead;
use crate::gen3::Gen3Method;
use crate::gen3::ShinyType;
use crate::rng::lcrng::Pokerng;
use crate::rng::{Rng, StateIterator};
use crate::{Gender, GenderRatio, Nature, PkmFilter, gen3_shiny};
use crate::{IvFilter, Ivs};
use itertools::Itertools;
use wasm_bindgen::prelude::wasm_bindgen;

pub struct Gen3WOpts {
    shiny_type: Option<ShinyType>,
    ability: Option<Gen3Ability>,
    gender: Option<Gender>,
    nature: Option<Nature>,
    iv_range: (Ivs, Ivs),
    tid: u16,
    sid: u16,
    gender_ratio: GenderRatio,
    encounter_slot: Option<EncounterSlot>,
    method: Option<Gen3Method>,
    min_advances: usize,
    max_advances: usize,
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
}

pub fn generate_pokemon(rng: &mut Pokerng, settings: &Gen3WOpts) -> Option<GeneratedPokemon> {
    let encounter_rand = (rng.rand::<u32>() >> 8) as u8;
    let encounter_slot = EncounterSlot::from_rand(encounter_rand);

    if !EncounterSlot::passes_filter(settings.encounter_slot, encounter_slot) {
        println!("encounter - Current seed: {}", rng.seed());
        return None;
    }

    let pid = (rng.rand::<u16>() as u32) | ((rng.rand::<u16>() as u32) << 16);
    println!("pid - Current seed: {}", rng.seed());

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
    println!("ivs - Current seed: {}", rng.seed());

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
        println!("ivs - Current seed: {}", rng.seed());
        return None;
    }

    let nature = Nature::from_pid(pid);
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
    })
}

pub fn generate_3wild(settings: &Gen3WOpts, seed: u32) -> Vec<GeneratedPokemon> {
    let mut rng = Pokerng::new(seed);
    let mut results: Vec<GeneratedPokemon> = Vec::new();

    let mut advances = settings.min_advances;

    while advances <= settings.max_advances {
        rng.advance(advances);
        let mut temp_rng = rng.clone();
        if let Some(mut pokemon) = generate_pokemon(&mut temp_rng, settings) {
            pokemon.advances = advances;
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
            encounter_slot: Some(EncounterSlot::Slot0),
            method: Some(Gen3Method::H1),
            min_advances: 4,
            max_advances: 10,
        };

        let expected_results = vec![GeneratedPokemon {
            pid: 0x945CE0C6,
            shiny: false,
            ability: Gen3Ability::Ability0,
            gender: Gender::Male,
            ivs: Ivs {
                hp: 27,
                atk: 17,
                def: 19,
                spa: 1,
                spd: 9,
                spe: 8,
            },
            nature: Nature::Sassy,
            advances: 4,
        }];
        let result = generate_3wild(&options, seed);
        for (i, expected) in expected_results.iter().enumerate() {
            assert_eq!(result.get(i), Some(expected), "Mismatch at index {}", i);
        }
    }
}
