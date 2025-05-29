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
pub struct EncounterslotIDs {
    pub slot_id: u8,
    pub pokemon_id: Species,
    pub min_level: u8,
    pub max_level: u8,
}

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
    settings: Gen4SWildOpts,
    route: RouteData,
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
    settings: Gen4SWildOpts,
    route: RouteData,
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
