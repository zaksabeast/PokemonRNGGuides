import { describe, expect, it } from "vitest";
import { openTimelineGuide } from "./guides/timelineGuide";

describe("USUM Timeline guide", () => {
  it("finds safe advances and the leap to the target", async () => {
    const guide = await openTimelineGuide();

    const safeAdvances = await guide.findSafeAdvances({
      initialSeed: "deadbeef",
      npcCount: "4",
      currentAdvance: "1000",
      targetAdvance: "1500",
    });

    expect(safeAdvances).toEqual([
      "Step one frame at a time until you land on one of these",
      "1039",
      "1040",
      "1041",
      "1042",
      "1043",
      "1044",
      "1045",
      "1046",
      "1047",
      "1048",
      "Show More",
    ]);

    const timeline = await guide.selectSafeAdvance("1039");

    expect(timeline).toEqual({
      nextAdvances: [
        "Keep stepping and compare",
        "1039",
        "1044",
        "1049",
        "1054",
        "1059",
        "1064",
      ],
      leap: ["Timeline Leap", "Press A at", "1374", "Time", "~2.2 s"],
      target: [
        "Target Advance",
        "Press A at",
        "1500",
        "Time after leap",
        "~0.9 s",
      ],
    });
  });
});
