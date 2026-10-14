use super::starter_timeline::{
    KUKUI_DIALOGUE_MODELS, MAX_ADVANCES_AFTER_YES, MIN_STEPS_FROM_YES_NO_TO_YES,
    STEPS_FROM_KUKUI_A_TO_YES_NO, after_yes_timeline, can_press_a_on_starter, kukui_timeline,
    skip_to_first_starter_a_press, yes_no_timeline,
};
use super::timeline_finder::safe_advances_for_models;
use super::{
    Gen7Advance, Gen7Press, ModelState, NEXT_ADVANCE_COUNT, NpcModel, STARTER_GIFT, Timeline,
    delay_advances,
};
use serde::{Deserialize, Serialize};
use std::collections::HashMap;
use tsify::Tsify;
use wasm_bindgen::prelude::*;

const LAST_NEXT_ADVANCE_STEP: u32 = NEXT_ADVANCE_COUNT as u32;
const FIRST_KUKUI_A_STEP: u32 = LAST_NEXT_ADVANCE_STEP + 1;
const KUKUI_A_STEPS_TO_TRY: u32 = 300;

#[derive(Debug, Clone, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct Gen7UsumStarterSafeAdvancesOpts {
    pub seed: u32,
    pub current_advance: usize,
    pub from_advance: usize,
    pub safe_advance_count: usize,
}

#[wasm_bindgen]
pub fn gen7_usum_starter_safe_advances(opts: Gen7UsumStarterSafeAdvancesOpts) -> Vec<Gen7Advance> {
    safe_advances_for_models(
        opts.seed,
        KUKUI_DIALOGUE_MODELS,
        opts.current_advance,
        opts.from_advance,
        opts.safe_advance_count,
    )
}

#[derive(Debug, Clone, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct Gen7UsumStarterPlanOpts {
    pub seed: u32,
    pub safe_advance: usize,
    pub target_advance: usize,
    pub delay_advances: usize,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct Gen7UsumStarterPresses {
    pub kukui_a: Gen7Press,
    pub yes: Gen7Press,
    pub target: Gen7Press,
}

#[derive(Debug, Clone, PartialEq, Eq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct Gen7UsumStarterPlan {
    pub next_advances: Vec<usize>,
    pub presses: Option<Gen7UsumStarterPresses>,
}

fn plan(opts: &Gen7UsumStarterPlanOpts) -> Gen7UsumStarterPlan {
    let kukui = kukui_timeline(opts.seed, opts.safe_advance);
    Gen7UsumStarterPlan {
        next_advances: next_advances(&kukui),
        presses: find_presses(kukui, opts),
    }
}

fn next_advances(kukui: &Timeline) -> Vec<usize> {
    kukui
        .clone()
        .skip(1)
        .take(NEXT_ADVANCE_COUNT)
        .map(|step| step.advance)
        .collect()
}

fn find_presses(
    mut kukui: Timeline,
    opts: &Gen7UsumStarterPlanOpts,
) -> Option<Gen7UsumStarterPresses> {
    let mut cache = StepsAfterYesCache::default();

    kukui.skip_steps(FIRST_KUKUI_A_STEP);
    for _ in 0..KUKUI_A_STEPS_TO_TRY {
        let presses = presses_after_kukui_a(&kukui, opts, &mut cache);
        if presses.is_some() {
            return presses;
        }
        kukui.step();
    }

    None
}

fn presses_after_kukui_a(
    kukui_a: &Timeline,
    opts: &Gen7UsumStarterPlanOpts,
    cache: &mut StepsAfterYesCache,
) -> Option<Gen7UsumStarterPresses> {
    let mut yes = yes_no_timeline(kukui_a.clone());
    yes.skip_steps(MIN_STEPS_FROM_YES_NO_TO_YES);

    while yes.advance() <= opts.target_advance {
        if let Some(steps_after_yes) = steps_after_yes(&yes, opts, cache) {
            return Some(Gen7UsumStarterPresses {
                kukui_a: kukui_a_press(kukui_a),
                yes: yes_press(&yes),
                target: target_press(opts, steps_after_yes),
            });
        }
        yes.step();
    }

    None
}

fn steps_after_yes(
    yes: &Timeline,
    opts: &Gen7UsumStarterPlanOpts,
    cache: &mut StepsAfterYesCache,
) -> Option<u32> {
    if !can_press_yes(yes, opts) {
        return None;
    }
    cache.steps_after_yes(yes, opts)
}

