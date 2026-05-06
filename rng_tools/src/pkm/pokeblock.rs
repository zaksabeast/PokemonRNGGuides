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

/*
Generate PERTINENT_POKEBLOCKS_BY_NATURE:

(() => {
    const factorForNatures = [
        [0, 0, 0, 0, 0],
        [1, 0, 0, 0, -1],
        [1, 0, -1, 0, 0],
        [1, -1, 0, 0, 0],
        [1, 0, 0, -1, 0],
        [-1, 0, 0, 0, 1],
        [0, 0, 0, 0, 0],
        [0, 0, -1, 0, 1],
        [0, -1, 0, 0, 1],
        [0, 0, 0, -1, 1],
        [-1, 0, 1, 0, 0],
        [0, 0, 1, 0, -1],
        [0, 0, 0, 0, 0],
        [0, -1, 1, 0, 0],
        [0, 0, 1, -1, 0],
        [-1, 1, 0, 0, 0],
        [0, 1, 0, 0, -1],
        [0, 1, -1, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 1, 0, -1, 0],
        [-1, 0, 0, 1, 0],
        [0, 0, 0, 1, -1],
        [0, 0, -1, 1, 0],
        [0, -1, 0, 1, 0],
        [0, 0, 0, 0, 0]
    ];

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
                    return true;
                if (factor === -1)
                    return false;
                const val = zeros[zeroCount];
                zeroCount++;
                return val;
            });
        });
    });

    console.log(JSON.stringify(data));
})();

*/

