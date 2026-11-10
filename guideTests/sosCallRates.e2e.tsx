import { describe, expect, it } from "vitest";
import { openSosCallRates } from "./guides/sosCallRates";

describe("SOS Call Rates guide", () => {
  it("lists the Pokemon whose name matches the search", async () => {
    const guide = await openSosCallRates();

    const callRates = await guide.search("pik");

    expect(callRates).toEqual([
      {
        dexNumber: "0025",
        name: "Pikachu",
        smCallRate: "6",
        usumCallRate: "6",
      },
      {
        dexNumber: "0731",
        name: "Pikipek",
        smCallRate: "15",
        usumCallRate: "15",
      },
    ]);
  });
});
