use crate::Ivs;
use crate::gen3::EncounterSlot;
use crate::gen3::Gen3Lead;
use crate::gen3::Gen3Method;
use crate::rng::Rng;
use crate::rng::lcrng::Pokerng;
use crate::{AbilityType, Gender, GenderRatio, Nature, PkmFilter, gen3_shiny};

pub struct Wild3GeneratorOptions {
    pub advance: usize,
    pub tid: u16,
    pub sid: u16,
    pub gender_ratio: GenderRatio,
    pub map_idx: usize,
    pub encounter_slot: Option<Vec<EncounterSlot>>,
    pub method: Gen3Method,
    pub lead: Option<Gen3Lead>,
    pub filter: PkmFilter,
}

#[derive(Debug, PartialEq)]
pub struct Wild3GeneratorResult {
    pub advance: usize,
    pub map_idx: usize,
    pub pid: u32,
    pub ivs: Ivs,
    pub ability: AbilityType,
    pub gender: Gender,
    pub nature: Nature,
    pub shiny: bool,
    pub encounter_slot: EncounterSlot,
    pub synch: bool,
    pub cute_charm: bool,
}

pub fn generate_gen3_wild(
    rng: &mut Pokerng,
    opts: &Wild3GeneratorOptions,
) -> Option<Wild3GeneratorResult> {
    let encounter_rand = ((rng.rand::<u32>() >> 16) % 100) as u8;
    let encounter_slot = EncounterSlot::from_rand(encounter_rand);

    if !EncounterSlot::passes_filter(opts.encounter_slot.as_deref(), encounter_slot) {
        return None;
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

    let nature_rand: u8;
    let mut is_synch = false;

    match opts.lead {
        Some(Gen3Lead::Synchronize(lead_nature)) => {
            if (rng.rand::<u16>() & 1) == 0 {
                nature_rand = lead_nature.into();
                is_synch = true;
            } else {
                nature_rand = (rng.rand::<u16>() % 25) as u8;
            }
        }
        _ => {
            nature_rand = (rng.rand::<u16>() % 25) as u8;
        }
    };

    let mut pid: u32;
    loop {
        let pid_low = rng.rand::<u16>() as u32;
        let pid_high = rng.rand::<u16>() as u32;
        pid = (pid_high << 16) | pid_low;
        if pid % 25 != nature_rand as u32 {
            continue;
        }
        if let Some(required_gender) = required_gender {
            let rate: u8 = (pid & 0xFF) as u8;
            let generated_mon_gender = opts.gender_ratio.gender(rate);
            if generated_mon_gender != required_gender {
                continue;
            }
        }
        break;
    }

    // PID-based filters
    let shiny = gen3_shiny(pid, opts.tid, opts.sid);
    if opts.filter.shiny && !shiny {
        return None;
    }

    let ability = AbilityType::from_gen3_pid(pid);
    if let Some(wanted_ability) = opts.filter.ability {
        if ability != wanted_ability {
            return None;
        }
    }
    let rate: u8 = (pid & 0xFF) as u8;
    let gender = GenderRatio::gender(&opts.gender_ratio, rate);
    if let Some(wanted_gender) = opts.filter.gender {
        if gender != wanted_gender {
            return None;
        }
    }

    let iv1: u16;
    let iv2: u16;

    match opts.method {
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

    if !Ivs::filter(&ivs, &opts.filter.min_ivs, &opts.filter.max_ivs) {
        return None;
    }

    let nature = Nature::from(nature_rand);
    if let Some(wanted_nature) = opts.filter.nature {
        if nature != wanted_nature {
            return None;
        }
    }

    Some(Wild3GeneratorResult {
        pid,
        shiny,
        ability,
        gender,
        ivs,
        nature,
        advance: opts.advance,
        map_idx: opts.map_idx,
        encounter_slot,
        synch: is_synch,
        cute_charm: required_gender.is_some(),
    })
}
