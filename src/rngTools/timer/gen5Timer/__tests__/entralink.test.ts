import { describe, it, expect } from "bun:test";
import {
  updateGen5EntralinkTimer,
  type Gen5EntralinkTimerSettings,
} from "../entralink";

describe("updateGen5EntralinkTimer", () => {
  it("creates a new timer", () => {
    const settings: Gen5EntralinkTimerSettings = {
      console: "NdsSlot1",
      minTimeMs: 14000,
      targetDelay: 1200,
      targetSecond: 50,
      calibration: -95,
      entralinkCalibration: 256,
    };
    const result = updateGen5EntralinkTimer(settings);
    expect(result.ms).toEqual([28804, 17367]);
    expect(result.settings).toEqual(settings);
  });

  it("calibrates", () => {
    const settings: Gen5EntralinkTimerSettings = {
      console: "NdsSlot1",
      minTimeMs: 14000,
      targetDelay: 1200,
      targetSecond: 50,
      calibration: -95,
      entralinkCalibration: 256,
    };
    const result = updateGen5EntralinkTimer(settings, 40, 1100);
    expect(result.ms).toEqual([38298, 9544]);
    expect(result.settings.calibration).toBe(473);
    expect(result.settings.entralinkCalibration).toBe(156);
  });
});
