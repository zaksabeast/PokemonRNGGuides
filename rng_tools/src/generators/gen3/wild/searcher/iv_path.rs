use arrayvec::ArrayVec;
use itertools::{Itertools, iproduct};

use crate::{
    HiddenPowerFilter, Ivs,
    gen3::wild::searcher::FindPidPathsOptions,
    rng::{Rng, lcrng::Pokerng},
};

/** seed used to generated iv1 (state right before iv1) */
#[derive(Default, Debug, PartialEq, Clone, Copy)]
pub struct IvPath {
    pub seed: u32,
    pub iv_arc: IvFromStartArc,
}
impl IvPath {
    pub fn ivs(&self) -> Ivs {
        let mut rng = Pokerng::new(self.seed);
        Ivs::new_g3(rng.rand::<u16>(), rng.rand::<u16>())
    }
}

#[derive(Default, Debug, PartialEq, Clone, Copy)]
pub enum IvFromStartArc {
    #[default]
    WithVBlank,
    WithoutVBlank,
}

pub fn reverse_find_iv_paths_from_min_max_ivs(
    min_ivs: Ivs,
    max_ivs: Ivs,
    hidden_power_filter: Option<&HiddenPowerFilter>,
) -> Vec<IvPath> {
    let iv_paths_it = iproduct!(
        min_ivs.hp..=max_ivs.hp,
        min_ivs.atk..=max_ivs.atk,
        min_ivs.def..=max_ivs.def,
        min_ivs.spa..=max_ivs.spa,
        min_ivs.spd..=max_ivs.spd,
        min_ivs.spe..=max_ivs.spe
    )
    .flat_map(|(hp, atk, def, spa, spd, spe)| {
        reverse_find_iv_paths_from_ivs(hp, atk, def, spa, spd, spe)
    });

    if let Some(hidden_power_filter) = hidden_power_filter {
        if hidden_power_filter.active {
            return iv_paths_it
                .filter(|iv_path| hidden_power_filter.pass_filter(&iv_path.ivs()))
                .collect_vec();
        }
    }

    iv_paths_it.collect_vec()
}

pub fn reverse_find_iv_paths_from_ivs(
    hp: u8,
    atk: u8,
    def: u8,
    spa: u8,
    spd: u8,
    spe: u8,
) -> Vec<IvPath> {
    let mut iv_paths = vec![];
    iv_paths.extend(
        reverse_find_iv1_seeds_from_ivs_values_no_vblank(hp, atk, def, spa, spd, spe)
            .iter()
            .map(|seed| IvPath {
                seed: *seed,
                iv_arc: IvFromStartArc::WithoutVBlank,
            }),
    );
    iv_paths.extend(
        reverse_find_iv1_seeds_from_ivs_values_with_vblank(hp, atk, def, spa, spd, spe)
            .iter()
            .map(|seed| IvPath {
                seed: *seed,
                iv_arc: IvFromStartArc::WithVBlank,
            }),
    );
    iv_paths
}

/// Input: IVs
/// Output: Seeds (right before iv1) that result in the IVs, assuming no vblank between iv1 and iv2.
/// iv1 is obtained from Pokerng::new(iv1_seed).rand::<u16>()
fn reverse_find_iv1_seeds_from_ivs_values_no_vblank(
    hp: u8,
    atk: u8,
    def: u8,
    spa: u8,
    spd: u8,
    spe: u8,
) -> ArrayVec<u32, 6> {
    const ADD: u32 = 0x6073;
    const MULT: u32 = 0x41c64e6d;
    const MOD: u32 = 0x67d3;
    const PAT: u32 = 0xd3e;
    const INC: u32 = 0x4034;

    let first = ((hp as u32) | ((atk as u32) << 5) | ((def as u32) << 10)) << 16;
    let second = ((spe as u32) | ((spa as u32) << 5) | ((spd as u32) << 10)) << 16;

    let diff = ((second.wrapping_sub(first.wrapping_mul(MULT))) >> 16) as u16;
    let diff_u32 = diff as u32;
    let start1 = ((((diff_u32.wrapping_mul(MOD) + INC) >> 16).wrapping_mul(PAT)) % MOD) as u16;
    let start2 =
        (((((diff_u32 ^ 0x8000).wrapping_mul(MOD) + INC) >> 16).wrapping_mul(PAT)) % MOD) as u16;

    let mut iv1_seeds = vec![];
    for low in (start1 as u32..0x10000).step_by(MOD as usize) {
        let seed = first | low;
        if ((seed.wrapping_mul(MULT).wrapping_add(ADD)) & 0x7fff0000) == second {
            iv1_seeds.push(seed);
            iv1_seeds.push(seed ^ 0x80000000);
        }
    }

    for low in (start2 as u32..0x10000).step_by(MOD as usize) {
        let seed = first | low;
        if ((seed.wrapping_mul(MULT).wrapping_add(ADD)) & 0x7fff0000) == second {
            iv1_seeds.push(seed);
            iv1_seeds.push(seed ^ 0x80000000);
        }
    }
    iv1_seeds
        .into_iter()
        .map(|seed| {
            let mut rng = Pokerng::new(seed);
            rng.prev_rand();
            rng.seed()
        })
        .collect()
}

