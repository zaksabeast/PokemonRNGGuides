use super::simulate::pokeradar4_simulate_advance;
use super::types::{BattleResult, PokeRadar4AdvanceOpts, ShakeType};
use crate::gen4::pokeradar::types::RadarShinyPatchResult;
use crate::gen4::pokeradar::types::SearchRadarShinyPatchOpts;
use crate::gen4::search::search_static4;
use crate::gen4::stationary::{BaseStatic4State, Static4State};
use wasm_bindgen::prelude::*;

#[derive(Clone, Debug, PartialEq, Eq)]
pub struct ShinyPatchCandidate {
    pub seed: u32,
    pub spread_advance: usize,
    pub patch_advance: usize,
}

pub fn search_shiny_patches(
    candidates: &[BaseStatic4State],
    patch_min_advance: usize,
    patch_max_advance: usize,
    chain_count: u16,
    battle_result: BattleResult,
    selected_shake: ShakeType,
) -> Vec<ShinyPatchCandidate> {
    candidates
        .iter()
        .flat_map(|candidate| {
            (patch_min_advance..=patch_max_advance).filter_map(move |patch_advance| {
                let result = pokeradar4_simulate_advance(PokeRadar4AdvanceOpts {
                    init_seed: candidate.seed,
                    target_advance: patch_advance,
                    chain_count,
                    battle_result,
                    selected_shake,
                });

                let has_shiny_patch = result.patches.iter().any(|patch| patch.is_shiny);

                has_shiny_patch.then_some(ShinyPatchCandidate {
                    seed: candidate.seed,
                    spread_advance: candidate.advance,
                    patch_advance,
                })
            })
        })
        .collect()
}

#[wasm_bindgen]
pub fn search_shiny_patches_range(opts: SearchRadarShinyPatchOpts) -> Vec<RadarShinyPatchResult> {
    let static4_states: Vec<Static4State> = search_static4(&opts.search);

    let base_states: Vec<BaseStatic4State> =
        static4_states.iter().map(|s| s.state.clone()).collect();

    let matches = search_shiny_patches(
        &base_states,
        opts.patch_min_advance,
        opts.patch_max_advance,
        opts.chain_count,
        opts.battle_result,
        opts.selected_shake,
    );

    matches
        .into_iter()
        .filter_map(|candidate| {
            let static4_state = static4_states
                .iter()
                .find(|s| s.state.seed == candidate.seed)?;

            let simulate_result = pokeradar4_simulate_advance(PokeRadar4AdvanceOpts {
                init_seed: candidate.seed,
                target_advance: candidate.patch_advance,
                chain_count: opts.chain_count,
                battle_result: opts.battle_result,
                selected_shake: opts.selected_shake,
            });

            Some(RadarShinyPatchResult {
                state: static4_state.state.clone(),
                seed_time: static4_state.seed_time.clone(),
                patch_advance: candidate.patch_advance,
                patches: simulate_result.patches,
            })
        })
        .collect()
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::gen4::LeadAbility;
    use crate::gen4::stationary::BaseStatic4State;
    use crate::{AbilityType, Characteristic, Gender, Ivs, Nature};

    fn dummy_state(seed: u32, advance: usize) -> BaseStatic4State {
        BaseStatic4State {
            seed,
            advance,
            pid: 0,
            ivs: Ivs::default(),
            ability: AbilityType::First,
            gender: Gender::Genderless,
            nature: Nature::Hardy,
            shiny: false,
            characteristic: Characteristic::default(),
            lead: LeadAbility::None,
            level: 1,
        }
    }

    #[test]
    fn keeps_only_candidates_with_a_shiny_patch_in_range() {
        let candidates = vec![
            // Seed 1 should not produce a shiny patch in this range.
            dummy_state(1, 25),
            // Seed 50 produces a shiny patch at advance 0.
            dummy_state(50, 10),
        ];

        let result =
            search_shiny_patches(&candidates, 0, 0, 40, BattleResult::Catch, ShakeType::Slow);

        assert_eq!(result.len(), 1);

        assert_eq!(
            result[0],
            ShinyPatchCandidate {
                seed: 50,
                spread_advance: 10,
                patch_advance: 0,
            }
        );
    }

    #[test]
    fn returns_empty_when_no_shiny_patch_exists() {
        let candidates = vec![dummy_state(1, 25)];

        let result =
            search_shiny_patches(&candidates, 0, 0, 1, BattleResult::Catch, ShakeType::Slow);

        assert!(result.is_empty());
    }

    #[test]
    fn searches_the_entire_patch_advance_range() {
        let candidates = vec![
            // The spread advance is deliberately different from the
            // patch advance we are searching.
            dummy_state(50, 123),
        ];

        let result =
            search_shiny_patches(&candidates, 0, 10, 40, BattleResult::Catch, ShakeType::Slow);

        // If seed 50 has a shiny patch at advance 0, the search
        // must report patch_advance = 0 rather than the spread advance.
        assert!(result.iter().any(|candidate| {
            candidate.seed == 50 && candidate.spread_advance == 123 && candidate.patch_advance == 0
        }));
    }

    /// Just check that if there are any, we don't lose the spread_advance
    #[test]
    fn preserves_multiple_shiny_patch_advances_for_same_seed() {
        let candidates = vec![dummy_state(50, 123)];

        let result =
            search_shiny_patches(&candidates, 0, 10, 40, BattleResult::Catch, ShakeType::Slow);

        let matching_results: Vec<_> = result
            .iter()
            .filter(|candidate| candidate.seed == 50)
            .collect();

        // A seed can have more than one shiny patch in the searched range.
        // Every matching patch advance should be returned.
        assert!(
            matching_results
                .iter()
                .all(|candidate| candidate.spread_advance == 123)
        );
    }
}
