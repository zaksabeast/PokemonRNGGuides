use crate::rng::lcrng::Pokerng;
use crate::rng::{Rng, StateIterator};
use serde::{Deserialize, Serialize};
use tsify_next::Tsify;
use wasm_bindgen::prelude::*;

// Pokérus generator and searcher for Ruby & Sapphire with dead battery
use num_enum::{FromPrimitive, IntoPrimitive};

#[derive(Debug, Clone, PartialEq, Tsify, Serialize, Deserialize, FromPrimitive, IntoPrimitive)]
#[repr(i8)]
pub enum PickUpItem {
    #[default]
    None = -1,
    SuperPotion = 0,
    FullHeal = 1,
    UltraBall = 2,
    RareCandy = 3,
    FullRestore = 4,
    Revive = 5,
    Nugget = 6,
    Protein = 7,
    PpUp = 8,
    KingsRock = 9,
}

const RS_SEED: u32 = 0x5A0; // Ruby & Sapphire dead battery
const PICKUP_ITEM_CHANCE: [u16; 10] = [30, 40, 50, 60, 70, 80, 90, 95, 99, 0xFFFF];

#[derive(Debug, Clone, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct Pokerus3GeneratorOptions {
    pub initial_advance_before_pickup: usize,
    pub max_advances: usize,
    pub entered_hall_of_fame: bool,
    pub can_have_new_mass_outbreak: bool,
    pub has_empty_pokenews_slot: bool,
    pub level_up: bool,
    pub pickup_pokemon_count: usize,
    pub filter_pickup_items: Option<Vec<PickUpItem>>,
    pub filter_gives_pokerus: Option<bool>,
}

#[derive(Debug, Clone, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct Pokerus3GeneratorResult {
    pub advance_before_pickup: usize,
    pub pickup_items: Vec<PickUpItem>,
    pub advance_before_pokerus: usize,
    pub gives_pokerus: bool,
}

fn generate_gen3_pokerus_state(
    mut rng: Pokerng,
    opts: &Pokerus3GeneratorOptions,
    advance_before_pickup: usize,
) -> Pokerus3GeneratorResult {
    let mut advance_before_pokerus = advance_before_pickup;
    let mut rand = || -> u16 {
        advance_before_pokerus += 1;
        rng.rand()
    };

    let pickup_items: Vec<PickUpItem> = (0..opts.pickup_pokemon_count)
        .map(|_| {
            if rand() % 10 == 0 {
                let chance = rand() % 100;

                for (i, item) in PICKUP_ITEM_CHANCE.iter().enumerate() {
                    if chance < *item {
                        return (i as i8).into();
                    }
                }
                PickUpItem::None // Error
            } else {
                PickUpItem::None
            }
        })
        .collect();
    // vblanks between pickup and TV shows. Either 4 (~80% of the time) or 6 (~20%). The tool assumes 4.
    for _ in 0..4 {
        rand();
    }

    if opts.entered_hall_of_fame {
        if opts.has_empty_pokenews_slot {
            rand();
        }
        if opts.can_have_new_mass_outbreak && rand() <= 0x147 {
            rand();
        }
    }
    rand(); // TV pokenew for not catching the Pokémon

    // vblanks between TV shows and Pokerus
    for _ in 0..74 {
        rand();
    }

    if opts.level_up {
        for _ in 0..2 {
            rand();
        }
    }

    let pokerus_rng = rng.rand::<u16>();
    let gives_pokerus = pokerus_rng == 0x4000 || pokerus_rng == 0x8000 || pokerus_rng == 0xC000;
    Pokerus3GeneratorResult {
        advance_before_pickup,
        pickup_items,
        advance_before_pokerus,
        gives_pokerus,
    }
}

