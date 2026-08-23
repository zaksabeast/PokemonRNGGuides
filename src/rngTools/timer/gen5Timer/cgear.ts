import { capPrecision } from "~/utils/number";
import { getConsoleCalibrator, type GameConsole } from "../console";
import { calibrateDelayTimer, createDelayTimer } from "../delayTimer";
import { secsToMs } from "../utils";

export type Gen5CGearTimerSettings = {
  console: GameConsole;
  minTimeMs: number;
  targetDelay: number;
  targetSecond: number;
  calibration: number;
};

export const createGen5CgearTimer = ({
  calibration,
  console,
  minTimeMs,
  targetDelay,
  targetSecond,
}: Gen5CGearTimerSettings): number[] => {
  const calibrator = getConsoleCalibrator(console);
  const targetDelayMs = calibrator.toMs(targetDelay);
  const targetMs = secsToMs(targetSecond);
  const calibrationMs = calibrator.toMs(calibration);
  const times = createDelayTimer({
    minTimeMs,
    targetDelayMs,
    targetMs,
    calibrationMs,
  });
  return times.map(Math.floor);
};

export const calibrateGen5CgearTimer = (
  settings: Gen5CGearTimerSettings,
  hitDelay: number,
): Gen5CGearTimerSettings => {
  const calibrator = getConsoleCalibrator(settings.console);
  const targetDelayMs = calibrator.toMs(settings.targetDelay);
  const hitDelayMs = calibrator.toMs(hitDelay);
  const calibration = calibrateDelayTimer({ targetDelayMs, hitDelayMs });
  return {
    ...settings,
    calibration: capPrecision(
      settings.calibration + calibrator.toDelays(calibration),
    ),
  };
};
