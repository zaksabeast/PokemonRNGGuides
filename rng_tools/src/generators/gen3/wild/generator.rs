use serde::{Deserialize, Serialize};
use tsify::Tsify;
use wasm_bindgen::prelude::*;

use super::{calc_modulo_cycle_signed, calc_modulo_cycle_unsigned, is_method_possible_to_trigger};
use crate::{
    EncounterSlot, Gender, GenderRatio, Ivs, NATURE_COUNT, Nature,
    PERTINENT_CUSTOM_POKEBLOCKS_BY_NATURE, PERTINENT_SOLO_POKEBLOCKS_BY_NATURE,
    POKEBLOCK_NATURE_STAT_FACTORS, PkmFilter,
    gen3::{
        CycleAndModCount, CycleAndModRange, CycleCounter, CycleRange, Gen3Lead, Gen3Method,
        Gen3PkmFilter, Moment, Wild3Action, Wild3EncounterGameData, Wild3EncounterIndex,
        Wild3FeebasState, Wild3MapGameData, Wild3MassOutbreakState, Wild3RoamerState,
        Wild3SafariPokeblockGenOpt, passes_pid_filter, wild::lcrng_distance,
    },
    gen3_tsv, is_max_size,
    rng::{Rng, lcrng::Pokerng},
};

/*
Limitation: When generating Wild5, only 1 vblank is supported. There's a very small chance that multiple vblanks occur.
*/

pub const INFINITE_CYCLE: usize = 10_000_000;
pub const VBLANK_FREQ: usize = 280_896;

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
    pub consider_cycles: bool,
    pub consider_rng_manipulated_lead_pid: bool,
    pub lead_cycle_speed: Option<usize>,
    pub generate_even_if_impossible: bool,
    pub roamer_state: Wild3RoamerState,
    pub mass_outbreak_state: Wild3MassOutbreakState,
    pub feebas_state: Wild3FeebasState,
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
            consider_cycles: false,
            consider_rng_manipulated_lead_pid: false,
            lead_cycle_speed: None,
            generate_even_if_impossible: false,
            roamer_state: Wild3RoamerState::default(),
            mass_outbreak_state: Wild3MassOutbreakState::default(),
            feebas_state: Wild3FeebasState::default(),
            using_white_flute: true,
            safari_pokeblock: None,
        }
    }
}

struct GenTmpData<'a> {
    opts: &'a Wild3GeneratorOptions,
    encounter_idx: Wild3EncounterIndex,
    lvl: u8,
    encounter_gender_ratio: GenderRatio,
    required_gender: Option<Gender>,
    required_nature: Nature,
    used_safari_pokeblock: Option<[u8; 5]>,
    tsv: u16,
}

#[derive(Clone, Debug, Default, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct Wild3GeneratorResult {
    pub encounter_idx: Wild3EncounterIndex,
    pub pid: u32,
    pub ivs: Ivs,
    pub lvl: u8,
    pub method: Gen3Method,
    pub cycle_range: Option<CycleRange<CycleAndModCount>>,
    pub used_safari_pokeblock: Option<[u8; 5]>,
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

fn rand_next_u16(rng: &mut Pokerng, _reason: &str, _modulo: u16) -> u16 {
    rng.rand::<u16>()
    // rand_next_u16_with_debug_print(rng, _reason, _modulo) // Uncomment for debugging
}

#[allow(dead_code)]
fn rand_next_u16_with_debug_print(rng: &mut Pokerng, reason: &str, modulo: u16) -> u16 {
    let prev = rng.seed();
    let ret: u16 = rng.rand::<u16>();
    println!(
        "{} {:08X} -> {:08X}. {} % {} = {} : {}",
        lcrng_distance(0, prev),
        prev,
        rng.seed(),
        ret,
        modulo,
        ret % modulo,
        reason
    );
    ret
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
                opts.action,
                is_egg,
                opts.consider_rng_manipulated_lead_pid,
                opts.lead_cycle_speed,
            )
        });
    }
}

