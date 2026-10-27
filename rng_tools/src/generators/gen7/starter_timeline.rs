use super::usum_gift_search::UsumGift;
use super::{GiftSettings, Timeline, model_count_from_npcs};
use crate::rng::{GetRand, Rng};
use crate::{GenderRatio, Nature};
use std::ops::RangeInclusive;

/// Kukui's dialogue before "choose this starter?" ("Go on and choose the one
/// you'd like to keep as your partner, cousin!") has the player and 1 NPC.
pub(super) const KUKUI_DIALOGUE_NPCS: u8 = 1;
pub(super) const KUKUI_DIALOGUE_MODELS: usize = model_count_from_npcs(KUKUI_DIALOGUE_NPCS);

/// Steps after pressing A on Kukui's dialogue until the camera cuts to the
/// Yes/No screen and the NPC freezes.
pub(super) const STEPS_FROM_KUKUI_A_TO_YES_NO: u32 = 93;

/// The Yes/No box shows up a while after the camera cuts to it. Yes came
/// 230+ advances after the cut in game, plus 10 seconds (300 steps of 2/60 s)
/// so the user has time to step to the Yes advance.
pub(super) const MIN_STEPS_FROM_YES_NO_TO_YES: u32 = 230 + 300;

/// The NPC stays frozen on the Yes/No screen until Yes is pressed.
const YES_NO_NPC_FROZEN_STEPS: &[RangeInclusive<u32>] = &[1..=u32::MAX];

/// Steps after Yes that the NPC is frozen on. It appears on step 33 and
/// first runs on step 34, then the camera cuts away from it twice on
/// "You chose xxx!".
const AFTER_YES_NPC_FROZEN_STEPS: &[RangeInclusive<u32>] = &[1..=33, 189..=190, 244..=303];

/// The earliest A presses were measured at 675 and 692 steps after Yes.
const MIN_STEPS_AFTER_YES: u32 = 700;
const MAX_STEPS_AFTER_YES: u32 = 1500;
pub(super) const MAX_ADVANCES_AFTER_YES: usize =
    KUKUI_DIALOGUE_MODELS * MAX_STEPS_AFTER_YES as usize;

pub(super) const STARTER_GIFT: GiftSettings = GiftSettings {
    steps_from_a_press_to_generation: 12,
    gender_ratio: GenderRatio::OneToSeven,
    // Starters can't be synchronized.
    sync_nature: None,
};

pub(super) struct UsumStarter;

pub(super) const MIN_ADVANCES_TO_YES: usize = KUKUI_DIALOGUE_MODELS
    * STEPS_FROM_KUKUI_A_TO_YES_NO as usize
    + MIN_STEPS_FROM_YES_NO_TO_YES as usize;

impl UsumGift for UsumStarter {
    const MODELS: usize = KUKUI_DIALOGUE_MODELS;
    const MIN_START_ADVANCE: usize = 478;
    const MIN_ADVANCES_TO_START: usize = MIN_ADVANCES_TO_YES;
    const MIN_ADVANCES_AFTER_START: usize = 0;
    const MAX_ADVANCES_AFTER_START: usize = MAX_ADVANCES_AFTER_YES;

    fn after_start_timeline(yes_no: Timeline) -> Timeline {
        after_yes_timeline(yes_no)
    }

    fn skip_to_first_a_press(after_yes: &mut Timeline) {
        skip_to_first_starter_a_press(after_yes);
    }

    fn can_press_a(after_yes: &Timeline, last_advance: usize) -> bool {
        can_press_a_on_starter(after_yes, last_advance)
    }

    fn step_to_next_a_press(after_yes: &mut Timeline) {
        after_yes.step();
    }

    fn settings(_sync_nature: Option<Nature>) -> GiftSettings {
        STARTER_GIFT
    }
}

pub(super) fn kukui_timeline(seed: u32, safe_advance: usize) -> Timeline {
    Timeline::new(seed, KUKUI_DIALOGUE_MODELS, safe_advance)
}

