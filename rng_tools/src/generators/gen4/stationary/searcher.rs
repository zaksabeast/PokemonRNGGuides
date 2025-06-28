use crate::gen4::Static4Species;
use crate::gen4::{
    FindSeedTime4Options, GameVersion, LeadAbilities, SeedTime4, dppt_find_seedtime,
};
use crate::generators::utils::recover_poke_rng_iv;
use crate::rng::Rng;
use crate::{
    AbilityType, Characteristic, Gender, Ivs, Nature, PkmFilter, PkmState, Species, gen3_shiny,
    rng::lcrng::Pokerng,
};
use itertools::iproduct;
use serde::{Deserialize, Serialize};
use tsify_next::Tsify;
use wasm_bindgen::prelude::*;

#[derive(Debug, Clone, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct SearchStatic4Method1Opts {
    pub tid: u16,
    pub sid: u16,
    pub species: Species,
    pub filter: PkmFilter,
    pub min_advance: usize,
    pub max_advance: usize,
    pub min_delay: u32,
    pub max_delay: u32,
    pub year: u32,
    pub force_second: Option<u32>,
}

#[derive(Debug, Clone, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct SearchStatic4Method1State {
    pub seed_time: SeedTime4,
    pub advance: usize,
    pub pid: u32,
    pub ivs: Ivs,
    pub ability: AbilityType,
    pub gender: Gender,
    pub nature: Nature,
    pub shiny: bool,
    pub characteristic: Characteristic,
}

struct Base4Method1State {
    seed: u32,
    pid: u32,
    ivs: Ivs,
    ability: AbilityType,
    gender: Gender,
    nature: Nature,
    shiny: bool,
    characteristic: Characteristic,
}

impl PkmState for Base4Method1State {
    fn ability(&self) -> crate::AbilityType {
        self.ability
    }

    fn gender(&self) -> crate::Gender {
        self.gender
    }

    fn ivs(&self) -> &crate::Ivs {
        &self.ivs
    }

    fn nature(&self) -> crate::Nature {
        self.nature
    }

    fn shiny(&self) -> bool {
        self.shiny
    }
}

impl Base4Method1State {
    fn full_state(&self, advance: usize, seed_time: SeedTime4) -> SearchStatic4Method1State {
        SearchStatic4Method1State {
            advance,
            seed_time,
            pid: self.pid,
            ivs: self.ivs,
            ability: self.ability,
            gender: self.gender,
            nature: self.nature,
            shiny: self.shiny,
            characteristic: self.characteristic,
        }
    }
}

fn get_state_from_seed(opts: &SearchStatic4Method1Opts, ivs: Ivs, seed: u32) -> Base4Method1State {
    let mut rng = Pokerng::new(seed).rev();

    let pidh = (rng.rand::<u16>() as u32) << 16;
    let pidl = rng.rand::<u16>() as u32;

    let pid = pidh | pidl;
    let nature = Nature::from((pid % 25) as u8);
    let gender = opts.species.gender_from_pid(pid);
    let ability = AbilityType::from_gen3_pid(pid);
    let shiny = gen3_shiny(pid, opts.tid, opts.sid);

    let characteristic = Characteristic::new(pid, &ivs);

    Base4Method1State {
        seed: rng.rand::<u32>(),
        pid,
        ability,
        gender,
        nature,
        ivs,
        shiny,
        characteristic,
    }
}

fn search_single_static4_method1(
    opts: &SearchStatic4Method1Opts,
    ivs: Ivs,
) -> Vec<Base4Method1State> {
    let seeds = recover_poke_rng_iv(&ivs, false);
    seeds
        .into_iter()
        .filter_map(|seed| {
            let state = get_state_from_seed(opts, ivs, seed);

            // Don't check IVs since we specifically found matching IVs
            if !opts.filter.pass_filter_no_ivs(&state) {
                return None;
            }

            Some(state)
        })
        .collect()
}

fn search_static4_method1(opts: &SearchStatic4Method1Opts) -> Vec<Base4Method1State> {
    let Ivs {
        hp: min_hp,
        atk: min_atk,
        def: min_def,
        spa: min_spa,
        spd: min_spd,
        spe: min_spe,
    } = opts.filter.min_ivs;

    let Ivs {
        hp: max_hp,
        atk: max_atk,
        def: max_def,
        spa: max_spa,
        spd: max_spd,
        spe: max_spe,
    } = opts.filter.max_ivs;

    iproduct!(
        min_hp..=max_hp,
        min_atk..=max_atk,
        min_def..=max_def,
        min_spa..=max_spa,
        min_spd..=max_spd,
        min_spe..=max_spe
    )
    .flat_map(|(hp, atk, def, spa, spd, spe)| {
        search_single_static4_method1(
            opts,
            Ivs {
                hp,
                atk,
                def,
                spa,
                spd,
                spe,
            },
        )
    })
    .collect()
}

#[wasm_bindgen]
pub fn search_static4_method1_seeds(
    opts: &SearchStatic4Method1Opts,
) -> Vec<SearchStatic4Method1State> {
    let min_advance = opts.min_advance;
    let max_advance = opts.max_advance;

    let mut results = vec![];

    for state in search_static4_method1(opts).iter() {
        let mut rng = Pokerng::new(state.seed).rev();
        rng.advance(min_advance.saturating_sub(1));
        let mut seed = match min_advance {
            0 => state.seed,
            _ => rng.rand::<u32>(),
        };
        for advance in min_advance..=max_advance {
            let seed_time_opts = FindSeedTime4Options::new(
                seed,
                opts.year,
                opts.min_delay..=opts.max_delay,
                opts.force_second,
            );
            let seed_time = dppt_find_seedtime(seed_time_opts);

            if let Some(seed_time) = seed_time {
                let found_state = state.full_state(advance, seed_time);
                results.push(found_state);
            }

            seed = rng.rand::<u32>();
        }
    }

    results
}

