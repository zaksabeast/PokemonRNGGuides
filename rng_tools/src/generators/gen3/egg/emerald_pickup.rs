use crate::rng::lcrng::Pokerng;
use crate::rng::{Rng, StateIterator};
use crate::{
    G3Idx::{self, *},
    HiddenPower, HiddenPowerFilter, Ivs,
};
use crate::{InheritedIv, InheritedIvs, PartialIvs};

use serde::{Deserialize, Serialize};
use tsify::Tsify;
use wasm_bindgen::prelude::*;

#[derive(Debug, Clone, PartialEq, Eq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub enum Gen3PickupMethod {
    EmeraldBred,
    EmeraldBredSplit,
    EmeraldBredAlternate,
}

impl Gen3PickupMethod {
    fn iv1_advance(&self) -> usize {
        match self {
            Self::EmeraldBred => 0,
            Self::EmeraldBredSplit => 0,
            Self::EmeraldBredAlternate => 0,
        }
    }

    fn iv2_advance(&self) -> usize {
        match self {
            Self::EmeraldBred => 0,
            Self::EmeraldBredSplit => 1,
            Self::EmeraldBredAlternate => 0,
        }
    }

    fn iv_inherit_advance(&self) -> usize {
        match self {
            Self::EmeraldBred => 1,
            Self::EmeraldBredSplit => 1,
            Self::EmeraldBredAlternate => 2,
        }
    }
}

#[derive(Debug, Clone, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct Egg3PickupOptions {
    pub delay: usize,
    pub seed: u32,
    pub initial_advances: usize,
    pub max_advances: usize,
    pub parent_ivs: [PartialIvs; 2],
    pub method: Gen3PickupMethod,
    pub filter_min_ivs: Ivs,
    pub filter_max_ivs: Ivs,
    pub filter_hidden_power: HiddenPowerFilter,
}

impl Egg3PickupOptions {
    fn pass_filter(&self, ivs: &InheritedIvs) -> bool {
        if !ivs.filter(&self.filter_min_ivs, &self.filter_max_ivs) {
            return false;
        }

        if !self.filter_hidden_power.active {
            return true;
        }

        ivs.try_as_ivs()
            .is_some_and(|ivs| self.filter_hidden_power.pass_filter(&ivs))
    }
}

#[derive(Debug, Clone, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct Egg3PickupState {
    pub advance: usize,
    pub ivs: InheritedIvs,
    pub hidden_power: Option<HiddenPower>,
}

impl Egg3PickupState {
    fn new(advance: usize, ivs: InheritedIvs) -> Self {
        let hidden_power = ivs.try_as_ivs().map(|ivs| HiddenPower::from_ivs(&ivs));

        Self {
            advance,
            ivs,
            hidden_power,
        }
    }
}

#[wasm_bindgen]
pub fn emerald_egg_pickup_states(opts: &Egg3PickupOptions) -> Vec<Egg3PickupState> {
    StateIterator::new(Pokerng::new(opts.seed))
        .enumerate()
        .skip(opts.initial_advances)
        .take(opts.max_advances.saturating_add(1))
        .filter_map(|(advance, rng)| {
            let ivs = generate_pickup_ivs(opts, rng);
            if opts.pass_filter(&ivs) {
                Some(Egg3PickupState::new(
                    advance.saturating_sub(opts.delay),
                    ivs,
                ))
            } else {
                None
            }
        })
        .collect()
}

fn get_inherited_iv(parent_ivs: &[PartialIvs; 2], slot: usize, stat: G3Idx) -> InheritedIv {
    match slot {
        0 => InheritedIv::Parent1(parent_ivs[0][stat]),
        _ => InheritedIv::Parent2(parent_ivs[1][stat]),
    }
}

