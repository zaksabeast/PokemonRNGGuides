#![allow(non_snake_case)] // To have the same function names as pokeemerald decompil project.
use wasm_bindgen::prelude::*;

use super::generator_main::{
    INFINITE_CYCLE, VBLANK_FREQ, Wild3GeneratorMonResult, Wild3GeneratorOptions,
    Wild3GeneratorResults,
};
use super::{calc_modulo_cycle_signed, calc_modulo_cycle_unsigned};
use crate::{
    EncounterSlot, Gender, GenderRatio, Ivs, NATURE_COUNT, Nature,
    PERTINENT_CUSTOM_POKEBLOCKS_BY_NATURE, PERTINENT_SOLO_POKEBLOCKS_BY_NATURE,
    POKEBLOCK_NATURE_STAT_FACTORS,
    gen3::{
        CycleAndModRange, CycleFrameCounter, CycleRange, Gen3Lead, Gen3Method, Moment, Wild3Action,
        Wild3EncounterGameData, Wild3EncounterIndex, Wild3FeebasState, Wild3GeneratorCycleOpts,
        Wild3MapGameData, Wild3MassOutbreakState, Wild3RoamerState, Wild3SafariPokeblockGenOpt,
        get_min_mid_max_pre_sweet_scent_cycle, get_min_mid_max_vblank_cycle_duration,
        passes_pid_filter,
    },
    gen3_tsv, is_max_size,
    rng::{Rng, lcrng::Pokerng},
};

/*
General idea:
 - Mimick as much as possible the function call structure of the real game, to have accurate cycle counting.


*/

pub fn generate_wild3_new(
    mut rng: Pokerng,
    opts: &Wild3GeneratorOptions,
    map_data: &Wild3MapGameData,
) -> Wild3GeneratorResults {
    let mut cycle_counter = CycleFrameCounter::new(opts);

    match opts.action {
        Wild3Action::SweetScentLand | Wild3Action::SweetScentWater => {
            TrySweetScentEncounter(&mut rng, opts, map_data, &mut cycle_counter)
        }
        Wild3Action::OldRod | Wild3Action::GoodRod | Wild3Action::SuperRod => {
            Fishing_StartEncounter(&mut rng, opts, map_data, &mut cycle_counter)
        }
        Wild3Action::RockSmash => {
            RockSmashWildEncounter(&mut rng, opts, map_data, &mut cycle_counter)
        }
    }
    .unwrap_or_else(Wild3GeneratorResults::empty)
}

fn Fishing_StartEncounter(
    rng: &mut Pokerng,
    opts: &Wild3GeneratorOptions,
    map_data: &Wild3MapGameData,
    cycle_counter: &mut CycleFrameCounter,
) -> Option<Wild3GeneratorResults> {
    cycle_counter.on_moment_reached(Moment::Fishing_StartEncounter);
    FishingWildEncounter(rng, opts, map_data, cycle_counter)
}

fn FishingWildEncounter(
    rng: &mut Pokerng,
    opts: &Wild3GeneratorOptions,
    map_data: &Wild3MapGameData,
    cycle_counter: &mut CycleFrameCounter,
) -> Option<Wild3GeneratorResults> {
    cycle_counter.on_moment_reached(Moment::FishingWildEncounter);

    if CheckFeebas(rng, opts, cycle_counter) {
        let encounter = map_data.feebas.as_ref()?;
        let level = ChooseWildMonLevel(rng, encounter, opts.lead, cycle_counter);
        let encounter_idx = Wild3EncounterIndex::Feebas;
        let encounter = get_encounter_if_respects_filter(opts, map_data, encounter_idx, level)?;
        return Some(CreateWildMon(
            rng.clone(),
            opts,
            map_data,
            cycle_counter.clone(),
            encounter_idx,
            level,
            encounter,
        ));
    }

    let (encounter_idx, level) = GenerateFishingWildMon(rng, opts, map_data, cycle_counter)?;

    let encounter = get_encounter_if_respects_filter(opts, map_data, encounter_idx, level)?;
    Some(CreateWildMon(
        rng.clone(),
        opts,
        map_data,
        cycle_counter.clone(),
        encounter_idx,
        level,
        encounter,
    ))
}

