import { describe, it, expect } from "bun:test";
import {
  createDelayTimer,
  calibrateDelayTimer,
  CLOSE_THRESHOLD,
} from "../delayTimer";
import { newCalibrator } from "../calibrator";

describe("createDelayTimer", () => {
  it("creates a timer", () => {
    const calibrator = newCalibrator(1);
    const result = createDelayTimer({
      minTimeMs: 14000,
      targetDelayMs: calibrator.toMs(600),
      targetMs: 50_000,
      calibrationMs: 0,
    });
    expect(result).toEqual([49_600, 600]);
  });
});

describe("calibrateDelayTimer", () => {
  it("calibreates zero", () => {
    const result = calibrateDelayTimer({
      targetDelayMs: 0,
      hitDelayMs: 0,
    });
    expect(result).toBe(0);
  });

  it("calibreates less than close threshold", () => {
    const result = calibrateDelayTimer({
      targetDelayMs: 0,
      hitDelayMs: 1,
    });
    expect(result).toBe(0.75);
  });

  it("calibreates greater than close threshold", () => {
    const result = calibrateDelayTimer({
      targetDelayMs: 0,
      hitDelayMs: CLOSE_THRESHOLD + 1,
    });
    expect(result).toBe(168);
  });

  it("calibreates equal to close threshold", () => {
    const result = calibrateDelayTimer({
      targetDelayMs: 0,
      hitDelayMs: CLOSE_THRESHOLD,
    });
    expect(result).toBe(125.25);
  });
});
