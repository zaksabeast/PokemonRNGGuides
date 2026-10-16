use super::starter_timeline::{
    KUKUI_DIALOGUE_MODELS, MAX_ADVANCES_AFTER_YES, MIN_STEPS_FROM_YES_NO_TO_YES,
    STEPS_FROM_KUKUI_A_TO_YES_NO, after_yes_timeline, can_press_a_on_starter,
    skip_to_first_starter_a_press,
};
use super::{Gen7Starter, NpcModel, Timeline, generate_starter};
use crate::{PkmFilter, TsvTrv};
use crate::rng::{Rng, StateIterator, sfmt::Sfmt};
use serde::{Deserialize, Serialize};
use std::collections::BTreeMap;
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
    pub tid: u16,
    pub sid: u16,
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
pub fn gen7_search_usum_starters(opts: Gen7UsumStarterSearchOpts) -> Vec<Gen7Starter> {
    let mut unique_starters = UniqueStarters::new();
    for after_yes in after_yes_timelines_with_idle_npcs(opts.seed, opts.yes_advances()) {
        add_starters_after_yes(after_yes, &opts, &mut unique_starters);
    }
    unique_starters.into_values().collect()
}

/// Different Yes presses often reach the same starter.
type UniqueStarters = BTreeMap<(usize, usize), Gen7Starter>;

fn add_starters_after_yes(
    mut after_yes: Timeline,
    opts: &Gen7UsumStarterSearchOpts,
    unique_starters: &mut UniqueStarters,
) {
    skip_to_first_starter_a_press(&mut after_yes);

    while can_press_a_on_starter(&after_yes, opts.last_target_advance) {
        if let Some(starter) = matching_starter(&after_yes, opts) {
            let key = (starter.advance, starter.delay_advances);
            unique_starters.entry(key).or_insert(starter);
        }
        after_yes.step();
    }
}

fn matching_starter(a_press: &Timeline, opts: &Gen7UsumStarterSearchOpts) -> Option<Gen7Starter> {
    if a_press.advance() < opts.first_target_advance {
        return None;
    }
    let starter = generate_starter(a_press.clone(), TsvTrv::from_tid_sid(opts.tid, opts.sid));
    opts.filter.pass_filter(&starter).then_some(starter)
}

fn after_yes_timelines_with_idle_npcs(
    seed: u32,
    yes_advances: RangeInclusive<usize>,
) -> impl Iterator<Item = Timeline> {
    let mut rng = Sfmt::new(seed);
    rng.advance(*yes_advances.start());
    yes_advances
        .zip(StateIterator::new(rng))
        .map(|(yes_advance, rng)| after_yes_timeline_with_idle_npcs(rng, yes_advance))
}

fn after_yes_timeline_with_idle_npcs(rng: Sfmt, yes_advance: usize) -> Timeline {
    let idle_npcs = NpcModel::new(KUKUI_DIALOGUE_MODELS);
    after_yes_timeline(Timeline::from_npcs(rng, idle_npcs, yes_advance))
}

#[cfg(test)]
mod test {
    use super::*;
    use crate::{Gender, Ivs, ShinyFilter, ShinyType};

    const SEED: u32 = 0x768ba16d;
    const FIRST_YES_ADVANCE: usize = 5000;

    fn opts(first_target_advance: usize, last_target_advance: usize) -> Gen7UsumStarterSearchOpts {
        Gen7UsumStarterSearchOpts {
            seed: SEED,
            tid: 0,
            sid: 0,
            current_advance: FIRST_YES_ADVANCE - MIN_ADVANCES_TO_YES,
            first_target_advance,
            last_target_advance,
            filter: PkmFilter::new_allow_all(),
        }
    }

    /// Every A press from each Yes advance, with duplicates.
    fn every_starter(opts: &Gen7UsumStarterSearchOpts) -> Vec<Gen7Starter> {
        let mut starters = vec![];
        for mut after_yes in after_yes_timelines_with_idle_npcs(opts.seed, opts.yes_advances()) {
            skip_to_first_starter_a_press(&mut after_yes);
            while can_press_a_on_starter(&after_yes, opts.last_target_advance) {
                starters.extend(matching_starter(&after_yes, opts));
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
        let expected: Vec<Gen7Starter> = all
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
    fn shiny_square_start_filter_uses_the_trainer_ids() {
        let target = gen7_search_usum_starters(opts(6300, 6400)).remove(20);
        let tid = 12345;
        let sid = tid ^ ((target.pid >> 16) ^ target.pid) as u16;
        for (trainer_sid, filter, expected_shiny, includes_target) in [
            (sid, ShinyFilter::SquareShiny, ShinyType::SquareShiny, true),
            (sid, ShinyFilter::StarShiny, ShinyType::StarShiny, false),
            (sid ^ 1, ShinyFilter::StarShiny, ShinyType::StarShiny, true),
            (
                sid ^ 1,
                ShinyFilter::SquareShiny,
                ShinyType::SquareShiny,
                false,
            ),
        ] {
            let mut search_opts = opts(6300, 6400);
            search_opts.tid = tid;
            search_opts.sid = trainer_sid;
            search_opts.filter.shiny = filter;
            let results = gen7_search_usum_starters(search_opts);

            assert!(
                results
                    .iter()
                    .all(|starter| starter.shiny == expected_shiny)
            );
            assert_eq!(
                results.iter().any(|starter| starter.pid == target.pid),
                includes_target
            );
        }
    }

    #[test]
    fn shiny_filter_uses_the_trainer_ids() {
        let target = gen7_search_usum_starters(opts(6300, 6400)).remove(20);
        let mut filter = PkmFilter::new_allow_all();
        filter.shiny = ShinyFilter::AnyShiny;

        let results = gen7_search_usum_starters(Gen7UsumStarterSearchOpts {
            tid: 12345,
            sid: 12345 ^ (target.psv << 4),
            filter,
            ..opts(6300, 6400)
        });

        assert!(results.iter().all(|starter| starter.psv == target.psv));
        assert!(results.iter().any(|starter| starter.pid == target.pid));
    }
}
