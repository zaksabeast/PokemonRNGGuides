use crate::gen3::lcrng_distance;
use crate::gen3::{
    EMERALD_INITIAL_SEED,
    pokerus::pokerus_generator::{
        Pokerus3GeneratorOptions, gen3_pokerus_generate, get_min_max_advance_before_pickup,
    },
    searcher_painter::{
        Wild3PaintingAdvFinder, Wild3PaintingAdvs, Wild3PaintingAdvsAndDur, Wild3PaintingOpts,
        evaluate_dur_to_perform_battle_video,
    },
};
use crate::rng::StateIterator;
use crate::rng::lcrng::Pokerng;
use arrayvec::ArrayVec;
use itertools::{Itertools, iproduct};
use serde::{Deserialize, Serialize};
use tsify::Tsify;
use wasm_bindgen::prelude::*;

// Only emerald is supported.

const SCORE_POKERUS_SHORT_RANGE: i64 = 1000;
const SCORE_POKERUS_LONG_RANGE: i64 = 100;

// max score from item is about 20 * 2 (short) + 120 * 2 (long) = ~350
const SCORE_ITEM_SHORT_RANGE: i64 = 2;
const SCORE_ITEM_LONG_RANGE: i64 = 1;

const SCORE_BY_ADV_WAIT: f64 = -1f64 / 2000f64; // typically 300k advances -> score = -150

const MIN_RATIO_ITEM_SHORT_RANGE: f64 = 0.5f64;
const MIN_RATIO_ITEM_LONG_RANGE: f64 = 0.4f64;
const SHORT_RANGE_ADV: usize = 10;
const LONG_RANGE_ADV: usize = 100;

#[derive(Debug, Default, Clone, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct Pokerus3SearcherOptions {
    pub consider_painting_reseeding: bool,
    pub considered_setups: Pokerus3ConsideredSetups,
    pub max_result_count: usize,
}

#[derive(Debug, Default, Clone, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct Pokerus3ConsideredSetups {
    pub entered_hall_of_fame: bool,
    pub can_have_new_mass_outbreak: Option<bool>, // None means Unknown
    pub has_empty_pokenews_slot: Option<bool>,    // None means Unknown
    pub permit_level_up: bool,
    pub pickup_pokemon_count: Vec<usize>,
}

impl Pokerus3ConsideredSetups {
    // The options within a particular group of options have the
    // same values for entered_hall_of_fame, level_up, pickup_pokemon_count
    // and every possible values for can_have_mass_outbreak and has_empty_pokenews_slot.
    pub fn get_all_gen_opts_groups(&self) -> Vec<Vec<Pokerus3GeneratorOptions>> {
        let level_up_values = if self.permit_level_up {
            vec![true, false]
        } else {
            vec![false]
        };

        let can_have_new_mass_outbreak_values =
            match (self.entered_hall_of_fame, self.can_have_new_mass_outbreak) {
                (false, _) => vec![false],
                (true, None) => vec![false, true],
                (true, Some(val)) => vec![val],
            };

        let has_empty_pokenews_slot_values =
            match (self.entered_hall_of_fame, self.has_empty_pokenews_slot) {
                (false, _) => vec![false],
                (true, None) => vec![true, false],
                (true, Some(val)) => vec![val],
            };

        let products = iproduct!(level_up_values.iter(), self.pickup_pokemon_count.iter());

        products
            .map(|(level_up, pickup_pokemon_count)| {
                let products2 = iproduct!(
                    can_have_new_mass_outbreak_values.iter(),
                    has_empty_pokenews_slot_values.iter()
                );
                products2
                    .map(|(can_have_new_mass_outbreak, has_empty_pokenews_slot)| {
                        Pokerus3GeneratorOptions {
                            is_emerald_game: true,
                            entered_hall_of_fame: self.entered_hall_of_fame,
                            can_have_new_mass_outbreak: *can_have_new_mass_outbreak,
                            has_empty_pokenews_slot: *has_empty_pokenews_slot,
                            level_up: *level_up,
                            pickup_pokemon_count: *pickup_pokemon_count,
                        }
                    })
                    .collect()
            })
            .collect()
    }
}

fn get_all_pokerus_rng_seeds() -> Vec<Pokerng> {
    [0x4000u32, 0x8000u32, 0xC000u32]
        .iter()
        .flat_map(|high| (0..=0xFFFFu32).map(move |low| Pokerng::new((high << 16) | low)))
        .collect()
}

