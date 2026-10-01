use super::generator_main::{
    INFINITE_CYCLE, VBLANK_FREQ, Wild3GeneratorMonResult, Wild3GeneratorOptions,
    Wild3GeneratorResults,
};
use super::{calc_modulo_cycle_signed, calc_modulo_cycle_unsigned, is_method_possible_to_trigger};
use crate::{
    EncounterSlot, Gender, GenderRatio, Ivs, NATURE_COUNT, Nature,
    PERTINENT_CUSTOM_POKEBLOCKS_BY_NATURE, PERTINENT_SOLO_POKEBLOCKS_BY_NATURE,
    POKEBLOCK_NATURE_STAT_FACTORS,
    gen3::{
        CycleAndModRange, CycleCounter, CycleFrameCounter, CycleRange, Wild3GeneratorCycleOpts, Gen3Lead, Gen3Method, Moment, Wild3Action,
        Wild3EncounterGameData, Wild3EncounterIndex, Wild3FeebasState, Wild3MapGameData,
        Wild3MassOutbreakState, Wild3RoamerState, Wild3SafariPokeblockGenOpt,
        get_min_mid_max_pre_sweet_scent_cycle, get_min_mid_max_vblank_cycle_duration,
        passes_pid_filter, wild::lcrng_distance,
    },
    gen3_tsv, is_max_size,
    rng::{Rng, lcrng::Pokerng},
};

/*
Main entry point: generate_gen3_wild

Limitation: When generating Wild5, only 1 vblank is supported. There's a very small chance that multiple vblanks occur.
*/

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

