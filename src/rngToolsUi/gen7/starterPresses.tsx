import { useAtomValue, useSetAtom } from "jotai";
import { Alert, Button, Flex, SectionCard, Typography } from "~/components";
import {
  Gen7UsumStarterPress,
  Gen7UsumStarterPresses,
  multiWorkerRngTools,
} from "~/rngTools";
import { useActiveRouteTranslations } from "~/hooks/useActiveRoute";
import { useCancellablePromise } from "~/hooks/useCancellablePromise";
import {
  Gen7StarterTarget,
  gen7StarterPlanAtom,
  gen7StarterTargetAtom,
} from "./starterState";
import {
  NextAdvancesCard,
  PRESS_TIMING_MIN_HEIGHT,
  PressTiming,
  SafeAdvancesCard,
  StarterTags,
} from "./sectionCards";
import { useSafeAdvances } from "./useSafeAdvances";

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

export const Gen7StarterKukuiTimeline = () => {
  const t = useActiveRouteTranslations();
  const { target, plan } = useCurrentTargetPlan();
  const setPlan = useSetAtom(gen7StarterPlanAtom);
  const { loading, waitFor } = useCancellablePromise();
  const {
    query: safeAdvancesTarget,
    safeAdvances,
    canShowMore,
    findSafeAdvances,
    showMore,
  } = useSafeAdvances(fetchKukuiSafeAdvances, waitFor);

  const onFindSafeAdvances = async () => {
    if (target == null) {
      return;
    }
    setPlan(null);
    await findSafeAdvances(target, target.currentAdvance);
  };

  const onSelectSafeAdvance = async (safeAdvance: number) => {
    if (target == null) {
      return;
    }
    setPlan(null);
    const results = await waitFor(
      multiWorkerRngTools.gen7_usum_starter_plan({
        seed: target.seed,
        safe_advance: safeAdvance,
        target_advance: target.starter.advance,
        delay_advances: target.starter.delay_advances,
      }),
    );
    const result = results?.[0];
    if (result != null) {
      setPlan({ target, safeAdvance, plan: result });
    }
  };

  return (
    <Flex vertical gap={16}>
      <SafeAdvancesCard
        safeAdvances={safeAdvancesTarget === target ? safeAdvances : null}
        selected={plan?.safeAdvance ?? null}
        disabled={loading}
        canShowMore={canShowMore}
        onSelect={onSelectSafeAdvance}
        onShowMore={showMore}
        action={
          // A row, so the button keeps its size in the card's column.
          <Flex>
            <Button
              trackerId="gen7_find_usum_starter_safe_advances"
              type="primary"
              disabled={target == null || loading}
              onClick={onFindSafeAdvances}
            >
              {t["Find Safe Advances"]}
            </Button>
          </Flex>
        }
      />
      <NextAdvancesCard
        safeAdvance={plan?.safeAdvance ?? null}
        nextAdvances={plan?.plan.next_advances ?? null}
      />
    </Flex>
  );
};

type PressCardProps = {
  title: string;
  label: string;
  waitLabel: string;
  getPress: (presses: Gen7UsumStarterPresses) => Gen7UsumStarterPress;
};

const PressCard = ({ title, label, waitLabel, getPress }: PressCardProps) => {
  const t = useActiveRouteTranslations();
  const { target, plan } = useCurrentTargetPlan();
  const presses = plan?.plan.presses ?? null;
  const unreachable = plan != null && presses == null;

  const borderColor = (() => {
    if (plan == null) {
      return undefined;
    }
    return unreachable ? "Warning" : "Primary";
  })();

  const content = (() => {
    if (target == null) {
      return (
        <Typography.Text color="TextSecondary">
          {t["Select a target in the search above"]}
        </Typography.Text>
      );
    }
    if (unreachable) {
      return (
        <Alert
          type="warning"
          title={t[
            "{target} can't be reached from this timeline. Pick another target."
          ].replace("{target}", target.starter.advance.toString())}
        />
      );
    }
    const press = presses == null ? null : getPress(presses);
    return (
      <PressTiming
        label={label}
        labelColor="Primary"
        advance={press?.advance ?? null}
        waitLabel={waitLabel}
        waitSteps={press?.wait_steps ?? null}
      />
    );
  })();

  return (
    <SectionCard title={title} borderColor={borderColor}>
      <Flex vertical justify="center" minHeight={PRESS_TIMING_MIN_HEIGHT}>
        {content}
      </Flex>
    </SectionCard>
  );
};

export const Gen7StarterPressKukuiA = () => {
  const t = useActiveRouteTranslations();
  return (
    <PressCard
      title={t["Kukui's Dialogue"]}
      label={t["Press A at"]}
      waitLabel={t["Time until A press"]}
      getPress={(presses) => presses.kukui_a}
    />
  );
};

export const Gen7StarterPressYes = () => {
  const t = useActiveRouteTranslations();
  return (
    <PressCard
      title={t["Choose Starter"]}
      label={t["Select Yes at"]}
      waitLabel={t["Time until A press"]}
      getPress={(presses) => presses.yes}
    />
  );
};

export const Gen7StarterTargetAdvance = () => {
  const t = useActiveRouteTranslations();
  const { target, plan } = useCurrentTargetPlan();
  const presses = plan?.plan.presses ?? null;

  return (
    <SectionCard
      title={t["Target Advance"]}
      borderColor={presses == null ? undefined : "Success"}
    >
      <Flex vertical justify="center" minHeight={PRESS_TIMING_MIN_HEIGHT}>
        <PressTiming
          label={t["Press A at"]}
          labelColor="Success"
          advance={target?.starter.advance ?? null}
          waitLabel={t["Time until A press"]}
          waitSteps={presses?.target.wait_steps ?? null}
        />
      </Flex>
      <StarterTags starter={target?.starter ?? null} />
    </SectionCard>
  );
};
