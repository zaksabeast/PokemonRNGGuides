import { atom, useAtom } from "jotai";
import { Gen4GameVersion } from "../gen4types";
import { SwarmRoute } from "./constants";

type State = {
  game: Gen4GameVersion;
  targetRoute: SwarmRoute;
  seed: number | null;
};

export const swarmAtom = atom<State>({
  game: "Diamond",
  targetRoute: "Route201",
  seed: null,
});

export const useSwarmState = () => useAtom(swarmAtom);