/// Starts from A pressed on `kukui`'s current step.
pub(super) fn yes_no_timeline<R: Rng + GetRand<u64>>(mut kukui: Timeline<R>) -> Timeline<R> {
    kukui.skip_steps(STEPS_FROM_KUKUI_A_TO_YES_NO);
    kukui.start_next_scene(YES_NO_NPC_FROZEN_STEPS)
}

/// Starts from Yes pressed on `yes_no`'s current step.
pub(super) fn after_yes_timeline<R: Rng + GetRand<u64>>(yes_no: Timeline<R>) -> Timeline<R> {
    yes_no.start_next_scene(AFTER_YES_NPC_FROZEN_STEPS)
}

pub(super) fn skip_to_first_starter_a_press<R: Rng + GetRand<u64>>(after_yes: &mut Timeline<R>) {
    after_yes.skip_steps(MIN_STEPS_AFTER_YES);
}

pub(super) fn can_press_a_on_starter<R: Rng + GetRand<u64>>(
    after_yes: &Timeline<R>,
    last_advance: usize,
) -> bool {
    after_yes.can_press_a(MAX_STEPS_AFTER_YES, last_advance)
}

#[cfg(test)]
mod test {
    use super::*;
    use crate::gen7::test_utils::{NO_BLINK, step_to_advance};
    use crate::gen7::{ModelState, NpcModel, TimelineStep, generate_gift};
    use crate::rng::{Rng, sfmt::Sfmt};
    use crate::test_utils::FakeRng;
    use crate::{Gender, Ivs, Nature, TsvTrv};

    const IDLE: ModelState = ModelState::Idle;

    fn cooldown(steps_left: u8) -> ModelState {
        ModelState::Cooldown { steps_left }
    }

    fn blinking(steps_left: u8) -> ModelState {
        ModelState::Blinking { steps_left }
    }

    fn after_yes(seed: u32, yes_advance: usize, npc: ModelState) -> Timeline {
        let mut rng = Sfmt::new(seed);
        rng.advance(yes_advance);
        let npcs = NpcModel::from_states(vec![IDLE, npc]);
        after_yes_timeline(Timeline::from_npcs(rng, npcs, yes_advance))
    }

    fn distinct_advances(timeline: &Timeline, count: usize) -> Vec<usize> {
        let mut advances: Vec<usize> = timeline
            .clone()
            .map(|step| step.advance)
            .take(count * 40)
            .collect();
        advances.dedup();
        advances.truncate(count);
        advances
    }

    fn advance_at_step(timeline: &Timeline, step: usize) -> usize {
        timeline.clone().nth(step).unwrap().advance
    }

    fn steps_on(timeline: &Timeline, advance: usize) -> usize {
        timeline
            .clone()
            .skip_while(|step| step.advance < advance)
            .take_while(|step| step.advance == advance)
            .count()
    }

    fn every_other(from: usize, to: usize) -> impl Iterator<Item = usize> {
        (from..=to).step_by(2)
    }

    #[test]
    fn matches_in_game_run_58507f4f() {
        let mut kukui = kukui_timeline(0x58507f4f, 7937);
        step_to_advance(&mut kukui, 8379);

        let mut yes_no = yes_no_timeline(kukui);
        assert_eq!(yes_no.current().advance, 8513);
        assert_eq!(yes_no.npcs().last_npc(), Some(cooldown(15)));

        assert_eq!(steps_on(&yes_no, 8538), 5);
        assert_eq!(steps_on(&yes_no, 8539), 36);
        assert_eq!(steps_on(&yes_no, 8649), 5);
        assert_eq!(steps_on(&yes_no, 8650), 30);
        step_to_advance(&mut yes_no, 8780);

        let mut after_yes = after_yes_timeline(yes_no);
        assert_eq!(advance_at_step(&after_yes, 33), 8813);
        let mut expected: Vec<usize> = (8813..=8827).chain(every_other(8829, 8849)).collect();
        expected.push(8850);
        let mut appears = after_yes.clone();
        appears.skip_steps(33);
        assert_eq!(distinct_advances(&appears, expected.len()), expected);

        assert_eq!(advance_at_step(&after_yes, 243), 9139);
        assert_eq!(advance_at_step(&after_yes, 303), 9199);
        let mut second_cut = after_yes.clone();
        second_cut.skip_steps(243);
        let expected: Vec<usize> = (9139..=9199).chain(every_other(9201, 9221)).collect();
        assert_eq!(distinct_advances(&second_cut, expected.len()), expected);

        step_to_advance(&mut after_yes, 9843);
        let starter = generate_gift(after_yes, TsvTrv::default(), &STARTER_GIFT);
        assert_eq!(starter.nature, Nature::Relaxed);
        assert_eq!(starter.gender, Gender::Male);
        assert_eq!(starter.ivs, Ivs::new(19, 28, 17, 30, 6, 30));
    }

