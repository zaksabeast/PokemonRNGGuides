import { testRngTool } from "../../support/utils/rngTool";
import type { FormState } from "~/rngToolsUi/gen6/orasId";

describe("rng tool", () => {
  it("works", () => {
    testRngTool<Omit<FormState, "date" | "time" | "filter">>({
      url: "/retail-oras-tid",
      form: {
        seed: "aabbccdd",
        initial_advances: "10",
        max_advances: "100",
        only_current_seed: { type: "switch", value: true },
      },
    });
  });
});
