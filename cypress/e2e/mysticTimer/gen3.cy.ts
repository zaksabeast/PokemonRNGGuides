import type { FormState as Gen3TimerFormState } from "~/rngToolsUi/timer/gen3";
import { testRngTool } from "../../support/utils/rngTool";
import { radio } from "../../support/utils/components/radio";
import { AssertableForm, form } from "../../support/utils/form";
import { tab } from "../../support/utils/components/tab";

type BaseFormState = Omit<Gen3TimerFormState, "frameHit">;

const tabContentsSelector = "#rc-tabs-1-panel-gen3";

const afterVisit = () => {
  tab.click({ dataNodeKey: "gen3" });
  radio.set({
    parentSelector: tabContentsSelector,
    name: "timerDisplay",
    value: "showAllTimers",
  });
};

describe("gen 3 timer", () => {
  it("sets the timer", () => {
    testRngTool<BaseFormState>({
      url: "/mystic-timer",
      parentSelector: tabContentsSelector,
      afterVisit,
      form: {
        console: { type: "select", value: "3DS" },
        preTimer: "1000",
        targetFrame: "500",
        calibration: "70",
      },
    });
    const expected = ["01:000", "08:427"];
    cy.get(`${tabContentsSelector} .ant-progress`).each((element, index) => {
      cy.wrap(element).contains(expected[index]);
    });
  });

  it("adjusts correctly", () => {
    testRngTool<Gen3TimerFormState>({
      url: "/mystic-timer",
      parentSelector: tabContentsSelector,
      afterVisit,
      form: {
        console: { type: "select", value: "3DS" },
        preTimer: "1000",
        targetFrame: "500",
        calibration: "70",
        frameHit: "450",
      },
    });

    form.assert<Gen3TimerFormState>({
      parentSelector: tabContentsSelector,
      form: {
        console: { type: "select", value: "3DS" },
        preTimer: "1000",
        targetFrame: "500",
        calibration: "905.756",
        frameHit: "",
      },
    });

    const expected = ["01:000", "09:263"];
    cy.get(`${tabContentsSelector} .ant-progress`).each((element, index) => {
      cy.wrap(element).contains(expected[index]);
    });
  });

  it("persists base fields between page reloads", () => {
    const formState: AssertableForm<BaseFormState> = {
      console: { type: "select", value: "3DS" },
      preTimer: "1000",
      targetFrame: "500",
      calibration: "70",
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

    const expected = ["01:000", "08:427"];
    cy.get(`${tabContentsSelector} .ant-progress`).each((element, index) => {
      cy.wrap(element).contains(expected[index]);
    });
  });

  it("does not persist adjustable fields between page reloads", () => {
    testRngTool<Gen3TimerFormState>({
      url: "/mystic-timer",
      parentSelector: tabContentsSelector,
      afterVisit,
      form: {
        console: { type: "select", value: "3DS" },
        preTimer: "1000",
        targetFrame: "500",
        calibration: "70",
        frameHit: "450",
      },
    });

    cy.reload();
    cy.wait(500);

    form.assert<Gen3TimerFormState>({
      parentSelector: tabContentsSelector,
      form: {
        console: { type: "select", value: "3DS" },
        preTimer: "1000",
        targetFrame: "500",
        calibration: "905.756",
        frameHit: "",
      },
    });

    const expected = ["01:000", "09:263"];
    cy.get(`${tabContentsSelector} .ant-progress`).each((element, index) => {
      cy.wrap(element).contains(expected[index]);
    });
  });
});
