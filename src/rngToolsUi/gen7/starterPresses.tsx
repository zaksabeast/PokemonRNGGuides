import { useAtomValue, useSetAtom } from "jotai";
import {
  Gen7Press,
  Gen7UsumStarterPresses,
  multiWorkerRngTools,
} from "~/rngTools";
import { useActiveRouteTranslations } from "~/hooks/useActiveRoute";
import {
  Gen7StarterTarget,
  gen7StarterPlanAtom,
  gen7StarterTargetAtom,
} from "./starterState";
import { GiftTimeline } from "./giftTimeline";
import { PressCard, TargetAdvanceCard } from "./sectionCards";

const useCurrentTargetPlan = () => {
  const target = useAtomValue(gen7StarterTargetAtom);
  const plan = useAtomValue(gen7StarterPlanAtom);
  return {
    target,
    plan: plan?.target === target ? plan : null,
  };
};

const fetchKukuiSafeAdvances = (
  target: Gen7StarterTarget,
  fromAdvance: number,
  count: number,
) =>
  multiWorkerRngTools.gen7_usum_starter_safe_advances({
    seed: target.seed,
    current_advance: target.currentAdvance,
    from_advance: fromAdvance,
    safe_advance_count: count,
  });

const fetchPlan = (target: Gen7StarterTarget, safeAdvance: number) =>
  multiWorkerRngTools.gen7_usum_starter_plan({
    seed: target.seed,
    safe_advance: safeAdvance,
    target_advance: target.starter.advance,
    delay_advances: target.starter.delay_advances,
  });

export const Gen7StarterKukuiTimeline = () => {
  const { target, plan } = useCurrentTargetPlan();
  const setPlan = useSetAtom(gen7StarterPlanAtom);

  return (
    <GiftTimeline
      query={target}
      currentAdvance={target?.currentAdvance ?? null}
      selectedSafeAdvance={plan?.safeAdvance ?? null}
      nextAdvances={plan?.plan.next_advances ?? null}
      findSafeAdvancesTrackerId="gen7_find_usum_starter_safe_advances"
      fetchSafeAdvances={fetchKukuiSafeAdvances}
      fetchPlan={fetchPlan}
      onClearPlan={() => setPlan(null)}
      onPlan={(planTarget, safeAdvance, newPlan) =>
        setPlan({ target: planTarget, safeAdvance, plan: newPlan })
      }
    />
  );
};

type StarterPressCardProps = {
  title: string;
  label: string;
  getPress: (presses: Gen7UsumStarterPresses) => Gen7Press;
};

const StarterPressCard = ({
  title,
  label,
  getPress,
}: StarterPressCardProps) => {
  const t = useActiveRouteTranslations();
  const { target, plan } = useCurrentTargetPlan();
  const presses = plan?.plan.presses ?? null;

  return (
    <PressCard
      title={title}
      label={label}
      waitLabel={t["Time until A press"]}
      targetAdvance={target?.starter.advance ?? null}
      hasPlan={plan != null}
      press={presses == null ? null : getPress(presses)}
    />
  );
};

export const Gen7StarterPressKukuiA = () => {
  const t = useActiveRouteTranslations();
  return (
    <StarterPressCard
      title={t["Kukui's Dialogue"]}
      label={t["Press A at"]}
      getPress={(presses) => presses.kukui_a}
    />
  );
};

export const Gen7StarterPressYes = () => {
  const t = useActiveRouteTranslations();
  return (
    <StarterPressCard
      title={t["Choose Starter"]}
      label={t["Select Yes at"]}
      getPress={(presses) => presses.yes}
    />
  );
};

export const Gen7StarterTargetAdvance = () => {
  const { target, plan } = useCurrentTargetPlan();

  return (
    <TargetAdvanceCard
      gift={target?.starter ?? null}
      waitSteps={plan?.plan.presses?.target.wait_steps ?? null}
    />
  );
};
