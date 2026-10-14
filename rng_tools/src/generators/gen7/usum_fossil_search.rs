use super::fossil_timeline::{
    FOSSIL_DIALOGUE_MODELS, MAX_ADVANCES_AFTER_DIALOGUE_A, after_dialogue_a_timeline,
    can_press_a_on_fossil, fossil_gift, skip_to_first_fossil_a_press, step_to_next_advance,
};
use super::{Gen7Gift, NpcModel, Timeline, generate_gift};
use crate::rng::{Rng, StateIterator, sfmt::Sfmt};
use crate::{Nature, PkmFilter};
use serde::{Deserialize, Serialize};
use std::collections::{BTreeMap, HashSet};
use std::ops::RangeInclusive;
use tsify::Tsify;
use wasm_bindgen::prelude::*;

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
        let first_dialogue_a = self.current_advance.max(first_useful_dialogue_a);
        first_dialogue_a..=self.last_target_advance
    }
}

/// The NPC states at the A press on the dialogue aren't known yet, so this
/// assumes they're idle. `gen7_usum_fossil_plan` checks if the user's
/// timeline can reach a result.
#[wasm_bindgen]
pub fn gen7_search_usum_fossils(opts: Gen7UsumFossilSearchOpts) -> Vec<Gen7Gift> {
    let mut unique_fossils = UniqueFossils::new();
    let mut seen_a_presses = SeenAPresses::new();
    let dialogue_a_advances = opts.dialogue_a_advances();
    for after_dialogue_a in
        after_dialogue_a_timelines_with_idle_npcs(opts.seed, dialogue_a_advances)
    {
        add_fossils_after_dialogue_a(
            after_dialogue_a,
            &opts,
            &mut seen_a_presses,
            &mut unique_fossils,
        );
    }
    unique_fossils.into_values().collect()
}

/// Different A presses on the dialogue often reach the same fossil.
type UniqueFossils = BTreeMap<(usize, usize), Gen7Gift>;

/// Same advance and NPC state means the same fossil, so timelines that have
/// merged with an earlier one don't generate it again.
type SeenAPresses = HashSet<(usize, NpcModel)>;

fn add_fossils_after_dialogue_a(
    mut after_dialogue_a: Timeline,
    opts: &Gen7UsumFossilSearchOpts,
    seen_a_presses: &mut SeenAPresses,
    unique_fossils: &mut UniqueFossils,
) {
    skip_to_first_fossil_a_press(&mut after_dialogue_a);

    while can_press_a_on_fossil(&after_dialogue_a, opts.last_target_advance) {
        let is_new_a_press = after_dialogue_a.advance() >= opts.first_target_advance
            && seen_a_presses.insert((after_dialogue_a.advance(), after_dialogue_a.npcs().clone()));
        if is_new_a_press && let Some(fossil) = matching_fossil(&after_dialogue_a, opts) {
            let key = (fossil.advance, fossil.delay_advances);
            unique_fossils.entry(key).or_insert(fossil);
        }
        step_to_next_advance(&mut after_dialogue_a);
    }
}

fn matching_fossil(a_press: &Timeline, opts: &Gen7UsumFossilSearchOpts) -> Option<Gen7Gift> {
    if a_press.advance() < opts.first_target_advance {
        return None;
    }
    let settings = fossil_gift(opts.sync_nature);
    let fossil = generate_gift(a_press.clone(), opts.tsv, &settings);
    opts.filter.pass_filter(&fossil).then_some(fossil)
}

fn after_dialogue_a_timelines_with_idle_npcs(
    seed: u32,
    dialogue_a_advances: RangeInclusive<usize>,
) -> impl Iterator<Item = Timeline> {
    let mut rng = Sfmt::new(seed);
    rng.advance(*dialogue_a_advances.start());
    dialogue_a_advances
        .zip(StateIterator::new(rng))
        .map(|(dialogue_a_advance, rng)| {
            let idle_npcs = NpcModel::new(FOSSIL_DIALOGUE_MODELS);
            after_dialogue_a_timeline(Timeline::from_npcs(rng, idle_npcs, dialogue_a_advance))
        })
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
        let dialogue_a_advances = opts.dialogue_a_advances();
        for mut after_dialogue_a in
            after_dialogue_a_timelines_with_idle_npcs(opts.seed, dialogue_a_advances)
        {
            skip_to_first_fossil_a_press(&mut after_dialogue_a);
            while can_press_a_on_fossil(&after_dialogue_a, opts.last_target_advance) {
                fossils.extend(matching_fossil(&after_dialogue_a, opts));
                step_to_next_advance(&mut after_dialogue_a);
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
    fn dialogue_a_advances_start_at_the_current_advance() {
        assert_eq!(opts(5500, 6000).dialogue_a_advances(), 5000..=6000);
    }

    #[test]
    fn dialogue_a_advances_start_where_they_can_reach_the_first_target() {
        let first_dialogue_a = 10_000 - MAX_ADVANCES_AFTER_DIALOGUE_A;
        assert_eq!(
            opts(10_000, 11_000).dialogue_a_advances(),
            first_dialogue_a..=11_000
        );
    }

    #[test]
    fn targets_leave_time_for_the_final_screen() {
        let results = gen7_search_usum_fossils(opts(CURRENT_ADVANCE, 7400));
        let first_target = results.first().unwrap().advance;
        // 450 steps of at least one advance each.
        assert!(first_target >= CURRENT_ADVANCE + 450);
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