#[derive(Debug, Clone, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct SearchStatic4MethodjOpts {
    pub tid: u16,
    pub sid: u16,
    pub game: GameVersion,
    pub encounter: Static4Species,
    pub lead: LeadAbilities,
    pub filter: PkmFilter,
    pub min_advance: usize,
    pub max_advance: usize,
    pub min_delay: u32,
    pub max_delay: u32,
    pub year: u32,
    pub force_second: Option<u32>,
}
#[derive(Debug, Clone, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct SearchStatic4MethodjState {
    pub seed_time: SeedTime4,
    pub seed: u32,
    pub advance: usize,
    pub pid: u32,
    pub ivs: Ivs,
    pub ability: AbilityType,
    pub gender: Gender,
    pub nature: Nature,
    pub shiny: bool,
    pub characteristic: Characteristic,
}

struct Base4MethodjState {
    seed: u32,
    pid: u32,
    ivs: Ivs,
    ability: AbilityType,
    gender: Gender,
    nature: Nature,
    shiny: bool,
    characteristic: Characteristic,
}

impl PkmState for Base4MethodjState {
    fn ability(&self) -> crate::AbilityType {
        self.ability
    }

    fn gender(&self) -> crate::Gender {
        self.gender
    }

    fn ivs(&self) -> &crate::Ivs {
        &self.ivs
    }

    fn nature(&self) -> crate::Nature {
        self.nature
    }

    fn shiny(&self) -> bool {
        self.shiny
    }
}
impl Base4MethodjState {
    fn full_state(&self, advance: usize, seed_time: SeedTime4) -> SearchStatic4MethodjState {
        SearchStatic4MethodjState {
            advance,
            seed_time,
            seed: self.seed,
            pid: self.pid,
            ivs: self.ivs,
            ability: self.ability,
            gender: self.gender,
            nature: self.nature,
            shiny: self.shiny,
            characteristic: self.characteristic,
        }
    }
}

fn search_static4_methodj(opts: &SearchStatic4MethodjOpts) -> Vec<Base4MethodjState> {
    let Ivs {
        hp: min_hp,
        atk: min_atk,
        def: min_def,
        spa: min_spa,
        spd: min_spd,
        spe: min_spe,
    } = opts.filter.min_ivs;

    let Ivs {
        hp: max_hp,
        atk: max_atk,
        def: max_def,
        spa: max_spa,
        spd: max_spd,
        spe: max_spe,
    } = opts.filter.max_ivs;

    iproduct!(
        min_hp..=max_hp,
        min_atk..=max_atk,
        min_def..=max_def,
        min_spa..=max_spa,
        min_spd..=max_spd,
        min_spe..=max_spe
    )
    .flat_map(|(hp, atk, def, spa, spd, spe)| {
        search_static4_methodj_seed(
            opts,
            Ivs {
                hp,
                atk,
                def,
                spa,
                spd,
                spe,
            },
        )
    })
    .collect()
}

fn get_state_from_jseed(
    opts: &SearchStatic4MethodjOpts,
    ivs: Ivs,
    seed: u32,
) -> Option<Base4MethodjState> {
    let mut rng = Pokerng::new(seed).rev();
    let mut rng2 = Pokerng::new(seed).rev();
    let lead = opts.lead;

    match lead {
        LeadAbilities::Synchronize(nature) => {
            if rng.rand::<u16>() >> 15 == 0 {
                let mut pid: u32;
                let nature_value = nature as u32;
                loop {
                    let pid_low = rng.rand::<u16>() as u32;
                    let pid_high = rng.rand::<u16>() as u32;
                    pid = (pid_high << 16) | pid_low;
                    if pid % 25 == nature_value {
                        break;
                    }
                }
                let nature = Nature::from((pid % 25) as u8);
                let gender = opts.encounter.species().gender_from_pid(pid);
                let ability = AbilityType::from_gen3_pid(pid);
                let shiny = gen3_shiny(pid, opts.tid, opts.sid);

                let characteristic = Characteristic::new(pid, &ivs);

                return Some(Base4MethodjState {
                    seed: rng.rand::<u32>(),
                    pid,
                    ability,
                    gender,
                    nature,
                    ivs,
                    shiny,
                    characteristic,
                });
            }
        }
        LeadAbilities::CutecharmF => {
            let gender_threshold = opts.encounter.species().gender_ratio();
            let buffer = 25 * ((gender_threshold as u32 / 25) + 1);
            let target_gender = Gender::Male;
            let nature = (rng.rand::<u16>() / 0xa3e) as u8;
            if rng.rand::<u16>() % 3 != 0 {
                let pid = buffer + nature as u32;
                let gender = opts.encounter.species().gender_from_pid(pid);
                let ability = AbilityType::from_gen3_pid(pid);
                let shiny = gen3_shiny(pid, opts.tid, opts.sid);
                let characteristic = Characteristic::new(pid, &ivs);
                if gender == target_gender {
                    let nature = Nature::from_pid(pid);

                    return Some(Base4MethodjState {
                        seed: rng.rand::<u32>(),
                        pid,
                        ability,
                        gender,
                        nature,
                        ivs,
                        shiny,
                        characteristic,
                    });
                }
            }
        }
        LeadAbilities::CutecharmM => {
            let buffer = 0;
            let target_gender = Gender::Female;
            let nature = (rng.rand::<u16>() / 0xa3e) as u8;
            if rng.rand::<u16>() % 3 != 0 {
                let pid = buffer + nature as u32;
                let gender = opts.encounter.species().gender_from_pid(pid);
                let ability = AbilityType::from_gen3_pid(pid);
                let shiny = gen3_shiny(pid, opts.tid, opts.sid);
                let characteristic = Characteristic::new(pid, &ivs);
                if gender == target_gender {
                    let nature = Nature::from_pid(pid);

                    return Some(Base4MethodjState {
                        seed: rng.rand::<u32>(),
                        pid,
                        ability,
                        gender,
                        nature,
                        ivs,
                        shiny,
                        characteristic,
                    });
                }
            }
        }
        LeadAbilities::None => {
            let pid = loop {
                let pidh = (rng.rand::<u16>() as u32) << 16;
                let pidl = rng.rand::<u16>() as u32;
                let pid = pidh | pidl;
                let nature = Nature::from((pid % 25) as u8);
                let nature_rand = (rng.rand::<u16>() / 0xa3e) as u8;
                if nature as u8 == nature_rand {
                    break pid;
                } else {
                    rng = rng2.clone();
                    rng.rand::<u16>();
                    rng.rand::<u16>();
                    rng2.rand::<u16>();
                    rng2.rand::<u16>();
                }
            };
            let gender = opts.encounter.species().gender_from_pid(pid);
            let ability = AbilityType::from_gen3_pid(pid);
            let shiny = gen3_shiny(pid, opts.tid, opts.sid);

            let characteristic = Characteristic::new(pid, &ivs);

            return Some(Base4MethodjState {
                seed: rng.rand::<u32>(),
                pid,
                ability,
                gender,
                nature: Nature::from_pid(pid),
                ivs,
                shiny,
                characteristic,
            });
        }
    }

    let pidh = (rng.rand::<u16>() as u32) << 16;
    let pidl = rng.rand::<u16>() as u32;
    let pid = pidh | pidl;
    let nature = Nature::from((pid % 25) as u8);
    let nature_rand = (rng.rand::<u16>() / 0xa3e) as u8;
    if nature as u8 != nature_rand {
        return None;
    }
    let gender = opts.encounter.species().gender_from_pid(pid);
    let ability = AbilityType::from_gen3_pid(pid);
    let shiny = gen3_shiny(pid, opts.tid, opts.sid);

    let characteristic = Characteristic::new(pid, &ivs);

    Some(Base4MethodjState {
        seed: rng.rand::<u32>(),
        pid,
        ability,
        gender,
        nature,
        ivs,
        shiny,
        characteristic,
    })
}

