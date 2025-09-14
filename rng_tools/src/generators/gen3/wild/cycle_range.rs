use serde::{Deserialize, Serialize};
use tsify_next::Tsify;
use wasm_bindgen::prelude::*;

use super::calc_modulo_cycle_unsigned;

pub const BASE_LEAD_PID: u32 = 0;
pub const BASE_LEAD_PID_MOD_24_CYCLES: usize = calc_modulo_cycle_unsigned(BASE_LEAD_PID, 24);

#[derive(Debug, Clone, Copy, PartialEq, Tsify, Serialize, Deserialize)]
#[allow(non_camel_case_types)]
pub enum Moment {
    ChooseWildMonIndex_Land_Random,
    ChooseWildMonLevel_RandomLvl,
    PickWildMonNature_RandomTestSynchro,
    CreateWildMon_RandomTestCuteCharm,
    PickWildMonNature_RandomPickNature,
    CreateMonWithNature_RandomPidLowFirst,
    CreateMonWithNature_RandomPidHighLast,
    CreateBoxMon_RandomIvs1,
    CreateBoxMon_RandomIvs2,
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
    pub fn add_cycle(&mut self, cycle: usize) {
        self.cycle += cycle;
    }
    pub fn add_mod(&mut self, lead_pid_mod: usize) {
        self.cycle += lead_pid_mod * BASE_LEAD_PID_MOD_24_CYCLES;
        self.lead_pid_mod += lead_pid_mod;
    }
}

#[derive(Debug, Clone, Copy, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct CycleAndModAtMoment {
    pub cycle: usize,
    pub lead_pid_mod: usize,
    pub moment: Moment,
}

impl CycleAndModAtMoment {
    pub fn apply_lead_pid_speed(&self, lead_pid_speed: usize) -> CycleAtMoment {
        CycleAtMoment {
            cycle: self.cycle + lead_pid_speed * self.lead_pid_mod,
            moment: self.moment,
        }
    }
}

#[derive(Debug, Clone, Copy, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct CycleAtMoment {
    pub cycle: usize,
    pub moment: Moment,
}

impl CycleAtMoment {
    pub fn new(moment: Moment, cycle: usize) -> Self {
        Self { cycle, moment }
    }
}

#[derive(Debug, Default, Clone, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct CycleCounter {
    pub cycle: CycleAndModCount,
    pub cycle_at_moments: Vec<CycleAndModAtMoment>,
}

impl CycleCounter {
    pub fn add(&mut self, cycle: usize, lead_pid_mod: usize) {
        self.add_cycle(cycle);
        self.add_mod(lead_pid_mod);
    }
    pub fn add_cycle(&mut self, cycle: usize) {
        self.cycle.add_cycle(cycle);
    }
    pub fn add_mod(&mut self, lead_pid_mod: usize) {
        self.cycle.add_mod(lead_pid_mod);
    }
    pub fn on_moment_reached(&mut self, moment: Moment) {
        self.cycle_at_moments.push(CycleAndModAtMoment {
            cycle: self.cycle.cycle,
            lead_pid_mod: self.cycle.lead_pid_mod,
            moment,
        });
    }
}
