import { Gen3TidSidResult, rngTools } from "~/rngTools";
import {
  Field,
  FormikIdFilter,
  FormikNumberInput,
  ResultColumn,
  RngToolForm,
  RngToolSubmit,
} from "~/components";
import React from "react";
import { denormalizeIdFilter, IdFilterSchema } from "~/types/id";
import { z } from "zod";

export type RsTidTarget = Gen3TidSidResult & { time: string };

const columns: ResultColumn<RsTidTarget>[] = [
  { title: "Advance", dataIndex: "advance" },
  { title: "Est. Time", dataIndex: "time" },
  { title: "TID", dataIndex: "tid" },
  { title: "SID", dataIndex: "sid" },
  { title: "TSV", dataIndex: "tsv" },
];

const Validator = z.object({
  offset: z.number().int().min(0),
  initial_advances: z.number().int().min(0),
  max_advances: z.number().int().min(0),
  filter: IdFilterSchema,
});

export type FormState = z.infer<typeof Validator>;

const initialValues: FormState = {
  initial_advances: 0,
  max_advances: 1000,
  offset: 0,
  filter: {
    type: "tid",
    value0: 0,
    value1: null,
  },
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
    label: "Offset",
    input: <FormikNumberInput<FormState> name="offset" numType="decimal" />,
  },
  {
    label: "Filter",
    input: <FormikIdFilter<FormState> name="filter" optional />,
  },
];

type Props = {
  onSelectTarget: (results: RsTidTarget) => void;
};

const formatTime = (seconds: number): string => {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  return `${hrs}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
};

export const RsTidSidGenerator = ({ onSelectTarget }: Props) => {
  const [results, setResults] = React.useState<RsTidTarget[]>([]);

  const onSubmit = React.useCallback<RngToolSubmit<FormState>>(async (opts) => {
    const results = await rngTools.gen3_tidsid_states({
      offset: opts.offset,
      initial_advances: opts.initial_advances,
      max_advances: opts.max_advances,
      version_options: {
        Rs: "DeadBattery",
      },
      filter: denormalizeIdFilter(opts.filter),
    });

    const updatedResults = results.map((r) => ({
      ...r,
      time: formatTime(r.advance / 59.7275),
    }));

    setResults(updatedResults);
  }, []);

  const onClickResultRow = React.useCallback(
    (results: RsTidTarget) => {
      onSelectTarget(results);
    },
    [onSelectTarget],
  );

  return (
    <RngToolForm<FormState, RsTidTarget>
      fields={fields}
      columns={columns}
      results={results}
      initialValues={initialValues}
      validationSchema={Validator}
      onSubmit={onSubmit}
      submitTrackerId="generate_rs_tidsid"
      onClickResultRow={onClickResultRow}
      rowKey="advance"
    />
  );
};
