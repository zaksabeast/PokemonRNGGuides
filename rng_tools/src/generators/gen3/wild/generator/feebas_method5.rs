use super::*;

#[derive(Clone, Copy)]
struct FeebasEncounter<'a> {
    opts: &'a Wild3GeneratorOptions,
    encounter_idx: Wild3EncounterIndex,
    encounter: &'a Wild3EncounterGameData,
}

#[derive(Debug, PartialEq)]
struct FeebasMethod5Candidate {
    encounter_idx: Wild3EncounterIndex,
    lvl: u8,
    pid: u32,
    ivs: Ivs,
}

pub(super) fn generate(
    rng: Pokerng,
    opts: &Wild3GeneratorOptions,
    map_data: &Wild3MapGameData,
    is_feebas: bool,
) -> Vec<Wild3GeneratorMonResult> {
    // The legacy Feebas counter cannot represent these windows reliably. Keep
    // them out of likelihood calculations until post-CheckFeebas timing is modeled.
    if opts.cycle_opts != Wild3GeneratorCycleOpts::Inactive
        || !opts.methods.contains(&Gen3Method::Wild5)
        || opts.feebas_state == Wild3FeebasState::NotInMap
        || map_data.feebas.is_none()
        || map_data.is_safari
        || !matches!(
            opts.action,
            Wild3Action::OldRod | Wild3Action::GoodRod | Wild3Action::SuperRod
        )
    {
        return vec![];
    }

    collect_candidates(rng, opts, map_data, is_feebas)
        .into_iter()
        .map(|candidate| Wild3GeneratorMonResult {
            encounter_idx: candidate.encounter_idx,
            lvl: candidate.lvl,
            pid: candidate.pid,
            ivs: candidate.ivs,
            method: Gen3Method::Wild5,
            cycle_range: None,
            used_safari_pokeblock: None,
        })
        .collect()
}

fn collect_candidates(
    mut rng: Pokerng,
    opts: &Wild3GeneratorOptions,
    map_data: &Wild3MapGameData,
    is_feebas: bool,
) -> Vec<FeebasMethod5Candidate> {
    let mut results = vec![];
    let encounter_idx = if is_feebas {
        Wild3EncounterIndex::Feebas
    } else {
        results.extend(simulate_wild_method5_feebas_fishing_slot(rng, opts, map_data));

        fishing_slot(&mut rng, opts.action)
    };
    let Some(encounter) = map_data.get_encounter(opts.action, encounter_idx) else {
        return results;
    };
    let context = FeebasEncounter {
        opts,
        encounter_idx,
        encounter,
    };

    results.extend(simulate_wild_method5_feebas_level(rng, context));

    let increment = level_increment(&mut rng, encounter);
    if opts.lead == Gen3Lead::HustleVitalSpiritPressure {
        results.extend(simulate_wild_method5_feebas_level_ability(
            rng, context, increment,
        ));
    }

    let lvl = finish_level(&mut rng, context, increment);
    let mut required_gender = None;
    if uses_cute_charm(context) {
        results.extend(simulate_wild_method5_feebas_cute_charm(rng, context, lvl));
        required_gender = roll_cute_charm(&mut rng, opts.lead);
    }

    let required_nature = collect_nature(&mut rng, context, lvl, required_gender, &mut results);
    results.extend(simulate_wild_method5_feebas_pid_low(
        rng,
        context,
        lvl,
        required_gender,
        required_nature,
    ));

    results
}

fn collect_nature(
    rng: &mut Pokerng,
    context: FeebasEncounter<'_>,
    lvl: u8,
    required_gender: Option<Gender>,
    results: &mut Vec<FeebasMethod5Candidate>,
) -> Nature {
    if let Gen3Lead::Synchronize(nature) = context.opts.lead {
        results.extend(simulate_wild_method5_feebas_synchronize(
            *rng,
            context,
            lvl,
            required_gender,
        ));

        if rng.rand::<u16>() & 1 == 0 {
            return nature;
        }
    }

    collect_random_nature(rng, context, lvl, required_gender, results)
}

