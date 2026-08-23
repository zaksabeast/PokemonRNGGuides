/**
 * Checks if a value is in a readonly array.
 * Fixes the issue of `Array.includes` not narrowing the type of the value.
 */
export const isIn = <T extends U, U>(arr: readonly T[], item: U): item is T => {
  return arr.includes(item as T);
};
