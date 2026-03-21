use super::GameVersion;
use super::LeadAbility;
use crate::Characteristic;
use crate::Ivs;
use crate::Species;
use crate::gen4::StaticMethod;
use crate::gen4::game_logic::{DpptLogic, GameSpecificLogic, HgssLogic};
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
    pub game: GameVersion,
    pub species: Species,
    pub lead: LeadAbility,
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

impl Gen4StaticPokemon {
    pub fn new(tid: u16, sid: u16, species: Species, pid: u32, ivs: Ivs) -> Self {
        Self {
            pid,
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

    Gen4StaticPokemon::new(opts.tid, opts.sid, opts.species, pid, ivs)
}

fn generate_static4_jk<Game: GameSpecificLogic>(
    rng: &mut Pokerng,
    opts: &Gen4StaticOpts,
) -> Gen4StaticPokemon {
    let buffer: u8 = match opts.lead {
        LeadAbility::CutecharmF => (25 * ((opts.species.gender_ratio() as u32 / 25) + 1)) as u8,
        _ => 0,
    };

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

    Gen4StaticPokemon::new(opts.tid, opts.sid, opts.species, pid, ivs)
}

fn generate_static4_state(opts: &Gen4StaticOpts, rng: &mut Pokerng) -> Gen4StaticPokemon {
    match StaticMethod::new(opts.game, opts.species) {
        StaticMethod::One => generate_static4_method1(rng, opts),
        StaticMethod::J => generate_static4_jk::<DpptLogic>(rng, opts),
        StaticMethod::K => generate_static4_jk::<HgssLogic>(rng, opts),
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
            let mut pkm = generate_static4_state(opts, &mut rng);

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

    fn parse_base_states(advance_pid_offset: usize, str: &str) -> Vec<Gen4StaticPokemon> {
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
            });
        }
        results
    }

    macro_rules! pokefinder {
        ($offset:expr, $file:expr) => {
            parse_base_states($offset, include_str!($file))
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
                filter: PkmFilter::default(),
                filter_characteristic: None,
                game: GameVersion::Diamond,
                species: Species::Turtwig,
                lead: LeadAbility::None,
                seed: 0,
            };
            let results = generate_static4_states(&opts);
            let expected = pokefinder!(CHATOT_AND_ELM, "test_data/method1/base.txt");
            assert_list_eq!(results, expected);
        }

