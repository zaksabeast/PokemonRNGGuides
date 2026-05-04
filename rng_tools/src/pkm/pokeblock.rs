#[derive(Copy, Clone, Debug, PartialEq)]
pub enum PokeblockFlavorCompatibility {
    Yes,
    Neutral,
    No,
}
/*
const s8 gPokeblockFlavorCompatibilityTable[NUM_NATURES * FLAVOR_COUNT] =
{
     // Spicy,  Dry, Sweet, Bitter, Sour
          0,      0,    0,     0,     0, // Hardy
          1,      0,    0,     0,    -1, // Lonely
          1,      0,   -1,     0,     0, // Brave
          1,     -1,    0,     0,     0, // Adamant
          1,      0,    0,    -1,     0, // Naughty
         -1,      0,    0,     0,     1, // Bold
          0,      0,    0,     0,     0, // Docile
          0,      0,   -1,     0,     1, // Relaxed
          0,     -1,    0,     0,     1, // Impish
          0,      0,    0,    -1,     1, // Lax
         -1,      0,    1,     0,     0, // Timid
          0,      0,    1,     0,    -1, // Hasty
          0,      0,    0,     0,     0, // Serious
          0,     -1,    1,     0,     0, // Jolly
          0,      0,    1,    -1,     0, // Naive
         -1,      1,    0,     0,     0, // Modest
          0,      1,    0,     0,    -1, // Mild
          0,      1,   -1,     0,     0, // Quiet
          0,      0,    0,     0,     0, // Bashful
          0,      1,    0,    -1,     0, // Rash
         -1,      0,    0,     1,     0, // Calm
          0,      0,    0,     1,    -1, // Gentle
          0,      0,   -1,     1,     0, // Sassy
          0,     -1,    0,     1,     0, // Careful
          0,      0,    0,     0,     0  // Quirky
};
*/
pub const NATURE_STAT_FACTORS: [[PokeblockFlavorCompatibility; 5]; 25] = [
    /*Hardy */
    [
        PokeblockFlavorCompatibility::Neutral,
        PokeblockFlavorCompatibility::Neutral,
        PokeblockFlavorCompatibility::Neutral,
        PokeblockFlavorCompatibility::Neutral,
        PokeblockFlavorCompatibility::Neutral,
    ],
    /*Lonely */
    [
        PokeblockFlavorCompatibility::Yes,
        PokeblockFlavorCompatibility::Neutral,
        PokeblockFlavorCompatibility::Neutral,
        PokeblockFlavorCompatibility::Neutral,
        PokeblockFlavorCompatibility::No,
    ],
    /*Brave */
    [
        PokeblockFlavorCompatibility::Yes,
        PokeblockFlavorCompatibility::Neutral,
        PokeblockFlavorCompatibility::No,
        PokeblockFlavorCompatibility::Neutral,
        PokeblockFlavorCompatibility::Neutral,
    ],
    /*Adamant */
    [
        PokeblockFlavorCompatibility::Yes,
        PokeblockFlavorCompatibility::No,
        PokeblockFlavorCompatibility::Neutral,
        PokeblockFlavorCompatibility::Neutral,
        PokeblockFlavorCompatibility::Neutral,
    ],
    /*Naughty */
    [
        PokeblockFlavorCompatibility::Yes,
        PokeblockFlavorCompatibility::Neutral,
        PokeblockFlavorCompatibility::Neutral,
        PokeblockFlavorCompatibility::No,
        PokeblockFlavorCompatibility::Neutral,
    ],
    /*Bold */
    [
        PokeblockFlavorCompatibility::No,
        PokeblockFlavorCompatibility::Neutral,
        PokeblockFlavorCompatibility::Neutral,
        PokeblockFlavorCompatibility::Neutral,
        PokeblockFlavorCompatibility::Yes,
    ],
    /*Docile */
    [
        PokeblockFlavorCompatibility::Neutral,
        PokeblockFlavorCompatibility::Neutral,
        PokeblockFlavorCompatibility::Neutral,
        PokeblockFlavorCompatibility::Neutral,
        PokeblockFlavorCompatibility::Neutral,
    ],
    /*Relaxed */
    [
        PokeblockFlavorCompatibility::Neutral,
        PokeblockFlavorCompatibility::Neutral,
        PokeblockFlavorCompatibility::No,
        PokeblockFlavorCompatibility::Neutral,
        PokeblockFlavorCompatibility::Yes,
    ],
    /*Impish */
    [
        PokeblockFlavorCompatibility::Neutral,
        PokeblockFlavorCompatibility::No,
        PokeblockFlavorCompatibility::Neutral,
        PokeblockFlavorCompatibility::Neutral,
        PokeblockFlavorCompatibility::Yes,
    ],
    /*Lax */
    [
        PokeblockFlavorCompatibility::Neutral,
        PokeblockFlavorCompatibility::Neutral,
        PokeblockFlavorCompatibility::Neutral,
        PokeblockFlavorCompatibility::No,
        PokeblockFlavorCompatibility::Yes,
    ],
    /*Timid */
    [
        PokeblockFlavorCompatibility::No,
        PokeblockFlavorCompatibility::Neutral,
        PokeblockFlavorCompatibility::Yes,
        PokeblockFlavorCompatibility::Neutral,
        PokeblockFlavorCompatibility::Neutral,
    ],
    /*Hasty */
    [
        PokeblockFlavorCompatibility::Neutral,
        PokeblockFlavorCompatibility::Neutral,
        PokeblockFlavorCompatibility::Yes,
        PokeblockFlavorCompatibility::Neutral,
        PokeblockFlavorCompatibility::No,
    ],
    /*Serious */
    [
        PokeblockFlavorCompatibility::Neutral,
        PokeblockFlavorCompatibility::Neutral,
        PokeblockFlavorCompatibility::Neutral,
        PokeblockFlavorCompatibility::Neutral,
        PokeblockFlavorCompatibility::Neutral,
    ],
    /*Jolly */
    [
        PokeblockFlavorCompatibility::Neutral,
        PokeblockFlavorCompatibility::No,
        PokeblockFlavorCompatibility::Yes,
        PokeblockFlavorCompatibility::Neutral,
        PokeblockFlavorCompatibility::Neutral,
    ],
    /*Naive */
    [
        PokeblockFlavorCompatibility::Neutral,
        PokeblockFlavorCompatibility::Neutral,
        PokeblockFlavorCompatibility::Yes,
        PokeblockFlavorCompatibility::No,
        PokeblockFlavorCompatibility::Neutral,
    ],
    /*Modest */
    [
        PokeblockFlavorCompatibility::No,
        PokeblockFlavorCompatibility::Yes,
        PokeblockFlavorCompatibility::Neutral,
        PokeblockFlavorCompatibility::Neutral,
        PokeblockFlavorCompatibility::Neutral,
    ],
    /*Mild */
    [
        PokeblockFlavorCompatibility::Neutral,
        PokeblockFlavorCompatibility::Yes,
        PokeblockFlavorCompatibility::Neutral,
        PokeblockFlavorCompatibility::Neutral,
        PokeblockFlavorCompatibility::No,
    ],
    /*Quiet */
    [
        PokeblockFlavorCompatibility::Neutral,
        PokeblockFlavorCompatibility::Yes,
        PokeblockFlavorCompatibility::No,
        PokeblockFlavorCompatibility::Neutral,
        PokeblockFlavorCompatibility::Neutral,
    ],
    /*Bashful */
    [
        PokeblockFlavorCompatibility::Neutral,
        PokeblockFlavorCompatibility::Neutral,
        PokeblockFlavorCompatibility::Neutral,
        PokeblockFlavorCompatibility::Neutral,
        PokeblockFlavorCompatibility::Neutral,
    ],
    /*Rash */
    [
        PokeblockFlavorCompatibility::Neutral,
        PokeblockFlavorCompatibility::Yes,
        PokeblockFlavorCompatibility::Neutral,
        PokeblockFlavorCompatibility::No,
        PokeblockFlavorCompatibility::Neutral,
    ],
    /*Calm */
    [
        PokeblockFlavorCompatibility::No,
        PokeblockFlavorCompatibility::Neutral,
        PokeblockFlavorCompatibility::Neutral,
        PokeblockFlavorCompatibility::Yes,
        PokeblockFlavorCompatibility::Neutral,
    ],
    /*Gentle */
    [
        PokeblockFlavorCompatibility::Neutral,
        PokeblockFlavorCompatibility::Neutral,
        PokeblockFlavorCompatibility::Neutral,
        PokeblockFlavorCompatibility::Yes,
        PokeblockFlavorCompatibility::No,
    ],
    /*Sassy */
    [
        PokeblockFlavorCompatibility::Neutral,
        PokeblockFlavorCompatibility::Neutral,
        PokeblockFlavorCompatibility::No,
        PokeblockFlavorCompatibility::Yes,
        PokeblockFlavorCompatibility::Neutral,
    ],
    /*Careful */
    [
        PokeblockFlavorCompatibility::Neutral,
        PokeblockFlavorCompatibility::No,
        PokeblockFlavorCompatibility::Neutral,
        PokeblockFlavorCompatibility::Yes,
        PokeblockFlavorCompatibility::Neutral,
    ],
    /*Quirky */
    [
        PokeblockFlavorCompatibility::Neutral,
        PokeblockFlavorCompatibility::Neutral,
        PokeblockFlavorCompatibility::Neutral,
        PokeblockFlavorCompatibility::Neutral,
        PokeblockFlavorCompatibility::Neutral,
    ],
];
