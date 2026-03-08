import { atom, useAtom } from "jotai";
import { createGen4TimerAtom } from "~/hooks/useGen4Timer";
import { Gen4GameAndConsole } from "../gen4types";
import type { Static4State as RngToolStatic4State } from "~/rngTools";

type Static4Target = Omit<RngToolStatic4State["state"], "ivs"> & {
  seed_time: RngToolStatic4State["seed_time"];
};

export type Static4State = {
  target: Static4Target | null;
  coinFlipFilter: string;
} & Gen4GameAndConsole;

const initialHeldState: Static4State = {
  console: "NdsDsi",
  game: "Diamond",
  target: null,
  coinFlipFilter: "",
};

export const static4Atom = atom(initialHeldState);

export const useStatic4State = () => useAtom(static4Atom);

export const static4TimerAtom = createGen4TimerAtom();
