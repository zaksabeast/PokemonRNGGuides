import { AbilityType } from "~/rngTools";

export const ability12 = ["First", "Second"] as const satisfies AbilityType[];

export const ability12H = [
  ...ability12,
  "Hidden",
] as const satisfies AbilityType[];
