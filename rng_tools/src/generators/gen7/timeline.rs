use super::NpcModel;
use crate::rng::{GetRand, Rng, StateIterator, sfmt::Sfmt};
use serde::{Deserialize, Serialize};
use std::collections::HashSet;
use std::ops::RangeInclusive;
use tsify::Tsify;

pub(super) const NEXT_ADVANCE_COUNT: usize = 5;
pub(super) const LAST_NEXT_ADVANCE_STEP: u32 = NEXT_ADVANCE_COUNT as u32;
/// The first step the user can press A on after checking the next advances.
pub(super) const FIRST_PRESS_STEP: u32 = LAST_NEXT_ADVANCE_STEP + 1;
/// 10 seconds of steps (2/60 s each) after the last next advance, so the
/// leap comes soon after the user checks the timeline.
const MAX_LEAP_STEPS: usize = 300;

pub(super) type TimelineState = (usize, NpcModel);

#[derive(Clone)]
pub struct Timeline<R = Sfmt> {
    rng: R,
    npcs: NpcModel,
    advance: usize,
    steps_since_start: u32,
    npc_frozen_steps: &'static [RangeInclusive<u32>],
}

impl Timeline {
    pub fn new(seed: u32, model_count: usize, safe_advance: usize) -> Self {
        let mut rng = Sfmt::new(seed);
        rng.advance(safe_advance);
        Self::from_npcs(rng, NpcModel::new(model_count), safe_advance)
    }

    pub(super) fn range_with_idle_npcs(
        seed: u32,
        model_count: usize,
        advances: RangeInclusive<usize>,
    ) -> impl Iterator<Item = Self> {
        let mut rng = Sfmt::new(seed);
        rng.advance(*advances.start());
        advances
            .zip(StateIterator::new(rng))
            .map(move |(advance, rng)| Self::from_npcs(rng, NpcModel::new(model_count), advance))
    }
}

impl<R: Rng + GetRand<u64>> Timeline<R> {
    /// `rng` must be at `safe_advance`.
    pub(super) fn from_npcs(rng: R, npcs: NpcModel, safe_advance: usize) -> Self {
        Self {
            rng,
            npcs,
            advance: safe_advance,
            steps_since_start: 0,
            npc_frozen_steps: &[],
        }
    }

    /// Makes the current advance the start of a new scene.
    pub(super) fn start_next_scene(self, npc_frozen_steps: &'static [RangeInclusive<u32>]) -> Self {
        Self {
            npc_frozen_steps,
            ..Self::from_npcs(self.rng, self.npcs, self.advance)
        }
    }

    pub(super) fn step(&mut self) {
        self.steps_since_start += 1;
        self.advance += self.step_models();
    }

    /// Returns how many RNG advances the step used.
    fn step_models(&mut self) -> usize {
        if self.are_npcs_frozen() {
            return self.npcs.step_player_only(&mut self.rng);
        }
        self.npcs.step(&mut self.rng)
    }

    fn are_npcs_frozen(&self) -> bool {
        self.npc_frozen_steps
            .iter()
            .any(|steps| steps.contains(&self.steps_since_start))
    }

    pub(super) fn skip_steps(&mut self, count: u32) {
        for _ in 0..count {
            self.step();
        }
    }

    pub(super) fn step_until_advance_changes(&mut self) {
        let advance = self.advance;
        while self.advance == advance {
            self.step();
        }
    }

    pub(super) fn can_press_a(&self, max_steps: u32, last_advance: usize) -> bool {
        self.steps_since_start <= max_steps && self.advance <= last_advance
    }

    pub(super) fn advance(&self) -> usize {
        self.advance
    }

    pub(super) fn steps_since_start(&self) -> u32 {
        self.steps_since_start
    }

    pub(super) fn into_rng(self) -> R {
        self.rng
    }

    pub(super) fn npcs(&self) -> &NpcModel {
        &self.npcs
    }

    pub(super) fn current(&self) -> TimelineStep {
        TimelineStep {
            advance: self.advance,
            steps_since_start: self.steps_since_start,
        }
    }

