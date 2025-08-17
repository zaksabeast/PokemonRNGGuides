import { testRngTool } from "../../support/utils/rngTool";
import type { FormState as EmeraldPickupEggFormState } from "~/rngToolsUi/gen3/emeraldPickupEgg";
import type { FormState as EmeraldHeldEggFormState } from "~/rngToolsUi/gen3/emeraldHeldEgg";
import { getFormSelector } from "../../support/utils/formSelector";

describe("pickup egg", () => {
  it("works", () => {
    testRngTool<EmeraldPickupEggFormState>({
      url: "/emulator-emerald-egg",
      parentSelector: getFormSelector("emerald_pickup_egg_form"),
      form: {
        seed: "aabb",
        initial_advances: "10",
        max_advances: "100",
        delay: "3",
        parent1_ivs: { type: "ivs", value: "31/31/31/31/31/31" },
        parent2_ivs: { type: "ivs", value: "31/31/31/31/31/31" },
        filter_min_ivs: { type: "ivs", value: "5/31/14/30/31/0" },
        filter_max_ivs: { type: "ivs", value: "5/31/14/30/31/0" },
        method: { type: "select", value: "Alternate" },
      },
      partialFirstColumnValues: ["98", "5", "31", "14", "30", "31", "0"],
    });
  });
});

describe("held egg", () => {
  it("works", () => {
    testRngTool<EmeraldHeldEggFormState>({
      url: "/emulator-emerald-egg",
      parentSelector: getFormSelector("emerald_held_egg_form"),
      form: {
        female_has_everstone: { type: "switch", value: true },
        calibration: "20",
        compatability: {
          type: "select",
          value: "The two seem to get along very well",
        },
        delay: "10",
        egg_species: { type: "select", value: "Bulbasaur" },
        female_nature: { type: "select", value: "Hardy" },
        filter_gender: { type: "select", value: "Male" },
        filter_nature: { type: "select", value: "Hardy" },
        filter_shiny: { type: "switch", value: true },
        initial_advances: "50",
        max_advances: "1000",
        max_redraw: "15",
        min_redraw: "10",
        sid: "37644",
        tid: "64291",
      },
      partialFirstColumnValues: ["21", "11", "930CFB23"],
    });
  });
});
