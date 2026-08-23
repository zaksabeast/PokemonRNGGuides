import { atom, useAtom } from "jotai";
import { DsType, Gen5Game, Gen5Language } from "../constants";

export type Profile5SearcherState = {
  game: Gen5Game;
  language: Gen5Language;
  dsType: DsType;
  calibrationType: "ivs" | "needles" | "seed";
};

const initialState: Profile5SearcherState = {
  game: "Black",
  language: "English",
  dsType: "DS",
  calibrationType: "ivs",
};

export const profile5SearcherAtom = atom(initialState);

export const useProfile5State = () => useAtom(profile5SearcherAtom);