fn generate_pickup_ivs(opts: &Egg3PickupOptions, mut rng: Pokerng) -> InheritedIvs {
    rng.advance(opts.method.iv1_advance());
    let iv1 = rng.rand::<u16>();
    rng.advance(opts.method.iv2_advance());
    let iv2 = rng.rand::<u16>();

    let mut ivs: InheritedIvs = Ivs::new_g3(iv1, iv2).into();

    rng.advance(opts.method.iv_inherit_advance());
    let inherited_ivs: [usize; 3] = [
        rng.rand_max::<u16>(6).into(),
        rng.rand_max::<u16>(5).into(),
        rng.rand_max::<u16>(4).into(),
    ];
    let parent_slot: [usize; 3] = [
        rng.rand_max::<u16>(2).into(),
        rng.rand_max::<u16>(2).into(),
        rng.rand_max::<u16>(2).into(),
    ];

    let available1: [G3Idx; 6] = [Hp, Atk, Def, Spe, Spa, Spd];
    let available2: [G3Idx; 5] = [Atk, Def, Spe, Spa, Spd];
    let available3: [G3Idx; 4] = [Atk, Spe, Spa, Spd];

    let stat = available1[inherited_ivs[0]];
    ivs[stat] = get_inherited_iv(&opts.parent_ivs, parent_slot[0], stat);

    let stat = available2[inherited_ivs[1]];
    ivs[stat] = get_inherited_iv(&opts.parent_ivs, parent_slot[1], stat);

    let stat = available3[inherited_ivs[2]];
    ivs[stat] = get_inherited_iv(&opts.parent_ivs, parent_slot[2], stat);

    ivs
}

#[cfg(test)]
mod test {
    use super::*;
    use crate::assert_list_eq;
    use crate::ivs::InheritedIv::*;

    fn state(advance: usize, ivs: InheritedIvs) -> Egg3PickupState {
        Egg3PickupState::new(advance, ivs)
    }

    const MALE_IVS: PartialIvs = PartialIvs {
        hp: Some(1),
        atk: Some(2),
        def: Some(3),
        spa: Some(4),
        spd: Some(5),
        spe: Some(6),
    };
    const FEMALE_IVS: PartialIvs = PartialIvs {
        hp: Some(7),
        atk: Some(8),
        def: Some(9),
        spa: Some(10),
        spd: Some(11),
        spe: Some(12),
    };

    #[test]
    fn generate_emerald_bred_results() {
        let opts = Egg3PickupOptions {
            delay: 0,
            parent_ivs: [MALE_IVS, FEMALE_IVS],
            method: Gen3PickupMethod::EmeraldBred,
            initial_advances: 0,
            max_advances: 10,
            seed: 0,
            filter_min_ivs: Ivs::new_all0(),
            filter_max_ivs: Ivs::new_all31(),
            filter_hidden_power: HiddenPowerFilter::default(),
        };

        let results = emerald_egg_pickup_states(&opts);
        let expected = [
            state(
                0,
                InheritedIvs {
                    hp: Parent2(Some(7)),
                    atk: Parent2(Some(8)),
                    def: Random(0),
                    spa: Parent2(Some(10)),
                    spd: Random(26),
                    spe: Random(30),
                },
            ),
            state(
                1,
                InheritedIvs {
                    hp: Random(30),
                    atk: Parent2(Some(8)),
                    def: Random(26),
                    spa: Parent2(Some(10)),
                    spd: Random(20),
                    spe: Parent1(Some(6)),
                },
            ),
            state(
                2,
                InheritedIvs {
                    hp: Random(17),
                    atk: Random(19),
                    def: Random(20),
                    spa: Parent2(Some(10)),
                    spd: Parent1(Some(5)),
                    spe: Parent1(Some(6)),
                },
            ),
            state(
                3,
                InheritedIvs {
                    hp: Random(16),
                    atk: Random(13),
                    def: Random(12),
                    spa: Random(18),
                    spd: Parent2(Some(11)),
                    spe: Parent1(Some(6)),
                },
            ),
            state(
                4,
                InheritedIvs {
                    hp: Random(2),
                    atk: Parent1(Some(2)),
                    def: Random(3),
                    spa: Parent2(Some(10)),
                    spd: Random(24),
                    spe: Random(12),
                },
            ),
            state(
                5,
                InheritedIvs {
                    hp: Random(12),
                    atk: Random(22),
                    def: Random(24),
                    spa: Parent2(Some(10)),
                    spd: Random(11),
                    spe: Parent2(Some(12)),
                },
            ),
            state(
                6,
                InheritedIvs {
                    hp: Random(5),
                    atk: Random(30),
                    def: Parent2(Some(9)),
                    spa: Parent1(Some(4)),
                    spd: Random(25),
                    spe: Parent1(Some(6)),
                },
            ),
            state(
                7,
                InheritedIvs {
                    hp: Random(27),
                    atk: Random(30),
                    def: Random(25),
                    spa: Parent2(Some(10)),
                    spd: Parent1(Some(5)),
                    spe: Random(19),
                },
            ),
            state(
                8,
                InheritedIvs {
                    hp: Random(19),
                    atk: Random(1),
                    def: Random(31),
                    spa: Random(25),
                    spd: Parent2(Some(11)),
                    spe: Parent1(Some(6)),
                },
            ),
            state(
                9,
                InheritedIvs {
                    hp: Random(12),
                    atk: Parent1(Some(2)),
                    def: Parent2(Some(9)),
                    spa: Random(2),
                    spd: Parent1(Some(5)),
                    spe: Random(30),
                },
            ),
            state(
                10,
                InheritedIvs {
                    hp: Random(30),
                    atk: Parent1(Some(2)),
                    def: Random(31),
                    spa: Random(22),
                    spd: Parent1(Some(5)),
                    spe: Random(5),
                },
            ),
        ];

        assert_list_eq!(results, expected);
    }

