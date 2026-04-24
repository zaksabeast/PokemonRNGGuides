import { LevelStat } from "~/rngTools";
import { ResultColumn } from "~/components";
import { Translations } from "~/translations";
import { STAT_KEYS, STAT_I18N_KEYS } from "./constants";
import type { IvRangeColumn } from "./types";

export const getColumns = (t: Translations): ResultColumn<LevelStat>[] => {
  const baseColumn: ResultColumn<LevelStat>[] = [
    {
      title: t["Level"],
      dataIndex: "level",
    },
  ];

  const statColumns: ResultColumn<LevelStat>[] = STAT_KEYS.map(
    (key, index) => ({
      title: t[STAT_I18N_KEYS[index]],
      dataIndex: "stats" as const,
      key,
      render: (_value: unknown, levelStat: LevelStat) => levelStat.stats[key],
    }),
  );

  return [...baseColumn, ...statColumns];
};

export const ivRangeColumns: (
  t: Translations,
) => ResultColumn<IvRangeColumn>[] = (t) => [
  {
    title: t["Stat"],
    dataIndex: "stat",
    key: "stat",
  },
  {
    title: t["Next Level"],
    dataIndex: "nextLevel",
    key: "nextLevel",
  },
  {
    title: t["Possible IVs"],
    dataIndex: "value",
  },
];
