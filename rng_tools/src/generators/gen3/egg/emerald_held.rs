use crate::Nature;
use crate::rng::lcrng::Pokerng;
use crate::rng::{Rng, StateIterator};
use crate::{Gender, Species, gen3_shiny};
use serde::{Deserialize, Serialize};
use tsify_next::Tsify;
use wasm_bindgen::prelude::*;

#[derive(Default, Debug, Clone, Copy, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub enum Compatability {
    #[default]
    DontLikeEachOther = 20,
    GetAlong = 50,
    GetAlongVeryWell = 70,
}

struct Gen3HeldEggPid {
    advance: u32,
    redraws: usize,
    pid: u32,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct Gen3HeldEgg {
    pub advance: u32,
    pub redraws: usize,
    pub pid: u32,
    pub gender: Gender,
    pub shiny: bool,
    pub nature: Nature,
    pub ability: u8,
}

impl Gen3HeldEgg {
    fn from_pid(
        egg: &Gen3HeldEggPid,
        species: Species,
        tid: u16,
        sid: u16,
        delay: i16,
        lua_adjustment: bool,
    ) -> Self {
        let pid = egg.pid;
        let mut advance = egg
            .advance
            // Lua scripts are off by 1
            .saturating_add(lua_adjustment as u32);

        if delay > 0 {
            advance = advance.saturating_sub(delay as u32);
        } else {
            advance = advance.saturating_add(delay.unsigned_abs() as u32);
        }

        let gender = match species {
            Species::NidoranF | Species::Illumise => {
                let val = (pid & 0xFFFF) as u16;
                if val < 0x8000 {
                    Gender::Female
                } else {
                    Gender::Male
                }
            }
            _ => species.gender_from_pid(pid),
        };

        Self {
            pid,
            advance,
            gender,
            redraws: egg.redraws,
            nature: Nature::from_pid(pid),
            shiny: gen3_shiny(pid, tid, sid),
            ability: (pid & 1) as u8,
        }
    }
}

#[derive(Debug, Clone, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct Egg3HeldFilters {
    pub shiny: bool,
    pub nature: Option<Nature>,
    pub gender: Option<Gender>,
}

impl Egg3HeldFilters {
    fn pass_filter(&self, egg: &Gen3HeldEgg) -> bool {
        if self.shiny && !egg.shiny {
            return false;
        }

        if let Some(nature) = self.nature {
            if egg.nature != nature {
                return false;
            }
        }

        if let Some(gender) = self.gender {
            if egg.gender != gender {
                return false;
            }
        }

        true
    }
}

#[derive(Debug, Clone, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct Egg3HeldOptions {
    pub delay: i16,
    pub initial_advances: usize,
    pub max_advances: usize,
    pub female_has_everstone: bool,
    pub female_nature: Nature,
    pub calibration: u16,
    pub min_redraw: usize,
    pub max_redraw: usize,
    pub compatability: Compatability,
    pub tid: u16,
    pub sid: u16,
    pub egg_species: Species,
    pub filters: Egg3HeldFilters,
    pub lua_adjustment: bool,
}

#[wasm_bindgen]
pub fn emerald_egg_held_states(opts: &Egg3HeldOptions) -> Vec<Gen3HeldEgg> {
    let mut result = StateIterator::new(Pokerng::new(0))
        .enumerate()
        .skip(opts.initial_advances)
        .take(opts.max_advances.saturating_add(1))
        .flat_map(|(advance, rng)| generate_redraw_states(rng, opts, advance))
        .collect::<Vec<Gen3HeldEgg>>();
    result.sort_by(|a, b| a.advance.cmp(&b.advance));
    result
}

fn generate_redraw_states(
    mut rng: Pokerng,
    opts: &Egg3HeldOptions,
    advance: usize,
) -> Vec<Gen3HeldEgg> {
    if (rng.rand::<u16>() as u32).wrapping_mul(100) / 0xffff >= (opts.compatability as u32) {
        return vec![];
    }

    (opts.min_redraw..=opts.max_redraw)
        .filter_map(|redraw| {
            let egg_pid = generate_state(
                rng,
                opts.calibration,
                opts.female_has_everstone,
                opts.female_nature,
                advance as u32,
                redraw,
            )?;
            let spread = Gen3HeldEgg::from_pid(
                &egg_pid,
                opts.egg_species,
                opts.tid,
                opts.sid,
                opts.delay,
                opts.lua_adjustment,
            );
            if opts.filters.pass_filter(&spread) {
                Some(spread)
            } else {
                None
            }
        })
        .collect()
}

