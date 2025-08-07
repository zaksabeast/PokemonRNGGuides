import {
  rngTools,
  Species,
  Wild3SearcherResultMon,
  Gen3Lead,
  Gen3Method,
  Wild3MethodDistributionResult,
  Wild3EncounterTable,
  CycleAtMoment,
} from "~/rngTools";
import {
  Field,
  FormikNumberInput,
  FormikSelect,
  ResultColumn,
  RngToolForm,
  RngToolSubmit,
  FormFieldTable,
  FormikRadio,
  FormikResultTable,
  ResultTable,
  Switch,
} from "~/components";
import { toOptions } from "~/utils/options";
import { formatProbability } from "~/utils/formatProbability";
import { useFormikContext } from "formik";
import {
  getPkmFilterInitialValues,
  pkmFilterFieldsToRustInput,
} from "~/components/pkmFilter";
import { Static3Game } from "~/rngToolsUi/gen3/static/constants";
import React from "react";
import { z } from "zod";
import { match } from "ts-pattern";

import { FlattenIvs, ivColumns } from "~/rngToolsUi/shared/ivColumns";
import { Translations } from "~/translations";
import {
  gen3PkmFilterFieldsToRustInput,
  getGen3PkmFilterInitialValues,
} from "~/components/gen3PkmFilter";

import {
  formatMapName,
  formatEncounterTypeName,
  gen3EncounterTypes,
  emeraldWildGameData,
} from "./utils";
import { encounterSlots, nature } from "~/types";
import { TextArea } from "~/components/textArea";
import { C } from "ts-toolbelt";

type UiResultCycleAtMoment = CycleAtMoment & {
  uid: number;
  increment: number;
  diff_cycle_with_compare: number | null;
  diff_increment_with_compare: number | null;
};

const uiCycleAtMomentColumns: ResultColumn<UiResultCycleAtMoment>[] = [
  {
    title: "Moment",
    dataIndex: "moment",
  },
  {
    title: (
      <>
        Cycle from
        <br />
        Sweet Scent start
      </>
    ),
    dataIndex: "cycle",
    key: "cycle",
    render: (cycle, values) => {
      if (values.diff_cycle_with_compare === null) {
        return `${cycle}`;
      }

      const sign = values.diff_cycle_with_compare > 0 ? "+" : "";
      return `${cycle} (${sign}${values.diff_cycle_with_compare})`;
    },
  },
  {
    title: "Increment",
    dataIndex: "increment",
    render: (increment, values) => {
      if (values.diff_increment_with_compare === null) {
        return `${increment}`;
      }

      const sign = values.diff_increment_with_compare > 0 ? "+" : "";
      return `${increment} (${sign}${values.diff_increment_with_compare})`;
    },
  },
];

const compareCycleAtMomentsSchema = z.object({
  advanceAtSweetScentWildEncounter: z.number().optional(),
  cycleAtSweetScentWildEncounter: z.number().optional(),
  cycleAtMoments: z.array(
    z.object({
      moment: z.string(),
      cycle: z.number(),
    }),
  ),
});

const parseCompareCycleAtMoments = (input: string) => {
  try {
    const info = JSON.parse(input);
    return compareCycleAtMomentsSchema.parse(info);
  } catch {
    return null;
  }
};

type Props = {
  cycleAtMoments: CycleAtMoment[];
};

export const Wild3CycleAtMoments = ({ cycleAtMoments }: Props) => {
  const [compareCycleAtMomentsStr, setCompareCycleAtMomentsStr] =
    React.useState("");

  const [displayDebuggingOptions, setDisplayDebuggingOptions] =
    React.useState(false);

  const uiResultsCycleAtMoment = React.useMemo(() => {
    const compareCycleAtMoments = parseCompareCycleAtMoments(
      compareCycleAtMomentsStr,
    );
    return cycleAtMoments.map((cycleAtMoment, idx) => {
      const prevInfo = idx === 0 ? undefined : cycleAtMoments[idx - 1];
      const compareInfo = compareCycleAtMoments?.cycleAtMoments.find(
        (cac) => cac.moment === cycleAtMoment.moment,
      );
      const comparePrevCycle =
        idx === 0
          ? 0
          : compareCycleAtMoments?.cycleAtMoments.find(
              (cac) => cac.moment === prevInfo?.moment,
            )?.cycle;

      const increment = cycleAtMoment.cycle - (prevInfo?.cycle ?? 0);

      if (compareInfo != null && comparePrevCycle != null) {
        const compareIncrement = compareInfo.cycle - comparePrevCycle;
        const diff_increment_with_compare = increment - compareIncrement;
        return {
          ...cycleAtMoment,
          uid: Math.random(),
          diff_cycle_with_compare: cycleAtMoment.cycle - compareInfo.cycle,
          increment,
          diff_increment_with_compare,
        };
      }
      return {
        ...cycleAtMoment,
        uid: Math.random(),
        increment,
        diff_cycle_with_compare: null,
        diff_increment_with_compare: null,
      };
    });
  }, [cycleAtMoments, compareCycleAtMomentsStr]);

  const fields = React.useMemo(() => {
    return [
      {
        label: "Display debugging options?",
        input: (
          <Switch
            onChange={(val) => {
              setCompareCycleAtMomentsStr(val);
            }}
          />
        ),
      },
      {
        label: "Display debugging options?",
        input: (
          <TextArea
            onChange={(val) => {
              setCompareCycleAtMomentsStr(val.target.value);
            }}
          />
        ),
      },
    ];
  }, []);

  return (
    <>
      <FormFieldTable fields={fields} />
      <ResultTable<UiResultCycleAtMoment>
        columns={uiCycleAtMomentColumns}
        rowKey="uid"
        dataSource={uiResultsCycleAtMoment}
      />
    </>
  );
};
