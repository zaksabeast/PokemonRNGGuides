mod opts;
mod pid_strategy;
mod state;

use super::LeadAbility;
use crate::Ivs;
use crate::gen4::Static4Method;
use crate::gen4::calc_level::{HoneyLevel, LevelCalculator, SetLevel};
use crate::gen4::game_logic::{DpptLogic, GameSpecificLogic, HgssLogic};
use crate::rng::Rng;
use crate::rng::StateIterator;
use crate::rng::lcrng::Pokerng;
use opts::Gen4StaticOpts;
use pid_strategy::{Method1, NormalMethodJK, PidStrategy, ShinyMethodJK};
use state::Gen4StaticPokemon;
use wasm_bindgen::prelude::*;

pub fn generate_static4<
    Game: GameSpecificLogic,
    LevelCalc: LevelCalculator<Pokerng>,
    Pid: PidStrategy<Game>,
>(
    rng: &mut Pokerng,
    opts: &Gen4StaticOpts,
) -> Gen4StaticPokemon {
    let level = LevelCalc::calc_level(
        rng,
        opts.encounter_min_level,
        opts.encounter_max_level,
        opts.lead == LeadAbility::Pressure,
    );

    let pid = Pid::generate_pid(rng, opts);

    let iv1 = rng.rand::<u16>();
    let iv2 = rng.rand::<u16>();
    let ivs = Ivs::new_g3(iv1, iv2);

    Gen4StaticPokemon::new(opts.tid, opts.sid, opts.species, level, pid, ivs)
}