fn generate_state(
    mut go: Pokerng,
    calibration: u16,
    female_has_everstone: bool,
    female_nature: Nature,
    advance: u32,
    redraws: usize,
) -> Option<Gen3HeldEggPid> {
    let use_everstone = match female_has_everstone {
        true => (go.rand::<u16>() >> 15) == 0,
        false => false,
    };

    let offset = (redraws as u16).wrapping_mul(3).wrapping_add(calibration) as u32;
    let held_advance = (advance).wrapping_sub(calibration.into());
    let seed = ((advance).wrapping_add(1).wrapping_sub(offset)) & 0xffff;
    let mut trng = Pokerng::new(seed);

    if !use_everstone {
        let pid = (go.rand_max::<u16>(0xfffe) + 1) as u32 | ((trng.rand::<u16>() as u32) << 16);
        return Some(Gen3HeldEggPid {
            redraws,
            pid,
            advance: held_advance,
        });
    }

    // Stop after 17 due to vblank.
    // If we haven't found a result yet, we probably won't find one after this.
    (0..17)
        .find_map(|_| {
            let test_pid = (go.rand::<u16>() as u32) | ((trng.rand::<u16>() as u32) << 16);
            match Nature::from_pid(test_pid) == female_nature {
                true => Some(test_pid),
                false => None,
            }
        })
        .map(|pid| Gen3HeldEggPid {
            redraws,
            pid,
            advance: held_advance,
        })
}

#[cfg(test)]
mod test {
    use super::Gender::*;
    use super::Nature::*;
    use super::*;
    use crate::assert_list_eq;

    #[test]
    fn generates_results() {
        let opts = Egg3HeldOptions {
            delay: 0,
            compatability: Compatability::DontLikeEachOther,
            calibration: 18,
            initial_advances: 0,
            max_advances: 10,
            min_redraw: 0,
            max_redraw: 5,
            female_has_everstone: false,
            female_nature: Nature::Hardy,
            tid: 0,
            sid: 0,
            lua_adjustment: false,
            egg_species: Species::Bulbasaur,
            filters: Egg3HeldFilters {
                shiny: false,
                nature: None,
                gender: None,
            },
        };

        let results = emerald_egg_held_states(&opts);
        let expected = [
            Gen3HeldEgg {
                advance: 4294967278,
                redraws: 0,
                pid: 0xf042e97f,
                gender: Male,
                shiny: false,
                nature: Mild,
                ability: 1,
            },
            Gen3HeldEgg {
                advance: 4294967278,
                redraws: 1,
                pid: 0x2aefe97f,
                gender: Male,
                shiny: false,
                nature: Lonely,
                ability: 1,
            },
            Gen3HeldEgg {
                advance: 4294967278,
                redraws: 2,
                pid: 0x659ce97f,
                gender: Male,
                shiny: false,
                nature: Relaxed,
                ability: 1,
            },
            Gen3HeldEgg {
                advance: 4294967278,
                redraws: 3,
                pid: 0xa049e97f,
                gender: Male,
                shiny: false,
                nature: Jolly,
                ability: 1,
            },
            Gen3HeldEgg {
                advance: 4294967278,
                redraws: 4,
                pid: 0xdaf6e97f,
                gender: Male,
                shiny: false,
                nature: Rash,
                ability: 1,
            },
            Gen3HeldEgg {
                advance: 4294967278,
                redraws: 5,
                pid: 0x15a3e97f,
                gender: Male,
                shiny: false,
                nature: Naughty,
                ability: 1,
            },
            Gen3HeldEgg {
                advance: 4294967281,
                redraws: 0,
                pid: 0xb5958e43,
                gender: Male,
                shiny: false,
                nature: Naughty,
                ability: 1,
            },
            Gen3HeldEgg {
                advance: 4294967281,
                redraws: 1,
                pid: 0xf0428e43,
                gender: Male,
                shiny: false,
                nature: Timid,
                ability: 1,
            },
            Gen3HeldEgg {
                advance: 4294967281,
                redraws: 2,
                pid: 0x2aef8e43,
                gender: Male,
                shiny: false,
                nature: Calm,
                ability: 1,
            },
            Gen3HeldEgg {
                advance: 4294967281,
                redraws: 3,
                pid: 0x659c8e43,
                gender: Male,
                shiny: false,
                nature: Lonely,
                ability: 1,
            },
            Gen3HeldEgg {
                advance: 4294967281,
                redraws: 4,
                pid: 0xa0498e43,
                gender: Male,
                shiny: false,
                nature: Relaxed,
                ability: 1,
            },
            Gen3HeldEgg {
                advance: 4294967281,
                redraws: 5,
                pid: 0xdaf68e43,
                gender: Male,
                shiny: false,
                nature: Jolly,
                ability: 1,
            },
        ];

        assert_list_eq!(results, expected);
    }

