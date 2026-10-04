use super::{Gen7TargetTimeline, model_count_from_npcs, next_safe_advances, target_timeline};
use serde::{Deserialize, Serialize};
use tsify::Tsify;
use wasm_bindgen::prelude::*;

/// How far ahead to look for safe advances before giving up.
const MAX_SAFE_SCAN: usize = 100_000;

#[derive(Debug, Clone, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct Gen7SafeAdvancesOpts {
    pub seed: u32,
    pub npc_count: u8,
    /// The advance the user entered. Earlier blinks are checked relative to
    /// this, so every page of results agrees.
    pub current_advance: usize,
    /// Safe advances at or after this advance are returned.
    pub from_advance: usize,
    pub safe_advance_count: usize,
}

/// An object instead of a number so the list can run in `multiWorkerRngTools`.
#[derive(Debug, Clone, Copy, PartialEq, Eq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct Gen7SafeAdvance {
    pub advance: usize,
}

#[wasm_bindgen]
pub fn gen7_next_safe_advances(opts: Gen7SafeAdvancesOpts) -> Vec<Gen7SafeAdvance> {
    next_safe_advances(
        opts.seed,
        model_count_from_npcs(opts.npc_count),
        opts.current_advance,
        opts.from_advance,
        opts.safe_advance_count,
        MAX_SAFE_SCAN,
    )
    .unwrap_or_default()
    .into_iter()
    .map(|advance| Gen7SafeAdvance { advance })
    .collect()
}

#[derive(Debug, Clone, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct Gen7TimelineOpts {
    pub seed: u32,
    pub npc_count: u8,
    pub safe_advance: usize,
    pub target_advance: usize,
}

/// Returns a list with one item so it can run in `multiWorkerRngTools`.
#[wasm_bindgen]
pub fn gen7_target_timeline(opts: Gen7TimelineOpts) -> Vec<Gen7TargetTimeline> {
    vec![target_timeline(
        opts.seed,
        model_count_from_npcs(opts.npc_count),
        opts.safe_advance,
        opts.target_advance,
    )]
}

#[cfg(test)]
mod test {
    use super::*;

    const SEED: u32 = 0xdeadbeef;

    #[test]
    fn safe_advances_use_the_npc_count() {
        let result = gen7_next_safe_advances(Gen7SafeAdvancesOpts {
            seed: SEED,
            npc_count: 4,
            current_advance: 1000,
            from_advance: 1000,
            safe_advance_count: 3,
        });
        let advances: Vec<usize> = result.iter().map(|safe| safe.advance).collect();
        assert_eq!(advances, vec![1039, 1040, 1041]);
    }

    #[test]
    fn zero_npcs_has_no_safe_advances() {
        let result = gen7_next_safe_advances(Gen7SafeAdvancesOpts {
            seed: SEED,
            npc_count: 0,
            current_advance: 1000,
            from_advance: 1000,
            safe_advance_count: 3,
        });
        assert_eq!(result, vec![]);
    }

    #[test]
    fn target_timeline_uses_the_npc_count() {
        let result = gen7_target_timeline(Gen7TimelineOpts {
            seed: SEED,
            npc_count: 4,
            safe_advance: 1240,
            target_advance: 1474,
        });
        assert_eq!(
            result,
            vec![Gen7TargetTimeline {
                next_advances: vec![1245, 1250, 1255, 1260, 1265],
                steps_to_target: Some(51),
                leap: None,
            }]
        );
    }
}
