/// <reference path="../../../../vite-env.d.ts" />
/// <reference path="../../../../global.d.ts" />
/// <reference path="../../../../emotion.d.ts" />

import { describe, expect, it } from "bun:test";
import {
  buildSimplifiedSearchOptions, getSimplifiedInitialValues,
  getSimplifiedChoices, selectSimplifiedCandidate, simplifiedLeads,
  simplifiedSpecies,
  getSimplifiedLeadSpeed,
  simplifiedSearchSchema,
} from "../simplifiedWildSearch";
import type { TargetSetup } from "../wild3TargetSetupInput";

const candidate = (advance: number, probability: number, map = "MAP_ROUTE116") => ({
  probability,
  leadCycleSpeed: 775,
  leadOrder: 0,
  targetSetup: {
    map, action: "SweetScentLand", lead: "Vanilla",
    feebasState: "NotInMap", feebasCycles: 0,
    roamerState: "Inactive", massOutbreakState: "Inactive",
    targetPaintingAdvs: { before: 0, after: advance },
    targetMethod: "Wild1", requiresWhiteFlute: false,
    safariPokeblock: null, aceSid: null,
  } satisfies TargetSetup,
});

describe("simplified wild selection", () => {
  it("uses average speed for ordinary/Synchronize leads and zero for Eggs", () => {
    expect(getSimplifiedLeadSpeed("Vanilla")).toBe(775);
    expect(getSimplifiedLeadSpeed({ Synchronize: "Modest" })).toBe(775);
    expect(getSimplifiedLeadSpeed("Egg")).toBe(0);
  });
  it("requires strictly more than 50% and chooses the earliest qualifying setup", () => {
    const first = candidate(1000, 0.5);
    const second = candidate(1100, 0.50001);
    expect(selectSimplifiedCandidate([candidate(1200, 1), second, first])).toEqual(second);
  });
  it("falls back to highest probability and breaks ties by advance and map", () => {
    const best = candidate(1100, 0.49, "MAP_A");
    expect(selectSimplifiedCandidate([
      candidate(1000, 0.2), candidate(1100, 0.49, "MAP_B"), best,
      candidate(1200, 0.49),
    ])).toEqual(best);
  });
  it("does not select unavailable or impossible candidates", () => {
    expect(selectSimplifiedCandidate([])).toBeNull();
    expect(selectSimplifiedCandidate([candidate(1000, NaN), candidate(1000, 0)])).toBeNull();
  });
});

describe("simplified wild search options", () => {
  it("never considers Pokeblocks in recommended or custom mode", () => {
    for (const recommendedSetups of [true, false]) {
      const opts = buildSimplifiedSearchOptions({
        ...getSimplifiedInitialValues(),
        tid: 12345,
        sid: 54321,
        recommendedSetups,
      });
      expect(opts.considered_safari_pokeblocks).toBe("None");
    }
  });
  it("always searches for shinies in recommended and custom modes", () => {
    for (const recommendedSetups of [true, false]) {
      const opts = buildSimplifiedSearchOptions({
        ...getSimplifiedInitialValues(),
        tid: 12345,
        sid: 54321,
        recommendedSetups,
      });
      expect(opts.filter.shiny).toBe(true);
      expect(opts.tid).toBe(12345);
      expect(opts.sid).toBe(54321);
    }
  });
  it("requires both trainer IDs and accepts the inclusive 16-bit range", () => {
    const defaults = getSimplifiedInitialValues();
    expect(defaults.tid).toBeNull();
    expect(defaults.sid).toBeNull();
    for (const field of ["tid", "sid"] as const) {
      for (const invalid of [null, undefined, -1, 65536, 1.5]) {
        const values = { ...defaults, tid: 0, sid: 65535, [field]: invalid };
        expect(simplifiedSearchSchema.safeParse(values).success).toBe(false);
        expect(() => buildSimplifiedSearchOptions(values)).toThrow();
      }
    }
    expect(simplifiedSearchSchema.safeParse({ ...defaults, tid: 0, sid: 65535 }).success).toBe(true);
    expect(simplifiedSearchSchema.safeParse({ ...defaults, tid: 65535, sid: 0 }).success).toBe(true);
  });
  it("passes the entered TID and SID to the search", () => {
    const opts = buildSimplifiedSearchOptions({ ...getSimplifiedInitialValues(), tid: 12345, sid: 54321 });
    expect(opts.tid).toBe(12345);
    expect(opts.sid).toBe(54321);
  });
  it("enforces fixed constraints in recommended mode despite stale custom fields", () => {
    const opts = buildSimplifiedSearchOptions({ ...getSimplifiedInitialValues(), tid: 0, sid: 0, maps: [], actions: [], leadKeys: ["Static"] });
    expect(opts.leads).toEqual(simplifiedLeads);
    expect(opts.leads).not.toContain("Static");
    expect(opts.initial_advances).toBe(1000);
    expect(opts.max_result_count).toBe(20);
    expect(opts.methods).toEqual(["Wild1", "Wild2", "Wild4"]);
    expect(opts.painting_opts).toBeNull();
    expect(opts.map_setups.length).toBeGreaterThan(0);
    for (const setup of opts.map_setups) {
      expect(setup.roamer_states).toEqual(["Inactive"]);
      expect(setup.mass_outbreak_states).toEqual(["Inactive"]);
      expect(setup.feebas_states).toEqual(["NotInMap"]);
    }
  });
  it("intersects custom maps/actions/leads with permitted choices", () => {
    const defaults = { ...getSimplifiedInitialValues(), tid: 0, sid: 0 };
    const opts = buildSimplifiedSearchOptions({ ...defaults, recommendedSetups: false,
      maps: [defaults.maps[0]], actions: ["SweetScentLand"],
      leadKeys: ["Egg", "Static"],
    });
    expect(opts.leads).toEqual(["Egg"]);
    expect(opts.map_setups.every((setup) => setup.map_data.map_id === defaults.maps[0] && setup.actions.every((action) => action === "SweetScentLand"))).toBe(true);
  });
  it("excludes Feebas and special-only species and keeps choices species-compatible", () => {
    expect(simplifiedSpecies).not.toContain("Feebas");
    expect(simplifiedSpecies).not.toContain("Latios");
    expect(simplifiedSpecies).not.toContain("Latias");
    expect(getSimplifiedChoices("Abra").actions).toContain("SweetScentLand");
    expect(getSimplifiedChoices("Magikarp").actions).toContain("OldRod");
  });
  it("enables every Synchronize nature through a single selection", () => {
    const opts = buildSimplifiedSearchOptions({
      ...getSimplifiedInitialValues(), tid: 0, sid: 0,
      recommendedSetups: false, leadKeys: ["Synchronize"],
    });
    const synchronizeLeads = simplifiedLeads.filter((lead) => typeof lead === "object");
    expect(synchronizeLeads).toHaveLength(25);
    expect(opts.leads).toEqual(synchronizeLeads);
  });
  it("disables every Synchronize nature when the grouped option is deselected", () => {
    const opts = buildSimplifiedSearchOptions({
      ...getSimplifiedInitialValues(), tid: 0, sid: 0,
      recommendedSetups: false, leadKeys: ["Vanilla", "Egg"],
    });
    expect(opts.leads).toEqual(["Vanilla", "Egg"]);
    expect(getSimplifiedInitialValues().leadKeys).toEqual(["Vanilla", "Egg", "Synchronize"]);
  });
});
