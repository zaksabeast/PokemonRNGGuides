use crate::EncounterSlot;
use crate::gen4::LeadAbilities;
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
}

#[derive(Debug, Clone, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct SearchStatic4Method1State {
    pub seed: u32,
    pub advance: usize,
    pub delay: u32,
    pub pid: u32,
    pub ivs: Ivs,
    pub ability: AbilityType,
    pub gender: Gender,
    pub nature: Nature,
    pub shiny: bool,
    pub characteristic: Characteristic,
}

impl PkmState for SearchStatic4Method1State {
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

fn get_state_from_seed(
    opts: &SearchStatic4Method1Opts,
    ivs: Ivs,
    seed: u32,
) -> SearchStatic4Method1State {
    let mut rng = Pokerng::new(seed).rev();

    let pidh = (rng.rand::<u16>() as u32) << 16;
    let pidl = rng.rand::<u16>() as u32;

    let pid = pidh | pidl;
    let nature = Nature::from((pid % 25) as u8);
    let gender = opts.species.gender_from_pid(pid);
    let ability = AbilityType::from_gen3_pid(pid);
    let shiny = gen3_shiny(pid, opts.tid, opts.sid);

    let characteristic = Characteristic::new(pid, &ivs);

    SearchStatic4Method1State {
        seed: rng.rand::<u32>(),
        pid,
        ability,
        gender,
        nature,
        ivs,
        shiny,
        characteristic,
        // We'll add these later
        advance: 0,
        delay: 0,
    }
}

pub fn search_single_static4_method1(
    opts: &SearchStatic4Method1Opts,
    ivs: Ivs,
) -> Vec<SearchStatic4Method1State> {
    let seeds = recover_poke_rng_iv(&ivs, false);
    seeds
        .into_iter()
        .filter_map(|seed| {
            let state: SearchStatic4Method1State = get_state_from_seed(opts, ivs, seed);

            // Don't check IVs since we specifically found matching IVs
            if !opts.filter.pass_filter_no_ivs(&state) {
                return None;
            }

            Some(state)
        })
        .collect()
}

fn search_static4_method1(opts: &SearchStatic4Method1Opts) -> Vec<SearchStatic4Method1State> {
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
    let min_delay = opts.min_delay;
    let max_delay = opts.max_delay;

    let mut results = vec![];

    for state in search_static4_method1(opts).iter() {
        let mut rng = Pokerng::new(state.seed).rev();
        rng.advance(min_advance.saturating_sub(1));
        let mut seed = match min_advance {
            0 => state.seed,
            _ => rng.rand::<u32>(),
        };
        for advance in min_advance..=max_advance {
            let hour = (seed >> 16) & 0xff;
            let delay = seed & 0xffff;

            // Check if seed matches a valid gen 4 format
            if hour < 24 && delay >= min_delay && delay <= max_delay {
                let mut found_state = state.clone();
                found_state.seed = seed;
                found_state.advance = advance;
                found_state.delay = delay;
                results.push(found_state);
            }

            seed = rng.rand::<u32>();
        }
    }

    results
}

pub struct SearchStatic4MethodjOpts {
    pub tid: u16,
    pub sid: u16,
    pub game: GameVersion,
    pub encounter: StaticEncounterId,
    pub lead: LeadAbilities,
    pub filter: PkmFilter,
    pub min_advance: usize,
    pub max_advance: usize,
    pub min_delay: u32,
    pub max_delay: u32,
}

pub struct SearchStatic4MethodjState {
    pub seed: u32,
    pub advance: usize,
    pub delay: u32,
    pub pid: u32,
    pub ivs: Ivs,
    pub ability: AbilityType,
    pub gender: Gender,
    pub nature: Nature,
    pub shiny: bool,
    pub characteristic: Characteristic,
    pub encounter_slot: EncounterSlot,
}

impl PkmState for SearchStatic4MethodjState {
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

fn search_static4_methodj(opts: &SearchStatic4MethodjOpts) -> Vec<SearchStatic4Method1State> {
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
) -> SearchStatic4MethodjState {
    let mut rng = Pokerng::new(seed).rev();
    let lead = opts.lead;

    if let LeadAbilities::Synchronize(nature) = lead {
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
            let gender = opts.encounter.gender_from_pid(pid);
            let ability = AbilityType::from_gen3_pid(pid);
            let shiny = gen3_shiny(pid, opts.tid, opts.sid);

            let characteristic = Characteristic::new(pid, &ivs);

            return SearchStatic4MethodjState {
                seed: rng.rand::<u32>(),
                pid,
                ability,
                gender,
                nature,
                ivs,
                shiny,
                characteristic,
                // We'll add these later
                advance: 0,
                delay: 0,
                encounter_slot,
            };
        }
    }

