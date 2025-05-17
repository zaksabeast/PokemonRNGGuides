import React from "react";
import { atom, useAtom } from "jotai";
import { Gen3TimerSettings, rngTools } from "~/rngTools";
import { capPrecision } from "~/utils/number";

const getTimerSettings = (
  settings: Partial<Gen3TimerSettings>,
): Gen3TimerSettings => ({
  console: "Gba",
  pre_timer: 5000,
  calibration: 0,
  target_frame: 0,
  ...settings,
});

const calibrateTimer = async ({
  targetAdvance,
  calibration,
  hitAdvance,
}: {
  targetAdvance: number;
  calibration: number;
  hitAdvance: number;
}): Promise<Gen3TimerSettings> => {
  const current = getTimerSettings({
    target_frame: targetAdvance,
    calibration,
  });
  const updated = await rngTools.calibrate_gen3_timer(current, hitAdvance);
  return {
    console: updated.console,
    pre_timer: capPrecision(updated.pre_timer),
    target_frame: capPrecision(updated.target_frame),
    calibration: capPrecision(updated.calibration),
  };
};

type Gen3TimerState = {
  ms: number[];
  targetAdvance: number;
  calibration: number;
};

export const createGen3TimerAtom = () =>
  atom<Gen3TimerState>({
    ms: [],
    targetAdvance: 0,
    calibration: 0,
  });

export type Gen3TimerAtom = ReturnType<typeof createGen3TimerAtom>;

export const useGen3Timer = (timerAtom: Gen3TimerAtom) => {
  const [{ ms, targetAdvance, calibration }, setState] = useAtom(timerAtom);

  const initTimer = React.useCallback(
    async (settings: Partial<Gen3TimerSettings>) => {
      const fullSettings = getTimerSettings(settings);
      const updated = await rngTools.create_gen3_timer(fullSettings);
      setState({
        ms: [...updated],
        targetAdvance: fullSettings.target_frame,
        calibration: fullSettings.calibration,
      });
    },
    [setState],
  );

  const calibrate = React.useCallback(
    async (hitAdvance: number) => {
      const updated = await calibrateTimer({
        targetAdvance,
        calibration,
        hitAdvance,
      });
      const updatedMs = await rngTools.create_gen3_timer(updated);
      setState({
        ms: [...updatedMs],
        targetAdvance: updated.target_frame,
        calibration: updated.calibration,
      });
    },
    [targetAdvance, calibration, setState],
  );

  return { ms, targetAdvance, initTimer, calibrate };
};
