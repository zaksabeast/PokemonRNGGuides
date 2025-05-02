import type { FormState as Gen5TimerFormState } from "~/rngToolsUi/timer/gen5/entralinkPlus";
import { testRngTool } from "../../../support/utils/rngTool";
import { radio } from "../../../support/utils/components/radio";
import { AssertableForm, form } from "../../../support/utils/form";
import { tab } from "../../../support/utils/components/tab";
import { select } from "../../../support/utils/components/select";

type BaseFormState = Omit<
  Gen5TimerFormState,
  "delayHit" | "secondHit" | "advanceHit"
>;

const tabContentsSelector = "#rc-tabs-1-panel-gen5";

const afterVisit = () => {
  tab.click({ dataNodeKey: "gen5" });
  select.set({
    name: "gen5-timer-mode",
    value: "Entralink+",
  });
  radio.set({
    parentSelector: tabContentsSelector,
    name: "timerDisplay",
    value: "showAllTimers",
  });
};

describe("gen 5 entralink+ timer", () => {
  it("sets the timer", () => {
    testRngTool<BaseFormState>({
      url: "/mystic-timer",
      parentSelector: tabContentsSelector,
      afterVisit,
      form: {
        console: { type: "select", value: "3DS" },
        minTimeMs: "14001",
        targetDelay: "1201",
        targetSecond: "51",
        targetAdvance: "101",
        calibration: "-94",
        entralinkCalibration: "255",
        frameCalibration: "1",
      },
    });
    const expected = ["31:281", "19:913", "120:648"];
    cy.get(`${tabContentsSelector}  .ant-progress`).each((element, index) => {
      cy.wrap(element).contains(expected[index]);
    });
  });

  it("adjusts correctly", () => {
    testRngTool<Gen5TimerFormState>({
      url: "/mystic-timer",
      parentSelector: tabContentsSelector,
      afterVisit,
      form: {
        console: { type: "select", value: "3DS" },
        minTimeMs: "14001",
        targetDelay: "1201",
        targetSecond: "51",
        targetAdvance: "101",
        calibration: "-94",
        entralinkCalibration: "255",
        frameCalibration: "1",
        delayHit: "1200",
        secondHit: "50",
        advanceHit: "100",
      },
    });

    form.assert<Gen5TimerFormState>({
      form: {
        console: { type: "select", value: "3DS" },
        minTimeMs: "14001",
        targetDelay: "1201",
        targetSecond: "51",
        targetAdvance: "101",
        calibration: "-65",
        entralinkCalibration: "254",
        frameCalibration: "1195.531",
        delayHit: "",
        secondHit: "",
        advanceHit: "",
      },
    });

    const expected = ["31:310", "19:885", "121:843"];
    cy.get(`${tabContentsSelector}  .ant-progress`).each((element, index) => {
      cy.wrap(element).contains(expected[index]);
    });
  });

  it("persists base fields between page reloads", () => {
    const formState: AssertableForm<BaseFormState> = {
      console: { type: "select", value: "3DS" },
      minTimeMs: "14001",
      targetDelay: "1201",
      targetSecond: "51",
      targetAdvance: "101",
      calibration: "-94",
      entralinkCalibration: "255",
      frameCalibration: "1",
    };
    testRngTool<BaseFormState>({
      url: "/mystic-timer",
      parentSelector: tabContentsSelector,
      afterVisit,
      form: formState,
    });

    cy.reload();

    form.assert<BaseFormState>({
      form: formState,
    });

    const expected = ["31:281", "19:913", "120:648"];
    cy.get(`${tabContentsSelector}  .ant-progress`).each((element, index) => {
      cy.wrap(element).contains(expected[index]);
    });
  });

  it("does not persist adjustable fields between page reloads", () => {
    testRngTool<Gen5TimerFormState>({
      url: "/mystic-timer",
      parentSelector: tabContentsSelector,
      afterVisit,
      form: {
        console: { type: "select", value: "3DS" },
        minTimeMs: "14001",
        targetDelay: "1201",
        targetSecond: "51",
        targetAdvance: "101",
        calibration: "-94",
        entralinkCalibration: "255",
        frameCalibration: "1",
        delayHit: "1200",
        secondHit: "50",
        advanceHit: "100",
      },
    });

    cy.reload();

    form.assert<Gen5TimerFormState>({
      form: {
        console: { type: "select", value: "3DS" },
        minTimeMs: "14001",
        targetDelay: "1201",
        targetSecond: "51",
        targetAdvance: "101",
        calibration: "-65",
        entralinkCalibration: "254",
        frameCalibration: "1195.531",
        delayHit: "",
        secondHit: "",
        advanceHit: "",
      },
    });

    const expected = ["31:310", "19:885", "121:843"];
    cy.get(`${tabContentsSelector}  .ant-progress`).each((element, index) => {
      cy.wrap(element).contains(expected[index]);
    });
  });
});
