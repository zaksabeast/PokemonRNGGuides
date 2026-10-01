declare const hydrationLockBrand: unique symbol;

export type HydrationLock<T> = { readonly [hydrationLockBrand]: T };

export const hydrationLock = <T>(value: T): HydrationLock<T> => {
  return value as HydrationLock<T>;
};
