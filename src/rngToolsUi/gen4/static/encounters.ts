import { Species } from "~/rngTools";
import { Gen4GameVersion } from "../gen4types";

export type Encounter = {
  species: Species;
  level: number;
  isFixedGender: boolean;
  offset?: number;
  form?: number;
  label?: string;
};

const FossilEncounters = {
  "omanyte-20": {
    species: "Omanyte",
    level: 20,
    isFixedGender: false,
  },
  "kabuto-20": {
    species: "Kabuto",
    level: 20,
    isFixedGender: false,
  },
  "aerodactyl-20": {
    species: "Aerodactyl",
    level: 20,
    isFixedGender: false,
  },
  "lileep-20": {
    species: "Lileep",
    level: 20,
    isFixedGender: false,
  },
  "anorith-20": {
    species: "Anorith",
    level: 20,
    isFixedGender: false,
  },
  "cranidos-20": {
    species: "Cranidos",
    level: 20,
    isFixedGender: false,
  },
  "shieldon-20": {
    species: "Shieldon",
    level: 20,
    isFixedGender: false,
  },
} as const satisfies Record<string, Encounter>;

const CommonDpptEncounters = {
  // Fossils
  ...FossilEncounters,

  // Gifts
  "riolu-1": { species: "Riolu", level: 1, offset: 0, isFixedGender: false },

  // Stationary
  "spiritomb-25": { species: "Spiritomb", level: 25, isFixedGender: false },

  // Legends
  "uxie-50": { species: "Uxie", level: 50, isFixedGender: true },
  "azelf-50": { species: "Azelf", level: 50, isFixedGender: true },
  "heatran-70": { species: "Heatran", level: 70, isFixedGender: false },

  // Events
  "manaphy-1": { species: "Manaphy", level: 1, isFixedGender: true },
} as const satisfies Record<string, Encounter>;

const DiamondEncounters = {
  ...CommonDpptEncounters,

  // Gifts
  "eevee-5": { species: "Eevee", level: 5, isFixedGender: false },
  "happiny-1": { species: "Happiny", level: 1, isFixedGender: true },

  // Stationary
  "drifloon-22": {
    species: "Drifloon",
    level: 22,
    offset: 0,
    isFixedGender: false,
  },
  "rotom-15": { species: "Rotom_Normal", level: 15, isFixedGender: true },

  // Legends
  "dialga-47": { species: "Dialga", level: 47, isFixedGender: true },
  "giratina-70": {
    species: "Giratina_Altered",
    form: 0,
    level: 70,
    isFixedGender: true,
  },
  "regigigas-70": { species: "Regigigas", level: 70, isFixedGender: true },
} as const satisfies Record<string, Encounter>;

const PearlEncounters = {
  ...CommonDpptEncounters,

  // Gifts
  "eevee-5": { species: "Eevee", level: 5, isFixedGender: false },
  "happiny-1": { species: "Happiny", level: 1, isFixedGender: true },

  // Stationary
  "drifloon-22": {
    species: "Drifloon",
    level: 22,
    offset: 0,
    isFixedGender: false,
  },
  "rotom-15": { species: "Rotom_Normal", level: 15, isFixedGender: true },

  // Legends
  "palkia-47": { species: "Palkia", level: 47, isFixedGender: true },
  "giratina-70": {
    species: "Giratina_Altered",
    form: 0,
    level: 70,
    isFixedGender: true,
  },
  "regigigas-70": { species: "Regigigas", level: 70, isFixedGender: true },
} as const satisfies Record<string, Encounter>;

const PlatinumEncounters = {
  ...CommonDpptEncounters,

  // Gifts
  "eevee-20": { species: "Eevee", level: 20, isFixedGender: false },
  "porygon-25": { species: "Porygon", level: 25, isFixedGender: true },
  "togepi-1": { species: "Togepi", level: 1, isFixedGender: false },

  // Stationary
  "drifloon-15": {
    species: "Drifloon",
    level: 15,
    offset: 0,
    isFixedGender: false,
  },
  "rotom-20": { species: "Rotom_Normal", level: 20, isFixedGender: true },

  // Legends
  "dialga-70": { species: "Dialga", level: 70, isFixedGender: true },
  "palkia-70": { species: "Palkia", level: 70, isFixedGender: true },
  "regirock-30": { species: "Regirock", level: 30, isFixedGender: true },
  "regice-30": { species: "Regice", level: 30, isFixedGender: true },
  "registeel-30": { species: "Registeel", level: 30, isFixedGender: true },
  "regigigas-1": { species: "Regigigas", level: 1, isFixedGender: true },
  "giratina-alt-47": {
    species: "Giratina_Altered",
    form: 0,
    level: 47,
    isFixedGender: true,
  },
  "giratina-origin-47": {
    species: "Giratina_Origin",
    form: 1,
    level: 47,
    offset: 11,
    isFixedGender: true,
  },

  // Events
  "darkrai-50": { species: "Darkrai", level: 50, isFixedGender: true },
  "shaymin-land-30": {
    species: "Shaymin_Land",
    form: 0,
    level: 30,
    isFixedGender: true,
  },
} as const satisfies Record<string, Encounter>;