pub fn search_static4_methodj_seed(
    opts: &SearchStatic4MethodjOpts,
    ivs: Ivs,
) -> Vec<Base4MethodjState> {
    let seeds = recover_poke_rng_iv(&ivs, false);
    seeds
        .into_iter()
        .filter_map(|seed| {
            let state: Base4MethodjState = get_state_from_jseed(opts, ivs, seed)?;

            // Don't check IVs since we specifically found matching IVs
            if !opts.filter.pass_filter_no_ivs(&state) {
                return None;
            }

            Some(state)
        })
        .collect()
}

pub fn search_static4_methodj_seeds(
    opts: &SearchStatic4MethodjOpts,
) -> Vec<SearchStatic4MethodjState> {
    let min_advance = opts.min_advance;
    let max_advance = opts.max_advance;

    let mut results = vec![];

    for state in search_static4_methodj(opts).iter() {
        let mut rng = Pokerng::new(state.seed).rev();
        rng.advance(min_advance.saturating_sub(1));
        let mut seed = match min_advance {
            0 => state.seed,
            _ => rng.rand::<u32>(),
        };
        for advance in min_advance..=max_advance {
            let seed_time_opts = FindSeedTime4Options::new(
                seed,
                opts.year,
                opts.min_delay..=opts.max_delay,
                opts.force_second,
            );
            let seed_time = dppt_find_seedtime(seed_time_opts);

            if let Some(seed_time) = seed_time {
                let found_state = state.full_state(advance, seed_time);
                results.push(found_state);
            }

            seed = rng.rand::<u32>();
        }
    }

    results
}

#[cfg(test)]
mod tests {
    use super::*;

    mod search_static4_method1 {
        use super::*;
        use crate::{assert_list_eq, coin_flips, datetime, ivs};

