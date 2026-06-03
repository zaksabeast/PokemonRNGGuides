import { type HoneyTreeLocation } from "~/rngTools";
import { atom } from "jotai";
import { DpPt } from "../gen4types";

export type HoneyTreeState = {
  game: DpPt;
  munchlaxLocations: HoneyTreeLocation[] | null;
  targetLocation: HoneyTreeLocation;
  honeyTreeMap: {
    showTrees: boolean;
    showRecommended: boolean;
    showMunchlax: boolean;
  };
};

export const INITIAL_GAME: DpPt = "Diamond";
export const INITIAL_TREE_LOCATION: HoneyTreeLocation = "FloaromaMeadow";

const initialState: HoneyTreeState = {
  game: INITIAL_GAME,
  munchlaxLocations: null,
  targetLocation: INITIAL_TREE_LOCATION,
  honeyTreeMap: {
    showTrees: true,
    showRecommended: true,
    showMunchlax: true,
  },
};

export const honeyTreeAtom = atom(initialState);
