use crate::rng::mt::MT;
use serde::{Deserialize, Serialize};
use tsify::Tsify;
use wasm_bindgen::prelude::*;

#[derive(Debug, Clone, Copy, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub enum SwarmPokemon {
    // dp
    Doduo,
    Zigzagoon,
    Cubone,
    Nosepass,
    Phanpy,
    Absol,
    Spoink,
    Drowzee,
    Delibird,
    Swinub,
    Voltorb,
    Farfetchd,
    Skitty,
    Natu,
    Makuhita,
    Krabby,
    Spinda,
    Beldum,
    Pidgey,
    Corsola,
    Surskit,
    Lickitung,
    Smoochum,
    Electrike,
    Slakoth,
    Magnemite,

    // pt
    Pinsir,
    Larvitar,

    // hgss
    Poochyena,
    Baltoy,
    Sableye,
    Relicanth,
    Chansey,
    Clamperl,
    Qwilfish,
    Buneary,
    Luvdisc,
    Ralts,
    Yanma,
    Remoraid,
    Swablu,
    Ditto,
    Marill,
    Kricketot,
    Wingull,
    Whiscash,
    Gulpin,
    Mawile,

    //dp, pt, hg, ss
    Snubbull,
    Dunsparce,
}

const DP_ENCOUNTERS: [SwarmPokemon; 28] = [
    SwarmPokemon::Doduo,
    SwarmPokemon::Zigzagoon,
    SwarmPokemon::Cubone,
    SwarmPokemon::Nosepass,
    SwarmPokemon::Phanpy,
    SwarmPokemon::Dunsparce,
    SwarmPokemon::Snubbull,
    SwarmPokemon::Absol,
    SwarmPokemon::Spoink,
    SwarmPokemon::Drowzee,
    SwarmPokemon::Delibird,
    SwarmPokemon::Swinub,
    SwarmPokemon::Voltorb,
    SwarmPokemon::Farfetchd,
    SwarmPokemon::Skitty,
    SwarmPokemon::Natu,
    SwarmPokemon::Makuhita,
    SwarmPokemon::Krabby,
    SwarmPokemon::Spinda,
    SwarmPokemon::Beldum,
    SwarmPokemon::Pidgey,
    SwarmPokemon::Corsola,
    SwarmPokemon::Surskit,
    SwarmPokemon::Lickitung,
    SwarmPokemon::Smoochum,
    SwarmPokemon::Electrike,
    SwarmPokemon::Slakoth,
    SwarmPokemon::Magnemite,
];

const PT_ENCOUNTERS: [SwarmPokemon; 22] = [
    SwarmPokemon::Doduo,
    SwarmPokemon::Zigzagoon,
    SwarmPokemon::Cubone,
    SwarmPokemon::Larvitar,
    SwarmPokemon::Phanpy,
    SwarmPokemon::Dunsparce,
    SwarmPokemon::Snubbull,
    SwarmPokemon::Spoink,
    SwarmPokemon::Drowzee,
    SwarmPokemon::Delibird,
    SwarmPokemon::Voltorb,
    SwarmPokemon::Farfetchd,
    SwarmPokemon::Skitty,
    SwarmPokemon::Natu,
    SwarmPokemon::Makuhita,
    SwarmPokemon::Krabby,
    SwarmPokemon::Spinda,
    SwarmPokemon::Beldum,
    SwarmPokemon::Pinsir,
    SwarmPokemon::Corsola,
    SwarmPokemon::Electrike,
    SwarmPokemon::Slakoth,
];

const HG_ENCOUNTERS: [SwarmPokemon; 20] = [
    SwarmPokemon::Poochyena,
    SwarmPokemon::Baltoy,
    SwarmPokemon::Sableye,
    SwarmPokemon::Relicanth,
    SwarmPokemon::Chansey,
    SwarmPokemon::Clamperl,
    SwarmPokemon::Qwilfish,
    SwarmPokemon::Buneary,
    SwarmPokemon::Luvdisc,
    SwarmPokemon::Ralts,
    SwarmPokemon::Yanma,
    SwarmPokemon::Snubbull,
    SwarmPokemon::Remoraid,
    SwarmPokemon::Swablu,
    SwarmPokemon::Ditto,
    SwarmPokemon::Marill,
    SwarmPokemon::Dunsparce,
    SwarmPokemon::Kricketot,
    SwarmPokemon::Wingull,
    SwarmPokemon::Whiscash,
];

const SS_ENCOUNTERS: [SwarmPokemon; 20] = [
    SwarmPokemon::Poochyena,
    SwarmPokemon::Gulpin,
    SwarmPokemon::Mawile,
    SwarmPokemon::Relicanth,
    SwarmPokemon::Chansey,
    SwarmPokemon::Clamperl,
    SwarmPokemon::Qwilfish,
    SwarmPokemon::Buneary,
    SwarmPokemon::Luvdisc,
    SwarmPokemon::Ralts,
    SwarmPokemon::Yanma,
    SwarmPokemon::Snubbull,
    SwarmPokemon::Remoraid,
    SwarmPokemon::Swablu,
    SwarmPokemon::Ditto,
    SwarmPokemon::Marill,
    SwarmPokemon::Dunsparce,
    SwarmPokemon::Kricketot,
    SwarmPokemon::Wingull,
    SwarmPokemon::Whiscash,
];

