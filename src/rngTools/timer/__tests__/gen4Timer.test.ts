import { describe, it, expect } from "bun:test";
import { updateGen4Timer, type Gen4TimerSettings } from "../gen4Timer";

describe("updateGen4Timer", () => {
  it("creates a new timer", () => {
    const settings: Gen4TimerSettings = {
      console: "NdsSlot1",
      minTimeMs: 14000,
      calibratedDelay: 500,
      calibratedSecond: 14,
      targetDelay: 600,
      targetSecond: 50,
    };
    const result = updateGen4Timer(settings);
    expect(result).toEqual({
      ms: [34521, 15679],
      settings,
    });
  });

  it("creates a new timer 2", () => {
    const settings: Gen4TimerSettings = {
      console: "NdsSlot1",
      minTimeMs: 14000,
      calibratedDelay: 399,
      calibratedSecond: 14,
      targetDelay: 600,
      targetSecond: 50,
    };
    const result = updateGen4Timer(settings);
    expect(result).toEqual({
      ms: [32833, 17367],
      settings,
    });
  });

  it("calibrates", () => {
    const settings: Gen4TimerSettings = {
      console: "NdsSlot1",
      minTimeMs: 14000,
      calibratedDelay: 500,
      calibratedSecond: 14,
      targetDelay: 600,
      targetSecond: 50,
    };
    const timer = updateGen4Timer(settings, 400);
    expect(timer).toEqual({
      ms: [31178, 19022],
      settings: {
        console: "NdsSlot1",
        minTimeMs: 14000,
        calibratedDelay: 300,
        calibratedSecond: 14,
        targetDelay: 600,
        targetSecond: 50,
      },
    });
  });

  it("calibrates 2", () => {
    const settings: Gen4TimerSettings = {
      console: "NdsSlot1",
      minTimeMs: 14000,
      calibratedDelay: 600,
      calibratedSecond: 14,
      targetDelay: 802,
      targetSecond: 58,
    };
    const timer = updateGen4Timer(settings, 800);
    expect(timer).toEqual({
      ms: [40782, 17418],
      settings: {
        console: "NdsSlot1",
        minTimeMs: 14000,
        calibratedDelay: 598,
        calibratedSecond: 14,
        targetDelay: 802,
        targetSecond: 58,
      },
    });
  });
});
