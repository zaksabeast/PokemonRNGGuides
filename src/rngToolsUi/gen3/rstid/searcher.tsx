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

type Result = Gen3TidSidResult & { offset: number };

const columns: ResultColumn<Result>[] = [
  { title: "Advance", dataIndex: "advance" },
  { title: "Offset", dataIndex: "offset" },
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
    label: "Filter",
    input: <FormikIdFilter<FormState> name="filter" optional />,
  },
];

type RsTidSearcherProps = {
  target: Result;
  setOffset: React.Dispatch<React.SetStateAction<number>>;
};

export const RsTidSearcher: React.FC<RsTidSearcherProps> = ({
  target,
  setOffset,
}) => {
  const [results, setResults] = React.useState<Result[]>([]);

  const onSubmit = React.useCallback<RngToolSubmit<FormState>>(
    async (opts) => {
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
        offset: target.advance - r.advance,
      }));

      setResults(updatedResults);
    },
    [target],
  );

  const onClickResultRow = React.useCallback(
    (results: Result) => {
      setOffset(results.offset);
    },
    [setOffset],
  );

  return (
    <RngToolForm<FormState, Result>
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
