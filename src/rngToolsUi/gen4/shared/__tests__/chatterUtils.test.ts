import type { ChatterState } from "~/rngTools";
import { describe, it, expect } from "bun:test";
import { getRelativeChatter, getRelativeChatters } from "../chatterUtils";

describe("getRelativeChatter", () => {
  it("should return 'Same' when pitch values are within 15", () => {
    const prevState: ChatterState = {
      pitch: "Low",
      pitch_value: 100,
      advance: 0,
    };
    const currentState: ChatterState = {
      pitch: "Low",
      pitch_value: 110,
      advance: 0,
    };
    expect(getRelativeChatter(prevState, currentState)).toBe("Same");
  });

  it("should return 'Lower' when current pitch value is less than previous", () => {
    const prevState: ChatterState = {
      pitch: "Low",
      pitch_value: 100,
      advance: 0,
    };
    const currentState: ChatterState = {
      pitch: "Low",
      pitch_value: 80,
      advance: 0,
    };
    expect(getRelativeChatter(prevState, currentState)).toBe("Lower");
  });

  it("should return 'Higher' when current pitch value is greater than previous", () => {
    const prevState: ChatterState = {
      pitch: "Low",
      pitch_value: 100,
      advance: 0,
    };
    const currentState: ChatterState = {
      pitch: "Low",
      pitch_value: 120,
      advance: 0,
    };
    expect(getRelativeChatter(prevState, currentState)).toBe("Higher");
  });
});

describe("getRelativeChatters", () => {
  it("should return an array of relative chatters for a sequence of states", () => {
    const states: ChatterState[] = [
      { pitch: "Low", pitch_value: 100, advance: 0 },
      { pitch: "Low", pitch_value: 110, advance: 0 },
      { pitch: "Low", pitch_value: 80, advance: 0 },
      { pitch: "Low", pitch_value: 120, advance: 0 },
    ];
    expect(getRelativeChatters(states)).toEqual(["Same", "Lower", "Higher"]);
  });
});