        #[test]
        fn initial_advances() {
            let opts = Gen4StaticOpts {
                tid: 1234,
                sid: 5678,
                initial_advances: 200,
                max_advances: 200,
                filter: PkmFilter::default(),
                filter_characteristic: None,
                game: GameVersion::Diamond,
                species: Species::Turtwig,
                lead: LeadAbility::None,
                seed: 0,
            };
            let results = generate_static4_states(&opts);
            let expected = pokefinder!(CHATOT_AND_ELM, "test_data/method1/initial_advances.txt");
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
                filter: PkmFilter::default(),
                filter_characteristic: None,
                game: GameVersion::Diamond,
                species: Species::Drifloon,
                lead: LeadAbility::None,
                seed: 0,
            };
            let results = generate_static4_states(&opts);
            let expected = pokefinder!(CHATOT, "test_data/methodj/no_lead.txt");
            assert_list_eq!(results, expected);
        }

        #[test]
        fn sync_hardy() {
            let opts = Gen4StaticOpts {
                tid: 1234,
                sid: 5678,
                initial_advances: 0,
                max_advances: 200,
                filter: PkmFilter::default(),
                filter_characteristic: None,
                game: GameVersion::Diamond,
                species: Species::Drifloon,
                lead: LeadAbility::Synchronize(Nature::Hardy),
                seed: 0,
            };
            let results = generate_static4_states(&opts);
            let expected = pokefinder!(CHATOT, "test_data/methodj/sync_hardy.txt");
            assert_list_eq!(results, expected);
        }

        #[test]
        fn cute_charm_male() {
            let opts = Gen4StaticOpts {
                tid: 1234,
                sid: 5678,
                initial_advances: 0,
                max_advances: 200,
                filter: PkmFilter::default(),
                filter_characteristic: None,
                game: GameVersion::Diamond,
                species: Species::Drifloon,
                lead: LeadAbility::CutecharmM,
                seed: 0,
            };
            let results = generate_static4_states(&opts);
            let expected = pokefinder!(CHATOT, "test_data/methodj/cute_charm_male.txt");
            assert_list_eq!(results, expected);
        }

        #[test]
        fn cute_charm_female() {
            let opts = Gen4StaticOpts {
                tid: 1234,
                sid: 5678,
                initial_advances: 0,
                max_advances: 200,
                filter: PkmFilter::default(),
                filter_characteristic: None,
                game: GameVersion::Diamond,
                species: Species::Drifloon,
                lead: LeadAbility::CutecharmF,
                seed: 0,
            };
            let results = generate_static4_states(&opts);
            let expected = pokefinder!(CHATOT, "test_data/methodj/cute_charm_female.txt");
            assert_list_eq!(results, expected);
        }

        #[test]
        fn cute_charm_genderless() {
            let opts = Gen4StaticOpts {
                tid: 1234,
                sid: 5678,
                initial_advances: 0,
                max_advances: 200,
                filter: PkmFilter::default(),
                filter_characteristic: None,
                game: GameVersion::Diamond,
                species: Species::Rotom_Normal,
                lead: LeadAbility::CutecharmF,
                seed: 0,
            };
            let results = generate_static4_states(&opts);
            let expected = pokefinder!(CHATOT, "test_data/methodj/cute_charm_genderless.txt");
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
                filter: PkmFilter::default(),
                filter_characteristic: None,
                game: GameVersion::SoulSilver,
                species: Species::Snorlax,
                lead: LeadAbility::None,
                seed: 0,
            };
            let results = generate_static4_states(&opts);
            let expected = pokefinder!(CHATOT_AND_ELM, "test_data/methodk/no_lead.txt");
            assert_list_eq!(results, expected);
        }

        #[test]
        fn sync_hardy() {
            let opts = Gen4StaticOpts {
                tid: 1234,
                sid: 5678,
                initial_advances: 0,
                max_advances: 200,
                filter: PkmFilter::default(),
                filter_characteristic: None,
                game: GameVersion::SoulSilver,
                species: Species::Snorlax,
                lead: LeadAbility::Synchronize(Nature::Hardy),
                seed: 0,
            };
            let results = generate_static4_states(&opts);
            let expected = pokefinder!(CHATOT_AND_ELM, "test_data/methodk/sync_hardy.txt");
            assert_list_eq!(results, expected);
        }

        #[test]
        fn cute_charm_male() {
            let opts = Gen4StaticOpts {
                tid: 1234,
                sid: 5678,
                initial_advances: 0,
                max_advances: 200,
                filter: PkmFilter::default(),
                filter_characteristic: None,
                game: GameVersion::SoulSilver,
                species: Species::Snorlax,
                lead: LeadAbility::CutecharmM,
                seed: 0,
            };
            let results = generate_static4_states(&opts);
            let expected = pokefinder!(CHATOT_AND_ELM, "test_data/methodk/cute_charm_male.txt");
            assert_list_eq!(results, expected);
        }

        #[test]
        fn cute_charm_female() {
            let opts = Gen4StaticOpts {
                tid: 1234,
                sid: 5678,
                initial_advances: 0,
                max_advances: 200,
                filter: PkmFilter::default(),
                filter_characteristic: None,
                game: GameVersion::SoulSilver,
                species: Species::Snorlax,
                lead: LeadAbility::CutecharmF,
                seed: 0,
            };
            let results = generate_static4_states(&opts);
            let expected = pokefinder!(CHATOT_AND_ELM, "test_data/methodk/cute_charm_female.txt");
            assert_list_eq!(results, expected);
        }

        #[test]
        fn cute_charm_genderless() {
            let opts = Gen4StaticOpts {
                tid: 1234,
                sid: 5678,
                initial_advances: 0,
                max_advances: 200,
                filter: PkmFilter::default(),
                filter_characteristic: None,
                game: GameVersion::SoulSilver,
                species: Species::Voltorb,
                lead: LeadAbility::CutecharmF,
                seed: 0,
            };
            let results = generate_static4_states(&opts);
            let expected = pokefinder!(
                CHATOT_AND_ELM,
                "test_data/methodk/cute_charm_genderless.txt"
            );
            assert_list_eq!(results, expected);
        }
    }
}
