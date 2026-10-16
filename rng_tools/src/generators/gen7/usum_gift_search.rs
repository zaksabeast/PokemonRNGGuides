use super::fossil_timeline::UsumFossil;
use super::starter_timeline::UsumStarter;
use super::{Gen7Gift, GiftSettings, MergeKey, MissedStates, Timeline, UniqueGifts, matching_gift};
use crate::{Nature, PkmFilter};
use serde::{Deserialize, Serialize};
use std::collections::HashMap;
use std::ops::RangeInclusive;
use tsify::Tsify;
use wasm_bindgen::prelude::*;

#[derive(Debug, Clone, Copy, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub enum Gen7UsumGiftMethod {
    Starter,
    Fossil,
}

#[derive(Debug, Clone, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct Gen7UsumGiftSearchOpts {
    pub method: Gen7UsumGiftMethod,
    pub seed: u32,
    pub tsv: u16,
    /// The nature of a lead with Synchronize, for gifts that take it.
    pub sync_nature: Option<Nature>,
    pub current_advance: usize,
    pub first_target_advance: usize,
    pub last_target_advance: usize,
    pub filter: PkmFilter,
}

/// The logic specific to each gift. Each gift's scene starts with a press,
/// like Yes for starters or A on the dialogue for fossils, and the gift is
/// received with an A press some time after it.
pub(super) trait UsumGift {
    /// Models in the scene the start press happens in.
    const MODELS: usize;
    /// The earliest advance the start press can happen on.
    const MIN_START_ADVANCE: usize = 0;
    /// Advances from the current advance to the earliest start press.
    const MIN_ADVANCES_TO_START: usize;
    /// Advances from the start press to the earliest A press.
    const MIN_ADVANCES_AFTER_START: usize;
    /// Advances from the start press to the latest A press.
    const MAX_ADVANCES_AFTER_START: usize;

    /// Starts from the start press on `start`'s current step.
    fn after_start_timeline(start: Timeline) -> Timeline;
    fn skip_to_first_a_press(after_start: &mut Timeline);
    fn can_press_a(after_start: &Timeline, last_advance: usize) -> bool;
    /// Steps to the next step the user could press A on.
    fn step_to_next_a_press(after_start: &mut Timeline);
    fn settings(sync_nature: Option<Nature>) -> GiftSettings;
}

impl Gen7UsumGiftSearchOpts {
    fn start_advances<Gift: UsumGift>(&self) -> RangeInclusive<usize> {
        let first_reachable_start = self
            .current_advance
            .saturating_add(Gift::MIN_ADVANCES_TO_START);
        let first_useful_start = self
            .first_target_advance
            .saturating_sub(Gift::MAX_ADVANCES_AFTER_START);
        let first_start = first_reachable_start
            .max(first_useful_start)
            .max(Gift::MIN_START_ADVANCE);
        // Later start presses can't reach a target in range.
        let last_useful_start = self
            .last_target_advance
            .saturating_sub(Gift::MIN_ADVANCES_AFTER_START);
        first_start..=last_useful_start
    }
}

/// The NPC states at the start press aren't known yet, so this assumes
/// they're idle. The plans check if the user's timeline can reach a result.
#[wasm_bindgen]
pub fn gen7_search_usum_gifts(opts: Gen7UsumGiftSearchOpts) -> Vec<Gen7Gift> {
    match opts.method {
        Gen7UsumGiftMethod::Starter => search_gifts::<UsumStarter>(&opts),
        Gen7UsumGiftMethod::Fossil => search_gifts::<UsumFossil>(&opts),
    }
}

fn search_gifts<Gift: UsumGift>(opts: &Gen7UsumGiftSearchOpts) -> Vec<Gen7Gift> {
    let mut unique_gifts = UniqueGifts::default();
    let mut seen_a_presses = SeenAPresses::new();
    for after_start in after_start_timelines_with_idle_npcs::<Gift>(opts) {
        add_gifts_after_start::<Gift>(after_start, opts, &mut seen_a_presses, &mut unique_gifts);
    }
    unique_gifts.into()
}

/// Sampled A presses and their steps since the start press. Same advance
/// and NPC state means the same future, so a timeline that merges with one
/// that had as much time left doesn't generate its gifts again.
type SeenAPresses = HashMap<MergeKey, u32>;

fn add_gifts_after_start<Gift: UsumGift>(
    mut after_start: Timeline,
    opts: &Gen7UsumGiftSearchOpts,
    seen_a_presses: &mut SeenAPresses,
    unique_gifts: &mut UniqueGifts,
) {
    Gift::skip_to_first_a_press(&mut after_start);
    // Skipped before `seen_a_presses` so it only holds possible targets.
    while after_start.advance() < opts.first_target_advance
        && Gift::can_press_a(&after_start, opts.last_target_advance)
    {
        Gift::step_to_next_a_press(&mut after_start);
    }

    while Gift::can_press_a(&after_start, opts.last_target_advance) {
        if let Some(a_press) = MissedStates::sample(&after_start) {
            let steps = after_start.steps_since_start();
            // The earlier timeline already generated everything from here.
            if seen_a_presses
                .get(&a_press)
                .is_some_and(|&seen_steps| seen_steps <= steps)
            {
                return;
            }
            seen_a_presses.insert(a_press, steps);
        }
        if let Some(gift) = matching_gift_after_start::<Gift>(&after_start, opts) {
            unique_gifts.insert(gift);
        }
        Gift::step_to_next_a_press(&mut after_start);
    }
}

