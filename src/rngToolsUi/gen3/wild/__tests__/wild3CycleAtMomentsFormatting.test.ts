import { describe, expect, test } from "bun:test";
import type { CycleFrameMoment, Wild3GeneratorCycleOpts } from "~/rngTools";
import {
  fillDataFromTool,
  getMethodAccordingToTool,
  type UiResult,
} from "../wild3CycleAtMomentsFormatting";

const createResult = (): UiResult => ({
  methodFromJson: null,
  methodFromTool: null,
  frameAtSweetScent: 0,
  advanceAtSweetScentFromJson: 0,
  uiCycleAtMoments: [],
  vblankDurations: [],
  errorMsg: "",
});

const distributions = (
  cycle_at_moments: CycleFrameMoment[],
  cycle_opts: Wild3GeneratorCycleOpts,
) => ({
  cycle_at_moments,
  cycle_opts,
});

describe("wild encounter cycle comparison", () => {
  test("keeps predicted rows when no emulator log is supplied", () => {
    const result = createResult();
    fillDataFromTool(result, distributions([
      { moment: "TrySweetScentEncounter", frame: 0, cycle: 55000 },
      { moment: "CreateBoxMon_RandomIvs1", frame: 1, cycle: 100000 },
    ], { CycleAtMomentNoEmuLog: { lead_cycle_spd: 700 } }));
    expect(result.uiCycleAtMoments).toHaveLength(2);
    expect(result.uiCycleAtMoments[0].dataFromTool.cycle).toBe(55000);
    expect(result.uiCycleAtMoments[1].dataFromTool.totalCycleWithoutVblank)
      .toBe(280896 + 100000 - 60000);
  });

  test.each([
    [0, "Wild1"],
    [1, "Wild5"],
    [3, "Wild3"],
    [4, "Wild2"],
    [6, "Wild4"],
  ] as const)("detects the method when VBlank begins at index %i", (boundary, expected) => {
    const result = createResult();
    const names = [
      "CreateMonWithNature_RandomPidLow",
      "CreateMonWithNature_RandomPidHigh",
      "CreateMonWithNature_RandomPidLow",
      "CreateMonWithNature_RandomPidHigh",
      "CreateMon",
      "CreateBoxMon_RandomIvs1",
      "CreateBoxMon_RandomIvs2",
    ] as const;
    const moments = names.map((moment, index) => ({
      moment,
      frame: boundary !== 0 && index >= boundary ? 1 : 0,
      cycle: 100 + index * 100,
    }));
    fillDataFromTool(result, distributions(moments, {
      CycleAtMomentWithEmuLog: {
        lead_cycle_spd: 700,
        initial_cycle_at_sweet_scent: 100,
        vblank_cycles: [50000],
      },
    }));
    expect(getMethodAccordingToTool(result)).toBe(expected);
  });

  test("does not invent a method for an empty timeline", () => {
    expect(getMethodAccordingToTool(createResult())).toBeNull();
  });

  test("subtracts recorded VBlank durations from predicted cycles", () => {
    const result = createResult();
    fillDataFromTool(result, distributions([
      { moment: "TrySweetScentEncounter", frame: 0, cycle: 61617 },
      { moment: "CreateBoxMon_RandomIvs2", frame: 1, cycle: 68647 },
    ], {
      CycleAtMomentWithEmuLog: {
        lead_cycle_spd: 0,
        initial_cycle_at_sweet_scent: 61617,
        vblank_cycles: [56895],
      },
    }));
    expect(result.uiCycleAtMoments[1].dataFromTool.totalCycleWithoutVblank)
      .toBe(280896 + 68647 - 56895);
  });
});
