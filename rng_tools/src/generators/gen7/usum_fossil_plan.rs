use super::fossil_timeline::{
    FOSSIL_DIALOGUE_MODELS, FOSSIL_GIFT, MAX_ADVANCES_AFTER_DIALOGUE_A, after_dialogue_a_timeline,
    can_press_a_on_fossil, fossil_dialogue_timeline, skip_to_first_fossil_a_press,
};
use super::timeline_finder::safe_advances_for_models;
use super::{
    Gen7Advance, Gen7Press, Gen7SceneSafeAdvancesOpts, LAST_NEXT_ADVANCE_STEP, MissedStates,
    Timeline, delay_advances,
};
use serde::{Deserialize, Serialize};
use tsify::Tsify;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn gen7_usum_fossil_safe_advances(opts: Gen7SceneSafeAdvancesOpts) -> Vec<Gen7Advance> {
    safe_advances_for_models(&opts, FOSSIL_DIALOGUE_MODELS)
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct Gen7UsumFossilPlanTarget {
    pub advance: usize,
    pub delay_advances: usize,
}

#[derive(Debug, Clone, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct Gen7UsumFossilPlanOpts {
    pub seed: u32,
    pub safe_advance: usize,
    /// Without a target, the plan only gives the next advances.
    pub target: Option<Gen7UsumFossilPlanTarget>,
    /// The A press on the dialogue from an earlier plan on this timeline.
    /// The user may have stepped that far, so the new press can't be before it.
    pub min_dialogue_a_advance: Option<usize>,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct Gen7UsumFossilPresses {
    /// `wait_steps` counts from `min_dialogue_a_advance`, or from the last
    /// next advance without one or when it's before the first press.
    pub dialogue_a: Gen7Press,
    pub target: Gen7Press,
}

#[derive(Debug, Clone, PartialEq, Eq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct Gen7UsumFossilPlan {
    pub next_advances: Vec<usize>,
    pub presses: Option<Gen7UsumFossilPresses>,
}

fn plan(opts: &Gen7UsumFossilPlanOpts) -> Gen7UsumFossilPlan {
    let dialogue = fossil_dialogue_timeline(opts.seed, opts.safe_advance);
    Gen7UsumFossilPlan {
        next_advances: dialogue.next_advances(),
        presses: opts
            .target
            .and_then(|target| find_presses(dialogue, opts, &target, true)),
    }
}

/// Finds the earliest A press on the dialogue that reaches the target.
/// `share_missed_a_presses` prunes dialogue A presses whose fossil A presses
/// merge with ones an earlier dialogue A press missed.
fn find_presses(
    mut dialogue: Timeline,
    opts: &Gen7UsumFossilPlanOpts,
    target: &Gen7UsumFossilPlanTarget,
    share_missed_a_presses: bool,
) -> Option<Gen7UsumFossilPresses> {
    let mut wait_from_step = skip_to_first_dialogue_a_press(&mut dialogue);

    // A minimum before the first press isn't a press the user stepped to.
    if let Some(min_dialogue_a_advance) = opts.min_dialogue_a_advance
        && min_dialogue_a_advance >= dialogue.advance()
    {
        // Presses at or after the target can't reach it, so stop stepping there.
        let catch_up_advance = min_dialogue_a_advance.min(target.advance);
        while dialogue.advance() < catch_up_advance {
            dialogue.step_to_next_advance();
        }
        wait_from_step = dialogue.steps_since_start();
    }

    let mut missed_a_presses = MissedStates::default();
    while dialogue.advance() < target.advance {
        if !share_missed_a_presses {
            missed_a_presses = MissedStates::default();
        }
        if let Some(steps_to_target) =
            steps_from_dialogue_a_to_target(&dialogue, target, &mut missed_a_presses)
        {
            return Some(Gen7UsumFossilPresses {
                dialogue_a: Gen7Press {
                    advance: dialogue.advance(),
                    wait_steps: dialogue.steps_since_start() - wait_from_step,
                },
                target: Gen7Press {
                    advance: target.advance,
                    wait_steps: steps_to_target,
                },
            });
        }
        dialogue.step_to_next_advance();
    }

    None
}

