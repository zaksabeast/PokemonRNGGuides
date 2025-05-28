use crate::Ivs;
use crate::rng::Rng;
use crate::rng::StateIterator;
use crate::rng::lcrng::Pokerng;
use crate::{AbilityType, Gender, Nature, PkmFilter, PkmState, gen3_shiny};

use super::GameVersion;
use super::LeadAbilities;
use super::StaticEncounterId;
use super::dpt_method_jk;
use super::hgss_method_jk;

#[derive(Debug, PartialEq, Clone)]
pub struct Gen4StaticOpts {
    pub tid: u16,
    pub sid: u16,
    pub initial_advances: usize,
    pub max_advances: usize,
    pub filter: PkmFilter,
    pub game: Option<GameVersion>,
    pub encounter: StaticEncounterId,
    pub lead: Option<LeadAbilities>,
}

#[derive(Debug, PartialEq)]
pub struct Gen4SPokemon {
    pub pid: u32,
    pub shiny: bool,
    pub ability: AbilityType,
    pub gender: Gender,
    pub ivs: Ivs,
    pub nature: Nature,
    pub advance: usize,
}

impl PkmState for Gen4SPokemon {
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

pub fn generate_gen4_static(rng: &mut Pokerng, settings: Gen4StaticOpts) -> Option<Gen4SPokemon> {
    let pid_low = rng.rand::<u16>() as u32;
    let pid_high = rng.rand::<u16>() as u32;
    let pid = (pid_high << 16) | pid_low;

    let iv1 = rng.rand::<u16>();
    let iv2 = rng.rand::<u16>();
    let ivs = Ivs::new_g3(iv1, iv2);

    let pkm = Gen4SPokemon {
        pid,
        shiny: gen3_shiny(pid, settings.tid, settings.sid),
        ability: AbilityType::from_gen3_pid(pid),
        gender: settings.encounter.species().gender_from_pid(pid),
        ivs,
        nature: Nature::from_pid(pid),
        advance: 0,
    };
    Some(pkm)
}

pub fn generate_gen4_static_k(rng: &mut Pokerng, settings: Gen4StaticOpts) -> Option<Gen4SPokemon> {
    if let Some(lead) = settings.lead {
        if lead == LeadAbilities::CutecharmF || lead == LeadAbilities::CutecharmM {
            let gender_threshold = settings.encounter.species().gender_ratio();
            let buffer = match settings.lead {
                Some(LeadAbilities::CutecharmF) => 25 * ((gender_threshold as u32 / 25) + 1),
                Some(LeadAbilities::CutecharmM) => 0,
                Some(LeadAbilities::Synchronize(_)) => 0,
                None => 0,
            };
            let target_gender = match settings.lead {
                Some(LeadAbilities::CutecharmF) => Gender::Male,
                Some(LeadAbilities::CutecharmM) => Gender::Female,
                _ => Gender::Genderless,
            };

            for _ in 0..3 {
                if rng.rand::<u16>() % 3 != 0 {
                    let nature = (rng.rand::<u16>() % 25) as u8;
                    let pid = buffer + nature as u32;
                    let gender = settings.encounter.species().gender_from_pid(pid);
                    if gender == target_gender {
                        let iv1 = rng.rand::<u16>();
                        let iv2 = rng.rand::<u16>();
                        let ivs = Ivs::new_g3(iv1, iv2);
                        let nature = Nature::from_pid(pid);

                        return Some(Gen4SPokemon {
                            pid,
                            shiny: gen3_shiny(pid, settings.tid, settings.sid),
                            ability: AbilityType::from_gen3_pid(pid),
                            gender,
                            ivs,
                            nature,
                            advance: 0,
                        });
                    };
                }
                break;
            }
        }
    }
    if let Some(LeadAbilities::Synchronize(nature)) = settings.lead {
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
            return Some(Gen4SPokemon {
                pid,
                shiny: gen3_shiny(pid, settings.tid, settings.sid),
                ability: AbilityType::from_gen3_pid(pid),
                gender: settings.encounter.species().gender_from_pid(pid),
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
    let gender = settings.encounter.species().gender_from_pid(pid);
    let nature = Nature::from_pid(pid);

    let pkm = Gen4SPokemon {
        pid,
        shiny: gen3_shiny(pid, settings.tid, settings.sid),
        ability: AbilityType::from_gen3_pid(pid),
        gender,
        ivs,
        nature,
        advance: 0,
    };
    Some(pkm)
}

pub fn generate_gen4_static_j(rng: &mut Pokerng, settings: Gen4StaticOpts) -> Option<Gen4SPokemon> {
    if let Some(lead) = settings.lead {
        if lead == LeadAbilities::CutecharmF || lead == LeadAbilities::CutecharmM {
            let gender_threshold = settings.encounter.species().gender_ratio();
            let buffer = match settings.lead {
                Some(LeadAbilities::CutecharmF) => 25 * ((gender_threshold as u32 / 25) + 1),
                Some(LeadAbilities::CutecharmM) => 0,
                Some(LeadAbilities::Synchronize(_)) => 0,
                None => 0,
            };
            let target_gender = match settings.lead {
                Some(LeadAbilities::CutecharmF) => Gender::Male,
                Some(LeadAbilities::CutecharmM) => Gender::Female,
                _ => Gender::Genderless,
            };

            for _ in 0..3 {
                if rng.rand::<u16>() % 3 != 0 {
                    let nature = (rng.rand::<u16>() / 0xa3e) as u8;
                    let pid = buffer + nature as u32;
                    let gender = settings.encounter.species().gender_from_pid(pid);
                    if gender == target_gender {
                        let iv1 = rng.rand::<u16>();
                        let iv2 = rng.rand::<u16>();
                        let ivs = Ivs::new_g3(iv1, iv2);
                        let nature = Nature::from_pid(pid);

                        return Some(Gen4SPokemon {
                            pid,
                            shiny: gen3_shiny(pid, settings.tid, settings.sid),
                            ability: AbilityType::from_gen3_pid(pid),
                            gender,
                            ivs,
                            nature,
                            advance: 0,
                        });
                    };
                }
                break;
            }
        }
    }
    if let Some(LeadAbilities::Synchronize(nature)) = settings.lead {
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
            return Some(Gen4SPokemon {
                pid,
                shiny: gen3_shiny(pid, settings.tid, settings.sid),
                ability: AbilityType::from_gen3_pid(pid),
                gender: settings.encounter.species().gender_from_pid(pid),
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

    let pkm = Gen4SPokemon {
        pid,
        shiny: gen3_shiny(pid, settings.tid, settings.sid),
        ability: AbilityType::from_gen3_pid(pid),
        gender: settings.encounter.species().gender_from_pid(pid),
        ivs,
        nature: Nature::from_pid(pid),
        advance: 0,
    };
    Some(pkm)
}

pub fn generate_4statics(settings: Gen4StaticOpts, rng: &mut Pokerng) -> Option<Gen4SPokemon> {
    let encounter = settings.encounter.clone();
    let species = encounter.species();
    match settings.game {
        Some(GameVersion::Diamond) | Some(GameVersion::Pearl) | Some(GameVersion::Platinum) => {
            if dpt_method_jk(species) {
                generate_gen4_static_j(rng, settings)
            } else {
                generate_gen4_static(rng, settings)
            }
        }
        Some(GameVersion::HeartGold) | Some(GameVersion::SoulSilver) => {
            if hgss_method_jk(species) {
                generate_gen4_static_k(rng, settings)
            } else {
                generate_gen4_static(rng, settings)
            }
        }
        _ => generate_gen4_static(rng, settings),
    }
}

pub fn filter_4static(settings: Gen4StaticOpts, seed: u32) -> Vec<Gen4SPokemon> {
    let base_rng = Pokerng::new(seed);
    StateIterator::new(base_rng)
        .enumerate()
        .skip(settings.initial_advances)
        .take(settings.max_advances.wrapping_add(1))
        .filter_map(|(adv, mut rng)| {
            let mut pkm = generate_4statics(settings.clone(), &mut rng)?;
            pkm.advance = adv;

            if settings.filter.pass_filter(&pkm) {
                Some(pkm)
            } else {
                None
            }
        })
        .collect::<Vec<Gen4SPokemon>>()
}

#[cfg(test)]
mod test {

    use crate::assert_list_eq;

    use super::*;

    #[test]
    fn method_1() {
        let seed = 0;
        let options = Gen4StaticOpts {
            tid: 12345,
            sid: 54321,
            initial_advances: 0,
            max_advances: 10,
            encounter: StaticEncounterId::Turtwig,
            game: Some(GameVersion::Platinum),
            lead: None,
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
            Gen4SPokemon {
                pid: 3917348864,
                shiny: false,
                ability: AbilityType::First,
                gender: Gender::Female,
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
            Gen4SPokemon {
                pid: 1383197054,
                shiny: false,
                ability: AbilityType::First,
                gender: Gender::Male,
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
            Gen4SPokemon {
                pid: 833639025,
                shiny: false,
                ability: AbilityType::Second,
                gender: Gender::Male,
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
            Gen4SPokemon {
                pid: 2386702768,
                shiny: false,
                ability: AbilityType::First,
                gender: Gender::Male,
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
            Gen4SPokemon {
                pid: 3805056578,
                shiny: false,
                ability: AbilityType::First,
                gender: Gender::Male,
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
            Gen4SPokemon {
                pid: 2948981452,
                shiny: false,
                ability: AbilityType::First,
                gender: Gender::Male,
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
            Gen4SPokemon {
                pid: 1742450629,
                shiny: false,
                ability: AbilityType::Second,
                gender: Gender::Male,
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
            Gen4SPokemon {
                pid: 4231227355,
                shiny: false,
                ability: AbilityType::Second,
                gender: Gender::Male,
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
            Gen4SPokemon {
                pid: 4012702771,
                shiny: false,
                ability: AbilityType::Second,
                gender: Gender::Male,
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
            Gen4SPokemon {
                pid: 4234080044,
                shiny: false,
                ability: AbilityType::First,
                gender: Gender::Male,
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
            Gen4SPokemon {
                pid: 3401972830,
                shiny: false,
                ability: AbilityType::First,
                gender: Gender::Male,
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
        let result = filter_4static(options, seed);
        assert_list_eq!(result, expected_results);
    }
    #[test]
    fn method_k_nosynch() {
        let seed = 0;
        let options = Gen4StaticOpts {
            tid: 12345,
            sid: 54321,
            initial_advances: 0,
            max_advances: 10,
            encounter: StaticEncounterId::Dialga,
            game: Some(GameVersion::Platinum),
            lead: None,
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
            Gen4SPokemon {
                pid: 3552946825,
                shiny: false,
                ability: AbilityType::Second,
                gender: Gender::Genderless,
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
            Gen4SPokemon {
                pid: 3360178372,
                shiny: false,
                ability: AbilityType::First,
                gender: Gender::Genderless,
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
            Gen4SPokemon {
                pid: 3080890308,
                shiny: false,
                ability: AbilityType::First,
                gender: Gender::Genderless,
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
            Gen4SPokemon {
                pid: 1742450629,
                shiny: false,
                ability: AbilityType::Second,
                gender: Gender::Genderless,
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
            Gen4SPokemon {
                pid: 3754258538,
                shiny: false,
                ability: AbilityType::First,
                gender: Gender::Genderless,
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
            Gen4SPokemon {
                pid: 3360178372,
                shiny: false,
                ability: AbilityType::First,
                gender: Gender::Genderless,
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
            Gen4SPokemon {
                pid: 840124667,
                shiny: false,
                ability: AbilityType::Second,
                gender: Gender::Genderless,
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
            Gen4SPokemon {
                pid: 2902820410,
                shiny: false,
                ability: AbilityType::First,
                gender: Gender::Genderless,
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
            Gen4SPokemon {
                pid: 2059180349,
                shiny: false,
                ability: AbilityType::Second,
                gender: Gender::Genderless,
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
            Gen4SPokemon {
                pid: 1096857248,
                shiny: false,
                ability: AbilityType::First,
                gender: Gender::Genderless,
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
            Gen4SPokemon {
                pid: 2059180349,
                shiny: false,
                ability: AbilityType::Second,
                gender: Gender::Genderless,
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
        let result = filter_4static(options, seed);
        assert_list_eq!(result, expected_results);
    }

    #[test]
    fn method_j_nosynch() {
        let seed = 0;
        let options = Gen4StaticOpts {
            tid: 12345,
            sid: 54321,
            initial_advances: 0,
            max_advances: 10,
            encounter: StaticEncounterId::HoOh,
            game: Some(GameVersion::HeartGold),
            lead: None,
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
            Gen4SPokemon {
                pid: 3552946825,
                shiny: false,
                ability: AbilityType::Second,
                gender: Gender::Genderless,
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
            Gen4SPokemon {
                pid: 813709149,
                shiny: false,
                ability: AbilityType::Second,
                gender: Gender::Genderless,
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
            Gen4SPokemon {
                pid: 4231227355,
                shiny: false,
                ability: AbilityType::Second,
                gender: Gender::Genderless,
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
            Gen4SPokemon {
                pid: 1621222420,
                shiny: false,
                ability: AbilityType::First,
                gender: Gender::Genderless,
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
            Gen4SPokemon {
                pid: 1671314793,
                shiny: false,
                ability: AbilityType::Second,
                gender: Gender::Genderless,
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
            Gen4SPokemon {
                pid: 2902820410,
                shiny: false,
                ability: AbilityType::First,
                gender: Gender::Genderless,
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
            Gen4SPokemon {
                pid: 2489114822,
                shiny: false,
                ability: AbilityType::First,
                gender: Gender::Genderless,
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
            Gen4SPokemon {
                pid: 2440584662,
                shiny: false,
                ability: AbilityType::First,
                gender: Gender::Genderless,
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
            Gen4SPokemon {
                pid: 3754258538,
                shiny: false,
                ability: AbilityType::First,
                gender: Gender::Genderless,
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
            Gen4SPokemon {
                pid: 1636640678,
                shiny: false,
                ability: AbilityType::First,
                gender: Gender::Genderless,
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
            Gen4SPokemon {
                pid: 378691981,
                shiny: false,
                ability: AbilityType::Second,
                gender: Gender::Genderless,
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
        let result = filter_4static(options, seed);
        assert_list_eq!(result, expected_results);
    }
    #[cfg(test)]
    mod synch {

        use super::*;

        #[test]
        fn method_j() {
            let seed = 0;
            let options = Gen4StaticOpts {
                tid: 12345,
                sid: 54321,
                initial_advances: 0,
                max_advances: 10,
                encounter: StaticEncounterId::HoOh,
                game: Some(GameVersion::HeartGold),
                lead: Some(LeadAbilities::Synchronize(Nature::Adamant)),
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
                Gen4SPokemon {
                    pid: 475834453,
                    shiny: false,
                    ability: AbilityType::Second,
                    gender: Gender::Genderless,
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
                Gen4SPokemon {
                    pid: 3805056578,
                    shiny: false,
                    ability: AbilityType::First,
                    gender: Gender::Genderless,
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
                Gen4SPokemon {
                    pid: 1621222420,
                    shiny: false,
                    ability: AbilityType::First,
                    gender: Gender::Genderless,
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
                Gen4SPokemon {
                    pid: 3805056578,
                    shiny: false,
                    ability: AbilityType::First,
                    gender: Gender::Genderless,
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
                Gen4SPokemon {
                    pid: 475834453,
                    shiny: false,
                    ability: AbilityType::Second,
                    gender: Gender::Genderless,
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
                Gen4SPokemon {
                    pid: 1636640678,
                    shiny: false,
                    ability: AbilityType::First,
                    gender: Gender::Genderless,
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
                Gen4SPokemon {
                    pid: 2440584662,
                    shiny: false,
                    ability: AbilityType::First,
                    gender: Gender::Genderless,
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
                Gen4SPokemon {
                    pid: 3754258538,
                    shiny: false,
                    ability: AbilityType::First,
                    gender: Gender::Genderless,
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
                Gen4SPokemon {
                    pid: 1636640678,
                    shiny: false,
                    ability: AbilityType::First,
                    gender: Gender::Genderless,
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
                Gen4SPokemon {
                    pid: 1636640678,
                    shiny: false,
                    ability: AbilityType::First,
                    gender: Gender::Genderless,
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
                Gen4SPokemon {
                    pid: 475834453,
                    shiny: false,
                    ability: AbilityType::Second,
                    gender: Gender::Genderless,
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
            let result = filter_4static(options, seed);
            assert_list_eq!(result, expected_results);
        }
        #[test]
        fn method_k() {
            let seed = 0;
            let options = Gen4StaticOpts {
                tid: 12345,
                sid: 54321,
                initial_advances: 0,
                max_advances: 10,
                encounter: StaticEncounterId::Dialga,
                game: Some(GameVersion::Platinum),
                lead: Some(LeadAbilities::Synchronize(Nature::Adamant)),
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
                Gen4SPokemon {
                    pid: 475834453,
                    shiny: false,
                    ability: AbilityType::Second,
                    gender: Gender::Genderless,
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
                Gen4SPokemon {
                    pid: 3080890308,
                    shiny: false,
                    ability: AbilityType::First,
                    gender: Gender::Genderless,
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
                Gen4SPokemon {
                    pid: 475834453,
                    shiny: false,
                    ability: AbilityType::Second,
                    gender: Gender::Genderless,
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
                Gen4SPokemon {
                    pid: 3805056578,
                    shiny: false,
                    ability: AbilityType::First,
                    gender: Gender::Genderless,
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
                Gen4SPokemon {
                    pid: 3360178372,
                    shiny: false,
                    ability: AbilityType::First,
                    gender: Gender::Genderless,
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
                Gen4SPokemon {
                    pid: 840124667,
                    shiny: false,
                    ability: AbilityType::Second,
                    gender: Gender::Genderless,
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
                Gen4SPokemon {
                    pid: 2902820410,
                    shiny: false,
                    ability: AbilityType::First,
                    gender: Gender::Genderless,
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
                Gen4SPokemon {
                    pid: 1636640678,
                    shiny: false,
                    ability: AbilityType::First,
                    gender: Gender::Genderless,
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
                Gen4SPokemon {
                    pid: 1096857248,
                    shiny: false,
                    ability: AbilityType::First,
                    gender: Gender::Genderless,
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
                Gen4SPokemon {
                    pid: 2059180349,
                    shiny: false,
                    ability: AbilityType::Second,
                    gender: Gender::Genderless,
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
                Gen4SPokemon {
                    pid: 3954154919,
                    shiny: false,
                    ability: AbilityType::Second,
                    gender: Gender::Genderless,
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
            let result = filter_4static(options, seed);
            assert_list_eq!(result, expected_results);
        }
    }
    mod cutiech {

        use super::*;

        #[test]
        fn method_j_cc() {
            let seed = 0;
            let options = Gen4StaticOpts {
                tid: 12345,
                sid: 54321,
                initial_advances: 0,
                max_advances: 10,
                encounter: StaticEncounterId::Snorlax,
                game: Some(GameVersion::HeartGold),
                lead: Some(LeadAbilities::CutecharmM),
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
                Gen4SPokemon {
                    pid: 813709149,
                    shiny: false,
                    ability: AbilityType::Second,
                    gender: Gender::Male,
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
                Gen4SPokemon {
                    pid: 5,
                    shiny: false,
                    ability: AbilityType::Second,
                    gender: Gender::Female,
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
                Gen4SPokemon {
                    pid: 1621222420,
                    shiny: false,
                    ability: AbilityType::First,
                    gender: Gender::Female,
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
                Gen4SPokemon {
                    pid: 1671314793,
                    shiny: false,
                    ability: AbilityType::Second,
                    gender: Gender::Male,
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
                Gen4SPokemon {
                    pid: 10,
                    shiny: false,
                    ability: AbilityType::First,
                    gender: Gender::Female,
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
                Gen4SPokemon {
                    pid: 22,
                    shiny: false,
                    ability: AbilityType::First,
                    gender: Gender::Female,
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
                Gen4SPokemon {
                    pid: 2440584662,
                    shiny: false,
                    ability: AbilityType::First,
                    gender: Gender::Male,
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
                Gen4SPokemon {
                    pid: 13,
                    shiny: false,
                    ability: AbilityType::Second,
                    gender: Gender::Female,
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
                Gen4SPokemon {
                    pid: 1636640678,
                    shiny: false,
                    ability: AbilityType::First,
                    gender: Gender::Male,
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
                Gen4SPokemon {
                    pid: 6,
                    shiny: false,
                    ability: AbilityType::First,
                    gender: Gender::Female,
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
                Gen4SPokemon {
                    pid: 9,
                    shiny: false,
                    ability: AbilityType::Second,
                    gender: Gender::Female,
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
            let result = filter_4static(options, seed);
            assert_list_eq!(result, expected_results);
        }
        #[test]
        fn method_k_cc() {
            let seed = 0;
            let options = Gen4StaticOpts {
                tid: 12345,
                sid: 54321,
                initial_advances: 0,
                max_advances: 10,
                encounter: StaticEncounterId::Drifloon,
                game: Some(GameVersion::Platinum),
                lead: Some(LeadAbilities::CutecharmM),
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
                Gen4SPokemon {
                    pid: 3360178372,
                    shiny: false,
                    ability: AbilityType::First,
                    gender: Gender::Male,
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
                Gen4SPokemon {
                    pid: 8,
                    shiny: false,
                    ability: AbilityType::First,
                    gender: Gender::Female,
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
                Gen4SPokemon {
                    pid: 1742450629,
                    shiny: false,
                    ability: AbilityType::Second,
                    gender: Gender::Male,
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
                Gen4SPokemon {
                    pid: 3754258538,
                    shiny: false,
                    ability: AbilityType::First,
                    gender: Gender::Female,
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
                Gen4SPokemon {
                    pid: 22,
                    shiny: false,
                    ability: AbilityType::First,
                    gender: Gender::Female,
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
                Gen4SPokemon {
                    pid: 17,
                    shiny: false,
                    ability: AbilityType::Second,
                    gender: Gender::Female,
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
                Gen4SPokemon {
                    pid: 2902820410,
                    shiny: false,
                    ability: AbilityType::First,
                    gender: Gender::Female,
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
                Gen4SPokemon {
                    pid: 24,
                    shiny: false,
                    ability: AbilityType::First,
                    gender: Gender::Female,
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
                Gen4SPokemon {
                    pid: 1096857248,
                    shiny: false,
                    ability: AbilityType::First,
                    gender: Gender::Male,
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
                Gen4SPokemon {
                    pid: 24,
                    shiny: false,
                    ability: AbilityType::First,
                    gender: Gender::Female,
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
                Gen4SPokemon {
                    pid: 19,
                    shiny: false,
                    ability: AbilityType::Second,
                    gender: Gender::Female,
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
            let result = filter_4static(options, seed);
            assert_list_eq!(result, expected_results);
        }
    }
}
