use crate::pkm::gen6_psv;
use crate::rng::StateIterator;
use crate::rng::{Rng, mt::MT};
use crate::{AbilityType, G6Idx, Gender, IvFilter, Ivs, Nature, Species};
use serde::{Deserialize, Serialize};
use tsify_next::Tsify;
use wasm_bindgen::prelude::*;

#[derive(Debug, Clone, Copy, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
#[repr(u8)]
pub enum TransporterGenderType {
    NoGender = 0,
    RandomGender = 1,
    Mythical = 2,
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

#[derive(Debug, Default, Clone, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct Stationary6Filter {
    pub gender: Option<Gender>,
    pub ability: Option<AbilityType>,
    pub nature: Option<Nature>,
    pub ivs: Option<IvFilter>,
    pub shiny: bool,
}

impl Stationary6Filter {
    fn apply_filters(&self, state: &Stationary6State) -> bool {
        if let Some(filter_ivs) = &self.ivs {
            if !state.ivs.filter(&filter_ivs.min_ivs, &filter_ivs.max_ivs) {
                return false;
            }
        }

        if self.gender.is_some() && self.gender != Some(state.gender) {
            return false;
        }

        if self.ability.is_some() && self.ability != Some(state.ability) {
            return false;
        }

        if self.nature.is_some() && self.nature != Some(state.nature) {
            return false;
        }

        if self.shiny && !state.shiny {
            return false;
        }

        true
    }
}

#[derive(Debug, Clone, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
struct GenerateOpts {
    seed: u32,
    initial_advances: usize,
    max_advances: usize,
    delay: usize,
    perfect_iv_count: usize,
    is_transporter: bool, // PokemonLink or Transporter
    target: usize,
    transporter_genders: Vec<TransporterGenderType>,
    always_sync: bool,
    synchro_stat: Option<Nature>,
    shiny_charm: bool,
    is_shiny_locked: bool,
    is_forced_shiny: bool,
    tsv: u16,
    ability: Option<AbilityType>,
    gender: Option<Gender>,
    species: Species,
    filter: Stationary6Filter,
}

fn quick_generate_transporter_mon(
    rng: &mut MT,
    perfect_iv_count: usize,
    gender_type: &TransporterGenderType,
) {
    if perfect_iv_count < 3 {
        // Johto starters
        rng.advance(10); // EC + PID + IVs + Nature + Gender
        return;
    }
    rng.advance(2); // Link Legends/Transporter
    // Indefinite advance
    let mut ivs = [false; 6];
    let iv_count = match gender_type {
        TransporterGenderType::Mythical => 5,
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
        TransporterGenderType::NoGender => 4,
        TransporterGenderType::RandomGender => 5,
        TransporterGenderType::Mythical => 2,
    };
    rng.advance(advance);
}

