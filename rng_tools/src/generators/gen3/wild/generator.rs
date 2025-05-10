use crate::gen3::EncounterSlot;
use crate::gen3::Gen3Ability;
use crate::gen3::Gen3Lead;
use crate::gen3::Gen3Method;
use crate::rng::Lcrng;
use crate::rng::lcrng::Pokerng;
use crate::rng::{Rng, StateIterator};
use crate::{Gender, GenderRatio, Nature, PkmFilter, Species, gen3_shiny};
use crate::{IvFilter, Ivs};
use serde::{Deserialize, Serialize};
use tsify_next::Tsify;
use wasm_bindgen::prelude::*;

use super::Gen3Ability;
use Gen3Ability as Ability;
use PkmFilter as Pokemon;

#[derive(Clone, Debug, PartialEq, Eq)]
pub struct Result {
    pub rng_state: u32,
    pub advances: usize,
    pub shiny_value: ShinyType, //gen3_shiny(pid, tid, sid),
    pub pid: u32,
    pub nature: Nature,
    pub ivs: Ivs,
    pub ability: Gen3Ability,
    pub gender: Gender,
    pub encounter: EncounterSlot,
    pub is_synch: bool,
}

#[derive(Clone, Debug)]
pub struct Settings {
    seed: u32,
    tid: u16,
    sid: u16,
    min_advances: usize,
    max_advances: usize,
    delay: usize,
    min_iv: Ivs,
    max_iv: Ivs,
    gen3_method: Gen3Method,
    gen3_lead: Option<Gen3Lead>,
    shiny_type: bool,
    nature_multiselect: Vec<Nature>,
    gen3_ability: Ability,
    encounter_slot: Option<EncounterSlot>,
    gender_ratio: GenderRatio,
    gender: Option<Gender>,
}

pub fn generate_pokemon(mut rng: Lcrng, settings: &Settings) -> Option<Pokemon> {
    rng.next_u32(); // unknown

    // encounter slot
    let encounter_rand = (rng.next_u16() % 100) as u8;

    rng.next_u32();

    let nature_rand: u8;
    let mut is_synch = false;

    match settings.gen3_lead {
        None => {
            nature_rand = (rng.next_u16() % 25) as u8;
        }
        Some(Gen3Lead::Synchronize) => {
            if (rng.next_u16() & 1) == 0 {
                // if synchronized, nature set doesn't matter
                nature_rand = 0;
                is_synch = true;
            } else {
                nature_rand = (rng.next_u16() % 25) as u8;
            }
        }
    };

    let nature: Nature = nature_rand.into();
    if !Nature::passes_filter(&settings.nature_multiselect, Some(nature)) {
        return None;
    }

    let mut pid: u32;
    loop {
        let pid_low = rng.next_u16() as u32;
        let pid_high = rng.next_u16() as u32;
        pid = (pid_high << 16) | pid_low;
        if pid % 25 == nature_rand as u32 {
            break;
        }
    }

    let tsv = settings.tid ^ settings.sid;
    let shiny = ShinyType::gen3_shiny(pid, tid, sid);
    if !ShinyType::passes_filter(&settings.shiny_type, shiny) {
        return None;
    }

    let ability: Gen3Ability = (pid as u8 & 1).into();
    if !Gen3Ability::passes_filter(settings.gen3_ability, ability) {
        return None;
    }

    let gender_rand = (pid & 255) as u8;
    let gender = match settings.gender_ratio.get_set_gender() {
        Some(set_gender) => set_gender,
        None => settings.gender_ratio.get_gender(gender_rand),
    };

    if !Gender::passes_filter(settings.gender, gender) {
        return None;
    }

    let iv1;
    let iv2;

    match settings.gen3_method {
        Gen3Method::H1 => {
            iv1 = rng.next_u16();
            iv2 = rng.next_u16();
        }
        Gen3Method::H2 => {
            rng.next_u16();
            iv1 = rng.next_u16();
            iv2 = rng.next_u16();
        }
        Gen3Method::H4 => {
            iv1 = rng.next_u16();
            rng.next_u16();
            iv2 = rng.next_u16();
        }
    };

    let ivs = [
        (iv1 & 0x1f) as u8,
        ((iv1 >> 5) & 0x1f) as u8,
        ((iv1 >> 10) & 0x1f) as u8,
        ((iv2 >> 5) & 0x1f) as u8,
        ((iv2 >> 10) & 0x1f) as u8,
        (iv2 & 0x1f) as u8,
    ];

    if !check_ivs(&ivs, &settings.min_ivs(), &settings.max_ivs()) {
        return None;
    }

    let encounter_slots: [u8; 12] = [20, 40, 50, 60, 70, 80, 85, 90, 94, 98, 99, 100];
    let encounter = encounter_slots
        .iter()
        .position(|enc| encounter_rand < *enc)
        .unwrap_or(0) as u8;
    let encounter: EncounterSlot = encounter.into();

    if !EncounterSlot::passes_filter(settings.encounter_slot, encounter) {
        return None;
    }

    Some(Pokemon {
        shiny,
        pid: pid.into(),
        nature,
        ivs,
        ability,
        gender,
        encounter,
        is_synch,
    })
}
pub fn generate_wild(settings: Settings) -> Vec<Result> {
    let mut rng = Lcrng::new(settings.seed);
    rng.advance(settings.delay);
    let mut results: Vec<Result> = Vec::new();
    let values = settings.min_advances..=settings.max_advances;
    rng.advance(settings.min_advances);

    for value in values {
        let generate_result = generate_pokemon(rng, &settings);
        if let Some(pokemon) = generate_result {
            let rng_state = rng.get_state();
            let result = Result {
                rng_state,
                advances: value,
                pid: pokemon.pid,
                shiny_value: pokemon.shiny,
                nature: pokemon.nature,
                ivs: pokemon.ivs,
                ability: pokemon.ability,
                gender: pokemon.gender,
                encounter: pokemon.encounter,
                is_synch: pokemon.is_synch,
            };
            results.push(result);
        }

        rng.next();
    }

    results.into_iter().collect()
}
pub fn generate_wild_proc(settings: Settings) -> Vec<Vec<String>> {
    let results = generator::generate_wild(settings);
    results
        .into_iter()
        .map(|result| {
            vec![
                result.advances.to_string(),
                result
                    .shiny_value
                    .map(|shiny_type| shiny_type.to_string())
                    .unwrap_or("None".to_string()),
                result.encounter.to_string(),
                result.nature.to_string(),
                u8::from(result.ability).to_string(),
                result.gender.to_string(),
                format_ivs(&result.ivs),
                format!("{:x}", result.pid),
            ]
        })
        .collect()
}

