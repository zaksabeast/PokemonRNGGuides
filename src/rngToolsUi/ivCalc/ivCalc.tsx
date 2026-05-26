import React from "react";
import {
  Button,
  Flex,
  ResultTable,
  RngToolForm,
  type RngToolSubmit,
} from "~/components";
import { rngTools } from "~/rngTools";
import { useActiveRouteTranslations } from "~/hooks/useActiveRoute";
import { Typography } from "antd";

import { Fields } from "./components";
import { STAT_KEYS, initialValues, initialResult } from "./constants";
import { getColumns, ivRangeColumns } from "./columns";
import { formatStatRange, getIvRangeRow } from "./utils";
import {
  Validator,
  type FormState,
  type IvRangeColumn,
  type IvRangeResult,
} from "./types";

export const IvCalc = () => {
  const t = useActiveRouteTranslations();
  const [result, setResult] = React.useState<IvRangeResult>(initialResult);

  const onSubmit: RngToolSubmit<FormState> = async (opts: FormState) => {
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

  const ivRanges = result.data[result.data.length - 1]?.ivRanges;
  const possibleIvs = ivRanges?.possible_ivs;
  const nextLevelStats = ivRanges?.next_level_stats;
  const NA = t["N/A"];

  const ivRangeData: IvRangeColumn[] = STAT_KEYS.map((key, index) =>
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

  return (
    <>
      <RngToolForm<FormState, IvRangeColumn>
        allowReset
        resetTrackerId="iv_calc_reset"
        submitTrackerId="iv_calc_submit"
        submitButtonLabel="Add Data"
        initialValues={initialValues}
        onReset={() => setResult(initialResult)}
        validationSchema={Validator}
        onSubmit={onSubmit}
        columns={ivRangeColumns(t)}
        additionalButtons={
          <Button
            trackerId="iv_calc_remove_last_row"
            disabled={!result.hasSubmitted}
            onClick={() =>
              setResult((prev) => ({
                ...prev,
                data: prev.data.slice(0, -1),
              }))
            }
          >
            Remove Last Row
          </Button>
        }
        results={ivRangeData}
      >
        <Fields hasSubmitted={result.hasSubmitted} />
      </RngToolForm>

      <Flex vertical>
        <Typography.Title level={4}>Applied Stats</Typography.Title>
        <ResultTable
          columns={getColumns(t)}
          dataSource={result.data.map((entry) => entry.submittedLevelStats)}
        />
      </Flex>
    </>
  );
};
