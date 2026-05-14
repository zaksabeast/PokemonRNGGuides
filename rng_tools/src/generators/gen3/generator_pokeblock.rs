#[cfg(test)]
mod test {
    use itertools::{Itertools, iproduct};
    use std::collections::hash_map::DefaultHasher;
    use std::hash::{Hash, Hasher};

    use crate::{
        NATURE_COUNT, Nature, PERTINENT_CUSTOM_POKEBLOCKS_BY_NATURE,
        PERTINENT_SOLO_POKEBLOCKS_BY_NATURE, POKEBLOCK_NATURE_STAT_FACTORS,
    };
    use std::collections::{HashMap, HashSet};

    use arrayvec::ArrayVec;
    use serde::{Deserialize, Serialize};
    use tsify::Tsify;

    pub struct Berry {
        pub name: BerryName,
        pub internal_no: u8,
        /** flavors already applied negative impact on other flavors */
        pub flavors: [i8; 5],
        pub is_accessible_solo: bool,
    }

    impl Berry {
        pub const fn new(
            name: BerryName,
            internal_no: u8,
            flavors: [i8; 5],
            is_accessible_solo: bool,
        ) -> Berry {
            Berry {
                name,
                internal_no,
                flavors,
                is_accessible_solo,
            }
        }
        pub fn get_idx_from_name(name: BerryName) -> u8 {
            BERRIES
                .iter()
                .enumerate()
                .find_map(
                    |(idx, berry)| {
                        if berry.name == name { Some(idx) } else { None }
                    },
                )
                .unwrap_or(0) as u8
        }
    }

