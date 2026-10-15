import { atom } from "jotai";
import { Gen7Starter, Gen7UsumStarterPlan } from "~/rngTools";

export type Gen7StarterTarget = {
  seed: number;
  tsv: number;
  currentAdvance: number;
  starter: Gen7Starter;
};

export type Gen7StarterPlan = {
  target: Gen7StarterTarget;
  safeAdvance: number;
  plan: Gen7UsumStarterPlan;
};

export const gen7StarterTargetAtom = atom<Gen7StarterTarget | null>(null);
export const gen7StarterPlanAtom = atom<Gen7StarterPlan | null>(null);
