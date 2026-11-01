use super::*;
use crate::{HiddenPowerFilter, Nature, PkmFilter, ShinyFilter, Species, gen3::Gen3PkmFilter};

fn options(lead: Gen3Lead) -> Wild3GeneratorOptions {
    Wild3GeneratorOptions {
        action: Wild3Action::GoodRod,
        methods: vec![Gen3Method::Wild1, Gen3Method::Wild5],
        feebas_state: Wild3FeebasState::OnFeebasTile,
        lead,
        ..Default::default()
    }
}

fn encounter() -> Wild3EncounterGameData {
    Wild3EncounterGameData {
        min_level: 20,
        max_level: 30,
        ..Default::default()
    }
}

fn game_data() -> Wild3MapGameData {
    let mut data = Wild3MapGameData {
        feebas: Some(encounter()),
        ..Default::default()
    };

    data.slots_by_action[Wild3Action::GoodRod as usize] = vec![encounter(); 3];

    data
}

fn candidate(lvl: u8, pid: u32, ivs: Ivs) -> FeebasMethod5Candidate {
    FeebasMethod5Candidate {
        encounter_idx: Wild3EncounterIndex::Feebas,
        lvl,
        pid,
        ivs,
    }
}

fn result(
    encounter_idx: Wild3EncounterIndex,
    lvl: u8,
    pid: u32,
    ivs: Ivs,
    method: Gen3Method,
) -> Wild3GeneratorMonResult {
    Wild3GeneratorMonResult {
        encounter_idx,
        lvl,
        pid,
        ivs,
        method,
        cycle_range: None,
        used_safari_pokeblock: None,
    }
}

