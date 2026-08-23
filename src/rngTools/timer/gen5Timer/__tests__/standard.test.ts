import { describe, it, expect } from "bun:test";
import {
  updateGen5StandardTimer,
  type Gen5StandardTimerSettings,
} from "../standard";

describe("updateGen5StandardTimer", () => {
  it("creates a new timer", () => {
    const settings: Gen5StandardTimerSettings = {
      console: "NdsSlot1",
      minTimeMs: 14000,
      targetSecond: 50,
      calibration: -95,
    };
    const result = updateGen5StandardTimer(settings);
    expect(result.ms).toEqual([48612]);
    expect(result.settings).toEqual(settings);
  });

  it("calibrates", () => {
    const settings: Gen5StandardTimerSettings = {
      console: "NdsSlot1",
      minTimeMs: 14000,
      targetSecond: 50,
      calibration: -95,
    };
    const result = updateGen5StandardTimer(settings, 40);
    expect(result.ms).toEqual([58106]);
    expect(result.settings.calibration).toBe(473);
  });
});