        #[test]
        fn min_advance_0() {
            let opts = SearchStatic4Method1Opts {
                tid: 12345,
                sid: 54321,
                year: 2000,
                min_delay: 600,
                max_delay: 605,
                min_advance: 0,
                max_advance: 2,
                force_second: None,
                species: Species::Turtwig,
                filter: PkmFilter {
                    ability: None,
                    gender: None,
                    nature: None,
                    shiny: false,
                    stats: None,
                    min_ivs: ivs!(30 / 30 / 20 / 20 / 20 / 20),
                    max_ivs: Ivs::new_all31(),
                },
            };

            let results = search_static4_method1_seeds(&opts);
            let expected = [
                SearchStatic4Method1State {
                    advance: 2,
                    seed_time: SeedTime4 {
                        seed: 0x5C03025B,
                        datetime: datetime!(2000-01-01 03:33:58).unwrap(),
                        delay: 603,
                        coin_flips: coin_flips!("HTHHHHHTHHHTHHTHTHTH"),
                    },
                    pid: 0x74313CBB,
                    shiny: false,
                    nature: Nature::Quiet,
                    ability: AbilityType::Second,
                    ivs: Ivs {
                        hp: 30,
                        atk: 30,
                        def: 21,
                        spa: 21,
                        spd: 27,
                        spe: 26,
                    },
                    gender: Gender::Male,
                    characteristic: Characteristic::ProudOfItsPower,
                },
                SearchStatic4Method1State {
                    advance: 2,
                    seed_time: SeedTime4 {
                        seed: 0xDC03025B,
                        datetime: datetime!(2000-04-26 03:58:58).unwrap(),
                        delay: 603,
                        coin_flips: coin_flips!("HHTTTTTHTHTHHTTTHHTT"),
                    },
                    pid: 0xF431BCBB,
                    shiny: false,
                    nature: Nature::Impish,
                    ability: AbilityType::Second,
                    ivs: Ivs {
                        hp: 30,
                        atk: 30,
                        def: 21,
                        spa: 21,
                        spd: 27,
                        spe: 26,
                    },
                    gender: Gender::Male,
                    characteristic: Characteristic::LovesToEat,
                },
                SearchStatic4Method1State {
                    advance: 2,
                    seed_time: SeedTime4 {
                        seed: 0x0403025B,
                        datetime: datetime!(2000-01-01 03:00:03).unwrap(),
                        delay: 603,
                        coin_flips: coin_flips!("HTHTTTHTHHHHTTTTTTHH"),
                    },
                    pid: 0x9C3104BB,
                    shiny: false,
                    nature: Nature::Gentle,
                    ability: AbilityType::Second,
                    ivs: Ivs {
                        hp: 30,
                        atk: 30,
                        def: 23,
                        spa: 21,
                        spd: 21,
                        spe: 26,
                    },
                    gender: Gender::Male,
                    characteristic: Characteristic::LovesToEat,
                },
                SearchStatic4Method1State {
                    advance: 2,
                    seed_time: SeedTime4 {
                        seed: 0x8403025B,
                        datetime: datetime!(2000-01-15 03:59:58).unwrap(),
                        delay: 603,
                        coin_flips: coin_flips!("HTTTTHTTTHHTHTTHTHTH"),
                    },
                    pid: 0x1C3184BB,
                    shiny: false,
                    nature: Nature::Mild,
                    ability: AbilityType::Second,
                    ivs: Ivs {
                        hp: 30,
                        atk: 30,
                        def: 23,
                        spa: 21,
                        spd: 21,
                        spe: 26,
                    },
                    gender: Gender::Male,
                    characteristic: Characteristic::LovesToEat,
                },
                SearchStatic4Method1State {
                    advance: 2,
                    seed_time: SeedTime4 {
                        seed: 0x0003025B,
                        datetime: datetime!(2000-05-28 03:58:58).unwrap(),
                        delay: 603,
                        coin_flips: coin_flips!("HHHTTTTTHHHTTTHHTHTH"),
                    },
                    pid: 0x583130BB,
                    shiny: false,
                    nature: Nature::Sassy,
                    ability: AbilityType::Second,
                    ivs: Ivs {
                        hp: 30,
                        atk: 30,
                        def: 26,
                        spa: 21,
                        spd: 28,
                        spe: 26,
                    },
                    gender: Gender::Male,
                    characteristic: Characteristic::LovesToEat,
                },
                SearchStatic4Method1State {
                    advance: 2,
                    seed_time: SeedTime4 {
                        seed: 0x8003025B,
                        datetime: datetime!(2000-01-11 03:59:58).unwrap(),
                        delay: 603,
                        coin_flips: coin_flips!("TTTTHHTHHTHHHTHTHTHT"),
                    },
                    pid: 0xD831B0BB,
                    shiny: false,
                    nature: Nature::Jolly,
                    ability: AbilityType::Second,
                    ivs: Ivs {
                        hp: 30,
                        atk: 30,
                        def: 26,
                        spa: 21,
                        spd: 28,
                        spe: 26,
                    },
                    gender: Gender::Male,
                    characteristic: Characteristic::ProudOfItsPower,
                },
                SearchStatic4Method1State {
                    advance: 2,
                    seed_time: SeedTime4 {
                        seed: 0xA803025B,
                        datetime: datetime!(2000-02-26 03:58:58).unwrap(),
                        delay: 603,
                        coin_flips: coin_flips!("HHTHHHHTTHTHHHTTHTHH"),
                    },
                    pid: 0x8031F8BB,
                    shiny: false,
                    nature: Nature::Serious,
                    ability: AbilityType::Second,
                    ivs: Ivs {
                        hp: 30,
                        atk: 30,
                        def: 28,
                        spa: 21,
                        spd: 22,
                        spe: 26,
                    },
                    gender: Gender::Male,
                    characteristic: Characteristic::LovesToEat,
                },
                SearchStatic4Method1State {
                    advance: 2,
                    seed_time: SeedTime4 {
                        seed: 0x2803025B,
                        datetime: datetime!(2000-01-01 03:00:39).unwrap(),
                        delay: 603,
                        coin_flips: coin_flips!("HHHTTTHHHTHTTHTHHTHT"),
                    },
                    pid: 0x003178BB,
                    shiny: false,
                    nature: Nature::Gentle,
                    ability: AbilityType::Second,
                    ivs: Ivs {
                        hp: 30,
                        atk: 30,
                        def: 28,
                        spa: 21,
                        spd: 22,
                        spe: 26,
                    },
                    gender: Gender::Male,
                    characteristic: Characteristic::LovesToEat,
                },
                SearchStatic4Method1State {
                    advance: 2,
                    seed_time: SeedTime4 {
                        seed: 0xA403025B,
                        datetime: datetime!(2000-02-24 03:58:58).unwrap(),
                        delay: 603,
                        coin_flips: coin_flips!("TTHHTTTHTTHHTTTTHTTT"),
                    },
                    pid: 0x3C3124BB,
                    shiny: false,
                    nature: Nature::Brave,
                    ability: AbilityType::Second,
                    ivs: Ivs {
                        hp: 30,
                        atk: 30,
                        def: 31,
                        spa: 21,
                        spd: 29,
                        spe: 26,
                    },
                    gender: Gender::Male,
                    characteristic: Characteristic::CapableOfTakingHits,
                },
                SearchStatic4Method1State {
                    advance: 2,
                    seed_time: SeedTime4 {
                        seed: 0x2403025B,
                        datetime: datetime!(2000-01-01 03:00:35).unwrap(),
                        delay: 603,
                        coin_flips: coin_flips!("HTHTHTHHTHHHTTHTHHTT"),
                    },
                    pid: 0xBC31A4BB,
                    shiny: false,
                    nature: Nature::Bashful,
                    ability: AbilityType::Second,
                    ivs: Ivs {
                        hp: 30,
                        atk: 30,
                        def: 31,
                        spa: 21,
                        spd: 29,
                        spe: 26,
                    },
                    gender: Gender::Male,
                    characteristic: Characteristic::CapableOfTakingHits,
                },
                SearchStatic4Method1State {
                    advance: 0,
                    seed_time: SeedTime4 {
                        seed: 0x52060259,
                        datetime: datetime!(2000-01-01 06:23:58).unwrap(),
                        delay: 601,
                        coin_flips: coin_flips!("TTHHTTHHHTTHTTTTHTTT"),
                    },
                    pid: 0x19B02B1C,
                    shiny: false,
                    nature: Nature::Sassy,
                    ability: AbilityType::First,
                    ivs: Ivs {
                        hp: 31,
                        atk: 30,
                        def: 23,
                        spa: 26,
                        spd: 26,
                        spe: 23,
                    },
                    gender: Gender::Female,
                    characteristic: Characteristic::TakesPlentyOfSiestas,
                },
                SearchStatic4Method1State {
                    advance: 0,
                    seed_time: SeedTime4 {
                        seed: 0xD2060259,
                        datetime: datetime!(2000-03-31 06:59:58).unwrap(),
                        delay: 601,
                        coin_flips: coin_flips!("HHHHTHTHHHTTHHHTTHHH"),
                    },
                    pid: 0x99B0AB1C,
                    shiny: false,
                    nature: Nature::Jolly,
                    ability: AbilityType::First,
                    ivs: Ivs {
                        hp: 31,
                        atk: 30,
                        def: 23,
                        spa: 26,
                        spd: 26,
                        spe: 23,
                    },
                    gender: Gender::Female,
                    characteristic: Characteristic::TakesPlentyOfSiestas,
                },
                SearchStatic4Method1State {
                    advance: 0,
                    seed_time: SeedTime4 {
                        seed: 0x3A060259,
                        datetime: datetime!(2000-01-01 06:00:57).unwrap(),
                        delay: 601,
                        coin_flips: coin_flips!("TTHHHTHTHHHHTHTHHHHT"),
                    },
                    pid: 0x41B0F31C,
                    shiny: false,
                    nature: Nature::Serious,
                    ability: AbilityType::First,
                    ivs: Ivs {
                        hp: 31,
                        atk: 30,
                        def: 25,
                        spa: 26,
                        spd: 20,
                        spe: 23,
                    },
                    gender: Gender::Female,
                    characteristic: Characteristic::TakesPlentyOfSiestas,
                },
                SearchStatic4Method1State {
                    advance: 0,
                    seed_time: SeedTime4 {
                        seed: 0xBA060259,
                        datetime: datetime!(2000-03-23 06:59:58).unwrap(),
                        delay: 601,
                        coin_flips: coin_flips!("HTTTTTHHTTHTHTTTHHTT"),
                    },
                    pid: 0xC1B0731C,
                    shiny: false,
                    nature: Nature::Quiet,
                    ability: AbilityType::First,
                    ivs: Ivs {
                        hp: 31,
                        atk: 30,
                        def: 25,
                        spa: 26,
                        spd: 20,
                        spe: 23,
                    },
                    gender: Gender::Female,
                    characteristic: Characteristic::TakesPlentyOfSiestas,
                },
                SearchStatic4Method1State {
                    advance: 0,
                    seed_time: SeedTime4 {
                        seed: 0x96060259,
                        datetime: datetime!(2000-02-17 06:58:58).unwrap(),
                        delay: 601,
                        coin_flips: coin_flips!("TTHTHTHHHTHHHTTHTHTT"),
                    },
                    pid: 0xFDB01F1C,
                    shiny: false,
                    nature: Nature::Careful,
                    ability: AbilityType::First,
                    ivs: Ivs {
                        hp: 31,
                        atk: 30,
                        def: 28,
                        spa: 26,
                        spd: 27,
                        spe: 23,
                    },
                    gender: Gender::Female,
                    characteristic: Characteristic::TakesPlentyOfSiestas,
                },
                SearchStatic4Method1State {
                    advance: 0,
                    seed_time: SeedTime4 {
                        seed: 0x16060259,
                        datetime: datetime!(2000-01-01 06:00:21).unwrap(),
                        delay: 601,
                        coin_flips: coin_flips!("HHTHTHTTHTTHHTHTTHHT"),
                    },
                    pid: 0x7DB09F1C,
                    shiny: false,
                    nature: Nature::Bashful,
                    ability: AbilityType::First,
                    ivs: Ivs {
                        hp: 31,
                        atk: 30,
                        def: 28,
                        spa: 26,
                        spd: 27,
                        spe: 23,
                    },
                    gender: Gender::Female,
                    characteristic: Characteristic::TakesPlentyOfSiestas,
                },
                SearchStatic4Method1State {
                    advance: 0,
                    seed_time: SeedTime4 {
                        seed: 0x7E060259,
                        datetime: datetime!(2000-01-09 06:59:58).unwrap(),
                        delay: 601,
                        coin_flips: coin_flips!("HHHHTHHHTTHHHHTTHHHH"),
                    },
                    pid: 0x25B0E71C,
                    shiny: false,
                    nature: Nature::Quiet,
                    ability: AbilityType::First,
                    ivs: Ivs {
                        hp: 31,
                        atk: 30,
                        def: 30,
                        spa: 26,
                        spd: 21,
                        spe: 23,
                    },
                    gender: Gender::Female,
                    characteristic: Characteristic::TakesPlentyOfSiestas,
                },
                SearchStatic4Method1State {
                    advance: 0,
                    seed_time: SeedTime4 {
                        seed: 0xFE060259,
                        datetime: datetime!(2000-05-28 06:56:58).unwrap(),
                        delay: 601,
                        coin_flips: coin_flips!("TTHHHHTTHTHHTHHHTHHT"),
                    },
                    pid: 0xA5B0671C,
                    shiny: false,
                    nature: Nature::Sassy,
                    ability: AbilityType::First,
                    ivs: Ivs {
                        hp: 31,
                        atk: 30,
                        def: 30,
                        spa: 26,
                        spd: 21,
                        spe: 23,
                    },
                    gender: Gender::Female,
                    characteristic: Characteristic::TakesPlentyOfSiestas,
                },
            ];

            assert_list_eq!(results, expected);
        }

