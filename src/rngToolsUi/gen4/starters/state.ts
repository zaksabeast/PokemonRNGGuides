import { atom, useAtom } from "jotai";
import { SearchStatic4Method1State } from "~/rngTools";
import { createGen4TimerAtom } from "~/hooks/useGen4Timer";
import { MinMaxStats } from "~/types";
import { Gen4GameVersion } from "../gen4types";

export const dpptStarters = ["Turtwig", "Chimchar", "Piplup"] as const;
export const hgssStarters = ["Chikorita", "Cyndaquil", "Totodile"] as const;
export const allStarters = [...dpptStarters, ...hgssStarters] as const;
export type Gen4Starter = (typeof allStarters)[number];

export const starterTimer = createGen4TimerAtom();

type State = {
  is3ds: boolean;
  game: Gen4GameVersion;
  species: Gen4Starter;
  minMaxStats: MinMaxStats;
  target: Omit<SearchStatic4Method1State, "ivs"> | null;
};

export const starterAtom = atom<State>({
  is3ds: false,
  game: "Diamond",
  target: null,
  minMaxStats: {
    hp: { min: 0, max: 0 },
    atk: { min: 0, max: 0 },
    def: { min: 0, max: 0 },
    spa: { min: 0, max: 0 },
    spd: { min: 0, max: 0 },
    spe: { min: 0, max: 0 },
  },
  species: "Chikorita",
});

export const useStarterState = () => useAtom(starterAtom);
