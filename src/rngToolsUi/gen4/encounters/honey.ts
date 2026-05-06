import type { Encounter } from "./encounter";
import type { DpPt, Gen4GameVersion } from "../gen4types";
import type { Species } from "~/rngTools";

const SILCOON = "Silcoon" as const satisfies Species;
const CASCOON = "Cascoon" as const satisfies Species;

const SHARED_SPECIES = [
  "Wurmple",
  "Combee",
  "Burmy_Plant",
  "Cherubi",
  "Aipom",
  "Heracross",
  "Munchlax",
] as const satisfies Species[];

export const ALL_SPECIES = [...SHARED_SPECIES, SILCOON, CASCOON] as const;

export type HoneyTreeSpecies = (typeof ALL_SPECIES)[number];

const GAME_SPECIES = {
  Platinum: SHARED_SPECIES,
  Diamond: [...SHARED_SPECIES, SILCOON],
  Pearl: [...SHARED_SPECIES, CASCOON],
} as const satisfies Record<DpPt, readonly Species[]>;

export const getSpecies = (game: Gen4GameVersion, isMunchlaxTree: boolean) => {
  const species = GAME_SPECIES[game as DpPt] ?? [];
  if (!isMunchlaxTree) {
    return species.filter((spec) => spec !== "Munchlax");
  }

  return species;
};

const createEncounter = <Spec extends HoneyTreeSpecies>(species: Spec) =>
  ({ species, minLevel: 5, maxLevel: 15, isFixedGender: false }) as const;

const PlatinumEncounters = {
  "honey-wurmple": createEncounter("Wurmple"),
  "honey-combee": createEncounter("Combee"),
  "honey-burmy": createEncounter("Burmy_Plant"),
  "honey-cherubi": createEncounter("Cherubi"),
  "honey-aipom": createEncounter("Aipom"),
  "honey-heracross": createEncounter("Heracross"),
  "honey-munchlax": createEncounter("Munchlax"),
} as const satisfies Record<string, Encounter>;

const DiamondEncounters = {
  ...PlatinumEncounters,
  "honey-silcoon": createEncounter("Silcoon"),
} as const satisfies Record<string, Encounter>;

const PearlEncounters = {
  ...PlatinumEncounters,
  "honey-cascoon": createEncounter("Cascoon"),
} as const satisfies Record<string, Encounter>;

const EncountersByGame = {
  Diamond: DiamondEncounters,
  Pearl: PearlEncounters,
  Platinum: PlatinumEncounters,
} as const satisfies Record<DpPt, Record<string, Encounter>>;

export const getGameEncounters = (
  game: Gen4GameVersion,
): Record<string, Encounter> => {
  if (game === "HeartGold" || game === "SoulSilver") {
    return {};
  }

  return EncountersByGame[game];
};
