#[cfg(test)]
use crate::gen4::parse_pokefinder::PokefinderEgg4;
use crate::{
    AbilityType, Gender, Nature, PkmFilter, Species, gen3_shiny,
    rng::{Rng, lcrng::Arng, mt::MT, mt_fast::MtFast},
};
use serde::{Deserialize, Serialize};
use tsify::Tsify;
use wasm_bindgen::prelude::*;

const HELD_MT_FAST_SIZE: usize = 227;
const HELD_MT_FAST_FULL_SIZE: usize = HELD_MT_FAST_SIZE + 4;
const HELD_MT_FAST_SIZE_SMALL: usize = 84;
const HELD_MT_FAST_FULL_SIZE_SMALL: usize = HELD_MT_FAST_SIZE_SMALL + 4;
const HELD_MT_FAST_SIZE_MEDIUM: usize = 128;
const HELD_MT_FAST_FULL_SIZE_MEDIUM: usize = HELD_MT_FAST_SIZE_MEDIUM + 4;
const HELD_MT_FAST_SIZE_LARGE: usize = 192;
const HELD_MT_FAST_FULL_SIZE_LARGE: usize = HELD_MT_FAST_SIZE_LARGE + 4;

#[derive(Debug, Clone, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct Egg4HeldOpts {
    pub seed: u32,
    pub tid: u16,
    pub sid: u16,
    pub species: Species,
    pub offset: usize,
    pub min_advances: usize,
    pub max_advances: usize,
    pub is_masuda: bool,
    pub filter: PkmFilter,
}

#[derive(Debug, Eq, PartialEq, Clone, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct Egg4HeldResult {
    pub advance: usize,
    pub pid: u32,
    pub gender: Gender,
    pub shiny: bool,
    pub nature: Nature,
    pub ability: AbilityType,
}

fn generate_egg4_held(opts: &Egg4HeldOpts, advance: usize, rand: u32) -> Option<Egg4HeldResult> {
    let mut pid = rand;
    let mut shiny = gen3_shiny(pid, opts.tid, opts.sid);

    if opts.is_masuda {
        let mut rng = Arng::new(rand);
        for _ in 0..4 {
            if shiny {
                break;
            }

            pid = rng.rand::<u32>();
            shiny = gen3_shiny(pid, opts.tid, opts.sid);
        }
    }

    if opts.filter.shiny && !shiny {
        return None;
    }

    let ability = AbilityType::from_gen3_pid(pid);
    if let Some(filter_ability) = opts.filter.ability {
        if ability != filter_ability {
            return None;
        }
    }

    let nature = Nature::from_pid(pid);
    if !opts.filter.nature_filter_allows(nature) {
        return None;
    }

    let gender = match opts.species {
        Species::NidoranF | Species::Illumise => match (pid & 0x8000) == 0 {
            true => Gender::Female,
            false => Gender::Male,
        },
        _ => opts.species.gender_from_pid(pid),
    };

    if let Some(filter_gender) = opts.filter.gender {
        if gender != filter_gender {
            return None;
        }
    }

    Some(Egg4HeldResult {
        advance,
        pid,
        gender,
        shiny,
        nature,
        ability,
    })
}

fn generate_egg4_helds_fast<const SIZE: usize, const FULL_SIZE: usize>(
    opts: &Egg4HeldOpts,
    start: usize,
) -> Vec<Egg4HeldResult> {
    let mut results = Vec::new();
    let mut rng = MtFast::<SIZE, FULL_SIZE, false>::new(opts.seed, start);

    for advance in opts.min_advances..=opts.max_advances {
        if let Some(result) = generate_egg4_held(opts, advance, rng.next()) {
            results.push(result);
        }
    }

    results
}

