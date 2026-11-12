import { describe, expect, it } from "vitest";
import { openPokeRadarGuide, type PatchGridInputs } from "./guides/pokeRadar";

const RECORDED_GAME_INPUTS: PatchGridInputs = {
  initialSeed: "10D029F",
  advance: "350",
  chainCount: "1",
  battleResult: "Catch",
  shakeType: "Slow",
};

describe("DPPt PokeRadar guide patch grid", () => {
  it("shows an empty grid before calculating", async () => {
    const guide = await openPokeRadarGuide();

    expect(guide.readGrid()).toEqual([
      ".........",
      ".........",
      ".........",
      ".........",
      "....@....",
      ".........",
      ".........",
      ".........",
      ".........",
    ]);
  });

  it("predicts the patches for the seed and advance", async () => {
    const guide = await openPokeRadarGuide();

    expect(await guide.calculate(RECORDED_GAME_INPUTS)).toEqual([
      ".......+.",
      ".........",
      ".........",
      "..x......",
      "....@....",
      ".+...x...",
      ".........",
      ".........",
      ".........",
    ]);
  });

  it("breaks every patch without a chain", async () => {
    const guide = await openPokeRadarGuide();

    const grid = await guide.calculate({
      ...RECORDED_GAME_INPUTS,
      chainCount: "0",
    });

    expect(grid).toEqual([
      ".......x.",
      ".........",
      ".........",
      "..x......",
      "....@....",
      ".x...x...",
      ".........",
      ".........",
      ".........",
    ]);
  });

  it("continues fewer patches after winning than after catching", async () => {
    const catchGuide = await openPokeRadarGuide();
    const catchGrid = await catchGuide.calculate({
      ...RECORDED_GAME_INPUTS,
      advance: "0",
    });

    const winGuide = await openPokeRadarGuide();
    const winGrid = await winGuide.calculate({
      ...RECORDED_GAME_INPUTS,
      advance: "0",
      battleResult: "Win",
    });

    expect({ catchGrid, winGrid }).toEqual({
      catchGrid: [
        ".........",
        ".........",
        ".........",
        ".........",
        "....@...+",
        "....+....",
        "...x.....",
        ".+.......",
        ".........",
      ],
      winGrid: [
        ".........",
        ".........",
        ".........",
        ".........",
        "....@...+",
        "....x....",
        "...x.....",
        ".x.......",
        ".........",
      ],
    });
  });

  it("shows the shiny patch for a long chain", async () => {
    const guide = await openPokeRadarGuide();

    const grid = await guide.calculate({
      ...RECORDED_GAME_INPUTS,
      advance: "2",
      chainCount: "40",
    });

    expect(grid).toEqual([
      ".........",
      ".........",
      ".S.+.....",
      ".........",
      "....@....",
      ".....+...",
      ".........",
      ".........",
      "...+.....",
    ]);
  });

  it("keeps the picked shake type, which doesn't move patches", async () => {
    const guide = await openPokeRadarGuide();

    const grid = await guide.calculate({
      ...RECORDED_GAME_INPUTS,
      shakeType: "Fast",
    });

    expect({ grid, shakeType: guide.selectedShakeType() }).toEqual({
      grid: [
        ".......+.",
        ".........",
        ".........",
        "..x......",
        "....@....",
        ".+...x...",
        ".........",
        ".........",
        ".........",
      ],
      shakeType: "Fast",
    });
  });
});
