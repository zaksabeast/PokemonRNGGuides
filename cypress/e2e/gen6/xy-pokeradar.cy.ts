import { testRngTool } from "../../support/utils/rngTool";
import type { FormState } from "~/rngToolsUi/gen6/xyPokeRadar";

describe("rng tool", () => {
  it("works", () => {
    testRngTool<Omit<FormState, "date" | "time">>({
      url: "/xy-pokeradar",
      form: {
        bonus_music: { type: "switch", value: false },
        filter_shiny: { type: "switch", value: false },
        chain: "10",
        initial_advances: "10",
        max_advances: "10",
        party_count: "6",
        state0: "aaaaaaaa",
        state1: "bbbbbbbb",
        state2: "cccccccc",
        state3: "dddddddd",
      },
      partialFirstColumnValues: [
        { type: "any" },
        "10",
        "No",
        "19FDA0AA, 3F3AE977, 5A76A91F, 138CED66",
      ],
    });
  });
});
