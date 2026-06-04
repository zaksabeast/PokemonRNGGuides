import { describe, it, expect } from "bun:test";
import { newCalibrator } from "../calibrator";

describe("toDelays", () => {
  it("calculates partial frames", () => {
    const calibrator = newCalibrator(1);
    expect(calibrator.toDelays(1.25)).toBe(1);
    expect(calibrator.toDelays(1.5)).toBe(2);
    expect(calibrator.toDelays(1.75)).toBe(2);
  });

  it("calculates whole frames", () => {
    const calibrator = newCalibrator(1);
    expect(calibrator.toDelays(1)).toBe(1);
    expect(calibrator.toDelays(2)).toBe(2);
    expect(calibrator.toDelays(3)).toBe(3);
  });
});

describe("toMs", () => {
  it("calculates ms", () => {
    let calibrator = newCalibrator(1);
    expect(calibrator.toMs(1)).toBe(1);
    expect(calibrator.toMs(2)).toBe(2);
    expect(calibrator.toMs(3)).toBe(3);

    calibrator = newCalibrator(1.5);
    expect(calibrator.toMs(1)).toBe(2);
    expect(calibrator.toMs(2)).toBe(3);
    expect(calibrator.toMs(3)).toBe(4);

    calibrator = newCalibrator(2);
    expect(calibrator.toMs(1)).toBe(2);
    expect(calibrator.toMs(2)).toBe(4);
    expect(calibrator.toMs(3)).toBe(6);
  });
});
