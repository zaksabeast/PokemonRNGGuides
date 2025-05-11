use crate::gen3::EncounterSlot;
use crate::gen3::Gen3Ability;
use crate::gen3::Gen3Lead;
use crate::gen3::Gen3Method;
use crate::gen3::ShinyType;
use crate::generators::gen3::wild::methods::MultiFilter;
use crate::generators::gen3::wild::methods::SingleFilter;
use crate::rng::Lcrng;
use crate::rng::lcrng::Pokerng;
use crate::rng::{Rng, StateIterator};
use crate::{Gender, GenderRatio, Nature, PkmFilter, gen3_shiny};
use crate::{IvFilter, Ivs};

use Gen3Ability as Ability;
use GenderRatio as get_gender;
use PkmFilter as Pokemon;

#[derive(Clone, Debug)]
pub struct Gen3WOpts {
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
    shiny_type: Vec<ShinyType>,
    nature_multiselect: Vec<Nature>,
    gen3_ability: Ability,
    encounter_slot: Option<EncounterSlot>,
    gender_ratio: GenderRatio,
    gender: Gender,
}

pub fn generate_pokemon(mut rng: Lcrng, settings: &Gen3WOpts) -> Option<Pokemon> {
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

    let shiny_bool = gen3_shiny(pid, settings.tid, settings.sid);
    let shiny = if shiny_bool {
        ShinyType::Star
    } else {
        ShinyType::NotShiny
    };
    if !ShinyType::passes_filter(&settings.shiny_type, Some(shiny)) {
        return None;
    }

    let ability = if (pid & 1) == 0 {
        Gen3Ability::Ability0
    } else {
        Gen3Ability::Ability1
    };
    if !Gen3Ability::passes_filter(Some(settings.gen3_ability), ability) {
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

    if !check_ivs(&ivs, &settings.min_iv(), &settings.max_iv()) {
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
