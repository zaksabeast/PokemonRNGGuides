import { atom, useAtom } from "jotai";
import { createGen4TimerAtom } from "~/hooks/useGen4Timer";
import { Id4 } from "~/rngTools";
import { Gen4GameVersion } from "../gen4types";
import { Gen4Console } from "../shared/consoleSelect";

export type Id4State = {
  console: Gen4Console;
  game: Gen4GameVersion;
  target: Id4 | null;
};

const initialHeldState: Id4State = {
  console: "NdsDsi",
  game: "Diamond",
  target: null,
};

export const id4Atom = atom(initialHeldState);

export const useId4State = () => useAtom(id4Atom);

export const idTimerAtom = createGen4TimerAtom();
