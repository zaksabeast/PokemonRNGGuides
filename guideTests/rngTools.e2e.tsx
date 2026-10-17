import { expect, it } from "vitest";
import { rngTools } from "~/rngTools";

it("calls rng_tools through the worker stub", async () => {
  await expect(rngTools.get_species_gender_ratio("Bulbasaur")).resolves.toBe(
    "OneToSeven",
  );
});