type Simulator = fn(Pokerng, FeebasEncounter<'_>) -> Option<FeebasMethod5Candidate>;

#[test]
fn named_simulators_complete_the_shifted_encounter() {
    let cases: [(Gen3Lead, Simulator, FeebasMethod5Candidate); 6] = [
        (
            Gen3Lead::Vanilla,
            simulate_wild_method5_feebas_level,
            candidate(23, 2_989_458_115, Ivs::new(7, 25, 3, 5, 9, 26)),
        ),
        (
            Gen3Lead::HustleVitalSpiritPressure,
            |rng, context| simulate_wild_method5_feebas_level_ability(rng, context, 4),
            candidate(30, 2_989_458_115, Ivs::new(7, 25, 3, 5, 9, 26)),
        ),
        (
            Gen3Lead::CuteCharm(Gender::Male),
            |rng, context| simulate_wild_method5_feebas_cute_charm(rng, context, 24),
            candidate(24, 2_989_458_115, Ivs::new(7, 25, 3, 5, 9, 26)),
        ),
        (
            Gen3Lead::Synchronize(Nature::Adamant),
            |rng, context| simulate_wild_method5_feebas_synchronize(rng, context, 24, None),
            candidate(24, 1_742_197_728, Ivs::new(3, 10, 23, 3, 28, 24)),
        ),
        (
            Gen3Lead::Vanilla,
            |rng, context| simulate_wild_method5_feebas_nature(rng, context, 24, None),
            candidate(24, 1_645_179_676, Ivs::new(18, 2, 17, 7, 4, 8)),
        ),
        (
            Gen3Lead::Vanilla,
            |rng, context| {
                simulate_wild_method5_feebas_pid_low(rng, context, 24, None, Nature::Adamant)
            },
            candidate(24, 3_165_908_578, Ivs::new(12, 20, 24, 3, 16, 24)),
        ),
    ];
    let encounter = encounter();
    let rng = Pokerng::new(0x12345678);

    for (lead, simulate, expected) in cases {
        let opts = options(lead);
        let context = FeebasEncounter {
            opts: &opts,
            encounter_idx: Wild3EncounterIndex::Feebas,
            encounter: &encounter,
        };

        assert_eq!(simulate(rng, context), Some(expected), "{lead:?}");
        assert_eq!(rng.seed(), 0x12345678);
    }
}

#[test]
fn fishing_slot_simulator_reselects_the_encounter() {
    let opts = options(Gen3Lead::Vanilla);
    let data = game_data();
    let rng = Pokerng::new(0x12345678);

    assert_eq!(
        simulate_wild_method5_feebas_fishing_slot(rng, &opts, &data),
        Some(FeebasMethod5Candidate {
            encounter_idx: Wild3EncounterIndex::Slot(EncounterSlot::Slot0),
            lvl: 28,
            pid: 2_193_854_288,
            ivs: Ivs::new(15, 17, 12, 25, 3, 7),
        })
    );
    assert_eq!(rng.seed(), 0x12345678);
}

#[test]
fn level_ability_preserves_zero_increment_on_failure() {
    let opts = options(Gen3Lead::HustleVitalSpiritPressure);
    let encounter = encounter();
    let context = FeebasEncounter {
        opts: &opts,
        encounter_idx: Wild3EncounterIndex::Feebas,
        encounter: &encounter,
    };

    assert_eq!(
        simulate_wild_method5_feebas_level_ability(Pokerng::new(1), context, 0),
        Some(candidate(20, 1_749_655_523, Ivs::new(0, 31, 13, 3, 8, 12)))
    );
    assert_eq!(
        simulate_wild_method5_feebas_level_ability(Pokerng::new(0), context, 0),
        Some(candidate(
            30,
            4_231_227_355,
            Ivs::new(12, 25, 27, 2, 31, 30)
        ))
    );
}

#[test]
fn shifted_cute_charm_and_synchronize_rolls_change_the_continuation() {
    let encounter = encounter();
    let cases: [(Gen3Lead, Simulator, FeebasMethod5Candidate); 4] = [
        (
            Gen3Lead::CuteCharm(Gender::Male),
            |rng, context| simulate_wild_method5_feebas_cute_charm(rng, context, 24),
            candidate(24, 3_657_481_780, Ivs::new(10, 3, 28, 30, 23, 5)),
        ),
        (
            Gen3Lead::CuteCharm(Gender::Male),
            |rng, context| simulate_wild_method5_feebas_cute_charm(rng, context, 24),
            candidate(24, 2_262_184_773, Ivs::new(6, 7, 28, 6, 29, 12)),
        ),
        (
            Gen3Lead::Synchronize(Nature::Adamant),
            |rng, context| simulate_wild_method5_feebas_synchronize(rng, context, 24, None),
            candidate(24, 3_805_056_578, Ivs::new(5, 30, 11, 30, 25, 27)),
        ),
        (
            Gen3Lead::Synchronize(Nature::Adamant),
            |rng, context| simulate_wild_method5_feebas_synchronize(rng, context, 24, None),
            candidate(24, 1_749_655_523, Ivs::new(0, 31, 13, 3, 8, 12)),
        ),
    ];

    for (index, (lead, simulate, expected)) in cases.into_iter().enumerate() {
        let opts = options(lead);
        let context = FeebasEncounter {
            opts: &opts,
            encounter_idx: Wild3EncounterIndex::Feebas,
            encounter: &encounter,
        };

        let seed = if index % 2 == 0 { 0 } else { 1 };

        assert_eq!(simulate(Pokerng::new(seed), context), Some(expected));
    }
}

#[test]
fn successful_feebas_check_collects_every_early_branch() {
    let opts = options(Gen3Lead::Vanilla);
    let generated = generate_wild3_internal(Pokerng::new(38), &opts, &game_data());

    assert_eq!(
        generated.mon_results,
        vec![
            result(
                Wild3EncounterIndex::Feebas,
                20,
                1_434_552_371,
                Ivs::new(15, 13, 14, 22, 16, 10),
                Gen3Method::Wild5,
            ),
            result(
                Wild3EncounterIndex::Feebas,
                26,
                1_434_552_371,
                Ivs::new(15, 13, 14, 22, 16, 10),
                Gen3Method::Wild5,
            ),
            result(
                Wild3EncounterIndex::Feebas,
                26,
                2_728_376_208,
                Ivs::new(24, 26, 1, 22, 6, 5),
                Gen3Method::Wild5,
            ),
            result(
                Wild3EncounterIndex::Feebas,
                26,
                2_285_078_183,
                Ivs::new(1, 12, 21, 13, 14, 15),
                Gen3Method::Wild1,
            ),
        ]
    );
}

#[test]
fn failed_feebas_roll_still_collects_every_early_branch() {
    let opts = options(Gen3Lead::Vanilla);
    let generated = generate_wild3_internal(Pokerng::new(75), &opts, &game_data());
    let slot = Wild3EncounterIndex::Slot(EncounterSlot::Slot0);

    assert_eq!(
        generated.mon_results,
        vec![
            result(
                slot,
                25,
                1_281_017_505,
                Ivs::new(29, 29, 5, 23, 24, 22),
                Gen3Method::Wild5
            ),
            result(
                slot,
                25,
                1_281_017_505,
                Ivs::new(29, 29, 5, 23, 24, 22),
                Gen3Method::Wild5
            ),
            result(
                slot,
                29,
                1_281_017_505,
                Ivs::new(29, 29, 5, 23, 24, 22),
                Gen3Method::Wild5
            ),
            result(
                slot,
                29,
                1_570_497_449,
                Ivs::new(1, 21, 17, 2, 19, 26),
                Gen3Method::Wild5
            ),
            result(
                slot,
                29,
                4_099_577_474,
                Ivs::new(4, 3, 10, 14, 19, 28),
                Gen3Method::Wild1
            ),
        ]
    );
}

#[test]
fn non_feebas_tile_collects_the_slot_branch() {
    let opts = Wild3GeneratorOptions {
        feebas_state: Wild3FeebasState::InMapButNotOnFeebasTile,
        ..options(Gen3Lead::Vanilla)
    };
    let generated = generate_wild3_internal(Pokerng::new(23), &opts, &game_data());
    let slot = Wild3EncounterIndex::Slot(EncounterSlot::Slot0);

    assert_eq!(
        generated.mon_results,
        vec![
            result(
                Wild3EncounterIndex::Slot(EncounterSlot::Slot1),
                28,
                1_350_938_376,
                Ivs::new(17, 17, 4, 16, 30, 15),
                Gen3Method::Wild5,
            ),
            result(
                slot,
                28,
                1_350_938_376,
                Ivs::new(17, 17, 4, 16, 30, 15),
                Gen3Method::Wild5
            ),
            result(
                slot,
                25,
                1_350_938_376,
                Ivs::new(17, 17, 4, 16, 30, 15),
                Gen3Method::Wild5
            ),
            result(
                slot,
                25,
                695_037_558,
                Ivs::new(8, 23, 28, 12, 25, 6),
                Gen3Method::Wild5
            ),
            result(
                slot,
                25,
                3_952_654_783,
                Ivs::new(16, 12, 8, 6, 5, 10),
                Gen3Method::Wild1
            ),
        ]
    );
}

#[test]
fn baseline_level_filter_stops_before_method5_generation() {
    let opts = Wild3GeneratorOptions {
        gen3_filter: Gen3PkmFilter {
            lvl: Some(20),
            ..Default::default()
        },
        ..options(Gen3Lead::Vanilla)
    };

    assert_eq!(
        generate_wild3_internal(Pokerng::new(38), &opts, &game_data()).mon_results,
        vec![]
    );
}

#[test]
fn baseline_species_filter_stops_before_method5_generation() {
    let opts = Wild3GeneratorOptions {
        feebas_state: Wild3FeebasState::InMapButNotOnFeebasTile,
        gen3_filter: Gen3PkmFilter {
            species: Some(Species::Magikarp),
            ..Default::default()
        },
        ..options(Gen3Lead::Vanilla)
    };
    let mut data = game_data();
    data.slots_by_action[Wild3Action::GoodRod as usize][1]
        .species_data
        .species = Species::Magikarp;

    assert_eq!(
        generate_wild3_internal(Pokerng::new(23), &opts, &data).mon_results,
        vec![]
    );
}

#[test]
fn synchronize_success_only_branches_at_executed_calls() {
    let opts = options(Gen3Lead::Synchronize(Nature::Adamant));
    let generated = generate_wild3_internal(Pokerng::new(42), &opts, &game_data());

    assert_eq!(
        generated.mon_results,
        vec![
            result(
                Wild3EncounterIndex::Feebas,
                28,
                2_446_573_708,
                Ivs::new(1, 12, 16, 28, 29, 9),
                Gen3Method::Wild5,
            ),
            result(
                Wild3EncounterIndex::Feebas,
                29,
                2_446_573_708,
                Ivs::new(1, 12, 16, 28, 29, 9),
                Gen3Method::Wild5,
            ),
            result(
                Wild3EncounterIndex::Feebas,
                29,
                743_462_578,
                Ivs::new(16, 24, 29, 9, 3, 22),
                Gen3Method::Wild5,
            ),
            result(
                Wild3EncounterIndex::Feebas,
                29,
                918_044_353,
                Ivs::new(19, 7, 9, 20, 9, 5),
                Gen3Method::Wild1,
            ),
        ]
    );
}

#[test]
fn fixed_level_still_consumes_the_level_roll() {
    let opts = options(Gen3Lead::Vanilla);
    let mut data = game_data();
    data.feebas = Some(Wild3EncounterGameData {
        min_level: 20,
        max_level: 20,
        ..Default::default()
    });

    assert_eq!(
        generate_wild3_internal(Pokerng::new(38), &opts, &data).mon_results,
        vec![
            result(
                Wild3EncounterIndex::Feebas,
                20,
                1_434_552_371,
                Ivs::new(15, 13, 14, 22, 16, 10),
                Gen3Method::Wild5,
            ),
            result(
                Wild3EncounterIndex::Feebas,
                20,
                1_434_552_371,
                Ivs::new(15, 13, 14, 22, 16, 10),
                Gen3Method::Wild5,
            ),
            result(
                Wild3EncounterIndex::Feebas,
                20,
                2_728_376_208,
                Ivs::new(24, 26, 1, 22, 6, 5),
                Gen3Method::Wild5,
            ),
            result(
                Wild3EncounterIndex::Feebas,
                20,
                2_285_078_183,
                Ivs::new(1, 12, 21, 13, 14, 15),
                Gen3Method::Wild1,
            ),
        ]
    );
}

#[test]
fn genderless_encounter_skips_cute_charm_roll() {
    let opts = options(Gen3Lead::CuteCharm(Gender::Male));
    let mut data = game_data();
    let mut encounter = encounter();
    encounter.species_data.species = Species::Magnemite;
    data.feebas = Some(encounter);

    assert_eq!(
        generate_wild3_internal(Pokerng::new(38), &opts, &data).mon_results,
        vec![
            result(
                Wild3EncounterIndex::Feebas,
                20,
                1_434_552_371,
                Ivs::new(15, 13, 14, 22, 16, 10),
                Gen3Method::Wild5,
            ),
            result(
                Wild3EncounterIndex::Feebas,
                26,
                1_434_552_371,
                Ivs::new(15, 13, 14, 22, 16, 10),
                Gen3Method::Wild5,
            ),
            result(
                Wild3EncounterIndex::Feebas,
                26,
                2_728_376_208,
                Ivs::new(24, 26, 1, 22, 6, 5),
                Gen3Method::Wild5,
            ),
            result(
                Wild3EncounterIndex::Feebas,
                26,
                2_285_078_183,
                Ivs::new(1, 12, 21, 13, 14, 15),
                Gen3Method::Wild1,
            ),
        ]
    );
}

#[test]
fn accepted_pid_is_not_retried_to_satisfy_final_filters() {
    let mut opts = options(Gen3Lead::Vanilla);
    let encounter = encounter();
    let context = FeebasEncounter {
        opts: &opts,
        encounter_idx: Wild3EncounterIndex::Feebas,
        encounter: &encounter,
    };

    assert_eq!(
        simulate_wild_method5_feebas_pid_low(Pokerng::new(6), context, 24, None, Nature::Adamant,),
        Some(candidate(24, 1_432_582_478, Ivs::new(23, 14, 17, 0, 5, 10)))
    );

    let filters = [
        PkmFilter {
            shiny: ShinyFilter::AnyShiny,
            ..Default::default()
        },
        PkmFilter {
            min_ivs: Ivs::new_all31(),
            ..Default::default()
        },
        PkmFilter {
            hidden_power: HiddenPowerFilter {
                active: true,
                ..Default::default()
            },
            ..Default::default()
        },
    ];

    for filter in filters {
        opts.filter = filter;
        let context = FeebasEncounter {
            opts: &opts,
            encounter_idx: Wild3EncounterIndex::Feebas,
            encounter: &encounter,
        };

        assert_eq!(
            simulate_wild_method5_feebas_pid_low(
                Pokerng::new(6),
                context,
                24,
                None,
                Nature::Adamant,
            ),
            None
        );
    }

    opts.filter = PkmFilter::default();
    opts.gen3_filter.max_size = true;
    let context = FeebasEncounter {
        opts: &opts,
        encounter_idx: Wild3EncounterIndex::Feebas,
        encounter: &encounter,
    };

    assert_eq!(
        simulate_wild_method5_feebas_pid_low(Pokerng::new(6), context, 24, None, Nature::Adamant,),
        None
    );
}

#[test]
fn unrelated_setups_do_not_add_candidates() {
    let mut opts = options(Gen3Lead::Vanilla);
    let mut data = game_data();
    let range = CycleRange::new(100, 0, 101);
    opts.methods = vec![Gen3Method::Wild1];
    assert_eq!(generate(Pokerng::new(0), &opts, &data, true, range), vec![]);

    opts.methods = vec![Gen3Method::Wild5];
    opts.feebas_state = Wild3FeebasState::NotInMap;
    assert_eq!(
        generate(Pokerng::new(0), &opts, &data, false, range),
        vec![]
    );

    opts.feebas_state = Wild3FeebasState::OnFeebasTile;
    opts.action = Wild3Action::SweetScentLand;
    assert_eq!(generate(Pokerng::new(0), &opts, &data, true, range), vec![]);

    opts.action = Wild3Action::GoodRod;
    data.is_safari = true;
    assert_eq!(generate(Pokerng::new(0), &opts, &data, true, range), vec![]);

    data.is_safari = false;
    data.feebas = None;
    assert_eq!(
        generate(Pokerng::new(0), &opts, &data, false, range),
        vec![]
    );
}

fn ranged_result(
    lvl: u8,
    pid: u32,
    ivs: Ivs,
    cycle_range: CycleAndModRange,
) -> Wild3GeneratorMonResult {
    Wild3GeneratorMonResult {
        encounter_idx: Wild3EncounterIndex::Feebas,
        lvl,
        pid,
        ivs,
        method: Gen3Method::Wild5,
        cycle_range: Some(cycle_range),
        used_safari_pokeblock: None,
    }
}

#[test]
fn cycle_range_is_divided_between_calls_including_the_remainder() {
    let opts = Wild3GeneratorOptions {
        cycle_opts: Wild3GeneratorCycleOpts::LikelihoodForLead {
            min_max_initial_cycle: (45_000, 75_000),
            lead_cycle_spd: 500,
        },
        ..options(Gen3Lead::Vanilla)
    };

    assert_eq!(
        generate(
            Pokerng::new(3_278_898_337),
            &opts,
            &game_data(),
            true,
            CycleRange::new(100, 7, 101),
        ),
        vec![
            ranged_result(
                20,
                1_434_552_371,
                Ivs::new(15, 13, 14, 22, 16, 10),
                CycleRange::new(100, 7, 34),
            ),
            ranged_result(
                26,
                1_434_552_371,
                Ivs::new(15, 13, 14, 22, 16, 10),
                CycleRange::new(134, 7, 34),
            ),
            ranged_result(
                26,
                2_728_376_208,
                Ivs::new(24, 26, 1, 22, 6, 5),
                CycleRange::new(168, 7, 33),
            ),
        ]
    );
}

#[test]
fn rejected_candidate_does_not_change_other_cycle_windows() {
    let opts = Wild3GeneratorOptions {
        gen3_filter: Gen3PkmFilter {
            lvl: Some(26),
            ..Default::default()
        },
        cycle_opts: Wild3GeneratorCycleOpts::LikelihoodForLead {
            min_max_initial_cycle: (45_000, 75_000),
            lead_cycle_spd: 500,
        },
        ..options(Gen3Lead::Vanilla)
    };

    assert_eq!(
        generate(
            Pokerng::new(3_278_898_337),
            &opts,
            &game_data(),
            true,
            CycleRange::new(100, 7, 101),
        ),
        vec![
            ranged_result(
                26,
                1_434_552_371,
                Ivs::new(15, 13, 14, 22, 16, 10),
                CycleRange::new(134, 7, 34),
            ),
            ranged_result(
                26,
                2_728_376_208,
                Ivs::new(24, 26, 1, 22, 6, 5),
                CycleRange::new(168, 7, 33),
            ),
        ]
    );
}

#[test]
fn ranges_shorter_than_the_call_count_have_no_empty_results() {
    let opts = Wild3GeneratorOptions {
        cycle_opts: Wild3GeneratorCycleOpts::LikelihoodForLead {
            min_max_initial_cycle: (45_000, 75_000),
            lead_cycle_spd: 500,
        },
        ..options(Gen3Lead::Vanilla)
    };

    assert_eq!(
        generate(
            Pokerng::new(3_278_898_337),
            &opts,
            &game_data(),
            true,
            CycleRange::new(100, 0, 2),
        ),
        vec![
            ranged_result(
                20,
                1_434_552_371,
                Ivs::new(15, 13, 14, 22, 16, 10),
                CycleRange::new(100, 0, 1),
            ),
            ranged_result(
                26,
                1_434_552_371,
                Ivs::new(15, 13, 14, 22, 16, 10),
                CycleRange::new(101, 0, 1),
            ),
        ]
    );
    assert_eq!(
        generate(
            Pokerng::new(3_278_898_337),
            &opts,
            &game_data(),
            true,
            CycleRange::new(100, 0, 0),
        ),
        vec![],
    );
}

#[test]
fn pid_generation_uses_the_saved_rng_and_includes_lead_cycles_in_the_range() {
    let opts = Wild3GeneratorOptions {
        methods: vec![Gen3Method::Wild5],
        cycle_opts: Wild3GeneratorCycleOpts::LikelihoodForLead {
            min_max_initial_cycle: (45_000, 75_000),
            lead_cycle_spd: 100,
        },
        ..options(Gen3Lead::Vanilla)
    };
    let data = game_data();
    let mut cycle_counter = CycleFrameCounter::new(&opts);
    cycle_counter.add_cycle(100);
    let saved_cycle_counter = cycle_counter.clone();
    cycle_counter.add_cycle(1);
    cycle_counter.add_mod(1);

    let gen_data = GenTmpData {
        opts: &opts,
        encounter_idx: Wild3EncounterIndex::Feebas,
        lvl: 26,
        encounter_gender_ratio: GenderRatio::OneToOne,
        required_gender: None,
        required_nature: Nature::Impish,
        used_safari_pokeblock: None,
        tsv_trv: TsvTrv::from_tid_sid(0, 0),
        feebas_method5_ctx: Some(FeebasMethod5Context {
            rng: Pokerng::new(3_278_898_337),
            is_feebas: true,
            cycle_counter: saved_cycle_counter,
        }),
    };

    assert_eq!(
        generate_personality(Pokerng::new(1_696_283_507), gen_data, cycle_counter, &data)
            .mon_results,
        vec![
            ranged_result(
                20,
                1_434_552_371,
                Ivs::new(15, 13, 14, 22, 16, 10),
                CycleRange::new(100, 0, 34),
            ),
            ranged_result(
                26,
                1_434_552_371,
                Ivs::new(15, 13, 14, 22, 16, 10),
                CycleRange::new(134, 0, 34),
            ),
            ranged_result(
                26,
                2_728_376_208,
                Ivs::new(24, 26, 1, 22, 6, 5),
                CycleRange::new(168, 0, 33),
            ),
        ]
    );
}

#[test]
fn false_check_feebas_splits_the_range_between_four_calls() {
    let opts = Wild3GeneratorOptions {
        cycle_opts: Wild3GeneratorCycleOpts::LikelihoodForLead {
            min_max_initial_cycle: (45_000, 75_000),
            lead_cycle_spd: 500,
        },
        ..options(Gen3Lead::Vanilla)
    };
    let slot = Wild3EncounterIndex::Slot(EncounterSlot::Slot0);

    assert_eq!(
        generate(
            Pokerng::with_advances(75, 1),
            &opts,
            &game_data(),
            false,
            CycleRange::new(100, 0, 101),
        ),
        vec![
            Wild3GeneratorMonResult {
                cycle_range: Some(CycleRange::new(100, 0, 26)),
                ..result(
                    slot,
                    25,
                    1_281_017_505,
                    Ivs::new(29, 29, 5, 23, 24, 22),
                    Gen3Method::Wild5
                )
            },
            Wild3GeneratorMonResult {
                cycle_range: Some(CycleRange::new(126, 0, 25)),
                ..result(
                    slot,
                    25,
                    1_281_017_505,
                    Ivs::new(29, 29, 5, 23, 24, 22),
                    Gen3Method::Wild5
                )
            },
            Wild3GeneratorMonResult {
                cycle_range: Some(CycleRange::new(151, 0, 25)),
                ..result(
                    slot,
                    29,
                    1_281_017_505,
                    Ivs::new(29, 29, 5, 23, 24, 22),
                    Gen3Method::Wild5
                )
            },
            Wild3GeneratorMonResult {
                cycle_range: Some(CycleRange::new(176, 0, 25)),
                ..result(
                    slot,
                    29,
                    1_570_497_449,
                    Ivs::new(1, 21, 17, 2, 19, 26),
                    Gen3Method::Wild5
                )
            },
        ]
    );
}