    #[test]
    fn reasonable_initial_advances() {
        let opts = Egg3HeldOptions {
            delay: 0,
            compatability: Compatability::DontLikeEachOther,
            calibration: 18,
            initial_advances: 1000,
            max_advances: 10,
            min_redraw: 0,
            max_redraw: 5,
            female_has_everstone: false,
            female_nature: Nature::Hardy,
            tid: 0,
            sid: 0,
            lua_adjustment: false,
            egg_species: Species::Bulbasaur,
            filters: Egg3HeldFilters {
                shiny: false,
                nature: None,
                gender: None,
            },
        };

        let results = emerald_egg_held_states(&opts);
        let expected = [
            Gen3HeldEgg {
                advance: 983,
                redraws: 0,
                pid: 0xd23d2c1d,
                gender: Female,
                shiny: false,
                nature: Quirky,
                ability: 1,
            },
            Gen3HeldEgg {
                advance: 983,
                redraws: 1,
                pid: 0xcea2c1d,
                gender: Female,
                shiny: false,
                nature: Lax,
                ability: 1,
            },
            Gen3HeldEgg {
                advance: 983,
                redraws: 2,
                pid: 0x47972c1d,
                gender: Female,
                shiny: false,
                nature: Modest,
                ability: 1,
            },
            Gen3HeldEgg {
                advance: 983,
                redraws: 3,
                pid: 0x82452c1d,
                gender: Female,
                shiny: false,
                nature: Relaxed,
                ability: 1,
            },
            Gen3HeldEgg {
                advance: 983,
                redraws: 4,
                pid: 0xbcf22c1d,
                gender: Female,
                shiny: false,
                nature: Jolly,
                ability: 1,
            },
            Gen3HeldEgg {
                advance: 983,
                redraws: 5,
                pid: 0xf79f2c1d,
                gender: Female,
                shiny: false,
                nature: Rash,
                ability: 1,
            },
            Gen3HeldEgg {
                advance: 984,
                redraws: 0,
                pid: 0x1404aa0a,
                gender: Female,
                shiny: false,
                nature: Rash,
                ability: 0,
            },
            Gen3HeldEgg {
                advance: 984,
                redraws: 1,
                pid: 0x4eb1aa0a,
                gender: Female,
                shiny: false,
                nature: Hardy,
                ability: 0,
            },
            Gen3HeldEgg {
                advance: 984,
                redraws: 2,
                pid: 0x895eaa0a,
                gender: Female,
                shiny: false,
                nature: Docile,
                ability: 0,
            },
            Gen3HeldEgg {
                advance: 984,
                redraws: 3,
                pid: 0xc40baa0a,
                gender: Female,
                shiny: false,
                nature: Serious,
                ability: 0,
            },
            Gen3HeldEgg {
                advance: 984,
                redraws: 4,
                pid: 0xfeb8aa0a,
                gender: Female,
                shiny: false,
                nature: Bashful,
                ability: 0,
            },
            Gen3HeldEgg {
                advance: 984,
                redraws: 5,
                pid: 0x3965aa0a,
                gender: Female,
                shiny: false,
                nature: Adamant,
                ability: 0,
            },
            Gen3HeldEgg {
                advance: 987,
                redraws: 0,
                pid: 0xd957c6ec,
                gender: Male,
                shiny: false,
                nature: Adamant,
                ability: 0,
            },
            Gen3HeldEgg {
                advance: 987,
                redraws: 1,
                pid: 0x1404c6ec,
                gender: Male,
                shiny: false,
                nature: Jolly,
                ability: 0,
            },
            Gen3HeldEgg {
                advance: 987,
                redraws: 2,
                pid: 0x4eb1c6ec,
                gender: Male,
                shiny: false,
                nature: Rash,
                ability: 0,
            },
            Gen3HeldEgg {
                advance: 987,
                redraws: 3,
                pid: 0x895ec6ec,
                gender: Male,
                shiny: false,
                nature: Hardy,
                ability: 0,
            },
            Gen3HeldEgg {
                advance: 987,
                redraws: 4,
                pid: 0xc40bc6ec,
                gender: Male,
                shiny: false,
                nature: Docile,
                ability: 0,
            },
            Gen3HeldEgg {
                advance: 987,
                redraws: 5,
                pid: 0xfeb8c6ec,
                gender: Male,
                shiny: false,
                nature: Serious,
                ability: 0,
            },
        ];

        assert_list_eq!(results, expected);
    }

