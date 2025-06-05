use super::Gen3EncounterType;
use crate::Ivs;
use crate::Species;
use crate::gen3::{EncounterSlot, Gen3Lead, Gen3Method};
use crate::rng::Rng;
use crate::rng::lcrng::Pokerng;
use crate::{AbilityType, Gender, GenderRatio, Nature, PkmFilter, gen3_shiny};
use serde::{Deserialize, Serialize};
use tsify_next::Tsify;
use wasm_bindgen::prelude::*;

#[derive(Debug, Clone, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct Wild3EncounterSlotInfo {
    pub min_level: u8,
    pub max_level: u8,
    pub species: Species,
    pub gender_ratio: GenderRatio,
    pub is_electric_type: bool,
    pub is_steel_type: bool,
}

#[derive(Debug, Clone, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct Wild3EncounterTable {
    pub map_id: String,
    pub encounter_type: Gen3EncounterType,
    pub slots: Vec<Wild3EncounterSlotInfo>,
}

#[derive(Debug, Clone, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct Wild3GeneratorOptions {
    pub advance: usize,
    pub tid: u16,
    pub sid: u16,
    pub gender_ratio: GenderRatio,
    pub map_idx: usize,
    pub encounter_slot: Option<Vec<EncounterSlot>>,
    pub methods: Vec<Gen3Method>,
    pub lead: Option<Gen3Lead>,
    pub filter: PkmFilter,
}

#[derive(Debug, Clone, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct Wild3GeneratorResult {
    pub encounter_slot: EncounterSlot,
    pub pid: u32,
    pub ivs: Ivs,
    pub method: Gen3Method,
}

pub fn generate_gen3_wild(
    rng: &mut Pokerng,
    opts: &Wild3GeneratorOptions,
) -> Vec<Wild3GeneratorResult> {
    let mut results: Vec<Wild3GeneratorResult> = vec![];
    let encounter_rand = ((rng.rand::<u32>() >> 16) % 100) as u8;
    let encounter_slot = EncounterSlot::from_rand(encounter_rand);

    if !EncounterSlot::passes_filter(opts.encounter_slot.as_deref(), encounter_slot) {
        return results;
    }
    rng.rand::<u32>(); // level

    let required_gender = match (opts.gender_ratio.has_multiple_genders(), opts.lead) {
        (true, Some(Gen3Lead::CuteCharm(gender))) if rng.rand::<u16>() % 3 != 0 => {
            Some(if gender == Gender::Female {
                Gender::Male
            } else {
                Gender::Female
            })
        }
        _ => None,
    };

    let required_nature = match opts.lead {
        Some(Gen3Lead::Synchronize(lead_nature)) => {
            if (rng.rand::<u16>() & 1) == 0 {
                lead_nature
            } else {
                ((rng.rand::<u16>() % 25) as u8).into()
            }
        }
        _ => ((rng.rand::<u16>() % 25) as u8).into(),
    };

    let methods_contains_wild3 = opts.methods.contains(&Gen3Method::Wild3);
    let methods_contains_wild5 = opts.methods.contains(&Gen3Method::Wild5);

    let mut pid: u32;
    loop {
        let pid_low = rng.rand::<u16>() as u32;

        if methods_contains_wild3 {
            if let Some(gen_mon_wild3) = generate_gen3_wild_method3(
                *rng,
                opts,
                encounter_slot,
                pid_low,
                required_gender,
                required_nature,
            ) {
                results.push(gen_mon_wild3);
            }
        }

        let pid_high = rng.rand::<u16>() as u32;
        pid = (pid_high << 16) | pid_low;

        let good_nature = Nature::from_pid(pid) == required_nature;

        let good_gender = if let Some(required_gender) = required_gender {
            let generated_mon_gender = opts.gender_ratio.gender_from_pid(pid);
            generated_mon_gender == required_gender
        } else {
            true
        };

        if good_nature && good_gender {
            break;
        }

        if methods_contains_wild5 {
            // Multiple iterations will result in the same Method5 Pokémon.
            // To avoid duplicates, we add the generated Pokémon only in the latest possible PID reroll.
            if let Some(gen_mon_wild5) = generate_gen3_wild_method5(
                *rng,
                opts,
                encounter_slot,
                required_gender,
                required_nature,
            ) {
                results.push(gen_mon_wild5);
            }
        }
    }

    if !passes_pid_filter(opts, pid) {
        return results;
    }

    if opts.methods.contains(&Gen3Method::Wild2) {
        if let Some(gen_mon_wild2) =
            generate_gen3_wild_method2(*rng, opts, encounter_slot, pid)
        {
            results.push(gen_mon_wild2);
        }
    }

    let iv1 = rng.rand::<u16>();

    if opts.methods.contains(&Gen3Method::Wild4) {
        if let Some(gen_mon_wild4) =
            generate_gen3_wild_method4(*rng, opts, encounter_slot, pid, iv1)
        {
            results.push(gen_mon_wild4);
        }
    }

    if opts.methods.contains(&Gen3Method::Wild1) {
        let ivs = Ivs::new_g3(iv1, rng.rand::<u16>());

        if let Some(gen_mon_wild1) =
            create_if_passes_filter(opts, pid, ivs, Gen3Method::Wild1, encounter_slot)
        {
            results.push(gen_mon_wild1);
        }
    }

    results
}

