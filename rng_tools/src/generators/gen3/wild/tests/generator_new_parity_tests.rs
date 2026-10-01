use itertools::iproduct as products;

use super::*;
use crate::{
    Species,
    gen3::{
        Gen3Method, Wild3GeneratorCycleOpts, Wild3SpecialEncounterGameData, generate_wild3_old,
    },
};

#[track_caller]
pub fn generate_wild3_for_test(
    rng: Pokerng,
    opts: &Wild3GeneratorOptions,
    map: &Wild3MapGameData,
) -> Wild3GeneratorResults {
    let old = generate_wild3_old(rng, opts, map);
    let new = generate_wild3_new(rng, opts, map);
    assert_mon_results_eq_unordered(&new.mon_results, &old.mon_results, "Wild 3 generation");
    new
}

#[track_caller]
pub fn assert_mon_results_eq_unordered(
    actual: &[Wild3GeneratorMonResult],
    expected: &[Wild3GeneratorMonResult],
    context: &str,
) {
    assert_eq!(actual.len(), expected.len(), "{context}");
    let mut unmatched: Vec<_> = expected.iter().collect();
    for result in actual {
        let index = unmatched.iter().position(|expected| *expected == result);
        let Some(index) = index else {
            panic!("{context}: unexpected result {result:?}; unmatched results: {unmatched:?}");
        };
        unmatched.swap_remove(index);
    }
}

#[test]
fn method5_cycle_ranges_match_existing_generation() {
    let opts = Wild3GeneratorOptions {
        methods: vec![Gen3Method::Wild5],
        cycle_opts: Wild3GeneratorCycleOpts::Searching {
            generate_even_if_impossible: false,
            consider_rng_manipulated_lead_pid: true,
        },
        ..Default::default()
    };
    let map = Wild3MapGameData::default();
    let rng = Pokerng::with_advances(0, 4894);
    generate_wild3_for_test(rng, &opts, &map);
}

#[test]
fn all_actions_and_leads_match_existing_generation() {
    let mut map = Wild3MapGameData::default();
    for slots in &mut map.slots_by_action {
        slots[0].species_data.species = Species::Magnemite;
        slots[1].species_data.species = Species::Aron;
    }
    map.roamers.push(Wild3SpecialEncounterGameData {
        id: Wild3RoamerState::ActiveInMapLatios,
        ..Default::default()
    });
    map.mass_outbreaks.push(Wild3SpecialEncounterGameData {
        id: Wild3MassOutbreakState::Route102Seedot,
        ..Default::default()
    });

    for (action, lead, seed, consider_cycles, generate_even_if_impossible) in products!(
        [
            Wild3Action::SweetScentLand,
            Wild3Action::SweetScentWater,
            Wild3Action::OldRod,
            Wild3Action::GoodRod,
            Wild3Action::SuperRod,
            Wild3Action::RockSmash,
        ],
        [
            Gen3Lead::Vanilla,
            Gen3Lead::Synchronize(Nature::Jolly),
            Gen3Lead::CuteCharm(Gender::Female),
            Gen3Lead::CuteCharm(Gender::Male),
            Gen3Lead::Egg,
            Gen3Lead::Static,
            Gen3Lead::MagnetPull,
            Gen3Lead::HustleVitalSpiritPressure,
        ],
        0..255,
        [false, true],
        [false, true],
    ) {
        let opts = Wild3GeneratorOptions {
            action,
            lead,
            methods: vec![Gen3Method::Wild1],
            roamer_state: Wild3RoamerState::ActiveInMapLatios,
            mass_outbreak_state: Wild3MassOutbreakState::Route102Seedot,
            cycle_opts: if consider_cycles {
                Wild3GeneratorCycleOpts::Searching {
                    generate_even_if_impossible,
                    consider_rng_manipulated_lead_pid: false,
                }
            } else {
                Wild3GeneratorCycleOpts::Inactive
            },
            ..Default::default()
        };
        let old = generate_wild3_old(Pokerng::new(seed), &opts, &map);
        let new = generate_wild3_new(Pokerng::new(seed), &opts, &map);
        let context =
            format!("{action:?} {lead:?} {seed} {consider_cycles} {generate_even_if_impossible}");
        assert_mon_results_eq_unordered(&new.mon_results, &old.mon_results, &context);
    }
}

