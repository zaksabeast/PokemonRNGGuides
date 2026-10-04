use super::NpcModel;
use crate::rng::{Rng, sfmt::Sfmt};
use serde::{Deserialize, Serialize};
use std::collections::HashSet;
use tsify::Tsify;

const NEXT_ADVANCE_COUNT: usize = 5;
/// 10 seconds of steps (2/60 s each) after the last next advance, so the
/// leap comes soon after the user checks the timeline.
const MAX_LEAP_STEPS: usize = 300;

#[derive(Clone)]
pub struct Timeline {
    rng: Sfmt,
    npcs: NpcModel,
    advance: usize,
    steps_from_safe_advance: u32,
}

impl Timeline {
    pub fn new(seed: u32, model_count: usize, safe_advance: usize) -> Self {
        let mut rng = Sfmt::new(seed);
        rng.advance(safe_advance);

        Self {
            rng,
            npcs: NpcModel::new(model_count),
            advance: safe_advance,
            steps_from_safe_advance: 0,
        }
    }

    fn step(&mut self) {
        self.advance += self.npcs.step(&mut self.rng);
        self.steps_from_safe_advance += 1;
    }

    /// Pressing A to advance dialogue uses one RNG advance while the NPCs
    /// are frozen, which moves the player onto a different timeline.
    /// Matches 3DSRNGTool's dialogue Timeline Leap.
    fn leap_dialogue(&mut self) {
        self.step();
        self.step();
        self.rng.next_u64();
        self.advance += 1;
        self.step();
    }

    /// Same advance and NPC state means the same future.
    fn has_merged_with(&self, other: &Self) -> bool {
        self.advance == other.advance && self.npcs == other.npcs
    }
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub struct TimelineStep {
    pub advance: usize,
    pub steps_from_safe_advance: u32,
}

impl Iterator for Timeline {
    type Item = TimelineStep;

    fn next(&mut self) -> Option<Self::Item> {
        let current = TimelineStep {
            advance: self.advance,
            steps_from_safe_advance: self.steps_from_safe_advance,
        };
        self.step();
        Some(current)
    }
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
struct MissedStates(HashSet<(usize, NpcModel)>);

impl MissedStates {
    const SAMPLE_EVERY: usize = 64;

    fn is_sampled(timeline: &Timeline) -> bool {
        timeline.advance.is_multiple_of(Self::SAMPLE_EVERY)
    }

    fn key(timeline: &Timeline) -> (usize, NpcModel) {
        (timeline.advance, timeline.npcs.clone())
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
        if MissedStates::is_sampled(&branch) {
            let key = MissedStates::key(&branch);
            if missed.0.contains(&key) {
                break;
            }
            visited.push(key);
        }
        branch.step();
    }

    if merged && base_hits {
        let hit = branch.find(|step| step.advance >= target);
        return hit.map(|step| step.steps_from_safe_advance);
    }
    if !merged && !base_hits && branch.advance == target {
        return Some(branch.steps_from_safe_advance);
    }
    missed.0.extend(visited);
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
    for _ in 0..=NEXT_ADVANCE_COUNT {
        timeline.step();
    }

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
                steps_to_leap: timeline.steps_from_safe_advance,
                steps_from_leap_to_target: steps - timeline.steps_from_safe_advance,
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
    let next_advances = timeline
        .clone()
        .skip(1)
        .take(NEXT_ADVANCE_COUNT)
        .map(|step| step.advance)
        .collect();

    let steps_to_target = timeline
        .clone()
        .find(|step| step.advance >= target)
        .filter(|step| step.advance == target)
        .map(|step| step.steps_from_safe_advance);

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
                steps_from_safe_advance: 0,
            })
        );
        assert_eq!(
            timeline.next(),
            Some(TimelineStep {
                advance: 1044,
                steps_from_safe_advance: 1,
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
        assert_eq!(leaped.steps_from_safe_advance, 3);
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
                    steps_to_leap: timeline.steps_from_safe_advance,
                    steps_from_leap_to_target: branch.steps_from_safe_advance
                        - timeline.steps_from_safe_advance,
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
}
