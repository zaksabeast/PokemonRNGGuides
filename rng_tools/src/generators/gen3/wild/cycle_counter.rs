use serde::{Deserialize, Serialize};
use tsify::Tsify;
use wasm_bindgen::prelude::*;

use crate::gen3::{
    BASE_LEAD_PID_MOD_24_CYCLES, COMMON_LEAD_RANGE, CycleAndModRange, FASTEST_MODULO_CYCLE_24,
    Gen3Lead, INFINITE_CYCLE, Moment, SLOWEST_MODULO_CYCLE_24, VBLANK_FREQ,
    Wild3GeneratorCycleOpts, Wild3GeneratorOptions, get_min_mid_max_pre_sweet_scent_cycle,
    get_min_mid_max_vblank_cycle_duration,
};

#[derive(Default, Debug, Clone, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub enum CycleFrameCounterOption {
    #[default]
    Inactive,
    MinMaxRange,
    DetailedBreakdown {
        lead_cycle_spd: usize,
        initial_cycle_frame: CycleFrame,
        vblank_cycles: Vec<usize>,
    },
}

#[derive(Default, Debug, Clone, Copy, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct CycleFrame {
    pub cycle: usize,
    pub frame: usize,
}

#[derive(Debug, Clone, Copy, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct CycleFrameMoment {
    pub cycle: usize,
    pub frame: usize,
    pub moment: Moment,
}

impl CycleFrame {
    pub fn add_cycle(&mut self, cycle: usize) {
        self.cycle += cycle;
        while self.cycle > VBLANK_FREQ {
            self.cycle -= VBLANK_FREQ;
            self.frame += 1;
        }
    }
}

#[derive(Debug, Clone, Copy, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct MinMaxCycleFrame {
    // assumes min_lead_cycle_spd
    pub min_cycle: CycleFrame,
    // assumes max_lead_cycle_spd
    pub max_cycle: CycleFrame,
    pub min_lead_cycle_spd: usize,
    pub max_lead_cycle_spd: usize,
}

impl MinMaxCycleFrame {
    pub fn new_inactive() -> Self {
        Self {
            min_cycle: CycleFrame { cycle: 0, frame: 0 },
            max_cycle: CycleFrame { cycle: 0, frame: 0 },
            min_lead_cycle_spd: 0,
            max_lead_cycle_spd: 0,
        }
    }

    pub fn min_max_lead_cycle_spd(
        is_egg_lead: bool,
        consider_rng_manipulated_lead_pid: bool,
        lead_cycle_spd: Option<usize>,
    ) -> (usize, usize) {
        if let Some(lead_cycle_spd) = lead_cycle_spd {
            return (lead_cycle_spd, lead_cycle_spd);
        }
        if is_egg_lead {
            return (0, 0);
        }
        if consider_rng_manipulated_lead_pid {
            return (FASTEST_MODULO_CYCLE_24, SLOWEST_MODULO_CYCLE_24);
        }

        (COMMON_LEAD_RANGE.start, COMMON_LEAD_RANGE.end)
    }
    pub fn new(min_max_initial_cycle: (usize, usize), min_max_lead_spd: (usize, usize)) -> Self {
        Self {
            min_cycle: CycleFrame {
                cycle: min_max_initial_cycle.0,
                frame: 0,
            },
            max_cycle: CycleFrame {
                cycle: min_max_initial_cycle.1,
                frame: 0,
            },
            min_lead_cycle_spd: min_max_lead_spd.0,
            max_lead_cycle_spd: min_max_lead_spd.1,
        }
    }
    pub fn add_cycle(&mut self, cycle: usize) {
        self.min_cycle.add_cycle(cycle);
        self.max_cycle.add_cycle(cycle);
    }
    pub fn add_mod(&mut self, lead_pid_mod: usize) {
        self.min_cycle
            .add_cycle(lead_pid_mod * self.min_lead_cycle_spd);
        self.max_cycle
            .add_cycle(lead_pid_mod * self.max_lead_cycle_spd);
    }
    pub fn can_vblank_occur_soon(&self, cycle_range: usize) -> bool {
        if self.max_cycle.frame > self.min_cycle.frame {
            return true;
        }
        self.max_cycle.cycle > VBLANK_FREQ - cycle_range
    }
}