fn can_press_yes(yes: &Timeline, opts: &Gen7UsumStarterPlanOpts) -> bool {
    let earliest_yes_for_target = opts.target_advance.saturating_sub(MAX_ADVANCES_AFTER_YES);
    // Pressing Yes mid-blink or in a cooldown hasn't been tested in game.
    let is_player_idle = yes.npcs().player() == Some(ModelState::Idle);
    yes.advance() >= earliest_yes_for_target && is_player_idle
}

fn steps_from_yes_to_target(
    mut after_yes: Timeline,
    opts: &Gen7UsumStarterPlanOpts,
) -> Option<u32> {
    skip_to_first_starter_a_press(&mut after_yes);

    while can_press_a_on_starter(&after_yes, opts.target_advance) {
        if is_target(&after_yes, opts) {
            return Some(after_yes.steps_since_start());
        }
        after_yes.step();
    }

    None
}

fn is_target(a_press: &Timeline, opts: &Gen7UsumStarterPlanOpts) -> bool {
    a_press.advance() == opts.target_advance
        && delay_advances(a_press, &STARTER_GIFT) == opts.delay_advances
}

/// Different A presses on Kukui's dialogue often reach the same Yes press.
#[derive(Default)]
struct StepsAfterYesCache(HashMap<(usize, NpcModel), Option<u32>>);

impl StepsAfterYesCache {
    fn steps_after_yes(&mut self, yes: &Timeline, opts: &Gen7UsumStarterPlanOpts) -> Option<u32> {
        let key = (yes.advance(), yes.npcs().clone());
        *self
            .0
            .entry(key)
            .or_insert_with(|| steps_from_yes_to_target(after_yes_timeline(yes.clone()), opts))
    }
}

fn kukui_a_press(kukui_a: &Timeline) -> Gen7Press {
    Gen7Press {
        advance: kukui_a.advance(),
        wait_steps: kukui_a.steps_since_start() - LAST_NEXT_ADVANCE_STEP,
    }
}

fn yes_press(yes: &Timeline) -> Gen7Press {
    Gen7Press {
        advance: yes.advance(),
        wait_steps: STEPS_FROM_KUKUI_A_TO_YES_NO + yes.steps_since_start(),
    }
}

fn target_press(opts: &Gen7UsumStarterPlanOpts, steps_after_yes: u32) -> Gen7Press {
    Gen7Press {
        advance: opts.target_advance,
        wait_steps: steps_after_yes,
    }
}

/// Returns a list with one item so it can run in `multiWorkerRngTools`.
#[wasm_bindgen]
pub fn gen7_usum_starter_plan(opts: Gen7UsumStarterPlanOpts) -> Vec<Gen7UsumStarterPlan> {
    vec![plan(&opts)]
}

#[cfg(test)]
mod test {
    use super::*;
    use crate::PkmFilter;
    use crate::gen7::test_utils::step_to_advance;
    use crate::gen7::{
        Gen7Gift, Gen7UsumStarterSearchOpts, MAX_SAFE_SCAN, gen7_search_usum_starters,
        generate_gift, next_safe_advances,
    };

    const SEED: u32 = 0x58507f4f;
    const SAFE_ADVANCE: usize = 7937;

    fn starter_from_presses(presses: &Gen7UsumStarterPresses) -> Gen7Gift {
        let mut kukui = kukui_timeline(SEED, SAFE_ADVANCE);
        step_to_advance(&mut kukui, presses.kukui_a.advance);
        assert_eq!(
            kukui.current().steps_since_start,
            LAST_NEXT_ADVANCE_STEP + presses.kukui_a.wait_steps
        );

        let mut yes_no = yes_no_timeline(kukui);
        step_to_advance(&mut yes_no, presses.yes.advance);
        assert_eq!(
            STEPS_FROM_KUKUI_A_TO_YES_NO + yes_no.current().steps_since_start,
            presses.yes.wait_steps
        );

        let mut after_yes = after_yes_timeline(yes_no);
        step_to_advance(&mut after_yes, presses.target.advance);
        assert_eq!(
            after_yes.current().steps_since_start,
            presses.target.wait_steps
        );
        generate_gift(after_yes, 0, &STARTER_GIFT)
    }

    fn in_game_target() -> Gen7Gift {
        let mut kukui = kukui_timeline(SEED, SAFE_ADVANCE);
        step_to_advance(&mut kukui, 8379);
        let mut yes_no = yes_no_timeline(kukui);
        step_to_advance(&mut yes_no, 8780);
        let mut after_yes = after_yes_timeline(yes_no);
        step_to_advance(&mut after_yes, 9843);
        generate_gift(after_yes, 0, &STARTER_GIFT)
    }

