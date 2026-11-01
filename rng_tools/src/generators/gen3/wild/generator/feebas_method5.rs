use super::*;

/*
The goal is to generate Pokemon outcomes when vblank occurs between CheckFeebas and PID generation, when fishing on a Feebas tile.
This class handles both Feebas and non-Feebas outcome.

calculate_:                         Calculate a return value (and updates rng state). No other side effect.
complete_from_X_until_the_end:      Generate the step X until the end of the Pokemon encounter. It generates a single outcome assuming no vblank.
simulate_wild_method5_feebas_XXX:   Generate the Pokemon outcome if a vblank occurs right before XXX.
*/

#[derive(Clone, Copy)]
struct GenTmpDataFeebas<'a> {
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
    cycle_range: CycleAndModRange,
) -> Vec<Wild3GeneratorMonResult> {
    if !is_enabled(opts, map_data) {
        return vec![];
    }

    let candidates = generate_candidates(rng, opts, map_data, is_feebas);
    let count = candidates.len();
    candidates
        .into_iter()
        .enumerate()
        .filter_map(|(index, candidate)| {
            let candidate = candidate?;
            let range = uniform_cycle_range(cycle_range, index, count);
            let cycle_range = if opts.cycle_opts == Wild3GeneratorCycleOpts::Inactive {
                None
            } else {
                if range.len == 0 {
                    return None;
                }

                Some(range)
            };

            Some(Wild3GeneratorMonResult {
                encounter_idx: candidate.encounter_idx,
                lvl: candidate.lvl,
                pid: candidate.pid,
                ivs: candidate.ivs,
                method: Gen3Method::Wild5,
                cycle_range,
                used_safari_pokeblock: None,
            })
        })
        .collect()
}

pub(super) fn is_enabled(opts: &Wild3GeneratorOptions, map_data: &Wild3MapGameData) -> bool {
    opts.methods.contains(&Gen3Method::Wild5)
        && opts.feebas_state != Wild3FeebasState::NotInMap
        && map_data.feebas.is_some()
        && opts.action.is_fishing()
}

fn uniform_cycle_range(range: CycleAndModRange, index: usize, count: usize) -> CycleAndModRange {
    let width = range.len / count;
    let remainder = range.len % count;
    let offset = width * index + index.min(remainder);

    CycleRange::new(
        range.start.cycle + offset,
        range.start.lead_pid_mod,
        width + usize::from(index < remainder),
    )
}

fn generate_candidates(
    mut rng: Pokerng,
    opts: &Wild3GeneratorOptions,
    map_data: &Wild3MapGameData,
    is_feebas: bool,
) -> Vec<Option<FeebasMethod5Candidate>> {
    let mut results = vec![];
    let encounter_idx = if is_feebas {
        Wild3EncounterIndex::Feebas
    } else {
        results.push(simulate_wild_method5_feebas_encounter_idx(
            rng, opts, map_data,
        ));

        calculate_encounter_idx(&mut rng, opts.action)
    };
    let Some(encounter) = map_data.get_encounter(opts.action, encounter_idx) else {
        return results;
    };
    let gen_data_feebas = GenTmpDataFeebas {
        opts,
        encounter_idx,
        encounter,
    };

    results.push(simulate_wild_method5_feebas_level(rng, gen_data_feebas));

    let increment = calculate_level_increment(&mut rng, encounter);
    if opts.lead == Gen3Lead::HustleVitalSpiritPressure {
        results.push(simulate_wild_method5_feebas_level_ability(
            rng,
            gen_data_feebas,
            increment,
        ));
    }

    let lvl = calculate_level(&mut rng, gen_data_feebas, increment);
    let mut required_gender = None;
    if matches!(gen_data_feebas.opts.lead, Gen3Lead::CuteCharm(_)) {
        results.push(simulate_wild_method5_feebas_cute_charm(
            rng,
            gen_data_feebas,
            lvl,
        ));
        required_gender = calculate_cute_charm_required_gender(&mut rng, opts.lead);
    }

    let synchronized_nature = if let Gen3Lead::Synchronize(nature) = opts.lead {
        results.push(simulate_wild_method5_feebas_synchronize(
            rng,
            gen_data_feebas,
            lvl,
            required_gender,
        ));

        (rng.rand::<u16>() & 1 == 0).then_some(nature)
    } else {
        None
    };

    let required_nature = match synchronized_nature {
        Some(nature) => nature,
        None => {
            results.push(simulate_wild_method5_feebas_nature(
                rng,
                gen_data_feebas,
                lvl,
                required_gender,
            ));

            calculate_random_nature(&mut rng)
        }
    };

    results.push(simulate_wild_method5_feebas_pid_low(
        rng,
        gen_data_feebas,
        lvl,
        required_gender,
        required_nature,
    ));

    results
}

