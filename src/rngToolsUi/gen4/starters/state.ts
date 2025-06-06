import { atom, useAtom } from "jotai";
import { SearchStatic4Method1State } from "~/rngTools";
import { createGen4TimerAtom } from "~/hooks/useGen4Timer";

export const starterTimer = createGen4TimerAtom();

type State = {
  target: Omit<SearchStatic4Method1State, "ivs"> | null;
};

const starterAtom = atom<State>({ target: null });

export const useStarterState = () => useAtom(starterAtom);
