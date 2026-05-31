import type { ElmCall } from "~/rngTools";

export const sanitizeElmCalls = (value: string): string => {
  return value
    .toUpperCase()
    .replace(/[^EKP,\s]/g, "")
    .replace(/\s+/g, "")
    .replace(/,+/g, ",")
    .replace(/^,|,$/g, "");
};

export const parseElmCallFilter = (value: string): ElmCall[] => {
  return sanitizeElmCalls(value)
    .split(",")
    .filter(Boolean) as ElmCall[];
};

export const matchesElmCallFilter = (
  elmCalls: ElmCall[],
  filter: string,
): boolean => {
  const pattern = parseElmCallFilter(filter);

  if (pattern.length === 0) {
    return true;
  }

  for (let i = 0; i <= elmCalls.length - pattern.length; i++) {
    let match = true;

    for (let j = 0; j < pattern.length; j++) {
      if (elmCalls[i + j] !== pattern[j]) {
        match = false;
        break;
      }
    }

    if (match) return true;
  }

  return false;
};