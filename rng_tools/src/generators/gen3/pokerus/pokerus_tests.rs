#[cfg(test)]
mod tests {
    use crate::{
        assert_list_eq,
        gen3::{
            NO_ITEM, Pokerus3ConsideredSetups, Pokerus3GeneratorOptions, Pokerus3GeneratorResult,
            Pokerus3ResultInfo, Pokerus3Score, Pokerus3SearcherForCalibOptions,
            Pokerus3SearcherOptions, calculate_result_info_for_seed_at_pokerus,
            gen3_pokerus_search_for_calib, gen3_pokerus_search_reverse, lcrng_distance,
            searcher_painter::{Wild3PaintingAdvFinder, Wild3PaintingAdvs, Wild3PaintingOpts},
        },
        rng::lcrng::Pokerng,
    };

    fn get_target_advances_before_pickup_rs(
        entered_hall_of_fame: bool,
        can_have_new_mass_outbreak: bool,
        has_empty_pokenews_slot: bool,
        level_up: bool,
        pickup_count: usize,
    ) -> Vec<usize> {
        let opts = Pokerus3SearcherForCalibOptions {
            initial_advance_before_pickup: 0,
            max_advances: 110_000,
            gen_opts: Pokerus3GeneratorOptions {
                is_emerald_game: false,
                entered_hall_of_fame,
                can_have_new_mass_outbreak,
                has_empty_pokenews_slot,
                level_up,
                pickup_pokemon_count: pickup_count,
            },
            max_result_count: 10_000,
            filter_pickup_items: None,
            filter_gives_pokerus: Some(true),
        };

        let results = gen3_pokerus_search_for_calib(&opts);

        results
            .iter()
            .map(|res| lcrng_distance(0x5a0, res.seed_at_pickup) as usize)
            .collect()
    }

    #[test]
    fn test_get_target_advance_before_pickup() {
        fn cmp_each_pickup_count(
            entered_hall_of_fame: bool,
            can_have_new_mass_outbreak: bool,
            has_empty_pokenews_slot: bool,
            level_up: bool,
            expected_results: &[Vec<usize>],
        ) {
            let results: Vec<Vec<usize>> = (0..=5)
                .map(|pickup_count| {
                    get_target_advances_before_pickup_rs(
                        entered_hall_of_fame,
                        can_have_new_mass_outbreak,
                        has_empty_pokenews_slot,
                        level_up,
                        pickup_count,
                    )
                })
                .collect();

            assert_eq!(
                results, expected_results,
                "entered_hall_of_fame: {}, can_have_new_mass_outbreak: {}, has_empty_pokenews_slot: {}, level_up: {}",
                entered_hall_of_fame, can_have_new_mass_outbreak, has_empty_pokenews_slot, level_up
            );
        }

        cmp_each_pickup_count(
            true,
            true,
            true,
            false,
            &[
                vec![26842, 101118, 101155],
                vec![101117, 101154],
                vec![101116, 101152, 101153],
                vec![101115, 101151],
                vec![101114, 101150],
                vec![101113, 101149],
            ],
        );

        cmp_each_pickup_count(
            false,
            false,
            false,
            false,
            &[
                vec![26844, 101120, 101157],
                vec![26843, 101119, 101156],
                vec![26841, 26842, 101118, 101155],
                vec![26840, 101117, 101154],
                vec![26839, 101116, 101152, 101153],
                vec![26838, 101115, 101151],
            ],
        );

        cmp_each_pickup_count(
            true,
            false,
            true,
            false,
            &[
                vec![26843, 101119, 101156],
                vec![26841, 26842, 101118, 101155],
                vec![26840, 101117, 101154],
                vec![26839, 101116, 101152, 101153],
                vec![26838, 101115, 101151],
                vec![26837, 101114, 101150],
            ],
        );

        cmp_each_pickup_count(
            true,
            true,
            true,
            true,
            &[
                vec![26840, 101116, 101153],
                vec![26839, 101115, 101151],
                vec![26838, 101114, 101150],
                vec![26837, 101113, 101149],
                vec![26836, 101112, 101148],
                vec![26835, 101111, 101147],
            ],
        );

        cmp_each_pickup_count(
            false,
            false,
            false,
            true,
            &[
                vec![26842, 101118, 101155],
                vec![101117, 101154],
                vec![101116, 101152, 101153],
                vec![101115, 101151],
                vec![101114, 101150],
                vec![101113, 101149],
            ],
        );

        cmp_each_pickup_count(
            true,
            false,
            true,
            true,
            &[
                vec![26841, 101117, 101154],
                vec![26840, 101116, 101152, 101153],
                vec![26839, 101115, 101151],
                vec![26838, 101114, 101150],
                vec![26837, 101113, 101149],
                vec![26836, 101112, 101148],
            ],
        );
    }

