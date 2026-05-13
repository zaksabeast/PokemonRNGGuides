use std::collections::HashMap;

use arrayvec::ArrayVec;
use itertools::Itertools;

use crate::{Nature, PERTINENT_SOLO_POKEBLOCKS_BY_NATURE, POKEBLOCK_NATURE_STAT_FACTORS};

/*
enum BerryType {
    EasilyAvailable,
    LatiosLatias,
    GC,
}
    pub berry_type:BerryType,
    */

pub struct Berry {
    pub name: BerryName,
    /** flavors already applied negative impact on other flavors */
    pub flavors: [i8; 5],
}

impl Berry {
    pub const fn new(name: BerryName, flavors: [i8; 5]) -> Berry {
        Berry {
            name: name,
            flavors,
        }
    }
}

pub enum BerryName {
    Aspear,
    Belue,
    Bluk,
    Cheri,
    Chesto,
    Cornn,
    Figy,
    Grepa,
    Hondew,
    Iapapa,
    Kelpsy,
    Lansat,
    Leppa,
    Liechi,
    Lum,
    Magost,
    Nanab,
    Nomel,
    Oran,
    Pamtre,
    Pecha,
    Persim,
    Pinap,
    Pomeg,
    Qualot,
    Rabuta,
    Rawst,
    Razz,
    Sitrus,
    Spelon,
    Starf,
    Tamato,
    Wepear,
    Aguav,
    Mago,
    Wiki,
    Durin,
    Watmel,
    Apicot,
    Ganlon,
    Petaya,
    Salac,
    Pumkin,
    Drash,
    Chilan,
    Strib,
    Eggant,
    Nutpea,
    Enigma,
    Ginema,
    Kuo,
    Yago,
    Touga,
    Niniku,
    Topo,
}

