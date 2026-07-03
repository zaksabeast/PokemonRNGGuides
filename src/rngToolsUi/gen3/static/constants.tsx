import { Gen3StaticMethod, Species } from "~/rngTools";
import { match } from "ts-pattern";
import uniq from "lodash-es/uniq";
import Instruction_LatiosRoaming from "./Instructions_LatiosRoaming.mdx";
import Instruction_LatiasRoaming from "./Instructions_LatiasRoaming.mdx";
import Instructions_Anorith from "./Instructions_Anorith.mdx";
import Instructions_Beldum from "./Instructions_Beldum.mdx";
import Instructions_Castform from "./Instructions_Castform.mdx";
import Instructions_Chikorita from "./Instructions_Chikorita.mdx";
import Instructions_Cyndaquil from "./Instructions_Cyndaquil.mdx";
import Instructions_Deoxys from "./Instructions_Deoxys.mdx";
import Instructions_Electrode from "./Instructions_Electrode.mdx";
import Instructions_Groudon from "./Instructions_Groudon.mdx";
import Instructions_HoOh from "./Instructions_HoOh.mdx";
import Instructions_Kecleon from "./Instructions_Kecleon.mdx";
import Instructions_Kyogre from "./Instructions_Kyogre.mdx";
import Instructions_LatiasSouthernIsland from "./Instructions_LatiasSouthernIsland.mdx";
import Instructions_LatiosSouthernIsland from "./Instructions_LatiosSouthernIsland.mdx";
import Instructions_Lileep from "./Instructions_Lileep.mdx";
import Instructions_Lugia from "./Instructions_Lugia.mdx";
import Instructions_Mew from "./Instructions_Mew.mdx";
import Instructions_Mudkip from "./Instructions_Mudkip.mdx";
import Instructions_Rayquaza from "./Instructions_Rayquaza.mdx";
import Instructions_Regice from "./Instructions_Regice.mdx";
import Instructions_Regirock from "./Instructions_Regirock.mdx";
import Instructions_Registeel from "./Instructions_Registeel.mdx";
import Instructions_Sudowoodo from "./Instructions_Sudowoodo.mdx";
import Instructions_Torchic from "./Instructions_Torchic.mdx";
import Instructions_Totodile from "./Instructions_Totodile.mdx";
import Instructions_Treecko from "./Instructions_Treecko.mdx";
import Instructions_Voltorb from "./Instructions_Voltorb.mdx";
import Instructions_Wynaut from "./Instructions_Wynaut.mdx";

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
};

export type EmeraldStaticEncounter = Static3Encounter & {
  calib: number;
  offset: number;
  instructions: React.ReactNode;
  requireAceForPaintingReseeding: boolean;
};

/*
calib: boot game and right before interacting, check number of non-vblank rng updates.
offset: check rng advance on pause. unpause while holding A, and count number of adv for CreateBoxMon_pid_low

calib with and without battle video is the same.
  without battle video: +1 adv for tv show, +3 save block
  with battle video: +1 adv for BattleStartClearSetData, +3 save block
*/

const CALIB_TV_SAVE_BLOCK = 4; // assumes no lottery, and no roamer

