use crate::gen4::{
    DpptSeedTime4, FindSeedTime4Options, GameVersion, HgssSeedTime4, HgssSeedTime4Options,
    LeadAbilities, RoamerSet, Static4Species, dppt_find_seedtime, hgss_calculate_seedtime,
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
    pub seed_time: DpptSeedTime4,
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

    fn pid(&self) -> u32 {
        self.pid
    }
}

impl Base4Method1State {
    fn full_state(&self, advance: usize, seed_time: DpptSeedTime4) -> SearchStatic4Method1State {
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
    pub roamer: RoamerSet,
}
#[derive(Debug, Clone, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct SearchStatic4MethodjState<T> {
    pub seed_time: T,
    pub advance: usize,
    pub pid: u32,
    pub ivs: Ivs,
    pub ability: AbilityType,
    pub gender: Gender,
    pub nature: Nature,
    pub shiny: bool,
    pub characteristic: Characteristic,
}

#[derive(Clone, Copy)]
pub struct Base4MethodjState {
    pub seed: u32,
    pub pid: u32,
    pub ivs: Ivs,
    pub ability: AbilityType,
    pub gender: Gender,
    pub nature: Nature,
    pub shiny: bool,
    pub characteristic: Characteristic,
    pub advance: usize,
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

    fn pid(&self) -> u32 {
        self.pid
    }
}
impl Base4MethodjState {
    fn full_state(
        &self,
        advance: usize,
        seed_time: DpptSeedTime4,
    ) -> SearchStatic4MethodjState<DpptSeedTime4> {
        SearchStatic4MethodjState {
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

impl Base4MethodjState {
    fn full_hg_state(
        &self,
        advance: usize,
        seed_time: HgssSeedTime4,
    ) -> SearchStatic4MethodjState<HgssSeedTime4> {
        SearchStatic4MethodjState {
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

pub fn search_static4_methodj_seeds(
    opts: &SearchStatic4MethodjOpts,
) -> Vec<SearchStatic4MethodjState<DpptSeedTime4>> {
    let min_advance = opts.min_advance;
    let max_advance = opts.max_advance;

    let mut results = vec![];

    for state in search_static4_methodj(opts).iter() {
        let mut rng = Pokerng::new(state.seed).rev();
        let mut seed = state.seed;
        if min_advance != 0 {
            rng.advance(min_advance.saturating_sub(1));
            seed = rng.rand::<u32>();
        }
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

pub fn search_static4_methodj_seed(
    opts: &SearchStatic4MethodjOpts,
    ivs: Ivs,
) -> Vec<Base4MethodjState> {
    let seeds = recover_poke_rng_iv(&ivs, false);
    seeds
        .into_iter()
        .flat_map(|seed| get_state_from_jseed(opts, ivs, seed))
        .filter(|state| {
            // Don't check IVs since we specifically found matching IVs
            opts.filter.pass_filter_no_ivs(state)
        })
        .collect()
}

fn get_state_from_jseed(
    opts: &SearchStatic4MethodjOpts,
    ivs: Ivs,
    seed: u32,
) -> Vec<Base4MethodjState> {
    let mut results = vec![];
    let mut rng = Pokerng::new(seed).rev();
    let lead = opts.lead;

    match lead {
        LeadAbilities::Synchronize(synch_nature) => {
            let pidh = rng.rand::<u16>() as u32;
            let pidl = rng.rand::<u16>() as u32;
            let pid = (pidh << 16) | pidl;

            let nature_rand = (pid % 25) as u16;
            let nature = Nature::from(nature_rand as u8);

            let mut full_seed = rng.rand::<u32>();
            let mut next_rng = (full_seed >> 16) as u16;
            let mut next_rng_2 = rng.rand::<u16>();
            loop {
                let origin_seed = if next_rng >> 15 == 0 {
                    if nature == synch_nature {
                        let mut seed_rng = Pokerng::new(full_seed).rev();
                        Some(seed_rng.rand::<u32>())
                    } else {
                        None
                    }
                } else if next_rng_2 >> 15 == 1 && next_rng / 0xa3e == nature_rand {
                    let mut seed_rng = Pokerng::new(full_seed).rev();
                    seed_rng.rand::<u32>();
                    Some(seed_rng.rand::<u32>())
                } else {
                    None
                };

                if let Some(origin_seed) = origin_seed {
                    let gender: Gender = opts.encounter.species().gender_from_pid(pid);
                    let ability = AbilityType::from_gen3_pid(pid);
                    let shiny = gen3_shiny(pid, opts.tid, opts.sid);
                    let characteristic = Characteristic::new(pid, &ivs);

                    results.push(Base4MethodjState {
                        ivs,
                        seed: origin_seed,
                        shiny,
                        ability,
                        characteristic,
                        gender,
                        nature,
                        pid,
                        advance: 0,
                    });
                }

                let hunt_nature = (((next_rng as u32) << 16 | next_rng_2 as u32) % 25) as u16;
                full_seed = rng.rand::<u32>();
                next_rng = (full_seed >> 16) as u16;
                next_rng_2 = rng.rand::<u16>();

                if hunt_nature == nature_rand {
                    break;
                }
            }
            results
        }
        LeadAbilities::CutecharmF | LeadAbilities::CutecharmM => {
            let gender_threshold = opts.encounter.species().gender_ratio();
            let buffer: u32;
            if lead == LeadAbilities::CutecharmF {
                buffer = 25 * ((gender_threshold as u32 / 25) + 1);
            } else {
                buffer = 0;
            }
            let nature_rand = rng.rand::<u16>() / 0xa3e;
            let nature = Nature::from(nature_rand as u8);
            let full_seed = rng.rand::<u32>();

            if (full_seed >> 16) as u16 / ((65535 / 3) + 1) != 0 {
                let pid = buffer + nature_rand as u32;
                let mut seed_rng = Pokerng::new(full_seed).rev();
                let origin_seed = seed_rng.rand::<u32>();
                results.push(Base4MethodjState {
                    ivs,
                    seed: origin_seed,
                    shiny: gen3_shiny(pid, opts.tid, opts.sid),
                    ability: AbilityType::from_gen3_pid(pid),
                    characteristic: Characteristic::new(pid, &ivs),
                    gender: opts.encounter.species().gender_from_pid(pid),
                    nature,
                    pid,
                    advance: 0,
                });
                results
            } else {
                vec![]
            }
        }

        LeadAbilities::None => {
            let pidh = rng.rand::<u16>() as u32;
            let pidl = rng.rand::<u16>() as u32;
            let pid = (pidh << 16) | pidl;

            let nature_rand = (pid % 25) as u16;
            let nature = Nature::from(nature_rand as u8);

            let mut full_seed = rng.rand::<u32>();
            let mut next_rng = (full_seed >> 16) as u16;
            let mut next_rng_2 = rng.rand::<u16>();
            loop {
                if next_rng / 0xa3e == nature_rand {
                    let gender: Gender = opts.encounter.species().gender_from_pid(pid);
                    let ability = AbilityType::from_gen3_pid(pid);
                    let shiny = gen3_shiny(pid, opts.tid, opts.sid);
                    let characteristic = Characteristic::new(pid, &ivs);

                    let mut seed_rng = Pokerng::new(full_seed).rev();
                    let origin_seed = seed_rng.rand::<u32>();

                    results.push(Base4MethodjState {
                        ivs,
                        seed: origin_seed,
                        shiny,
                        ability,
                        characteristic,
                        gender,
                        nature,
                        pid,
                        advance: 0,
                    });
                }

                let hunt_nature = (((next_rng as u32) << 16 | next_rng_2 as u32) % 25) as u16;
                full_seed = rng.rand::<u32>();
                next_rng = (full_seed >> 16) as u16;
                next_rng_2 = rng.rand::<u16>();

                if hunt_nature == nature_rand {
                    break;
                }
            }
            results
        }
    }
}

pub fn search_static4_methodk_seeds(
    opts: &SearchStatic4MethodjOpts,
) -> Vec<SearchStatic4MethodjState<HgssSeedTime4>> {
    let min_advance = opts.min_advance;
    let max_advance = opts.max_advance;
    let second = opts.force_second;
    let second_range = second.map(|s| s..=s).unwrap_or(0..=59);

    let mut results = vec![];

    for state in search_static4_methodk(opts).iter() {
        let mut rng = Pokerng::new(state.seed).rev();
        let mut seed = state.seed;
        if min_advance != 0 {
            rng.advance(min_advance.saturating_sub(1));
            seed = rng.rand::<u32>();
        }
        for advance in min_advance..=max_advance {
            let seed_time_opts = HgssSeedTime4Options {
                seed: seed,
                year: opts.year,
                month: None,
                second_range: Some(second_range.clone()),
                delay_range: Some(opts.min_delay..=opts.max_delay),
                find_first: true,
                roamer: opts.roamer,
            };
            let seed_time = hgss_calculate_seedtime(seed_time_opts);

            if let Some(seed_time) = seed_time.into_iter().next() {
                let found_state = state.full_hg_state(advance, seed_time);
                results.push(found_state);
            }
            seed = rng.rand::<u32>();
        }
    }

    results
}

fn search_static4_methodk(opts: &SearchStatic4MethodjOpts) -> Vec<Base4MethodjState> {
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
        search_static4_methodk_seed(
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

pub fn search_static4_methodk_seed(
    opts: &SearchStatic4MethodjOpts,
    ivs: Ivs,
) -> Vec<Base4MethodjState> {
    let seeds = recover_poke_rng_iv(&ivs, false);
    seeds
        .into_iter()
        .flat_map(|seed| get_state_from_kseed(opts, ivs, seed))
        .filter(|state| {
            // Don't check IVs since we specifically found matching IVs
            opts.filter.pass_filter_no_ivs(state)
        })
        .collect()
}

fn get_state_from_kseed(
    opts: &SearchStatic4MethodjOpts,
    ivs: Ivs,
    seed: u32,
) -> Vec<Base4MethodjState> {
    let mut results = vec![];
    let mut rng = Pokerng::new(seed).rev();
    let lead = opts.lead;

    match lead {
        LeadAbilities::Synchronize(synch_nature) => {
            let pidh = rng.rand::<u16>() as u32;
            let pidl = rng.rand::<u16>() as u32;
            let pid = (pidh << 16) | pidl;

            let nature_rand = (pid % 25) as u16;
            let nature = Nature::from(nature_rand as u8);

            let mut full_seed = rng.rand::<u32>();
            let mut next_rng = (full_seed >> 16) as u16;
            let mut full_seed2 = rng.rand::<u32>();
            let mut next_rng_2 = (full_seed2 >> 16) as u16;
            loop {
                let origin_seed = if next_rng % 2 == 0 {
                    if nature == synch_nature {
                        let mut seed_rng = Pokerng::new(full_seed).rev();
                        Some(seed_rng.rand::<u32>())
                    } else {
                        None
                    }
                } else if next_rng_2 % 2 == 1 && next_rng % 25 == nature_rand {
                    let mut seed_rng = Pokerng::new(full_seed2).rev();
                    Some(seed_rng.rand::<u32>())
                } else {
                    None
                };

                if let Some(origin_seed) = origin_seed {
                    let gender: Gender = opts.encounter.species().gender_from_pid(pid);
                    let ability = AbilityType::from_gen3_pid(pid);
                    let shiny = gen3_shiny(pid, opts.tid, opts.sid);
                    let characteristic = Characteristic::new(pid, &ivs);

                    results.push(Base4MethodjState {
                        ivs,
                        seed: origin_seed,
                        shiny,
                        ability,
                        characteristic,
                        gender,
                        nature,
                        pid,
                        advance: 0,
                    });
                }

                let hunt_nature = (((next_rng as u32) << 16 | next_rng_2 as u32) % 25) as u16;
                full_seed = rng.rand::<u32>();
                next_rng = (full_seed >> 16) as u16;
                full_seed2 = rng.rand::<u32>();
                next_rng_2 = (full_seed2 >> 16) as u16;

                if hunt_nature == nature_rand {
                    break;
                }
            }
            results
        }
        LeadAbilities::CutecharmF | LeadAbilities::CutecharmM => {
            let gender_threshold = opts.encounter.species().gender_ratio();
            let buffer: u32;
            if lead == LeadAbilities::CutecharmF {
                buffer = 25 * ((gender_threshold as u32 / 25) + 1);
            } else {
                buffer = 0;
            }
            let nature_rand = rng.rand::<u16>() % 25;
            let nature = Nature::from(nature_rand as u8);
            let full_seed = rng.rand::<u32>();

            if (full_seed >> 16) as u16 % 3 != 0 {
                let pid = buffer + nature_rand as u32;
                let mut seed_rng = Pokerng::new(full_seed).rev();
                let origin_seed = seed_rng.rand::<u32>();
                results.push(Base4MethodjState {
                    ivs,
                    seed: origin_seed,
                    shiny: gen3_shiny(pid, opts.tid, opts.sid),
                    ability: AbilityType::from_gen3_pid(pid),
                    characteristic: Characteristic::new(pid, &ivs),
                    gender: opts.encounter.species().gender_from_pid(pid),
                    nature,
                    pid,
                    advance: 0,
                });
                results
            } else {
                vec![]
            }
        }
        LeadAbilities::None => {
            let pidh = rng.rand::<u16>() as u32;
            let pidl = rng.rand::<u16>() as u32;
            let pid = (pidh << 16) | pidl;

            let nature_rand = (pid % 25) as u16;
            let nature = Nature::from(nature_rand as u8);

            let mut full_seed = rng.rand::<u32>();
            let mut next_rng = (full_seed >> 16) as u16;
            let mut next_rng_2 = rng.rand::<u16>();
            loop {
                if next_rng % 25 == nature_rand {
                    let gender: Gender = opts.encounter.species().gender_from_pid(pid);
                    let ability = AbilityType::from_gen3_pid(pid);
                    let shiny = gen3_shiny(pid, opts.tid, opts.sid);
                    let characteristic = Characteristic::new(pid, &ivs);

                    let mut seed_rng = Pokerng::new(full_seed).rev();
                    let origin_seed = seed_rng.rand::<u32>();

                    results.push(Base4MethodjState {
                        ivs,
                        seed: origin_seed,
                        shiny,
                        ability,
                        characteristic,
                        gender,
                        nature,
                        pid,
                        advance: 0,
                    });
                }

                let hunt_nature = (((next_rng as u32) << 16 | next_rng_2 as u32) % 25) as u16;
                full_seed = rng.rand::<u32>();
                next_rng = (full_seed >> 16) as u16;
                next_rng_2 = rng.rand::<u16>();

                if hunt_nature == nature_rand {
                    break;
                }
            }
            results
        }
    }
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
                    min_ivs: ivs!(30 / 30 / 20 / 20 / 20 / 20),
                    ..Default::default()
                },
            };

            let results = search_static4_method1_seeds(&opts);
            let expected = [
                SearchStatic4Method1State {
                    advance: 2,
                    seed_time: DpptSeedTime4 {
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
                    seed_time: DpptSeedTime4 {
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
                    seed_time: DpptSeedTime4 {
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
                    seed_time: DpptSeedTime4 {
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
                    seed_time: DpptSeedTime4 {
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
                    seed_time: DpptSeedTime4 {
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
                    seed_time: DpptSeedTime4 {
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
                    seed_time: DpptSeedTime4 {
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
                    seed_time: DpptSeedTime4 {
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
                    seed_time: DpptSeedTime4 {
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
                    seed_time: DpptSeedTime4 {
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
                    seed_time: DpptSeedTime4 {
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
                    seed_time: DpptSeedTime4 {
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
                    seed_time: DpptSeedTime4 {
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
                    seed_time: DpptSeedTime4 {
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
                    seed_time: DpptSeedTime4 {
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
                    seed_time: DpptSeedTime4 {
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
                    seed_time: DpptSeedTime4 {
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
                    min_ivs: ivs!(30 / 30 / 20 / 20 / 20 / 20),
                    ..Default::default()
                },
            };

            let results = search_static4_method1_seeds(&opts);
            let expected = [
                SearchStatic4Method1State {
                    advance: 2,
                    seed_time: DpptSeedTime4 {
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
                    seed_time: DpptSeedTime4 {
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
                    seed_time: DpptSeedTime4 {
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
                    seed_time: DpptSeedTime4 {
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
                    seed_time: DpptSeedTime4 {
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
                    seed_time: DpptSeedTime4 {
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
                    seed_time: DpptSeedTime4 {
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
                    seed_time: DpptSeedTime4 {
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
                    seed_time: DpptSeedTime4 {
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
                    seed_time: DpptSeedTime4 {
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
                    min_ivs: ivs!(30 / 30 / 20 / 20 / 20 / 20),
                    ..Default::default()
                },
            };

            let results = search_static4_method1_seeds(&opts);
            let expected = [
                SearchStatic4Method1State {
                    advance: 2,
                    seed_time: DpptSeedTime4 {
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
                    seed_time: DpptSeedTime4 {
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
                    seed_time: DpptSeedTime4 {
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
                    seed_time: DpptSeedTime4 {
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
                    seed_time: DpptSeedTime4 {
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
                    seed_time: DpptSeedTime4 {
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
                    seed_time: DpptSeedTime4 {
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
                    seed_time: DpptSeedTime4 {
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
                    seed_time: DpptSeedTime4 {
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
                    seed_time: DpptSeedTime4 {
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
        use crate::{RngDateTime, assert_list_eq, coin_flips, ivs};
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
                    ..Default::default()
                },
                min_advance: 20,
                max_advance: 21,
                min_delay: 800,
                max_delay: 810,
                year: 2025,
                force_second: None,
                roamer: RoamerSet {
                    entei: false,
                    raikou: false,
                    latios: false,
                    latias: false,
                },
            };
            let results = search_static4_methodj_seeds(&opts);
            let expected = [
                SearchStatic4MethodjState {
                    seed_time: DpptSeedTime4 {
                        seed: 251986750,
                        datetime: RngDateTime {
                            year: 2025,
                            month: 1,
                            day: 1,
                            hour: 5,
                            minute: 0,
                            second: 14,
                        },
                        delay: 805,
                        coin_flips: coin_flips!("TTTHHTHTTHTTTHTHHTHH"),
                    },

                    advance: 20,
                    pid: 1825628748,
                    ivs: Ivs {
                        hp: 30,
                        atk: 30,
                        def: 26,
                        spa: 28,
                        spd: 30,
                        spe: 30,
                    },
                    ability: AbilityType::First,
                    gender: Gender::Female,
                    nature: Nature::Careful,
                    shiny: false,
                    characteristic: Characteristic::LovesToEat,
                },
                SearchStatic4MethodjState {
                    seed_time: DpptSeedTime4 {
                        seed: 2031092537,
                        datetime: RngDateTime {
                            year: 2025,
                            month: 1,
                            day: 4,
                            hour: 16,
                            minute: 59,
                            second: 58,
                        },
                        delay: 800,
                        coin_flips: coin_flips!("THHTHTHTTTTTTHTTHHHT"),
                    },

                    advance: 21,
                    pid: 3854107970,
                    ivs: Ivs {
                        hp: 30,
                        atk: 31,
                        def: 27,
                        spa: 20,
                        spd: 31,
                        spe: 29,
                    },
                    ability: AbilityType::First,
                    gender: Gender::Female,
                    nature: Nature::Calm,
                    shiny: false,
                    characteristic: Characteristic::SomewhatVain,
                },
                SearchStatic4MethodjState {
                    seed_time: DpptSeedTime4 {
                        seed: 3540321084,
                        datetime: RngDateTime {
                            year: 2025,
                            month: 4,
                            day: 24,
                            hour: 5,
                            minute: 57,
                            second: 58,
                        },
                        delay: 803,
                        coin_flips: coin_flips!("HTHHHHHTTTTHHTHHTTTT"),
                    },

                    advance: 20,
                    pid: 3989040986,
                    ivs: Ivs {
                        hp: 31,
                        atk: 30,
                        def: 20,
                        spa: 30,
                        spd: 29,
                        spe: 26,
                    },
                    ability: AbilityType::First,
                    gender: Gender::Female,
                    nature: Nature::Hasty,
                    shiny: false,
                    characteristic: Characteristic::TakesPlentyOfSiestas,
                },
                SearchStatic4MethodjState {
                    seed_time: DpptSeedTime4 {
                        seed: 4144825153,
                        datetime: RngDateTime {
                            year: 2025,
                            month: 5,
                            day: 26,
                            hour: 13,
                            minute: 59,
                            second: 58,
                        },
                        delay: 808,
                        coin_flips: coin_flips!("TTTTHTTTTHTHTHTTTTTT"),
                    },

                    advance: 21,
                    pid: 3605752178,
                    ivs: Ivs {
                        hp: 31,
                        atk: 30,
                        def: 27,
                        spa: 25,
                        spd: 29,
                        spe: 24,
                    },
                    ability: AbilityType::First,
                    gender: Gender::Female,
                    nature: Nature::Adamant,
                    shiny: false,
                    characteristic: Characteristic::TakesPlentyOfSiestas,
                },
                SearchStatic4MethodjState {
                    seed_time: DpptSeedTime4 {
                        seed: 990184252,
                        datetime: RngDateTime {
                            year: 2025,
                            month: 1,
                            day: 1,
                            hour: 5,
                            minute: 0,
                            second: 58,
                        },
                        delay: 803,
                        coin_flips: coin_flips!("THTTHTTTHTTTTHTHTTHH"),
                    },

                    advance: 20,
                    pid: 901994330,
                    ivs: Ivs {
                        hp: 31,
                        atk: 30,
                        def: 30,
                        spa: 30,
                        spd: 31,
                        spe: 26,
                    },
                    ability: AbilityType::First,
                    gender: Gender::Female,
                    nature: Nature::Bold,
                    shiny: false,
                    characteristic: Characteristic::SomewhatVain,
                },
                SearchStatic4MethodjState {
                    seed_time: DpptSeedTime4 {
                        seed: 3020292925,
                        datetime: RngDateTime {
                            year: 2025,
                            month: 3,
                            day: 21,
                            hour: 6,
                            minute: 59,
                            second: 58,
                        },
                        delay: 804,
                        coin_flips: coin_flips!("HTHHHTHTTTTHHHTTHTTT"),
                    },

                    advance: 21,
                    pid: 3753134498,
                    ivs: Ivs {
                        hp: 31,
                        atk: 31,
                        def: 22,
                        spa: 26,
                        spd: 29,
                        spe: 28,
                    },
                    ability: AbilityType::First,
                    gender: Gender::Male,
                    nature: Nature::Careful,
                    shiny: false,
                    characteristic: Characteristic::TakesPlentyOfSiestas,
                },
                SearchStatic4MethodjState {
                    seed_time: DpptSeedTime4 {
                        seed: 1611924281,
                        datetime: RngDateTime {
                            year: 2025,
                            month: 1,
                            day: 1,
                            hour: 20,
                            minute: 37,
                            second: 58,
                        },
                        delay: 800,
                        coin_flips: coin_flips!("TTHHHTHTHHTHHHHHTHTT"),
                    },

                    advance: 20,
                    pid: 2122931394,
                    ivs: Ivs {
                        hp: 31,
                        atk: 31,
                        def: 25,
                        spa: 25,
                        spd: 31,
                        spe: 31,
                    },
                    ability: AbilityType::First,
                    gender: Gender::Male,
                    nature: Nature::Rash,
                    shiny: false,
                    characteristic: Characteristic::TakesPlentyOfSiestas,
                },
                SearchStatic4MethodjState {
                    seed_time: DpptSeedTime4 {
                        seed: 1645413181,
                        datetime: RngDateTime {
                            year: 2025,
                            month: 1,
                            day: 1,
                            hour: 19,
                            minute: 39,
                            second: 58,
                        },
                        delay: 804,
                        coin_flips: coin_flips!("HTHHHTTHHTTTTTTTTHTH"),
                    },

                    advance: 20,
                    pid: 1161248720,
                    ivs: Ivs {
                        hp: 31,
                        atk: 31,
                        def: 30,
                        spa: 25,
                        spd: 26,
                        spe: 27,
                    },
                    ability: AbilityType::First,
                    gender: Gender::Male,
                    nature: Nature::Calm,
                    shiny: false,
                    characteristic: Characteristic::TakesPlentyOfSiestas,
                },
            ];
            assert_list_eq!(results, expected);
        }
        #[test]
        fn static_methodj_cutecharm_m() {
            let opts = SearchStatic4MethodjOpts {
                tid: 6416,
                sid: 6428,
                game: GameVersion::Diamond,
                encounter: Static4Species::Drifloon,
                lead: LeadAbilities::CutecharmM,
                filter: PkmFilter {
                    shiny: true,
                    nature: None,
                    gender: None,
                    min_ivs: ivs!(30 / 30 / 20 / 20 / 20 / 20),
                    max_ivs: Ivs::new_all31(),
                    ability: None,
                    stats: None,
                    ..Default::default()
                },
                min_advance: 20,
                max_advance: 21,
                min_delay: 800,
                max_delay: 850,
                year: 2025,
                force_second: None,
                roamer: RoamerSet {
                    entei: false,
                    raikou: false,
                    latios: false,
                    latias: false,
                },
            };
            let results = search_static4_methodj_seeds(&opts);
            let expected = [
                SearchStatic4MethodjState {
                    seed_time: DpptSeedTime4 {
                        seed: 1947206500,
                        datetime: RngDateTime {
                            year: 2025,
                            month: 1,
                            day: 1,
                            hour: 16,
                            minute: 57,
                            second: 58,
                        },
                        delay: 843,
                        coin_flips: coin_flips!("HHHHHHHTTHHTHHTTTTTT"),
                    },

                    advance: 20,
                    pid: 14,
                    ivs: Ivs {
                        hp: 30,
                        atk: 30,
                        def: 21,
                        spa: 26,
                        spd: 27,
                        spe: 21,
                    },
                    ability: AbilityType::First,
                    gender: Gender::Female,
                    nature: Nature::Naive,
                    shiny: true,
                    characteristic: Characteristic::LovesToEat,
                },
                SearchStatic4MethodjState {
                    seed_time: DpptSeedTime4 {
                        seed: 2014315364,
                        datetime: RngDateTime {
                            year: 2025,
                            month: 1,
                            day: 3,
                            hour: 16,
                            minute: 59,
                            second: 58,
                        },
                        delay: 843,
                        coin_flips: coin_flips!("THTTHTHHHHHHTHTTTHHT"),
                    },

                    advance: 20,
                    pid: 12,
                    ivs: Ivs {
                        hp: 30,
                        atk: 30,
                        def: 26,
                        spa: 26,
                        spd: 28,
                        spe: 21,
                    },
                    ability: AbilityType::First,
                    gender: Gender::Female,
                    nature: Nature::Serious,
                    shiny: true,
                    characteristic: Characteristic::LovesToEat,
                },
                SearchStatic4MethodjState {
                    seed_time: DpptSeedTime4 {
                        seed: 2081424228,
                        datetime: RngDateTime {
                            year: 2025,
                            month: 1,
                            day: 7,
                            hour: 16,
                            minute: 59,
                            second: 58,
                        },
                        delay: 843,
                        coin_flips: coin_flips!("HTHTHTHHTHTTTTTHTTHH"),
                    },

                    advance: 20,
                    pid: 9,
                    ivs: Ivs {
                        hp: 30,
                        atk: 30,
                        def: 31,
                        spa: 26,
                        spd: 29,
                        spe: 21,
                    },
                    ability: AbilityType::Second,
                    gender: Gender::Female,
                    nature: Nature::Lax,
                    shiny: true,
                    characteristic: Characteristic::CapableOfTakingHits,
                },
                SearchStatic4MethodjState {
                    seed_time: DpptSeedTime4 {
                        seed: 3221881707,
                        datetime: RngDateTime {
                            year: 2025,
                            month: 3,
                            day: 25,
                            hour: 10,
                            minute: 59,
                            second: 58,
                        },
                        delay: 850,
                        coin_flips: coin_flips!("THHHTHTHHTTHHHHHHTTT"),
                    },

                    advance: 20,
                    pid: 12,
                    ivs: Ivs {
                        hp: 30,
                        atk: 31,
                        def: 21,
                        spa: 25,
                        spd: 22,
                        spe: 26,
                    },
                    ability: AbilityType::First,
                    gender: Gender::Female,
                    nature: Nature::Serious,
                    shiny: true,
                    characteristic: Characteristic::LikesToThrashAbout,
                },
                SearchStatic4MethodjState {
                    seed_time: DpptSeedTime4 {
                        seed: 3288990571,
                        datetime: RngDateTime {
                            year: 2025,
                            month: 3,
                            day: 27,
                            hour: 10,
                            minute: 57,
                            second: 58,
                        },
                        delay: 850,
                        coin_flips: coin_flips!("TTTTTTTHTHTTHTHTTTHT"),
                    },

                    advance: 20,
                    pid: 9,
                    ivs: Ivs {
                        hp: 30,
                        atk: 31,
                        def: 26,
                        spa: 25,
                        spd: 23,
                        spe: 26,
                    },
                    ability: AbilityType::Second,
                    gender: Gender::Female,
                    nature: Nature::Lax,
                    shiny: true,
                    characteristic: Characteristic::LikesToThrashAbout,
                },
                SearchStatic4MethodjState {
                    seed_time: DpptSeedTime4 {
                        seed: 2600469312,
                        datetime: RngDateTime {
                            year: 2025,
                            month: 2,
                            day: 19,
                            hour: 0,
                            minute: 59,
                            second: 58,
                        },
                        delay: 807,
                        coin_flips: coin_flips!("THTTTHTHTHHHHTHHHHHH"),
                    },

                    advance: 20,
                    pid: 13,
                    ivs: Ivs {
                        hp: 31,
                        atk: 30,
                        def: 23,
                        spa: 22,
                        spd: 22,
                        spe: 22,
                    },
                    ability: AbilityType::Second,
                    gender: Gender::Female,
                    nature: Nature::Jolly,
                    shiny: true,
                    characteristic: Characteristic::TakesPlentyOfSiestas,
                },
                SearchStatic4MethodjState {
                    seed_time: DpptSeedTime4 {
                        seed: 1879180138,
                        datetime: RngDateTime {
                            year: 2025,
                            month: 1,
                            day: 1,
                            hour: 2,
                            minute: 53,
                            second: 58,
                        },
                        delay: 849,
                        coin_flips: coin_flips!("HTTTHTTTTHHHTHTHHTTH"),
                    },

                    advance: 20,
                    pid: 11,
                    ivs: Ivs {
                        hp: 31,
                        atk: 30,
                        def: 23,
                        spa: 28,
                        spd: 28,
                        spe: 26,
                    },
                    ability: AbilityType::Second,
                    gender: Gender::Female,
                    nature: Nature::Hasty,
                    shiny: true,
                    characteristic: Characteristic::TakesPlentyOfSiestas,
                },
                SearchStatic4MethodjState {
                    seed_time: DpptSeedTime4 {
                        seed: 3624010602,
                        datetime: RngDateTime {
                            year: 2025,
                            month: 4,
                            day: 25,
                            hour: 2,
                            minute: 58,
                            second: 58,
                        },
                        delay: 849,
                        coin_flips: coin_flips!("HHTHHTTHHHHHTTTHHHHH"),
                    },

                    advance: 20,
                    pid: 15,
                    ivs: Ivs {
                        hp: 31,
                        atk: 30,
                        def: 25,
                        spa: 28,
                        spd: 22,
                        spe: 26,
                    },
                    ability: AbilityType::Second,
                    gender: Gender::Female,
                    nature: Nature::Modest,
                    shiny: true,
                    characteristic: Characteristic::TakesPlentyOfSiestas,
                },
                SearchStatic4MethodjState {
                    seed_time: DpptSeedTime4 {
                        seed: 2667578176,
                        datetime: RngDateTime {
                            year: 2025,
                            month: 2,
                            day: 21,
                            hour: 0,
                            minute: 59,
                            second: 58,
                        },
                        delay: 807,
                        coin_flips: coin_flips!("TTTTTHTTTTHTHTHHTHHH"),
                    },

                    advance: 20,
                    pid: 10,
                    ivs: Ivs {
                        hp: 31,
                        atk: 30,
                        def: 28,
                        spa: 22,
                        spd: 23,
                        spe: 22,
                    },
                    ability: AbilityType::First,
                    gender: Gender::Female,
                    nature: Nature::Timid,
                    shiny: true,
                    characteristic: Characteristic::TakesPlentyOfSiestas,
                },
                SearchStatic4MethodjState {
                    seed_time: DpptSeedTime4 {
                        seed: 1946289002,
                        datetime: RngDateTime {
                            year: 2025,
                            month: 1,
                            day: 1,
                            hour: 2,
                            minute: 57,
                            second: 58,
                        },
                        delay: 849,
                        coin_flips: coin_flips!("HHHHHTHHTTHTHHHTTHTH"),
                    },

                    advance: 20,
                    pid: 8,
                    ivs: Ivs {
                        hp: 31,
                        atk: 30,
                        def: 28,
                        spa: 28,
                        spd: 29,
                        spe: 26,
                    },
                    ability: AbilityType::First,
                    gender: Gender::Female,
                    nature: Nature::Impish,
                    shiny: true,
                    characteristic: Characteristic::TakesPlentyOfSiestas,
                },
                SearchStatic4MethodjState {
                    seed_time: DpptSeedTime4 {
                        seed: 3691119466,
                        datetime: RngDateTime {
                            year: 2025,
                            month: 4,
                            day: 26,
                            hour: 2,
                            minute: 58,
                            second: 58,
                        },
                        delay: 849,
                        coin_flips: coin_flips!("TTTTHHTHTTHHTTHHHHHT"),
                    },

                    advance: 20,
                    pid: 12,
                    ivs: Ivs {
                        hp: 31,
                        atk: 30,
                        def: 30,
                        spa: 28,
                        spd: 23,
                        spe: 26,
                    },
                    ability: AbilityType::First,
                    gender: Gender::Female,
                    nature: Nature::Serious,
                    shiny: true,
                    characteristic: Characteristic::TakesPlentyOfSiestas,
                },
                SearchStatic4MethodjState {
                    seed_time: DpptSeedTime4 {
                        seed: 4228186973,
                        datetime: RngDateTime {
                            year: 2025,
                            month: 5,
                            day: 27,
                            hour: 5,
                            minute: 59,
                            second: 58,
                        },
                        delay: 836,
                        coin_flips: coin_flips!("THTTTTHTHHHHHHHTTTTH"),
                    },

                    advance: 21,
                    pid: 11,
                    ivs: Ivs {
                        hp: 31,
                        atk: 31,
                        def: 21,
                        spa: 20,
                        spd: 20,
                        spe: 23,
                    },
                    ability: AbilityType::Second,
                    gender: Gender::Female,
                    nature: Nature::Hasty,
                    shiny: true,
                    characteristic: Characteristic::TakesPlentyOfSiestas,
                },
                SearchStatic4MethodjState {
                    seed_time: DpptSeedTime4 {
                        seed: 1325663066,
                        datetime: RngDateTime {
                            year: 2025,
                            month: 1,
                            day: 1,
                            hour: 4,
                            minute: 20,
                            second: 58,
                        },
                        delay: 833,
                        coin_flips: coin_flips!("THTTHTHTHTTHTHTHHTTH"),
                    },

                    advance: 20,
                    pid: 11,
                    ivs: Ivs {
                        hp: 31,
                        atk: 31,
                        def: 21,
                        spa: 30,
                        spd: 30,
                        spe: 21,
                    },
                    ability: AbilityType::Second,
                    gender: Gender::Female,
                    nature: Nature::Hasty,
                    shiny: true,
                    characteristic: Characteristic::TakesPlentyOfSiestas,
                },
                SearchStatic4MethodjState {
                    seed_time: DpptSeedTime4 {
                        seed: 3070493530,
                        datetime: RngDateTime {
                            year: 2025,
                            month: 3,
                            day: 22,
                            hour: 4,
                            minute: 59,
                            second: 58,
                        },
                        delay: 833,
                        coin_flips: coin_flips!("HHTHHHTHTHHHHHHHHTHH"),
                    },

                    advance: 20,
                    pid: 15,
                    ivs: Ivs {
                        hp: 31,
                        atk: 31,
                        def: 23,
                        spa: 30,
                        spd: 24,
                        spe: 21,
                    },
                    ability: AbilityType::Second,
                    gender: Gender::Female,
                    nature: Nature::Modest,
                    shiny: true,
                    characteristic: Characteristic::TakesPlentyOfSiestas,
                },
                SearchStatic4MethodjState {
                    seed_time: DpptSeedTime4 {
                        seed: 2416247645,
                        datetime: RngDateTime {
                            year: 2025,
                            month: 1,
                            day: 27,
                            hour: 5,
                            minute: 59,
                            second: 58,
                        },
                        delay: 836,
                        coin_flips: coin_flips!("HHTHHTHHTHTTHHHHHTTT"),
                    },

                    advance: 21,
                    pid: 9,
                    ivs: Ivs {
                        hp: 31,
                        atk: 31,
                        def: 26,
                        spa: 20,
                        spd: 21,
                        spe: 23,
                    },
                    ability: AbilityType::Second,
                    gender: Gender::Female,
                    nature: Nature::Lax,
                    shiny: true,
                    characteristic: Characteristic::TakesPlentyOfSiestas,
                },
                SearchStatic4MethodjState {
                    seed_time: DpptSeedTime4 {
                        seed: 1392771930,
                        datetime: RngDateTime {
                            year: 2025,
                            month: 1,
                            day: 1,
                            hour: 4,
                            minute: 24,
                            second: 58,
                        },
                        delay: 833,
                        coin_flips: coin_flips!("TTHHHHHTHTTTHHHHTTHT"),
                    },

                    advance: 20,
                    pid: 8,
                    ivs: Ivs {
                        hp: 31,
                        atk: 31,
                        def: 26,
                        spa: 30,
                        spd: 31,
                        spe: 21,
                    },
                    ability: AbilityType::First,
                    gender: Gender::Female,
                    nature: Nature::Impish,
                    shiny: true,
                    characteristic: Characteristic::SomewhatVain,
                },
                SearchStatic4MethodjState {
                    seed_time: DpptSeedTime4 {
                        seed: 3137602394,
                        datetime: RngDateTime {
                            year: 2025,
                            month: 3,
                            day: 24,
                            hour: 4,
                            minute: 57,
                            second: 58,
                        },
                        delay: 833,
                        coin_flips: coin_flips!("HTHHTTHHTHTTHHHHHHHH"),
                    },

                    advance: 20,
                    pid: 12,
                    ivs: Ivs {
                        hp: 31,
                        atk: 31,
                        def: 28,
                        spa: 30,
                        spd: 25,
                        spe: 21,
                    },
                    ability: AbilityType::First,
                    gender: Gender::Female,
                    nature: Nature::Serious,
                    shiny: true,
                    characteristic: Characteristic::TakesPlentyOfSiestas,
                },
            ];
            assert_list_eq!(results, expected);
        }
        #[test]
        fn static_methodj_cutecharm_f() {
            let opts = SearchStatic4MethodjOpts {
                tid: 6416,
                sid: 6428,
                game: GameVersion::Diamond,
                encounter: Static4Species::Drifloon,
                lead: LeadAbilities::CutecharmF,
                filter: PkmFilter {
                    shiny: false,
                    nature: None,
                    gender: None,
                    min_ivs: ivs!(30 / 30 / 25 / 25 / 25 / 20),
                    max_ivs: Ivs::new_all31(),
                    ability: None,
                    stats: None,
                    ..Default::default()
                },
                min_advance: 20,
                max_advance: 21,
                min_delay: 800,
                max_delay: 850,
                year: 2025,
                force_second: None,
                roamer: RoamerSet {
                    entei: false,
                    raikou: false,
                    latios: false,
                    latias: false,
                },
            };
            let results = search_static4_methodj_seeds(&opts);
            let expected = [
                SearchStatic4MethodjState {
                    seed_time: DpptSeedTime4 {
                        seed: 2014315364,
                        datetime: RngDateTime {
                            year: 2025,
                            month: 1,
                            day: 3,
                            hour: 16,
                            minute: 59,
                            second: 58,
                        },
                        delay: 843,
                        coin_flips: coin_flips!("THTTHTHHHHHHTHTTTHHT"),
                    },

                    advance: 20,
                    pid: 162,
                    ivs: Ivs {
                        hp: 30,
                        atk: 30,
                        def: 26,
                        spa: 26,
                        spd: 28,
                        spe: 21,
                    },
                    ability: AbilityType::First,
                    gender: Gender::Male,
                    nature: Nature::Serious,
                    shiny: false,
                    characteristic: Characteristic::LovesToEat,
                },
                SearchStatic4MethodjState {
                    seed_time: DpptSeedTime4 {
                        seed: 4161799012,
                        datetime: RngDateTime {
                            year: 2025,
                            month: 5,
                            day: 27,
                            hour: 16,
                            minute: 55,
                            second: 58,
                        },
                        delay: 843,
                        coin_flips: coin_flips!("HHTTTTHTTHHHTTHHTTTH"),
                    },

                    advance: 20,
                    pid: 174,
                    ivs: Ivs {
                        hp: 30,
                        atk: 30,
                        def: 26,
                        spa: 26,
                        spd: 28,
                        spe: 21,
                    },
                    ability: AbilityType::First,
                    gender: Gender::Male,
                    nature: Nature::Quirky,
                    shiny: false,
                    characteristic: Characteristic::LovesToEat,
                },
                SearchStatic4MethodjState {
                    seed_time: DpptSeedTime4 {
                        seed: 2081424228,
                        datetime: RngDateTime {
                            year: 2025,
                            month: 1,
                            day: 7,
                            hour: 16,
                            minute: 59,
                            second: 58,
                        },
                        delay: 843,
                        coin_flips: coin_flips!("HTHTHTHHTHTTTTTHTTHH"),
                    },

                    advance: 20,
                    pid: 159,
                    ivs: Ivs {
                        hp: 30,
                        atk: 30,
                        def: 31,
                        spa: 26,
                        spd: 29,
                        spe: 21,
                    },
                    ability: AbilityType::Second,
                    gender: Gender::Male,
                    nature: Nature::Lax,
                    shiny: false,
                    characteristic: Characteristic::CapableOfTakingHits,
                },
                SearchStatic4MethodjState {
                    seed_time: DpptSeedTime4 {
                        seed: 4228907876,
                        datetime: RngDateTime {
                            year: 2025,
                            month: 5,
                            day: 27,
                            hour: 16,
                            minute: 59,
                            second: 58,
                        },
                        delay: 843,
                        coin_flips: coin_flips!("HTHHTHTTHHHTHHTHHTTT"),
                    },

                    advance: 20,
                    pid: 171,
                    ivs: Ivs {
                        hp: 30,
                        atk: 30,
                        def: 31,
                        spa: 26,
                        spd: 29,
                        spe: 21,
                    },
                    ability: AbilityType::Second,
                    gender: Gender::Male,
                    nature: Nature::Gentle,
                    shiny: false,
                    characteristic: Characteristic::CapableOfTakingHits,
                },
                SearchStatic4MethodjState {
                    seed_time: DpptSeedTime4 {
                        seed: 1611268971,
                        datetime: RngDateTime {
                            year: 2025,
                            month: 1,
                            day: 1,
                            hour: 10,
                            minute: 37,
                            second: 58,
                        },
                        delay: 850,
                        coin_flips: coin_flips!("HHHHHTHHTTHTTTTHTHHH"),
                    },

                    advance: 20,
                    pid: 152,
                    ivs: Ivs {
                        hp: 30,
                        atk: 31,
                        def: 29,
                        spa: 25,
                        spd: 30,
                        spe: 26,
                    },
                    ability: AbilityType::First,
                    gender: Gender::Male,
                    nature: Nature::Brave,
                    shiny: false,
                    characteristic: Characteristic::LikesToThrashAbout,
                },
                SearchStatic4MethodjState {
                    seed_time: DpptSeedTime4 {
                        seed: 1946289002,
                        datetime: RngDateTime {
                            year: 2025,
                            month: 1,
                            day: 1,
                            hour: 2,
                            minute: 57,
                            second: 58,
                        },
                        delay: 849,
                        coin_flips: coin_flips!("HHHHHTHHTTHTHHHTTHTH"),
                    },

                    advance: 20,
                    pid: 158,
                    ivs: Ivs {
                        hp: 31,
                        atk: 30,
                        def: 28,
                        spa: 28,
                        spd: 29,
                        spe: 26,
                    },
                    ability: AbilityType::First,
                    gender: Gender::Male,
                    nature: Nature::Impish,
                    shiny: false,
                    characteristic: Characteristic::TakesPlentyOfSiestas,
                },
                SearchStatic4MethodjState {
                    seed_time: DpptSeedTime4 {
                        seed: 1392771930,
                        datetime: RngDateTime {
                            year: 2025,
                            month: 1,
                            day: 1,
                            hour: 4,
                            minute: 24,
                            second: 58,
                        },
                        delay: 833,
                        coin_flips: coin_flips!("TTHHHHHTHTTTHHHHTTHT"),
                    },

                    advance: 20,
                    pid: 158,
                    ivs: Ivs {
                        hp: 31,
                        atk: 31,
                        def: 26,
                        spa: 30,
                        spd: 31,
                        spe: 21,
                    },
                    ability: AbilityType::First,
                    gender: Gender::Male,
                    nature: Nature::Impish,
                    shiny: false,
                    characteristic: Characteristic::SomewhatVain,
                },
                SearchStatic4MethodjState {
                    seed_time: DpptSeedTime4 {
                        seed: 3137602394,
                        datetime: RngDateTime {
                            year: 2025,
                            month: 3,
                            day: 24,
                            hour: 4,
                            minute: 57,
                            second: 58,
                        },
                        delay: 833,
                        coin_flips: coin_flips!("HTHHTTHHTHTTHHHHHHHH"),
                    },

                    advance: 20,
                    pid: 162,
                    ivs: Ivs {
                        hp: 31,
                        atk: 31,
                        def: 28,
                        spa: 30,
                        spd: 25,
                        spe: 21,
                    },
                    ability: AbilityType::First,
                    gender: Gender::Male,
                    nature: Nature::Serious,
                    shiny: false,
                    characteristic: Characteristic::TakesPlentyOfSiestas,
                },
                SearchStatic4MethodjState {
                    seed_time: DpptSeedTime4 {
                        seed: 990118746,
                        datetime: RngDateTime {
                            year: 2025,
                            month: 1,
                            day: 1,
                            hour: 4,
                            minute: 0,
                            second: 58,
                        },
                        delay: 833,
                        coin_flips: coin_flips!("HTHTTHTTHHHTTTHTTHHH"),
                    },

                    advance: 20,
                    pid: 150,
                    ivs: Ivs {
                        hp: 31,
                        atk: 31,
                        def: 28,
                        spa: 30,
                        spd: 25,
                        spe: 21,
                    },
                    ability: AbilityType::First,
                    gender: Gender::Male,
                    nature: Nature::Hardy,
                    shiny: false,
                    characteristic: Characteristic::TakesPlentyOfSiestas,
                },
            ];
            assert_list_eq!(results, expected);
        }
        #[test]
        fn static_methodj_synch() {
            let opts = SearchStatic4MethodjOpts {
                tid: 12345,
                sid: 54321,
                game: GameVersion::Diamond,
                encounter: Static4Species::Drifloon,
                lead: LeadAbilities::Synchronize(Nature::Adamant),
                filter: PkmFilter {
                    shiny: false,
                    nature: None,
                    gender: None,
                    min_ivs: ivs!(30 / 30 / 20 / 20 / 20 / 20),
                    max_ivs: Ivs::new_all31(),
                    ability: None,
                    stats: None,
                    ..Default::default()
                },
                min_advance: 0,
                max_advance: 0,
                min_delay: 780,
                max_delay: 800,
                year: 2000,
                force_second: None,
                roamer: RoamerSet {
                    entei: false,
                    raikou: false,
                    latios: false,
                    latias: false,
                },
            };
            let results = search_static4_methodj_seeds(&opts);
            let expected = [
                SearchStatic4MethodjState {
                    seed_time: DpptSeedTime4 {
                        seed: 1912603409,
                        datetime: RngDateTime {
                            year: 2000,
                            month: 1,
                            day: 1,
                            hour: 0,
                            minute: 55,
                            second: 58,
                        },
                        delay: 785,
                        coin_flips: coin_flips!("THTTTHHHTTHHHTTTTTTH"),
                    },

                    advance: 0,
                    pid: 2283518128,
                    ivs: Ivs {
                        hp: 30,
                        atk: 30,
                        def: 20,
                        spa: 23,
                        spd: 20,
                        spe: 21,
                    },
                    ability: AbilityType::First,
                    gender: Gender::Male,
                    nature: Nature::Adamant,
                    shiny: false,
                    characteristic: Characteristic::LovesToEat,
                },
                SearchStatic4MethodjState {
                    seed_time: DpptSeedTime4 {
                        seed: 805307151,
                        datetime: RngDateTime {
                            year: 2000,
                            month: 1,
                            day: 1,
                            hour: 0,
                            minute: 0,
                            second: 47,
                        },
                        delay: 783,
                        coin_flips: coin_flips!("TTHTHHHTTHTHHTTTTHTH"),
                    },

                    advance: 0,
                    pid: 2445127822,
                    ivs: Ivs {
                        hp: 30,
                        atk: 30,
                        def: 21,
                        spa: 27,
                        spd: 23,
                        spe: 25,
                    },
                    ability: AbilityType::First,
                    gender: Gender::Male,
                    nature: Nature::Sassy,
                    shiny: false,
                    characteristic: Characteristic::LovesToEat,
                },
                SearchStatic4MethodjState {
                    seed_time: DpptSeedTime4 {
                        seed: 151061274,
                        datetime: RngDateTime {
                            year: 2000,
                            month: 1,
                            day: 1,
                            hour: 1,
                            minute: 0,
                            second: 8,
                        },
                        delay: 794,
                        coin_flips: coin_flips!("THTTTHHTTTTTTTTTHHTH"),
                    },

                    advance: 0,
                    pid: 2265884228,
                    ivs: Ivs {
                        hp: 30,
                        atk: 30,
                        def: 22,
                        spa: 24,
                        spd: 21,
                        spe: 20,
                    },
                    ability: AbilityType::First,
                    gender: Gender::Female,
                    nature: Nature::Adamant,
                    shiny: false,
                    characteristic: Characteristic::LovesToEat,
                },
                SearchStatic4MethodjState {
                    seed_time: DpptSeedTime4 {
                        seed: 2685600528,
                        datetime: RngDateTime {
                            year: 2000,
                            month: 2,
                            day: 22,
                            hour: 19,
                            minute: 58,
                            second: 58,
                        },
                        delay: 784,
                        coin_flips: coin_flips!("HHTTHTTTHHTTTHTHHHHH"),
                    },

                    advance: 0,
                    pid: 2255504803,
                    ivs: Ivs {
                        hp: 30,
                        atk: 30,
                        def: 22,
                        spa: 29,
                        spd: 28,
                        spe: 31,
                    },
                    ability: AbilityType::Second,
                    gender: Gender::Male,
                    nature: Nature::Adamant,
                    shiny: false,
                    characteristic: Characteristic::AlertToSounds,
                },
                SearchStatic4MethodjState {
                    seed_time: DpptSeedTime4 {
                        seed: 1947009817,
                        datetime: RngDateTime {
                            year: 2000,
                            month: 1,
                            day: 1,
                            hour: 13,
                            minute: 57,
                            second: 58,
                        },
                        delay: 793,
                        coin_flips: coin_flips!("HHTTHTTTTHHTTTHHHHHT"),
                    },

                    advance: 0,
                    pid: 3287591853,
                    ivs: Ivs {
                        hp: 30,
                        atk: 31,
                        def: 28,
                        spa: 25,
                        spd: 28,
                        spe: 20,
                    },
                    ability: AbilityType::Second,
                    gender: Gender::Male,
                    nature: Nature::Adamant,
                    shiny: false,
                    characteristic: Characteristic::LikesToThrashAbout,
                },
                SearchStatic4MethodjState {
                    seed_time: DpptSeedTime4 {
                        seed: 688063261,
                        datetime: RngDateTime {
                            year: 2000,
                            month: 1,
                            day: 1,
                            hour: 3,
                            minute: 0,
                            second: 40,
                        },
                        delay: 797,
                        coin_flips: coin_flips!("TTTTTTHTHTHTHTHTTHTH"),
                    },

                    advance: 0,
                    pid: 2866307253,
                    ivs: Ivs {
                        hp: 30,
                        atk: 31,
                        def: 28,
                        spa: 30,
                        spd: 30,
                        spe: 27,
                    },
                    ability: AbilityType::Second,
                    gender: Gender::Male,
                    nature: Nature::Adamant,
                    shiny: false,
                    characteristic: Characteristic::LikesToThrashAbout,
                },
                SearchStatic4MethodjState {
                    seed_time: DpptSeedTime4 {
                        seed: 4061528863,
                        datetime: RngDateTime {
                            year: 2000,
                            month: 5,
                            day: 25,
                            hour: 22,
                            minute: 59,
                            second: 58,
                        },
                        delay: 799,
                        coin_flips: coin_flips!("HTTHTTHHHHHHHTTTTHHH"),
                    },

                    advance: 0,
                    pid: 2178294503,
                    ivs: Ivs {
                        hp: 31,
                        atk: 30,
                        def: 22,
                        spa: 24,
                        spd: 30,
                        spe: 22,
                    },
                    ability: AbilityType::Second,
                    gender: Gender::Male,
                    nature: Nature::Adamant,
                    shiny: false,
                    characteristic: Characteristic::TakesPlentyOfSiestas,
                },
                SearchStatic4MethodjState {
                    seed_time: DpptSeedTime4 {
                        seed: 2668954384,
                        datetime: RngDateTime {
                            year: 2000,
                            month: 2,
                            day: 21,
                            hour: 21,
                            minute: 59,
                            second: 58,
                        },
                        delay: 784,
                        coin_flips: coin_flips!("HTHTTTHTTTHHTHTHHTHT"),
                    },

                    advance: 0,
                    pid: 2540936821,
                    ivs: Ivs {
                        hp: 31,
                        atk: 31,
                        def: 21,
                        spa: 22,
                        spd: 23,
                        spe: 23,
                    },
                    ability: AbilityType::Second,
                    gender: Gender::Female,
                    nature: Nature::Gentle,
                    shiny: false,
                    characteristic: Characteristic::LikesToThrashAbout,
                },
                SearchStatic4MethodjState {
                    seed_time: DpptSeedTime4 {
                        seed: 3322086157,
                        datetime: RngDateTime {
                            year: 2000,
                            month: 3,
                            day: 27,
                            hour: 3,
                            minute: 59,
                            second: 58,
                        },
                        delay: 781,
                        coin_flips: coin_flips!("HTHHHTHHHTTHHTTHTHHH"),
                    },

                    advance: 0,
                    pid: 2929506568,
                    ivs: Ivs {
                        hp: 31,
                        atk: 31,
                        def: 25,
                        spa: 28,
                        spd: 26,
                        spe: 27,
                    },
                    ability: AbilityType::First,
                    gender: Gender::Female,
                    nature: Nature::Bashful,
                    shiny: false,
                    characteristic: Characteristic::TakesPlentyOfSiestas,
                },
                SearchStatic4MethodjState {
                    seed_time: DpptSeedTime4 {
                        seed: 2013397788,
                        datetime: RngDateTime {
                            year: 2000,
                            month: 1,
                            day: 3,
                            hour: 2,
                            minute: 59,
                            second: 58,
                        },
                        delay: 796,
                        coin_flips: coin_flips!("TTHTTTHTTHTTHTHTTHHT"),
                    },

                    advance: 0,
                    pid: 1201474528,
                    ivs: Ivs {
                        hp: 31,
                        atk: 31,
                        def: 28,
                        spa: 30,
                        spd: 23,
                        spe: 20,
                    },
                    ability: AbilityType::First,
                    gender: Gender::Male,
                    nature: Nature::Adamant,
                    shiny: false,
                    characteristic: Characteristic::TakesPlentyOfSiestas,
                },
            ];
            assert_list_eq!(results, expected);
        }
    }
    mod search_static4_methodk_seed {
        use super::*;
        use crate::{
            RngDateTime, assert_list_eq, elm_calls,
            gen4::{GameVersion, RoamerLocation, Static4Species},
            ivs,
        };

        #[test]
        fn static_methodk() {
            let opts = SearchStatic4MethodjOpts {
                tid: 12345,
                sid: 54321,
                game: GameVersion::SoulSilver,
                encounter: Static4Species::Snorlax,
                lead: LeadAbilities::None,
                filter: PkmFilter {
                    shiny: false,
                    nature: None,
                    gender: None,
                    min_ivs: ivs!(30 / 30 / 20 / 20 / 20 / 20),
                    max_ivs: Ivs::new_all31(),
                    ability: None,
                    stats: None,
                    ..Default::default()
                },
                min_advance: 20,
                max_advance: 21,
                min_delay: 800,
                max_delay: 811,
                year: 2025,
                force_second: None,
                roamer: RoamerSet {
                    entei: true,
                    raikou: true,
                    latios: false,
                    latias: false,
                },
            };
            let results = search_static4_methodk_seeds(&opts);
            let expected = [
                SearchStatic4MethodjState {
                    seed_time: HgssSeedTime4 {
                        seed: 2635531070,
                        datetime: RngDateTime {
                            year: 2025,
                            month: 2,
                            day: 20,
                            hour: 23,
                            minute: 58,
                            second: 59,
                        },
                        delay: 805,
                        roamer: vec![
                            RoamerLocation {
                                roamer: Species::Raikou,
                                location: 44,
                            },
                            RoamerLocation {
                                roamer: Species::Entei,
                                location: 45,
                            },
                        ],
                        elm: elm_calls!("KEPKEEKPKEPPKPPEPEPK"),
                    },

                    advance: 21,
                    pid: 630242142,
                    ivs: Ivs {
                        hp: 30,
                        atk: 30,
                        def: 20,
                        spa: 24,
                        spd: 31,
                        spe: 27,
                    },
                    ability: AbilityType::First,
                    gender: Gender::Male,
                    nature: Nature::Quiet,
                    shiny: false,
                    characteristic: Characteristic::SomewhatVain,
                },
                SearchStatic4MethodjState {
                    seed_time: HgssSeedTime4 {
                        seed: 2768372541,
                        datetime: RngDateTime {
                            year: 2025,
                            month: 2,
                            day: 24,
                            hour: 2,
                            minute: 58,
                            second: 59,
                        },
                        delay: 804,
                        roamer: vec![
                            RoamerLocation {
                                roamer: Species::Raikou,
                                location: 35,
                            },
                            RoamerLocation {
                                roamer: Species::Entei,
                                location: 45,
                            },
                        ],
                        elm: elm_calls!("PKEEKKPPEPPKKEEPEEEK"),
                    },

                    advance: 20,
                    pid: 4265370851,
                    ivs: Ivs {
                        hp: 30,
                        atk: 30,
                        def: 21,
                        spa: 26,
                        spd: 20,
                        spe: 27,
                    },
                    ability: AbilityType::Second,
                    gender: Gender::Male,
                    nature: Nature::Lonely,
                    shiny: false,
                    characteristic: Characteristic::LovesToEat,
                },
                SearchStatic4MethodjState {
                    seed_time: HgssSeedTime4 {
                        seed: 722207548,
                        datetime: RngDateTime {
                            year: 2025,
                            month: 1,
                            day: 1,
                            hour: 12,
                            minute: 0,
                            second: 42,
                        },
                        delay: 803,
                        roamer: vec![
                            RoamerLocation {
                                roamer: Species::Raikou,
                                location: 31,
                            },
                            RoamerLocation {
                                roamer: Species::Entei,
                                location: 34,
                            },
                        ],
                        elm: elm_calls!("EPEKPKKPEEEEPPEPPKPE"),
                    },

                    advance: 21,
                    pid: 687981377,
                    ivs: Ivs {
                        hp: 30,
                        atk: 30,
                        def: 22,
                        spa: 26,
                        spd: 27,
                        spe: 30,
                    },
                    ability: AbilityType::Second,
                    gender: Gender::Male,
                    nature: Nature::Brave,
                    shiny: false,
                    characteristic: Characteristic::LovesToEat,
                },
                SearchStatic4MethodjState {
                    seed_time: HgssSeedTime4 {
                        seed: 2434204478,
                        datetime: RngDateTime {
                            year: 2025,
                            month: 1,
                            day: 27,
                            hour: 23,
                            minute: 59,
                            second: 59,
                        },
                        delay: 805,
                        roamer: vec![
                            RoamerLocation {
                                roamer: Species::Raikou,
                                location: 44,
                            },
                            RoamerLocation {
                                roamer: Species::Entei,
                                location: 45,
                            },
                        ],
                        elm: elm_calls!("EPKPEEKEPEEPEEKEKPPP"),
                    },

                    advance: 21,
                    pid: 3650142046,
                    ivs: Ivs {
                        hp: 30,
                        atk: 30,
                        def: 29,
                        spa: 24,
                        spd: 20,
                        spe: 27,
                    },
                    ability: AbilityType::First,
                    gender: Gender::Male,
                    nature: Nature::Gentle,
                    shiny: false,
                    characteristic: Characteristic::LovesToEat,
                },
                SearchStatic4MethodjState {
                    seed_time: HgssSeedTime4 {
                        seed: 51381052,
                        datetime: RngDateTime {
                            year: 2025,
                            month: 1,
                            day: 1,
                            hour: 16,
                            minute: 0,
                            second: 2,
                        },
                        delay: 803,
                        roamer: vec![
                            RoamerLocation {
                                roamer: Species::Raikou,
                                location: 35,
                            },
                            RoamerLocation {
                                roamer: Species::Entei,
                                location: 38,
                            },
                        ],
                        elm: elm_calls!("KPKPPEEKPEEKPKEPPEPK"),
                    },

                    advance: 20,
                    pid: 3819057710,
                    ivs: Ivs {
                        hp: 30,
                        atk: 31,
                        def: 24,
                        spa: 29,
                        spd: 21,
                        spe: 26,
                    },
                    ability: AbilityType::First,
                    gender: Gender::Male,
                    nature: Nature::Timid,
                    shiny: false,
                    characteristic: Characteristic::LikesToThrashAbout,
                },
                SearchStatic4MethodjState {
                    seed_time: HgssSeedTime4 {
                        seed: 3540321084,
                        datetime: RngDateTime {
                            year: 2025,
                            month: 3,
                            day: 31,
                            hour: 5,
                            minute: 59,
                            second: 59,
                        },
                        delay: 803,
                        roamer: vec![
                            RoamerLocation {
                                roamer: Species::Raikou,
                                location: 36,
                            },
                            RoamerLocation {
                                roamer: Species::Entei,
                                location: 35,
                            },
                        ],
                        elm: elm_calls!("KEKPPPPEEPEKPPKPKPEE"),
                    },

                    advance: 20,
                    pid: 3989040986,
                    ivs: Ivs {
                        hp: 31,
                        atk: 30,
                        def: 20,
                        spa: 30,
                        spd: 29,
                        spe: 26,
                    },
                    ability: AbilityType::First,
                    gender: Gender::Male,
                    nature: Nature::Hasty,
                    shiny: false,
                    characteristic: Characteristic::TakesPlentyOfSiestas,
                },
                SearchStatic4MethodjState {
                    seed_time: HgssSeedTime4 {
                        seed: 2266432322,
                        datetime: RngDateTime {
                            year: 2025,
                            month: 1,
                            day: 17,
                            hour: 23,
                            minute: 59,
                            second: 59,
                        },
                        delay: 809,
                        roamer: vec![
                            RoamerLocation {
                                roamer: Species::Raikou,
                                location: 35,
                            },
                            RoamerLocation {
                                roamer: Species::Entei,
                                location: 37,
                            },
                        ],
                        elm: elm_calls!("EKPPPKEEPKKKEPEPEKEK"),
                    },

                    advance: 20,
                    pid: 3079292222,
                    ivs: Ivs {
                        hp: 31,
                        atk: 30,
                        def: 25,
                        spa: 25,
                        spd: 22,
                        spe: 29,
                    },
                    ability: AbilityType::First,
                    gender: Gender::Male,
                    nature: Nature::Sassy,
                    shiny: false,
                    characteristic: Characteristic::TakesPlentyOfSiestas,
                },
                SearchStatic4MethodjState {
                    seed_time: HgssSeedTime4 {
                        seed: 1997341505,
                        datetime: RngDateTime {
                            year: 2025,
                            month: 1,
                            day: 1,
                            hour: 13,
                            minute: 59,
                            second: 59,
                        },
                        delay: 808,
                        roamer: vec![
                            RoamerLocation {
                                roamer: Species::Raikou,
                                location: 45,
                            },
                            RoamerLocation {
                                roamer: Species::Entei,
                                location: 42,
                            },
                        ],
                        elm: elm_calls!("EPKEKEPPKEEEPPKKPKEK"),
                    },

                    advance: 21,
                    pid: 1458301298,
                    ivs: Ivs {
                        hp: 31,
                        atk: 30,
                        def: 27,
                        spa: 25,
                        spd: 29,
                        spe: 24,
                    },
                    ability: AbilityType::First,
                    gender: Gender::Male,
                    nature: Nature::Careful,
                    shiny: false,
                    characteristic: Characteristic::TakesPlentyOfSiestas,
                },
                SearchStatic4MethodjState {
                    seed_time: HgssSeedTime4 {
                        seed: 4111729472,
                        datetime: RngDateTime {
                            year: 2025,
                            month: 5,
                            day: 26,
                            hour: 20,
                            minute: 56,
                            second: 59,
                        },
                        delay: 807,
                        roamer: vec![
                            RoamerLocation {
                                roamer: Species::Raikou,
                                location: 32,
                            },
                            RoamerLocation {
                                roamer: Species::Entei,
                                location: 37,
                            },
                        ],
                        elm: elm_calls!("EPPEKEKEEEEKKKKKKKPP"),
                    },

                    advance: 21,
                    pid: 739429178,
                    ivs: Ivs {
                        hp: 31,
                        atk: 30,
                        def: 29,
                        spa: 20,
                        spd: 20,
                        spe: 29,
                    },
                    ability: AbilityType::First,
                    gender: Gender::Male,
                    nature: Nature::Adamant,
                    shiny: false,
                    characteristic: Characteristic::TakesPlentyOfSiestas,
                },
                SearchStatic4MethodjState {
                    seed_time: HgssSeedTime4 {
                        seed: 806748993,
                        datetime: RngDateTime {
                            year: 2025,
                            month: 1,
                            day: 1,
                            hour: 22,
                            minute: 0,
                            second: 47,
                        },
                        delay: 808,
                        roamer: vec![
                            RoamerLocation {
                                roamer: Species::Raikou,
                                location: 32,
                            },
                            RoamerLocation {
                                roamer: Species::Entei,
                                location: 43,
                            },
                        ],
                        elm: elm_calls!("KKKEPEEEPKKKKPKPPPPE"),
                    },

                    advance: 20,
                    pid: 1161062213,
                    ivs: Ivs {
                        hp: 31,
                        atk: 30,
                        def: 31,
                        spa: 31,
                        spd: 31,
                        spe: 22,
                    },
                    ability: AbilityType::Second,
                    gender: Gender::Male,
                    nature: Nature::Jolly,
                    shiny: false,
                    characteristic: Characteristic::SomewhatVain,
                },
                SearchStatic4MethodjState {
                    seed_time: HgssSeedTime4 {
                        seed: 805634874,
                        datetime: RngDateTime {
                            year: 2025,
                            month: 1,
                            day: 1,
                            hour: 5,
                            minute: 0,
                            second: 47,
                        },
                        delay: 801,
                        roamer: vec![
                            RoamerLocation {
                                roamer: Species::Raikou,
                                location: 39,
                            },
                            RoamerLocation {
                                roamer: Species::Entei,
                                location: 30,
                            },
                        ],
                        elm: elm_calls!("PEPKEPKPPPPPEPPEEKEP"),
                    },

                    advance: 21,
                    pid: 3692708595,
                    ivs: Ivs {
                        hp: 31,
                        atk: 31,
                        def: 26,
                        spa: 28,
                        spd: 28,
                        spe: 22,
                    },
                    ability: AbilityType::Second,
                    gender: Gender::Male,
                    nature: Nature::Calm,
                    shiny: false,
                    characteristic: Characteristic::TakesPlentyOfSiestas,
                },
            ];
            assert_list_eq!(results, expected);
        }
        #[test]
        fn static_methodk_synch() {
            let opts = SearchStatic4MethodjOpts {
                tid: 12345,
                sid: 54321,
                game: GameVersion::SoulSilver,
                encounter: Static4Species::Snorlax,
                lead: LeadAbilities::Synchronize(Nature::Adamant),
                filter: PkmFilter {
                    shiny: false,
                    nature: None,
                    gender: None,
                    min_ivs: ivs!(30 / 30 / 30 / 20 / 20 / 20),
                    max_ivs: Ivs::new_all31(),
                    ability: None,
                    stats: None,
                    ..Default::default()
                },
                min_advance: 0,
                max_advance: 1,
                min_delay: 1000,
                max_delay: 1100,
                year: 2000,
                force_second: None,
                roamer: RoamerSet {
                    entei: false,
                    raikou: false,
                    latios: false,
                    latias: false,
                },
            };
            let results = search_static4_methodk_seeds(&opts);
            let expected = [
                SearchStatic4MethodjState {
                    seed_time: HgssSeedTime4 {
                        seed: 755565635,
                        datetime: RngDateTime {
                            year: 2000,
                            month: 1,
                            day: 1,
                            hour: 9,
                            minute: 0,
                            second: 44,
                        },
                        delay: 1091,
                        roamer: vec![],
                        elm: elm_calls!("EPKPPEEEKPPEPPEEPPPP"),
                    },

                    advance: 0,
                    pid: 2591517390,
                    ivs: Ivs {
                        hp: 30,
                        atk: 31,
                        def: 30,
                        spa: 23,
                        spd: 28,
                        spe: 25,
                    },
                    ability: AbilityType::First,
                    gender: Gender::Male,
                    nature: Nature::Modest,
                    shiny: false,
                    characteristic: Characteristic::LikesToThrashAbout,
                },
                SearchStatic4MethodjState {
                    seed_time: HgssSeedTime4 {
                        seed: 2165703722,
                        datetime: RngDateTime {
                            year: 2000,
                            month: 1,
                            day: 11,
                            hour: 22,
                            minute: 59,
                            second: 59,
                        },
                        delay: 1066,
                        roamer: vec![],
                        elm: elm_calls!("EPKEPKKPKEKKKKKEKEKP"),
                    },

                    advance: 0,
                    pid: 1129196203,
                    ivs: Ivs {
                        hp: 30,
                        atk: 31,
                        def: 30,
                        spa: 24,
                        spd: 20,
                        spe: 31,
                    },
                    ability: AbilityType::Second,
                    gender: Gender::Male,
                    nature: Nature::Adamant,
                    shiny: false,
                    characteristic: Characteristic::LikesToThrashAbout,
                },
                SearchStatic4MethodjState {
                    seed_time: HgssSeedTime4 {
                        seed: 3642164275,
                        datetime: RngDateTime {
                            year: 2000,
                            month: 4,
                            day: 25,
                            hour: 23,
                            minute: 58,
                            second: 59,
                        },
                        delay: 1075,
                        roamer: vec![],
                        elm: elm_calls!("KEEKEPPEPEKPPEEPPKEK"),
                    },

                    advance: 0,
                    pid: 945751353,
                    ivs: Ivs {
                        hp: 30,
                        atk: 31,
                        def: 31,
                        spa: 27,
                        spd: 29,
                        spe: 25,
                    },
                    ability: AbilityType::Second,
                    gender: Gender::Male,
                    nature: Nature::Adamant,
                    shiny: false,
                    characteristic: Characteristic::LikesToThrashAbout,
                },
                SearchStatic4MethodjState {
                    seed_time: HgssSeedTime4 {
                        seed: 85132309,
                        datetime: RngDateTime {
                            year: 2000,
                            month: 1,
                            day: 1,
                            hour: 19,
                            minute: 0,
                            second: 4,
                        },
                        delay: 1045,
                        roamer: vec![],
                        elm: elm_calls!("KKEPEKPKKPEKKKEKPEPP"),
                    },

                    advance: 1,
                    pid: 1669546549,
                    ivs: Ivs {
                        hp: 31,
                        atk: 31,
                        def: 30,
                        spa: 22,
                        spd: 28,
                        spe: 25,
                    },
                    ability: AbilityType::Second,
                    gender: Gender::Male,
                    nature: Nature::Quirky,
                    shiny: false,
                    characteristic: Characteristic::LikesToThrashAbout,
                },
                SearchStatic4MethodjState {
                    seed_time: HgssSeedTime4 {
                        seed: 3456697394,
                        datetime: RngDateTime {
                            year: 2000,
                            month: 3,
                            day: 30,
                            hour: 9,
                            minute: 57,
                            second: 59,
                        },
                        delay: 1074,
                        roamer: vec![],
                        elm: elm_calls!("KKEKKEEKKPPPKPPEPEPK"),
                    },

                    advance: 1,
                    pid: 2143691624,
                    ivs: Ivs {
                        hp: 31,
                        atk: 31,
                        def: 30,
                        spa: 24,
                        spd: 23,
                        spe: 27,
                    },
                    ability: AbilityType::First,
                    gender: Gender::Male,
                    nature: Nature::Quirky,
                    shiny: false,
                    characteristic: Characteristic::TakesPlentyOfSiestas,
                },
                SearchStatic4MethodjState {
                    seed_time: HgssSeedTime4 {
                        seed: 2350187582,
                        datetime: RngDateTime {
                            year: 2000,
                            month: 1,
                            day: 22,
                            hour: 21,
                            minute: 59,
                            second: 59,
                        },
                        delay: 1086,
                        roamer: vec![],
                        elm: elm_calls!("PKPEPEEEKPPPKPEKKPKE"),
                    },

                    advance: 1,
                    pid: 2211836703,
                    ivs: Ivs {
                        hp: 31,
                        atk: 31,
                        def: 30,
                        spa: 25,
                        spd: 29,
                        spe: 28,
                    },
                    ability: AbilityType::Second,
                    gender: Gender::Male,
                    nature: Nature::Adamant,
                    shiny: false,
                    characteristic: Characteristic::TakesPlentyOfSiestas,
                },
                SearchStatic4MethodjState {
                    seed_time: HgssSeedTime4 {
                        seed: 2718893074,
                        datetime: RngDateTime {
                            year: 2000,
                            month: 2,
                            day: 22,
                            hour: 15,
                            minute: 59,
                            second: 59,
                        },
                        delay: 1042,
                        roamer: vec![],
                        elm: elm_calls!("KKKEKPPKPKEKEKEKKEKP"),
                    },

                    advance: 0,
                    pid: 1887661228,
                    ivs: Ivs {
                        hp: 31,
                        atk: 31,
                        def: 31,
                        spa: 26,
                        spd: 28,
                        spe: 29,
                    },
                    ability: AbilityType::First,
                    gender: Gender::Male,
                    nature: Nature::Adamant,
                    shiny: false,
                    characteristic: Characteristic::TakesPlentyOfSiestas,
                },
            ];
            assert_list_eq!(results, expected);
        }
        #[test]
        fn static_methodk_cutecharm_f() {
            let opts = SearchStatic4MethodjOpts {
                tid: 12345,
                sid: 54321,
                game: GameVersion::SoulSilver,
                encounter: Static4Species::Snorlax,
                lead: LeadAbilities::CutecharmF,
                filter: PkmFilter {
                    shiny: false,
                    nature: None,
                    gender: None,
                    min_ivs: ivs!(30 / 30 / 20 / 20 / 20 / 20),
                    max_ivs: Ivs::new_all31(),
                    ability: None,
                    stats: None,
                    ..Default::default()
                },
                min_advance: 20,
                max_advance: 21,
                min_delay: 800,
                max_delay: 810,
                year: 2025,
                force_second: None,
                roamer: RoamerSet {
                    entei: false,
                    raikou: false,
                    latios: false,
                    latias: false,
                },
            };
            let results = search_static4_methodk_seeds(&opts);
            let expected = [
                SearchStatic4MethodjState {
                    seed_time: HgssSeedTime4 {
                        seed: 855638848,
                        datetime: RngDateTime {
                            year: 2025,
                            month: 1,
                            day: 1,
                            hour: 0,
                            minute: 0,
                            second: 50,
                        },
                        delay: 807,
                        roamer: vec![],
                        elm: elm_calls!("KPPEKEPKKPKPKPEEKPEP"),
                    },

                    advance: 20,
                    pid: 64,
                    ivs: Ivs {
                        hp: 31,
                        atk: 30,
                        def: 21,
                        spa: 22,
                        spd: 28,
                        spe: 22,
                    },
                    ability: AbilityType::First,
                    gender: Gender::Male,
                    nature: Nature::Naive,
                    shiny: false,
                    characteristic: Characteristic::TakesPlentyOfSiestas,
                },
                SearchStatic4MethodjState {
                    seed_time: HgssSeedTime4 {
                        seed: 452985664,
                        datetime: RngDateTime {
                            year: 2025,
                            month: 1,
                            day: 1,
                            hour: 0,
                            minute: 0,
                            second: 26,
                        },
                        delay: 807,
                        roamer: vec![],
                        elm: elm_calls!("PEEPKEEKPEEKKKEEPEPE"),
                    },

                    advance: 20,
                    pid: 61,
                    ivs: Ivs {
                        hp: 31,
                        atk: 30,
                        def: 23,
                        spa: 22,
                        spd: 22,
                        spe: 22,
                    },
                    ability: AbilityType::Second,
                    gender: Gender::Male,
                    nature: Nature::Hasty,
                    shiny: false,
                    characteristic: Characteristic::TakesPlentyOfSiestas,
                },
                SearchStatic4MethodjState {
                    seed_time: HgssSeedTime4 {
                        seed: 922747712,
                        datetime: RngDateTime {
                            year: 2025,
                            month: 1,
                            day: 1,
                            hour: 0,
                            minute: 0,
                            second: 54,
                        },
                        delay: 807,
                        roamer: vec![],
                        elm: elm_calls!("EEEPKEKEPPKEEPEKEKKE"),
                    },

                    advance: 20,
                    pid: 71,
                    ivs: Ivs {
                        hp: 31,
                        atk: 30,
                        def: 26,
                        spa: 22,
                        spd: 29,
                        spe: 22,
                    },
                    ability: AbilityType::Second,
                    gender: Gender::Male,
                    nature: Nature::Gentle,
                    shiny: false,
                    characteristic: Characteristic::TakesPlentyOfSiestas,
                },
                SearchStatic4MethodjState {
                    seed_time: HgssSeedTime4 {
                        seed: 520094528,
                        datetime: RngDateTime {
                            year: 2025,
                            month: 1,
                            day: 1,
                            hour: 0,
                            minute: 0,
                            second: 30,
                        },
                        delay: 807,
                        roamer: vec![],
                        elm: elm_calls!("PKPKKPPKEEEKPPKKPPEP"),
                    },

                    advance: 20,
                    pid: 54,
                    ivs: Ivs {
                        hp: 31,
                        atk: 30,
                        def: 28,
                        spa: 22,
                        spd: 23,
                        spe: 22,
                    },
                    ability: AbilityType::First,
                    gender: Gender::Male,
                    nature: Nature::Naughty,
                    shiny: false,
                    characteristic: Characteristic::TakesPlentyOfSiestas,
                },
                SearchStatic4MethodjState {
                    seed_time: HgssSeedTime4 {
                        seed: 989856576,
                        datetime: RngDateTime {
                            year: 2025,
                            month: 1,
                            day: 1,
                            hour: 0,
                            minute: 0,
                            second: 58,
                        },
                        delay: 807,
                        roamer: vec![],
                        elm: elm_calls!("EPKKKPEEEPKEKEKKEPPP"),
                    },

                    advance: 20,
                    pid: 53,
                    ivs: Ivs {
                        hp: 31,
                        atk: 30,
                        def: 31,
                        spa: 22,
                        spd: 30,
                        spe: 22,
                    },
                    ability: AbilityType::Second,
                    gender: Gender::Male,
                    nature: Nature::Adamant,
                    shiny: false,
                    characteristic: Characteristic::TakesPlentyOfSiestas,
                },
            ];
            assert_list_eq!(results, expected);
        }
        #[test]
        fn static_methodk_cutecharm_m() {
            let opts = SearchStatic4MethodjOpts {
                tid: 12345,
                sid: 54321,
                game: GameVersion::SoulSilver,
                encounter: Static4Species::Snorlax,
                lead: LeadAbilities::CutecharmM,
                filter: PkmFilter {
                    shiny: false,
                    nature: None,
                    gender: None,
                    min_ivs: ivs!(30 / 30 / 20 / 20 / 20 / 20),
                    max_ivs: Ivs::new_all31(),
                    ability: None,
                    stats: None,
                    ..Default::default()
                },
                min_advance: 20,
                max_advance: 21,
                min_delay: 800,
                max_delay: 810,
                year: 2025,
                force_second: None,
                roamer: RoamerSet {
                    entei: false,
                    raikou: false,
                    latios: false,
                    latias: false,
                },
            };
            let results = search_static4_methodk_seeds(&opts);
            let expected = [
                SearchStatic4MethodjState {
                    seed_time: HgssSeedTime4 {
                        seed: 855638848,
                        datetime: RngDateTime {
                            year: 2025,
                            month: 1,
                            day: 1,
                            hour: 0,
                            minute: 0,
                            second: 50,
                        },
                        delay: 807,
                        roamer: vec![],
                        elm: elm_calls!("KPPEKEPKKPKPKPEEKPEP"),
                    },

                    advance: 20,
                    pid: 14,
                    ivs: Ivs {
                        hp: 31,
                        atk: 30,
                        def: 21,
                        spa: 22,
                        spd: 28,
                        spe: 22,
                    },
                    ability: AbilityType::First,
                    gender: Gender::Female,
                    nature: Nature::Naive,
                    shiny: false,
                    characteristic: Characteristic::TakesPlentyOfSiestas,
                },
                SearchStatic4MethodjState {
                    seed_time: HgssSeedTime4 {
                        seed: 452985664,
                        datetime: RngDateTime {
                            year: 2025,
                            month: 1,
                            day: 1,
                            hour: 0,
                            minute: 0,
                            second: 26,
                        },
                        delay: 807,
                        roamer: vec![],
                        elm: elm_calls!("PEEPKEEKPEEKKKEEPEPE"),
                    },

                    advance: 20,
                    pid: 11,
                    ivs: Ivs {
                        hp: 31,
                        atk: 30,
                        def: 23,
                        spa: 22,
                        spd: 22,
                        spe: 22,
                    },
                    ability: AbilityType::Second,
                    gender: Gender::Female,
                    nature: Nature::Hasty,
                    shiny: false,
                    characteristic: Characteristic::TakesPlentyOfSiestas,
                },
                SearchStatic4MethodjState {
                    seed_time: HgssSeedTime4 {
                        seed: 922747712,
                        datetime: RngDateTime {
                            year: 2025,
                            month: 1,
                            day: 1,
                            hour: 0,
                            minute: 0,
                            second: 54,
                        },
                        delay: 807,
                        roamer: vec![],
                        elm: elm_calls!("EEEPKEKEPPKEEPEKEKKE"),
                    },

                    advance: 20,
                    pid: 21,
                    ivs: Ivs {
                        hp: 31,
                        atk: 30,
                        def: 26,
                        spa: 22,
                        spd: 29,
                        spe: 22,
                    },
                    ability: AbilityType::Second,
                    gender: Gender::Female,
                    nature: Nature::Gentle,
                    shiny: false,
                    characteristic: Characteristic::TakesPlentyOfSiestas,
                },
                SearchStatic4MethodjState {
                    seed_time: HgssSeedTime4 {
                        seed: 520094528,
                        datetime: RngDateTime {
                            year: 2025,
                            month: 1,
                            day: 1,
                            hour: 0,
                            minute: 0,
                            second: 30,
                        },
                        delay: 807,
                        roamer: vec![],
                        elm: elm_calls!("PKPKKPPKEEEKPPKKPPEP"),
                    },

                    advance: 20,
                    pid: 4,
                    ivs: Ivs {
                        hp: 31,
                        atk: 30,
                        def: 28,
                        spa: 22,
                        spd: 23,
                        spe: 22,
                    },
                    ability: AbilityType::First,
                    gender: Gender::Female,
                    nature: Nature::Naughty,
                    shiny: false,
                    characteristic: Characteristic::TakesPlentyOfSiestas,
                },
                SearchStatic4MethodjState {
                    seed_time: HgssSeedTime4 {
                        seed: 989856576,
                        datetime: RngDateTime {
                            year: 2025,
                            month: 1,
                            day: 1,
                            hour: 0,
                            minute: 0,
                            second: 58,
                        },
                        delay: 807,
                        roamer: vec![],
                        elm: elm_calls!("EPKKKPEEEPKEKEKKEPPP"),
                    },

                    advance: 20,
                    pid: 3,
                    ivs: Ivs {
                        hp: 31,
                        atk: 30,
                        def: 31,
                        spa: 22,
                        spd: 30,
                        spe: 22,
                    },
                    ability: AbilityType::Second,
                    gender: Gender::Female,
                    nature: Nature::Adamant,
                    shiny: false,
                    characteristic: Characteristic::TakesPlentyOfSiestas,
                },
            ];
            assert_list_eq!(results, expected);
        }
    }
}