#[cfg(test)]
mod test {
    use super::*;
    use crate::assert_list_eq;
    use crate::rng::lcrng::Pokerng;
    use crate::rng::{Rng, StateIterator};
    use crate::{
        G3Idx::{self, *},
        IvFilter, Ivs,
    };
    use crate::{Gender, GenderRatio, Species, gen3_shiny};

    #[test]
    fn should_generate_pokemon() {
        let mut rng = Lcrng::new(0);
        let settings = Settings {
            nature_multiselect: vec![],
            encounter_slot: None,
            seed: 0,
            delay: 0,
            min_advances: 0,
            max_advances: 10,
            gender_ratio: GenderRatio::Male50Female50,
            gen3_lead: None,
            shiny_type: false,
            gen3_ability: None,
            gender: None,
            min_iv: Ivs {
                hp: 0,
                atk: 0,
                def: 0,
                spa: 0,
                spd: 0,
                spe: 0,
            },
            max_iv: Ivs {
                hp: 31,
                atk: 31,
                def: 31,
                spa: 31,
                spd: 31,
                spe: 31,
            },
            tid: 0,
            sid: 0,
            gen3_method: Gen3Method::H1,
        };

        let expected_results = vec![
            Pokemon {
                shiny: None,
                pid: 0x60A1E414,
                nature: Nature::Calm,
                ivs: [11, 25, 10, 25, 3, 24],
                ability: Gen3Ability::Ability0,
                gender: Gender::Female,
                encounter: EncounterSlot::Slot5,
                is_synch: false,
            },
            Pokemon {
                shiny: None,
                pid: 0x639E3D69,
                nature: Nature::Bashful,
                ivs: [9, 9, 7, 20, 26, 13],
                ability: Gen3Ability::Ability1,
                gender: Gender::Female,
                encounter: EncounterSlot::Slot0,
                is_synch: false,
            },
            Pokemon {
                shiny: None,
                pid: 0x1692618D,
                nature: Nature::Docile,
                ivs: [24, 29, 10, 26, 13, 28],
                ability: Gen3Ability::Ability1,
                gender: Gender::Male,
                encounter: EncounterSlot::Slot0,
                is_synch: false,
            },
        ];

        for (advance, expected_result) in expected_results.iter().enumerate() {
            let result = generate_pokemon(rng.clone(), &settings);

            assert_eq!(
                result.as_ref(),
                Some(expected_result),
                "Mismatch on advance {}",
                advance
            );
            rng.next();
        }
    }
}
