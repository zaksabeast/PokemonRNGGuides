use super::{
    Gen3EncounterType, calc_modulo_cycle_signed, calc_modulo_cycle_unsigned,
    is_method_possible_to_trigger,
};
use crate::EncounterSlot;
use crate::Ivs;
use crate::Species;
use crate::gen3::{Gen3Lead, Gen3Method, calculate_pid_speed};
use crate::rng::Rng;
use crate::rng::lcrng::Pokerng;
use crate::{AbilityType, Gender, GenderRatio, Nature, PkmFilter, gen3_shiny, is_max_size};
use serde::{Deserialize, Serialize};
use std::ops;
use tsify_next::Tsify;
use wasm_bindgen::prelude::*;

/*
TODO:
- Support all leads in generator.
- Add an optional data structure to store cycle increment reasons.
- Provide a .lua script to generate actual cycle increments for validation and debugging.

- Support Wild5 with multiple vblanks. Right now, only 1 vblank is supported.
*/

pub const INFINITE_CYCLE: usize = 10_000_000;
pub const VBLANK_FREQ: usize = 280_896;
pub const BASE_LEAD_PID: u32 = 0;
pub const BASE_LEAD_PID_MOD_24_CYCLES: usize = calc_modulo_cycle_unsigned(BASE_LEAD_PID, 24);
pub const BASE_LEAD_PID_MOD_25_CYCLES: usize = calc_modulo_cycle_unsigned(BASE_LEAD_PID, 25);

#[derive(Debug, Clone, Default, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct Gen3PidSpeedFilter {
    pub active: bool,
    pub min_cycle_count: usize,
    pub max_cycle_count: usize,
}

#[derive(Debug, Clone, Default, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct Gen3PkmFilter {
    pub max_size: bool,
    pub pid_speed: Gen3PidSpeedFilter,
}

#[derive(Debug, Clone, Default, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct Wild3EncounterSlotInfo {
    pub min_level: u8,
    pub max_level: u8,
    pub species: Species,
    pub gender_ratio: GenderRatio,
    pub is_electric_type: bool,
    pub is_steel_type: bool,
}

#[derive(Debug, Clone, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct Wild3EncounterTable {
    pub map_id: String,
    pub encounter_type: Gen3EncounterType,
    pub slots: Vec<Wild3EncounterSlotInfo>,
}

impl Default for Wild3EncounterTable {
    fn default() -> Self {
        Self {
            slots:(0..=EncounterSlot::Slot11 as usize).map(|_i|{
                Wild3EncounterSlotInfo::default()
            }).collect::<Vec<_>>(),
            map_id:String::default(),
            encounter_type:Gen3EncounterType::default(),
        }
    }
}

#[derive(Debug, Clone, Default, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct Wild3GeneratorOptions {
    pub advance: usize,
    pub tid: u16,
    pub sid: u16,
    pub map_idx: usize,
    pub encounter_slot: Option<Vec<EncounterSlot>>,
    pub methods: Vec<Gen3Method>,
    pub lead: Gen3Lead,
    pub filter: PkmFilter,
    pub gen3_filter: Gen3PkmFilter,
    pub consider_cycles: bool,
    pub consider_rng_manipulated_lead_pid: bool,
}

#[derive(Default, Debug, Clone, Copy, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct CycleAndModCount {
    pub cycle: usize,
    pub mod24: usize,
    pub mod25: usize,
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
}

impl CycleAndModRange {
    pub fn end(&self) -> CycleAndModCount {
        CycleAndModCount {
            cycle: self.start.cycle + self.len,
            mod24: self.start.mod24,
            mod25: self.start.mod25,
        }
    }
    pub fn new(cycle: usize, mod24: usize, mod25: usize, len: usize) -> CycleAndModRange {
        CycleRange {
            start: CycleAndModCount {
                cycle,
                mod24,
                mod25,
            },
            len,
        }
    }
    pub fn apply_mod_cycle_count(&self, pid_cycle_count: usize) -> CycleRange<usize> {
        CycleRange::<usize> {
            start: self
                .start
                .cycle
                .saturating_add(self.start.mod_count() * pid_cycle_count),
            len: self.len,
        }
    }
}

