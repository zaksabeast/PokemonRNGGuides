use super::GameVersion;
use super::LeadAbilities;
use super::Static4Species;
use super::dpt_method_jk;
use super::hgss_method_jk;
use crate::Characteristic;
use crate::Ivs;
use crate::rng::Rng;
use crate::rng::StateIterator;
use crate::rng::lcrng::Pokerng;
use crate::{AbilityType, Gender, Nature, PkmFilter, PkmState, gen3_shiny};
use serde::{Deserialize, Serialize};
use tsify_next::Tsify;
use wasm_bindgen::prelude::*;

#[derive(Debug, Clone, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct Gen4StaticOpts {
    pub tid: u16,
    pub sid: u16,
    pub initial_advances: usize,
    pub max_advances: usize,
    pub filter: PkmFilter,
    pub filter_characteristic: Option<Characteristic>,
    pub game: Option<GameVersion>,
    pub encounter: Static4Species,
    pub lead: LeadAbilities,
    pub seed: u32,
}

#[derive(Debug, Clone, Copy, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct Gen4StaticPokemon {
    pub pid: u32,
    pub shiny: bool,
    pub ability: AbilityType,
    pub gender: Gender,
    pub ivs: Ivs,
    pub nature: Nature,
    pub advance: usize,
    pub characteristic: Characteristic,
}

impl PkmState for Gen4StaticPokemon {
    fn ability(&self) -> AbilityType {
        self.ability
    }

    fn gender(&self) -> Gender {
        self.gender
    }

    fn ivs(&self) -> &Ivs {
        &self.ivs
    }

    fn nature(&self) -> Nature {
        self.nature
    }

    fn shiny(&self) -> bool {
        self.shiny
    }
}

fn generate_gen4_static(rng: &mut Pokerng, opts: &Gen4StaticOpts) -> Option<Gen4StaticPokemon> {
    let pid_low = rng.rand::<u16>() as u32;
    let pid_high = rng.rand::<u16>() as u32;
    let pid = (pid_high << 16) | pid_low;

    let iv1 = rng.rand::<u16>();
    let iv2 = rng.rand::<u16>();
    let ivs = Ivs::new_g3(iv1, iv2);

    let pkm = Gen4StaticPokemon {
        pid,
        shiny: gen3_shiny(pid, opts.tid, opts.sid),
        ability: AbilityType::from_gen3_pid(pid),
        gender: opts.encounter.species().gender_from_pid(pid),
        characteristic: Characteristic::new(pid, &ivs),
        ivs,
        nature: Nature::from_pid(pid),
        advance: 0,
    };
    Some(pkm)
}

fn generate_gen4_static_k(rng: &mut Pokerng, opts: &Gen4StaticOpts) -> Option<Gen4StaticPokemon> {
    let lead = opts.lead;
    {
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

            if rng.rand::<u16>() % 3 != 0 {
                let nature = (rng.rand::<u16>() % 25) as u8;
                let pid = buffer + nature as u32;
                let gender = opts.encounter.species().gender_from_pid(pid);
                if gender == target_gender {
                    let iv1 = rng.rand::<u16>();
                    let iv2 = rng.rand::<u16>();
                    let ivs = Ivs::new_g3(iv1, iv2);
                    let nature = Nature::from_pid(pid);

                    return Some(Gen4StaticPokemon {
                        pid,
                        shiny: gen3_shiny(pid, opts.tid, opts.sid),
                        ability: AbilityType::from_gen3_pid(pid),
                        characteristic: Characteristic::new(pid, &ivs),
                        gender,
                        ivs,
                        nature,
                        advance: 0,
                    });
                };
            }
        }
    }
    if let LeadAbilities::Synchronize(nature) = opts.lead {
        if rng.rand::<u16>() % 2 == 0 {
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

            let iv1 = rng.rand::<u16>();
            let iv2 = rng.rand::<u16>();
            let ivs = Ivs::new_g3(iv1, iv2);
            return Some(Gen4StaticPokemon {
                pid,
                shiny: gen3_shiny(pid, opts.tid, opts.sid),
                ability: AbilityType::from_gen3_pid(pid),
                gender: opts.encounter.species().gender_from_pid(pid),
                characteristic: Characteristic::new(pid, &ivs),
                ivs,
                nature: Nature::from_pid(pid),
                advance: 0,
            });
        }
    }
    let nature_rand = (rng.rand::<u16>() % 25) as u8;

    let mut pid: u32;
    loop {
        let pid_low = rng.rand::<u16>() as u32;
        let pid_high = rng.rand::<u16>() as u32;
        pid = (pid_high << 16) | pid_low;
        if pid % 25 == nature_rand as u32 {
            break;
        }
    }

    let iv1 = rng.rand::<u16>();
    let iv2 = rng.rand::<u16>();
    let ivs = Ivs::new_g3(iv1, iv2);
    let gender = opts.encounter.species().gender_from_pid(pid);
    let nature = Nature::from_pid(pid);

    let pkm = Gen4StaticPokemon {
        pid,
        shiny: gen3_shiny(pid, opts.tid, opts.sid),
        ability: AbilityType::from_gen3_pid(pid),
        characteristic: Characteristic::new(pid, &ivs),
        gender,
        ivs,
        nature,
        advance: 0,
    };
    Some(pkm)
}

