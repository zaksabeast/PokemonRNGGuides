import React from "react";
import {
  FormikNumberInput,
  ResultColumn,
  RngToolForm,
  RngToolSubmit,
  Field,
  FormikIdFilter,
} from "~/components";
import { rngTools, Id4 } from "~/rngTools";
import { denormalizeIdFilterOrDefault, IdFilter } from "~/types/id";

const columns: ResultColumn<Id4>[] = [
  {
    title: "Seed",
    dataIndex: "seed",
    monospace: true,
    render: (seed) => seed.toString(16).toUpperCase().padStart(8, "0"),
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
    title: "Delay",
    dataIndex: "delay",
  },
];

type FormState = {
  year: number;
  min_delay: number;
  max_delay: number;
  filter: IdFilter;
};

const initialValues: FormState = {
  year: 2000,
  min_delay: 5000,
  max_delay: 6000,
  filter: {
    type: "tid",
    value0: 0,
    value1: undefined,
  },
};

const fields: Field[] = [
  {
    label: "Year",
    input: <FormikNumberInput<FormState> name="year" numType="decimal" />,
  },
  {
    label: "Min Delay",
    input: <FormikNumberInput<FormState> name="min_delay" numType="decimal" />,
  },
  {
    label: "Max Delay",
    input: <FormikNumberInput<FormState> name="max_delay" numType="decimal" />,
  },
  {
    label: "Filter",
    input: <FormikIdFilter<FormState> name="filter" />,
  },
];

export const DpptIdSearcher = () => {
  const [results, setResults] = React.useState<Id4[]>([]);

  const onSubmit = React.useCallback<RngToolSubmit<FormState>>(async (opts) => {
    const results = await rngTools.search_dppt_ids({
      ...opts,
      filter: denormalizeIdFilterOrDefault(opts.filter),
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
      submitTrackerId="search_dppt_id"
    />
  );
};
