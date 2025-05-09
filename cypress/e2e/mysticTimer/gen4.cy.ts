import type { FormState as Gen4TimerFormState } from "~/rngToolsUi/timer/gen4";
import { testRngTool } from "../../support/utils/rngTool";
import { radio } from "../../support/utils/components/radio";
import { AssertableForm, form } from "../../support/utils/form";
import { tab } from "../../support/utils/components/tab";

type BaseFormState = Omit<Gen4TimerFormState, "delayHit">;

const tabContentsSelector = "#rc-tabs-1-panel-gen4";

const afterVisit = () => {
  tab.click({ dataNodeKey: "gen4" });
  radio.set({
    parentSelector: tabContentsSelector,
    name: "timerDisplay",
    value: "showAllTimers",
  });
};

describe("gen 4 timer", () => {
  it("sets the timer", () => {
    testRngTool<BaseFormState>({
      url: "/mystic-timer",
      parentSelector: tabContentsSelector,
      afterVisit,
      form: {
        console: { type: "select", value: "3DS" },
        minTimeMs: "1000",
        calibratedDelay: "1000",
        calibratedSeconds: "3",
        targetDelay: "1000",
        targetSeconds: "60",
      },
    });
    const expected = ["57:207", "02:992"];
    cy.get(`${tabContentsSelector}  .ant-progress`).each((element, index) => {
      cy.wrap(element).contains(expected[index]);
    });
  });

  it("adjusts correctly", () => {
    testRngTool<Gen4TimerFormState>({
      url: "/mystic-timer",
      parentSelector: tabContentsSelector,
      afterVisit,
      form: {
        console: { type: "select", value: "3DS" },
        minTimeMs: "1000",
        calibratedDelay: "1000",
        calibratedSeconds: "3",
        targetDelay: "1000",
        targetSeconds: "60",
        delayHit: "990",
      },
    });

    form.assert<Gen4TimerFormState>({
      parentSelector: tabContentsSelector,
      form: {
        console: { type: "select", value: "3DS" },
        minTimeMs: "1000",
        calibratedDelay: "989",
        calibratedSeconds: "3",
        targetDelay: "1000",
        targetSeconds: "60",
        delayHit: "",
      },
    });

    const expected = ["57:024", "03:175"];
    cy.get(`${tabContentsSelector}  .ant-progress`).each((element, index) => {
      cy.wrap(element).contains(expected[index]);
    });
  });

  it("persists base fields between page reloads", () => {
    const formState: AssertableForm<BaseFormState> = {
      console: { type: "select", value: "3DS" },
      minTimeMs: "1000",
      calibratedDelay: "1000",
      calibratedSeconds: "3",
      targetDelay: "1000",
      targetSeconds: "60",
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

    const expected = ["57:207", "02:992"];
    cy.get(`${tabContentsSelector}  .ant-progress`).each((element, index) => {
      cy.wrap(element).contains(expected[index]);
    });
  });

  it("does not persist adjustable fields between page reloads", () => {
    testRngTool<Gen4TimerFormState>({
      url: "/mystic-timer",
      parentSelector: tabContentsSelector,
      afterVisit,
      form: {
        console: { type: "select", value: "3DS" },
        minTimeMs: "1000",
        calibratedDelay: "1000",
        calibratedSeconds: "3",
        targetDelay: "1000",
        targetSeconds: "60",
        delayHit: "990",
      },
    });

    cy.reload();
    cy.wait(500);

    form.assert<Gen4TimerFormState>({
      parentSelector: tabContentsSelector,
      form: {
        console: { type: "select", value: "3DS" },
        minTimeMs: "1000",
        calibratedDelay: "989",
        calibratedSeconds: "3",
        targetDelay: "1000",
        targetSeconds: "60",
        delayHit: "",
      },
    });

    const expected = ["57:024", "03:175"];
    cy.get(`${tabContentsSelector}  .ant-progress`).each((element, index) => {
      cy.wrap(element).contains(expected[index]);
    });
  });
});