        #[test]
        fn min_advance_2() {
            let opts = SearchStatic4Method1Opts {
                tid: 12345,
                sid: 54321,
                year: 2000,
                min_delay: 600,
                max_delay: 605,
                min_advance: 2,
                max_advance: 2,
                force_second: None,
                species: Species::Turtwig,
                filter: PkmFilter {
                    ability: None,
                    gender: None,
                    nature: None,
                    shiny: false,
                    stats: None,
                    min_ivs: ivs!(30 / 30 / 20 / 20 / 20 / 20),
                    max_ivs: Ivs::new_all31(),
                },
            };

            let results = search_static4_method1_seeds(&opts);
            let expected = [
                SearchStatic4Method1State {
                    advance: 2,
                    seed_time: SeedTime4 {
                        seed: 0x5C03025B,
                        datetime: datetime!(2000-01-01 03:33:58).unwrap(),
                        delay: 603,
                        coin_flips: coin_flips!("HTHHHHHTHHHTHHTHTHTH"),
                    },
                    pid: 0x74313CBB,
                    shiny: false,
                    nature: Nature::Quiet,
                    ability: AbilityType::Second,
                    ivs: Ivs {
                        hp: 30,
                        atk: 30,
                        def: 21,
                        spa: 21,
                        spd: 27,
                        spe: 26,
                    },
                    gender: Gender::Male,
                    characteristic: Characteristic::ProudOfItsPower,
                },
                SearchStatic4Method1State {
                    advance: 2,
                    seed_time: SeedTime4 {
                        seed: 0xDC03025B,
                        datetime: datetime!(2000-04-26 03:58:58).unwrap(),
                        delay: 603,
                        coin_flips: coin_flips!("HHTTTTTHTHTHHTTTHHTT"),
                    },
                    pid: 0xF431BCBB,
                    shiny: false,
                    nature: Nature::Impish,
                    ability: AbilityType::Second,
                    ivs: Ivs {
                        hp: 30,
                        atk: 30,
                        def: 21,
                        spa: 21,
                        spd: 27,
                        spe: 26,
                    },
                    gender: Gender::Male,
                    characteristic: Characteristic::LovesToEat,
                },
                SearchStatic4Method1State {
                    advance: 2,
                    seed_time: SeedTime4 {
                        seed: 0x0403025B,
                        datetime: datetime!(2000-01-01 03:00:03).unwrap(),
                        delay: 603,
                        coin_flips: coin_flips!("HTHTTTHTHHHHTTTTTTHH"),
                    },
                    pid: 0x9C3104BB,
                    shiny: false,
                    nature: Nature::Gentle,
                    ability: AbilityType::Second,
                    ivs: Ivs {
                        hp: 30,
                        atk: 30,
                        def: 23,
                        spa: 21,
                        spd: 21,
                        spe: 26,
                    },
                    gender: Gender::Male,
                    characteristic: Characteristic::LovesToEat,
                },
                SearchStatic4Method1State {
                    advance: 2,
                    seed_time: SeedTime4 {
                        seed: 0x8403025B,
                        datetime: datetime!(2000-01-15 03:59:58).unwrap(),
                        delay: 603,
                        coin_flips: coin_flips!("HTTTTHTTTHHTHTTHTHTH"),
                    },
                    pid: 0x1C3184BB,
                    shiny: false,
                    nature: Nature::Mild,
                    ability: AbilityType::Second,
                    ivs: Ivs {
                        hp: 30,
                        atk: 30,
                        def: 23,
                        spa: 21,
                        spd: 21,
                        spe: 26,
                    },
                    gender: Gender::Male,
                    characteristic: Characteristic::LovesToEat,
                },
                SearchStatic4Method1State {
                    advance: 2,
                    seed_time: SeedTime4 {
                        seed: 0x0003025B,
                        datetime: datetime!(2000-05-28 03:58:58).unwrap(),
                        delay: 603,
                        coin_flips: coin_flips!("HHHTTTTTHHHTTTHHTHTH"),
                    },
                    pid: 0x583130BB,
                    shiny: false,
                    nature: Nature::Sassy,
                    ability: AbilityType::Second,
                    ivs: Ivs {
                        hp: 30,
                        atk: 30,
                        def: 26,
                        spa: 21,
                        spd: 28,
                        spe: 26,
                    },
                    gender: Gender::Male,
                    characteristic: Characteristic::LovesToEat,
                },
                SearchStatic4Method1State {
                    advance: 2,
                    seed_time: SeedTime4 {
                        seed: 0x8003025B,
                        datetime: datetime!(2000-01-11 03:59:58).unwrap(),
                        delay: 603,
                        coin_flips: coin_flips!("TTTTHHTHHTHHHTHTHTHT"),
                    },
                    pid: 0xD831B0BB,
                    shiny: false,
                    nature: Nature::Jolly,
                    ability: AbilityType::Second,
                    ivs: Ivs {
                        hp: 30,
                        atk: 30,
                        def: 26,
                        spa: 21,
                        spd: 28,
                        spe: 26,
                    },
                    gender: Gender::Male,
                    characteristic: Characteristic::ProudOfItsPower,
                },
                SearchStatic4Method1State {
                    advance: 2,
                    seed_time: SeedTime4 {
                        seed: 0xA803025B,
                        datetime: datetime!(2000-02-26 03:58:58).unwrap(),
                        delay: 603,
                        coin_flips: coin_flips!("HHTHHHHTTHTHHHTTHTHH"),
                    },
                    pid: 0x8031F8BB,
                    shiny: false,
                    nature: Nature::Serious,
                    ability: AbilityType::Second,
                    ivs: Ivs {
                        hp: 30,
                        atk: 30,
                        def: 28,
                        spa: 21,
                        spd: 22,
                        spe: 26,
                    },
                    gender: Gender::Male,
                    characteristic: Characteristic::LovesToEat,
                },
                SearchStatic4Method1State {
                    advance: 2,
                    seed_time: SeedTime4 {
                        seed: 0x2803025B,
                        datetime: datetime!(2000-01-01 03:00:39).unwrap(),
                        delay: 603,
                        coin_flips: coin_flips!("HHHTTTHHHTHTTHTHHTHT"),
                    },
                    pid: 0x003178BB,
                    shiny: false,
                    nature: Nature::Gentle,
                    ability: AbilityType::Second,
                    ivs: Ivs {
                        hp: 30,
                        atk: 30,
                        def: 28,
                        spa: 21,
                        spd: 22,
                        spe: 26,
                    },
                    gender: Gender::Male,
                    characteristic: Characteristic::LovesToEat,
                },
                SearchStatic4Method1State {
                    advance: 2,
                    seed_time: SeedTime4 {
                        seed: 0xA403025B,
                        datetime: datetime!(2000-02-24 03:58:58).unwrap(),
                        delay: 603,
                        coin_flips: coin_flips!("TTHHTTTHTTHHTTTTHTTT"),
                    },
                    pid: 0x3C3124BB,
                    shiny: false,
                    nature: Nature::Brave,
                    ability: AbilityType::Second,
                    ivs: Ivs {
                        hp: 30,
                        atk: 30,
                        def: 31,
                        spa: 21,
                        spd: 29,
                        spe: 26,
                    },
                    gender: Gender::Male,
                    characteristic: Characteristic::CapableOfTakingHits,
                },
                SearchStatic4Method1State {
                    advance: 2,
                    seed_time: SeedTime4 {
                        seed: 0x2403025B,
                        datetime: datetime!(2000-01-01 03:00:35).unwrap(),
                        delay: 603,
                        coin_flips: coin_flips!("HTHTHTHHTHHHTTHTHHTT"),
                    },
                    pid: 0xBC31A4BB,
                    shiny: false,
                    nature: Nature::Bashful,
                    ability: AbilityType::Second,
                    ivs: Ivs {
                        hp: 30,
                        atk: 30,
                        def: 31,
                        spa: 21,
                        spd: 29,
                        spe: 26,
                    },
                    gender: Gender::Male,
                    characteristic: Characteristic::CapableOfTakingHits,
                },
            ];

            assert_list_eq!(results, expected);
        }

