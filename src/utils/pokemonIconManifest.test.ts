/// <reference types="vite/client" />
import { describe, expect, test } from "bun:test";
import { pokemonIconManifest, pokemonIconSheets } from "./pokemonIconManifest";

describe("pokemon icon manifest", () => {
  test("maps generation boundaries using National Pokedex IDs", () => {
    for (const [species, sheet] of [
      ["Bulbasaur", 0],
      ["Mew", 0],
      ["Chikorita", 1],
      ["Celebi", 1],
      ["Treecko", 2],
      ["Deoxys_Normal", 2],
      ["Turtwig", 3],
      ["Arceus_Normal", 3],
      ["Victini", 4],
      ["Genesect", 4],
      ["Chespin", 5],
      ["Volcanion", 5],
      ["Rowlet", 6],
      ["Marshadow", 6],
    ] as const) {
      expect(pokemonIconManifest[species]?.sheet).toBe(sheet);
    }
  });

  test("all mapped icons occupy cells inside their sheets", () => {
    const cells = new Set<string>();
    for (const location of Object.values(pokemonIconManifest)) {
      const { sheet, x, y } = location;
      const dimensions = pokemonIconSheets[sheet];
      expect(x % 64).toBe(0);
      expect(y % 64).toBe(0);
      expect(x).toBeGreaterThanOrEqual(0);
      expect(y).toBeGreaterThanOrEqual(0);
      expect(x + 64).toBeLessThanOrEqual(dimensions.width);
      expect(y + 64).toBeLessThanOrEqual(dimensions.height);
      cells.add(`${sheet}:${x}:${y}`);
    }
    expect(cells.size).toBe(802);
  });

  test("alternate forms use base species artwork", () => {
    for (const form of [
      "Deoxys_Attack",
      "Deoxys_Defense",
      "Deoxys_Speed",
    ] as const) {
      expect(pokemonIconManifest[form]).toEqual({ sheet: 2, x: 384, y: 512 });
    }
    expect(JSON.stringify(pokemonIconManifest.Rotom_Wash)).toBe(
      JSON.stringify(pokemonIconManifest.Rotom_Normal),
    );
    expect(JSON.stringify(pokemonIconManifest.Castform_Sunny)).toBe(
      JSON.stringify(pokemonIconManifest.Castform_Normal),
    );
    expect(JSON.stringify(pokemonIconManifest.Giratina_Origin)).toBe(
      JSON.stringify(pokemonIconManifest.Giratina_Altered),
    );
  });

  test("unavailable artwork has no entry", () => {
    expect(pokemonIconManifest.None).toBeUndefined();
    expect(pokemonIconManifest.Grookey).toBeUndefined();
  });
});