/// Input: IVs
/// Output: Rng states (right before iv1) that result in the IVs, assuming a vblank between iv1 and iv2.
/// iv1 is obtained from Pokerng::new(iv1_seed).rand::<u16>()
fn reverse_find_iv1_seeds_from_ivs_values_with_vblank(
    hp: u8,
    atk: u8,
    def: u8,
    spa: u8,
    spd: u8,
    spe: u8,
) -> ArrayVec<u32, 6> {
    const ADD: u32 = 0xe97e7b6a;
    const MULT: u32 = 0xc2a29a69;
    const MOD: u32 = 0x3a89;
    const PAT: u32 = 0x2e4c;
    const INC: u32 = 0x5831;

    let first = ((hp as u32) | ((atk as u32) << 5) | ((def as u32) << 10)) << 16;
    let second = ((spe as u32) | ((spa as u32) << 5) | ((spd as u32) << 10)) << 16;

    let diff = ((second.wrapping_sub(first.wrapping_mul(MULT).wrapping_add(ADD))) >> 16) as u16;
    let diff_u32 = diff as u32;
    let start1 = (((diff_u32.wrapping_mul(MOD).wrapping_add(INC)) >> 16).wrapping_mul(PAT)) % MOD;
    let start2 =
        ((((diff_u32 ^ 0x8000).wrapping_mul(MOD).wrapping_add(INC)) >> 16).wrapping_mul(PAT)) % MOD;

    let mut iv1_seeds = vec![];
    for low in (start1..0x10000).step_by(MOD as usize) {
        let seed = first | low;
        if ((seed.wrapping_mul(MULT).wrapping_add(ADD)) & 0x7fff_0000) == second {
            iv1_seeds.push(seed);
            iv1_seeds.push(seed ^ 0x8000_0000);
        }
    }

    for low in (start2..0x10000).step_by(MOD as usize) {
        let seed = first | low;
        if ((seed.wrapping_mul(MULT).wrapping_add(ADD)) & 0x7fff_0000) == second {
            iv1_seeds.push(seed);
            iv1_seeds.push(seed ^ 0x8000_0000);
        }
    }
    iv1_seeds
        .into_iter()
        .map(|seed| {
            let mut rng = Pokerng::new(seed);
            rng.prev_rand();
            rng.seed()
        })
        .collect()
}

fn passes_iv1_filter(min_ivs: &Ivs, max_ivs: &Ivs, iv1: u16) -> bool {
    let hp = (iv1 & 31) as u8;
    if hp < min_ivs.hp || hp > max_ivs.hp {
        return false;
    }
    let atk = ((iv1 >> 5) & 31) as u8;
    if atk < min_ivs.atk || atk > max_ivs.atk {
        return false;
    }

    let def = ((iv1 >> 10) & 31) as u8;
    if def < min_ivs.def || def > max_ivs.def {
        return false;
    }
    true
}

fn passes_iv2_filter(min_ivs: &Ivs, max_ivs: &Ivs, iv2: u16) -> bool {
    let spe = (iv2 & 31) as u8;
    if spe < min_ivs.spe || spe > max_ivs.spe {
        return false;
    }
    let spa = ((iv2 >> 5) & 31) as u8;
    if spa < min_ivs.spa || spa > max_ivs.spa {
        return false;
    }
    let spd = ((iv2 >> 10) & 31) as u8;
    if spd < min_ivs.spd || spd > max_ivs.spd {
        return false;
    }
    true
}

pub fn find_iv_paths_from_iv1_seed(
    opts: &FindPidPathsOptions,
    rng: &mut Pokerng,
) -> Option<ArrayVec<IvPath, 2>> {
    let iv1 = rng.rand::<u16>();
    if !passes_iv1_filter(&opts.filter.min_ivs, &opts.filter.max_ivs, iv1) {
        return None;
    }

    let iv2_wild1235 = rng.rand::<u16>();
    let iv2_wild4 = rng.rand::<u16>();

    let wild1235_good = passes_iv2_filter(&opts.filter.min_ivs, &opts.filter.max_ivs, iv2_wild1235);

    let wild4_good = passes_iv2_filter(&opts.filter.min_ivs, &opts.filter.max_ivs, iv2_wild4);

    if !wild1235_good && !wild4_good {
        return None;
    }

    rng.prev_rand();
    rng.prev_rand();
    rng.prev_rand(); //revert to initial state

    let mut iv_paths: ArrayVec<IvPath, 2> = Default::default();
    if wild1235_good {
        iv_paths.push(IvPath {
            seed: rng.seed(),
            iv_arc: IvFromStartArc::WithoutVBlank,
        });
    }
    if wild4_good {
        iv_paths.push(IvPath {
            seed: rng.seed(),
            iv_arc: IvFromStartArc::WithVBlank,
        });
    }
    Some(iv_paths)
}

pub fn find_iv_paths_from_iv2_seed(
    opts: &FindPidPathsOptions,
    rng: &mut Pokerng,
) -> Option<ArrayVec<IvPath, 2>> {
    let iv2 = rng.rand::<u16>();
    if !passes_iv2_filter(&opts.filter.min_ivs, &opts.filter.max_ivs, iv2) {
        return None;
    }

    rng.prev_rand(); //revert state
    let iv1_wild1235 = rng.prev_rand();
    let iv1_wild4 = rng.prev_rand();

    let wild1235_good = /*opts.consider_method123
        && */passes_iv1_filter(&opts.filter.min_ivs, &opts.filter.max_ivs, iv1_wild1235);

    let wild4_good = /*opts.consider_method4
        && */passes_iv1_filter(&opts.filter.min_ivs, &opts.filter.max_ivs, iv1_wild4);
    if !wild1235_good && !wild4_good {
        return None;
    }

    let mut iv_paths: ArrayVec<IvPath, 2> = Default::default();
    if wild4_good {
        iv_paths.push(IvPath {
            seed: rng.seed(),
            iv_arc: IvFromStartArc::WithVBlank,
        });
    }
    if wild1235_good {
        rng.rand::<u16>();
        iv_paths.push(IvPath {
            seed: rng.seed(),
            iv_arc: IvFromStartArc::WithoutVBlank,
        });
    }
    Some(iv_paths)
}

#[path = "tests/iv_path_tests.rs"]
#[cfg(test)]
mod tests;
