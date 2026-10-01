use super::NpcModel;
use crate::rng::{Rng, sfmt::Sfmt};
use serde::{Deserialize, Serialize};
use tsify::Tsify;

const NEXT_ADVANCE_COUNT: usize = 5;

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
        self.advance += self.npcs.step(&mut self.rng);
        self.steps_from_safe_advance += 1;
        Some(current)
    }
}

#[derive(Debug, Clone, PartialEq, Eq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct Gen7TargetTimeline {
    pub next_advances: Vec<usize>,
    /// `None` when the timeline skips the target or the target is before the safe advance.
    pub steps_to_target: Option<u32>,
}

pub fn target_timeline(
    seed: u32,
    model_count: usize,
    safe_advance: usize,
    target: usize,
) -> Gen7TargetTimeline {
    // Jumping to the safe advance is the slow part, so only do it once.
    let mut timeline = Timeline::new(seed, model_count, safe_advance);
    let next_advances = timeline
        .clone()
        .skip(1)
        .take(NEXT_ADVANCE_COUNT)
        .map(|step| step.advance)
        .collect();

    let steps_to_target = timeline
        .find(|step| step.advance >= target)
        .filter(|step| step.advance == target)
        .map(|step| step.steps_from_safe_advance);

    Gen7TargetTimeline {
        next_advances,
        steps_to_target,
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
            }
        );
    }

    #[test]
    fn target_skipped_by_the_timeline() {
        let model_count = model_count_from_npcs(4);
        assert_eq!(
            target_timeline(SEED, model_count, 1039, 1140),
            Gen7TargetTimeline {
                next_advances: vec![1044, 1049, 1054, 1059, 1064],
                steps_to_target: None,
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
            }
        );
    }
}
