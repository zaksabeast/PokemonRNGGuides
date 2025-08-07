import { testRngTool } from "../../support/utils/rngTool";
import type { FormState as GenerateFormState } from "~/rngToolsUi/gen3/shinyStarter/generateTidSid";
import type { FormState as FindTargetFormState } from "~/rngToolsUi/gen3/shinyStarter/findTarget";
import type { FormState as CaughtMonFormState } from "~/rngToolsUi/gen3/shinyStarter/caughtMon";
import { radio } from "cypress/support/utils/components/radio";

describe("rng tool", () => {
  it("generates", () => {
    testRngTool<GenerateFormState>({
      url: "/emerald-shiny-starter",
      form: {
        offset: "10",
        tid: "1412",
      },
      partialFirstColumnValues: ["1407 (-3)", "5585"],
      parentSelector: "#generate-tid-sid-for-shiny-starter",
    });

    testRngTool<FindTargetFormState>({
      form: {
        tid: "1407",
        sid: "5585",
      },
      parentSelector: "#find-target-advance",
    });

    cy.get("#find-target-advance + table").should("contain.text", "8106");

    radio.set({
      name: "targetStarter",
      value: "Mudkip",
    });

    cy.get("#target-pokemon-container").should(
      "contain.text",
      "Female, Jolly, HP 20, ATK 13, DEF 10, SPA 9, SPD 10, SPE 9",
    );

    testRngTool<CaughtMonFormState>({
      form: {
        gender: { type: "radio", value: "Male" },
        nature: { type: "select", value: "Adamant" },
        hpStat: { type: "radio", value: "20" },
        atkStat: { type: "radio", value: "13" },
        defStat: { type: "radio", value: "10" },
        spaStat: { type: "radio", value: "9" },
        spdStat: { type: "radio", value: "10" },
        speStat: { type: "radio", value: "9" },
      },
      parentSelector: "#generate-gen3-caught-starter",
      partialFirstColumnValues: ["8106", "7866 (-240)"],
    });
  });
});