fn collect_random_nature(
    rng: &mut Pokerng,
    context: FeebasEncounter<'_>,
    lvl: u8,
    required_gender: Option<Gender>,
    results: &mut Vec<FeebasMethod5Candidate>,
) -> Nature {
    results.extend(simulate_wild_method5_feebas_nature(
        *rng,
        context,
        lvl,
        required_gender,
    ));

    random_nature(rng)
}

fn fishing_slot(rng: &mut Pokerng, action: Wild3Action) -> Wild3EncounterIndex {
    let value = rng.rand::<u16>() % 100;
    let slot = EncounterSlot::from_rand(value as u8, EncounterSlot::gen3_thresholds(action));

    Wild3EncounterIndex::Slot(slot)
}

fn level_increment(rng: &mut Pokerng, encounter: &Wild3EncounterGameData) -> u8 {
    let range = encounter.max_level - encounter.min_level + 1;

    (rng.rand::<u16>() % u16::from(range)) as u8
}

fn finish_level(rng: &mut Pokerng, context: FeebasEncounter<'_>, increment: u8) -> u8 {
    if context.opts.lead != Gen3Lead::HustleVitalSpiritPressure {
        return context.encounter.min_level + increment;
    }

    if rng.rand::<u16>() % 2 == 0 {
        return context.encounter.max_level;
    }

    context.encounter.min_level + increment.saturating_sub(1)
}

fn uses_cute_charm(context: FeebasEncounter<'_>) -> bool {
    matches!(context.opts.lead, Gen3Lead::CuteCharm(_))
        && context.encounter.species_data.gender_ratio().has_multiple_genders()
}

fn roll_cute_charm(rng: &mut Pokerng, lead: Gen3Lead) -> Option<Gender> {
    let Gen3Lead::CuteCharm(lead_gender) = lead else {
        return None;
    };

    if rng.rand::<u16>().is_multiple_of(3) {
        return None;
    }

    Some(if lead_gender == Gender::Female {
        Gender::Male
    } else {
        Gender::Female
    })
}

fn random_nature(rng: &mut Pokerng) -> Nature {
    ((rng.rand::<u16>() % 25) as u8).into()
}

fn complete_level(
    mut rng: Pokerng,
    context: FeebasEncounter<'_>,
) -> Option<FeebasMethod5Candidate> {
    let increment = level_increment(&mut rng, context.encounter);
    let lvl = finish_level(&mut rng, context, increment);

    complete_cute_charm(rng, context, lvl)
}

fn complete_cute_charm(
    mut rng: Pokerng,
    context: FeebasEncounter<'_>,
    lvl: u8,
) -> Option<FeebasMethod5Candidate> {
    let required_gender = if uses_cute_charm(context) {
        roll_cute_charm(&mut rng, context.opts.lead)
    } else {
        None
    };

    complete_nature(rng, context, lvl, required_gender)
}

fn complete_nature(
    mut rng: Pokerng,
    context: FeebasEncounter<'_>,
    lvl: u8,
    required_gender: Option<Gender>,
) -> Option<FeebasMethod5Candidate> {
    let nature = match context.opts.lead {
        Gen3Lead::Synchronize(nature) if rng.rand::<u16>() & 1 == 0 => nature,
        _ => random_nature(&mut rng),
    };

    complete_pid(rng, context, lvl, required_gender, nature)
}