#[wasm_bindgen]
pub fn generate_egg4_helds(opts: &Egg4HeldOpts) -> Vec<Egg4HeldResult> {
    let take = opts
        .max_advances
        .saturating_sub(opts.min_advances)
        .saturating_add(1);
    let start = opts.offset.saturating_add(opts.min_advances);
    let end = start.saturating_add(take);

    if end <= HELD_MT_FAST_SIZE_SMALL {
        return generate_egg4_helds_fast::<HELD_MT_FAST_SIZE_SMALL, HELD_MT_FAST_FULL_SIZE_SMALL>(
            opts, start,
        );
    }

    if end <= HELD_MT_FAST_SIZE_MEDIUM {
        return generate_egg4_helds_fast::<HELD_MT_FAST_SIZE_MEDIUM, HELD_MT_FAST_FULL_SIZE_MEDIUM>(
            opts, start,
        );
    }

    if end <= HELD_MT_FAST_SIZE_LARGE {
        return generate_egg4_helds_fast::<HELD_MT_FAST_SIZE_LARGE, HELD_MT_FAST_FULL_SIZE_LARGE>(
            opts, start,
        );
    }

    if end <= HELD_MT_FAST_SIZE {
        return generate_egg4_helds_fast::<HELD_MT_FAST_SIZE, HELD_MT_FAST_FULL_SIZE>(opts, start);
    }

    MT::new(opts.seed)
        .skip(opts.offset)
        .enumerate()
        .skip(opts.min_advances)
        .take(take)
        .filter_map(|(advance, rand)| generate_egg4_held(opts, advance, rand))
        .collect()
}

#[cfg(test)]
impl PartialEq<PokefinderEgg4> for Egg4HeldResult {
    fn eq(&self, other: &PokefinderEgg4) -> bool {
        if self.advance != other.held_advances {
            return false;
        }

        if self.pid != other.pid {
            return false;
        }

        if self.gender != other.gender {
            return false;
        }

        if self.shiny != other.shiny {
            return false;
        }

        if self.nature != other.nature {
            return false;
        }

        if self.ability != other.ability {
            return false;
        }

        true
    }
}

#[cfg(test)]
mod tests {
    use super::super::parse_pokefinder::parse_pokefinder_egg4_generator_lines;
    use super::*;
    use crate::assert_list_eq;

    macro_rules! pokefinder {
        ($file:expr) => {
            parse_pokefinder_egg4_generator_lines(include_str!($file))
        };
    }

    #[test]
    fn offset() {
        let opts = Egg4HeldOpts {
            seed: 0,
            tid: 12345,
            sid: 54321,
            species: Species::Bulbasaur,
            offset: 10,
            min_advances: 0,
            max_advances: 100,
            is_masuda: false,
            filter: PkmFilter::new_allow_all(),
        };
        let results = generate_egg4_helds(&opts);
        let expected = pokefinder!("test_data/held/offset.txt");
        assert_list_eq!(results, expected);
    }

    #[test]
    fn min_advances() {
        let opts = Egg4HeldOpts {
            seed: 0,
            tid: 12345,
            sid: 54321,
            species: Species::Bulbasaur,
            offset: 0,
            min_advances: 10,
            max_advances: 110,
            is_masuda: false,
            filter: PkmFilter::new_allow_all(),
        };
        let results = generate_egg4_helds(&opts);
        let expected = pokefinder!("test_data/held/min_advances.txt");
        assert_list_eq!(results, expected);
    }

    #[test]
    fn base() {
        let opts = Egg4HeldOpts {
            seed: 0,
            tid: 12345,
            sid: 54321,
            species: Species::Bulbasaur,
            offset: 0,
            min_advances: 0,
            max_advances: 100,
            is_masuda: false,
            filter: PkmFilter::new_allow_all(),
        };
        let results = generate_egg4_helds(&opts);
        let expected = pokefinder!("test_data/held/base.txt");
        assert_list_eq!(results, expected);
    }

    #[test]
    fn non_zero_seed() {
        let opts = Egg4HeldOpts {
            seed: 0xaa,
            tid: 12345,
            sid: 54321,
            species: Species::Bulbasaur,
            offset: 0,
            min_advances: 0,
            max_advances: 100,
            is_masuda: false,
            filter: PkmFilter::new_allow_all(),
        };
        let results = generate_egg4_helds(&opts);
        let expected = pokefinder!("test_data/held/non_zero_seed.txt");
        assert_list_eq!(results, expected);
    }

