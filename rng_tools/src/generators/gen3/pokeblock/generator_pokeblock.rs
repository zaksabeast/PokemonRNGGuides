/*
enum BerryType {
    EasilyAvailable,
    LatiosLatias,
    GC,
}
    pub berry_type:BerryType,
    */

struct Berry {
    pub name:String,
    pub flavors:[i8;5],
}

impl Berry {
    pub fn new(name:&str, flavors:[i8;5], _smoothness:u8){
        Berry {
            name:String(name),
            flavors,
        }
    }
}

const BERRIES:[Berry;_] = [
    Berry::new("Salac", [0,-4,4,-4,4],80),
    Berry::new("Apicot", [-4,4,0,-4,4],80),
    Berry::new("Belue", [1,0,0,-4,3],70),
    Berry::new("Grepa", [-1,0,1,-1,1],20),
    Berry::new("Nomel", [1,0,0,-2,1],30),
    Berry::new("Aspear", [0,0,0,-1,1],25),
    Berry::new("Iapapa", [0,0,0,-1,1],25),
    Berry::new("Wepear", [0,0,-1,0,1],20),
    Berry::new("Kelpsy", [-1,1,-1,0,1],20),
    Berry::new("Rabuta", [0,0,-2,1,1],30),
    Berry::new("Durin", [0,0,-4,3,1],70),
    Berry::new("Watmel", [0,-4,3,1,0],70),
    Berry::new("Qualot", [1,-1,1,-1,0],20),
    Berry::new("Mago", [0,-1,1,0,0],25),
    Berry::new("Pecha", [0,-1,1,0,0],25),
    Berry::new("Magost", [0,-2,1,1,0],30),
    Berry::new("Bluk", [-1,0,1,0,0],20),
    Berry::new("Cornn", [-2,1,1,0,0],30),
    Berry::new("Pamtre", [-4,3,1,0,0],70),
    Berry::new("Pinap", [1,0,0,-1,0],20),
    Berry::new("Leppa", [1,-1,0,0,0],20),
    Berry::new("Lum", [0,0,0,0,0],20),
    Berry::new("Oran", [0,0,0,0,0],20),
    Berry::new("Persim", [0,0,0,0,0],20),
    Berry::new("Sitrus", [0,0,0,0,0],20),
    Berry::new("Nanab", [0,-1,0,1,0],20),
    Berry::new("Lansat", [0,0,0,0,0],30),
    Berry::new("Starf", [0,0,0,0,0],30),
    Berry::new("Enigma", [0,0,0,0,0],40),
    Berry::new("Chesto", [-1,1,0,0,0],25),
    Berry::new("Wiki", [-1,1,0,0,0],25),
    Berry::new("Aguav", [0,0,-1,1,0],25),
    Berry::new("Rawst", [0,0,-1,1,0],25),
    Berry::new("Ganlon", [-4,4,-4,4,0],80),
    Berry::new("Pomeg", [1,-1,0,1,-1],20),
    Berry::new("Cheri", [1,0,0,0,-1],25),
    Berry::new("Figy", [1,0,0,0,-1],25),
    Berry::new("Razz", [0,1,0,0,-1],20),
    Berry::new("Hondew", [0,1,-1,1,-1],20),
    Berry::new("Tamato", [1,1,0,0,-2],30),
    Berry::new("Liechi", [4,-4,4,-1,-3],80),
    Berry::new("Spelon", [3,1,0,0,-4],70),
    Berry::new("Petaya", [4,0,-4,4,-4],80),
];

const BERRY_COUNT:u8 = BERRIES.len() as u8;
const NO_BERRY:u8 = BERRY_COUNT;

const FLAVOR_IDXS:[u8;5] = [0,1,2,3,4];

pub fn calculate_pokeblock(berry_idxs:[u8; 4]){
    let flavors = FLAVOR_IDXS.map(|idx|{
        berry_idxs.iter().sum::<i16>(|berry_idx|{
            if berry_idx == NO_BERRY {
                0
            } else {
                BERRIES[berry_idx].flavors as i16
            }
        })
    });

    let flavors = [
        flavors[0] - flavors[1],
        flavors[1] - flavors[2],
        flavors[2] - flavors[3],
        flavors[3] - flavors[4],
        flavors[4] - flavors[0],
    ];

    let neg_count = flavors.count(|v| v < 0);
    let flavors = flavors.map(|flavor| std::max(flavor - neg_count, 0));

    let sorted_flavors = flavors.sorted().dedup();


    flavors.map(|flavor|{
        if flavor == 0 { 0 } else {
            sorted_flavors.position(|&sorted_flavor| sorted_flavor == flavor).unwrap_or(0) as u8
        }
    });
}

pub fn calculate_all_pokeblocks() -> HashMap::<[u8;5], [u8;4]> {
    let map = HashMap::<[u8;5], [u8;4]>::new();

    let mut berries:[u8;4] = [NO_BERRY,NO_BERRY,NO_BERRY,NO_BERRY];

    let calc_and_try_add = ||{
        let pokeblock = calculate_pokeblock(&berries);
        map.try_emplace(pokeblock, berries);
        //NO_PROD only keep the easiest to obtain berries. ex: no GC
    };

    for berry_0 in 0..BERRY_COUNT {
        berries[0] = berry_0;
        calc_and_try_add();

        for berry_1 in berry_0..BERRY_COUNT {
            berries[1] = berry_1;
            calc_and_try_add();

            for berry_2 in berry_1..BERRY_COUNT {
                berries[2] = berry_2;
                calc_and_try_add();

                for berry_3 in berry_2..BERRY_COUNT {
                    berries[3] = berry_3;
                    calc_and_try_add();
                }
            }
        }
    }

    map
}


pub fn generate_all_nature_lists(wanted_nature:Nature) -> Vec<ArrayVec<Nature;20>> {
    let natures:[Nature; 19] = POKEBLOCK_NATURE_STAT_FACTORS.enumerate().filter_map(|(nature, content)|{
        if content == [0,0,0,0,0] || nature == wanted_nature {
            None
        } else {
            Some((nature as u8).into())
        }
    }).collect_array().unwrap();

    let comb_count:u32 = 1 << 19;
    (0..comb_count).iter().map(|nature_list_bits|{
        let mut nature_list:ArrayVec<Nature;20> = Default::new();
        for i:usize in 0..19 {
            let bitmask = 1 << (i as u32);
            if (nature_list_bits & bitmask) != 0 {
                nature_list.push(natures[i]);
            }
        }
        nature_list.push(wanted_nature);
    }).collect_vec()
}

pub fn check_coverage_by_pokeblock(wanted_nature:Nature, pokeblocks:Vec<[u8;5]>) -> Vec<Vec<bool>> {
    let nature_lists = generate_all_nature_lists(wanted_nature);

    pokeblocks.iter().map(|pokeblock|{
        nature_lists.iter().map(|nature_list|{

        }).collect_vec()
    }).collect_vec()
}