import { Species } from "~/rngTools";
import { match } from "ts-pattern";

export type Static3Game = "emerald" | "rs" | "frlg";
export type Static3Encounter = {
  species: Species;
  lvl: number;
  location: string;
  roaming: boolean;
};

const emeraldStaticEncounters: Static3Encounter[] = [
  { species: "Chikorita", lvl: 5, location: "Littleroot Town", roaming: false },
  { species: "Totodile", lvl: 5, location: "Littleroot Town", roaming: false },
  { species: "Cyndaquil", lvl: 5, location: "Littleroot Town", roaming: false },
  { species: "Treecko", lvl: 5, location: "Route 101", roaming: false },
  { species: "Mudkip", lvl: 5, location: "Route 101", roaming: false },
  { species: "Torchic", lvl: 5, location: "Route 101", roaming: false },
  { species: "Lileep", lvl: 20, location: "Rustboro City", roaming: false },
  { species: "Anorith", lvl: 20, location: "Rustboro City", roaming: false },
  {
    species: "Castform_Normal",
    lvl: 25,
    location: "Weather Institute",
    roaming: false,
  },
  { species: "Beldum", lvl: 5, location: "Mossdeep City", roaming: false },
  { species: "Wynaut", lvl: 5, location: "Lavaridge Town", roaming: false },
  {
    species: "Kecleon",
    lvl: 30,
    location: "Route 119, Route 120",
    roaming: false,
  },
  { species: "Voltorb", lvl: 25, location: "New Mauville", roaming: false },
  { species: "Electrode", lvl: 30, location: "Aqua Hideout", roaming: false },
  {
    species: "Sudowoodo",
    lvl: 40,
    location: "Battle Frontier",
    roaming: false,
  },
  { species: "Regirock", lvl: 40, location: "Desert Ruins", roaming: false },
  { species: "Regice", lvl: 40, location: "Island Cave", roaming: false },
  { species: "Registeel", lvl: 40, location: "Ancient Tomb", roaming: false },
  { species: "Latias", lvl: 40, location: "Hoenn (Roaming)", roaming: true },
  { species: "Latios", lvl: 40, location: "Hoenn (Roaming)", roaming: true },
  {
    species: "Latias",
    lvl: 50,
    location: "Southern Island (event)",
    roaming: false,
  },
  {
    species: "Latios",
    lvl: 50,
    location: "Southern Island (event)",
    roaming: false,
  },
  { species: "Kyogre", lvl: 70, location: "Marine Cave", roaming: false },
  { species: "Groudon", lvl: 70, location: "Terra Cave", roaming: false },
  { species: "Rayquaza", lvl: 70, location: "Sky Pillar", roaming: false },
  {
    species: "Mew",
    lvl: 30,
    location: "Faraway Island (event)",
    roaming: false,
  },
  {
    species: "Deoxys_Speed",
    lvl: 30,
    location: "Birth Island (event)",
    roaming: false,
  },
  { species: "Lugia", lvl: 70, location: "Navel Rock (event)", roaming: false },
  { species: "HoOh", lvl: 70, location: "Navel Rock (event)", roaming: false },
];

const rsStaticEncounters: Static3Encounter[] = [
  { species: "Treecko", lvl: 5, location: "Route 101", roaming: false },
  { species: "Mudkip", lvl: 5, location: "Route 101", roaming: false },
  { species: "Torchic", lvl: 5, location: "Route 101", roaming: false },
  { species: "Lileep", lvl: 20, location: "Rustboro City", roaming: false },
  { species: "Anorith", lvl: 20, location: "Rustboro City", roaming: false },
  {
    species: "Castform_Normal",
    lvl: 25,
    location: "Weather Institute",
    roaming: false,
  },
  { species: "Beldum", lvl: 5, location: "Mossdeep City", roaming: false },
  { species: "Wynaut", lvl: 5, location: "Lavaridge Town", roaming: false },
  { species: "Kecleon", lvl: 30, location: "Route 120", roaming: false },
  { species: "Voltorb", lvl: 25, location: "New Mauville", roaming: false },
  {
    species: "Electrode",
    lvl: 40,
    location: "Magma Hideout, Aqua Hideout",
    roaming: false,
  },
  { species: "Regirock", lvl: 40, location: "Desert Ruins", roaming: false },
  { species: "Regice", lvl: 40, location: "Island Cave", roaming: false },
  { species: "Registeel", lvl: 40, location: "Ancient Tomb", roaming: false },
  { species: "Latias", lvl: 40, location: "Hoenn (Roaming)", roaming: true },
  { species: "Latios", lvl: 40, location: "Hoenn (Roaming)", roaming: true },
  {
    species: "Latias",
    lvl: 50,
    location: "Southern Island (event)",
    roaming: false,
  },
  {
    species: "Latios",
    lvl: 50,
    location: "Southern Island (event)",
    roaming: false,
  },
  { species: "Kyogre", lvl: 45, location: "Cave of Origin", roaming: false },
  { species: "Groudon", lvl: 45, location: "Cave of Origin", roaming: false },
  { species: "Rayquaza", lvl: 70, location: "Sky Pillar", roaming: false },
];