fn generate_gen4_static_j(rng: &mut Pokerng, opts: &Gen4StaticOpts) -> Option<Gen4StaticPokemon> {
    let lead = opts.lead;
    {
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

            if rng.rand::<u16>() % 3 != 0 {
                let nature = (rng.rand::<u16>() / 0xa3e) as u8;
                let pid = buffer + nature as u32;
                let gender = opts.encounter.species().gender_from_pid(pid);
                if gender == target_gender {
                    let iv1 = rng.rand::<u16>();
                    let iv2 = rng.rand::<u16>();
                    let ivs = Ivs::new_g3(iv1, iv2);
                    let nature = Nature::from_pid(pid);

                    return Some(Gen4StaticPokemon {
                        pid,
                        shiny: gen3_shiny(pid, opts.tid, opts.sid),
                        ability: AbilityType::from_gen3_pid(pid),
                        characteristic: Characteristic::new(pid, &ivs),
                        gender,
                        ivs,
                        nature,
                        advance: 0,
                    });
                };
            }
        }
    }
    if let LeadAbilities::Synchronize(nature) = opts.lead {
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

            let iv1 = rng.rand::<u16>();
            let iv2 = rng.rand::<u16>();
            let ivs = Ivs::new_g3(iv1, iv2);
            return Some(Gen4StaticPokemon {
                pid,
                shiny: gen3_shiny(pid, opts.tid, opts.sid),
                ability: AbilityType::from_gen3_pid(pid),
                gender: opts.encounter.species().gender_from_pid(pid),
                characteristic: Characteristic::new(pid, &ivs),
                ivs,
                nature: Nature::from_pid(pid),
                advance: 0,
            });
        }
    }
    let nature_rand = (rng.rand::<u16>() / 0xa3e) as u8;

    let mut pid: u32;
    loop {
        let pid_low = rng.rand::<u16>() as u32;
        let pid_high = rng.rand::<u16>() as u32;
        pid = (pid_high << 16) | pid_low;
        if pid % 25 == nature_rand as u32 {
            break;
        }
    }

    let iv1 = rng.rand::<u16>();
    let iv2 = rng.rand::<u16>();
    let ivs = Ivs::new_g3(iv1, iv2);

    let pkm = Gen4StaticPokemon {
        pid,
        shiny: gen3_shiny(pid, opts.tid, opts.sid),
        ability: AbilityType::from_gen3_pid(pid),
        gender: opts.encounter.species().gender_from_pid(pid),
        characteristic: Characteristic::new(pid, &ivs),
        ivs,
        nature: Nature::from_pid(pid),
        advance: 0,
    };
    Some(pkm)
}

fn generate_static4_state(opts: &Gen4StaticOpts, rng: &mut Pokerng) -> Option<Gen4StaticPokemon> {
    let encounter = opts.encounter;
    let species = encounter.species();
    match opts.game {
        Some(GameVersion::Diamond) | Some(GameVersion::Pearl) | Some(GameVersion::Platinum) => {
            if dpt_method_jk(species) {
                generate_gen4_static_j(rng, opts)
            } else {
                generate_gen4_static(rng, opts)
            }
        }
        Some(GameVersion::HeartGold) | Some(GameVersion::SoulSilver) => {
            if hgss_method_jk(species) {
                generate_gen4_static_k(rng, opts)
            } else {
                generate_gen4_static(rng, opts)
            }
        }
        _ => generate_gen4_static(rng, opts),
    }
}

#[wasm_bindgen]
pub fn generate_static4_states(opts: &Gen4StaticOpts) -> Vec<Gen4StaticPokemon> {
    let base_rng = Pokerng::new(opts.seed);
    StateIterator::new(base_rng)
        .enumerate()
        .skip(opts.initial_advances)
        .take(opts.max_advances.wrapping_add(1))
        .filter_map(|(adv, mut rng)| {
            let mut pkm = generate_static4_state(&opts.clone(), &mut rng)?;

            if let Some(filter_characteristic) = opts.filter_characteristic {
                if pkm.characteristic != filter_characteristic {
                    return None;
                }
            }

            if !opts.filter.pass_filter(&pkm) {
                return None;
            }

            pkm.advance = adv;
            Some(pkm)
        })
        .collect::<Vec<Gen4StaticPokemon>>()
}

#[cfg(test)]
mod test {
    use super::Characteristic::*;
    use super::*;
    use crate::assert_list_eq;

