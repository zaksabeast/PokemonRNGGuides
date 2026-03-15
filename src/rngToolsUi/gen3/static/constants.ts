import { Species } from "~/rngTools";
import { match } from "ts-pattern";

export type Static3Game = "emerald" | "rs" | "frlg";

const staticESpecies: Species[] = [
  "Chikorita",
  "Totodile",
  "Cyndaquil",
  "Treecko",
  "Mudkip",
  "Torchic",
  "Lileep",
  "Anorith",
  "Castform_Normal",
  "Beldum",
  "Wynaut",
  "Kecleon",
  "Voltorb",
  "Electrode",
  "Sudowoodo",
  "Regirock",
  "Regice",
  "Registeel",
  "Latias",
  "Latios",
  "Kyogre",
  "Groudon",
  "Rayquaza",
  "Mew",
  "Deoxys_Speed",
  "Lugia",
  "HoOh",
];

const staticRSSpecies: Species[] = [
  "Treecko",
  "Mudkip",
  "Torchic",
  "Lileep",
  "Anorith",
  "Castform_Normal",
  "Beldum",
  "Wynaut",
  "Kecleon",
  "Voltorb",
  "Electrode",
  "Regirock",
  "Regice",
  "Registeel",
  "Latias",
  "Latios",
  "Kyogre",
  "Groudon",
  "Rayquaza",
];

const staticFRLGSpecies: Species[] = [
  "Bulbasaur",
  "Squirtle",
  "Charmander",
  "Omanyte",
  "Kabuto",
  "Aerodactyl",
  "Hitmonlee",
  "Hitmonchan",
  "Magikarp",
  "Lapras",
  "Eevee",
  "Togepi",
  "Abra",
  "Clefairy",
  "Scyther",
  "Dratini",
  "Porygon",
  "Pinsir",
  "Snorlax",
  "Electrode",
  "Hypno",
  "Articuno",
  "Zapdos",
  "Moltres",
  "Mewtwo",
  "Deoxys_Attack",
  "Deoxys_Defense",
  "Lugia",
  "HoOh",
  "Raikou",
  "Entei",
  "Suicune",
];

export const getStatic3Species = (game: Static3Game) => {
  return match(game)
    .with("emerald", () => staticESpecies)
    .with("rs", () => staticRSSpecies)
    .with("frlg", () => staticFRLGSpecies)
    .exhaustive();
};