    pub(super) fn next_advances(&self) -> Vec<usize>
    where
        R: Clone,
    {
        self.clone()
            .skip(1)
            .take(NEXT_ADVANCE_COUNT)
            .map(|step| step.advance)
            .collect()
    }

    /// Pressing A to advance dialogue uses one RNG advance while the NPCs
    /// are frozen, which moves the player onto a different timeline.
    /// Matches 3DSRNGTool's dialogue Timeline Leap.
    pub(super) fn leap_dialogue(&mut self) {
        self.step();
        self.step();
        self.rng.rand::<u64>();
        self.advance += 1;
        self.step();
    }

    fn has_step_dependent_freezes(&self) -> bool {
        let next_step = self.steps_since_start + 1;
        self.npc_frozen_steps.iter().any(|steps| {
            let has_ended = *steps.end() < next_step;
            let is_permanent = *steps.start() <= next_step && *steps.end() == u32::MAX;
            !has_ended && !is_permanent
        })
    }

    /// Same advance and NPC state means the same future.
    fn has_merged_with(&self, other: &Self) -> bool {
        debug_assert!(!self.has_step_dependent_freezes());
        debug_assert!(!other.has_step_dependent_freezes());
        self.advance == other.advance && self.npcs == other.npcs
    }

    pub(super) fn state(&self) -> TimelineState {
        debug_assert!(!self.has_step_dependent_freezes());
        (self.advance, self.npcs.clone())
    }
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub struct TimelineStep {
    pub advance: usize,
    pub steps_since_start: u32,
}

impl<R: Rng + GetRand<u64>> Iterator for Timeline<R> {
    type Item = TimelineStep;

    fn next(&mut self) -> Option<Self::Item> {
        let current = self.current();
        self.step();
        Some(current)
    }
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct Gen7Press {
    pub advance: usize,
    /// Steps since the previous press, or since the last next advance for the first press.
    pub wait_steps: u32,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct Gen7TimelineLeap {
    /// The advance to press A on the dialogue at.
    pub leap_advance: usize,
    pub steps_to_leap: u32,
    pub steps_from_leap_to_target: u32,
}

#[derive(Debug, Clone, PartialEq, Eq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct Gen7TargetTimeline {
    pub next_advances: Vec<usize>,
    /// `None` when the timeline skips the target or the target is before the safe advance.
    pub steps_to_target: Option<u32>,
    /// The user always starts the dialogue. When the target is on the
    /// timeline, this leap rejoins the timeline before the target.
    pub leap: Option<Gen7TimelineLeap>,
}

/// States from branches that missed. Merged timelines visit the same
/// advances, so only recording every so often still catches merges.
#[derive(Default)]
pub(super) struct MissedStates(HashSet<TimelineState>);

impl MissedStates {
    const SAMPLE_EVERY: usize = 64;

    /// The state to record for `timeline`, or `None` if it isn't sampled.
    pub(super) fn sample<R: Rng + GetRand<u64>>(timeline: &Timeline<R>) -> Option<TimelineState> {
        timeline
            .advance
            .is_multiple_of(Self::SAMPLE_EVERY)
            .then(|| timeline.state())
    }

    pub(super) fn contains(&self, state: &TimelineState) -> bool {
        self.0.contains(state)
    }

