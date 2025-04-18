import { testRngTool } from "../../support/utils/rngTool";
import type { FormState } from "~/rngToolsUi/gen6/orasMirageSpot";

describe("rng tool", () => {
  it("works", () => {
    testRngTool<Omit<FormState, "start_date" | "max_advances">>({
      url: "/oras-mirage-spots",
      form: {
        seed: "aabbccdd",
        filter_species: { type: "select", value: "Ditto" },
        tid: "12345",
      },
    });
  });
});