    #[test]
    fn generate_emerald_bred_split_results() {
        let opts = Egg3PickupOptions {
            delay: 0,
            parent_ivs: [MALE_IVS, FEMALE_IVS],
            method: Gen3PickupMethod::EmeraldBredSplit,
            initial_advances: 0,
            max_advances: 10,
            seed: 0,
            filter_min_ivs: Ivs::new_all0(),
            filter_max_ivs: Ivs::new_all31(),
            filter_hidden_power: HiddenPowerFilter::default(),
        };

        let results = emerald_egg_pickup_states(&opts);
        let expected = [
            state(
                0,
                InheritedIvs {
                    hp: Random(0),
                    atk: Parent2(Some(8)),
                    def: Random(0),
                    spa: Parent2(Some(10)),
                    spd: Random(20),
                    spe: Parent1(Some(6)),
                },
            ),
            state(
                1,
                InheritedIvs {
                    hp: Random(30),
                    atk: Random(11),
                    def: Random(26),
                    spa: Parent2(Some(10)),
                    spd: Parent1(Some(5)),
                    spe: Parent1(Some(6)),
                },
            ),
            state(
                2,
                InheritedIvs {
                    hp: Random(17),
                    atk: Random(19),
                    def: Random(20),
                    spa: Random(18),
                    spd: Parent2(Some(11)),
                    spe: Parent1(Some(6)),
                },
            ),
            state(
                3,
                InheritedIvs {
                    hp: Random(16),
                    atk: Parent1(Some(2)),
                    def: Random(12),
                    spa: Parent2(Some(10)),
                    spd: Random(24),
                    spe: Random(12),
                },
            ),
            state(
                4,
                InheritedIvs {
                    hp: Random(2),
                    atk: Random(18),
                    def: Random(3),
                    spa: Parent2(Some(10)),
                    spd: Random(11),
                    spe: Parent2(Some(12)),
                },
            ),
            state(
                5,
                InheritedIvs {
                    hp: Random(12),
                    atk: Random(22),
                    def: Parent2(Some(9)),
                    spa: Parent1(Some(4)),
                    spd: Random(25),
                    spe: Parent1(Some(6)),
                },
            ),
            state(
                6,
                InheritedIvs {
                    hp: Random(5),
                    atk: Random(30),
                    def: Random(11),
                    spa: Parent2(Some(10)),
                    spd: Parent1(Some(5)),
                    spe: Random(19),
                },
            ),
            state(
                7,
                InheritedIvs {
                    hp: Random(27),
                    atk: Random(30),
                    def: Random(25),
                    spa: Random(25),
                    spd: Parent2(Some(11)),
                    spe: Parent1(Some(6)),
                },
            ),
            state(
                8,
                InheritedIvs {
                    hp: Random(19),
                    atk: Parent1(Some(2)),
                    def: Parent2(Some(9)),
                    spa: Random(2),
                    spd: Parent1(Some(5)),
                    spe: Random(30),
                },
            ),
            state(
                9,
                InheritedIvs {
                    hp: Random(12),
                    atk: Parent1(Some(2)),
                    def: Random(27),
                    spa: Random(22),
                    spd: Parent1(Some(5)),
                    spe: Random(5),
                },
            ),
            state(
                10,
                InheritedIvs {
                    hp: Random(30),
                    atk: Parent1(Some(2)),
                    def: Random(31),
                    spa: Parent2(Some(10)),
                    spd: Random(26),
                    spe: Random(22),
                },
            ),
        ];

        assert_list_eq!(results, expected);
    }

