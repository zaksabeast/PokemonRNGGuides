use crate::rng::GetRand;

/// The player is always on screen, so it counts as one model on top of the NPCs.
pub fn model_count_from_npcs(npc_count: u8) -> usize {
    npc_count as usize + 1
}

pub(super) const BLINK_STEPS: u8 = 5;
pub(super) const LONG_COOLDOWN_STEPS: u8 = 36;
pub(super) const SHORT_COOLDOWN_STEPS: u8 = 30;

/// An idle model blinks when the low 7 bits of its rand are all 0.
pub(super) fn starts_blink(rand: u64) -> bool {
    rand & 0x7f == 0
}

pub(super) fn has_long_cooldown(rand: u64) -> bool {
    rand.is_multiple_of(3)
}

#[derive(Clone, Copy, Debug, PartialEq, Eq)]
enum ModelState {
    /// Uses an RNG advance each step to check for a blink.
    Idle,
    /// Uses an RNG advance on the step `steps_left` reaches 0 to pick the cooldown.
    Blinking { steps_left: u8 },
    /// Uses an RNG advance on the step `steps_left` reaches 0 to check for a blink.
    Cooldown { steps_left: u8 },
}

impl ModelState {
    /// Returns how many RNG advances the step used.
    fn step<R: GetRand<u64>>(&mut self, rng: &mut R) -> usize {
        match self {
            Self::Blinking { steps_left } | Self::Cooldown { steps_left } if *steps_left > 1 => {
                *steps_left -= 1;
                0
            }
            Self::Blinking { .. } => {
                let steps_left = if has_long_cooldown(rng.get()) {
                    LONG_COOLDOWN_STEPS
                } else {
                    SHORT_COOLDOWN_STEPS
                };
                *self = Self::Cooldown { steps_left };
                1
            }
            Self::Idle | Self::Cooldown { .. } => {
                *self = if starts_blink(rng.get()) {
                    Self::Blinking {
                        steps_left: BLINK_STEPS,
                    }
                } else {
                    Self::Idle
                };
                1
            }
        }
    }
}

/// Blink state of every character model on screen.
///
/// Each step (one video frame step in PokeReader), every idle model uses one
/// RNG advance to decide if it blinks, so NPCs move the RNG forward by a
/// varying number of advances per step.
#[derive(Clone, Debug, PartialEq, Eq)]
pub struct NpcModel {
    models: Vec<ModelState>,
}

impl NpcModel {
    pub fn new(model_count: usize) -> Self {
        Self {
            models: vec![ModelState::Idle; model_count],
        }
    }

    /// Returns how many RNG advances the step used.
    pub fn step<R: GetRand<u64>>(&mut self, rng: &mut R) -> usize {
        self.models.iter_mut().map(|model| model.step(rng)).sum()
    }
}

#[cfg(test)]
mod test {
    use super::*;
    use std::collections::VecDeque;

    struct FakeRng {
        values: VecDeque<u64>,
    }

    impl FakeRng {
        fn new(values: &[u64]) -> Self {
            Self {
                values: values.iter().copied().collect(),
            }
        }
    }

    impl GetRand<u64> for FakeRng {
        fn get(&mut self) -> u64 {
            self.values.pop_front().expect("ran out of fake rands")
        }
    }

    // Low 7 bits are not all 0, so an idle model doesn't blink.
    const NO_BLINK: u64 = 0b0000_0001;
    // Low 7 bits are all 0, so an idle model blinks.
    const BLINK: u64 = 0b1000_0000;

    #[test]
    fn player_counts_as_a_model() {
        assert_eq!(model_count_from_npcs(0), 1);
        assert_eq!(model_count_from_npcs(3), 4);
    }

    const IDLE: ModelState = ModelState::Idle;

    fn blinking(steps_left: u8) -> ModelState {
        ModelState::Blinking { steps_left }
    }

    fn cooldown(steps_left: u8) -> ModelState {
        ModelState::Cooldown { steps_left }
    }

    #[test]
    fn idle_models_use_one_advance_each() {
        let mut npcs = NpcModel::new(4);
        let mut rng = FakeRng::new(&[NO_BLINK; 8]);

        assert_eq!(npcs.step(&mut rng), 4);
        assert_eq!(npcs.step(&mut rng), 4);
        assert_eq!(npcs.models, vec![IDLE; 4]);
    }

    #[test]
    fn blink_cycle_long_cooldown() {
        let mut npcs = NpcModel::new(1);
        // Blink, then a cooldown rand divisible by 3, then idle again.
        let mut rng = FakeRng::new(&[BLINK, 3, NO_BLINK]);

        assert_eq!(npcs.step(&mut rng), 1);
        assert_eq!(npcs.models, vec![blinking(5)]);

        for _ in 0..4 {
            assert_eq!(npcs.step(&mut rng), 0);
        }
        assert_eq!(npcs.models, vec![blinking(1)]);

        // The blink ends and the cooldown is picked.
        assert_eq!(npcs.step(&mut rng), 1);
        assert_eq!(npcs.models, vec![cooldown(36)]);

        for _ in 0..35 {
            assert_eq!(npcs.step(&mut rng), 0);
        }
        assert_eq!(npcs.models, vec![cooldown(1)]);

        // The cooldown ends and the model checks for a blink.
        assert_eq!(npcs.step(&mut rng), 1);
        assert_eq!(npcs.models, vec![IDLE]);
    }

    #[test]
    fn blink_cycle_short_cooldown() {
        let mut npcs = NpcModel::new(1);
        let mut rng = FakeRng::new(&[BLINK, 1]);

        npcs.step(&mut rng);
        for _ in 0..4 {
            npcs.step(&mut rng);
        }
        assert_eq!(npcs.step(&mut rng), 1);
        assert_eq!(npcs.models, vec![cooldown(30)]);
    }

    #[test]
    fn blinking_model_skips_its_advance() {
        let mut npcs = NpcModel::new(3);
        // Model 1 blinks; models 0 and 2 stay idle.
        let mut rng = FakeRng::new(&[NO_BLINK, BLINK, NO_BLINK, NO_BLINK, NO_BLINK]);

        assert_eq!(npcs.step(&mut rng), 3);
        assert_eq!(npcs.models, vec![IDLE, blinking(5), IDLE]);

        // Only the two idle models use advances while model 1 blinks.
        assert_eq!(npcs.step(&mut rng), 2);
        assert_eq!(npcs.models, vec![IDLE, blinking(4), IDLE]);
    }
}
