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
import { rngTools, Gen6Id, RngDate } from "~/rngTools";
import { denormalizeIdFilter, IdFilter } from "~/types/id";
import { FormikDatePicker, FormikTimePicker } from "~/components/datePicker";
import {
  addRngTime,
  formatRngDateTime,
  rngDate,
  rngTime,
  RngTime,
} from "~/utils/time";

const columns: ResultColumn<Gen6Id>[] = [
  {
    title: "Seed",
    dataIndex: "seed",
    key: "seed",
    monospace: true,
    render: (seed) => seed.toString(16).toUpperCase().padStart(8, "0"),
  },
  {
    title: "Advances",
    dataIndex: "advances",
    key: "advances",
  },
  {
    title: "TID",
    dataIndex: "tid",
    key: "tid",
  },
  {
    title: "SID",
    dataIndex: "sid",
    key: "sid",
  },
  {
    title: "TSV",
    dataIndex: "tsv",
    key: "tsv",
  },
  {
    title: "Date/Time",
    dataIndex: "datetime",
    key: "datetime",
    render: (date) => formatRngDateTime(date, { seconds: true }),
  },
  {
    title: "State",
    dataIndex: "tinymt_state",
    key: "tinymt_state",
    monospace: true,
    render: (state: number[]) =>
      state
        .map((num) => num.toString(16).padStart(8, "0").toUpperCase())
        .reverse()
        .join(", "),
  },
];

export type FormState = {
  seed: number;
  date: RngDate;
  time: RngTime;
  only_current_seed: boolean;
  initial_advances: number;
  max_advances: number;
  filter: IdFilter;
};

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
    value1: undefined,
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
    input: (
      <FormikSwitch<FormState, "only_current_seed"> name="only_current_seed" />
    ),
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
      filter_id: denormalizeIdFilter(opts.filter) ?? undefined,
    });

    setResults(results);
  }, []);

  return (
    <RngToolForm<FormState, Gen6Id>
      fields={fields}
      columns={columns}
      results={results}
      initialValues={initialValues}
      onSubmit={onSubmit}
      submitTrackerId="generate_oras_id"
    />
  );
};
