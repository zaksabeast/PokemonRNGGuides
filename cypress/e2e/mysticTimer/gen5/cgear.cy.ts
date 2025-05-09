import type { FormState as Gen5TimerFormState } from "~/rngToolsUi/timer/gen5/cgear";
import { testRngTool } from "../../../support/utils/rngTool";
import { radio } from "../../../support/utils/components/radio";
import { AssertableForm, form } from "../../../support/utils/form";
import { tab } from "../../../support/utils/components/tab";
import { select } from "../../../support/utils/components/select";

type BaseFormState = Omit<Gen5TimerFormState, "delayHit">;

const tabContentsSelector = "#rc-tabs-1-panel-gen5";

const afterVisit = () => {
  tab.click({ dataNodeKey: "gen5" });
  select.set({
    name: "gen5-timer-mode",
    value: "C-Gear",
  });
  radio.set({
    parentSelector: tabContentsSelector,
    name: "timerDisplay",
    value: "showAllTimers",
  });
};

describe("gen 5 cgear timer", () => {
  it("sets the timer", () => {
    testRngTool<BaseFormState>({
      url: "/mystic-timer",
      parentSelector: tabContentsSelector,
      afterVisit,
      form: {
        console: { type: "select", value: "3DS" },
        minTimeMs: "13000",
        targetDelay: "1100",
        targetSecond: "49",
        calibration: "-90",
      },
    });
    const expected = ["30:723", "18:476"];
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
        minTimeMs: "13000",
        targetDelay: "1100",
        targetSecond: "49",
        calibration: "-90",
        delayHit: "1099",
      },
    });

    form.assert<Gen5TimerFormState>({
      parentSelector: tabContentsSelector,
      form: {
        console: { type: "select", value: "3DS" },
        minTimeMs: "13000",
        targetDelay: "1100",
        targetSecond: "49",
        calibration: "-91",
        delayHit: "",
      },
    });

    const expected = ["30:722", "18:477"];
    cy.get(`${tabContentsSelector}  .ant-progress`).each((element, index) => {
      cy.wrap(element).contains(expected[index]);
    });
  });

  it("persists base fields between page reloads", () => {
    const formState: AssertableForm<BaseFormState> = {
      console: { type: "select", value: "3DS" },
      minTimeMs: "13000",
      targetDelay: "1100",
      targetSecond: "49",
      calibration: "-90",
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

    const expected = ["30:723", "18:476"];
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
        minTimeMs: "13000",
        targetDelay: "1100",
        targetSecond: "49",
        calibration: "-90",
        delayHit: "1099",
      },
    });

    cy.reload();
    cy.wait(500);

    form.assert<Gen5TimerFormState>({
      parentSelector: tabContentsSelector,
      form: {
        console: { type: "select", value: "3DS" },
        minTimeMs: "13000",
        targetDelay: "1100",
        targetSecond: "49",
        calibration: "-91",
        delayHit: "",
      },
    });

    const expected = ["30:722", "18:477"];
    cy.get(`${tabContentsSelector}  .ant-progress`).each((element, index) => {
      cy.wrap(element).contains(expected[index]);
    });
  });
});
