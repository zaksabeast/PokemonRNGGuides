use arrayvec::ArrayVec;
use itertools::iproduct;

use crate::{
    HiddenPowerFilter, Ivs,
    gen3::wild::searcher::FindPidPathsOptions,
    rng::{Rng, lcrng::Pokerng},
};

use super::searcher_main::searcher_reverse::{
    METHOD_1, METHOD_2, METHOD_3, METHOD_4, is_considered_method,
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

pub fn reverse_find_iv_paths_from_min_max_ivs<const METHODS: u8>(
    min_ivs: Ivs,
    max_ivs: Ivs,
    hidden_power_filter: &HiddenPowerFilter,
) -> impl Iterator<Item = IvPath> {
    iproduct!(
        min_ivs.hp..=max_ivs.hp,
        min_ivs.atk..=max_ivs.atk,
        min_ivs.def..=max_ivs.def,
        min_ivs.spa..=max_ivs.spa,
        min_ivs.spd..=max_ivs.spd,
        min_ivs.spe..=max_ivs.spe
    )
    .flat_map(|(hp, atk, def, spa, spd, spe)| {
        reverse_find_iv_paths_from_ivs::<METHODS>(hp, atk, def, spa, spd, spe)
            .into_iter()
            .filter(|iv_path| hidden_power_filter.pass_filter(&iv_path.ivs()))
    })
}

pub fn reverse_find_iv_paths_from_ivs<const METHODS: u8>(
    hp: u8,
    atk: u8,
    def: u8,
    spa: u8,
    spd: u8,
    spe: u8,
) -> ArrayVec<IvPath, 12> {
    let mut iv_paths: ArrayVec<IvPath, 12> = Default::default();

    if is_considered_method(METHODS, METHOD_1 | METHOD_2 | METHOD_3) {
        reverse_find_iv1_seeds_from_ivs_values_no_vblank(
            hp,
            atk,
            def,
            spa,
            spd,
            spe,
            &mut iv_paths,
        );
    }

    if is_considered_method(METHODS, METHOD_4) {
        reverse_find_iv1_seeds_from_ivs_values_with_vblank(
            hp,
            atk,
            def,
            spa,
            spd,
            spe,
            &mut iv_paths,
        );
    }

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
    iv_paths: &mut ArrayVec<IvPath, 12>,
) {
    reverse_find_iv1_seeds_from_ivs_values_with_arc::<0x41c64e6d, 0x6073, 0x67d3, 0xd3e, 0x4034>(
        hp,
        atk,
        def,
        spa,
        spd,
        spe,
        IvFromStartArc::WithoutVBlank,
        iv_paths,
    );
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
    iv_paths: &mut ArrayVec<IvPath, 12>,
) {
    reverse_find_iv1_seeds_from_ivs_values_with_arc::<0xc2a29a69, 0xe97e7b6a, 0x3a89, 0x2e4c, 0x5831>(
        hp,
        atk,
        def,
        spa,
        spd,
        spe,
        IvFromStartArc::WithVBlank,
        iv_paths,
    );
}

fn reverse_find_iv1_seeds_from_ivs_values_with_arc<
    const MULT: u32,
    const ADD: u32,
    const MOD: u32,
    const PAT: u32,
    const INC: u32,
>(
    hp: u8,
    atk: u8,
    def: u8,
    spa: u8,
    spd: u8,
    spe: u8,
    iv_arc: IvFromStartArc,
    iv_paths: &mut ArrayVec<IvPath, 12>,
) {
    let first = ((hp as u32) | ((atk as u32) << 5) | ((def as u32) << 10)) << 16;
    let second = ((spe as u32) | ((spa as u32) << 5) | ((spd as u32) << 10)) << 16;

    let additional_add = if iv_arc == IvFromStartArc::WithoutVBlank {
        0
    } else {
        ADD
    };

    let diff = second.wrapping_sub(first.wrapping_mul(MULT).wrapping_add(additional_add)) >> 16;
    let start1 = (((diff.wrapping_mul(MOD).wrapping_add(INC)) >> 16).wrapping_mul(PAT)) % MOD;
    let start2 =
        ((((diff ^ 0x8000).wrapping_mul(MOD).wrapping_add(INC)) >> 16).wrapping_mul(PAT)) % MOD;

    for start in [start1, start2] {
        for low in (start..0x10000).step_by(MOD as usize) {
            let seed = first | low;
            if ((seed.wrapping_mul(MULT).wrapping_add(ADD)) & 0x7fff_0000) == second {
                for seed in [seed, seed ^ 0x8000_0000] {
                    let mut rng = Pokerng::new(seed);
                    rng.prev_rand();
                    iv_paths.push(IvPath {
                        seed: rng.seed(),
                        iv_arc,
                    });
                }
            }
        }
    }
}

pub fn passes_iv1_filter(min_ivs: &Ivs, max_ivs: &Ivs, iv1: u16) -> bool {
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

pub fn passes_iv2_filter(min_ivs: &Ivs, max_ivs: &Ivs, iv2: u16) -> bool {
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

// Used by ByStep only
pub fn find_iv_paths_from_iv1_seed<const METHODS: u8>(
    opts: &FindPidPathsOptions,
    rng: &mut Pokerng,
) -> Option<ArrayVec<IvPath, 2>> {
    let iv1 = rng.rand::<u16>();
    if !passes_iv1_filter(&opts.filter.min_ivs, &opts.filter.max_ivs, iv1) {
        return None;
    }

    let iv2_wild123 = rng.rand::<u16>();
    let iv2_wild4 = rng.rand::<u16>();

    let wild123_good = is_considered_method(METHODS, METHOD_1 | METHOD_2 | METHOD_3)
        && passes_iv2_filter(&opts.filter.min_ivs, &opts.filter.max_ivs, iv2_wild123);

    let wild4_good = is_considered_method(METHODS, METHOD_4)
        && passes_iv2_filter(&opts.filter.min_ivs, &opts.filter.max_ivs, iv2_wild4);

    if !wild123_good && !wild4_good {
        return None;
    }

    rng.reverse_jump_const::<3>(); //revert to initial state

    let mut iv_paths: ArrayVec<IvPath, 2> = Default::default();
    if wild123_good {
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

// Used by ByStep only
pub fn find_iv_paths_from_iv2_seed<const METHODS: u8>(
    opts: &FindPidPathsOptions,
    rng: &mut Pokerng,
) -> Option<ArrayVec<IvPath, 2>> {
    let iv2 = rng.rand::<u16>();
    if !passes_iv2_filter(&opts.filter.min_ivs, &opts.filter.max_ivs, iv2) {
        return None;
    }

    rng.prev_rand(); //revert state
    let iv1_wild123 = rng.prev_rand();
    let iv1_wild4 = rng.prev_rand();

    let wild123_good = is_considered_method(METHODS, METHOD_1 | METHOD_2 | METHOD_3)
        && passes_iv1_filter(&opts.filter.min_ivs, &opts.filter.max_ivs, iv1_wild123);

    let wild4_good = is_considered_method(METHODS, METHOD_4)
        & passes_iv1_filter(&opts.filter.min_ivs, &opts.filter.max_ivs, iv1_wild4);

    if !wild123_good && !wild4_good {
        return None;
    }

    let mut iv_paths: ArrayVec<IvPath, 2> = Default::default();
    if wild4_good {
        iv_paths.push(IvPath {
            seed: rng.seed(),
            iv_arc: IvFromStartArc::WithVBlank,
        });
    }
    if wild123_good {
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