fn generate_static4_state(opts: &Gen4StaticOpts, rng: &mut Pokerng) -> Gen4StaticPokemon {
    match opts.method {
        Static4Method::One => generate_static4::<DpptLogic, SetLevel, Method1>(rng, opts),
        Static4Method::DpptJ => generate_static4::<DpptLogic, SetLevel, NormalMethodJK>(rng, opts),
        Static4Method::HgssK => generate_static4::<HgssLogic, SetLevel, NormalMethodJK>(rng, opts),
        Static4Method::Honey => {
            generate_static4::<DpptLogic, HoneyLevel, NormalMethodJK>(rng, opts)
        }
        Static4Method::Radar => generate_static4::<DpptLogic, SetLevel, NormalMethodJK>(rng, opts),
        Static4Method::ShinyRadar => {
            generate_static4::<DpptLogic, SetLevel, ShinyMethodJK>(rng, opts)
        }
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

            if let Some(filter_level) = opts.filter_level
                && pkm.level != filter_level
            {
                return None;
            }

            if let Some(filter_characteristic) = opts.filter_characteristic
                && pkm.characteristic != filter_characteristic
            {
                return None;
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
    use crate::{
        AbilityType, Characteristic, Gender, Ivs, Nature, PkmFilter, Species, assert_list_eq,
    };

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

    fn parse_radar_states(str: &str) -> Vec<Gen4StaticPokemon> {
        let mut results: Vec<Gen4StaticPokemon> = Vec::new();
        for raw_line in str.lines() {
            let line = raw_line.trim();
            if line.is_empty() {
                continue;
            }

            let parts: Vec<&str> = line.split('\t').collect();
            let advance: usize = parts[0].parse().unwrap();
            let level: u8 = parts[5].parse().unwrap();
            let pid = u32::from_str_radix(parts[6], 16).unwrap();
            let shiny = parts[7] != "No";
            let nature = Nature::from_str(parts[8]);
            let ability = AbilityType::from_pokefinder_str(parts[9]);
            let ivs = Ivs::from_pokefinder_strs(&parts[10..][..6]);
            let gender = Gender::from_pokefinder_str(parts[18]);
            let characteristic = Characteristic::from_pokefinder_str(parts[19]);

            results.push(Gen4StaticPokemon {
                pid,
                shiny,
                level,
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

    macro_rules! pokefinder_radar {
        ($file:expr) => {
            parse_radar_states(include_str!($file))
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
                method: Static4Method::One,
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
                method: Static4Method::One,
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
                method: Static4Method::One,
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
                method: Static4Method::DpptJ,
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
                method: Static4Method::DpptJ,
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
                method: Static4Method::DpptJ,
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
                method: Static4Method::DpptJ,
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
                method: Static4Method::DpptJ,
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
                method: Static4Method::DpptJ,
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
                method: Static4Method::HgssK,
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
                method: Static4Method::HgssK,
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
                method: Static4Method::HgssK,
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
                method: Static4Method::HgssK,
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
                method: Static4Method::HgssK,
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
                method: Static4Method::HgssK,
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
                method: Static4Method::Honey,
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
                method: Static4Method::Honey,
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
                method: Static4Method::Honey,
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
                method: Static4Method::Honey,
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
                method: Static4Method::Honey,
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
                method: Static4Method::Honey,
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

    mod method_shiny_radar {
        use super::*;

        #[test]
        fn shiny_no_lead() {
            let opts = Gen4StaticOpts {
                tid: 39259,
                sid: 25081,
                initial_advances: 0,
                max_advances: 200,
                offset: 0,
                filter: PkmFilter::new_allow_all(),
                filter_level: None,
                filter_characteristic: None,
                method: Static4Method::ShinyRadar,
                species: Species::Snover,
                lead: LeadAbility::None,
                seed: 0xd6140374,
                encounter_min_level: 33,
                encounter_max_level: 33,
            };
            let results = generate_static4_states(&opts);
            let expected = pokefinder_radar!("test_data/method_shiny_pokeradar/no_lead.txt");
            assert_list_eq!(results, expected);
        }

        #[test]
        fn shiny_cute_charm_male() {
            let opts = Gen4StaticOpts {
                tid: 39259,
                sid: 25081,
                initial_advances: 0,
                max_advances: 200,
                offset: 0,
                filter: PkmFilter::new_allow_all(),
                filter_level: None,
                filter_characteristic: None,
                method: Static4Method::ShinyRadar,
                species: Species::Snover,
                lead: LeadAbility::CutecharmM,
                seed: 0xd6140374,
                encounter_min_level: 33,
                encounter_max_level: 33,
            };
            let results = generate_static4_states(&opts);
            let expected =
                pokefinder_radar!("test_data/method_shiny_pokeradar/cute_charm_male.txt");
            assert_list_eq!(results, expected);
        }

        #[test]
        fn shiny_cute_charm_female() {
            let opts = Gen4StaticOpts {
                tid: 39259,
                sid: 25081,
                initial_advances: 0,
                max_advances: 200,
                offset: 0,
                filter: PkmFilter::new_allow_all(),
                filter_level: None,
                filter_characteristic: None,
                method: Static4Method::ShinyRadar,
                species: Species::Snover,
                lead: LeadAbility::CutecharmF,
                seed: 0xd6140374,
                encounter_min_level: 33,
                encounter_max_level: 33,
            };
            let results = generate_static4_states(&opts);
            let expected =
                pokefinder_radar!("test_data/method_shiny_pokeradar/cute_charm_female.txt");
            assert_list_eq!(results, expected);
        }

        #[test]
        fn shiny_cute_charm_genderless() {
            let opts = Gen4StaticOpts {
                tid: 39259,
                sid: 25081,
                initial_advances: 0,
                max_advances: 200,
                offset: 0,
                filter: PkmFilter::new_allow_all(),
                filter_level: None,
                filter_characteristic: None,
                method: Static4Method::ShinyRadar,
                species: Species::Beldum,
                lead: LeadAbility::CutecharmF,
                seed: 0xd6140374,
                encounter_min_level: 51,
                encounter_max_level: 51,
            };
            let results = generate_static4_states(&opts);
            let expected =
                pokefinder_radar!("test_data/method_shiny_pokeradar/cute_charm_genderless.txt");
            assert_list_eq!(results, expected);
        }

        #[test]
        fn shiny_synchronize_jolly() {
            let opts = Gen4StaticOpts {
                tid: 39259,
                sid: 25081,
                initial_advances: 0,
                max_advances: 200,
                offset: 0,
                filter: PkmFilter::new_allow_all(),
                filter_level: None,
                filter_characteristic: None,
                method: Static4Method::ShinyRadar,
                species: Species::Snover,
                lead: LeadAbility::Synchronize(Nature::Jolly),
                seed: 0xd6140374,
                encounter_min_level: 33,
                encounter_max_level: 33,
            };
            let results = generate_static4_states(&opts);
            let expected = pokefinder_radar!("test_data/method_shiny_pokeradar/sync_jolly.txt");
            assert_list_eq!(results, expected);
        }
    }

    mod method_radar {
        use super::*;

        #[test]
        fn no_lead() {
            let opts = Gen4StaticOpts {
                tid: 39259,
                sid: 25081,
                initial_advances: 0,
                max_advances: 200,
                offset: 0,
                filter: PkmFilter::new_allow_all(),
                filter_level: None,
                filter_characteristic: None,
                method: Static4Method::Radar,
                species: Species::Snover,
                lead: LeadAbility::None,
                seed: 0xd6140374,
                encounter_min_level: 33,
                encounter_max_level: 33,
            };
            let results = generate_static4_states(&opts);
            let expected = pokefinder_radar!("test_data/method_pokeradar/no_lead.txt");
            assert_list_eq!(results, expected);
        }

        #[test]
        fn shiny_cute_charm_male() {
            let opts = Gen4StaticOpts {
                tid: 39259,
                sid: 25081,
                initial_advances: 0,
                max_advances: 200,
                offset: 0,
                filter: PkmFilter::new_allow_all(),
                filter_level: None,
                filter_characteristic: None,
                method: Static4Method::Radar,
                species: Species::Snover,
                lead: LeadAbility::CutecharmM,
                seed: 0xd6140374,
                encounter_min_level: 33,
                encounter_max_level: 33,
            };
            let results = generate_static4_states(&opts);
            let expected = pokefinder_radar!("test_data/method_pokeradar/cute_charm_male.txt");
            assert_list_eq!(results, expected);
        }

        #[test]
        fn shiny_cute_charm_female() {
            let opts = Gen4StaticOpts {
                tid: 39259,
                sid: 25081,
                initial_advances: 0,
                max_advances: 200,
                offset: 0,
                filter: PkmFilter::new_allow_all(),
                filter_level: None,
                filter_characteristic: None,
                method: Static4Method::Radar,
                species: Species::Snover,
                lead: LeadAbility::CutecharmF,
                seed: 0xd6140374,
                encounter_min_level: 33,
                encounter_max_level: 33,
            };
            let results = generate_static4_states(&opts);
            let expected = pokefinder_radar!("test_data/method_pokeradar/cute_charm_female.txt");
            assert_list_eq!(results, expected);
        }

        #[test]
        fn shiny_cute_charm_genderless() {
            let opts = Gen4StaticOpts {
                tid: 39259,
                sid: 25081,
                initial_advances: 0,
                max_advances: 200,
                offset: 0,
                filter: PkmFilter::new_allow_all(),
                filter_level: None,
                filter_characteristic: None,
                method: Static4Method::Radar,
                species: Species::Beldum,
                lead: LeadAbility::CutecharmF,
                seed: 0xd6140374,
                encounter_min_level: 52,
                encounter_max_level: 52,
            };
            let results = generate_static4_states(&opts);
            let expected =
                pokefinder_radar!("test_data/method_pokeradar/cute_charm_genderless.txt");
            assert_list_eq!(results, expected);
        }

        #[test]
        fn synchronize_hardy() {
            let opts = Gen4StaticOpts {
                tid: 39259,
                sid: 25081,
                initial_advances: 0,
                max_advances: 200,
                offset: 0,
                filter: PkmFilter::new_allow_all(),
                filter_level: None,
                filter_characteristic: None,
                method: Static4Method::Radar,
                species: Species::Snover,
                lead: LeadAbility::Synchronize(Nature::Hardy),
                seed: 0xd6140374,
                encounter_min_level: 33,
                encounter_max_level: 33,
            };
            let results = generate_static4_states(&opts);
            let expected = pokefinder_radar!("test_data/method_pokeradar/sync_hardy.txt");
            assert_list_eq!(results, expected);
        }
    }
}