#[derive(Debug, Clone, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub enum CycleFrameCounter {
    // Ignore cycle counting. All methods are possibles and likelihood can't be determined.
    Inactive,

    // The main goal is to determine whether a method can be triggered.
    // A method can be triggered if all of the leads between min_lead_cycle_spd and max_lead_cycle_spd
    // can trigger the method for at least one given initial cycle.
    // Note: If there's a valid initial cycle for fastest and slowest lead, there's a valid initial cycle for all lead inbetween.
    // This is the equivalent of ensuring that the slowest lead can trigger the method on the earliest initial cycle
    // and the fastest lead can trigger it on the latest initial cycle.
    // It also gives approximative likelihood for each method.
    CheckValidAllLeadSpds {
        min_lead_cycle_spd: usize,
        max_lead_cycle_spd: usize,
        // Cycles assuming earliest initial timing with the slowest lead
        earliest_slowest_cycle: usize,
        // Cycles assuming latest initial timing with the fastest lead
        latest_fastest_cycle: usize,
        cycle_instability: f32,
        base_cycle_count: usize,
        lead_pid_mod_count: usize,
    },

    // The main goal is to determine whether a method can be triggered or not.
    // It also gives approximative likelihood for each method.
    MinMaxRange {
        min_max_cycles: MinMaxCycleFrame,
        cycle_instability: f32,
        base_cycle_count: usize,
        lead_pid_mod_count: usize,
        generate_even_if_impossible: bool,
    },

    // It is used to debug issues with the cycle counter, by reproducing a very specific case then
    // comparing each CycleFrameMoment of the rust generator with the CycleFrameMoment generated by
    // the emulated game (extracted via a lua script).
    DetailedBreakdown {
        lead_cycle_spd: usize,
        current_cycle: CycleFrame,
        vblank_cycles: Vec<usize>,
        cycle_at_moments: Vec<CycleFrameMoment>,
    },
}

impl CycleFrameCounter {
    pub fn new(opts: &Wild3GeneratorOptions) -> Self {
        match &opts.cycle_opts {
            Wild3GeneratorCycleOpts::Inactive => CycleFrameCounter::Inactive,
            Wild3GeneratorCycleOpts::Searching {
                generate_even_if_impossible,
                consider_rng_manipulated_lead_pid,
            } => {
                let min_mid_max_initial = get_min_mid_max_pre_sweet_scent_cycle(opts.action);
                if !*consider_rng_manipulated_lead_pid && !*generate_even_if_impossible {
                    let (min_lead_cycle_spd, max_lead_cycle_spd) =
                        MinMaxCycleFrame::min_max_lead_cycle_spd(
                            opts.lead == Gen3Lead::Egg,
                            false,
                            None,
                        );
                    return CycleFrameCounter::CheckValidAllLeadSpds {
                        min_lead_cycle_spd,
                        max_lead_cycle_spd,
                        earliest_slowest_cycle: min_mid_max_initial.0,
                        latest_fastest_cycle: min_mid_max_initial.2,
                        cycle_instability: 0.0,
                        base_cycle_count: 0,
                        lead_pid_mod_count: 0,
                    };
                }
                CycleFrameCounter::MinMaxRange {
                    min_max_cycles: MinMaxCycleFrame::new(
                        (min_mid_max_initial.0, min_mid_max_initial.2),
                        MinMaxCycleFrame::min_max_lead_cycle_spd(
                            opts.lead == Gen3Lead::Egg,
                            true,
                            None,
                        ),
                    ),
                    cycle_instability: 0.0,
                    base_cycle_count: 0,
                    lead_pid_mod_count: 0,
                    generate_even_if_impossible: *generate_even_if_impossible,
                }
            }
            Wild3GeneratorCycleOpts::LikelihoodForLead { lead_cycle_spd } => {
                let min_mid_max_initial = get_min_mid_max_pre_sweet_scent_cycle(opts.action);
                CycleFrameCounter::MinMaxRange {
                    min_max_cycles: MinMaxCycleFrame::new(
                        (min_mid_max_initial.0, min_mid_max_initial.2),
                        (*lead_cycle_spd, *lead_cycle_spd),
                    ),
                    cycle_instability: 0.0,
                    base_cycle_count: 0,
                    lead_pid_mod_count: 0,
                    generate_even_if_impossible: true,
                }
            }
            Wild3GeneratorCycleOpts::CycleAtMomentNoEmuLog { lead_cycle_spd } => {
                CycleFrameCounter::DetailedBreakdown {
                    lead_cycle_spd: *lead_cycle_spd,
                    current_cycle: CycleFrame {
                        cycle: get_min_mid_max_pre_sweet_scent_cycle(opts.action).1,
                        frame: 0,
                    },
                    vblank_cycles: vec![], // will use average vblank
                    cycle_at_moments: vec![],
                }
            }
            Wild3GeneratorCycleOpts::CycleAtMomentWithEmuLog {
                lead_cycle_spd,
                initial_cycle_at_sweet_scent,
                vblank_cycles,
            } => CycleFrameCounter::DetailedBreakdown {
                lead_cycle_spd: *lead_cycle_spd,
                current_cycle: CycleFrame {
                    cycle: *initial_cycle_at_sweet_scent,
                    frame: 0,
                },
                vblank_cycles: vblank_cycles.clone(),
                cycle_at_moments: vec![],
            },
        }
    }

