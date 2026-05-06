import type { Species } from "~/rngTools";

export type Encounter = {
  species: Species;
  minLevel: number;
  maxLevel: number;
  isFixedGender: boolean;
  offset?: number;
  form?: number;
  label?: string;
};