const BERRIES: [Berry; 55] = [
    Berry::new(BerryName::Aspear, [0, 0, 0, -1, 1]),
    Berry::new(BerryName::Belue, [1, 0, 0, -4, 3]),
    Berry::new(BerryName::Bluk, [-1, 0, 1, 0, 0]),
    Berry::new(BerryName::Cheri, [1, 0, 0, 0, -1]),
    Berry::new(BerryName::Chesto, [-1, 1, 0, 0, 0]),
    Berry::new(BerryName::Cornn, [-2, 1, 1, 0, 0]),
    Berry::new(BerryName::Figy, [1, 0, 0, 0, -1]),
    Berry::new(BerryName::Grepa, [-1, 0, 1, -1, 1]),
    Berry::new(BerryName::Hondew, [0, 1, -1, 1, -1]),
    Berry::new(BerryName::Iapapa, [0, 0, 0, -1, 1]),
    Berry::new(BerryName::Kelpsy, [-1, 1, -1, 0, 1]),
    Berry::new(BerryName::Lansat, [0, 0, 0, 0, 0]),
    Berry::new(BerryName::Leppa, [1, -1, 0, 0, 0]),
    Berry::new(BerryName::Liechi, [4, -4, 4, -1, -3]),
    Berry::new(BerryName::Lum, [0, 0, 0, 0, 0]),
    Berry::new(BerryName::Magost, [0, -2, 1, 1, 0]),
    Berry::new(BerryName::Nanab, [0, -1, 0, 1, 0]),
    Berry::new(BerryName::Nomel, [1, 0, 0, -2, 1]),
    Berry::new(BerryName::Oran, [0, 0, 0, 0, 0]),
    Berry::new(BerryName::Pamtre, [-4, 3, 1, 0, 0]),
    Berry::new(BerryName::Pecha, [0, -1, 1, 0, 0]),
    Berry::new(BerryName::Persim, [0, 0, 0, 0, 0]),
    Berry::new(BerryName::Pinap, [1, 0, 0, -1, 0]),
    Berry::new(BerryName::Pomeg, [1, -1, 0, 1, -1]),
    Berry::new(BerryName::Qualot, [1, -1, 1, -1, 0]),
    Berry::new(BerryName::Rabuta, [0, 0, -2, 1, 1]),
    Berry::new(BerryName::Rawst, [0, 0, -1, 1, 0]),
    Berry::new(BerryName::Razz, [0, 1, 0, 0, -1]),
    Berry::new(BerryName::Sitrus, [0, 0, 0, 0, 0]),
    Berry::new(BerryName::Spelon, [3, 1, 0, 0, -4]),
    Berry::new(BerryName::Starf, [0, 0, 0, 0, 0]),
    Berry::new(BerryName::Tamato, [1, 1, 0, 0, -2]),
    Berry::new(BerryName::Wepear, [0, 0, -1, 0, 1]),
    // Latios/Latias
    Berry::new(BerryName::Durin, [0, 0, -4, 3, 1]),
    Berry::new(BerryName::Watmel, [0, -4, 3, 1, 0]),
    // TrainerID
    Berry::new(BerryName::Aguav, [0, 0, -1, 1, 0]),
    Berry::new(BerryName::Mago, [0, -1, 1, 0, 0]),
    Berry::new(BerryName::Wiki, [-1, 1, 0, 0, 0]),
    // XD/Colloseum
    Berry::new(BerryName::Apicot, [-4, 4, 0, -4, 4]),
    Berry::new(BerryName::Ganlon, [-4, 4, -4, 4, 0]),
    Berry::new(BerryName::Petaya, [4, 0, -4, 4, -4]),
    Berry::new(BerryName::Salac, [0, -4, 4, -4, 4]),
    // English R/S e-reader
    Berry::new(BerryName::Pumkin, [0, 0, 0, -4, 4]),
    Berry::new(BerryName::Drash, [0, -4, 4, 0, 0]),
    Berry::new(BerryName::Chilan, [3, -3, 3, 0, -3]),
    Berry::new(BerryName::Strib, [3, 0, -3, 3, -3]),
    Berry::new(BerryName::Eggant, [-4, 4, 0, 0, 0]),
    Berry::new(BerryName::Nutpea, [0, 0, 0, 0, 0]),
    // Japanese
    Berry::new(BerryName::Enigma, [0, 0, 0, 0, 0]),
    Berry::new(BerryName::Ginema, [-3, 3, 0, -3, 3]),
    Berry::new(BerryName::Kuo, [0, 0, 0, 0, 0]),
    Berry::new(BerryName::Yago, [0, 0, -4, 4, 0]),
    Berry::new(BerryName::Touga, [4, 0, 0, 0, -4]),
    Berry::new(BerryName::Niniku, [-3, 3, -3, 3, 0]),
    Berry::new(BerryName::Topo, [0, -3, 3, -3, 3]),
];

const BERRY_COUNT: u8 = BERRIES.len() as u8;
const NO_BERRY: u8 = BERRY_COUNT;

fn calculate_pokeblock(berry_idxs: [u8; 4]) -> [u8; 5] {
    let mut flavors = [0i16; 5];

    for (i, sum) in flavors.iter_mut().enumerate() {
        for berry_idx in berry_idxs {
            if berry_idx == NO_BERRY {
                continue;
            }

            let berry = &BERRIES[berry_idx as usize];
            *sum += berry.flavors[i] as i16;
        }
        if *sum < 0 {
            *sum = 0;
        }
    }

    let sorted_flavors = flavors
        .into_iter()
        .sorted()
        .dedup()
        .collect::<ArrayVec<i16, 5>>();

    flavors.map(|flavor| {
        if flavor == 0 {
            0u8
        } else {
            sorted_flavors
                .iter()
                .position(|f| *f == flavor)
                .unwrap_or(0) as u8
        }
    })
}

