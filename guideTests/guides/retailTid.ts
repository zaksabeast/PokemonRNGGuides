import { expect } from "vitest";
import { renderGuide } from "../utils/render";
import {
  getButton,
  getByLabel,
  getFirstTableRow,
  getStep,
  getStepperButton,
  getText,
  isShown,
  readTimer,
  selectRadio,
  typeInto,
  waitFor,
  type TableRow,
  type TimerPhase,
} from "../utils/dom";

/** A TID search result as the results table shows it */
export type IdResult = {
  tid: string;
  sid: string;
  tsv: string;
  delay: string;
  seconds: string;
  natures: string;
  targetGender: string;
  genderRatios: string;
};

const STEPS = { setUp: 0, pickTid: 1, hitTarget: 2, calibrate: 3 };

const toIdResult = ({ cells }: TableRow): IdResult => ({
  tid: cells.TID,
  sid: cells.SID,
  tsv: cells.TSV,
  delay: cells.Delay,
  seconds: cells.Seconds,
  natures: cells.Natures,
  targetGender: cells["Target Gender"],
  genderRatios: cells["Gender Ratios"],
});

/**
 * Drives the Retail TID/SID guide (dppt-tid-sid) the way a user would.
 * This is the only place that knows the guide's steps, labels, and columns.
 */
export const openRetailTidGuide = async () => {
  const container = renderGuide("/dppt-tid-sid/");
  const setUp = await waitFor(() => getStep(container, STEPS.setUp));
  const pickTid = getStep(container, STEPS.pickTid);
  const hitTarget = getStep(container, STEPS.hitTarget);
  const calibrate = getStep(container, STEPS.calibrate);
  const steps = [setUp, pickTid, hitTarget, calibrate];

  const currentStep = () => steps.findIndex(isShown);

  const shownStep = () =>
    waitFor(() => {
      const step = currentStep();
      expect(step).not.toBe(-1);

      return step;
    });

  const moveTowardStep = async (from: number, step: number) => {
    getStepperButton(container, from < step ? "next" : "previous").click();
    await waitFor(() => expect(currentStep()).not.toBe(from));
  };

  const goToStep = async (step: number) => {
    let from = await shownStep();
    while (from !== step) {
      await moveTowardStep(from, step);
      from = await shownStep();
    }
  };

  const hitTargetInstructions = () =>
    [...hitTarget.querySelectorAll("li")].map(getText);

  const timer = () => readTimer(hitTarget);

  return {
    setConsole: (option: string) => {
      selectRadio(getByLabel(setUp, "Console"), option);
    },

    hitTargetText: () => getText(hitTarget),

    waitForHitTargetText: (text: string) => {
      return waitFor(() => expect(getText(hitTarget)).toContain(text));
    },

    /** Searches with the default settings */
    selectFirstSearchResult: async (): Promise<IdResult> => {
      await goToStep(STEPS.pickTid);
      getButton(pickTid, "Generate").click();
      const row = await waitFor(() => getFirstTableRow(pickTid));

      getButton(row.element, "Select").click();
      await waitFor(() =>
        expect(getText(hitTarget)).not.toContain("Unknown date"),
      );

      return toIdResult(row);
    },

    consoleDateTime: () => {
      const [dateStep = "", timeStep = ""] = hitTargetInstructions();

      return {
        date: /date to (.+)\.$/.exec(dateStep)?.[1],
        time: /time to (.+?), but/.exec(timeStep)?.[1],
      };
    },

    timer,

    timerAfterChange: (previous: TimerPhase[]) =>
      waitFor(() => {
        const current = timer();
        expect(current).not.toEqual(previous);

        return current;
      }),

    calibrateTargetText: () =>
      /Target TID: (\d+|\?+) \/ SID: (\d+|\?+)/.exec(getText(calibrate))?.[0],

    /** Enters the TID the game showed and calibrates with the closest result */
    calibrateWith: async (obtainedTid: number) => {
      await goToStep(STEPS.calibrate);
      typeInto(getByLabel(calibrate, "Obtained TID"), String(obtainedTid));
      getButton(calibrate, "Generate").click();
      const row = await waitFor(() => getFirstTableRow(calibrate));

      getButton(row.element, "Calibrate").click();

      return {
        delayOffset: row.cells["Delay Offset"],
        secondOffset: row.cells["Second Offset"],
      };
    },
  };
};

export type RetailTidGuide = Awaited<ReturnType<typeof openRetailTidGuide>>;
