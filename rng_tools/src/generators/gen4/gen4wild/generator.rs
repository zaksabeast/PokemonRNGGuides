use crate::GenderRatio;
use crate::Ivs;
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

pub fn generate_gen4_static_j(
    rng: &mut Pokerng,
    settings: Gen4SWildOpts,
) -> Option<GeneratedPokemon> {
    let encounter_rand = ((rng.rand::<u32>() >> 16) % 100) as u8;
    let encounter_slot = EncounterSlot::from_rand(encounter_rand);
    if !EncounterSlot::passes_filter(settings.encounter.as_deref(), encounter_slot) {
        return None;
    }
    rng.rand::<u32>(); // level
    if let Some(lead) = settings.lead {
        if lead == LeadAbilities::CutecharmF || lead == LeadAbilities::CutecharmM {
            let gender_threshold = settings.gender_ratio;
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
                    let gender = settings.gender_ratio;
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

    let pkm = GeneratedPokemon {
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
#[cfg(test)]
mod test {

    use crate::assert_list_eq;

    use super::*;

    #[test]
    fn test_wild_gen() {
        let seed = Pokerng(0);
        let options = Gen4SWildOpts {
            tid: 0,
            sid: 0,
            gender_ratio: GenderRatio::OneToOne,
            encounter: None,
            initial_advances: 0,
            max_advances: 9,
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
            game: GameVersion::Platinum,
            encounter: None,
            lead: None,
        };
        let expected_results = [GeneratedPokemon {
            advance: 0,
            encounter_slot: EncounterSlot::Slot0,
            pid: 0xFC3367DB,
            shiny: false,
            nature: Nature::Bold,
            ability: AbilityType::Second,
            ivs: Ivs {
                hp: 12,
                atk: 25,
                def: 27,
                spa: 2,
                spd: 31,
                spe: 30,
            },
            gender: Gender::Male,
        }];
        let result = generate_gen4_static_j(seed, options);
        assert_eq!(result, expected_results);
    }
}
