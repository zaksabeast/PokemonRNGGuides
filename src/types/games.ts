export const Rse = ["Ruby", "Sapphire", "Emerald"] as const;

export type Rse = (typeof Rse)[number];

const FrLg = ["FireRed", "LeafGreen"] as const;

export type FrLg = (typeof FrLg)[number];

export const Gen3GameVersions = [...Rse, ...FrLg] as const;

export type Gen3GameVersion = (typeof Gen3GameVersions)[number];

export const DpPt = ["Diamond", "Pearl", "Platinum"] as const;

export type DpPt = (typeof DpPt)[number];

export const Gen4GameVersions = [...DpPt, "HeartGold", "SoulSilver"] as const;

export type Gen4GameVersion = (typeof Gen4GameVersions)[number];
