use std::sync::LazyLock;

use itertools::Itertools;

pub const POKEBLOCK_NATURE_STAT_FACTORS: [[i32; 5]; 25] = [
    /*Hardy */
    [0, 0, 0, 0, 0],
    /*Lonely */
    [1, 0, 0, 0, -1],
    /*Brave */
    [1, 0, -1, 0, 0],
    /*Adamant */
    [1, -1, 0, 0, 0],
    /*Naughty */
    [1, 0, 0, -1, 0],
    /*Bold */
    [-1, 0, 0, 0, 1],
    /*Docile */
    [0, 0, 0, 0, 0],
    /*Relaxed */
    [0, 0, -1, 0, 1],
    /*Impish */
    [0, -1, 0, 0, 1],
    /*Lax */
    [0, 0, 0, -1, 1],
    /*Timid */
    [-1, 0, 1, 0, 0],
    /*Hasty */
    [0, 0, 1, 0, -1],
    /*Serious */
    [0, 0, 0, 0, 0],
    /*Jolly */
    [0, -1, 1, 0, 0],
    /*Naive */
    [0, 0, 1, -1, 0],
    /*Modest */
    [-1, 1, 0, 0, 0],
    /*Mild */
    [0, 1, 0, 0, -1],
    /*Quiet */
    [0, 1, -1, 0, 0],
    /*Bashful */
    [0, 0, 0, 0, 0],
    /*Rash */
    [0, 1, 0, -1, 0],
    /*Calm */
    [-1, 0, 0, 1, 0],
    /*Gentle */
    [0, 0, 0, 1, -1],
    /*Sassy */
    [0, 0, -1, 1, 0],
    /*Careful */
    [0, -1, 0, 1, 0],
    /*Quirky */
    [0, 0, 0, 0, 0],
];

pub static PERTINENT_POKEBLOCKS_BY_NATURE: LazyLock<[Vec<[u8; 5]>; 25]> = LazyLock::new(|| {
    // Data from https://docs.google.com/spreadsheets/d/1bHErBCRj-AhkBFBY0dd0xmXY7hvNSbgZk2OAxakNsEI/edit?gid=0#gid=0
    const ALL_SOLO_POKEBLOCKS: [[u8; 5]; 120] = [
        [12, 0, 0, 0, 0],
        [0, 12, 0, 0, 0],
        [0, 0, 12, 0, 0],
        [0, 0, 0, 12, 0],
        [0, 0, 0, 0, 12],
        [23, 0, 0, 10, 0],
        [0, 10, 0, 0, 10],
        [10, 0, 10, 0, 0],
        [0, 10, 0, 10, 0],
        [0, 0, 10, 0, 10],
        [23, 0, 0, 10, 0],
        [0, 0, 10, 0, 23],
        [12, 0, 0, 12, 0],
        [0, 12, 0, 0, 12],
        [12, 0, 12, 0, 0],
        [0, 12, 0, 12, 0],
        [0, 0, 12, 0, 12],
        [23, 0, 0, 23, 0],
        [0, 23, 0, 0, 23],
        [23, 0, 23, 0, 0],
        [0, 23, 0, 23, 0],
        [0, 0, 23, 0, 23],
        [24, 0, 0, 12, 0],
        [0, 24, 0, 0, 12],
        [12, 0, 24, 0, 0],
        [0, 12, 0, 24, 0],
        [0, 0, 12, 0, 24],
        [50, 0, 0, 12, 0],
        [0, 50, 0, 0, 12],
        [0, 0, 12, 0, 50],
        [12, 0, 0, 0, 0],
        [0, 12, 0, 0, 0],
        [0, 0, 12, 0, 0],
        [0, 0, 0, 12, 0],
        [0, 0, 0, 0, 12],
        [23, 0, 10, 0, 0],
        [0, 10, 0, 10, 0],
        [0, 0, 10, 0, 10],
        [10, 0, 0, 10, 0],
        [0, 10, 0, 0, 10],
        [23, 0, 10, 0, 0],
        [0, 10, 0, 0, 23],
        [12, 0, 12, 0, 0],
        [0, 12, 0, 12, 0],
        [0, 0, 12, 0, 12],
        [12, 0, 0, 12, 0],
        [0, 12, 0, 0, 12],
        [23, 0, 10, 10, 0],
        [0, 23, 0, 10, 10],
        [10, 0, 23, 0, 10],
        [10, 10, 0, 23, 0],
        [0, 10, 10, 0, 23],
        [24, 0, 12, 0, 0],
        [0, 24, 0, 12, 0],
        [0, 0, 24, 0, 12],
        [12, 0, 0, 24, 0],
        [0, 12, 0, 0, 24],
        [50, 0, 12, 0, 0],
        [0, 50, 0, 12, 0],
        [0, 12, 0, 0, 50],
        [12, 0, 0, 0, 0],
        [0, 12, 0, 0, 0],
        [0, 0, 12, 0, 0],
        [0, 0, 0, 12, 0],
        [0, 0, 0, 0, 12],
        [23, 0, 0, 0, 0],
        [0, 12, 0, 0, 0],
        [0, 0, 12, 0, 0],
        [0, 0, 0, 12, 0],
        [0, 0, 0, 0, 12],
        [24, 0, 0, 0, 0],
        [0, 0, 0, 0, 19],
        [9, 9, 0, 0, 0],
        [0, 9, 9, 0, 0],
        [0, 0, 9, 9, 0],
        [0, 0, 0, 9, 9],
        [9, 0, 0, 0, 9],
        [18, 0, 0, 8, 0],
        [0, 18, 0, 0, 8],
        [8, 0, 18, 0, 0],
        [0, 8, 0, 18, 0],
        [0, 0, 8, 0, 18],
        [19, 9, 0, 0, 0],
        [0, 19, 9, 0, 0],
        [0, 0, 19, 9, 0],
        [0, 0, 0, 19, 9],
        [9, 0, 0, 0, 19],
        [39, 9, 0, 0, 0],
        [0, 39, 9, 0, 0],
        [9, 0, 0, 0, 39],
        [57, 13, 0, 0, 0],
        [0, 57, 13, 0, 0],
        [0, 0, 57, 13, 0],
        [0, 0, 0, 57, 13],
        [13, 0, 0, 0, 57],
        [57, 0, 0, 0, 0],
        [0, 42, 13, 0, 0],
        [0, 0, 42, 13, 0],
        [0, 0, 0, 42, 13],
        [13, 0, 0, 0, 42],
        [57, 13, 0, 0, 0],
        [13, 0, 0, 0, 57],
        [42, 28, 0, 0, 0],
        [0, 42, 28, 0, 0],
        [0, 0, 42, 28, 0],
        [0, 0, 0, 42, 28],
        [28, 0, 0, 0, 42],
        [57, 0, 0, 13, 0],
        [0, 57, 0, 0, 13],
        [13, 0, 57, 0, 0],
        [0, 13, 0, 57, 0],
        [0, 0, 13, 0, 57],
        [57, 28, 0, 0, 0],
        [0, 57, 28, 0, 0],
        [0, 0, 57, 28, 0],
        [0, 0, 0, 57, 28],
        [28, 0, 0, 0, 57],
        [57, 28, 0, 0, 0],
        [0, 57, 28, 0, 0],
        [28, 0, 0, 0, 57],
    ];

    let solo_pokeblocks = ALL_SOLO_POKEBLOCKS
        .iter()
        .map(|els: &[u8; 5]| {
            let mut list_nums: Vec<u8> = els.into_iter().map(|x| *x).filter(|x| *x != 0).collect();
            list_nums.sort();
            list_nums.dedup();

            return els.map(|x| {
                if x == 0 {
                    0
                } else {
                    (list_nums.iter().position(|n| *n == x).unwrap_or(0) + 1) as u8
                }
            });
        })
        .sorted()
        .dedup()
        .collect::<Vec<_>>();

    let res: [Vec<[u8; 5]>; 25] = POKEBLOCK_NATURE_STAT_FACTORS.map(|nature_factors| {
        if nature_factors.iter().all(|f| *f == 0) {
            return vec![];
        }

        return solo_pokeblocks
            .clone()
            .into_iter()
            .filter(|pb_flavors| {
                let pb_good_flavor_idx = nature_factors.iter().position(|x| *x == 1).unwrap_or(0);
                let pb_good_flavor_val = pb_flavors[pb_good_flavor_idx];

                let pb_bad_flavor_idx = nature_factors.iter().position(|x| *x == -1).unwrap_or(0);
                let pb_bad_flavor_val = pb_flavors[pb_bad_flavor_idx];

                if pb_good_flavor_val == 0 || pb_good_flavor_val <= pb_bad_flavor_val {
                    return false;
                }

                // The logic could be improved to avoid redundant/useless pokeblocks to improve performance.

                return true;
            })
            .collect::<Vec<[u8; 5]>>();
    });

    println!("{:?}", res);

    return res;
});