    #[derive(Debug, Clone, PartialEq, Tsify, Serialize, Deserialize)]
    #[tsify(into_wasm_abi, from_wasm_abi)]
    pub enum BerryName {
        Cheri,
        Chesto,
        Pecha,
        Rawst,
        Aspear,
        Leppa,
        Oran,
        Persim,
        Lum,
        Sitrus,
        Figy,
        Wiki,
        Mago,
        Aguav,
        Iapapa,
        Razz,
        Bluk,
        Nanab,
        Wepear,
        Pinap,
        Pomeg,
        Kelpsy,
        Qualot,
        Hondew,
        Grepa,
        Tamato,
        Cornn,
        Magost,
        Rabuta,
        Nomel,
        Spelon,
        Pamtre,
        Watmel,
        Durin,
        Belue,
        Liechi,
        Ganlon,
        Salac,
        Petaya,
        Apicot,
        Lansat,
        Starf,
        Enigma,
        Pumkin,
        Drash,
        Eggant,
        Strib,
        Chilan,
        Nutpea,
        Ginema,
        Kuo,
        Yago,
        Touga,
        Niniku,
        Topo,
    }
    const BERRIES: [Berry; 55] = [
        Berry::new(BerryName::Aspear, 5, [0, 0, 0, -1, 1], true),
        Berry::new(BerryName::Belue, 35, [1, 0, 0, -4, 3], true),
        Berry::new(BerryName::Bluk, 17, [-1, 0, 1, 0, 0], true),
        Berry::new(BerryName::Cheri, 1, [1, 0, 0, 0, -1], true),
        Berry::new(BerryName::Chesto, 2, [-1, 1, 0, 0, 0], true),
        Berry::new(BerryName::Cornn, 27, [-2, 1, 1, 0, 0], true),
        Berry::new(BerryName::Figy, 11, [1, 0, 0, 0, -1], true),
        Berry::new(BerryName::Grepa, 25, [-1, 0, 1, -1, 1], true),
        Berry::new(BerryName::Hondew, 24, [0, 1, -1, 1, -1], true),
        Berry::new(BerryName::Iapapa, 15, [0, 0, 0, -1, 1], true),
        Berry::new(BerryName::Kelpsy, 22, [-1, 1, -1, 0, 1], true),
        Berry::new(BerryName::Lansat, 41, [0, 0, 0, 0, 0], true),
        Berry::new(BerryName::Leppa, 6, [1, -1, 0, 0, 0], true),
        Berry::new(BerryName::Liechi, 36, [4, -4, 4, -1, -3], true),
        Berry::new(BerryName::Lum, 9, [0, 0, 0, 0, 0], true),
        Berry::new(BerryName::Magost, 28, [0, -2, 1, 1, 0], true),
        Berry::new(BerryName::Nanab, 18, [0, -1, 0, 1, 0], true),
        Berry::new(BerryName::Nomel, 30, [1, 0, 0, -2, 1], true),
        Berry::new(BerryName::Oran, 7, [0, 0, 0, 0, 0], true),
        Berry::new(BerryName::Pamtre, 32, [-4, 3, 1, 0, 0], true),
        Berry::new(BerryName::Pecha, 3, [0, -1, 1, 0, 0], true),
        Berry::new(BerryName::Persim, 8, [0, 0, 0, 0, 0], true),
        Berry::new(BerryName::Pinap, 20, [1, 0, 0, -1, 0], true),
        Berry::new(BerryName::Pomeg, 21, [1, -1, 0, 1, -1], true),
        Berry::new(BerryName::Qualot, 23, [1, -1, 1, -1, 0], true),
        Berry::new(BerryName::Rabuta, 29, [0, 0, -2, 1, 1], true),
        Berry::new(BerryName::Rawst, 4, [0, 0, -1, 1, 0], true),
        Berry::new(BerryName::Razz, 16, [0, 1, 0, 0, -1], true),
        Berry::new(BerryName::Sitrus, 10, [0, 0, 0, 0, 0], true),
        Berry::new(BerryName::Spelon, 31, [3, 1, 0, 0, -4], true),
        Berry::new(BerryName::Starf, 42, [0, 0, 0, 0, 0], true),
        Berry::new(BerryName::Tamato, 26, [1, 1, 0, 0, -2], true),
        Berry::new(BerryName::Wepear, 19, [0, 0, -1, 0, 1], true),
        // Latios/Latias
        Berry::new(BerryName::Durin, 34, [0, 0, -4, 3, 1], false),
        Berry::new(BerryName::Watmel, 33, [0, -4, 3, 1, 0], false),
        // Trainer ID
        Berry::new(BerryName::Aguav, 14, [0, 0, -1, 1, 0], false),
        Berry::new(BerryName::Mago, 13, [0, -1, 1, 0, 0], false),
        Berry::new(BerryName::Wiki, 12, [-1, 1, 0, 0, 0], false),
        // XD/Colloseum
        Berry::new(BerryName::Apicot, 40, [-4, 4, 0, -4, 4], false),
        Berry::new(BerryName::Ganlon, 37, [-4, 4, -4, 4, 0], false),
        Berry::new(BerryName::Petaya, 39, [4, 0, -4, 4, -4], false),
        Berry::new(BerryName::Salac, 38, [0, -4, 4, -4, 4], false),
        // English R/S e-reader
        Berry::new(BerryName::Pumkin, 43, [0, 0, 0, -4, 4], false),
        Berry::new(BerryName::Drash, 43, [0, -4, 4, 0, 0], false),
        Berry::new(BerryName::Chilan, 43, [3, -3, 3, 0, -3], false),
        Berry::new(BerryName::Strib, 43, [3, 0, -3, 3, -3], false),
        Berry::new(BerryName::Eggant, 43, [-4, 4, 0, 0, 0], false),
        Berry::new(BerryName::Nutpea, 43, [0, 0, 0, 0, 0], false),
        // Japanese
        Berry::new(BerryName::Enigma, 43, [0, 0, 0, 0, 0], false),
        Berry::new(BerryName::Ginema, 43, [-3, 3, 0, -3, 3], false),
        Berry::new(BerryName::Kuo, 43, [0, 0, 0, 0, 0], false),
        Berry::new(BerryName::Yago, 43, [0, 0, -4, 4, 0], false),
        Berry::new(BerryName::Touga, 43, [4, 0, 0, 0, -4], false),
        Berry::new(BerryName::Niniku, 43, [-3, 3, -3, 3, 0], false),
        Berry::new(BerryName::Topo, 43, [0, -3, 3, -3, 3], false),
    ];

    #[derive(Debug, Clone, Copy, PartialEq, Tsify, Serialize, Deserialize)]
    #[tsify(into_wasm_abi, from_wasm_abi)]
    enum BlenderNpcs {
        Npc0,
        Npc1,
        Npc2,
        Npc3,
        BlendMaster,
    }

