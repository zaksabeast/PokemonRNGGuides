import { BattleResult, ShakeType } from "~/rngTools";

export const BATTLE_RESULTS = [
  "Catch",
  "Win",
] as const satisfies BattleResult[];

export const TIMES = ["day", "night"] as const;

export const SHAKE_TYPES = ["Slow", "Fast"] as const satisfies ShakeType[];

export const POKERADAR_ROUTES = [
  "Valley Windworks",
  "Eterna Forest",
  "Fuego Ironworks",
  "Mt. Coronet Summit",
  "Stark Mountain",
  "Sendoff Spring",
  "Trophy Garden",
  "Lake Valor",
  "Lake Acuity",
  "Valor Lakefront",
  "Acuity Lakefront",
  "Route 201",
  "Route 202",
  "Route 203",
  "Route 204 (South)",
  "Route 205 (South)",
  "Route 205 (North)",
  "Route 206",
  "Route 207",
  "Route 208",
  "Route 209",
  "Route 210 (South)",
  "Route 210 (North)",
  "Route 211 (West)",
  "Route 211 (East)",
  "Route 212 (North)",
  "Route 212 (South)",
  "Route 213",
  "Route 214",
  "Route 215",
  "Route 216",
  "Route 217",
  "Route 218",
  "Route 221",
  "Route 222",
  "Route 224",
  "Route 225",
  "Route 226",
  "Route 227",
  "Route 228",
  "Route 229",
  "Route 230",
] as const;
