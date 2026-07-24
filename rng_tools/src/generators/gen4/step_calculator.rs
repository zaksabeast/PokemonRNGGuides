use crate::gen4::game_logic::{DpptLogic, GameSpecificLogic};
use crate::rng::{Rng, lcrng::Pokerng};
use serde::{Deserialize, Serialize};
use tsify::Tsify;
use wasm_bindgen::prelude::*;

#[derive(Debug, Clone, Copy, PartialEq, Eq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub enum EncounterAbilityEffect {
    /// No effect on encounter rate.
    None,
    /// Halves the rate (White Smoke, Quick Feet, Stench, Sand Veil during sand, Snow Cloak during snow).
    Half,
    /// Doubles the rate (Arena Trap, No Guard, Illuminate).
    Double,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub enum EncounterFlute {
    None,
    /// +50% encounter rate.
    White,
    /// -50% encounter rate.
    Black,
}

/// Held item on the lead.
#[derive(Debug, Clone, Copy, PartialEq, Eq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub enum EncounterItem {
    None,
    /// Cleanse Tag or Pure Incense: multiplies rate by 2/3.
    CleanseOrIncense,
}

/// Base terrain encounter rate.
#[derive(Debug, Clone, Copy, PartialEq, Eq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub enum EncounterTerrain {
    Grass,
    WaterOrCave,
}

impl EncounterTerrain {
    fn base_rate(self) -> u32 {
        match self {
            EncounterTerrain::Grass => 30,
            EncounterTerrain::WaterOrCave => 10,
        }
    }
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct StepSearchOpts {
    pub seed: u32,
    pub initial_advance: usize,
    pub current_cooldown_steps: u32,
    /// True for walking/surfing, false for biking/tall grass.
    pub is_walking: bool,
    pub terrain: EncounterTerrain,
    pub ability: EncounterAbilityEffect,
    pub flute: EncounterFlute,
    pub item: EncounterItem,
}

/// Result of walking forward from a seed until an encounter check succeeds.
#[derive(Debug, Clone, Copy, PartialEq, Eq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct StepSearchResult {
    /// Total steps consumed (cooldown + movement) before the encounter check passed.
    pub total_steps: usize,
    /// Movement-rate checks consumed, excluding cooldown steps.
    pub missing_steps: usize,
    /// Cooldown steps consumed before the cooldown ended.
    pub cooldown_steps: usize,
    /// LCRNG Seed right after the encounter check that triggered the hit.
    pub seed_after: u32,
    /// The final encounter_rate used for the search (post modifiers).
    pub encounter_rate: u32,
}

const DEFAULT_MAX_STEPS: usize = 200_000;

/// Cooldown length (in steps) derived from the effective encounter rate,
/// used to gate how soon a new random encounter check can occur after a step.
fn encounter_cooldown_steps(encounter_rate: u32) -> u32 {
    8 - (((encounter_rate << 8) / 10) >> 8)
}

/// Applies terrain, ability, flute, and item modifiers in sequence to derive the final encounter_rate
fn compute_encounter_rate(
    terrain: EncounterTerrain,
    ability: EncounterAbilityEffect,
    flute: EncounterFlute,
    item: EncounterItem,
) -> u32 {
    let mut rate = terrain.base_rate();

    rate = match ability {
        EncounterAbilityEffect::None => rate,
        EncounterAbilityEffect::Half => rate / 2,
        EncounterAbilityEffect::Double => rate * 2,
    };

    rate = match flute {
        EncounterFlute::None => rate,
        EncounterFlute::White => rate + rate / 2,
        EncounterFlute::Black => rate / 2,
    };

    rate = match item {
        EncounterItem::None => rate,
        EncounterItem::CleanseOrIncense => (rate * 2) / 3,
    };

    rate
}