    #[derive(Debug)]
    enum PokeblockCreationInfo {
        Npc {
            npcs: BlenderNpcs,
            player_berry_idx: u8,
        },
        Multiplayer {
            berries: [u8; 4],
        },
        Grey {
            pokeblock: [u8; 5],
        },
    }

    impl PokeblockCreationInfo {
        pub fn get_berries(&self) -> [u8; 4] {
            match self {
                PokeblockCreationInfo::Multiplayer { berries } => berries.clone(),

                PokeblockCreationInfo::Grey { pokeblock: _ } => [0, 0, NO_BERRY, NO_BERRY],

                PokeblockCreationInfo::Npc {
                    npcs,
                    player_berry_idx,
                } => {
                    let player_berry = &BERRIES[*player_berry_idx as usize];
                    let (npc1, npc2, npc3, master) =
                        match (&player_berry.name, player_berry.internal_no % 5) {
                            (BerryName::Cheri, _) => (
                                BerryName::Aspear,
                                BerryName::Rawst,
                                BerryName::Pecha,
                                BerryName::Spelon,
                            ),
                            (BerryName::Chesto, _) => (
                                BerryName::Cheri,
                                BerryName::Aspear,
                                BerryName::Rawst,
                                BerryName::Pamtre,
                            ),
                            (BerryName::Pecha, _) => (
                                BerryName::Chesto,
                                BerryName::Cheri,
                                BerryName::Aspear,
                                BerryName::Watmel,
                            ),
                            (BerryName::Rawst, _) => (
                                BerryName::Pecha,
                                BerryName::Chesto,
                                BerryName::Cheri,
                                BerryName::Durin,
                            ),
                            (BerryName::Aspear, _) => (
                                BerryName::Rawst,
                                BerryName::Pecha,
                                BerryName::Chesto,
                                BerryName::Belue,
                            ),
                            (BerryName::Spelon, _) => (
                                BerryName::Cheri,
                                BerryName::Pecha,
                                BerryName::Rawst,
                                BerryName::Tamato,
                            ),
                            (BerryName::Pamtre, _) => (
                                BerryName::Chesto,
                                BerryName::Rawst,
                                BerryName::Aspear,
                                BerryName::Cornn,
                            ),
                            (BerryName::Watmel, _) => (
                                BerryName::Pecha,
                                BerryName::Aspear,
                                BerryName::Cheri,
                                BerryName::Magost,
                            ),
                            (BerryName::Durin, _) => (
                                BerryName::Rawst,
                                BerryName::Cheri,
                                BerryName::Chesto,
                                BerryName::Rabuta,
                            ),
                            (BerryName::Belue, _) => (
                                BerryName::Aspear,
                                BerryName::Chesto,
                                BerryName::Pecha,
                                BerryName::Nomel,
                            ),
                            (BerryName::Enigma, _) => (
                                BerryName::Cheri,
                                BerryName::Pecha,
                                BerryName::Rawst,
                                BerryName::Spelon,
                            ),
                            (
                                BerryName::Pumkin
                                | BerryName::Drash
                                | BerryName::Eggant
                                | BerryName::Nutpea
                                | BerryName::Ginema
                                | BerryName::Kuo
                                | BerryName::Yago
                                | BerryName::Niniku
                                | BerryName::Topo,
                                _,
                            ) => (
                                BerryName::Cheri,
                                BerryName::Pecha,
                                BerryName::Rawst,
                                player_berry.name.clone(), // Impossible in-game
                            ),
                            (BerryName::Strib | BerryName::Chilan | BerryName::Touga, _) => (
                                BerryName::Chesto,
                                BerryName::Rawst,
                                BerryName::Aspear,
                                player_berry.name.clone(), // Impossible in-game
                            ),
                            (_, 0) => (
                                BerryName::Aspear,
                                BerryName::Chesto,
                                BerryName::Pecha,
                                BerryName::Belue,
                            ),
                            (_, 1) => (
                                BerryName::Cheri,
                                BerryName::Pecha,
                                BerryName::Rawst,
                                BerryName::Spelon,
                            ),
                            (_, 2) => (
                                BerryName::Chesto,
                                BerryName::Rawst,
                                BerryName::Aspear,
                                BerryName::Pamtre,
                            ),
                            (_, 3) => (
                                BerryName::Pecha,
                                BerryName::Aspear,
                                BerryName::Cheri,
                                BerryName::Watmel,
                            ),
                            (_, 4) => (
                                BerryName::Rawst,
                                BerryName::Cheri,
                                BerryName::Chesto,
                                BerryName::Durin,
                            ),
                            _ => panic!("Impossible to reach"),
                        };

                    match npcs {
                        BlenderNpcs::Npc0 => [*player_berry_idx, NO_BERRY, NO_BERRY, NO_BERRY],
                        BlenderNpcs::Npc1 => [
                            *player_berry_idx,
                            Berry::get_idx_from_name(npc1),
                            NO_BERRY,
                            NO_BERRY,
                        ],
                        BlenderNpcs::Npc2 => [
                            *player_berry_idx,
                            Berry::get_idx_from_name(npc1),
                            Berry::get_idx_from_name(npc2),
                            NO_BERRY,
                        ],
                        BlenderNpcs::Npc3 => [
                            *player_berry_idx,
                            Berry::get_idx_from_name(npc1),
                            Berry::get_idx_from_name(npc2),
                            Berry::get_idx_from_name(npc3),
                        ],
                        BlenderNpcs::BlendMaster => [
                            *player_berry_idx,
                            Berry::get_idx_from_name(master),
                            NO_BERRY,
                            NO_BERRY,
                        ],
                    }
                }
            }
        }
    }

