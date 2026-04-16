import { STAT_I18N_KEYS, STAT_KEYS } from "./constants";
import type { IvRangeColumn } from "./types";
import type { Translations } from "~/translations";

export const formatStatRange = (stat: number[], na: string): string => {
  if (stat.length === 0) {
    return na;
  }

  const sorted = [...stat].sort((first, second) => first - second);
  const ranges: string[] = [];
  let rangeStart = sorted[0];
  let rangeEnd = sorted[0];

  for (let i = 1; i <= sorted.length; i++) {
    const current = sorted[i];

    if (current !== undefined && current === rangeEnd + 1) {
      rangeEnd = current;
    } else {
      // End of a sequence
      if (rangeStart === rangeEnd) {
        ranges.push(rangeStart.toString());
      } else if (rangeEnd === rangeStart + 1) {
        ranges.push(`${rangeStart}, ${rangeEnd}`);
      } else {
        ranges.push(`${rangeStart}-${rangeEnd}`);
      }

      if (i < sorted.length) {
        rangeStart = current;
        rangeEnd = current;
      }
    }
  }

  return ranges.join(", ");
};

export const getIvRangeRow = (
  t: Translations,
  key: (typeof STAT_KEYS)[number],
  index: number,
  nextLevelStats: Record<(typeof STAT_KEYS)[number], number> | undefined,
  possibleIvs: Record<(typeof STAT_KEYS)[number], number[]> | undefined,
  NA: string,
  formatFn: (stat: number[], na: string) => string,
): IvRangeColumn => ({
  stat: t[STAT_I18N_KEYS[index]],
  nextLevel: (nextLevelStats?.[key] ?? NA) as number | string,
  value: possibleIvs != null ? formatFn(possibleIvs[key], NA) : NA,
});