    pub fn add(&mut self, cycle: usize, lead_pid_mod: usize) {
        match self {
            CycleFrameCounter::Inactive => {}
            CycleFrameCounter::DetailedBreakdown { lead_cycle_spd, .. } => {
                let total = cycle + lead_pid_mod * *lead_cycle_spd;
                self.add_cycle(total);
            }
            CycleFrameCounter::MinMaxRange { .. }
            | CycleFrameCounter::CheckValidAllLeadSpds { .. } => {
                self.add_cycle(cycle);
                self.add_mod(lead_pid_mod);
            }
        }
    }
    pub fn add_cycle(&mut self, cycle: usize) {
        match self {
            CycleFrameCounter::Inactive => {}
            CycleFrameCounter::CheckValidAllLeadSpds {
                earliest_slowest_cycle,
                latest_fastest_cycle,
                base_cycle_count,
                ..
            } => {
                *base_cycle_count += cycle;
                *earliest_slowest_cycle += cycle;
                *latest_fastest_cycle += cycle;
            }
            CycleFrameCounter::DetailedBreakdown {
                current_cycle,
                vblank_cycles,
                ..
            } => {
                current_cycle.cycle += cycle;
                while current_cycle.cycle > VBLANK_FREQ {
                    current_cycle.cycle -= VBLANK_FREQ;
                    current_cycle.cycle += vblank_cycles
                        .get(current_cycle.frame)
                        .copied()
                        .unwrap_or_else(|| get_min_mid_max_vblank_cycle_duration().1);
                    current_cycle.frame += 1;
                }
            }
            CycleFrameCounter::MinMaxRange {
                base_cycle_count,
                min_max_cycles,
                ..
            } => {
                *base_cycle_count += cycle;
                min_max_cycles.add_cycle(cycle);
            }
        }
    }
    pub fn add_mod(&mut self, lead_pid_mod: usize) {
        match self {
            CycleFrameCounter::Inactive => {}
            CycleFrameCounter::CheckValidAllLeadSpds {
                min_lead_cycle_spd,
                max_lead_cycle_spd,
                earliest_slowest_cycle,
                latest_fastest_cycle,
                lead_pid_mod_count,
                ..
            } => {
                *lead_pid_mod_count += lead_pid_mod;
                // CycleAndModRange includes the base modulo cost as well as the lead speed.
                *earliest_slowest_cycle +=
                    lead_pid_mod * (BASE_LEAD_PID_MOD_24_CYCLES + *max_lead_cycle_spd);
                *latest_fastest_cycle +=
                    lead_pid_mod * (BASE_LEAD_PID_MOD_24_CYCLES + *min_lead_cycle_spd);
            }
            CycleFrameCounter::DetailedBreakdown { lead_cycle_spd, .. } => {
                let cycle = lead_pid_mod * *lead_cycle_spd;
                self.add_cycle(cycle);
            }
            CycleFrameCounter::MinMaxRange {
                lead_pid_mod_count,
                min_max_cycles,
                ..
            } => {
                *lead_pid_mod_count += lead_pid_mod;
                min_max_cycles.add_mod(lead_pid_mod);
            }
        }
    }
    pub fn on_moment_reached(&mut self, moment: Moment) {
        if let Self::DetailedBreakdown {
            current_cycle,
            cycle_at_moments,
            ..
        } = self
        {
            cycle_at_moments.push(CycleFrameMoment {
                cycle: current_cycle.cycle,
                frame: current_cycle.frame,
                moment,
            });
        }
    }
    /** can a vblank occurs between now and the next <cycle_range> cycles */
    pub fn can_vblank_occur_soon(&self, cycle_range: usize) -> bool {
        match self {
            CycleFrameCounter::Inactive => true,
            CycleFrameCounter::CheckValidAllLeadSpds {
                earliest_slowest_cycle: earliest_slowest,
                latest_fastest_cycle: latest_fastest,
                ..
            } => {
                cycle_range > 0
                    && *earliest_slowest < VBLANK_FREQ
                    && latest_fastest.saturating_add(cycle_range) > VBLANK_FREQ
            }
            CycleFrameCounter::DetailedBreakdown { current_cycle, .. } => {
                cycle_range > VBLANK_FREQ.saturating_sub(current_cycle.cycle)
            }
            CycleFrameCounter::MinMaxRange { min_max_cycles, .. } => {
                min_max_cycles.can_vblank_occur_soon(cycle_range)
            }
        }
    }
    pub fn is_possible_that_no_vblank_yet(&self) -> bool {
        match self {
            CycleFrameCounter::Inactive => true,
            CycleFrameCounter::CheckValidAllLeadSpds {
                earliest_slowest_cycle: earliest_slowest,
                ..
            } => *earliest_slowest < VBLANK_FREQ,
            CycleFrameCounter::DetailedBreakdown { current_cycle, .. } => current_cycle.frame == 0,
            CycleFrameCounter::MinMaxRange { min_max_cycles, .. } => {
                min_max_cycles.min_cycle.frame == 0
            }
        }
    }
    pub fn can_generate_method(&self, len: usize) -> bool {
        match self {
            CycleFrameCounter::Inactive => true,
            CycleFrameCounter::MinMaxRange {
                generate_even_if_impossible: true,
                ..
            } => true,
            _ => {
                if len == INFINITE_CYCLE {
                    self.is_possible_that_no_vblank_yet()
                } else {
                    self.can_vblank_occur_soon(len)
                }
            }
        }
    }
    pub fn create_cycle_range(&self, len: usize) -> CycleAndModRange {
        match self {
            CycleFrameCounter::Inactive => CycleAndModRange::new(0, 0, 0),
            CycleFrameCounter::DetailedBreakdown { .. } => {
                CycleAndModRange::new(self.get_current_cycle_count(), 0, len)
            }
            CycleFrameCounter::MinMaxRange {
                lead_pid_mod_count, ..
            }
            | CycleFrameCounter::CheckValidAllLeadSpds {
                lead_pid_mod_count, ..
            } => CycleAndModRange::new(self.get_current_cycle_count(), *lead_pid_mod_count, len),
        }
    }

