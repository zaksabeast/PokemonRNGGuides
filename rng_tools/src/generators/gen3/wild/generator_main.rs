use serde::{Deserialize, Serialize};
use tsify::Tsify;
use wasm_bindgen::prelude::*;

use crate::{
    Ivs, PkmFilter,
    gen3::{
        CycleAndModCount, CycleAndModRange, CycleFrameCounter, CycleRange, Gen3Lead, Gen3Method,
        Gen3PkmFilter, Wild3Action, Wild3EncounterIndex, Wild3FeebasState, Wild3MapGameData,
        Wild3MassOutbreakState, Wild3RoamerState, Wild3SafariPokeblockGenOpt, generate_wild3_new,
    },
    rng::lcrng::Pokerng,
};

pub const INFINITE_CYCLE: usize = 10_000_000;
pub const VBLANK_FREQ: usize = 280_896;

#[derive(Debug, Clone, Default, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub enum Wild3GeneratorCycleOpts {
    #[default]
    Inactive,
    Searching {
        generate_even_if_impossible: bool,
        consider_rng_manipulated_lead_pid: bool,
    },
    LikelihoodForLead {
        lead_cycle_spd: usize,
    },
    CycleAtMomentNoEmuLog {
        lead_cycle_spd: usize,
    },
    CycleAtMomentWithEmuLog {
        lead_cycle_spd: usize,
        initial_cycle_at_sweet_scent: usize,
        vblank_cycles: Vec<usize>,
    },
}

impl Wild3GeneratorCycleOpts {
    pub fn likelihood_lead_cycle_spd(&self) -> Option<usize> {
        match self {
            Self::LikelihoodForLead { lead_cycle_spd } => Some(*lead_cycle_spd),
            _ => None,
        }
    }
}

#[derive(Debug, Clone, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct Wild3GeneratorOptions {
    pub tid: u16,
    pub sid: u16,
    pub map_idx: usize,
    pub action: Wild3Action,
    pub methods: Vec<Gen3Method>,
    pub lead: Gen3Lead,
    pub filter: PkmFilter,
    pub gen3_filter: Gen3PkmFilter,
    pub cycle_opts: Wild3GeneratorCycleOpts,
    pub roamer_state: Wild3RoamerState,
    pub mass_outbreak_state: Wild3MassOutbreakState,
    pub feebas_state: Wild3FeebasState,
    pub feebas_cycles: usize,
    pub using_white_flute: bool,
    pub safari_pokeblock: Option<Wild3SafariPokeblockGenOpt>,
}

impl Default for Wild3GeneratorOptions {
    fn default() -> Self {
        Self {
            tid: 0,
            sid: 0,
            map_idx: 0,
            action: Wild3Action::default(),
            methods: vec![],
            lead: Gen3Lead::default(),
            filter: PkmFilter::default(),
            gen3_filter: Gen3PkmFilter::default(),
            cycle_opts: Wild3GeneratorCycleOpts::default(),
            roamer_state: Wild3RoamerState::default(),
            mass_outbreak_state: Wild3MassOutbreakState::default(),
            feebas_state: Wild3FeebasState::default(),
            feebas_cycles: 0,
            using_white_flute: true,
            safari_pokeblock: None,
        }
    }
}

#[derive(Clone, Debug, Default, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct Wild3GeneratorMonResult {
    pub encounter_idx: Wild3EncounterIndex,
    pub pid: u32,
    pub ivs: Ivs,
    pub lvl: u8,
    pub method: Gen3Method,
    pub cycle_range: Option<CycleRange<CycleAndModCount>>,
    pub used_safari_pokeblock: Option<[u8; 5]>,
}

impl Wild3GeneratorMonResult {
    pub fn clone_with_cycle_end(&self, cycle_end: usize) -> Self {
        if let Some(cycle_range) = self.cycle_range {
            let new_cycle_range = CycleAndModRange {
                start: cycle_range.start,
                len: cycle_end - cycle_range.start.cycle,
            };
            Self {
                cycle_range: Some(new_cycle_range),
                ..self.clone()
            }
        } else {
            self.clone()
        }
    }
}

#[derive(Clone, Debug, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct Wild3GeneratorResults {
    pub mon_results: Vec<Wild3GeneratorMonResult>,
    pub cycle_counter: CycleFrameCounter,
}

impl Wild3GeneratorResults {
    pub fn empty() -> Wild3GeneratorResults {
        Wild3GeneratorResults {
            mon_results: vec![],
            cycle_counter: CycleFrameCounter::Inactive,
        }
    }
}

#[wasm_bindgen]
pub fn generate_wild3_wasm(
    initial_seed: u32,
    advances: usize,
    opts: &Wild3GeneratorOptions,
    map_data: &Wild3MapGameData,
) -> Wild3GeneratorResults {
    generate_wild3(Pokerng::with_jump(initial_seed, advances), opts, map_data)
}

// Entry point
pub fn generate_wild3(
    rng: Pokerng,
    opts: &Wild3GeneratorOptions,
    map_data: &Wild3MapGameData,
) -> Wild3GeneratorResults {
    generate_wild3_new(rng, opts, map_data)
}
