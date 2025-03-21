import React from "react";
import {
  FormikInput,
  ResultColumn,
  RngToolForm,
  RngToolSubmit,
  Field,
  FormikIdFilter,
} from "~/components";
import { search_dppt_ids, Id4 } from "rng_tools";
import {
  DecimalString,
  fromDecimalString,
  toDecimalString,
} from "~/utils/number";
import { denormalizeIdFilter, IdFilter } from "~/types/id";

const columns: ResultColumn<Id4>[] = [
  {
    title: "Seed",
    dataIndex: "seed",
    key: "seed",
    render: (seed) => seed.toString(16).toUpperCase().padStart(8, "0"),
  },
  {
    title: "Tid",
    dataIndex: "tid",
    key: "tid",
  },
  {
    title: "Sid",
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
  year: DecimalString;
  minDelay: DecimalString;
  maxDelay: DecimalString;
  filter: IdFilter;
};

const initialValues: FormState = {
  year: toDecimalString(2000),
  minDelay: toDecimalString(5000),
  maxDelay: toDecimalString(6000),
  filter: {
    type: "tid",
    value0: toDecimalString(0),
    value1: "",
  },
};

const fields: Field[] = [
  {
    label: "Year",
    input: <FormikInput<FormState> name="year" />,
  },
  {
    label: "Min Delay",
    input: <FormikInput<FormState> name="minDelay" />,
  },
  {
    label: "Max Delay",
    input: <FormikInput<FormState> name="maxDelay" />,
  },
  {
    label: "Filter",
    input: <FormikIdFilter<FormState> name="filter" />,
  },
];

export const DpptIdSearcher = () => {
  const [results, setResults] = React.useState<Id4[]>([]);

  const onSubmit = React.useCallback<RngToolSubmit<FormState>>((opts) => {
    const year = fromDecimalString(opts.year);
    const minDelay = fromDecimalString(opts.minDelay);
    const maxDelay = fromDecimalString(opts.maxDelay);

    if (year == null || minDelay == null || maxDelay == null) {
      return;
    }

    const results = search_dppt_ids({
      year,
      min_delay: minDelay,
      max_delay: maxDelay,
      filter: denormalizeIdFilter(opts.filter),
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
