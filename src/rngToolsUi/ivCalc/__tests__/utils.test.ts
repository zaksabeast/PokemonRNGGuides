import { describe, it, expect } from "bun:test";
import { formatStatRange, getIvRangeRow } from "../utils";
import type { Translations } from "~/translations";

describe("formatStatRange", () => {
  it("returns NA for empty array", () => {
    expect(formatStatRange([], "N/A")).toBe("N/A");
  });

  it("formats single value", () => {
    expect(formatStatRange([5], "N/A")).toBe("5");
  });

  it("formats two consecutive values as comma-separated", () => {
    expect(formatStatRange([5, 6], "N/A")).toBe("5, 6");
  });

  it("formats three or more consecutive values as range", () => {
    expect(formatStatRange([5, 6, 7], "N/A")).toBe("5-7");
    expect(formatStatRange([10, 11, 12, 13, 14], "N/A")).toBe("10-14");
  });

  it("handles unsorted input", () => {
    expect(formatStatRange([7, 5, 6], "N/A")).toBe("5-7");
    expect(formatStatRange([10, 5, 7, 6], "N/A")).toBe("5-7, 10");
  });

  it("formats multiple non-consecutive ranges", () => {
    expect(formatStatRange([1, 2, 3, 5, 6, 7], "N/A")).toBe("1-3, 5-7");
  });

  it("handles mixed single values and ranges", () => {
    expect(formatStatRange([1, 3, 4, 5, 7], "N/A")).toBe("1, 3-5, 7");
  });

  it("handles duplicate values", () => {
    expect(formatStatRange([5, 5, 6, 6, 7], "N/A")).toBe("5-7");
  });

  it("formats individual values between gaps correctly", () => {
    expect(formatStatRange([1, 2, 5, 10], "N/A")).toBe("1, 2, 5, 10");
  });
});

describe("getIvRangeRow", () => {
  const mockTranslations: Translations = {
    HP: "HP",
    Atk: "ATK",
    Def: "DEF",
    SpA: "SPA",
    SpD: "SPD",
    Spe: "SPE",
    "N/A": "N/A",
  } as Translations;

  it("returns row with all values present", () => {
    const result = getIvRangeRow(
      mockTranslations,
      "hp",
      0,
      { hp: 100, atk: 110, def: 120, spa: 130, spd: 140, spe: 150 },
      { hp: [5, 6, 7], atk: [10], def: [20, 21], spa: [], spd: [], spe: [] },
      "N/A",
      formatStatRange,
    );

    expect(result.stat).toBe("HP");
    expect(result.nextLevel).toBe(100);
    expect(result.value).toBe("5-7");
  });

  it("returns NA for nextLevel when nextLevelStats is undefined", () => {
    const result = getIvRangeRow(
      mockTranslations,
      "hp",
      0,
      undefined,
      { hp: [5, 6, 7], atk: [], def: [], spa: [], spd: [], spe: [] },
      "N/A",
      formatStatRange,
    );

    expect(result.nextLevel).toBe("N/A");
  });

  it("returns NA for value when possibleIvs is undefined", () => {
    const result = getIvRangeRow(
      mockTranslations,
      "hp",
      0,
      { hp: 100, atk: 110, def: 120, spa: 130, spd: 140, spe: 150 },
      undefined,
      "N/A",
      formatStatRange,
    );

    expect(result.value).toBe("N/A");
  });

  it("returns NA for value when IV array is empty", () => {
    const result = getIvRangeRow(
      mockTranslations,
      "atk",
      1,
      { hp: 100, atk: 110, def: 120, spa: 130, spd: 140, spe: 150 },
      { hp: [], atk: [], def: [], spa: [], spd: [], spe: [] },
      "N/A",
      formatStatRange,
    );

    expect(result.value).toBe("N/A");
  });

  it("uses custom formatFn", () => {
    const customFormat = (stat: number[], na: string) =>
      stat.length === 0 ? na : `custom-${stat.join(",")}`;

    const result = getIvRangeRow(
      mockTranslations,
      "hp",
      0,
      { hp: 100, atk: 110, def: 120, spa: 130, spd: 140, spe: 150 },
      { hp: [5, 6, 7], atk: [], def: [], spa: [], spd: [], spe: [] },
      "N/A",
      customFormat,
    );

    expect(result.value).toBe("custom-5,6,7");
  });
});
