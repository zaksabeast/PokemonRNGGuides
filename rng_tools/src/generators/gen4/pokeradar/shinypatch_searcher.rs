use super::simulate::pokeradar4_simulate_advance;
use super::types::{BattleResult, PokeRadar4AdvanceOpts, ShakeType};
use crate::gen4::stationary::BaseStatic4State;

pub struct ShinyPatchCandidate {
    pub seed: u32,
    pub advance: usize,
}

pub fn search_shiny_patches(
    candidates: &[BaseStatic4State],
    chain_count: u16,
    battle_result: BattleResult,
    selected_shake: ShakeType,
) -> Vec<ShinyPatchCandidate> {
    candidates
        .iter()
        .filter_map(|c| {
            let result = pokeradar4_simulate_advance(PokeRadar4AdvanceOpts {
                init_seed: c.seed,
                target_advance: c.advance,
                chain_count,
                battle_result,
                selected_shake,
            });

            let has_shiny = result.patches.iter().any(|p| p.is_shiny);

            has_shiny.then_some(ShinyPatchCandidate {
                seed: c.seed,
                advance: c.advance,
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
    fn keeps_only_candidates_with_a_shiny_patch() {
        let candidates = vec![
            // no shiny patch anywhere (chain_count = 1)
            dummy_state(1, 0),
            // ring 1 produces a shiny with chain_count = 40
            dummy_state(50, 0),
        ];

        let result = search_shiny_patches(&candidates, 40, BattleResult::Catch, ShakeType::Slow);

        assert_eq!(result.len(), 1);
        assert_eq!(result[0].seed, 50);
        assert_eq!(result[0].advance, 0);
    }

    #[test]
    fn no_candidate_has_a_shiny_patch() {
        let candidates = vec![dummy_state(1, 0)];

        let result = search_shiny_patches(&candidates, 1, BattleResult::Catch, ShakeType::Slow);

        assert!(result.is_empty());
    }
}
