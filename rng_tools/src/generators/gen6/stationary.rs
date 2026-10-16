use crate::pkm::gen6_psv;
use crate::rng::StateIterator;
use crate::rng::{Rng, mt::MT};
use crate::{AbilityType, G5Idx, Gender, IvFilter, Ivs, Nature, ShinyFilter, ShinyType, Species, TsvTrv};
use serde::{Deserialize, Serialize};
use tsify::Tsify;
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
    pub shiny: ShinyType,
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
    pub shiny: ShinyFilter,
}

impl Stationary6Filter {
    fn apply_filters(&self, state: &Stationary6State) -> bool {
        if let Some(filter_ivs) = &self.ivs
            && !state.ivs.filter(&filter_ivs.min_ivs, &filter_ivs.max_ivs)
        {
            return false;
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

        if !self.shiny.allows(state.shiny) {
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
    tid: u16,
    sid: u16,
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

    let mut pid = 0;
    let mut shiny = ShinyType::NotShiny;
    let tsv_trv = TsvTrv::from_tid_sid(opts.tid, opts.sid);

    for _ in 0..pid_reroll_count {
        pid = rng.rand();
        shiny = tsv_trv.shiny_type_gen6_plus(pid);
        if shiny.is_shiny() {
            if opts.is_shiny_locked {
                pid ^= 0x10000000;
                shiny = ShinyType::NotShiny;
            }
            break;
        } else if opts.is_forced_shiny && !opts.is_shiny_locked {
            let low = pid as u16;
            pid = (u32::from(low ^ tsv_trv.tid_xor_sid) << 16) | u32::from(low);
            shiny = ShinyType::SquareShiny;
            break;
        }
    }

    result.psv = gen6_psv(pid);
    result.shiny = shiny;

    // IVs
    let mut set_ivs = [false; 6];
    let mut i = 0;
    while i < opts.perfect_iv_count {
        let set_idx = rng.rand_max(6) as usize;
        let iv_idx = G5Idx::from(set_idx as u8);
        if !set_ivs[set_idx] {
            result.ivs[iv_idx] = 31;
            set_ivs[set_idx] = true;
            i += 1;
        }
    }

    for (i, is_iv_set) in set_ivs.iter().enumerate() {
        let idx = G5Idx::from(i as u8);
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
    pub tid: u16,
    pub sid: u16,
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
        tid: opts.tid,
        sid: opts.sid,
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
    pub tid: u16,
    pub sid: u16,
    pub filter: Stationary6Filter,
}

#[wasm_bindgen]
pub fn generate_transporter(opts: TransporterOpts) -> Vec<Stationary6State> {
    let target_gender = opts
        .transporter_genders
        .get(opts.target)
        .copied()
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
        tid: opts.tid,
        sid: opts.sid,
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

    #[test]
    fn trainer_ids_classify_shiny_without_extra_rerolls() {
        let mut rng = MT::new(0xaabbccdd);
        rng.advance(2);
        let pid = rng.rand::<u32>();
        let pid_xor = (pid >> 16) as u16 ^ pid as u16;
        let mut opts = Stationary6Opts {
            seed: 0xaabbccdd, initial_advances: 0, max_advances: 0,
            delay: 0, perfect_iv_count: 0, always_sync: true, synchro_stat: None,
            shiny_charm: true, is_shiny_locked: false, is_forced_shiny: false,
            tid: 12345, sid: 12345 ^ pid_xor,
            ability: None, gender: None, species: Species::Pikachu,
            filter: Stationary6Filter::default(),
        };
        let square = generate_stationary6(opts.clone());
        assert_eq!(square[0].shiny, ShinyType::SquareShiny);
        opts.sid ^= 1;
        let star = generate_stationary6(opts.clone());
        assert_eq!(star[0].shiny, ShinyType::StarShiny);
        assert_eq!(star[0].ivs, square[0].ivs);
        opts.filter.shiny = ShinyFilter::SquareShiny;
        assert!(generate_stationary6(opts.clone()).is_empty());
        opts.filter.shiny = ShinyFilter::StarShiny;
        assert_eq!(generate_stationary6(opts.clone()), star);
        opts.is_shiny_locked = true;
        assert!(generate_stationary6(opts).is_empty());
    }

    mod filter {
        use super::*;

        #[test]
        fn good_shiny() {
            let filter = Stationary6Filter {
                gender: None,
                ability: None,
                nature: None,
                ivs: None,
                shiny: ShinyFilter::AnyShiny,
            };
            let state = Stationary6State {
                shiny: ShinyType::StarShiny,
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
                shiny: ShinyFilter::AnyShiny,
            };
            let state = Stationary6State {
                shiny: ShinyType::NotShiny,
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
                shiny: ShinyFilter::Any,
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
                shiny: ShinyFilter::Any,
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
                shiny: ShinyFilter::Any,
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
                shiny: ShinyFilter::Any,
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
                shiny: ShinyFilter::Any,
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
                shiny: ShinyFilter::Any,
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
                shiny: ShinyFilter::Any,
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
                shiny: ShinyFilter::Any,
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
                tid: 123 << 4,
                sid: 0,
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
                    shiny: ShinyType::NotShiny,
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
                    shiny: ShinyType::NotShiny,
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
                    shiny: ShinyType::NotShiny,
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
                    shiny: ShinyType::NotShiny,
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
                tid: 123 << 4,
                sid: 0,
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
                    shiny: ShinyType::NotShiny,
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
                    shiny: ShinyType::NotShiny,
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
                    shiny: ShinyType::NotShiny,
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
                    shiny: ShinyType::NotShiny,
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
                tid: 123 << 4,
                sid: 0,
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
                    shiny: ShinyType::NotShiny,
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
                    shiny: ShinyType::NotShiny,
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
                    shiny: ShinyType::NotShiny,
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
                    shiny: ShinyType::NotShiny,
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
                tid: 123 << 4,
                sid: 0,
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
                    shiny: ShinyType::NotShiny,
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
                    shiny: ShinyType::NotShiny,
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
                    shiny: ShinyType::NotShiny,
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
                    shiny: ShinyType::NotShiny,
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
                tid: 123 << 4,
                sid: 0,
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
                    shiny: ShinyType::NotShiny,
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
                    shiny: ShinyType::NotShiny,
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
                    shiny: ShinyType::NotShiny,
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
                    shiny: ShinyType::NotShiny,
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
                tid: 123 << 4,
                sid: 0,
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
                    shiny: ShinyType::NotShiny,
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
                    shiny: ShinyType::NotShiny,
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
                    shiny: ShinyType::NotShiny,
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
                    shiny: ShinyType::NotShiny,
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
                tid: 123 << 4,
                sid: 0,
                gender: None,
                species: Species::Pikachu,
                filter: Stationary6Filter {
                    ability: None,
                    gender: None,
                    nature: None,
                    ivs: None,
                    shiny: ShinyFilter::AnyShiny,
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
                tid: 123 << 4,
                sid: 0,
                gender: None,
                species: Species::Pikachu,
                filter: Stationary6Filter {
                    shiny: ShinyFilter::AnyShiny,
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
                    shiny: ShinyType::StarShiny,
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
                    shiny: ShinyType::SquareShiny,
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
                    shiny: ShinyType::SquareShiny,
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
                    shiny: ShinyType::SquareShiny,
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
                tid: 123 << 4,
                sid: 0,
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
                    shiny: ShinyType::NotShiny,
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
                    shiny: ShinyType::NotShiny,
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
                    shiny: ShinyType::NotShiny,
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
                    shiny: ShinyType::NotShiny,
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
                tid: 123 << 4,
                sid: 0,
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
                    shiny: ShinyType::NotShiny,
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
                    shiny: ShinyType::NotShiny,
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
                    shiny: ShinyType::NotShiny,
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
                    shiny: ShinyType::NotShiny,
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
                tid: 123 << 4,
                sid: 0,
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
                    shiny: ShinyType::NotShiny,
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
                    shiny: ShinyType::NotShiny,
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
                    shiny: ShinyType::NotShiny,
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
                    shiny: ShinyType::NotShiny,
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
                tid: 123 << 4,
                sid: 0,
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
                    shiny: ShinyType::NotShiny,
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
                    shiny: ShinyType::NotShiny,
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
                    shiny: ShinyType::NotShiny,
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
                    shiny: ShinyType::NotShiny,
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
                tid: 123 << 4,
                sid: 0,
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
                    shiny: ShinyType::NotShiny,
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
                    shiny: ShinyType::NotShiny,
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
                    shiny: ShinyType::NotShiny,
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
                    shiny: ShinyType::NotShiny,
                },
            ];
            assert_list_eq!(result, expected);
        }
    }
}