    const BERRY_COUNT: u8 = BERRIES.len() as u8;
    const NO_BERRY: u8 = BERRY_COUNT;

    fn calculate_pokeblock(info: &PokeblockCreationInfo) -> [u8; 5] {
        match info {
            PokeblockCreationInfo::Grey { pokeblock } => *pokeblock,
            _ => calculate_pokeblock_from_berries(info.get_berries()),
        }
    }

    fn calculate_pokeblock_from_berries(berry_idxs: [u8; 4]) -> [u8; 5] {
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

    fn generate_all_pokeblocks() -> HashMap<[u8; 5], PokeblockCreationInfo> {
        let mut map = generate_all_solo_pokeblocks();
        let mut berries: [u8; 4] = [NO_BERRY, NO_BERRY, NO_BERRY, NO_BERRY];

        let calc_and_try_add = |map: &mut HashMap<[u8; 5], PokeblockCreationInfo>,
                                info: PokeblockCreationInfo| {
            let pokeblock = calculate_pokeblock(&info);
            map.entry(pokeblock).or_insert(info);
        };

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
            calc_and_try_add(&mut map, PokeblockCreationInfo::Grey { pokeblock });
        }

        for berry_0 in 0..BERRY_COUNT {
            berries[0] = berry_0;
            calc_and_try_add(&mut map, PokeblockCreationInfo::Multiplayer { berries });

            for berry_1 in (berry_0 + 1)..BERRY_COUNT {
                berries[1] = berry_1;
                calc_and_try_add(&mut map, PokeblockCreationInfo::Multiplayer { berries });

                for berry_2 in (berry_1 + 1)..BERRY_COUNT {
                    berries[2] = berry_2;
                    calc_and_try_add(&mut map, PokeblockCreationInfo::Multiplayer { berries });

                    for berry_3 in (berry_2 + 1)..BERRY_COUNT {
                        berries[3] = berry_3;
                        calc_and_try_add(&mut map, PokeblockCreationInfo::Multiplayer { berries });
                    }
                    berries[3] = NO_BERRY;
                }
                berries[2] = NO_BERRY;
            }
            berries[1] = NO_BERRY;
        }

        map
    }

