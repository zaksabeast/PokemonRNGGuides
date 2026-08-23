import { capPrecision } from "~/utils/number";
import { getConsoleCalibrator, type GameConsole } from "../console";
import { calibrateDelayTimer } from "../delayTimer";
import { createEntralinkTimer } from "../entralinkTimer";
import { calibrateSecondTimer } from "../secondTimer";
import { secsToMs } from "../utils";

export type Gen5EntralinkTimerSettings = {
  console: GameConsole;
  minTimeMs: number;
  targetDelay: number;
  targetSecond: number;
  calibration: number;
  entralinkCalibration: number;
};

export const getSecondCalibration = ({
  console,
  targetSecond,
  hitSecond,
}: {
  console: GameConsole;
  targetSecond: number;
  hitSecond: number;
}): number => {
  const targetMs = secsToMs(targetSecond);
  const hitMs = secsToMs(hitSecond);
  const calibration = calibrateSecondTimer({ targetMs, hitMs });
  const calibrator = getConsoleCalibrator(console);
  return calibrator.toDelays(calibration);
};

export const getEntralinkCalibration = ({
  console,
  targetDelay,
  hitDelay,
}: {
  console: GameConsole;
  targetDelay: number;
  hitDelay: number;
}): number => {
  const calibrator = getConsoleCalibrator(console);
  const targetDelayMs = calibrator.toMs(targetDelay);
  const hitDelayMs = calibrator.toMs(hitDelay);
  const calibration = calibrateDelayTimer({ targetDelayMs, hitDelayMs });
  return calibrator.toDelays(calibration);
};

export const createGen5EntralinkTimer = ({
  console,
  minTimeMs,
  targetDelay,
  targetSecond,
  calibration,
  entralinkCalibration,
}: Gen5EntralinkTimerSettings): number[] => {
  const calibrator = getConsoleCalibrator(console);
  const calibrationMs = calibrator.toMs(calibration);
  const entralinkCalibrationMs = calibrator.toMs(entralinkCalibration);
  return createEntralinkTimer({
    console,
    minTimeMs,
    targetDelay,
    targetSecond,
    calibrationMs,
    entralinkCalibrationMs,
  }).map(Math.floor);
};

export const calibrateGen5EntralinkTimer = (
  settings: Gen5EntralinkTimerSettings,
  hitSecond: number,
  hitDelay: number,
): Gen5EntralinkTimerSettings => {
  let calibration = settings.calibration;
  let entralinkCalibration = settings.entralinkCalibration;

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

  return {
    ...settings,
    calibration: capPrecision(calibration),
    entralinkCalibration: capPrecision(entralinkCalibration),
  };
};

export type Gen5EntralinkTimer = {
  ms: number[];
  settings: Gen5EntralinkTimerSettings;
};

export const updateGen5EntralinkTimer = (
  settings: Gen5EntralinkTimerSettings,
  hitSecond?: number,
  hitDelay?: number,
): Gen5EntralinkTimer => {
  const calibratedSettings =
    hitSecond !== undefined && hitDelay !== undefined
      ? calibrateGen5EntralinkTimer(settings, hitSecond, hitDelay)
      : settings;
  const ms = createGen5EntralinkTimer(calibratedSettings);
  return {
    ms,
    settings: calibratedSettings,
  };
};
