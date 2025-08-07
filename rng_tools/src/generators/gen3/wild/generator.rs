use super::{
    calc_modulo_cycle_signed, calc_modulo_cycle_unsigned,
    is_method_possible_to_trigger,
};
use crate::EncounterSlot;
use crate::Ivs;
use crate::gen3::{CycleCounter,Moment,Gen3Lead,Gen3PkmFilter, Gen3Method, calculate_pid_speed, CycleRange, CycleAndModRange, Wild3EncounterTable};
use crate::rng::Rng;
use crate::rng::lcrng::Pokerng;
use crate::{AbilityType, Gender, GenderRatio, Nature, PkmFilter, gen3_shiny, is_max_size};
use serde::{Deserialize, Serialize};
use tsify_next::Tsify;
use wasm_bindgen::prelude::*;

/*
TODO:
- Support all leads in generator.
- Support Feebas
- Support Wild5 with multiple vblanks. Right now, only 1 vblank is supported.
*/

pub const INFINITE_CYCLE: usize = 10_000_000;
pub const VBLANK_FREQ: usize = 280_896;

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
    pub generate_even_if_impossible: bool,
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

impl Wild3GeneratorResult {
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

fn retain_methods_possible_to_trigger(
    opts: &Wild3GeneratorOptions,
    results: &mut Vec<Wild3GeneratorResult>,
) {
    if opts.consider_cycles && !opts.generate_even_if_impossible {
        let is_egg = matches!(opts.lead, Gen3Lead::Egg);
        results.retain(|res| {
            is_method_possible_to_trigger(
                &res.cycle_range.unwrap(),
                is_egg,
                opts.consider_rng_manipulated_lead_pid,
            )
        });
    }
}

pub fn generate_gen3_wild(
    mut rng: Pokerng,
    opts: &Wild3GeneratorOptions,
    game_data: &Wild3EncounterTable,
) -> (Vec<Wild3GeneratorResult>, CycleCounter) {
    let mut results: Vec<Wild3GeneratorResult> = vec![];

    let mut cycle_counter = CycleCounter::default();

    match opts.lead {
        Gen3Lead::Egg => {
            cycle_counter.add(2819,0,);
        }
        _ => {
            cycle_counter.add(12059,32);
        }
    }
    cycle_counter.on_moment_reached(Moment::ChooseWildMonIndex_Land_Random);

    let encounter_rand_val = rng.rand::<u16>() as u32; 
    let encounter_rand = (encounter_rand_val % 100) as u8;
    let encounter_slot = EncounterSlot::from_rand(
        encounter_rand,
        EncounterSlot::gen3_thresholds(game_data.encounter_type),
    );

    cycle_counter.add(
        match opts.lead {
            Gen3Lead::Egg => 234,
            _ => 378,
        },
        0
    );

    cycle_counter.add(
        calc_modulo_cycle_unsigned(encounter_rand_val, 100),
        0,
    ); // TODO: cycle increment depends on slot

    if !EncounterSlot::passes_filter(opts.encounter_slot.as_deref(), encounter_slot) {
        return (results, cycle_counter); // empty
    }

    cycle_counter.on_moment_reached(Moment::ChooseWildMonLevel_RandomLvl);

    let lvl_range_rand_val = rng.rand::<u16>(); // ChooseWildMonLevel
    let slot_info = &game_data.slots[encounter_slot as usize];
    let lvl_range = (slot_info.max_level - slot_info.min_level + 1) as i32;

    let required_gender: Option<Gender>;
    let required_nature: Nature;

    let encounter_gender_ratio = slot_info.gender_ratio;

    cycle_counter.add(
        calc_modulo_cycle_signed(lvl_range_rand_val as i32, lvl_range),
        0,
    );
    match opts.lead {
        Gen3Lead::Egg => {
            cycle_counter.add(9199,0,);
        }
        _ => {
            let lead_pid_mod = if encounter_gender_ratio.has_multiple_genders() {
                32
            } else {
                20
            };
            cycle_counter.add(25182,lead_pid_mod,);
        }
    };

    let pick_random_wild_mon_nature = |cycle: &mut CycleCounter, rng: &mut Pokerng| -> Nature {
        cycle.on_moment_reached(Moment::PickWildMonNature_RandomPickNature);

        let nature_rand_val = rng.rand::<u16>(); // PickWildMonNature at return Random() % NUM_NATURES;
        cycle.add(
            calc_modulo_cycle_unsigned(nature_rand_val as u32, 25),
            0,
        );
        cycle.add(
            179,
            match opts.lead {
                Gen3Lead::Egg => 0,
                _ => 16,
            },
        );
        
        ((nature_rand_val % 25) as u8).into()
    };

    match (opts.lead, encounter_gender_ratio.has_multiple_genders()) {
        (Gen3Lead::Vanilla, _) | (Gen3Lead::Egg, _) | (Gen3Lead::CuteCharm(_), false) => {
            required_gender = None;

            //NO_PROD, should be split
            cycle_counter.add(5763, 0);

            // between PickWildMonNature_pickRandom and CreateMonWithNature_pidlow
            required_nature = pick_random_wild_mon_nature(&mut cycle_counter, &mut rng);
        }
        (Gen3Lead::Synchronize(lead_nature), _) => {
            required_gender = None;

            //NO_PROD, should be split
            cycle_counter.add(5763, 0);

            cycle_counter.on_moment_reached(Moment::PickWildMonNature_RandomTestSynchro);

            if (rng.rand::<u16>() & 1) == 0 { // PickWildMonNature: Random() % 2 == 0
                required_nature = lead_nature;
                // between PickWildMonNature and CreateMonWithNature_pidlow
                cycle_counter.add(389,17);
            } else {
                cycle_counter.add(96,0);
                required_nature = pick_random_wild_mon_nature(&mut cycle_counter, &mut rng);
            }
        }
        (Gen3Lead::CuteCharm(lead_gender), true) => {
            //TODO
            let cute_charm_rand_val = rng.rand::<u16>();

            // between CreateWildMon_CuteCharmRandom and PickWildMonNature_pickRandom
            cycle_counter.add(
                calc_modulo_cycle_unsigned(cute_charm_rand_val as u32, 3),
                0,
            );

            if cute_charm_rand_val % 3 != 0 {
                required_gender = Some(if lead_gender == Gender::Female {
                    Gender::Male
                } else {
                    Gender::Female
                });
                cycle_counter.add(8786 + 44,8,);
            } else {
                required_gender = None;
                cycle_counter.add(5863,0,);
            }
            // between PickWildMonNature_pickRandom and CreateMonWithGenderNatureLetter_pidlow
            required_nature = pick_random_wild_mon_nature(&mut cycle_counter, &mut rng);
        }
    }

    let methods_contains_wild3 = opts.methods.contains(&Gen3Method::Wild3);
    let methods_contains_wild5 = opts.methods.contains(&Gen3Method::Wild5);

    let mut skip_method5_counter = 0;
    let mut last_generated_method5: Option<Wild3GeneratorResult> = None;
    let mut pid: u32;
    cycle_counter.on_moment_reached(Moment::CreateMonWithNature_RandomPidLowFirst);

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
                CycleRange::from_start_len(cycle_counter.cycle, method3_range),
            ) {
                results.push(gen_mon_wild3);
            }
        }
        cycle_counter.add(method3_range,0,);

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
        if methods_contains_wild5 {
            // Multiple iterations will result in the same Method5 Pokémon.
            // To avoid duplicates, we add the generated Pokémon only in the first possible PID reroll
            // then skip until a different Pokémon would be generated.
            if skip_method5_counter > 0 {
                skip_method5_counter -= 1;
            } else {
                if let Some(last_generated_method5) = last_generated_method5 {
                    results.push(last_generated_method5.clone_with_cycle_end(cycle_counter.cycle.cycle));
                }
                (skip_method5_counter, last_generated_method5) = generate_gen3_wild_method5(
                    rng,
                    opts,
                    encounter_slot,
                    encounter_gender_ratio,
                    required_gender,
                    required_nature,
                    // Cycle len will be set later. See clone_with_cycle_end.
                    CycleRange::from_start_len(cycle_counter.cycle, 0),
                );
            }
        }

        cycle_counter.add(
            retry_pid_cycle + calc_modulo_cycle_unsigned(pid, 25),
            0,
        );
    }
    cycle_counter.on_moment_reached(Moment::CreateMonWithNature_RandomPidHighLast);

    if let Some(last_generated_method5) = last_generated_method5 {
        results.push(last_generated_method5.clone_with_cycle_end(cycle_counter.cycle.cycle));
    }

    if !passes_pid_filter(opts, encounter_gender_ratio, pid) {
        retain_methods_possible_to_trigger(opts, &mut results);
        return (results, cycle_counter);
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
            CycleRange::from_start_len(cycle_counter.cycle, method2_range),
        ) {
            results.push(gen_mon_wild2);
        }
    }
    cycle_counter.add(method2_range,0,);

    cycle_counter.on_moment_reached(Moment::CreateBoxMon_RandomIvs1);
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
            CycleRange::from_start_len(cycle_counter.cycle, method4_range),
        ) {
            results.push(gen_mon_wild4);
        }
    }
    cycle_counter.add(method4_range,0);

    cycle_counter.on_moment_reached(Moment::CreateBoxMon_RandomIvs2);
    if opts.methods.contains(&Gen3Method::Wild1) {
        let ivs = Ivs::new_g3(iv1, rng.rand::<u16>());

        if let Some(gen_mon_wild1) = create_if_passes_filter(
            opts,
            pid,
            ivs,
            Gen3Method::Wild1,
            encounter_slot,
            CycleRange::from_start_len(cycle_counter.cycle, INFINITE_CYCLE),
        ) {
            results.push(gen_mon_wild1);
        }
    }

    retain_methods_possible_to_trigger(opts, &mut results);

    (results, cycle_counter)
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
    encounter_gender_ratio: GenderRatio,
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
    encounter_gender_ratio: GenderRatio,
    required_gender: Option<Gender>,
    required_nature: Nature,
    cycle_range: CycleAndModRange,
) -> (usize, Option<Wild3GeneratorResult>) {
    rng.rand::<u16>(); // Vblank from method5

    // Limitation: Only 1 vblank is supported. In theory, multiple vblanks could occur.

    let mut pid: u32;
    let mut retry_count = 0_usize;
    loop {
        let pid_low = rng.rand::<u16>() as u32;
        let pid_high = rng.rand::<u16>() as u32;
        pid = (pid_high << 16) | pid_low;

        if Nature::from_pid(pid) != required_nature {
            retry_count += 1;
            continue;
        }
        if let Some(required_gender) = required_gender {
            let generated_mon_gender = encounter_gender_ratio.gender_from_pid(pid);
            if generated_mon_gender != required_gender {
                retry_count += 1;
                continue;
            }
        }
        break;
    }

    if !passes_pid_filter(opts, encounter_gender_ratio, pid) {
        return (retry_count, None);
    }

    let ivs = Ivs::new_g3(rng.rand::<u16>(), rng.rand::<u16>());

    (
        retry_count,
        create_if_passes_filter(
            opts,
            pid,
            ivs,
            Gen3Method::Wild5,
            encounter_slot,
            cycle_range,
        ),
    )
}

fn passes_pid_filter(
    opts: &Wild3GeneratorOptions,
    encounter_gender_ratio: GenderRatio,
    pid: u32,
) -> bool {
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
