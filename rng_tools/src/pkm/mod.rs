mod ability;
mod ability_type;
mod characteristic;
mod encounter;
mod gender;
mod gender_ratio;
mod hidden_power;
mod nature;
mod personal;
mod pokeblock;
mod pokemon_type;
mod shiny;
mod size;
mod species;
mod stat;

use crate::Ivs;
pub use ability::*;
pub use ability_type::*;
pub use characteristic::*;
pub use encounter::*;
pub use gender::*;
pub use gender_ratio::*;
pub use hidden_power::*;
pub use nature::*;
pub use pokeblock::*;
pub use pokemon_type::*;
use serde::{Deserialize, Serialize};
pub use shiny::*;
pub use size::*;
pub use species::*;
pub use stat::*;
use tsify::Tsify;

#[derive(Debug, Clone, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct PkmFilter {
    pub shiny: bool,
    pub nature: Option<[bool; NATURE_COUNT]>,
    pub gender: Option<Gender>,
    pub min_ivs: Ivs,
    pub max_ivs: Ivs,
    pub ability: Option<AbilityType>,
    pub hidden_power: HiddenPowerFilter,
}

impl Default for PkmFilter {
    fn default() -> Self {
        PkmFilter::new_allow_all()
    }
}

impl PkmFilter {
    pub fn new_allow_all() -> Self {
        Self {
            shiny: false,
            nature: None,
            gender: None,
            min_ivs: Ivs::new_all0(),
            max_ivs: Ivs::new_all31(),
            ability: None,
            hidden_power: HiddenPowerFilter::default(),
        }
    }

    pub fn has_nature_filter(&self) -> bool {
        self.nature.is_some()
    }

    pub fn nature_filter_allows(&self, nature: Nature) -> bool {
        match self.nature {
            Some(mask) => {
                let idx: u8 = nature.into();
                mask[idx as usize]
            }
            None => true,
        }
    }

    pub fn permitted_natures_iter(&self) -> impl Iterator<Item = Nature> + '_ {
        (0..NATURE_COUNT as u8).filter_map(|idx| {
            let nature = idx.into();
            self.nature_filter_allows(nature).then_some(nature)
        })
    }

    pub fn pass_filter(&self, state: &impl PkmState) -> bool {
        if !state.ivs().filter(&self.min_ivs, &self.max_ivs) {
            return false;
        }

        self.pass_filter_no_ivs(state)
    }

    pub fn pass_filter_no_ivs(&self, state: &impl PkmState) -> bool {
        if self.shiny && !state.shiny() {
            return false;
        }

        if !self.nature_filter_allows(state.nature()) {
            return false;
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

        if !self.pass_filter_hidden_power(state.ivs()) {
            return false;
        }

        true
    }

    pub fn pass_filter_hidden_power(&self, ivs: &Ivs) -> bool {
        self.hidden_power.pass_filter(ivs)
    }
}

pub trait PkmState {
    fn pid(&self) -> u32;
    fn shiny(&self) -> bool;
    fn nature(&self) -> Nature;
    fn ivs(&self) -> &Ivs;
    fn ability(&self) -> AbilityType;
    fn gender(&self) -> Gender;
}
