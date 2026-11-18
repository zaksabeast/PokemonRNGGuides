import { describe, expect, it } from "vitest";
import {
  openRetailStaticGuide,
  type CaughtPokemon,
} from "./guides/retailStatic";
import { type IvFilterInputs } from "./guides/pokemonFilter";

// Only one Diamond Uxie in the default search has IVs in this range
const TARGET_IV_FILTER: IvFilterInputs = {
  minIvs: {
    HP: "25",
    Atk: "25",
    Def: "31",
    SpA: "31",
    SpD: "30",
    Spe: "25",
  },
  maxIvs: { HP: "25" },
};

const UXIE_TWO_ADVANCES_LATE: CaughtPokemon = {
  natureOption: "Quiet SPA SPE",
  characteristic: "Impetuous And Silly",
  stats: {
    HP: "142",
    Atk: "83",
    Def: "139",
    SpA: "89",
    SpD: "136",
    Spe: "97",
  },
};

const UXIE_SEED = "AA100320";

const openGuideTargetingUxie = async () => {
  const guide = await openRetailStaticGuide();
  await guide.selectOnlySearchResult("Uxie", TARGET_IV_FILTER);

  return guide;
};

describe("DPPt static guide seed calibration", () => {
  it("lists seeds nearest the target first", async () => {
    const guide = await openGuideTargetingUxie();

    const seeds = await guide.findSeedsNearTarget({
      delayOffset: "1",
      secondOffset: "1",
    });

    expect(seeds).toEqual([
      {
        delayOffset: "0",
        secondOffset: "0",
        seed: UXIE_SEED,
        delay: "800",
        second: "58",
      },
      {
        delayOffset: "0",
        secondOffset: "-1",
        seed: "A9100320",
        delay: "800",
        second: "57",
      },
      {
        delayOffset: "0",
        secondOffset: "1",
        seed: "AB100320",
        delay: "800",
        second: "59",
      },
      {
        delayOffset: "-1",
        secondOffset: "0",
        seed: "AA10031F",
        delay: "799",
        second: "58",
      },
      {
        delayOffset: "1",
        secondOffset: "0",
        seed: "AA100321",
        delay: "801",
        second: "58",
      },
      {
        delayOffset: "-1",
        secondOffset: "-1",
        seed: "A910031F",
        delay: "799",
        second: "57",
      },
      {
        delayOffset: "1",
        secondOffset: "-1",
        seed: "A9100321",
        delay: "801",
        second: "57",
      },
      {
        delayOffset: "-1",
        secondOffset: "1",
        seed: "AB10031F",
        delay: "799",
        second: "59",
      },
      {
        delayOffset: "1",
        secondOffset: "1",
        seed: "AB100321",
        delay: "801",
        second: "59",
      },
    ]);
  });

  it("narrows to the target seed after entering its coin flips", async () => {
    const guide = await openGuideTargetingUxie();
    await guide.findSeedsNearTarget({ delayOffset: "1", secondOffset: "1" });

    guide.enterCoinFlips(guide.targetSeedCoinFlips(UXIE_SEED));

    await guide.waitForShownSeeds([UXIE_SEED]);
  });

  it("clears coin flips after selecting a target again", async () => {
    const guide = await openGuideTargetingUxie();
    await guide.findSeedsNearTarget({ delayOffset: "1", secondOffset: "1" });
    guide.enterCoinFlips("HT");

    await guide.selectOnlySearchResult("Uxie", TARGET_IV_FILTER);

    expect(guide.coinFlips()).toBe("");
  });
});

describe("DPPt static guide advance calibration", () => {
  it("targets the selected Pokemon's advance", async () => {
    const guide = await openRetailStaticGuide();
    const target = await guide.selectOnlySearchResult("Uxie", TARGET_IV_FILTER);
    const targetAdvance = await guide.targetAdvance();

    expect(target).toMatchInlineSnapshot(`
      {
        "ability": "Second",
        "advance": "24",
        "delay": "800",
        "gender": "Genderless",
        "ivs": {
          "Atk": "25",
          "Def": "31",
          "HP": "25",
          "SpA": "31",
          "SpD": "30",
          "Spe": "25",
        },
        "lead": "None",
        "nature": "Brave",
        "pid": "E7A4C9AB",
        "second": "58",
        "seed": "AA100320",
      }
    `);
    expect(targetAdvance).toBe("24");
  });

  it("targets 2 advances earlier after catching the Pokemon 2 advances late", async () => {
    const guide = await openGuideTargetingUxie();

    const calibration = await guide.calibrateAdvanceWith(
      UXIE_TWO_ADVANCES_LATE,
    );

    const targetAdvance = await guide.targetAdvance();

    expect({ calibration, targetAdvance }).toEqual({
      calibration: {
        advanceOffset: "+2",
        advance: "26",
        delayOffset: "0",
        secondOffset: "0",
        seed: "AA100320",
      },
      targetAdvance: "22",
    });
  });
});
