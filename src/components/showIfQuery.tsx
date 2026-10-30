import React from "react";
import { useSearchParams } from "wouter";
import { useIsHydrated } from "~/hooks/useHydrate";

type Props = {
  // Query params that must be present in the url, e.g. { from: "pcalc" }
  query: Record<string, string>;
  children: React.ReactNode;
};

// Query strings aren't available when pre-rendering,
// so nothing is shown until the app is hydrated to avoid a hydration mismatch.
export const ShowIfQuery = ({ query, children }: Props) => {
  const isHydrated = useIsHydrated();
  const [searchParams] = useSearchParams();

  const matches = Object.entries(query).every(
    ([key, value]) => searchParams.get(key) === value,
  );

  if (isHydrated && matches) {
    return <>{children}</>;
  }
  return null;
};
