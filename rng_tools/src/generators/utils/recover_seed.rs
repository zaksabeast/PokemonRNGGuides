use crate::Ivs;
use std::num::Wrapping;

fn recover_poke_rng_ivs_method4(ivs: &Ivs) -> Vec<u32> {
    let Ivs {
        hp,
        atk,
        def,
        spa,
        spd,
        spe,
    } = *ivs;

    const ADD: u32 = 0xe97e7b6a;
    const MULT: u32 = 0xc2a29a69;
    const MOD: u32 = 0x3a89;
    const W_ADD: Wrapping<u32> = Wrapping(ADD);
    const W_MULT: Wrapping<u32> = Wrapping(MULT);
    const W_MOD: Wrapping<u32> = Wrapping(MOD);
    const PAT: Wrapping<u32> = Wrapping(0x2e4c);
    const INC: Wrapping<u32> = Wrapping(0x5831);

    let first = Wrapping(((hp as u32) | ((atk as u32) << 5) | ((def as u32) << 10)) << 16);
    let second = Wrapping(((spe as u32) | ((spa as u32) << 5) | ((spd as u32) << 10)) << 16);

    let diff = (second - (first * W_MULT + W_ADD)) >> 16;
    let start1 = ((diff * W_MOD + INC) >> 16) * PAT % W_MOD;
    let start2 = ((Wrapping((diff.0 & 0xFFFF) ^ 0x8000) * W_MOD + INC) >> 16) * PAT % W_MOD;

    let mut seeds = Vec::with_capacity(6);

    reverse_poke_rng_seeds::<MULT, ADD, MOD>(first.0, second.0, start1.0, &mut seeds);
    reverse_poke_rng_seeds::<MULT, ADD, MOD>(first.0, second.0, start2.0, &mut seeds);

    seeds
}

fn recover_poke_rng_ivs_method12(ivs: &Ivs) -> Vec<u32> {
    let Ivs {
        hp,
        atk,
        def,
        spa,
        spd,
        spe,
    } = *ivs;

    const ADD: u32 = 0x6073;
    const MULT: u32 = 0x41c64e6d;
    const MOD: u32 = 0x67d3;
    const W_MULT: Wrapping<u32> = Wrapping(MULT);
    const W_MOD: Wrapping<u32> = Wrapping(MOD);
    const PAT: Wrapping<u32> = Wrapping(0xd3e);
    const INC: Wrapping<u32> = Wrapping(0x4034);

    let first = Wrapping(((hp as u32) | ((atk as u32) << 5) | ((def as u32) << 10)) << 16);
    let second = Wrapping(((spe as u32) | ((spa as u32) << 5) | ((spd as u32) << 10)) << 16);

    let diff = (second - first * W_MULT) >> 16;
    let start1 = ((diff * W_MOD + INC) >> 16) * PAT % W_MOD;
    let start2 = ((Wrapping((diff.0 & 0xFFFF) ^ 0x8000) * W_MOD + INC) >> 16) * PAT % W_MOD;

    let mut seeds = Vec::with_capacity(6);

    reverse_poke_rng_seeds::<MULT, ADD, MOD>(first.0, second.0, start1.0, &mut seeds);
    reverse_poke_rng_seeds::<MULT, ADD, MOD>(first.0, second.0, start2.0, &mut seeds);

    seeds
}

fn reverse_poke_rng_seeds<const MULT: u32, const ADD: u32, const MOD: u32>(
    first: u32,
    second: u32,
    start: u32,
    seeds: &mut Vec<u32>,
) {
    (start..0x10000).step_by(MOD as usize).for_each(|low| {
        let seed = first | low;
        if (seed.wrapping_mul(MULT).wrapping_add(ADD) & 0x7fff0000) == second {
            seeds.push(seed);
            seeds.push(seed ^ 0x80000000);
        }
    })
}

pub fn recover_poke_rng_iv(ivs: &Ivs, method4: bool) -> Vec<u32> {
    if method4 {
        recover_poke_rng_ivs_method4(ivs)
    } else {
        recover_poke_rng_ivs_method12(ivs)
    }
}

#[cfg(test)]
mod test {
    use super::*;
    use crate::{Ivs, assert_list_eq};

    const MAX_IVS: Ivs = Ivs {
        hp: 31,
        atk: 31,
        def: 31,
        spa: 31,
        spd: 31,
        spe: 31,
    };

    const ATK_IVS: Ivs = Ivs {
        hp: 31,
        atk: 31,
        def: 31,
        spa: 0,
        spd: 31,
        spe: 31,
    };

    const SPA_IVS: Ivs = Ivs {
        hp: 31,
        atk: 0,
        def: 31,
        spa: 31,
        spd: 31,
        spe: 31,
    };

    #[test]
    fn recover_poke_6iv_method1() {
        let results = recover_poke_rng_iv(&MAX_IVS, false);
        let expected = [
            2147430490, 4294914138, 2147457069, 4294940717, 2147481953, 4294965601,
        ];

        assert_list_eq!(results, expected);
    }

    #[test]
    fn recover_poke_atk_ivs_method1() {
        let results = recover_poke_rng_iv(&ATK_IVS, false);
        let expected = [2147448123, 4294931771, 2147474702, 4294958350];

        assert_list_eq!(results, expected);
    }

    #[test]
    fn recover_poke_spa_ivs_method1() {
        let results = recover_poke_rng_iv(&SPA_IVS, false);
        let expected = [2082409964, 4229893612, 2082436543, 4229920191];

        assert_list_eq!(results, expected);
    }

    #[test]
    fn recover_poke_6iv_method4() {
        let results = recover_poke_rng_iv(&MAX_IVS, true);
        let expected = [2147439333, 4294922981, 2147454318, 4294937966];

        assert_list_eq!(results, expected);
    }

    #[test]
    fn recover_poke_atk_ivs_method4() {
        let results = recover_poke_rng_iv(&ATK_IVS, true);
        let expected = [2147461214, 4294944862, 2147476199, 4294959847];

        assert_list_eq!(results, expected);
    }

    #[test]
    fn recover_poke_spa_ivs_method4() {
        let results = recover_poke_rng_iv(&SPA_IVS, true);
        let expected = [2082470326, 4229953974];

        assert_list_eq!(results, expected);
    }
}