    #[test]
    fn matches_in_game_run_2d9ac66c() {
        let kukui = kukui_timeline(0x2d9ac66c, 8241);
        let expected: Vec<usize> = every_other(8241, 8293)
            .chain(8294..=8297)
            .chain(8299..=8328)
            .chain(every_other(8330, 8394))
            .collect();
        assert_eq!(distinct_advances(&kukui, expected.len()), expected);

        let mut yes_no = yes_no_timeline(kukui);
        assert_eq!(yes_no.current().advance, 8394);
        assert_eq!(yes_no.npcs().last_npc(), Some(IDLE));
        assert_eq!(
            distinct_advances(&yes_no, 7),
            (8394..=8400).collect::<Vec<_>>()
        );
        step_to_advance(&mut yes_no, 8624);

        let mut after_yes = after_yes_timeline(yes_no);
        after_yes.skip_steps(33);
        let expected: Vec<usize> = every_other(8657, 8683)
            .chain(8684..=8687)
            .chain(8689..=8695)
            .collect();
        assert_eq!(distinct_advances(&after_yes, expected.len()), expected);
    }

    #[test]
    fn matches_in_game_run_ae1f5145() {
        let after_yes = after_yes(0xae1f5145, 9584, IDLE);
        assert_eq!(advance_at_step(&after_yes, 33), 9617);
        let expected: Vec<usize> = every_other(9617, 9669).collect();
        let mut appears = after_yes.clone();
        appears.skip_steps(33);
        assert_eq!(distinct_advances(&appears, expected.len()), expected);

        let mut later = after_yes.clone();
        step_to_advance(&mut later, 9780);
        let expected: Vec<usize> = [9780, 9781]
            .into_iter()
            .chain(9783..=9816)
            .chain(every_other(9818, 9864))
            .chain(9865..=9924)
            .chain(every_other(9926, 9960))
            .collect();
        assert_eq!(distinct_advances(&later, expected.len()), expected);
    }

    #[test]
    fn matches_in_game_run_ed2d6291() {
        let after_yes = after_yes(0xed2d6291, 8593, cooldown(8));
        let mut appears = after_yes.clone();
        appears.skip_steps(33);
        let expected: Vec<usize> = (8626..=8633).chain(every_other(8635, 8651)).collect();
        assert_eq!(distinct_advances(&appears, expected.len()), expected);

        let mut first_cut = after_yes.clone();
        step_to_advance(&mut first_cut, 8923);
        assert_eq!(
            distinct_advances(&first_cut, 8),
            vec![8923, 8925, 8927, 8929, 8930, 8931, 8933, 8935]
        );

        assert_eq!(advance_at_step(&after_yes, 243), 9026);
        assert_eq!(advance_at_step(&after_yes, 303), 9059);
        assert_eq!(steps_on(&after_yes, 9026), 29);

        let mut checkpoint = after_yes.clone();
        checkpoint.skip_steps(1000);
        let expected: Vec<usize> = (10196..=10210).chain([10212]).collect();
        assert_eq!(distinct_advances(&checkpoint, expected.len()), expected);
    }

