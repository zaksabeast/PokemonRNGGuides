mod ability;
mod gender;
mod gender_ratio;
mod nature;
mod shiny;
mod species;

use crate::{IvFilter, Ivs};
pub use ability::*;
pub use gender::*;
pub use gender_ratio::*;
pub use nature::*;
use serde::{Deserialize, Serialize};
pub use shiny::*;
pub use species::*;
use tsify_next::Tsify;

#[derive(Debug, Clone, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct PkmFilter {
    pub shiny: bool,
    pub nature: Option<Nature>,
    pub gender: Option<Gender>,
    pub ivs: IvFilter,
    pub ability: Option<AbilityType>,
}

impl PkmFilter {
    pub fn pass_filter(&self, state: &impl PkmState) -> bool {
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

        if !state.ivs().filter(&self.ivs.min_ivs, &self.ivs.max_ivs) {
            return false;
        }

        if let Some(ability) = self.ability {
            if ability != state.ability() {
                return false;
            }
        }

        true
    }
}

pub trait PkmState {
    fn shiny(&self) -> bool;
    fn nature(&self) -> Nature;
    fn ivs(&self) -> &Ivs;
    fn ability(&self) -> AbilityType;
    fn gender(&self) -> Gender;
}
