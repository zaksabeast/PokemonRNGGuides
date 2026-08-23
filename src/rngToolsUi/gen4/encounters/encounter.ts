import type { Species, Static4Method } from "~/rngTools";

export type Encounter = {
  species: Species;
  minLevel: number;
  maxLevel: number;
  isFixedGender: boolean;
  method: Static4Method;
  offset?: number;
  form?: number;
  label?: string;
};
