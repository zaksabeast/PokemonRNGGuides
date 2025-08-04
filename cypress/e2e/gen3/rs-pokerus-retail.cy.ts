import { testRngTool } from "../../support/utils/rngTool";
import { form as formUtils } from "../../support/utils/form";
import type { FormState } from "~/rngToolsUi/gen3/pokerus";

describe("rng tool", () => {
  it("filters", () => {
    testRngTool<
      Omit<
        FormState,
        | "entered_hall_of_fame"
        | "had_mass_outbreak"
        | "filter_active"
        | "pickup_pokemon_count"
        | "filter_pickup_items_3"
        | "filter_pickup_items_4"
        | "initial_advance_before_pickup"
        | "targetAdv"
      >
    >({
      url: "/rs-pokerus-retail",
      form: {
        calibration: "10",
        filter_pickup_items_0: { type: "select", value: "Super Potion" },
        filter_pickup_items_1: { type: "select", value: "Full Heal" },
        filter_pickup_items_2: { type: "select", value: "Ultra Ball" },
      },
      partialFirstColumnValues: [
        "26838 | 26923",
        "77052 (+50214) | 77139 (+50216)",
      ],
    });
  });

  it("hall of fame and mass outbreak filters", () => {
    testRngTool<
      Omit<
        FormState,
        | "filter_active"
        | "filter_pickup_items_1"
        | "filter_pickup_items_2"
        | "filter_pickup_items_3"
        | "filter_pickup_items_4"
        | "initial_advance_before_pickup"
        | "targetAdv"
      >
    >({
      url: "/rs-pokerus-retail",
      form: {
        entered_hall_of_fame: { type: "switch", value: true },
        had_mass_outbreak: { type: "switch", value: true },
        calibration: "10",
        pickup_pokemon_count: { type: "radio", value: "1" },
        filter_pickup_items_0: { type: "select", value: "Super Potion" },
      },
      partialFirstColumnValues: [
        "101117 | 101199",
        "101065 (-52) | 101147 (-52)",
      ],
    });
  });

  it("no filters", () => {
    testRngTool<
      Omit<
        FormState,
        | "entered_hall_of_fame"
        | "had_mass_outbreak"
        | "pickup_pokemon_count"
        | "filter_pickup_items_0"
        | "filter_pickup_items_1"
        | "filter_pickup_items_2"
        | "filter_pickup_items_3"
        | "filter_pickup_items_4"
        | "targetAdv"
        | "filter_active"
      >
    >({
      url: "/rs-pokerus-retail",
      afterVisit: () => {
        // Initial advances is hidden until the filter is set to false
        // so we need to set it to false before doing anything else
        formUtils.set<Pick<FormState, "filter_active">>({
          form: {
            filter_active: { type: "switch", value: false },
          },
        });
      },
      form: {
        calibration: "10",
        initial_advance_before_pickup: "10000",
      },
      partialFirstColumnValues: [
        "26838 | 26923",
        "10000 (-16838) | 10084 (-16839)",
      ],
    });
  });
});