    #[test]
    fn matches_in_game_run_254e845f() {
        let after_yes = after_yes(0x254e845f, 8063, cooldown(13));
        let mut appears = after_yes.clone();
        appears.skip_steps(33);
        assert_eq!(
            distinct_advances(&appears, 12),
            (8096..=8107).collect::<Vec<_>>()
        );

        for expected in [
            vec![8340, 8342, 8344, 8346, 8347, 8348, 8349, 8350, 8352],
            vec![
                8381, 8382, 8383, 8385, 8387, 8389, 8391, 8392, 8393, 8394, 8395, 8397,
            ],
            (8462..=8474).collect(),
            vec![8519, 8521, 8523, 8525, 8527, 8528, 8529, 8530, 8531, 8533],
        ] {
            let mut from = after_yes.clone();
            step_to_advance(&mut from, expected[0]);
            assert_eq!(distinct_advances(&from, expected.len()), expected);
        }
    }

    /// `(advances per step, from, to)` for the first step of each run of
    /// steps that use the same number of advances.
    fn delta_runs(timeline: &Timeline, steps: usize) -> Vec<(usize, usize, usize)> {
        let advances: Vec<usize> = timeline
            .clone()
            .take(steps + 1)
            .map(|step| step.advance)
            .collect();
        let mut runs: Vec<(usize, usize, usize)> = vec![];
        for pair in advances.windows(2) {
            let delta = pair[1] - pair[0];
            if runs.last().is_none_or(|run| run.0 != delta) {
                runs.push((delta, pair[0], pair[1]));
            }
        }
        runs
    }

    #[test]
    fn matches_in_game_run_768ba16d() {
        let after_yes = after_yes(0x768ba16d, 12424, blinking(4));
        assert_eq!(advance_at_step(&after_yes, 33), 12457);
        assert_eq!(
            delta_runs(&after_yes, 80),
            vec![
                (1, 12424, 12425),
                (2, 12460, 12462),
                (1, 12462, 12463),
                (2, 12497, 12499),
            ]
        );
    }

    #[test]
    fn matches_in_game_run_e8193a45() {
        let after_yes = after_yes(0xe8193a45, 7680, blinking(4));
        assert_eq!(advance_at_step(&after_yes, 33), 7713);
        assert_eq!(
            delta_runs(&after_yes, 120),
            vec![
                (1, 7680, 7681),
                (2, 7716, 7718),
                (1, 7718, 7719),
                (2, 7753, 7755),
                (1, 7847, 7848),
            ]
        );
    }

    #[test]
    fn player_only_until_the_npc_appears() {
        let npcs = NpcModel::from_states(vec![IDLE, blinking(4)]);
        let yes_no = Timeline::from_npcs(FakeRng::new(&[NO_BLINK; 40]), npcs, 100);
        let mut after_yes = after_yes_timeline(yes_no);
        let steps: Vec<TimelineStep> = after_yes.by_ref().take(37).collect();

        // The NPC first runs on step 34, mid-blink, until its blink ends on step 37.
        let advances: Vec<usize> = steps.iter().map(|step| step.advance).collect();
        assert_eq!(advances, (100..=136).collect::<Vec<_>>());
        assert_eq!(steps[36].steps_since_start, 36);

        assert_eq!(
            after_yes.next(),
            Some(TimelineStep {
                advance: 138,
                steps_since_start: 37
            })
        );
    }

    #[test]
    fn yes_no_freezes_the_npc() {
        let kukui = Timeline::from_npcs(FakeRng::new(&[NO_BLINK; 400]), NpcModel::new(2), 100);
        let mut yes_no = yes_no_timeline(kukui);
        let yes_no_advance = 100 + STEPS_FROM_KUKUI_A_TO_YES_NO as usize * 2;

        assert_eq!(yes_no.current().advance, yes_no_advance);
        yes_no.step();
        assert_eq!(yes_no.current().advance, yes_no_advance + 1);
    }
}
