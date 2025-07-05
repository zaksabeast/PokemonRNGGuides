#[cfg(test)]
mod test {
    use crate::EncounterSlot;
    use crate::Ivs;
    use crate::gen3::Gen3Lead;
    use crate::gen3::Gen3Method;
    use crate::gen3::INFINITE_CYCLE;
    use crate::gen3::{
        CycleRange, Wild3GeneratorOptions, Wild3GeneratorResult, generate_gen3_wild,
    };
    use crate::rng::Rng;
    use crate::rng::lcrng::Pokerng;
    use crate::{GenderRatio, Nature, PkmFilter};

    #[test]
    fn test_generate_wild3_cycle_method_3() {
        let options = Wild3GeneratorOptions {
            tid: 0,
            sid: 0,
            gender_ratio: GenderRatio::OneToOne,
            encounter_slot: None,
            methods: vec![Gen3Method::Wild3],
            advance: 3012,
            map_idx: 0,
            lead: Gen3Lead::Synchronize(Nature::Serious),
            filter: PkmFilter::new_allow_all(),
            consider_cycles: true,
            consider_rng_manipulated_lead_pid: true,
        };

        let mut rng = Pokerng::new(0);
        rng.advance(options.advance);
        let result = generate_gen3_wild(rng, &options);
        let expected_result = vec![
            Wild3GeneratorResult {
                encounter_slot: EncounterSlot::Slot5,
                pid: 1459093362,
                ivs: Ivs {
                    hp: 13,
                    atk: 14,
                    def: 2,
                    spa: 20,
                    spd: 14,
                    spe: 15,
                },
                method: Gen3Method::Wild3,
                cycle_range: Some(CycleRange::new(144256, 80, 1, 80)),
            },
            Wild3GeneratorResult {
                encounter_slot: EncounterSlot::Slot5,
                pid: 3087365287,
                ivs: Ivs {
                    hp: 21,
                    atk: 3,
                    def: 3,
                    spa: 11,
                    spd: 15,
                    spe: 19,
                },
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
            tid: 0,
            sid: 0,
            gender_ratio: GenderRatio::OneToOne,
            encounter_slot: None,
            methods: vec![Gen3Method::Wild3],
            advance: 3012,
            map_idx: 0,
            lead: Gen3Lead::Synchronize(Nature::Serious),
            filter: PkmFilter::new_allow_all(),
            consider_cycles: true,
            consider_rng_manipulated_lead_pid: false,
        };

        let mut rng = Pokerng::new(0);
        rng.advance(options.advance);
        let result = generate_gen3_wild(rng, &options);
        assert_eq!(result, vec![]);
    }

    #[test]
    fn test_generate_wild3_cycle_method_5() {
        let options = Wild3GeneratorOptions {
            tid: 0,
            sid: 0,
            gender_ratio: GenderRatio::OneToOne,
            encounter_slot: None,
            methods: vec![Gen3Method::Wild5],
            advance: 4894,
            map_idx: 0,
            lead: Gen3Lead::Vanilla,
            filter: PkmFilter::new_allow_all(),
            consider_cycles: true,
            consider_rng_manipulated_lead_pid: true,
        };

        let mut rng = Pokerng::new(0);
        rng.advance(options.advance);
        let result = generate_gen3_wild(rng, &options);
        let expected_result = vec![
            Wild3GeneratorResult {
                encounter_slot: EncounterSlot::Slot5,
                pid: 26625321,
                ivs: Ivs {
                    hp: 21,
                    atk: 2,
                    def: 31,
                    spa: 1,
                    spd: 18,
                    spe: 19,
                },
                method: Gen3Method::Wild5,
                cycle_range: Some(CycleRange::new(145311, 80, 0, 934)),
            },
            Wild3GeneratorResult {
                encounter_slot: EncounterSlot::Slot5,
                pid: 2210948146,
                ivs: Ivs {
                    hp: 13,
                    atk: 0,
                    def: 19,
                    spa: 1,
                    spd: 12,
                    spe: 6,
                },
                method: Gen3Method::Wild5,
                cycle_range: Some(CycleRange::new(148361, 80, 0, 926)),
            },
        ];
        assert_eq!(result, expected_result);
    }

    #[test]
    fn test_generate_wild3_cycle_methods_1_2_4() {
        let options = Wild3GeneratorOptions {
            tid: 0,
            sid: 0,
            gender_ratio: GenderRatio::OneToOne,
            encounter_slot: None,
            methods: vec![Gen3Method::Wild1, Gen3Method::Wild2, Gen3Method::Wild4],
            advance: 3001,
            map_idx: 0,
            lead: Gen3Lead::Synchronize(Nature::Hardy),
            filter: PkmFilter::new_allow_all(),
            consider_cycles: true,
            consider_rng_manipulated_lead_pid: true,
        };

        let mut rng = Pokerng::new(0);
        rng.advance(options.advance);
        let result = generate_gen3_wild(rng, &options);
        let expected_result = vec![
            Wild3GeneratorResult {
                encounter_slot: EncounterSlot::Slot3,
                pid: 3864471792,
                ivs: Ivs {
                    hp: 0,
                    atk: 9,
                    def: 4,
                    spa: 5,
                    spd: 4,
                    spe: 3,
                },
                method: Gen3Method::Wild2,
                cycle_range: Some(CycleRange::new(54709, 80, 0, 112996)),
            },
            Wild3GeneratorResult {
                encounter_slot: EncounterSlot::Slot3,
                pid: 3864471792,
                ivs: Ivs {
                    hp: 26,
                    atk: 8,
                    def: 17,
                    spa: 5,
                    spd: 4,
                    spe: 3,
                },
                method: Gen3Method::Wild4,
                cycle_range: Some(CycleRange::new(167705, 80, 0, 38211)),
            },
            Wild3GeneratorResult {
                encounter_slot: EncounterSlot::Slot3,
                pid: 3864471792,
                ivs: Ivs {
                    hp: 26,
                    atk: 8,
                    def: 17,
                    spa: 9,
                    spd: 4,
                    spe: 0,
                },
                method: Gen3Method::Wild1,
                cycle_range: Some(CycleRange::new(205916, 80, 0, INFINITE_CYCLE)),
            },
        ];
        assert_eq!(result, expected_result);
    }
}