#[wasm_bindgen]
pub fn get_target_advances_before_pickup(
    entered_hall_of_fame: bool,
    can_have_new_mass_outbreak: bool,
    has_empty_pokenews_slot: bool,
    level_up: bool,
    pickup_pokemon_count: usize,
) -> Vec<usize> {
    // The pokerus target advance is either near 26923, near 101199 or near 101236.
    // Try advance 26923 first, and if it is impossible to hit it, try 101199/101236.
    let mut opts = Pokerus3GeneratorOptions {
        initial_advance_before_pickup: 26000,
        max_advances: 1000,
        entered_hall_of_fame,
        can_have_new_mass_outbreak,
        has_empty_pokenews_slot,
        level_up,
        filter_pickup_items: None,
        pickup_pokemon_count,
        filter_gives_pokerus: Some(true),
    };
    let mut results: Vec<Pokerus3GeneratorResult> = gen3_pokerus_generator_states(&opts);
    if results.is_empty() {
        opts.initial_advance_before_pickup = 101000;
        results = gen3_pokerus_generator_states(&opts);
    }
    let mapped_results: Vec<usize> = results.iter().map(|r| r.advance_before_pickup).collect();

    // Find the longest consecutive advances. Ex: {1000, 1008, 1009} returns {1008, 1009}
    match mapped_results.len() {
        0 | 1 => mapped_results,
        2 => {
            let consecutive_1st_2nd = mapped_results[0] + 1 == mapped_results[1];
            if consecutive_1st_2nd {
                mapped_results
            } else {
                mapped_results[0..=0].to_vec()
            }
        }
        3 => {
            let consecutive_1st_2nd = mapped_results[0] + 1 == mapped_results[1];
            let consecutive_2nd_3rd = mapped_results[1] + 1 == mapped_results[2];
            if consecutive_1st_2nd && consecutive_2nd_3rd {
                mapped_results
            } else if consecutive_1st_2nd {
                mapped_results[0..=1].to_vec()
            } else if consecutive_2nd_3rd {
                mapped_results[1..=2].to_vec()
            } else {
                mapped_results[0..=0].to_vec()
            }
        }
        _ => mapped_results[0..=0].to_vec(), // no supported, but doesn't occur
    }
}