    #[test]
    fn method_1() {
        let options = Gen4StaticOpts {
            seed: 0,
            tid: 12345,
            sid: 54321,
            initial_advances: 0,
            max_advances: 10,
            encounter: Static4Species::Turtwig,
            game: Some(GameVersion::Platinum),
            lead: LeadAbilities::None,
            filter_characteristic: None,
            filter: PkmFilter {
                shiny: false,
                nature: None,
                gender: None,
                min_ivs: Ivs {
                    hp: 0,
                    atk: 0,
                    def: 0,
                    spa: 0,
                    spd: 0,
                    spe: 0,
                },
                max_ivs: Ivs {
                    hp: 31,
                    atk: 31,
                    def: 31,
                    spa: 31,
                    spd: 31,
                    spe: 31,
                },
                ability: None,
                stats: None,
            },
        };
        let expected_results = [
            Gen4StaticPokemon {
                pid: 3917348864,
                shiny: false,
                ability: AbilityType::First,
                gender: Gender::Female,
                characteristic: SturdyBody,
                ivs: Ivs {
                    hp: 17,
                    atk: 19,
                    def: 20,
                    spa: 13,
                    spd: 12,
                    spe: 16,
                },
                nature: Nature::Naive,
                advance: 0,
            },
            Gen4StaticPokemon {
                pid: 1383197054,
                shiny: false,
                ability: AbilityType::First,
                gender: Gender::Male,
                characteristic: OftenLostInThought,
                ivs: Ivs {
                    hp: 16,
                    atk: 13,
                    def: 12,
                    spa: 18,
                    spd: 3,
                    spe: 2,
                },
                nature: Nature::Naughty,
                advance: 1,
            },
            Gen4StaticPokemon {
                pid: 833639025,
                shiny: false,
                ability: AbilityType::Second,
                gender: Gender::Male,
                characteristic: SomewhatStubborn,
                ivs: Ivs {
                    hp: 2,
                    atk: 18,
                    def: 3,
                    spa: 22,
                    spd: 24,
                    spe: 12,
                },
                nature: Nature::Hardy,
                advance: 2,
            },
            Gen4StaticPokemon {
                pid: 2386702768,
                shiny: false,
                ability: AbilityType::First,
                gender: Gender::Male,
                characteristic: HighlyCurious,
                ivs: Ivs {
                    hp: 12,
                    atk: 22,
                    def: 24,
                    spa: 30,
                    spd: 11,
                    spe: 5,
                },
                nature: Nature::Bashful,
                advance: 3,
            },
            Gen4StaticPokemon {
                pid: 3805056578,
                shiny: false,
                ability: AbilityType::First,
                gender: Gender::Male,
                characteristic: HighlyCurious,
                ivs: Ivs {
                    hp: 5,
                    atk: 30,
                    def: 11,
                    spa: 30,
                    spd: 25,
                    spe: 27,
                },
                nature: Nature::Adamant,
                advance: 4,
            },
            Gen4StaticPokemon {
                pid: 2948981452,
                shiny: false,
                ability: AbilityType::First,
                gender: Gender::Male,
                characteristic: SomewhatVain,
                ivs: Ivs {
                    hp: 27,
                    atk: 30,
                    def: 25,
                    spa: 1,
                    spd: 31,
                    spe: 19,
                },
                nature: Nature::Brave,
                advance: 5,
            },
            Gen4StaticPokemon {
                pid: 1742450629,
                shiny: false,
                ability: AbilityType::Second,
                gender: Gender::Male,
                characteristic: CapableOfTakingHits,
                ivs: Ivs {
                    hp: 19,
                    atk: 1,
                    def: 31,
                    spa: 25,
                    spd: 27,
                    spe: 12,
                },
                nature: Nature::Naughty,
                advance: 6,
            },
            Gen4StaticPokemon {
                pid: 4231227355,
                shiny: false,
                ability: AbilityType::Second,
                gender: Gender::Male,
                characteristic: SomewhatVain,
                ivs: Ivs {
                    hp: 12,
                    atk: 25,
                    def: 27,
                    spa: 2,
                    spd: 31,
                    spe: 30,
                },
                nature: Nature::Bold,
                advance: 7,
            },
            Gen4StaticPokemon {
                pid: 4012702771,
                shiny: false,
                ability: AbilityType::Second,
                gender: Gender::Male,
                characteristic: CapableOfTakingHits,
                ivs: Ivs {
                    hp: 30,
                    atk: 2,
                    def: 31,
                    spa: 22,
                    spd: 18,
                    spe: 5,
                },
                nature: Nature::Gentle,
                advance: 8,
            },
            Gen4StaticPokemon {
                pid: 4234080044,
                shiny: false,
                ability: AbilityType::First,
                gender: Gender::Male,
                characteristic: HighlyCurious,
                ivs: Ivs {
                    hp: 5,
                    atk: 22,
                    def: 18,
                    spa: 30,
                    spd: 26,
                    spe: 22,
                },
                nature: Nature::Rash,
                advance: 9,
            },
            Gen4StaticPokemon {
                pid: 3401972830,
                shiny: false,
                ability: AbilityType::First,
                gender: Gender::Male,
                characteristic: ProudOfItsPower,
                ivs: Ivs {
                    hp: 22,
                    atk: 30,
                    def: 26,
                    spa: 9,
                    spd: 6,
                    spe: 29,
                },
                nature: Nature::Bold,
                advance: 10,
            },
        ];
        let result = generate_static4_states(&options);
        assert_list_eq!(result, expected_results);
    }

    #[test]
    fn method_k_nosynch() {
        let options = Gen4StaticOpts {
            seed: 0,
            tid: 12345,
            sid: 54321,
            initial_advances: 0,
            max_advances: 10,
            encounter: Static4Species::Dialga,
            game: Some(GameVersion::Platinum),
            lead: LeadAbilities::None,
            filter_characteristic: None,
            filter: PkmFilter {
                shiny: false,
                nature: None,
                gender: None,
                min_ivs: Ivs {
                    hp: 0,
                    atk: 0,
                    def: 0,
                    spa: 0,
                    spd: 0,
                    spe: 0,
                },
                max_ivs: Ivs {
                    hp: 31,
                    atk: 31,
                    def: 31,
                    spa: 31,
                    spd: 31,
                    spe: 31,
                },
                ability: None,
                stats: None,
            },
        };
        let expected_results = [
            Gen4StaticPokemon {
                pid: 3552946825,
                shiny: false,
                ability: AbilityType::Second,
                gender: Gender::Genderless,
                characteristic: LikesToThrashAbout,
                ivs: Ivs {
                    hp: 10,
                    atk: 31,
                    def: 16,
                    spa: 22,
                    spd: 0,
                    spe: 25,
                },
                nature: Nature::Hardy,
                advance: 0,
            },
            Gen4StaticPokemon {
                pid: 3360178372,
                shiny: false,
                ability: AbilityType::First,
                gender: Gender::Genderless,
                characteristic: ProudOfItsPower,
                ivs: Ivs {
                    hp: 17,
                    atk: 30,
                    def: 15,
                    spa: 5,
                    spd: 14,
                    spe: 22,
                },
                nature: Nature::Sassy,
                advance: 1,
            },
            Gen4StaticPokemon {
                pid: 3080890308,
                shiny: false,
                ability: AbilityType::First,
                gender: Gender::Genderless,
                characteristic: SomewhatOfAClown,
                ivs: Ivs {
                    hp: 21,
                    atk: 2,
                    def: 10,
                    spa: 2,
                    spd: 7,
                    spe: 28,
                },
                nature: Nature::Impish,
                advance: 2,
            },
            Gen4StaticPokemon {
                pid: 1742450629,
                shiny: false,
                ability: AbilityType::Second,
                gender: Gender::Genderless,
                characteristic: CapableOfTakingHits,
                ivs: Ivs {
                    hp: 19,
                    atk: 1,
                    def: 31,
                    spa: 25,
                    spd: 27,
                    spe: 12,
                },
                nature: Nature::Naughty,
                advance: 3,
            },
            Gen4StaticPokemon {
                pid: 3754258538,
                shiny: false,
                ability: AbilityType::First,
                gender: Gender::Genderless,
                characteristic: StrongWilled,
                ivs: Ivs {
                    hp: 4,
                    atk: 20,
                    def: 14,
                    spa: 0,
                    spd: 25,
                    spe: 20,
                },
                nature: Nature::Jolly,
                advance: 4,
            },
            Gen4StaticPokemon {
                pid: 3360178372,
                shiny: false,
                ability: AbilityType::First,
                gender: Gender::Genderless,
                characteristic: ProudOfItsPower,
                ivs: Ivs {
                    hp: 17,
                    atk: 30,
                    def: 15,
                    spa: 5,
                    spd: 14,
                    spe: 22,
                },
                nature: Nature::Sassy,
                advance: 5,
            },
            Gen4StaticPokemon {
                pid: 840124667,
                shiny: false,
                ability: AbilityType::Second,
                gender: Gender::Genderless,
                characteristic: CapableOfTakingHits,
                ivs: Ivs {
                    hp: 7,
                    atk: 23,
                    def: 31,
                    spa: 29,
                    spd: 23,
                    spe: 3,
                },
                nature: Nature::Quiet,
                advance: 6,
            },
            Gen4StaticPokemon {
                pid: 2902820410,
                shiny: false,
                ability: AbilityType::First,
                gender: Gender::Genderless,
                characteristic: LikesToRun,
                ivs: Ivs {
                    hp: 18,
                    atk: 14,
                    def: 4,
                    spa: 0,
                    spd: 12,
                    spe: 25,
                },
                nature: Nature::Timid,
                advance: 7,
            },
            Gen4StaticPokemon {
                pid: 2059180349,
                shiny: false,
                ability: AbilityType::Second,
                gender: Gender::Genderless,
                characteristic: QuickTempered,
                ivs: Ivs {
                    hp: 7,
                    atk: 29,
                    def: 18,
                    spa: 14,
                    spd: 23,
                    spe: 22,
                },
                nature: Nature::Quirky,
                advance: 8,
            },
            Gen4StaticPokemon {
                pid: 1096857248,
                shiny: false,
                ability: AbilityType::First,
                gender: Gender::Genderless,
                characteristic: HatesToLose,
                ivs: Ivs {
                    hp: 22,
                    atk: 17,
                    def: 5,
                    spa: 0,
                    spd: 28,
                    spe: 9,
                },
                nature: Nature::Careful,
                advance: 9,
            },
            Gen4StaticPokemon {
                pid: 2059180349,
                shiny: false,
                ability: AbilityType::Second,
                gender: Gender::Genderless,
                characteristic: QuickTempered,
                ivs: Ivs {
                    hp: 7,
                    atk: 29,
                    def: 18,
                    spa: 14,
                    spd: 23,
                    spe: 22,
                },
                nature: Nature::Quirky,
                advance: 10,
            },
        ];
        let result = generate_static4_states(&options);
        assert_list_eq!(result, expected_results);
    }

