import { testRngTool } from "../../support/utils/rngTool";
import type { FormState } from "~/rngToolsUi/gen3/tidsid";

describe("rs", () => {
  it("works", () => {
    testRngTool<Omit<FormState, "tid" | "date" | "time" | "filter">>({
      url: "/rs-tidsid-generator",
      form: {
        seed: "aabb",
        offset: "10",
        initial_advances: "100",
        max_advances: "90000",
        rs_input_type: { type: "select", value: "Seed" },
      },
      partialFirstColumnValues: ["18614", "0", "59190", "7398"],
    });
  });
});
