import { testRngTool } from "../../support/utils/rngTool";
import type { FormState } from "~/rngToolsUi/gen6/transporter/transporter";

describe("rng tool", () => {
  it("works", () => {
    testRngTool<
      Omit<
        FormState,
        | "only_current_seed"
        | "filter_shiny"
        | "filter_nature"
        | "filter_ability"
        | "filter_gender"
        | "filter_hidden_power"
        | "filter_stats"
      >
    >({
      url: "/transporter-rng",
      form: {
        seed: "aabb",
        initial_advances: "3",
        max_advances: "5",
        delay: "10",
        tsv: "123",
        transporter_genders: { type: "select", value: "Random Gender" },
        filter_min_ivs: { type: "ivs", value: "3/31/25/29/31/31" },
        filter_max_ivs: { type: "ivs", value: "3/31/25/29/31/31" },
      },
      partialFirstColumnValues: ["6", "1159041F", "2579"],
    });
  });
});