    #[test]
    fn compatability_get_along() {
        let opts = Egg3HeldOptions {
            delay: 0,
            compatability: Compatability::GetAlong,
            calibration: 18,
            initial_advances: 1000,
            max_advances: 3,
            min_redraw: 0,
            max_redraw: 1,
            female_has_everstone: false,
            female_nature: Nature::Hardy,
            tid: 0,
            sid: 0,
            lua_adjustment: false,
            egg_species: Species::Bulbasaur,
            filters: Egg3HeldFilters {
                shiny: false,
                nature: None,
                gender: None,
            },
        };

        let results = emerald_egg_held_states(&opts);
        let expected = [
            Gen3HeldEgg {
                advance: 982,
                redraws: 0,
                pid: 0x907710c8,
                gender: Male,
                shiny: false,
                nature: Lax,
                ability: 0,
            },
            Gen3HeldEgg {
                advance: 982,
                redraws: 1,
                pid: 0xcb2410c8,
                gender: Male,
                shiny: false,
                nature: Modest,
                ability: 0,
            },
            Gen3HeldEgg {
                advance: 983,
                redraws: 0,
                pid: 0xd23d2c1d,
                gender: Female,
                shiny: false,
                nature: Quirky,
                ability: 1,
            },
            Gen3HeldEgg {
                advance: 983,
                redraws: 1,
                pid: 0xcea2c1d,
                gender: Female,
                shiny: false,
                nature: Lax,
                ability: 1,
            },
            Gen3HeldEgg {
                advance: 984,
                redraws: 0,
                pid: 0x1404aa0a,
                gender: Female,
                shiny: false,
                nature: Rash,
                ability: 0,
            },
            Gen3HeldEgg {
                advance: 984,
                redraws: 1,
                pid: 0x4eb1aa0a,
                gender: Female,
                shiny: false,
                nature: Hardy,
                ability: 0,
            },
        ];

        assert_list_eq!(results, expected);
    }

    #[test]
    fn compatability_get_along_well() {
        let opts = Egg3HeldOptions {
            delay: 0,
            compatability: Compatability::GetAlongVeryWell,
            calibration: 18,
            initial_advances: 1000,
            max_advances: 3,
            min_redraw: 0,
            max_redraw: 1,
            female_has_everstone: false,
            female_nature: Nature::Hardy,
            tid: 0,
            sid: 0,
            lua_adjustment: false,
            egg_species: Species::Bulbasaur,
            filters: Egg3HeldFilters {
                shiny: false,
                nature: None,
                gender: None,
            },
        };

        let results = emerald_egg_held_states(&opts);
        let expected = [
            Gen3HeldEgg {
                advance: 982,
                redraws: 0,
                pid: 0x907710c8,
                gender: Male,
                shiny: false,
                nature: Lax,
                ability: 0,
            },
            Gen3HeldEgg {
                advance: 982,
                redraws: 1,
                pid: 0xcb2410c8,
                gender: Male,
                shiny: false,
                nature: Modest,
                ability: 0,
            },
            Gen3HeldEgg {
                advance: 983,
                redraws: 0,
                pid: 0xd23d2c1d,
                gender: Female,
                shiny: false,
                nature: Quirky,
                ability: 1,
            },
            Gen3HeldEgg {
                advance: 983,
                redraws: 1,
                pid: 0xcea2c1d,
                gender: Female,
                shiny: false,
                nature: Lax,
                ability: 1,
            },
            Gen3HeldEgg {
                advance: 984,
                redraws: 0,
                pid: 0x1404aa0a,
                gender: Female,
                shiny: false,
                nature: Rash,
                ability: 0,
            },
            Gen3HeldEgg {
                advance: 984,
                redraws: 1,
                pid: 0x4eb1aa0a,
                gender: Female,
                shiny: false,
                nature: Hardy,
                ability: 0,
            },
            Gen3HeldEgg {
                advance: 985,
                redraws: 0,
                pid: 0x55cae766,
                gender: Male,
                shiny: false,
                nature: Calm,
                ability: 0,
            },
            Gen3HeldEgg {
                advance: 985,
                redraws: 1,
                pid: 0x9077e766,
                gender: Male,
                shiny: false,
                nature: Lonely,
                ability: 0,
            },
        ];

        assert_list_eq!(results, expected);
    }

