use super::base_state::{BaseStatic4State, Static4State};
use super::method1::get_method1_states;
use super::methodjk::{GateOnCheck1, get_methodjk_states, get_methodjk_sync_state};
use super::opts::{SearchStatic4Opts, Static4LeadInput};
use super::radar_shiny::get_radar_shiny_states;
use super::seed_filter::SeedFilters;
use crate::gen4::Static4Method;
use crate::gen4::calc_level::{ReversedHoneyLevel, SetLevel};
use crate::gen4::game_logic::{DpptLogic, HgssLogic};
use crate::generators::utils::recover_poke_rng_iv;
use crate::{Ivs, Species, iv_iter};
use wasm_bindgen::prelude::*;

// Mappers might return different types of iterators,
// so we use a macro to avoid having to write the same code for each method
macro_rules! search_iv_seeds {
    ($ivs:expr, $opts:expr, $mapper:expr) => {{
        let seeds = recover_poke_rng_iv(&$ivs, false);
        let states = seeds.into_iter().flat_map(move |seed| {
            $mapper(
                $opts.lead,
                $opts.species,
                $opts.encounter_min_level,
                $opts.encounter_max_level,
                $opts.tid,
                $opts.sid,
                $ivs,
                seed,
            )
        });
        // Don't check IVs since the states were derived from matching ivs
        states.filter(|state| $opts.filter.pass_filter_no_ivs(state))
    }};
}

macro_rules! search_seeds {
    ($opts:expr, $mapper:expr) => {{
        let states = iv_iter($opts.filter.min_ivs, $opts.filter.max_ivs)
            .flat_map(|ivs| search_iv_seeds!(ivs, $opts, $mapper));
        SeedFilters::from($opts).filter(states)
    }};
}

#[wasm_bindgen]
pub fn search_static4(opts: &SearchStatic4Opts) -> Vec<Static4State> {
    match opts.method {
        Static4Method::One => search_seeds!(opts, get_method1_states),
        Static4Method::DpptJ => search_seeds!(opts, get_methodjk_states::<DpptLogic, SetLevel>),
        Static4Method::HgssK => search_seeds!(opts, get_methodjk_states::<HgssLogic, SetLevel>),
        Static4Method::Honey => {
            search_seeds!(opts, get_methodjk_states::<DpptLogic, ReversedHoneyLevel>)
        }
        Static4Method::Radar => search_seeds!(opts, get_radar_states),
        Static4Method::ShinyRadar => search_seeds!(opts, get_radar_shiny_states),
    }
}