    #[test]
    fn generate_emerald_bred_alternate_results() {
        let opts = Egg3PickupOptions {
            delay: 0,
            parent_ivs: [MALE_IVS, FEMALE_IVS],
            method: Gen3PickupMethod::EmeraldBredAlternate,
            initial_advances: 0,
            max_advances: 10,
            seed: 0,
            filter_min_ivs: Ivs::new_all0(),
            filter_max_ivs: Ivs::new_all31(),
            filter_hidden_power: HiddenPowerFilter::default(),
        };

        let results = emerald_egg_pickup_states(&opts);
        let expected = [
            state(
                0,
                InheritedIvs {
                    hp: Random(0),
                    atk: Parent2(Some(8)),
                    def: Random(0),
                    spa: Parent2(Some(10)),
                    spd: Random(26),
                    spe: Parent1(Some(6)),
                },
            ),
            state(
                1,
                InheritedIvs {
                    hp: Random(30),
                    atk: Random(11),
                    def: Random(26),
                    spa: Parent2(Some(10)),
                    spd: Parent1(Some(5)),
                    spe: Parent1(Some(6)),
                },
            ),
            state(
                2,
                InheritedIvs {
                    hp: Random(17),
                    atk: Random(19),
                    def: Random(20),
                    spa: Random(13),
                    spd: Parent2(Some(11)),
                    spe: Parent1(Some(6)),
                },
            ),
            state(
                3,
                InheritedIvs {
                    hp: Random(16),
                    atk: Parent1(Some(2)),
                    def: Random(12),
                    spa: Parent2(Some(10)),
                    spd: Random(3),
                    spe: Random(2),
                },
            ),
            state(
                4,
                InheritedIvs {
                    hp: Random(2),
                    atk: Random(18),
                    def: Random(3),
                    spa: Parent2(Some(10)),
                    spd: Random(24),
                    spe: Parent2(Some(12)),
                },
            ),
            state(
                5,
                InheritedIvs {
                    hp: Random(12),
                    atk: Random(22),
                    def: Parent2(Some(9)),
                    spa: Parent1(Some(4)),
                    spd: Random(11),
                    spe: Parent1(Some(6)),
                },
            ),
            state(
                6,
                InheritedIvs {
                    hp: Random(5),
                    atk: Random(30),
                    def: Random(11),
                    spa: Parent2(Some(10)),
                    spd: Parent1(Some(5)),
                    spe: Random(27),
                },
            ),
            state(
                7,
                InheritedIvs {
                    hp: Random(27),
                    atk: Random(30),
                    def: Random(25),
                    spa: Random(1),
                    spd: Parent2(Some(11)),
                    spe: Parent1(Some(6)),
                },
            ),
            state(
                8,
                InheritedIvs {
                    hp: Random(19),
                    atk: Parent1(Some(2)),
                    def: Parent2(Some(9)),
                    spa: Random(25),
                    spd: Parent1(Some(5)),
                    spe: Random(12),
                },
            ),
            state(
                9,
                InheritedIvs {
                    hp: Random(12),
                    atk: Parent1(Some(2)),
                    def: Random(27),
                    spa: Random(2),
                    spd: Parent1(Some(5)),
                    spe: Random(30),
                },
            ),
            state(
                10,
                InheritedIvs {
                    hp: Random(30),
                    atk: Parent1(Some(2)),
                    def: Random(31),
                    spa: Parent2(Some(10)),
                    spd: Random(18),
                    spe: Random(5),
                },
            ),
        ];

        assert_list_eq!(results, expected);
    }

    #[test]
    fn apply_filters() {
        let opts = Egg3PickupOptions {
            delay: 0,
            parent_ivs: [MALE_IVS, FEMALE_IVS],
            method: Gen3PickupMethod::EmeraldBred,
            initial_advances: 0,
            max_advances: 10,
            seed: 0,
            filter_min_ivs: Ivs {
                hp: 10,
                atk: 10,
                def: 10,
                spa: 10,
                spd: 10,
                spe: 10,
            },
            filter_max_ivs: Ivs {
                hp: 25,
                atk: 25,
                def: 25,
                spa: 25,
                spd: 25,
                spe: 25,
            },
            filter_hidden_power: HiddenPowerFilter::default(),
        };

        let results = emerald_egg_pickup_states(&opts);
        let expected = [state(
            5,
            InheritedIvs {
                hp: Random(12),
                atk: Random(22),
                def: Random(24),
                spa: Parent2(Some(10)),
                spd: Random(11),
                spe: Parent2(Some(12)),
            },
        )];
        assert_list_eq!(results, expected);
    }

