use crate::rng::Rng;
use crate::{
    Species,
    gen4::{
        GameVersion,
        game_logic::{DpptLogic, GameSpecificLogic},
    },
    rng::{StateIterator, lcrng::Pokerng},
};
use num_enum::FromPrimitive;
use serde::{Deserialize, Serialize};
use tsify::Tsify;
use wasm_bindgen::prelude::*;

#[derive(Debug, Clone, Copy, PartialEq, Tsify, Serialize, Deserialize, FromPrimitive)]
#[tsify(into_wasm_abi, from_wasm_abi)]
#[repr(u8)]
pub enum HoneyTreeLocation {
    #[num_enum(default)]
    Route205South = 0,
    Route205North = 1,
    Route206 = 2,
    Route207 = 3,
    Route208 = 4,
    Route209 = 5,
    Route210South = 6,
    Route210North = 7,
    Route211East = 8,
    Route212North = 9,
    Route212South = 10,
    Route213 = 11,
    Route214 = 12,
    Route215 = 13,
    Route218 = 14,
    Route221 = 15,
    Route222 = 16,
    ValleyWindworksOutside = 17,
    EternaForestOutside = 18,
    FuegoIronworksOutside = 19,
    FloaromaMeadow = 20,
}

impl HoneyTreeLocation {
    const MAX_TREES: u8 = 21;

    fn new(byte: u8) -> Self {
        (byte % Self::MAX_TREES).into()
    }

    fn next(&self) -> Self {
        HoneyTreeLocation::new((*self as u8) + 1)
    }
}

#[wasm_bindgen]
pub fn get_muchlax_trees(tid: u16, sid: u16) -> Vec<HoneyTreeLocation> {
    let tid_bytes = tid.to_be_bytes();
    let sid_bytes = sid.to_be_bytes();
    let mut trees = [
        HoneyTreeLocation::new(sid_bytes[0]),
        HoneyTreeLocation::new(sid_bytes[1]),
        HoneyTreeLocation::new(tid_bytes[0]),
        HoneyTreeLocation::new(tid_bytes[1]),
    ];

    for i in 1..4 {
        for j in 0..i {
            if trees[i] == trees[j] {
                trees[i] = trees[i].next();
            }
        }
    }

    trees.to_vec()
}

#[derive(Debug, Clone, Copy, PartialEq)]
#[repr(u8)]
enum TreeEncounterGroup {
    None = 0,
    A = 1,
    B = 2,
    C = 3,
}

impl TreeEncounterGroup {
    fn from_rand(rand: u8, is_munchlax_tree: bool) -> Self {
        match (is_munchlax_tree, rand) {
            (true, 0) => Self::C,
            (true, 1..=9) => Self::None,
            (true, 10..=29) => Self::A,
            (true, _) => Self::B,
            (false, 0..=9) => Self::None,
            (false, 10..=29) => Self::B,
            (false, _) => Self::A,
        }
    }

    fn encounter_slot(rand: u8) -> u8 {
        match rand {
            0..=4 => 5,
            5..=9 => 4,
            10..=19 => 3,
            20..=39 => 2,
            40..=59 => 1,
            _ => 0,
        }
    }

    fn encounter(&self, game: GameVersion, rand: u8) -> Species {
        use GameVersion::*;
        use Species::*;
        use TreeEncounterGroup::*;

        let slot = Self::encounter_slot(rand);
        match (game, self, slot) {
            (Diamond | Pearl, A, 0) => Wurmple,
            (Diamond, A, 1) => Silcoon,
            (Pearl, A, 1) => Cascoon,
            (Diamond | Pearl, A, 2) => Combee,
            (Diamond | Pearl, A, 3) => Burmy_Plant,
            (Diamond | Pearl, A, 4) => Cherubi,
            (Diamond | Pearl, A, 5) => Aipom,

            (Diamond | Pearl, B, 0) => Combee,
            (Diamond | Pearl, B, 1) => Burmy_Plant,
            (Diamond | Pearl, B, 2) => Cherubi,
            (Diamond | Pearl, B, 3) => Aipom,
            (Diamond | Pearl, B, 4) => Heracross,
            (Diamond | Pearl, B, 5) => Wurmple,

            (Platinum, A, 0) => Combee,
            (Platinum, A, 1) => Wurmple,
            (Platinum, A, 2) => Burmy_Plant,
            (Platinum, A, 3) => Cherubi,
            (Platinum, A, 4) => Aipom,
            (Platinum, A, 5) => Aipom,

            (Platinum, B, 0) => Burmy_Plant,
            (Platinum, B, 1) => Cherubi,
            (Platinum, B, 2) => Combee,
            (Platinum, B, 3) => Aipom,
            (Platinum, B, 4) => Aipom,
            (Platinum, B, 5) => Heracross,

            (Diamond | Pearl | Platinum, C, 0..=5) => Munchlax,

            _ => Species::None,
        }
    }
}