fn get_pokerus_seeds_with_fewest_advs(initial_seed: Pokerng, count: usize) -> Vec<Pokerng> {
    StateIterator::new(initial_seed)
        .filter(|rng| {
            let high = rng.seed() >> 16;
            matches!(high, 0x4000u32 | 0x8000u32 | 0xC000u32)
        })
        .take(count)
        .collect()
}

#[derive(Debug, Clone, Default, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct Pokerus3Score {
    pub from_pokerus: i64,
    pub from_items: i64,
    pub from_wait: i64,
}

impl Pokerus3Score {
    pub fn total_score(&self) -> i64 {
        self.from_pokerus + self.from_items + self.from_wait
    }
}

#[derive(Debug, Clone, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct Pokerus3ResultInfo {
    pub score: Pokerus3Score,
    pub target_advs: Wild3PaintingAdvs,
    #[serde(with = "crate::serde_utils::arrayvec")]
    pub advs_at_pickup: ArrayVec<usize, 6>,
    pub seed_at_pokerus: u32,
    pub short_range_calibrable_ratio: f64,
    pub long_range_calibrable_ratio: f64,
    pub gen_opts: Pokerus3GeneratorOptions,
}

fn find_seeds_at_pickup_for_seed_at_pokerus(
    gen_opts: &Pokerus3GeneratorOptions,
    mut seed_at_pokerus: Pokerng,
) -> ArrayVec<Pokerng, 4> {
    let (min, max) = get_min_max_advance_before_pickup(gen_opts);

    seed_at_pokerus.reverse_jump(max);

    StateIterator::new(seed_at_pokerus)
        .take(max - min + 1)
        .filter_map(|rng| {
            let res = gen3_pokerus_generate::<false>(rng, gen_opts);
            if res.gives_pokerus { Some(rng) } else { None }
        })
        .collect()
}

pub fn calculate_result_info_for_seed_at_pokerus(
    consider_painting_reseeding: bool,
    gen_opts: &Pokerus3GeneratorOptions,
    painting_adv_finder: &Wild3PaintingAdvFinder,
    seed_at_pokerus: Pokerng,
) -> Option<Pokerus3ResultInfo> {
    let seeds_at_pickup_for_pokerus_seed =
        find_seeds_at_pickup_for_seed_at_pokerus(gen_opts, seed_at_pokerus);
    if seeds_at_pickup_for_pokerus_seed.is_empty() {
        return None;
    }
    if consider_painting_reseeding && seeds_at_pickup_for_pokerus_seed.len() < 2 {
        // When considering painting, we know the score will be bad if there's only 1 seed at pickup.
        // This greatly improves performance.
        return None;
    }

    let mut seeds_at_pickup: ArrayVec<Pokerng, 6> = Default::default();

    let mut score: Pokerus3Score = Default::default();

    let mut min_rng = seeds_at_pickup_for_pokerus_seed[0];
    min_rng.reverse_jump_const::<LONG_RANGE_ADV>();

    let mut short_range_calibrable_count: usize = 0;
    let mut long_range_calibrable_count: usize = 0;
    StateIterator::new(min_rng)
        .take(LONG_RANGE_ADV * 2)
        .enumerate()
        .for_each(|(idx, rng)| {
            let res_at_adv = gen3_pokerus_generate::<false>(rng, gen_opts);

            let dist_from_center = (idx as i32 - LONG_RANGE_ADV as i32).unsigned_abs() as usize;

            if res_at_adv.gives_pokerus {
                score.from_pokerus += if dist_from_center <= SHORT_RANGE_ADV {
                    SCORE_POKERUS_SHORT_RANGE
                } else {
                    SCORE_POKERUS_LONG_RANGE
                };
                seeds_at_pickup.push(rng);
            } else if res_at_adv.gives_item {
                score.from_items += if dist_from_center <= SHORT_RANGE_ADV {
                    SCORE_ITEM_SHORT_RANGE
                } else {
                    SCORE_ITEM_LONG_RANGE
                };
            } else {
                return;
            };

            long_range_calibrable_count += 1;

            if dist_from_center <= SHORT_RANGE_ADV {
                short_range_calibrable_count += 1;
            }
        });

    // Check if enough items for easy calibration.
    let short_range_calibrable_ratio =
        short_range_calibrable_count as f64 / (SHORT_RANGE_ADV * 2) as f64;
    if short_range_calibrable_ratio < MIN_RATIO_ITEM_SHORT_RANGE {
        return None;
    }

    let long_range_calibrable_ratio =
        long_range_calibrable_count as f64 / (LONG_RANGE_ADV * 2) as f64;
    if long_range_calibrable_ratio < MIN_RATIO_ITEM_LONG_RANGE {
        return None;
    }

    let advs_at_pickup = seeds_at_pickup
        .iter()
        .map(|rng| lcrng_distance(EMERALD_INITIAL_SEED, rng.seed()) as usize)
        .collect::<ArrayVec<_, 6>>();

    let target_adv = advs_at_pickup[advs_at_pickup.len() / 2];

    let advs_dur = if consider_painting_reseeding {
        painting_adv_finder.find_fastest_adv_considering_painting(target_adv as u32)
    } else if gen_opts.entered_hall_of_fame {
        // can use battle video
        Wild3PaintingAdvsAndDur {
            advs: Wild3PaintingAdvs {
                frame_before_painting: 0,
                adv_after_painting: target_adv as u32,
            },
            wait_dur: evaluate_dur_to_perform_battle_video(target_adv as u32),
        }
    } else {
        Wild3PaintingAdvsAndDur {
            advs: Wild3PaintingAdvs {
                frame_before_painting: 0,
                adv_after_painting: target_adv as u32,
            },
            wait_dur: target_adv as u32 * 20, // around 20 attempts
        }
    };

    score.from_wait = (advs_dur.wait_dur as f64 * SCORE_BY_ADV_WAIT) as i64;

    Some(Pokerus3ResultInfo {
        score,
        target_advs: advs_dur.advs,
        advs_at_pickup: advs_at_pickup.into_iter().collect(),
        seed_at_pokerus: seed_at_pokerus.seed(),
        short_range_calibrable_ratio,
        long_range_calibrable_ratio,
        gen_opts: gen_opts.clone(),
    })
}

