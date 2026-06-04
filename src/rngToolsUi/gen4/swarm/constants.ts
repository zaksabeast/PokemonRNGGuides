import { Species } from "~/rngTools";
import { Gen4GameVersion } from "../gen4types";

// Temporary until TS is updated with new rust changes
export type SwarmRoute =
  | "Route201"
  | "Route202"
  | "Route203"
  | "Route206"
  | "Route207"
  | "Route208"
  | "Route209"
  | "Route213"
  | "Route214"
  | "Route215"
  | "Route216"
  | "Route217"
  | "Route218"
  | "Route221"
  | "Route222"
  | "Route224"
  | "Route225"
  | "Route226"
  | "Route227"
  | "Route228"
  | "Route229"
  | "Route230"
  | "LakeVerity"
  | "LakeValor"
  | "LakeAcuity"
  | "ValleyWindworks"
  | "EternaForest"
  | "FuegoIronworks"
  | "Route1"
  | "Route3"
  | "Route9"
  | "Route12"
  | "Route13"
  | "Route19"
  | "Route32"
  | "Route25"
  | "Route27"
  | "Route34"
  | "Route35"
  | "Route38"
  | "Route44"
  | "Route45"
  | "Route47"
  | "MtMortar"
  | "DarkCave"
  | "ViridianForest"
  | "VermilionCity"
  | "VioletCity";

const dpRoutes = [
  "Route201",
  "Route202",
  "Route203",
  "Route206",
  "Route207",
  "Route208",
  "Route209",
  "Route213",
  "Route214",
  "Route215",
  "Route216",
  "Route217",
  "Route218",
  "Route221",
  "Route222",
  "Route224",
  "Route225",
  "Route226",
  "Route227",
  "Route228",
  "Route229",
  "Route230",
  "LakeVerity",
  "LakeValor",
  "LakeAcuity",
  "ValleyWindworks",
  "EternaForest",
  "FuegoIronworks",
] as const satisfies SwarmRoute[];

const ptRoutes = [
  "Route201",
  "Route202",
  "Route203",
  "Route206",
  "Route207",
  "Route208",
  "Route209",
  "Route214",
  "Route215",
  "Route217",
  "Route218",
  "Route221",
  "Route222",
  "Route224",
  "Route225",
  "Route226",
  "Route227",
  "Route228",
  "Route229",
  "Route230",
  "ValleyWindworks",
  "EternaForest",
] as const satisfies SwarmRoute[];

const hgSsRoutes = [
  "Route1",
  "Route3",
  "Route9",
  "Route12",
  "Route13",
  "Route19",
  "Route32",
  "Route25",
  "Route27",
  "Route34",
  "Route35",
  "Route38",
  "Route44",
  "Route45",
  "Route47",
  "MtMortar",
  "DarkCave",
  "ViridianForest",
  "VermilionCity",
  "VioletCity",
] as const satisfies SwarmRoute[];

export const gameRoutes = {
  Diamond: dpRoutes,
  Pearl: dpRoutes,
  Platinum: ptRoutes,
  HeartGold: hgSsRoutes,
  SoulSilver: hgSsRoutes,
} as const satisfies Record<Gen4GameVersion, SwarmRoute[]>;

type DpRoute = (typeof dpRoutes)[number];
type PtRoute = (typeof ptRoutes)[number];
type HgSsRoute = (typeof hgSsRoutes)[number];

const dpMons = {
  Route201: "Doduo",
  Route202: "Zigzagoon",
  Route203: "Cubone",
  Route206: "Nosepass",
  Route207: "Phanpy",
  Route208: "Dunsparce",
  Route209: "Snubbull",
  Route213: "Absol",
  Route214: "Spoink",
  Route215: "Drowzee",
  Route216: "Delibird",
  Route217: "Swinub",
  Route218: "Voltorb",
  Route221: "FarfetchD",
  Route222: "Skitty",
  Route224: "Natu",
  Route225: "Makuhita",
  Route226: "Krabby",
  Route227: "Spinda",
  Route228: "Beldum",
  Route229: "Pidgey",
  Route230: "Corsola",
  LakeVerity: "Surskit",
  LakeValor: "Lickitung",
  LakeAcuity: "Smoochum",
  ValleyWindworks: "Electrike",
  EternaForest: "Slakoth",
  FuegoIronworks: "Magnemite",
} as const satisfies Record<DpRoute, Species>;

const ptMons = {
  Route201: "Doduo",
  Route202: "Zigzagoon",
  Route203: "Cubone",
  Route206: "Larvitar",
  Route207: "Phanpy",
  Route208: "Dunsparce",
  Route209: "Snubbull",
  Route214: "Spoink",
  Route215: "Drowzee",
  Route217: "Delibird",
  Route218: "Voltorb",
  Route221: "FarfetchD",
  Route222: "Skitty",
  Route224: "Natu",
  Route225: "Makuhita",
  Route226: "Krabby",
  Route227: "Spinda",
  Route228: "Beldum",
  Route229: "Pinsir",
  Route230: "Corsola",
  ValleyWindworks: "Electrike",
  EternaForest: "Slakoth",
} as const satisfies Record<PtRoute, Species>;

const hgMons = {
  Route1: "Poochyena",
  Route3: "Baltoy",
  Route9: "Sableye",
  Route12: "Relicanth",
  Route13: "Chansey",
  Route19: "Clamperl",
  Route32: "Qwilfish",
  Route25: "Buneary",
  Route27: "Luvdisc",
  Route34: "Ralts",
  Route35: "Yanma",
  Route38: "Snubbull",
  Route44: "Remoraid",
  Route45: "Swablu",
  Route47: "Ditto",
  MtMortar: "Marill",
  DarkCave: "Dunsparce",
  ViridianForest: "Kricketot",
  VermilionCity: "Wingull",
  VioletCity: "Whiscash",
} as const satisfies Record<HgSsRoute, Species>;

const ssMons = {
  Route1: "Poochyena",
  Route3: "Gulpin",
  Route9: "Mawile",
  Route12: "Relicanth",
  Route13: "Chansey",
  Route19: "Clamperl",
  Route32: "Qwilfish",
  Route25: "Buneary",
  Route27: "Luvdisc",
  Route34: "Ralts",
  Route35: "Yanma",
  Route38: "Snubbull",
  Route44: "Remoraid",
  Route45: "Swablu",
  Route47: "Ditto",
  MtMortar: "Marill",
  DarkCave: "Dunsparce",
  ViridianForest: "Kricketot",
  VermilionCity: "Wingull",
  VioletCity: "Whiscash",
} as const satisfies Record<HgSsRoute, Species>;

export const gameMons = {
  Diamond: dpMons,
  Pearl: dpMons,
  Platinum: ptMons,
  HeartGold: hgMons,
  SoulSilver: ssMons,
} as const satisfies Record<
  Gen4GameVersion,
  Partial<Record<SwarmRoute, Species>>
>;
