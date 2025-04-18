import { testRngTool } from "../../support/utils/rngTool";
import type { FormState } from "~/rngToolsUi/gen3/sid";

describe("rng tool", () => {
  it("works", () => {
    testRngTool<FormState>({
      url: "/emerald-sid-feebas",
      form: {
        tid: "16463",
        feebasSeed: "2f58",
        initialAdvances: "10",
        maxAdvances: "10000",
      },
      partialFirstColumnValues: ["40641"],
    });
  });
});
