use super::{Gender, Species};
use serde::{Deserialize, Serialize};
use tsify_next::Tsify;
use wasm_bindgen::prelude::*;

#[derive(Debug, Default, Clone, Copy, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
#[repr(u8)]
pub enum GenderRatio {
    Genderless = 255,
    FemaleOnly = 254,
    MaleOnly = 0,
    OneToSeven = 31,
    OneToThree = 63,
    #[default]
    OneToOne = 127,
    ThreeToOne = 191,
    SevenToOne = 225,
}

#[wasm_bindgen]
pub fn get_species_gender_ratio(species: Species) -> GenderRatio {
    species.base_personal().gender_ratio
}

impl GenderRatio {
    pub fn gender(&self, rate: u8) -> Gender {
        match self {
            GenderRatio::Genderless => Gender::Genderless,
            GenderRatio::MaleOnly => Gender::Male,
            GenderRatio::FemaleOnly => Gender::Female,
            &ratio => {
                if rate < (ratio as u8) {
                    Gender::Female
                } else {
                    Gender::Male
                }
            }
        }
    }

    pub fn gender_probability(&self, gender: Gender) -> f64 {
        match self {
            GenderRatio::Genderless => match gender {
                Gender::Genderless => 1f64,
                _ => 0f64,
            },
            GenderRatio::MaleOnly => match gender {
                Gender::Male => 1f64,
                _ => 0f64,
            },
            GenderRatio::FemaleOnly => match gender {
                Gender::Female => 1f64,
                _ => 0f64,
            },
            &ratio => match gender {
                Gender::Genderless => 0f64,
                Gender::Male => (256f64 - (ratio as u8 as f64)) / 256f64,
                Gender::Female => (ratio as u8 as f64) / 256f64,
            },
        }
    }

    pub fn gender_from_pid(&self, pid: u32) -> Gender {
        self.gender((pid & 0xFF) as u8)
    }

    pub fn has_multiple_genders(&self) -> bool {
        !matches!(
            self,
            GenderRatio::Genderless | GenderRatio::MaleOnly | GenderRatio::FemaleOnly
        )
    }
}
