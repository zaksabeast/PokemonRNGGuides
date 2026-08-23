import { toMinimumLength } from "./minTime";

export const createSecondTimer = ({
  minTimeMs,
  targetMs,
  calibrationMs,
}: {
  minTimeMs: number;
  targetMs: number;
  calibrationMs: number;
}): number => {
  const adjustedTarget = targetMs + calibrationMs + 200;
  return toMinimumLength({ min: minTimeMs, ms: adjustedTarget });
};

export const calibrateSecondTimer = ({
  hitMs,
  targetMs,
}: {
  targetMs: number;
  hitMs: number;
}): number => {
  if (hitMs === targetMs) {
    return 0;
  }

  const hitLessThanTarget = hitMs < targetMs;
  const offset = hitLessThanTarget ? -500 : 500;
  return targetMs - hitMs + offset;
};
