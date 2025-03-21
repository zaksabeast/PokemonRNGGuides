import React from "react";
import {
  FormikInput,
  ResultColumn,
  RngToolForm,
  RngToolSubmit,
  Field,
  FormikIdFilter,
} from "~/components";
import { generate_oras_id, Gen6Id } from "rng_tools";
import {
  DecimalString,
  fromDecimalString,
  fromHexString,
  HexString,
  toDecimalString,
  toHexString,
} from "~/utils/number";
import { denormalizeIdFilter, IdFilter } from "~/types/id";

const columns: ResultColumn<Gen6Id>[] = [
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
    title: "State",
    dataIndex: "tinymt_state",
    key: "tinymt_state",
    render: (state: number[]) =>
      state
        .map((num) => num.toString(16).padStart(8, "0").toUpperCase())
        .reverse()
        .join(", "),
  },
];

type FormState = {
  state3: HexString;
  state2: HexString;
  state1: HexString;
  state0: HexString;
  initialAdvances: DecimalString;
  maxAdvances: DecimalString;
  filter: IdFilter;
};

const initialValues: FormState = {
  state3: toHexString(0),
  state2: toHexString(0),
  state1: toHexString(0),
  state0: toHexString(0),
  initialAdvances: toDecimalString(0),
  maxAdvances: toDecimalString(10000),
  filter: {
    type: "tid",
    value0: toDecimalString(0),
    value1: "",
  },
};

const fields: Field[] = [
  {
    label: "State[3]",
    input: <FormikInput<FormState> name="state3" />,
  },
  {
    label: "State[2]",
    input: <FormikInput<FormState> name="state2" />,
  },
  {
    label: "State[1]",
    input: <FormikInput<FormState> name="state1" />,
  },
  {
    label: "State[0]",
    input: <FormikInput<FormState> name="state0" />,
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
    label: "Filter",
    input: <FormikIdFilter<FormState> name="filter" />,
  },
];

export const OrasId = () => {
  const [results, setResults] = React.useState<Gen6Id[]>([]);

  const onSubmit = React.useCallback<RngToolSubmit<FormState>>((opts) => {
    const state3 = fromHexString(opts.state3);
    const state2 = fromHexString(opts.state2);
    const state1 = fromHexString(opts.state1);
    const state0 = fromHexString(opts.state0);
    const initialAdvances = fromDecimalString(opts.initialAdvances);
    const maxAdvances = fromDecimalString(opts.maxAdvances);

    if (
      state3 == null ||
      state2 == null ||
      state1 == null ||
      state0 == null ||
      initialAdvances == null ||
      maxAdvances == null
    ) {
      return;
    }

    const results = generate_oras_id({
      state: [state0, state1, state2, state3],
      initial_advances: initialAdvances,
      max_advances: maxAdvances,
      filter: denormalizeIdFilter(opts.filter),
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
