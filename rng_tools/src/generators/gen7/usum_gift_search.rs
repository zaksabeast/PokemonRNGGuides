use super::fossil_timeline::UsumFossil;
use super::starter_timeline::UsumStarter;
use super::{
    Gen7Gift, GiftSettings, MissedStates, Timeline, TimelineState, UniqueGifts, matching_gift,
};
use crate::{Nature, PkmFilter, TsvTrv};
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
    pub trv: u8,
    pub sync_nature: Option<Nature>,
    pub current_advance: usize,
    pub first_target_advance: usize,
    pub last_target_advance: usize,
    pub filter: PkmFilter,
}

pub(super) trait UsumGift {
    const MODELS: usize;
    const MIN_START_ADVANCE: usize = 0;
    const MIN_ADVANCES_TO_START: usize;
    const MIN_ADVANCES_AFTER_START: usize;
    const MAX_ADVANCES_AFTER_START: usize;

    fn after_start_timeline(start: Timeline) -> Timeline;
    fn skip_to_first_a_press(after_start: &mut Timeline);
    fn can_press_a(after_start: &Timeline, last_advance: usize) -> bool;
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

        let last_useful_start = self
            .last_target_advance
            .saturating_sub(Gift::MIN_ADVANCES_AFTER_START);

        first_start..=last_useful_start
    }

    fn can_press_a_before_first_target<Gift: UsumGift>(&self, a_press: &Timeline) -> bool {
        let can_press_a = Gift::can_press_a(a_press, self.last_target_advance);

        can_press_a && a_press.advance() < self.first_target_advance
    }
}

/// Assumes idle NPCs at the start press. The plans check what's reachable.
#[wasm_bindgen]
pub fn gen7_search_usum_gifts(opts: Gen7UsumGiftSearchOpts) -> Vec<Gen7Gift> {
    match opts.method {
        Gen7UsumGiftMethod::Starter => search_gifts::<UsumStarter>(&opts),
        Gen7UsumGiftMethod::Fossil => search_gifts::<UsumFossil>(&opts),
    }
}

fn search_gifts<Gift: UsumGift>(opts: &Gen7UsumGiftSearchOpts) -> Vec<Gen7Gift> {
    let mut unique_gifts = UniqueGifts::default();
    let mut seen_a_presses = SeenAPresses::default();
    for after_start in after_start_timelines_with_idle_npcs::<Gift>(opts) {
        let gifts = gifts_after_start::<Gift>(after_start, opts, &mut seen_a_presses);
        unique_gifts.extend(gifts);
    }

    unique_gifts.into()
}

#[derive(Default)]
struct SeenAPresses(HashMap<TimelineState, u32>);

impl SeenAPresses {
    /// False when a merged timeline with as much time left already got here.
    fn insert(&mut self, a_press: &Timeline) -> bool {
        let Some(state) = MissedStates::sample(a_press) else {
            return true;
        };

        let steps = a_press.steps_since_start();
        if self.0.get(&state).is_some_and(|&seen| seen <= steps) {
            return false;
        }

        self.0.insert(state, steps);

        true
    }
}

fn gifts_after_start<Gift: UsumGift>(
    mut after_start: Timeline,
    opts: &Gen7UsumGiftSearchOpts,
    seen_a_presses: &mut SeenAPresses,
) -> Vec<Gen7Gift> {
    Gift::skip_to_first_a_press(&mut after_start);
    while opts.can_press_a_before_first_target::<Gift>(&after_start) {
        Gift::step_to_next_a_press(&mut after_start);
    }

    let mut gifts = vec![];
    while Gift::can_press_a(&after_start, opts.last_target_advance) {
        if !seen_a_presses.insert(&after_start) {
            break;
        }

        gifts.extend(matching_gift_after_start::<Gift>(&after_start, opts));
        Gift::step_to_next_a_press(&mut after_start);
    }

    gifts
}

fn matching_gift_after_start<Gift: UsumGift>(
    a_press: &Timeline,
    opts: &Gen7UsumGiftSearchOpts,
) -> Option<Gen7Gift> {
    let settings = Gift::settings(opts.sync_nature);

    matching_gift(
        a_press,
        TsvTrv::from_tsv_trv_gen6_plus(opts.tsv, opts.trv),
        &opts.filter,
        &settings,
    )
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
    use crate::{Gender, Ivs, ShinyFilter};

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
            trv: 0,
            sync_nature: None,
            current_advance: CURRENT_ADVANCE,
            first_target_advance,
            last_target_advance,
            filter: PkmFilter::new_allow_all(),
        }
    }

    fn starter_opts(first: usize, last: usize) -> Gen7UsumGiftSearchOpts {
        Gen7UsumGiftSearchOpts {
            current_advance: CURRENT_ADVANCE - MIN_ADVANCES_TO_YES,
            ..opts(Gen7UsumGiftMethod::Starter, first, last)
        }
    }

    fn fossil_opts(first: usize, last: usize) -> Gen7UsumGiftSearchOpts {
        opts(Gen7UsumGiftMethod::Fossil, first, last)
    }

    fn target_opts(method: Gen7UsumGiftMethod) -> Gen7UsumGiftSearchOpts {
        match method {
            Gen7UsumGiftMethod::Starter => starter_opts(6300, 6400),
            Gen7UsumGiftMethod::Fossil => fossil_opts(7300, 7400),
        }
    }

    fn every_gift<Gift: UsumGift>(opts: &Gen7UsumGiftSearchOpts) -> Vec<Gen7Gift> {
        after_start_timelines_with_idle_npcs::<Gift>(opts)
            .flat_map(|after_start| every_gift_after_start::<Gift>(after_start, opts))
            .collect()
    }

    fn every_gift_after_start<Gift: UsumGift>(
        mut after_start: Timeline,
        opts: &Gen7UsumGiftSearchOpts,
    ) -> Vec<Gen7Gift> {
        Gift::skip_to_first_a_press(&mut after_start);

        let mut gifts = vec![];
        while Gift::can_press_a(&after_start, opts.last_target_advance) {
            let gift = matching_gift_after_start::<Gift>(&after_start, opts);
            gifts.extend(gift.filter(|gift| gift.advance >= opts.first_target_advance));
            Gift::step_to_next_a_press(&mut after_start);
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
    fn shiny_filter_uses_tsv() {
        for method in METHODS {
            let target = gen7_search_usum_gifts(target_opts(method)).remove(20);
            let mut filter = PkmFilter::new_allow_all();
            filter.shiny = ShinyFilter::AnyShiny;

            let results = gen7_search_usum_gifts(Gen7UsumGiftSearchOpts {
                tsv: target.psv,
                trv: 0,
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

            assert_eq!(opts.start_advances::<UsumStarter>(), 4716..=6000);
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

        #[test]
        fn dialogue_a_advances_leave_time_for_the_next_advances() {
            assert_eq!(
                fossil_opts(5500, 6000).start_advances::<UsumFossil>(),
                5003..=5973
            );
        }

        #[test]
        fn dialogue_a_advances_start_where_they_can_reach_the_first_target() {
            assert_eq!(
                fossil_opts(10_000, 11_000).start_advances::<UsumFossil>(),
                6399..=10_973
            );
        }

        #[test]
        fn targets_leave_time_for_the_final_screen() {
            let results = gen7_search_usum_gifts(fossil_opts(CURRENT_ADVANCE, 7400));
            let first_target = results.first().unwrap().advance;

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
