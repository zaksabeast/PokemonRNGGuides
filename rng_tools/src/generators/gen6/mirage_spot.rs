use crate::RngDate;
use crate::Species::{self, *};
use crate::rng::Rng;
use crate::rng::tinymt::TinyMT;
use chrono::{Days, NaiveDate};
use serde::{Deserialize, Serialize};
use tsify_next::Tsify;
use wasm_bindgen::prelude::*;

const MIRAGE_SPOT_NAMES: [&str; 34] = [
    "None",
    "Crescent Isle",
    "East of Mossdeep",
    "North of Route 124",
    "West of Route 114",
    "North of Lilycove",
    "South of Route 132",
    "West of Route 105",
    "South of Route 109",
    "North of Route 111",
    "West of Rustboro",
    "North of Fortree",
    "South of Pacifidlog",
    "South of Route 107",
    "North of Route 124",
    "North of Route 132",
    "Southeast of Route 129",
    "North of Fallarbor",
    "West of Route 104",
    "South of Route 134",
    "North of Route 124",
    "West of Dewford Town",
    "South of Pacifidlog",
    "South of Route 132",
    "North of Route 113",
    "East of Shoal Cave",
    "West of Route 104",
    "North of Lilycove",
    "Northeast of Route 125",
    "West of Route 131",
    "North of Mossdeep",
    "South of Route 129",
    "Southeast of Route 129",
    "East of Mossdeep",
];

const MIRAGE_POKEMON: [&[Species]; 34] = [
    &[None],
    &[Cresselia],
    &[Tangela, Sunkern, Glameow, Minccino],
    &[Tangela, Sunkern, Purugly, Vulpix],
    &[Tangela, Sunkern, Purugly, Petilil],
    &[Tangela, Sunkern, Purugly, Cherrim],
    &[Sunkern, Petilil, Audino],
    &[Forretress, Happiny],
    &[Audino, Sunkern],
    &[Kricketune, Larvesta],
    &[Tynamo, Klink, Boldore, Graveler],
    &[Klink, Tynamo, Excadrill, Onix],
    &[Tynamo, Cofagrigus, Slowpoke],
    &[Unown],
    &[Klink, Cofagrigus, Graveler, Boldore],
    &[Ditto, Excadrill, Tynamo],
    &[Tynamo, Onix, Graveler, Boldore],
    &[Slowpoke, Tynamo],
    &[Venomoth, Xatu, Zebstrika, Darmanitan],
    &[Venomoth, Xatu, Zebstrika, Maractus],
    &[Venomoth, Xatu, Zebstrika, Persian],
    &[Venomoth, Xatu, Zebstrika, Tangela],
    &[Audino, Xatu],
    &[Munna, Ditto],
    &[Darmanitan, Larvesta],
    &[Purugly, Porygon],
    &[Forretress, Donphan, Kricketune, Stantler],
    &[Forretress, Donphan, Kricketune, Rufflet],
    &[Forretress, Donphan, Kricketune, Vullaby],
    &[Donphan, Kricketune, Girafarig],
    &[Magby, Darmanitan],
    &[Zebstrika, Elekid],
    &[Porygon, Xatu, Munna],
    &[Audino, Happiny, Tangela],
];

#[derive(Debug, Clone, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct MirageSpot {
    pub date: RngDate,
    pub name: String,
    pub pokemon: Vec<Species>,
}

impl MirageSpot {
    fn new(seed: u32, date: NaiveDate) -> Self {
        let mut rng = TinyMT::new(seed);
        let id = ((rng.rand::<u32>() % 33) + 1) as usize;

        Self {
            date: date.into(),
            name: MIRAGE_SPOT_NAMES[id].to_string(),
            pokemon: MIRAGE_POKEMON[id].to_vec(),
        }
    }
}

#[derive(Debug, Clone, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct MirageSpotOptions {
    pub seed: u32,
    pub tid: u32,
    pub start_date: RngDate,
    pub max_advances: usize,
    pub filter_species: Option<Species>,
}

