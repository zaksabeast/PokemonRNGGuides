import { describe, expect, it } from "vitest";
import { openStartersGuide } from "./guides/starters";

describe("HGSS retail starter guide", () => {
  // PokeFinder finds these seeds at advance 4, where HGSS generates Cyndaquil
  it("finds Cyndaquil 4 advances after the seed", async () => {
    const guide = await openStartersGuide();

    const results = await guide.searchStarters({
      game: "HeartGold",
      species: "Cyndaquil",
      tid: "12345",
      sid: "54321",
      minDelay: "800",
      maxDelay: "900",
      ivFilter: {
        minIvs: {
          HP: "30",
          Atk: "30",
          Def: "30",
          SpA: "20",
          SpD: "20",
          Spe: "20",
        },
        maxIvs: {},
      },
    });

    expect(results).toEqual([
      {
        nature: "Quirky",
        ability: "Second",
        gender: "Male",
        ivs: {
          HP: "30",
          Atk: "31",
          Def: "30",
          SpA: "27",
          SpD: "26",
          Spe: "25",
        },
        pid: "021608E3",
        delay: "835",
        seed: "700F0343",
      },
      {
        nature: "Modest",
        ability: "Second",
        gender: "Male",
        ivs: {
          HP: "30",
          Atk: "31",
          Def: "30",
          SpA: "27",
          SpD: "26",
          Spe: "25",
        },
        pid: "821688E3",
        delay: "835",
        seed: "F00F0343",
      },
    ]);
  });
});