fn matching_gift_after_start<Gift: UsumGift>(
    a_press: &Timeline,
    opts: &Gen7UsumGiftSearchOpts,
) -> Option<Gen7Gift> {
    let settings = Gift::settings(opts.sync_nature);
    matching_gift(a_press, opts.tsv, &opts.filter, &settings)
}

fn after_start_timelines_with_idle_npcs<Gift: UsumGift>(
    opts: &Gen7UsumGiftSearchOpts,
) -> impl Iterator<Item = Timeline> {
    Timeline::range_with_idle_npcs(opts.seed, Gift::MODELS, opts.start_advances::<Gift>())
        .map(Gift::after_start_timeline)
}

#[cfg(test)]
mod test {
    use super::*;
    use crate::gen7::starter_timeline::MIN_ADVANCES_TO_YES;
    use crate::{Gender, Ivs};

    const SEED: u32 = 0x768ba16d;
    const CURRENT_ADVANCE: usize = 5000;
    const METHODS: [Gen7UsumGiftMethod; 2] =
        [Gen7UsumGiftMethod::Starter, Gen7UsumGiftMethod::Fossil];

    fn opts(
        method: Gen7UsumGiftMethod,
        first_target_advance: usize,
        last_target_advance: usize,
    ) -> Gen7UsumGiftSearchOpts {
        Gen7UsumGiftSearchOpts {
            method,
            seed: SEED,
            tsv: 0,
            sync_nature: None,
            current_advance: CURRENT_ADVANCE,
            first_target_advance,
            last_target_advance,
            filter: PkmFilter::new_allow_all(),
        }
    }

    /// Starts where the first Yes can be pressed on `CURRENT_ADVANCE`.
    fn starter_opts(first: usize, last: usize) -> Gen7UsumGiftSearchOpts {
        Gen7UsumGiftSearchOpts {
            current_advance: CURRENT_ADVANCE - MIN_ADVANCES_TO_YES,
            ..opts(Gen7UsumGiftMethod::Starter, first, last)
        }
    }

    fn fossil_opts(first: usize, last: usize) -> Gen7UsumGiftSearchOpts {
        opts(Gen7UsumGiftMethod::Fossil, first, last)
    }

    /// A target range each method can reach from `CURRENT_ADVANCE`.
    fn target_opts(method: Gen7UsumGiftMethod) -> Gen7UsumGiftSearchOpts {
        match method {
            Gen7UsumGiftMethod::Starter => starter_opts(6300, 6400),
            Gen7UsumGiftMethod::Fossil => fossil_opts(7300, 7400),
        }
    }

    /// Every A press from each start press, with duplicates.
    fn every_gift<Gift: UsumGift>(opts: &Gen7UsumGiftSearchOpts) -> Vec<Gen7Gift> {
        let mut gifts = vec![];
        for mut after_start in after_start_timelines_with_idle_npcs::<Gift>(opts) {
            Gift::skip_to_first_a_press(&mut after_start);
            while Gift::can_press_a(&after_start, opts.last_target_advance) {
                if after_start.advance() >= opts.first_target_advance {
                    gifts.extend(matching_gift_after_start::<Gift>(&after_start, opts));
                }
                Gift::step_to_next_a_press(&mut after_start);
            }
        }
        gifts
    }

    fn every_gift_for(opts: &Gen7UsumGiftSearchOpts) -> Vec<Gen7Gift> {
        match opts.method {
            Gen7UsumGiftMethod::Starter => every_gift::<UsumStarter>(opts),
            Gen7UsumGiftMethod::Fossil => every_gift::<UsumFossil>(opts),
        }
    }

    #[test]
    fn lists_each_target_once() {
        for method in METHODS {
            let opts = target_opts(method);
            let gifts = every_gift_for(&opts);
            let gift_count = gifts.len();
            let mut expected = gifts;
            expected.sort_by_key(|gift| (gift.advance, gift.delay_advances));
            expected.dedup();

            let results = gen7_search_usum_gifts(opts);
            assert!(!results.is_empty(), "{method:?}");
            assert_eq!(results, expected, "{method:?}");
            assert!(results.len() < gift_count, "{method:?}");
        }
    }

    #[test]
    fn chunks_have_no_duplicates() {
        for method in METHODS {
            let opts = target_opts(method);
            let middle = (opts.first_target_advance + opts.last_target_advance) / 2;
            let mut chunked = gen7_search_usum_gifts(Gen7UsumGiftSearchOpts {
                last_target_advance: middle,
                ..opts.clone()
            });
            chunked.extend(gen7_search_usum_gifts(Gen7UsumGiftSearchOpts {
                first_target_advance: middle + 1,
                ..opts.clone()
            }));
            assert_eq!(chunked, gen7_search_usum_gifts(opts), "{method:?}");
        }
    }

