import { z } from "zod";

export type Stat = "hp" | "atk" | "def" | "spa" | "spd" | "spe";

export const stats = [
  "hp",
  "atk",
  "def",
  "spa",
  "spd",
  "spe",
] as const satisfies Stat[];

export type MinMax = {
  min: number;
  max: number;
};

export type MinMaxStats = {
  hp: MinMax;
  atk: MinMax;
  def: MinMax;
  spa: MinMax;
  spd: MinMax;
  spe: MinMax;
};

export const defaultMinMaxStats: MinMaxStats = {
  hp: { min: 0, max: 0 },
  atk: { min: 0, max: 0 },
  def: { min: 0, max: 0 },
  spa: { min: 0, max: 0 },
  spd: { min: 0, max: 0 },
  spe: { min: 0, max: 0 },
};

const StatSchema = z.number().min(0).max(999);

export const StatFieldsSchema = z.object({
  hpStat: StatSchema,
  atkStat: StatSchema,
  defStat: StatSchema,
  spaStat: StatSchema,
  spdStat: StatSchema,
  speStat: StatSchema,
});

export const StatValuesSchema = z.object({
  hp: StatSchema,
  atk: StatSchema,
  def: StatSchema,
  spa: StatSchema,
  spd: StatSchema,
  spe: StatSchema,
});

export const StatsFilterSchema = z.object({
  lvl: z.number().min(1).max(99),
  base_stats: StatValuesSchema,
  min_stats: StatValuesSchema,
  max_stats: StatValuesSchema,
});
