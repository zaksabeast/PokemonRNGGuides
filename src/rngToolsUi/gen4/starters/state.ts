import { Species } from "~/rngTools";
import { atom, useAtom } from "jotai";

export const dpptStarters = ["Turtwig", "Chimchar", "Piplup"] as const;
export const hgssStarters = ["Chikorita", "Cyndaquil", "Totodile"] as const;
export const allStarters = [...dpptStarters, ...hgssStarters] as const;

type State = {
  species: Species;
};

export const starterAtom = atom<State>({
  species: "Chikorita",
});

export const useStarterState = () => useAtom(starterAtom);