    #[test]
    fn method_j_nosynch() {
        let options = Gen4StaticOpts {
            seed: 0,
            tid: 12345,
            sid: 54321,
            initial_advances: 0,
            max_advances: 10,
            encounter: Static4Species::HoOh,
            game: Some(GameVersion::HeartGold),
            lead: LeadAbilities::None,
            filter_characteristic: None,
            filter: PkmFilter {
                shiny: false,
                nature: None,
                gender: None,
                min_ivs: Ivs {
                    hp: 0,
                    atk: 0,
                    def: 0,
                    spa: 0,
                    spd: 0,
                    spe: 0,
                },
                max_ivs: Ivs {
                    hp: 31,
                    atk: 31,
                    def: 31,
                    spa: 31,
                    spd: 31,
                    spe: 31,
                },
                ability: None,
                stats: None,
            },
        };
        let expected_results = [
            Gen4StaticPokemon {
                pid: 3552946825,
                shiny: false,
                ability: AbilityType::Second,
                gender: Gender::Genderless,
                characteristic: LikesToThrashAbout,
                ivs: Ivs {
                    hp: 10,
                    atk: 31,
                    def: 16,
                    spa: 22,
                    spd: 0,
                    spe: 25,
                },
                nature: Nature::Hardy,
                advance: 0,
            },
            Gen4StaticPokemon {
                pid: 813709149,
                shiny: false,
                ability: AbilityType::Second,
                gender: Gender::Genderless,
                characteristic: ScattersThingsOften,
                ivs: Ivs {
                    hp: 28,
                    atk: 3,
                    def: 16,
                    spa: 7,
                    spd: 18,
                    spe: 27,
                },
                nature: Nature::Quirky,
                advance: 1,
            },
            Gen4StaticPokemon {
                pid: 4231227355,
                shiny: false,
                ability: AbilityType::Second,
                gender: Gender::Genderless,
                characteristic: SomewhatVain,
                ivs: Ivs {
                    hp: 12,
                    atk: 25,
                    def: 27,
                    spa: 2,
                    spd: 31,
                    spe: 30,
                },
                nature: Nature::Bold,
                advance: 2,
            },
            Gen4StaticPokemon {
                pid: 1621222420,
                shiny: false,
                ability: AbilityType::First,
                gender: Gender::Genderless,
                characteristic: HighlyCurious,
                ivs: Ivs {
                    hp: 11,
                    atk: 25,
                    def: 10,
                    spa: 25,
                    spd: 3,
                    spe: 24,
                },
                nature: Nature::Calm,
                advance: 3,
            },
            Gen4StaticPokemon {
                pid: 1671314793,
                shiny: false,
                ability: AbilityType::Second,
                gender: Gender::Genderless,
                characteristic: SomewhatVain,
                ivs: Ivs {
                    hp: 9,
                    atk: 9,
                    def: 7,
                    spa: 20,
                    spd: 26,
                    spe: 13,
                },
                nature: Nature::Bashful,
                advance: 4,
            },
            Gen4StaticPokemon {
                pid: 2902820410,
                shiny: false,
                ability: AbilityType::First,
                gender: Gender::Genderless,
                characteristic: LikesToRun,
                ivs: Ivs {
                    hp: 18,
                    atk: 14,
                    def: 4,
                    spa: 0,
                    spd: 12,
                    spe: 25,
                },
                nature: Nature::Timid,
                advance: 5,
            },
            Gen4StaticPokemon {
                pid: 2489114822,
                shiny: false,
                ability: AbilityType::First,
                gender: Gender::Genderless,
                characteristic: AlertToSounds,
                ivs: Ivs {
                    hp: 27,
                    atk: 17,
                    def: 19,
                    spa: 18,
                    spd: 22,
                    spe: 31,
                },
                nature: Nature::Sassy,
                advance: 6,
            },
            Gen4StaticPokemon {
                pid: 2440584662,
                shiny: false,
                ability: AbilityType::First,
                gender: Gender::Genderless,
                characteristic: QuickTempered,
                ivs: Ivs {
                    hp: 6,
                    atk: 29,
                    def: 9,
                    spa: 12,
                    spd: 24,
                    spe: 13,
                },
                nature: Nature::Serious,
                advance: 7,
            },
            Gen4StaticPokemon {
                pid: 3754258538,
                shiny: false,
                ability: AbilityType::First,
                gender: Gender::Genderless,
                characteristic: StrongWilled,
                ivs: Ivs {
                    hp: 4,
                    atk: 20,
                    def: 14,
                    spa: 0,
                    spd: 25,
                    spe: 20,
                },
                nature: Nature::Jolly,
                advance: 8,
            },
            Gen4StaticPokemon {
                pid: 1636640678,
                shiny: false,
                ability: AbilityType::First,
                gender: Gender::Genderless,
                characteristic: VeryFinicky,
                ivs: Ivs {
                    hp: 18,
                    atk: 20,
                    def: 5,
                    spa: 29,
                    spd: 19,
                    spe: 24,
                },
                nature: Nature::Adamant,
                advance: 9,
            },
            Gen4StaticPokemon {
                pid: 378691981,
                shiny: false,
                ability: AbilityType::Second,
                gender: Gender::Genderless,
                characteristic: QuickTempered,
                ivs: Ivs {
                    hp: 24,
                    atk: 29,
                    def: 19,
                    spa: 26,
                    spd: 13,
                    spe: 29,
                },
                nature: Nature::Docile,
                advance: 10,
            },
        ];
        let result = generate_static4_states(&options);
        assert_list_eq!(result, expected_results);
    }

