import type { Encounter } from "./encounter";
import type { Gen4GameVersion } from "../gen4types";

const FossilEncounters = {
  "omanyte-20": {
    species: "Omanyte",
    minLevel: 20,
    maxLevel: 20,
    isFixedGender: false,
  },
  "kabuto-20": {
    species: "Kabuto",
    minLevel: 20,
    maxLevel: 20,
    isFixedGender: false,
  },
  "aerodactyl-20": {
    species: "Aerodactyl",
    minLevel: 20,
    maxLevel: 20,
    isFixedGender: false,
  },
  "lileep-20": {
    species: "Lileep",
    minLevel: 20,
    maxLevel: 20,
    isFixedGender: false,
  },
  "anorith-20": {
    species: "Anorith",
    minLevel: 20,
    maxLevel: 20,
    isFixedGender: false,
  },
  "cranidos-20": {
    species: "Cranidos",
    minLevel: 20,
    maxLevel: 20,
    isFixedGender: false,
  },
  "shieldon-20": {
    species: "Shieldon",
    minLevel: 20,
    maxLevel: 20,
    isFixedGender: false,
  },
} as const satisfies Record<string, Encounter>;

const CommonDpptEncounters = {
  // Fossils
  ...FossilEncounters,

  // Gifts
  "riolu-1": {
    species: "Riolu",
    minLevel: 1,
    maxLevel: 1,
    offset: 0,
    isFixedGender: false,
  },

  // Stationary
  "spiritomb-25": {
    species: "Spiritomb",
    minLevel: 25,
    maxLevel: 25,
    isFixedGender: false,
  },

  // Legends
  "uxie-50": {
    species: "Uxie",
    minLevel: 50,
    maxLevel: 50,
    isFixedGender: true,
  },
  "azelf-50": {
    species: "Azelf",
    minLevel: 50,
    maxLevel: 50,
    isFixedGender: true,
  },

  // Events
  "manaphy-1": {
    species: "Manaphy",
    minLevel: 1,
    maxLevel: 1,
    isFixedGender: true,
  },
} as const satisfies Record<string, Encounter>;

const DiamondEncounters = {
  ...CommonDpptEncounters,

  // Gifts
  "eevee-5": {
    species: "Eevee",
    minLevel: 5,
    maxLevel: 5,
    isFixedGender: false,
  },
  "happiny-1": {
    species: "Happiny",
    minLevel: 1,
    maxLevel: 1,
    isFixedGender: true,
  },

  // Stationary
  "drifloon-22": {
    species: "Drifloon",
    minLevel: 22,
    maxLevel: 22,
    offset: 0,
    isFixedGender: false,
  },
  "rotom-15": {
    species: "Rotom_Normal",
    minLevel: 15,
    maxLevel: 15,
    isFixedGender: true,
  },

  // Legends
  "dialga-47": {
    species: "Dialga",
    minLevel: 47,
    maxLevel: 47,
    isFixedGender: true,
  },
  "giratina-70": {
    species: "Giratina_Altered",
    form: 0,
    minLevel: 70,
    maxLevel: 70,
    isFixedGender: true,
  },
  "heatran-70": {
    species: "Heatran",
    minLevel: 70,
    maxLevel: 70,
    isFixedGender: false,
  },
  "regigigas-70": {
    species: "Regigigas",
    minLevel: 70,
    maxLevel: 70,
    isFixedGender: true,
  },
} as const satisfies Record<string, Encounter>;

const PearlEncounters = {
  ...CommonDpptEncounters,

  // Gifts
  "eevee-5": {
    species: "Eevee",
    minLevel: 5,
    maxLevel: 5,
    isFixedGender: false,
  },
  "happiny-1": {
    species: "Happiny",
    minLevel: 1,
    maxLevel: 1,
    isFixedGender: true,
  },

  // Stationary
  "drifloon-22": {
    species: "Drifloon",
    minLevel: 22,
    maxLevel: 22,
    offset: 0,
    isFixedGender: false,
  },
  "rotom-15": {
    species: "Rotom_Normal",
    minLevel: 15,
    maxLevel: 15,
    isFixedGender: true,
  },

  // Legends
  "palkia-47": {
    species: "Palkia",
    minLevel: 47,
    maxLevel: 47,
    isFixedGender: true,
  },
  "giratina-70": {
    species: "Giratina_Altered",
    form: 0,
    minLevel: 70,
    maxLevel: 70,
    isFixedGender: true,
  },
  "heatran-70": {
    species: "Heatran",
    minLevel: 70,
    maxLevel: 70,
    isFixedGender: false,
  },
  "regigigas-70": {
    species: "Regigigas",
    minLevel: 70,
    maxLevel: 70,
    isFixedGender: true,
  },
} as const satisfies Record<string, Encounter>;