/// Walks the RNG forward step-by-step until an encounter check passes or `DEFAULT_MAX_STEPS` is exceeded.
#[wasm_bindgen]
pub fn search_steps_to_encounter(opts: StepSearchOpts) -> Option<StepSearchResult> {
    let movement_rate: u32 = if opts.is_walking { 40 } else { 70 };
    let encounter_rate = compute_encounter_rate(opts.terrain, opts.ability, opts.flute, opts.item);
    let map_rate = encounter_cooldown_steps(encounter_rate);

    let mut rng = Pokerng::new(opts.seed);
    rng.jump(opts.initial_advance);

    let mut missing_steps = 0usize;
    let mut cooldown_steps = 0u32;
    let mut iterations = 0usize;

    while iterations < DEFAULT_MAX_STEPS {
        iterations += 1;
        let mut cooldown_ended = true;

        let cooldown_over = (cooldown_steps + opts.current_cooldown_steps) >= map_rate;

        if !cooldown_over {
            let check = DpptLogic::max(rng.rand(), 100u16) as u32;
            if check >= 5 {
                cooldown_steps += 1;
                cooldown_ended = false;
            }
        }

        if cooldown_ended {
            missing_steps += 1;
            let move_check = DpptLogic::max(rng.rand(), 100u16) as u32;
            if move_check >= movement_rate {
                continue;
            }

            let encounter_check = DpptLogic::max(rng.rand(), 100u16) as u32;
            if encounter_check < encounter_rate {
                return Some(StepSearchResult {
                    total_steps: missing_steps + cooldown_steps as usize,
                    missing_steps,
                    cooldown_steps: cooldown_steps as usize,
                    seed_after: rng.seed(),
                    encounter_rate,
                });
            }
        }
    }

    None
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn encounter_rate_no_modifiers() {
        let rate = compute_encounter_rate(
            EncounterTerrain::Grass,
            EncounterAbilityEffect::None,
            EncounterFlute::None,
            EncounterItem::None,
        );
        assert_eq!(rate, 30);
    }

    #[test]
    fn encounter_rate_half_white_item() {
        let rate = compute_encounter_rate(
            EncounterTerrain::Grass,
            EncounterAbilityEffect::Half,
            EncounterFlute::White,
            EncounterItem::CleanseOrIncense,
        );
        assert_eq!(rate, 14);
    }

    #[test]
    fn encounter_rate_double_black_flute() {
        let rate = compute_encounter_rate(
            EncounterTerrain::WaterOrCave,
            EncounterAbilityEffect::Double,
            EncounterFlute::Black,
            EncounterItem::None,
        );
        assert_eq!(rate, 10);
    }

    #[test]
    fn walking_no_modifiers() {
        let opts = StepSearchOpts {
            seed: 0x1234ABCD,
            initial_advance: 30,
            current_cooldown_steps: 0,
            is_walking: true,
            terrain: EncounterTerrain::Grass,
            ability: EncounterAbilityEffect::None,
            flute: EncounterFlute::None,
            item: EncounterItem::None,
        };

        let result = search_steps_to_encounter(opts).unwrap();

        assert_eq!(result.total_steps, 8);
        assert_eq!(result.encounter_rate, 30);
        assert_eq!(result.seed_after, 0x30292E64);
    }

    #[test]
    fn walking_all_modifiers() {
        let opts = StepSearchOpts {
            seed: 0x1234ABCD,
            initial_advance: 30,
            current_cooldown_steps: 3,
            is_walking: true,
            terrain: EncounterTerrain::Grass,
            ability: EncounterAbilityEffect::Double,
            flute: EncounterFlute::White,
            item: EncounterItem::CleanseOrIncense,
        };

        let result = search_steps_to_encounter(opts).unwrap();

        assert_eq!(result.total_steps, 3);
        assert_eq!(result.encounter_rate, 60);
        assert_eq!(result.seed_after, 0x0EA41E1F);
    }

    #[test]
    fn biking_no_modifiers_in_cave() {
        let opts = StepSearchOpts {
            seed: 0x1234ABCD,
            initial_advance: 30,
            current_cooldown_steps: 0,
            is_walking: false,
            terrain: EncounterTerrain::WaterOrCave,
            ability: EncounterAbilityEffect::None,
            flute: EncounterFlute::None,
            item: EncounterItem::None,
        };

        let result = search_steps_to_encounter(opts).unwrap();

        assert_eq!(result.total_steps, 12);
        assert_eq!(result.encounter_rate, 10);
        assert_eq!(result.seed_after, 0x038EC132);
    }

    #[test]
    fn biking_all_modifiers_in_cave() {
        let opts = StepSearchOpts {
            seed: 0x1234ABCD,
            initial_advance: 30,
            current_cooldown_steps: 3,
            is_walking: false,
            terrain: EncounterTerrain::WaterOrCave,
            ability: EncounterAbilityEffect::Half,
            flute: EncounterFlute::Black,
            item: EncounterItem::CleanseOrIncense,
        };

        let result = search_steps_to_encounter(opts).unwrap();

        assert_eq!(result.total_steps, 92);
        assert_eq!(result.encounter_rate, 1);
        assert_eq!(result.seed_after, 0x026B57FA);
    }
}