    #[cfg(test)]
    mod synch {

        use super::*;

        #[test]
        fn method_j() {
            let options = Gen4StaticOpts {
                seed: 0,
                tid: 12345,
                sid: 54321,
                initial_advances: 0,
                max_advances: 10,
                encounter: Static4Species::HoOh,
                game: Some(GameVersion::HeartGold),
                lead: LeadAbilities::Synchronize(Nature::Adamant),
                filter_characteristic: None,
                filter: PkmFilter {
                    shiny: false,
                    nature: None,
                    gender: None,
                    min_ivs: Ivs {
                        hp: 0,
                        atk: 0,
                        def: 0,
                        spa: 0,
                        spd: 0,
                        spe: 0,
                    },
                    max_ivs: Ivs {
                        hp: 31,
                        atk: 31,
                        def: 31,
                        spa: 31,
                        spd: 31,
                        spe: 31,
                    },
                    ability: None,
                    stats: None,
                },
            };
            let expected_results = [
                Gen4StaticPokemon {
                    pid: 475834453,
                    shiny: false,
                    ability: AbilityType::Second,
                    gender: Gender::Genderless,
                    characteristic: AlertToSounds,
                    ivs: Ivs {
                        hp: 2,
                        atk: 18,
                        def: 8,
                        spa: 17,
                        spd: 1,
                        spe: 26,
                    },
                    nature: Nature::Adamant,
                    advance: 0,
                },
                Gen4StaticPokemon {
                    pid: 3805056578,
                    shiny: false,
                    ability: AbilityType::First,
                    gender: Gender::Genderless,
                    characteristic: HighlyCurious,
                    ivs: Ivs {
                        hp: 5,
                        atk: 30,
                        def: 11,
                        spa: 30,
                        spd: 25,
                        spe: 27,
                    },
                    nature: Nature::Adamant,
                    advance: 1,
                },
                Gen4StaticPokemon {
                    pid: 1621222420,
                    shiny: false,
                    ability: AbilityType::First,
                    gender: Gender::Genderless,
                    characteristic: HighlyCurious,
                    ivs: Ivs {
                        hp: 11,
                        atk: 25,
                        def: 10,
                        spa: 25,
                        spd: 3,
                        spe: 24,
                    },
                    nature: Nature::Calm,
                    advance: 2,
                },
                Gen4StaticPokemon {
                    pid: 3805056578,
                    shiny: false,
                    ability: AbilityType::First,
                    gender: Gender::Genderless,
                    characteristic: HighlyCurious,
                    ivs: Ivs {
                        hp: 5,
                        atk: 30,
                        def: 11,
                        spa: 30,
                        spd: 25,
                        spe: 27,
                    },
                    nature: Nature::Adamant,
                    advance: 3,
                },
                Gen4StaticPokemon {
                    pid: 475834453,
                    shiny: false,
                    ability: AbilityType::Second,
                    gender: Gender::Genderless,
                    characteristic: AlertToSounds,
                    ivs: Ivs {
                        hp: 2,
                        atk: 18,
                        def: 8,
                        spa: 17,
                        spd: 1,
                        spe: 26,
                    },
                    nature: Nature::Adamant,
                    advance: 4,
                },
                Gen4StaticPokemon {
                    pid: 1636640678,
                    shiny: false,
                    ability: AbilityType::First,
                    gender: Gender::Genderless,
                    characteristic: VeryFinicky,
                    ivs: Ivs {
                        hp: 18,
                        atk: 20,
                        def: 5,
                        spa: 29,
                        spd: 19,
                        spe: 24,
                    },
                    nature: Nature::Adamant,
                    advance: 5,
                },
                Gen4StaticPokemon {
                    pid: 2440584662,
                    shiny: false,
                    ability: AbilityType::First,
                    gender: Gender::Genderless,
                    characteristic: QuickTempered,
                    ivs: Ivs {
                        hp: 6,
                        atk: 29,
                        def: 9,
                        spa: 12,
                        spd: 24,
                        spe: 13,
                    },
                    nature: Nature::Serious,
                    advance: 6,
                },
                Gen4StaticPokemon {
                    pid: 3754258538,
                    shiny: false,
                    ability: AbilityType::First,
                    gender: Gender::Genderless,
                    characteristic: StrongWilled,
                    ivs: Ivs {
                        hp: 4,
                        atk: 20,
                        def: 14,
                        spa: 0,
                        spd: 25,
                        spe: 20,
                    },
                    nature: Nature::Jolly,
                    advance: 7,
                },
                Gen4StaticPokemon {
                    pid: 1636640678,
                    shiny: false,
                    ability: AbilityType::First,
                    gender: Gender::Genderless,
                    characteristic: VeryFinicky,
                    ivs: Ivs {
                        hp: 18,
                        atk: 20,
                        def: 5,
                        spa: 29,
                        spd: 19,
                        spe: 24,
                    },
                    nature: Nature::Adamant,
                    advance: 8,
                },
                Gen4StaticPokemon {
                    pid: 1636640678,
                    shiny: false,
                    ability: AbilityType::First,
                    gender: Gender::Genderless,
                    characteristic: VeryFinicky,
                    ivs: Ivs {
                        hp: 18,
                        atk: 20,
                        def: 5,
                        spa: 29,
                        spd: 19,
                        spe: 24,
                    },
                    nature: Nature::Adamant,
                    advance: 9,
                },
                Gen4StaticPokemon {
                    pid: 475834453,
                    shiny: false,
                    ability: AbilityType::Second,
                    gender: Gender::Genderless,
                    characteristic: AlertToSounds,
                    ivs: Ivs {
                        hp: 2,
                        atk: 18,
                        def: 8,
                        spa: 17,
                        spd: 1,
                        spe: 26,
                    },
                    nature: Nature::Adamant,
                    advance: 10,
                },
            ];
            let result = generate_static4_states(&options);
            assert_list_eq!(result, expected_results);
        }

