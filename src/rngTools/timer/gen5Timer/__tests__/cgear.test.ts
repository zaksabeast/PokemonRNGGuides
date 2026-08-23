import { describe, it, expect } from "bun:test";
import {
  createGen5CgearTimer,
  calibrateGen5CgearTimer,
  type Gen5CGearTimerSettings,
} from "../cgear";

describe("createGen5CgearTimer", () => {
  it("creates a new timer", () => {
    const settings: Gen5CGearTimerSettings = {
      console: "NdsSlot1",
      minTimeMs: 14000,
      targetDelay: 1200,
      targetSecond: 50,
      calibration: -95,
    };
    const result = createGen5CgearTimer(settings);
    expect(result).toEqual([28554, 21646]);
  });
});

describe("calibrateGen5CgearTimer", () => {
  it("calibrates", () => {
    const settings: Gen5CGearTimerSettings = {
      console: "NdsSlot1",
      minTimeMs: 14000,
      targetDelay: 1200,
      targetSecond: 50,
      calibration: -95,
    };
    const calibrated = calibrateGen5CgearTimer(settings, 1100);
    expect(calibrated.calibration).toBe(-195);
    const result = createGen5CgearTimer(calibrated);
    expect(result).toEqual([26883, 23317]);
  });
});
