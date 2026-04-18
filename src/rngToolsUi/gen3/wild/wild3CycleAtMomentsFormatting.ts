/* eslint-disable no-param-reassign */
/*
 * This file contains data transformation and formatting functions that intentionally
 * mutate their parameters.
 */

import { CycleAtMoment, Gen3Method } from "~/rngTools";
import { z } from "zod";
import { gen3Methods } from "~/types";

export const VBLANK_FREQ = 280_896;
export const MOST_PROBABLE_CYCLE_AT_SWEET_SCENT = 55_000;
export const MOST_PROBABLE_VBLANK_CYCLE = 60_000;

export type UiResult = {
  methodFromJson: Gen3Method | null;
  methodFromTool: Gen3Method | null;
  cycleAtSweetScent: number;
  frameAtSweetScent: number;
  advanceAtSweetScent: number;
  uiCycleAtMoments: UiResultCycleAtMoment[];
  vblankDurations: number[];
  errorMsg: string;
};

export type UiResultCycleAtMoment = {
  uid: number;
  moment: string;
  dataFromJson: {
    cycle: number;
    frame: number;
    cycleFromSweetScent: number;
    cycleFromSweetScentIncrement: number;
  };
  dataFromTool: {
    cycle: number;
    frame: number;
    cycleFromSweetScent: number;
    cycleFromSweetScentIncrement: number;
  };
  dataDiff: {
    cycleFromSweetScent: number;
    cycleFromSweetScentIncrement: number;
  };
};

export const cycleAtMomentsFromJsonSchema = z.object({
  version: z.string(),
  cycleAtMoments: z.array(
    z.object({
      moment: z.string(),
      cycle: z.number(),
      frame: z.number(),
      adv: z.number(),
    }),
  ),
  leadPID: z.string(),
  advance: z.number(),
  method: z.enum(gen3Methods),
});

export type CycleAtMomentsJson = z.infer<typeof cycleAtMomentsFromJsonSchema>;

export const fillDataFromTool = (
  uiResult: UiResult,
  cycleAtMomentsFromTool: CycleAtMoment[],
) => {
  if (uiResult.cycleAtSweetScent === 0) {
    // No JSON was loaded.
    uiResult.cycleAtSweetScent = MOST_PROBABLE_CYCLE_AT_SWEET_SCENT; // Most probable cycle at Sweet Scent
  }

  const { uiCycleAtMoments } = uiResult;
  uiCycleAtMoments.forEach((uiCam, i) => {
    const camFromTool = cycleAtMomentsFromTool.find(
      (cam) => cam.moment === uiCam.moment,
    );
    if (camFromTool == null) {
      if (i !== 0) {
        uiCam.dataFromTool.cycleFromSweetScent =
          uiCycleAtMoments[i - 1].dataFromTool.cycleFromSweetScent; // assume 0 increment.
      }
    } else {
      uiCam.dataFromTool.cycleFromSweetScent = camFromTool.cycle;
      if (i !== 0) {
        uiCam.dataFromTool.cycleFromSweetScentIncrement =
          uiCam.dataFromTool.cycleFromSweetScent -
          uiCycleAtMoments[i - 1].dataFromTool.cycleFromSweetScent;
      }
    }

    const totalCycle =
      uiCam.dataFromTool.cycleFromSweetScent + uiResult.cycleAtSweetScent;
    let cycleAfterVblank = totalCycle;
    let vblankCount = 0;
    while (cycleAfterVblank > VBLANK_FREQ) {
      const vblankDur =
        uiResult.vblankDurations[vblankCount] ?? MOST_PROBABLE_VBLANK_CYCLE;
      cycleAfterVblank = cycleAfterVblank - VBLANK_FREQ + vblankDur;
      vblankCount++;
    }

    uiCam.dataFromTool.cycle = cycleAfterVblank;
    uiCam.dataFromTool.frame = uiResult.frameAtSweetScent + vblankCount;
  });

  uiResult.methodFromTool = getMethodAccordingToTool(uiResult);
};

