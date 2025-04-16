import React from "react";
import {
  FormikNumberInput,
  ResultColumn,
  RngToolForm,
  RngToolSubmit,
  Field,
} from "~/components";
import { rngTools, Id4 } from "~/rngTools";
import { denormalizeIdFilterOrDefault } from "~/types/id";
import dayjs, { Dayjs } from "dayjs";
import { FormikDatePicker, FormikTimePicker } from "~/components/datePicker";
import { toRngDateTime } from "~/utils/time";

const columns: ResultColumn<Id4>[] = [
  {
    title: "Seed",
    dataIndex: "seed",
    key: "seed",
    monospace: true,
    render: (seed: number) => seed.toString(16).toUpperCase().padStart(8, "0"),
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
    title: "Delay",
    dataIndex: "delay",
    key: "delay",
  },
];

type FormState = {
  tid: number;
  date: Dayjs;
  time: Dayjs;
  minDelay: number;
  maxDelay: number;
};

const initialValues: FormState = {
  tid: 0,
  date: dayjs(),
  time: dayjs(),
  minDelay: 5000,
  maxDelay: 6000,
};

const fields: Field[] = [
  {
    label: "Tid Obtained",
    input: <FormikNumberInput<FormState> name="tid" numType="decimal" />,
  },
  {
    label: "Date",
    input: <FormikDatePicker<FormState> name="date" />,
  },
  {
    label: "Time",
    input: <FormikTimePicker<FormState> name="time" />,
  },
  {
    label: "Min Delay",
    input: <FormikNumberInput<FormState> name="minDelay" numType="decimal" />,
  },
  {
    label: "Max Delay",
    input: <FormikNumberInput<FormState> name="maxDelay" numType="decimal" />,
  },
];

export const DpptIdFinder = () => {
  const [results, setResults] = React.useState<Id4[]>([]);

  const onSubmit = React.useCallback<RngToolSubmit<FormState>>(async (opts) => {
    const datetime = dayjs(opts.date)
      .set("hour", opts.time.hour())
      .set("minute", opts.time.minute())
      .set("second", opts.time.second());
    const rngDateTime = toRngDateTime(datetime);

    const results = await rngTools.generate_dppt_ids({
      datetime: rngDateTime,
      min_delay: opts.minDelay,
      max_delay: opts.maxDelay,
      filter: denormalizeIdFilterOrDefault({
        type: "tid",
        value0: opts.tid,
        value1: undefined,
      }),
    });

    setResults(results);
  }, []);

  return (
    <RngToolForm<FormState, Id4>
      fields={fields}
      columns={columns}
      results={results}
      initialValues={initialValues}
      onSubmit={onSubmit}
      submitTrackerId="generate_oras_id"
    />
  );
};
