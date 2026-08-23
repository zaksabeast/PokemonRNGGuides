import { describe, it, expect } from "bun:test";
import {
  createEnhancedEntralink,
  calibrateEnhancedEntralinkTimer,
} from "../enhancedEntralinkTimer";

describe("createEnhancedEntralink", () => {
  it("creates a timer", () => {
    const result = createEnhancedEntralink({
      phases: [1, 2],
      targetAdvances: 3,
      frameRate: 0.837148929,
      frameCalibration: 6,
    });
    expect(result).toEqual([1, 2, 3589]);
  });
});

describe("calibrateEnhancedEntralinkTimer", () => {
  it("handles target equals hit", () => {
    const result = calibrateEnhancedEntralinkTimer({
      targetAdvances: 1,
      hitAdvances: 1,
    });
    expect(result).toBe(0);
  });

  it("handles target less than hit", () => {
    const result = calibrateEnhancedEntralinkTimer({
      targetAdvances: 1,
      hitAdvances: 2,
    });
    expect(result).toBe(-1194.5306265110066);
  });

  it("handles target greater than hit", () => {
    const result = calibrateEnhancedEntralinkTimer({
      targetAdvances: 1,
      hitAdvances: 0,
    });
    expect(result).toBe(1194.5306265110066);
  });
});
