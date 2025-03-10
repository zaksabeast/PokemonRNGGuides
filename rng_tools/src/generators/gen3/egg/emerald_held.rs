use crate::Nature;
use crate::rng::lcrng::{Lcrng, Rng, StateIterator};
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
            advance = advance.saturating_add(delay.abs() as u32);
        }

        Self {
            pid,
            advance,
            redraws: egg.redraws,
            nature: Nature::from_pid(pid),
            gender: species.gender(pid),
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
    let mut result = StateIterator::new(Lcrng::new_prng(0))
        .enumerate()
        .skip(opts.initial_advances)
        .take(opts.max_advances.saturating_add(1))
        .flat_map(|(advance, rng)| generate_redraw_states(rng, opts, advance))
        .collect::<Vec<Gen3HeldEgg>>();
    result.sort_by(|a, b| a.advance.cmp(&b.advance));
    result
}

fn generate_redraw_states(
    mut rng: Lcrng,
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
    mut go: Lcrng,
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
    let held_advance = (advance).wrapping_sub(offset);
    let seed = ((advance).wrapping_add(1).wrapping_sub(offset)) & 0xffff;
    let mut trng = Lcrng::new_prng(seed);

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
    use super::*;

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

        let result = emerald_egg_held_states(&opts);
        let expected_result = [
            Gen3HeldEgg {
                advance: 4294967263,
                redraws: 5,
                pid: 0x15A3E97F,
                shiny: false,
                nature: Nature::Naughty,
                ability: 1,
                gender: Gender::Male,
            },
            Gen3HeldEgg {
                advance: 4294967266,
                redraws: 4,
                pid: 0xDAF6E97F,
                shiny: false,
                nature: Nature::Rash,
                ability: 1,
                gender: Gender::Male,
            },
            Gen3HeldEgg {
                advance: 4294967266,
                redraws: 5,
                pid: 0xDAF68E43,
                shiny: false,
                nature: Nature::Jolly,
                ability: 1,
                gender: Gender::Male,
            },
            Gen3HeldEgg {
                advance: 4294967269,
                redraws: 3,
                pid: 0xA049E97F,
                shiny: false,
                nature: Nature::Jolly,
                ability: 1,
                gender: Gender::Male,
            },
            Gen3HeldEgg {
                advance: 4294967269,
                redraws: 4,
                pid: 0xA0498E43,
                shiny: false,
                nature: Nature::Relaxed,
                ability: 1,
                gender: Gender::Male,
            },
            Gen3HeldEgg {
                advance: 4294967272,
                redraws: 2,
                pid: 0x659CE97F,
                shiny: false,
                nature: Nature::Relaxed,
                ability: 1,
                gender: Gender::Male,
            },
            Gen3HeldEgg {
                advance: 4294967272,
                redraws: 3,
                pid: 0x659C8E43,
                shiny: false,
                nature: Nature::Lonely,
                ability: 1,
                gender: Gender::Male,
            },
            Gen3HeldEgg {
                advance: 4294967275,
                redraws: 1,
                pid: 0x2AEFE97F,
                shiny: false,
                nature: Nature::Lonely,
                ability: 1,
                gender: Gender::Male,
            },
            Gen3HeldEgg {
                advance: 4294967275,
                redraws: 2,
                pid: 0x2AEF8E43,
                shiny: false,
                nature: Nature::Calm,
                ability: 1,
                gender: Gender::Male,
            },
            Gen3HeldEgg {
                advance: 4294967278,
                redraws: 0,
                pid: 0xF042E97F,
                shiny: false,
                nature: Nature::Mild,
                ability: 1,
                gender: Gender::Male,
            },
            Gen3HeldEgg {
                advance: 4294967278,
                redraws: 1,
                pid: 0xF0428E43,
                shiny: false,
                nature: Nature::Timid,
                ability: 1,
                gender: Gender::Male,
            },
            Gen3HeldEgg {
                advance: 4294967281,
                redraws: 0,
                pid: 0xB5958E43,
                shiny: false,
                nature: Nature::Naughty,
                ability: 1,
                gender: Gender::Male,
            },
        ];

        assert_eq!(result.len(), expected_result.len());
        result
            .into_iter()
            .zip(expected_result.into_iter())
            .enumerate()
            .for_each(|(index, (result, expected))| {
                assert_eq!(result, expected, "index: {}", index);
            });
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

        let result = emerald_egg_held_states(&opts);
        let expected_result = [
            Gen3HeldEgg {
                advance: 968,
                redraws: 5,
                pid: 0xF79F2C1D,
                shiny: false,
                nature: Nature::Rash,
                ability: 1,
                gender: Gender::Female,
            },
            Gen3HeldEgg {
                advance: 969,
                redraws: 5,
                pid: 0x3965AA0A,
                shiny: false,
                nature: Nature::Adamant,
                ability: 0,
                gender: Gender::Female,
            },
            Gen3HeldEgg {
                advance: 971,
                redraws: 4,
                pid: 0xBCF22C1D,
                shiny: false,
                nature: Nature::Jolly,
                ability: 1,
                gender: Gender::Female,
            },
            Gen3HeldEgg {
                advance: 972,
                redraws: 4,
                pid: 0xFEB8AA0A,
                shiny: false,
                nature: Nature::Bashful,
                ability: 0,
                gender: Gender::Female,
            },
            Gen3HeldEgg {
                advance: 972,
                redraws: 5,
                pid: 0xFEB8C6EC,
                shiny: false,
                nature: Nature::Serious,
                ability: 0,
                gender: Gender::Male,
            },
            Gen3HeldEgg {
                advance: 974,
                redraws: 3,
                pid: 0x82452C1D,
                shiny: false,
                nature: Nature::Relaxed,
                ability: 1,
                gender: Gender::Female,
            },
            Gen3HeldEgg {
                advance: 975,
                redraws: 3,
                pid: 0xC40BAA0A,
                shiny: false,
                nature: Nature::Serious,
                ability: 0,
                gender: Gender::Female,
            },
            Gen3HeldEgg {
                advance: 975,
                redraws: 4,
                pid: 0xC40BC6EC,
                shiny: false,
                nature: Nature::Docile,
                ability: 0,
                gender: Gender::Male,
            },
            Gen3HeldEgg {
                advance: 977,
                redraws: 2,
                pid: 0x47972C1D,
                shiny: false,
                nature: Nature::Modest,
                ability: 1,
                gender: Gender::Female,
            },
            Gen3HeldEgg {
                advance: 978,
                redraws: 2,
                pid: 0x895EAA0A,
                shiny: false,
                nature: Nature::Docile,
                ability: 0,
                gender: Gender::Female,
            },
            Gen3HeldEgg {
                advance: 978,
                redraws: 3,
                pid: 0x895EC6EC,
                shiny: false,
                nature: Nature::Hardy,
                ability: 0,
                gender: Gender::Male,
            },
            Gen3HeldEgg {
                advance: 980,
                redraws: 1,
                pid: 0x0CEA2C1D,
                shiny: false,
                nature: Nature::Lax,
                ability: 1,
                gender: Gender::Female,
            },
            Gen3HeldEgg {
                advance: 981,
                redraws: 1,
                pid: 0x4EB1AA0A,
                shiny: false,
                nature: Nature::Hardy,
                ability: 0,
                gender: Gender::Female,
            },
            Gen3HeldEgg {
                advance: 981,
                redraws: 2,
                pid: 0x4EB1C6EC,
                shiny: false,
                nature: Nature::Rash,
                ability: 0,
                gender: Gender::Male,
            },
            Gen3HeldEgg {
                advance: 983,
                redraws: 0,
                pid: 0xD23D2C1D,
                shiny: false,
                nature: Nature::Quirky,
                ability: 1,
                gender: Gender::Female,
            },
            Gen3HeldEgg {
                advance: 984,
                redraws: 0,
                pid: 0x1404AA0A,
                shiny: false,
                nature: Nature::Rash,
                ability: 0,
                gender: Gender::Female,
            },
            Gen3HeldEgg {
                advance: 984,
                redraws: 1,
                pid: 0x1404C6EC,
                shiny: false,
                nature: Nature::Jolly,
                ability: 0,
                gender: Gender::Male,
            },
            Gen3HeldEgg {
                advance: 987,
                redraws: 0,
                pid: 0xD957C6EC,
                shiny: false,
                nature: Nature::Adamant,
                ability: 0,
                gender: Gender::Male,
            },
        ];

        assert_eq!(result.len(), expected_result.len());
        result
            .into_iter()
            .zip(expected_result.into_iter())
            .enumerate()
            .for_each(|(index, (result, expected))| {
                assert_eq!(result, expected, "index: {}", index);
            });
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

        let result = emerald_egg_held_states(&opts);
        let expected_result = [
            Gen3HeldEgg {
                advance: 979,
                redraws: 1,
                pid: 0xCB2410C8,
                shiny: false,
                nature: Nature::Modest,
                ability: 0,
                gender: Gender::Male,
            },
            Gen3HeldEgg {
                advance: 980,
                redraws: 1,
                pid: 0x0CEA2C1D,
                shiny: false,
                nature: Nature::Lax,
                ability: 1,
                gender: Gender::Female,
            },
            Gen3HeldEgg {
                advance: 981,
                redraws: 1,
                pid: 0x4EB1AA0A,
                shiny: false,
                nature: Nature::Hardy,
                ability: 0,
                gender: Gender::Female,
            },
            Gen3HeldEgg {
                advance: 982,
                redraws: 0,
                pid: 0x907710C8,
                shiny: false,
                nature: Nature::Lax,
                ability: 0,
                gender: Gender::Male,
            },
            Gen3HeldEgg {
                advance: 983,
                redraws: 0,
                pid: 0xD23D2C1D,
                shiny: false,
                nature: Nature::Quirky,
                ability: 1,
                gender: Gender::Female,
            },
            Gen3HeldEgg {
                advance: 984,
                redraws: 0,
                pid: 0x1404AA0A,
                shiny: false,
                nature: Nature::Rash,
                ability: 0,
                gender: Gender::Female,
            },
        ];

        assert_eq!(result.len(), expected_result.len());
        result
            .into_iter()
            .zip(expected_result.into_iter())
            .enumerate()
            .for_each(|(index, (result, expected))| {
                assert_eq!(result, expected, "index: {}", index);
            });
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

        let result = emerald_egg_held_states(&opts);
        let expected_result = [
            Gen3HeldEgg {
                advance: 979,
                redraws: 1,
                pid: 0xCB2410C8,
                shiny: false,
                nature: Nature::Modest,
                ability: 0,
                gender: Gender::Male,
            },
            Gen3HeldEgg {
                advance: 980,
                redraws: 1,
                pid: 0x0CEA2C1D,
                shiny: false,
                nature: Nature::Lax,
                ability: 1,
                gender: Gender::Female,
            },
            Gen3HeldEgg {
                advance: 981,
                redraws: 1,
                pid: 0x4EB1AA0A,
                shiny: false,
                nature: Nature::Hardy,
                ability: 0,
                gender: Gender::Female,
            },
            Gen3HeldEgg {
                advance: 982,
                redraws: 0,
                pid: 0x907710C8,
                shiny: false,
                nature: Nature::Lax,
                ability: 0,
                gender: Gender::Male,
            },
            Gen3HeldEgg {
                advance: 982,
                redraws: 1,
                pid: 0x9077E766,
                shiny: false,
                nature: Nature::Lonely,
                ability: 0,
                gender: Gender::Male,
            },
            Gen3HeldEgg {
                advance: 983,
                redraws: 0,
                pid: 0xD23D2C1D,
                shiny: false,
                nature: Nature::Quirky,
                ability: 1,
                gender: Gender::Female,
            },
            Gen3HeldEgg {
                advance: 984,
                redraws: 0,
                pid: 0x1404AA0A,
                shiny: false,
                nature: Nature::Rash,
                ability: 0,
                gender: Gender::Female,
            },
            Gen3HeldEgg {
                advance: 985,
                redraws: 0,
                pid: 0x55CAE766,
                shiny: false,
                nature: Nature::Calm,
                ability: 0,
                gender: Gender::Male,
            },
        ];

        assert_eq!(result.len(), expected_result.len());
        result
            .into_iter()
            .zip(expected_result.into_iter())
            .enumerate()
            .for_each(|(index, (result, expected))| {
                assert_eq!(result, expected, "index: {}", index);
            });
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

        let result = emerald_egg_held_states(&opts);
        let expected_result = [Gen3HeldEgg {
            advance: 983,
            redraws: 0,
            pid: 0xD23D2C1D,
            shiny: true,
            nature: Nature::Quirky,
            ability: 1,
            gender: Gender::Female,
        }];

        assert_eq!(result.len(), expected_result.len());
        result
            .into_iter()
            .zip(expected_result.into_iter())
            .enumerate()
            .for_each(|(index, (result, expected))| {
                assert_eq!(result, expected, "index: {}", index);
            });
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

        let result = emerald_egg_held_states(&opts);
        let expected_result = [
            Gen3HeldEgg {
                advance: 979,
                redraws: 1,
                pid: 0x089C7D6A,
                shiny: false,
                nature: Nature::Hardy,
                ability: 0,
                gender: Gender::Male,
            },
            Gen3HeldEgg {
                advance: 981,
                redraws: 1,
                pid: 0x4EB1E766,
                shiny: false,
                nature: Nature::Impish,
                ability: 0,
                gender: Gender::Male,
            },
            Gen3HeldEgg {
                advance: 984,
                redraws: 0,
                pid: 0x1404E766,
                shiny: false,
                nature: Nature::Brave,
                ability: 0,
                gender: Gender::Male,
            },
        ];

        assert_eq!(result.len(), expected_result.len());
        result
            .into_iter()
            .zip(expected_result.into_iter())
            .enumerate()
            .for_each(|(index, (result, expected))| {
                assert_eq!(result, expected, "index: {}", index);
            });
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

        let first_result = emerald_egg_held_states(&opts);
        opts.delay = 10;
        let second_result = emerald_egg_held_states(&opts);

        first_result
            .into_iter()
            .zip(second_result.into_iter())
            .for_each(|(first, mut second)| {
                second.advance = second.advance.saturating_add(10);
                assert_eq!(first, second);
            });
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

        let first_result = emerald_egg_held_states(&opts);
        opts.delay = -10;
        let second_result = emerald_egg_held_states(&opts);

        first_result
            .into_iter()
            .zip(second_result.into_iter())
            .for_each(|(first, mut second)| {
                second.advance = second.advance.saturating_sub(10);
                assert_eq!(first, second);
            });
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

        let first_result = emerald_egg_held_states(&opts);
        opts.lua_adjustment = true;
        let second_result = emerald_egg_held_states(&opts);

        first_result
            .into_iter()
            .zip(second_result.into_iter())
            .for_each(|(first, mut second)| {
                second.advance = second.advance.saturating_sub(1);
                assert_eq!(first, second);
            });
    }
}