fn select_encounter_idx_ability_attract_type(
    rng: &mut Pokerng,
    slots: &[Wild3EncounterGameData],
    attract_steel: bool,
) -> Option<Wild3EncounterIndex> {
    let valid_indexes = slots
        .iter()
        .enumerate()
        .filter_map(|(i, slot)| {
            let attracted = if attract_steel {
                slot.species_data.is_steel_type()
            } else {
                slot.species_data.is_electric_type()
            };
            if attracted { Some(i) } else { None }
        })
        .collect::<Vec<_>>();

    if !valid_indexes.is_empty() && valid_indexes.len() != slots.len() {
        let rand = rand_next_u16(
            rng,
            "select_encounter_idx_ability_attract_type",
            valid_indexes.len() as u16,
        ) as usize;
        let slot_idx = valid_indexes[rand % valid_indexes.len()] as u8;
        Some(Wild3EncounterIndex::Slot(slot_idx.into()))
    } else {
        None
    }
}

fn select_encounter_idx(
    rng: &mut Pokerng,
    opts: &Wild3GeneratorOptions,
    map_data: &Wild3MapGameData,
    cycle_counter: &mut CycleCounter,
) -> Option<Wild3EncounterIndex> {
    if opts.action == Wild3Action::RockSmash {
        // In RockSmashWildEncounter() -> WildEncounterCheck()
        let mut rate = map_data.rock_smash_rate * 16;
        if opts.using_white_flute {
            rate += rate / 2;
        }

        if rand_next_u16(rng, "select_encounter_idx.rock_smash_odds_check", 2880) % 2880
            >= rate as u16
        {
            return None;
        }
    }

    // In SweetScentWildEncounter()
    if opts.action == Wild3Action::SweetScentLand || opts.action == Wild3Action::SweetScentWater {
        // In TryStartRoamerEncounter()
        match opts.roamer_state {
            Wild3RoamerState::ActiveInMapLatias | Wild3RoamerState::ActiveInMapLatios => {
                if rand_next_u16(rng, "select_encounter_idx.roamer_state", 4) % 4 == 0 {
                    return Some(Wild3EncounterIndex::Roamer(opts.roamer_state));
                }
            }
            _ => {}
        }
    }

    if opts.action == Wild3Action::SweetScentLand {
        // In DoMassOutbreakEncounterTest()
        match opts.mass_outbreak_state {
            Wild3MassOutbreakState::Inactive | Wild3MassOutbreakState::ActiveNotInMap => {
                // nothing to do
            }
            _ => {
                if rand_next_u16(rng, "select_encounter_idx.mass_outbreak_state", 100) % 100 < 50 {
                    return Some(Wild3EncounterIndex::MassOutbreak(opts.mass_outbreak_state));
                }
            }
        }
    }

    // In CheckFeebas()
    if opts.feebas_state == Wild3FeebasState::OnFeebasTile
        && opts.action.is_fishing()
        && rand_next_u16(rng, "select_encounter_idx.OnFeebasTile", 100) % 100 <= 49
    {
        return Some(Wild3EncounterIndex::Feebas);
    }

    // In TryGenerateWildMon()
    match opts.lead {
        Gen3Lead::MagnetPull => {
            if opts.action == Wild3Action::SweetScentLand
                && rand_next_u16(rng, "select_encounter_idx.MagnetPull", 2) % 2 == 0
            {
                let slots = &map_data.slots_by_action[opts.action as usize];
                if let Some(idx) = select_encounter_idx_ability_attract_type(rng, slots, true) {
                    return Some(idx);
                }
            }
        }
        Gen3Lead::Static => {
            if (opts.action == Wild3Action::SweetScentLand
                || opts.action == Wild3Action::SweetScentWater)
                && rand_next_u16(rng, "select_encounter_idx.Static", 2) % 2 == 0
            {
                let slots = &map_data.slots_by_action[opts.action as usize];
                if let Some(idx) = select_encounter_idx_ability_attract_type(rng, slots, false) {
                    return Some(idx);
                }
            }
        }
        _ => {}
    }

    match opts.lead {
        Gen3Lead::Egg => {
            cycle_counter.add_cycle(2819);
        }
        _ => {
            cycle_counter.add(12059, 32);
        }
    }

    let moment = match opts.action {
        Wild3Action::SweetScentLand => Moment::ChooseWildMonIndex_Land_Random,
        Wild3Action::SweetScentWater | Wild3Action::RockSmash => {
            Moment::ChooseWildMonIndex_WaterRock_Random
        }
        Wild3Action::OldRod | Wild3Action::GoodRod | Wild3Action::SuperRod => {
            Moment::ChooseWildMonIndex_Fishing_Random
        }
    };
    cycle_counter.on_moment_reached(moment);

    let encounter_rand_val =
        rand_next_u16(rng, "select_encounter_idx.encounter_rand_val", 100) as u32;
    let encounter_rand = (encounter_rand_val % 100) as u8;
    let encounter_slot =
        EncounterSlot::from_rand(encounter_rand, EncounterSlot::gen3_thresholds(opts.action));

    cycle_counter.add_cycle(match opts.lead {
        Gen3Lead::Egg => 234,
        _ => 378,
    });

    cycle_counter.add_cycle(calc_modulo_cycle_unsigned(encounter_rand_val, 100));

    Some(Wild3EncounterIndex::Slot(encounter_slot))
}

