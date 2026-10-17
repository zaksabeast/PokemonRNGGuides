import { beforeAll, beforeEach, describe, expect, it } from "vitest";
import {
  openRetailTidGuide,
  type IdResult,
  type RetailTidGuide,
} from "./guides/retailTid";

const NDS_INSTRUCTIONS =
  "Exit the settings on your console and restart your console.";
const ALT_SETTINGS_INSTRUCTIONS =
  "Press Start to exit the Alt Settings on your console, then start the game.";

// The ID the game generates at the selected target's second, but 10 delays late (5010 instead of 5000)
const LATE_DELAY_TID = 56247;

describe("Retail TID/SID guide", () => {
  it("shows console-specific instructions", async () => {
    const guide = await openRetailTidGuide();
    expect(guide.hitTargetText()).toContain(NDS_INSTRUCTIONS);

    guide.setConsole("3DS (Alt Settings)");

    await guide.waitForHitTargetText(ALT_SETTINGS_INSTRUCTIONS);
    expect(guide.hitTargetText()).not.toContain(NDS_INSTRUCTIONS);
  });

  it("shows placeholders until a target is selected", async () => {
    const guide = await openRetailTidGuide();

    expect(guide.consoleDateTime()).toEqual({
      date: "Unknown date",
      time: "Unknown time",
    });
    expect(guide.calibrateTargetText()).toBe("Target TID: ??? / SID: ???");
  });

  describe("after selecting a target", () => {
    let guide: RetailTidGuide;
    let target: IdResult;

    beforeAll(async () => {
      guide = await openRetailTidGuide();
      target = await guide.selectFirstSearchResult();
    });

    it("selects the expected TID", () => {
      expect(target).toMatchInlineSnapshot(`
        {
          "delay": "5000",
          "genderRatios": "All",
          "natures": "Mild, Quiet, Bashful, Rash, Calm, Gentle, Sassy, Careful",
          "seconds": "58",
          "sid": "23615",
          "targetGender": "Female",
          "tid": "23595",
          "tsv": "2",
        }
      `);
    });

    it("sets the console date and time", () => {
      expect(guide.consoleDateTime()).toMatchInlineSnapshot(`
        {
          "date": "Jan 1, 2000",
          "time": "20:07",
        }
      `);
    });

    it("sets the timer", () => {
      expect(guide.timer()).toMatchInlineSnapshot(`
        [
          {
            "duration": "30.646",
            "label": "Seconds",
          },
          {
            "duration": "87.554",
            "label": "Delay",
          },
        ]
      `);
    });

    it("shows the target ID in Calibrate", () => {
      expect(guide.calibrateTargetText()).toBe(
        "Target TID: 23595 / SID: 23615",
      );
    });
  });

  describe("calibrating", () => {
    let guide: RetailTidGuide;

    // Calibrating changes the timer, so each test gets its own guide
    beforeEach(async () => {
      guide = await openRetailTidGuide();
      await guide.selectFirstSearchResult();
    });

    it("shortens the delay timer after a late delay", async () => {
      const before = guide.timer();

      const result = await guide.calibrateWith(LATE_DELAY_TID);

      expect(result).toEqual({ delayOffset: "+10", secondOffset: "0" });
      expect(await guide.timerAfterChange(before)).toMatchInlineSnapshot(`
        [
          {
            "duration": "30.763",
            "label": "Seconds",
          },
          {
            "duration": "87.437",
            "label": "Delay",
          },
        ]
      `);
    });
  });
});
