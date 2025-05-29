use crate::GenderRatio;
use crate::Ivs;
use crate::Species;
use crate::gen3::EncounterSlot;
use crate::gen4::GameVersion;
use crate::gen4::LeadAbilities;
use crate::rng::Rng;
use crate::rng::StateIterator;
use crate::rng::lcrng::Pokerng;
use crate::{AbilityType, Gender, Nature, PkmFilter, PkmState, gen3_shiny};

#[derive(Debug, PartialEq, Clone)]
pub struct Gen4SWildOpts {
    pub tid: u16,
    pub sid: u16,
    pub initial_advances: usize,
    pub max_advances: usize,
    pub gender_ratio: GenderRatio,
    pub filter: PkmFilter,
    pub game: Option<GameVersion>,
    pub encounter: Option<Vec<EncounterSlot>>,
    pub lead: Option<LeadAbilities>,
}

#[derive(Debug, PartialEq)]
pub struct GeneratedPokemon {
    pub pid: u32,
    pub shiny: bool,
    pub ability: AbilityType,
    pub gender: Gender,
    pub ivs: Ivs,
    pub nature: Nature,
    pub advance: usize,
    pub encounter_slot: EncounterSlot,
}

impl PkmState for GeneratedPokemon {
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

pub struct RouteData {
    pub route_id: usize,
    pub encounter_type: EncounterType,
    pub encounter_slots: Vec<EncounterslotIDs>,
}
impl RouteData {
    pub fn get_slot(&self, slot_id: u8) -> Option<&EncounterslotIDs> {
        self.encounter_slots
            .iter()
            .find(|slot| slot.slot_id == slot_id)
    }
}
#[derive(Debug, Clone, PartialEq)]
pub struct EncounterslotIDs {
    pub slot_id: u8,
    pub pokemon_id: Species,
    pub min_level: u8,
    pub max_level: u8,
}
#[derive(Debug, Clone, PartialEq)]
pub enum EncounterType {
    Grass,
    Cave,
    Surf,
    OldRod,
    GoodRod,
    SuperRod,
}

pub fn gen4_method_j(
    rng: &mut Pokerng,
    settings: &Gen4SWildOpts,
    route: &RouteData,
) -> Option<GeneratedPokemon> {
    let encounter_rand = ((rng.rand::<u32>() >> 16) % 100) as u8;
    let encounter_slot = EncounterSlot::from_rand(encounter_rand);
    let slot = route.get_slot(encounter_slot.slot_id())?;

    if let Some(lead) = settings.lead {
        if lead == LeadAbilities::CutecharmF || lead == LeadAbilities::CutecharmM {
            let gender_threshold = slot.pokemon_id.gender_ratio();
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
                    let gender = slot.pokemon_id.gender_from_pid(pid);
                    if gender == target_gender {
                        let iv1 = rng.rand::<u16>();
                        let iv2 = rng.rand::<u16>();
                        let ivs = Ivs::new_g3(iv1, iv2);
                        let nature = Nature::from_pid(pid);

                        return Some(GeneratedPokemon {
                            pid,
                            shiny: gen3_shiny(pid, settings.tid, settings.sid),
                            ability: AbilityType::from_gen3_pid(pid),
                            gender,
                            ivs,
                            nature,
                            encounter_slot,
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
            return Some(GeneratedPokemon {
                pid,
                shiny: gen3_shiny(pid, settings.tid, settings.sid),
                ability: AbilityType::from_gen3_pid(pid),
                gender: slot.pokemon_id.gender_from_pid(pid),
                ivs,
                nature: Nature::from_pid(pid),
                encounter_slot,
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

    let pkm = GeneratedPokemon {
        pid,
        shiny: gen3_shiny(pid, settings.tid, settings.sid),
        ability: AbilityType::from_gen3_pid(pid),
        gender: slot.pokemon_id.gender_from_pid(pid),
        encounter_slot,
        ivs,
        nature: Nature::from_pid(pid),
        advance: 0,
    };
    Some(pkm)
}

pub fn gen4_method_k(
    rng: &mut Pokerng,
    settings: &Gen4SWildOpts,
    route: &RouteData,
) -> Option<GeneratedPokemon> {
    let encounter_rand = ((rng.rand::<u32>() >> 16) % 100) as u8;
    let encounter_slot = EncounterSlot::from_rand(encounter_rand);
    let slot = route.get_slot(encounter_slot.slot_id())?;

    if let Some(lead) = settings.lead {
        if lead == LeadAbilities::CutecharmF || lead == LeadAbilities::CutecharmM {
            let gender_threshold = slot.pokemon_id.gender_ratio();
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
                    let gender = slot.pokemon_id.gender_from_pid(pid);
                    if gender == target_gender {
                        let iv1 = rng.rand::<u16>();
                        let iv2 = rng.rand::<u16>();
                        let ivs = Ivs::new_g3(iv1, iv2);
                        let nature = Nature::from_pid(pid);

                        return Some(GeneratedPokemon {
                            pid,
                            shiny: gen3_shiny(pid, settings.tid, settings.sid),
                            ability: AbilityType::from_gen3_pid(pid),
                            gender,
                            ivs,
                            nature,
                            encounter_slot,
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
            return Some(GeneratedPokemon {
                pid,
                shiny: gen3_shiny(pid, settings.tid, settings.sid),
                ability: AbilityType::from_gen3_pid(pid),
                gender: slot.pokemon_id.gender_from_pid(pid),
                ivs,
                nature: Nature::from_pid(pid),
                encounter_slot,
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

    let pkm = GeneratedPokemon {
        pid,
        shiny: gen3_shiny(pid, settings.tid, settings.sid),
        ability: AbilityType::from_gen3_pid(pid),
        gender: slot.pokemon_id.gender_from_pid(pid),
        encounter_slot,
        ivs,
        nature: Nature::from_pid(pid),
        advance: 0,
    };
    Some(pkm)
}

pub fn generate_4wild(
    rng: &mut Pokerng,
    settings: &Gen4SWildOpts,
    route: &RouteData,
) -> Option<GeneratedPokemon> {
    match settings.game {
        Some(GameVersion::Diamond) | Some(GameVersion::Pearl) | Some(GameVersion::Platinum) => {
            gen4_method_j(rng, settings, route)
        }
        Some(GameVersion::HeartGold) | Some(GameVersion::SoulSilver) => {
            gen4_method_k(rng, settings, route)
        }
        None => unreachable!("Game version should be set before calling generate_4wild"),
    }
}

pub fn filter_4swild(
    settings: &Gen4SWildOpts,
    seed: u32,
    route: &RouteData,
) -> Vec<GeneratedPokemon> {
    let base_rng = Pokerng::new(seed);
    StateIterator::new(base_rng)
        .enumerate()
        .skip(settings.initial_advances)
        .take(settings.max_advances.wrapping_add(1))
        .filter_map(|(adv, mut rng)| {
            let mut pkm = generate_4wild(&mut rng, &settings.clone(), route)?;
            pkm.advance = adv;

            if settings.filter.pass_filter(&pkm) {
                Some(pkm)
            } else {
                None
            }
        })
        .collect::<Vec<GeneratedPokemon>>()
}

#[cfg(test)]
mod test {

    use crate::assert_list_eq;

    use super::*;

    #[test]
    fn method_k() {
        let seed = 0;
        let route = RouteData {
            route_id: 201,
            encounter_type: EncounterType::Grass,
            encounter_slots: [
                EncounterslotIDs {
                    slot_id: 0,
                    pokemon_id: Species::Starly,
                    min_level: 2,
                    max_level: 3,
                },
                EncounterslotIDs {
                    slot_id: 1,
                    pokemon_id: Species::Bidoof,
                    min_level: 2,
                    max_level: 3,
                },
                EncounterslotIDs {
                    slot_id: 2,
                    pokemon_id: Species::Starly,
                    min_level: 2,
                    max_level: 3,
                },
                EncounterslotIDs {
                    slot_id: 3,
                    pokemon_id: Species::Bidoof,
                    min_level: 2,
                    max_level: 3,
                },
                EncounterslotIDs {
                    slot_id: 4,
                    pokemon_id: Species::Starly,
                    min_level: 2,
                    max_level: 3,
                },
                EncounterslotIDs {
                    slot_id: 5,
                    pokemon_id: Species::Bidoof,
                    min_level: 2,
                    max_level: 3,
                },
                EncounterslotIDs {
                    slot_id: 6,
                    pokemon_id: Species::Starly,
                    min_level: 2,
                    max_level: 3,
                },
                EncounterslotIDs {
                    slot_id: 7,
                    pokemon_id: Species::Bidoof,
                    min_level: 2,
                    max_level: 3,
                },
                EncounterslotIDs {
                    slot_id: 8,
                    pokemon_id: Species::Starly,
                    min_level: 2,
                    max_level: 3,
                },
                EncounterslotIDs {
                    slot_id: 9,
                    pokemon_id: Species::Bidoof,
                    min_level: 2,
                    max_level: 3,
                },
                EncounterslotIDs {
                    slot_id: 10,
                    pokemon_id: Species::Starly,
                    min_level: 2,
                    max_level: 3,
                },
                EncounterslotIDs {
                    slot_id: 11,
                    pokemon_id: Species::Bidoof,
                    min_level: 2,
                    max_level: 3,
                },
            ]
            .to_vec(),
        };
        let options = Gen4SWildOpts {
            tid: 12345,
            sid: 54321,
            initial_advances: 0,
            max_advances: 10,
            gender_ratio: GenderRatio::OneToOne,
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
                ability: Some(AbilityType::First),
                stats: None,
            },
            game: Some(GameVersion::Pearl),
            encounter: None,
            lead: None,
        };
        let expected_results = [
            GeneratedPokemon {
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
                encounter_slot: EncounterSlot::Slot0,
            },
            GeneratedPokemon {
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
                encounter_slot: EncounterSlot::Slot0,
            },
            GeneratedPokemon {
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
                encounter_slot: EncounterSlot::Slot0,
            },
            GeneratedPokemon {
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
                encounter_slot: EncounterSlot::Slot0,
            },
            GeneratedPokemon {
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
                encounter_slot: EncounterSlot::Slot0,
            },
            GeneratedPokemon {
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
                encounter_slot: EncounterSlot::Slot0,
            },
            GeneratedPokemon {
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
                encounter_slot: EncounterSlot::Slot0,
            },
            GeneratedPokemon {
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
                encounter_slot: EncounterSlot::Slot0,
            },
            GeneratedPokemon {
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
                encounter_slot: EncounterSlot::Slot0,
            },
            GeneratedPokemon {
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
                encounter_slot: EncounterSlot::Slot0,
            },
            GeneratedPokemon {
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
                encounter_slot: EncounterSlot::Slot0,
            },
        ];

        let result = filter_4swild(&options, seed, &route);
        assert_eq!(result, expected_results);
    }
}
