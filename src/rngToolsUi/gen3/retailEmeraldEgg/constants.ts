import { Gen3PickupMethod } from "~/rngTools";
import { Translations } from "~/translations";

export const compatability = [
  "DontLikeEachOther",
  "GetAlong",
  "GetAlongVeryWell",
] as const;

type Compatability = (typeof compatability)[number];

export const compatabilityLabels = {
  GetAlong: "The two seem to get along",
  GetAlongVeryWell: "The two seem to get along very well",
  DontLikeEachOther: "The two don't seem to like each other",
} as const satisfies Record<Compatability, string>;

export const getCompatabilityOptions = (t: Translations | null) =>
  compatability.map((option) => ({
    label:
      t == null ? compatabilityLabels[option] : t[compatabilityLabels[option]],
    value: option,
  })) satisfies { label: string; value: Compatability }[];

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
