#[cfg(test)]
mod test {
    use crate::assert_list_eq;

    use crate::EncounterSlot;
    use crate::Ivs;
    use crate::gen3::Gen3Lead;
    use crate::gen3::Gen3Method;
    use crate::gen3::search_wild3;
    use crate::gen3::{Wild3SearcherCycleData, Wild3SearcherCycleDataByLead};
    use crate::gen3::{Wild3SearcherOptions, Wild3SearcherResultMon};
    use crate::{AbilityType, Gender, GenderRatio, Nature, PkmFilter};

    #[test]
    fn test_search_wild3_cycle_methods_1_2_4() {
        let options = Wild3SearcherOptions {
            initial_seed: 0,
            tid: 0,
            sid: 0,
            gender_ratio: GenderRatio::OneToOne,
            encounter_slots_by_map: vec![None],
            methods: vec![
                Gen3Method::Wild1,
                Gen3Method::Wild2,
                Gen3Method::Wild3,
                Gen3Method::Wild4,
                Gen3Method::Wild5,
            ],
            initial_advances: 65,
            max_advances: 0,
            max_result_count: 10,
            consider_cycles: true,
            consider_rng_manipulated_lead_pid: true,
            leads: vec![Gen3Lead::Vanilla],
            filter: PkmFilter {
                shiny: false,
                nature: Some(Nature::Naive),
                gender: Some(Gender::Male),
                min_ivs: Ivs::new_all0(),
                max_ivs: Ivs::new_all31(),
                ability: None,
                stats: None,
            },
        };
        let expected_results = [
            Wild3SearcherResultMon {
                pid: 2695989139,
                ivs: Ivs {
                    hp: 25,
                    atk: 22,
                    def: 31,
                    spa: 3,
                    spd: 13,
                    spe: 6,
                },
                method: Gen3Method::Wild2,
                encounter_slot: EncounterSlot::Slot1,
                cycle_data_by_lead: Some(Wild3SearcherCycleDataByLead {
                    slowest_lead: Wild3SearcherCycleData::new(900, 22529, 114265, 1.0),
                    fastest_lead: Wild3SearcherCycleData::new(18, 93089, 114265, 0.0),
                    ideal_lead: Wild3SearcherCycleData::new(900, 22529, 114265, 1.0),
                    common_lower_lead: Wild3SearcherCycleData::new(608, 45889, 114265, 0.95555),
                    common_upper_lead: Wild3SearcherCycleData::new(868, 25089, 114265, 1.0),
                }),
                ability: AbilityType::Second,
                gender: Gender::Male,
                nature: Nature::Naive,
                shiny: false,
                advance: 65,
                lead: Gen3Lead::Vanilla,
                map_idx: 0,
            },
            Wild3SearcherResultMon {
                pid: 2695989139,
                ivs: Ivs {
                    hp: 25,
                    atk: 8,
                    def: 4,
                    spa: 3,
                    spd: 13,
                    spe: 6,
                },
                method: Gen3Method::Wild4,
                encounter_slot: EncounterSlot::Slot1,
                cycle_data_by_lead: Some(Wild3SearcherCycleDataByLead {
                    slowest_lead: Wild3SearcherCycleData::new(900, 0, 22529, 0.0),
                    fastest_lead: Wild3SearcherCycleData::new(18, 54410, 38679, 0.5295),
                    ideal_lead: Wild3SearcherCycleData::new(252, 35690, 38679, 1.0),
                    common_lower_lead: Wild3SearcherCycleData::new(608, 7210, 38679, 0.04445),
                    common_upper_lead: Wild3SearcherCycleData::new(868, 0, 25089, 0.0),
                }),
                ability: AbilityType::Second,
                gender: Gender::Male,
                nature: Nature::Naive,
                shiny: false,
                advance: 65,
                lead: Gen3Lead::Vanilla,
                map_idx: 0,
            },
            Wild3SearcherResultMon {
                pid: 2695989139,
                ivs: Ivs {
                    hp: 25,
                    atk: 8,
                    def: 4,
                    spa: 22,
                    spd: 31,
                    spe: 25,
                },
                method: Gen3Method::Wild1,
                encounter_slot: EncounterSlot::Slot1,
                cycle_data_by_lead: Some(Wild3SearcherCycleDataByLead {
                    slowest_lead: Wild3SearcherCycleData::new(900, 0, 0, 0.0),
                    fastest_lead: Wild3SearcherCycleData::new(18, 0, 54410, 0.4705),
                    ideal_lead: Wild3SearcherCycleData::new(18, 0, 54410, 0.4705),
                    common_lower_lead: Wild3SearcherCycleData::new(608, 0, 7210, 0.0),
                    common_upper_lead: Wild3SearcherCycleData::new(868, 0, 0, 0.0),
                }),
                ability: AbilityType::Second,
                gender: Gender::Male,
                nature: Nature::Naive,
                shiny: false,
                advance: 65,
                lead: Gen3Lead::Vanilla,
                map_idx: 0,
            },
        ];
        let result = search_wild3(&options);
        assert_list_eq!(result, expected_results);
    }
}