#[test]
fn fishing_and_rock_smash_match_existing_generation() {
    let mut map = Wild3MapGameData::default();
    map.feebas = Some(Wild3EncounterGameData::default());
    for (action, feebas_state, seed, consider_cycles) in products!(
        [
            Wild3Action::OldRod,
            Wild3Action::GoodRod,
            Wild3Action::SuperRod,
            Wild3Action::RockSmash,
        ],
        [
            Wild3FeebasState::NotInMap,
            Wild3FeebasState::OnFeebasTile,
            Wild3FeebasState::InMapButNotOnFeebasTile,
        ],
        0..64,
        [false, true],
    ) {
        let opts = Wild3GeneratorOptions {
            action,
            feebas_state,
            methods: vec![Gen3Method::Wild1],
            cycle_opts: if consider_cycles {
                Wild3GeneratorCycleOpts::Searching {
                    generate_even_if_impossible: true,
                    consider_rng_manipulated_lead_pid: false,
                }
            } else {
                Wild3GeneratorCycleOpts::Inactive
            },
            ..Default::default()
        };
        let old = generate_wild3_old(Pokerng::new(seed), &opts, &map);
        let new = generate_wild3_new(Pokerng::new(seed), &opts, &map);
        let context = format!("{action:?} {feebas_state:?} {seed} {consider_cycles}");
        assert_mon_results_eq_unordered(&new.mon_results, &old.mon_results, &context);
    }
}

#[test]
fn all_methods_with_common_leads_match_existing_generation() {
    let map = Wild3MapGameData::default();
    for (action, seed) in products!(
        [
            Wild3Action::SweetScentLand,
            Wild3Action::SweetScentWater,
            Wild3Action::OldRod,
            Wild3Action::GoodRod,
            Wild3Action::SuperRod,
            Wild3Action::RockSmash,
        ],
        0..64,
    ) {
        let opts = Wild3GeneratorOptions {
            action,
            methods: vec![
                Gen3Method::Wild1,
                Gen3Method::Wild2,
                Gen3Method::Wild3,
                Gen3Method::Wild4,
                Gen3Method::Wild5,
            ],
            cycle_opts: Wild3GeneratorCycleOpts::Searching {
                generate_even_if_impossible: false,
                consider_rng_manipulated_lead_pid: false,
            },
            ..Default::default()
        };
        let old = generate_wild3_old(Pokerng::new(seed), &opts, &map);
        let new = generate_wild3_new(Pokerng::new(seed), &opts, &map);
        assert_mon_results_eq_unordered(
            &new.mon_results,
            &old.mon_results,
            &format!("{action:?} {seed}"),
        );
    }
}

#[test]
fn all_methods_and_cycle_ranges_match_existing_generation() {can_vblank_occur_soon_for_min_and_max
    let mut map = Wild3MapGameData::default();
    map.is_safari = true;
    for (action, lead, seed) in products!(
        [
            Wild3Action::SweetScentLand,
            Wild3Action::SweetScentWater,
            Wild3Action::OldRod,
            Wild3Action::GoodRod,
            Wild3Action::SuperRod,
            Wild3Action::RockSmash,
        ],
        [
            Gen3Lead::Egg,
            Gen3Lead::CuteCharm(Gender::Female),
            Gen3Lead::Synchronize(Nature::Jolly),
        ],
        0..8,
    ) {
        let opts = Wild3GeneratorOptions {
            action,
            lead,
            methods: vec![
                Gen3Method::Wild1,
                Gen3Method::Wild2,
                Gen3Method::Wild3,
                Gen3Method::Wild4,
                Gen3Method::Wild5,
            ],
            cycle_opts: Wild3GeneratorCycleOpts::Searching {
                generate_even_if_impossible: true,
                consider_rng_manipulated_lead_pid: false,
            },
            ..Default::default()
        };
        let old = generate_wild3_old(Pokerng::new(seed), &opts, &map);
        let new = generate_wild3_new(Pokerng::new(seed), &opts, &map);
        assert_mon_results_eq_unordered(
            &new.mon_results,
            &old.mon_results,
            &format!("{action:?} {lead:?} {seed}"),
        );
    }
}