    #[test]
    fn filters_results() {
        let mut filter = PkmFilter::new_allow_all();
        filter.gender = Some(Gender::Female);
        filter.min_ivs = Ivs::new(0, 0, 0, 0, 0, 20);

        for method in METHODS {
            let all = gen7_search_usum_gifts(target_opts(method));
            let filtered = gen7_search_usum_gifts(Gen7UsumGiftSearchOpts {
                filter: filter.clone(),
                ..target_opts(method)
            });
            let expected: Vec<Gen7Gift> = all
                .into_iter()
                .filter(|gift| filter.pass_filter(gift))
                .collect();

            assert!(!filtered.is_empty(), "{method:?}");
            assert!(
                filtered
                    .iter()
                    .all(|gift| gift.gender == Gender::Female && gift.ivs.spe >= 20),
                "{method:?}"
            );
            assert_eq!(filtered, expected, "{method:?}");
        }
    }

    #[test]
    fn shiny_filter_uses_the_tsv() {
        for method in METHODS {
            let target = gen7_search_usum_gifts(target_opts(method)).remove(20);
            let mut filter = PkmFilter::new_allow_all();
            filter.shiny = true;

            let results = gen7_search_usum_gifts(Gen7UsumGiftSearchOpts {
                tsv: target.psv,
                filter,
                ..target_opts(method)
            });

            assert!(
                results.iter().all(|gift| gift.psv == target.psv),
                "{method:?}"
            );
            assert!(
                results.iter().any(|gift| gift.pid == target.pid),
                "{method:?}"
            );
        }
    }

    mod starter {
        use super::*;

        #[test]
        fn yes_advances_leave_time_for_kukui_and_yes_no() {
            let opts = Gen7UsumGiftSearchOpts {
                current_advance: 4000,
                ..starter_opts(5000, 6000)
            };
            assert_eq!(
                opts.start_advances::<UsumStarter>(),
                4000 + MIN_ADVANCES_TO_YES..=6000
            );
        }

        #[test]
        fn yes_advances_start_where_they_can_reach_the_first_target() {
            let opts = Gen7UsumGiftSearchOpts {
                current_advance: 0,
                ..starter_opts(10_000, 11_000)
            };
            assert_eq!(opts.start_advances::<UsumStarter>(), 7000..=11_000);
        }

        #[test]
        fn ignores_synchronize() {
            let synced = gen7_search_usum_gifts(Gen7UsumGiftSearchOpts {
                sync_nature: Some(Nature::Timid),
                ..starter_opts(6300, 6400)
            });
            assert_eq!(synced, gen7_search_usum_gifts(starter_opts(6300, 6400)));
        }
    }

    mod fossil {
        use super::*;
        use crate::gen7::fossil_timeline::{
            MAX_ADVANCES_AFTER_DIALOGUE_A, MIN_ADVANCES_AFTER_DIALOGUE_A,
            MIN_ADVANCES_TO_DIALOGUE_A,
        };

        #[test]
        fn dialogue_a_advances_leave_time_for_the_next_advances() {
            assert_eq!(
                fossil_opts(5500, 6000).start_advances::<UsumFossil>(),
                5000 + MIN_ADVANCES_TO_DIALOGUE_A..=6000 - MIN_ADVANCES_AFTER_DIALOGUE_A
            );
        }

        #[test]
        fn dialogue_a_advances_start_where_they_can_reach_the_first_target() {
            let first_dialogue_a = 10_000 - MAX_ADVANCES_AFTER_DIALOGUE_A;
            assert_eq!(
                fossil_opts(10_000, 11_000).start_advances::<UsumFossil>(),
                first_dialogue_a..=11_000 - MIN_ADVANCES_AFTER_DIALOGUE_A
            );
        }

        #[test]
        fn targets_leave_time_for_the_final_screen() {
            let results = gen7_search_usum_gifts(fossil_opts(CURRENT_ADVANCE, 7400));
            let first_target = results.first().unwrap().advance;
            // 490 steps. Steps where both models are mid-blink or in a cooldown
            // use no advances, but this seed averages over one advance a step.
            assert!(first_target >= CURRENT_ADVANCE + 490);
        }

        #[test]
        fn synchronize_sets_every_nature_and_keeps_the_targets() {
            let ordinary = gen7_search_usum_gifts(fossil_opts(7300, 7400));
            let synced = gen7_search_usum_gifts(Gen7UsumGiftSearchOpts {
                sync_nature: Some(Nature::Timid),
                ..fossil_opts(7300, 7400)
            });

            assert!(synced.iter().all(|fossil| fossil.nature == Nature::Timid));
            let key = |fossil: &Gen7Gift| (fossil.advance, fossil.delay_advances, fossil.pid);
            assert_eq!(
                synced.iter().map(key).collect::<Vec<_>>(),
                ordinary.iter().map(key).collect::<Vec<_>>()
            );
        }
    }
}