        #[test]
        fn method_k() {
            let options = Gen4StaticOpts {
                seed: 0,
                tid: 12345,
                sid: 54321,
                initial_advances: 0,
                max_advances: 10,
                encounter: Static4Species::Dialga,
                game: Some(GameVersion::Platinum),
                lead: LeadAbilities::Synchronize(Nature::Adamant),
                filter_characteristic: None,
                filter: PkmFilter {
                    shiny: false,
                    nature: None,
                    gender: None,
                    min_ivs: Ivs {
                        hp: 0,
                        atk: 0,
                        def: 0,
                        spa: 0,
                        spd: 0,
                        spe: 0,
                    },
                    max_ivs: Ivs {
                        hp: 31,
                        atk: 31,
                        def: 31,
                        spa: 31,
                        spd: 31,
                        spe: 31,
                    },
                    ability: None,
                    stats: None,
                },
            };
            let expected_results = [
                Gen4StaticPokemon {
                    pid: 475834453,
                    shiny: false,
                    ability: AbilityType::Second,
                    gender: Gender::Genderless,
                    characteristic: AlertToSounds,
                    ivs: Ivs {
                        hp: 2,
                        atk: 18,
                        def: 8,
                        spa: 17,
                        spd: 1,
                        spe: 26,
                    },
                    nature: Nature::Adamant,
                    advance: 0,
                },
                Gen4StaticPokemon {
                    pid: 3080890308,
                    shiny: false,
                    ability: AbilityType::First,
                    gender: Gender::Genderless,
                    characteristic: SomewhatOfAClown,
                    ivs: Ivs {
                        hp: 21,
                        atk: 2,
                        def: 10,
                        spa: 2,
                        spd: 7,
                        spe: 28,
                    },
                    nature: Nature::Impish,
                    advance: 1,
                },
                Gen4StaticPokemon {
                    pid: 475834453,
                    shiny: false,
                    ability: AbilityType::Second,
                    gender: Gender::Genderless,
                    characteristic: AlertToSounds,
                    ivs: Ivs {
                        hp: 2,
                        atk: 18,
                        def: 8,
                        spa: 17,
                        spd: 1,
                        spe: 26,
                    },
                    nature: Nature::Adamant,
                    advance: 2,
                },
                Gen4StaticPokemon {
                    pid: 3805056578,
                    shiny: false,
                    ability: AbilityType::First,
                    gender: Gender::Genderless,
                    characteristic: HighlyCurious,
                    ivs: Ivs {
                        hp: 5,
                        atk: 30,
                        def: 11,
                        spa: 30,
                        spd: 25,
                        spe: 27,
                    },
                    nature: Nature::Adamant,
                    advance: 3,
                },
                Gen4StaticPokemon {
                    pid: 3360178372,
                    shiny: false,
                    ability: AbilityType::First,
                    gender: Gender::Genderless,
                    characteristic: ProudOfItsPower,
                    ivs: Ivs {
                        hp: 17,
                        atk: 30,
                        def: 15,
                        spa: 5,
                        spd: 14,
                        spe: 22,
                    },
                    nature: Nature::Sassy,
                    advance: 4,
                },
                Gen4StaticPokemon {
                    pid: 840124667,
                    shiny: false,
                    ability: AbilityType::Second,
                    gender: Gender::Genderless,
                    characteristic: CapableOfTakingHits,
                    ivs: Ivs {
                        hp: 7,
                        atk: 23,
                        def: 31,
                        spa: 29,
                        spd: 23,
                        spe: 3,
                    },
                    nature: Nature::Quiet,
                    advance: 5,
                },
                Gen4StaticPokemon {
                    pid: 2902820410,
                    shiny: false,
                    ability: AbilityType::First,
                    gender: Gender::Genderless,
                    characteristic: LikesToRun,
                    ivs: Ivs {
                        hp: 18,
                        atk: 14,
                        def: 4,
                        spa: 0,
                        spd: 12,
                        spe: 25,
                    },
                    nature: Nature::Timid,
                    advance: 6,
                },
                Gen4StaticPokemon {
                    pid: 1636640678,
                    shiny: false,
                    ability: AbilityType::First,
                    gender: Gender::Genderless,
                    characteristic: VeryFinicky,
                    ivs: Ivs {
                        hp: 18,
                        atk: 20,
                        def: 5,
                        spa: 29,
                        spd: 19,
                        spe: 24,
                    },
                    nature: Nature::Adamant,
                    advance: 7,
                },
                Gen4StaticPokemon {
                    pid: 1096857248,
                    shiny: false,
                    ability: AbilityType::First,
                    gender: Gender::Genderless,
                    characteristic: HatesToLose,
                    ivs: Ivs {
                        hp: 22,
                        atk: 17,
                        def: 5,
                        spa: 0,
                        spd: 28,
                        spe: 9,
                    },
                    nature: Nature::Careful,
                    advance: 8,
                },
                Gen4StaticPokemon {
                    pid: 2059180349,
                    shiny: false,
                    ability: AbilityType::Second,
                    gender: Gender::Genderless,
                    characteristic: QuickTempered,
                    ivs: Ivs {
                        hp: 7,
                        atk: 29,
                        def: 18,
                        spa: 14,
                        spd: 23,
                        spe: 22,
                    },
                    nature: Nature::Quirky,
                    advance: 9,
                },
                Gen4StaticPokemon {
                    pid: 3954154919,
                    shiny: false,
                    ability: AbilityType::Second,
                    gender: Gender::Genderless,
                    characteristic: StronglyDefiant,
                    ivs: Ivs {
                        hp: 3,
                        atk: 5,
                        def: 20,
                        spa: 7,
                        spd: 22,
                        spe: 21,
                    },
                    nature: Nature::Rash,
                    advance: 10,
                },
            ];
            let result = generate_static4_states(&options);
            assert_list_eq!(result, expected_results);
        }
    }

