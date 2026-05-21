import { atom, useAtom } from "jotai";
import { createGen4TimerAtom } from "~/hooks/useGen4Timer";
import { Id4 } from "~/rngTools";
import { Gen4GameAndConsole } from "../gen4types";

export type Id4State = {
  target: Id4 | null;
} & Gen4GameAndConsole;

const initialHeldState: Id4State = {
  console: "NdsDsi",
  game: "Diamond",
  target: null,
};

export const id4Atom = atom(initialHeldState);

export const useId4State = () => useAtom(id4Atom);

export const idTimerAtom = createGen4TimerAtom();
