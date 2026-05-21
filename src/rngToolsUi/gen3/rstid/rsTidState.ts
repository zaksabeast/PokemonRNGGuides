import { atom, useAtom } from "jotai";

type RsTidState = {
  targetAdvance: number;
  desiredIds: { tid: number; sid: number };
};

const initialState: RsTidState = {
  targetAdvance: 0,
  desiredIds: { tid: 0, sid: 0 },
};

const rsTidState = atom(initialState);

export const useRsTidState = () => useAtom(rsTidState);
