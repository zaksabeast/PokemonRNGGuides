import { testRngTool } from "../../support/utils/rngTool";
import type { FormState as PickStarterFormState } from "~/rngToolsUi/gen4/starters/pickStarter";
import type { FormState as CalibrateFormState } from "~/rngToolsUi/gen4/starters/calibrate";

describe("rng tool", () => {
  it("works", () => {
    cy.visit("/retail-dppt-starter");
    cy.wait(500);

    cy.get("#stepper-next-button").click();

    testRngTool<
      Omit<
        PickStarterFormState,
        "platinum_target_advance" | "filter_hidden_power" | "filter_stats"
      >
    >({
      parentSelector: "#step-1",
      form: {
        tid: "23997",
        sid: "9155",
        year: "2025",
        species: { type: "select", value: "Chimchar" },
        min_delay: "55",
        max_delay: "55",
        filter_shiny: { type: "switch", value: true },
        filter_nature: { type: "select", value: "Sassy" },
        filter_ability: { type: "select", value: "Second" },
        filter_gender: { type: "select", value: "Male" },
        filter_max_ivs: { type: "ivs", value: "31/31/1/1/4/31" },
        filter_min_ivs: { type: "ivs", value: "31/31/1/1/4/31" },
        force_second: "30",
      },
      partialFirstColumnValues: [
        { type: "any" },
        "Yes",
        "Sassy",
        "Second",
        "Male",
        "31",
        "31",
        "1",
        "1",
        "4",
        "31",
        "5DBD23C3",
        "55",
        "30",
        "72170050",
      ],
    });

    cy.get("#select_gen4_starter").click();

    cy.get("#step-2").contains("Jan 25, 2025");
    cy.get("#step-2").contains("23:59");

    cy.get("#stepper-next-button").click();

    testRngTool<CalibrateFormState>({
      parentSelector: "#step-3",
      form: {
        gender: { type: "radio", value: "Male" },
        nature: { type: "select", value: "Impish" },
        filter_characteristic: {
          type: "select",
          value: "Likes To Thrash About",
        },
        level: { type: "radio", value: "5" },
        hpStat: { type: "radio", value: "19" },
        atkStat: { type: "radio", value: "12" },
        defStat: { type: "radio", value: "11" },
        spaStat: { type: "radio", value: "10" },
        spdStat: { type: "radio", value: "9" },
        speStat: { type: "radio", value: "11" },
      },
      partialFirstColumnValues: [
        { type: "any" },
        "0",
        "+4",
        "0",
        { type: "any" },
        "72170050",
        "30",
      ],
    });
  });
});