fn select_lvl(
    rng: &mut Pokerng,
    lead: Gen3Lead,
    encounter: &Wild3EncounterGameData,
    cycle_counter: &mut CycleCounter,
) -> u8 {
    cycle_counter.on_moment_reached(Moment::ChooseWildMonLevel_RandomLvl);
    let lvl_range = encounter.max_level - encounter.min_level + 1;
    let lvl_range_rand_val = rand_next_u16(rng, "select_lvl", lvl_range as u16); // ChooseWildMonLevel

    cycle_counter.add_cycle(calc_modulo_cycle_signed(
        lvl_range_rand_val as i32,
        lvl_range as i32,
    ));

    let mut lvl_incr = (lvl_range_rand_val as u8) % lvl_range;
    if matches!(lead, Gen3Lead::HustleVitalSpiritPressure) {
        if rand_next_u16(rng, "select_lvl.Hustle", 2) % 2 == 0 {
            return encounter.max_level;
        } else {
            lvl_incr = lvl_incr.saturating_sub(1);
        }
    }

    encounter.min_level + lvl_incr
}

fn pick_wild_mon_nature_safari(
    rng: &mut Pokerng,
    pokeblock_gen_opt: &Option<Wild3SafariPokeblockGenOpt>,
) -> Option<(Nature, Option<[u8; 5]>)> {
    if rand_next_u16(rng, "test_safari_zone_pokeblock", 100) % 100 >= 80 {
        return None;
    }

    pokeblock_gen_opt
        .as_ref()
        .map(|pokeblock_gen_opt| calculate_nature_from_safari_pokeblock(rng, pokeblock_gen_opt))
}

pub fn calculate_nature_from_safari_pokeblock(
    rng: &mut Pokerng,
    pokeblock_gen_opt: &Wild3SafariPokeblockGenOpt,
) -> (Nature, Option<[u8; 5]>) {
    let mut all_natures_by_priority: [Nature; NATURE_COUNT] = [
        Nature::Hardy,
        Nature::Lonely,
        Nature::Brave,
        Nature::Adamant,
        Nature::Naughty,
        Nature::Bold,
        Nature::Docile,
        Nature::Relaxed,
        Nature::Impish,
        Nature::Lax,
        Nature::Timid,
        Nature::Hasty,
        Nature::Serious,
        Nature::Jolly,
        Nature::Naive,
        Nature::Modest,
        Nature::Mild,
        Nature::Quiet,
        Nature::Bashful,
        Nature::Rash,
        Nature::Calm,
        Nature::Gentle,
        Nature::Sassy,
        Nature::Careful,
        Nature::Quirky,
    ];
    for i in 0..(NATURE_COUNT - 1) {
        for j in (i + 1)..NATURE_COUNT {
            if rand_next_u16(rng, "test_safari_zone_pokeblock", 2) & 1 == 1 {
                all_natures_by_priority.swap(i, j);
            }
        }
    }

    let mut natures_by_priority: [Nature; 20] = Default::default();
    let mut next_idx = 0_usize;

    all_natures_by_priority.iter().for_each(|nature| {
        // Those natures are never selected because their score can't be over 0. This is to improve performance.
        if matches!(
            nature,
            Nature::Hardy | Nature::Docile | Nature::Serious | Nature::Bashful | Nature::Quirky
        ) {
            return;
        }
        natures_by_priority[next_idx] = *nature;
        next_idx += 1;
    });

    let has_positive_score = |nature: Nature, flavors: &[u8; 5]| -> bool {
        let score = flavors
            .iter()
            .enumerate()
            .map(|(flavor, flavor_val)| {
                (*flavor_val as i32) * POKEBLOCK_NATURE_STAT_FACTORS[nature as usize][flavor]
            })
            .sum::<i32>();
        score > 0
    };

    let get_nature_from_flavors = |flavors: &[u8; 5]| -> Nature {
        natures_by_priority
            .into_iter()
            .find(|nature| has_positive_score(*nature, flavors))
            .unwrap_or(natures_by_priority[0])
    };

    match pokeblock_gen_opt {
        Wild3SafariPokeblockGenOpt::Specific(flavors) => {
            (get_nature_from_flavors(flavors), Some(*flavors))
        }
        Wild3SafariPokeblockGenOpt::ForSearching {
            wanted_nature,
            consider_all_safari_pokeblocks,
        } => {
            let wanted_nature_idx = *wanted_nature as usize;
            let pokeblock = if *consider_all_safari_pokeblocks {
                PERTINENT_SOLO_POKEBLOCKS_BY_NATURE[wanted_nature_idx]
                    .iter()
                    .chain(PERTINENT_CUSTOM_POKEBLOCKS_BY_NATURE[wanted_nature_idx].iter())
                    .find(|&flavors| get_nature_from_flavors(flavors) == *wanted_nature)
            } else {
                PERTINENT_SOLO_POKEBLOCKS_BY_NATURE[wanted_nature_idx]
                    .iter()
                    .find(|&flavors| get_nature_from_flavors(flavors) == *wanted_nature)
            };

            if let Some(pokeblock) = pokeblock {
                (*wanted_nature, Some(*pokeblock))
            } else {
                (natures_by_priority[0], None) // will be filtered out later
            }
        }
    }
}