    pub(super) fn record(&mut self, states: impl IntoIterator<Item = TimelineState>) {
        self.0.extend(states);
    }
}

/// The steps from the safe advance when `branch` hits `target`, or `None`
/// if it misses.
///
/// When `base` skips the target, the branch hits by landing on it, and
/// merging with `base` means it skips it too. When `base` hits the target,
/// the branch only hits by merging with `base` by the target, so the user
/// stays on the timeline they checked.
///
/// Merging with an earlier branch that missed also misses, so the walk can
/// stop early.
fn branch_steps_to_target(
    mut branch: Timeline,
    mut base: Timeline,
    base_hits: bool,
    target: usize,
    missed: &mut MissedStates,
) -> Option<u32> {
    let mut visited = vec![];
    let mut merged = false;

    while branch.advance <= target {
        while base.advance < branch.advance {
            base.step();
        }
        if branch.has_merged_with(&base) {
            merged = true;
            break;
        }
        if branch.advance == target {
            break;
        }
        if let Some(key) = MissedStates::sample(&branch) {
            if missed.contains(&key) {
                break;
            }
            visited.push(key);
        }
        branch.step();
    }

    if merged && base_hits {
        let hit = branch.find(|step| step.advance >= target);
        return hit.map(|step| step.steps_since_start);
    }
    if !merged && !base_hits && branch.advance == target {
        return Some(branch.steps_since_start);
    }
    missed.record(visited);
    None
}

/// Finds the earliest dialogue leap from `timeline` that hits `target`.
///
/// `timeline` must be at the safe advance. `base_hits` is whether it hits
/// the target without a leap.
fn find_dialogue_leap(
    mut timeline: Timeline,
    base_hits: bool,
    target: usize,
) -> Option<Gen7TimelineLeap> {
    // The user steps through the next advances to check the timeline,
    // so the leap has to come after them.
    timeline.skip_steps(FIRST_PRESS_STEP);

    let mut missed = MissedStates::default();
    for _ in 0..MAX_LEAP_STEPS {
        if timeline.advance >= target {
            return None;
        }

        let mut branch = timeline.clone();
        branch.leap_dialogue();
        let base = timeline.clone();
        if let Some(steps) = branch_steps_to_target(branch, base, base_hits, target, &mut missed) {
            return Some(Gen7TimelineLeap {
                leap_advance: timeline.advance,
                steps_to_leap: timeline.steps_since_start,
                steps_from_leap_to_target: steps - timeline.steps_since_start,
            });
        }

        timeline.step();
    }

    None
}

pub fn target_timeline(
    seed: u32,
    model_count: usize,
    safe_advance: usize,
    target: usize,
) -> Gen7TargetTimeline {
    // Jumping to the safe advance is the slow part, so only do it once.
    let timeline = Timeline::new(seed, model_count, safe_advance);
    let next_advances = timeline.next_advances();

    let steps_to_target = timeline
        .clone()
        .find(|step| step.advance >= target)
        .filter(|step| step.advance == target)
        .map(|step| step.steps_since_start);

    let leap = find_dialogue_leap(timeline, steps_to_target.is_some(), target);

    Gen7TargetTimeline {
        next_advances,
        steps_to_target,
        leap,
    }
}

#[cfg(test)]
mod test {
    use super::*;
    use crate::gen7::model_count_from_npcs;
    use crate::gen7::test_utils::{BLINK, NO_BLINK};
    use crate::test_utils::FakeRng;

    const SEED: u32 = 0xdeadbeef;

    fn advances(safe_advance: usize, npc_count: u8, count: usize) -> Vec<usize> {
        Timeline::new(SEED, model_count_from_npcs(npc_count), safe_advance)
            .take(count)
            .map(|step| step.advance)
            .collect()
    }

    // 3DSRNGTool Create Timeline, seed 0xDEADBEEF, 2 NPCs, from 1000.
    #[test]
    fn matches_3dsrngtool_2_npcs() {
        let expected: Vec<usize> = (1000..=1180).step_by(3).collect();
        assert_eq!(advances(1000, 2, expected.len()), expected);
    }

    // 3DSRNGTool Create Timeline, seed 0xDEADBEEF, 4 NPCs, from 1039.
    #[test]
    fn matches_3dsrngtool_4_npcs() {
        let expected: Vec<usize> = (1039..=1339).step_by(5).collect();
        assert_eq!(advances(1039, 4, expected.len()), expected);
    }

    // 3DSRNGTool Create Timeline, seed 0xDEADBEEF, 2 NPCs, from 1298.
    // A model starts blinking near 1385.
    #[test]
    fn matches_3dsrngtool_2_npcs_with_blink() {
        let expected = [
            1298, 1301, 1304, 1307, 1310, 1313, 1316, 1319, 1322, 1325, 1328, 1331, 1334, 1337,
            1340, 1343, 1346, 1349, 1352, 1355, 1358, 1361, 1364, 1367, 1370, 1373, 1376, 1379,
            1382, 1385, 1387, 1389, 1391, 1393, 1396, 1398, 1400, 1402, 1404, 1406, 1408, 1410,
            1412, 1414, 1416, 1418, 1420, 1422, 1424, 1426, 1428, 1430, 1432, 1434, 1436, 1438,
            1440, 1442, 1444, 1446, 1448,
        ];
        assert_eq!(advances(1298, 2, expected.len()), expected);
    }

