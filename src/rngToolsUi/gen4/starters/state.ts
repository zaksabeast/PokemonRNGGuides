import { atom, useAtom } from "jotai";
import { MinMaxStats } from "~/types";

export const dpptStarters = ["Turtwig", "Chimchar", "Piplup"] as const;
export const hgssStarters = ["Chikorita", "Cyndaquil", "Totodile"] as const;
export const allStarters = [...dpptStarters, ...hgssStarters] as const;
export type Gen4Starter = (typeof allStarters)[number];

type State = {
  species: Gen4Starter;
  minMaxStats: MinMaxStats;
};

export const starterAtom = atom<State>({
  species: "Chikorita",
  minMaxStats: {
    hp: { min: 0, max: 0 },
    atk: { min: 0, max: 0 },
    def: { min: 0, max: 0 },
    spa: { min: 0, max: 0 },
    spd: { min: 0, max: 0 },
    spe: { min: 0, max: 0 },
  },
});

export const useStarterState = () => useAtom(starterAtom);
