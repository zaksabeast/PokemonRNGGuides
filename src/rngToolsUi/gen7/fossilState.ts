import { atom } from "jotai";
import {
  Gen7Gift,
  Gen7UsumFossilPresses,
  multiWorkerRngTools,
} from "~/rngTools";

// Replaced only when the seed or current advance changes, so the timeline
// survives new searches from the same place.
export type Gen7FossilTimelineQuery = {
  seed: number;
  currentAdvance: number;
};

export type Gen7FossilTarget = {
  seed: number;
  abilityName: string | null;
  fossil: Gen7Gift;
};

export type Gen7FossilTimeline = {
  query: Gen7FossilTimelineQuery;
  safeAdvance: number;
  nextAdvances: number[];
  // The latest A press on the dialogue given so far. The user may have
  // stepped that far, so later plans can't press before it.
  minDialogueAAdvance: number | null;
};

export type Gen7FossilPlan = {
  target: Gen7FossilTarget;
  timeline: Gen7FossilTimeline;
  // Null when the timeline can't reach the target.
  presses: Gen7UsumFossilPresses | null;
};

export const gen7FossilTimelineQueryAtom = atom<Gen7FossilTimelineQuery | null>(
  null,
);
export const gen7FossilTargetAtom = atom<Gen7FossilTarget | null>(null);
export const gen7FossilTimelineAtom = atom<Gen7FossilTimeline | null>(null);
export const gen7FossilPlanAtom = atom<Gen7FossilPlan | null>(null);

export const fetchGen7FossilPlan = (
  seed: number,
  safeAdvance: number,
  fossil: Gen7Gift | null,
  minDialogueAAdvance: number | null,
) =>
  multiWorkerRngTools.gen7_usum_fossil_plan({
    seed,
    safe_advance: safeAdvance,
    // Without a target, the plan only gives the next advances.
    target:
      fossil == null
        ? undefined
        : { advance: fossil.advance, delay_advances: fossil.delay_advances },
    min_dialogue_a_advance: minDialogueAAdvance ?? undefined,
  });

type TimelinePlan = {
  timeline: Gen7FossilTimeline;
  // Whether `timeline` was just created, replacing a cleared one.
  isNewTimeline: boolean;
  target: Gen7FossilTarget | null;
  presses: Gen7UsumFossilPresses | null;
};

/**
 * Stores the plan for `target` on `timeline`, unless either has changed since.
 * Returns the current target when the new timeline was stored without a plan
 * for it, so the caller can plan it.
 */
export const setGen7FossilPlanAtom = atom(
  null,
  (
    get,
    set,
    { timeline, isNewTimeline, target, presses }: TimelinePlan,
  ): Gen7FossilTarget | null => {
    const currentTimeline = get(gen7FossilTimelineAtom);
    const isSameTimeline =
      currentTimeline == null
        ? isNewTimeline
        : !isNewTimeline &&
          currentTimeline.query === timeline.query &&
          currentTimeline.safeAdvance === timeline.safeAdvance;
    if (!isSameTimeline) {
      return null;
    }
    const currentTarget = get(gen7FossilTargetAtom);
    if (currentTarget !== target) {
      // The presses are for another target, but a new timeline is still valid.
      if (isNewTimeline) {
        set(gen7FossilTimelineAtom, timeline);
        return currentTarget;
      }
      return null;
    }

    const plannedTimeline = {
      ...timeline,
      minDialogueAAdvance:
        presses?.dialogue_a.advance ?? timeline.minDialogueAAdvance,
    };
    set(gen7FossilTimelineAtom, plannedTimeline);
    set(
      gen7FossilPlanAtom,
      target == null ? null : { target, timeline: plannedTimeline, presses },
    );
    return null;
  },
);
