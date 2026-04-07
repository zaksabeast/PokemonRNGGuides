import { CycleAtMoment, Moment } from "~/rngTools";
import {
  Field,
  ResultColumn,
  FormFieldTable,
  ResultTable,
  Switch,
} from "~/components";
import React from "react";
import { z } from "zod";
import { TextArea } from "~/components/textArea";
import { formatLargeInteger } from "~/utils/formatLargeInteger";

type UiResultCycleAtMoment = {
  uid: number;
  moment: Moment;
  dataFromJson: {
    cycle: number;
    frame: number;
    cycleFromSweetScent: number;
    cycleFromSweetScentIncrement: number;
  };
  dataFromTool: {
    cycleFromSweetScent: number;
    cycleFromSweetScentIncrement: number;
  };
  dataDiff: {
    cycleFromSweetScent: number;
    cycleFromSweetScentIncrement: number;
  };
};

const uiCycleAtMomentColumns: ResultColumn<UiResultCycleAtMoment>[] = [
  {
    title: "Moment",
    dataIndex: "moment",
  },
  {
    type: "group",
    title: (
      <>
        Data from
        <br />
        JSON generated
        <br />
        by emulator (lua)
      </>
    ),
    key: "dataFromJson_group",
    columns: [
      {
        title: "Frame",
        key: "dataFromJson_Frame",
        dataIndex: "dataFromJson",
        render: (dataFromJson) => {
          return formatLargeInteger(dataFromJson.frame);
        },
      },
      {
        title: "Cycle",
        key: "dataFromJson_Cycle",
        dataIndex: "dataFromJson",
        render: (dataFromJson) => {
          return formatLargeInteger(dataFromJson.cycle);
        },
      },
      {
        title: (
          <>
            Cycle from
            <br />
            Sweet Scent start
            <br />
            excluding Vblank
          </>
        ),
        key: "dataFromJson_CycleSweetScent",
        dataIndex: "dataFromJson",
        render: (dataFromJson) => {
          return formatLargeInteger(dataFromJson.cycleFromSweetScent);
        },
      },
      {
        title: "Increment",
        key: "dataFromJson_Increment",
        dataIndex: "dataFromJson",
        render: (dataFromJson) => {
          return `+${formatLargeInteger(dataFromJson.cycleFromSweetScentIncrement)}`;
        },
      },
    ],
  },
  {
    type: "group",
    title: "Webtool difference with JSON",
    columns: [
      {
        title: (
          <>
            Cycle from
            <br />
            Sweet Scent start
            <br />
            excluding Vblank
          </>
        ),
        key: "dataDiff_CycleSweetScent",
        dataIndex: "dataDiff",
        render: (dataDiff) => {
          return formatLargeInteger(dataDiff.cycleFromSweetScent);
        },
      },
      {
        title: "Increment",
        key: "dataDiff_Increment",
        dataIndex: "dataDiff",
        render: (dataDiff) => {
          return `+${formatLargeInteger(dataDiff.cycleFromSweetScentIncrement)}`;
        },
      },
    ],
  },
];

const cycleAtMomentsFromJsonSchema = z.object({
  cycleAtMoments: z.array(
    z.object({
      moment: z.string(),
      cycle: z.number(),
      frame: z.number(),
      adv: z.number(),
    }),
  ),
});

export type CompareCycleAtMomentsFromJson = z.infer<
  typeof cycleAtMomentsFromJsonSchema
>;

const parseCompareCycleAtMoments = (input: string) => {
  try {
    const info = JSON.parse(input);
    return cycleAtMomentsFromJsonSchema.parse(info);
  } catch {
    return null;
  }
};

type Props = {
  cycleAtMomentsFromTool: CycleAtMoment[];
};

let nextUid = 0;

