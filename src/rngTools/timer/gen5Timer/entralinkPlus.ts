import { capPrecision } from "~/utils/number";
import {
  type Gen5EntralinkPlusTimerSettings,
  calibrateEnhancedEntralinkTimer,
  createEnhancedEntralinkTimer,
} from "../enhancedEntralinkTimer";
import { getSecondCalibration, getEntralinkCalibration } from "./entralink";

export type { Gen5EntralinkPlusTimerSettings };

export const createGen5EntralinkPlusTimer = (
  settings: Gen5EntralinkPlusTimerSettings,
): number[] => {
  return createEnhancedEntralinkTimer(settings);
};

export const calibrateGen5EntralinkPlusTimer = ({
  settings,
  hitSecond,
  hitDelay,
  hitAdvances,
}: {
  settings: Gen5EntralinkPlusTimerSettings;
  hitSecond: number;
  hitDelay: number;
  hitAdvances: number;
}): Gen5EntralinkPlusTimerSettings => {
  let calibration = settings.calibration;
  let entralinkCalibration = settings.entralinkCalibration;
  let frameCalibration = settings.frameCalibration;

  if (hitSecond !== settings.targetSecond) {
    const offset = getSecondCalibration({
      console: settings.console,
      targetSecond: settings.targetSecond,
      hitSecond,
    });
    calibration = calibration + offset;
  }

  if (hitDelay !== settings.targetDelay) {
    const offset = getEntralinkCalibration({
      console: settings.console,
      targetDelay: settings.targetDelay,
      hitDelay,
    });
    entralinkCalibration = entralinkCalibration + offset;
  }

  if (hitAdvances !== settings.targetAdvances) {
    const offset = calibrateEnhancedEntralinkTimer({
      targetAdvances: settings.targetAdvances,
      hitAdvances,
    });
    frameCalibration = frameCalibration + offset;
  }

  return {
    ...settings,
    calibration: capPrecision(calibration),
    entralinkCalibration: capPrecision(entralinkCalibration),
    frameCalibration: capPrecision(frameCalibration),
  };
};

export type Gen5EntralinkPlusTimer = {
  ms: number[];
  settings: Gen5EntralinkPlusTimerSettings;
};

export const updateGen5EntralinkPlusTimer = (
  settings: Gen5EntralinkPlusTimerSettings,
  hitSecond?: number,
  hitDelay?: number,
  hitAdvances?: number,
): Gen5EntralinkPlusTimer => {
  const calibratedSettings =
    hitSecond != null && hitDelay != null && hitAdvances != null
      ? calibrateGen5EntralinkPlusTimer({
          settings,
          hitSecond,
          hitDelay,
          hitAdvances,
        })
      : settings;
  const ms = createGen5EntralinkPlusTimer(calibratedSettings);
  return {
    ms,
    settings: calibratedSettings,
  };
};
