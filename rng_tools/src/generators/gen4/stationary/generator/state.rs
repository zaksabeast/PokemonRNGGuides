use crate::{AbilityType, Characteristic, Gender, Ivs, Nature, PkmState, Species, gen3_shiny};
use serde::{Deserialize, Serialize};
use tsify::Tsify;
use wasm_bindgen::prelude::*;

#[derive(Debug, Clone, Copy, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct Gen4StaticPokemon {
    pub pid: u32,
    pub shiny: bool,
    pub level: u8,
    pub ability: AbilityType,
    pub gender: Gender,
    pub ivs: Ivs,
    pub nature: Nature,
    pub advance: usize,
    pub characteristic: Characteristic,
    pub encounter_slot: u8,
}

impl Gen4StaticPokemon {
    pub fn new(
        tid: u16,
        sid: u16,
        species: Species,
        level: u8,
        pid: u32,
        ivs: Ivs,
        encounter_slot: u8,
    ) -> Self {
        Self {
            pid,
            level,
            shiny: gen3_shiny(pid, tid, sid),
            ability: AbilityType::from_gen3_pid(pid),
            gender: species.gender_from_pid(pid),
            characteristic: Characteristic::new(pid, &ivs),
            ivs,
            nature: Nature::from_pid(pid),
            advance: 0,
            encounter_slot,
        }
    }
}

impl PkmState for Gen4StaticPokemon {
    fn ability(&self) -> AbilityType {
        self.ability
    }

    fn gender(&self) -> Gender {
        self.gender
    }

    fn ivs(&self) -> &Ivs {
        &self.ivs
    }

    fn nature(&self) -> Nature {
        self.nature
    }

    fn shiny(&self) -> bool {
        self.shiny
    }

    fn pid(&self) -> u32 {
        self.pid
    }
}
