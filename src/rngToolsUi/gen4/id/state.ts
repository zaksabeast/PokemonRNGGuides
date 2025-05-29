import { atom, useAtom } from "jotai";
import { Id4 } from "~/rngTools";

type Id4State = {
  target: Id4 | null;
};

const initialHeldState: Id4State = {
  target: null,
};

const id4Atom = atom(initialHeldState);

export const useId4State = () => useAtom(id4Atom);
