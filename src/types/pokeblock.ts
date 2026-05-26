import z from "zod";
import {
  PokeblockCreationInfo,
  Wild3SafariPokeblockSearchOpt,
} from "~/rngTools";

export type Pokeblock = [number, number, number, number, number];
export const defaultPokeblock = (): Pokeblock => [0, 0, 0, 0, 0];

const flavor_schema = z.number().int().min(0).max(255);

export const pokeblockSchema = z
  .tuple([
    flavor_schema,
    flavor_schema,
    flavor_schema,
    flavor_schema,
    flavor_schema,
  ])
  .nullable();

export const wild3SafariPokeblockSearchOpt = [
  "None",
  "SoloOnly",
  "All",
] as const satisfies Wild3SafariPokeblockSearchOpt[];

export const wild3SafariPokeblockSearchOptLabels = [
  { label: "None", value: "None" as const },
  { label: "Only those easily obtainable", value: "SoloOnly" as const },
  { label: "All", value: "All" as const },
];

export const pokeblockFlavorNames = ["Spicy", "Dry", "Sweet", "Bitter", "Sour"];

// Generated from
// cargo test --release test_generate_pertinent_custom_pokeblocks_by_nature -- --include-ignored
export const pokeblockCreationInfos = new Map<string, PokeblockCreationInfo>([
  ["00001", { Npc: { npcs: "Npc0", player_berry_idx: 0 } }],
  ["00010", { Npc: { npcs: "Npc0", player_berry_idx: 16 } }],
  ["00011", { Npc: { npcs: "Npc0", player_berry_idx: 25 } }],
  ["00100", { Npc: { npcs: "Npc0", player_berry_idx: 2 } }],
  ["00101", { Npc: { npcs: "Npc0", player_berry_idx: 7 } }],
  ["00110", { Npc: { npcs: "Npc0", player_berry_idx: 15 } }],
  ["00111", { Grey: { pokeblock: [0, 0, 1, 1, 1] } }],
  ["01000", { Npc: { npcs: "Npc0", player_berry_idx: 4 } }],
  ["01001", { Npc: { npcs: "Npc0", player_berry_idx: 10 } }],
  ["01010", { Npc: { npcs: "Npc0", player_berry_idx: 8 } }],
  ["01011", { Grey: { pokeblock: [0, 1, 0, 1, 1] } }],
  ["01100", { Npc: { npcs: "Npc0", player_berry_idx: 5 } }],
  ["01101", { Grey: { pokeblock: [0, 1, 1, 0, 1] } }],
  ["01102", { Npc: { npcs: "Npc2", player_berry_idx: 7 } }],
  ["01110", { Grey: { pokeblock: [0, 1, 1, 1, 0] } }],
  ["01111", { Multiplayer: { berries: [0, 15, 16, 46] } }],
  ["02011", { Npc: { npcs: "Npc2", player_berry_idx: 10 } }],
  ["10000", { Npc: { npcs: "Npc0", player_berry_idx: 3 } }],
  ["10001", { Npc: { npcs: "Npc0", player_berry_idx: 17 } }],
  ["10010", { Npc: { npcs: "Npc0", player_berry_idx: 23 } }],
  ["10011", { Grey: { pokeblock: [1, 0, 0, 1, 1] } }],
  ["10100", { Npc: { npcs: "Npc0", player_berry_idx: 13 } }],
  ["10101", { Grey: { pokeblock: [1, 0, 1, 0, 1] } }],
  ["10110", { Grey: { pokeblock: [1, 0, 1, 1, 0] } }],
  ["10111", { Multiplayer: { berries: [0, 3, 25, 34] } }],
  ["10201", { Npc: { npcs: "Npc2", player_berry_idx: 24 } }],
  ["11000", { Npc: { npcs: "Npc0", player_berry_idx: 31 } }],
  ["11001", { Grey: { pokeblock: [1, 1, 0, 0, 1] } }],
  ["11010", { Grey: { pokeblock: [1, 1, 0, 1, 0] } }],
  ["11011", { Multiplayer: { berries: [0, 9, 31, 33] } }],
  ["11020", { Npc: { npcs: "Npc2", player_berry_idx: 8 } }],
  ["11100", { Grey: { pokeblock: [1, 1, 1, 0, 0] } }],
  ["11101", { Multiplayer: { berries: [0, 7, 17, 31] } }],
  ["11110", { Multiplayer: { berries: [2, 4, 16, 29] } }],
  ["20110", { Npc: { npcs: "Npc2", player_berry_idx: 23 } }],
]);

// The order must match the order in generator_pokeblock.rs
export const berryNames = [
  "Aspear",
  "Belue",
  "Bluk",
  "Cheri",
  "Chesto",
  "Cornn",
  "Figy",
  "Grepa",
  "Hondew",
  "Iapapa",
  "Kelpsy",
  "Lansat",
  "Leppa",
  "Liechi",
  "Lum",
  "Magost",
  "Nanab",
  "Nomel",
  "Oran",
  "Pamtre",
  "Pecha",
  "Persim",
  "Pinap",
  "Pomeg",
  "Qualot",
  "Rabuta",
  "Rawst",
  "Razz",
  "Sitrus",
  "Spelon",
  "Starf",
  "Tamato",
  "Wepear",
  "Durin",
  "Watmel",
  "Aguav",
  "Mago",
  "Wiki",
  "Apicot",
  "Ganlon",
  "Petaya",
  "Salac",
  "Pumkin",
  "Drash",
  "Chilan",
  "Strib",
  "Eggant",
  "Nutpea",
  "Enigma",
  "Ginema",
  "Kuo",
  "Yago",
  "Touga",
  "Niniku",
  "Topo",
];
