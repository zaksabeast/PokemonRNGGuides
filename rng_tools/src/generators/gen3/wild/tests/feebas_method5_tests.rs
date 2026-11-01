use super::*;
use crate::Species;

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

#[test]
fn vanilla_generates_non_feebas_encounter() {
    let opts = options(Gen3Lead::Vanilla);
    let mut data = game_data();
    data.slots_by_action[Wild3Action::GoodRod as usize][0]
        .species_data
        .species = Species::Carvanha;
    let generated = generate_wild3_internal(Pokerng::new(75), &opts, &data);

    assert_eq!(
        generated.mon_results,
        vec![
            result(
                Wild3EncounterIndex::Slot(EncounterSlot::Slot0),
                25,
                1_281_017_505,
                Ivs::new(29, 29, 5, 23, 24, 22),
                Gen3Method::Wild5,
            ),
            result(
                Wild3EncounterIndex::Slot(EncounterSlot::Slot0),
                25,
                1_281_017_505,
                Ivs::new(29, 29, 5, 23, 24, 22),
                Gen3Method::Wild5,
            ),
            result(
                Wild3EncounterIndex::Slot(EncounterSlot::Slot0),
                29,
                1_281_017_505,
                Ivs::new(29, 29, 5, 23, 24, 22),
                Gen3Method::Wild5,
            ),
            result(
                Wild3EncounterIndex::Slot(EncounterSlot::Slot0),
                29,
                1_570_497_449,
                Ivs::new(1, 21, 17, 2, 19, 26),
                Gen3Method::Wild5,
            ),
            result(
                Wild3EncounterIndex::Slot(EncounterSlot::Slot0),
                29,
                4_099_577_474,
                Ivs::new(4, 3, 10, 14, 19, 28),
                Gen3Method::Wild1,
            ),
        ]
    );
}

#[test]
fn synchronize_generates_complete_encounter() {
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
fn cute_charm_generates_complete_encounter() {
    let opts = options(Gen3Lead::CuteCharm(Gender::Male));
    let mut data = game_data();
    let mut encounter = encounter();
    encounter.species_data.species = Species::Feebas;
    data.feebas = Some(encounter);

    assert_eq!(
        generate_wild3_internal(Pokerng::new(38), &opts, &data).mon_results,
        vec![
            result(
                Wild3EncounterIndex::Feebas,
                20,
                3_490_798_392,
                Ivs::new(5, 21, 24, 23, 11, 29),
                Gen3Method::Wild5,
            ),
            result(
                Wild3EncounterIndex::Feebas,
                26,
                3_490_798_392,
                Ivs::new(5, 21, 24, 23, 11, 29),
                Gen3Method::Wild5,
            ),
            result(
                Wild3EncounterIndex::Feebas,
                26,
                3_490_798_392,
                Ivs::new(5, 21, 24, 23, 11, 29),
                Gen3Method::Wild5,
            ),
            result(
                Wild3EncounterIndex::Feebas,
                26,
                1_413_117_021,
                Ivs::new(15, 13, 13, 13, 1, 18),
                Gen3Method::Wild5,
            ),
            result(
                Wild3EncounterIndex::Feebas,
                26,
                1_434_552_371,
                Ivs::new(15, 13, 14, 22, 16, 10),
                Gen3Method::Wild1,
            ),
        ]
    );
}