impl CycleAndModCount {
    pub fn add(&mut self, cycle: usize, _reason: &str) {
        self.cycle += cycle;
    }
    pub fn add_mod_24(&mut self, mod24: usize) {
        self.cycle += mod24 * BASE_LEAD_PID_MOD_24_CYCLES;
        self.mod24 += mod24;
    }
    pub fn add_mod_25(&mut self, mod25: usize) {
        self.cycle += mod25 * BASE_LEAD_PID_MOD_25_CYCLES;
        self.mod25 += mod25;
    }
    pub fn mod_count(&self) -> usize {
        self.mod24 + self.mod25
    }
}

impl ops::AddAssign<(usize, &str)> for CycleAndModCount {
    fn add_assign(&mut self, rhs: (usize, &str)) {
        self.add(rhs.0, rhs.1);
    }
}

#[derive(Debug, Clone, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct Wild3GeneratorResult {
    pub encounter_slot: EncounterSlot,
    pub pid: u32,
    pub ivs: Ivs,
    pub method: Gen3Method,
    pub cycle_range: Option<CycleAndModRange>,
}

pub fn generate_gen3_wild(
    mut rng: Pokerng,
    opts: &Wild3GeneratorOptions,
    game_data:&Wild3EncounterTable,
) -> Vec<Wild3GeneratorResult> {
    let mut results: Vec<Wild3GeneratorResult> = vec![];

    let mut cycle = CycleAndModCount::default();

    // between SweetScentWildEncounter and ChooseWildMonIndex_Land
    match opts.lead {
        Gen3Lead::Egg => {
            cycle.add(
                2819,
                "between SweetScentWildEncounter and ChooseWildMonIndex_Land",
            );
        }
        _ => {
            cycle.add(
                12059,
                "between SweetScentWildEncounter and ChooseWildMonIndex_Land",
            );
            cycle.add_mod_24(32);
        }
    }

    let encounter_rand_val = rng.rand::<u16>() as u32; // ChooseWildMonIndex_Land
    let encounter_rand = (encounter_rand_val % 100) as u8;
    let encounter_slot = EncounterSlot::from_rand(
        encounter_rand,
        EncounterSlot::gen3_thresholds(game_data.encounter_type),
    );

    //between ChooseWildMonIndex_Land and ChooseWildMonLevel
    cycle += (
        match opts.lead {
            Gen3Lead::Egg => 234,
            _ => 378,
        },
        "between ChooseWildMonIndex_Land and ChooseWildMonLevel",
    );

    cycle += (
        calc_modulo_cycle_unsigned(encounter_rand_val, 100),
        "encounter_rand_val % 100",
    ); // TODO: cycle increment depends on slot

    if !EncounterSlot::passes_filter(opts.encounter_slot.as_deref(), encounter_slot) {
        return results;
    }

    let slot_info = &game_data.slots[encounter_slot as usize];

    let lvl_range_rand_val = rng.rand::<u16>(); // ChooseWildMonLevel
    let lvl_range = (slot_info.max_level - slot_info.min_level + 1) as i32;

    let required_gender: Option<Gender>;
    let required_nature: Nature;

    let encounter_gender_ratio = slot_info.gender_ratio;

    // between ChooseWildMonLevel and CreateWildMon_CuteCharmCheck
    cycle += (
        calc_modulo_cycle_signed(lvl_range_rand_val as i32, lvl_range),
        "calc_modulo_cycle_s(lvl_range_rand_val, lvl_range)",
    );
    match opts.lead {
        Gen3Lead::Egg => {
            cycle += (
                9199,
                "between ChooseWildMonLevel and CreateWildMon_CuteCharmCheck",
            );
        }
        _ => {
            cycle.add_mod_24(20);
            if encounter_gender_ratio.has_multiple_genders() {
                cycle.add_mod_24(12);
            }
            cycle += (
                25182,
                "between ChooseWildMonLevel and CreateWildMon_CuteCharmCheck",
            );
        }
    };

    let pick_wild_mon_nature = |cycle: &mut CycleAndModCount, rng: &mut Pokerng| -> Nature {
        let nature_rand_val = rng.rand::<u16>();
        *cycle += (
            calc_modulo_cycle_unsigned(nature_rand_val as u32, 25),
            "nature_rand_val % 25",
        );
        *cycle += (
            179,
            "between PickWildMonNature_ifNotSynchro and CreateMonWithNature_pidlow",
        );
        match opts.lead {
            Gen3Lead::Egg => {} // nothing
            _ => cycle.add_mod_24(16),
        }
        ((nature_rand_val % 25) as u8).into()
    };

    match (opts.lead, encounter_gender_ratio.has_multiple_genders()) {
        (Gen3Lead::Vanilla, _) | (Gen3Lead::Egg, _) | (Gen3Lead::CuteCharm(_), false) => {
            required_gender = None;

            cycle += (
                5763,
                "between PickWildMonNature_pickRandom and CreateMonWithNature_pidlow",
            );

            // between PickWildMonNature_pickRandom and CreateMonWithNature_pidlow
            required_nature = pick_wild_mon_nature(&mut cycle, &mut rng);
        }
        (Gen3Lead::Synchronize(lead_nature), _) => {
            required_gender = None;

            cycle += (
                5763,
                "between PickWildMonNature_pickRandom and CreateMonWithNature_pidlow",
            );

            if (rng.rand::<u16>() & 1) == 0 {
                required_nature = lead_nature;
                // between PickWildMonNature and CreateMonWithNature_pidlow
                cycle += (
                    389,
                    "between PickWildMonNature and CreateMonWithNature_pidlow (synchronize triggered)",
                );
                cycle.add_mod_25(1);
                cycle.add_mod_24(16);
            } else {
                cycle += (
                    96,
                    "between PickWildMonNature_pickRandom and CreateMonWithNature_pidlow (synchronize not triggered)",
                );

                //
                required_nature = pick_wild_mon_nature(&mut cycle, &mut rng);
            }
        }
        (Gen3Lead::CuteCharm(lead_gender), true) => {
            let cute_charm_rand_val = rng.rand::<u16>();

            // between CreateWildMon_CuteCharmRandom and PickWildMonNature_pickRandom
            cycle += (
                calc_modulo_cycle_unsigned(cute_charm_rand_val as u32, 3),
                "cute_charm_rand_val % 3",
            );

            if cute_charm_rand_val % 3 != 0 {
                required_gender = Some(if lead_gender == Gender::Female {
                    Gender::Male
                } else {
                    Gender::Female
                });
                cycle.add_mod_24(8);
                cycle += (
                    8786 + 44,
                    "CreateWildMon_CuteCharmRandom and PickWildMonNature_pickRandom (cute charm triggered)",
                );
            } else {
                required_gender = None;
                cycle += (
                    5863,
                    "CreateWildMon_CuteCharmRandom and PickWildMonNature_pickRandom (cute charm not triggered)",
                );
            }
            // between PickWildMonNature_pickRandom and CreateMonWithGenderNatureLetter_pidlow
            required_nature = pick_wild_mon_nature(&mut cycle, &mut rng);
        }
    }

    let methods_contains_wild3 = opts.methods.contains(&Gen3Method::Wild3);
    let methods_contains_wild5 = opts.methods.contains(&Gen3Method::Wild5);

    let mut pid: u32;
    loop {
        let pid_low = rng.rand::<u16>() as u32;

        let method3_range = 80;
        if methods_contains_wild3 {
            if let Some(gen_mon_wild3) = generate_gen3_wild_method3(
                rng,
                opts,
                encounter_slot,
                encounter_gender_ratio,
                pid_low,
                required_gender,
                required_nature,
                CycleRange::from_start_len(cycle, method3_range),
            ) {
                results.push(gen_mon_wild3);
            }
        }
        cycle += (
            method3_range,
            "between CreateMonWithNature_pidlow and CreateMonWithNature_pidhigh",
        );

        let pid_high = rng.rand::<u16>() as u32;
        pid = (pid_high << 16) | pid_low;

        let good_nature = Nature::from_pid(pid) == required_nature;

        let good_gender = if let Some(required_gender) = required_gender {
            let generated_mon_gender = encounter_gender_ratio.gender_from_pid(pid);
            generated_mon_gender == required_gender
        } else {
            true
        };

        if good_nature && good_gender {
            // cycle increment done after the loop
            break;
        }

        // between CreateMonWithNature_pidhigh and CreateMonWithNature_pidlow (retry)
        let retry_pid_cycle = if good_nature { 140 } else { 158 }; // 18 cycles to check gender
        let method5_range = retry_pid_cycle + calc_modulo_cycle_unsigned(pid, 25);
        if methods_contains_wild5 {
            // Multiple iterations will result in the same Method5 Pokémon.
            // To avoid duplicates, we add the generated Pokémon only in the latest possible PID reroll.
            if let Some(gen_mon_wild5) = generate_gen3_wild_method5(
                rng,
                opts,
                encounter_slot,
                encounter_gender_ratio,
                required_gender,
                required_nature,
                CycleRange::from_start_len(cycle, method5_range),
            ) {
                results.push(gen_mon_wild5);
            }
        }
        cycle += (
            method5_range,
            "retry_pid_cycle + calc_modulo_cycle_u(pid, 25)",
        );
    }

    if !passes_pid_filter(opts, encounter_gender_ratio,  pid) {
        return results;
    }

    // between CreateMonWithNature_pidhigh and CreateBoxMon_ivs1
    let method2_range =
        calc_modulo_cycle_unsigned(pid, 25) + 100 * calc_modulo_cycle_unsigned(pid, 24) + 36900;
    // TODO: investigate if species impact this. Got 36721, 36903 (poochyena), 36950 (wurmple), 37210 (ralts).

    if opts.methods.contains(&Gen3Method::Wild2) {
        if let Some(gen_mon_wild2) = generate_gen3_wild_method2(
            rng,
            opts,
            encounter_slot,
            pid,
            CycleRange::from_start_len(cycle, method2_range),
        ) {
            results.push(gen_mon_wild2);
        }
    }
    cycle += (
        method2_range,
        "method2_range: between CreateMonWithNature_pidhigh and CreateBoxMon_ivs1 (x100 pid % 24 + pid % 25)",
    );

    let iv1 = rng.rand::<u16>();

    // between CreateBoxMon_ivs1 and CreateBoxMon_ivs2
    let method4_range = 36 * calc_modulo_cycle_unsigned(pid, 24) + 11103; // between CreateBoxMon_ivs1 and CreateBoxMon_ivs2

    if opts.methods.contains(&Gen3Method::Wild4) {
        if let Some(gen_mon_wild4) = generate_gen3_wild_method4(
            rng,
            opts,
            encounter_slot,
            pid,
            iv1,
            CycleRange::from_start_len(cycle, method4_range),
        ) {
            results.push(gen_mon_wild4);
        }
    }
    cycle += (
        method4_range,
        "method4_range: between CreateBoxMon_ivs1 and CreateBoxMon_ivs2 (x36 pid % 24)",
    );

    if opts.methods.contains(&Gen3Method::Wild1) {
        let ivs = Ivs::new_g3(iv1, rng.rand::<u16>());

        if let Some(gen_mon_wild1) = create_if_passes_filter(
            opts,
            pid,
            ivs,
            Gen3Method::Wild1,
            encounter_slot,
            CycleRange::from_start_len(cycle, INFINITE_CYCLE),
        ) {
            results.push(gen_mon_wild1);
        }
    }

    results
}