    #[test]
    fn test_gen3_pokerus_search_for_calib_no_filter() {
        let opts = Pokerus3SearcherForCalibOptions {
            initial_advance_before_pickup: 10022,
            max_advances: 1,
            max_result_count: 10,
            gen_opts: Pokerus3GeneratorOptions {
                is_emerald_game: false,
                entered_hall_of_fame: true,
                can_have_new_mass_outbreak: true,
                has_empty_pokenews_slot: true,
                level_up: false,
                pickup_pokemon_count: 5,
            },
            ..Default::default()
        };

        let results = gen3_pokerus_search_for_calib(&opts);

        assert_list_eq!(
            results,
            vec![
                Pokerus3GeneratorResult {
                    seed_at_pickup: Pokerng::with_jump(0x5a0, 10022).seed(),
                    pickup_items: Some(
                        [NO_ITEM, NO_ITEM, NO_ITEM, NO_ITEM, 4]
                            .into_iter()
                            .collect()
                    ),
                    gives_item: true,
                    gives_pokerus: false,
                },
                Pokerus3GeneratorResult {
                    seed_at_pickup: Pokerng::with_jump(0x5a0, 10023).seed(),
                    pickup_items: Some(
                        [NO_ITEM, NO_ITEM, NO_ITEM, 4, NO_ITEM]
                            .into_iter()
                            .collect()
                    ),
                    gives_item: true,
                    gives_pokerus: false,
                }
            ]
        );
    }

    #[test]
    fn test_gen3_pokerus_search_for_calib_with_filter() {
        let opts = Pokerus3SearcherForCalibOptions {
            initial_advance_before_pickup: 40000,
            max_advances: 10000,
            max_result_count: 10,
            gen_opts: Pokerus3GeneratorOptions {
                is_emerald_game: false,
                entered_hall_of_fame: true,
                can_have_new_mass_outbreak: true,
                has_empty_pokenews_slot: true,
                level_up: false,
                pickup_pokemon_count: 5,
            },
            filter_pickup_items: Some([NO_ITEM, NO_ITEM, 2, 4, NO_ITEM].into_iter().collect()),
            ..Default::default()
        };

        let results = gen3_pokerus_search_for_calib(&opts);

        assert_list_eq!(
            results,
            vec![Pokerus3GeneratorResult {
                seed_at_pickup: Pokerng::with_jump(0x5a0, 44108).seed(),
                pickup_items: Some([NO_ITEM, NO_ITEM, 2, 4, NO_ITEM].into_iter().collect()),
                gives_item: true,
                gives_pokerus: false,
            }]
        );
    }

    #[test]
    fn test_gen3_pokerus_search_for_calib_with_filter_2_pickup_pokemon() {
        let opts = Pokerus3SearcherForCalibOptions {
            initial_advance_before_pickup: 15000,
            max_advances: 30000,
            max_result_count: 10,
            gen_opts: Pokerus3GeneratorOptions {
                is_emerald_game: false,
                entered_hall_of_fame: false,
                can_have_new_mass_outbreak: false,
                has_empty_pokenews_slot: false,
                level_up: false,
                pickup_pokemon_count: 2,
            },
            filter_pickup_items: Some([2, 4].into_iter().collect()),
            ..Default::default()
        };

        let results = gen3_pokerus_search_for_calib(&opts);

        assert_list_eq!(
            results,
            vec![
                Pokerus3GeneratorResult {
                    seed_at_pickup: Pokerng::with_jump(0x5a0, 15713).seed(),
                    pickup_items: Some([2, 4].into_iter().collect()),
                    gives_item: true,
                    gives_pokerus: false
                },
                Pokerus3GeneratorResult {
                    seed_at_pickup: Pokerng::with_jump(0x5a0, 44110).seed(),
                    pickup_items: Some([2, 4].into_iter().collect()),
                    gives_item: true,
                    gives_pokerus: false
                }
            ]
        );
    }

