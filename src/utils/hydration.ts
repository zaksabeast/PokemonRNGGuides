export type HydrationLock<T> = { readonly _tag: "HydrationLock" } & {
  readonly __value: T;
};

export const hydrationLock = <T>(value: T): HydrationLock<T> => {
  return value as HydrationLock<T>;
};
