import { capPrecision } from "~/utils/number";
import { getConsoleCalibrator, type GameConsole } from "./console";
import { createDelayTimer, calibrateDelayTimer } from "./delayTimer";
import { secsToMs } from "./utils";

export type Gen4TimerSettings = {
  console: GameConsole;
  minTimeMs: number;
  targetDelay: number;
  targetSecond: number;
  calibratedDelay: number;
  calibratedSecond: number;
};

const createGen4Timer = (settings: Gen4TimerSettings): number[] => {
  const calibrator = getConsoleCalibrator(settings.console);

  const targetMs = secsToMs(settings.targetSecond);
  const targetDelayMs = calibrator.toMs(settings.targetDelay);
  const calibratedDelay = calibrator.toDelays(
    secsToMs(settings.calibratedSecond),
  );

  const calibrationMs = calibrator.toMs(
    settings.calibratedDelay - calibratedDelay,
  );
  return createDelayTimer({
    minTimeMs: settings.minTimeMs,
    targetDelayMs,
    targetMs,
    calibrationMs,
  });
};

const calibrateGen4Timer = (
  settings: Gen4TimerSettings,
  hitDelay: number,
): Gen4TimerSettings => {
  if (hitDelay <= 0) {
    return settings;
  }

  const calibrator = getConsoleCalibrator(settings.console);
  const targetDelayMs = calibrator.toMs(settings.targetDelay);
  const hitDelayMs = calibrator.toMs(hitDelay);
  const calibrationMs = calibrateDelayTimer({ targetDelayMs, hitDelayMs });
  const calibration = calibrator.toDelays(calibrationMs);

  return {
    ...settings,
    calibratedDelay: capPrecision(settings.calibratedDelay + calibration),
  };
};

export type Gen4Timer = {
  ms: number[];
  settings: Gen4TimerSettings;
};

export const updateGen4Timer = (
  settings: Gen4TimerSettings,
  hitDelay?: number,
): Gen4Timer => {
  const calibratedSettings =
    hitDelay != null ? calibrateGen4Timer(settings, hitDelay) : settings;
  const ms = createGen4Timer(calibratedSettings).map(Math.floor);
  return { ms, settings: calibratedSettings };
};
