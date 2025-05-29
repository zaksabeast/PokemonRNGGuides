import { atom, useAtom } from "jotai";
import { createGen4TimerAtom } from "~/hooks/useGen4Timer";
import { Id4, SeedTime4 } from "~/rngTools";

type Id4State = {
  target: null | {
    id: Id4;
    dateTime: SeedTime4;
  };
};

const initialHeldState: Id4State = {
  target: null,
};

const id4Atom = atom(initialHeldState);

export const useId4State = () => useAtom(id4Atom);

export const idTimerAtom = createGen4TimerAtom();
