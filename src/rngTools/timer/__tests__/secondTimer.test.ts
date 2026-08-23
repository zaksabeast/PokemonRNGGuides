import { describe, it, expect } from "bun:test";
import { calibrateSecondTimer, createSecondTimer } from "../secondTimer";

describe("createSecondTimer", () => {
  it("handles less than min length", () => {
    const result = createSecondTimer({
      minTimeMs: 14_000,
      targetMs: 1_000,
      calibrationMs: 0,
    });
    expect(result).toBe(61_200);
  });

  it("handles greater than min length", () => {
    const result = createSecondTimer({
      minTimeMs: 14_000,
      targetMs: 50_000,
      calibrationMs: 0,
    });
    expect(result).toBe(50_200);
  });
});

describe("calibrateSecondTimer", () => {
  it("handles equal", () => {
    const result = calibrateSecondTimer({
      targetMs: 1_000,
      hitMs: 1_000,
    });
    expect(result).toBe(0);
  });

  it("handles less than", () => {
    const result = calibrateSecondTimer({
      targetMs: 1_000,
      hitMs: 0,
    });
    expect(result).toBe(500);
  });

  it("handles greater than", () => {
    const result = calibrateSecondTimer({
      targetMs: 1_000,
      hitMs: 2_000,
    });
    expect(result).toBe(-500);
  });
});
