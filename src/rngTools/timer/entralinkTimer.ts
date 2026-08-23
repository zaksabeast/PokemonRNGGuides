import { getConsoleCalibrator, type GameConsole } from "./console";
import { createDelayTimer, calibrateDelayTimer } from "./delayTimer";
import { secsToMs } from "./utils";

export const createEntralinkPhases = ({
  phases,
  entralinkCalibrationMs,
}: {
  phases: [number, number];
  entralinkCalibrationMs: number;
}): number[] => {
  return [phases[0] + 250, phases[1] - entralinkCalibrationMs].map(Math.floor);
};

export const createEntralinkTimer = ({
  console,
  minTimeMs,
  targetDelay,
  targetSecond,
  calibrationMs,
  entralinkCalibrationMs,
}: {
  console: GameConsole;
  minTimeMs: number;
  targetDelay: number;
  targetSecond: number;
  calibrationMs: number;
  entralinkCalibrationMs: number;
}): number[] => {
  const calibrator = getConsoleCalibrator(console);
  const targetMs = secsToMs(targetSecond);
  const targetDelayMs = calibrator.toMs(targetDelay);
  const phases = createDelayTimer({
    minTimeMs,
    targetDelayMs,
    targetMs,
    calibrationMs,
  });
  return createEntralinkPhases({ phases, entralinkCalibrationMs });
};

export const calibrateEntralinkTimer = (
  console: GameConsole,
  targetDelay: number,
  hitDelay: number,
): number => {
  const calibrator = getConsoleCalibrator(console);
  const targetDelayMs = calibrator.toMs(targetDelay);
  const hitDelayMs = calibrator.toMs(hitDelay);
  return calibrateDelayTimer({ targetDelayMs, hitDelayMs });
};
