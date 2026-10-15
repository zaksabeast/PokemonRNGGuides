use super::fossil_timeline::{
    FOSSIL_DIALOGUE_MODELS, FOSSIL_GIFT, MAX_ADVANCES_AFTER_DIALOGUE_A,
    MIN_ADVANCES_AFTER_DIALOGUE_A, after_dialogue_a_timeline, can_press_a_on_fossil,
    skip_to_first_fossil_a_press,
};
use super::{Gen7Gift, MergeKey, MissedStates, Timeline, UniqueGifts, matching_gift};
use crate::{Nature, PkmFilter};
use serde::{Deserialize, Serialize};
use std::collections::HashMap;
use std::ops::RangeInclusive;
use tsify::Tsify;
use wasm_bindgen::prelude::*;

/// Safe advances are at or after the current advance, and the models start
/// idle there, so each uses an advance on the first next advance step. Blinks
/// can skip the rest, but the A press on the dialogue still waits for a new
/// advance after the next advances.
const MIN_ADVANCES_TO_DIALOGUE_A: usize = FOSSIL_DIALOGUE_MODELS + 1;

#[derive(Debug, Clone, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct Gen7UsumFossilSearchOpts {
    pub seed: u32,
    pub tsv: u16,
    /// The nature of a lead with Synchronize.
    pub sync_nature: Option<Nature>,
    pub current_advance: usize,
    pub first_target_advance: usize,
    pub last_target_advance: usize,
    pub filter: PkmFilter,
}

impl Gen7UsumFossilSearchOpts {
    fn dialogue_a_advances(&self) -> RangeInclusive<usize> {
        let first_useful_dialogue_a = self
            .first_target_advance
            .saturating_sub(MAX_ADVANCES_AFTER_DIALOGUE_A);
        let first_reachable_dialogue_a = self
            .current_advance
            .saturating_add(MIN_ADVANCES_TO_DIALOGUE_A);
        let first_dialogue_a = first_reachable_dialogue_a.max(first_useful_dialogue_a);
        // Later A presses on the dialogue can't reach a target in range.
        let last_useful_dialogue_a = self
            .last_target_advance
            .saturating_sub(MIN_ADVANCES_AFTER_DIALOGUE_A);
        first_dialogue_a..=last_useful_dialogue_a
    }
}

/// The NPC states at the A press on the dialogue aren't known yet, so this
/// assumes they're idle. `gen7_usum_fossil_plan` checks if the user's
/// timeline can reach a result.
#[wasm_bindgen]
pub fn gen7_search_usum_fossils(opts: Gen7UsumFossilSearchOpts) -> Vec<Gen7Gift> {
    let mut unique_fossils = UniqueGifts::default();
    let mut seen_a_presses = SeenAPresses::new();
    for after_dialogue_a in after_dialogue_a_timelines_with_idle_npcs(&opts) {
        add_fossils_after_dialogue_a(
            after_dialogue_a,
            &opts,
            &mut seen_a_presses,
            &mut unique_fossils,
        );
    }
    unique_fossils.into()
}

/// Sampled A presses and their steps since the dialogue A press. Same advance
/// and NPC state means the same future, so a timeline that merges with one
/// that had as much time left doesn't generate its fossils again.
type SeenAPresses = HashMap<MergeKey, u32>;

fn add_fossils_after_dialogue_a(
    mut after_dialogue_a: Timeline,
    opts: &Gen7UsumFossilSearchOpts,
    seen_a_presses: &mut SeenAPresses,
    unique_fossils: &mut UniqueGifts,
) {
    skip_to_first_fossil_a_press(&mut after_dialogue_a);
    // Skipped before `seen_a_presses` so it only holds possible targets.
    while after_dialogue_a.advance() < opts.first_target_advance
        && can_press_a_on_fossil(&after_dialogue_a, opts.last_target_advance)
    {
        after_dialogue_a.step_to_next_advance();
    }

    while can_press_a_on_fossil(&after_dialogue_a, opts.last_target_advance) {
        if let Some(a_press) = MissedStates::sample(&after_dialogue_a) {
            let steps = after_dialogue_a.steps_since_start();
            // The earlier timeline already generated everything from here.
            if seen_a_presses
                .get(&a_press)
                .is_some_and(|&seen_steps| seen_steps <= steps)
            {
                return;
            }
            seen_a_presses.insert(a_press, steps);
        }
        if let Some(fossil) = matching_fossil(&after_dialogue_a, opts) {
            unique_fossils.insert(fossil);
        }
        after_dialogue_a.step_to_next_advance();
    }
}

fn matching_fossil(a_press: &Timeline, opts: &Gen7UsumFossilSearchOpts) -> Option<Gen7Gift> {
    let settings = FOSSIL_GIFT.with_sync_nature(opts.sync_nature);
    matching_gift(a_press, opts.tsv, &opts.filter, &settings)
}

fn after_dialogue_a_timelines_with_idle_npcs(
    opts: &Gen7UsumFossilSearchOpts,
) -> impl Iterator<Item = Timeline> {
    Timeline::range_with_idle_npcs(
        opts.seed,
        FOSSIL_DIALOGUE_MODELS,
        opts.dialogue_a_advances(),
    )
    .map(after_dialogue_a_timeline)
}

