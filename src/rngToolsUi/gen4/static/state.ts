import { atom, useAtom } from "jotai";
import { createGen4TimerAtom } from "~/hooks/useGen4Timer";
import { Gen4GameAndConsole } from "../gen4types";
import type { Static4State as RngToolStatic4State, Species } from "~/rngTools";
import { MinMaxStats } from "~/types";

export type Static4Target = Omit<RngToolStatic4State["state"], "ivs"> & {
  seed_time: RngToolStatic4State["seed_time"];
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
} & Gen4GameAndConsole;

const initialHeldState: Static4State = {
  console: "NdsDsi",
  game: "Diamond",
  target: null,
  coinFlipFilter: "",
  chatotSummaryCount: null,
};

export const static4Atom = atom(initialHeldState);

export const useStatic4State = () => useAtom(static4Atom);

export const static4TimerAtom = createGen4TimerAtom();
