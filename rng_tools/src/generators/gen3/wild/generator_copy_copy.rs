use crate::gen3::EncounterSlot;
use crate::gen3::Gen3Ability;
use crate::gen3::Gen3Lead;
use crate::gen3::Gen3Method;
use crate::gen3::ShinyType;
use crate::rng::lcrng::Pokerng;
use crate::rng::{Rng, StateIterator};
use crate::{Gender, GenderRatio, Nature, PkmFilter, gen3_shiny};
use crate::{IvFilter, Ivs};
use wasm_bindgen::prelude::wasm_bindgen;

struct Gen3WOpts {
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
}

#[derive(Debug)]
struct GeneratedPokemon {
    pid: u32,
    shiny: bool,
    ability: Gen3Ability,
    gender: Gender,
    ivs: Ivs,
    nature: Nature,
}

fn generate_pokemon(seed: u32, settings: &Gen3WOpts) -> Option<GeneratedPokemon> {
    let mut rng = Pokerng::new(seed);
    let pid = (rng.rand::<u16>() as u32) | ((rng.rand::<u16>() as u32) << 16); // you define this

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
    let mut iv1: u16 = (seed & 0xFFFF) as u16;
    let mut iv2: u16 = (seed >> 16) as u16;

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

    let ivs = Ivs::new_g3(iv1, iv2); // you define this
    if !Ivs::filter(&ivs, &settings.iv_range.0, &settings.iv_range.1) {
        return None;
    }

    let nature = Nature::from_pid(pid); // you define this
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
    })
}

#[cfg(test)]
mod test {
    use super::*;
    use crate::gen3::EncounterSlot;
    use crate::gen3::Gen3Ability;
    use crate::gen3::ShinyType;
    use crate::rng;
    use crate::rng::lcrng;
    use crate::rng::lcrng::Pokerng;
    use crate::rng::{Rng, StateIterator};
    use crate::{Gender, GenderRatio, Nature, PkmFilter, gen3_shiny};
    use crate::{IvFilter, Ivs};

    #[test]
    fn test_gen_pokemon() {
        let seed = 0;
        let gen3wopts = Gen3WOpts {
            shiny_type: Some(ShinyType::NotShiny),
            ability: Some(Gen3Ability::Ability1),
            gender: Some(Gender::Male),
            nature: None,
            iv_range: (
                Ivs {
                    hp: 0,
                    atk: 0,
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
            tid: 34760,
            sid: 47362,
            gender_ratio: GenderRatio::OneToOne,
            encounter_slot: Some(EncounterSlot::Slot0),
        };

        let mut found = None;
        for seed in 0..100000 {
            if let Some(pkm) = generate_pokemon(seed, &gen3wopts) {
                found = Some((seed, pkm));
                break;
            }
        }

        assert!(
            found.is_some(),
            "Expected a Pokémon to be generated from some seed"
        );
        let (seed, pkm) = found.unwrap();

        println!("Found Pokémon at seed {}: {:?}", seed, pkm);

        assert_eq!(pkm.shiny, false, "Expected non-shiny Pokémon");
        assert_eq!(pkm.ability, Gen3Ability::Ability1, "Unexpected ability");
        assert_eq!(pkm.gender, Gender::Male, "Unexpected gender");

        let ivs = pkm.ivs;
        assert!(ivs.hp >= 0 && ivs.hp <= 31, "HP IV out of range");
        assert!(ivs.atk >= 0 && ivs.atk <= 31, "Atk IV out of range");
        assert!(ivs.def >= 0 && ivs.def <= 31, "Def IV out of range");
        assert!(ivs.spa >= 0 && ivs.spa <= 31, "SpA IV out of range");
        assert!(ivs.spd >= 0 && ivs.spd <= 31, "SpD IV out of range");
        assert!(ivs.spe >= 0 && ivs.spe <= 31, "Spe IV out of range");
        print!("{:?}", pkm);
    }

    // TODO: call your generate function and assert result here
}