/// The user steps through the next advances to check the timeline, so the
/// A press has to come after them. Returns the step waits count from.
fn skip_to_first_dialogue_a_press(dialogue: &mut Timeline) -> u32 {
    dialogue.skip_steps(LAST_NEXT_ADVANCE_STEP);
    let wait_from_step = dialogue.steps_since_start();
    dialogue.step_to_next_advance();
    wait_from_step
}

fn steps_from_dialogue_a_to_target(
    dialogue_a: &Timeline,
    target: &Gen7UsumFossilPlanTarget,
    missed_a_presses: &mut MissedStates,
) -> Option<u32> {
    let is_too_early = dialogue_a.advance() + MAX_ADVANCES_AFTER_DIALOGUE_A < target.advance;
    if is_too_early {
        return None;
    }

    let mut after_dialogue_a = after_dialogue_a_timeline(dialogue_a.clone());
    skip_to_first_fossil_a_press(&mut after_dialogue_a);

    let mut a_presses = vec![];
    while can_press_a_on_fossil(&after_dialogue_a, target.advance) {
        if is_target(&after_dialogue_a, target) {
            return Some(after_dialogue_a.steps_since_start());
        }
        if let Some(a_press) = MissedStates::sample(&after_dialogue_a) {
            // Same advance and NPC state means the same future, so merging
            // with a timeline that went past the target goes past it too.
            if missed_a_presses.contains(&a_press) {
                missed_a_presses.record(a_presses);
                return None;
            }
            a_presses.push(a_press);
        }
        after_dialogue_a.step_to_next_advance();
    }

    // Running out of time isn't recorded. A timeline that merges here with
    // fewer steps since its A press has more time left, so it may still
    // reach the target.
    if after_dialogue_a.advance() > target.advance {
        missed_a_presses.record(a_presses);
    }
    None
}

fn is_target(a_press: &Timeline, target: &Gen7UsumFossilPlanTarget) -> bool {
    // The delay doesn't depend on the lead's Synchronize nature.
    a_press.advance() == target.advance
        && delay_advances(a_press, &FOSSIL_GIFT) == target.delay_advances
}

/// Returns a list with one item so it can run in `multiWorkerRngTools`.
#[wasm_bindgen]
pub fn gen7_usum_fossil_plan(opts: Gen7UsumFossilPlanOpts) -> Vec<Gen7UsumFossilPlan> {
    vec![plan(&opts)]
}

#[cfg(test)]
mod test {
    use super::*;
    use crate::gen7::test_utils::step_to_advance;
    use crate::gen7::{
        Gen7Gift, Gen7UsumFossilSearchOpts, MAX_SAFE_SCAN, gen7_search_usum_fossils, generate_gift,
        next_safe_advances,
    };
    use crate::{Gender, Ivs, Nature, PkmFilter};

    const SEED: u32 = 0x58507f4f;
    const SAFE_ADVANCE: usize = 7937;
    const SYNC_NATURE: Option<Nature> = Some(Nature::Adamant);

    fn searched_targets(first_target_advance: usize) -> Vec<Gen7Gift> {
        gen7_search_usum_fossils(Gen7UsumFossilSearchOpts {
            seed: SEED,
            tsv: 0,
            sync_nature: SYNC_NATURE,
            current_advance: SAFE_ADVANCE,
            first_target_advance,
            last_target_advance: first_target_advance + 200,
            filter: PkmFilter::new_allow_all(),
        })
    }

    fn target_of(fossil: &Gen7Gift) -> Gen7UsumFossilPlanTarget {
        Gen7UsumFossilPlanTarget {
            advance: fossil.advance,
            delay_advances: fossil.delay_advances,
        }
    }

    fn opts_for(target: &Gen7Gift) -> Gen7UsumFossilPlanOpts {
        Gen7UsumFossilPlanOpts {
            seed: SEED,
            safe_advance: SAFE_ADVANCE,
            target: Some(target_of(target)),
            min_dialogue_a_advance: None,
        }
    }

    fn presses_for(opts: &Gen7UsumFossilPlanOpts) -> Option<Gen7UsumFossilPresses> {
        plan(opts).presses
    }