const createUiResultCycleAtMomentsFromJson = (
  dataFromJson: CompareCycleAtMomentsFromJson,
) => {
  /* 
  Example:
  {
    "cycleAtMoments":[
      {"moment":"SweetScentWildEncounter", "cycle":54797, "frame":2026, "adv":2044},
      {"moment":"ChooseWildMonIndex_Land_Random", "cycle":94959, "frame":2026, "adv":2044},
      {"moment":"ChooseWildMonLevel_RandomLvl", "cycle":95604, "frame":2026, "adv":2045},
      {"moment":"PickWildMonNature_RandomTestSynchro", "cycle":163443, "frame":2026, "adv":2046},
      {"moment":"CreateMonWithNature_RandomPidLowFirst", "cycle":164611, "frame":2026, "adv":2047},
      {"moment":"CreateMonWithNature_RandomPidLowLast", "cycle":164711, "frame":2026, "adv":2048},
      {"moment":"CreateMonWithNature_RandomPidHighLast", "cycle":167676, "frame":2026, "adv":2054},
      {"moment":"VblankIntr_End", "cycle":50235, "frame":2027, "adv":2056},
      {"moment":"CreateBoxMon_RandomIvs1", "cycle":60589, "frame":2027, "adv":2056},
      {"moment":"CreateBoxMon_RandomIvs2", "cycle":102544, "frame":2027, "adv":2057},
    ],
    "method":"Wild2",
  }
  */
  const camNoVblank = dataFromJson.cycleAtMoments.filter(
    (cam) => cam.moment !== "VblankIntr_End",
  );

  return c;
};

export const Wild3CycleAtMoments = ({ cycleAtMomentsFromTool }: Props) => {
  const [compareCycleAtMomentsStr, setCompareCycleAtMomentsStr] =
    React.useState("");

  const [displayDebuggingOptions, setDisplayDebuggingOptions] =
    React.useState(false);

  const uiResultsCycleAtMoment = React.useMemo(() => {
    const dataFromJson = parseCompareCycleAtMoments(compareCycleAtMomentsStr);
    return cycleAtMomentsFromTool.map((cycleAtMoment, idx) => {
      const prevInfo = idx === 0 ? undefined : cycleAtMomentsFromTool[idx - 1];
      const compareInfo = dataFromJson?.cycleAtMoments.find(
        (cac) => cac.moment === cycleAtMoment.moment,
      );
      const comparePrevCycle =
        idx === 0
          ? 0
          : dataFromJson?.cycleAtMoments.find(
              (cac) => cac.moment === prevInfo?.moment,
            )?.cycle;

      const increment = cycleAtMoment.cycle - (prevInfo?.cycle ?? 0);

      if (compareInfo != null && comparePrevCycle != null) {
        const compareIncrement = compareInfo.cycle - comparePrevCycle;
        const diff_increment_with_compare = increment - compareIncrement;
        return {
          ...cycleAtMoment,
          uid: nextUid++,
          diff_cycle_with_compare: cycleAtMoment.cycle - compareInfo.cycle,
          increment,
          diff_increment_with_compare,
        };
      }
      return {
        ...cycleAtMoment,
        uid: nextUid++,
        increment,
        diff_cycle_with_compare: null,
        diff_increment_with_compare: null,
      };
    });
  }, [cycleAtMoments, compareCycleAtMomentsStr]);

  const fields: Field[] = React.useMemo(() => {
    return [
      {
        label: "Display debugging options?",
        input: (
          <Switch
            onChange={(val) => {
              setDisplayDebuggingOptions(val);
            }}
          />
        ),
      },
      {
        label: (
          <>
            Copy-paste the JSON generated by this{" "}
            <a href="https://raw.githubusercontent.com/RainingChain/pk_emu_scripts/refs/heads/main/Gen3/wild3_cycle_at_moments.lua">
              lua script
            </a>{" "}
            after a wild encounter to compare with the tool results.
          </>
        ),
        key: "compareCycleAtMomentsStr",
        direction: "column" as const,
        input: (
          <TextArea
            rows={5}
            onChange={(val) => {
              setCompareCycleAtMomentsStr(val.target.value);
            }}
          />
        ),
        show: displayDebuggingOptions,
      },
    ];
  }, [displayDebuggingOptions]);

  return (
    <>
      <FormFieldTable fields={fields} />
      {displayDebuggingOptions && (
        <div>
          <strong>Use case:</strong> Detect when the tool miscalculates cycles
          and simplify its calibration by developpers.
        </div>
      )}
      {displayDebuggingOptions && (
        <ResultTable<UiResultCycleAtMoment>
          columns={uiCycleAtMomentColumns}
          rowKey="uid"
          dataSource={uiResultsCycleAtMoment}
        />
      )}
    </>
  );
};