#[cfg(test)]
mod test {
    use super::*;
    use crate::{Gender, Ivs};

    const SEED: u32 = 0x768ba16d;
    const CURRENT_ADVANCE: usize = 5000;

    fn opts(first_target_advance: usize, last_target_advance: usize) -> Gen7UsumFossilSearchOpts {
        Gen7UsumFossilSearchOpts {
            seed: SEED,
            tsv: 0,
            sync_nature: None,
            current_advance: CURRENT_ADVANCE,
            first_target_advance,
            last_target_advance,
            filter: PkmFilter::new_allow_all(),
        }
    }

    /// Every A press from each A press on the dialogue, with duplicates.
    fn every_fossil(opts: &Gen7UsumFossilSearchOpts) -> Vec<Gen7Gift> {
        let mut fossils = vec![];
        for mut after_dialogue_a in after_dialogue_a_timelines_with_idle_npcs(opts) {
            skip_to_first_fossil_a_press(&mut after_dialogue_a);
            while can_press_a_on_fossil(&after_dialogue_a, opts.last_target_advance) {
                if after_dialogue_a.advance() >= opts.first_target_advance {
                    fossils.extend(matching_fossil(&after_dialogue_a, opts));
                }
                after_dialogue_a.step_to_next_advance();
            }
        }
        fossils
    }

    #[test]
    fn lists_each_target_once() {
        let opts = opts(7300, 7400);
        let fossils = every_fossil(&opts);
        let fossil_count = fossils.len();
        let mut expected = fossils;
        expected.sort_by_key(|fossil| (fossil.advance, fossil.delay_advances));
        expected.dedup();

        let results = gen7_search_usum_fossils(opts);
        assert!(!results.is_empty());
        assert_eq!(results, expected);
        assert!(results.len() < fossil_count);
    }

    #[test]
    fn chunks_have_no_duplicates() {
        let mut chunked = gen7_search_usum_fossils(opts(7300, 7349));
        chunked.extend(gen7_search_usum_fossils(opts(7350, 7400)));
        assert_eq!(chunked, gen7_search_usum_fossils(opts(7300, 7400)));
    }

    #[test]
    fn dialogue_a_advances_leave_time_for_the_next_advances() {
        assert_eq!(
            opts(5500, 6000).dialogue_a_advances(),
            5000 + MIN_ADVANCES_TO_DIALOGUE_A..=6000 - MIN_ADVANCES_AFTER_DIALOGUE_A
        );
    }

    #[test]
    fn dialogue_a_advances_start_where_they_can_reach_the_first_target() {
        let first_dialogue_a = 10_000 - MAX_ADVANCES_AFTER_DIALOGUE_A;
        assert_eq!(
            opts(10_000, 11_000).dialogue_a_advances(),
            first_dialogue_a..=11_000 - MIN_ADVANCES_AFTER_DIALOGUE_A
        );
    }

    #[test]
    fn targets_leave_time_for_the_final_screen() {
        let results = gen7_search_usum_fossils(opts(CURRENT_ADVANCE, 7400));
        let first_target = results.first().unwrap().advance;
        // 490 steps. Steps where both models are mid-blink or in a cooldown
        // use no advances, but this seed averages over one advance a step.
        assert!(first_target >= CURRENT_ADVANCE + 490);
    }

    #[test]
    fn filters_results() {
        let all = gen7_search_usum_fossils(opts(7300, 7400));
        let mut filter = PkmFilter::new_allow_all();
        filter.gender = Some(Gender::Female);
        filter.min_ivs = Ivs::new(0, 0, 0, 0, 0, 20);

        let filtered = gen7_search_usum_fossils(Gen7UsumFossilSearchOpts {
            filter: filter.clone(),
            ..opts(7300, 7400)
        });
        let expected: Vec<Gen7Gift> = all
            .into_iter()
            .filter(|fossil| filter.pass_filter(fossil))
            .collect();

        assert!(!filtered.is_empty());
        assert_eq!(filtered, expected);
    }

    #[test]
    fn shiny_filter_uses_the_tsv() {
        let target = gen7_search_usum_fossils(opts(7300, 7400)).remove(20);
        let mut filter = PkmFilter::new_allow_all();
        filter.shiny = true;

        let results = gen7_search_usum_fossils(Gen7UsumFossilSearchOpts {
            tsv: target.psv,
            filter,
            ..opts(7300, 7400)
        });

        assert!(results.iter().all(|fossil| fossil.psv == target.psv));
        assert!(results.iter().any(|fossil| fossil.pid == target.pid));
    }

    #[test]
    fn synchronize_sets_every_nature_and_keeps_the_targets() {
        let ordinary = gen7_search_usum_fossils(opts(7300, 7400));
        let synced = gen7_search_usum_fossils(Gen7UsumFossilSearchOpts {
            sync_nature: Some(Nature::Timid),
            ..opts(7300, 7400)
        });

        assert!(synced.iter().all(|fossil| fossil.nature == Nature::Timid));
        let key = |fossil: &Gen7Gift| (fossil.advance, fossil.delay_advances, fossil.pid);
        assert_eq!(
            synced.iter().map(key).collect::<Vec<_>>(),
            ordinary.iter().map(key).collect::<Vec<_>>()
        );
    }
}