fn generate_all_pokeblocks() -> HashMap<[u8; 5], [u8; 4]> {
    let mut map = HashMap::<[u8; 5], [u8; 4]>::new();
    let mut berries: [u8; 4] = [NO_BERRY, NO_BERRY, NO_BERRY, NO_BERRY];

    let calc_and_try_add = |map: &mut HashMap<[u8; 5], [u8; 4]>, berries: [u8; 4]| {
        let pokeblock = calculate_pokeblock(berries);
        map.entry(pokeblock).or_insert(berries);
        //NO_PROD only keep the easiest to obtain berries. ex: no GC
    };

    for berry_0 in 0..BERRY_COUNT {
        berries[0] = berry_0;
        calc_and_try_add(&mut map, berries);

        for berry_1 in (berry_0 + 1)..BERRY_COUNT {
            berries[1] = berry_1;
            calc_and_try_add(&mut map, berries);

            for berry_2 in (berry_1 + 1)..BERRY_COUNT {
                berries[2] = berry_2;
                calc_and_try_add(&mut map, berries);

                for berry_3 in (berry_2 + 1)..BERRY_COUNT {
                    berries[3] = berry_3;
                    calc_and_try_add(&mut map, berries);
                }
                berries[3] = NO_BERRY;
            }
            berries[2] = NO_BERRY;
        }
        berries[1] = NO_BERRY;
    }

    const BLACK_POKEBLOCKS: [[u8; 5]; 10] = [
        [0, 0, 1, 1, 1],
        [0, 1, 0, 1, 1],
        [0, 1, 1, 0, 1],
        [0, 1, 1, 1, 0],
        [1, 0, 0, 1, 1],
        [1, 0, 1, 0, 1],
        [1, 0, 1, 1, 0],
        [1, 1, 0, 0, 1],
        [1, 1, 0, 1, 0],
        [1, 1, 1, 0, 0],
    ];
    for pokeblock in BLACK_POKEBLOCKS {
        map.entry(pokeblock).or_insert([0, 0, NO_BERRY, NO_BERRY]);
    }

    map
}

fn generate_all_nature_lists(wanted_nature: Nature) -> Vec<Vec<Nature>> {
    let natures: Vec<Nature> = POKEBLOCK_NATURE_STAT_FACTORS
        .iter()
        .enumerate()
        .filter_map(|(nature_idx, content)| {
            let nature = (nature_idx as u8).into();
            (content != &[0, 0, 0, 0, 0] && nature != wanted_nature).then_some(nature)
        })
        .collect();

    let comb_count = 1usize << natures.len();
    let mut nature_lists = Vec::with_capacity(comb_count);
    for nature_list_bits in 0..comb_count {
        let mut nature_list = Vec::with_capacity(natures.len() + 1);
        for (i, nature) in natures.iter().copied().enumerate() {
            if (nature_list_bits & (1usize << i)) != 0 {
                nature_list.push(nature);
            }
        }
        nature_list.push(wanted_nature);
        nature_lists.push(nature_list);
    }

    nature_lists
}

fn pokeblock_has_positive_score(nature: Nature, pokeblock: &[u8; 5]) -> bool {
    POKEBLOCK_NATURE_STAT_FACTORS[nature as usize]
        .iter()
        .zip(pokeblock)
        .map(|(nature_factor, &flavor)| nature_factor * (flavor as i32))
        .sum::<i32>()
        > 0
}

fn calculate_nature_from_pokeblock(nature_list: &[Nature], pokeblock: &[u8; 5]) -> Nature {
    nature_list
        .iter()
        .copied()
        .find(|&nature| pokeblock_has_positive_score(nature, pokeblock))
        .unwrap_or(nature_list[0])
}

fn get_pokeblock_coverage(
    nature_lists: &[Vec<Nature>],
    wanted_nature: Nature,
    pokeblock: &[u8; 5],
) -> Vec<bool> {
    nature_lists
        .iter()
        .map(|nature_list| calculate_nature_from_pokeblock(nature_list, pokeblock) == wanted_nature)
        .collect()
}

fn get_pokeblocks_coverage(
    nature_lists: &[Vec<Nature>],
    wanted_nature: Nature,
    pokeblocks: &[[u8; 5]],
) -> HashMap<[u8; 5], Vec<bool>> {
    pokeblocks
        .iter()
        .map(|pokeblock| {
            (
                *pokeblock,
                get_pokeblock_coverage(nature_lists, wanted_nature, pokeblock),
            )
        })
        .collect()
}