    // 3DSRNGTool Create Timeline, seed 0xDEADBEEF, 4 NPCs, from 1240.
    // Models start blinking near 1385 and 1474.
    #[test]
    fn matches_3dsrngtool_4_npcs_with_blink() {
        let expected = [
            1240, 1245, 1250, 1255, 1260, 1265, 1270, 1275, 1280, 1285, 1290, 1295, 1300, 1305,
            1310, 1315, 1320, 1325, 1330, 1335, 1340, 1345, 1350, 1355, 1360, 1365, 1370, 1375,
            1380, 1385, 1389, 1393, 1397, 1401, 1406, 1410, 1414, 1418, 1422, 1426, 1430, 1434,
            1438, 1442, 1446, 1450, 1454, 1458, 1462, 1466, 1470, 1474, 1477, 1480, 1483, 1486,
            1490, 1493, 1496, 1499, 1502,
        ];
        assert_eq!(advances(1240, 4, expected.len()), expected);
    }

    #[test]
    fn starts_at_the_safe_advance() {
        let mut timeline = Timeline::new(SEED, model_count_from_npcs(4), 1039);
        assert_eq!(
            timeline.next(),
            Some(TimelineStep {
                advance: 1039,
                steps_since_start: 0,
            })
        );
        assert_eq!(
            timeline.next(),
            Some(TimelineStep {
                advance: 1044,
                steps_since_start: 1,
            })
        );
    }

    #[test]
    fn target_on_the_timeline() {
        let model_count = model_count_from_npcs(4);
        assert_eq!(
            target_timeline(SEED, model_count, 1039, 1139),
            Gen7TargetTimeline {
                next_advances: vec![1044, 1049, 1054, 1059, 1064],
                steps_to_target: Some(20),
                leap: None,
            }
        );
    }

    #[test]
    fn target_is_the_safe_advance() {
        let model_count = model_count_from_npcs(4);
        assert_eq!(
            target_timeline(SEED, model_count, 1039, 1039),
            Gen7TargetTimeline {
                next_advances: vec![1044, 1049, 1054, 1059, 1064],
                steps_to_target: Some(0),
                leap: None,
            }
        );
    }

    // No model blinks before 1385, so every step uses 5 advances and a leap
    // uses 16. The first leap after the next advances is 1069, which lands
    // on 1069 + 16 + 5 * 11 = 1140.
    #[test]
    fn target_skipped_by_the_timeline() {
        let model_count = model_count_from_npcs(4);
        assert_eq!(
            target_timeline(SEED, model_count, 1039, 1140),
            Gen7TargetTimeline {
                next_advances: vec![1044, 1049, 1054, 1059, 1064],
                steps_to_target: None,
                leap: Some(Gen7TimelineLeap {
                    leap_advance: 1069,
                    steps_to_leap: 6,
                    steps_from_leap_to_target: 14,
                }),
            }
        );
    }

    #[test]
    fn target_before_the_safe_advance() {
        let model_count = model_count_from_npcs(2);
        assert_eq!(
            target_timeline(SEED, model_count, 1000, 999),
            Gen7TargetTimeline {
                next_advances: vec![1003, 1006, 1009, 1012, 1015],
                steps_to_target: None,
                leap: None,
            }
        );
    }

    #[test]
    fn leap_dialogue_uses_one_extra_advance() {
        let model_count = model_count_from_npcs(4);
        let mut stepped = Timeline::new(SEED, model_count, 1039);
        let mut leaped = stepped.clone();

        for _ in 0..3 {
            stepped.step();
        }
        leaped.leap_dialogue();

        assert_eq!(stepped.advance, 1054);
        assert_eq!(leaped.advance, 1055);
        assert_eq!(leaped.steps_since_start, 3);
    }

