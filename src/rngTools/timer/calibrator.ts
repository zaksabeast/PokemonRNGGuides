export type Calibrator = {
  msPerFrame: number;
  toMs: (delays: number) => number;
  toDelays: (milliseconds: number) => number;
};

// Thanks to Eon Timer for roundHalfToEven: https://github.com/DasAmpharos/EonTimer/blob/ad10886d83bc455ad208c82925610c642d9e8864/src/timers/calibrator.ts#L16
const roundHalfToEven = (value: number): number => {
  if (!Number.isFinite(value)) {
    return Math.round(value);
  }

  const lower = Math.floor(value);
  const upper = Math.ceil(value);
  if (lower === upper) {
    return lower;
  }

  const lowerDistance = value - lower;
  const upperDistance = upper - value;
  const epsilon = Number.EPSILON * Math.max(1, Math.abs(value));

  if (Math.abs(lowerDistance - upperDistance) <= epsilon) {
    return Math.abs(lower) % 2 === 0 ? lower : upper;
  }

  return lowerDistance < upperDistance ? lower : upper;
};

export const newCalibrator = (msPerFrame: number): Calibrator => ({
  msPerFrame: Math.fround(msPerFrame),
  toMs: (delays: number) => {
    return roundHalfToEven(delays * msPerFrame);
  },
  toDelays: (milliseconds: number) => {
    return roundHalfToEven(milliseconds / msPerFrame);
  },
});