fn generate_honey_tree_encounter(
    rand1: u16,
    rand2: u16,
    is_munchlax_tree: bool,
    game: GameVersion,
) -> Species {
    let rand1 = DpptLogic::max(rand1, 100) as u8;
    let rand2 = DpptLogic::max(rand2, 100) as u8;
    TreeEncounterGroup::from_rand(rand1, is_munchlax_tree).encounter(game, rand2)
}

#[derive(Debug, Clone, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct HoneyTreeGeneratorOpts {
    seed: u32,
    is_munchlax_tree: bool,
    game: GameVersion,
    min_advance: usize,
    max_advance: usize,
}

#[derive(Debug, Clone, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct HoneyTreeEncounter {
    pub advance: usize,
    pub species: Species,
}

#[wasm_bindgen]
pub fn generate_honey_tree_encounters(opts: &HoneyTreeGeneratorOpts) -> Vec<HoneyTreeEncounter> {
    let rng = Pokerng::new(opts.seed);
    let count = opts
        .max_advance
        .checked_sub(opts.min_advance)
        .map(|range| range.saturating_add(1))
        .unwrap_or(0);

    StateIterator::new(rng)
        .enumerate()
        .skip(opts.min_advance)
        .take(count)
        .map(move |(advance, mut rng)| {
            let rand1 = rng.rand::<u16>();
            let rand2 = rng.rand::<u16>();
            let species =
                generate_honey_tree_encounter(rand1, rand2, opts.is_munchlax_tree, opts.game);
            HoneyTreeEncounter { advance, species }
        })
        .collect()
}

#[cfg(test)]
mod tests {
    use super::*;

    mod get_muchlax_trees {
        use super::*;

        #[test]
        fn trees() {
            use HoneyTreeLocation::*;

            let res = get_muchlax_trees(12345, 54321);
            assert_eq!(res, [Route206, Route210North, Route210South, Route221]);
        }
    }

    mod tree_encounter_group {
        use super::*;

        #[test]
        fn encounter_slot() {
            let expected = [
                5, 5, 5, 5, 5, 4, 4, 4, 4, 4, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 2, 2, 2, 2, 2, 2,
                2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
                1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            ];
            for i in 0..100 {
                assert_eq!(TreeEncounterGroup::encounter_slot(i), expected[i as usize]);
            }
        }

        #[test]
        fn munchlax_tree() {
            let expected = [
                3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
                1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
                2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
                2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
            ];
            for i in 0..100 {
                assert_eq!(
                    TreeEncounterGroup::from_rand(i, true) as u8,
                    expected[i as usize]
                );
            }
        }

        #[test]
        fn non_munchlax_tree() {
            let expected = [
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
                2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
                1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
                1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            ];
            for i in 0..100 {
                assert_eq!(
                    TreeEncounterGroup::from_rand(i, false) as u8,
                    expected[i as usize]
                );
            }
        }
    }

    mod generate_honey_tree_encounters {
        use super::*;

        #[test]
        fn respects_min_and_max_advance_bounds() {
            let opts = HoneyTreeGeneratorOpts {
                seed: 0,
                is_munchlax_tree: false,
                game: GameVersion::Diamond,
                min_advance: 5,
                max_advance: 7,
            };
            let advances = generate_honey_tree_encounters(&opts)
                .iter()
                .map(|res| res.advance)
                .collect::<Vec<_>>();

            assert_eq!(advances, [5, 6, 7]);
        }

