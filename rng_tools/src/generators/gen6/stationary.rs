use crate::pkm::gen6_psv;
use crate::rng::StateIterator;
use crate::rng::{Rng, mt::MT};
use crate::{AbilityType, G6Idx, Gender, GenderRatio, IvFilter, Ivs, Nature};
use serde::{Deserialize, Serialize};
use tsify_next::Tsify;
use wasm_bindgen::prelude::*;

#[derive(Debug, Clone, Copy, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub enum BankGenderType {
    NoGender = 0,
    RandomGender = 1,
    Mew = 2,
}

#[derive(Debug, Clone, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct Stationary6Opts {
    pub seed: u32,
    pub initial_advances: usize,
    pub max_advances: usize,
    pub delay: usize,
    pub iv3: bool,
    pub bank: bool,                            // Bank = PokemonLink or Transporter
    pub target: usize,                         // Index of target pkm
    pub bank_gender_list: Vec<BankGenderType>, // Gender list of Bank
    pub always_sync: bool,
    pub synchro_stat: Option<Nature>,
    pub shiny_charm: bool,
    pub is_shiny_locked: bool,
    pub is_forced_shiny: bool,
    pub tsv: u16,
    pub perfect_iv_count: usize,
    pub ability: Option<AbilityType>,
    pub gender: Option<Gender>,
    pub gender_ratio: GenderRatio,
    pub filter_gender: Option<Gender>,
    pub filter_ability: Option<AbilityType>,
    pub filter_nature: Option<Nature>,
    pub filter_ivs: Option<IvFilter>,
    pub filter_shiny: bool,
}

#[derive(Debug, Default, Clone, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct Stationary6State {
    pub advance: usize,
    pub rng_state: u32,
    pub psv: u16,
    pub shiny: bool,
    pub ivs: Ivs,
    pub ability: AbilityType,
    pub nature: Nature,
    pub gender: Gender,
}

fn quick_generate_bank_mon(rng: &mut MT, iv3: bool, gender_type: &BankGenderType) {
    if !iv3 {
        // Johto starters
        rng.advance(10); // EC + PID + IVs + Nature + Gender
        return;
    }
    rng.advance(2); // Link Legends/Transporter
    // Indefinite advance
    let mut ivs = [false; 6];
    let iv_count = match gender_type {
        BankGenderType::Mew => 5,
        _ => 3,
    };
    let mut i = iv_count;
    while i > 0 {
        let tmp = rng.rand_max(6) as usize;
        if !ivs[tmp] {
            ivs[tmp] = true;
            i -= 1;
        }
    }
    let advance = match gender_type {
        BankGenderType::NoGender => 4,
        BankGenderType::RandomGender => 5,
        BankGenderType::Mew => 2,
    };
    rng.advance(advance);
}

fn generate(rng: &mut MT, advance: usize, opts: &Stationary6Opts) -> Stationary6State {
    let mut result = Stationary6State::default();
    result.advance = advance;
    result.rng_state = rng.current_state();

    // https://github.com/wwwwwwzx/3DSRNGTool/blob/4c0c9a5ad957c03bc4b180084dc711f77a28e332/3DSRNGTool/Core/RNGPool.cs#L100
    rng.rand::<u32>();

    if opts.bank {
        opts.bank_gender_list
            .iter()
            .take(opts.target.saturating_sub(1))
            .for_each(|gender_type| quick_generate_bank_mon(rng, opts.iv3, gender_type));
    }

    if !opts.always_sync {
        rng.advance(60);
    }

    // EC
    rng.advance(1);

    let pid_reroll_count = match opts.shiny_charm && !opts.is_shiny_locked && !opts.always_sync {
        true => 3,
        false => 1,
    };

    let mut pid;
    let mut psv = 0;
    let mut shiny = false;

    for _ in 0..pid_reroll_count {
        pid = rng.rand();
        psv = gen6_psv(pid);
        if psv == opts.tsv {
            if opts.is_shiny_locked {
                pid ^= 0x10000000;
                psv = gen6_psv(pid);
            } else {
                shiny = true;
            }
            break;
        } else if opts.is_forced_shiny {
            shiny = true;
            // let trv = (opts.tid ^ opts.sid) & 0xf;
            // pid = ((opts.tsv << 4) + opts.trv) ^ ((pid & 0xffff) << 16) + (pid & 0xffff);
            pid = (opts.tsv << 4) as u32 ^ ((pid & 0xffff) << 16) | (pid & 0xffff); // not accurate
            psv = gen6_psv(pid);
        }
    }

    result.psv = psv;
    result.shiny = shiny;

    // IVs
    let mut set_ivs = [false; 6];
    let mut i = 0;
    while i < opts.perfect_iv_count {
        let set_idx = rng.rand_max(6) as usize;
        let iv_idx = G6Idx::from(set_idx as u8);
        if !set_ivs[set_idx] {
            result.ivs[iv_idx] = 31;
            set_ivs[set_idx] = true;
            i += 1;
        }
    }

    for i in 0..6_usize {
        let idx = G6Idx::from(i as u8);
        if !set_ivs[i] {
            result.ivs[idx] = (rng.rand::<u32>() >> 27) as u8;
        }
    }

    result.ability = match opts.ability {
        Some(ability) => ability,
        None => ((rng.rand::<u32>() >> 31) as u8).into(),
    };
    result.nature = match opts.synchro_stat {
        Some(nature) => nature,
        None => (rng.rand_max(25) as u8).into(),
    };
    let gender_ratio = opts.gender_ratio;
    result.gender = match opts.gender {
        Some(gender) => gender,
        None => gender_ratio.gender(rng.rand_max(252) as u8),
    };

    result
}