    /// Target and presses for the first few searched targets the timeline can reach.
    fn reachable_targets(first_target_advance: usize) -> Vec<(Gen7Gift, Gen7UsumFossilPresses)> {
        searched_targets(first_target_advance)
            .into_iter()
            .step_by(15)
            .filter_map(|target| {
                let presses = presses_for(&opts_for(&target))?;
                Some((target, presses))
            })
            .collect()
    }

    /// Follows the presses the way the user does, one step at a time.
    fn fossil_from_presses(presses: &Gen7UsumFossilPresses) -> Gen7Gift {
        let mut dialogue = fossil_dialogue_timeline(SEED, SAFE_ADVANCE);
        step_to_advance(&mut dialogue, presses.dialogue_a.advance);

        let mut after_dialogue_a = after_dialogue_a_timeline(dialogue);
        step_to_advance(&mut after_dialogue_a, presses.target.advance);
        assert_eq!(
            after_dialogue_a.current().steps_since_start,
            presses.target.wait_steps
        );
        generate_gift(
            after_dialogue_a,
            0,
            &FOSSIL_GIFT.with_sync_nature(SYNC_NATURE),
        )
    }

    #[test]
    fn next_advances_follow_the_dialogue() {
        let plan = plan(&Gen7UsumFossilPlanOpts {
            seed: SEED,
            safe_advance: SAFE_ADVANCE,
            target: None,
            min_dialogue_a_advance: None,
        });
        assert_eq!(plan.next_advances, vec![7939, 7941, 7943, 7945, 7947]);
        assert_eq!(plan.presses, None);
    }

    #[test]
    fn presses_reach_searched_targets() {
        let reachable = reachable_targets(SAFE_ADVANCE + 3000);
        assert!(reachable.len() > 5);
        for (target, presses) in reachable {
            assert_eq!(fossil_from_presses(&presses), target);
        }
    }

    /// `find_presses` without sharing missed A presses between dialogue A presses.
    fn naive_presses(opts: &Gen7UsumFossilPlanOpts) -> Option<Gen7UsumFossilPresses> {
        let dialogue = fossil_dialogue_timeline(opts.seed, opts.safe_advance);
        find_presses(dialogue, opts, &opts.target?, false)
    }

    #[test]
    fn missed_a_presses_match_naive_search() {
        let targets: Vec<Gen7Gift> = searched_targets(SAFE_ADVANCE + 3000)
            .into_iter()
            .take(20)
            .collect();
        let mut reachable = 0;
        let mut unreachable = 0;
        for target in &targets {
            // A wrong delay is never reached, so every dialogue A gets pruned.
            for delay_advances in [target.delay_advances, target.delay_advances + 1] {
                for min_dialogue_a_advance in [None, Some(target.advance - 2000)] {
                    let opts = Gen7UsumFossilPlanOpts {
                        target: Some(Gen7UsumFossilPlanTarget {
                            delay_advances,
                            ..target_of(target)
                        }),
                        min_dialogue_a_advance,
                        ..opts_for(target)
                    };
                    let naive = naive_presses(&opts);
                    assert_eq!(presses_for(&opts), naive, "target {}", target.advance);
                    if naive.is_some() {
                        reachable += 1;
                    } else {
                        unreachable += 1;
                    }
                }
            }
        }
        assert!(reachable > 0);
        assert!(unreachable > 0);
    }

    #[test]
    fn dialogue_a_comes_after_the_next_advances() {
        // Close enough that the first A presses on the dialogue can reach it.
        let (_, presses) = reachable_targets(SAFE_ADVANCE + 1900).remove(0);
        assert!(presses.dialogue_a.advance > 7947);
        assert!(presses.dialogue_a.wait_steps > 0);
    }

    #[test]
    fn target_leaves_time_for_the_final_screen() {
        for (_, presses) in reachable_targets(SAFE_ADVANCE + 3000) {
            assert!(presses.target.wait_steps >= 490);
            assert!(presses.target.wait_steps <= 1800);
        }
    }

