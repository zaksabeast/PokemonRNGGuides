import { Species } from "~/rngTools";
import { match } from "ts-pattern";

export type Static3Game = "emerald" | "rs" | "frlg";
export type Static3Encounter = { species: Species; lvl: number };

const staticESpecies: Static3Encounter[] = [
  { species: "Chikorita", lvl: 5 },
  { species: "Totodile", lvl: 5 },
  { species: "Cyndaquil", lvl: 5 },
  { species: "Treecko", lvl: 5 },
  { species: "Mudkip", lvl: 5 },
  { species: "Torchic", lvl: 5 },
  { species: "Lileep", lvl: 20 },
  { species: "Anorith", lvl: 20 },
  { species: "Castform_Normal", lvl: 25 },
  { species: "Beldum", lvl: 5 },
  { species: "Wynaut", lvl: 5 },
  { species: "Kecleon", lvl: 30 },
  { species: "Voltorb", lvl: 25 },
  { species: "Electrode", lvl: 30 },
  { species: "Sudowoodo", lvl: 40 },
  { species: "Regirock", lvl: 40 },
  { species: "Regice", lvl: 40 },
  { species: "Registeel", lvl: 40 },
  { species: "Latias", lvl: 40 },
  { species: "Latios", lvl: 40 },
  { species: "Kyogre", lvl: 70 },
  { species: "Groudon", lvl: 70 },
  { species: "Rayquaza", lvl: 70 },
  { species: "Mew", lvl: 30 },
  { species: "Deoxys_Speed", lvl: 30 },
  { species: "Lugia", lvl: 70 },
  { species: "HoOh", lvl: 70 },
];

const staticRSSpecies: Static3Encounter[] = [
  { species: "Treecko", lvl: 5 },
  { species: "Mudkip", lvl: 5 },
  { species: "Torchic", lvl: 5 },
  { species: "Lileep", lvl: 20 },
  { species: "Anorith", lvl: 20 },
  { species: "Castform_Normal", lvl: 25 },
  { species: "Beldum", lvl: 5 },
  { species: "Wynaut", lvl: 5 },
  { species: "Kecleon", lvl: 30 },
  { species: "Voltorb", lvl: 25 },
  { species: "Electrode", lvl: 40 },
  { species: "Regirock", lvl: 40 },
  { species: "Regice", lvl: 40 },
  { species: "Registeel", lvl: 40 },
  { species: "Latias", lvl: 40 },
  { species: "Latios", lvl: 40 },
  { species: "Kyogre", lvl: 45 },
  { species: "Groudon", lvl: 45 },
  { species: "Rayquaza", lvl: 70 },
];

const staticFRLGSpecies: Static3Encounter[] = [
  { species: "Bulbasaur", lvl: 5 },
  { species: "Squirtle", lvl: 5 },
  { species: "Charmander", lvl: 5 },
  { species: "Omanyte", lvl: 5 },
  { species: "Kabuto", lvl: 5 },
  { species: "Aerodactyl", lvl: 5 },
  { species: "Hitmonlee", lvl: 25 },
  { species: "Hitmonchan", lvl: 25 },
  { species: "Magikarp", lvl: 5 },
  { species: "Lapras", lvl: 25 },
  { species: "Eevee", lvl: 25 },
  { species: "Togepi", lvl: 5 },
  { species: "Abra", lvl: 9 },
  { species: "Clefairy", lvl: 8 },
  { species: "Scyther", lvl: 25 },
  { species: "Dratini", lvl: 18 },
  { species: "Porygon", lvl: 26 },
  { species: "Pinsir", lvl: 20 },
  { species: "Snorlax", lvl: 30 },
  { species: "Electrode", lvl: 34 },
  { species: "Hypno", lvl: 30 },
  { species: "Articuno", lvl: 50 },
  { species: "Zapdos", lvl: 50 },
  { species: "Moltres", lvl: 50 },
  { species: "Mewtwo", lvl: 70 },
  { species: "Deoxys_Attack", lvl: 30 },
  { species: "Deoxys_Defense", lvl: 30 },
  { species: "Lugia", lvl: 70 },
  { species: "HoOh", lvl: 70 },
  { species: "Raikou", lvl: 50 },
  { species: "Entei", lvl: 50 },
  { species: "Suicune", lvl: 50 },
];

export const getStatic3SpeciesEncounters = (game: Static3Game) => {
  return match(game)
    .with("emerald", () => staticESpecies)
    .with("rs", () => staticRSSpecies)
    .with("frlg", () => staticFRLGSpecies)
    .exhaustive();
};
