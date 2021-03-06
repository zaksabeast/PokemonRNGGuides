const list = [
    "Citra and 3DS",
    "Dolphin",
    "Ruby, Sapphire, and Emerald",
    "Fire Red and Leaf Green",
    "Diamond, Pearl, and Platinum",
    "Heart Gold and Soul Silver",
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