    mod cutiech {

        use super::*;

        #[test]
        fn method_j_cc() {
            let options = Gen4StaticOpts {
                seed: 0,
                tid: 12345,
                sid: 54321,
                initial_advances: 0,
                max_advances: 10,
                encounter: Static4Species::Snorlax,
                game: Some(GameVersion::HeartGold),
                lead: LeadAbilities::CutecharmM,
                filter_characteristic: None,
                filter: PkmFilter {
                    shiny: false,
                    nature: None,
                    gender: None,
                    min_ivs: Ivs {
                        hp: 0,
                        atk: 0,
                        def: 0,
                        spa: 0,
                        spd: 0,
                        spe: 0,
                    },
                    max_ivs: Ivs {
                        hp: 31,
                        atk: 31,
                        def: 31,
                        spa: 31,
                        spd: 31,
                        spe: 31,
                    },
                    ability: None,
                    stats: None,
                },
            };
            let expected_results = [
                Gen4StaticPokemon {
                    pid: 813709149,
                    shiny: false,
                    ability: AbilityType::Second,
                    gender: Gender::Male,
                    characteristic: ScattersThingsOften,
                    ivs: Ivs {
                        hp: 28,
                        atk: 3,
                        def: 16,
                        spa: 7,
                        spd: 18,
                        spe: 27,
                    },
                    nature: Nature::Quirky,
                    advance: 0,
                },
                Gen4StaticPokemon {
                    pid: 5,
                    shiny: false,
                    ability: AbilityType::Second,
                    gender: Gender::Female,
                    characteristic: OftenLostInThought,
                    ivs: Ivs {
                        hp: 16,
                        atk: 13,
                        def: 12,
                        spa: 18,
                        spd: 3,
                        spe: 2,
                    },
                    nature: Nature::Bold,
                    advance: 1,
                },
                Gen4StaticPokemon {
                    pid: 1621222420,
                    shiny: false,
                    ability: AbilityType::First,
                    gender: Gender::Female,
                    characteristic: HighlyCurious,
                    ivs: Ivs {
                        hp: 11,
                        atk: 25,
                        def: 10,
                        spa: 25,
                        spd: 3,
                        spe: 24,
                    },
                    nature: Nature::Calm,
                    advance: 2,
                },
                Gen4StaticPokemon {
                    pid: 1671314793,
                    shiny: false,
                    ability: AbilityType::Second,
                    gender: Gender::Male,
                    characteristic: SomewhatVain,
                    ivs: Ivs {
                        hp: 9,
                        atk: 9,
                        def: 7,
                        spa: 20,
                        spd: 26,
                        spe: 13,
                    },
                    nature: Nature::Bashful,
                    advance: 3,
                },
                Gen4StaticPokemon {
                    pid: 10,
                    shiny: false,
                    ability: AbilityType::First,
                    gender: Gender::Female,
                    characteristic: HighlyCurious,
                    ivs: Ivs {
                        hp: 5,
                        atk: 30,
                        def: 11,
                        spa: 30,
                        spd: 25,
                        spe: 27,
                    },
                    nature: Nature::Timid,
                    advance: 4,
                },
                Gen4StaticPokemon {
                    pid: 22,
                    shiny: false,
                    ability: AbilityType::First,
                    gender: Gender::Female,
                    characteristic: SomewhatVain,
                    ivs: Ivs {
                        hp: 27,
                        atk: 30,
                        def: 25,
                        spa: 1,
                        spd: 31,
                        spe: 19,
                    },
                    nature: Nature::Sassy,
                    advance: 5,
                },
                Gen4StaticPokemon {
                    pid: 2440584662,
                    shiny: false,
                    ability: AbilityType::First,
                    gender: Gender::Male,
                    characteristic: QuickTempered,
                    ivs: Ivs {
                        hp: 6,
                        atk: 29,
                        def: 9,
                        spa: 12,
                        spd: 24,
                        spe: 13,
                    },
                    nature: Nature::Serious,
                    advance: 6,
                },
                Gen4StaticPokemon {
                    pid: 13,
                    shiny: false,
                    ability: AbilityType::Second,
                    gender: Gender::Female,
                    characteristic: SomewhatVain,
                    ivs: Ivs {
                        hp: 12,
                        atk: 25,
                        def: 27,
                        spa: 2,
                        spd: 31,
                        spe: 30,
                    },
                    nature: Nature::Jolly,
                    advance: 7,
                },
                Gen4StaticPokemon {
                    pid: 1636640678,
                    shiny: false,
                    ability: AbilityType::First,
                    gender: Gender::Male,
                    characteristic: VeryFinicky,
                    ivs: Ivs {
                        hp: 18,
                        atk: 20,
                        def: 5,
                        spa: 29,
                        spd: 19,
                        spe: 24,
                    },
                    nature: Nature::Adamant,
                    advance: 8,
                },
                Gen4StaticPokemon {
                    pid: 6,
                    shiny: false,
                    ability: AbilityType::First,
                    gender: Gender::Female,
                    characteristic: HighlyCurious,
                    ivs: Ivs {
                        hp: 5,
                        atk: 22,
                        def: 18,
                        spa: 30,
                        spd: 26,
                        spe: 22,
                    },
                    nature: Nature::Docile,
                    advance: 9,
                },
                Gen4StaticPokemon {
                    pid: 9,
                    shiny: false,
                    ability: AbilityType::Second,
                    gender: Gender::Female,
                    characteristic: ProudOfItsPower,
                    ivs: Ivs {
                        hp: 22,
                        atk: 30,
                        def: 26,
                        spa: 9,
                        spd: 6,
                        spe: 29,
                    },
                    nature: Nature::Lax,
                    advance: 10,
                },
            ];
            let result = generate_static4_states(&options);
            assert_list_eq!(result, expected_results);
        }
        #[test]
        fn method_k_cc() {
            let options = Gen4StaticOpts {
                seed: 0,
                tid: 12345,
                sid: 54321,
                initial_advances: 0,
                max_advances: 10,
                encounter: Static4Species::Drifloon,
                game: Some(GameVersion::Platinum),
                lead: LeadAbilities::CutecharmM,
                filter_characteristic: None,
                filter: PkmFilter {
                    shiny: false,
                    nature: None,
                    gender: None,
                    min_ivs: Ivs {
                        hp: 0,
                        atk: 0,
                        def: 0,
                        spa: 0,
                        spd: 0,
                        spe: 0,
                    },
                    max_ivs: Ivs {
                        hp: 31,
                        atk: 31,
                        def: 31,
                        spa: 31,
                        spd: 31,
                        spe: 31,
                    },
                    ability: None,
                    stats: None,
                },
            };
            let expected_results = [
                Gen4StaticPokemon {
                    pid: 3360178372,
                    shiny: false,
                    ability: AbilityType::First,
                    gender: Gender::Male,
                    characteristic: ProudOfItsPower,
                    ivs: Ivs {
                        hp: 17,
                        atk: 30,
                        def: 15,
                        spa: 5,
                        spd: 14,
                        spe: 22,
                    },
                    nature: Nature::Sassy,
                    advance: 0,
                },
                Gen4StaticPokemon {
                    pid: 8,
                    shiny: false,
                    ability: AbilityType::First,
                    gender: Gender::Female,
                    characteristic: OftenLostInThought,
                    ivs: Ivs {
                        hp: 16,
                        atk: 13,
                        def: 12,
                        spa: 18,
                        spd: 3,
                        spe: 2,
                    },
                    nature: Nature::Impish,
                    advance: 1,
                },
                Gen4StaticPokemon {
                    pid: 1742450629,
                    shiny: false,
                    ability: AbilityType::Second,
                    gender: Gender::Male,
                    characteristic: CapableOfTakingHits,
                    ivs: Ivs {
                        hp: 19,
                        atk: 1,
                        def: 31,
                        spa: 25,
                        spd: 27,
                        spe: 12,
                    },
                    nature: Nature::Naughty,
                    advance: 2,
                },
                Gen4StaticPokemon {
                    pid: 3754258538,
                    shiny: false,
                    ability: AbilityType::First,
                    gender: Gender::Female,
                    characteristic: StrongWilled,
                    ivs: Ivs {
                        hp: 4,
                        atk: 20,
                        def: 14,
                        spa: 0,
                        spd: 25,
                        spe: 20,
                    },
                    nature: Nature::Jolly,
                    advance: 3,
                },
                Gen4StaticPokemon {
                    pid: 22,
                    shiny: false,
                    ability: AbilityType::First,
                    gender: Gender::Female,
                    characteristic: HighlyCurious,
                    ivs: Ivs {
                        hp: 5,
                        atk: 30,
                        def: 11,
                        spa: 30,
                        spd: 25,
                        spe: 27,
                    },
                    nature: Nature::Sassy,
                    advance: 4,
                },
                Gen4StaticPokemon {
                    pid: 17,
                    shiny: false,
                    ability: AbilityType::Second,
                    gender: Gender::Female,
                    characteristic: SomewhatVain,
                    ivs: Ivs {
                        hp: 27,
                        atk: 30,
                        def: 25,
                        spa: 1,
                        spd: 31,
                        spe: 19,
                    },
                    nature: Nature::Quiet,
                    advance: 5,
                },
                Gen4StaticPokemon {
                    pid: 2902820410,
                    shiny: false,
                    ability: AbilityType::First,
                    gender: Gender::Female,
                    characteristic: LikesToRun,
                    ivs: Ivs {
                        hp: 18,
                        atk: 14,
                        def: 4,
                        spa: 0,
                        spd: 12,
                        spe: 25,
                    },
                    nature: Nature::Timid,
                    advance: 6,
                },
                Gen4StaticPokemon {
                    pid: 24,
                    shiny: false,
                    ability: AbilityType::First,
                    gender: Gender::Female,
                    characteristic: SomewhatVain,
                    ivs: Ivs {
                        hp: 12,
                        atk: 25,
                        def: 27,
                        spa: 2,
                        spd: 31,
                        spe: 30,
                    },
                    nature: Nature::Quirky,
                    advance: 7,
                },
                Gen4StaticPokemon {
                    pid: 1096857248,
                    shiny: false,
                    ability: AbilityType::First,
                    gender: Gender::Male,
                    characteristic: HatesToLose,
                    ivs: Ivs {
                        hp: 22,
                        atk: 17,
                        def: 5,
                        spa: 0,
                        spd: 28,
                        spe: 9,
                    },
                    nature: Nature::Careful,
                    advance: 8,
                },
                Gen4StaticPokemon {
                    pid: 24,
                    shiny: false,
                    ability: AbilityType::First,
                    gender: Gender::Female,
                    characteristic: HighlyCurious,
                    ivs: Ivs {
                        hp: 5,
                        atk: 22,
                        def: 18,
                        spa: 30,
                        spd: 26,
                        spe: 22,
                    },
                    nature: Nature::Quirky,
                    advance: 9,
                },
                Gen4StaticPokemon {
                    pid: 19,
                    shiny: false,
                    ability: AbilityType::Second,
                    gender: Gender::Female,
                    characteristic: ProudOfItsPower,
                    ivs: Ivs {
                        hp: 22,
                        atk: 30,
                        def: 26,
                        spa: 9,
                        spd: 6,
                        spe: 29,
                    },
                    nature: Nature::Rash,
                    advance: 10,
                },
            ];
            let result = generate_static4_states(&options);
            assert_list_eq!(result, expected_results);
        }
    }
}