fn CheckFeebas(
    rng: &mut Pokerng,
    opts: &Wild3GeneratorOptions,
    cycle_counter: &mut CycleFrameCounter,
) -> bool {
    cycle_counter.on_moment_reached(Moment::CheckFeebas);
    if opts.feebas_state == Wild3FeebasState::NotInMap {
        return false;
    }
    if rng.rand::<u16>() % 100 > 49 {
        return false;
    }
    handle_feebas_cycle_counter(rng, cycle_counter, opts.feebas_cycles);
    opts.feebas_state == Wild3FeebasState::OnFeebasTile
}

fn GenerateFishingWildMon(
    rng: &mut Pokerng,
    opts: &Wild3GeneratorOptions,
    map_data: &Wild3MapGameData,
    cycle_counter: &mut CycleFrameCounter,
) -> Option<(Wild3EncounterIndex, u8)> {
    cycle_counter.on_moment_reached(Moment::GenerateFishingWildMon);
    let index = ChooseWildMonIndex_Fishing(rng, opts.action, opts.lead, cycle_counter);
    let encounter = map_data
        .slots_by_action
        .get(opts.action as usize)?
        .get(index)?;
    let level = ChooseWildMonLevel(rng, encounter, opts.lead, cycle_counter);
    Some((Wild3EncounterIndex::Slot((index as u8).into()), level))
}

fn ChooseWildMonIndex_Fishing(
    rng: &mut Pokerng,
    rod: Wild3Action,
    lead: Gen3Lead,
    cycle_counter: &mut CycleFrameCounter,
) -> usize {
    cycle_counter.on_moment_reached(Moment::ChooseWildMonIndex_Fishing);
    choose_index(rng, lead, rod, cycle_counter)
}

fn RockSmashWildEncounter(
    rng: &mut Pokerng,
    opts: &Wild3GeneratorOptions,
    map_data: &Wild3MapGameData,
    cycle_counter: &mut CycleFrameCounter,
) -> Option<Wild3GeneratorResults> {
    cycle_counter.on_moment_reached(Moment::RockSmashWildEncounter);
    if !WildEncounterCheck(rng, map_data.rock_smash_rate, opts, cycle_counter) {
        return None;
    }
    let (encounter_idx, level) = TryGenerateWildMon(rng, opts, map_data, 0, cycle_counter)?;
    let encounter = get_encounter_if_respects_filter(opts, map_data, encounter_idx, level)?;
    Some(CreateWildMon(
        rng.clone(),
        opts,
        map_data,
        cycle_counter.clone(),
        encounter_idx,
        level,
        encounter,
    ))
}

fn WildEncounterCheck(
    rng: &mut Pokerng,
    encounter_rate: u32,
    opts: &Wild3GeneratorOptions,
    cycle_counter: &mut CycleFrameCounter,
) -> bool {
    cycle_counter.on_moment_reached(Moment::WildEncounterCheck);
    let mut rate = encounter_rate * 16;
    if opts.using_white_flute {
        rate += rate / 2;
    }
    EncounterOddsCheck(rng, rate as u16, cycle_counter)
}

fn EncounterOddsCheck(
    rng: &mut Pokerng,
    encounter_rate: u16,
    cycle_counter: &mut CycleFrameCounter,
) -> bool {
    cycle_counter.on_moment_reached(Moment::EncounterOddsCheck);
    rng.rand::<u16>() % 2880 < encounter_rate
}

fn TrySweetScentEncounter(
    rng: &mut Pokerng,
    opts: &Wild3GeneratorOptions,
    map_data: &Wild3MapGameData,
    cycle_counter: &mut CycleFrameCounter,
) -> Option<Wild3GeneratorResults> {
    cycle_counter.on_moment_reached(Moment::TrySweetScentEncounter);
    SweetScentWildEncounter(rng, opts, map_data, cycle_counter)
}

fn SweetScentWildEncounter(
    rng: &mut Pokerng,
    opts: &Wild3GeneratorOptions,
    map_data: &Wild3MapGameData,
    cycle_counter: &mut CycleFrameCounter,
) -> Option<Wild3GeneratorResults> {
    cycle_counter.on_moment_reached(Moment::SweetScentWildEncounter);

    if let Some(roamer) = TryStartRoamerEncounter(rng, opts, cycle_counter) {
        return Some(CreateRoamerMonInstance(opts, map_data, roamer));
    }

    if opts.action == Wild3Action::SweetScentLand
        && DoMassOutbreakEncounterTest(rng, opts, cycle_counter)
    {
        let (outbreak, level) = SetUpMassOutbreakEncounter(rng, 0, opts, map_data, cycle_counter)?;
        let encounter = get_encounter_if_respects_filter(opts, map_data, outbreak, level)?;
        return Some(CreateWildMon(
            rng.clone(),
            opts,
            map_data,
            cycle_counter.clone(),
            outbreak,
            level,
            encounter,
        ));
    }

    let (encounter_idx, level) = TryGenerateWildMon(rng, opts, map_data, 0, cycle_counter)?;
    let encounter = get_encounter_if_respects_filter(opts, map_data, encounter_idx, level)?;
    Some(CreateWildMon(
        rng.clone(),
        opts,
        map_data,
        cycle_counter.clone(),
        encounter_idx,
        level,
        encounter,
    ))
}

