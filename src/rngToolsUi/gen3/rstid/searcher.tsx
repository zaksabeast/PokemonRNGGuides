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
  hit_tid: z.number().int().min(0).max(65535),
});

export type FormState = z.infer<typeof Validator>;

const initialValues: FormState = {
  initial_advances: 0,
  max_advances: 1000,
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

type RsTidSearcherProps = {
  targetAdvance: number;
  setOffset: React.Dispatch<React.SetStateAction<number>>;
};

export const RsTidSearcher: React.FC<RsTidSearcherProps> = ({
  targetAdvance,
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
        filter: denormalizeIdFilter({
          type: "tid",
          value0: opts.hit_tid,
          value1: null,
        }),
      });

      const updatedResults = results.map((r) => ({
        ...r,
        offset: targetAdvance - r.advance,
      }));

      setResults(updatedResults);
    },
    [targetAdvance],
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
      submitTrackerId="search_rs_tidsid"
      onClickResultRow={onClickResultRow}
      rowKey="advance"
    />
  );
};