fn generate_gen3_wild_method2(
    mut rng: Pokerng,
    opts: &Wild3GeneratorOptions,
    encounter_slot: EncounterSlot,
    pid: u32,
    cycle_range: CycleAndModRange,
) -> Option<Wild3GeneratorResult> {
    rng.rand::<u16>(); // Vblank from method2

    let ivs = Ivs::new_g3(rng.rand::<u16>(), rng.rand::<u16>());

    create_if_passes_filter(
        opts,
        pid,
        ivs,
        Gen3Method::Wild2,
        encounter_slot,
        cycle_range,
    )
}

fn generate_gen3_wild_method3(
    mut rng: Pokerng,
    opts: &Wild3GeneratorOptions,
    encounter_slot: EncounterSlot,
    encounter_gender_ratio:GenderRatio,
    pid_low: u32,
    required_gender: Option<Gender>,
    required_nature: Nature,
    cycle_range: CycleAndModRange,
) -> Option<Wild3GeneratorResult> {
    rng.rand::<u16>(); // Vblank from method3

    let pid_high = rng.rand::<u16>() as u32;
    let pid = (pid_high << 16) | pid_low;
    if Nature::from_pid(pid) != required_nature {
        return None;
    }
    if let Some(required_gender) = required_gender {
        let generated_mon_gender = encounter_gender_ratio.gender_from_pid(pid);
        if generated_mon_gender != required_gender {
            return None;
        }
    }

    if !passes_pid_filter(opts, encounter_gender_ratio, pid) {
        return None;
    }

    let ivs = Ivs::new_g3(rng.rand::<u16>(), rng.rand::<u16>());

    create_if_passes_filter(
        opts,
        pid,
        ivs,
        Gen3Method::Wild3,
        encounter_slot,
        cycle_range,
    )
}

