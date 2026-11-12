import { describe, expect, it } from "vitest";
import { openGamePage } from "./guides/gamePage";

describe("FireRed and LeafGreen game page", () => {
  it("lists the guides for the picked setup", async () => {
    const page = await openGamePage("/fire-red-and-leaf-green/");

    expect(page.readSetupGuides()).toEqual({
      setup: "Retail",
      pokemonRngGuides: ["Starter, Legend, and Fossil RNG"],
    });

    const emulatorGuides = await page.pickSetup("Emulator");

    expect(emulatorGuides).toEqual({
      setup: "Emulator",
      pokemonRngGuides: ["Egg RNG", "Static RNG", "Wild RNG"],
    });
  });
});
