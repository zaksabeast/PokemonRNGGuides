import { IdFilter } from "~/types";
import { testRngTool } from "../../support/utils/rngTool";
import type { FormState as Step0FormState } from "~/rngToolsUi/gen3/rstid/rstid";
import type { FormState as Step1FormState } from "~/rngToolsUi/gen3/rstid/searcher";

type FlatFilter = {
  [key in keyof IdFilter as `filter.${key}`]: IdFilter[key];
};

describe("rng tool", () => {
  it("works", () => {
    testRngTool<
      Omit<Step0FormState & FlatFilter, "offset" | "filter" | "filter.value1">
    >({
      parentSelector: "#step-0",
      url: "/retail-rubysapphire-tid",
      form: {
        initial_advances: "100",
        max_advances: "10000",
        "filter.type": { type: "select", value: "PID" },
        "filter.value0": "aabb",
      },
      partialFirstColumnValues: [
        {
          type: "any",
        },
        "0:02:11",
        "26775",
        "49710",
        "5463",
      ],
    });

    cy.get("#select_rs_tid_advance").click();

    testRngTool<Omit<Step1FormState, "offset">>({
      parentSelector: "#step-1",
      form: {
        initial_advances: "7870",
        max_advances: "20",
        hit_tid: "49710",
      },
      partialFirstColumnValues: [
        {
          type: "any",
        },
        "1",
        "49710",
        "36816",
      ],
    });
  });
});