fn CreateRoamerMonInstance(
    opts: &Wild3GeneratorOptions,
    map_data: &Wild3MapGameData,
    roamer: Wild3EncounterIndex,
) -> Wild3GeneratorResults {
    let lvl = map_data
        .get_encounter(opts.action, roamer)
        .map(|enc| enc.min_level) // roamer min/max level is the same.
        .unwrap_or(1);

    Wild3GeneratorResults {
        mon_results: vec![Wild3GeneratorMonResult {
            encounter_idx: roamer,
            pid: 0, // Roamers PID and IVs are generated by an in-game event
            ivs: Ivs::default(),
            lvl,
            method: Gen3Method::Wild1,
            cycle_range: if opts.cycle_opts != Wild3GeneratorCycleOpts::Inactive {
                Some(CycleRange::new(0, 0, INFINITE_CYCLE))
            } else {
                None
            },
            used_safari_pokeblock: None,
        }],
        cycle_counter: CycleFrameCounter::Inactive,
    }
}

fn get_encounter_if_respects_filter<'a>(
    opts: &Wild3GeneratorOptions,
    map_data: &'a Wild3MapGameData,
    encounter_idx: Wild3EncounterIndex,
    lvl: u8,
) -> Option<&'a Wild3EncounterGameData> {
    let encounter = map_data.get_encounter(opts.action, encounter_idx)?;

    if let Some(species) = opts.gen3_filter.species
        && species != encounter.species_data.species
    {
        return None;
    }

    if let Some(wanted_lvl) = opts.gen3_filter.lvl
        && lvl != wanted_lvl
    {
        return None;
    }

    Some(encounter)
}

fn PickWildMonNature(
    rng: &mut Pokerng,
    opts: &Wild3GeneratorOptions,
    map_data: &Wild3MapGameData,
    cycle_counter: &mut CycleFrameCounter,
    pick_random: impl FnOnce(&mut CycleFrameCounter, &mut Pokerng) -> Nature,
) -> (Nature, Option<[u8; 5]>) {
    cycle_counter.on_moment_reached(Moment::PickWildMonNature);
    if map_data.is_safari
        && let Some((nature, used_safari_pokeblock)) =
            pick_wild_mon_nature_safari(rng, &opts.safari_pokeblock)
    {
        cycle_counter.add_cycle(33728);
        return (nature, used_safari_pokeblock);
    }
    if let Gen3Lead::Synchronize(lead_nature) = opts.lead {
        cycle_counter.on_moment_reached(Moment::PickWildMonNature_RandomTestSynchro);
        if (rand_next_u16(rng, "PickWildMonNature", 2) & 1) == 0 {
            cycle_counter.add(389, 17);
            return (lead_nature, None);
        }
        cycle_counter.add_cycle(96);
    }
    (pick_random(cycle_counter, rng), None)
}

