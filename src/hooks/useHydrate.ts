import React from "react";
import { HydrationLock } from "~/utils/hydration";
import { atom, useAtom, useAtomValue } from "jotai";

const isHydratedAtom = atom(false);

/**
 * This hook should be used in the root of the app to update hydration status.
 * It will trigger a re-render once the app is hydrated,
 * allowing components to switch from pre-rendered content to client-side content.
 */
export const useUpdateHydration = () => {
  const [, setHydrated] = useAtom(isHydratedAtom);

  React.useEffect(() => {
    setHydrated(true);
  }, [setHydrated]);
};

/**
 * Used anywhere in the app to check if the app is hydrated.
 */
export const useIsHydrated = () => {
  return useAtomValue(isHydratedAtom);
};

export type HydrationLockObj<T> = {
  [K in keyof T]: HydrationLock<T[K]>;
};

export type LockedValue<T> = HydrationLock<T> | HydrationLockObj<T>;

const unlockHydration = <T>(value: LockedValue<T>): T => {
  return value as unknown as T;
};

type HydratedResult<T> =
  | {
      hydrated: false;
      client: null;
    }
  | {
      hydrated: true;
      client: T;
    };

/**
 * Takes a value locked for hydration,
 * and returns the unlocked value once the app is hydrated,
 * or null if not hydrated yet.
 */
export const useHydrate = <T>(value: LockedValue<T>): HydratedResult<T> => {
  const hydrated = useIsHydrated();

  return hydrated
    ? { hydrated, client: unlockHydration(value) }
    : { hydrated, client: null };
};
