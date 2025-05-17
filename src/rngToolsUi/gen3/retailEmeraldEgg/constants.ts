import { Gen3PickupMethod } from "~/rngTools";

export const ivMethods = [
  "EmeraldBred",
  "EmeraldBredSplit",
  "EmeraldBredAlternate",
] as const satisfies Gen3PickupMethod[];
