import { testRngTool } from "../../support/utils/rngTool";
import type { FormState } from "~/rngToolsUi/gen2/crystalPokemon";

describe("rng tool", () => {
  it("works", () => {
    testRngTool<Omit<FormState, "advanceCount">>({
      url: "/gen2-starters",
      form: {
        adivIndex: "1234",
        sdivIndex: "1234",
        div: "aa",
        startAdvance: "10",
        state: "bbcc",
        filter: { type: "select", value: "Any" },
      },
      partialFirstColumnValues: ["1383", "56c4"],
    });
  });
});
