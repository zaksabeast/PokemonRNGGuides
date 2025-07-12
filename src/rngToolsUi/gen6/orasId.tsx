import React from "react";
import {
  FormikNumberInput,
  ResultColumn,
  RngToolForm,
  RngToolSubmit,
  Field,
  FormikIdFilter,
  FormikSwitch,
} from "~/components";
import { rngTools, Gen6Id } from "~/rngTools";
import { denormalizeIdFilter, IdFilterSchema } from "~/types/id";
import { FormikDatePicker, FormikTimePicker } from "~/components/datePicker";
import {
  addRngTime,
  formatRngDateTime,
  rngDate,
  rngTime,
  RngDateSchema,
  RngTimeSchema,
} from "~/utils/time";
import { z } from "zod";
import { HexSchema } from "~/utils/number";

const columns: ResultColumn<Gen6Id>[] = [
  {
    title: "Seed",
    dataIndex: "seed",
    monospace: true,
    render: (seed) => seed.toString(16).toUpperCase().padStart(8, "0"),
  },
  {
    title: "Advances",
    dataIndex: "advances",
  },
  {
    title: "TID",
    dataIndex: "tid",
  },
  {
    title: "SID",
    dataIndex: "sid",
  },
  {
    title: "TSV",
    dataIndex: "tsv",
  },
  {
    title: "Date/Time",
    dataIndex: "datetime",
    render: (date) => formatRngDateTime(date, { seconds: true }),
  },
  {
    title: "State",
    dataIndex: "tinymt_state",
    monospace: true,
    render: (state: number[]) =>
      state
        .map((num) => num.toString(16).padStart(8, "0").toUpperCase())
        .reverse()
        .join(", "),
  },
];

const Validator = z.object({
  seed: HexSchema(0xffffffff),
  date: RngDateSchema,
  time: RngTimeSchema,
  only_current_seed: z.boolean(),
  initial_advances: z.number().int().min(0),
  max_advances: z.number().int().min(0),
  filter: IdFilterSchema,
});

export type FormState = z.infer<typeof Validator>;

const initialValues: FormState = {
  seed: 0,
  date: rngDate(),
  time: rngTime(),
  only_current_seed: false,
  initial_advances: 20,
  max_advances: 50,
  filter: {
    type: "tid",
    value0: 0,
    value1: null,
  },
};

const fields: Field[] = [
  {
    label: "TinyMT u32 Seed",
    input: <FormikNumberInput<FormState> name="seed" numType="hex" />,
  },
  {
    label: "Boot Date",
    input: <FormikDatePicker<FormState> name="date" />,
  },
  {
    label: "Boot Time",
    input: <FormikTimePicker<FormState> name="time" showSecond />,
  },
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
    label: "Only Current Seed",
    input: <FormikSwitch<FormState> name="only_current_seed" />,
  },
  {
    label: "Filter",
    input: <FormikIdFilter<FormState> name="filter" optional />,
  },
];

export const OrasId = () => {
  const [results, setResults] = React.useState<Gen6Id[]>([]);

  const onSubmit = React.useCallback<RngToolSubmit<FormState>>(async (opts) => {
    const results = await rngTools.generate_oras_id({
      start_seed: opts.seed,
      only_start_seed: opts.only_current_seed,
      initial_advances: opts.initial_advances,
      max_advances: opts.max_advances,
      start_datetime: addRngTime(opts.date, opts.time),
      filter_id: denormalizeIdFilter(opts.filter),
    });

    setResults(results);
  }, []);

  return (
    <RngToolForm<FormState, Gen6Id>
      fields={fields}
      columns={columns}
      results={results}
      validationSchema={Validator}
      initialValues={initialValues}
      onSubmit={onSubmit}
      submitTrackerId="generate_oras_id"
    />
  );
};