    #[test]
    fn delay() {
        let mut opts = Egg3PickupOptions {
            delay: 0,
            parent_ivs: [MALE_IVS, FEMALE_IVS],
            method: Gen3PickupMethod::EmeraldBred,
            initial_advances: 100,
            max_advances: 10,
            seed: 0,
            filter_min_ivs: Ivs::new_all0(),
            filter_max_ivs: Ivs::new_all31(),
            filter_hidden_power: HiddenPowerFilter::default(),
        };
        let first_results = emerald_egg_pickup_states(&opts);

        opts.delay = 10;
        let second_results = emerald_egg_pickup_states(&opts)
            .into_iter()
            .map(|mut egg| {
                egg.advance = egg.advance.saturating_add(10);
                egg
            })
            .collect::<Vec<_>>();

        assert_list_eq!(first_results, second_results);
    }

    #[test]
    fn filter_specific_missing_inherited_ivs() {
        let opts = Egg3PickupOptions {
            delay: 0,
            parent_ivs: [
                MALE_IVS,
                PartialIvs {
                    spa: None,
                    ..FEMALE_IVS
                },
            ],
            method: Gen3PickupMethod::EmeraldBred,
            initial_advances: 0,
            max_advances: 10,
            seed: 0,
            filter_min_ivs: Ivs {
                hp: 10,
                atk: 10,
                def: 10,
                spa: 10,
                spd: 10,
                spe: 10,
            },
            filter_max_ivs: Ivs {
                hp: 25,
                atk: 25,
                def: 25,
                spa: 25,
                spd: 25,
                spe: 25,
            },
            filter_hidden_power: HiddenPowerFilter::default(),
        };

        let results = emerald_egg_pickup_states(&opts);
        let expected = [];
        assert_list_eq!(results, expected);
    }

    #[test]
    fn do_not_filter_unspecific_missing_inherited_ivs() {
        let opts = Egg3PickupOptions {
            delay: 0,
            parent_ivs: [
                MALE_IVS,
                PartialIvs {
                    spa: None,
                    ..FEMALE_IVS
                },
            ],
            method: Gen3PickupMethod::EmeraldBred,
            initial_advances: 0,
            max_advances: 10,
            seed: 0,
            filter_min_ivs: Ivs {
                hp: 10,
                atk: 10,
                def: 10,
                spa: 0,
                spd: 10,
                spe: 10,
            },
            filter_max_ivs: Ivs {
                hp: 25,
                atk: 25,
                def: 25,
                spa: 31,
                spd: 25,
                spe: 25,
            },
            filter_hidden_power: HiddenPowerFilter::default(),
        };

        let results = emerald_egg_pickup_states(&opts);
        let expected = [state(
            5,
            InheritedIvs {
                hp: Random(12),
                atk: Random(22),
                def: Random(24),
                spa: Parent2(None),
                spd: Random(11),
                spe: Parent2(Some(12)),
            },
        )];
        assert_list_eq!(results, expected);
    }

    #[test]
    fn apply_hidden_power_filters() {
        let target_ivs = Ivs {
            hp: 12,
            atk: 22,
            def: 24,
            spa: 10,
            spd: 11,
            spe: 12,
        };
        let hidden_power = crate::calculate_hidden_power(&target_ivs);

        let opts = Egg3PickupOptions {
            delay: 0,
            parent_ivs: [MALE_IVS, FEMALE_IVS],
            method: Gen3PickupMethod::EmeraldBred,
            initial_advances: 0,
            max_advances: 10,
            seed: 0,
            filter_min_ivs: Ivs::new_all0(),
            filter_max_ivs: Ivs::new_all31(),
            filter_hidden_power: HiddenPowerFilter {
                active: true,
                pokemon_types: vec![hidden_power.pokemon_type],
                min_bp: hidden_power.bp,
                max_bp: hidden_power.bp,
            },
        };

        let results = emerald_egg_pickup_states(&opts);
        let expected = [state(
            5,
            InheritedIvs {
                hp: Random(12),
                atk: Random(22),
                def: Random(24),
                spa: Parent2(Some(10)),
                spd: Random(11),
                spe: Parent2(Some(12)),
            },
        )];

        assert_list_eq!(results, expected);
    }