#[wasm_bindgen]
pub fn generate_gen3_wild_wasm(
    initial_seed: u32,
    advances: usize,
    opts: &Wild3GeneratorOptions,
    map_data: &Wild3MapGameData,
) -> Vec<Wild3GeneratorResult> {
    generate_gen3_wild(Pokerng::with_jump(initial_seed, advances), opts, map_data).0
}

pub fn generate_gen3_wild(
    mut rng: Pokerng,
    opts: &Wild3GeneratorOptions,
    map_data: &Wild3MapGameData,
) -> (Vec<Wild3GeneratorResult>, CycleCounter) {
    let mut results: Vec<Wild3GeneratorResult> = vec![];

    let mut cycle_counter = CycleCounter::default();

    let encounter_idx = select_encounter_idx(&mut rng, opts, map_data, &mut cycle_counter);
    if encounter_idx.is_none() {
        // no encounter
        return (results, cycle_counter); // empty
    }

    let encounter_idx = encounter_idx.unwrap();
    let encounter = map_data.get_encounter(opts.action, encounter_idx);
    if encounter.is_none() {
        // impossible to trigger in-game
        return (results, cycle_counter); // empty
    }

    let encounter = encounter.unwrap();
    if let Some(species) = opts.gen3_filter.species {
        if species != encounter.species_data.species {
            return (results, cycle_counter); // empty
        }
    }

    let lvl = select_lvl(&mut rng, opts.lead, encounter, &mut cycle_counter);

    if let Some(wanted_lvl) = opts.gen3_filter.lvl {
        if lvl != wanted_lvl {
            return (results, cycle_counter); // empty
        }
    }

    if matches!(encounter_idx, Wild3EncounterIndex::Roamer(_)) {
        results.push(Wild3GeneratorResult {
            encounter_idx,
            pid: 0, // Roamers PID and IVs are generated by an in-game event
            ivs: Ivs::default(),
            lvl,
            method: Gen3Method::Wild1,
            cycle_range: if opts.consider_cycles {
                Some(CycleRange::new(0, 0, INFINITE_CYCLE))
            } else {
                None
            },
            used_safari_pokeblock: None,
        });
        return (results, cycle_counter); // empty
    }

    let encounter_gender_ratio = encounter.species_data.gender_ratio();

    match opts.lead {
        Gen3Lead::Egg => {
            cycle_counter.add_cycle(9199);
        }
        _ => {
            let lead_pid_mod = if encounter_gender_ratio.has_multiple_genders() {
                32
            } else {
                20
            };
            cycle_counter.add(25182, lead_pid_mod);
        }
    };

    let pick_random_wild_mon_nature = |cycle: &mut CycleCounter, rng: &mut Pokerng| -> Nature {
        cycle.on_moment_reached(Moment::PickWildMonNature_RandomPickNature);

        let nature_rand_val = rand_next_u16(rng, "pick_random_wild_mon_nature", 25); // PickWildMonNature at return Random() % NUM_NATURES;
        cycle.add_cycle(calc_modulo_cycle_unsigned(nature_rand_val as u32, 25));
        cycle.add(
            179,
            match opts.lead {
                Gen3Lead::Egg => 0,
                _ => 16,
            },
        );

        ((nature_rand_val % 25) as u8).into()
    };

    let required_gender = {
        match (opts.lead, encounter_gender_ratio.has_multiple_genders()) {
            (Gen3Lead::CuteCharm(lead_gender), true) => {
                cycle_counter.on_moment_reached(Moment::CreateWildMon_RandomTestCuteCharm);

                let cute_charm_rand_val = rand_next_u16(&mut rng, "cute_charm_rand_val", 3);

                // between CreateWildMon_CuteCharmRandom and PickWildMonNature_pickRandom
                cycle_counter.add_cycle(calc_modulo_cycle_unsigned(cute_charm_rand_val as u32, 3));

                if cute_charm_rand_val % 3 != 0 {
                    cycle_counter.add(8786 + 44, 8);
                    Some(if lead_gender == Gender::Female {
                        Gender::Male
                    } else {
                        Gender::Female
                    })
                } else {
                    cycle_counter.add_cycle(5863);
                    None
                }
            }
            _ => {
                cycle_counter.add_cycle(5763);
                None
            }
        }
    };

    // PickWildMonNature()
    let (required_nature, used_safari_pokeblock) = (|| {
        if map_data.is_safari {
            if let Some((nature, used_safari_pokeblock)) =
                pick_wild_mon_nature_safari(&mut rng, &opts.safari_pokeblock)
            {
                cycle_counter.add_cycle(33728);
                return (nature, used_safari_pokeblock);
            }
        }
        if let Gen3Lead::Synchronize(lead_nature) = opts.lead {
            cycle_counter.on_moment_reached(Moment::PickWildMonNature_RandomTestSynchro);
            // PickWildMonNature: Random() % 2 == 0
            if (rand_next_u16(&mut rng, "PickWildMonNature", 2) & 1) == 0 {
                // between PickWildMonNature and CreateMonWithNature_pidlow
                cycle_counter.add(389, 17);
                return (lead_nature, None);
            }
            cycle_counter.add_cycle(96);
        }

        (
            pick_random_wild_mon_nature(&mut cycle_counter, &mut rng),
            None,
        )
    })();

    let gen_data = GenTmpData {
        opts,
        encounter_idx,
        lvl,
        encounter_gender_ratio,
        required_gender,
        required_nature,
        used_safari_pokeblock,
        tsv: gen3_tsv(opts.tid, opts.sid),
    };

    let methods_contains_wild3 = opts.methods.contains(&Gen3Method::Wild3);
    let methods_contains_wild5 = opts.methods.contains(&Gen3Method::Wild5);

    let mut skip_method5_counter = 0;
    let mut last_generated_method5: Option<Wild3GeneratorResult> = None;
    let mut pid: u32;
    cycle_counter.on_moment_reached(Moment::CreateMonWithNature_RandomPidLowFirst);

    loop {
        let pid_low = rand_next_u16(&mut rng, "pid_low", 1) as u32;

        let method3_range = 80;
        if methods_contains_wild3 {
            if let Some(gen_mon_wild3) = generate_gen3_wild_method3(
                &gen_data,
                rng,
                pid_low,
                CycleRange::from_start_len(cycle_counter.cycle, method3_range),
            ) {
                results.push(gen_mon_wild3);
            }
        }

        let pid_high = rand_next_u16(&mut rng, "pid_high", 1) as u32;
        pid = (pid_high << 16) | pid_low;

        let good_nature = Nature::from_pid(pid) == required_nature;

        let good_gender = if let Some(required_gender) = required_gender {
            let generated_mon_gender = encounter_gender_ratio.gender_from_pid(pid);
            generated_mon_gender == required_gender
        } else {
            true
        };

        if good_nature && good_gender {
            cycle_counter.on_moment_reached(Moment::CreateMonWithNature_RandomPidLowLast);

            cycle_counter.add_cycle(method3_range);
            // cycle increment done after the loop
            break;
        }
        cycle_counter.add_cycle(method3_range);

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
                    results.push(
                        last_generated_method5.clone_with_cycle_end(cycle_counter.cycle.cycle),
                    );
                }
                (skip_method5_counter, last_generated_method5) = generate_gen3_wild_method5(
                    &gen_data,
                    rng,
                    // Cycle len will be set later. See clone_with_cycle_end.
                    CycleRange::from_start_len(cycle_counter.cycle, 0),
                );
            }
        }

        cycle_counter.add_cycle(retry_pid_cycle + calc_modulo_cycle_unsigned(pid, 25));
    }
    cycle_counter.on_moment_reached(Moment::CreateMonWithNature_RandomPidHighLast);

    if let Some(last_generated_method5) = last_generated_method5 {
        results.push(last_generated_method5.clone_with_cycle_end(cycle_counter.cycle.cycle));
    }

    if !passes_pid_filter_internal(&gen_data, pid) {
        retain_methods_possible_to_trigger(opts, &mut results);
        return (results, cycle_counter);
    }

    // between CreateMonWithNature_pidhigh and CreateBoxMon_ivs1
    let method2_range =
        calc_modulo_cycle_unsigned(pid, 25) + 100 * calc_modulo_cycle_unsigned(pid, 24) + 36900;

    if opts.methods.contains(&Gen3Method::Wild2) {
        if let Some(gen_mon_wild2) = generate_gen3_wild_method2(
            &gen_data,
            rng,
            pid,
            CycleRange::from_start_len(cycle_counter.cycle, method2_range),
        ) {
            results.push(gen_mon_wild2);
        }
    }
    cycle_counter.add_cycle(method2_range);

    cycle_counter.on_moment_reached(Moment::CreateBoxMon_RandomIvs1);
    let iv1 = rand_next_u16(&mut rng, "iv1_wild1or4", 1);

    // between CreateBoxMon_ivs1 and CreateBoxMon_ivs2
    let method4_range = 36 * calc_modulo_cycle_unsigned(pid, 24) + 11103; // between CreateBoxMon_ivs1 and CreateBoxMon_ivs2

    if opts.methods.contains(&Gen3Method::Wild4) {
        if let Some(gen_mon_wild4) = generate_gen3_wild_method4(
            &gen_data,
            rng,
            pid,
            iv1,
            CycleRange::from_start_len(cycle_counter.cycle, method4_range),
        ) {
            results.push(gen_mon_wild4);
        }
    }
    cycle_counter.add_cycle(method4_range);

    cycle_counter.on_moment_reached(Moment::CreateBoxMon_RandomIvs2);
    if opts.methods.contains(&Gen3Method::Wild1) {
        let ivs = Ivs::new_g3(iv1, rand_next_u16(&mut rng, "iv2_wild1", 1));

        if let Some(gen_mon_wild1) = create_if_passes_filter(
            &gen_data,
            pid,
            ivs,
            Gen3Method::Wild1,
            CycleRange::from_start_len(cycle_counter.cycle, INFINITE_CYCLE),
        ) {
            results.push(gen_mon_wild1);
        }
    }

    retain_methods_possible_to_trigger(opts, &mut results);

    (results, cycle_counter)
}