    #[test]
    fn masuda_method() {
        let opts = Egg4HeldOpts {
            seed: 0,
            tid: 12345,
            sid: 54321,
            species: Species::Bulbasaur,
            offset: 0,
            min_advances: 0,
            max_advances: 100,
            is_masuda: true,
            filter: PkmFilter::new_allow_all(),
        };
        let results = generate_egg4_helds(&opts);
        let expected = pokefinder!("test_data/held/masuda_method.txt");
        assert_list_eq!(results, expected);
    }

    #[test]
    fn nidoran_f() {
        let opts = Egg4HeldOpts {
            seed: 0,
            tid: 12345,
            sid: 54321,
            species: Species::NidoranF,
            offset: 0,
            min_advances: 0,
            max_advances: 100,
            is_masuda: false,
            filter: PkmFilter::new_allow_all(),
        };
        let results = generate_egg4_helds(&opts);
        let expected = pokefinder!("test_data/held/nidoran_f.txt");
        assert_list_eq!(results, expected);
    }

    #[test]
    fn illumise() {
        let opts = Egg4HeldOpts {
            seed: 0,
            tid: 12345,
            sid: 54321,
            species: Species::Illumise,
            offset: 0,
            min_advances: 0,
            max_advances: 100,
            is_masuda: false,
            filter: PkmFilter::new_allow_all(),
        };
        let results = generate_egg4_helds(&opts);
        let expected = pokefinder!("test_data/held/illumise.txt");
        assert_list_eq!(results, expected);
    }

    #[test]
    fn filter_shiny() {
        let opts = Egg4HeldOpts {
            seed: 0,
            tid: 12345,
            sid: 54321,
            species: Species::Bulbasaur,
            offset: 0,
            min_advances: 0,
            max_advances: 10000,
            is_masuda: false,
            filter: PkmFilter {
                shiny: true,
                ..Default::default()
            },
        };
        let results = generate_egg4_helds(&opts);
        let expected = pokefinder!("test_data/held/filter_shiny.txt");
        assert_list_eq!(results, expected);
    }

    #[test]
    fn filter_ability() {
        let opts = Egg4HeldOpts {
            seed: 0,
            tid: 12345,
            sid: 54321,
            species: Species::Bulbasaur,
            offset: 0,
            min_advances: 0,
            max_advances: 100,
            is_masuda: false,
            filter: PkmFilter {
                ability: Some(AbilityType::First),
                ..Default::default()
            },
        };
        let results = generate_egg4_helds(&opts);
        let expected = pokefinder!("test_data/held/filter_ability.txt");
        assert_list_eq!(results, expected);
    }

    #[test]
    fn filter_gender() {
        let opts = Egg4HeldOpts {
            seed: 0,
            tid: 12345,
            sid: 54321,
            species: Species::Bulbasaur,
            offset: 0,
            min_advances: 0,
            max_advances: 100,
            is_masuda: false,
            filter: PkmFilter {
                gender: Some(Gender::Female),
                ..Default::default()
            },
        };
        let results = generate_egg4_helds(&opts);
        let expected = pokefinder!("test_data/held/filter_gender.txt");
        assert_list_eq!(results, expected);
    }

    #[test]
    fn filter_natures() {
        let opts = Egg4HeldOpts {
            seed: 0,
            tid: 12345,
            sid: 54321,
            species: Species::Bulbasaur,
            offset: 0,
            min_advances: 0,
            max_advances: 100,
            is_masuda: false,
            filter: PkmFilter {
                nature: PkmFilter::new_nature_filter(&[Nature::Adamant, Nature::Bashful]),
                ..Default::default()
            },
        };
        let results = generate_egg4_helds(&opts);
        let expected = pokefinder!("test_data/held/filter_natures.txt");
        assert_list_eq!(results, expected);
    }
}
