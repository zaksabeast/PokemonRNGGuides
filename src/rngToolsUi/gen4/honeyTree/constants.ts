import type { HoneyTreeLocation } from "~/rngTools";
import { DpPt } from "../gen4types";

export const HONEY_TREE_LOCATIONS = [
  "EternaForestOutside",
  "FloaromaMeadow",
  "FuegoIronworksOutside",
  "Route205North",
  "Route205South",
  "Route206",
  "Route207",
  "Route208",
  "Route209",
  "Route210North",
  "Route210South",
  "Route211East",
  "Route212North",
  "Route212South",
  "Route213",
  "Route214",
  "Route215",
  "Route218",
  "Route221",
  "Route222",
  "ValleyWindworksOutside",
] as const satisfies HoneyTreeLocation[];

export const HONEY_TREE_LOCATION_NAMES: Record<HoneyTreeLocation, string> = {
  Route205South: "Route 205 South",
  Route205North: "Route 205 North",
  Route206: "Route 206",
  Route207: "Route 207",
  Route208: "Route 208",
  Route209: "Route 209",
  Route210South: "Route 210 South",
  Route210North: "Route 210 North",
  Route211East: "Route 211 East",
  Route212North: "Route 212 North",
  Route212South: "Route 212 South",
  Route213: "Route 213",
  Route214: "Route 214",
  Route215: "Route 215",
  Route218: "Route 218",
  Route221: "Route 221",
  Route222: "Route 222",
  ValleyWindworksOutside: "Valley Windworks (Outside)",
  EternaForestOutside: "Eterna Forest (Outside)",
  FuegoIronworksOutside: "Fuego Ironworks (Outside)",
  FloaromaMeadow: "Floaroma Meadow",
};

export const NO_NPC_TREES: HoneyTreeLocation[] = [
  "Route205North",
  "ValleyWindworksOutside",
  "FuegoIronworksOutside",
  "FloaromaMeadow",
];

const PT_VS_SEEKER_TREES: HoneyTreeLocation[] = [
  "Route207",
  "Route208",
  "Route209",
  "Route210South",
  "Route211East",
  "Route214",
  "Route215",
  "Route218",
  "Route221",
  "Route222",
];

const DP_VS_SEEKER_TREES: HoneyTreeLocation[] = [
  "Route206",
  ...PT_VS_SEEKER_TREES,
];

export const getSeekerTrees = (game: DpPt) => {
  return game === "Platinum" ? PT_VS_SEEKER_TREES : DP_VS_SEEKER_TREES;
};
