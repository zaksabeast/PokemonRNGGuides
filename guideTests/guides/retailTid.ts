import { expect } from "vitest";
import type { Route } from "~/routes/defs";
import { renderGuide } from "../utils/render";
import {
  getButton,
  getByLabel,
  getFirstTableRow,
  getSelectByLabel,
  getShownOptionLabel,
  getStep,
  getText,
  readTimer,
  selectOption,
  selectRadio,
  typeInto,
  waitFor,
  type TableRow,
  type TimerPhase,
} from "../utils/dom";
import { createGoToStep } from "../utils/stepper";

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
export const openRetailTidGuide = async (route: Route = "/dppt-tid-sid/") => {
  const container = renderGuide(route);
  const setUp = await waitFor(() => getStep(container, STEPS.setUp));
  const pickTid = getStep(container, STEPS.pickTid);
  const hitTarget = getStep(container, STEPS.hitTarget);
  const calibrate = getStep(container, STEPS.calibrate);
  const goToStep = createGoToStep(container, [
    setUp,
    pickTid,
    hitTarget,
    calibrate,
  ]);

  const hitTargetInstructions = () =>
    [...hitTarget.querySelectorAll("li")].map(getText);

  const timer = () => readTimer(hitTarget);

  const timerAfterChange = (previous: TimerPhase[]) =>
    waitFor(() => {
      const current = timer();
      expect(current).not.toEqual([]);
      expect(current).not.toEqual(previous);

      return current;
    });

  const threeDsOffsetSelect = () => getSelectByLabel(hitTarget, "3ds Offset");

  const threeDsOffset = () => getShownOptionLabel(threeDsOffsetSelect());

  return {
    setGame: (game: string) => {
      return selectOption(getSelectByLabel(setUp, "Game"), game);
    },

    setConsole: (option: string) => {
      selectRadio(getByLabel(setUp, "Console"), option);
    },

    hitTargetText: () => getText(hitTarget),

    waitForHitTargetText: (text: string) => {
      return waitFor(() => expect(getText(hitTarget)).toContain(text));
    },

    threeDsOffset: () => waitFor(threeDsOffset),

    setThreeDsOffset: async (offset: string) => {
      const select = await waitFor(threeDsOffsetSelect);

      await selectOption(select, offset);
    },

    waitForThreeDsOffset: (offset: string) => {
      return waitFor(() => expect(threeDsOffset()).toBe(offset));
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

    timerAfterChange,

    /** Overrides the timer's target second from its Edit view */
    setTargetSeconds: async (targetSeconds: string) => {
      await goToStep(STEPS.hitTarget);
      const before = timer();
      getButton(hitTarget, "Edit").click();
      const field = await waitFor(() =>
        getByLabel(hitTarget, "Target Seconds"),
      );

      typeInto(field, targetSeconds);
      getButton(hitTarget, "Set Timer").click();

      return timerAfterChange(before);
    },

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
