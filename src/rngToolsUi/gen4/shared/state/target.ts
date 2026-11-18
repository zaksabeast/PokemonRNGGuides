import { atom } from "jotai";
import { isEqual, uniqueId } from "lodash-es";
import type {
  Gender,
  HgssRoamers,
  Id4,
  LeadAbility,
  SeedTime4,
  Species,
  Static4Method,
} from "~/rngTools";
import type { MinMaxStats } from "~/types";
import type { Gen4GameVersion } from "~/types/games";
import { gen4SetupAtom, type Gen4Setup } from "./setup";

type Gen4SearchKey = {
  game: Gen4GameVersion;
  roamers: HgssRoamers | null;
};

export type Static4Target = {
  lead: LeadAbility;
  encounterMinLevel: number;
  encounterMaxLevel: number;
  gender: Gender;
  level: number;
  species: Species;
  form?: number;
  advanceOffset: number;
  minMaxStats: MinMaxStats;
  isFixedGender: boolean;
  method: Static4Method;
};

export type Static4Details = Static4Target & {
  tool: "static";
  advanceCalibration: number;
};

type Gen4TargetDetails =
  | Static4Details
  | { tool: "id"; id: Omit<Id4, "seedTime"> }
  | { tool: "starter"; species: Species };

export type Gen4Target = {
  id: string;
  searchedFor: Gen4SearchKey;
  seedTime: SeedTime4;
  lcrngAdvance: number | null;
  mtAdvance: number | null;
  roamerAdvances: number;
  coinFlipCount: number;
  details: Gen4TargetDetails | null;
};

type Gen4TargetInput = Pick<Gen4Target, "seedTime"> &
  Partial<Omit<Gen4Target, "id" | "searchedFor" | "seedTime">>;

const getGen4SearchKey = (setup: Gen4Setup): Gen4SearchKey => ({
  game: setup.game,
  roamers: setup.group === "hgss" ? setup.roamers : null,
});

const createGen4Target = (
  setup: Gen4Setup,
  input: Gen4TargetInput,
): Gen4Target => ({
  lcrngAdvance: null,
  mtAdvance: null,
  roamerAdvances: 0,
  coinFlipCount: 0,
  details: null,
  ...input,
  id: uniqueId(),
  searchedFor: getGen4SearchKey(setup),
});

const targetAtom = atom<Gen4Target | null>(null);

// The target only applies to the setup it was found for
export const gen4TargetAtom = atom((get): Gen4Target | null => {
  const target = get(targetAtom);
  const searchKey = getGen4SearchKey(get(gen4SetupAtom));
  return target != null && isEqual(target.searchedFor, searchKey)
    ? target
    : null;
});

export const selectGen4TargetAtom = atom(
  null,
  (get, set, input: Gen4TargetInput) => {
    set(targetAtom, createGen4Target(get(gen4SetupAtom), input));
  },
);

export const selectGen4AdvanceAtom = atom(
  null,
  (get, set, advance: { lcrngAdvance: number } | { mtAdvance: number }) => {
    const target = get(gen4TargetAtom);
    if (target == null) {
      return;
    }

    set(targetAtom, { ...target, ...advance, id: uniqueId() });
  },
);

export const getCalibratedLcrngAdvance = (
  target: Gen4Target | null,
): number | null => {
  const lcrngAdvance = target?.lcrngAdvance ?? null;
  const details = target?.details;
  if (lcrngAdvance == null) {
    return null;
  }

  const advanceCalibration =
    details?.tool === "static" ? details.advanceCalibration : 0;

  return lcrngAdvance + advanceCalibration;
};

export const clearGen4TargetAtom = atom(null, (_get, set) => {
  set(targetAtom, null);
});

export const calibrateStatic4AdvanceAtom = atom(
  null,
  (get, set, advanceOffset: number) => {
    const target = get(gen4TargetAtom);
    const details = target?.details;
    if (target == null || details?.tool !== "static") {
      return;
    }

    set(targetAtom, {
      ...target,
      details: {
        ...details,
        advanceCalibration: details.advanceCalibration - advanceOffset,
      },
    });
  },
);
