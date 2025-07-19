import React from "react";
import { HydrationLock } from "~/utils/hydration";
import * as tst from "ts-toolbelt";
import { atom, useAtom } from "jotai";

type _HydrationUnlock<T> = T extends HydrationLock<infer U> ? U : T;

export type HydrationUnlock<T> = T extends tst.O.Object
  ? {
      [K in keyof T]: _HydrationUnlock<T[K]>;
    }
  : _HydrationUnlock<T>;

export type HydrationLockObj<T> = {
  [K in keyof T]: HydrationLock<T[K]>;
};

export type LockedValue<T> = HydrationLock<T> | HydrationLockObj<T>;

const unlockHydration = <T>(value: LockedValue<T>): HydrationUnlock<T> => {
  return value as unknown as HydrationUnlock<T>;
};

type HydratedResult<T> =
  | {
      hydrated: false;
      client: null;
    }
  | {
      hydrated: true;
      client: HydrationUnlock<T>;
    };

const hydratedAtom = atom(false);

export const useHydrate = <T>(value: LockedValue<T>): HydratedResult<T> => {
  const [hydrated, setHydrated] = useAtom(hydratedAtom);

  React.useEffect(() => {
    setHydrated(true);
  }, [setHydrated]);

  return hydrated
    ? { hydrated, client: unlockHydration(value) }
    : { hydrated, client: null };
};
