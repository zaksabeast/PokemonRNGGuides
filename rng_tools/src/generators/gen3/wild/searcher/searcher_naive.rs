use crate::{
    NATURE_COUNT,
    gen3::{InSafariMapStates, Wild3SafariPokeblock},
};

use super::*;

pub fn search_wild3_naive(opts: &Wild3SearcherOptions) -> Vec<Wild3SearcherResultMon> {
    let base_rng = Pokerng::with_jump(opts.initial_seed, opts.initial_advances);
    StateIterator::new(base_rng)
        .enumerate()
        .take(opts.max_advances.wrapping_add(1))
        .flat_map(|(adv, rng)| {
            search_wild3_naive_at_given_advance(rng, adv + opts.initial_advances, opts)
        })
        .take(opts.max_result_count)
        .collect::<Vec<Wild3SearcherResultMon>>()
}

fn search_wild3_naive_at_given_advance(
    rng: Pokerng,
    advance: usize,
    opts: &Wild3SearcherOptions,
) -> Vec<Wild3SearcherResultMon> {
    let mut results: Vec<Wild3SearcherResultMon> = vec![];

    let safari_pokeblocks_if_map_has_feeder = {
        let mut states: Vec<Option<Wild3SafariPokeblock>> = vec![None];
        if opts.considered_safari_pokeblocks != ConsideredSafariPokeblocks::None {
            let mut add_pokeblock = |nature: Nature| {
                states.push(Some(Wild3SafariPokeblock::FromNature {
                    wanted_nature: nature,
                    considered_safari_pokeblocks: opts.considered_safari_pokeblocks,
                }));
            };

            if let Some(nature) = opts.filter.nature {
                add_pokeblock(nature);
            } else {
                for i in 0..(NATURE_COUNT as u8) {
                    add_pokeblock(i.into());
                }
            }
        }
        states
    };

    let lead_encounter_products = iproduct!(opts.leads.iter(), opts.map_setups.iter().enumerate());

    for (lead, (map_idx, map_setups)) in lead_encounter_products {
        let map_state_products = iproduct!(
            &map_setups.actions,
            &map_setups.roamer_states,
            &map_setups.mass_outbreak_states,
            &map_setups.feebas_states
        );
        for (action, roamer_state, mass_outbreak_state, feebas_state) in map_state_products {
            let pokeblock_states = if map_setups.map_data.is_safari
                && map_setups
                    .map_data
                    .actions_with_safari_pokeblock
                    .contains(&action)
            {
                safari_pokeblocks_if_map_has_feeder.clone()
            } else {
                vec![None]
            };

            for safari_pokeblock in pokeblock_states {
                let gen_opts = Wild3GeneratorOptions {
                    tid: opts.tid,
                    sid: opts.sid,
                    map_idx,
                    action: *action,
                    methods: opts.methods.clone(),
                    lead: *lead,
                    filter: opts.filter.clone(),
                    consider_cycles: opts.consider_cycles,
                    consider_rng_manipulated_lead_pid: opts.consider_rng_manipulated_lead_pid,
                    generate_even_if_impossible: opts.generate_even_if_impossible,
                    gen3_filter: opts.gen3_filter.clone(),
                    roamer_state: *roamer_state,
                    mass_outbreak_state: *mass_outbreak_state,
                    feebas_state: *feebas_state,
                    safari_pokeblock,
                    lead_cycle_speed: opts.lead_cycle_speed,
                    using_white_flute: opts.using_white_flute,
                };

                generate_gen3_wild(rng, &gen_opts, &map_setups.map_data)
                    .0
                    .iter()
                    .for_each(|gen_res| {
                        let encounter = map_setups
                            .map_data
                            .get_encounter(gen_opts.action, gen_res.encounter_idx)
                            .unwrap();
                        results.push(Wild3SearcherResultMon::new(
                            gen_res,
                            &gen_opts,
                            rng.seed(),
                            advance,
                            encounter,
                        ));
                    });
            }
        }
    }

    results
}

#[path = "tests/searcher_naive_tests.rs"]
#[cfg(test)]
mod tests;

#[path = "tests/searcher_naive_cycle_tests.rs"]
#[cfg(test)]
mod cycle_tests;
