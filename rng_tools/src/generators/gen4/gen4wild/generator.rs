use crate::EncounterSlot;
use crate::GenderRatio;
use crate::Ivs;
use crate::Species;
use crate::gen4::GameVersion;
use crate::gen4::LeadAbilities;
use crate::rng::Rng;
use crate::rng::StateIterator;
use crate::rng::lcrng::Pokerng;
use crate::{AbilityType, Gender, Nature, PkmFilter, PkmState, gen3_shiny};

#[derive(Debug, PartialEq, Clone)]
pub struct Gen4SearcherOpts {
    pub tid: u16,
    pub sid: u16,
    pub initial_advances: usize,
    pub max_advances: usize,
    pub gender_ratio: GenderRatio,
    pub filter: PkmFilter,
    pub game: GameVersion,
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
    pub encounter_slots: Vec<Encounter>,
}
impl RouteData {
    pub fn get_slot(&self, encounter_slot: EncounterSlot) -> Option<&Encounter> {
        self.encounter_slots
            .iter()
            .find(|slot| slot.slot == encounter_slot)
    }
}
#[derive(Debug, Clone, PartialEq)]
pub struct Encounter {
    pub slot: EncounterSlot,
    pub species: Species,
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

fn gen4_method_j(
    rng: &mut Pokerng,
    opts: &Gen4SearcherOpts,
    route: &RouteData,
) -> GeneratedPokemon {
    let encounter_rand = (rng.rand::<u16>() / 656) as u8;
    let encounter_slot = EncounterSlot::from_rand(encounter_rand);
    let slot = route.get_slot(encounter_slot);

    if let Some(lead) = opts.lead {
        if lead == LeadAbilities::CutecharmF || lead == LeadAbilities::CutecharmM {
            let gender_threshold = slot.unwrap().species.gender_ratio();
            let buffer = match opts.lead {
                Some(LeadAbilities::CutecharmF) => 25 * ((gender_threshold as u32 / 25) + 1),
                Some(LeadAbilities::CutecharmM) => 0,
                Some(LeadAbilities::Synchronize(_)) => 0,
                None => 0,
            };
            let target_gender = match opts.lead {
                Some(LeadAbilities::CutecharmF) => Gender::Male,
                Some(LeadAbilities::CutecharmM) => Gender::Female,
                _ => Gender::Genderless,
            };

            if rng.rand::<u16>() / 0x5556 != 0 {
                let nature = (rng.rand::<u16>() / 0xa3e) as u8;
                let pid = buffer + nature as u32;
                let gender = slot.unwrap().species.gender_from_pid(pid);
                if gender == target_gender {
                    let iv1 = rng.rand::<u16>();
                    let iv2 = rng.rand::<u16>();
                    let ivs = Ivs::new_g3(iv1, iv2);
                    let nature = Nature::from_pid(pid);

                    return GeneratedPokemon {
                        pid,
                        shiny: gen3_shiny(pid, opts.tid, opts.sid),
                        ability: AbilityType::from_gen3_pid(pid),
                        gender,
                        ivs,
                        nature,
                        encounter_slot,
                        advance: 0,
                    };
                };
            }
        }
    }
    if let Some(LeadAbilities::Synchronize(nature)) = opts.lead {
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
            return GeneratedPokemon {
                pid,
                shiny: gen3_shiny(pid, opts.tid, opts.sid),
                ability: AbilityType::from_gen3_pid(pid),
                gender: slot.unwrap().species.gender_from_pid(pid),
                ivs,
                nature: Nature::from_pid(pid),
                encounter_slot,
                advance: 0,
            };
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

    GeneratedPokemon {
        pid,
        shiny: gen3_shiny(pid, opts.tid, opts.sid),
        ability: AbilityType::from_gen3_pid(pid),
        gender: slot.unwrap().species.gender_from_pid(pid),
        encounter_slot,
        ivs,
        nature: Nature::from_pid(pid),
        advance: 0,
    }
}

fn gen4_method_k(
    rng: &mut Pokerng,
    opts: &Gen4SearcherOpts,
    route: &RouteData,
) -> GeneratedPokemon {
    let encounter_rand = (rng.rand::<u16>() % 100) as u8;
    let encounter_slot = EncounterSlot::from_rand(encounter_rand);
    let slot = route.get_slot(encounter_slot);

    if let Some(lead) = opts.lead {
        if lead == LeadAbilities::CutecharmF || lead == LeadAbilities::CutecharmM {
            let gender_threshold = slot.unwrap().species.gender_ratio();
            let buffer = match opts.lead {
                Some(LeadAbilities::CutecharmF) => 25 * ((gender_threshold as u32 / 25) + 1),
                Some(LeadAbilities::CutecharmM) => 0,
                Some(LeadAbilities::Synchronize(_)) => 0,
                None => 0,
            };
            let target_gender = match opts.lead {
                Some(LeadAbilities::CutecharmF) => Gender::Male,
                Some(LeadAbilities::CutecharmM) => Gender::Female,
                _ => Gender::Genderless,
            };
            if rng.rand::<u16>() % 3 != 0 {
                let nature = (rng.rand::<u16>() % 25) as u8;
                let pid = buffer + nature as u32;
                let gender = slot.unwrap().species.gender_from_pid(pid);
                if gender == target_gender {
                    let iv1 = rng.rand::<u16>();
                    let iv2 = rng.rand::<u16>();
                    let ivs = Ivs::new_g3(iv1, iv2);
                    let nature = Nature::from_pid(pid);

                    return GeneratedPokemon {
                        pid,
                        shiny: gen3_shiny(pid, opts.tid, opts.sid),
                        ability: AbilityType::from_gen3_pid(pid),
                        gender,
                        ivs,
                        nature,
                        encounter_slot,
                        advance: 0,
                    };
                };
            }
        }
    }
    if let Some(LeadAbilities::Synchronize(nature)) = opts.lead {
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
            return GeneratedPokemon {
                pid,
                shiny: gen3_shiny(pid, opts.tid, opts.sid),
                ability: AbilityType::from_gen3_pid(pid),
                gender: slot.unwrap().species.gender_from_pid(pid),
                ivs,
                nature: Nature::from_pid(pid),
                encounter_slot,
                advance: 0,
            };
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

    GeneratedPokemon {
        pid,
        shiny: gen3_shiny(pid, opts.tid, opts.sid),
        ability: AbilityType::from_gen3_pid(pid),
        gender: slot.unwrap().species.gender_from_pid(pid),
        encounter_slot,
        ivs,
        nature: Nature::from_pid(pid),
        advance: 0,
    }
}

fn generate_wild4(
    rng: &mut Pokerng,
    opts: &Gen4SearcherOpts,
    route: &RouteData,
) -> GeneratedPokemon {
    match opts.game {
        GameVersion::Diamond | GameVersion::Pearl | GameVersion::Platinum => {
            gen4_method_j(rng, opts, route)
        }
        GameVersion::HeartGold | GameVersion::SoulSilver => gen4_method_k(rng, opts, route),
    }
}

pub fn search_wild4(
    opts: &Gen4SearcherOpts,
    seed: u32,
    route: &RouteData,
) -> Vec<GeneratedPokemon> {
    let base_rng = Pokerng::new(seed);
    StateIterator::new(base_rng)
        .enumerate()
        .skip(opts.initial_advances)
        .take(opts.max_advances.wrapping_add(1))
        .filter_map(|(adv, mut rng)| {
            let mut pkm = generate_wild4(&mut rng, &opts.clone(), route);
            pkm.advance = adv;

            if opts.filter.pass_filter(&pkm) {
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
    fn method_j() {
        let seed = 0;
        let route = RouteData {
            route_id: 201,
            encounter_type: EncounterType::Grass,
            encounter_slots: [
                Encounter {
                    slot: EncounterSlot::Slot0,
                    species: Species::Starly,
                    min_level: 2,
                    max_level: 3,
                },
                Encounter {
                    slot: EncounterSlot::Slot1,
                    species: Species::Bidoof,
                    min_level: 2,
                    max_level: 3,
                },
                Encounter {
                    slot: EncounterSlot::Slot2,
                    species: Species::Starly,
                    min_level: 2,
                    max_level: 3,
                },
                Encounter {
                    slot: EncounterSlot::Slot3,
                    species: Species::Bidoof,
                    min_level: 2,
                    max_level: 3,
                },
                Encounter {
                    slot: EncounterSlot::Slot4,
                    species: Species::Starly,
                    min_level: 2,
                    max_level: 3,
                },
                Encounter {
                    slot: EncounterSlot::Slot5,
                    species: Species::Bidoof,
                    min_level: 2,
                    max_level: 3,
                },
                Encounter {
                    slot: EncounterSlot::Slot6,
                    species: Species::Starly,
                    min_level: 2,
                    max_level: 3,
                },
                Encounter {
                    slot: EncounterSlot::Slot7,
                    species: Species::Bidoof,
                    min_level: 2,
                    max_level: 3,
                },
                Encounter {
                    slot: EncounterSlot::Slot8,
                    species: Species::Starly,
                    min_level: 2,
                    max_level: 3,
                },
                Encounter {
                    slot: EncounterSlot::Slot9,
                    species: Species::Bidoof,
                    min_level: 2,
                    max_level: 3,
                },
                Encounter {
                    slot: EncounterSlot::Slot10,
                    species: Species::Starly,
                    min_level: 2,
                    max_level: 3,
                },
                Encounter {
                    slot: EncounterSlot::Slot11,
                    species: Species::Bidoof,
                    min_level: 2,
                    max_level: 3,
                },
            ]
            .to_vec(),
        };
        let options = Gen4SearcherOpts {
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
                ability: None,
                stats: None,
            },
            game: GameVersion::Pearl,
            encounter: None,
            lead: None,
        };
        let expected_results = [
            GeneratedPokemon {
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
                encounter_slot: EncounterSlot::Slot0,
            },
            GeneratedPokemon {
                pid: 3080890308,
                shiny: false,
                ability: AbilityType::First,
                gender: Gender::Male,
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
                encounter_slot: EncounterSlot::Slot8,
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
                advance: 2,
                encounter_slot: EncounterSlot::Slot1,
            },
            GeneratedPokemon {
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
                encounter_slot: EncounterSlot::Slot0,
            },
            GeneratedPokemon {
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
                advance: 4,
                encounter_slot: EncounterSlot::Slot3,
            },
            GeneratedPokemon {
                pid: 840124667,
                shiny: false,
                ability: AbilityType::Second,
                gender: Gender::Male,
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
                encounter_slot: EncounterSlot::Slot7,
            },
            GeneratedPokemon {
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
                encounter_slot: EncounterSlot::Slot4,
            },
            GeneratedPokemon {
                pid: 2059180349,
                shiny: false,
                ability: AbilityType::Second,
                gender: Gender::Female,
                ivs: Ivs {
                    hp: 7,
                    atk: 29,
                    def: 18,
                    spa: 14,
                    spd: 23,
                    spe: 22,
                },
                nature: Nature::Quirky,
                advance: 7,
                encounter_slot: EncounterSlot::Slot2,
            },
            GeneratedPokemon {
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
                encounter_slot: EncounterSlot::Slot10,
            },
            GeneratedPokemon {
                pid: 2059180349,
                shiny: false,
                ability: AbilityType::Second,
                gender: Gender::Female,
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
                encounter_slot: EncounterSlot::Slot8,
            },
            GeneratedPokemon {
                pid: 3954154919,
                shiny: false,
                ability: AbilityType::Second,
                gender: Gender::Male,
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
                encounter_slot: EncounterSlot::Slot10,
            },
        ];
        let result = search_wild4(&options, seed, &route);
        assert_list_eq!(result, expected_results);
    }
    #[test]
    fn method_k() {
        let seed = 0;
        let route = RouteData {
            route_id: 29,
            encounter_type: EncounterType::Grass,
            encounter_slots: [
                Encounter {
                    slot: EncounterSlot::Slot0,
                    species: Species::Pidgey,
                    min_level: 2,
                    max_level: 3,
                },
                Encounter {
                    slot: EncounterSlot::Slot1,
                    species: Species::Sentret,
                    min_level: 2,
                    max_level: 3,
                },
                Encounter {
                    slot: EncounterSlot::Slot2,
                    species: Species::Pidgey,
                    min_level: 2,
                    max_level: 3,
                },
                Encounter {
                    slot: EncounterSlot::Slot3,
                    species: Species::Sentret,
                    min_level: 2,
                    max_level: 3,
                },
                Encounter {
                    slot: EncounterSlot::Slot4,
                    species: Species::Pidgey,
                    min_level: 2,
                    max_level: 3,
                },
                Encounter {
                    slot: EncounterSlot::Slot5,
                    species: Species::Pidgey,
                    min_level: 2,
                    max_level: 3,
                },
                Encounter {
                    slot: EncounterSlot::Slot6,
                    species: Species::Sentret,
                    min_level: 2,
                    max_level: 3,
                },
                Encounter {
                    slot: EncounterSlot::Slot7,
                    species: Species::Rattata,
                    min_level: 2,
                    max_level: 3,
                },
                Encounter {
                    slot: EncounterSlot::Slot8,
                    species: Species::Sentret,
                    min_level: 2,
                    max_level: 3,
                },
                Encounter {
                    slot: EncounterSlot::Slot9,
                    species: Species::Pidgey,
                    min_level: 2,
                    max_level: 3,
                },
                Encounter {
                    slot: EncounterSlot::Slot10,
                    species: Species::Sentret,
                    min_level: 2,
                    max_level: 3,
                },
                Encounter {
                    slot: EncounterSlot::Slot11,
                    species: Species::Pidgey,
                    min_level: 2,
                    max_level: 3,
                },
            ]
            .to_vec(),
        };

        let options = Gen4SearcherOpts {
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
                ability: None,
                stats: None,
            },
            game: GameVersion::HeartGold,
            encounter: None,
            lead: None,
        };
        let expected_results = [
            GeneratedPokemon {
                pid: 813709149,
                shiny: false,
                ability: AbilityType::Second,
                gender: Gender::Female,
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
                advance: 1,
                encounter_slot: EncounterSlot::Slot5,
            },
            GeneratedPokemon {
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
                encounter_slot: EncounterSlot::Slot0,
            },
            GeneratedPokemon {
                pid: 1671314793,
                shiny: false,
                ability: AbilityType::Second,
                gender: Gender::Female,
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
                encounter_slot: EncounterSlot::Slot1,
            },
            GeneratedPokemon {
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
                advance: 4,
                encounter_slot: EncounterSlot::Slot0,
            },
            GeneratedPokemon {
                pid: 2489114822,
                shiny: false,
                ability: AbilityType::First,
                gender: Gender::Male,
                ivs: Ivs {
                    hp: 27,
                    atk: 17,
                    def: 19,
                    spa: 18,
                    spd: 22,
                    spe: 31,
                },
                nature: Nature::Sassy,
                advance: 5,
                encounter_slot: EncounterSlot::Slot4,
            },
            GeneratedPokemon {
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
                encounter_slot: EncounterSlot::Slot9,
            },
            GeneratedPokemon {
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
                advance: 7,
                encounter_slot: EncounterSlot::Slot7,
            },
            GeneratedPokemon {
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
                encounter_slot: EncounterSlot::Slot4,
            },
            GeneratedPokemon {
                pid: 378691981,
                shiny: false,
                ability: AbilityType::Second,
                gender: Gender::Male,
                ivs: Ivs {
                    hp: 24,
                    atk: 29,
                    def: 19,
                    spa: 26,
                    spd: 13,
                    spe: 29,
                },
                nature: Nature::Docile,
                advance: 9,
                encounter_slot: EncounterSlot::Slot1,
            },
            GeneratedPokemon {
                pid: 1845697609,
                shiny: false,
                ability: AbilityType::Second,
                gender: Gender::Female,
                ivs: Ivs {
                    hp: 10,
                    atk: 13,
                    def: 12,
                    spa: 20,
                    spd: 10,
                    spe: 9,
                },
                nature: Nature::Lax,
                advance: 10,
                encounter_slot: EncounterSlot::Slot0,
            },
        ];

        let result = search_wild4(&options, seed, &route);
        assert_list_eq!(result, expected_results);
    }
    #[test]
    fn wild_k_cute() {
        let seed = 0;
        let route = RouteData {
            route_id: 29,
            encounter_type: EncounterType::Grass,
            encounter_slots: [
                Encounter {
                    slot: EncounterSlot::Slot0,
                    species: Species::Pidgey,
                    min_level: 2,
                    max_level: 3,
                },
                Encounter {
                    slot: EncounterSlot::Slot1,
                    species: Species::Sentret,
                    min_level: 2,
                    max_level: 3,
                },
                Encounter {
                    slot: EncounterSlot::Slot2,
                    species: Species::Pidgey,
                    min_level: 2,
                    max_level: 3,
                },
                Encounter {
                    slot: EncounterSlot::Slot3,
                    species: Species::Sentret,
                    min_level: 2,
                    max_level: 3,
                },
                Encounter {
                    slot: EncounterSlot::Slot4,
                    species: Species::Pidgey,
                    min_level: 2,
                    max_level: 3,
                },
                Encounter {
                    slot: EncounterSlot::Slot5,
                    species: Species::Pidgey,
                    min_level: 2,
                    max_level: 3,
                },
                Encounter {
                    slot: EncounterSlot::Slot6,
                    species: Species::Sentret,
                    min_level: 2,
                    max_level: 3,
                },
                Encounter {
                    slot: EncounterSlot::Slot7,
                    species: Species::Rattata,
                    min_level: 2,
                    max_level: 3,
                },
                Encounter {
                    slot: EncounterSlot::Slot8,
                    species: Species::Sentret,
                    min_level: 2,
                    max_level: 3,
                },
                Encounter {
                    slot: EncounterSlot::Slot9,
                    species: Species::Pidgey,
                    min_level: 2,
                    max_level: 3,
                },
                Encounter {
                    slot: EncounterSlot::Slot10,
                    species: Species::Sentret,
                    min_level: 2,
                    max_level: 3,
                },
                Encounter {
                    slot: EncounterSlot::Slot11,
                    species: Species::Pidgey,
                    min_level: 2,
                    max_level: 3,
                },
            ]
            .to_vec(),
        };

        let options = Gen4SearcherOpts {
            tid: 2010,
            sid: 2010,
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
                ability: None,
                stats: None,
            },
            game: GameVersion::HeartGold,
            encounter: None,
            lead: Some(LeadAbilities::CutecharmM),
        };
        let expected_results = [
            GeneratedPokemon {
                pid: 5,
                shiny: true,
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
                advance: 0,
                encounter_slot: EncounterSlot::Slot0,
            },
            GeneratedPokemon {
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
                advance: 1,
                encounter_slot: EncounterSlot::Slot5,
            },
            GeneratedPokemon {
                pid: 1671314793,
                shiny: false,
                ability: AbilityType::Second,
                gender: Gender::Female,
                ivs: Ivs {
                    hp: 9,
                    atk: 9,
                    def: 7,
                    spa: 20,
                    spd: 26,
                    spe: 13,
                },
                nature: Nature::Bashful,
                advance: 2,
                encounter_slot: EncounterSlot::Slot0,
            },
            GeneratedPokemon {
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
                advance: 3,
                encounter_slot: EncounterSlot::Slot1,
            },
            GeneratedPokemon {
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
                advance: 4,
                encounter_slot: EncounterSlot::Slot0,
            },
            GeneratedPokemon {
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
                advance: 5,
                encounter_slot: EncounterSlot::Slot4,
            },
            GeneratedPokemon {
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
                advance: 6,
                encounter_slot: EncounterSlot::Slot9,
            },
            GeneratedPokemon {
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
                advance: 7,
                encounter_slot: EncounterSlot::Slot7,
            },
            GeneratedPokemon {
                pid: 6,
                shiny: true,
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
                advance: 8,
                encounter_slot: EncounterSlot::Slot4,
            },
            GeneratedPokemon {
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
                advance: 9,
                encounter_slot: EncounterSlot::Slot1,
            },
            GeneratedPokemon {
                pid: 2059180349,
                shiny: false,
                ability: AbilityType::Second,
                gender: Gender::Female,
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
                encounter_slot: EncounterSlot::Slot0,
            },
        ];

        let result = search_wild4(&options, seed, &route);
        assert_list_eq!(result, expected_results);
    }
    #[test]
    fn wild_k_synch() {
        let seed = 0;
        let route = RouteData {
            route_id: 29,
            encounter_type: EncounterType::Grass,
            encounter_slots: [
                Encounter {
                    slot: EncounterSlot::Slot0,
                    species: Species::Pidgey,
                    min_level: 2,
                    max_level: 3,
                },
                Encounter {
                    slot: EncounterSlot::Slot1,
                    species: Species::Sentret,
                    min_level: 2,
                    max_level: 3,
                },
                Encounter {
                    slot: EncounterSlot::Slot2,
                    species: Species::Pidgey,
                    min_level: 2,
                    max_level: 3,
                },
                Encounter {
                    slot: EncounterSlot::Slot3,
                    species: Species::Sentret,
                    min_level: 2,
                    max_level: 3,
                },
                Encounter {
                    slot: EncounterSlot::Slot4,
                    species: Species::Pidgey,
                    min_level: 2,
                    max_level: 3,
                },
                Encounter {
                    slot: EncounterSlot::Slot5,
                    species: Species::Pidgey,
                    min_level: 2,
                    max_level: 3,
                },
                Encounter {
                    slot: EncounterSlot::Slot6,
                    species: Species::Sentret,
                    min_level: 2,
                    max_level: 3,
                },
                Encounter {
                    slot: EncounterSlot::Slot7,
                    species: Species::Rattata,
                    min_level: 2,
                    max_level: 3,
                },
                Encounter {
                    slot: EncounterSlot::Slot8,
                    species: Species::Sentret,
                    min_level: 2,
                    max_level: 3,
                },
                Encounter {
                    slot: EncounterSlot::Slot9,
                    species: Species::Pidgey,
                    min_level: 2,
                    max_level: 3,
                },
                Encounter {
                    slot: EncounterSlot::Slot10,
                    species: Species::Sentret,
                    min_level: 2,
                    max_level: 3,
                },
                Encounter {
                    slot: EncounterSlot::Slot11,
                    species: Species::Pidgey,
                    min_level: 2,
                    max_level: 3,
                },
            ]
            .to_vec(),
        };

        let options = Gen4SearcherOpts {
            tid: 2010,
            sid: 2010,
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
                ability: None,
                stats: None,
            },
            game: GameVersion::HeartGold,
            encounter: None,
            lead: Some(LeadAbilities::Synchronize(Nature::Adamant)),
        };
        let expected_results = [
            GeneratedPokemon {
                pid: 3805056578,
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
                nature: Nature::Adamant,
                advance: 0,
                encounter_slot: EncounterSlot::Slot0,
            },
            GeneratedPokemon {
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
                advance: 1,
                encounter_slot: EncounterSlot::Slot5,
            },
            GeneratedPokemon {
                pid: 3805056578,
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
                nature: Nature::Adamant,
                advance: 2,
                encounter_slot: EncounterSlot::Slot0,
            },
            GeneratedPokemon {
                pid: 475834453,
                shiny: false,
                ability: AbilityType::Second,
                gender: Gender::Female,
                ivs: Ivs {
                    hp: 2,
                    atk: 18,
                    def: 8,
                    spa: 17,
                    spd: 1,
                    spe: 26,
                },
                nature: Nature::Adamant,
                advance: 3,
                encounter_slot: EncounterSlot::Slot1,
            },
            GeneratedPokemon {
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
                advance: 4,
                encounter_slot: EncounterSlot::Slot0,
            },
            GeneratedPokemon {
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
                advance: 5,
                encounter_slot: EncounterSlot::Slot4,
            },
            GeneratedPokemon {
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
                advance: 6,
                encounter_slot: EncounterSlot::Slot9,
            },
            GeneratedPokemon {
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
                advance: 7,
                encounter_slot: EncounterSlot::Slot7,
            },
            GeneratedPokemon {
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
                encounter_slot: EncounterSlot::Slot4,
            },
            GeneratedPokemon {
                pid: 475834453,
                shiny: false,
                ability: AbilityType::Second,
                gender: Gender::Female,
                ivs: Ivs {
                    hp: 2,
                    atk: 18,
                    def: 8,
                    spa: 17,
                    spd: 1,
                    spe: 26,
                },
                nature: Nature::Adamant,
                advance: 9,
                encounter_slot: EncounterSlot::Slot1,
            },
            GeneratedPokemon {
                pid: 2059180349,
                shiny: false,
                ability: AbilityType::Second,
                gender: Gender::Female,
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
                encounter_slot: EncounterSlot::Slot0,
            },
        ];

        let result = search_wild4(&options, seed, &route);
        assert_list_eq!(result, expected_results);
    }
    #[test]
    fn method_j_synch() {
        let seed = 0;
        let route = RouteData {
            route_id: 201,
            encounter_type: EncounterType::Grass,
            encounter_slots: [
                Encounter {
                    slot: EncounterSlot::Slot0,
                    species: Species::Starly,
                    min_level: 2,
                    max_level: 3,
                },
                Encounter {
                    slot: EncounterSlot::Slot1,
                    species: Species::Bidoof,
                    min_level: 2,
                    max_level: 3,
                },
                Encounter {
                    slot: EncounterSlot::Slot2,
                    species: Species::Starly,
                    min_level: 2,
                    max_level: 3,
                },
                Encounter {
                    slot: EncounterSlot::Slot3,
                    species: Species::Bidoof,
                    min_level: 2,
                    max_level: 3,
                },
                Encounter {
                    slot: EncounterSlot::Slot4,
                    species: Species::Starly,
                    min_level: 2,
                    max_level: 3,
                },
                Encounter {
                    slot: EncounterSlot::Slot5,
                    species: Species::Bidoof,
                    min_level: 2,
                    max_level: 3,
                },
                Encounter {
                    slot: EncounterSlot::Slot6,
                    species: Species::Starly,
                    min_level: 2,
                    max_level: 3,
                },
                Encounter {
                    slot: EncounterSlot::Slot7,
                    species: Species::Bidoof,
                    min_level: 2,
                    max_level: 3,
                },
                Encounter {
                    slot: EncounterSlot::Slot8,
                    species: Species::Starly,
                    min_level: 2,
                    max_level: 3,
                },
                Encounter {
                    slot: EncounterSlot::Slot9,
                    species: Species::Bidoof,
                    min_level: 2,
                    max_level: 3,
                },
                Encounter {
                    slot: EncounterSlot::Slot10,
                    species: Species::Starly,
                    min_level: 2,
                    max_level: 3,
                },
                Encounter {
                    slot: EncounterSlot::Slot11,
                    species: Species::Bidoof,
                    min_level: 2,
                    max_level: 3,
                },
            ]
            .to_vec(),
        };
        let options = Gen4SearcherOpts {
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
                ability: None,
                stats: None,
            },
            game: GameVersion::Pearl,
            encounter: None,
            lead: Some(LeadAbilities::Synchronize(Nature::Adamant)),
        };
        let expected_results = [
            GeneratedPokemon {
                pid: 3080890308,
                shiny: false,
                ability: AbilityType::First,
                gender: Gender::Male,
                ivs: Ivs {
                    hp: 21,
                    atk: 2,
                    def: 10,
                    spa: 2,
                    spd: 7,
                    spe: 28,
                },
                nature: Nature::Impish,
                advance: 0,
                encounter_slot: EncounterSlot::Slot0,
            },
            GeneratedPokemon {
                pid: 475834453,
                shiny: false,
                ability: AbilityType::Second,
                gender: Gender::Female,
                ivs: Ivs {
                    hp: 2,
                    atk: 18,
                    def: 8,
                    spa: 17,
                    spd: 1,
                    spe: 26,
                },
                nature: Nature::Adamant,
                advance: 1,
                encounter_slot: EncounterSlot::Slot8,
            },
            GeneratedPokemon {
                pid: 3805056578,
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
                nature: Nature::Adamant,
                advance: 2,
                encounter_slot: EncounterSlot::Slot1,
            },
            GeneratedPokemon {
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
                advance: 3,
                encounter_slot: EncounterSlot::Slot0,
            },
            GeneratedPokemon {
                pid: 840124667,
                shiny: false,
                ability: AbilityType::Second,
                gender: Gender::Male,
                ivs: Ivs {
                    hp: 7,
                    atk: 23,
                    def: 31,
                    spa: 29,
                    spd: 23,
                    spe: 3,
                },
                nature: Nature::Quiet,
                advance: 4,
                encounter_slot: EncounterSlot::Slot3,
            },
            GeneratedPokemon {
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
                advance: 5,
                encounter_slot: EncounterSlot::Slot7,
            },
            GeneratedPokemon {
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
                advance: 6,
                encounter_slot: EncounterSlot::Slot4,
            },
            GeneratedPokemon {
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
                advance: 7,
                encounter_slot: EncounterSlot::Slot2,
            },
            GeneratedPokemon {
                pid: 2059180349,
                shiny: false,
                ability: AbilityType::Second,
                gender: Gender::Female,
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
                encounter_slot: EncounterSlot::Slot10,
            },
            GeneratedPokemon {
                pid: 3954154919,
                shiny: false,
                ability: AbilityType::Second,
                gender: Gender::Male,
                ivs: Ivs {
                    hp: 3,
                    atk: 5,
                    def: 20,
                    spa: 7,
                    spd: 22,
                    spe: 21,
                },
                nature: Nature::Rash,
                advance: 9,
                encounter_slot: EncounterSlot::Slot8,
            },
            GeneratedPokemon {
                pid: 724263073,
                shiny: false,
                ability: AbilityType::Second,
                gender: Gender::Male,
                ivs: Ivs {
                    hp: 24,
                    atk: 25,
                    def: 3,
                    spa: 21,
                    spd: 13,
                    spe: 0,
                },
                nature: Nature::Careful,
                advance: 10,
                encounter_slot: EncounterSlot::Slot10,
            },
        ];
        let result = search_wild4(&options, seed, &route);
        assert_list_eq!(result, expected_results);
    }
    #[test]
    fn method_j_cutec() {
        let seed = 0;
        let route = RouteData {
            route_id: 201,
            encounter_type: EncounterType::Grass,
            encounter_slots: [
                Encounter {
                    slot: EncounterSlot::Slot0,
                    species: Species::Starly,
                    min_level: 2,
                    max_level: 3,
                },
                Encounter {
                    slot: EncounterSlot::Slot1,
                    species: Species::Bidoof,
                    min_level: 2,
                    max_level: 3,
                },
                Encounter {
                    slot: EncounterSlot::Slot2,
                    species: Species::Starly,
                    min_level: 2,
                    max_level: 3,
                },
                Encounter {
                    slot: EncounterSlot::Slot3,
                    species: Species::Bidoof,
                    min_level: 2,
                    max_level: 3,
                },
                Encounter {
                    slot: EncounterSlot::Slot4,
                    species: Species::Starly,
                    min_level: 2,
                    max_level: 3,
                },
                Encounter {
                    slot: EncounterSlot::Slot5,
                    species: Species::Bidoof,
                    min_level: 2,
                    max_level: 3,
                },
                Encounter {
                    slot: EncounterSlot::Slot6,
                    species: Species::Starly,
                    min_level: 2,
                    max_level: 3,
                },
                Encounter {
                    slot: EncounterSlot::Slot7,
                    species: Species::Bidoof,
                    min_level: 2,
                    max_level: 3,
                },
                Encounter {
                    slot: EncounterSlot::Slot8,
                    species: Species::Starly,
                    min_level: 2,
                    max_level: 3,
                },
                Encounter {
                    slot: EncounterSlot::Slot9,
                    species: Species::Bidoof,
                    min_level: 2,
                    max_level: 3,
                },
                Encounter {
                    slot: EncounterSlot::Slot10,
                    species: Species::Starly,
                    min_level: 2,
                    max_level: 3,
                },
                Encounter {
                    slot: EncounterSlot::Slot11,
                    species: Species::Bidoof,
                    min_level: 2,
                    max_level: 3,
                },
            ]
            .to_vec(),
        };
        let options = Gen4SearcherOpts {
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
                ability: None,
                stats: None,
            },
            game: GameVersion::Pearl,
            encounter: None,
            lead: Some(LeadAbilities::CutecharmM),
        };
        let expected_results = [
            GeneratedPokemon {
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
                advance: 0,
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
                advance: 1,
                encounter_slot: EncounterSlot::Slot8,
            },
            GeneratedPokemon {
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
                advance: 2,
                encounter_slot: EncounterSlot::Slot1,
            },
            GeneratedPokemon {
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
                advance: 3,
                encounter_slot: EncounterSlot::Slot0,
            },
            GeneratedPokemon {
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
                advance: 4,
                encounter_slot: EncounterSlot::Slot3,
            },
            GeneratedPokemon {
                pid: 10,
                shiny: false,
                ability: AbilityType::First,
                gender: Gender::Female,
                ivs: Ivs {
                    hp: 19,
                    atk: 1,
                    def: 31,
                    spa: 25,
                    spd: 27,
                    spe: 12,
                },
                nature: Nature::Timid,
                advance: 5,
                encounter_slot: EncounterSlot::Slot7,
            },
            GeneratedPokemon {
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
                advance: 6,
                encounter_slot: EncounterSlot::Slot4,
            },
            GeneratedPokemon {
                pid: 23,
                shiny: false,
                ability: AbilityType::Second,
                gender: Gender::Female,
                ivs: Ivs {
                    hp: 30,
                    atk: 2,
                    def: 31,
                    spa: 22,
                    spd: 18,
                    spe: 5,
                },
                nature: Nature::Careful,
                advance: 7,
                encounter_slot: EncounterSlot::Slot2,
            },
            GeneratedPokemon {
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
                advance: 8,
                encounter_slot: EncounterSlot::Slot10,
            },
            GeneratedPokemon {
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
                advance: 9,
                encounter_slot: EncounterSlot::Slot8,
            },
            GeneratedPokemon {
                pid: 23,
                shiny: false,
                ability: AbilityType::Second,
                gender: Gender::Female,
                ivs: Ivs {
                    hp: 29,
                    atk: 9,
                    def: 6,
                    spa: 21,
                    spd: 30,
                    spe: 28,
                },
                nature: Nature::Careful,
                advance: 10,
                encounter_slot: EncounterSlot::Slot10,
            },
        ];
        let result = search_wild4(&options, seed, &route);
        assert_list_eq!(result, expected_results);
    }
}