fn generate_gen3_wild_method2(
    gen_data: &GenTmpData,
    mut rng: Pokerng,
    pid: u32,
    cycle_range: CycleAndModRange,
) -> Option<Wild3GeneratorResult> {
    rand_next_u16(&mut rng, "vblank_between_pid_iv1_for_wild2", 1); // Vblank from method2

    let ivs = Ivs::new_g3(
        rand_next_u16(&mut rng, "iv1_wild2", 1),
        rand_next_u16(&mut rng, "iv2_wild2", 1),
    );

    create_if_passes_filter(gen_data, pid, ivs, Gen3Method::Wild2, cycle_range)
}

fn generate_gen3_wild_method3(
    gen_data: &GenTmpData,
    mut rng: Pokerng,
    pid_low: u32,
    cycle_range: CycleAndModRange,
) -> Option<Wild3GeneratorResult> {
    rand_next_u16(&mut rng, "vblank_between_pid_low_high_for_wild3", 1); // Vblank from method3

    let pid_high = rand_next_u16(&mut rng, "pid_high_wild3", 1) as u32;
    let pid = (pid_high << 16) | pid_low;
    if Nature::from_pid(pid) != gen_data.required_nature {
        return None;
    }
    if let Some(required_gender) = gen_data.required_gender {
        let generated_mon_gender = gen_data.encounter_gender_ratio.gender_from_pid(pid);
        if generated_mon_gender != required_gender {
            return None;
        }
    }

    if !passes_pid_filter_internal(gen_data, pid) {
        return None;
    }

    let ivs = Ivs::new_g3(
        rand_next_u16(&mut rng, "iv1_wild3", 1),
        rand_next_u16(&mut rng, "iv2_wild3", 1),
    );

    create_if_passes_filter(gen_data, pid, ivs, Gen3Method::Wild3, cycle_range)
}