pub fn generate_gen3_wild_method2(
    mut rng: Pokerng,
    opts: &Wild3GeneratorOptions,
    encounter_slot: EncounterSlot,
    pid: u32,
) -> Option<Wild3GeneratorResult> {
    rng.rand::<u16>(); // Vblank from method2

    let ivs = Ivs::new_g3(rng.rand::<u16>(), rng.rand::<u16>());

    create_if_passes_filter(opts, pid, ivs, Gen3Method::Wild2, encounter_slot)
}

pub fn generate_gen3_wild_method3(
    mut rng: Pokerng,
    opts: &Wild3GeneratorOptions,
    encounter_slot: EncounterSlot,
    pid_low: u32,
    required_gender: Option<Gender>,
    required_nature: Nature,
) -> Option<Wild3GeneratorResult> {
    rng.rand::<u16>(); // Vblank from method3

    let pid_high = rng.rand::<u16>() as u32;
    let pid = (pid_high << 16) | pid_low;
    if Nature::from_pid(pid) != required_nature {
        return None;
    }
    if let Some(required_gender) = required_gender {
        let generated_mon_gender = opts.gender_ratio.gender_from_pid(pid);
        if generated_mon_gender != required_gender {
            return None;
        }
    }

    if !passes_pid_filter(opts, pid) {
        return None;
    }

    let ivs = Ivs::new_g3(rng.rand::<u16>(), rng.rand::<u16>());

    create_if_passes_filter(opts, pid, ivs, Gen3Method::Wild3, encounter_slot)
}

pub fn generate_gen3_wild_method4(
    mut rng: Pokerng,
    opts: &Wild3GeneratorOptions,
    encounter_slot: EncounterSlot,
    pid: u32,
    iv1: u16,
) -> Option<Wild3GeneratorResult> {
    rng.rand::<u16>(); // Vblank from method4

    let ivs = Ivs::new_g3(iv1, rng.rand::<u16>());

    create_if_passes_filter(opts, pid, ivs, Gen3Method::Wild4, encounter_slot)
}

pub fn generate_gen3_wild_method5(
    mut rng: Pokerng,
    opts: &Wild3GeneratorOptions,
    encounter_slot: EncounterSlot,
    required_gender: Option<Gender>,
    required_nature: Nature,
) -> Option<Wild3GeneratorResult> {
    rng.rand::<u16>(); // Vblank from method5

    let pid_low = rng.rand::<u16>() as u32;
    let pid_high = rng.rand::<u16>() as u32;
    let pid = (pid_high << 16) | pid_low;

    if Nature::from_pid(pid) != required_nature {
        return None;
    }
    if let Some(required_gender) = required_gender {
        let generated_mon_gender = opts.gender_ratio.gender_from_pid(pid);
        if generated_mon_gender != required_gender {
            return None;
        }
    }

    if !passes_pid_filter(opts, pid) {
        return None;
    }

    let ivs = Ivs::new_g3(rng.rand::<u16>(), rng.rand::<u16>());

    create_if_passes_filter(opts, pid, ivs, Gen3Method::Wild5, encounter_slot)
}

pub fn passes_pid_filter(opts: &Wild3GeneratorOptions, pid: u32) -> bool {
    if opts.filter.shiny {
        let generated_shiny = gen3_shiny(pid, opts.tid, opts.sid);
        if !generated_shiny {
            return false;
        }
    }

    if let Some(wanted_ability) = opts.filter.ability {
        let generated_ability = AbilityType::from_gen3_pid(pid);
        if generated_ability != wanted_ability {
            return false;
        }
    }

    if let Some(wanted_gender) = opts.filter.gender {
        let generated_gender = opts.gender_ratio.gender_from_pid(pid);
        if generated_gender != wanted_gender {
            return false;
        }
    }

    if let Some(wanted_nature) = opts.filter.nature {
        let nature = Nature::from_pid(pid);
        if nature != wanted_nature {
            return false;
        }
    }

    true
}

pub fn passes_ivs_filter(opts: &Wild3GeneratorOptions, ivs: &Ivs) -> bool {
    Ivs::filter(ivs, &opts.filter.min_ivs, &opts.filter.max_ivs)
}

pub fn create_if_passes_filter(
    opts: &Wild3GeneratorOptions,
    pid: u32,
    ivs: Ivs,
    method: Gen3Method,
    encounter_slot: EncounterSlot,
) -> Option<Wild3GeneratorResult> {
    if !passes_ivs_filter(opts, &ivs) {
        return None;
    }

    Some(Wild3GeneratorResult {
        pid,
        ivs,
        method,
        encounter_slot,
    })
}