    pub fn get_current_cycle_count(&self) -> usize {
        match self {
            CycleFrameCounter::Inactive => 0,
            CycleFrameCounter::DetailedBreakdown { current_cycle, .. } => {
                current_cycle.frame * VBLANK_FREQ + current_cycle.cycle
            }
            CycleFrameCounter::MinMaxRange {
                base_cycle_count,
                lead_pid_mod_count,
                ..
            }
            | CycleFrameCounter::CheckValidAllLeadSpds {
                base_cycle_count,
                lead_pid_mod_count,
                ..
            } => *base_cycle_count + *lead_pid_mod_count * BASE_LEAD_PID_MOD_24_CYCLES,
        }
    }
    pub fn set_cycle_instability(&mut self, instability: f32) {
        match self {
            CycleFrameCounter::Inactive | CycleFrameCounter::DetailedBreakdown { .. } => {}
            CycleFrameCounter::MinMaxRange {
                cycle_instability, ..
            }
            | CycleFrameCounter::CheckValidAllLeadSpds {
                cycle_instability, ..
            } => *cycle_instability = instability,
        }
    }
    pub fn get_cycle_instability(&self) -> f32 {
        match self {
            CycleFrameCounter::Inactive | CycleFrameCounter::DetailedBreakdown { .. } => 0.0,
            CycleFrameCounter::MinMaxRange {
                cycle_instability, ..
            }
            | CycleFrameCounter::CheckValidAllLeadSpds {
                cycle_instability, ..
            } => *cycle_instability,
        }
    }

    pub fn get_cycle_at_moments(&self) -> Vec<CycleFrameMoment> {
        match self {
            CycleFrameCounter::Inactive
            | CycleFrameCounter::MinMaxRange { .. }
            | CycleFrameCounter::CheckValidAllLeadSpds { .. } => vec![],
            CycleFrameCounter::DetailedBreakdown {
                cycle_at_moments, ..
            } => cycle_at_moments.clone(),
        }
    }
}
