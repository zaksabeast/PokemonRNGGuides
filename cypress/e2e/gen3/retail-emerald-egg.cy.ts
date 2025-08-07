import { testRngTool } from "../../support/utils/rngTool";
import type { FormState as PickupFormState } from "~/rngToolsUi/gen3/retailEmeraldEgg/pickupEgg";
import type { FormState as HeldFormState } from "~/rngToolsUi/gen3/retailEmeraldEgg/heldEgg";
import type { FormState as CalibrateHeldFormState } from "~/rngToolsUi/gen3/retailEmeraldEgg/calibrateHeldEgg";
import type { FormState as CalibratePickupFormState } from "~/rngToolsUi/gen3/retailEmeraldEgg/calibratePickupEgg";

describe("rng tool", () => {
  it("works", () => {
    cy.visit("/retail-emerald-egg");
    cy.wait(500);

    cy.get("#select_all_pokenav_trainers").click();
    cy.get("#stepper-next-button").click();

    cy.get("#stepper-next-button").click();

    testRngTool<Omit<HeldFormState, "calibration">>({
      parentSelector: "#step-2",
      form: {
        has_lightning_rod: { type: "switch", value: true },
        has_roamer: { type: "switch", value: true },
        female_has_everstone: { type: "switch", value: true },
        female_nature: { type: "select", value: "Bashful" },
        egg_species: { type: "select", value: "Bulbasaur" },
        compatability: {
          type: "select",
          value: "The two seem to get along very well",
        },
        tid: "34355",
        sid: "37213",
        max_advances: "2000",
        filter_shiny: { type: "switch", value: true },
        filter_nature: { type: "select", value: "Bashful" },
        filter_gender: { type: "select", value: "Male" },
      },
      partialFirstColumnValues: [
        { type: "any" },
        "~0m 33s",
        "Yes",
        "PokeDex x0",
        "Cindy",
        "8633915D",
        "Male",
        "Bashful",
        "2",
        "1987",
      ],
    });

    cy.get("#select_retail_emerald_held_egg").click();

    testRngTool<CalibrateHeldFormState>({
      parentSelector: "#step-3",
      form: {
        pokeNavCall: { type: "select", value: "Cindy" },
        nature: { type: "select", value: "Bashful" },
        gender: { type: "select", value: "Male" },
      },
      partialFirstColumnValues: [{ type: "any" }, "0", "Bashful", "Cindy"],
    });

    cy.get("#stepper-next-button").click();

    testRngTool<PickupFormState>({
      parentSelector: "#step-4",
      form: {
        seed: "aabb",
        initial_advances: "0",
        max_advances: "10",
        parent1_ivs: { type: "ivs", value: "10/0/10/0/10/0" },
        parent2_ivs: { type: "ivs", value: "10/0/10/0/31/0" },
        filter_min_ivs: { type: "ivs", value: "16/0/14/0/31/15" },
        filter_max_ivs: { type: "ivs", value: "16/0/14/0/31/15" },
      },
      partialFirstColumnValues: [
        { type: "any" },
        "~0m 0s",
        "Emerald Bred",
        "16",
        "0",
        "14",
        "0",
        "31",
        "15",
      ],
    });

    cy.get("#select_retail_emerald_pickup_egg").click();

    testRngTool<CalibratePickupFormState>({
      parentSelector: "#step-5",
      form: {
        hpStat: { type: "radio", value: "20" },
        atkStat: { type: "radio", value: "9" },
        defStat: { type: "radio", value: "10" },
        spaStat: { type: "radio", value: "11" },
        spdStat: { type: "radio", value: "13" },
        speStat: { type: "radio", value: "10" },
      },
      partialFirstColumnValues: [
        { type: "any" },
        "0",
        "Emerald Bred",
        "20",
        "9",
        "10",
        "11",
        "13",
        "10",
      ],
    });
  });
});