pub(super) fn retain_methods_possible_to_trigger(
    opts: &Wild3GeneratorOptions,
    results: &mut Vec<Wild3GeneratorMonResult>,
) {
    if let Wild3GeneratorCycleOpts::Searching {
        generate_even_if_impossible: false,
        consider_rng_manipulated_lead_pid,
    } = &opts.cycle_opts {
        let is_egg = matches!(opts.lead, Gen3Lead::Egg);
        results.retain(|res| {
            is_method_possible_to_trigger(
                &res.cycle_range.unwrap(),
                opts.action,
                is_egg,
                *consider_rng_manipulated_lead_pid,
                None,
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

fn apply_cycles_causing_vblanks_on_cycle_counter(
    cycle: usize,
    cycle_to_add: usize,
    vblank_dur: usize,
) -> (usize /*new_cycle*/, usize /*vblank_count*/) {
    let cycles_until_vblank = VBLANK_FREQ - cycle;
    if cycle_to_add < cycles_until_vblank {
        return (cycle + cycle_to_add, 0);
    }

    let remaining = cycle_to_add - cycles_until_vblank;
    let cycles_between_vblanks = VBLANK_FREQ - vblank_dur;
    let vblank_count = 1 + remaining / cycles_between_vblanks;
    let new_cycle = vblank_dur + remaining % cycles_between_vblanks;

    (new_cycle, vblank_count)
}

const MAX_FEEBAS_VBLANK: usize = 4;

fn handle_feebas_cycle_counter(
    rng: &mut Pokerng,
    cycle_counter: &mut CycleCounter,
    feebas_cycles: usize,
    consider_cycles: bool,
) {
    cycle_counter.on_moment_reached(Moment::CheckFeebas);

    let (min, mid, max) = get_min_mid_max_pre_sweet_scent_cycle(Wild3Action::OldRod);
    let (min_vblank, mid_vblank, max_vblank) = get_min_mid_max_vblank_cycle_duration();

    let (_, min_case_vblank) =
        apply_cycles_causing_vblanks_on_cycle_counter(min, feebas_cycles, min_vblank);
    let (mid_case_cycle, mid_case_vblank) =
        apply_cycles_causing_vblanks_on_cycle_counter(mid, feebas_cycles, mid_vblank);
    let (_, max_case_vblank) =
        apply_cycles_causing_vblanks_on_cycle_counter(max, feebas_cycles, max_vblank);

    /*
    It's impossible to predict the exact duration of the vblanks, but it's typically between 45K and 65K.
    If the resulting rng state is the same no matter if the vblanks are 45K or 65K, then we consider this setup to be stable.
    Additional vblanks will occur between PID generation and IV generation (method 1 to 4).
    The Pokemon stats generated by the generator will be the correct one (even though the exact probability for each method may be off a bit).

    If the rng state is different between the min and max vblank duration, this means vblank could occur during steps prior to PID generation.
    Ex: Vblank between selecting the level and selecting the nature. Those possibilities are not supported by the generator.
    */

    // The generator always calculates for the mid case (most probable case).
    rng.jump(mid_case_vblank);

    if !consider_cycles {
        return;
    }

    let abs_cycle_from_cycle_counter = cycle_counter.cycle.cycle + mid; // At this points, lead_pid_mod is 0.
    // Limitation: We can only add cycles. In most cases, mid_case_cycle should be > abs_cycle_from_cycle_counter, because abs_cycle_from_cycle_counter is small.
    if mid_case_cycle > abs_cycle_from_cycle_counter {
        cycle_counter.add_cycle(mid_case_cycle - abs_cycle_from_cycle_counter);
    }

    let vblank_diff = max_case_vblank - min_case_vblank;
    cycle_counter.cycle_instability = if vblank_diff != 0 {
        1.0
    } else {
        // Each vblank adds instability because vblank duration is variable.
        mid_case_vblank as f32 / MAX_FEEBAS_VBLANK as f32
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
            Wild3RoamerState::ActiveInMapLatias | Wild3RoamerState::ActiveInMapLatios
                if rand_next_u16(rng, "select_encounter_idx.roamer_state", 4).is_multiple_of(4) =>
            {
                return Some(Wild3EncounterIndex::Roamer(opts.roamer_state));
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
    if opts.action.is_fishing()
        && opts.feebas_state != Wild3FeebasState::NotInMap
        && rand_next_u16(rng, "select_encounter_idx.OnFeebasTile", 100) % 100 <= 49
    {
        handle_feebas_cycle_counter(
            rng,
            cycle_counter,
            opts.feebas_cycles,
            !matches!(opts.cycle_opts, Wild3GeneratorCycleOpts::Inactive),
        );

        if opts.feebas_state == Wild3FeebasState::OnFeebasTile {
            return Some(Wild3EncounterIndex::Feebas);
        }
    }

    // In TryGenerateWildMon()
    match opts.lead {
        Gen3Lead::MagnetPull => {
            if opts.action == Wild3Action::SweetScentLand
                && rand_next_u16(rng, "select_encounter_idx.MagnetPull", 2).is_multiple_of(2)
            {
                let slots = &map_data.slots_by_action[opts.action as usize];
                if let Some(idx) = select_encounter_idx_ability_attract_type(rng, slots, true) {
                    return Some(idx);
                }
            }
        }
        Gen3Lead::Static
            if (opts.action == Wild3Action::SweetScentLand
                || opts.action == Wild3Action::SweetScentWater)
                && rand_next_u16(rng, "select_encounter_idx.Static", 2).is_multiple_of(2) =>
        {
            let slots = &map_data.slots_by_action[opts.action as usize];
            if let Some(idx) = select_encounter_idx_ability_attract_type(rng, slots, false) {
                return Some(idx);
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

    let mut lvl_incr = (lvl_range_rand_val % lvl_range as u16) as u8;
    if matches!(lead, Gen3Lead::HustleVitalSpiritPressure) {
        if rand_next_u16(rng, "select_lvl.Hustle", 2).is_multiple_of(2) {
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

fn calculate_nature_from_safari_pokeblock(
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

// Entry point
pub fn generate_wild3_old(
    mut rng: Pokerng,
    opts: &Wild3GeneratorOptions,
    map_data: &Wild3MapGameData,
) -> Wild3GeneratorResults {
    let mut cycle_counter = CycleCounter::default();

    let encounter_idx = select_encounter_idx(&mut rng, opts, map_data, &mut cycle_counter);
    if encounter_idx.is_none() {
        // no encounter
        return Wild3GeneratorResults::empty();
    }

    let encounter_idx = encounter_idx.unwrap();
    generate_wild3_from_encounter(rng, opts, map_data, cycle_counter, encounter_idx, None)
}

fn generate_wild3_from_encounter(
    mut rng: Pokerng,
    opts: &Wild3GeneratorOptions,
    map_data: &Wild3MapGameData,
    mut cycle_counter: CycleCounter,
    encounter_idx: Wild3EncounterIndex,
    selected_level: Option<u8>,
) -> Wild3GeneratorResults {
    let encounter = map_data.get_encounter(opts.action, encounter_idx);
    if encounter.is_none() {
        // impossible to trigger in-game
        return Wild3GeneratorResults::empty();
    }

    let encounter = encounter.unwrap();
    if let Some(species) = opts.gen3_filter.species
        && species != encounter.species_data.species
    {
        return Wild3GeneratorResults::empty();
    }

    let lvl = selected_level
        .unwrap_or_else(|| select_lvl(&mut rng, opts.lead, encounter, &mut cycle_counter));

    if let Some(wanted_lvl) = opts.gen3_filter.lvl
        && lvl != wanted_lvl
    {
        return Wild3GeneratorResults::empty();
    }

    let mut results: Vec<Wild3GeneratorMonResult> = vec![];
    if matches!(encounter_idx, Wild3EncounterIndex::Roamer(_)) {
        results.push(Wild3GeneratorMonResult {
            encounter_idx,
            pid: 0, // Roamers PID and IVs are generated by an in-game event
            ivs: Ivs::default(),
            lvl,
            method: Gen3Method::Wild1,
            cycle_range: if !matches!(opts.cycle_opts, Wild3GeneratorCycleOpts::Inactive) {
                Some(CycleRange::new(0, 0, INFINITE_CYCLE))
            } else {
                None
            },
            used_safari_pokeblock: None,
        });
        return Wild3GeneratorResults {
            mon_results: results,
            cycle_counter: CycleFrameCounter::Inactive,
        };
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

                if !cute_charm_rand_val.is_multiple_of(3) {
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
        if map_data.is_safari
            && let Some((nature, used_safari_pokeblock)) =
                pick_wild_mon_nature_safari(&mut rng, &opts.safari_pokeblock)
        {
            cycle_counter.add_cycle(33728);
            return (nature, used_safari_pokeblock);
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
    let mut last_generated_method5: Option<Wild3GeneratorMonResult> = None;
    let mut pid: u32;
    cycle_counter.on_moment_reached(Moment::CreateMonWithNature_RandomPidLowFirst);

    loop {
        let pid_low = rand_next_u16(&mut rng, "pid_low", 1) as u32;

        let method3_range = 80;
        if methods_contains_wild3
            && let Some(gen_mon_wild3) = generate_gen3_wild_method3(
                &gen_data,
                rng,
                pid_low,
                CycleRange::from_start_len(cycle_counter.cycle, method3_range),
            )
        {
            results.push(gen_mon_wild3);
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
        return Wild3GeneratorResults {
            mon_results: results,
            cycle_counter: CycleFrameCounter::Inactive,
        };
    }

    // between CreateMonWithNature_pidhigh and CreateBoxMon_ivs1
    let method2_range =
        calc_modulo_cycle_unsigned(pid, 25) + 100 * calc_modulo_cycle_unsigned(pid, 24) + 36900;

    if opts.methods.contains(&Gen3Method::Wild2)
        && let Some(gen_mon_wild2) = generate_gen3_wild_method2(
            &gen_data,
            rng,
            pid,
            CycleRange::from_start_len(cycle_counter.cycle, method2_range),
        )
    {
        results.push(gen_mon_wild2);
    }
    cycle_counter.add_cycle(method2_range);

    cycle_counter.on_moment_reached(Moment::CreateBoxMon_RandomIvs1);
    let iv1 = rand_next_u16(&mut rng, "iv1_wild1or4", 1);

    // between CreateBoxMon_ivs1 and CreateBoxMon_ivs2
    let method4_range = 36 * calc_modulo_cycle_unsigned(pid, 24) + 11103; // between CreateBoxMon_ivs1 and CreateBoxMon_ivs2

    if opts.methods.contains(&Gen3Method::Wild4)
        && let Some(gen_mon_wild4) = generate_gen3_wild_method4(
            &gen_data,
            rng,
            pid,
            iv1,
            CycleRange::from_start_len(cycle_counter.cycle, method4_range),
        )
    {
        results.push(gen_mon_wild4);
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

    Wild3GeneratorResults {
        mon_results: results,
        cycle_counter: CycleFrameCounter::Inactive,
    }
}

fn generate_gen3_wild_method2(
    gen_data: &GenTmpData,
    mut rng: Pokerng,
    pid: u32,
    cycle_range: CycleAndModRange,
) -> Option<Wild3GeneratorMonResult> {
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
) -> Option<Wild3GeneratorMonResult> {
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
) -> Option<Wild3GeneratorMonResult> {
    rand_next_u16(&mut rng, "vblank_between_iv1_and_iv2_for_wild4", 1);

    let ivs = Ivs::new_g3(iv1, rand_next_u16(&mut rng, "iv2_wild4", 1));

    create_if_passes_filter(gen_data, pid, ivs, Gen3Method::Wild4, cycle_range)
}

fn generate_gen3_wild_method5(
    gen_data: &GenTmpData,
    mut rng: Pokerng,
    cycle_range: CycleAndModRange,
) -> (usize, Option<Wild3GeneratorMonResult>) {
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

fn passes_ivs_filter(opts: &Wild3GeneratorOptions, ivs: &Ivs) -> bool {
    Ivs::filter(ivs, &opts.filter.min_ivs, &opts.filter.max_ivs)
        && opts.filter.pass_filter_hidden_power(ivs)
}

fn create_if_passes_filter(
    gen_data: &GenTmpData,
    pid: u32,
    ivs: Ivs,
    method: Gen3Method,
    cycle_range: CycleAndModRange,
) -> Option<Wild3GeneratorMonResult> {
    if !passes_ivs_filter(gen_data.opts, &ivs) {
        return None;
    }

    if gen_data.opts.gen3_filter.max_size && !is_max_size(pid, &ivs) {
        return None;
    }

    let cycle_range = if !matches!(gen_data.opts.cycle_opts, Wild3GeneratorCycleOpts::Inactive) {
        Some(cycle_range)
    } else {
        None
    };

    Some(Wild3GeneratorMonResult {
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