#[cfg(test)]
mod test {
    use super::*;

    mod pokeblock {
        use super::*;

        #[test]
        fn pokeblock_struct() {
            assert_eq!(
                PERTINENT_POKEBLOCKS_BY_NATURE[1],
                vec![
                    [1, 0, 0, 0, 0],
                    [1, 0, 0, 1, 0],
                    [1, 0, 0, 2, 0],
                    [1, 0, 1, 0, 0],
                    [1, 0, 2, 0, 0],
                    [1, 1, 0, 0, 0],
                    [1, 1, 0, 2, 0],
                    [2, 0, 0, 1, 0],
                    [2, 0, 1, 0, 0],
                    [2, 0, 1, 1, 0],
                    [2, 1, 0, 0, 0]
                ]
            );
        }
    }
}

/*
    const relevantPokeblocksByNature =
    console.log('Data when permitting only solo pokeblock');
    console.log(JSON.stringify(relevantPokeblocksByNature));

    console.log('Data when permitting any pokeblock');
    const data = factorForNatures.map(factorForNature => {
        return [7,6,5,3,4,2,1,0].map(bitsVal => {
            const zeros = [
                !!((bitsVal >> 0) & 1),
                !!((bitsVal >> 1) & 1),
                !!((bitsVal >> 2) & 1),
                false, // doesn't matter
                false, // doesn't matter
            ];
            let zeroCount = 0;
            return factorForNature.map(factor => {
                if (factor === 1)
                    return 1;
                if (factor === -1)
                    return 0;
                const val = zeros[zeroCount];
                zeroCount++;
                return val ? 2;
            });
        });
    });
    console.log(JSON.stringify(data));
})();

*/

// PERTINENT_POKEBLOCKS_BY_NATURE[nature][pokeblock_idx][flavor]
// The elements are ordered from most flavors to fewest flavors.
