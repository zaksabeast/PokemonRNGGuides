import { atom, useAtom } from "jotai";
import { SwarmRoute } from "./constants";

type State = {
  targetRoute: SwarmRoute;
};

export const swarmAtom = atom<State>({
  targetRoute: "Route201",
});

export const useSwarmState = () => useAtom(swarmAtom);