        #[test]
        fn force_second() {
            let opts = SearchStatic4Method1Opts {
                tid: 12345,
                sid: 54321,
                year: 2000,
                min_delay: 600,
                max_delay: 605,
                min_advance: 2,
                max_advance: 2,
                force_second: Some(30),
                species: Species::Turtwig,
                filter: PkmFilter {
                    ability: None,
                    gender: None,
                    nature: None,
                    shiny: false,
                    stats: None,
                    min_ivs: ivs!(30 / 30 / 20 / 20 / 20 / 20),
                    max_ivs: Ivs::new_all31(),
                },
            };

            let results = search_static4_method1_seeds(&opts);
            let expected = [
                SearchStatic4Method1State {
                    advance: 2,
                    seed_time: SeedTime4 {
                        seed: 0x5C03025B,
                        datetime: datetime!(2000-01-03 03:59:30).unwrap(),
                        delay: 603,
                        coin_flips: coin_flips!("HTHHHHHTHHHTHHTHTHTH"),
                    },
                    pid: 0x74313CBB,
                    shiny: false,
                    nature: Nature::Quiet,
                    ability: AbilityType::Second,
                    ivs: Ivs {
                        hp: 30,
                        atk: 30,
                        def: 21,
                        spa: 21,
                        spd: 27,
                        spe: 26,
                    },
                    gender: Gender::Male,
                    characteristic: Characteristic::ProudOfItsPower,
                },
                SearchStatic4Method1State {
                    advance: 2,
                    seed_time: SeedTime4 {
                        seed: 0xDC03025B,
                        datetime: datetime!(2000-05-27 03:55:30).unwrap(),
                        delay: 603,
                        coin_flips: coin_flips!("HHTTTTTHTHTHHTTTHHTT"),
                    },
                    pid: 0xF431BCBB,
                    shiny: false,
                    nature: Nature::Impish,
                    ability: AbilityType::Second,
                    ivs: Ivs {
                        hp: 30,
                        atk: 30,
                        def: 21,
                        spa: 21,
                        spd: 27,
                        spe: 26,
                    },
                    gender: Gender::Male,
                    characteristic: Characteristic::LovesToEat,
                },
                SearchStatic4Method1State {
                    advance: 2,
                    seed_time: SeedTime4 {
                        seed: 0x0403025B,
                        datetime: datetime!(2000-06-29 03:56:30).unwrap(),
                        delay: 603,
                        coin_flips: coin_flips!("HTHTTTHTHHHHTTTTTTHH"),
                    },
                    pid: 0x9C3104BB,
                    shiny: false,
                    nature: Nature::Gentle,
                    ability: AbilityType::Second,
                    ivs: Ivs {
                        hp: 30,
                        atk: 30,
                        def: 23,
                        spa: 21,
                        spd: 21,
                        spe: 26,
                    },
                    gender: Gender::Male,
                    characteristic: Characteristic::LovesToEat,
                },
                SearchStatic4Method1State {
                    advance: 2,
                    seed_time: SeedTime4 {
                        seed: 0x8403025B,
                        datetime: datetime!(2000-02-22 03:58:30).unwrap(),
                        delay: 603,
                        coin_flips: coin_flips!("HTTTTHTTTHHTHTTHTHTH"),
                    },
                    pid: 0x1C3184BB,
                    shiny: false,
                    nature: Nature::Mild,
                    ability: AbilityType::Second,
                    ivs: Ivs {
                        hp: 30,
                        atk: 30,
                        def: 23,
                        spa: 21,
                        spd: 21,
                        spe: 26,
                    },
                    gender: Gender::Male,
                    characteristic: Characteristic::LovesToEat,
                },
                SearchStatic4Method1State {
                    advance: 2,
                    seed_time: SeedTime4 {
                        seed: 0x0003025B,
                        datetime: datetime!(2000-06-28 03:58:30).unwrap(),
                        delay: 603,
                        coin_flips: coin_flips!("HHHTTTTTHHHTTTHHTHTH"),
                    },
                    pid: 0x583130BB,
                    shiny: false,
                    nature: Nature::Sassy,
                    ability: AbilityType::Second,
                    ivs: Ivs {
                        hp: 30,
                        atk: 30,
                        def: 26,
                        spa: 21,
                        spd: 28,
                        spe: 26,
                    },
                    gender: Gender::Male,
                    characteristic: Characteristic::LovesToEat,
                },
                SearchStatic4Method1State {
                    advance: 2,
                    seed_time: SeedTime4 {
                        seed: 0x8003025B,
                        datetime: datetime!(2000-02-20 03:58:30).unwrap(),
                        delay: 603,
                        coin_flips: coin_flips!("TTTTHHTHHTHHHTHTHTHT"),
                    },
                    pid: 0xD831B0BB,
                    shiny: false,
                    nature: Nature::Jolly,
                    ability: AbilityType::Second,
                    ivs: Ivs {
                        hp: 30,
                        atk: 30,
                        def: 26,
                        spa: 21,
                        spd: 28,
                        spe: 26,
                    },
                    gender: Gender::Male,
                    characteristic: Characteristic::ProudOfItsPower,
                },
                SearchStatic4Method1State {
                    advance: 2,
                    seed_time: SeedTime4 {
                        seed: 0xA803025B,
                        datetime: datetime!(2000-03-27 03:57:30).unwrap(),
                        delay: 603,
                        coin_flips: coin_flips!("HHTHHHHTTHTHHHTTHTHH"),
                    },
                    pid: 0x8031F8BB,
                    shiny: false,
                    nature: Nature::Serious,
                    ability: AbilityType::Second,
                    ivs: Ivs {
                        hp: 30,
                        atk: 30,
                        def: 28,
                        spa: 21,
                        spd: 22,
                        spe: 26,
                    },
                    gender: Gender::Male,
                    characteristic: Characteristic::LovesToEat,
                },
                SearchStatic4Method1State {
                    advance: 2,
                    seed_time: SeedTime4 {
                        seed: 0x2803025B,
                        datetime: datetime!(2000-01-01 03:09:30).unwrap(),
                        delay: 603,
                        coin_flips: coin_flips!("HHHTTTHHHTHTTHTHHTHT"),
                    },
                    pid: 0x003178BB,
                    shiny: false,
                    nature: Nature::Gentle,
                    ability: AbilityType::Second,
                    ivs: Ivs {
                        hp: 30,
                        atk: 30,
                        def: 28,
                        spa: 21,
                        spd: 22,
                        spe: 26,
                    },
                    gender: Gender::Male,
                    characteristic: Characteristic::LovesToEat,
                },
                SearchStatic4Method1State {
                    advance: 2,
                    seed_time: SeedTime4 {
                        seed: 0xA403025B,
                        datetime: datetime!(2000-03-25 03:59:30).unwrap(),
                        delay: 603,
                        coin_flips: coin_flips!("TTHHTTTHTTHHTTTTHTTT"),
                    },
                    pid: 0x3C3124BB,
                    shiny: false,
                    nature: Nature::Brave,
                    ability: AbilityType::Second,
                    ivs: Ivs {
                        hp: 30,
                        atk: 30,
                        def: 31,
                        spa: 21,
                        spd: 29,
                        spe: 26,
                    },
                    gender: Gender::Male,
                    characteristic: Characteristic::CapableOfTakingHits,
                },
                SearchStatic4Method1State {
                    advance: 2,
                    seed_time: SeedTime4 {
                        seed: 0x2403025B,
                        datetime: datetime!(2000-01-01 03:05:30).unwrap(),
                        delay: 603,
                        coin_flips: coin_flips!("HTHTHTHHTHHHTTHTHHTT"),
                    },
                    pid: 0xBC31A4BB,
                    shiny: false,
                    nature: Nature::Bashful,
                    ability: AbilityType::Second,
                    ivs: Ivs {
                        hp: 30,
                        atk: 30,
                        def: 31,
                        spa: 21,
                        spd: 29,
                        spe: 26,
                    },
                    gender: Gender::Male,
                    characteristic: Characteristic::CapableOfTakingHits,
                },
            ];

            assert_list_eq!(results, expected);
        }
    }

