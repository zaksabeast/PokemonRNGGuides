import { Gen3PickupMethod } from "~/rngTools";
import { Translations } from "~/translations";

export const ivMethods = [
  "EmeraldBred",
  "EmeraldBredSplit",
  "EmeraldBredAlternate",
] as const satisfies Gen3PickupMethod[];

export const ivMethodLabels = {
  EmeraldBred: "Emerald Bred",
  EmeraldBredSplit: "Emerald Bred Split",
  EmeraldBredAlternate: "Emerald Bred Alternate",
} as const;

export const getIvMethodOptions = (t: Translations) =>
  ivMethods.map((method) => ({
    label: t[ivMethodLabels[method]],
    value: method,
  })) satisfies { label: string; value: Gen3PickupMethod }[];
