mod ability;
mod gender;
mod gender_ratio;
mod nature;
mod shiny;
mod species;
mod stat_calculator;

use crate::{Ivs, StatFilter};
pub use ability::*;
pub use gender::*;
pub use gender_ratio::*;
pub use nature::*;
use serde::{Deserialize, Serialize};
pub use shiny::*;
pub use species::*;
use tsify_next::Tsify;
pub use stat_calculator::{gen3_calculate_non_hp, gen3_calculate_hp};

#[derive(Debug, Clone, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct PkmFilter {
    pub shiny: bool,
    pub nature: Option<Nature>,
    pub gender: Option<Gender>,
    pub min_ivs: Ivs,
    pub max_ivs: Ivs,
    pub ability: Option<AbilityType>,
    pub stats: Option<StatFilter>,
}

impl PkmFilter {
    pub fn pass_filter(&self, state: &impl PkmState) -> bool {
        if !self.pass_filter_no_ivs(state) {
            return false;
        }

        if !state.ivs().filter(&self.min_ivs, &self.max_ivs) {
            return false;
        }

        if !self.pass_filter_stats(state) {
            return false;
        }

        self.pass_filter_no_ivs(state)
    }

    pub fn pass_filter_no_ivs(&self, state: &impl PkmState) -> bool {
        if self.shiny && !state.shiny() {
            return false;
        }

        if let Some(nature) = self.nature {
            if state.nature() != nature {
                return false;
            }
        }

        if let Some(gender) = self.gender {
            if state.gender() != gender {
                return false;
            }
        }

        if let Some(ability) = self.ability {
            if ability != state.ability() {
                return false;
            }
        }

        true
    }


    pub fn pass_filter_stats(&self, state: &impl PkmState) -> bool {
        match (&self.stats) {
            None => { true },
            Some(stats_filter) => {
                let base_stats = &stats_filter.base_stats;
                let min_stats = &stats_filter.min_stats;
                let max_stats = &stats_filter.max_stats;
                let lvl = stats_filter.lvl;

                let ivs = state.ivs();
                let actual_hp = gen3_calculate_hp(base_stats.hp, ivs.hp, 0, lvl);
                if actual_hp < min_stats.hp || actual_hp > max_stats.hp {
                    return false;
                }

                let nature = state.nature();
                let nature_factors = &NATURE_STAT_FACTORS[nature as usize];

                let actual_atk = gen3_calculate_non_hp(base_stats.atk, ivs.atk, 0, lvl, nature_factors.atk);
                if actual_atk < min_stats.atk || actual_atk > max_stats.atk {
                    return false;
                }

                let actual_def = gen3_calculate_non_hp(base_stats.def, ivs.def, 0, lvl, nature_factors.def);
                if actual_def < min_stats.def || actual_def > max_stats.def {
                    return false;
                }

                let actual_spa = gen3_calculate_non_hp(base_stats.spa, ivs.spa, 0, lvl, nature_factors.spa);
                if actual_spa < min_stats.spa || actual_spa > max_stats.spa {
                    return false;
                }

                let actual_spd = gen3_calculate_non_hp(base_stats.spd, ivs.spd, 0, lvl, nature_factors.spd);
                if actual_spd < min_stats.spd || actual_spd > max_stats.spd {
                    return false;
                }

                let actual_spe = gen3_calculate_non_hp(base_stats.spe, ivs.spe, 0, lvl, nature_factors.spe);
                if actual_spe < min_stats.spe || actual_spe > max_stats.spe {
                    return false;
                }

                true
            }
        }
    }
}

pub trait PkmState {
    fn shiny(&self) -> bool;
    fn nature(&self) -> Nature;
    fn ivs(&self) -> &Ivs;
    fn ability(&self) -> AbilityType;
    fn gender(&self) -> Gender;
}