// PERTINENT_POKEBLOCKS_BY_NATURE[nature][pokeblock_idx][flavor]
// The elements are ordered from most flavors to fewest flavors.
pub const PERTINENT_POKEBLOCKS_BY_NATURE: [[[bool; 5]; 8]; 25] = [
    [
        [true, true, true, false, false],
        [false, true, true, false, false],
        [true, false, true, false, false],
        [true, true, false, false, false],
        [false, false, true, false, false],
        [false, true, false, false, false],
        [true, false, false, false, false],
        [false, false, false, false, false],
    ],
    [
        [true, true, true, true, false],
        [true, false, true, true, false],
        [true, true, false, true, false],
        [true, true, true, false, false],
        [true, false, false, true, false],
        [true, false, true, false, false],
        [true, true, false, false, false],
        [true, false, false, false, false],
    ],
    [
        [true, true, false, true, true],
        [true, false, false, true, true],
        [true, true, false, false, true],
        [true, true, false, true, false],
        [true, false, false, false, true],
        [true, false, false, true, false],
        [true, true, false, false, false],
        [true, false, false, false, false],
    ],
    [
        [true, false, true, true, true],
        [true, false, false, true, true],
        [true, false, true, false, true],
        [true, false, true, true, false],
        [true, false, false, false, true],
        [true, false, false, true, false],
        [true, false, true, false, false],
        [true, false, false, false, false],
    ],
    [
        [true, true, true, false, true],
        [true, false, true, false, true],
        [true, true, false, false, true],
        [true, true, true, false, false],
        [true, false, false, false, true],
        [true, false, true, false, false],
        [true, true, false, false, false],
        [true, false, false, false, false],
    ],
    [
        [false, true, true, true, true],
        [false, false, true, true, true],
        [false, true, false, true, true],
        [false, true, true, false, true],
        [false, false, false, true, true],
        [false, false, true, false, true],
        [false, true, false, false, true],
        [false, false, false, false, true],
    ],
    [
        [true, true, true, false, false],
        [false, true, true, false, false],
        [true, false, true, false, false],
        [true, true, false, false, false],
        [false, false, true, false, false],
        [false, true, false, false, false],
        [true, false, false, false, false],
        [false, false, false, false, false],
    ],
    [
        [true, true, false, true, true],
        [false, true, false, true, true],
        [true, false, false, true, true],
        [true, true, false, false, true],
        [false, false, false, true, true],
        [false, true, false, false, true],
        [true, false, false, false, true],
        [false, false, false, false, true],
    ],
    [
        [true, false, true, true, true],
        [false, false, true, true, true],
        [true, false, false, true, true],
        [true, false, true, false, true],
        [false, false, false, true, true],
        [false, false, true, false, true],
        [true, false, false, false, true],
        [false, false, false, false, true],
    ],
    [
        [true, true, true, false, true],
        [false, true, true, false, true],
        [true, false, true, false, true],
        [true, true, false, false, true],
        [false, false, true, false, true],
        [false, true, false, false, true],
        [true, false, false, false, true],
        [false, false, false, false, true],
    ],
    [
        [false, true, true, true, true],
        [false, false, true, true, true],
        [false, true, true, false, true],
        [false, true, true, true, false],
        [false, false, true, false, true],
        [false, false, true, true, false],
        [false, true, true, false, false],
        [false, false, true, false, false],
    ],
    [
        [true, true, true, true, false],
        [false, true, true, true, false],
        [true, false, true, true, false],
        [true, true, true, false, false],
        [false, false, true, true, false],
        [false, true, true, false, false],
        [true, false, true, false, false],
        [false, false, true, false, false],
    ],
    [
        [true, true, true, false, false],
        [false, true, true, false, false],
        [true, false, true, false, false],
        [true, true, false, false, false],
        [false, false, true, false, false],
        [false, true, false, false, false],
        [true, false, false, false, false],
        [false, false, false, false, false],
    ],
    [
        [true, false, true, true, true],
        [false, false, true, true, true],
        [true, false, true, false, true],
        [true, false, true, true, false],
        [false, false, true, false, true],
        [false, false, true, true, false],
        [true, false, true, false, false],
        [false, false, true, false, false],
    ],
    [
        [true, true, true, false, true],
        [false, true, true, false, true],
        [true, false, true, false, true],
        [true, true, true, false, false],
        [false, false, true, false, true],
        [false, true, true, false, false],
        [true, false, true, false, false],
        [false, false, true, false, false],
    ],
    [
        [false, true, true, true, true],
        [false, true, false, true, true],
        [false, true, true, false, true],
        [false, true, true, true, false],
        [false, true, false, false, true],
        [false, true, false, true, false],
        [false, true, true, false, false],
        [false, true, false, false, false],
    ],
    [
        [true, true, true, true, false],
        [false, true, true, true, false],
        [true, true, false, true, false],
        [true, true, true, false, false],
        [false, true, false, true, false],
        [false, true, true, false, false],
        [true, true, false, false, false],
        [false, true, false, false, false],
    ],
    [
        [true, true, false, true, true],
        [false, true, false, true, true],
        [true, true, false, false, true],
        [true, true, false, true, false],
        [false, true, false, false, true],
        [false, true, false, true, false],
        [true, true, false, false, false],
        [false, true, false, false, false],
    ],
    [
        [true, true, true, false, false],
        [false, true, true, false, false],
        [true, false, true, false, false],
        [true, true, false, false, false],
        [false, false, true, false, false],
        [false, true, false, false, false],
        [true, false, false, false, false],
        [false, false, false, false, false],
    ],
    [
        [true, true, true, false, true],
        [false, true, true, false, true],
        [true, true, false, false, true],
        [true, true, true, false, false],
        [false, true, false, false, true],
        [false, true, true, false, false],
        [true, true, false, false, false],
        [false, true, false, false, false],
    ],
    [
        [false, true, true, true, true],
        [false, false, true, true, true],
        [false, true, false, true, true],
        [false, true, true, true, false],
        [false, false, false, true, true],
        [false, false, true, true, false],
        [false, true, false, true, false],
        [false, false, false, true, false],
    ],
    [
        [true, true, true, true, false],
        [false, true, true, true, false],
        [true, false, true, true, false],
        [true, true, false, true, false],
        [false, false, true, true, false],
        [false, true, false, true, false],
        [true, false, false, true, false],
        [false, false, false, true, false],
    ],
    [
        [true, true, false, true, true],
        [false, true, false, true, true],
        [true, false, false, true, true],
        [true, true, false, true, false],
        [false, false, false, true, true],
        [false, true, false, true, false],
        [true, false, false, true, false],
        [false, false, false, true, false],
    ],
    [
        [true, false, true, true, true],
        [false, false, true, true, true],
        [true, false, false, true, true],
        [true, false, true, true, false],
        [false, false, false, true, true],
        [false, false, true, true, false],
        [true, false, false, true, false],
        [false, false, false, true, false],
    ],
    [
        [true, true, true, false, false],
        [false, true, true, false, false],
        [true, false, true, false, false],
        [true, true, false, false, false],
        [false, false, true, false, false],
        [false, true, false, false, false],
        [true, false, false, false, false],
        [false, false, false, false, false],
    ],
];