        #[test]
        fn empty_when_max_advance_is_less_than_min_advance() {
            let opts = HoneyTreeGeneratorOpts {
                seed: 0,
                is_munchlax_tree: false,
                game: GameVersion::Diamond,
                min_advance: 7,
                max_advance: 5,
            };
            let advances = generate_honey_tree_encounters(&opts)
                .iter()
                .map(|res| res.advance)
                .collect::<Vec<_>>();

            assert!(advances.is_empty());
        }
    }

    #[ignore]
    #[test]
    fn find_special_munchlax_seeds() {
        use crate::RngDateTime;
        use crate::gen4::seed_time4::{Seed4CalcOpts, SeedTime4Options};
        use chrono::Duration;
        use std::mem;

        const DPPT_MAX_100_DIVISOR: u16 = 656;
        const POKERNG_REVERSE_MUL_LOW: u16 = 0xeb65;

        fn find_type_c_honey_tree_seed_candidates(
            required_consecutive_advances: usize,
        ) -> Vec<u32> {
            let required_consecutive_advances = required_consecutive_advances.max(1);
            let mut candidates = Vec::new();
            let mut next_highs = Vec::new();
            let mut current_highs = Vec::new();
            let mut high_terms = vec![0u16; required_consecutive_advances];

            for initial_low in 0..=u16::MAX {
                let mut low = initial_low;
                for high_term in &mut high_terms {
                    let rand = Pokerng::new(low as u32).rand::<u32>();
                    *high_term = (rand >> 16) as u16;
                    low = rand as u16;
                }

                next_highs.clear();
                next_highs.extend(0..DPPT_MAX_100_DIVISOR);

                let mut valid_candidate = true;
                for &high_term in high_terms.iter().skip(1).rev() {
                    current_highs.clear();

                    for &next_high in &next_highs {
                        let previous_high =
                            POKERNG_REVERSE_MUL_LOW.wrapping_mul(next_high.wrapping_sub(high_term));
                        if previous_high < DPPT_MAX_100_DIVISOR {
                            current_highs.push(previous_high);
                        }
                    }

                    if current_highs.is_empty() {
                        valid_candidate = false;
                        break;
                    }

                    mem::swap(&mut next_highs, &mut current_highs);
                }

                if !valid_candidate {
                    continue;
                }

                for &next_high in &next_highs {
                    let initial_high =
                        POKERNG_REVERSE_MUL_LOW.wrapping_mul(next_high.wrapping_sub(high_terms[0]));
                    let seed = ((initial_high as u32) << 16) | (initial_low as u32);
                    candidates.push(seed);
                }
            }

            candidates
        }

        let opts = Seed4CalcOpts {
            datetime: RngDateTime {
                year: 2000,
                day: 1,
                month: 1,
                hour: 0,
                minute: 0,
                second: 0,
            },
            seconds_increment: 60 * 60 * 24 * 365 * 100,
            min_delay: 1000,
            max_delay: 10_000,
        };

        let candidate_seeds = find_type_c_honey_tree_seed_candidates(4);
        if candidate_seeds.is_empty() {
            println!("No seeds can produce 5 consecutive Type C honey tree rolls.");
            return;
        }

        let start_datetime = opts.datetime.clone().to_naive_datetime().unwrap();
        let end_datetime = start_datetime + Duration::seconds(opts.seconds_increment as i64);

        for seed in candidate_seeds {
            let seed_time = SeedTime4Options::new_safe_second(
                seed,
                1,
                opts.datetime.year,
                Some(opts.datetime.month),
                opts.min_delay..=opts.max_delay,
            )
            .find_seedtime();

            if let Some(seed_time) = seed_time {
                let datetime = seed_time.datetime.to_naive_datetime().unwrap();
                if datetime >= start_datetime && datetime <= end_datetime {
                    println!("Seed: {:x}", seed_time.seed);
                }
            }
        }
    }
}
