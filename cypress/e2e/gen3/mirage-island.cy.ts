import { testRngTool } from "../../support/utils/rngTool";
import type { FormState } from "~/rngToolsUi/gen3/mirageIsland";

describe("live battery", () => {
  it("works", () => {
    testRngTool<FormState>({
      url: "/emerald-mirage-island",
      form: {
        battery: { type: "radio", value: "Live" },
        rocketLaunchedCount: "10",
      },
      partialFirstColumnValues: ["71", "0 days", "****3A09"],
    });
  });
});

describe("dead battery", () => {
  it("works", () => {
    testRngTool<Omit<FormState, "rocketLaunchedCount">>({
      url: "/emerald-mirage-island",
      form: {
        battery: { type: "radio", value: "Dead" },
      },
      partialFirstColumnValues: ["****0000", "18,625"],
    });
  });
});