    fn opts_for(target: &Gen7Gift) -> Gen7UsumStarterPlanOpts {
        Gen7UsumStarterPlanOpts {
            seed: SEED,
            safe_advance: SAFE_ADVANCE,
            target_advance: target.advance,
            delay_advances: target.delay_advances,
        }
    }

    fn plan_for(target: &Gen7Gift) -> Gen7UsumStarterPlan {
        plan(&opts_for(target))
    }

    #[test]
    fn next_advances_follow_kukuis_dialogue() {
        let target = in_game_target();
        assert_eq!(
            plan_for(&target).next_advances,
            vec![7939, 7941, 7943, 7945, 7947]
        );
    }

    #[test]
    fn presses_reach_the_in_game_target() {
        let target = in_game_target();
        let presses = plan_for(&target).presses.unwrap();
        assert_eq!(starter_from_presses(&presses), target);
    }

    #[test]
    fn kukui_a_comes_after_the_next_advances() {
        let target = in_game_target();
        let presses = plan_for(&target).presses.unwrap();
        assert!(presses.kukui_a.wait_steps > 0);
    }

    #[test]
    fn yes_leaves_time_on_yes_no() {
        let target = in_game_target();
        let presses = plan_for(&target).presses.unwrap();
        assert!(
            presses.yes.wait_steps >= STEPS_FROM_KUKUI_A_TO_YES_NO + MIN_STEPS_FROM_YES_NO_TO_YES
        );
    }

    #[test]
    fn target_before_the_safe_advance_is_unreachable() {
        let plan = plan(&Gen7UsumStarterPlanOpts {
            seed: SEED,
            safe_advance: SAFE_ADVANCE,
            target_advance: SAFE_ADVANCE - 1,
            delay_advances: 12,
        });
        assert_eq!(plan.presses, None);
    }

    #[test]
    fn wrong_delay_is_unreachable() {
        let target = in_game_target();
        let plan = plan(&Gen7UsumStarterPlanOpts {
            seed: SEED,
            safe_advance: SAFE_ADVANCE,
            target_advance: target.advance,
            delay_advances: 0,
        });
        assert_eq!(plan.presses, None);
    }

    fn uncached_kukui_a_and_yes_advances(target: &Gen7Gift) -> Option<(usize, usize)> {
        let opts = opts_for(target);
        let mut kukui = kukui_timeline(SEED, SAFE_ADVANCE);

        kukui.skip_steps(FIRST_KUKUI_A_STEP);
        for _ in 0..KUKUI_A_STEPS_TO_TRY {
            let mut fresh_cache = StepsAfterYesCache::default();
            if let Some(presses) = presses_after_kukui_a(&kukui, &opts, &mut fresh_cache) {
                return Some((presses.kukui_a.advance, presses.yes.advance));
            }
            kukui.step();
        }

        None
    }

    #[test]
    fn cache_matches_uncached_search() {
        let target = in_game_target();
        let presses = plan_for(&target).presses.unwrap();
        assert_eq!(
            uncached_kukui_a_and_yes_advances(&target),
            Some((presses.kukui_a.advance, presses.yes.advance))
        );
    }

    #[test]
    fn presses_reach_searched_targets() {
        let first_target_advance = SAFE_ADVANCE + 2500;
        let targets = gen7_search_usum_starters(Gen7UsumStarterSearchOpts {
            seed: SEED,
            tsv: 0,
            current_advance: SAFE_ADVANCE,
            first_target_advance,
            last_target_advance: first_target_advance + 200,
            filter: PkmFilter::new_allow_all(),
        });

        assert!(targets.len() > 100);
        for target in targets.iter().step_by(20) {
            let presses = plan_for(target).presses.unwrap();
            assert_eq!(&starter_from_presses(&presses), target);
        }
    }

    #[test]
    fn safe_advances_use_kukuis_dialogue() {
        let opts = Gen7UsumStarterSafeAdvancesOpts {
            seed: SEED,
            current_advance: 7000,
            from_advance: 7000,
            safe_advance_count: 5,
        };
        let expected = next_safe_advances(SEED, 2, 7000, 7000, 5, MAX_SAFE_SCAN).unwrap();
        let advances: Vec<usize> = gen7_usum_starter_safe_advances(opts)
            .into_iter()
            .map(|safe_advance| safe_advance.advance)
            .collect();
        assert_eq!(advances, expected);
    }
}
