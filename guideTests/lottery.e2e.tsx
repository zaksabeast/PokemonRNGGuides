import { describe, expect, it } from "vitest";
import { openLotteryGuide } from "./guides/lottery";

describe("DPPt Lottery guide", () => {
  it("only offers DPPt games", async () => {
    const guide = await openLotteryGuide();

    expect(await guide.gameOptions()).toEqual(["Diamond", "Pearl", "Platinum"]);
  });

  it("finds the target seed's coin flips in the advance filter", async () => {
    const guide = await openLotteryGuide();
    const target = await guide.selectFirstPrize("800");
    const coinFlips = await guide.targetSeedCoinFlips();
    const advanceFilterTarget = await guide.advanceFilterTarget();
    await guide.generateAdvances();

    guide.enterCoinFlips(coinFlips.slice(10, 18));

    expect(advanceFilterTarget).toEqual(target);
    await guide.waitForShownAdvances([
      { advance: "10", isMarked: true },
      { advance: "11", isMarked: true },
      { advance: "12", isMarked: true },
      { advance: "13", isMarked: true },
      { advance: "14", isMarked: true },
      { advance: "15", isMarked: true },
      { advance: "16", isMarked: true },
      { advance: "17", isMarked: true },
      { advance: "18", isMarked: false },
      { advance: "19", isMarked: false },
    ]);
  });
});
