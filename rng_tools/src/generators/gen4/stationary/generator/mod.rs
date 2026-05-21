use super::GameVersion;
use super::LeadAbility;
use crate::Characteristic;
use crate::Ivs;
use crate::Species;
use crate::gen4::StaticMethod;
use crate::gen4::calc_level::HoneyLevel;
use crate::gen4::calc_level::LevelCalculator;
use crate::gen4::calc_level::SetLevel;
use crate::gen4::game_logic::{DpptLogic, GameSpecificLogic, HgssLogic};
use crate::rng::Rng;
use crate::rng::StateIterator;
use crate::rng::lcrng::Pokerng;
use crate::{AbilityType, Gender, Nature, PkmFilter, PkmState, gen3_shiny};
use serde::{Deserialize, Serialize};
use tsify::Tsify;
use wasm_bindgen::prelude::*;

#[derive(Debug, Clone, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct Gen4StaticOpts {
    pub tid: u16,
    pub sid: u16,
    pub initial_advances: usize,
    pub max_advances: usize,
    pub offset: usize,
    pub filter: PkmFilter,
    pub filter_level: Option<u8>,
    pub filter_characteristic: Option<Characteristic>,
    pub game: GameVersion,
    pub species: Species,
    pub encounter_min_level: u8,
    pub encounter_max_level: u8,
    pub lead: LeadAbility,
    pub seed: u32,
}

#[derive(Debug, Clone, Copy, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct Gen4StaticPokemon {
    pub pid: u32,
    pub shiny: bool,
    pub level: u8,
    pub ability: AbilityType,
    pub gender: Gender,
    pub ivs: Ivs,
    pub nature: Nature,
    pub advance: usize,
    pub characteristic: Characteristic,
}

impl Gen4StaticPokemon {
    pub fn new(tid: u16, sid: u16, species: Species, level: u8, pid: u32, ivs: Ivs) -> Self {
        Self {
            pid,
            level,
            shiny: gen3_shiny(pid, tid, sid),
            ability: AbilityType::from_gen3_pid(pid),
            gender: species.gender_from_pid(pid),
            characteristic: Characteristic::new(pid, &ivs),
            ivs,
            nature: Nature::from_pid(pid),
            advance: 0,
        }
    }
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

    fn pid(&self) -> u32 {
        self.pid
    }
}

fn generate_static4_method1(rng: &mut Pokerng, opts: &Gen4StaticOpts) -> Gen4StaticPokemon {
    let pid_low = rng.rand::<u16>() as u32;
    let pid_high = rng.rand::<u16>() as u32;
    let pid = (pid_high << 16) | pid_low;

    let iv1 = rng.rand::<u16>();
    let iv2 = rng.rand::<u16>();
    let ivs = Ivs::new_g3(iv1, iv2);

    Gen4StaticPokemon::new(
        opts.tid,
        opts.sid,
        opts.species,
        opts.encounter_min_level,
        pid,
        ivs,
    )
}

fn generate_static4_jk<Game: GameSpecificLogic, LevelCalc: LevelCalculator<Pokerng>>(
    rng: &mut Pokerng,
    opts: &Gen4StaticOpts,
) -> Gen4StaticPokemon {
    let buffer: u8 = match opts.lead {
        LeadAbility::CutecharmF => (25 * ((opts.species.gender_ratio() as u32 / 25) + 1)) as u8,
        _ => 0,
    };

    let level = LevelCalc::calc_level(
        rng,
        opts.encounter_min_level,
        opts.encounter_max_level,
        opts.lead == LeadAbility::Pressure,
    );

    let cute_charm = matches!(opts.lead, LeadAbility::CutecharmF | LeadAbility::CutecharmM)
        && !opts.species.is_fixed_gender();
    let cute_charm_flag = match cute_charm {
        true => Game::max(rng.rand::<u16>(), 3) != 0,
        false => false,
    };

    let nature = match opts.lead {
        LeadAbility::Synchronize(nature) => {
            let is_sync = Game::max(rng.rand::<u16>(), 2) == 0;
            match is_sync {
                true => nature as u16,
                false => Game::max(rng.rand::<u16>(), 25),
            }
        }
        _ => Game::max(rng.rand::<u16>(), 25),
    };

    let pid = match cute_charm_flag {
        true => buffer as u32 + nature as u32,
        false => {
            let mut pid;
            loop {
                let pid_low = rng.rand::<u16>() as u32;
                let pid_high = rng.rand::<u16>() as u32;
                pid = (pid_high << 16) | pid_low;
                if pid % 25 == nature as u32 {
                    break;
                }
            }
            pid
        }
    };

    let iv1 = rng.rand::<u16>();
    let iv2 = rng.rand::<u16>();
    let ivs = Ivs::new_g3(iv1, iv2);

    Gen4StaticPokemon::new(opts.tid, opts.sid, opts.species, level, pid, ivs)
}

