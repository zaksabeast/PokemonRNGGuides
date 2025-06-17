import { atom, useAtom } from "jotai";
import { createGen4TimerAtom } from "~/hooks/useGen4Timer";
import { Id4 } from "~/rngTools";
import { Gen4GameVersion } from "../gen4types";

export type Id4State = {
  is3ds: boolean;
  game: Gen4GameVersion;
  target: Id4 | null;
};

const initialHeldState: Id4State = {
  is3ds: false,
  game: "Diamond",
  target: null,
};

export const id4Atom = atom(initialHeldState);

export const useId4State = () => useAtom(id4Atom);

export const idTimerAtom = createGen4TimerAtom();
