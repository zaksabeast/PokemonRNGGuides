import { useHydrate } from "../useHydrate";
import { type HydrationLock, hydrationLock } from "~/utils/hydration";
import { check, Pass } from "~/typeTest";

type Client<Result> = Result extends { hydrated: true; client: infer Value }
  ? Value
  : never;

export const SingleLockTest = () => {
  const result = useHydrate(hydrationLock({ name: "test", count: 1 }));

  type Result = Client<typeof result>;
  type Expected = { name: string; count: number };
  check<Result, Expected>(Pass);
  return result;
};

export const NullableLockTest = () => {
  const result = useHydrate(hydrationLock<string | null>(null));

  type Result = Client<typeof result>;
  type Expected = string | null;
  check<Result, Expected>(Pass);
  return result;
};

export const LockObjectTest = () => {
  const result = useHydrate({
    name: hydrationLock("test"),
    counts: hydrationLock([1, 2, 3]),
  });

  type Result = Client<typeof result>;
  type Expected = { name: string; counts: number[] };
  check<Result, Expected>(Pass);
  return result;
};

export const NotHydratedTest = () => {
  const result = useHydrate(hydrationLock("test"));

  if (!result.hydrated) {
    check<typeof result.client, null>(Pass);
  }
};

// Equality checks can't resolve while a type is generic,
// so this assigns to check instead.
export const GenericLockTest = <Settings extends { count: number }>(
  lock: HydrationLock<Settings>,
) => {
  const result = useHydrate(lock);

  if (result.hydrated) {
    const settings: Settings = result.client;
    const client: typeof result.client = settings;
    return [settings, client];
  }
};

// Equality checks can't resolve while a type is generic,
// so this assigns to check instead.
export const GenericLockObjectTest = <Settings extends { count: number }>(
  settingsLock: HydrationLock<Settings>,
  nameLock: HydrationLock<string>,
) => {
  const result = useHydrate({ settings: settingsLock, name: nameLock });

  if (result.hydrated) {
    const settings: Settings = result.client.settings;
    const name: string = result.client.name;
    return [settings, name];
  }
};

export const MaskedLockTest = () => {
  const lock = hydrationLock({ name: "test" });

  // @ts-expect-error locked values can't be read before hydrating
  return lock.name;
};

export const MixedLockObjectTest = () => {
  // @ts-expect-error every field must be locked
  return useHydrate({ name: hydrationLock("test"), count: 1 });
};
