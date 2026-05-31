import { atom, useAtom } from "jotai";
import type { LeadAbility, Gender, Species } from "~/rngTools";
import { MinMaxStats } from "~/types";

export type Static4Target = {
  lead: LeadAbility;
  encounterMinLevel: number;
  encounterMaxLevel: number;
  gender: Gender;
  level: number;
  species: Species;
  form?: number;
  advanceOffset: number;
  minMaxStats: MinMaxStats;
  isFixedGender: boolean;
};

export type Static4State = {
  target: Static4Target | null;
  coinFlipFilter: string;
  chatotSummaryCount: number | null;
};

const initialHeldState: Static4State = {
  target: null,
  coinFlipFilter: "",
  chatotSummaryCount: null,
};

export const static4Atom = atom(initialHeldState);

export const useStatic4State = () => useAtom(static4Atom);
