import { capPrecision } from "~/utils/number";
import { getConsoleCalibrator, type GameConsole } from "../console";
import { calibrateSecondTimer, createSecondTimer } from "../secondTimer";
import { secsToMs } from "../utils";

export type Gen5StandardTimerSettings = {
  console: GameConsole;
  minTimeMs: number;
  targetSecond: number;
  calibration: number;
};

export const createGen5StandardTimer = ({
  minTimeMs,
  console,
  targetSecond,
  calibration,
}: Gen5StandardTimerSettings): number[] => {
  const calibrator = getConsoleCalibrator(console);
  const targetMs = secsToMs(targetSecond);
  const calibrationMs = calibrator.toMs(calibration);
  const ms = createSecondTimer({ minTimeMs, targetMs, calibrationMs });
  return [ms].map(Math.floor);
};

export const calibrateGen5StandardTimer = (
  settings: Gen5StandardTimerSettings,
  hitSecond: number,
): Gen5StandardTimerSettings => {
  const targetMs = secsToMs(settings.targetSecond);
  const hitMs = secsToMs(hitSecond);
  const calibration = calibrateSecondTimer({ targetMs, hitMs });
  const calibrator = getConsoleCalibrator(settings.console);
  const calibrationInDelays = calibrator.toDelays(calibration);

  return {
    ...settings,
    calibration: capPrecision(settings.calibration + calibrationInDelays),
  };
};

export type Gen5StandardTimer = {
  ms: number[];
  settings: Gen5StandardTimerSettings;
};

export const updateGen5StandardTimer = (
  settings: Gen5StandardTimerSettings,
  hitSecond?: number,
): Gen5StandardTimer => {
  const calibratedSettings =
    hitSecond != null
      ? calibrateGen5StandardTimer(settings, hitSecond)
      : settings;
  return {
    ms: createGen5StandardTimer(calibratedSettings),
    settings: calibratedSettings,
  };
};
