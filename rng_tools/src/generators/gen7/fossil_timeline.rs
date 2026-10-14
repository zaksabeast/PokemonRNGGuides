use super::{GiftSettings, Timeline, model_count_from_npcs};
use crate::GenderRatio;
use crate::rng::{GetRand, Rng};

/// The last dialogue before "You received xxx!" ("This here is xxx! You'd
/// better take right good care of it!") has the player and 1 NPC.
const FOSSIL_DIALOGUE_NPCS: u8 = 1;
pub(super) const FOSSIL_DIALOGUE_MODELS: usize = model_count_from_npcs(FOSSIL_DIALOGUE_NPCS);

/// "You received xxx!" takes A about 300 advances (150 steps) after the A
/// press on the dialogue, plus 10 seconds (300 steps of 2/60 s) so the user
/// has time to step to the target.
const MIN_STEPS_AFTER_DIALOGUE_A: u32 = 150 + 300;
const MAX_STEPS_AFTER_DIALOGUE_A: u32 = 1800;
/// The A press on the dialogue uses one advance on top of the models'.
pub(super) const MAX_ADVANCES_AFTER_DIALOGUE_A: usize =
    FOSSIL_DIALOGUE_MODELS * MAX_STEPS_AFTER_DIALOGUE_A as usize + 1;

/// Without a Synchronize lead. `with_sync_nature` sets the lead's nature.
pub(super) const FOSSIL_GIFT: GiftSettings = GiftSettings {
    steps_from_a_press_to_generation: 15,
    // Every USUM fossil is 87.5% male.
    gender_ratio: GenderRatio::OneToSeven,
    sync_nature: None,
};

pub(super) fn fossil_dialogue_timeline(seed: u32, safe_advance: usize) -> Timeline {
    Timeline::new(seed, FOSSIL_DIALOGUE_MODELS, safe_advance)
}

/// Starts from A pressed on `dialogue`'s current step. The NPC keeps
/// running through "You received xxx!", and steps count from the press.
pub(super) fn after_dialogue_a_timeline<R: Rng + GetRand<u64>>(
    dialogue: Timeline<R>,
) -> Timeline<R> {
    let mut after_dialogue_a = dialogue.start_next_scene(&[]);
    after_dialogue_a.leap_dialogue();
    after_dialogue_a
}

pub(super) fn skip_to_first_fossil_a_press<R: Rng + GetRand<u64>>(
    after_dialogue_a: &mut Timeline<R>,
) {
    let last_step_before = MIN_STEPS_AFTER_DIALOGUE_A - 1;
    let steps_left = last_step_before.saturating_sub(after_dialogue_a.steps_since_start());
    after_dialogue_a.skip_steps(steps_left);
    after_dialogue_a.step_to_next_advance();
}

pub(super) fn can_press_a_on_fossil<R: Rng + GetRand<u64>>(
    after_dialogue_a: &Timeline<R>,
    last_advance: usize,
) -> bool {
    after_dialogue_a.can_press_a(MAX_STEPS_AFTER_DIALOGUE_A, last_advance)
}

#[cfg(test)]
mod test {
    use super::*;
    use crate::Nature;
    use crate::gen7::test_utils::{BLINK, NO_BLINK};
    use crate::gen7::{NpcModel, generate_gift};
    use crate::test_utils::FakeRng;

    const DIALOGUE_A_ADVANCE: usize = 1000;
    /// Three steps of two idle models, plus the A press's own advance.
    const DIALOGUE_A_ADVANCES: usize = 3 * FOSSIL_DIALOGUE_MODELS + 1;

    fn after_dialogue_a(rands: &[u64]) -> Timeline<FakeRng> {
        let npcs = NpcModel::new(FOSSIL_DIALOGUE_MODELS);
        let dialogue = Timeline::from_npcs(FakeRng::new(rands), npcs, DIALOGUE_A_ADVANCE);
        after_dialogue_a_timeline(dialogue)
    }