#[wasm_bindgen]
pub fn generate_mirage_spots(opts: MirageSpotOptions) -> Vec<MirageSpot> {
    let start_date = match opts.start_date.to_naive_date() {
        Some(date) => date,
        Option::None => return vec![],
    };

    let mut rng = TinyMT::new(opts.seed);
    let rands = (0..opts.max_advances).map(|_| {
        let rand = rng.rand::<u32>();
        rng = TinyMT::new(rand);
        rand
    });

    [opts.seed]
        .into_iter()
        .chain(rands)
        .enumerate()
        .filter_map(|(advance, rand)| {
            let days = Days::new(advance.try_into().ok()?);
            let date = start_date.checked_add_days(days)?;
            let spot = MirageSpot::new(rand.wrapping_add(opts.tid), date);

            if let Some(species) = opts.filter_species {
                if !spot.pokemon.contains(&species) {
                    return Option::None;
                }
            }

            Some(spot)
        })
        .collect()
}

#[cfg(test)]
mod test {
    use super::*;

    #[test]
    fn generates() {
        let result = generate_mirage_spots(MirageSpotOptions {
            seed: 0xbb286561,
            tid: 1234,
            start_date: NaiveDate::from_ymd_opt(2024, 01, 01).unwrap().into(),
            max_advances: 10,
            filter_species: Option::None,
        });
        let expected = [
            MirageSpot {
                date: RngDate {
                    year: 2024,
                    month: 1,
                    day: 1,
                },
                name: "North of Mossdeep".to_string(),
                pokemon: [Magby, Darmanitan].to_vec(),
            },
            MirageSpot {
                date: RngDate {
                    year: 2024,
                    month: 1,
                    day: 2,
                },
                name: "East of Shoal Cave".to_string(),
                pokemon: [Purugly, Porygon].to_vec(),
            },
            MirageSpot {
                date: RngDate {
                    year: 2024,
                    month: 1,
                    day: 3,
                },
                name: "West of Route 114".to_string(),
                pokemon: [Tangela, Sunkern, Purugly, Petilil].to_vec(),
            },
            MirageSpot {
                date: RngDate {
                    year: 2024,
                    month: 1,
                    day: 4,
                },
                name: "Southeast of Route 129".to_string(),
                pokemon: [Tynamo, Onix, Graveler, Boldore].to_vec(),
            },
            MirageSpot {
                date: RngDate {
                    year: 2024,
                    month: 1,
                    day: 5,
                },
                name: "South of Route 129".to_string(),
                pokemon: [Zebstrika, Elekid].to_vec(),
            },
            MirageSpot {
                date: RngDate {
                    year: 2024,
                    month: 1,
                    day: 6,
                },
                name: "South of Route 109".to_string(),
                pokemon: [Audino, Sunkern].to_vec(),
            },
            MirageSpot {
                date: RngDate {
                    year: 2024,
                    month: 1,
                    day: 7,
                },
                name: "South of Route 109".to_string(),
                pokemon: [Audino, Sunkern].to_vec(),
            },
            MirageSpot {
                date: RngDate {
                    year: 2024,
                    month: 1,
                    day: 8,
                },
                name: "East of Shoal Cave".to_string(),
                pokemon: [Purugly, Porygon].to_vec(),
            },
            MirageSpot {
                date: RngDate {
                    year: 2024,
                    month: 1,
                    day: 9,
                },
                name: "South of Route 129".to_string(),
                pokemon: [Zebstrika, Elekid].to_vec(),
            },
            MirageSpot {
                date: RngDate {
                    year: 2024,
                    month: 1,
                    day: 10,
                },
                name: "South of Route 109".to_string(),
                pokemon: [Audino, Sunkern].to_vec(),
            },
            MirageSpot {
                date: RngDate {
                    year: 2024,
                    month: 1,
                    day: 11,
                },
                name: "North of Route 111".to_string(),
                pokemon: [Kricketune, Larvesta].to_vec(),
            },
        ];

        assert_eq!(result.len(), expected.len());
        result
            .into_iter()
            .zip(expected.into_iter())
            .enumerate()
            .for_each(|(index, (result, expected))| {
                assert_eq!(result, expected, "index: {}", index);
            });
    }
}
