import { describe, it, expect } from "bun:test";
import {
  updateGen5EntralinkPlusTimer,
  type Gen5EntralinkPlusTimerSettings,
} from "../entralinkPlus";

describe("updateGen5EntralinkPlusTimer", () => {
  it("creates a new timer", () => {
    const settings: Gen5EntralinkPlusTimerSettings = {
      console: "NdsSlot1",
      minTimeMs: 14000,
      targetDelay: 1200,
      targetSecond: 50,
      targetAdvances: 100,
      calibration: -95,
      entralinkCalibration: 256,
      frameCalibration: 0,
    };
    const result = updateGen5EntralinkPlusTimer(settings);
    expect(result.ms).toEqual([28804, 17367, 119453]);
    expect(result.settings).toEqual(settings);
  });

  it("calibrates", () => {
    const settings: Gen5EntralinkPlusTimerSettings = {
      console: "NdsSlot1",
      minTimeMs: 14000,
      targetDelay: 1200,
      targetSecond: 50,
      targetAdvances: 100,
      calibration: -95,
      entralinkCalibration: 256,
      frameCalibration: 0,
    };
    const result = updateGen5EntralinkPlusTimer(settings, 40, 1100, 90);
    expect(result.ms).toEqual([38298, 9544, 131398]);
    expect(result.settings.calibration).toBe(473);
    expect(result.settings.entralinkCalibration).toBe(156);
    expect(result.settings.frameCalibration).toBe(11945.306);
  });
});
