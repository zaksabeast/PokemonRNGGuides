import { getConsoleCalibrator, type GameConsole } from "./console";

export type Gen3TimerSettings = {
  console: GameConsole;
  preTimer: number;
  targetFrame: number;
  calibration: number;
};

const createGen3Timer = (settings: Gen3TimerSettings): number[] => {
  const calibrator = getConsoleCalibrator(settings.console);
  return [
    settings.preTimer,
    calibrator.toMs(settings.targetFrame) + settings.calibration,
  ].map(Math.floor);
};

const calibrateGen3Timer = (
  settings: Gen3TimerSettings,
  hitFrame: number,
): Gen3TimerSettings => {
  const calibrator = getConsoleCalibrator(settings.console);
  const timerMs = calibrator.toMs(settings.targetFrame - hitFrame);
  const calibration = timerMs + settings.calibration;

  return {
    ...settings,
    calibration: Math.round(calibration),
  };
};

export type Gen3Timer = {
  ms: number[];
  settings: Gen3TimerSettings;
};

export const updateGen3Timer = (
  settings: Gen3TimerSettings,
  hitFrame?: number,
): Gen3Timer => {
  const calibratedSettings =
    hitFrame != null ? calibrateGen3Timer(settings, hitFrame) : settings;
  const ms = createGen3Timer(calibratedSettings);
  return { ms, settings: calibratedSettings };
};