    #[test]
    fn do_not_apply_hidden_power_filters_with_unknown_inherited_ivs() {
        let hidden_power = crate::calculate_hidden_power(&Ivs {
            hp: 12,
            atk: 22,
            def: 24,
            spa: 10,
            spd: 11,
            spe: 12,
        });

        let opts = Egg3PickupOptions {
            delay: 0,
            parent_ivs: [
                MALE_IVS,
                PartialIvs {
                    spa: None,
                    ..FEMALE_IVS
                },
            ],
            method: Gen3PickupMethod::EmeraldBred,
            initial_advances: 0,
            max_advances: 10,
            seed: 0,
            filter_min_ivs: Ivs::new_all0(),
            filter_max_ivs: Ivs::new_all31(),
            filter_hidden_power: HiddenPowerFilter {
                active: true,
                pokemon_types: vec![hidden_power.pokemon_type],
                min_bp: hidden_power.bp,
                max_bp: hidden_power.bp,
            },
        };

        let results = emerald_egg_pickup_states(&opts);
        let expected: [Egg3PickupState; 0] = [];

        assert_list_eq!(results, expected);
    }

    mod pokefinder {
        use crate::PokemonType;

        use super::*;

        fn parse_pokefinder(str: &str) -> Vec<Egg3PickupState> {
            str.lines()
                .map(|raw_line| {
                    let line = raw_line.trim();

                    if line.is_empty() {
                        panic!("Empty line in chatter data");
                    }

                    let parts: Vec<&str> = line.split("\t").collect();
                    let advance: usize = parts[1].parse().unwrap();
                    let ivs = Ivs::from_pokefinder_strs(&parts[7..][..6]);
                    let hp_type = PokemonType::from_str(parts[13]);
                    let hp_bp: u8 = parts[14].parse().unwrap();

                    Egg3PickupState {
                        advance,
                        ivs: ivs.into(),
                        hidden_power: Some(HiddenPower::new(hp_type, hp_bp)),
                    }
                })
                .collect()
        }

        macro_rules! pokefinder {
            ($file:expr) => {
                parse_pokefinder(include_str!($file))
            };
        }

        fn clear_inheritance(results: Vec<Egg3PickupState>) -> Vec<Egg3PickupState> {
            results
                .into_iter()
                .map(|mut state| {
                    // Clear parent inheritance
                    state.ivs = state.ivs.try_as_ivs().unwrap().into();
                    state
                })
                .collect()
        }

        #[test]
        fn emerald_bred_results() {
            let opts = Egg3PickupOptions {
                delay: 0,
                parent_ivs: [MALE_IVS, FEMALE_IVS],
                method: Gen3PickupMethod::EmeraldBred,
                initial_advances: 0,
                max_advances: 100,
                seed: 0,
                filter_min_ivs: Ivs::new_all0(),
                filter_max_ivs: Ivs::new_all31(),
                filter_hidden_power: HiddenPowerFilter::default(),
            };

            let results: Vec<Egg3PickupState> = clear_inheritance(emerald_egg_pickup_states(&opts));
            let expected = pokefinder!("test_data/pickup/bred.txt");

            assert_list_eq!(results, expected);
        }

        #[test]
        fn emerald_bred_split_results() {
            let opts = Egg3PickupOptions {
                delay: 0,
                parent_ivs: [MALE_IVS, FEMALE_IVS],
                method: Gen3PickupMethod::EmeraldBredSplit,
                initial_advances: 0,
                max_advances: 100,
                seed: 0,
                filter_min_ivs: Ivs::new_all0(),
                filter_max_ivs: Ivs::new_all31(),
                filter_hidden_power: HiddenPowerFilter::default(),
            };

            let results = clear_inheritance(emerald_egg_pickup_states(&opts));
            let expected = pokefinder!("test_data/pickup/split.txt");

            assert_list_eq!(results, expected);
        }

        #[test]
        fn emerald_bred_alternate_results() {
            let opts = Egg3PickupOptions {
                delay: 0,
                parent_ivs: [MALE_IVS, FEMALE_IVS],
                method: Gen3PickupMethod::EmeraldBredAlternate,
                initial_advances: 0,
                max_advances: 100,
                seed: 0,
                filter_min_ivs: Ivs::new_all0(),
                filter_max_ivs: Ivs::new_all31(),
                filter_hidden_power: HiddenPowerFilter::default(),
            };

            let results = clear_inheritance(emerald_egg_pickup_states(&opts));
            let expected = pokefinder!("test_data/pickup/alternate.txt");

            assert_list_eq!(results, expected);
        }
    }
}
