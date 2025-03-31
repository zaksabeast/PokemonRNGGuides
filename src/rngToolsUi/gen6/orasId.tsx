import React from "react";
import {
  FormikInput,
  ResultColumn,
  RngToolForm,
  RngToolSubmit,
  Field,
  FormikIdFilter,
  FormikSwitch,
} from "~/components";
import { rngTools, Gen6Id } from "~/rngTools";
import {
  DecimalString,
  fromDecimalString,
  fromHexString,
  HexString,
  toDecimalString,
  toHexString,
} from "~/utils/number";
import { denormalizeIdFilter, IdFilter } from "~/types/id";
import dayjs, { Dayjs } from "dayjs";
import { FormikDatePicker, FormikTimePicker } from "~/components/datePicker";
import { formatRngDateTime, toRngDateTime } from "~/utils/time";

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

type FormState = {
  seed: HexString;
  date: Dayjs;
  time: Dayjs;
  onlyCurrentSeed: boolean;
  initialAdvances: DecimalString;
  maxAdvances: DecimalString;
  filter: IdFilter;
};

const initialValues: FormState = {
  seed: toHexString(0),
  date: dayjs(),
  time: dayjs(),
  onlyCurrentSeed: false,
  initialAdvances: toDecimalString(20),
  maxAdvances: toDecimalString(50),
  filter: {
    type: "tid",
    value0: toDecimalString(0),
    value1: "",
  },
};

const fields: Field[] = [
  {
    label: "TinyMT u32 Seed",
    input: <FormikInput<FormState> name="seed" />,
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
    input: <FormikInput<FormState> name="initialAdvances" />,
  },
  {
    label: "Max Advances",
    input: <FormikInput<FormState> name="maxAdvances" />,
  },
  {
    label: "Only Current Seed",
    input: (
      <FormikSwitch<FormState, "onlyCurrentSeed"> name="onlyCurrentSeed" />
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
    const seed = fromHexString(opts.seed);
    const initialAdvances = fromDecimalString(opts.initialAdvances);
    const maxAdvances = fromDecimalString(opts.maxAdvances);

    if (seed == null || initialAdvances == null || maxAdvances == null) {
      return;
    }

    const datetime = dayjs(opts.date)
      .set("hour", opts.time.hour())
      .set("minute", opts.time.minute())
      .set("second", opts.time.second());
    const rngDateTime = toRngDateTime(datetime);

    const results = await rngTools.generate_oras_id({
      start_seed: seed,
      only_start_seed: opts.onlyCurrentSeed,
      start_datetime: rngDateTime,
      initial_advances: initialAdvances,
      max_advances: maxAdvances,
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