    #[test]
    fn dialogue_has_the_player_and_one_npc() {
        let advances: Vec<usize> = fossil_dialogue_timeline(0xdeadbeef, 1000)
            .take(4)
            .map(|step| step.advance)
            .collect();
        assert_eq!(advances, vec![1000, 1002, 1004, 1006]);
    }

    #[test]
    fn dialogue_a_uses_one_extra_advance() {
        let after_dialogue_a = after_dialogue_a(&[NO_BLINK; DIALOGUE_A_ADVANCES]);
        assert_eq!(
            after_dialogue_a.advance(),
            DIALOGUE_A_ADVANCE + DIALOGUE_A_ADVANCES
        );
    }

    #[test]
    fn steps_count_from_the_dialogue_a_press() {
        let mut dialogue = Timeline::from_npcs(
            FakeRng::new(&[NO_BLINK; 40]),
            NpcModel::new(FOSSIL_DIALOGUE_MODELS),
            0,
        );
        dialogue.skip_steps(10);
        assert_eq!(after_dialogue_a_timeline(dialogue).steps_since_start(), 3);
    }

    #[test]
    fn npc_keeps_running_after_dialogue_a() {
        let mut rands = vec![NO_BLINK; DIALOGUE_A_ADVANCES];
        // The player, then the NPC blinks. Only the player uses advances
        // on the next four steps.
        rands.extend([NO_BLINK, BLINK]);
        rands.extend([NO_BLINK; 4]);
        let mut after_dialogue_a = after_dialogue_a(&rands);
        let after_press = after_dialogue_a.advance();

        after_dialogue_a.step();
        assert_eq!(after_dialogue_a.advance(), after_press + 2);
        after_dialogue_a.skip_steps(4);
        assert_eq!(after_dialogue_a.advance(), after_press + 6);
    }

    #[test]
    fn first_a_press_leaves_time_for_the_final_screen() {
        let mut after_dialogue_a = after_dialogue_a(&[NO_BLINK; 2000]);
        skip_to_first_fossil_a_press(&mut after_dialogue_a);
        assert_eq!(
            after_dialogue_a.steps_since_start(),
            MIN_STEPS_AFTER_DIALOGUE_A
        );
    }

    #[test]
    fn a_presses_stop_at_the_last_advance_or_step() {
        let mut after_dialogue_a = after_dialogue_a(&[NO_BLINK; 4000]);
        skip_to_first_fossil_a_press(&mut after_dialogue_a);
        let advance = after_dialogue_a.advance();

        assert!(can_press_a_on_fossil(&after_dialogue_a, advance));
        assert!(!can_press_a_on_fossil(&after_dialogue_a, advance - 1));

        after_dialogue_a.skip_steps(MAX_STEPS_AFTER_DIALOGUE_A - MIN_STEPS_AFTER_DIALOGUE_A);
        assert!(can_press_a_on_fossil(&after_dialogue_a, usize::MAX));
        assert_eq!(
            after_dialogue_a.advance(),
            DIALOGUE_A_ADVANCE + MAX_ADVANCES_AFTER_DIALOGUE_A
        );
        after_dialogue_a.step();
        assert!(!can_press_a_on_fossil(&after_dialogue_a, usize::MAX));
    }

    #[test]
    fn fossils_generate_fifteen_steps_after_the_a_press() {
        let rands = vec![NO_BLINK; DIALOGUE_A_ADVANCES + 15 * FOSSIL_DIALOGUE_MODELS + 11];
        let fossil = generate_gift(after_dialogue_a(&rands), 0, &FOSSIL_GIFT);
        assert_eq!(fossil.delay_advances, 15 * FOSSIL_DIALOGUE_MODELS);
    }

    #[test]
    fn fossils_take_the_leads_synchronize_nature() {
        let rands = vec![NO_BLINK; DIALOGUE_A_ADVANCES + 15 * FOSSIL_DIALOGUE_MODELS + 10];
        let settings = FOSSIL_GIFT.with_sync_nature(Some(Nature::Jolly));
        let fossil = generate_gift(after_dialogue_a(&rands), 0, &settings);
        assert_eq!(fossil.nature, Nature::Jolly);
    }
}