const frlgStaticEncounters: Static3Encounter[] = [
  { species: "Bulbasaur", lvl: 5, location: "Pallet Town", roaming: false },
  { species: "Squirtle", lvl: 5, location: "Pallet Town", roaming: false },
  { species: "Charmander", lvl: 5, location: "Pallet Town", roaming: false },
  { species: "Omanyte", lvl: 5, location: "Cinnabar Island", roaming: false },
  { species: "Kabuto", lvl: 5, location: "Cinnabar Island", roaming: false },
  {
    species: "Aerodactyl",
    lvl: 5,
    location: "Cinnabar Island",
    roaming: false,
  },
  { species: "Hitmonlee", lvl: 25, location: "Saffron City", roaming: false },
  { species: "Hitmonchan", lvl: 25, location: "Saffron City", roaming: false },
  { species: "Magikarp", lvl: 5, location: "Route 4", roaming: false },
  { species: "Lapras", lvl: 25, location: "Silph Co.", roaming: false },
  { species: "Eevee", lvl: 25, location: "Celadon City", roaming: false },
  { species: "Togepi", lvl: 5, location: "Water Labyrinth", roaming: false },
  { species: "Abra", lvl: 9, location: "Celadon City", roaming: false },
  { species: "Clefairy", lvl: 8, location: "Celadon City", roaming: false },
  { species: "Scyther", lvl: 25, location: "Celadon City", roaming: false },
  { species: "Dratini", lvl: 18, location: "Celadon City", roaming: false },
  { species: "Porygon", lvl: 26, location: "Celadon City", roaming: false },
  { species: "Pinsir", lvl: 20, location: "Celadon City", roaming: false },
  {
    species: "Snorlax",
    lvl: 30,
    location: "Route 12, Route 16",
    roaming: false,
  },
  { species: "Electrode", lvl: 34, location: "Power Plant", roaming: false },
  { species: "Hypno", lvl: 30, location: "Berry Forest", roaming: false },
  { species: "Articuno", lvl: 50, location: "Seafoam Islands", roaming: false },
  { species: "Zapdos", lvl: 50, location: "Power Plant", roaming: false },
  { species: "Moltres", lvl: 50, location: "Mt. Ember", roaming: false },
  { species: "Mewtwo", lvl: 70, location: "Cerulean Cave", roaming: false },
  {
    species: "Deoxys_Attack",
    lvl: 30,
    location: "Birth Island",
    roaming: false,
  },
  {
    species: "Deoxys_Defense",
    lvl: 30,
    location: "Birth Island",
    roaming: false,
  },
  { species: "Lugia", lvl: 70, location: "Navel Rock (event)", roaming: false },
  { species: "HoOh", lvl: 70, location: "Navel Rock (event)", roaming: false },
  { species: "Raikou", lvl: 50, location: "Kanto (Roaming)", roaming: true },
  { species: "Entei", lvl: 50, location: "Kanto (Roaming)", roaming: true },
  { species: "Suicune", lvl: 50, location: "Kanto (Roaming)", roaming: true },
];

export const getStatic3SpeciesEncounters = (game: Static3Game) => {
  return match(game)
    .with("emerald", () => emeraldStaticEncounters)
    .with("rs", () => rsStaticEncounters)
    .with("frlg", () => frlgStaticEncounters)
    .exhaustive();
};
