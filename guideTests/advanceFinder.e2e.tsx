import { describe, expect, it } from "vitest";
import { openAdvanceFinder, type AdvanceRange } from "./guides/advanceFinder";

const ADVANCE_RANGE: AdvanceRange = {
  seed: "AA100320",
  minAdvance: "0",
  maxAdvance: "20",
  targetAdvance: "10",
};

describe("Gen 4 advance finder Pokégear calls", () => {
  it("lists Elm's calls for the seed", async () => {
    const finder = await openAdvanceFinder();

    const rows = await finder.generateElmCalls(ADVANCE_RANGE);

    expect(rows).toEqual([
      { advance: "0", call: "E", isMarked: false },
      { advance: "1", call: "E", isMarked: false },
      { advance: "2", call: "E", isMarked: false },
      { advance: "3", call: "E", isMarked: false },
      { advance: "4", call: "K", isMarked: false },
      { advance: "5", call: "P", isMarked: false },
      { advance: "6", call: "E", isMarked: false },
      { advance: "7", call: "E", isMarked: false },
      { advance: "8", call: "K", isMarked: false },
      { advance: "9", call: "P", isMarked: false },
    ]);
  });

  it("marks the advances matching the entered calls", async () => {
    const finder = await openAdvanceFinder();
    await finder.generateElmCalls(ADVANCE_RANGE);

    await finder.addElmCalls(["P", "E", "P", "K"]);

    await finder.waitForShownCalls([
      { advance: "10", call: "K", isMarked: true },
      { advance: "11", call: "K", isMarked: false },
      { advance: "12", call: "P", isMarked: true },
      { advance: "13", call: "E", isMarked: true },
      { advance: "14", call: "P", isMarked: true },
      { advance: "15", call: "K", isMarked: true },
      { advance: "16", call: "K", isMarked: false },
      { advance: "17", call: "E", isMarked: false },
      { advance: "18", call: "K", isMarked: false },
      { advance: "19", call: "E", isMarked: false },
    ]);
  });
});