fn CreateWildMon(
    mut rng: Pokerng,
    opts: &Wild3GeneratorOptions,
    map_data: &Wild3MapGameData,
    mut cycle_counter: CycleFrameCounter,
    encounter_idx: Wild3EncounterIndex,
    lvl: u8,
    encounter: &Wild3EncounterGameData,
) -> Wild3GeneratorResults {
    cycle_counter.on_moment_reached(Moment::CreateWildMon);
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

    let pick_random_wild_mon_nature =
        |cycle: &mut CycleFrameCounter, rng: &mut Pokerng| -> Nature {
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

    let (required_nature, used_safari_pokeblock) = PickWildMonNature(
        &mut rng,
        opts,
        map_data,
        &mut cycle_counter,
        pick_random_wild_mon_nature,
    );

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

    if required_gender.is_some() {
        CreateMonWithGenderNatureLetter(rng, gen_data, cycle_counter)
    } else {
        CreateMonWithNature(rng, gen_data, cycle_counter)
    }
}

fn CreateMonWithNature(
    rng: Pokerng,
    gen_data: GenTmpData<'_>,
    mut cycle_counter: CycleFrameCounter,
) -> Wild3GeneratorResults {
    cycle_counter.on_moment_reached(Moment::CreateMonWithNature);
    generate_personality(rng, gen_data, cycle_counter)
}

fn CreateMonWithGenderNatureLetter(
    rng: Pokerng,
    gen_data: GenTmpData<'_>,
    mut cycle_counter: CycleFrameCounter,
) -> Wild3GeneratorResults {
    cycle_counter.on_moment_reached(Moment::CreateMonWithGenderNatureLetter);
    generate_personality(rng, gen_data, cycle_counter)
}

fn generate_personality(
    mut rng: Pokerng,
    gen_data: GenTmpData<'_>,
    mut cycle_counter: CycleFrameCounter,
) -> Wild3GeneratorResults {
    let opts = gen_data.opts;
    let required_nature = gen_data.required_nature;
    let required_gender = gen_data.required_gender;
    let encounter_gender_ratio = gen_data.encounter_gender_ratio;
    let mut results = Vec::new();

    let methods_contains_wild3 = opts.methods.contains(&Gen3Method::Wild3);
    let methods_contains_wild5 = opts.methods.contains(&Gen3Method::Wild5);

    let mut skip_method5_counter = 0;
    let mut pid: u32;
    cycle_counter.on_moment_reached(Moment::CreateMonWithNature_RandomPidLowFirst);

    loop {
        let pid_low = rand_next_u16(&mut rng, "pid_low", 1) as u32;

        let method3_range = 80;
        if methods_contains_wild3
            && cycle_counter.can_generate_method(method3_range)
            && let Some(gen_mon_wild3) = simulate_wild_method3(
                &gen_data,
                rng,
                pid_low,
                cycle_counter.create_cycle_range(method3_range),
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
                let opt_pid_ivs: Option<(u32, Ivs)>;
                let method5_range;
                (skip_method5_counter, method5_range, opt_pid_ivs) =
                    get_wild_method5_retry_count(&gen_data, rng, pid);

                if let Some((pid, ivs)) = opt_pid_ivs {
                    if cycle_counter.can_generate_method(method5_range) {
                        if let Some(res) = create_if_passes_filter(
                            &gen_data,
                            pid,
                            ivs,
                            Gen3Method::Wild5,
                            cycle_counter.create_cycle_range(method5_range),
                        ) {
                            results.push(res);
                        }
                    }
                }
            }
        }

        cycle_counter.add_cycle(retry_pid_cycle + calc_modulo_cycle_unsigned(pid, 25));
    }
    cycle_counter.on_moment_reached(Moment::CreateMonWithNature_RandomPidHighLast);

    if !passes_pid_filter_internal(&gen_data, pid) {
        return Wild3GeneratorResults {
            mon_results: results,
            cycle_counter,
        };
    }

    CreateMon(rng, gen_data, cycle_counter, pid, results)
}