    #[test]
    fn new_target_keeps_the_dialogue_a_at_or_after_the_previous_one() {
        let reachable = reachable_targets(SAFE_ADVANCE + 3000);
        let (_, previous) = reachable[0];
        let mut retargeted = 0;

        for (target, _) in &reachable[1..] {
            let opts = Gen7UsumFossilPlanOpts {
                min_dialogue_a_advance: Some(previous.dialogue_a.advance),
                ..opts_for(target)
            };
            let Some(presses) = presses_for(&opts) else {
                continue;
            };
            assert!(presses.dialogue_a.advance >= previous.dialogue_a.advance);
            assert_eq!(&fossil_from_presses(&presses), target);
            retargeted += 1;
        }

        assert!(retargeted > 0);
    }

    #[test]
    fn same_target_again_needs_no_wait() {
        let (target, previous) = reachable_targets(SAFE_ADVANCE + 3000).remove(0);
        let presses = presses_for(&Gen7UsumFossilPlanOpts {
            min_dialogue_a_advance: Some(previous.dialogue_a.advance),
            ..opts_for(&target)
        })
        .unwrap();

        assert_eq!(presses.dialogue_a.advance, previous.dialogue_a.advance);
        assert_eq!(presses.dialogue_a.wait_steps, 0);
        assert_eq!(presses.target, previous.target);
    }

    #[test]
    fn minimum_before_the_first_press_waits_from_the_next_advances() {
        let (target, without_minimum) = reachable_targets(SAFE_ADVANCE + 3000).remove(0);
        // Before the last next advance (7947), so before any press.
        let presses = presses_for(&Gen7UsumFossilPlanOpts {
            min_dialogue_a_advance: Some(SAFE_ADVANCE),
            ..opts_for(&target)
        })
        .unwrap();

        assert_eq!(presses, without_minimum);
        assert!(presses.dialogue_a.wait_steps > 0);
    }

    #[test]
    fn target_only_reachable_by_an_earlier_dialogue_a_is_unreachable() {
        let (target, previous) = reachable_targets(SAFE_ADVANCE + 3000).remove(0);
        let last_working_dialogue_a = {
            let mut last = previous.dialogue_a.advance;
            while let Some(presses) = presses_for(&Gen7UsumFossilPlanOpts {
                min_dialogue_a_advance: Some(last + 1),
                ..opts_for(&target)
            }) {
                last = presses.dialogue_a.advance;
            }
            last
        };

        let presses = presses_for(&Gen7UsumFossilPlanOpts {
            min_dialogue_a_advance: Some(last_working_dialogue_a + 1),
            ..opts_for(&target)
        });
        assert_eq!(presses, None);
    }

    #[test]
    fn target_before_the_safe_advance_is_unreachable() {
        let presses = presses_for(&Gen7UsumFossilPlanOpts {
            seed: SEED,
            safe_advance: SAFE_ADVANCE,
            target: Some(Gen7UsumFossilPlanTarget {
                advance: SAFE_ADVANCE - 1,
                delay_advances: 30,
            }),
            min_dialogue_a_advance: None,
        });
        assert_eq!(presses, None);
    }

    #[test]
    fn wrong_delay_is_unreachable() {
        let (target, _) = reachable_targets(SAFE_ADVANCE + 3000).remove(0);
        let presses = presses_for(&Gen7UsumFossilPlanOpts {
            target: Some(Gen7UsumFossilPlanTarget {
                delay_advances: 0,
                ..target_of(&target)
            }),
            ..opts_for(&target)
        });
        assert_eq!(presses, None);
    }

    /// The save every in-game run used.
    const IN_GAME_TSV: u16 = 2936;
    const IN_GAME_SEED: u32 = 0x4787b584;
    const IN_GAME_SAFE_ADVANCE: usize = 1325;
    const IN_GAME_DIALOGUE_A_ADVANCE: usize = 8365;
    const IN_GAME_TARGET_ADVANCE: usize = 11203;

    /// A run in game with an ordinary lead, following the plan's presses.
    fn in_game_fossil() -> Gen7Gift {
        let mut dialogue = fossil_dialogue_timeline(IN_GAME_SEED, IN_GAME_SAFE_ADVANCE);
        step_to_advance(&mut dialogue, IN_GAME_DIALOGUE_A_ADVANCE);
        let mut after_dialogue_a = after_dialogue_a_timeline(dialogue);
        step_to_advance(&mut after_dialogue_a, IN_GAME_TARGET_ADVANCE);
        generate_gift(after_dialogue_a, IN_GAME_TSV, &FOSSIL_GIFT)
    }