    #[test]
    fn shiny_filter() {
        let opts = Egg3HeldOptions {
            delay: 0,
            compatability: Compatability::GetAlong,
            calibration: 18,
            initial_advances: 1000,
            max_advances: 3,
            min_redraw: 0,
            max_redraw: 1,
            female_has_everstone: false,
            female_nature: Nature::Hardy,
            tid: 53821,
            sid: 11293,
            lua_adjustment: false,
            egg_species: Species::Bulbasaur,
            filters: Egg3HeldFilters {
                shiny: true,
                nature: None,
                gender: None,
            },
        };

        let results = emerald_egg_held_states(&opts);
        let expected = [Gen3HeldEgg {
            advance: 983,
            redraws: 0,
            pid: 0xD23D2C1D,
            shiny: true,
            nature: Nature::Quirky,
            ability: 1,
            gender: Gender::Female,
        }];

        assert_list_eq!(results, expected);
    }

    #[test]
    fn everstone() {
        let opts = Egg3HeldOptions {
            delay: 0,
            compatability: Compatability::GetAlong,
            calibration: 18,
            initial_advances: 1000,
            max_advances: 3,
            min_redraw: 0,
            max_redraw: 1,
            female_has_everstone: true,
            female_nature: Nature::Hardy,
            tid: 0,
            sid: 0,
            lua_adjustment: false,
            egg_species: Species::Bulbasaur,
            filters: Egg3HeldFilters {
                shiny: false,
                nature: None,
                gender: None,
            },
        };

        let results = emerald_egg_held_states(&opts);
        let expected = [
            Gen3HeldEgg {
                advance: 982,
                redraws: 1,
                pid: 0x89c7d6a,
                gender: Male,
                shiny: false,
                nature: Hardy,
                ability: 0,
            },
            Gen3HeldEgg {
                advance: 984,
                redraws: 0,
                pid: 0x1404e766,
                gender: Male,
                shiny: false,
                nature: Brave,
                ability: 0,
            },
            Gen3HeldEgg {
                advance: 984,
                redraws: 1,
                pid: 0x4eb1e766,
                gender: Male,
                shiny: false,
                nature: Impish,
                ability: 0,
            },
        ];

        assert_list_eq!(results, expected);
    }

    #[test]
    fn positive_delay() {
        let mut opts = Egg3HeldOptions {
            delay: 0,
            compatability: Compatability::GetAlong,
            calibration: 18,
            initial_advances: 1000,
            max_advances: 3,
            min_redraw: 0,
            max_redraw: 1,
            female_has_everstone: true,
            female_nature: Nature::Hardy,
            tid: 0,
            sid: 0,
            lua_adjustment: false,
            egg_species: Species::Bulbasaur,
            filters: Egg3HeldFilters {
                shiny: false,
                nature: None,
                gender: None,
            },
        };

        let first_results = emerald_egg_held_states(&opts);
        opts.delay = 10;
        let second_results = emerald_egg_held_states(&opts)
            .into_iter()
            .map(|mut egg| {
                egg.advance = egg.advance.saturating_add(10);
                egg
            })
            .collect::<Vec<_>>();

        assert_list_eq!(first_results, second_results);
    }

    #[test]
    fn negative_delay() {
        let mut opts = Egg3HeldOptions {
            delay: 0,
            compatability: Compatability::GetAlong,
            calibration: 18,
            initial_advances: 1000,
            max_advances: 3,
            min_redraw: 0,
            max_redraw: 1,
            female_has_everstone: true,
            female_nature: Nature::Hardy,
            tid: 0,
            sid: 0,
            lua_adjustment: false,
            egg_species: Species::Bulbasaur,
            filters: Egg3HeldFilters {
                shiny: false,
                nature: None,
                gender: None,
            },
        };

        let first_results = emerald_egg_held_states(&opts);
        opts.delay = -10;
        let second_results = emerald_egg_held_states(&opts)
            .into_iter()
            .map(|mut egg| {
                egg.advance = egg.advance.saturating_sub(10);
                egg
            })
            .collect::<Vec<_>>();

        assert_list_eq!(first_results, second_results);
    }

