import { atom } from "jotai";
import type { BattleResult, LeadAbility, Species } from "~/rngTools";

export type SelectedShinyPatch = {
  seed: number;
  advance: number;
  spreadAdvance: number;
  chainCount: number;
  battleResult: BattleResult;
  tid: number;
  sid: number;
  lead: LeadAbility;
  species: Species;
  level: number;
  encounterSlot: number;
};

export const selectedShinyPatchAtom = atom<SelectedShinyPatch | null>(null);
