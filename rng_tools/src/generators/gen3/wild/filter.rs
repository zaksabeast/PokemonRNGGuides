use serde::{Deserialize, Serialize};
use tsify_next::Tsify;
use wasm_bindgen::prelude::*;

use crate::{
    AbilityType, GenderRatio, Nature, PkmFilter, Species,
    gen3::{calculate_pid_speed, get_probability_that_random_pid_has_speed_range},
    gen3_psv,
};

#[derive(Debug, Clone, Default, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct Gen3PidSpeedFilter {
    pub active: bool,
    pub min_cycle_count: usize,
    pub max_cycle_count: usize,
}

impl Gen3PidSpeedFilter {
    pub fn cycle_count_range(&self) -> Option<std::ops::RangeInclusive<usize>> {
        if !self.active {
            None
        } else {
            Some(self.min_cycle_count..=self.max_cycle_count)
        }
    }
}

#[derive(Debug, Clone, Default, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct Gen3PkmFilter {
    pub max_size: bool,
    pub lvl: Option<u8>,
    pub pid_speed: Gen3PidSpeedFilter,
    pub species: Option<Species>,
}

pub fn passes_pid_filter(
    filter: &PkmFilter,
    gen3_filter: &Gen3PkmFilter,
    encounter_gender_ratio: Option<GenderRatio>,
    pid: u32,
    tsv: u16,
) -> bool {
    if filter.shiny {
        let generated_shiny = gen3_psv(pid) == tsv;
        if !generated_shiny {
            return false;
        }
    }

    if let Some(wanted_nature) = filter.nature {
        let nature = Nature::from_pid(pid);
        if nature != wanted_nature {
            return false;
        }
    }

    if let Some(wanted_ability) = filter.ability {
        let generated_ability = AbilityType::from_gen3_pid(pid);
        if generated_ability != wanted_ability {
            return false;
        }
    }

    if let Some(wanted_gender) = filter.gender {
        if let Some(encounter_gender_ratio) = encounter_gender_ratio {
            let generated_gender = encounter_gender_ratio.gender_from_pid(pid);
            if generated_gender != wanted_gender {
                return false;
            }
        }
    }

    if gen3_filter.pid_speed.active {
        let pid_speed = calculate_pid_speed(pid);
        if pid_speed < gen3_filter.pid_speed.min_cycle_count
            || pid_speed > gen3_filter.pid_speed.max_cycle_count
        {
            return false;
        }
    }

    true
}

pub fn get_iv1_filter_restrictiveness(filter: &PkmFilter) -> f64 {
    let mut prob = 1_f64;
    prob *= (filter.max_ivs.hp - filter.min_ivs.hp + 1) as f64 / 32_f64;
    prob *= (filter.max_ivs.atk - filter.min_ivs.atk + 1) as f64 / 32_f64;
    prob *= (filter.max_ivs.def - filter.min_ivs.def + 1) as f64 / 32_f64;
    prob
}

pub fn get_iv2_filter_restrictiveness(filter: &PkmFilter) -> f64 {
    let mut prob = 1_f64;
    prob *= (filter.max_ivs.spa - filter.min_ivs.spa + 1) as f64 / 32_f64;
    prob *= (filter.max_ivs.spd - filter.min_ivs.spd + 1) as f64 / 32_f64;
    prob *= (filter.max_ivs.spe - filter.min_ivs.spe + 1) as f64 / 32_f64;
    prob
}

pub fn get_pid_filter_restrictiveness(
    filter: &PkmFilter,
    gen3_filter: &Gen3PkmFilter,
    encounter_gender_ratio: Option<GenderRatio>,
) -> f64 {
    let mut prob = 1_f64;

    if filter.shiny {
        prob /= 8192_f64;
    }
    if filter.ability.is_some() {
        prob /= 2_f64;
    }

    if let Some(encounter_gender_ratio) = encounter_gender_ratio {
        if let Some(wanted_gender) = filter.gender {
            prob *= encounter_gender_ratio.gender_probability(wanted_gender);
        }
    }

    if filter.nature.is_some() {
        prob /= 2_f64; //assuming synchronize lead
    }

    if gen3_filter.pid_speed.active {
        prob *= get_probability_that_random_pid_has_speed_range(
            gen3_filter.pid_speed.min_cycle_count,
            gen3_filter.pid_speed.max_cycle_count,
        );
    }
    prob
}

pub fn get_iv_filter_restrictiveness(filter: &PkmFilter) -> f64 {
    let mut prob = 1_f64;
    prob *= get_iv1_filter_restrictiveness(filter);
    prob *= get_iv2_filter_restrictiveness(filter);

    if filter.hidden_power.active {
        // approximative. odds depends on ivs.
        prob *= (filter.hidden_power.pokemon_types.len() as f64) / 18_f64;
    }
    prob
}

pub fn get_filter_restrictiveness(
    filter: &PkmFilter,
    gen3_filter: &Gen3PkmFilter,
    encounter_gender_ratio: Option<GenderRatio>,
) -> f64 {
    let mut prob = get_iv_filter_restrictiveness(filter);
    prob *= get_pid_filter_restrictiveness(filter, gen3_filter, encounter_gender_ratio);

    if gen3_filter.max_size {
        prob /= 32768_f64;
    }

    // TODO: display that restrictiveness to the user.
    // TODO: detect if the filter is impossible to respect. ex: pid speed 18 cycles and Quirky nature

    prob
}
