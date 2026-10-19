import { Button, Flex } from "~/components";
import { Gen7Advance } from "~/rngTools";
import { useActiveRouteTranslations } from "~/hooks/useActiveRoute";
import { useCancellablePromise } from "~/hooks/useCancellablePromise";
import { type CancellablePromise } from "~/utils/cancellablePromise";
import { NextAdvancesCard, SafeAdvancesCard } from "./sectionCards";
import { useSafeAdvances } from "./useSafeAdvances";

type GiftTimelineProps<Query, Plan> = {
  query: Query | null;
  currentAdvance: number | null;
  selectedSafeAdvance: number | null;
  nextAdvances: number[] | null;
  findSafeAdvancesTrackerId: string;
  fetchSafeAdvances: (
    query: Query,
    fromAdvance: number,
    count: number,
  ) => CancellablePromise<Gen7Advance[]>;
  fetchPlan: (query: Query, safeAdvance: number) => CancellablePromise<Plan[]>;
  onClearPlan: () => void;
  onPlan: (
    query: Query,
    safeAdvance: number,
    plan: Plan,
    waitFor: <T>(promise: CancellablePromise<T>) => Promise<T | null>,
  ) => void | Promise<void>;
};

export const GiftTimeline = <Query, Plan>({
  query,
  currentAdvance,
  selectedSafeAdvance,
  nextAdvances,
  findSafeAdvancesTrackerId,
  fetchSafeAdvances,
  fetchPlan,
  onClearPlan,
  onPlan,
}: GiftTimelineProps<Query, Plan>) => {
  const t = useActiveRouteTranslations();
  const { loading, waitFor } = useCancellablePromise();
  const {
    query: safeAdvancesQuery,
    safeAdvances,
    canShowMore,
    findSafeAdvances,
    showMore,
  } = useSafeAdvances(fetchSafeAdvances, waitFor);

  const onFindSafeAdvances = async () => {
    if (query == null || currentAdvance == null) {
      return;
    }
    onClearPlan();
    await findSafeAdvances(query, currentAdvance);
  };

  const onSelectSafeAdvance = async (safeAdvance: number) => {
    if (query == null) {
      return;
    }
    onClearPlan();
    const plans = await waitFor(fetchPlan(query, safeAdvance));
    const plan = plans?.[0];
    if (plan != null) {
      await onPlan(query, safeAdvance, plan, waitFor);
    }
  };

  return (
    <Flex vertical gap={16}>
      <SafeAdvancesCard
        safeAdvances={safeAdvancesQuery === query ? safeAdvances : null}
        selected={selectedSafeAdvance}
        disabled={loading}
        canShowMore={canShowMore}
        onSelect={onSelectSafeAdvance}
        onShowMore={showMore}
        action={
          <Flex>
            <Button
              trackerId={findSafeAdvancesTrackerId}
              type="primary"
              disabled={query == null || loading}
              onClick={onFindSafeAdvances}
            >
              {t["Find Safe Advances"]}
            </Button>
          </Flex>
        }
      />
      <NextAdvancesCard
        safeAdvance={selectedSafeAdvance}
        nextAdvances={nextAdvances}
      />
    </Flex>
  );
};
