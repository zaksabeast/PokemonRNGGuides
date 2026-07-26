import type { Encounter } from "./encounter";
import type { Gen4GameVersion } from "../gen4types";

const FossilEncounters = {
  "omanyte-20": {
    species: "Omanyte",
    minLevel: 20,
    maxLevel: 20,
    isFixedGender: false,
    method: "One",
  },
  "kabuto-20": {
    species: "Kabuto",
    minLevel: 20,
    maxLevel: 20,
    isFixedGender: false,
    method: "One",
  },
  "aerodactyl-20": {
    species: "Aerodactyl",
    minLevel: 20,
    maxLevel: 20,
    isFixedGender: false,
    method: "One",
  },
  "lileep-20": {
    species: "Lileep",
    minLevel: 20,
    maxLevel: 20,
    isFixedGender: false,
    method: "One",
  },
  "anorith-20": {
    species: "Anorith",
    minLevel: 20,
    maxLevel: 20,
    isFixedGender: false,
    method: "One",
  },
  "cranidos-20": {
    species: "Cranidos",
    minLevel: 20,
    maxLevel: 20,
    isFixedGender: false,
    method: "One",
  },
  "shieldon-20": {
    species: "Shieldon",
    minLevel: 20,
    maxLevel: 20,
    isFixedGender: false,
    method: "One",
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
    method: "One",
  },

  // Stationary
  "spiritomb-25": {
    species: "Spiritomb",
    minLevel: 25,
    maxLevel: 25,
    isFixedGender: false,
    method: "DpptJ",
  },

  // Legends
  "uxie-50": {
    species: "Uxie",
    minLevel: 50,
    maxLevel: 50,
    isFixedGender: true,
    method: "DpptJ",
  },
  "azelf-50": {
    species: "Azelf",
    minLevel: 50,
    maxLevel: 50,
    isFixedGender: true,
    method: "DpptJ",
  },

  // Events
  "manaphy-1": {
    species: "Manaphy",
    minLevel: 1,
    maxLevel: 1,
    isFixedGender: true,
    method: "One",
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
    method: "One",
  },
  "happiny-1": {
    species: "Happiny",
    minLevel: 1,
    maxLevel: 1,
    isFixedGender: true,
    method: "One",
  },

  // Stationary
  "drifloon-22": {
    species: "Drifloon",
    minLevel: 22,
    maxLevel: 22,
    offset: 0,
    isFixedGender: false,
    method: "DpptJ",
  },
  "rotom-15": {
    species: "Rotom_Normal",
    minLevel: 15,
    maxLevel: 15,
    isFixedGender: true,
    method: "DpptJ",
  },

  // Legends
  "dialga-47": {
    species: "Dialga",
    minLevel: 47,
    maxLevel: 47,
    isFixedGender: true,
    method: "DpptJ",
  },
  "giratina-70": {
    species: "Giratina_Altered",
    form: 0,
    minLevel: 70,
    maxLevel: 70,
    isFixedGender: true,
    method: "DpptJ",
  },
  "heatran-70": {
    species: "Heatran",
    minLevel: 70,
    maxLevel: 70,
    isFixedGender: false,
    method: "DpptJ",
  },
  "regigigas-70": {
    species: "Regigigas",
    minLevel: 70,
    maxLevel: 70,
    isFixedGender: true,
    method: "DpptJ",
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
    method: "One",
  },
  "happiny-1": {
    species: "Happiny",
    minLevel: 1,
    maxLevel: 1,
    isFixedGender: true,
    method: "One",
  },

  // Stationary
  "drifloon-22": {
    species: "Drifloon",
    minLevel: 22,
    maxLevel: 22,
    offset: 0,
    isFixedGender: false,
    method: "DpptJ",
  },
  "rotom-15": {
    species: "Rotom_Normal",
    minLevel: 15,
    maxLevel: 15,
    isFixedGender: true,
    method: "DpptJ",
  },

  // Legends
  "palkia-47": {
    species: "Palkia",
    minLevel: 47,
    maxLevel: 47,
    isFixedGender: true,
    method: "DpptJ",
  },
  "giratina-70": {
    species: "Giratina_Altered",
    form: 0,
    minLevel: 70,
    maxLevel: 70,
    isFixedGender: true,
    method: "DpptJ",
  },
  "heatran-70": {
    species: "Heatran",
    minLevel: 70,
    maxLevel: 70,
    isFixedGender: false,
    method: "DpptJ",
  },
  "regigigas-70": {
    species: "Regigigas",
    minLevel: 70,
    maxLevel: 70,
    isFixedGender: true,
    method: "DpptJ",
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
    method: "One",
  },
  "porygon-25": {
    species: "Porygon",
    minLevel: 25,
    maxLevel: 25,
    isFixedGender: true,
    method: "One",
  },
  "togepi-1": {
    species: "Togepi",
    minLevel: 1,
    maxLevel: 1,
    isFixedGender: false,
    method: "One",
  },

  // Stationary
  "drifloon-15": {
    species: "Drifloon",
    minLevel: 15,
    maxLevel: 15,
    offset: 0,
    isFixedGender: false,
    method: "DpptJ",
  },
  "rotom-20": {
    species: "Rotom_Normal",
    minLevel: 20,
    maxLevel: 20,
    isFixedGender: true,
    method: "DpptJ",
  },

  // Legends
  "dialga-70": {
    species: "Dialga",
    minLevel: 70,
    maxLevel: 70,
    isFixedGender: true,
    method: "DpptJ",
  },
  "palkia-70": {
    species: "Palkia",
    minLevel: 70,
    maxLevel: 70,
    isFixedGender: true,
    method: "DpptJ",
  },
  "regirock-30": {
    species: "Regirock",
    minLevel: 30,
    maxLevel: 30,
    isFixedGender: true,
    method: "DpptJ",
  },
  "regice-30": {
    species: "Regice",
    minLevel: 30,
    maxLevel: 30,
    isFixedGender: true,
    method: "DpptJ",
  },
  "registeel-30": {
    species: "Registeel",
    minLevel: 30,
    maxLevel: 30,
    isFixedGender: true,
    method: "DpptJ",
  },
  "regigigas-1": {
    species: "Regigigas",
    minLevel: 1,
    maxLevel: 1,
    isFixedGender: true,
    method: "DpptJ",
  },
  "giratina-alt-47": {
    species: "Giratina_Altered",
    form: 0,
    minLevel: 47,
    maxLevel: 47,
    isFixedGender: true,
    method: "DpptJ",
  },
  "giratina-origin-47": {
    species: "Giratina_Origin",
    form: 1,
    minLevel: 47,
    maxLevel: 47,
    offset: 11,
    isFixedGender: true,
    method: "DpptJ",
  },
  "heatran-50": {
    species: "Heatran",
    minLevel: 50,
    maxLevel: 50,
    isFixedGender: false,
    method: "DpptJ",
  },

  // Events
  "darkrai-50": {
    species: "Darkrai",
    minLevel: 50,
    maxLevel: 50,
    isFixedGender: true,
    method: "DpptJ",
  },
  "shaymin-land-30": {
    species: "Shaymin_Land",
    form: 0,
    minLevel: 30,
    maxLevel: 30,
    isFixedGender: true,
    method: "DpptJ",
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
    method: "One",
  },
  "eevee-5": {
    species: "Eevee",
    label: "Eevee (Bill)",
    minLevel: 5,
    maxLevel: 5,
    isFixedGender: false,
    method: "One",
  },
  "dratini-dragons-den-15": {
    species: "Dratini",
    label: "Dratini (Dragon's Den)",
    minLevel: 15,
    maxLevel: 15,
    isFixedGender: false,
    method: "One",
  },
  "tyrogue-10": {
    species: "Tyrogue",
    minLevel: 10,
    maxLevel: 10,
    isFixedGender: true,
    method: "One",
  },
  "mareep-1": {
    species: "Mareep",
    minLevel: 1,
    maxLevel: 1,
    isFixedGender: false,
    method: "One",
  },
  "wooper-1": {
    species: "Wooper",
    minLevel: 1,
    maxLevel: 1,
    isFixedGender: false,
    method: "One",
  },
  "slugma-1": {
    species: "Slugma",
    minLevel: 1,
    maxLevel: 1,
    isFixedGender: false,
    method: "One",
  },

  // Game Corner
  "mrmime-15": {
    species: "MrMime",
    minLevel: 15,
    maxLevel: 15,
    isFixedGender: false,
    method: "One",
  },
  "porygon-15": {
    species: "Porygon",
    minLevel: 15,
    maxLevel: 15,
    isFixedGender: true,
    method: "One",
  },
  "abra-15": {
    species: "Abra",
    minLevel: 15,
    maxLevel: 15,
    isFixedGender: false,
    method: "One",
  },
  "eevee-15": {
    species: "Eevee",
    label: "Eevee (Game Corner)",
    minLevel: 15,
    maxLevel: 15,
    isFixedGender: false,
    method: "One",
  },
  "dratini-game-corner-15": {
    species: "Dratini",
    label: "Dratini (Game Corner)",
    minLevel: 15,
    maxLevel: 15,
    isFixedGender: false,
    method: "One",
  },

  // Stationary
  "voltorb-23": {
    species: "Voltorb",
    minLevel: 23,
    maxLevel: 23,
    isFixedGender: true,
    method: "HgssK",
  },
  "geodude-21": {
    species: "Geodude",
    minLevel: 21,
    maxLevel: 21,
    isFixedGender: false,
    method: "One",
  },
  "koffing-21": {
    species: "Koffing",
    minLevel: 21,
    maxLevel: 21,
    isFixedGender: false,
    method: "One",
  },
  "gyarados-30": {
    species: "Gyarados",
    minLevel: 30,
    maxLevel: 30,
    isFixedGender: false,
    method: "One",
  },
  "lapras-20": {
    species: "Lapras",
    minLevel: 20,
    maxLevel: 20,
    isFixedGender: false,
    method: "HgssK",
  },
  "electrode-23": {
    species: "Electrode",
    minLevel: 23,
    maxLevel: 23,
    isFixedGender: true,
    method: "HgssK",
  },
  "snorlax-50": {
    species: "Snorlax",
    minLevel: 50,
    maxLevel: 50,
    isFixedGender: false,
    method: "HgssK",
  },
  "sudowoodo-20": {
    species: "Sudowoodo",
    minLevel: 20,
    maxLevel: 20,
    isFixedGender: false,
    method: "HgssK",
  },

  // Legends
  "articuno-50": {
    species: "Articuno",
    minLevel: 50,
    maxLevel: 50,
    isFixedGender: true,
    method: "HgssK",
  },
  "zapdos-50": {
    species: "Zapdos",
    minLevel: 50,
    maxLevel: 50,
    isFixedGender: true,
    method: "HgssK",
  },
  "moltres-50": {
    species: "Moltres",
    minLevel: 50,
    maxLevel: 50,
    isFixedGender: true,
    method: "HgssK",
  },
  "mewtwo-70": {
    species: "Mewtwo",
    minLevel: 70,
    maxLevel: 70,
    isFixedGender: true,
    method: "HgssK",
  },
  "suicune-40": {
    species: "Suicune",
    minLevel: 40,
    maxLevel: 40,
    isFixedGender: true,
    method: "HgssK",
  },
  "rayquaza-50": {
    species: "Rayquaza",
    minLevel: 50,
    maxLevel: 50,
    isFixedGender: true,
    method: "HgssK",
  },
  "dialga-1": {
    species: "Dialga",
    minLevel: 1,
    maxLevel: 1,
    isFixedGender: true,
    method: "One",
  },
  "palkia-1": {
    species: "Palkia",
    minLevel: 1,
    maxLevel: 1,
    isFixedGender: true,
    method: "One",
  },
  "giratina-1": {
    species: "Giratina_Origin",
    form: 1,
    minLevel: 1,
    maxLevel: 1,
    isFixedGender: true,
    method: "One",
  },

  // Events
  "manaphy-1": {
    species: "Manaphy",
    minLevel: 1,
    maxLevel: 1,
    isFixedGender: true,
    method: "One",
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
    method: "One",
  },

  // Legends
  "lugia-70": {
    species: "Lugia",
    minLevel: 70,
    maxLevel: 70,
    isFixedGender: true,
    method: "HgssK",
  },
  "hooh-45": {
    species: "HoOh",
    minLevel: 45,
    maxLevel: 45,
    isFixedGender: true,
    method: "HgssK",
  },
  "latios-40": {
    species: "Latios",
    minLevel: 40,
    maxLevel: 40,
    isFixedGender: true,
    method: "HgssK",
  },
  "kyogre-50": {
    species: "Kyogre",
    minLevel: 50,
    maxLevel: 50,
    isFixedGender: true,
    method: "HgssK",
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
    method: "One",
  },

  // Legends
  "lugia-45": {
    species: "Lugia",
    minLevel: 45,
    maxLevel: 45,
    isFixedGender: true,
    method: "HgssK",
  },
  "hooh-70": {
    species: "HoOh",
    minLevel: 70,
    maxLevel: 70,
    isFixedGender: true,
    method: "HgssK",
  },
  "latias-40": {
    species: "Latias",
    minLevel: 40,
    maxLevel: 40,
    isFixedGender: true,
    method: "HgssK",
  },
  "groudon-50": {
    species: "Groudon",
    minLevel: 50,
    maxLevel: 50,
    isFixedGender: true,
    method: "HgssK",
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
