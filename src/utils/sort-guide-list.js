const list = [
    "Citra and 3DS",
    "Dolphin",
    "Ruby, Sapphire, and Emerald",
    "FireRed and LeafGreen",
    "Diamond, Pearl, and Platinum",
    "HeartGold and SoulSilver",
    "Black and White",
    "Black 2 and White 2",
    "X and Y",
    "Omega Ruby and Alpha Sapphire",
    "Sun and Moon",
    "Ultra Sun and Ultra Moon",
    "Sword and Shield",
];

export const sortList = (first, second) => {
    return list.indexOf(first) - list.indexOf(second)
}