#[cfg(test)]
mod test {
    use crate::EncounterSlot;
    use crate::Ivs;
    use crate::gen3::Gen3Lead;
    use crate::gen3::Gen3Method;
    use crate::gen3::INFINITE_CYCLE;
    use crate::gen3::{
        CycleRange, Wild3GeneratorOptions, Wild3GeneratorResult, generate_gen3_wild, Wild3EncounterTable
    };
    use crate::rng::Rng;
    use crate::rng::lcrng::Pokerng;
    use crate::{Nature, PkmFilter};

    #[test]
    fn test_generate_wild3_cycle_method_3() {
        let options = Wild3GeneratorOptions {
            methods: vec![Gen3Method::Wild3],
            advance: 3012,
            lead: Gen3Lead::Synchronize(Nature::Serious),
            consider_cycles: true,
            consider_rng_manipulated_lead_pid: true,
            ..Default::default()
        };

        let mut rng = Pokerng::new(0);
        rng.advance(options.advance);
        let result = generate_gen3_wild(rng, &options, &Wild3EncounterTable::default());
        let expected_result = vec![
            Wild3GeneratorResult {
                encounter_slot: EncounterSlot::Slot5,
                pid: 1459093362,
                ivs: Ivs::new(13, 14, 2, 20, 14, 15),
                method: Gen3Method::Wild3,
                cycle_range: Some(CycleRange::new(144256, 80, 1, 80)),
            },
            Wild3GeneratorResult {
                encounter_slot: EncounterSlot::Slot5,
                pid: 3087365287,
                ivs: Ivs::new(21, 3, 3, 11, 15, 19),
                method: Gen3Method::Wild3,
                cycle_range: Some(CycleRange::new(158414, 80, 1, 80)),
            },
        ];
        assert_eq!(result, expected_result);
    }

    #[test]
    fn test_generate_wild3_cycle_method_3_no_rng_lead_pid() {
        // Same as test_generate_wild3_cycle_method_3, but consider_rng_manipulated_lead_pid is false.
        // This should return an empty result, as the method cannot be triggered with a common lead PID.
        let options = Wild3GeneratorOptions {
            methods: vec![Gen3Method::Wild3],
            advance: 3012,
            lead: Gen3Lead::Synchronize(Nature::Serious),
            filter: PkmFilter::new_allow_all(),
            consider_cycles: true,
            consider_rng_manipulated_lead_pid: false,
            ..Default::default()
        };

        let mut rng = Pokerng::new(0);
        rng.advance(options.advance);
        let result = generate_gen3_wild(rng, &options, &Wild3EncounterTable::default());
        assert_eq!(result, vec![]);
    }

    #[test]
    fn test_generate_wild3_cycle_method_5() {
        let options = Wild3GeneratorOptions {
            methods: vec![Gen3Method::Wild5],
            advance: 4894,
            consider_cycles: true,
            consider_rng_manipulated_lead_pid: true,
            ..Default::default()
        };

        let mut rng = Pokerng::new(0);
        rng.advance(options.advance);
        let result = generate_gen3_wild(rng, &options, &Wild3EncounterTable::default());
        let expected_result = vec![
            Wild3GeneratorResult {
                encounter_slot: EncounterSlot::Slot5,
                pid: 26625321,
                ivs: Ivs::new(21, 2, 31, 1, 18, 19),
                method: Gen3Method::Wild5,
                cycle_range: Some(CycleRange::new(145311, 80, 0, 934)),
            },
            Wild3GeneratorResult {
                encounter_slot: EncounterSlot::Slot5,
                pid: 2210948146,
                ivs: Ivs::new(13, 0, 19, 1, 12, 6),
                method: Gen3Method::Wild5,
                cycle_range: Some(CycleRange::new(148361, 80, 0, 926)),
            },
        ];
        assert_eq!(result, expected_result);
    }

    #[test]
    fn test_generate_wild3_cycle_methods_1_2_4() {
        let options = Wild3GeneratorOptions {
            methods: vec![Gen3Method::Wild1, Gen3Method::Wild2, Gen3Method::Wild4],
            advance: 3001,
            lead: Gen3Lead::Synchronize(Nature::Hardy),
            consider_cycles: true,
            consider_rng_manipulated_lead_pid: true,
            ..Default::default()
        };

        let mut rng = Pokerng::new(0);
        rng.advance(options.advance);
        let result = generate_gen3_wild(rng, &options, &Wild3EncounterTable::default());
        let expected_result = vec![
            Wild3GeneratorResult {
                encounter_slot: EncounterSlot::Slot3,
                pid: 3864471792,
                ivs: Ivs::new(0, 9, 4, 5, 4, 3),
                method: Gen3Method::Wild2,
                cycle_range: Some(CycleRange::new(54709, 80, 0, 112996)),
            },
            Wild3GeneratorResult {
                encounter_slot: EncounterSlot::Slot3,
                pid: 3864471792,
                ivs: Ivs::new(26, 8, 17, 5, 4, 3),
                method: Gen3Method::Wild4,
                cycle_range: Some(CycleRange::new(167705, 80, 0, 38211)),
            },
            Wild3GeneratorResult {
                encounter_slot: EncounterSlot::Slot3,
                pid: 3864471792,
                ivs: Ivs::new(26, 8, 17, 9, 4, 0),
                method: Gen3Method::Wild1,
                cycle_range: Some(CycleRange::new(205916, 80, 0, INFINITE_CYCLE)),
            },
        ];
        assert_eq!(result, expected_result);
    }
}
