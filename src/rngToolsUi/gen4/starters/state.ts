import { atom, useAtom } from "jotai";
import { Static4State } from "~/rngTools";
import { createGen4TimerAtom } from "~/hooks/useGen4Timer";
import { MinMaxStats } from "~/types";
import { Gen4Console, Gen4GameVersion } from "../gen4types";

export const dpptStarters = ["Turtwig", "Chimchar", "Piplup"] as const;
export const hgssStarters = ["Chikorita", "Cyndaquil", "Totodile"] as const;
export const allStarters = [...dpptStarters, ...hgssStarters] as const;
export type Gen4Starter = (typeof allStarters)[number];

export const starterTimer = createGen4TimerAtom();

type State = {
  console: Gen4Console;
  game: Gen4GameVersion;
  species: Gen4Starter;
  minMaxStats: MinMaxStats;
  target:
    | (Omit<Static4State["state"], "ivs"> & {
        seed_time: Static4State["seed_time"];
      })
    | null;
};

export const starterAtom = atom<State>({
  console: "NdsDsi",
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