const PlatinumEncounters = {
  ...CommonDpptEncounters,

  // Gifts
  "eevee-20": {
    species: "Eevee",
    minLevel: 20,
    maxLevel: 20,
    isFixedGender: false,
  },
  "porygon-25": {
    species: "Porygon",
    minLevel: 25,
    maxLevel: 25,
    isFixedGender: true,
  },
  "togepi-1": {
    species: "Togepi",
    minLevel: 1,
    maxLevel: 1,
    isFixedGender: false,
  },

  // Stationary
  "drifloon-15": {
    species: "Drifloon",
    minLevel: 15,
    maxLevel: 15,
    offset: 0,
    isFixedGender: false,
  },
  "rotom-20": {
    species: "Rotom_Normal",
    minLevel: 20,
    maxLevel: 20,
    isFixedGender: true,
  },

  // Legends
  "dialga-70": {
    species: "Dialga",
    minLevel: 70,
    maxLevel: 70,
    isFixedGender: true,
  },
  "palkia-70": {
    species: "Palkia",
    minLevel: 70,
    maxLevel: 70,
    isFixedGender: true,
  },
  "regirock-30": {
    species: "Regirock",
    minLevel: 30,
    maxLevel: 30,
    isFixedGender: true,
  },
  "regice-30": {
    species: "Regice",
    minLevel: 30,
    maxLevel: 30,
    isFixedGender: true,
  },
  "registeel-30": {
    species: "Registeel",
    minLevel: 30,
    maxLevel: 30,
    isFixedGender: true,
  },
  "regigigas-1": {
    species: "Regigigas",
    minLevel: 1,
    maxLevel: 1,
    isFixedGender: true,
  },
  "giratina-alt-47": {
    species: "Giratina_Altered",
    form: 0,
    minLevel: 47,
    maxLevel: 47,
    isFixedGender: true,
  },
  "giratina-origin-47": {
    species: "Giratina_Origin",
    form: 1,
    minLevel: 47,
    maxLevel: 47,
    offset: 11,
    isFixedGender: true,
  },
  "heatran-50": {
    species: "Heatran",
    minLevel: 50,
    maxLevel: 50,
    isFixedGender: false,
  },

  // Events
  "darkrai-50": {
    species: "Darkrai",
    minLevel: 50,
    maxLevel: 50,
    isFixedGender: true,
  },
  "shaymin-land-30": {
    species: "Shaymin_Land",
    form: 0,
    minLevel: 30,
    maxLevel: 30,
    isFixedGender: true,
  },
} as const satisfies Record<string, Encounter>;

