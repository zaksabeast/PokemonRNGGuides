import { atom, useAtom } from "jotai";
import { RsTidTarget } from "./rstid";

type RsTidState = {
  // shared state goes here
  example: number;
  targetSet: boolean;
  target: RsTidTarget;
  offset: number;
};

const initialState: RsTidState = {
  example: 0,
  targetSet: false,
  target: { advance: 0, sid: 0, tid: 0, time: "0:0:0", tsv: 0, offset: 0 },
  offset: 0,
};

const rsTidState = atom(initialState);

export const useRsTidState = () => useAtom(rsTidState);