    #[test]
    fn lua_adjustment() {
        let mut opts = Egg3HeldOptions {
            delay: 0,
            compatability: Compatability::GetAlong,
            calibration: 18,
            initial_advances: 1000,
            max_advances: 3,
            min_redraw: 0,
            max_redraw: 1,
            female_has_everstone: true,
            female_nature: Nature::Hardy,
            tid: 0,
            sid: 0,
            lua_adjustment: false,
            egg_species: Species::Bulbasaur,
            filters: Egg3HeldFilters {
                shiny: false,
                nature: None,
                gender: None,
            },
        };

        let first_results = emerald_egg_held_states(&opts);
        opts.lua_adjustment = true;
        let second_results = emerald_egg_held_states(&opts)
            .into_iter()
            .map(|mut egg| {
                egg.advance = egg.advance.saturating_sub(1);
                egg
            })
            .collect::<Vec<_>>();

        assert_list_eq!(first_results, second_results);
    }

    #[test]
    fn illumise_gender() {
        let opts = Egg3HeldOptions {
            delay: 0,
            compatability: Compatability::GetAlong,
            calibration: 18,
            initial_advances: 101,
            max_advances: 5,
            min_redraw: 0,
            max_redraw: 0,
            female_has_everstone: false,
            female_nature: Nature::Adamant,
            tid: 0,
            sid: 0,
            lua_adjustment: false,
            egg_species: Species::Illumise,
            filters: Egg3HeldFilters {
                shiny: false,
                nature: None,
                gender: None,
            },
        };

        let result = emerald_egg_held_states(&opts);

        let expected = [
            Gen3HeldEgg {
                advance: 83,
                redraws: 0,
                pid: 0x95122D94,
                shiny: false,
                nature: Nature::Hardy,
                ability: 0,
                gender: Gender::Female,
            },
            Gen3HeldEgg {
                advance: 84,
                redraws: 0,
                pid: 0xD6D80967,
                shiny: false,
                nature: Nature::Relaxed,
                ability: 1,
                gender: Gender::Female,
            },
            Gen3HeldEgg {
                advance: 85,
                redraws: 0,
                pid: 0x189E112E,
                shiny: false,
                nature: Nature::Calm,
                ability: 0,
                gender: Gender::Female,
            },
            Gen3HeldEgg {
                advance: 86,
                redraws: 0,
                pid: 0x5A65A1E1,
                shiny: false,
                nature: Nature::Quiet,
                ability: 1,
                gender: Gender::Male,
            },
            Gen3HeldEgg {
                advance: 88,
                redraws: 0,
                pid: 0xDDF173C5,
                shiny: false,
                nature: Nature::Quirky,
                ability: 1,
                gender: Gender::Female,
            },
        ];

        assert_list_eq!(result, expected);
    }

    #[test]
    fn nidoranf_gender() {
        let opts = Egg3HeldOptions {
            delay: 0,
            compatability: Compatability::GetAlong,
            calibration: 18,
            initial_advances: 101,
            max_advances: 5,
            min_redraw: 0,
            max_redraw: 0,
            female_has_everstone: false,
            female_nature: Nature::Adamant,
            tid: 0,
            sid: 0,
            lua_adjustment: false,
            egg_species: Species::NidoranF,
            filters: Egg3HeldFilters {
                shiny: false,
                nature: None,
                gender: None,
            },
        };

        let result = emerald_egg_held_states(&opts);

        let expected = [
            Gen3HeldEgg {
                advance: 83,
                redraws: 0,
                pid: 0x95122D94,
                shiny: false,
                nature: Nature::Hardy,
                ability: 0,
                gender: Gender::Female,
            },
            Gen3HeldEgg {
                advance: 84,
                redraws: 0,
                pid: 0xD6D80967,
                shiny: false,
                nature: Nature::Relaxed,
                ability: 1,
                gender: Gender::Female,
            },
            Gen3HeldEgg {
                advance: 85,
                redraws: 0,
                pid: 0x189E112E,
                shiny: false,
                nature: Nature::Calm,
                ability: 0,
                gender: Gender::Female,
            },
            Gen3HeldEgg {
                advance: 86,
                redraws: 0,
                pid: 0x5A65A1E1,
                shiny: false,
                nature: Nature::Quiet,
                ability: 1,
                gender: Gender::Male,
            },
            Gen3HeldEgg {
                advance: 88,
                redraws: 0,
                pid: 0xDDF173C5,
                shiny: false,
                nature: Nature::Quirky,
                ability: 1,
                gender: Gender::Female,
            },
        ];

        assert_list_eq!(result, expected);
    }
}