const CommonHgSsEncounters = {
  // Fossils
  ...FossilEncounters,

  // Gifts
  "tentacool-15": {
    species: "Tentacool",
    minLevel: 15,
    maxLevel: 15,
    isFixedGender: false,
  },
  "eevee-5": {
    species: "Eevee",
    label: "Eevee (Bill)",
    minLevel: 5,
    maxLevel: 5,
    isFixedGender: false,
  },
  "dratini-dragons-den-15": {
    species: "Dratini",
    label: "Dratini (Dragon's Den)",
    minLevel: 15,
    maxLevel: 15,
    isFixedGender: false,
  },
  "tyrogue-10": {
    species: "Tyrogue",
    minLevel: 10,
    maxLevel: 10,
    isFixedGender: true,
  },
  "mareep-1": {
    species: "Mareep",
    minLevel: 1,
    maxLevel: 1,
    isFixedGender: false,
  },
  "wooper-1": {
    species: "Wooper",
    minLevel: 1,
    maxLevel: 1,
    isFixedGender: false,
  },
  "slugma-1": {
    species: "Slugma",
    minLevel: 1,
    maxLevel: 1,
    isFixedGender: false,
  },

  // Game Corner
  "mrmime-15": {
    species: "MrMime",
    minLevel: 15,
    maxLevel: 15,
    isFixedGender: false,
  },
  "porygon-15": {
    species: "Porygon",
    minLevel: 15,
    maxLevel: 15,
    isFixedGender: true,
  },
  "abra-15": {
    species: "Abra",
    minLevel: 15,
    maxLevel: 15,
    isFixedGender: false,
  },
  "eevee-15": {
    species: "Eevee",
    label: "Eevee (Game Corner)",
    minLevel: 15,
    maxLevel: 15,
    isFixedGender: false,
  },
  "dratini-game-corner-15": {
    species: "Dratini",
    label: "Dratini (Game Corner)",
    minLevel: 15,
    maxLevel: 15,
    isFixedGender: false,
  },

  // Stationary
  "voltorb-23": {
    species: "Voltorb",
    minLevel: 23,
    maxLevel: 23,
    isFixedGender: true,
  },
  "geodude-21": {
    species: "Geodude",
    minLevel: 21,
    maxLevel: 21,
    isFixedGender: false,
  },
  "koffing-21": {
    species: "Koffing",
    minLevel: 21,
    maxLevel: 21,
    isFixedGender: false,
  },
  "gyarados-30": {
    species: "Gyarados",
    minLevel: 30,
    maxLevel: 30,
    isFixedGender: false,
  },
  "lapras-20": {
    species: "Lapras",
    minLevel: 20,
    maxLevel: 20,
    isFixedGender: false,
  },
  "electrode-23": {
    species: "Electrode",
    minLevel: 23,
    maxLevel: 23,
    isFixedGender: true,
  },
  "snorlax-50": {
    species: "Snorlax",
    minLevel: 50,
    maxLevel: 50,
    isFixedGender: false,
  },
  "sudowoodo-20": {
    species: "Sudowoodo",
    minLevel: 20,
    maxLevel: 20,
    isFixedGender: false,
  },

  // Legends
  "articuno-50": {
    species: "Articuno",
    minLevel: 50,
    maxLevel: 50,
    isFixedGender: true,
  },
  "zapdos-50": {
    species: "Zapdos",
    minLevel: 50,
    maxLevel: 50,
    isFixedGender: true,
  },
  "moltres-50": {
    species: "Moltres",
    minLevel: 50,
    maxLevel: 50,
    isFixedGender: true,
  },
  "mewtwo-70": {
    species: "Mewtwo",
    minLevel: 70,
    maxLevel: 70,
    isFixedGender: true,
  },
  "suicune-40": {
    species: "Suicune",
    minLevel: 40,
    maxLevel: 40,
    isFixedGender: true,
  },
  "rayquaza-50": {
    species: "Rayquaza",
    minLevel: 50,
    maxLevel: 50,
    isFixedGender: true,
  },
  "dialga-1": {
    species: "Dialga",
    minLevel: 1,
    maxLevel: 1,
    isFixedGender: true,
  },
  "palkia-1": {
    species: "Palkia",
    minLevel: 1,
    maxLevel: 1,
    isFixedGender: true,
  },
  "giratina-1": {
    species: "Giratina_Origin",
    form: 1,
    minLevel: 1,
    maxLevel: 1,
    isFixedGender: true,
  },

  // Events
  "manaphy-1": {
    species: "Manaphy",
    minLevel: 1,
    maxLevel: 1,
    isFixedGender: true,
  },
} as const satisfies Record<string, Encounter>;

const HeartGoldEncounters = {
  ...CommonHgSsEncounters,

  // Game Corner
  "ekans-15": {
    species: "Ekans",
    minLevel: 15,
    maxLevel: 15,
    isFixedGender: false,
  },

  // Legends
  "lugia-70": {
    species: "Lugia",
    minLevel: 70,
    maxLevel: 70,
    isFixedGender: true,
  },
  "hooh-45": {
    species: "HoOh",
    minLevel: 45,
    maxLevel: 45,
    isFixedGender: true,
  },
  "latios-40": {
    species: "Latios",
    minLevel: 40,
    maxLevel: 40,
    isFixedGender: true,
  },
  "kyogre-50": {
    species: "Kyogre",
    minLevel: 50,
    maxLevel: 50,
    isFixedGender: true,
  },
} as const satisfies Record<string, Encounter>;

const SoulSilverEncounters = {
  ...CommonHgSsEncounters,

  // Game Corner
  "sandshrew-15": {
    species: "Sandshrew",
    minLevel: 15,
    maxLevel: 15,
    isFixedGender: false,
  },

  // Legends
  "lugia-45": {
    species: "Lugia",
    minLevel: 45,
    maxLevel: 45,
    isFixedGender: true,
  },
  "hooh-70": {
    species: "HoOh",
    minLevel: 70,
    maxLevel: 70,
    isFixedGender: true,
  },
  "latias-40": {
    species: "Latias",
    minLevel: 40,
    maxLevel: 40,
    isFixedGender: true,
  },
  "groudon-50": {
    species: "Groudon",
    minLevel: 50,
    maxLevel: 50,
    isFixedGender: true,
  },
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
