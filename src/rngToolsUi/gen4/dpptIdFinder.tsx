import React from "react";
import {
  FormikInput,
  ResultColumn,
  RngToolForm,
  RngToolSubmit,
  Field,
} from "~/components";
import { rngTools, Id4 } from "~/rngTools";
import {
  DecimalString,
  fromDecimalString,
  toDecimalString,
} from "~/utils/number";
import { denormalizeIdFilter } from "~/types/id";
import dayjs, { Dayjs } from "dayjs";
import { FormikDatePicker, FormikTimePicker } from "~/components/datePicker";
import { toRngDateTime } from "~/utils/time";

const columns: ResultColumn<Id4>[] = [
  {
    title: "Seed",
    dataIndex: "seed",
    key: "seed",
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
  tid: DecimalString;
  date: Dayjs;
  time: Dayjs;
  minDelay: DecimalString;
  maxDelay: DecimalString;
};

const initialValues: FormState = {
  tid: toDecimalString(0),
  date: dayjs(),
  time: dayjs(),
  minDelay: toDecimalString(5000),
  maxDelay: toDecimalString(6000),
};

const fields: Field[] = [
  {
    label: "Tid Obtained",
    input: <FormikInput<FormState> name="tid" />,
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
    input: <FormikInput<FormState> name="minDelay" />,
  },
  {
    label: "Max Delay",
    input: <FormikInput<FormState> name="maxDelay" />,
  },
];

export const DpptIdFinder = () => {
  const [results, setResults] = React.useState<Id4[]>([]);

  const onSubmit = React.useCallback<RngToolSubmit<FormState>>(async (opts) => {
    const tid = fromDecimalString(opts.tid);
    const minDelay = fromDecimalString(opts.minDelay);
    const maxDelay = fromDecimalString(opts.maxDelay);

    if (tid == null || minDelay == null || maxDelay == null) {
      return;
    }

    const datetime = dayjs(opts.date)
      .set("hour", opts.time.hour())
      .set("minute", opts.time.minute())
      .set("second", opts.time.second());
    const rngDateTime = toRngDateTime(datetime);

    const results = await rngTools.generate_dppt_ids({
      datetime: rngDateTime,
      min_delay: minDelay,
      max_delay: maxDelay,
      filter: denormalizeIdFilter({
        type: "tid",
        value0: opts.tid,
        value1: "",
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
