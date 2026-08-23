import { describe, it, expect } from "bun:test";
import { toMinimumLength } from "../minTime";

describe("toMinimumLength", () => {
  it("handles less than min length", () => {
    let result = toMinimumLength({ min: 10_000, ms: 1_000 });
    expect(result).toBe(61_000);

    result = toMinimumLength({ min: 14_000, ms: 1_000 });
    expect(result).toBe(61_000);
  });

  it("handles greater than min length", () => {
    let result = toMinimumLength({ min: 10_000, ms: 50_000 });
    expect(result).toBe(50_000);

    result = toMinimumLength({ min: 14_000, ms: 50_000 });
    expect(result).toBe(50_000);
  });

  it("handles equal to min length", () => {
    let result = toMinimumLength({ min: 10_000, ms: 10_000 });
    expect(result).toBe(10_000);

    result = toMinimumLength({ min: 14_000, ms: 14_000 });
    expect(result).toBe(14_000);
  });

  it("negative_min_length", () => {
    const result = toMinimumLength({ min: -14_000, ms: 1_000 });
    expect(result).toBe(1_000);
  });
});
