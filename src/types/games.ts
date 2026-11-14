export const Rse = ["Ruby", "Sapphire", "Emerald"] as const;

export type Rse = (typeof Rse)[number];

const FrLg = ["FireRed", "LeafGreen"] as const;

export type FrLg = (typeof FrLg)[number];

export const Gen3GameVersions = [...Rse, ...FrLg] as const;

export type Gen3GameVersion = (typeof Gen3GameVersions)[number];

export const DpPt = ["Diamond", "Pearl", "Platinum"] as const;

export type DpPt = (typeof DpPt)[number];

export const HgSs = ["HeartGold", "SoulSilver"] as const;

export type HgSs = (typeof HgSs)[number];

export const Gen4GameVersions = [...DpPt, ...HgSs] as const;

export type Gen4GameVersion = (typeof Gen4GameVersions)[number];

export const Gen4GamesByGroup = {
  dppt: DpPt,
  hgss: HgSs,
} as const;

export const isHgSs = (game: Gen4GameVersion): game is HgSs =>
  HgSs.some((hgss) => hgss === game);
