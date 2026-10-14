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
    pub target: Option<Gen7UsumFossilPlanTarget>,
    /// The previous plan's dialogue A press, which the user may have stepped to.
    pub min_dialogue_a_advance: Option<usize>,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct Gen7UsumFossilPresses {
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
            .and_then(|target| find_presses(dialogue, opts, &target)),
    }
}

fn find_presses(
    mut dialogue: Timeline,
    opts: &Gen7UsumFossilPlanOpts,
    target: &Gen7UsumFossilPlanTarget,
) -> Option<Gen7UsumFossilPresses> {
    let first_press_wait_from = skip_to_first_dialogue_a_press(&mut dialogue);
    let wait_from_step =
        catch_up_to_min_dialogue_a(&mut dialogue, opts, target).unwrap_or(first_press_wait_from);

    let mut missed_a_presses = MissedStates::default();
    while dialogue.advance() < target.advance {
        let presses =
            presses_from_dialogue_a(&dialogue, wait_from_step, target, &mut missed_a_presses);
        if presses.is_some() {
            return presses;
        }

        dialogue.step_until_advance_changes();
    }

    None
}

fn skip_to_first_dialogue_a_press(dialogue: &mut Timeline) -> u32 {
    dialogue.skip_steps(LAST_NEXT_ADVANCE_STEP);
    let wait_from_step = dialogue.steps_since_start();
    dialogue.step_until_advance_changes();

    wait_from_step
}

fn catch_up_to_min_dialogue_a(
    dialogue: &mut Timeline,
    opts: &Gen7UsumFossilPlanOpts,
    target: &Gen7UsumFossilPlanTarget,
) -> Option<u32> {
    let min_dialogue_a_advance = opts
        .min_dialogue_a_advance
        .filter(|&advance| advance >= dialogue.advance())?;

    let catch_up_advance = min_dialogue_a_advance.min(target.advance);
    while dialogue.advance() < catch_up_advance {
        dialogue.step_until_advance_changes();
    }

    Some(dialogue.steps_since_start())
}

fn presses_from_dialogue_a(
    dialogue_a: &Timeline,
    wait_from_step: u32,
    target: &Gen7UsumFossilPlanTarget,
    missed_a_presses: &mut MissedStates,
) -> Option<Gen7UsumFossilPresses> {
    let steps_to_target = steps_from_dialogue_a_to_target(dialogue_a, target, missed_a_presses)?;

    Some(Gen7UsumFossilPresses {
        dialogue_a: Gen7Press {
            advance: dialogue_a.advance(),
            wait_steps: dialogue_a.steps_since_start() - wait_from_step,
        },
        target: Gen7Press {
            advance: target.advance,
            wait_steps: steps_to_target,
        },
    })
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

        let a_press = MissedStates::sample(&after_dialogue_a);
        let has_missed = a_press
            .as_ref()
            .is_some_and(|a| missed_a_presses.contains(a));
        if has_missed {
            missed_a_presses.record(a_presses);

            return None;
        }

        a_presses.extend(a_press);

        after_dialogue_a.step_until_advance_changes();
    }

    // Timing out isn't a miss: a merged timeline with more time left may still hit.
    if after_dialogue_a.advance() > target.advance {
        missed_a_presses.record(a_presses);
    }

    None
}

fn is_target(a_press: &Timeline, target: &Gen7UsumFossilPlanTarget) -> bool {
    a_press.advance() == target.advance
        && delay_advances(a_press, &FOSSIL_GIFT) == target.delay_advances
}

#[wasm_bindgen]
pub fn gen7_usum_fossil_plan(opts: Gen7UsumFossilPlanOpts) -> Vec<Gen7UsumFossilPlan> {
    vec![plan(&opts)]
}

#[cfg(test)]
mod test {
    use super::*;
    use crate::gen7::test_utils::step_to_advance;
    use crate::gen7::{
        Gen7Gift, Gen7UsumGiftMethod, Gen7UsumGiftSearchOpts, gen7_search_usum_gifts, generate_gift,
    };
    use crate::{AbilityType, Gender, Ivs, Nature, PkmFilter, ShinyType, TsvTrv};

    const SEED: u32 = 0x58507f4f;
    const SAFE_ADVANCE: usize = 7937;
    const SYNC_NATURE: Option<Nature> = Some(Nature::Adamant);