#[wasm_bindgen]
pub fn gen3_pokerus_search_reverse(opts: &Pokerus3SearcherOptions) -> Vec<Pokerus3ResultInfo> {
    let gen_opts_groups = opts.considered_setups.get_all_gen_opts_groups();

    let seeds_at_pokerus = if opts.consider_painting_reseeding {
        get_all_pokerus_rng_seeds()
    } else {
        let initial_seed = Pokerng::new(EMERALD_INITIAL_SEED);
        get_pokerus_seeds_with_fewest_advs(initial_seed, 100)
    };

    let painting_adv_finder = Wild3PaintingAdvFinder::new(&Wild3PaintingOpts {
        min_frame_before_painting: 850,
        min_adv_after_painting: 4000, // enough time to complete the battle.
    });

    gen_opts_groups
        .iter()
        .flat_map(|gen_opts_group| {
            seeds_at_pokerus.iter().filter_map(|seed_at_pokerus| {
                // Reminder: When can_have_mass_outbreak or has_empty_pokenews_slot are Unknown,
                // only setups that result in Pokérus no matter their real value will be considered.
                // The exact target advance may change a little bit between the setups (more or less 1 advance), which is acceptable.
                // can_have_mass_outbreak or has_empty_pokenews_slot don't affect calibration because the advances are after pickup logic.

                // The score of a group of options is the minimum of their score.
                gen_opts_group
                    .iter()
                    .try_fold(None::<Pokerus3ResultInfo>, |current_minimum, gen_opts| {
                        let candidate = calculate_result_info_for_seed_at_pokerus(
                            opts.consider_painting_reseeding,
                            gen_opts,
                            &painting_adv_finder,
                            *seed_at_pokerus,
                        )?; // ? operator will cause the score to be None if an option can't trigger Pokerus.

                        Some(match current_minimum {
                            Some(current_minimum)
                                if current_minimum.score.total_score()
                                    <= candidate.score.total_score() =>
                            {
                                Some(current_minimum)
                            }
                            _ => Some(candidate),
                        })
                    })
                    .flatten()
            })
        })
        .k_largest_by_key(opts.max_result_count, |res| res.score.total_score())
        .collect()
}
