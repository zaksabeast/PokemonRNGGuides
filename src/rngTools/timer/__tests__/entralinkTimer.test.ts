import { describe, it, expect } from "bun:test";
import { createEntralinkPhases } from "../entralinkTimer";

describe("createEntralinkPhases", () => {
  it("creates a timer", () => {
    const result = createEntralinkPhases({
      phases: [0, 0],
      entralinkCalibrationMs: 400,
    });
    expect(result).toEqual([250, -400]);
  });
});
