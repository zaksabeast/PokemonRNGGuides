#[cfg(test)]
use crate::gen4::parse_pokefinder::PokefinderEgg4;
use crate::{
    PartialIvs, PkmFilter, Species,
    gen4::{
        held_generator::{Egg4HeldOpts, Egg4HeldResult, generate_egg4_helds},
        pickup_generator::{Egg4PickupOpts, Egg4PickupResult, egg4_pickup_iter},
        seed_time4::{SeedTime4, seedtime4_iter},
    },
};
use serde::{Deserialize, Serialize};
use tsify::Tsify;
use wasm_bindgen::prelude::*;

#[derive(Debug, Clone, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct SearchEgg4Opts {
    // shared/seed opts
    pub min_delay: u32,
    pub max_delay: u32,
    pub year: u32,
    pub force_seconds: Option<u32>,
    pub species: Species,
    pub filter: PkmFilter,

    // held opts
    pub tid: u16,
    pub sid: u16,
    pub held_offset: usize,
    pub held_min_advances: usize,
    pub held_max_advances: usize,
    pub is_masuda: bool,

    // pickup opts
    pub pickup_offset: usize,
    pub pickup_min_advances: usize,
    pub pickup_max_advances: usize,
    pub parent_ivs: [PartialIvs; 2],
    pub is_dppt: bool,
}

#[derive(Debug, Eq, PartialEq, Clone, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct Egg4Result {
    pub pickup: Egg4PickupResult,
    pub held: Egg4HeldResult,
    pub seed_time: SeedTime4,
}

#[wasm_bindgen]
pub fn search_egg4(opts: &SearchEgg4Opts) -> Vec<Egg4Result> {
    const MAX_RESULTS: usize = 1000;

    let mut held_opts = Egg4HeldOpts {
        seed: 0, // placeholder, will be set in the loop
        species: opts.species,
        tid: opts.tid,
        sid: opts.sid,
        offset: opts.held_offset,
        min_advances: opts.held_min_advances,
        max_advances: opts.held_max_advances,
        is_masuda: opts.is_masuda,
        filter: opts.filter.clone(),
    };

    let mut pickup_opts = Egg4PickupOpts {
        seed: 0, // placeholder, will be set in the loop
        offset: opts.pickup_offset,
        min_advances: opts.pickup_min_advances,
        max_advances: opts.pickup_max_advances,
        parent_ivs: opts.parent_ivs,
        is_dppt: opts.is_dppt,
        filter: opts.filter.clone(),
    };

    let mut results = Vec::with_capacity(MAX_RESULTS);

    for seed_time in seedtime4_iter(
        opts.min_delay..=opts.max_delay,
        opts.year,
        None,
        opts.force_seconds.map(|seconds| seconds..=seconds),
    ) {
        let remaining = MAX_RESULTS.saturating_sub(results.len());
        if remaining == 0 {
            break;
        }

        held_opts.seed = seed_time.seed;
        let held = generate_egg4_helds(&held_opts);

        if held.is_empty() {
            continue;
        }

        pickup_opts.seed = seed_time.seed;
        let max_pickups = remaining.div_ceil(held.len());

        for pickup in egg4_pickup_iter(&pickup_opts).take(max_pickups) {
            for held in &held {
                results.push(Egg4Result {
                    pickup: pickup.clone(),
                    held: held.clone(),
                    seed_time: seed_time.clone(),
                });

                if results.len() == MAX_RESULTS {
                    return results;
                }
            }
        }
    }

    results
}

#[cfg(test)]
impl PartialEq<PokefinderEgg4> for Egg4Result {
    fn eq(&self, other: &PokefinderEgg4) -> bool {
        &self.held == other && &self.pickup == other && self.seed_time.seed == other.seed.unwrap()
    }
}

#[cfg(test)]
mod tests {
    use super::super::parse_pokefinder::parse_pokefinder_egg4_searcher_lines;
    use super::*;
    use crate::{HiddenPowerFilter, Ivs, assert_list_eq};

    macro_rules! pokefinder {
        ($file:expr) => {
            parse_pokefinder_egg4_searcher_lines(include_str!($file))
        };
    }

    #[ignore = "takes a while, run manually to test"]
    #[test]
    fn broad() {
        let opts = SearchEgg4Opts {
            min_delay: 700,
            max_delay: 800,
            year: 2000,
            force_seconds: None,
            species: Species::Bulbasaur,
            tid: 12345,
            sid: 54321,
            held_offset: 0,
            held_min_advances: 0,
            held_max_advances: 80,
            is_masuda: true,
            pickup_offset: 0,
            pickup_min_advances: 0,
            pickup_max_advances: 80,
            parent_ivs: [PartialIvs::new_all31(), PartialIvs::new_all31()],
            is_dppt: true,
            filter: PkmFilter {
                shiny: true,
                nature: None,
                gender: None,
                ability: None,
                min_ivs: Ivs::new_all31(),
                max_ivs: Ivs::new_all31(),
                hidden_power: HiddenPowerFilter::default(),
            },
        };
        let mut results = search_egg4(&opts);
        results.sort_by(|a, b| a.seed_time.seed.cmp(&b.seed_time.seed));
        let expected = pokefinder!("test_data/searcher/broad.txt");
        assert_list_eq!(results, expected);
    }

    #[test]
    fn slim() {
        let opts = SearchEgg4Opts {
            min_delay: 700,
            max_delay: 705,
            year: 2000,
            force_seconds: None,
            species: Species::Bulbasaur,
            tid: 12345,
            sid: 54321,
            held_offset: 0,
            held_min_advances: 0,
            held_max_advances: 3,
            is_masuda: false,
            pickup_offset: 0,
            pickup_min_advances: 0,
            pickup_max_advances: 3,
            parent_ivs: [PartialIvs::new_all31(), PartialIvs::new_all31()],
            is_dppt: true,
            filter: PkmFilter {
                shiny: false,
                nature: None,
                gender: None,
                ability: None,
                min_ivs: Ivs::new_all31(),
                max_ivs: Ivs::new_all31(),
                hidden_power: HiddenPowerFilter::default(),
            },
        };
        let mut results = search_egg4(&opts);
        results.sort_by(|a, b| a.seed_time.seed.cmp(&b.seed_time.seed));
        let expected = pokefinder!("test_data/searcher/slim.txt");
        assert_list_eq!(results, expected);
    }
}