    fn generate_all_solo_pokeblocks() -> HashMap<[u8; 5], PokeblockCreationInfo> {
        let npcs_list: [BlenderNpcs; 5] = [
            BlenderNpcs::Npc0,
            BlenderNpcs::Npc1,
            BlenderNpcs::Npc2,
            BlenderNpcs::Npc3,
            BlenderNpcs::BlendMaster, // important to be last, so other npcs are prioritized
        ];

        let map_state_products = iproduct!(&npcs_list, 0..BERRY_COUNT);

        let mut map = HashMap::<[u8; 5], PokeblockCreationInfo>::new();
        for (&npcs, player_berry_idx) in map_state_products {
            let player_berry = &BERRIES[player_berry_idx as usize];
            if !player_berry.is_accessible_solo {
                continue;
            }

            let info = PokeblockCreationInfo::Npc {
                npcs,
                player_berry_idx,
            };
            let berries = info.get_berries();
            let pokeblock = calculate_pokeblock_from_berries(berries);
            map.entry(pokeblock).or_insert(info);
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
            .map(|nature_list| {
                calculate_nature_from_pokeblock(nature_list, pokeblock) == wanted_nature
            })
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

    fn merge_coverages(
        coverages: &HashMap<[u8; 5], Vec<bool>>,
        nature_list_len: usize,
    ) -> Vec<bool> {
        (0..nature_list_len)
            .map(|i| coverages.iter().any(|(_berry, coverage)| coverage[i]))
            .collect_vec()
    }

    fn get_pertinent_pokeblocks_for_nature(wanted_nature: Nature, solo_only: bool) -> Vec<[u8; 5]> {
        if POKEBLOCK_NATURE_STAT_FACTORS[wanted_nature as usize]
            .iter()
            .all(|f| *f == 0)
        {
            return vec![];
        }

        let nature_lists = generate_all_nature_lists(wanted_nature);
        let pokeblocks_map = if solo_only {
            generate_all_solo_pokeblocks()
        } else {
            generate_all_pokeblocks()
        };

        let coverage_by_custom_pokeblock = {
            let custom_pokeblocks = pokeblocks_map.keys().cloned().collect_vec();
            get_pokeblocks_coverage(&nature_lists, wanted_nature, &custom_pokeblocks)
        };

        let initial_coverage = if solo_only {
            vec![false; nature_lists.len()]
        } else {
            let solo_pokeblocks = &PERTINENT_SOLO_POKEBLOCKS_BY_NATURE[wanted_nature as usize];
            let solo_coverage_by_berry =
                get_pokeblocks_coverage(&nature_lists, wanted_nature, &solo_pokeblocks);
            merge_coverages(&solo_coverage_by_berry, nature_lists.len())
        };

        calculate_smallest_subset_with_max_coverage(initial_coverage, &coverage_by_custom_pokeblock)
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

    fn get_pertinent_pokeblocks(solo_only: bool) -> Vec<Vec<[u8; 5]>> {
        (0..NATURE_COUNT)
            .map(|nat| get_pertinent_pokeblocks_for_nature((nat as u8).into(), solo_only))
            .collect_vec()
    }

    fn get_pokeblock_creation_info_of_pertinent_pokeblocks()
    -> HashMap<[u8; 5], PokeblockCreationInfo> {
        let pertinent_pokeblocks = PERTINENT_SOLO_POKEBLOCKS_BY_NATURE
            .iter()
            .flatten()
            .chain(PERTINENT_CUSTOM_POKEBLOCKS_BY_NATURE.iter().flatten())
            .cloned()
            .collect::<HashSet<[u8; 5]>>();

        let all_map = generate_all_pokeblocks();

        all_map
            .into_iter()
            .filter(|(pokeblock, _info)| pertinent_pokeblocks.contains(pokeblock))
            .collect()
    }

    // cargo test --release test_generate_pertinent_pokeblocks -- --include-ignored
    #[test]
    #[ignore]
    fn test_generate_pertinent_pokeblocks() {
        assert_eq!(
            PERTINENT_SOLO_POKEBLOCKS_BY_NATURE
                .clone()
                .into_iter()
                .collect_vec(),
            get_pertinent_pokeblocks(true)
        );
        assert_eq!(
            PERTINENT_CUSTOM_POKEBLOCKS_BY_NATURE
                .clone()
                .into_iter()
                .collect_vec(),
            get_pertinent_pokeblocks(false)
        );

        let info_str = format!(
            "pokeblockCreationInfos = {:?}",
            get_pokeblock_creation_info_of_pertinent_pokeblocks()
        );

        let mut hasher = DefaultHasher::new();
        info_str.hash(&mut hasher);

        // Change the expected hash value at the same time as changing the content of pokeblock.ts
        if hasher.finish() != 0 {
            println!("{}", info_str);
            assert!(false, "pokeblockCreationInfos content has changed.");
        }
    }
}