fn calculate_encounter_idx(rng: &mut Pokerng, action: Wild3Action) -> Wild3EncounterIndex {
    let value = rng.rand::<u16>() % 100;
    let slot = EncounterSlot::from_rand(value as u8, EncounterSlot::gen3_thresholds(action));

    Wild3EncounterIndex::Slot(slot)
}

fn calculate_level_increment(rng: &mut Pokerng, encounter: &Wild3EncounterGameData) -> u8 {
    let range = encounter.max_level - encounter.min_level + 1;

    (rng.rand::<u16>() % u16::from(range)) as u8
}

fn calculate_level(rng: &mut Pokerng, gen_data_feebas: GenTmpDataFeebas<'_>, increment: u8) -> u8 {
    if gen_data_feebas.opts.lead != Gen3Lead::HustleVitalSpiritPressure {
        return gen_data_feebas.encounter.min_level + increment;
    }

    if rng.rand::<u16>() % 2 == 0 {
        return gen_data_feebas.encounter.max_level;
    }

    gen_data_feebas.encounter.min_level + increment.saturating_sub(1)
}

fn calculate_cute_charm_required_gender(rng: &mut Pokerng, lead: Gen3Lead) -> Option<Gender> {
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

fn calculate_random_nature(rng: &mut Pokerng) -> Nature {
    ((rng.rand::<u16>() % 25) as u8).into()
}

fn complete_from_level_until_the_end(
    mut rng: Pokerng,
    gen_data_feebas: GenTmpDataFeebas<'_>,
) -> Option<FeebasMethod5Candidate> {
    let increment = calculate_level_increment(&mut rng, gen_data_feebas.encounter);
    let lvl = calculate_level(&mut rng, gen_data_feebas, increment);

    complete_from_cute_charm_until_the_end(rng, gen_data_feebas, lvl)
}

fn complete_from_cute_charm_until_the_end(
    mut rng: Pokerng,
    gen_data_feebas: GenTmpDataFeebas<'_>,
    lvl: u8,
) -> Option<FeebasMethod5Candidate> {
    let required_gender = if matches!(gen_data_feebas.opts.lead, Gen3Lead::CuteCharm(_)) {
        calculate_cute_charm_required_gender(&mut rng, gen_data_feebas.opts.lead)
    } else {
        None
    };

    complete_from_nature_until_the_end(rng, gen_data_feebas, lvl, required_gender)
}

fn complete_from_nature_until_the_end(
    mut rng: Pokerng,
    gen_data_feebas: GenTmpDataFeebas<'_>,
    lvl: u8,
    required_gender: Option<Gender>,
) -> Option<FeebasMethod5Candidate> {
    let nature = match gen_data_feebas.opts.lead {
        Gen3Lead::Synchronize(nature) if rng.rand::<u16>() & 1 == 0 => nature,
        _ => calculate_random_nature(&mut rng),
    };

    complete_from_pid_until_the_end(rng, gen_data_feebas, lvl, required_gender, nature)
}

fn complete_from_pid_until_the_end(
    mut rng: Pokerng,
    gen_data_feebas: GenTmpDataFeebas<'_>,
    lvl: u8,
    required_gender: Option<Gender>,
    required_nature: Nature,
) -> Option<FeebasMethod5Candidate> {
    let species_matches = gen_data_feebas
        .opts
        .gen3_filter
        .species
        .is_none_or(|species| species == gen_data_feebas.encounter.species_data.species);
    let level_matches = gen_data_feebas
        .opts
        .gen3_filter
        .lvl
        .is_none_or(|wanted| wanted == lvl);
    if !species_matches || !level_matches {
        return None;
    }

    let gen_data = GenTmpData {
        opts: gen_data_feebas.opts,
        encounter_idx: gen_data_feebas.encounter_idx,
        lvl,
        encounter_gender_ratio: gen_data_feebas.encounter.species_data.gender_ratio(),
        required_gender,
        required_nature,
        used_safari_pokeblock: None,
        tsv_trv: TsvTrv::from_tid_sid(gen_data_feebas.opts.tid, gen_data_feebas.opts.sid),
        feebas_method5_ctx: None,
    };

    let pid = loop {
        let low = u32::from(rng.rand::<u16>());
        let high = u32::from(rng.rand::<u16>());
        let pid = (high << 16) | low;
        if Nature::from_pid(pid) == required_nature
            && required_gender
                .is_none_or(|gender| gen_data.encounter_gender_ratio.gender_from_pid(pid) == gender)
        {
            break pid;
        }
    };

    if !passes_pid_filter_internal(&gen_data, pid) {
        return None;
    }

    let ivs = Ivs::new_g3(rng.rand::<u16>(), rng.rand::<u16>());
    if !passes_ivs_filter(gen_data_feebas.opts, &ivs)
        || (gen_data_feebas.opts.gen3_filter.max_size && !is_max_size(pid, &ivs))
    {
        return None;
    }

    Some(FeebasMethod5Candidate {
        encounter_idx: gen_data_feebas.encounter_idx,
        lvl,
        pid,
        ivs,
    })
}

fn simulate_wild_method5_feebas_encounter_idx(
    mut rng: Pokerng,
    opts: &Wild3GeneratorOptions,
    map_data: &Wild3MapGameData,
) -> Option<FeebasMethod5Candidate> {
    rng.jump(1);
    let encounter_idx = calculate_encounter_idx(&mut rng, opts.action);
    let encounter = map_data.get_encounter(opts.action, encounter_idx)?;

    complete_from_level_until_the_end(
        rng,
        GenTmpDataFeebas {
            opts,
            encounter_idx,
            encounter,
        },
    )
}

fn simulate_wild_method5_feebas_level(
    mut rng: Pokerng,
    gen_data_feebas: GenTmpDataFeebas<'_>,
) -> Option<FeebasMethod5Candidate> {
    rng.jump(1);

    complete_from_level_until_the_end(rng, gen_data_feebas)
}

fn simulate_wild_method5_feebas_level_ability(
    mut rng: Pokerng,
    gen_data_feebas: GenTmpDataFeebas<'_>,
    increment: u8,
) -> Option<FeebasMethod5Candidate> {
    rng.jump(1);
    let lvl = calculate_level(&mut rng, gen_data_feebas, increment);

    complete_from_cute_charm_until_the_end(rng, gen_data_feebas, lvl)
}

fn simulate_wild_method5_feebas_cute_charm(
    mut rng: Pokerng,
    gen_data_feebas: GenTmpDataFeebas<'_>,
    lvl: u8,
) -> Option<FeebasMethod5Candidate> {
    rng.jump(1);

    complete_from_cute_charm_until_the_end(rng, gen_data_feebas, lvl)
}

fn simulate_wild_method5_feebas_synchronize(
    mut rng: Pokerng,
    gen_data_feebas: GenTmpDataFeebas<'_>,
    lvl: u8,
    required_gender: Option<Gender>,
) -> Option<FeebasMethod5Candidate> {
    rng.jump(1);

    complete_from_nature_until_the_end(rng, gen_data_feebas, lvl, required_gender)
}

fn simulate_wild_method5_feebas_nature(
    mut rng: Pokerng,
    gen_data_feebas: GenTmpDataFeebas<'_>,
    lvl: u8,
    required_gender: Option<Gender>,
) -> Option<FeebasMethod5Candidate> {
    rng.jump(1);
    let nature = calculate_random_nature(&mut rng);

    complete_from_pid_until_the_end(rng, gen_data_feebas, lvl, required_gender, nature)
}

fn simulate_wild_method5_feebas_pid_low(
    mut rng: Pokerng,
    gen_data_feebas: GenTmpDataFeebas<'_>,
    lvl: u8,
    required_gender: Option<Gender>,
    required_nature: Nature,
) -> Option<FeebasMethod5Candidate> {
    rng.jump(1);

    complete_from_pid_until_the_end(rng, gen_data_feebas, lvl, required_gender, required_nature)
}

#[cfg(test)]
#[path = "../tests/feebas_method5_tests.rs"]
mod tests;
