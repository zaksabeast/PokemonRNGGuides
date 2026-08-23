import { toMinimumLength } from "./minTime";
import { createSecondTimer } from "./secondTimer";

export const CLOSE_THRESHOLD = 167;
const UPDATE_FACTOR = 1;
const CLOSE_UPDATE_FACTOR = 0.75;

export const createDelayTimer = ({
  minTimeMs,
  targetDelayMs,
  targetMs,
  calibrationMs,
}: {
  minTimeMs: number;
  targetDelayMs: number;
  targetMs: number;
  calibrationMs: number;
}): [number, number] => {
  const secondTimer = createSecondTimer({ minTimeMs, targetMs, calibrationMs });
  const timerMs = secondTimer - targetDelayMs;
  const phase1 = toMinimumLength({
    min: minTimeMs,
    ms: timerMs,
  });
  const phase2 = targetDelayMs - calibrationMs;
  return [phase1, phase2];
};

export const calibrateDelayTimer = ({
  hitDelayMs,
  targetDelayMs,
}: {
  targetDelayMs: number;
  hitDelayMs: number;
}): number => {
  const delta = hitDelayMs - targetDelayMs;
  const isClose = Math.abs(delta) <= CLOSE_THRESHOLD;
  const factor = isClose ? CLOSE_UPDATE_FACTOR : UPDATE_FACTOR;
  return delta * factor;
};
