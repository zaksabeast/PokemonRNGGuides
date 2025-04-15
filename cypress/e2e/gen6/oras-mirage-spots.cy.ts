import { testRngTool } from "../../support/utils/rngTool";
import type { FormState } from "~/rngToolsUi/gen6/orasMirageSpot";

describe("rng tool", () => {
  it("works", () => {
    testRngTool<Omit<FormState, "startDate" | "maxAdvances">>({
      url: "/oras-mirage-spots",
      form: {
        seed: "aabbccdd",
        filterSpecies: { type: "select", value: "Ditto" },
        tid: "12345",
      },
    });
  });
});
