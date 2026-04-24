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

export type Gen4CalibrateSettings = {
  hit_delay: number;
  second_offset?: number;
};

const calibrateTimer = async ({
  timer,
  calibration,
}: {
  timer: Gen4TimerSettings;
  calibration: Gen4CalibrateSettings;
}): Promise<Gen4TimerSettings> => {
  const current = getTimerSettings(timer);

  if (
    calibration.hit_delay === current.target_delay &&
    calibration.second_offset != null
  ) {
    return {
      ...current,
      target_second: current.target_second - calibration.second_offset,
    };
  }

  const updated = await rngTools.calibrate_gen4_timer(
    current,
    calibration.hit_delay,
  );
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

  const initTimer = async (
    settings: Partial<
      Gen4TimerSettings & { is3ds: boolean; delay_hit?: number | null }
    >,
  ) => {
    let fullSettings = getTimerSettings(settings);
    if (settings.delay_hit != null) {
      fullSettings = await calibrateTimer({
        timer: fullSettings,
        calibration: { hit_delay: settings.delay_hit },
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
  };

  const calibrate = async (calibration: Gen4CalibrateSettings) => {
    const updated = await calibrateTimer({
      timer,
      calibration,
    });
    const updatedMs = await rngTools.create_gen4_timer(updated);
    const updatedState = {
      is3ds,
      ms: getMs(updatedMs, is3ds),
      timer: updated,
    };
    setState(updatedState);
    return updatedState;
  };

  return { ms, initTimer, calibrate };
};