fn generate_gen3_wild_method4(
    gen_data: &GenTmpData,
    mut rng: Pokerng,
    pid: u32,
    iv1: u16,
    cycle_range: CycleAndModRange,
) -> Option<Wild3GeneratorResult> {
    rand_next_u16(&mut rng, "vblank_between_iv1_and_iv2_for_wild4", 1);

    let ivs = Ivs::new_g3(iv1, rand_next_u16(&mut rng, "iv2_wild4", 1));

    create_if_passes_filter(gen_data, pid, ivs, Gen3Method::Wild4, cycle_range)
}

fn generate_gen3_wild_method5(
    gen_data: &GenTmpData,
    mut rng: Pokerng,
    cycle_range: CycleAndModRange,
) -> (usize, Option<Wild3GeneratorResult>) {
    rand_next_u16(&mut rng, "vblank_wild5", 1); // Vblank from method5

    // Limitation: Only 1 vblank is supported. In theory, multiple vblanks could occur.

    let mut pid: u32;
    let mut retry_count = 0_usize;
    loop {
        let pid_low = rand_next_u16(&mut rng, "pid_low_wild5", 1) as u32;
        let pid_high = rand_next_u16(&mut rng, "pid_high_wild5", 1) as u32;
        pid = (pid_high << 16) | pid_low;

        if Nature::from_pid(pid) != gen_data.required_nature {
            retry_count += 1;
            continue;
        }
        if let Some(required_gender) = gen_data.required_gender {
            let generated_mon_gender = gen_data.encounter_gender_ratio.gender_from_pid(pid);
            if generated_mon_gender != required_gender {
                retry_count += 1;
                continue;
            }
        }
        break;
    }

    if !passes_pid_filter_internal(gen_data, pid) {
        return (retry_count, None);
    }

    let ivs = Ivs::new_g3(
        rand_next_u16(&mut rng, "iv1_wild5", 1),
        rand_next_u16(&mut rng, "iv2_wild5", 1),
    );

    (
        retry_count,
        create_if_passes_filter(gen_data, pid, ivs, Gen3Method::Wild5, cycle_range),
    )
}