fn merge_coverages(coverages: &HashMap<[u8; 5], Vec<bool>>, nature_list_len: usize) -> Vec<bool> {
    (0..nature_list_len)
        .map(|i| coverages.iter().any(|(_berry, coverage)| coverage[i]))
        .collect_vec()
}

fn get_pertinent_custom_pokeblocks(wanted_nature: Nature) -> Vec<[u8; 5]> {
    let nature_lists = generate_all_nature_lists(wanted_nature);
    let pokeblocks_map = generate_all_pokeblocks();

    let custom_pokeblocks = pokeblocks_map.keys().cloned().collect_vec();
    let solo_pokeblocks = &PERTINENT_SOLO_POKEBLOCKS_BY_NATURE[wanted_nature as usize];

    let mut coverage_by_custom_pokeblock =
        get_pokeblocks_coverage(&nature_lists, wanted_nature, &custom_pokeblocks);
    let coverage_by_solo_pokeblock =
        get_pokeblocks_coverage(&nature_lists, wanted_nature, &solo_pokeblocks);

    let coverage_all_solo_pokeblocks =
        merge_coverages(&coverage_by_solo_pokeblock, nature_lists.len());
    /*
    let custom_coverage_all_berries =
        merge_coverages(&custom_coverage_by_berry, nature_lists.len());

    println!(
        "solo_coverage_all_berries: {}",
        solo_coverage_all_berries.iter().filter(|x| **x).count()
    );
    println!(
        "custom_coverage_all_berries: {}",
        custom_coverage_all_berries.iter().filter(|x| **x).count()
    );
    println!("count: {}", nature_lists.len(),);
    */

    calculate_smallest_subset_with_max_coverage(
        coverage_all_solo_pokeblocks,
        &coverage_by_custom_pokeblock,
    )
}

fn calculate_smallest_subset_with_max_coverage(
    mut current_coverage: Vec<bool>,
    coverage_by_pokeblock: &HashMap<[u8; 5], Vec<bool>>,
) -> Vec<[u8; 5]> {
    let mut subset: Vec<[u8; 5]> = vec![];

    struct NewCov {
        pub pokeblock: [u8; 5],
        pub new_coverage_with_pokeblock: Vec<bool>,
        pub new_coverage_count: usize,
    }

    let mut current_coverage_count = current_coverage.iter().filter(|&&cov| cov).count();
    loop {
        let best_new_cov: Option<NewCov> = coverage_by_pokeblock
            .iter()
            .map(|(&pokeblock, coverage)| {
                let new_coverage_with_pokeblock = coverage
                    .iter()
                    .zip(current_coverage.iter())
                    .map(|(&custom_cov, &curr_cov)| custom_cov || curr_cov)
                    .collect_vec();
                let new_coverage_count = new_coverage_with_pokeblock
                    .iter()
                    .filter(|&&cov| cov)
                    .count();
                NewCov {
                    pokeblock,
                    new_coverage_with_pokeblock,
                    new_coverage_count,
                }
            })
            .max_by(|a, b| a.new_coverage_count.cmp(&b.new_coverage_count));

        match best_new_cov {
            None => return subset,
            Some(best_new_cov) => {
                if current_coverage_count == best_new_cov.new_coverage_count {
                    // best_new_cov didn't improve anything
                    return subset;
                }

                subset.push(best_new_cov.pokeblock);
                current_coverage = best_new_cov.new_coverage_with_pokeblock;
                current_coverage_count = best_new_cov.new_coverage_count;
            }
        }
    }
}

#[cfg(test)]
mod test {
    use itertools::Itertools;

    use super::*;
    use crate::{NATURE_COUNT, assert_list_eq};

    // cargo test --release test_generate_pertinent_custom_pokeblocks_by_nature -- --include-ignored
    #[test]
    #[ignore]
    fn test_generate_pertinent_custom_pokeblocks_by_nature() {
        let pertinent_custom_pokeblocks_by_nature = (0..NATURE_COUNT)
            .map(|nat| get_pertinent_custom_pokeblocks((nat as u8).into()))
            .collect_vec();
        println!("{:?}", pertinent_custom_pokeblocks_by_nature);

        assert!(false);
    }
}
