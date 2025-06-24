import React from "react";
import { atom, useAtom } from "jotai";
import { Gen4TimerSettings, rngTools } from "~/rngTools";
import { capPrecision } from "~/utils/number";

const getTimerSettings = (
  settings: Partial<Gen4TimerSettings>,
): Gen4TimerSettings => ({
  console: "NdsSlot1",
  calibrated_delay: 0,
  calibrated_second: 0,
  min_time_ms: 0,
  target_delay: 0,
  target_second: 0,
  ...settings,
});

const calibrateTimer = async ({
  timer,
  hit_delay,
}: {
  timer: Gen4TimerSettings;
  hit_delay: number;
}): Promise<Gen4TimerSettings> => {
  const current = getTimerSettings(timer);
  const updated = await rngTools.calibrate_gen4_timer(current, hit_delay);
  return {
    console: updated.console,
    min_time_ms: capPrecision(updated.min_time_ms),
    calibrated_delay: capPrecision(updated.calibrated_delay),
    calibrated_second: capPrecision(updated.calibrated_second),
    target_delay: capPrecision(updated.target_delay),
    target_second: capPrecision(updated.target_second),
  };
};

type Gen4TimerState = {
  is3ds: boolean;
  ms: number[];
  timer: Gen4TimerSettings;
};

export const createGen4TimerAtom = () =>
  atom<Gen4TimerState>({
    is3ds: false,
    ms: [],
    timer: {
      console: "NdsSlot1",
      min_time_ms: 0,
      calibrated_delay: 0,
      calibrated_second: 0,
      target_delay: 0,
      target_second: 0,
    },
  });

const getMs = (updated: Float32Array<ArrayBufferLike>, is3ds: boolean) => {
  const [first, ...rest] = updated;
  return is3ds ? [10_000, first + 60_000, ...rest] : [...updated];
};

export type Gen4TimerAtom = ReturnType<typeof createGen4TimerAtom>;

export const useGen4Timer = (timerAtom: Gen4TimerAtom) => {
  const [{ ms, timer, is3ds }, setState] = useAtom(timerAtom);

  const initTimer = React.useCallback(
    async (
      settings: Partial<
        Gen4TimerSettings & { is3ds: boolean; hit_delay?: number | null }
      >,
    ) => {
      let fullSettings = getTimerSettings(settings);
      if (settings.hit_delay != null) {
        fullSettings = await calibrateTimer({
          timer: fullSettings,
          hit_delay: settings.hit_delay,
        });
      }
      const updatedMs = await rngTools.create_gen4_timer(fullSettings);
      const updatedIs3ds = settings.is3ds ?? is3ds;
      const updated = {
        is3ds: updatedIs3ds,
        ms: getMs(updatedMs, updatedIs3ds),
        timer: fullSettings,
      };
      setState(updated);
      return updated;
    },
    [setState, is3ds],
  );

  const calibrate = React.useCallback(
    async (hit_delay: number) => {
      const updated = await calibrateTimer({
        timer,
        hit_delay,
      });
      const updatedMs = await rngTools.create_gen4_timer(updated);
      const updatedState = {
        is3ds,
        ms: getMs(updatedMs, is3ds),
        timer: updated,
      };
      setState(updatedState);
      return updatedState;
    },
    [timer, is3ds, setState],
  );

  return { ms, initTimer, calibrate };
};