    #[test]
    fn test_gen3_pokerus_search_for_calib_gives_pokerus_not_hof() {
        let opts = Pokerus3SearcherForCalibOptions {
            initial_advance_before_pickup: 0,
            max_advances: 30000,
            max_result_count: 10,
            gen_opts: Pokerus3GeneratorOptions {
                is_emerald_game: false,
                entered_hall_of_fame: false,
                can_have_new_mass_outbreak: true,
                has_empty_pokenews_slot: true,
                level_up: false,
                pickup_pokemon_count: 5,
            },
            filter_gives_pokerus: Some(true),
            ..Default::default()
        };

        let results = gen3_pokerus_search_for_calib(&opts);

        assert_list_eq!(
            results,
            vec![Pokerus3GeneratorResult {
                seed_at_pickup: Pokerng::with_jump(0x5a0, 26838).seed(),
                pickup_items: Some(
                    [NO_ITEM, NO_ITEM, NO_ITEM, 3, NO_ITEM]
                        .into_iter()
                        .collect()
                ),
                gives_item: true,
                gives_pokerus: true,
            }]
        );
    }

    #[test]
    fn test_get_all_generator_options_with_unknown_pokenews_values() {
        let setups = Pokerus3ConsideredSetups {
            entered_hall_of_fame: true,
            can_have_new_mass_outbreak: None,
            has_empty_pokenews_slot: None,
            permit_level_up: false,
            pickup_pokemon_count: vec![4],
        };

        let options = setups.get_all_gen_opts_groups();

        assert_eq!(options.len(), 1);
        assert_eq!(options[0].len(), 4);
        assert!(
            options[0]
                .iter()
                .any(|opts| { !opts.can_have_new_mass_outbreak && opts.has_empty_pokenews_slot })
        );
        assert!(
            options[0]
                .iter()
                .any(|opts| { !opts.can_have_new_mass_outbreak && !opts.has_empty_pokenews_slot })
        );
        assert!(
            options[0]
                .iter()
                .any(|opts| { opts.can_have_new_mass_outbreak && opts.has_empty_pokenews_slot })
        );
        assert!(
            options[0]
                .iter()
                .any(|opts| { opts.can_have_new_mass_outbreak && !opts.has_empty_pokenews_slot })
        );

        let painting_adv_finder = Wild3PaintingAdvFinder::new(&Wild3PaintingOpts {
            min_frame_before_painting: 850,
            min_adv_after_painting: 4000,
        });
        let res_info = calculate_result_info_for_seed_at_pokerus(
            false,
            &options[0][0],
            &painting_adv_finder,
            Pokerng::new(0x80007AF8),
        );

        assert_eq!(
            res_info.map(|res_info| { res_info.score.total_score() }),
            Some(1007)
        );
    }

    #[test]
    fn test_calculate_result_info_for_pokerus_known_values() {
        let gen_opts = Pokerus3GeneratorOptions {
            is_emerald_game: true,
            entered_hall_of_fame: true,
            can_have_new_mass_outbreak: false,
            has_empty_pokenews_slot: true,
            level_up: true,
            pickup_pokemon_count: 4,
        };
        let painting_adv_finder = Wild3PaintingAdvFinder::new(&Wild3PaintingOpts {
            min_frame_before_painting: 850,
            min_adv_after_painting: 4000,
        });
        let score = calculate_result_info_for_seed_at_pokerus(
            true,
            &gen_opts,
            &painting_adv_finder,
            Pokerng::new(0x4000004F),
        )
        .expect("seed should produce a Pokerus score");

        assert_eq!(
            score,
            Pokerus3ResultInfo {
                score: Pokerus3Score {
                    from_pokerus: 2000,
                    from_items: 93,
                    from_wait: -170,
                },
                target_advs: Wild3PaintingAdvs {
                    frame_before_painting: 12419,
                    adv_after_painting: 71621,
                },
                advs_at_pickup: [3026849045, 3026849046].into_iter().collect(),
                seed_at_pokerus: 0x4000004F,
                short_range_calibrable_ratio: 0.7,
                long_range_calibrable_ratio: 0.415,
                gen_opts: gen_opts.clone(),
            }
        );
    }

    // Around 0.45s
    #[test]
    fn test_gen3_pokerus_search_reverse_perf() {
        if cfg!(debug_assertions) {
            return;
        }

        let opts = Pokerus3SearcherOptions {
            consider_painting_reseeding: true,
            considered_setups: Pokerus3ConsideredSetups {
                entered_hall_of_fame: true,
                can_have_new_mass_outbreak: None,
                has_empty_pokenews_slot: None,
                permit_level_up: true,
                pickup_pokemon_count: vec![1, 2, 3, 4, 5, 6],
            },
            max_result_count: 2,
        };

        let results = gen3_pokerus_search_reverse(&opts);

        assert_eq!(results.len(), 2);
    }
}
