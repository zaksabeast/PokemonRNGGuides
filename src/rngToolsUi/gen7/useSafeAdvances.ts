import React from "react";
import { Gen7Advance } from "~/rngTools";
import { useCancellablePromise } from "~/hooks/useCancellablePromise";
import { type CancellablePromise } from "~/utils/cancellablePromise";

export const SAFE_ADVANCE_COUNT = 10;

type FetchSafeAdvances<Query> = (
  query: Query,
  fromAdvance: number,
  count: number,
) => CancellablePromise<Gen7Advance[]>;

type WaitFor = ReturnType<typeof useCancellablePromise>["waitFor"];

export const useSafeAdvances = <Query>(
  fetchSafeAdvances: FetchSafeAdvances<Query>,
  waitFor: WaitFor,
) => {
  const [query, setQuery] = React.useState<Query | null>(null);
  const [safeAdvances, setSafeAdvances] = React.useState<number[] | null>(null);
  const [canShowMore, setCanShowMore] = React.useState(true);

  const fetchPage = async (pageQuery: Query, fromAdvance: number) => {
    const page = await waitFor(
      fetchSafeAdvances(pageQuery, fromAdvance, SAFE_ADVANCE_COUNT),
    );
    return page?.map((safeAdvance) => safeAdvance.advance) ?? null;
  };

  const findSafeAdvances = async (newQuery: Query, fromAdvance: number) => {
    setQuery(newQuery);
    setSafeAdvances(null);
    setCanShowMore(true);
    setSafeAdvances(await fetchPage(newQuery, fromAdvance));
  };

  const showMore = async () => {
    const lastSafeAdvance = safeAdvances?.at(-1);
    if (query == null || safeAdvances == null || lastSafeAdvance == null) {
      return;
    }

    const nextPage = await fetchPage(query, lastSafeAdvance + 1);
    if (nextPage == null) {
      // Cancelled
      return;
    }
    if (nextPage.length === 0) {
      setCanShowMore(false);
      return;
    }
    setSafeAdvances([...safeAdvances, ...nextPage]);
  };

  return { query, safeAdvances, canShowMore, findSafeAdvances, showMore };
};
