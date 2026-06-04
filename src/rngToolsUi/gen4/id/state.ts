import { atom } from "jotai";
import { Id4 } from "~/rngTools";

export type Id4State = {
  id: Omit<Id4, "seedTime"> | null;
};

const initialHeldState: Id4State = {
  id: null,
};

export const id4Atom = atom(initialHeldState);