    #[test]
    fn matches_in_game_run_4787b584() {
        let fossil = in_game_fossil();
        assert_eq!(fossil.pid, 0x2a999d1d);
        assert!(fossil.shiny);
        assert_eq!(fossil.gender, Gender::Male);
        assert_eq!(fossil.nature, Nature::Careful);
        assert_eq!(fossil.ivs, Ivs::new(11, 24, 10, 8, 10, 12));
    }

    #[test]
    fn plans_the_in_game_run_4787b584() {
        let fossil = in_game_fossil();
        let presses = presses_for(&Gen7UsumFossilPlanOpts {
            seed: IN_GAME_SEED,
            safe_advance: IN_GAME_SAFE_ADVANCE,
            target: Some(Gen7UsumFossilPlanTarget {
                advance: fossil.advance,
                delay_advances: fossil.delay_advances,
            }),
            min_dialogue_a_advance: None,
        })
        .unwrap();
        assert_eq!(presses.dialogue_a.advance, IN_GAME_DIALOGUE_A_ADVANCE);
        assert_eq!(presses.target.advance, IN_GAME_TARGET_ADVANCE);
    }

    const IN_GAME_SYNC_SEED: u32 = 0xf6ac919d;
    const IN_GAME_SYNC_SAFE_ADVANCE: usize = 6199;
    const IN_GAME_SYNC_DIALOGUE_A_ADVANCE: usize = 6868;
    const IN_GAME_SYNC_TARGET_ADVANCE: usize = 9450;

    /// A run in game with a Timid Synchronize lead, following the plan's presses.
    fn in_game_synced_fossil(sync_nature: Option<Nature>) -> Gen7Gift {
        let mut dialogue = fossil_dialogue_timeline(IN_GAME_SYNC_SEED, IN_GAME_SYNC_SAFE_ADVANCE);
        step_to_advance(&mut dialogue, IN_GAME_SYNC_DIALOGUE_A_ADVANCE);
        let mut after_dialogue_a = after_dialogue_a_timeline(dialogue);
        step_to_advance(&mut after_dialogue_a, IN_GAME_SYNC_TARGET_ADVANCE);
        generate_gift(
            after_dialogue_a,
            IN_GAME_TSV,
            &FOSSIL_GIFT.with_sync_nature(sync_nature),
        )
    }

    #[test]
    fn matches_in_game_synchronize_run_f6ac919d() {
        let fossil = in_game_synced_fossil(Some(Nature::Timid));
        assert_eq!(fossil.pid, 0x823e35bd);
        assert!(fossil.shiny);
        assert_eq!(fossil.gender, Gender::Female);
        assert_eq!(fossil.nature, Nature::Timid);
        assert_eq!(fossil.ivs, Ivs::new(3, 19, 28, 17, 7, 12));

        // The gender comes from the rand an ordinary lead uses for the nature.
        let ordinary = in_game_synced_fossil(None);
        assert_eq!(ordinary.pid, fossil.pid);
        assert_eq!(ordinary.gender, Gender::Male);
    }

    #[test]
    fn plans_the_in_game_synchronize_run_f6ac919d() {
        let fossil = in_game_synced_fossil(Some(Nature::Timid));
        let presses = presses_for(&Gen7UsumFossilPlanOpts {
            seed: IN_GAME_SYNC_SEED,
            safe_advance: IN_GAME_SYNC_SAFE_ADVANCE,
            target: Some(Gen7UsumFossilPlanTarget {
                advance: fossil.advance,
                delay_advances: fossil.delay_advances,
            }),
            min_dialogue_a_advance: None,
        })
        .unwrap();
        assert_eq!(presses.dialogue_a.advance, IN_GAME_SYNC_DIALOGUE_A_ADVANCE);
        assert_eq!(presses.target.advance, IN_GAME_SYNC_TARGET_ADVANCE);
    }