fn complete_pid(
    mut rng: Pokerng,
    context: FeebasEncounter<'_>,
    lvl: u8,
    required_gender: Option<Gender>,
    required_nature: Nature,
) -> Option<FeebasMethod5Candidate> {
    let species_matches = context
        .opts
        .gen3_filter
        .species
        .is_none_or(|species| species == context.encounter.species_data.species);
    let level_matches = context.opts.gen3_filter.lvl.is_none_or(|wanted| wanted == lvl);
    if !species_matches || !level_matches {
        return None;
    }

    let gen_data = GenTmpData {
        opts: context.opts,
        encounter_idx: context.encounter_idx,
        lvl,
        encounter_gender_ratio: context.encounter.species_data.gender_ratio(),
        required_gender,
        required_nature,
        used_safari_pokeblock: None,
        tsv_trv: TsvTrv::from_tid_sid(context.opts.tid, context.opts.sid),
    };

    let pid = loop {
        let low = u32::from(rng.rand::<u16>());
        let high = u32::from(rng.rand::<u16>());
        let pid = (high << 16) | low;
        if Nature::from_pid(pid) == required_nature
            && required_gender.is_none_or(|gender| {
                gen_data.encounter_gender_ratio.gender_from_pid(pid) == gender
            })
        {
            break pid;
        }
    };

    if !passes_pid_filter_internal(&gen_data, pid) {
        return None;
    }

    let ivs = Ivs::new_g3(rng.rand::<u16>(), rng.rand::<u16>());
    if !passes_ivs_filter(context.opts, &ivs)
        || (context.opts.gen3_filter.max_size && !is_max_size(pid, &ivs))
    {
        return None;
    }

    Some(FeebasMethod5Candidate {
        encounter_idx: context.encounter_idx,
        lvl,
        pid,
        ivs,
    })
}

fn simulate_wild_method5_feebas_fishing_slot(
    mut rng: Pokerng,
    opts: &Wild3GeneratorOptions,
    map_data: &Wild3MapGameData,
) -> Option<FeebasMethod5Candidate> {
    rng.jump(1);
    let encounter_idx = fishing_slot(&mut rng, opts.action);
    let encounter = map_data.get_encounter(opts.action, encounter_idx)?;

    complete_level(
        rng,
        FeebasEncounter {
            opts,
            encounter_idx,
            encounter,
        },
    )
}

fn simulate_wild_method5_feebas_level(
    mut rng: Pokerng,
    context: FeebasEncounter<'_>,
) -> Option<FeebasMethod5Candidate> {
    rng.jump(1);

    complete_level(rng, context)
}

fn simulate_wild_method5_feebas_level_ability(
    mut rng: Pokerng,
    context: FeebasEncounter<'_>,
    increment: u8,
) -> Option<FeebasMethod5Candidate> {
    rng.jump(1);
    let lvl = finish_level(&mut rng, context, increment);

    complete_cute_charm(rng, context, lvl)
}

fn simulate_wild_method5_feebas_cute_charm(
    mut rng: Pokerng,
    context: FeebasEncounter<'_>,
    lvl: u8,
) -> Option<FeebasMethod5Candidate> {
    rng.jump(1);

    complete_cute_charm(rng, context, lvl)
}

fn simulate_wild_method5_feebas_synchronize(
    mut rng: Pokerng,
    context: FeebasEncounter<'_>,
    lvl: u8,
    required_gender: Option<Gender>,
) -> Option<FeebasMethod5Candidate> {
    rng.jump(1);

    complete_nature(rng, context, lvl, required_gender)
}

fn simulate_wild_method5_feebas_nature(
    mut rng: Pokerng,
    context: FeebasEncounter<'_>,
    lvl: u8,
    required_gender: Option<Gender>,
) -> Option<FeebasMethod5Candidate> {
    rng.jump(1);
    let nature = random_nature(&mut rng);

    complete_pid(rng, context, lvl, required_gender, nature)
}

fn simulate_wild_method5_feebas_pid_low(
    mut rng: Pokerng,
    context: FeebasEncounter<'_>,
    lvl: u8,
    required_gender: Option<Gender>,
    required_nature: Nature,
) -> Option<FeebasMethod5Candidate> {
    rng.jump(1);

    complete_pid(rng, context, lvl, required_gender, required_nature)
}

#[cfg(test)]
#[path = "../tests/feebas_method5_tests.rs"]
mod tests;
