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


type UiResultCycleAtMoment = CycleAtMoment & {
  uid: number;
  increment_from_previous: number;
  increment_from_previous_diff_compare: number | null;
  cycle_diff_compare: number | null;
};


const uiCycleAtMomentColumns: ResultColumn<UiResultCycleAtMoment>[] = [
  {
    title: "Moment",
    dataIndex: "moment",
    key: "moment",
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
  },
  {
    title: "Increment",
    dataIndex: "increment_from_previous",
    key: "increment_from_previous",
  },
];

const parseCompareCycleAtMoments = (input: string) => {
  try {
    const info = JSON.parse(input);
    if (!Array.isArray(info.cycleAtMoments)) {
      return null;
    }
    //NO_PROD use zod?
  } catch (err) {
    return null;
  }
};


type Props = {
  cycleAtMoments: CycleAtMoment[]
};


export const Wild3CycleAtMoments = ({
  cycleAtMoments
}:Props) => {

  
  
      const uiResultsCycleAtMoment: UiResultCycleAtMoment[] =
        cycle_at_moments.map((cycle_at_moment, idx) => {
          const prevCycle = idx === 0 ? 0 : cycle_at_moments[idx - 1].cycle;
          const increment_from_previous_diff_compare: number | null = null;

          const compareCycle = 0; // NO_PROD

          return {
            ...cycle_at_moment,
            uid: nextUid++,
            increment_from_previous: cycle_at_moment.cycle - prevCycle,
            increment_from_previous_diff_compare: 0,
            cycle_diff_compare: 0,
          };
        });
      setResultsUiCycleAtMoment(uiResultsCycleAtMoment);

  return (
    <ResultTable<UiResultCycleAtMoment>
      columns={uiCycleAtMomentColumns}
      rowKey="uid"
      dataSource={uiResultsCycleAtMoment}
    />);
};
