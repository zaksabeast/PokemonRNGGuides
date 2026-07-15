use crate::gen4::game_logic::{DpptLogic, GameSpecificLogic};
use crate::rng::{Rng, lcrng::Pokerng};

const RING_TILE_COUNT: [u16; 4] = [32, 24, 16, 8];
const RATES_WIN: [u16; 4] = [88, 68, 48, 28];
const RATES_CATCH: [u16; 4] = [98, 78, 58, 38];

#[derive(Clone, Copy, PartialEq, Eq, Debug)]
pub enum BattleResult {
    Catch,
    Win,
}

#[derive(Clone, Copy, PartialEq, Eq, Debug)]
pub enum ShakeType {
    Slow,
    Fast,
}

fn ring_offset_to_coords(ring: i32, rand: u16) -> (i32, i32) {
    let size = 9 - ring * 2;
    let rand = rand as i32;
    let row = rand / size;
    if row == 0 {
        return (rand % size, 0);
    }
    if row == 1 {
        return (rand % size, size - 1);
    }
    let r = rand - size * 2;
    let ox = if r % 2 == 0 { 0 } else { size - 1 };
    (ox, r / 2 + 1)
}

fn patch_grid_coords(ring: i32, rand: u16) -> (i32, i32) {
    let (ox, oz) = ring_offset_to_coords(ring, rand);
    (ring + ox, ring + oz)
}

#[derive(Clone, Debug, PartialEq, Eq)]
pub struct Patch {
    pub ring: i32,
    pub gx: i32,
    pub gz: i32,
    pub continue_chain: bool,
    pub is_shiny: bool,
    pub shake_type: ShakeType,
}

pub struct SimulateAdvanceResult {
    pub patches: Vec<Patch>,
    pub seed_after_patch: u32,
}

pub fn simulate_advance(
    init_seed: u32,
    target_advance: u32,
    chain_count: u16,
    battle_result: BattleResult,
    selected_shake: ShakeType,
) -> SimulateAdvanceResult {
    let mut rng = Pokerng::new(init_seed);

    rng.jump(target_advance as usize);

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
        let (gx, gz) = patch_grid_coords(ring, rand_val);
        patches.push(Patch {
            ring,
            gx,
            gz,
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
    fn test_ring_sizes() {
        assert_eq!(ring_offset_to_coords(0, 0), (0, 0));
        assert_eq!(ring_offset_to_coords(0, 31), (8, 7));

        assert_eq!(ring_offset_to_coords(1, 0), (0, 0));
        assert_eq!(ring_offset_to_coords(1, 23), (6, 5));

        assert_eq!(ring_offset_to_coords(2, 0), (0, 0));
        assert_eq!(ring_offset_to_coords(2, 15), (4, 3));

        assert_eq!(ring_offset_to_coords(3, 0), (0, 0));
        assert_eq!(ring_offset_to_coords(3, 7), (2, 1));
    }

    #[test]
    fn test_ring0_all_sides() {
        //UPPER SIDE
        assert_eq!(ring_offset_to_coords(0, 0), (0, 0));
        assert_eq!(ring_offset_to_coords(0, 4), (4, 0));
        assert_eq!(ring_offset_to_coords(0, 8), (8, 0));

        //BOTTOM SIDE
        assert_eq!(ring_offset_to_coords(0, 9), (0, 8));
        assert_eq!(ring_offset_to_coords(0, 13), (4, 8));
        assert_eq!(ring_offset_to_coords(0, 17), (8, 8));

        //LEFT SIDE
        assert_eq!(ring_offset_to_coords(0, 18), (0, 1));
        assert_eq!(ring_offset_to_coords(0, 24), (0, 4));
        assert_eq!(ring_offset_to_coords(0, 30), (0, 7));

        //RIGHT SIDE
        assert_eq!(ring_offset_to_coords(0, 19), (8, 1));
        assert_eq!(ring_offset_to_coords(0, 25), (8, 4));
        assert_eq!(ring_offset_to_coords(0, 31), (8, 7));
    }

    #[test]
    fn test_ring_bounds() {
        for ring in 0..4 {
            let size = 9 - ring * 2;
            let count = RING_TILE_COUNT[ring as usize];

            for i in 0..count {
                let (x, y) = ring_offset_to_coords(ring, i);

                assert!(x >= 0);
                assert!(y >= 0);

                assert!(x < size);
                assert!(y < size);
            }
        }
    }

    #[test]
    fn test_ring_border() {
        for ring in 0..4 {
            let size = 9 - ring * 2;
            let count = RING_TILE_COUNT[ring as usize];

            for i in 0..count {
                let (x, y) = ring_offset_to_coords(ring, i);

                assert!(x == 0 || x == size - 1 || y == 0 || y == size - 1);
            }
        }
    }

    #[test]
    fn test_ring_unique_positions() {
        use std::collections::HashSet;

        for ring in 0..4 {
            let mut set = HashSet::new();

            let count = RING_TILE_COUNT[ring as usize];

            for i in 0..count {
                assert!(set.insert(ring_offset_to_coords(ring, i)));
            }
        }
    }

    #[test]
    fn test_patch_coords() {
        assert_eq!(patch_grid_coords(0, 0), (0, 0));

        assert_eq!(patch_grid_coords(1, 0), (1, 1));

        assert_eq!(patch_grid_coords(2, 0), (2, 2));

        assert_eq!(patch_grid_coords(3, 0), (3, 3));
    }

    #[test]
    fn test_patch_grid_bounds() {
        for ring in 0..4 {
            let count = RING_TILE_COUNT[ring as usize];

            for i in 0..count {
                let (x, y) = patch_grid_coords(ring, i);

                assert!(x >= 0 && x < 9);
                assert!(y >= 0 && y < 9);
            }
        }
    }

    #[test]
    fn test_patch_count() {
        let result = simulate_advance(0, 0, 1, BattleResult::Catch, ShakeType::Slow);

        assert_eq!(result.patches.len(), 4);
    }

    #[test]
    fn test_patch_ring() {
        let result = simulate_advance(123456, 0, 10, BattleResult::Win, ShakeType::Fast);

        for (expected_ring, patch) in result.patches.iter().enumerate() {
            assert_eq!(patch.ring, expected_ring as i32);
        }
    }
    #[test]
    fn test_real_game_case() {
        let result = simulate_advance(0x010D029F, 350, 1, BattleResult::Catch, ShakeType::Slow);
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