fn generate_gen3_wild_method4(
    mut rng: Pokerng,
    opts: &Wild3GeneratorOptions,
    encounter_slot: EncounterSlot,
    pid: u32,
    iv1: u16,
    cycle_range: CycleAndModRange,
) -> Option<Wild3GeneratorResult> {
    rng.rand::<u16>(); // Vblank from method4

    let ivs = Ivs::new_g3(iv1, rng.rand::<u16>());

    create_if_passes_filter(
        opts,
        pid,
        ivs,
        Gen3Method::Wild4,
        encounter_slot,
        cycle_range,
    )
}

fn generate_gen3_wild_method5(
    mut rng: Pokerng,
    opts: &Wild3GeneratorOptions,
    encounter_slot: EncounterSlot,
    encounter_gender_ratio:GenderRatio,
    required_gender: Option<Gender>,
    required_nature: Nature,
    cycle_range: CycleAndModRange,
) -> Option<Wild3GeneratorResult> {
    rng.rand::<u16>(); // Vblank from method5

    // Limitation: Only 1 vblank is supported. In theory, multiple vblanks could occur.

    let pid_low = rng.rand::<u16>() as u32;
    let pid_high = rng.rand::<u16>() as u32;
    let pid = (pid_high << 16) | pid_low;

    if Nature::from_pid(pid) != required_nature {
        return None;
    }
    if let Some(required_gender) = required_gender {
        let generated_mon_gender = encounter_gender_ratio.gender_from_pid(pid);
        if generated_mon_gender != required_gender {
            return None;
        }
    }

    if !passes_pid_filter(opts, encounter_gender_ratio, pid) {
        return None;
    }

    let ivs = Ivs::new_g3(rng.rand::<u16>(), rng.rand::<u16>());

    create_if_passes_filter(
        opts,
        pid,
        ivs,
        Gen3Method::Wild5,
        encounter_slot,
        cycle_range,
    )
}

