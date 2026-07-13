use crate::rng::{GetRandRange, lcrng::Pokerng};

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

#[derive(Clone, Debug)]
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
    seed: u32,
    chain_count: u16,
    battle_result: BattleResult,
    selected_shake: ShakeType,
) -> SimulateAdvanceResult {
    let mut rng = Pokerng::new(seed);
    let mut positions: [u16; 4] = [0; 4];

    for (ring, slot) in positions.iter_mut().enumerate() {
        *slot = rng.get_rand_range(RING_TILE_COUNT[ring]);
    }

    let rates = match battle_result {
        BattleResult::Catch => &RATES_CATCH,
        BattleResult::Win => &RATES_WIN,
    };
    
    let s_rate = std::cmp::max(200i32, 8200i32 - chain_count as i32 * 200) as u16;

    let mut patches = Vec::with_capacity(4);

    for ring in 0..4i32 {
        let cc_val = rng.get_rand_range(100);
        let continue_chain = if chain_count > 0 {
            cc_val < rates[ring as usize]
        } else {
            false
        };

        let shake_type;
        let mut is_shiny = false;

        if !continue_chain {
            let sh_val = rng.get_rand_range(100);
            shake_type = if sh_val < 50 { ShakeType::Slow } else { ShakeType::Fast };
        } else {
            shake_type = selected_shake;
            if chain_count > 0 {
                let sh_val = rng.get_rand_range(s_rate);
                is_shiny = sh_val == 0;
            }
        }

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