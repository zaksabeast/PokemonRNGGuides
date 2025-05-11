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
}

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
    let iv1: u16 = (seed & 0xFFFF) as u16;
    let iv2: u16 = (seed >> 16) as u16;

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
            ability: Some(Gen3Ability::Ability0),
            gender: Some(Gender::Male),
            nature: None,
            iv_range: (
                Ivs {
                    hp: 5,
                    atk: 5,
                    def: 5,
                    spa: 5,
                    spd: 5,
                    spe: 5,
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

        let result = generate_pokemon(0, &gen3wopts);
        assert!(result.is_some(), "Expected a Pokémon to be generated");
        let pkm = result.unwrap();

        assert_eq!(pkm.shiny, false, "Expected non-shiny Pokémon");
        assert_eq!(pkm.ability, Gen3Ability::Ability0, "Unexpected ability");
        assert_eq!(pkm.gender, Gender::Male, "Unexpected gender");

        let ivs = pkm.ivs;
        assert!(ivs.hp >= 5 && ivs.hp <= 31, "HP IV out of range");
        assert!(ivs.atk >= 5 && ivs.atk <= 31, "Atk IV out of range");
        assert!(ivs.def >= 5 && ivs.def <= 31, "Def IV out of range");
        assert!(ivs.spa >= 5 && ivs.spa <= 31, "SpA IV out of range");
        assert!(ivs.spd >= 5 && ivs.spd <= 31, "SpD IV out of range");
        assert!(ivs.spe >= 5 && ivs.spe <= 31, "Spe IV out of range");
    }

    // TODO: call your generate function and assert result here
}
