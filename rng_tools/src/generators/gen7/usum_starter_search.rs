use super::starter_timeline::{
    KUKUI_DIALOGUE_MODELS, MAX_ADVANCES_AFTER_YES, MIN_STEPS_FROM_YES_NO_TO_YES, STARTER_GIFT,
    STEPS_FROM_KUKUI_A_TO_YES_NO, after_yes_timeline, can_press_a_on_starter,
    skip_to_first_starter_a_press,
};
use super::{Gen7Gift, Timeline, UniqueGifts, matching_gift};
use crate::PkmFilter;
use serde::{Deserialize, Serialize};
use std::ops::RangeInclusive;
use tsify::Tsify;
use wasm_bindgen::prelude::*;

const USUM_MIN_ADVANCE: usize = 478;
const MIN_ADVANCES_TO_YES: usize = KUKUI_DIALOGUE_MODELS * STEPS_FROM_KUKUI_A_TO_YES_NO as usize
    + MIN_STEPS_FROM_YES_NO_TO_YES as usize;

#[derive(Debug, Clone, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct Gen7UsumStarterSearchOpts {
    pub seed: u32,
    pub tsv: u16,
    pub current_advance: usize,
    pub first_target_advance: usize,
    pub last_target_advance: usize,
    pub filter: PkmFilter,
}

impl Gen7UsumStarterSearchOpts {
    fn yes_advances(&self) -> RangeInclusive<usize> {
        let first_reachable_yes = self.current_advance.saturating_add(MIN_ADVANCES_TO_YES);
        let first_useful_yes = self
            .first_target_advance
            .saturating_sub(MAX_ADVANCES_AFTER_YES);
        let first_yes = first_reachable_yes
            .max(first_useful_yes)
            .max(USUM_MIN_ADVANCE);
        first_yes..=self.last_target_advance
    }
}

/// The NPC states at Yes aren't known yet, so this assumes they're idle.
/// `gen7_usum_starter_plan` checks if the user's timeline can reach a result.
#[wasm_bindgen]
pub fn gen7_search_usum_starters(opts: Gen7UsumStarterSearchOpts) -> Vec<Gen7Gift> {
    let mut unique_starters = UniqueGifts::default();
    for after_yes in after_yes_timelines_with_idle_npcs(&opts) {
        add_starters_after_yes(after_yes, &opts, &mut unique_starters);
    }
    unique_starters.into()
}

fn add_starters_after_yes(
    mut after_yes: Timeline,
    opts: &Gen7UsumStarterSearchOpts,
    unique_starters: &mut UniqueGifts,
) {
    skip_to_first_starter_a_press(&mut after_yes);
    while after_yes.advance() < opts.first_target_advance
        && can_press_a_on_starter(&after_yes, opts.last_target_advance)
    {
        after_yes.step();
    }

    while can_press_a_on_starter(&after_yes, opts.last_target_advance) {
        if let Some(starter) = matching_starter(&after_yes, opts) {
            unique_starters.insert(starter);
        }
        after_yes.step();
    }
}

fn matching_starter(a_press: &Timeline, opts: &Gen7UsumStarterSearchOpts) -> Option<Gen7Gift> {
    matching_gift(a_press, opts.tsv, &opts.filter, &STARTER_GIFT)
}

fn after_yes_timelines_with_idle_npcs(
    opts: &Gen7UsumStarterSearchOpts,
) -> impl Iterator<Item = Timeline> {
    Timeline::range_with_idle_npcs(opts.seed, KUKUI_DIALOGUE_MODELS, opts.yes_advances())
        .map(after_yes_timeline)
}

#[cfg(test)]
mod test {
    use super::*;
    use crate::{Gender, Ivs};

    const SEED: u32 = 0x768ba16d;
    const FIRST_YES_ADVANCE: usize = 5000;

    fn opts(first_target_advance: usize, last_target_advance: usize) -> Gen7UsumStarterSearchOpts {
        Gen7UsumStarterSearchOpts {
            seed: SEED,
            tsv: 0,
            current_advance: FIRST_YES_ADVANCE - MIN_ADVANCES_TO_YES,
            first_target_advance,
            last_target_advance,
            filter: PkmFilter::new_allow_all(),
        }
    }

    /// Every A press from each Yes advance, with duplicates.
    fn every_starter(opts: &Gen7UsumStarterSearchOpts) -> Vec<Gen7Gift> {
        let mut starters = vec![];
        for mut after_yes in after_yes_timelines_with_idle_npcs(opts) {
            skip_to_first_starter_a_press(&mut after_yes);
            while can_press_a_on_starter(&after_yes, opts.last_target_advance) {
                if after_yes.advance() >= opts.first_target_advance {
                    starters.extend(matching_starter(&after_yes, opts));
                }
                after_yes.step();
            }
        }
        starters
    }

    #[test]
    fn lists_each_target_once() {
        let opts = opts(6300, 6400);
        let starters = every_starter(&opts);
        let starter_count = starters.len();
        let mut expected = starters;
        expected.sort_by_key(|starter| (starter.advance, starter.delay_advances));
        expected.dedup();

        let results = gen7_search_usum_starters(opts);
        assert!(!results.is_empty());
        assert_eq!(results, expected);
        assert!(results.len() < starter_count);
    }

    #[test]
    fn chunks_have_no_duplicates() {
        let mut chunked = gen7_search_usum_starters(opts(6300, 6349));
        chunked.extend(gen7_search_usum_starters(opts(6350, 6400)));
        assert_eq!(chunked, gen7_search_usum_starters(opts(6300, 6400)));
    }

    #[test]
    fn yes_advances_leave_time_for_kukui_and_yes_no() {
        let opts = Gen7UsumStarterSearchOpts {
            current_advance: 4000,
            ..opts(5000, 6000)
        };
        assert_eq!(opts.yes_advances(), 4000 + MIN_ADVANCES_TO_YES..=6000);
    }

    #[test]
    fn yes_advances_start_where_they_can_reach_the_first_target() {
        let opts = Gen7UsumStarterSearchOpts {
            current_advance: 0,
            ..opts(10_000, 11_000)
        };
        assert_eq!(opts.yes_advances(), 7000..=11_000);
    }

    #[test]
    fn filters_results() {
        let all = gen7_search_usum_starters(opts(6300, 6400));
        let mut filter = PkmFilter::new_allow_all();
        filter.gender = Some(Gender::Female);
        filter.min_ivs = Ivs::new(0, 0, 0, 0, 0, 20);

        let filtered = gen7_search_usum_starters(Gen7UsumStarterSearchOpts {
            filter: filter.clone(),
            ..opts(6300, 6400)
        });
        let expected: Vec<Gen7Gift> = all
            .into_iter()
            .filter(|starter| filter.pass_filter(starter))
            .collect();

        assert!(!filtered.is_empty());
        assert!(
            filtered
                .iter()
                .all(|starter| starter.gender == Gender::Female && starter.ivs.spe >= 20)
        );
        assert_eq!(filtered, expected);
    }

    #[test]
    fn shiny_filter_uses_the_tsv() {
        let target = gen7_search_usum_starters(opts(6300, 6400)).remove(20);
        let mut filter = PkmFilter::new_allow_all();
        filter.shiny = true;

        let results = gen7_search_usum_starters(Gen7UsumStarterSearchOpts {
            tsv: target.psv,
            filter,
            ..opts(6300, 6400)
        });

        assert!(results.iter().all(|starter| starter.psv == target.psv));
        assert!(results.iter().any(|starter| starter.pid == target.pid));
    }
}
