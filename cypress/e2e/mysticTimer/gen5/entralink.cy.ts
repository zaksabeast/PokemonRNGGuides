import type { FormState as Gen5TimerFormState } from "~/rngToolsUi/timer/gen5/entralink";
import { testRngTool } from "../../../support/utils/rngTool";
import { radio } from "../../../support/utils/components/radio";
import { AssertableForm, form } from "../../../support/utils/form";
import { tab } from "../../../support/utils/components/tab";
import { select } from "../../../support/utils/components/select";

type BaseFormState = Omit<Gen5TimerFormState, "delayHit" | "secondHit">;

const tabContentsSelector = "#rc-tabs-1-panel-gen5";

const afterVisit = () => {
  tab.click({ dataNodeKey: "gen5" });
  select.set({
    name: "gen5-timer-mode",
    value: "Entralink",
  });
  radio.set({
    parentSelector: tabContentsSelector,
    name: "timerDisplay",
    value: "showAllTimers",
  });
};

describe("gen 5 entralink timer", () => {
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
        calibration: "-94",
        entralinkCalibration: "255",
      },
    });
    const expected = ["31:281", "19:913"];
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
        calibration: "-94",
        entralinkCalibration: "255",
        delayHit: "1200",
        secondHit: "50",
      },
    });

    form.assert<Gen5TimerFormState>({
      parentSelector: tabContentsSelector,
      form: {
        console: { type: "select", value: "3DS" },
        minTimeMs: "14001",
        targetDelay: "1201",
        targetSecond: "51",
        calibration: "68735",
        entralinkCalibration: "254",
        delayHit: "",
        secondHit: "",
      },
    });

    const expected = ["100:110", "-49:-915"];
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
      calibration: "-94",
      entralinkCalibration: "255",
    };
    testRngTool<BaseFormState>({
      url: "/mystic-timer",
      parentSelector: tabContentsSelector,
      afterVisit,
      form: formState,
    });

    cy.reload();
    cy.wait(500);

    form.assert<BaseFormState>({
      parentSelector: tabContentsSelector,
      form: formState,
    });

    const expected = ["31:281", "19:913"];
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
        calibration: "-94",
        entralinkCalibration: "255",
        delayHit: "1200",
        secondHit: "50",
      },
    });

    cy.reload();
    cy.wait(500);

    form.assert<Gen5TimerFormState>({
      parentSelector: tabContentsSelector,
      form: {
        console: { type: "select", value: "3DS" },
        minTimeMs: "14001",
        targetDelay: "1201",
        targetSecond: "51",
        calibration: "68735",
        entralinkCalibration: "254",
        delayHit: "",
        secondHit: "",
      },
    });

    const expected = ["100:110", "-49:-915"];
    cy.get(`${tabContentsSelector}  .ant-progress`).each((element, index) => {
      cy.wrap(element).contains(expected[index]);
    });
  });
});
