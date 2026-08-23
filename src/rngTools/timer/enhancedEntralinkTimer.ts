import { type GameConsole, getConsoleCalibrator } from "./console";
import { createEntralinkTimer } from "./entralinkTimer";
import { secsToMs } from "./utils";

const ENTRALINK_FRAME_RATE: number = 0.837_148_9;

export const createEnhancedEntralink = ({
  phases,
  targetAdvances,
  frameRate,
  frameCalibration,
}: {
  phases: number[];
  targetAdvances: number;
  frameRate: number;
  frameCalibration: number;
}): number[] => {
  const ms = secsToMs(targetAdvances / frameRate);
  const phase2 = ms + frameCalibration;
  return [phases[0], phases[1], phase2].map(Math.floor);
};

export type Gen5EntralinkPlusTimerSettings = {
  console: GameConsole;
  minTimeMs: number;
  targetDelay: number;
  targetSecond: number;
  targetAdvances: number;
  calibration: number;
  entralinkCalibration: number;
  frameCalibration: number;
};

export const createEnhancedEntralinkTimer = ({
  console,
  calibration,
  entralinkCalibration,
  frameCalibration,
  minTimeMs,
  targetAdvances,
  targetDelay,
  targetSecond,
}: Gen5EntralinkPlusTimerSettings): number[] => {
  const calibrator = getConsoleCalibrator(console);
  const calibrationMs = calibrator.toMs(calibration);
  const entralinkCalibrationMs = calibrator.toMs(entralinkCalibration);

  const phases = createEntralinkTimer({
    console,
    minTimeMs,
    targetDelay,
    targetSecond,
    calibrationMs,
    entralinkCalibrationMs,
  });

  return createEnhancedEntralink({
    phases,
    targetAdvances,
    frameCalibration,
    frameRate: ENTRALINK_FRAME_RATE,
  });
};

export const calibrateEnhancedEntralinkTimer = ({
  targetAdvances,
  hitAdvances,
}: {
  targetAdvances: number;
  hitAdvances: number;
}): number => {
  return ((targetAdvances - hitAdvances) / ENTRALINK_FRAME_RATE) * 1000;
};