const emeraldStaticEncounters: EmeraldStaticEncounter[] = [
  {
    species: "Chikorita",
    lvl: 5,
    location: "Littleroot Town (after completing the Hoenn Pokédex)",
    roaming: false,
    offset: 3,
    // +5 for npc moves,
    // must wait in menu to avoid unwanted advances
    calib: CALIB_TV_SAVE_BLOCK + 5,
    requireAceForPaintingReseeding: false,
    instructions: <Instructions_Chikorita />,
  },
  {
    species: "Totodile",
    lvl: 5,
    location: "Littleroot Town (after completing the Hoenn Pokédex)",
    roaming: false,
    offset: 3,
    // +5 for npc moves,
    // must wait in menu to avoid unwanted advances
    calib: CALIB_TV_SAVE_BLOCK + 5,
    requireAceForPaintingReseeding: false,
    instructions: <Instructions_Totodile />,
  },
  {
    species: "Cyndaquil",
    lvl: 5,
    location: "Littleroot Town (after completing the Hoenn Pokédex)",
    roaming: false,
    offset: 3,
    // +5 for npc moves,
    // must wait in menu to avoid unwanted advances
    calib: CALIB_TV_SAVE_BLOCK + 5,
    requireAceForPaintingReseeding: false,
    instructions: <Instructions_Cyndaquil />,
  },
  {
    species: "Treecko",
    lvl: 5,
    location: "Route 101",
    roaming: false,
    offset: 3,
    // +5 for npc move
    calib: CALIB_TV_SAVE_BLOCK + 5,
    requireAceForPaintingReseeding: true,
    instructions: <Instructions_Treecko />,
  },
  {
    species: "Mudkip",
    lvl: 5,
    location: "Route 101",
    roaming: false,
    offset: 3,
    // +5 for npc move
    calib: CALIB_TV_SAVE_BLOCK + 5,
    requireAceForPaintingReseeding: true,
    instructions: <Instructions_Mudkip />,
  },
  {
    species: "Torchic",
    lvl: 5,
    location: "Route 101",
    roaming: false,
    offset: 3,
    // +5 for npc move
    calib: CALIB_TV_SAVE_BLOCK + 5,
    requireAceForPaintingReseeding: true,
    instructions: <Instructions_Torchic />,
  },
  {
    species: "Lileep",
    lvl: 20,
    location: "Rustboro City",
    roaming: false,
    offset: 3,
    calib: CALIB_TV_SAVE_BLOCK,
    requireAceForPaintingReseeding: false,
    instructions: <Instructions_Lileep />,
  },
  {
    species: "Anorith",
    lvl: 20,
    location: "Rustboro City",
    roaming: false,
    offset: 3,
    calib: CALIB_TV_SAVE_BLOCK,
    requireAceForPaintingReseeding: false,
    instructions: <Instructions_Anorith />,
  },
  {
    species: "Castform_Normal",
    lvl: 25,
    location: "Weather Institute",
    roaming: false,
    offset: 3,
    // +1 for npc move
    calib: CALIB_TV_SAVE_BLOCK + 1,
    requireAceForPaintingReseeding: false,
    instructions: <Instructions_Castform />,
  },
  {
    species: "Beldum",
    lvl: 5,
    location: "Mossdeep City",
    roaming: false,
    offset: 3,
    // +1 for npc move
    calib: CALIB_TV_SAVE_BLOCK + 1,
    requireAceForPaintingReseeding: false,
    instructions: <Instructions_Beldum />,
  },
  {
    species: "Wynaut",
    lvl: 5,
    location: "Lavaridge Town",
    roaming: false,
    offset: 165,
    // +3 for npc move
    calib: CALIB_TV_SAVE_BLOCK + 3,
    requireAceForPaintingReseeding: false,
    instructions: <Instructions_Wynaut />,
  },
  {
    species: "Kecleon",
    lvl: 30,
    location: "Route 119, Route 120",
    roaming: false,
    offset: 1859 - 1715,
    // +1 for ambient cry
    calib: CALIB_TV_SAVE_BLOCK + 1,
    requireAceForPaintingReseeding: false,
    instructions: <Instructions_Kecleon />,
  },
  {
    species: "Voltorb",
    lvl: 25,
    location: "New Mauville",
    roaming: false,
    offset: 4,
    // +1 for ChooseWildMonIndex_Land_Random, +1 for UpdateAmbientCry_v1, +1 for npc move
    // must wait in menu to avoid unwanted advances
    calib: CALIB_TV_SAVE_BLOCK + 3,
    requireAceForPaintingReseeding: false,
    instructions: <Instructions_Voltorb />,
  },
  {
    species: "Electrode",
    lvl: 30,
    location: "Aqua Hideout",
    roaming: false,
    offset: 4,
    // +2 for npc move (assuming both balls are displayed)
    // must wait in menu to avoid unwanted advances
    calib: CALIB_TV_SAVE_BLOCK + 2,
    requireAceForPaintingReseeding: false,
    instructions: <Instructions_Electrode />,
  },
  {
    species: "Sudowoodo",
    lvl: 40,
    location: "Battle Frontier",
    roaming: false,
    offset: 52,
    // +1 for npc move
    calib: CALIB_TV_SAVE_BLOCK + 1,
    requireAceForPaintingReseeding: false,
    instructions: <Instructions_Sudowoodo />,
  },
  {
    species: "Regirock",
    lvl: 40,
    location: "Desert Ruins",
    roaming: false,
    offset: 103,
    calib: CALIB_TV_SAVE_BLOCK,
    requireAceForPaintingReseeding: false,
    instructions: <Instructions_Regirock />,
  },
  {
    species: "Regice",
    lvl: 40,
    location: "Island Cave",
    roaming: false,
    offset: 103,
    calib: CALIB_TV_SAVE_BLOCK,
    requireAceForPaintingReseeding: false,
    instructions: <Instructions_Regice />,
  },
  {
    species: "Registeel",
    lvl: 40,
    location: "Ancient Tomb",
    roaming: false,
    offset: 919 - 840,
    calib: CALIB_TV_SAVE_BLOCK,
    requireAceForPaintingReseeding: false,
    instructions: <Instructions_Registeel />,
  },
  {
    species: "Latias",
    lvl: 40,
    location: "Hoenn (Roaming)",
    roaming: true,
    offset: 3,
    // +3 for save block when changing map
    calib: CALIB_TV_SAVE_BLOCK + 3,
    // ~2800 minimum advances
    requireAceForPaintingReseeding: true,
    instructions: <Instruction_LatiasRoaming />,
  },
  {
    species: "Latios",
    lvl: 40,
    location: "Hoenn (Roaming)",
    roaming: true,
    offset: 3,
    // +3 for save block when changing map
    calib: CALIB_TV_SAVE_BLOCK + 3,
    // ~2800 minimum advances
    requireAceForPaintingReseeding: true,
    instructions: <Instruction_LatiosRoaming />,
  },

  {
    species: "Latias",
    lvl: 50,
    location: "Southern Island (Eon Ticket event)",
    roaming: false,
    offset: 1002 - 570,
    calib: CALIB_TV_SAVE_BLOCK,
    requireAceForPaintingReseeding: false,
    instructions: <Instructions_LatiasSouthernIsland />,
  },
  {
    species: "Latios",
    lvl: 50,
    location: "Southern Island (Eon Ticket event)",
    roaming: false,
    offset: 1002 - 570,
    calib: CALIB_TV_SAVE_BLOCK,
    requireAceForPaintingReseeding: false,
    instructions: <Instructions_LatiosSouthernIsland />,
  },
  {
    species: "Kyogre",
    lvl: 70,
    location: "Marine Cave",
    roaming: false,
    offset: 288,
    calib: CALIB_TV_SAVE_BLOCK,
    requireAceForPaintingReseeding: false,
    instructions: <Instructions_Kyogre />,
  },
  {
    species: "Groudon",
    lvl: 70,
    location: "Terra Cave",
    roaming: false,
    offset: 288,
    calib: CALIB_TV_SAVE_BLOCK,
    requireAceForPaintingReseeding: false,
    instructions: <Instructions_Groudon />,
  },
  {
    species: "Rayquaza",
    lvl: 70,
    location: "Sky Pillar",
    roaming: false,
    offset: 96,
    calib: CALIB_TV_SAVE_BLOCK,
    requireAceForPaintingReseeding: false,
    instructions: <Instructions_Rayquaza />,
  },
  {
    species: "Mew",
    lvl: 30,
    location: "Faraway Island (Old Sea Map event)",
    roaming: false,
    offset: 1009 - 900,
    calib: CALIB_TV_SAVE_BLOCK,
    requireAceForPaintingReseeding: false,
    instructions: <Instructions_Mew />,
  },
  {
    species: "Deoxys_Speed",
    lvl: 30,
    location: "Birth Island (AuroraTicket event)",
    roaming: false,
    offset: 1251 - 750,
    calib: CALIB_TV_SAVE_BLOCK,
    requireAceForPaintingReseeding: false,
    instructions: <Instructions_Deoxys />,
  },
  {
    species: "Lugia",
    lvl: 70,
    location: "Navel Rock (MysticTicket event)",
    roaming: false,
    offset: 816 - 540,
    calib: CALIB_TV_SAVE_BLOCK,
    requireAceForPaintingReseeding: false,
    instructions: <Instructions_Lugia />,
  },
  {
    species: "HoOh",
    lvl: 70,
    location: "Navel Rock (MysticTicket event)",
    roaming: false,
    offset: 378,
    calib: CALIB_TV_SAVE_BLOCK,
    requireAceForPaintingReseeding: false,
    instructions: <Instructions_HoOh />,
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

export const getEmeraldStaticCalibData = (
  species: Species,
  roaming: boolean,
) => {
  return (
    emeraldStaticEncounters.find((enc) => {
      return enc.species === species && enc.roaming === roaming;
    }) ?? null
  );
};