    if lead == LeadAbilities::CutecharmF || lead == LeadAbilities::CutecharmM {
        let gender_threshold = opts.encounter.species().gender_ratio();
        let buffer = match opts.lead {
            LeadAbilities::CutecharmF => 25 * ((gender_threshold as u32 / 25) + 1),
            LeadAbilities::CutecharmM => 0,
            LeadAbilities::Synchronize(_) => 0,
            _ => 0,
        };
        let target_gender = match opts.lead {
            LeadAbilities::CutecharmF => Gender::Male,
            LeadAbilities::CutecharmM => Gender::Female,
            _ => Gender::Genderless,
        };

        let nature = (rng.rand::<u16>() / 0xa3e) as u8;
        if rng.rand::<u16>() % 3 != 0 {
            let pid = buffer + nature as u32;
            let gender = opts.encounter.species().gender_from_pid(pid);
            if gender == target_gender {
                let nature = Nature::from_pid(pid);
            }
            return SearchStatic4MethodjState {
                seed: rng.rand::<u32>(),
                pid,
                ability,
                gender,
                nature,
                ivs,
                shiny,
                characteristic,
                // We'll add these later
                advance: 0,
                delay: 0,
                encounter_slot,
            };
        }

        let pidh = (rng.rand::<u16>() as u32) << 16;
        let pidl = rng.rand::<u16>() as u32;
        let pid = pidh | pidl;
        let nature = Nature::from((pid % 25) as u8);
        let gender = opts.encounter.gender_from_pid(pid);
        let ability = AbilityType::from_gen3_pid(pid);
        let shiny = gen3_shiny(pid, opts.tid, opts.sid);

        let characteristic = Characteristic::new(pid, &ivs);

        SearchStatic4MethodjState {
            seed: rng.rand::<u32>(),
            pid,
            ability,
            gender,
            nature,
            ivs,
            shiny,
            characteristic,
            // We'll add these later
            advance: 0,
            delay: 0,
            encounter_slot,
        }
    }
}

pub fn search_static4_methodj_seed(
    opts: &SearchStatic4MethodjOpts,
    ivs: Ivs,
) -> Vec<SearchStatic4MethodjState> {
    let seeds = recover_poke_rng_iv(&ivs, false);
    seeds
        .into_iter()
        .filter_map(|seed| {
            let state: SearchStatic4MethodjState = get_state_from_jseed(opts, ivs, seed);

            // Don't check IVs since we specifically found matching IVs
            if !opts.filter.pass_filter_no_ivs(&state) {
                return None;
            }
            if opts.encounter.passes_filter(&state.encounter_slot) {
                return None;
            }

            Some(state)
        })
        .collect()
}

#[cfg(test)]
mod tests {
    use super::*;

    mod search_static4_method1 {
        use super::*;
        use crate::{assert_list_eq, ivs};

        #[test]
        fn min_advance_0() {
            let opts = SearchStatic4Method1Opts {
                tid: 12345,
                sid: 54321,
                min_delay: 600,
                max_delay: 605,
                min_advance: 0,
                max_advance: 2,
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
                    seed: 0x5C03025B,
                    advance: 2,
                    delay: 603,
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
                    seed: 0xDC03025B,
                    advance: 2,
                    delay: 603,
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
                    seed: 0x0403025B,
                    advance: 2,
                    delay: 603,
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
                    seed: 0x8403025B,
                    advance: 2,
                    delay: 603,
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
                    seed: 0x0003025B,
                    advance: 2,
                    delay: 603,
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
                    seed: 0x8003025B,
                    advance: 2,
                    delay: 603,
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
                    seed: 0xA803025B,
                    advance: 2,
                    delay: 603,
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
                    seed: 0x2803025B,
                    advance: 2,
                    delay: 603,
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
                    seed: 0xA403025B,
                    advance: 2,
                    delay: 603,
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
                    seed: 0x2403025B,
                    advance: 2,
                    delay: 603,
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
                    seed: 0x52060259,
                    advance: 0,
                    delay: 601,
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
                    seed: 0xD2060259,
                    advance: 0,
                    delay: 601,
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
                    seed: 0x3A060259,
                    advance: 0,
                    delay: 601,
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
                    seed: 0xBA060259,
                    advance: 0,
                    delay: 601,
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
                    seed: 0x96060259,
                    advance: 0,
                    delay: 601,
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
                    seed: 0x16060259,
                    advance: 0,
                    delay: 601,
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
                    seed: 0x7E060259,
                    advance: 0,
                    delay: 601,
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
                    seed: 0xFE060259,
                    advance: 0,
                    delay: 601,
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
                min_delay: 600,
                max_delay: 605,
                min_advance: 2,
                max_advance: 2,
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
                    seed: 0x5C03025B,
                    advance: 2,
                    delay: 603,
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
                    seed: 0xDC03025B,
                    advance: 2,
                    delay: 603,
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
                    seed: 0x0403025B,
                    advance: 2,
                    delay: 603,
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
                    seed: 0x8403025B,
                    advance: 2,
                    delay: 603,
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
                    seed: 0x0003025B,
                    advance: 2,
                    delay: 603,
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
                    seed: 0x8003025B,
                    advance: 2,
                    delay: 603,
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
                    seed: 0xA803025B,
                    advance: 2,
                    delay: 603,
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
                    seed: 0x2803025B,
                    advance: 2,
                    delay: 603,
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
                    seed: 0xA403025B,
                    advance: 2,
                    delay: 603,
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
                    seed: 0x2403025B,
                    advance: 2,
                    delay: 603,
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
}
