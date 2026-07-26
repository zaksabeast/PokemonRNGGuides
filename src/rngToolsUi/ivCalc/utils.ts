import React from "react";
import { STAT_I18N_KEYS, STAT_KEYS, initialResult } from "./constants";
import type { IvRangeColumn, IvRangeResult, FormState } from "./types";
import type { Translations } from "~/translations";
import { rngTools } from "~/rngTools";

export const formatStatRange = (stat: number[], na: string): string => {
  if (stat.length === 0) {
    return na;
  }

  const sorted = [...new Set(stat)].sort((first, second) => first - second);
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

const formatIvRangeData = ({
  t,
  result,
}: {
  t: Translations;
  result: IvRangeResult;
}): IvRangeColumn[] => {
  const ivRanges = result.data[result.data.length - 1]?.ivRanges;
  const possibleIvs = ivRanges?.possible_ivs;
  const nextLevelStats = ivRanges?.next_level_stats;
  const NA = t["N/A"];

  return STAT_KEYS.map((key, index) =>
    getIvRangeRow(
      t,
      key,
      index,
      nextLevelStats,
      possibleIvs,
      NA,
      formatStatRange,
    ),
  );
};

export const useOnSubmit = ({ t }: { t: Translations }) => {
  const [result, setResult] = React.useState<IvRangeResult>(initialResult);

  const onSubmit = async (opts: FormState) => {
    const stats: Record<(typeof STAT_KEYS)[number], number> = {
      hp: opts.hpStat,
      atk: opts.atkStat,
      def: opts.defStat,
      spa: opts.spaStat,
      spd: opts.spdStat,
      spe: opts.speStat,
    };
    const latestLevelStat = { level: opts.level, stats };
    const previousLevelStats = result.data.map(
      (entry) => entry.submittedLevelStats,
    );
    const levelStats = [...previousLevelStats, latestLevelStat];
    const ivRanges = await rngTools.calculate_iv_ranges({
      characteristic:
        opts.gen === "3" || opts.characteristic === "None"
          ? null
          : opts.characteristic,
      hidden_power: null,
      nature: opts.nature,
      species: opts.species,
      level_stats: levelStats,
    });

    if (ivRanges == null) {
      setResult((prev) => ({
        ...prev,
        message:
          t[
            "No possible IV combinations found. Please check your input and try again."
          ],
      }));
      return;
    }

    setResult((prev) => ({
      hasSubmitted: true,
      errorMessage: null,
      data: [...prev.data, { ivRanges, submittedLevelStats: latestLevelStat }],
    }));
  };

  return {
    onSubmit,
    setResult,
    result,
    ivRangeData: formatIvRangeData({ t, result }),
  };
};
