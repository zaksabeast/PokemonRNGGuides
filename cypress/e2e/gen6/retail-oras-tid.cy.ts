import { testRngTool } from "../../support/utils/rngTool";
import type { FormState } from "~/rngToolsUi/gen6/orasId";

describe("rng tool", () => {
  it("works", () => {
    testRngTool<Omit<FormState, "date" | "time" | "filter">>({
      url: "/retail-oras-tid",
      form: {
        seed: "aabbccdd",
        initialAdvances: "10",
        maxAdvances: "100",
        onlyCurrentSeed: { type: "switch", value: true },
      },
    });
  });
});
