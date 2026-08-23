import { atom } from "jotai";
import { Gen3Timer, Gen3TimerSettings, updateGen3Timer } from "~/rngTools";

const initialGen3Timer: Gen3Timer = {
  ms: [],
  settings: {
    console: "Gba",
    preTimer: 5000,
    calibration: 0,
    targetFrame: 0,
  },
};

export const createGen3TimerAtom = () => {
  const baseAtom = atom(initialGen3Timer);

  return atom(
    (get) => get(baseAtom),
    (
      get,
      set,
      {
        hit_advance,
        ...update
      }: Partial<Gen3TimerSettings> & {
        hit_advance?: number;
      },
    ) => {
      const current = get(baseAtom);
      const updated = updateGen3Timer(
        { ...current.settings, ...update },
        hit_advance,
      );
      set(baseAtom, updated);
      return updated;
    },
  );
};

export type Gen3TimerAtom = ReturnType<typeof createGen3TimerAtom>;