    fn searched_targets(first_target_advance: usize) -> Vec<Gen7Gift> {
        gen7_search_usum_gifts(Gen7UsumGiftSearchOpts {
            method: Gen7UsumGiftMethod::Fossil,
            seed: SEED,
            tsv: 0,
            trv: 0,
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
            TsvTrv::default(),
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

        assert_eq!(
            plan,
            Gen7UsumFossilPlan {
                next_advances: vec![7939, 7941, 7943, 7945, 7947],
                presses: None,
            }
        );
    }

    #[test]
    fn presses_reach_searched_targets() {
        let reachable = reachable_targets(SAFE_ADVANCE + 3000);
        assert!(reachable.len() > 5);

        for (target, presses) in reachable {
            assert_eq!(fossil_from_presses(&presses), target);
        }
    }

    fn naive_presses(opts: &Gen7UsumFossilPlanOpts) -> Option<Gen7UsumFossilPresses> {
        let target = opts.target?;
        let mut dialogue = fossil_dialogue_timeline(opts.seed, opts.safe_advance);
        let first_press_wait_from = skip_to_first_dialogue_a_press(&mut dialogue);
        let wait_from_step = catch_up_to_min_dialogue_a(&mut dialogue, opts, &target)
            .unwrap_or(first_press_wait_from);

        while dialogue.advance() < target.advance {
            let mut fresh_missed = MissedStates::default();
            let presses =
                presses_from_dialogue_a(&dialogue, wait_from_step, &target, &mut fresh_missed);
            if presses.is_some() {
                return presses;
            }

            dialogue.step_until_advance_changes();
        }

        None
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

        // Before the first press.
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

    const IN_GAME_TSV: u16 = 2936;

    const IN_GAME_SEED: u32 = 0x4787b584;
    const IN_GAME_SAFE_ADVANCE: usize = 1325;
    const IN_GAME_DIALOGUE_A_ADVANCE: usize = 8365;
    const IN_GAME_TARGET_ADVANCE: usize = 11203;

    fn in_game_fossil() -> Gen7Gift {
        let mut dialogue = fossil_dialogue_timeline(IN_GAME_SEED, IN_GAME_SAFE_ADVANCE);
        step_to_advance(&mut dialogue, IN_GAME_DIALOGUE_A_ADVANCE);

        let mut after_dialogue_a = after_dialogue_a_timeline(dialogue);
        step_to_advance(&mut after_dialogue_a, IN_GAME_TARGET_ADVANCE);

        generate_gift(
            after_dialogue_a,
            TsvTrv::from_tsv_trv_gen6_plus(IN_GAME_TSV, 0),
            &FOSSIL_GIFT,
        )
    }

    #[test]
    fn matches_in_game_run_4787b584() {
        assert_eq!(
            in_game_fossil(),
            Gen7Gift {
                advance: IN_GAME_TARGET_ADVANCE,
                delay_advances: 15,
                ec: 0x5af21c57,
                pid: 0x2a999d1d,
                psv: IN_GAME_TSV,
                shiny: ShinyType::StarShiny,
                ivs: Ivs::new(11, 24, 10, 8, 10, 12),
                ability: AbilityType::Second,
                nature: Nature::Careful,
                gender: Gender::Male,
            }
        );
    }

    #[test]
    fn plans_the_in_game_run_4787b584() {
        let presses = presses_for(&Gen7UsumFossilPlanOpts {
            seed: IN_GAME_SEED,
            safe_advance: IN_GAME_SAFE_ADVANCE,
            target: Some(target_of(&in_game_fossil())),
            min_dialogue_a_advance: None,
        });

        assert_eq!(
            presses,
            Some(Gen7UsumFossilPresses {
                dialogue_a: Gen7Press {
                    advance: IN_GAME_DIALOGUE_A_ADVANCE,
                    wait_steps: 4429,
                },
                target: Gen7Press {
                    advance: IN_GAME_TARGET_ADVANCE,
                    wait_steps: 1800,
                },
            })
        );
    }

    const IN_GAME_SYNC_SEED: u32 = 0xf6ac919d;
    const IN_GAME_SYNC_SAFE_ADVANCE: usize = 6199;
    const IN_GAME_SYNC_DIALOGUE_A_ADVANCE: usize = 6868;
    const IN_GAME_SYNC_TARGET_ADVANCE: usize = 9450;

    fn in_game_synced_fossil(sync_nature: Option<Nature>) -> Gen7Gift {
        let mut dialogue = fossil_dialogue_timeline(IN_GAME_SYNC_SEED, IN_GAME_SYNC_SAFE_ADVANCE);
        step_to_advance(&mut dialogue, IN_GAME_SYNC_DIALOGUE_A_ADVANCE);

        let mut after_dialogue_a = after_dialogue_a_timeline(dialogue);
        step_to_advance(&mut after_dialogue_a, IN_GAME_SYNC_TARGET_ADVANCE);

        generate_gift(
            after_dialogue_a,
            TsvTrv::from_tsv_trv_gen6_plus(IN_GAME_TSV, 0),
            &FOSSIL_GIFT.with_sync_nature(sync_nature),
        )
    }

    #[test]
    fn matches_in_game_synchronize_run_f6ac919d() {
        let synced = Gen7Gift {
            advance: IN_GAME_SYNC_TARGET_ADVANCE,
            delay_advances: 28,
            ec: 0x761f6d3b,
            pid: 0x823e35bd,
            psv: IN_GAME_TSV,
            shiny: ShinyType::StarShiny,
            ivs: Ivs::new(3, 19, 28, 17, 7, 12),
            ability: AbilityType::Second,
            nature: Nature::Timid,
            gender: Gender::Female,
        };

        assert_eq!(in_game_synced_fossil(Some(Nature::Timid)), synced);

        // The gender comes from the rand an ordinary lead uses for the nature.
        assert_eq!(
            in_game_synced_fossil(None),
            Gen7Gift {
                nature: Nature::Adamant,
                gender: Gender::Male,
                ..synced
            }
        );
    }

    #[test]
    fn plans_the_in_game_synchronize_run_f6ac919d() {
        let presses = presses_for(&Gen7UsumFossilPlanOpts {
            seed: IN_GAME_SYNC_SEED,
            safe_advance: IN_GAME_SYNC_SAFE_ADVANCE,
            target: Some(Gen7UsumFossilPlanTarget {
                advance: IN_GAME_SYNC_TARGET_ADVANCE,
                delay_advances: 28,
            }),
            min_dialogue_a_advance: None,
        });

        assert_eq!(
            presses,
            Some(Gen7UsumFossilPresses {
                dialogue_a: Gen7Press {
                    advance: IN_GAME_SYNC_DIALOGUE_A_ADVANCE,
                    wait_steps: 418,
                },
                target: Gen7Press {
                    advance: IN_GAME_SYNC_TARGET_ADVANCE,
                    wait_steps: 1732,
                },
            })
        );
    }

    const IN_GAME_BLINK_SEED: u32 = 0xb5ff4fde;
    const IN_GAME_BLINK_SAFE_ADVANCE: usize = 1354;
    const IN_GAME_BLINK_DIALOGUE_A_ADVANCE: usize = 1366;
    const IN_GAME_BLINK_TARGET_ADVANCE: usize = 2853;

    fn in_game_blink_after_dialogue_a() -> Timeline {
        let mut dialogue = fossil_dialogue_timeline(IN_GAME_BLINK_SEED, IN_GAME_BLINK_SAFE_ADVANCE);
        step_to_advance(&mut dialogue, IN_GAME_BLINK_DIALOGUE_A_ADVANCE);

        after_dialogue_a_timeline(dialogue)
    }

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
            TsvTrv::from_tsv_trv_gen6_plus(IN_GAME_TSV, 0),
            &FOSSIL_GIFT.with_sync_nature(Some(Nature::Timid)),
        );

        assert_eq!(
            fossil,
            Gen7Gift {
                advance: IN_GAME_BLINK_TARGET_ADVANCE,
                delay_advances: 16,
                ec: 0xa8371935,
                pid: 0x61d193f7,
                psv: 3874,
                shiny: ShinyType::NotShiny,
                ivs: Ivs::new(22, 16, 0, 8, 20, 27),
                ability: AbilityType::First,
                nature: Nature::Timid,
                gender: Gender::Male,
            }
        );
    }

    #[test]
    fn plans_the_in_game_blink_run_b5ff4fde() {
        let presses = presses_for(&Gen7UsumFossilPlanOpts {
            seed: IN_GAME_BLINK_SEED,
            safe_advance: IN_GAME_BLINK_SAFE_ADVANCE,
            target: Some(Gen7UsumFossilPlanTarget {
                advance: IN_GAME_BLINK_TARGET_ADVANCE,
                delay_advances: 16,
            }),
            min_dialogue_a_advance: None,
        });

        assert_eq!(
            presses,
            Some(Gen7UsumFossilPresses {
                dialogue_a: Gen7Press {
                    advance: IN_GAME_BLINK_DIALOGUE_A_ADVANCE,
                    wait_steps: 1,
                },
                target: Gen7Press {
                    advance: IN_GAME_BLINK_TARGET_ADVANCE,
                    wait_steps: 883,
                },
            })
        );
    }

    #[test]
    fn safe_advances_use_the_dialogue() {
        let safe_advances = gen7_usum_fossil_safe_advances(Gen7SceneSafeAdvancesOpts {
            seed: SEED,
            current_advance: 7000,
            from_advance: 7000,
            safe_advance_count: 5,
        });

        let advances: Vec<usize> = safe_advances
            .into_iter()
            .map(|safe_advance| safe_advance.advance)
            .collect();

        assert_eq!(advances, vec![7000, 7001, 7002, 7003, 7004]);
    }
}