fn passes_pid_filter_internal(gen_data: &GenTmpData, pid: u32) -> bool {
    passes_pid_filter(
        &gen_data.opts.filter,
        &gen_data.opts.gen3_filter,
        Some(gen_data.encounter_gender_ratio),
        pid,
        gen_data.tsv,
    )
}

fn create_if_passes_filter(
    gen_data: &GenTmpData,
    pid: u32,
    ivs: Ivs,
    method: Gen3Method,
    cycle_range: CycleAndModRange,
) -> Option<Wild3GeneratorResult> {
    if !passes_ivs_filter(gen_data.opts, &ivs) {
        return None;
    }

    if gen_data.opts.gen3_filter.max_size && !is_max_size(pid, &ivs) {
        return None;
    }

    let cycle_range = if gen_data.opts.consider_cycles {
        Some(cycle_range)
    } else {
        None
    };

    Some(Wild3GeneratorResult {
        pid,
        ivs,
        method,
        encounter_idx: gen_data.encounter_idx,
        lvl: gen_data.lvl,
        cycle_range,
        used_safari_pokeblock: gen_data.used_safari_pokeblock,
    })
}

#[path = "tests/generator_tests.rs"]
#[cfg(test)]
mod tests;

#[path = "tests/generator_cycle_tests.rs"]
#[cfg(test)]
mod tests_cycle;