#[derive(Debug, Clone, Copy, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub enum SwarmGame {
    DP,
    PT,
    HG,
    SS,
}

#[derive(Debug, Clone, Copy, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct SwarmEncounter {
    pub advance: usize,
    pub pokemon: SwarmPokemon,
}

#[derive(Debug, Clone, Copy, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct SwarmFinderOpts {
    pub seed: u32,
    pub min_advances: usize,
    pub max_advances: usize,
    pub wanted_pokemon: Option<SwarmPokemon>,
    pub game: SwarmGame,
}

fn get_species(game: SwarmGame) -> &'static [SwarmPokemon] {
    match game {
        SwarmGame::DP => &DP_ENCOUNTERS,
        SwarmGame::PT => &PT_ENCOUNTERS,
        SwarmGame::HG => &HG_ENCOUNTERS,
        SwarmGame::SS => &SS_ENCOUNTERS,
    }
}

fn lcrng(s: u32) -> u32 {
    0x6C078965u32.wrapping_mul(s).wrapping_add(1)
}

#[wasm_bindgen]
pub fn find_swarm_advances(opts: SwarmFinderOpts) -> Vec<SwarmEncounter> {
    let species = get_species(opts.game);
    let take = opts
        .max_advances
        .saturating_sub(opts.min_advances)
        .wrapping_add(1);

    MT::new(opts.seed)
        .skip(opts.min_advances)
        .take(take)
        .enumerate()
        .filter_map(|(i, rand)| {
            let val = lcrng(lcrng(rand));
            let mon = species[(val as usize) % species.len()];
            let res = SwarmEncounter {
                advance: opts.min_advances + i,
                pokemon: mon,
            };

            match opts.wanted_pokemon {
                None => Some(res),
                Some(wanted) if wanted == res.pokemon => Some(res),
                _ => None,
            }
        })
        .collect()
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::assert_list_eq;
    use SwarmPokemon::*;

    #[test]
    fn dp() {
        let opts = SwarmFinderOpts {
            seed: 0xabcd,
            min_advances: 10,
            max_advances: 20,
            wanted_pokemon: None,
            game: SwarmGame::DP,
        };

        let results = find_swarm_advances(opts);

        let expected = [
            Delibird, Swinub, Cubone, Zigzagoon, Delibird, Drowzee, Spinda, Drowzee, Spoink,
            Smoochum, Corsola,
        ]
        .iter()
        .enumerate()
        .map(|(i, &pokemon)| SwarmEncounter {
            advance: opts.min_advances + i,
            pokemon,
        })
        .collect::<Vec<SwarmEncounter>>();

        assert_list_eq!(results, expected);
    }

    #[test]
    fn pt() {
        let opts = SwarmFinderOpts {
            seed: 0xabcd,
            min_advances: 0,
            max_advances: 10,
            wanted_pokemon: None,
            game: SwarmGame::PT,
        };

        let results = find_swarm_advances(opts);

        let expected = [
            Drowzee, Delibird, Doduo, Dunsparce, Spinda, Drowzee, Dunsparce, Slakoth, Skitty,
            Spinda, Voltorb,
        ]
        .iter()
        .enumerate()
        .map(|(i, &pokemon)| SwarmEncounter {
            advance: opts.min_advances + i,
            pokemon,
        })
        .collect::<Vec<SwarmEncounter>>();

        assert_list_eq!(results, expected);
    }

    #[test]
    fn hg() {
        let opts = SwarmFinderOpts {
            seed: 0xabcd,
            min_advances: 10,
            max_advances: 20,
            wanted_pokemon: None,
            game: SwarmGame::HG,
        };

        let results = find_swarm_advances(opts);

        let expected = [
            Yanma, Snubbull, Qwilfish, Baltoy, Yanma, Clamperl, Ditto, Ralts, Remoraid, Remoraid,
            Ralts,
        ]
        .iter()
        .enumerate()
        .map(|(i, &pokemon)| SwarmEncounter {
            advance: opts.min_advances + i,
            pokemon,
        })
        .collect::<Vec<SwarmEncounter>>();

        assert_list_eq!(results, expected);
    }

    #[test]
    fn ss() {
        let opts = SwarmFinderOpts {
            seed: 0xabcd,
            min_advances: 0,
            max_advances: 10,
            wanted_pokemon: None,
            game: SwarmGame::SS,
        };

        let results = find_swarm_advances(opts);

        let expected = [
            Qwilfish, Buneary, Yanma, Kricketot, Qwilfish, Dunsparce, Kricketot, Kricketot,
            Poochyena, Wingull, Yanma,
        ]
        .iter()
        .enumerate()
        .map(|(i, &pokemon)| SwarmEncounter {
            advance: opts.min_advances + i,
            pokemon,
        })
        .collect::<Vec<SwarmEncounter>>();

        assert_list_eq!(results, expected);
    }

    #[test]
    fn find_swarm_advances_filtered() {
        let opts = SwarmFinderOpts {
            seed: 0xabcd,
            min_advances: 0,
            max_advances: 20,
            wanted_pokemon: Some(Poochyena),
            game: SwarmGame::HG,
        };

        let results = find_swarm_advances(opts);

        let expected = [SwarmEncounter {
            advance: 8,
            pokemon: Poochyena,
        }];

        assert_list_eq!(results, expected);
    }
}