#[wasm_bindgen]
pub fn gen3_pokerus_generator_states(
    opts: &Pokerus3GeneratorOptions,
) -> Vec<Pokerus3GeneratorResult> {
    StateIterator::new(Pokerng::new(RS_SEED))
        .enumerate()
        .skip(opts.initial_advance_before_pickup)
        .take(opts.max_advances.saturating_add(1))
        .filter_map(|(advance, rng)| {
            let state = generate_gen3_pokerus_state(rng, opts, advance);

            if let Some(filter_pickup_items) = &opts.filter_pickup_items {
                if *filter_pickup_items != state.pickup_items {
                    return None;
                }
            }

            if let Some(filter_gives_pokerus) = opts.filter_gives_pokerus {
                if filter_gives_pokerus != state.gives_pokerus {
                    return None;
                }
            }

            Some(state)
        })
        .collect()
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::assert_list_eq;

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
                    get_target_advances_before_pickup(
                        entered_hall_of_fame,
                        can_have_new_mass_outbreak,
                        has_empty_pokenews_slot,
                        level_up,
                        pickup_count,
                    )
                })
                .collect();

            println!(
                "{}, {}, {}, {}",
                entered_hall_of_fame, can_have_new_mass_outbreak, has_empty_pokenews_slot, level_up
            );
            assert_eq!(results, expected_results);
        }

        cmp_each_pickup_count(
            true,
            true,
            true,
            false,
            &[
                vec![26842],
                vec![101117],
                vec![101152, 101153],
                vec![101115],
                vec![101114],
                vec![101113],
            ],
        );

        cmp_each_pickup_count(
            false,
            false,
            false,
            false,
            &[
                vec![26844],
                vec![26843],
                vec![26841, 26842],
                vec![26840],
                vec![26839],
                vec![26838],
            ],
        );

        cmp_each_pickup_count(
            true,
            false,
            true,
            false,
            &[
                vec![26843],
                vec![26841, 26842],
                vec![26840],
                vec![26839],
                vec![26838],
                vec![26837],
            ],
        );

        cmp_each_pickup_count(
            true,
            true,
            true,
            true,
            &[
                vec![26840],
                vec![26839],
                vec![26838],
                vec![26837],
                vec![26836],
                vec![26835],
            ],
        );

        cmp_each_pickup_count(
            false,
            false,
            false,
            true,
            &[
                vec![26842],
                vec![101117],
                vec![101152, 101153],
                vec![101115],
                vec![101114],
                vec![101113],
            ],
        );

        cmp_each_pickup_count(
            true,
            false,
            true,
            true,
            &[
                vec![26841],
                vec![26840],
                vec![26839],
                vec![26838],
                vec![26837],
                vec![26836],
            ],
        );

        // Conclusion: There are 2 setups that have a 2-advances window.
    }

    #[test]
    fn test_gen3_pokerus_generator_states_no_filter() {
        let opts = Pokerus3GeneratorOptions {
            initial_advance_before_pickup: 10022,
            max_advances: 1,
            entered_hall_of_fame: true,
            can_have_new_mass_outbreak: true,
            has_empty_pokenews_slot: true,
            level_up: false,
            filter_pickup_items: None,
            pickup_pokemon_count: 5,
            filter_gives_pokerus: None,
        };

        let results = gen3_pokerus_generator_states(&opts);

        assert_list_eq!(
            results,
            vec![
                Pokerus3GeneratorResult {
                    advance_before_pickup: 10022,
                    pickup_items: vec![
                        PickUpItem::None,
                        PickUpItem::None,
                        PickUpItem::None,
                        PickUpItem::None,
                        PickUpItem::FullRestore
                    ],
                    advance_before_pokerus: 10109,
                    gives_pokerus: false,
                },
                Pokerus3GeneratorResult {
                    advance_before_pickup: 10023,
                    pickup_items: vec![
                        PickUpItem::None,
                        PickUpItem::None,
                        PickUpItem::None,
                        PickUpItem::FullRestore,
                        PickUpItem::None
                    ],
                    advance_before_pokerus: 10110,
                    gives_pokerus: false,
                }
            ]
        );
    }

    #[test]
    fn test_gen3_pokerus_generator_states_with_filter() {
        let opts = Pokerus3GeneratorOptions {
            initial_advance_before_pickup: 40000,
            max_advances: 10000,
            entered_hall_of_fame: true,
            can_have_new_mass_outbreak: true,
            has_empty_pokenews_slot: true,
            level_up: false,
            filter_pickup_items: Some(vec![
                PickUpItem::None,
                PickUpItem::None,
                PickUpItem::UltraBall,
                PickUpItem::FullRestore,
                PickUpItem::None,
            ]),
            pickup_pokemon_count: 5,
            filter_gives_pokerus: None,
        };

        let results = gen3_pokerus_generator_states(&opts);

        assert_list_eq!(
            results,
            vec![Pokerus3GeneratorResult {
                advance_before_pickup: 44108,
                pickup_items: vec![
                    PickUpItem::None,
                    PickUpItem::None,
                    PickUpItem::UltraBall,
                    PickUpItem::FullRestore,
                    PickUpItem::None
                ],
                advance_before_pokerus: 44196,
                gives_pokerus: false,
            }]
        );
    }

    #[test]
    fn test_gen3_pokerus_generator_states_with_filter_2_pickup_pokemon() {
        let opts = Pokerus3GeneratorOptions {
            initial_advance_before_pickup: 15000,
            max_advances: 30000,
            entered_hall_of_fame: false,
            can_have_new_mass_outbreak: false,
            has_empty_pokenews_slot: false,
            level_up: false,
            filter_pickup_items: Some(vec![PickUpItem::UltraBall, PickUpItem::FullRestore]),
            pickup_pokemon_count: 2,
            filter_gives_pokerus: None,
        };

        let results = gen3_pokerus_generator_states(&opts);

        assert_list_eq!(
            results,
            vec![
                Pokerus3GeneratorResult {
                    advance_before_pickup: 15713,
                    pickup_items: vec![PickUpItem::UltraBall, PickUpItem::FullRestore],
                    advance_before_pokerus: 15796,
                    gives_pokerus: false
                },
                Pokerus3GeneratorResult {
                    advance_before_pickup: 44110,
                    pickup_items: vec![PickUpItem::UltraBall, PickUpItem::FullRestore],
                    advance_before_pokerus: 44193,
                    gives_pokerus: false
                }
            ]
        );
    }

    #[test]
    fn test_gen3_pokerus_generator_states_gives_pokerus_not_hof() {
        let opts = Pokerus3GeneratorOptions {
            initial_advance_before_pickup: 0,
            max_advances: 30000,
            entered_hall_of_fame: false,
            can_have_new_mass_outbreak: true,
            has_empty_pokenews_slot: true,
            level_up: false,
            filter_pickup_items: None,
            pickup_pokemon_count: 5,
            filter_gives_pokerus: Some(true),
        };

        let results = gen3_pokerus_generator_states(&opts);

        assert_list_eq!(
            results,
            vec![Pokerus3GeneratorResult {
                advance_before_pickup: 26838,
                pickup_items: vec![
                    PickUpItem::None,
                    PickUpItem::None,
                    PickUpItem::None,
                    PickUpItem::RareCandy,
                    PickUpItem::None,
                ],
                advance_before_pokerus: 26923,
                gives_pokerus: true,
            }]
        );
    }

    /*
    // Kept to help future debugging
    #[test]
    fn test_debug() {
        println!("{:?}", gen3_pokerus_generator_states(&Pokerus3GeneratorOptions {
            initial_advance_before_pickup: 26000,
            max_advances: 1000,
            entered_hall_of_fame: false,
            can_have_new_mass_outbreak: true,
            level_up: false,
            has_empty_pokenews_slot: true,
            filter_pickup_items: None,
            pickup_pokemon_count: 2,
            filter_gives_pokerus: Some(true),
        }));
        assert!(false);
    }
    */
}
