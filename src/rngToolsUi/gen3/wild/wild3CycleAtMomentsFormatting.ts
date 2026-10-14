/* eslint-disable no-param-reassign */
/*
 * This file contains data transformation and formatting functions that intentionally
 * mutate their parameters.
 */

import {
  CycleFrameMoment,
  Gen3Method,
  Wild3GeneratorCycleOpts,
} from "~/rngTools";
import { z } from "zod";
import { gen3Methods } from "~/types";
import { match } from "ts-pattern";

export const VBLANK_FREQ = 280_896;

// TODO: Revamp the logic to support Feebas.

// TODO: Improve accuracy for RockSmash and Fishing by using a distinct distribution.
export const MOST_PROBABLE_CYCLE_AT_SWEET_SCENT = 55_000;
export const MOST_PROBABLE_VBLANK_CYCLE = 60_000;

export type UiResult = {
  methodFromJson: Gen3Method | null;
  methodFromTool: Gen3Method | null;
  frameAtSweetScent: number;
  advanceAtSweetScentFromJson: number;
  uiCycleAtMoments: UiResultCycleAtMoment[];
  vblankDurations: number[];
  errorMsg: string;
};

export type UiResultCycleAtMoment = {
  uid: string;
  moment: string;
  dataFromJson: {
    hasValue: boolean;
    cycle: number;
    frame: number;
    totalCycleWithoutVblank: number;
    totalCycleWithoutVblankIncrement: number;
    totalCycle: number;
  };
  dataFromTool: {
    hasValue: boolean;
    cycle: number;
    frame: number;
    totalCycleWithoutVblank: number;
    totalCycleWithoutVblankIncrement: number;
    totalCycle: number;
  };
  dataDiff: {
    totalCycleWithoutVblank: number | null;
    totalCycleWithoutVblankIncrement: number | null;
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
  vblankDurations: z.array(z.number()),
});

export type CycleAtMomentsJson = z.infer<typeof cycleAtMomentsFromJsonSchema>;

const createEmptyCamData = (): UiResultCycleAtMoment["dataFromJson"] => {
  return {
    hasValue: false,
    cycle: 0,
    frame: 0,
    totalCycle: 0,
    totalCycleWithoutVblank: 0,
    totalCycleWithoutVblankIncrement: 0,
  };
};

// uiResult has no cycles at this point
export const fillDataFromTool = (
  uiResult: UiResult,
  distFromTool: {
    cycle_opts: Wild3GeneratorCycleOpts;
    cycle_at_moments: CycleFrameMoment[];
  },
) => {
  const cycleOpts = match(distFromTool.cycle_opts)
    .with(
      { CycleAtMomentWithEmuLog: {} },
      ({ CycleAtMomentWithEmuLog }) => CycleAtMomentWithEmuLog,
    )
    .otherwise(() => null);

  uiResult.uiCycleAtMoments = distFromTool.cycle_at_moments.map((cam, i) => {
    const sameMomentCount = distFromTool.cycle_at_moments
      .slice(0, i)
      .filter((cam2) => cam.moment === cam2.moment).length;

    const totalCycle = cam.cycle + cam.frame * VBLANK_FREQ;

    let vblankCycle = 0;
    for (let i = 0; i < cam.frame; i++) {
      vblankCycle += cycleOpts?.vblank_cycles[i] ?? MOST_PROBABLE_VBLANK_CYCLE;
    }

    return {
      uid: `${cam.moment}#${sameMomentCount}`,
      moment: cam.moment,
      dataFromJson: createEmptyCamData(),
      dataFromTool: {
        cycle: cam.cycle,
        frame: cam.frame,
        totalCycle,
        totalCycleWithoutVblank: totalCycle - vblankCycle,
        totalCycleWithoutVblankIncrement: 0, // init below
        hasValue: true,
      },
      dataDiff: {
        totalCycleWithoutVblank: null,
        totalCycleWithoutVblankIncrement: null,
      },
    };
  });

  uiResult.uiCycleAtMoments.forEach((cam, i) => {
    if (i !== 0) {
      cam.dataFromTool.totalCycleWithoutVblankIncrement =
        cam.dataFromTool.totalCycleWithoutVblank -
        uiResult.uiCycleAtMoments[i - 1].dataFromTool.totalCycleWithoutVblank;
    }
  });

  uiResult.methodFromTool = getMethodAccordingToTool(uiResult);
};

