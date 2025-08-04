use super::{calc_modulo_cycle_unsigned};

use serde::{Deserialize, Serialize};
use tsify_next::Tsify;
use wasm_bindgen::prelude::*;

pub const BASE_LEAD_PID: u32 = 0;
pub const BASE_LEAD_PID_MOD_24_CYCLES: usize = calc_modulo_cycle_unsigned(BASE_LEAD_PID, 24);
pub const BASE_LEAD_PID_MOD_25_CYCLES: usize = calc_modulo_cycle_unsigned(BASE_LEAD_PID, 25);

pub enum Reason {
    BetweenSweetScentWildEncounterAndChooseWildMonIndexLand = 0,
    betweenChooseWildMonIndex_LandandChooseWildMonLevel = 1,
    encounter_rand_val_mod_100,
    calc_modulo_cycle_s_lvl_range_rand_val_lvl_range,
    between_ChooseWildMonLevel_and_CreateWildMon_CuteCharmCheck,
    nature_rand_val_mod_25,
    between_PickWildMonNature_ifNotSynchro_and_CreateMonWithNature_pidlow,
    between_PickWildMonNature_pickRandom_and_CreateMonWithNature_pidlow,
    between_PickWildMonNature_pickRandom_and_CreateMonWithNature_pidlow_synchro_success,
    between_PickWildMonNature_pickRandom_and_CreateMonWithNature_pidlow_synchro_fail,
    between_CreateMonWithNature_pidlow_and_CreateMonWithNature_pidhigh,
    retry_pid_cycle_pid_mod_25,
    cute_charm_rand_val_mod_3,
    CreateWildMon_CuteCharmRandom_and_PickWildMonNature_pickRandom_cute_charm_triggered,
    CreateWildMon_CuteCharmRandom_and_PickWildMonNature_pickRandom_cute_charm_not_triggered,
    between_CreateMonWithNature_pidhigh_and_CreateBoxMon_ivs1,
    between_CreateBoxMon_ivs1_and_CreateBoxMon_ivs2,

}

#[derive(Default, Debug, Clone, Copy, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct CycleAndModCount {
    pub cycle: usize,
    pub lead_pid_mod: usize,
}

#[derive(Debug, Clone, Copy, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct CycleRange<T> {
    pub start: T,
    pub len: usize,
}

pub type CycleAndModRange = CycleRange<CycleAndModCount>;

impl<T> CycleRange<T> {
    pub fn from_start_len(start: T, len: usize) -> CycleRange<T> {
        CycleRange { start, len }
    }
}

impl CycleRange<usize> {
    pub fn end(&self) -> usize {
        self.start + self.len
    }
    pub fn from_start_end(start: usize, end: usize) -> CycleRange<usize> {
        CycleRange {
            start,
            len: end - start,
        }
    }
    pub fn set_end(&mut self, end: usize) {
        self.len = end - self.start;
    }
}

impl CycleAndModRange {
    pub fn end(&self) -> CycleAndModCount {
        CycleAndModCount {
            cycle: self.start.cycle + self.len,
            lead_pid_mod: self.start.lead_pid_mod,
        }
    }
    pub fn new(cycle: usize, modulo: usize, len: usize) -> CycleAndModRange {
        CycleRange {
            start: CycleAndModCount {
                cycle,
                lead_pid_mod: modulo,
            },
            len,
        }
    }
    pub fn apply_mod_cycle_count(&self, pid_cycle_count: usize) -> CycleRange<usize> {
        CycleRange::<usize> {
            start: self
                .start
                .cycle
                .saturating_add(self.start.lead_pid_mod * pid_cycle_count),
            len: self.len,
        }
    }
}

impl CycleAndModCount {
    pub fn add(&mut self, cycle: usize, lead_pid_mod:usize) {
        self.cycle += cycle;
        self.cycle += lead_pid_mod * BASE_LEAD_PID_MOD_24_CYCLES;
        self.lead_pid_mod += lead_pid_mod;
    }
}

#[derive(Debug, Default, Clone, Copy, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct CycleRangeByReason {
    pub total_cycle_range: CycleAndModCount,   
    pub cycle_ranges_by_reason: [CycleAndModCount;17],    
}

impl CycleRangeByReason {
    pub fn add(&mut self, cycle: usize, lead_pid_mod:usize, reason: Reason) {
        self.total_cycle_range.add(cycle, lead_pid_mod);
        
        self.cycle_ranges_by_reason[reason as usize].add(cycle, lead_pid_mod);
    }
}
