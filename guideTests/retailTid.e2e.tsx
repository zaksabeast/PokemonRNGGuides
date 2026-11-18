import { describe, expect, it } from "vitest";
import { openRetailTidGuide } from "./guides/retailTid";

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

  it("keeps the picked 3ds Offset", async () => {
    const guide = await openRetailTidGuide();
    guide.setConsole("3DS (Normal Settings)");
    expect(await guide.threeDsOffset()).toBe("0ms");

    await guide.setThreeDsOffset("300ms");

    await guide.waitForThreeDsOffset("300ms");
  });

  it("shows placeholders until a target is selected", async () => {
    const guide = await openRetailTidGuide();

    expect(guide.consoleDateTime()).toEqual({
      date: "Unknown date",
      time: "Unknown time",
    });
    expect(guide.calibrateTargetText()).toBe("Target TID: ??? / SID: ???");
  });

  it("sets the date, time, and timer for the selected target", async () => {
    const guide = await openRetailTidGuide();

    const target = await guide.selectFirstSearchResult();

    expect({
      target,
      consoleDateTime: guide.consoleDateTime(),
      timer: guide.timer(),
      calibrateTargetText: guide.calibrateTargetText(),
    }).toEqual({
      target: {
        delay: "5000",
        genderRatios: "All",
        natures: "Mild, Quiet, Bashful, Rash, Calm, Gentle, Sassy, Careful",
        seconds: "58",
        sid: "23615",
        targetGender: "Female",
        tid: "23595",
        tsv: "2",
      },
      consoleDateTime: { date: "Jan 1, 2000", time: "20:07" },
      timer: [
        { duration: "30.646", label: "Seconds" },
        { duration: "87.554", label: "Delay" },
      ],
      calibrateTargetText: "Target TID: 23595 / SID: 23615",
    });
  });

  it("shortens the delay timer after a late delay", async () => {
    const guide = await openRetailTidGuide();
    await guide.selectFirstSearchResult();
    const before = guide.timer();

    const result = await guide.calibrateWith(LATE_DELAY_TID);

    expect(result).toEqual({ delayOffset: "+10", secondOffset: "0" });
    expect(await guide.timerAfterChange(before)).toEqual([
      { duration: "30.763", label: "Seconds" },
      { duration: "87.437", label: "Delay" },
    ]);
  });

  it("resets an edited target second after selecting a target again", async () => {
    const guide = await openRetailTidGuide();
    await guide.selectFirstSearchResult();
    const editedTimer = await guide.setTargetSeconds("50");

    await guide.selectFirstSearchResult();

    expect({
      editedTimer,
      timer: await guide.timerAfterChange(editedTimer),
    }).toEqual({
      editedTimer: [
        { duration: "22.646", label: "Seconds" },
        { duration: "87.554", label: "Delay" },
      ],
      timer: [
        { duration: "30.646", label: "Seconds" },
        { duration: "87.554", label: "Delay" },
      ],
    });
  });
});

describe("HGSS retail TID/SID guide", () => {
  const openHgssGuide = async () => {
    const guide = await openRetailTidGuide("/hgss-tid-sid/");
    await guide.setGame("HeartGold");

    return guide;
  };

  it("targets the DPPt ID 3 seconds earlier, with the same console date and time", async () => {
    const guide = await openHgssGuide();

    const target = await guide.selectFirstSearchResult();

    expect({
      target,
      consoleDateTime: guide.consoleDateTime(),
      timer: guide.timer(),
      calibrateTargetText: guide.calibrateTargetText(),
    }).toEqual({
      target: {
        delay: "5000",
        genderRatios: "All",
        natures: "Mild, Quiet, Bashful, Rash, Calm, Gentle, Sassy, Careful",
        seconds: "55",
        sid: "23615",
        targetGender: "Female",
        tid: "23595",
        tsv: "2",
      },
      consoleDateTime: { date: "Jan 1, 2000", time: "20:07" },
      timer: [
        { duration: "27.646", label: "Seconds" },
        { duration: "87.554", label: "Delay" },
      ],
      calibrateTargetText: "Target TID: 23595 / SID: 23615",
    });
  });

  it("shortens the delay timer after a late delay", async () => {
    const guide = await openHgssGuide();
    await guide.selectFirstSearchResult();
    const before = guide.timer();

    const result = await guide.calibrateWith(LATE_DELAY_TID);

    expect(result).toEqual({ delayOffset: "+10", secondOffset: "0" });
    expect(await guide.timerAfterChange(before)).toEqual([
      { duration: "27.763", label: "Seconds" },
      { duration: "87.437", label: "Delay" },
    ]);
  });
});
