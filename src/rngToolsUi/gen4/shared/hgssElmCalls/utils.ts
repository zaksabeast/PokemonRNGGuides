import type { ElmCall } from "~/rngTools";
import { matchesSubsequence } from "~/utils/matchesSubsequence";

const isElmCall = (char: string): char is ElmCall => {
  return char === "E" || char === "K" || char === "P";
};

export const sanitizeElmCalls = (value: string): string => {
  return parseElmCallFilter(value).join(",");
};

export const parseElmCallFilter = (value: string): ElmCall[] => {
  return value.toUpperCase().split("").filter(isElmCall);
};

export const matchesElmCallFilter = (
  elmCalls: ElmCall[],
  filter: string,
): boolean => {
  const pattern = parseElmCallFilter(filter);
  return matchesSubsequence(elmCalls, pattern);
};
