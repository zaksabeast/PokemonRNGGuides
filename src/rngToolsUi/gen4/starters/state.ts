import { atom, useAtom } from "jotai";
import { SearchStatic4Method1State } from "~/rngTools";
import { createGen4TimerAtom } from "~/hooks/useGen4Timer";
import { MinMaxStats } from "~/types";

const dpptStarters = ["Turtwig", "Chimchar", "Piplup"] as const;
const hgssStarters = ["Chikorita", "Cyndaquil", "Totodile"] as const;
export const allStarters = [...dpptStarters, ...hgssStarters] as const;
export type Gen4Starter = (typeof allStarters)[number];

export const starterTimer = createGen4TimerAtom();

type State = {
  species: Gen4Starter;
  minMaxStats: MinMaxStats;
  target: Omit<SearchStatic4Method1State, "ivs"> | null;
};

const starterAtom = atom<State>({
  target: null,
  minMaxStats: {
    hp: { min: 0, max: 31 },
    atk: { min: 0, max: 31 },
    def: { min: 0, max: 31 },
    spa: { min: 0, max: 31 },
    spd: { min: 0, max: 31 },
    spe: { min: 0, max: 31 },
  },
  species: "Chikorita",
});

export const useStarterState = () => useAtom(starterAtom);
