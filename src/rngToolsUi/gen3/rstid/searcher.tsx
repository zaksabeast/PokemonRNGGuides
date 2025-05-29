import { Gen3TidSidResult, rngTools } from "~/rngTools";
import {
  Field,
  FormikNumberInput,
  ResultColumn,
  RngToolForm,
  RngToolSubmit,
} from "~/components";
import React from "react";
import { denormalizeIdFilter } from "~/types/id";
import { z } from "zod";
import { useRsTidState } from "./rsTidState";
import { CalibrateButton } from "./calibrateButton";
import { createGen3TimerAtom } from "~/hooks/useGen3Timer";
import { Gen3Timer } from "~/components/gen3Timer";

const timerAtom = createGen3TimerAtom();

type Result = Gen3TidSidResult & { offset: number };

const columns: ResultColumn<Result>[] = [
  {
    title: "Calibrate",
    dataIndex: "advance",
    render: (_, result) => (
      <CalibrateButton hitAdvance={result.advance} timer={timerAtom} />
    ),
  },
  { title: "Offset", dataIndex: "offset" },
  { title: "TID", dataIndex: "tid" },
  { title: "SID", dataIndex: "sid" },
  { title: "TSV", dataIndex: "tsv" },
];

const Validator = z.object({
  offset: z.number().int().min(0),
  initial_advances: z.number().int().min(0),
  max_advances: z.number().int().min(0),
  hit_tid: z.number().int().min(0).max(65535),
});

export type FormState = z.infer<typeof Validator>;

const initialValues: FormState = {
  initial_advances: 0,
  max_advances: 10000,
  offset: 0,
  hit_tid: 0,
};

const fields: Field[] = [
  {
    label: "Initial Advances",
    input: (
      <FormikNumberInput<FormState> name="initial_advances" numType="decimal" />
    ),
  },
  {
    label: "Max Advances",
    input: (
      <FormikNumberInput<FormState> name="max_advances" numType="decimal" />
    ),
  },
  {
    label: "Hit TID",
    input: <FormikNumberInput<FormState> name="hit_tid" numType="decimal" />,
  },
];

export const RsTidTimer = () => {
  const [state] = useRsTidState();
  return (
    <Gen3Timer
      trackerId="retail_tid_timer"
      targetAdvance={state.targetAdvance}
      timer={timerAtom}
    />
  );
};

export const RsTidSearcher = () => {
  const [results, setResults] = React.useState<Result[]>([]);
  const [state] = useRsTidState();

  const onSubmit = React.useCallback<RngToolSubmit<FormState>>(
    async (opts) => {
      const results = await rngTools.gen3_tidsid_states({
        offset: opts.offset,
        initial_advances: opts.initial_advances,
        max_advances: opts.max_advances,
        version_options: {
          Rs: "DeadBattery",
        },
        filter: denormalizeIdFilter({
          type: "tid",
          value0: opts.hit_tid,
          value1: null,
        }),
      });

      const updatedResults = results.map((res) => ({
        ...res,
        offset: state.targetAdvance - res.advance,
      }));

      setResults(updatedResults);
    },
    [state],
  );

  return (
    <RngToolForm<FormState, Result>
      fields={fields}
      columns={columns}
      results={results}
      initialValues={initialValues}
      validationSchema={Validator}
      onSubmit={onSubmit}
      submitTrackerId="search_rs_tidsid"
      rowKey="advance"
    />
  );
};
