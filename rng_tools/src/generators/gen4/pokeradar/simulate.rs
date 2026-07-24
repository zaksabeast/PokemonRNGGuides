use super::grid::patch_grid_coords;
use super::types::{BattleResult, Patch, PokeRadar4AdvanceOpts, ShakeType, SimulateAdvanceResult};
use crate::gen4::game_logic::{DpptLogic, GameSpecificLogic};
use crate::rng::{Rng, lcrng::Pokerng};
use wasm_bindgen::prelude::*;

use super::grid::RING_TILE_COUNT;

const RATES_WIN: [u16; 4] = [88, 68, 48, 28];
const RATES_CATCH: [u16; 4] = [98, 78, 58, 38];

#[wasm_bindgen]
pub fn pokeradar4_simulate_advance(opts: PokeRadar4AdvanceOpts) -> SimulateAdvanceResult {
    let PokeRadar4AdvanceOpts {
        init_seed,
        target_advance,
        chain_count,
        battle_result,
        selected_shake,
    } = opts;

    let mut rng = Pokerng::new(init_seed);
    rng.jump(target_advance);

    let mut positions: [u16; 4] = [0; 4];
    for (ring, slot) in positions.iter_mut().enumerate() {
        *slot = DpptLogic::max(rng.rand(), RING_TILE_COUNT[ring]);
    }

    let rates = match battle_result {
        BattleResult::Catch => &RATES_CATCH,
        BattleResult::Win => &RATES_WIN,
    };

    let s_rate = std::cmp::max(200i32, 8200i32 - chain_count as i32 * 200) as u16;

    let mut patches = Vec::with_capacity(4);

    for ring in 0..4i32 {
        let cc_val = DpptLogic::max(rng.rand(), 100);
        let continue_chain = chain_count > 0 && cc_val < rates[ring as usize];

        let (shake_type, is_shiny) = match continue_chain {
            true => {
                let sh_val = DpptLogic::max(rng.rand(), s_rate);
                (selected_shake, sh_val == 0)
            }
            false => {
                let sh_val = DpptLogic::max(rng.rand(), 100);
                let shake_type = match sh_val < 50 {
                    true => ShakeType::Slow,
                    false => ShakeType::Fast,
                };
                (shake_type, false)
            }
        };

        let rand_val = positions[ring as usize];
        let coords = patch_grid_coords(ring, rand_val);
        patches.push(Patch {
            ring,
            gx: coords.x,
            gz: coords.z,
            continue_chain,
            is_shiny,
            shake_type,
        });
    }

    SimulateAdvanceResult {
        patches,
        seed_after_patch: rng.seed(),
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::assert_list_eq;

    #[test]
    fn test_patch_count() {
        let result = pokeradar4_simulate_advance(PokeRadar4AdvanceOpts {
            init_seed: 0,
            target_advance: 0,
            chain_count: 1,
            battle_result: BattleResult::Catch,
            selected_shake: ShakeType::Slow,
        });

        assert_eq!(result.patches.len(), 4);
    }

    #[test]
    fn test_patch_ring() {
        let result = pokeradar4_simulate_advance(PokeRadar4AdvanceOpts {
            init_seed: 123456,
            target_advance: 0,
            chain_count: 10,
            battle_result: BattleResult::Win,
            selected_shake: ShakeType::Fast,
        });

        for (expected_ring, patch) in result.patches.iter().enumerate() {
            assert_eq!(patch.ring, expected_ring as i32);
        }
    }

    #[test]
    fn test_real_game_case() {
        let result = pokeradar4_simulate_advance(PokeRadar4AdvanceOpts {
            init_seed: 0x010D029F,
            target_advance: 350,
            chain_count: 1,
            battle_result: BattleResult::Catch,
            selected_shake: ShakeType::Slow,
        });

        let expected = [
            Patch {
                ring: 0,
                gx: 7,
                gz: 0,
                continue_chain: true,
                is_shiny: false,
                shake_type: ShakeType::Slow,
            },
            Patch {
                ring: 1,
                gx: 1,
                gz: 5,
                continue_chain: true,
                is_shiny: false,
                shake_type: ShakeType::Slow,
            },
            Patch {
                ring: 2,
                gx: 2,
                gz: 3,
                continue_chain: false,
                is_shiny: false,
                shake_type: ShakeType::Fast,
            },
            Patch {
                ring: 3,
                gx: 5,
                gz: 5,
                continue_chain: false,
                is_shiny: false,
                shake_type: ShakeType::Fast,
            },
        ];

        assert_list_eq!(result.patches, expected);
    }
}
