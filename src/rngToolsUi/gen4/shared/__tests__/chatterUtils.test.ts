import type { ChatterState } from "~/rngTools";
import { describe, it, expect } from "bun:test";
import {
  isRelativePitchEqual,
  getRelativeChatter,
  getRelativeChatters,
  type RelativeChatter,
} from "../chatterUtils";

describe("getRelativeChatter", () => {
  it("should return same when pitch values are within 15", () => {
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
    expect(getRelativeChatter(prevState, currentState)).toEqual({
      isLower: false,
      isHigher: true,
      isSame: true,
    });
  });

  it("should return lower when current pitch value is less than previous", () => {
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
    expect(getRelativeChatter(prevState, currentState)).toEqual({
      isLower: true,
      isHigher: false,
      isSame: false,
    });
  });

  it("should return higher when current pitch value is greater than previous", () => {
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
    expect(getRelativeChatter(prevState, currentState)).toEqual({
      isLower: false,
      isHigher: true,
      isSame: false,
    });
  });

  it("should only return same when current pitch value is equal to previous", () => {
    const prevState: ChatterState = {
      pitch: "Low",
      pitch_value: 100,
      advance: 0,
    };
    const currentState: ChatterState = {
      pitch: "Low",
      pitch_value: 100,
      advance: 0,
    };
    expect(getRelativeChatter(prevState, currentState)).toEqual({
      isLower: false,
      isHigher: false,
      isSame: true,
    });
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
    expect(getRelativeChatters(states)).toEqual([
      { isLower: false, isHigher: true, isSame: true },
      { isLower: true, isHigher: false, isSame: false },
      { isLower: false, isHigher: true, isSame: false },
    ]);
  });
});

describe("isRelativePitchEqual", () => {
  it("should match same for same pitch", () => {
    const relative: RelativeChatter = {
      isLower: false,
      isHigher: false,
      isSame: true,
    };
    expect(isRelativePitchEqual(relative, "S")).toBe(true);
  });

  it("should match same for same and lower pitch", () => {
    const relative: RelativeChatter = {
      isLower: true,
      isHigher: false,
      isSame: true,
    };
    expect(isRelativePitchEqual(relative, "S")).toBe(true);
  });

  it("should match same for same and higher pitch", () => {
    const relative: RelativeChatter = {
      isLower: false,
      isHigher: true,
      isSame: true,
    };
    expect(isRelativePitchEqual(relative, "S")).toBe(true);
  });

  it("should return true for lower pitch", () => {
    const relative: RelativeChatter = {
      isLower: true,
      isHigher: false,
      isSame: false,
    };
    expect(isRelativePitchEqual(relative, "L")).toBe(true);
  });

  it("should return true for higher pitch", () => {
    const relative: RelativeChatter = {
      isLower: false,
      isHigher: true,
      isSame: false,
    };
    expect(isRelativePitchEqual(relative, "H")).toBe(true);
  });

  it("should return false for non-matching pitch", () => {
    const relative: RelativeChatter = {
      isLower: true,
      isHigher: false,
      isSame: false,
    };
    expect(isRelativePitchEqual(relative, "H")).toBe(false);
  });
});