    const IN_GAME_BLINK_SEED: u32 = 0xb5ff4fde;
    const IN_GAME_BLINK_SAFE_ADVANCE: usize = 1354;
    const IN_GAME_BLINK_DIALOGUE_A_ADVANCE: usize = 1366;
    const IN_GAME_BLINK_TARGET_ADVANCE: usize = 2853;

    /// A run in game with a Timid Synchronize lead, following the plan's
    /// presses. The player blinks on the steps before the target.
    fn in_game_blink_after_dialogue_a() -> Timeline {
        let mut dialogue = fossil_dialogue_timeline(IN_GAME_BLINK_SEED, IN_GAME_BLINK_SAFE_ADVANCE);
        step_to_advance(&mut dialogue, IN_GAME_BLINK_DIALOGUE_A_ADVANCE);
        after_dialogue_a_timeline(dialogue)
    }

    /// The advances on the steps after `advance`.
    fn advances_after(timeline: &Timeline, advance: usize, count: usize) -> Vec<usize> {
        let mut timeline = timeline.clone();
        step_to_advance(&mut timeline, advance);
        timeline
            .skip(1)
            .take(count)
            .map(|step| step.advance)
            .collect()
    }

    #[test]
    fn matches_in_game_blink_run_b5ff4fde() {
        let after_dialogue_a = in_game_blink_after_dialogue_a();
        // The leap moves the timeline to odd advances.
        assert_eq!(advances_after(&after_dialogue_a, 1373, 2), vec![1375, 1377]);
        // A on "This here is xxx!" at 1451 kept the advances the same.
        assert_eq!(
            advances_after(&after_dialogue_a, 1451, 5),
            vec![1453, 1455, 1457, 1459, 1461]
        );
        // The player is mid-blink, so only the NPC uses advances.
        assert_eq!(advances_after(&after_dialogue_a, 2851, 2), vec![2852, 2853]);

        let mut a_press = after_dialogue_a;
        step_to_advance(&mut a_press, IN_GAME_BLINK_TARGET_ADVANCE);
        let fossil = generate_gift(
            a_press,
            IN_GAME_TSV,
            &FOSSIL_GIFT.with_sync_nature(Some(Nature::Timid)),
        );
        assert_eq!(fossil.pid, 0x61d193f7);
        assert_eq!(fossil.gender, Gender::Male);
        assert_eq!(fossil.nature, Nature::Timid);
        assert_eq!(fossil.ivs, Ivs::new(22, 16, 0, 8, 20, 27));
    }

    #[test]
    fn plans_the_in_game_blink_run_b5ff4fde() {
        let mut a_press = in_game_blink_after_dialogue_a();
        step_to_advance(&mut a_press, IN_GAME_BLINK_TARGET_ADVANCE);
        let presses = presses_for(&Gen7UsumFossilPlanOpts {
            seed: IN_GAME_BLINK_SEED,
            safe_advance: IN_GAME_BLINK_SAFE_ADVANCE,
            target: Some(Gen7UsumFossilPlanTarget {
                advance: IN_GAME_BLINK_TARGET_ADVANCE,
                delay_advances: delay_advances(&a_press, &FOSSIL_GIFT),
            }),
            min_dialogue_a_advance: None,
        })
        .unwrap();
        assert_eq!(presses.dialogue_a.advance, IN_GAME_BLINK_DIALOGUE_A_ADVANCE);
        assert_eq!(presses.target.advance, IN_GAME_BLINK_TARGET_ADVANCE);
    }

    #[test]
    fn safe_advances_use_the_dialogue() {
        let opts = Gen7SceneSafeAdvancesOpts {
            seed: SEED,
            current_advance: 7000,
            from_advance: 7000,
            safe_advance_count: 5,
        };
        let expected =
            next_safe_advances(SEED, FOSSIL_DIALOGUE_MODELS, 7000, 7000, 5, MAX_SAFE_SCAN).unwrap();
        let advances: Vec<usize> = gen7_usum_fossil_safe_advances(opts)
            .into_iter()
            .map(|safe_advance| safe_advance.advance)
            .collect();
        assert_eq!(advances, expected);
    }
}
