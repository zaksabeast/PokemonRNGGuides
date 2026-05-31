import { describe, it, expect } from "bun:test";
import { minutesBefore } from "../minutesBefore";

describe("minutesBefore", () => {
  it("handles 2 minutes", () => {
    expect(minutesBefore([31283, 18910, 119453.06])).toBe(2);
  });

  it("handles 1 minute", () => {
    expect(minutesBefore([29573, 89626])).toBe(1);
  });

  it("handles 0 minutes", () => {
    expect(minutesBefore([5000, 16715])).toBe(0);
  });
});