// uiResult already contains data from tool
export const fillDataFromJson = (
  uiResult: UiResult,
  json: CycleAtMomentsJson,
) => {
  uiResult.methodFromJson = json.method;
  uiResult.advanceAtSweetScentFromJson = json.cycleAtMoments[0]?.adv ?? 0;

  uiResult.vblankDurations = json.vblankDurations;

  let lastTreatedCam = -1;
  json.cycleAtMoments.forEach((cam, i) => {
    const sameMomentCount = json.cycleAtMoments
      .slice(0, i)
      .filter((cam2) => cam.moment === cam2.moment).length;
    const uid = `${cam.moment}#${sameMomentCount}`;

    const totalCycle = cam.cycle + cam.frame * VBLANK_FREQ;

    let vblankCycle = 0;
    for (let i = 0; i < cam.frame; i++) {
      vblankCycle += json.vblankDurations[i] ?? MOST_PROBABLE_VBLANK_CYCLE;
    }
    const dataFromJson = {
      cycle: cam.cycle,
      frame: cam.frame,
      totalCycle,
      totalCycleWithoutVblank: totalCycle - vblankCycle,
      totalCycleWithoutVblankIncrement: 0, // init below
      hasValue: true,
    };

    let uiResultIdx = uiResult.uiCycleAtMoments.findIndex(
      (uiRes) => uiRes.uid === uid,
    );
    if (uiResultIdx === -1) {
      uiResult.uiCycleAtMoments.splice(lastTreatedCam + 1, 0, {
        uid,
        moment: cam.moment,
        dataFromJson,
        dataFromTool: createEmptyCamData(),
        dataDiff: {
          totalCycleWithoutVblank: null,
          totalCycleWithoutVblankIncrement: null,
        },
      });
      uiResultIdx = lastTreatedCam + 1;
    } else {
      uiResult.uiCycleAtMoments[uiResultIdx].dataFromJson = dataFromJson;
    }
    lastTreatedCam = uiResultIdx;
  });

  uiResult.uiCycleAtMoments.forEach((cam, i) => {
    if (i !== 0) {
      const prev = uiResult.uiCycleAtMoments[i - 1].dataFromJson;
      if (prev.hasValue) {
        cam.dataFromJson.totalCycleWithoutVblankIncrement =
          cam.dataFromJson.totalCycleWithoutVblank -
          prev.totalCycleWithoutVblank;
      }
    }
  });
};

export const calculateDataDiff = (uiResult: UiResult) => {
  uiResult.uiCycleAtMoments.forEach((uiCam) => {
    if (!uiCam.dataFromTool.hasValue || !uiCam.dataFromJson.hasValue) {
      return;
    }

    const totalCycleWithoutVblankIncrement =
      uiCam.dataFromTool.totalCycleWithoutVblankIncrement -
      uiCam.dataFromJson.totalCycleWithoutVblankIncrement;

    const totalCycleWithoutVblank =
      uiCam.dataFromTool.totalCycleWithoutVblank -
      uiCam.dataFromJson.totalCycleWithoutVblank;

    uiCam.dataDiff = {
      totalCycleWithoutVblank,
      totalCycleWithoutVblankIncrement,
    };
  });
};

// Limitation: It doesn't work for feebas encounters.
export const getMethodAccordingToTool = (
  uiResult: UiResult,
): Gen3Method | null => {
  const moments = uiResult.uiCycleAtMoments.filter(
    (cam) => cam.dataFromTool.hasValue,
  );
  if (moments.length === 0) {
    return null;
  }
  const lastPidLow = moments.findLastIndex(
    (cam) => cam.moment === "CreateMonWithNature_RandomPidLow",
  );
  const lastPidHigh = moments.findLastIndex(
    (cam) => cam.moment === "CreateMonWithNature_RandomPidHigh",
  );
  let method: Gen3Method = "Wild5";
  for (const [index, cam] of moments.entries()) {
    if (cam.dataFromTool.frame !== uiResult.frameAtSweetScent) {
      // first VBlank
      return method;
    }
    if (index === lastPidLow) {
      method = "Wild3";
    }
    if (index === lastPidHigh || cam.moment === "CreateMon") {
      method = "Wild2";
    }
    if (cam.moment === "CreateBoxMon_RandomIvs1") {
      method = "Wild4";
    }
  }

  return "Wild1";
};