fn get_radar_states(
    lead: Static4LeadInput,
    species: Species,
    _min_level: u8,
    max_level: u8,
    tid: u16,
    sid: u16,
    ivs: Ivs,
    seed: u32,
) -> Vec<BaseStatic4State> {
    match lead {
        Static4LeadInput::Pressure => vec![],
        Static4LeadInput::Synchronize => {
            get_methodjk_sync_state::<DpptLogic, SetLevel, GateOnCheck1>(
                species, max_level, max_level, tid, sid, ivs, seed,
            )
            .collect()
        }
        _ => get_methodjk_states::<DpptLogic, SetLevel>(
            lead, species, max_level, max_level, tid, sid, ivs, seed,
        )
        .collect(),
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::gen4::LeadAbility;
    use crate::gen4::seed_time::calc_seed;
    use crate::{AbilityType, Characteristic, Gender, Nature, PkmFilter, Species};

    fn parse_honey_states(lead: LeadAbility, str: &str) -> Vec<BaseStatic4State> {
        let mut results: Vec<BaseStatic4State> = Vec::new();
        for raw_line in str.lines() {
            let line = raw_line.trim();

            if line.is_empty() {
                continue;
            }

            let parts: Vec<&str> = line.split("\t").collect();
            let seed = u32::from_str_radix(parts[0], 16).unwrap();
            let advance: usize = parts[1].parse().unwrap();
            // item
            // slot
            let level: u8 = parts[4].parse().unwrap();
            let pid = u32::from_str_radix(parts[5], 16).unwrap();
            let shiny = parts[6] != "No";
            let nature = Nature::from_str(parts[7]);
            let ability = AbilityType::from_pokefinder_str(parts[8]);
            let ivs = Ivs::from_pokefinder_strs(&parts[9..][..6]);
            let gender = Gender::from_pokefinder_str(parts[17]);
            let characteristic = Characteristic::from_pokefinder_str(parts[18]);

            results.push(BaseStatic4State {
                seed,
                advance,
                pid,
                ivs,
                ability,
                gender,
                nature,
                shiny,
                characteristic,
                lead,
                level,
            });
        }
        results
    }

    macro_rules! pokefinder_honey {
        ($lead:expr, $file:expr) => {
            parse_honey_states($lead, include_str!($file))
        };
    }

    fn parse_static_states(lead: LeadAbility, str: &str) -> Vec<BaseStatic4State> {
        let mut results: Vec<BaseStatic4State> = Vec::new();
        for raw_line in str.lines() {
            let line = raw_line.trim();

            if line.is_empty() {
                continue;
            }

            let parts: Vec<&str> = line.split("\t").collect();
            let seed = u32::from_str_radix(parts[0], 16).unwrap();
            let advance: usize = parts[1].parse().unwrap();
            let pid = u32::from_str_radix(parts[2], 16).unwrap();
            let shiny = parts[3] != "No";
            let nature = Nature::from_str(parts[4]);
            let ability = AbilityType::from_pokefinder_str(parts[5]);
            let ivs = Ivs::from_pokefinder_strs(&parts[6..][..6]);
            let gender = Gender::from_pokefinder_str(parts[14]);
            let characteristic = Characteristic::from_pokefinder_str(parts[15]);

            results.push(BaseStatic4State {
                seed,
                advance,
                pid,
                ivs,
                ability,
                gender,
                nature,
                shiny,
                characteristic,
                lead,

                // The level is not included in the static pokefinder output
                level: 0,
            });
        }
        results
    }

    macro_rules! pokefinder_static {
        ($lead:expr, $file:expr) => {
            parse_static_states($lead, include_str!($file))
        };
    }

    mod method1 {
        use super::*;
        use crate::{assert_list_eq, datetime, gen4::seed_time::SeedTime4, ivs};

        #[test]
        fn offset_10() {
            let opts = SearchStatic4Opts {
                tid: 12345,
                sid: 54321,
                offset: 10,
                year: Some(2000),
                month: None,
                encounter_min_level: 0,
                encounter_max_level: 0,
                min_delay: 800,
                max_delay: 900,
                min_advance: 0,
                max_advance: 30,
                force_second: None,
                method: Static4Method::One,
                species: Species::Omanyte,
                lead: Static4LeadInput::None,
                filter: PkmFilter {
                    min_ivs: ivs!(30 / 30 / 30 / 20 / 20 / 20),
                    ..Default::default()
                },
            };

            let results = search_static4(&opts);
            let expected = pokefinder_static!(LeadAbility::None, "test_data/method1/offset_10.txt");

            assert_list_eq!(results, expected);
        }

        #[test]
        fn min_advance_0() {
            let opts = SearchStatic4Opts {
                tid: 12345,
                sid: 54321,
                offset: 0,
                year: Some(2000),
                month: None,
                encounter_min_level: 0,
                encounter_max_level: 0,
                min_delay: 800,
                max_delay: 900,
                min_advance: 0,
                max_advance: 30,
                force_second: None,
                method: Static4Method::One,
                species: Species::Omanyte,
                lead: Static4LeadInput::None,
                filter: PkmFilter {
                    min_ivs: ivs!(30 / 30 / 30 / 20 / 20 / 20),
                    ..Default::default()
                },
            };

            let results = search_static4(&opts);
            let expected =
                pokefinder_static!(LeadAbility::None, "test_data/method1/min_advance_0.txt");

            assert_list_eq!(results, expected);
        }

        #[test]
        fn min_advance_40() {
            let opts = SearchStatic4Opts {
                tid: 12345,
                sid: 54321,
                offset: 0,
                year: Some(2000),
                month: None,
                encounter_min_level: 0,
                encounter_max_level: 0,
                min_delay: 800,
                max_delay: 900,
                min_advance: 40,
                max_advance: 60,
                force_second: None,
                method: Static4Method::One,
                species: Species::Omanyte,
                lead: Static4LeadInput::None,
                filter: PkmFilter {
                    min_ivs: ivs!(30 / 30 / 30 / 20 / 20 / 20),
                    ..Default::default()
                },
            };

            let results = search_static4(&opts);
            let expected =
                pokefinder_static!(LeadAbility::None, "test_data/method1/min_advance_40.txt");

            assert_list_eq!(results, expected);
        }

        #[test]
        fn delay_range_uses_decoded_delay() {
            let datetime = datetime!(2026-05-14 12:34:30).unwrap();
            let seed = calc_seed(&datetime, 1749);
            let state = BaseStatic4State::new(
                seed,
                Species::Omanyte,
                Nature::Hardy,
                1,
                0,
                12345,
                54321,
                ivs!(0 / 0 / 0 / 0 / 0 / 0),
                LeadAbility::None,
            );

            let results = SeedFilters {
                offset: 0,
                min_advance: 0,
                max_advance: 0,
                year: Some(datetime.year),
                month: Some(datetime.month),
                min_delay: 800,
                max_delay: 1750,
                force_second: Some(datetime.second),
            }
            .filter(std::iter::once(state));

            assert_list_eq!(
                results,
                [Static4State {
                    state: BaseStatic4State {
                        seed: 0x860c06ef,
                        advance: 0,
                        pid: 0,
                        ivs: ivs!(0 / 0 / 0 / 0 / 0 / 0),
                        ability: AbilityType::First,
                        gender: Gender::Female,
                        nature: Nature::Hardy,
                        shiny: false,
                        characteristic: Characteristic::LovesToEat,
                        lead: LeadAbility::None,
                        level: 1
                    },
                    seed_time: SeedTime4 {
                        seed: 0x860c06ef,
                        datetime: datetime!(2026-05-09 12:59:30).unwrap(),
                        delay: 1749
                    }
                }]
            );
        }

        #[test]
        fn optional_year_returns_first_matching_year() {
            let datetime = datetime!(2026-05-14 12:34:30).unwrap();
            let seed = calc_seed(&datetime, 1749);
            let state = BaseStatic4State::new(
                seed,
                Species::Omanyte,
                Nature::Hardy,
                1,
                0,
                12345,
                54321,
                ivs!(0 / 0 / 0 / 0 / 0 / 0),
                LeadAbility::None,
            );

            let results = SeedFilters {
                offset: 0,
                min_advance: 0,
                max_advance: 0,
                year: None,
                month: Some(datetime.month),
                min_delay: 1749,
                max_delay: 1750,
                force_second: Some(datetime.second),
            }
            .filter(std::iter::once(state));

            assert_list_eq!(
                results,
                [Static4State {
                    state: BaseStatic4State {
                        seed: 0x860c06ef,
                        advance: 0,
                        pid: 0,
                        ivs: ivs!(0 / 0 / 0 / 0 / 0 / 0),
                        ability: AbilityType::First,
                        gender: Gender::Female,
                        nature: Nature::Hardy,
                        shiny: false,
                        characteristic: Characteristic::LovesToEat,
                        lead: LeadAbility::None,
                        level: 1
                    },
                    seed_time: SeedTime4 {
                        seed: 0x860c06ef,
                        datetime: datetime!(2025-05-09 12:59:30).unwrap(),
                        delay: 1750
                    }
                }]
            );
        }
    }

    mod methodj {
        use super::*;
        use crate::{assert_list_eq, ivs};

        #[test]
        fn no_lead() {
            let opts = SearchStatic4Opts {
                tid: 12345,
                sid: 54321,
                offset: 0,
                lead: Static4LeadInput::None,
                method: Static4Method::DpptJ,
                species: Species::Drifloon,
                filter: PkmFilter {
                    min_ivs: ivs!(30 / 30 / 30 / 20 / 20 / 20),
                    ..Default::default()
                },
                year: Some(2000),
                month: None,
                encounter_min_level: 0,
                encounter_max_level: 0,
                min_delay: 800,
                max_delay: 900,
                min_advance: 0,
                max_advance: 30,
                force_second: None,
            };
            let results = search_static4(&opts);
            let expected = pokefinder_static!(LeadAbility::None, "test_data/methodj/no_lead.txt");

            assert_list_eq!(results, expected);
        }

        #[test]
        fn pressure() {
            let opts = SearchStatic4Opts {
                tid: 12345,
                sid: 54321,
                offset: 0,
                lead: Static4LeadInput::Pressure,
                method: Static4Method::DpptJ,
                species: Species::Drifloon,
                filter: PkmFilter {
                    min_ivs: ivs!(30 / 30 / 30 / 20 / 20 / 20),
                    ..Default::default()
                },
                year: Some(2000),
                month: None,
                encounter_min_level: 0,
                encounter_max_level: 0,
                min_delay: 800,
                max_delay: 900,
                min_advance: 0,
                max_advance: 30,
                force_second: None,
            };
            let results = search_static4(&opts);
            // Pressure is a no-op for static Pokemon, so same behavior as no lead
            let expected =
                pokefinder_static!(LeadAbility::Pressure, "test_data/methodj/no_lead.txt");

            assert_list_eq!(results, expected);
        }

        #[test]
        fn cutecharm_m() {
            let opts = SearchStatic4Opts {
                tid: 12345,
                sid: 54321,
                offset: 0,
                method: Static4Method::DpptJ,
                species: Species::Drifloon,
                lead: Static4LeadInput::CutecharmM,
                filter: PkmFilter {
                    min_ivs: ivs!(30 / 30 / 30 / 20 / 20 / 20),
                    ..Default::default()
                },
                year: Some(2000),
                month: None,
                encounter_min_level: 0,
                encounter_max_level: 0,
                min_delay: 800,
                max_delay: 900,
                min_advance: 0,
                max_advance: 30,
                force_second: None,
            };
            let results = search_static4(&opts);
            let expected =
                pokefinder_static!(LeadAbility::CutecharmM, "test_data/methodj/cutecharm_m.txt");

            assert_list_eq!(results, expected);
        }

        #[test]
        fn cutecharm_f() {
            let opts = SearchStatic4Opts {
                tid: 12345,
                sid: 54321,
                offset: 0,
                method: Static4Method::DpptJ,
                species: Species::Drifloon,
                lead: Static4LeadInput::CutecharmF,
                filter: PkmFilter {
                    min_ivs: ivs!(30 / 30 / 30 / 20 / 20 / 20),
                    ..Default::default()
                },
                year: Some(2000),
                month: None,
                encounter_min_level: 0,
                encounter_max_level: 0,
                min_delay: 800,
                max_delay: 900,
                min_advance: 0,
                max_advance: 30,
                force_second: None,
            };
            let results = search_static4(&opts);
            let expected =
                pokefinder_static!(LeadAbility::CutecharmF, "test_data/methodj/cutecharm_f.txt");

            assert_list_eq!(results, expected);
        }

        #[test]
        fn sync() {
            let opts = SearchStatic4Opts {
                tid: 12345,
                sid: 54321,
                offset: 0,
                method: Static4Method::DpptJ,
                species: Species::Drifloon,
                lead: Static4LeadInput::Synchronize,
                filter: PkmFilter {
                    min_ivs: ivs!(30 / 30 / 30 / 25 / 25 / 20),
                    ..Default::default()
                },
                year: Some(2000),
                month: None,
                encounter_min_level: 0,
                encounter_max_level: 0,
                min_delay: 800,
                max_delay: 801,
                min_advance: 0,
                max_advance: 200,
                force_second: None,
            };
            let results = search_static4(&opts);
            let expected = pokefinder_static!(LeadAbility::None, "test_data/methodj/sync.txt")
                .into_iter()
                .map(|mut state| {
                    state.lead = LeadAbility::Synchronize(state.nature);
                    state
                })
                .collect::<Vec<_>>();

            assert_list_eq!(results, expected);
        }
    }

    mod methodk {
        use super::*;
        use crate::{assert_list_eq, ivs};

        #[test]
        fn no_lead() {
            let opts = SearchStatic4Opts {
                tid: 12345,
                sid: 54321,
                offset: 0,
                species: Species::Snorlax,
                method: Static4Method::HgssK,
                lead: Static4LeadInput::None,
                filter: PkmFilter {
                    min_ivs: ivs!(30 / 30 / 30 / 20 / 20 / 20),
                    ..Default::default()
                },
                encounter_min_level: 0,
                encounter_max_level: 0,
                min_advance: 0,
                max_advance: 30,
                min_delay: 800,
                max_delay: 900,
                year: Some(2000),
                month: None,
                force_second: None,
            };
            let results = search_static4(&opts);
            let expected = pokefinder_static!(LeadAbility::None, "test_data/methodk/no_lead.txt");

            assert_list_eq!(results, expected);
        }

        #[test]
        fn pressure() {
            let opts = SearchStatic4Opts {
                tid: 12345,
                sid: 54321,
                offset: 0,
                species: Species::Snorlax,
                method: Static4Method::HgssK,
                lead: Static4LeadInput::Pressure,
                filter: PkmFilter {
                    min_ivs: ivs!(30 / 30 / 30 / 20 / 20 / 20),
                    ..Default::default()
                },
                encounter_min_level: 0,
                encounter_max_level: 0,
                min_advance: 0,
                max_advance: 30,
                min_delay: 800,
                max_delay: 900,
                year: Some(2000),
                month: None,
                force_second: None,
            };
            let results = search_static4(&opts);
            // Pressure is a no-op for static Pokemon, so same behavior as no lead
            let expected =
                pokefinder_static!(LeadAbility::Pressure, "test_data/methodk/no_lead.txt");

            assert_list_eq!(results, expected);
        }

        #[test]
        fn sync() {
            let opts = SearchStatic4Opts {
                tid: 12345,
                sid: 54321,
                offset: 0,
                species: Species::Snorlax,
                method: Static4Method::HgssK,
                lead: Static4LeadInput::Synchronize,
                filter: PkmFilter {
                    min_ivs: ivs!(30 / 30 / 30 / 25 / 25 / 20),
                    ..Default::default()
                },
                encounter_min_level: 0,
                encounter_max_level: 0,
                min_advance: 0,
                max_advance: 200,
                min_delay: 800,
                max_delay: 801,
                year: Some(2000),
                month: None,
                force_second: None,
            };
            let results = search_static4(&opts);
            let expected = pokefinder_static!(LeadAbility::None, "test_data/methodk/sync.txt")
                .into_iter()
                .map(|mut state| {
                    state.lead = LeadAbility::Synchronize(state.nature);
                    state
                })
                .collect::<Vec<_>>();

            assert_list_eq!(results, expected);
        }

        #[test]
        fn cutecharm_f() {
            let opts = SearchStatic4Opts {
                tid: 12345,
                sid: 54321,
                offset: 0,
                species: Species::Snorlax,
                method: Static4Method::HgssK,
                lead: Static4LeadInput::CutecharmF,
                filter: PkmFilter {
                    min_ivs: ivs!(30 / 30 / 30 / 20 / 20 / 20),
                    ..Default::default()
                },
                encounter_min_level: 0,
                encounter_max_level: 0,
                min_advance: 0,
                max_advance: 30,
                min_delay: 800,
                max_delay: 900,
                year: Some(2000),
                month: None,
                force_second: None,
            };
            let results = search_static4(&opts);
            let expected =
                pokefinder_static!(LeadAbility::CutecharmF, "test_data/methodk/cutecharm_f.txt");

            assert_list_eq!(results, expected);
        }

        #[test]
        fn cutecharm_m() {
            let opts = SearchStatic4Opts {
                tid: 12345,
                sid: 54321,
                offset: 0,
                species: Species::Snorlax,
                method: Static4Method::HgssK,
                lead: Static4LeadInput::CutecharmM,
                filter: PkmFilter {
                    min_ivs: ivs!(30 / 30 / 30 / 20 / 20 / 20),
                    ..Default::default()
                },
                encounter_min_level: 0,
                encounter_max_level: 0,
                min_advance: 0,
                max_advance: 30,
                min_delay: 800,
                max_delay: 900,
                year: Some(2000),
                month: None,
                force_second: None,
            };
            let results = search_static4(&opts);
            let expected =
                pokefinder_static!(LeadAbility::CutecharmM, "test_data/methodk/cutecharm_m.txt");

            assert_list_eq!(results, expected);
        }
    }

    mod method_honey {
        use super::*;
        use crate::{assert_list_eq, ivs};

        #[test]
        fn no_lead() {
            let opts = SearchStatic4Opts {
                tid: 12345,
                sid: 54321,
                offset: 0,
                species: Species::Munchlax,
                method: Static4Method::Honey,
                lead: Static4LeadInput::None,
                filter: PkmFilter {
                    min_ivs: ivs!(30 / 30 / 30 / 20 / 20 / 20),
                    ..Default::default()
                },
                encounter_min_level: 5,
                encounter_max_level: 15,
                min_advance: 0,
                max_advance: 30,
                min_delay: 800,
                max_delay: 900,
                year: Some(2000),
                month: None,
                force_second: None,
            };
            let results = search_static4(&opts);
            let expected =
                pokefinder_honey!(LeadAbility::None, "test_data/method_honey/no_lead.txt");

            assert_list_eq!(results, expected);
        }

        #[test]
        fn sync() {
            let opts = SearchStatic4Opts {
                tid: 12345,
                sid: 54321,
                offset: 0,
                species: Species::Munchlax,
                method: Static4Method::Honey,
                lead: Static4LeadInput::Synchronize,
                filter: PkmFilter {
                    min_ivs: ivs!(30 / 30 / 30 / 25 / 25 / 20),
                    ..Default::default()
                },
                encounter_min_level: 5,
                encounter_max_level: 15,
                min_advance: 0,
                max_advance: 200,
                min_delay: 800,
                max_delay: 801,
                year: Some(2000),
                month: None,
                force_second: None,
            };
            let results = search_static4(&opts);
            let expected = pokefinder_honey!(LeadAbility::None, "test_data/method_honey/sync.txt")
                .into_iter()
                .map(|mut state| {
                    state.lead = LeadAbility::Synchronize(state.nature);
                    state
                })
                .collect::<Vec<_>>();

            assert_list_eq!(results, expected);
        }

        #[test]
        fn cutecharm_f() {
            let opts = SearchStatic4Opts {
                tid: 12345,
                sid: 54321,
                offset: 0,
                species: Species::Munchlax,
                method: Static4Method::Honey,
                lead: Static4LeadInput::CutecharmF,
                filter: PkmFilter {
                    min_ivs: ivs!(30 / 30 / 30 / 20 / 20 / 20),
                    ..Default::default()
                },
                encounter_min_level: 5,
                encounter_max_level: 15,
                min_advance: 0,
                max_advance: 30,
                min_delay: 800,
                max_delay: 900,
                year: Some(2000),
                month: None,
                force_second: None,
            };
            let results = search_static4(&opts);
            let expected = pokefinder_honey!(
                LeadAbility::CutecharmF,
                "test_data/method_honey/cutecharm_f.txt"
            );

            assert_list_eq!(results, expected);
        }

        #[test]
        fn cutecharm_m() {
            let opts = SearchStatic4Opts {
                tid: 12345,
                sid: 54321,
                offset: 0,
                species: Species::Munchlax,
                method: Static4Method::Honey,
                lead: Static4LeadInput::CutecharmM,
                filter: PkmFilter {
                    min_ivs: ivs!(30 / 30 / 30 / 20 / 20 / 20),
                    ..Default::default()
                },
                encounter_min_level: 5,
                encounter_max_level: 15,
                min_advance: 0,
                max_advance: 30,
                min_delay: 800,
                max_delay: 900,
                year: Some(2000),
                month: None,
                force_second: None,
            };
            let results = search_static4(&opts);
            let expected = pokefinder_honey!(
                LeadAbility::CutecharmM,
                "test_data/method_honey/cutecharm_m.txt"
            );

            assert_list_eq!(results, expected);
        }

        #[test]
        fn pressure() {
            let opts = SearchStatic4Opts {
                tid: 12345,
                sid: 54321,
                offset: 0,
                species: Species::Munchlax,
                method: Static4Method::Honey,
                lead: Static4LeadInput::Pressure,
                filter: PkmFilter {
                    min_ivs: ivs!(30 / 30 / 30 / 20 / 20 / 20),
                    ..Default::default()
                },
                encounter_min_level: 5,
                encounter_max_level: 15,
                min_advance: 0,
                max_advance: 30,
                min_delay: 800,
                max_delay: 900,
                year: Some(2000),
                month: None,
                force_second: None,
            };
            let results = search_static4(&opts);
            let expected =
                pokefinder_honey!(LeadAbility::Pressure, "test_data/method_honey/pressure.txt");

            assert_list_eq!(results, expected);
        }
    }

    mod method_radar {
        use super::*;
        use crate::{assert_list_eq, ivs};

        #[test]
        fn no_lead() {
            let opts = SearchStatic4Opts {
                tid: 39259,
                sid: 25081,
                offset: 0,
                method: Static4Method::Radar,
                species: Species::Snover,
                lead: Static4LeadInput::None,
                filter: PkmFilter {
                    min_ivs: ivs!(28 / 28 / 28 / 28 / 28 / 28),
                    ..Default::default()
                },
                year: Some(2000),
                month: None,
                encounter_min_level: 33,
                encounter_max_level: 33,
                min_delay: 800,
                max_delay: 900,
                min_advance: 0,
                max_advance: 30,
                force_second: None,
            };
            let results = search_static4(&opts);
            let expected =
                pokefinder_honey!(LeadAbility::None, "test_data/method_pokeradar/no_lead.txt");

            assert_list_eq!(results, expected);
        }

        #[test]
        fn sync() {
            let opts = SearchStatic4Opts {
                tid: 39259,
                sid: 25081,
                offset: 0,
                method: Static4Method::Radar,
                species: Species::Snover,
                lead: Static4LeadInput::Synchronize,
                filter: PkmFilter {
                    min_ivs: ivs!(28 / 28 / 28 / 28 / 28 / 28),
                    ..Default::default()
                },
                year: Some(2000),
                month: None,
                encounter_min_level: 33,
                encounter_max_level: 33,
                min_delay: 800,
                max_delay: 900,
                min_advance: 0,
                max_advance: 5,
                force_second: None,
            };
            let results = search_static4(&opts);
            let expected =
                pokefinder_honey!(LeadAbility::None, "test_data/method_pokeradar/sync.txt")
                    .into_iter()
                    .map(|mut state| {
                        state.lead = LeadAbility::Synchronize(state.nature);
                        state
                    })
                    .collect::<Vec<_>>();

            assert_list_eq!(results, expected);
        }

        #[test]
        fn cutecharm_f() {
            let opts = SearchStatic4Opts {
                tid: 39259,
                sid: 25081,
                offset: 0,
                method: Static4Method::Radar,
                species: Species::Snover,
                lead: Static4LeadInput::CutecharmF,
                filter: PkmFilter {
                    min_ivs: ivs!(28 / 28 / 28 / 28 / 28 / 28),
                    ..Default::default()
                },
                year: Some(2000),
                month: None,
                encounter_min_level: 33,
                encounter_max_level: 33,
                min_delay: 800,
                max_delay: 900,
                min_advance: 0,
                max_advance: 30,
                force_second: None,
            };
            let results = search_static4(&opts);
            let expected = pokefinder_honey!(
                LeadAbility::CutecharmF,
                "test_data/method_pokeradar/cutecharm_f.txt"
            );

            assert_list_eq!(results, expected);
        }

        #[test]
        fn cutecharm_m() {
            let opts = SearchStatic4Opts {
                tid: 39259,
                sid: 25081,
                offset: 0,
                method: Static4Method::Radar,
                species: Species::Snover,
                lead: Static4LeadInput::CutecharmM,
                filter: PkmFilter {
                    min_ivs: ivs!(28 / 28 / 28 / 28 / 28 / 28),
                    ..Default::default()
                },
                year: Some(2000),
                month: None,
                encounter_min_level: 33,
                encounter_max_level: 33,
                min_delay: 800,
                max_delay: 900,
                min_advance: 0,
                max_advance: 30,
                force_second: None,
            };
            let results = search_static4(&opts);
            let expected = pokefinder_honey!(
                LeadAbility::CutecharmM,
                "test_data/method_pokeradar/cutecharm_m.txt"
            );

            assert_list_eq!(results, expected);
        }
    }

    mod method_radar_shiny {
        use super::*;
        use crate::{assert_list_eq, ivs};

        #[test]
        fn no_lead() {
            let opts = SearchStatic4Opts {
                tid: 39259,
                sid: 25081,
                offset: 0,
                method: Static4Method::ShinyRadar,
                species: Species::Snover,
                lead: Static4LeadInput::None,
                filter: PkmFilter {
                    min_ivs: ivs!(28 / 28 / 28 / 28 / 28 / 28),
                    ..Default::default()
                },
                year: Some(2000),
                month: None,
                encounter_min_level: 33,
                encounter_max_level: 33,
                min_delay: 800,
                max_delay: 900,
                min_advance: 0,
                max_advance: 30,
                force_second: None,
            };
            let results = search_static4(&opts);
            let expected = pokefinder_honey!(
                LeadAbility::None,
                "test_data/method_shiny_pokeradar/no_lead.txt"
            );

            assert_list_eq!(results, expected);
        }

        #[test]
        fn sync() {
            let opts = SearchStatic4Opts {
                tid: 39259,
                sid: 25081,
                offset: 0,
                method: Static4Method::ShinyRadar,
                species: Species::Snover,
                lead: Static4LeadInput::Synchronize,
                filter: PkmFilter {
                    min_ivs: ivs!(28 / 28 / 28 / 28 / 28 / 28),
                    ..Default::default()
                },
                year: Some(2000),
                month: None,
                encounter_min_level: 33,
                encounter_max_level: 33,
                min_delay: 800,
                max_delay: 900,
                min_advance: 0,
                max_advance: 5,
                force_second: None,
            };
            let results = search_static4(&opts);
            let expected = pokefinder_honey!(
                LeadAbility::None,
                "test_data/method_shiny_pokeradar/sync.txt"
            )
            .into_iter()
            .map(|mut state| {
                state.lead = LeadAbility::Synchronize(state.nature);
                state
            })
            .collect::<Vec<_>>();

            assert_list_eq!(results, expected);
        }

        #[test]
        fn cutecharm_f() {
            let opts = SearchStatic4Opts {
                tid: 39259,
                sid: 25081,
                offset: 0,
                method: Static4Method::ShinyRadar,
                species: Species::Snover,
                lead: Static4LeadInput::CutecharmF,
                filter: PkmFilter {
                    min_ivs: ivs!(28 / 28 / 28 / 28 / 28 / 28),
                    ..Default::default()
                },
                year: Some(2000),
                month: None,
                encounter_min_level: 33,
                encounter_max_level: 33,
                min_delay: 800,
                max_delay: 900,
                min_advance: 0,
                max_advance: 30,
                force_second: None,
            };
            let results = search_static4(&opts);
            let expected = pokefinder_honey!(
                LeadAbility::CutecharmF,
                "test_data/method_shiny_pokeradar/cutecharm_f.txt"
            );

            assert_list_eq!(results, expected);
        }

        #[test]
        fn cutecharm_m() {
            let opts = SearchStatic4Opts {
                tid: 39259,
                sid: 25081,
                offset: 0,
                method: Static4Method::ShinyRadar,
                species: Species::Snover,
                lead: Static4LeadInput::CutecharmM,
                filter: PkmFilter {
                    min_ivs: ivs!(28 / 28 / 28 / 28 / 28 / 28),
                    ..Default::default()
                },
                year: Some(2000),
                month: None,
                encounter_min_level: 33,
                encounter_max_level: 33,
                min_delay: 800,
                max_delay: 900,
                min_advance: 0,
                max_advance: 30,
                force_second: None,
            };
            let results = search_static4(&opts);
            let expected = pokefinder_honey!(
                LeadAbility::CutecharmM,
                "test_data/method_shiny_pokeradar/cutecharm_m.txt"
            );

            assert_list_eq!(results, expected);
        }
    }
}
