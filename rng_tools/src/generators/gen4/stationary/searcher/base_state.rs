use crate::{
    AbilityType, Characteristic, Gender, Ivs, Nature, PkmState, Species, gen3_shiny,
    gen4::{LeadAbility, seed_time4::SeedTime4},
};
use serde::{Deserialize, Serialize};
use tsify::Tsify;
use wasm_bindgen::prelude::*;

#[derive(Debug, Clone, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct BaseStatic4State {
    pub seed: u32,
    pub advance: usize,
    pub pid: u32,
    pub ivs: Ivs,
    pub ability: AbilityType,
    pub gender: Gender,
    pub nature: Nature,
    pub shiny: bool,
    pub characteristic: Characteristic,
    pub lead: LeadAbility,
}

impl BaseStatic4State {
    /// All parameters are tightly coupled inputs needed to construct the complete state.
    /// Wrapping them in a struct would add boilerplate without improving clarity.
    #[allow(clippy::too_many_arguments)]
    pub fn new(
        seed: u32,
        species: Species,
        nature: Nature,
        pid: u32,
        tid: u16,
        sid: u16,
        ivs: Ivs,
        lead: LeadAbility,
    ) -> Self {
        Self {
            ivs,
            seed,
            nature,
            pid,
            lead,
            advance: 0,
            shiny: gen3_shiny(pid, tid, sid),
            ability: AbilityType::from_gen3_pid(pid),
            characteristic: Characteristic::new(pid, &ivs),
            gender: species.gender_from_pid(pid),
        }
    }

    pub fn add_seedtime(&self, advance: usize, seed_time: SeedTime4) -> Static4State {
        let mut state = self.clone();
        state.advance = advance;
        state.seed = seed_time.seed;
        Static4State { state, seed_time }
    }
}

impl PkmState for BaseStatic4State {
    fn ability(&self) -> crate::AbilityType {
        self.ability
    }

    fn gender(&self) -> crate::Gender {
        self.gender
    }

    fn ivs(&self) -> &crate::Ivs {
        &self.ivs
    }

    fn nature(&self) -> crate::Nature {
        self.nature
    }

    fn shiny(&self) -> bool {
        self.shiny
    }

    fn pid(&self) -> u32 {
        self.pid
    }
}

#[derive(Debug, Clone, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct Static4State {
    pub state: BaseStatic4State,
    pub seed_time: SeedTime4,
}

impl PartialEq<BaseStatic4State> for Static4State {
    fn eq(&self, other: &BaseStatic4State) -> bool {
        &self.state == other
    }
}