export const fillDataFromJson = (
  uiResult: UiResult,
  json: CycleAtMomentsJson,
) => {
  /* 
  Example:
    json has [
      {"moment":"SweetScentWildEncounter",        "cycle":54797, "frame":2026},
      {"moment":"ChooseWildMonIndex_Land_Random", "cycle":94959, "frame":2026},
      {"moment":"VblankIntr_End",                 "cycle":50235, "frame":2027},
      {"moment":"CreateBoxMon_RandomIvs1",        "cycle":60589, "frame":2027},
      {"moment":"CreateBoxMon_RandomIvs2",        "cycle":102544, "frame":2027},
    ]
    
    uiResults.dataFromData will become: [
     {"moment":"SweetScentWildEncounter",        "cycleFromSweetScent":54797}
     {"moment":"ChooseWildMonIndex_Land_Random", "cycleFromSweetScent":94959}
     {"moment":"CreateBoxMon_RandomIvs1",        "cycleFromSweetScent":60589 + (280896 - 50235)}
     {"moment":"CreateBoxMon_RandomIvs2",        "cycleFromSweetScent":102544 + (280896 - 50235)}
   ]
  */

  uiResult.methodFromJson = json.method;

  uiResult.vblankDurations = json.cycleAtMoments
    .filter((cam) => {
      return cam.moment === "VblankIntr_End";
    })
    .map((cam) => cam.cycle);

  const { uiCycleAtMoments } = uiResult;

  json.cycleAtMoments.forEach((cam) => {
    if (cam.moment === "VblankIntr_End") {
      return;
    }

    const uiResultIdx = uiCycleAtMoments.findIndex(
      (uiRes) => uiRes.moment === cam.moment,
    );
    if (uiResultIdx === -1) {
      return;
    }

    const previousVblanksIncr = json.cycleAtMoments
      .filter((vblank) => {
        return vblank.moment === "VblankIntr_End" && vblank.frame <= cam.frame;
      })
      .map((vblank) => {
        return VBLANK_FREQ - vblank.cycle;
      })
      .reduce((prev, cur) => prev + cur, 0);

    const { dataFromJson } = uiCycleAtMoments[uiResultIdx];
    dataFromJson.cycle = cam.cycle;
    dataFromJson.frame = cam.frame;
    dataFromJson.cycleFromSweetScent =
      uiResultIdx === 0
        ? 0
        : cam.cycle +
          previousVblanksIncr -
          uiCycleAtMoments[0].dataFromJson.cycle;

    if (uiResultIdx !== 0) {
      dataFromJson.cycleFromSweetScentIncrement =
        dataFromJson.cycleFromSweetScent -
        uiCycleAtMoments[uiResultIdx - 1].dataFromJson.cycleFromSweetScent;
    }
  });

  const firstCam = uiResult.uiCycleAtMoments[0];
  if (firstCam != null) {
    uiResult.cycleAtSweetScent = firstCam.dataFromJson.cycle;
    uiResult.frameAtSweetScent = firstCam.dataFromJson.frame;
    uiResult.advanceAtSweetScent = json.cycleAtMoments[0].adv;
  }
};

export const calculateDataDiff = (uiResult: UiResult) => {
  uiResult.uiCycleAtMoments.forEach((uiCam) => {
    uiCam.dataDiff.cycleFromSweetScent =
      uiCam.dataFromTool.cycleFromSweetScent -
      uiCam.dataFromJson.cycleFromSweetScent;

    uiCam.dataDiff.cycleFromSweetScentIncrement =
      uiCam.dataFromTool.cycleFromSweetScentIncrement -
      uiCam.dataFromJson.cycleFromSweetScentIncrement;
  });
};

export const getMethodAccordingToTool = (
  uiResult: UiResult,
): Gen3Method | null => {
  let method: Gen3Method = "Wild5";
  for (const cam of uiResult.uiCycleAtMoments) {
    if (cam.dataFromTool.frame !== uiResult.frameAtSweetScent) {
      // first VBlank
      return method;
    }
    if (cam.moment === "CreateMonWithNature_RandomPidLowLast") {
      method = "Wild3";
    }
    if (cam.moment === "CreateMonWithNature_RandomPidHighLast") {
      method = "Wild2";
    }
    if (cam.moment === "CreateBoxMon_RandomIvs1") {
      method = "Wild4";
    }
  }

  return "Wild1";
};