fn passes_pid_filter(
    opts: &Wild3GeneratorOptions, 
    encounter_gender_ratio:GenderRatio,
    pid: u32) -> bool {
    if opts.filter.shiny {
        let generated_shiny = gen3_shiny(pid, opts.tid, opts.sid);
        if !generated_shiny {
            return false;
        }
    }

    if let Some(wanted_ability) = opts.filter.ability {
        let generated_ability = AbilityType::from_gen3_pid(pid);
        if generated_ability != wanted_ability {
            return false;
        }
    }

    if let Some(wanted_gender) = opts.filter.gender {
        let generated_gender = encounter_gender_ratio.gender_from_pid(pid);
        if generated_gender != wanted_gender {
            return false;
        }
    }

    if let Some(wanted_nature) = opts.filter.nature {
        let nature = Nature::from_pid(pid);
        if nature != wanted_nature {
            return false;
        }
    }

    if opts.gen3_filter.pid_speed.active {
        let pid_speed = calculate_pid_speed(pid);
        if pid_speed < opts.gen3_filter.pid_speed.min_cycle_count
            || pid_speed > opts.gen3_filter.pid_speed.max_cycle_count
        {
            return false;
        }
    }

    true
}

fn passes_ivs_filter(opts: &Wild3GeneratorOptions, ivs: &Ivs) -> bool {
    Ivs::filter(ivs, &opts.filter.min_ivs, &opts.filter.max_ivs)
        && opts.filter.pass_filter_hidden_power(ivs)
}

fn create_if_passes_filter(
    opts: &Wild3GeneratorOptions,
    pid: u32,
    ivs: Ivs,
    method: Gen3Method,
    encounter_slot: EncounterSlot,
    cycle_range: CycleAndModRange,
) -> Option<Wild3GeneratorResult> {
    if !passes_ivs_filter(opts, &ivs) {
        return None;
    }

    if opts.gen3_filter.max_size && !is_max_size(pid, &ivs) {
        return None;
    }

    let is_egg = matches!(opts.lead, Gen3Lead::Egg);
    if opts.consider_cycles
        && !is_method_possible_to_trigger(
            &cycle_range,
            is_egg,
            opts.consider_rng_manipulated_lead_pid,
        )
    {
        return None;
    }

    let cycle_range = if opts.consider_cycles {
        Some(cycle_range)
    } else {
        None
    };

    Some(Wild3GeneratorResult {
        pid,
        ivs,
        method,
        encounter_slot,
        cycle_range,
    })
}