fn CreateMon(
    mut rng: Pokerng,
    gen_data: GenTmpData<'_>,
    mut cycle_counter: CycleFrameCounter,
    pid: u32,
    mut results: Vec<Wild3GeneratorMonResult>,
) -> Wild3GeneratorResults {
    cycle_counter.on_moment_reached(Moment::CreateMon);
    let opts = gen_data.opts;

    // between CreateMonWithNature_pidhigh and CreateBoxMon_ivs1
    let method2_range =
        calc_modulo_cycle_unsigned(pid, 25) + 100 * calc_modulo_cycle_unsigned(pid, 24) + 36900;

    if opts.methods.contains(&Gen3Method::Wild2)
        && cycle_counter.can_generate_method(method2_range)
        && let Some(gen_mon_wild2) = simulate_wild_method2(
            &gen_data,
            rng,
            pid,
            cycle_counter.create_cycle_range(method2_range),
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
        && cycle_counter.can_generate_method(method4_range)
        && let Some(gen_mon_wild4) = simulate_wild_method4(
            &gen_data,
            rng,
            pid,
            iv1,
            cycle_counter.create_cycle_range(method4_range),
        )
    {
        results.push(gen_mon_wild4);
    }
    cycle_counter.add_cycle(method4_range);

    cycle_counter.on_moment_reached(Moment::CreateBoxMon_RandomIvs2);
    if opts.methods.contains(&Gen3Method::Wild1)
        && cycle_counter.can_generate_method(INFINITE_CYCLE)
    {
        let ivs = Ivs::new_g3(iv1, rand_next_u16(&mut rng, "iv2_wild1", 1));

        if let Some(gen_mon_wild1) = create_if_passes_filter(
            &gen_data,
            pid,
            ivs,
            Gen3Method::Wild1,
            cycle_counter.create_cycle_range(INFINITE_CYCLE),
        ) {
            results.push(gen_mon_wild1);
        }
    }

    Wild3GeneratorResults {
        mon_results: results,
        cycle_counter,
    }
}

fn TryStartRoamerEncounter(
    rng: &mut Pokerng,
    opts: &Wild3GeneratorOptions,
    cycle_counter: &mut CycleFrameCounter,
) -> Option<Wild3EncounterIndex> {
    cycle_counter.on_moment_reached(Moment::TryStartRoamerEncounter);
    match opts.roamer_state {
        Wild3RoamerState::ActiveInMapLatias | Wild3RoamerState::ActiveInMapLatios
            if rng.rand::<u16>() % 4 == 0 =>
        {
            Some(Wild3EncounterIndex::Roamer(opts.roamer_state))
        }
        _ => None,
    }
}

fn DoMassOutbreakEncounterTest(
    rng: &mut Pokerng,
    opts: &Wild3GeneratorOptions,
    cycle_counter: &mut CycleFrameCounter,
) -> bool {
    cycle_counter.on_moment_reached(Moment::DoMassOutbreakEncounterTest);
    !matches!(
        opts.mass_outbreak_state,
        Wild3MassOutbreakState::Inactive | Wild3MassOutbreakState::ActiveNotInMap
    ) && rng.rand::<u16>() % 100 < 50
}

fn SetUpMassOutbreakEncounter(
    rng: &mut Pokerng,
    _flags: u8,
    opts: &Wild3GeneratorOptions,
    map_data: &Wild3MapGameData,
    cycle_counter: &mut CycleFrameCounter,
) -> Option<(Wild3EncounterIndex, u8)> {
    cycle_counter.on_moment_reached(Moment::SetUpMassOutbreakEncounter);
    let index = Wild3EncounterIndex::MassOutbreak(opts.mass_outbreak_state);
    let encounter = map_data.get_encounter(opts.action, index)?;
    let level = ChooseWildMonLevel(rng, encounter, opts.lead, cycle_counter);
    Some((index, level))
}

fn TryGenerateWildMon(
    rng: &mut Pokerng,
    opts: &Wild3GeneratorOptions,
    map_data: &Wild3MapGameData,
    _flags: u8,
    cycle_counter: &mut CycleFrameCounter,
) -> Option<(Wild3EncounterIndex, u8)> {
    cycle_counter.on_moment_reached(Moment::TryGenerateWildMon);
    let slots = map_data.slots_by_action.get(opts.action as usize)?;
    let index = if opts.action == Wild3Action::SweetScentLand {
        TryGetAbilityInfluencedWildMonIndex(
            rng,
            slots,
            true,
            Gen3Lead::MagnetPull,
            opts.lead,
            cycle_counter,
        )
        .or_else(|| {
            TryGetAbilityInfluencedWildMonIndex(
                rng,
                slots,
                false,
                Gen3Lead::Static,
                opts.lead,
                cycle_counter,
            )
        })
        .unwrap_or_else(|| ChooseWildMonIndex_Land(rng, opts.lead, cycle_counter))
    } else if opts.action == Wild3Action::SweetScentWater {
        TryGetAbilityInfluencedWildMonIndex(
            rng,
            slots,
            false,
            Gen3Lead::Static,
            opts.lead,
            cycle_counter,
        )
        .unwrap_or_else(|| ChooseWildMonIndex_WaterRock(rng, opts.lead, cycle_counter))
    } else {
        ChooseWildMonIndex_WaterRock(rng, opts.lead, cycle_counter)
    };
    let encounter = slots.get(index)?;
    let level = ChooseWildMonLevel(rng, encounter, opts.lead, cycle_counter);
    Some((Wild3EncounterIndex::Slot((index as u8).into()), level))
}

fn TryGetAbilityInfluencedWildMonIndex(
    rng: &mut Pokerng,
    slots: &[Wild3EncounterGameData],
    steel: bool,
    ability: Gen3Lead,
    lead: Gen3Lead,
    cycle_counter: &mut CycleFrameCounter,
) -> Option<usize> {
    cycle_counter.on_moment_reached(Moment::TryGetAbilityInfluencedWildMonIndex);
    if lead != ability || rng.rand::<u16>() % 2 != 0 {
        return None;
    }
    TryGetRandomWildMonIndexByType(rng, slots, steel, cycle_counter)
}

fn TryGetRandomWildMonIndexByType(
    rng: &mut Pokerng,
    slots: &[Wild3EncounterGameData],
    steel: bool,
    cycle_counter: &mut CycleFrameCounter,
) -> Option<usize> {
    cycle_counter.on_moment_reached(Moment::TryGetRandomWildMonIndexByType);
    let matching: Vec<_> = slots
        .iter()
        .enumerate()
        .filter_map(|(i, slot)| {
            let matched = if steel {
                slot.species_data.is_steel_type()
            } else {
                slot.species_data.is_electric_type()
            };
            matched.then_some(i)
        })
        .collect();
    if matching.is_empty() || matching.len() == slots.len() {
        return None;
    }
    Some(matching[rng.rand::<u16>() as usize % matching.len()])
}

fn choose_index(
    rng: &mut Pokerng,
    lead: Gen3Lead,
    action: Wild3Action,
    cycle_counter: &mut CycleFrameCounter,
) -> usize {
    match lead {
        Gen3Lead::Egg => cycle_counter.add_cycle(2819),
        _ => cycle_counter.add(12059, 32),
    }
    let moment = if action == Wild3Action::SweetScentLand {
        Moment::ChooseWildMonIndex_Land_Random
    } else {
        Moment::ChooseWildMonIndex_WaterRock_Random
    };
    cycle_counter.on_moment_reached(moment);
    let value = rng.rand::<u16>() as u32;
    cycle_counter.add_cycle(if lead == Gen3Lead::Egg { 234 } else { 378 });
    cycle_counter.add_cycle(calc_modulo_cycle_unsigned(value, 100));
    let slot =
        EncounterSlot::from_rand((value % 100) as u8, EncounterSlot::gen3_thresholds(action));
    slot as usize
}

fn ChooseWildMonIndex_Land(
    rng: &mut Pokerng,
    lead: Gen3Lead,
    cycle_counter: &mut CycleFrameCounter,
) -> usize {
    cycle_counter.on_moment_reached(Moment::ChooseWildMonIndex_Land);
    choose_index(rng, lead, Wild3Action::SweetScentLand, cycle_counter)
}

fn ChooseWildMonIndex_WaterRock(
    rng: &mut Pokerng,
    lead: Gen3Lead,
    cycle_counter: &mut CycleFrameCounter,
) -> usize {
    cycle_counter.on_moment_reached(Moment::ChooseWildMonIndex_WaterRock);
    choose_index(rng, lead, Wild3Action::SweetScentWater, cycle_counter)
}

fn ChooseWildMonLevel(
    rng: &mut Pokerng,
    encounter: &Wild3EncounterGameData,
    lead: Gen3Lead,
    cycle_counter: &mut CycleFrameCounter,
) -> u8 {
    cycle_counter.on_moment_reached(Moment::ChooseWildMonLevel);
    cycle_counter.on_moment_reached(Moment::ChooseWildMonLevel_RandomLvl);
    let range = encounter.max_level - encounter.min_level + 1;
    let value = rng.rand::<u16>();
    cycle_counter.add_cycle(calc_modulo_cycle_signed(value as i32, range as i32));
    let mut increment = (value % range as u16) as u8;
    if lead == Gen3Lead::HustleVitalSpiritPressure {
        if rng.rand::<u16>() % 2 == 0 {
            return encounter.max_level;
        }
        increment = increment.saturating_sub(1);
    }
    encounter.min_level + increment
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

fn rand_next_u16(rng: &mut Pokerng, _reason: &str, _modulo: u16) -> u16 {
    rng.rand::<u16>()
    // rand_next_u16_with_debug_print(rng, _reason, _modulo) // Uncomment for debugging
}

#[wasm_bindgen]
// Only returns the mid case (which is the one used by the generator)
pub fn get_feebas_vblank_from_feebas_cycle(feebas_cycles: usize) -> usize {
    let (_, mid, _) = get_min_mid_max_pre_sweet_scent_cycle(Wild3Action::OldRod);
    let (_, mid_vblank, _) = get_min_mid_max_vblank_cycle_duration();

    let (_, mid_case_vblank) =
        apply_cycles_causing_vblanks_on_cycle_counter(mid, feebas_cycles, mid_vblank);

    mid_case_vblank
}

pub fn apply_cycles_causing_vblanks_on_cycle_counter(
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

pub const MAX_FEEBAS_VBLANK: usize = 4;

fn handle_feebas_cycle_counter(
    rng: &mut Pokerng,
    cycle_counter: &mut CycleFrameCounter,
    feebas_cycles: usize,
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

    let abs_cycle_from_cycle_counter = cycle_counter.get_current_cycle_count() + mid; // At this points, lead_pid_mod is 0.
    // Limitation: We can only add cycles. In most cases, mid_case_cycle should be > abs_cycle_from_cycle_counter, because abs_cycle_from_cycle_counter is small.
    if mid_case_cycle > abs_cycle_from_cycle_counter {
        cycle_counter.add_cycle(mid_case_cycle - abs_cycle_from_cycle_counter);
    }

    let vblank_diff = max_case_vblank - min_case_vblank;
    cycle_counter.set_cycle_instability(if vblank_diff != 0 {
        1.0
    } else {
        // Each vblank adds instability because vblank duration is variable.
        mid_case_vblank as f32 / MAX_FEEBAS_VBLANK as f32
    });
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

fn simulate_wild_method2(
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

fn simulate_wild_method3(
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

fn simulate_wild_method4(
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

fn get_wild_method5_retry_count(
    gen_data: &GenTmpData,
    mut rng: Pokerng,
    initial_pid: u32,
) -> (usize, usize, Option<(u32, Ivs)>) {
    let mut unshifted_pid_low = rand_next_u16(&mut rng, "vblank_wild5", 1) as u32;
    let mut cycle_increment = calc_modulo_cycle_unsigned(initial_pid, 25)
        + if Nature::from_pid(initial_pid) == gen_data.required_nature {
            140
        } else {
            158
        };
    let mut unshifted_pid_accepted = false;

    // Limitation: Only 1 vblank is supported. In theory, multiple vblanks could occur.

    let mut pid: u32;
    let mut retry_count = 0_usize;
    loop {
        let pid_low = rand_next_u16(&mut rng, "pid_low_wild5", 1) as u32;
        let pid_high = rand_next_u16(&mut rng, "pid_high_wild5", 1) as u32;
        pid = (pid_high << 16) | pid_low;

        // The shifted low half is the high half of the next unshifted PID.
        let unshifted_pid = (pid_low << 16) | unshifted_pid_low;
        let unshifted_good_nature = Nature::from_pid(unshifted_pid) == gen_data.required_nature;
        if !unshifted_pid_accepted {
            cycle_increment += 80;
            unshifted_pid_accepted = unshifted_good_nature
                && gen_data.required_gender.is_none_or(|gender| {
                    gen_data
                        .encounter_gender_ratio
                        .gender_from_pid(unshifted_pid)
                        == gender
                });
        }
        unshifted_pid_low = pid_high;

        let unshifted_retry_cycles = if unshifted_pid_accepted {
            0
        } else {
            calc_modulo_cycle_unsigned(unshifted_pid, 25)
                + if unshifted_good_nature { 140 } else { 158 }
        };
        if Nature::from_pid(pid) != gen_data.required_nature {
            retry_count += 1;
            cycle_increment += unshifted_retry_cycles;
            continue;
        }
        if let Some(required_gender) = gen_data.required_gender {
            let generated_mon_gender = gen_data.encounter_gender_ratio.gender_from_pid(pid);
            if generated_mon_gender != required_gender {
                retry_count += 1;
                cycle_increment += unshifted_retry_cycles;
                continue;
            }
        }
        break;
    }

    if !passes_pid_filter_internal(gen_data, pid) {
        return (retry_count, cycle_increment, None);
    }

    let ivs = Ivs::new_g3(
        rand_next_u16(&mut rng, "iv1_wild5", 1),
        rand_next_u16(&mut rng, "iv2_wild5", 1),
    );

    (retry_count, cycle_increment, Some((pid, ivs)))
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

#[cfg(test)]
#[path = "tests/generator_new_parity_tests.rs"]
pub(super) mod tests;
