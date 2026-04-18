import type { FormState, IvRangeResult } from "./types";

export const STAT_KEYS = ["hp", "atk", "def", "spa", "spd", "spe"] as const;
export const STAT_I18N_KEYS = [
  "HP",
  "Atk",
  "Def",
  "SpA",
  "SpD",
  "Spe",
] as const;

export const initialValues: FormState = {
  gen: "3",
  species: "Bulbasaur",
  nature: "Adamant",
  characteristic: "None",
  level: 1,
  hpStat: 0,
  atkStat: 0,
  defStat: 0,
  spaStat: 0,
  spdStat: 0,
  speStat: 0,
};

export const initialResult: IvRangeResult = {
  hasSubmitted: false,
  errorMessage: null,
  data: [],
};