    #[test]
    fn target_too_close_for_a_leap() {
        // The leap can't happen until after the next advances.
        let model_count = model_count_from_npcs(4);
        let result = target_timeline(SEED, model_count, 1039, 1066);
        assert_eq!(result.steps_to_target, None);
        assert_eq!(result.leap, None);
    }

    /// Walks every branch all the way to the target, with no early stops.
    /// When the base timeline hits the target, the branch has to have the
    /// same advance and NPC state as it at the target.
    fn naive_dialogue_leap(
        model_count: usize,
        safe_advance: usize,
        target: usize,
    ) -> Option<Gen7TimelineLeap> {
        let base_hit = Timeline::new(SEED, model_count, safe_advance)
            .find(|step| step.advance >= target)
            .filter(|step| step.advance == target);
        let mut base_at_target = Timeline::new(SEED, model_count, safe_advance);
        while base_at_target.advance < target {
            base_at_target.step();
        }

        let mut timeline = Timeline::new(SEED, model_count, safe_advance);
        for _ in 0..=NEXT_ADVANCE_COUNT {
            timeline.step();
        }

        for _ in 0..MAX_LEAP_STEPS {
            if timeline.advance >= target {
                return None;
            }
            let mut branch = timeline.clone();
            branch.leap_dialogue();
            while branch.advance < target {
                branch.step();
            }
            let hits = branch.advance == target
                && (base_hit.is_none() || branch.has_merged_with(&base_at_target));
            if hits {
                return Some(Gen7TimelineLeap {
                    leap_advance: timeline.advance,
                    steps_to_leap: timeline.steps_since_start,
                    steps_from_leap_to_target: branch.steps_since_start
                        - timeline.steps_since_start,
                });
            }
            timeline.step();
        }
        None
    }

    #[test]
    fn merge_check_matches_naive_search() {
        // Both include blinks near 1385 and 1474, where branches can merge.
        // With 2 NPCs, no leap rejoins the timeline. With 4 NPCs, the first
        // leap that does is for target 2014.
        for (npc_count, safe_advance) in [(2, 1298), (4, 1240)] {
            let model_count = model_count_from_npcs(npc_count);
            let mut skipped_leaps = 0;
            let mut on_timeline_leaps = 0;

            for target in safe_advance..safe_advance + 1000 {
                let result = target_timeline(SEED, model_count, safe_advance, target);
                let naive = naive_dialogue_leap(model_count, safe_advance, target);
                assert_eq!(result.leap, naive, "{npc_count} NPCs, target {target}");
                if naive.is_some() {
                    if result.steps_to_target.is_some() {
                        on_timeline_leaps += 1;
                    } else {
                        skipped_leaps += 1;
                    }
                }
            }

            assert!(skipped_leaps > 0, "{npc_count} NPCs found no leaps");
            if npc_count == 4 {
                assert!(
                    on_timeline_leaps > 0,
                    "found no leaps that stay on the timeline"
                );
            }
        }
    }

    #[test]
    fn leap_has_to_stay_on_the_timeline() {
        // No model blinks before 1385, so a dialogue leaves the timeline
        // 1 advance ahead and can't rejoin it before 1139.
        let model_count = model_count_from_npcs(4);
        let result = target_timeline(SEED, model_count, 1039, 1139);
        assert_eq!(result.steps_to_target, Some(20));
        assert_eq!(result.leap, None);
    }

    #[test]
    fn next_advance_skips_steps_that_use_no_advances() {
        let mut rands = vec![BLINK, BLINK];
        rands.extend([1, 1, NO_BLINK]);
        let npcs = NpcModel::new(model_count_from_npcs(1));
        let mut timeline = Timeline::from_npcs(FakeRng::new(&rands), npcs, 100);

        timeline.step_until_advance_changes();
        assert_eq!(timeline.current().advance, 102);
        assert_eq!(timeline.current().steps_since_start, 1);

        timeline.step_until_advance_changes();
        assert_eq!(timeline.current().advance, 104);
        assert_eq!(timeline.current().steps_since_start, 6);
    }
}
