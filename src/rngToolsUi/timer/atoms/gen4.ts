import { atom } from "jotai";
import { Gen4Timer, Gen4TimerSettings, updateGen4Timer } from "~/rngTools";

const initialGen4Timer: Gen4Timer = {
  ms: [],
  settings: {
    console: "NdsSlot1",
    minTimeMs: 14_000,
    calibratedDelay: 600,
    calibratedSecond: 14,
    targetDelay: 0,
    targetSecond: 0,
  },
};

export const createGen4TimerAtom = () => {
  const baseAtom = atom(initialGen4Timer);

  return atom(
    (get) => get(baseAtom),
    (
      get,
      set,
      {
        delayHit,
        ...update
      }: Partial<Gen4TimerSettings> & {
        delayHit?: number | null;
      },
    ) => {
      const current = get(baseAtom);
      const fullSettings: Gen4TimerSettings = {
        ...current.settings,
        ...update,
      };
      const updated = updateGen4Timer(fullSettings, delayHit ?? undefined);
      set(baseAtom, updated);
      return updated;
    },
  );
};

export type Gen4TimerAtom = ReturnType<typeof createGen4TimerAtom>;
