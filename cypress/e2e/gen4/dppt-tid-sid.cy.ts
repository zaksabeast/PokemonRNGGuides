import { testRngTool } from "../../support/utils/rngTool";
import type { FormState as SearchFormState } from "~/rngToolsUi/gen4/id/idSearcher";
import type { FormState as CalibrateFormState } from "~/rngToolsUi/gen4/id/calibrateId";

describe("rng tool", () => {
  it("works", () => {
    cy.visit("/dppt-tid-sid");
    cy.wait(500);

    cy.get("#stepper-next-button").click();

    testRngTool<
      Omit<
        SearchFormState,
        | "id_type"
        | "max_shiny_odds"
        | "target_gender"
        | "target_nature"
        | "target_species"
        | "tid"
        | "id_filter"
      >
    >({
      parentSelector: "#step-1",
      form: {
        year: "2025",
        min_delay: "6600",
        max_delay: "6601",
        force_second: "30",
      },
      partialFirstColumnValues: [{ type: "any" }, "5194", "5199"],
    });

    cy.get("#select_id4_target").click();

    cy.get("#step-2").contains("Jan 1, 2025");
    cy.get("#step-2").contains("21:06");

    cy.get("#stepper-next-button").click();

    testRngTool<CalibrateFormState>({
      parentSelector: "#step-3",
      form: {
        tid: "59485",
      },
      partialFirstColumnValues: [{ type: "any" }, { type: "any" }, "+34", "+5"],
    });
  });
});