fn generate_state(rng: &mut MT, advance: usize, opts: &GenerateOpts) -> Stationary6State {
    let mut result = Stationary6State {
        advance,
        rng_state: rng.current_state(),
        ..Default::default()
    };

    // https://github.com/wwwwwwzx/3DSRNGTool/blob/4c0c9a5ad957c03bc4b180084dc711f77a28e332/3DSRNGTool/Core/RNGPool.cs#L100
    rng.rand::<u32>();

    if opts.is_transporter {
        opts.transporter_genders
            .iter()
            .take(opts.target.saturating_sub(1))
            .for_each(|gender_type| {
                quick_generate_transporter_mon(rng, opts.perfect_iv_count, gender_type)
            });
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

    for (i, is_iv_set) in set_ivs.iter().enumerate() {
        let idx = G6Idx::from(i as u8);
        if !is_iv_set {
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
    result.gender = match opts.gender {
        Some(gender) => gender,
        None => opts.species.gender_ratio().gender(rng.rand_max(252) as u8),
    };

    result
}

fn generate_states(opts: GenerateOpts) -> Vec<Stationary6State> {
    StateIterator::new(MT::new(opts.seed))
        .skip(opts.delay)
        .enumerate()
        .skip(opts.initial_advances)
        .take(opts.max_advances.saturating_add(1))
        .filter_map(|(advance, mut rng)| {
            let state = generate_state(&mut rng, advance, &opts);
            match opts.filter.apply_filters(&state) {
                false => None,
                true => Some(state),
            }
        })
        .collect()
}

#[derive(Debug, Clone, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct Stationary6Opts {
    pub seed: u32,
    pub initial_advances: usize,
    pub max_advances: usize,
    pub delay: usize,
    pub perfect_iv_count: usize,
    pub always_sync: bool,
    pub synchro_stat: Option<Nature>,
    pub shiny_charm: bool,
    pub is_shiny_locked: bool,
    pub is_forced_shiny: bool,
    pub tsv: u16,
    pub ability: Option<AbilityType>,
    pub gender: Option<Gender>,
    pub species: Species,
    pub filter: Stationary6Filter,
}

#[wasm_bindgen]
pub fn generate_stationary6(opts: Stationary6Opts) -> Vec<Stationary6State> {
    let opts = GenerateOpts {
        seed: opts.seed,
        initial_advances: opts.initial_advances,
        max_advances: opts.max_advances,
        delay: opts.delay,
        perfect_iv_count: opts.perfect_iv_count,
        always_sync: opts.always_sync,
        synchro_stat: opts.synchro_stat,
        shiny_charm: opts.shiny_charm,
        is_shiny_locked: opts.is_shiny_locked,
        is_forced_shiny: opts.is_forced_shiny,
        tsv: opts.tsv,
        ability: opts.ability,
        gender: opts.gender,
        species: opts.species,
        filter: opts.filter,
        is_transporter: false,
        transporter_genders: vec![],
        target: 0,
    };
    generate_states(opts)
}

#[derive(Debug, Clone, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct TransporterOpts {
    pub seed: u32,
    pub initial_advances: usize,
    pub max_advances: usize,
    pub delay: usize,
    pub target: usize,                                   // Index of target pkm
    pub transporter_genders: Vec<TransporterGenderType>, // Gender list of Transporter pokemon
    pub tsv: u16,
    pub filter: Stationary6Filter,
}

#[wasm_bindgen]
pub fn generate_transporter(opts: TransporterOpts) -> Vec<Stationary6State> {
    let target_gender = opts
        .transporter_genders
        .get(opts.target)
        .map(|target| *target)
        .unwrap_or(TransporterGenderType::RandomGender);
    let ability = match target_gender {
        TransporterGenderType::Mythical => AbilityType::First,
        _ => AbilityType::Hidden,
    };
    let perfect_iv_count = match target_gender {
        TransporterGenderType::Mythical => 5,
        _ => 3,
    };
    let opts = GenerateOpts {
        seed: opts.seed,
        initial_advances: opts.initial_advances,
        max_advances: opts.max_advances,
        delay: opts.delay,
        perfect_iv_count,
        is_transporter: true,
        target: opts.target,
        transporter_genders: opts.transporter_genders,
        always_sync: true,
        synchro_stat: None,
        shiny_charm: false,
        is_shiny_locked: true,
        is_forced_shiny: false,
        tsv: opts.tsv,
        ability: Some(ability),
        gender: None,
        species: Species::Mewtwo,
        filter: opts.filter,
    };
    generate_states(opts)
}

#[cfg(test)]
mod test {
    use super::*;

    mod filter {
        use super::*;

        #[test]
        fn good_shiny() {
            let filter = Stationary6Filter {
                gender: None,
                ability: None,
                nature: None,
                ivs: None,
                shiny: true,
            };
            let state = Stationary6State {
                shiny: true,
                ..Default::default()
            };
            assert!(filter.apply_filters(&state));
        }

        #[test]
        fn bad_shiny() {
            let filter = Stationary6Filter {
                gender: None,
                ability: None,
                nature: None,
                ivs: None,
                shiny: true,
            };
            let state = Stationary6State {
                shiny: false,
                ..Default::default()
            };
            assert!(!filter.apply_filters(&state));
        }

        #[test]
        fn good_nature() {
            let filter = Stationary6Filter {
                gender: None,
                ability: None,
                nature: Some(Nature::Hardy),
                ivs: None,
                shiny: false,
            };
            let state = Stationary6State {
                nature: Nature::Hardy,
                ..Default::default()
            };
            assert!(filter.apply_filters(&state));
        }

        #[test]
        fn bad_nature() {
            let filter = Stationary6Filter {
                gender: None,
                ability: None,
                nature: Some(Nature::Hardy),
                ivs: None,
                shiny: false,
            };
            let state = Stationary6State {
                nature: Nature::Adamant,
                ..Default::default()
            };
            assert!(!filter.apply_filters(&state));
        }

        #[test]
        fn good_ability() {
            let filter = Stationary6Filter {
                gender: None,
                ability: Some(AbilityType::Hidden),
                nature: None,
                ivs: None,
                shiny: false,
            };
            let state = Stationary6State {
                ability: AbilityType::Hidden,
                ..Default::default()
            };
            assert!(filter.apply_filters(&state));
        }

        #[test]
        fn bad_ability() {
            let filter = Stationary6Filter {
                gender: None,
                ability: Some(AbilityType::Hidden),
                nature: None,
                ivs: None,
                shiny: false,
            };
            let state = Stationary6State {
                ability: AbilityType::First,
                ..Default::default()
            };
            assert!(!filter.apply_filters(&state));
        }

        #[test]
        fn good_gender() {
            let filter = Stationary6Filter {
                gender: Some(Gender::Male),
                ability: None,
                nature: None,
                ivs: None,
                shiny: false,
            };
            let state = Stationary6State {
                gender: Gender::Male,
                ..Default::default()
            };
            assert!(filter.apply_filters(&state));
        }

        #[test]
        fn bad_gender() {
            let filter = Stationary6Filter {
                gender: Some(Gender::Male),
                ability: None,
                nature: None,
                ivs: None,
                shiny: false,
            };
            let state = Stationary6State {
                gender: Gender::Female,
                ..Default::default()
            };
            assert!(!filter.apply_filters(&state));
        }

        #[test]
        fn good_ivs() {
            let filter = Stationary6Filter {
                gender: None,
                ability: None,
                nature: None,
                ivs: Some(IvFilter {
                    min_ivs: Ivs {
                        hp: 20,
                        atk: 20,
                        def: 20,
                        spa: 20,
                        spd: 20,
                        spe: 20,
                    },
                    max_ivs: Ivs {
                        hp: 31,
                        atk: 31,
                        def: 31,
                        spa: 31,
                        spd: 31,
                        spe: 31,
                    },
                }),
                shiny: false,
            };
            let state = Stationary6State {
                ivs: Ivs {
                    hp: 20,
                    atk: 20,
                    def: 20,
                    spa: 20,
                    spd: 20,
                    spe: 20,
                },
                ..Default::default()
            };
            assert!(filter.apply_filters(&state));
        }

        #[test]
        fn bad_ivs() {
            let filter = Stationary6Filter {
                gender: None,
                ability: None,
                nature: None,
                ivs: Some(IvFilter {
                    min_ivs: Ivs {
                        hp: 20,
                        atk: 20,
                        def: 20,
                        spa: 20,
                        spd: 20,
                        spe: 20,
                    },
                    max_ivs: Ivs {
                        hp: 31,
                        atk: 31,
                        def: 31,
                        spa: 31,
                        spd: 31,
                        spe: 31,
                    },
                }),
                shiny: false,
            };
            let state = Stationary6State {
                ivs: Ivs {
                    hp: 0,
                    atk: 0,
                    def: 0,
                    spa: 0,
                    spd: 0,
                    spe: 0,
                },
                ..Default::default()
            };
            assert!(!filter.apply_filters(&state));
        }
    }

    mod stationary6 {
        use super::*;
        use crate::assert_list_eq;

        #[test]
        fn base_generate() {
            let opts = Stationary6Opts {
                seed: 0xaabbccdd,
                initial_advances: 0,
                max_advances: 3,
                delay: 0,
                ability: None,
                perfect_iv_count: 0,
                always_sync: false,
                synchro_stat: None,
                shiny_charm: false,
                is_shiny_locked: false,
                is_forced_shiny: false,
                tsv: 123,
                gender: None,
                species: Species::Pikachu,
                filter: Default::default(),
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

        #[test]
        fn initial_advances() {
            let opts = Stationary6Opts {
                seed: 0xaabbccdd,
                initial_advances: 4,
                max_advances: 3,
                delay: 0,
                ability: None,
                perfect_iv_count: 0,
                always_sync: false,
                synchro_stat: None,
                shiny_charm: false,
                is_shiny_locked: false,
                is_forced_shiny: false,
                tsv: 123,
                gender: None,
                species: Species::Pikachu,
                filter: Default::default(),
            };
            let result = generate_stationary6(opts);
            let expected = [
                Stationary6State {
                    advance: 4,
                    ivs: Ivs {
                        hp: 1,
                        atk: 5,
                        def: 0,
                        spa: 9,
                        spd: 14,
                        spe: 0,
                    },
                    nature: Nature::Relaxed,
                    psv: 3833,
                    gender: Gender::Male,
                    ability: AbilityType::First,
                    rng_state: 0x035941F8,
                    shiny: false,
                },
                Stationary6State {
                    advance: 5,
                    ivs: Ivs {
                        hp: 5,
                        atk: 0,
                        def: 9,
                        spa: 14,
                        spd: 0,
                        spe: 7,
                    },
                    nature: Nature::Jolly,
                    psv: 3045,
                    gender: Gender::Female,
                    ability: AbilityType::First,
                    rng_state: 0x844CBEDD,
                    shiny: false,
                },
                Stationary6State {
                    advance: 6,
                    ivs: Ivs {
                        hp: 0,
                        atk: 9,
                        def: 14,
                        spa: 0,
                        spd: 7,
                        spe: 9,
                    },
                    nature: Nature::Naughty,
                    psv: 0327,
                    gender: Gender::Female,
                    ability: AbilityType::Second,
                    rng_state: 0x9085A501,
                    shiny: false,
                },
                Stationary6State {
                    advance: 7,
                    ivs: Ivs {
                        hp: 9,
                        atk: 14,
                        def: 0,
                        spa: 7,
                        spd: 9,
                        spe: 17,
                    },
                    nature: Nature::Impish,
                    psv: 2248,
                    gender: Gender::Male,
                    ability: AbilityType::First,
                    rng_state: 0x511DB536,
                    shiny: false,
                },
            ];
            assert_list_eq!(result, expected);
        }

        #[test]
        fn always_sync() {
            let opts = Stationary6Opts {
                seed: 0xaabbccdd,
                initial_advances: 0,
                max_advances: 3,
                delay: 0,
                ability: None,
                perfect_iv_count: 0,
                always_sync: true,
                synchro_stat: None,
                shiny_charm: false,
                is_shiny_locked: false,
                is_forced_shiny: false,
                tsv: 123,
                gender: None,
                species: Species::Pikachu,
                filter: Default::default(),
            };
            let result = generate_stationary6(opts);
            let expected = [
                Stationary6State {
                    advance: 0,
                    ivs: Ivs {
                        hp: 18,
                        atk: 21,
                        def: 13,
                        spa: 16,
                        spd: 7,
                        spe: 14,
                    },
                    nature: Nature::Gentle,
                    psv: 2309,
                    gender: Gender::Male,
                    ability: AbilityType::First,
                    rng_state: 0xAABBCCDD,
                    shiny: false,
                },
                Stationary6State {
                    advance: 1,
                    ivs: Ivs {
                        hp: 21,
                        atk: 13,
                        def: 16,
                        spa: 7,
                        spd: 14,
                        spe: 13,
                    },
                    nature: Nature::Careful,
                    psv: 0679,
                    gender: Gender::Female,
                    ability: AbilityType::Second,
                    rng_state: 0x8AD42AFC,
                    shiny: false,
                },
                Stationary6State {
                    advance: 2,
                    ivs: Ivs {
                        hp: 13,
                        atk: 16,
                        def: 7,
                        spa: 14,
                        spd: 13,
                        spe: 28,
                    },
                    nature: Nature::Lax,
                    psv: 1438,
                    gender: Gender::Male,
                    ability: AbilityType::Second,
                    rng_state: 0xA5A8E438,
                    shiny: false,
                },
                Stationary6State {
                    advance: 3,
                    ivs: Ivs {
                        hp: 16,
                        atk: 7,
                        def: 14,
                        spa: 13,
                        spd: 28,
                        spe: 29,
                    },
                    nature: Nature::Calm,
                    psv: 0255,
                    gender: Gender::Female,
                    ability: AbilityType::First,
                    rng_state: 0x735B14E5,
                    shiny: false,
                },
            ];
            assert_list_eq!(result, expected);
        }

        #[test]
        fn three_perfect_ivs() {
            let opts = Stationary6Opts {
                seed: 0xaabbccdd,
                initial_advances: 0,
                max_advances: 3,
                delay: 0,
                ability: None,
                perfect_iv_count: 3,
                always_sync: false,
                synchro_stat: None,
                shiny_charm: false,
                is_shiny_locked: false,
                is_forced_shiny: false,
                tsv: 123,
                gender: None,
                species: Species::Pikachu,
                filter: Default::default(),
            };
            let result = generate_stationary6(opts);
            let expected = [
                Stationary6State {
                    advance: 0,
                    ivs: Ivs {
                        hp: 31,
                        atk: 31,
                        def: 31,
                        spa: 0,
                        spd: 9,
                        spe: 14,
                    },
                    nature: Nature::Bold,
                    psv: 3377,
                    gender: Gender::Female,
                    ability: AbilityType::First,
                    rng_state: 0xAABBCCDD,
                    shiny: false,
                },
                Stationary6State {
                    advance: 1,
                    ivs: Ivs {
                        hp: 31,
                        atk: 31,
                        def: 31,
                        spa: 0,
                        spd: 9,
                        spe: 14,
                    },
                    nature: Nature::Bold,
                    psv: 1607,
                    gender: Gender::Female,
                    ability: AbilityType::First,
                    rng_state: 0x8AD42AFC,
                    shiny: false,
                },
                Stationary6State {
                    advance: 2,
                    ivs: Ivs {
                        hp: 31,
                        atk: 31,
                        def: 31,
                        spa: 0,
                        spd: 7,
                        spe: 9,
                    },
                    nature: Nature::Naughty,
                    psv: 3532,
                    gender: Gender::Female,
                    ability: AbilityType::Second,
                    rng_state: 0xA5A8E438,
                    shiny: false,
                },
                Stationary6State {
                    advance: 3,
                    ivs: Ivs {
                        hp: 31,
                        atk: 31,
                        def: 31,
                        spa: 0,
                        spd: 7,
                        spe: 9,
                    },
                    nature: Nature::Naughty,
                    psv: 3768,
                    gender: Gender::Female,
                    ability: AbilityType::Second,
                    rng_state: 0x735B14E5,
                    shiny: false,
                },
            ];

            assert_list_eq!(result, expected);
        }

        #[test]
        fn gender_ratio() {
            let opts = Stationary6Opts {
                seed: 0xaabbccdd,
                initial_advances: 0,
                max_advances: 3,
                delay: 0,
                ability: None,
                perfect_iv_count: 0,
                always_sync: false,
                synchro_stat: None,
                shiny_charm: false,
                is_shiny_locked: false,
                is_forced_shiny: false,
                tsv: 123,
                gender: None,
                species: Species::Arcanine,
                filter: Default::default(),
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
                    gender: Gender::Male,
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
                    gender: Gender::Male,
                    ability: AbilityType::First,
                    rng_state: 0x735B14E5,
                    shiny: false,
                },
            ];

            assert_list_eq!(result, expected);
        }

        #[test]
        fn ability_lock() {
            let opts = Stationary6Opts {
                seed: 0xaabbccdd,
                initial_advances: 0,
                max_advances: 3,
                delay: 0,
                ability: Some(AbilityType::Hidden),
                perfect_iv_count: 0,
                always_sync: false,
                synchro_stat: None,
                shiny_charm: false,
                is_shiny_locked: false,
                is_forced_shiny: false,
                tsv: 123,
                gender: None,
                species: Species::Pikachu,
                filter: Default::default(),
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
                    nature: Nature::Hardy,
                    psv: 3377,
                    gender: Gender::Female,
                    ability: AbilityType::Hidden,
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
                    nature: Nature::Relaxed,
                    psv: 1607,
                    gender: Gender::Female,
                    ability: AbilityType::Hidden,
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
                    nature: Nature::Hasty,
                    psv: 3532,
                    gender: Gender::Female,
                    ability: AbilityType::Hidden,
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
                    nature: Nature::Hardy,
                    psv: 3768,
                    gender: Gender::Female,
                    ability: AbilityType::Hidden,
                    rng_state: 0x735B14E5,
                    shiny: false,
                },
            ];
            assert_list_eq!(result, expected);
        }

        #[test]
        fn shiny_lock() {
            let opts = Stationary6Opts {
                seed: 0xaabbccdd,
                initial_advances: 0,
                max_advances: 12000,
                delay: 0,
                ability: None,
                perfect_iv_count: 0,
                always_sync: false,
                synchro_stat: None,
                shiny_charm: false,
                is_shiny_locked: true,
                is_forced_shiny: false,
                tsv: 123,
                gender: None,
                species: Species::Pikachu,
                filter: Stationary6Filter {
                    ability: None,
                    gender: None,
                    nature: None,
                    ivs: None,
                    shiny: true,
                },
            };
            let result = generate_stationary6(opts);
            let expected = [];
            assert_list_eq!(result, expected);
        }

        #[test]
        fn shiny_charm() {
            let opts = Stationary6Opts {
                seed: 0xaabbccdd,
                initial_advances: 3282,
                max_advances: 1000,
                delay: 0,
                ability: None,
                perfect_iv_count: 0,
                always_sync: false,
                synchro_stat: None,
                shiny_charm: true,
                is_shiny_locked: false,
                is_forced_shiny: false,
                tsv: 123,
                gender: None,
                species: Species::Pikachu,
                filter: Stationary6Filter {
                    shiny: true,
                    ..Default::default()
                },
            };
            let result = generate_stationary6(opts);
            let expected = [
                Stationary6State {
                    advance: 3282,
                    ivs: Ivs {
                        hp: 22,
                        atk: 23,
                        def: 31,
                        spa: 5,
                        spd: 23,
                        spe: 8,
                    },
                    nature: Nature::Jolly,
                    psv: 0123,
                    gender: Gender::Male,
                    ability: AbilityType::Second,
                    rng_state: 0xD74B9F2A,
                    shiny: true,
                },
                Stationary6State {
                    advance: 3713,
                    ivs: Ivs {
                        hp: 4,
                        atk: 20,
                        def: 31,
                        spa: 12,
                        spd: 21,
                        spe: 8,
                    },
                    nature: Nature::Timid,
                    psv: 0123,
                    gender: Gender::Male,
                    ability: AbilityType::Second,
                    rng_state: 0x7457F4A3,
                    shiny: true,
                },
                Stationary6State {
                    advance: 3714,
                    ivs: Ivs {
                        hp: 4,
                        atk: 20,
                        def: 31,
                        spa: 12,
                        spd: 21,
                        spe: 8,
                    },
                    nature: Nature::Timid,
                    psv: 0123,
                    gender: Gender::Male,
                    ability: AbilityType::Second,
                    rng_state: 0x5CFE7DE1,
                    shiny: true,
                },
                Stationary6State {
                    advance: 3715,
                    ivs: Ivs {
                        hp: 4,
                        atk: 20,
                        def: 31,
                        spa: 12,
                        spd: 21,
                        spe: 8,
                    },
                    nature: Nature::Timid,
                    psv: 0123,
                    gender: Gender::Male,
                    ability: AbilityType::Second,
                    rng_state: 0x2D4B1238,
                    shiny: true,
                },
            ];
            assert_list_eq!(result, expected);
        }
    }

    mod transporter {
        use super::*;
        use crate::assert_list_eq;

        #[test]
        fn base_generate() {
            let opts = TransporterOpts {
                seed: 0xAABBCCDD,
                initial_advances: 0,
                max_advances: 3,
                delay: 0,
                target: 1,
                transporter_genders: vec![TransporterGenderType::RandomGender],
                tsv: 123,
                filter: Default::default(),
            };
            let result = generate_transporter(opts);
            let expected = [
                Stationary6State {
                    advance: 0,
                    ivs: Ivs {
                        hp: 16,
                        atk: 7,
                        def: 31,
                        spa: 31,
                        spd: 31,
                        spe: 14,
                    },
                    nature: Nature::Timid,
                    psv: 2309,
                    gender: Gender::Genderless,
                    ability: AbilityType::Hidden,
                    rng_state: 0xAABBCCDD,
                    shiny: false,
                },
                Stationary6State {
                    advance: 1,
                    ivs: Ivs {
                        hp: 7,
                        atk: 14,
                        def: 31,
                        spa: 31,
                        spd: 31,
                        spe: 13,
                    },
                    nature: Nature::Gentle,
                    psv: 0679,
                    gender: Gender::Genderless,
                    ability: AbilityType::Hidden,
                    rng_state: 0x8AD42AFC,
                    shiny: false,
                },
                Stationary6State {
                    advance: 2,
                    ivs: Ivs {
                        hp: 14,
                        atk: 31,
                        def: 31,
                        spa: 31,
                        spd: 13,
                        spe: 28,
                    },
                    nature: Nature::Careful,
                    psv: 1438,
                    gender: Gender::Genderless,
                    ability: AbilityType::Hidden,
                    rng_state: 0xA5A8E438,
                    shiny: false,
                },
                Stationary6State {
                    advance: 3,
                    ivs: Ivs {
                        hp: 13,
                        atk: 31,
                        def: 31,
                        spa: 31,
                        spd: 28,
                        spe: 29,
                    },
                    nature: Nature::Lax,
                    psv: 0255,
                    gender: Gender::Genderless,
                    ability: AbilityType::Hidden,
                    rng_state: 0x735B14E5,
                    shiny: false,
                },
            ];
            assert_list_eq!(result, expected);
        }

        #[test]
        fn target_index() {
            let opts = TransporterOpts {
                seed: 0xAABBCCDD,
                initial_advances: 0,
                max_advances: 3,
                delay: 0,
                target: 4,
                transporter_genders: vec![TransporterGenderType::RandomGender; 4],
                tsv: 123,
                filter: Default::default(),
            };
            let result = generate_transporter(opts);
            let expected = [
                Stationary6State {
                    advance: 0,
                    ivs: Ivs {
                        hp: 5,
                        atk: 31,
                        def: 31,
                        spa: 31,
                        spd: 15,
                        spe: 11,
                    },
                    nature: Nature::Sassy,
                    psv: 2181,
                    gender: Gender::Genderless,
                    ability: AbilityType::Hidden,
                    rng_state: 0xAABBCCDD,
                    shiny: false,
                },
                Stationary6State {
                    advance: 1,
                    ivs: Ivs {
                        hp: 15,
                        atk: 31,
                        def: 31,
                        spa: 31,
                        spd: 11,
                        spe: 28,
                    },
                    nature: Nature::Careful,
                    psv: 1896,
                    gender: Gender::Genderless,
                    ability: AbilityType::Hidden,
                    rng_state: 0x8AD42AFC,
                    shiny: false,
                },
                Stationary6State {
                    advance: 2,
                    ivs: Ivs {
                        hp: 15,
                        atk: 31,
                        def: 31,
                        spa: 31,
                        spd: 11,
                        spe: 28,
                    },
                    nature: Nature::Careful,
                    psv: 1896,
                    gender: Gender::Genderless,
                    ability: AbilityType::Hidden,
                    rng_state: 0xA5A8E438,
                    shiny: false,
                },
                Stationary6State {
                    advance: 3,
                    ivs: Ivs {
                        hp: 15,
                        atk: 31,
                        def: 31,
                        spa: 31,
                        spd: 11,
                        spe: 28,
                    },
                    nature: Nature::Careful,
                    psv: 1661,
                    gender: Gender::Genderless,
                    ability: AbilityType::Hidden,
                    rng_state: 0x735B14E5,
                    shiny: false,
                },
            ];
            assert_list_eq!(result, expected);
        }

        #[test]
        fn mythical() {
            let opts = TransporterOpts {
                seed: 0xAABBCCDD,
                initial_advances: 0,
                max_advances: 3,
                delay: 0,
                target: 0,
                transporter_genders: vec![TransporterGenderType::Mythical],
                tsv: 123,
                filter: Default::default(),
            };
            let result = generate_transporter(opts);
            let expected = [
                Stationary6State {
                    advance: 0,
                    ivs: Ivs {
                        hp: 29,
                        atk: 31,
                        def: 31,
                        spa: 31,
                        spd: 31,
                        spe: 31,
                    },
                    nature: Nature::Lax,
                    psv: 2309,
                    gender: Gender::Genderless,
                    ability: AbilityType::First,
                    rng_state: 0xAABBCCDD,
                    shiny: false,
                },
                Stationary6State {
                    advance: 1,
                    ivs: Ivs {
                        hp: 29,
                        atk: 31,
                        def: 31,
                        spa: 31,
                        spd: 31,
                        spe: 31,
                    },
                    nature: Nature::Lax,
                    psv: 0679,
                    gender: Gender::Genderless,
                    ability: AbilityType::First,
                    rng_state: 0x8AD42AFC,
                    shiny: false,
                },
                Stationary6State {
                    advance: 2,
                    ivs: Ivs {
                        hp: 7,
                        atk: 31,
                        def: 31,
                        spa: 31,
                        spd: 31,
                        spe: 31,
                    },
                    nature: Nature::Adamant,
                    psv: 1438,
                    gender: Gender::Genderless,
                    ability: AbilityType::First,
                    rng_state: 0xA5A8E438,
                    shiny: false,
                },
                Stationary6State {
                    advance: 3,
                    ivs: Ivs {
                        hp: 7,
                        atk: 31,
                        def: 31,
                        spa: 31,
                        spd: 31,
                        spe: 31,
                    },
                    nature: Nature::Adamant,
                    psv: 0255,
                    gender: Gender::Genderless,
                    ability: AbilityType::First,
                    rng_state: 0x735B14E5,
                    shiny: false,
                },
            ];
            assert_list_eq!(result, expected);
        }

        #[test]
        fn preceding_fixed_natures() {
            let opts: TransporterOpts = TransporterOpts {
                seed: 0xAABBCCDD,
                initial_advances: 0,
                max_advances: 3,
                delay: 0,
                target: 4,
                transporter_genders: vec![
                    TransporterGenderType::NoGender,
                    TransporterGenderType::NoGender,
                    TransporterGenderType::NoGender,
                    TransporterGenderType::RandomGender,
                ],
                tsv: 123,
                filter: Default::default(),
            };
            let result = generate_transporter(opts);
            let expected = [
                Stationary6State {
                    advance: 0,
                    ivs: Ivs {
                        hp: 31,
                        atk: 27,
                        def: 9,
                        spa: 18,
                        spd: 31,
                        spe: 31,
                    },
                    nature: Nature::Serious,
                    psv: 1548,
                    gender: Gender::Genderless,
                    ability: AbilityType::Hidden,
                    rng_state: 0xAABBCCDD,
                    shiny: false,
                },
                Stationary6State {
                    advance: 1,
                    ivs: Ivs {
                        hp: 18,
                        atk: 31,
                        def: 16,
                        spa: 16,
                        spd: 31,
                        spe: 31,
                    },
                    nature: Nature::Lax,
                    psv: 2980,
                    gender: Gender::Genderless,
                    ability: AbilityType::Hidden,
                    rng_state: 0x8AD42AFC,
                    shiny: false,
                },
                Stationary6State {
                    advance: 2,
                    ivs: Ivs {
                        hp: 16,
                        atk: 31,
                        def: 16,
                        spa: 31,
                        spd: 11,
                        spe: 31,
                    },
                    nature: Nature::Naughty,
                    psv: 1861,
                    gender: Gender::Genderless,
                    ability: AbilityType::Hidden,
                    rng_state: 0xA5A8E438,
                    shiny: false,
                },
                Stationary6State {
                    advance: 3,
                    ivs: Ivs {
                        hp: 16,
                        atk: 31,
                        def: 16,
                        spa: 31,
                        spd: 11,
                        spe: 31,
                    },
                    nature: Nature::Naughty,
                    psv: 1861,
                    gender: Gender::Genderless,
                    ability: AbilityType::Hidden,
                    rng_state: 0x735B14E5,
                    shiny: false,
                },
            ];
            assert_list_eq!(result, expected);
        }

        #[test]
        fn preceding_mythical_natures() {
            let opts = TransporterOpts {
                seed: 0xAABBCCDD,
                initial_advances: 0,
                max_advances: 3,
                delay: 0,
                target: 4,
                transporter_genders: vec![
                    TransporterGenderType::Mythical,
                    TransporterGenderType::Mythical,
                    TransporterGenderType::Mythical,
                    TransporterGenderType::RandomGender,
                ],
                tsv: 123,
                filter: Default::default(),
            };
            let result = generate_transporter(opts);
            let expected = [
                Stationary6State {
                    advance: 0,
                    ivs: Ivs {
                        hp: 28,
                        atk: 31,
                        def: 5,
                        spa: 31,
                        spd: 31,
                        spe: 28,
                    },
                    nature: Nature::Calm,
                    psv: 4069,
                    gender: Gender::Genderless,
                    ability: AbilityType::Hidden,
                    rng_state: 0xAABBCCDD,
                    shiny: false,
                },
                Stationary6State {
                    advance: 1,
                    ivs: Ivs {
                        hp: 28,
                        atk: 31,
                        def: 5,
                        spa: 31,
                        spd: 31,
                        spe: 28,
                    },
                    nature: Nature::Calm,
                    psv: 4069,
                    gender: Gender::Genderless,
                    ability: AbilityType::Hidden,
                    rng_state: 0x8AD42AFC,
                    shiny: false,
                },
                Stationary6State {
                    advance: 2,
                    ivs: Ivs {
                        hp: 28,
                        atk: 31,
                        def: 5,
                        spa: 31,
                        spd: 31,
                        spe: 28,
                    },
                    nature: Nature::Calm,
                    psv: 4069,
                    gender: Gender::Genderless,
                    ability: AbilityType::Hidden,
                    rng_state: 0xA5A8E438,
                    shiny: false,
                },
                Stationary6State {
                    advance: 3,
                    ivs: Ivs {
                        hp: 28,
                        atk: 31,
                        def: 5,
                        spa: 31,
                        spd: 31,
                        spe: 28,
                    },
                    nature: Nature::Calm,
                    psv: 4069,
                    gender: Gender::Genderless,
                    ability: AbilityType::Hidden,
                    rng_state: 0x735B14E5,
                    shiny: false,
                },
            ];
            assert_list_eq!(result, expected);
        }
    }
}
