import { useAtomValue, useSetAtom } from "jotai";
import { Gen7UsumFossilPlan, multiWorkerRngTools } from "~/rngTools";
import { useActiveRouteTranslations } from "~/hooks/useActiveRoute";
import {
  Gen7FossilTimelineQuery,
  fetchGen7FossilPlan,
  gen7FossilPlanAtom,
  gen7FossilTargetAtom,
  gen7FossilTimelineAtom,
  gen7FossilTimelineQueryAtom,
  setGen7FossilPlanAtom,
} from "./fossilState";
import { GiftTimeline } from "./giftTimeline";
import { PressCard, TargetAdvanceCard } from "./sectionCards";

const useCurrentTimeline = () => {
  const query = useAtomValue(gen7FossilTimelineQueryAtom);
  const timeline = useAtomValue(gen7FossilTimelineAtom);
  return {
    query,
    timeline: timeline?.query === query ? timeline : null,
  };
};

const useCurrentTargetPlan = () => {
  const target = useAtomValue(gen7FossilTargetAtom);
  const { timeline } = useCurrentTimeline();
  const plan = useAtomValue(gen7FossilPlanAtom);
  const isCurrent =
    plan != null && plan.target === target && plan.timeline === timeline;
  return {
    target,
    plan: isCurrent ? plan : null,
  };
};

const fetchDialogueSafeAdvances = (
  query: Gen7FossilTimelineQuery,
  fromAdvance: number,
  count: number,
) =>
  multiWorkerRngTools.gen7_usum_fossil_safe_advances({
    seed: query.seed,
    current_advance: query.currentAdvance,
    from_advance: fromAdvance,
    safe_advance_count: count,
  });

export const Gen7FossilTimeline = () => {
  const { query, timeline } = useCurrentTimeline();
  const target = useAtomValue(gen7FossilTargetAtom);
  const setTimeline = useSetAtom(gen7FossilTimelineAtom);
  const setPlan = useSetAtom(gen7FossilPlanAtom);
  const storePlan = useSetAtom(setGen7FossilPlanAtom);

  const onClearPlan = () => {
    setTimeline(null);
    setPlan(null);
  };

  const onPlan = (
    planQuery: Gen7FossilTimelineQuery,
    safeAdvance: number,
    plan: Gen7UsumFossilPlan,
  ) => {
    storePlan({
      timeline: {
        query: planQuery,
        safeAdvance,
        nextAdvances: plan.next_advances,
        minDialogueAAdvance: null,
      },
      isNewTimeline: true,
      target,
      presses: plan.presses ?? null,
    });
  };

  return (
    <GiftTimeline
      query={query}
      currentAdvance={query?.currentAdvance ?? null}
      selectedSafeAdvance={timeline?.safeAdvance ?? null}
      nextAdvances={timeline?.nextAdvances ?? null}
      findSafeAdvancesTrackerId="gen7_find_usum_fossil_safe_advances"
      fetchSafeAdvances={fetchDialogueSafeAdvances}
      fetchPlan={(planQuery, safeAdvance) =>
        fetchGen7FossilPlan(
          planQuery.seed,
          safeAdvance,
          target?.fossil ?? null,
          null,
        )
      }
      onClearPlan={onClearPlan}
      onPlan={onPlan}
    />
  );
};

export const Gen7FossilPressDialogueA = () => {
  const t = useActiveRouteTranslations();
  const { target, plan } = useCurrentTargetPlan();

  return (
    <PressCard
      title={t["Fossil Dialogue"]}
      label={t["Press A at"]}
      waitLabel={t["Time until A press"]}
      targetAdvance={target?.fossil.advance ?? null}
      hasPlan={plan != null}
      press={plan?.presses?.dialogue_a ?? null}
    />
  );
};

export const Gen7FossilTargetAdvance = () => {
  const { target, plan } = useCurrentTargetPlan();

  return (
    <TargetAdvanceCard
      gift={target?.fossil ?? null}
      waitSteps={plan?.presses?.target.wait_steps ?? null}
      abilityName={target?.abilityName ?? null}
    />
  );
};
