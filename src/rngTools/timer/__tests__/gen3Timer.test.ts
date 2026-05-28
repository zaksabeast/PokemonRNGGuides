import { describe, it, expect } from "bun:test";
import { updateGen3Timer, type Gen3TimerSettings } from "../gen3Timer";

describe("updateGen3Timer", () => {
  it("creates a new timer", () => {
    const settings: Gen3TimerSettings = {
      console: "NdsSlot1",
      preTimer: 5000,
      targetFrame: 1000,
      calibration: 0,
    };
    const result = updateGen3Timer(settings);
    expect(result.ms).toEqual([5000, 16715]);
  });

  it("handles double calibration", () => {
    const settings: Gen3TimerSettings = {
      console: "NdsSlot1",
      preTimer: 5000,
      targetFrame: 1000,
      calibration: 0,
    };
    const firstUpdate = updateGen3Timer(settings, 900);
    expect(firstUpdate.settings.calibration).toBe(1672);
    expect(firstUpdate.ms).toEqual([5000, 18387]);

    const secondUpdate = updateGen3Timer(firstUpdate.settings, 600);
    expect(secondUpdate.settings.calibration).toBe(8358);
    expect(secondUpdate.ms).toEqual([5000, 25073]);
  });
});
