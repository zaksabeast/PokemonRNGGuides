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
