import { Gen3StaticMethod, Species } from "~/rngTools";
import { match } from "ts-pattern";
import uniq from "lodash-es/uniq";

export type Static3Game = "emerald" | "rs" | "frlg";

export const static3Games = [
  "emerald",
  "rs",
  "frlg",
] as const satisfies Static3Game[];

export const gen3StaticMethods = [
  "Static1",
  "Static4",
] as const satisfies readonly Gen3StaticMethod[];

export type Static3Encounter = {
  species: Species;
  lvl: number;
  location: string;
  roaming: boolean;
  calib?: number;
  mustWaitInMenu?: boolean;
  offset?: number;
  note?: string;
};

/*
calib: boot game and right before interacting, check number of non-vblank rng updates.
offset: check rng advance on pause. unpause while holding A, and count number of adv for CreateBoxMon_pid_low
*/

const TV_SAVE_BLOCK_CALIB = 4; // assumes no lottery, and no roamer

const emeraldStaticEncounters: Static3Encounter[] = [
  ...(["Chikorita", "Totodile", "Cyndaquil"] as const).map((species) => ({
    species,
    lvl: 5,
    location: "Littleroot Town (after completing the Hoenn Pokédex)",
    roaming: false,

    offset: 3,
    // +5 for npc moves
    calib: TV_SAVE_BLOCK_CALIB + 5,
    mustWaitInMenu: true,
  })),
  ...(["Treecko", "Mudkip", "Torchic"] as const).map((species) => ({
    species,
    lvl: 5,
    location: "Route 101",
    roaming: false,
    offset: 3,
    // +5 for npc move
    calib: TV_SAVE_BLOCK_CALIB + 5,
  })),
  ...(["Lileep", "Anorith"] as const).map((species) => ({
    species,
    lvl: 20,
    location: "Rustboro City",
    roaming: false,
    offset: 3,
    // standard
    calib: TV_SAVE_BLOCK_CALIB,
  })),
  {
    species: "Castform_Normal",
    lvl: 25,
    location: "Weather Institute",
    roaming: false,
  },
  {
    species: "Beldum",
    lvl: 5,
    location: "Mossdeep City",
    roaming: false,
    offset: 3,
    // +1 for npc move
    calib: TV_SAVE_BLOCK_CALIB + 1,
  },
  {
    species: "Wynaut",
    lvl: 5,
    location: "Lavaridge Town",
    roaming: false,
    offset: 165,
    // +3 for npc move
    calib: TV_SAVE_BLOCK_CALIB + 3,
  },
  {
    species: "Kecleon",
    lvl: 30,
    location: "Route 119, Route 120",
    roaming: false,
    offset: 1859 - 1715,
    // +1 for ambient cry
    calib: TV_SAVE_BLOCK_CALIB + 1,
  },
  {
    species: "Voltorb",
    lvl: 25,
    location: "New Mauville",
    roaming: false,
    offset: 4,
    // +1 for ChooseWildMonIndex_Land_Random, +1 for UpdateAmbientCry_v1, +1 for npc move
    calib: TV_SAVE_BLOCK_CALIB + 3,
    mustWaitInMenu: true,
  },
  {
    species: "Electrode",
    lvl: 30,
    location: "Aqua Hideout",
    roaming: false,
    offset: 4,
    // +2 for npc move (assuming both balls are displayed)
    calib: TV_SAVE_BLOCK_CALIB + 2,
    mustWaitInMenu: true,
  },
  {
    species: "Sudowoodo",
    lvl: 40,
    location: "Battle Frontier",
    roaming: false,
    offset: 52,
    // +1 for npc move
    calib: TV_SAVE_BLOCK_CALIB + 1,
  },
  {
    species: "Regirock",
    lvl: 40,
    location: "Desert Ruins",
    roaming: false,
    offset: 103,
    calib: TV_SAVE_BLOCK_CALIB,
  },
  {
    species: "Regice",
    lvl: 40,
    location: "Island Cave",
    roaming: false,
    offset: 103,
    calib: TV_SAVE_BLOCK_CALIB,
  },
  {
    species: "Registeel",
    lvl: 40,
    location: "Ancient Tomb",
    roaming: false,
    offset: 919 - 840,
    calib: TV_SAVE_BLOCK_CALIB,
  },
  ...(["Latias", "Latios"] as const).map((species) => ({
    species,
    lvl: 40,
    location: "Hoenn (Roaming)",
    roaming: true,
    offset: 3,
    // +3 for save block when changing map
    calib: TV_SAVE_BLOCK_CALIB + 3,
    // ~2800 minimum advances
  })),
  ...(["Latias", "Latios"] as const).map((species) => ({
    species,
    lvl: 50,
    location: "Southern Island (Eon Ticket event)",
    roaming: false,
    offset: 1002 - 570,
    calib: TV_SAVE_BLOCK_CALIB,
    mustWaitInMenu: true,
  })),
  {
    species: "Kyogre",
    lvl: 70,
    location: "Marine Cave",
    roaming: false,
    offset: 288,
    calib: TV_SAVE_BLOCK_CALIB,
  },
  {
    species: "Groudon",
    lvl: 70,
    location: "Terra Cave",
    roaming: false,
    offset: 288,
    calib: TV_SAVE_BLOCK_CALIB,
  },
  {
    species: "Rayquaza",
    lvl: 70,
    location: "Sky Pillar",
    roaming: false,
    offset: 96,
    calib: TV_SAVE_BLOCK_CALIB,
  },
  {
    species: "Mew",
    lvl: 30,
    location: "Faraway Island (Old Sea Map event)",
    roaming: false,
    offset: 1009 - 900,
    calib: TV_SAVE_BLOCK_CALIB,
  },
  {
    species: "Deoxys_Speed",
    lvl: 30,
    location: "Birth Island (AuroraTicket event)",
    roaming: false,
    offset: 1251 - 750,
    calib: TV_SAVE_BLOCK_CALIB,
  },
  {
    species: "Lugia",
    lvl: 70,
    location: "Navel Rock (MysticTicket event)",
    roaming: false,
    offset: 816 - 540,
    calib: TV_SAVE_BLOCK_CALIB,
  },
  {
    species: "HoOh",
    lvl: 70,
    location: "Navel Rock (MysticTicket event)",
    roaming: false,
    offset: 378,
    calib: TV_SAVE_BLOCK_CALIB,
  },
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

export const getPossibleRoamingValuesForSpecies = (
  game: Static3Game,
  selectedSpecies: Species,
) => {
  return uniq(
    getStatic3SpeciesEncounters(game)
      .filter((encounter) => encounter.species === selectedSpecies)
      .map((encounter) => encounter.roaming),
  );
};

export const getPossibleStatic3Species = (game: Static3Game) => {
  return uniq(
    getStatic3SpeciesEncounters(game).map((encounter) => encounter.species),
  );
};
