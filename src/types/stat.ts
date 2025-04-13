

export type Stat = "hp" | "atk" | "def" | "spa" | "spd" | "spe";

export const stats = [
  "hp",
  "atk",
  "def",
  "spa",
  "spd",
  "spe",
] as const satisfies Stat[];