    mod search_static4_methodj_seed {

        use super::*;
        use crate::{assert_list_eq, coin_flips, datetime, ivs};
        #[test]
        fn static_methodj() {
            let opts = SearchStatic4MethodjOpts {
                tid: 12345,
                sid: 54321,
                game: GameVersion::Diamond,
                encounter: Static4Species::Drifloon,
                lead: LeadAbilities::None,
                filter: PkmFilter {
                    shiny: false,
                    nature: None,
                    gender: None,
                    min_ivs: ivs!(30 / 30 / 20 / 20 / 20 / 20),
                    max_ivs: Ivs::new_all31(),
                    ability: None,
                    stats: None,
                },
                min_advance: 0,
                max_advance: 20,
                min_delay: 0,
                max_delay: 20,
                year: 2025,
                force_second: None,
            };
            let results = search_static4_methodj_seeds(&opts);
            let expected = [
                SearchStatic4MethodjState {
                    seed_time: SeedTime4 {
                        seed: 0x5C03025B,
                        datetime: datetime!(2000-01-01 03:33:58).unwrap(),
                        delay: 603,
                        coin_flips: coin_flips!("HTHHHHHTHHHTHHTHTHTH"),
                    },
                    seed: 0,
                    advance: 0,
                    pid: 1,
                    ivs: Ivs {
                        hp: 0,
                        atk: 0,
                        def: 0,
                        spa: 0,
                        spd: 0,
                        spe: 0,
                    },
                    ability: AbilityType::First,
                    gender: Gender::Female,
                    nature: Nature::Adamant,
                    shiny: false,
                    characteristic: Characteristic::ALittleQuickTempered,
                },
                SearchStatic4MethodjState {
                    seed_time: SeedTime4 {
                        seed: 0x5C03025B,
                        datetime: datetime!(2000-01-01 03:33:58).unwrap(),
                        delay: 603,
                        coin_flips: coin_flips!("HTHHHHHTHHHTHHTHTHTH"),
                    },
                    seed: 0,
                    advance: 0,
                    pid: 1,
                    ivs: Ivs {
                        hp: 0,
                        atk: 0,
                        def: 0,
                        spa: 0,
                        spd: 0,
                        spe: 0,
                    },
                    ability: AbilityType::First,
                    gender: Gender::Female,
                    nature: Nature::Adamant,
                    shiny: false,
                    characteristic: Characteristic::ALittleQuickTempered,
                },
            ];
            assert_eq!(results, expected);
        }
    }
}