const CommonHgSsEncounters = {
  // Fossils
  ...FossilEncounters,

  // Gifts
  "tentacool-15": { species: "Tentacool", level: 15, isFixedGender: false },
  "eevee-5": {
    species: "Eevee",
    label: "Eevee (Bill)",
    level: 5,
    isFixedGender: false,
  },
  "dratini-dragons-den-15": {
    species: "Dratini",
    label: "Dratini (Dragon's Den)",
    level: 15,
    isFixedGender: false,
  },
  "tyrogue-10": { species: "Tyrogue", level: 10, isFixedGender: true },
  "mareep-1": { species: "Mareep", level: 1, isFixedGender: false },
  "wooper-1": { species: "Wooper", level: 1, isFixedGender: false },
  "slugma-1": { species: "Slugma", level: 1, isFixedGender: false },

  // Game Corner
  "mrmime-15": { species: "MrMime", level: 15, isFixedGender: false },
  "porygon-15": { species: "Porygon", level: 15, isFixedGender: true },
  "abra-15": { species: "Abra", level: 15, isFixedGender: false },
  "eevee-15": {
    species: "Eevee",
    label: "Eevee (Game Corner)",
    level: 15,
    isFixedGender: false,
  },
  "dratini-game-corner-15": {
    species: "Dratini",
    label: "Dratini (Game Corner)",
    level: 15,
    isFixedGender: false,
  },

  // Stationary
  "voltorb-23": { species: "Voltorb", level: 23, isFixedGender: true },
  "geodude-21": { species: "Geodude", level: 21, isFixedGender: false },
  "koffing-21": { species: "Koffing", level: 21, isFixedGender: false },
  "gyarados-30": { species: "Gyarados", level: 30, isFixedGender: false },
  "lapras-20": { species: "Lapras", level: 20, isFixedGender: false },
  "electrode-23": { species: "Electrode", level: 23, isFixedGender: true },
  "snorlax-50": { species: "Snorlax", level: 50, isFixedGender: false },
  "sudowoodo-20": { species: "Sudowoodo", level: 20, isFixedGender: false },

  // Legends
  "articuno-50": { species: "Articuno", level: 50, isFixedGender: true },
  "zapdos-50": { species: "Zapdos", level: 50, isFixedGender: true },
  "moltres-50": { species: "Moltres", level: 50, isFixedGender: true },
  "mewtwo-70": { species: "Mewtwo", level: 70, isFixedGender: true },
  "suicune-40": { species: "Suicune", level: 40, isFixedGender: true },
  "rayquaza-50": { species: "Rayquaza", level: 50, isFixedGender: true },
  "dialga-1": { species: "Dialga", level: 1, isFixedGender: true },
  "palkia-1": { species: "Palkia", level: 1, isFixedGender: true },
  "giratina-1": {
    species: "Giratina_Origin",
    form: 1,
    level: 1,
    isFixedGender: true,
  },

  // Events
  "manaphy-1": { species: "Manaphy", level: 1, isFixedGender: true },
} as const satisfies Record<string, Encounter>;

const HeartGoldEncounters = {
  ...CommonHgSsEncounters,

  // Game Corner
  "ekans-15": { species: "Ekans", level: 15, isFixedGender: false },

  // Legends
  "lugia-70": { species: "Lugia", level: 70, isFixedGender: true },
  "hooh-45": { species: "HoOh", level: 45, isFixedGender: true },
  "latios-40": { species: "Latios", level: 40, isFixedGender: true },
  "kyogre-50": { species: "Kyogre", level: 50, isFixedGender: true },
} as const satisfies Record<string, Encounter>;

const SoulSilverEncounters = {
  ...CommonHgSsEncounters,

  // Game Corner
  "sandshrew-15": { species: "Sandshrew", level: 15, isFixedGender: false },

  // Legends
  "lugia-45": { species: "Lugia", level: 45, isFixedGender: true },
  "hooh-70": { species: "HoOh", level: 70, isFixedGender: true },
  "latias-40": { species: "Latias", level: 40, isFixedGender: true },
  "groudon-50": { species: "Groudon", level: 50, isFixedGender: true },
} as const satisfies Record<string, Encounter>;

const EncountersByGame = {
  Diamond: DiamondEncounters,
  Pearl: PearlEncounters,
  Platinum: PlatinumEncounters,
  HeartGold: HeartGoldEncounters,
  SoulSilver: SoulSilverEncounters,
} as const satisfies Record<Gen4GameVersion, Record<string, Encounter>>;

export const getGameEncounters = (
  game: Gen4GameVersion,
): Readonly<Record<string, Encounter>> => {
  return EncountersByGame[game];
};

export const defaultEncounter = DiamondEncounters["eevee-5"];