fn generate_static4_state(opts: &Gen4StaticOpts, rng: &mut Pokerng) -> Gen4StaticPokemon {
    match StaticMethod::new(opts.game, opts.species) {
        StaticMethod::One => generate_static4_method1(rng, opts),
        StaticMethod::J => generate_static4_jk::<DpptLogic, SetLevel>(rng, opts),
        StaticMethod::K => generate_static4_jk::<HgssLogic, SetLevel>(rng, opts),
        StaticMethod::Honey => generate_static4_jk::<DpptLogic, HoneyLevel>(rng, opts),
    }
}

#[wasm_bindgen]
pub fn generate_static4_states(opts: &Gen4StaticOpts) -> Vec<Gen4StaticPokemon> {
    let base_rng = Pokerng::new(opts.seed);
    StateIterator::new(base_rng)
        .skip(opts.offset)
        .enumerate()
        .skip(opts.initial_advances)
        .take(opts.max_advances.wrapping_add(1))
        .filter_map(|(adv, mut rng)| {
            let mut pkm = generate_static4_state(opts, &mut rng);

            if let Some(filter_level) = opts.filter_level {
                if pkm.level != filter_level {
                    return None;
                }
            }

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
    use super::*;
    use crate::assert_list_eq;

    const CHATOT: usize = 2;
    const CHATOT_AND_ELM: usize = 3;

    fn parse_honey_states(str: &str) -> Vec<Gen4StaticPokemon> {
        let mut results: Vec<Gen4StaticPokemon> = Vec::new();
        for raw_line in str.lines() {
            let line = raw_line.trim();

            if line.is_empty() {
                continue;
            }

            let parts: Vec<&str> = line.split("\t").collect();
            let advance: usize = parts[0].parse().unwrap();
            // battle_advances
            // chatot
            // item
            // slot
            let level: u8 = parts[5].parse().unwrap();
            let pid = u32::from_str_radix(parts[6], 16).unwrap();
            let shiny = parts[7] != "No";
            let nature = Nature::from_str(parts[8]);
            let ability = AbilityType::from_pokefinder_str(parts[9]);
            let ivs = Ivs::from_pokefinder_strs(&parts[10..][..6]);
            // hidden_power_type
            // hiden_power_strength
            let gender = Gender::from_pokefinder_str(parts[18]);
            let characteristic = Characteristic::from_pokefinder_str(parts[19]);

            results.push(Gen4StaticPokemon {
                pid,
                shiny,
                ability,
                gender,
                ivs,
                nature,
                advance,
                characteristic,
                level,
            });
        }
        results
    }

    macro_rules! pokefinder_honey {
        ($file:expr) => {
            parse_honey_states(include_str!($file))
        };
    }

    fn parse_static_states(advance_pid_offset: usize, str: &str) -> Vec<Gen4StaticPokemon> {
        let mut results: Vec<Gen4StaticPokemon> = Vec::new();
        for raw_line in str.lines() {
            let line = raw_line.trim();

            if line.is_empty() {
                continue;
            }

            let parts: Vec<&str> = line.split("\t").collect();
            let advance: usize = parts[0].parse().unwrap();

            let parts = &parts[advance_pid_offset..];
            let pid = u32::from_str_radix(parts[0], 16).unwrap();
            let shiny = parts[1] != "No";
            let nature = Nature::from_str(parts[2]);
            let ability = AbilityType::from_pokefinder_str(parts[3]);
            let ivs = Ivs::from_pokefinder_strs(&parts[4..][..6]);
            let gender = Gender::from_pokefinder_str(parts[12]);
            let characteristic = Characteristic::from_pokefinder_str(parts[13]);

            results.push(Gen4StaticPokemon {
                pid,
                shiny,
                ability,
                gender,
                ivs,
                nature,
                advance,
                characteristic,

                // The level is not included in the pokefinder output
                level: 0,
            });
        }
        results
    }

    macro_rules! pokefinder_static {
        ($offset:expr, $file:expr) => {
            parse_static_states($offset, include_str!($file))
        };
    }

    mod method1 {
        use super::*;

        #[test]
        fn base() {
            let opts = Gen4StaticOpts {
                tid: 1234,
                sid: 5678,
                initial_advances: 0,
                max_advances: 200,
                offset: 0,
                filter: PkmFilter::default(),
                filter_level: None,
                filter_characteristic: None,
                game: GameVersion::Diamond,
                species: Species::Turtwig,
                lead: LeadAbility::None,
                seed: 0,
                encounter_min_level: 0,
                encounter_max_level: 0,
            };
            let results = generate_static4_states(&opts);
            let expected = pokefinder_static!(CHATOT_AND_ELM, "test_data/method1/base.txt");
            assert_list_eq!(results, expected);
        }

        #[test]
        fn initial_advances() {
            let opts = Gen4StaticOpts {
                tid: 1234,
                sid: 5678,
                initial_advances: 200,
                max_advances: 200,
                offset: 0,
                filter: PkmFilter::default(),
                filter_level: None,
                filter_characteristic: None,
                game: GameVersion::Diamond,
                species: Species::Turtwig,
                lead: LeadAbility::None,
                seed: 0,
                encounter_min_level: 0,
                encounter_max_level: 0,
            };
            let results = generate_static4_states(&opts);
            let expected =
                pokefinder_static!(CHATOT_AND_ELM, "test_data/method1/initial_advances.txt");
            assert_list_eq!(results, expected);
        }

        #[test]
        fn initial_advances_with_offset() {
            let opts = Gen4StaticOpts {
                tid: 1234,
                sid: 5678,
                initial_advances: 200,
                max_advances: 200,
                offset: 10,
                filter: PkmFilter::default(),
                filter_level: None,
                filter_characteristic: None,
                game: GameVersion::Diamond,
                species: Species::Turtwig,
                lead: LeadAbility::None,
                seed: 0,
                encounter_min_level: 0,
                encounter_max_level: 0,
            };
            let results = generate_static4_states(&opts);
            let expected = pokefinder_static!(
                CHATOT_AND_ELM,
                "test_data/method1/initial_advances_with_offset.txt"
            );
            assert_list_eq!(results, expected);
        }
    }

    mod methodj {
        use super::*;

        #[test]
        fn no_lead() {
            let opts = Gen4StaticOpts {
                tid: 1234,
                sid: 5678,
                initial_advances: 0,
                max_advances: 200,
                offset: 0,
                filter: PkmFilter::default(),
                filter_level: None,
                filter_characteristic: None,
                game: GameVersion::Diamond,
                species: Species::Drifloon,
                lead: LeadAbility::None,
                seed: 0,
                encounter_min_level: 0,
                encounter_max_level: 0,
            };
            let results = generate_static4_states(&opts);
            let expected = pokefinder_static!(CHATOT, "test_data/methodj/no_lead.txt");
            assert_list_eq!(results, expected);
        }

        #[test]
        fn pressure() {
            let opts = Gen4StaticOpts {
                tid: 1234,
                sid: 5678,
                initial_advances: 0,
                max_advances: 200,
                offset: 0,
                filter: PkmFilter::default(),
                filter_level: None,
                filter_characteristic: None,
                game: GameVersion::Diamond,
                species: Species::Drifloon,
                lead: LeadAbility::Pressure,
                seed: 0,
                encounter_min_level: 0,
                encounter_max_level: 0,
            };
            let results = generate_static4_states(&opts);
            // Pressure is a no-op for static Pokemon, so same behavior as no lead
            let expected = pokefinder_static!(CHATOT, "test_data/methodj/no_lead.txt");
            assert_list_eq!(results, expected);
        }

        #[test]
        fn sync_hardy() {
            let opts = Gen4StaticOpts {
                tid: 1234,
                sid: 5678,
                initial_advances: 0,
                max_advances: 200,
                offset: 0,
                filter: PkmFilter::default(),
                filter_level: None,
                filter_characteristic: None,
                game: GameVersion::Diamond,
                species: Species::Drifloon,
                lead: LeadAbility::Synchronize(Nature::Hardy),
                seed: 0,
                encounter_min_level: 0,
                encounter_max_level: 0,
            };
            let results = generate_static4_states(&opts);
            let expected = pokefinder_static!(CHATOT, "test_data/methodj/sync_hardy.txt");
            assert_list_eq!(results, expected);
        }

        #[test]
        fn cute_charm_male() {
            let opts = Gen4StaticOpts {
                tid: 1234,
                sid: 5678,
                initial_advances: 0,
                max_advances: 200,
                offset: 0,
                filter: PkmFilter::default(),
                filter_level: None,
                filter_characteristic: None,
                game: GameVersion::Diamond,
                species: Species::Drifloon,
                lead: LeadAbility::CutecharmM,
                seed: 0,
                encounter_min_level: 0,
                encounter_max_level: 0,
            };
            let results = generate_static4_states(&opts);
            let expected = pokefinder_static!(CHATOT, "test_data/methodj/cute_charm_male.txt");
            assert_list_eq!(results, expected);
        }

        #[test]
        fn cute_charm_female() {
            let opts = Gen4StaticOpts {
                tid: 1234,
                sid: 5678,
                initial_advances: 0,
                max_advances: 200,
                offset: 0,
                filter: PkmFilter::default(),
                filter_level: None,
                filter_characteristic: None,
                game: GameVersion::Diamond,
                species: Species::Drifloon,
                lead: LeadAbility::CutecharmF,
                seed: 0,
                encounter_min_level: 0,
                encounter_max_level: 0,
            };
            let results = generate_static4_states(&opts);
            let expected = pokefinder_static!(CHATOT, "test_data/methodj/cute_charm_female.txt");
            assert_list_eq!(results, expected);
        }

        #[test]
        fn cute_charm_genderless() {
            let opts = Gen4StaticOpts {
                tid: 1234,
                sid: 5678,
                initial_advances: 0,
                max_advances: 200,
                offset: 0,
                filter: PkmFilter::default(),
                filter_level: None,
                filter_characteristic: None,
                game: GameVersion::Diamond,
                species: Species::Rotom_Normal,
                lead: LeadAbility::CutecharmF,
                seed: 0,
                encounter_min_level: 0,
                encounter_max_level: 0,
            };
            let results = generate_static4_states(&opts);
            let expected =
                pokefinder_static!(CHATOT, "test_data/methodj/cute_charm_genderless.txt");
            assert_list_eq!(results, expected);
        }
    }

    mod methodk {
        use super::*;

        #[test]
        fn no_lead() {
            let opts = Gen4StaticOpts {
                tid: 1234,
                sid: 5678,
                initial_advances: 0,
                max_advances: 200,
                offset: 0,
                filter: PkmFilter::default(),
                filter_level: None,
                filter_characteristic: None,
                game: GameVersion::SoulSilver,
                species: Species::Snorlax,
                lead: LeadAbility::None,
                seed: 0,
                encounter_min_level: 0,
                encounter_max_level: 0,
            };
            let results = generate_static4_states(&opts);
            let expected = pokefinder_static!(CHATOT_AND_ELM, "test_data/methodk/no_lead.txt");
            assert_list_eq!(results, expected);
        }

        #[test]
        fn pressure() {
            let opts = Gen4StaticOpts {
                tid: 1234,
                sid: 5678,
                initial_advances: 0,
                max_advances: 200,
                offset: 0,
                filter: PkmFilter::default(),
                filter_level: None,
                filter_characteristic: None,
                game: GameVersion::SoulSilver,
                species: Species::Snorlax,
                lead: LeadAbility::Pressure,
                seed: 0,
                encounter_min_level: 0,
                encounter_max_level: 0,
            };
            let results = generate_static4_states(&opts);
            // Pressure is a no-op for static Pokemon, so same behavior as no lead
            let expected = pokefinder_static!(CHATOT_AND_ELM, "test_data/methodk/no_lead.txt");
            assert_list_eq!(results, expected);
        }

        #[test]
        fn sync_hardy() {
            let opts = Gen4StaticOpts {
                tid: 1234,
                sid: 5678,
                initial_advances: 0,
                max_advances: 200,
                offset: 0,
                filter: PkmFilter::default(),
                filter_level: None,
                filter_characteristic: None,
                game: GameVersion::SoulSilver,
                species: Species::Snorlax,
                lead: LeadAbility::Synchronize(Nature::Hardy),
                seed: 0,
                encounter_min_level: 0,
                encounter_max_level: 0,
            };
            let results = generate_static4_states(&opts);
            let expected = pokefinder_static!(CHATOT_AND_ELM, "test_data/methodk/sync_hardy.txt");
            assert_list_eq!(results, expected);
        }

        #[test]
        fn cute_charm_male() {
            let opts = Gen4StaticOpts {
                tid: 1234,
                sid: 5678,
                initial_advances: 0,
                max_advances: 200,
                offset: 0,
                filter: PkmFilter::default(),
                filter_level: None,
                filter_characteristic: None,
                game: GameVersion::SoulSilver,
                species: Species::Snorlax,
                lead: LeadAbility::CutecharmM,
                seed: 0,
                encounter_min_level: 0,
                encounter_max_level: 0,
            };
            let results = generate_static4_states(&opts);
            let expected =
                pokefinder_static!(CHATOT_AND_ELM, "test_data/methodk/cute_charm_male.txt");
            assert_list_eq!(results, expected);
        }

        #[test]
        fn cute_charm_female() {
            let opts = Gen4StaticOpts {
                tid: 1234,
                sid: 5678,
                initial_advances: 0,
                max_advances: 200,
                offset: 0,
                filter: PkmFilter::default(),
                filter_level: None,
                filter_characteristic: None,
                game: GameVersion::SoulSilver,
                species: Species::Snorlax,
                lead: LeadAbility::CutecharmF,
                seed: 0,
                encounter_min_level: 0,
                encounter_max_level: 0,
            };
            let results = generate_static4_states(&opts);
            let expected =
                pokefinder_static!(CHATOT_AND_ELM, "test_data/methodk/cute_charm_female.txt");
            assert_list_eq!(results, expected);
        }

        #[test]
        fn cute_charm_genderless() {
            let opts = Gen4StaticOpts {
                tid: 1234,
                sid: 5678,
                initial_advances: 0,
                max_advances: 200,
                offset: 0,
                filter: PkmFilter::default(),
                filter_level: None,
                filter_characteristic: None,
                game: GameVersion::SoulSilver,
                species: Species::Voltorb,
                lead: LeadAbility::CutecharmF,
                seed: 0,
                encounter_min_level: 0,
                encounter_max_level: 0,
            };
            let results = generate_static4_states(&opts);
            let expected = pokefinder_static!(
                CHATOT_AND_ELM,
                "test_data/methodk/cute_charm_genderless.txt"
            );
            assert_list_eq!(results, expected);
        }
    }

    mod method_honey {
        use super::*;

        #[test]
        fn no_lead() {
            let opts = Gen4StaticOpts {
                tid: 12345,
                sid: 54321,
                initial_advances: 0,
                max_advances: 200,
                offset: 0,
                filter: PkmFilter::default(),
                filter_level: None,
                filter_characteristic: None,
                game: GameVersion::Diamond,
                species: Species::Munchlax,
                lead: LeadAbility::None,
                seed: 0,
                encounter_min_level: 5,
                encounter_max_level: 15,
            };
            let results = generate_static4_states(&opts);
            let expected = pokefinder_honey!("test_data/method_honey/no_lead.txt");
            assert_list_eq!(results, expected);
        }

        #[test]
        fn no_lead_filter_level() {
            let opts = Gen4StaticOpts {
                tid: 12345,
                sid: 54321,
                initial_advances: 0,
                max_advances: 200,
                offset: 0,
                filter: PkmFilter::default(),
                filter_level: Some(15),
                filter_characteristic: None,
                game: GameVersion::Diamond,
                species: Species::Munchlax,
                lead: LeadAbility::None,
                seed: 0,
                encounter_min_level: 5,
                encounter_max_level: 15,
            };
            let results = generate_static4_states(&opts);
            let expected = pokefinder_honey!("test_data/method_honey/no_lead_filter_level.txt");
            assert_list_eq!(results, expected);
        }

        #[test]
        fn sync_hardy() {
            let opts = Gen4StaticOpts {
                tid: 12345,
                sid: 54321,
                initial_advances: 0,
                max_advances: 200,
                offset: 0,
                filter: PkmFilter::default(),
                filter_level: None,
                filter_characteristic: None,
                game: GameVersion::Diamond,
                species: Species::Munchlax,
                lead: LeadAbility::Synchronize(Nature::Hardy),
                seed: 0,
                encounter_min_level: 5,
                encounter_max_level: 15,
            };
            let results = generate_static4_states(&opts);
            let expected = pokefinder_honey!("test_data/method_honey/sync_hardy.txt");
            assert_list_eq!(results, expected);
        }

        #[test]
        fn cute_charm_male() {
            let opts = Gen4StaticOpts {
                tid: 12345,
                sid: 54321,
                initial_advances: 0,
                max_advances: 200,
                offset: 0,
                filter: PkmFilter::default(),
                filter_level: None,
                filter_characteristic: None,
                game: GameVersion::Diamond,
                species: Species::Munchlax,
                lead: LeadAbility::CutecharmM,
                seed: 0,
                encounter_min_level: 5,
                encounter_max_level: 15,
            };
            let results = generate_static4_states(&opts);
            let expected = pokefinder_honey!("test_data/method_honey/cute_charm_male.txt");
            assert_list_eq!(results, expected);
        }

        #[test]
        fn cute_charm_female() {
            let opts = Gen4StaticOpts {
                tid: 12345,
                sid: 54321,
                initial_advances: 0,
                max_advances: 200,
                offset: 0,
                filter: PkmFilter::default(),
                filter_level: None,
                filter_characteristic: None,
                game: GameVersion::Diamond,
                species: Species::Munchlax,
                lead: LeadAbility::CutecharmF,
                seed: 0,
                encounter_min_level: 5,
                encounter_max_level: 15,
            };
            let results = generate_static4_states(&opts);
            let expected = pokefinder_honey!("test_data/method_honey/cute_charm_female.txt");
            assert_list_eq!(results, expected);
        }

        #[test]
        fn pressure() {
            let opts = Gen4StaticOpts {
                tid: 12345,
                sid: 54321,
                initial_advances: 0,
                max_advances: 200,
                offset: 0,
                filter: PkmFilter::default(),
                filter_level: None,
                filter_characteristic: None,
                game: GameVersion::Diamond,
                species: Species::Munchlax,
                lead: LeadAbility::Pressure,
                seed: 0,
                encounter_min_level: 5,
                encounter_max_level: 15,
            };
            let results = generate_static4_states(&opts);
            let expected = pokefinder_honey!("test_data/method_honey/pressure.txt");
            assert_list_eq!(results, expected);
        }
    }
}