#[wasm_bindgen]
pub fn generate_stationary6(opts: Stationary6Opts) -> Vec<Stationary6State> {
    StateIterator::new(MT::new(opts.seed))
        .skip(opts.delay)
        .enumerate()
        .skip(opts.initial_advances)
        .take(opts.max_advances)
        .filter_map(|(advance, mut rng)| {
            let state = generate(&mut rng, advance, &opts);

            if let Some(filter_ivs) = &opts.filter_ivs {
                if !state.ivs.filter(&filter_ivs.min_ivs, &filter_ivs.max_ivs) {
                    return None;
                }
            }

            if opts.filter_gender.is_some() && opts.filter_gender != Some(state.gender) {
                return None;
            }

            if opts.filter_ability.is_some() && opts.filter_ability != Some(state.ability) {
                return None;
            }

            if opts.filter_nature.is_some() && opts.filter_nature != Some(state.nature) {
                return None;
            }

            if opts.filter_shiny && !state.shiny {
                return None;
            }

            Some(state)
        })
        .collect()
}

#[cfg(test)]
mod test {
    use super::*;
    use crate::assert_list_eq;

    #[test]
    fn base_generate() {
        let opts = Stationary6Opts {
            seed: 0xaabbccdd,
            initial_advances: 0,
            max_advances: 4,
            delay: 0,
            ability: None,
            iv3: false,
            bank: false,
            target: 0,
            always_sync: false,
            bank_gender_list: vec![],
            synchro_stat: None,
            shiny_charm: false,
            is_shiny_locked: false,
            is_forced_shiny: false,
            tsv: 123,
            gender: None,
            gender_ratio: GenderRatio::OneToOne,
            perfect_iv_count: 0,
            filter_ability: None,
            filter_gender: None,
            filter_nature: None,
            filter_ivs: None,
            filter_shiny: false,
        };
        let result = generate_stationary6(opts);
        let expected = [
            Stationary6State {
                advance: 0,
                ivs: Ivs {
                    hp: 1,
                    atk: 11,
                    def: 0,
                    spa: 3,
                    spd: 1,
                    spe: 5,
                },
                nature: Nature::Relaxed,
                psv: 3377,
                gender: Gender::Female,
                ability: AbilityType::First,
                rng_state: 0xAABBCCDD,
                shiny: false,
            },
            Stationary6State {
                advance: 1,
                ivs: Ivs {
                    hp: 11,
                    atk: 0,
                    def: 3,
                    spa: 1,
                    spd: 5,
                    spe: 0,
                },
                nature: Nature::Hasty,
                psv: 1607,
                gender: Gender::Female,
                ability: AbilityType::First,
                rng_state: 0x8AD42AFC,
                shiny: false,
            },
            Stationary6State {
                advance: 2,
                ivs: Ivs {
                    hp: 0,
                    atk: 3,
                    def: 1,
                    spa: 5,
                    spd: 0,
                    spe: 9,
                },
                nature: Nature::Hardy,
                psv: 3532,
                gender: Gender::Female,
                ability: AbilityType::First,
                rng_state: 0xA5A8E438,
                shiny: false,
            },
            Stationary6State {
                advance: 3,
                ivs: Ivs {
                    hp: 3,
                    atk: 1,
                    def: 5,
                    spa: 0,
                    spd: 9,
                    spe: 14,
                },
                nature: Nature::Bold,
                psv: 3768,
                gender: Gender::Female,
                ability: AbilityType::First,
                rng_state: 0x735B14E5,
                shiny: false,
            },
        ];
        assert_list_eq!(result, expected);
    }
}
