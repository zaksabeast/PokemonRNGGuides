import React from "react";
import {
  FormikNumberInput,
  ResultColumn,
  RngToolForm,
  RngToolSubmit,
  Field,
} from "~/components";
import { rngTools } from "~/rngTools";

type RngState = {
  advance: number;
  rand: number;
  div: number;
};

const columns: ResultColumn<RngState>[] = [
  {
    title: "Advance",
    dataIndex: "advance",
  },
  {
    title: "State",
    dataIndex: "rand",
    monospace: true,
    render: (rand) => rand.toString(16).padStart(4, "0"),
  },
  {
    title: "Div",
    dataIndex: "div",
    monospace: true,
    render: (div) => div.toString(16).padStart(4, "0"),
  },
];

type FormState = {
  div: number;
  adivIndex: number;
  sdivIndex: number;
  state: number;
  startAdvance: number;
  advanceCount: number;
};

const initialValues: FormState = {
  div: 0,
  adivIndex: 0,
  sdivIndex: 0,
  state: 0,
  startAdvance: 0,
  advanceCount: 10000,
};

const fields: Field[] = [
  {
    label: "ADiv Index",
    input: <FormikNumberInput<FormState> name="adivIndex" numType="decimal" />,
  },
  {
    label: "SDiv Index",
    input: <FormikNumberInput<FormState> name="sdivIndex" numType="decimal" />,
  },
  {
    label: "Div",
    input: <FormikNumberInput<FormState> name="div" numType="hex" />,
  },
  {
    label: "State",
    input: <FormikNumberInput<FormState> name="state" numType="hex" />,
  },
  {
    label: "Start Advance",
    input: (
      <FormikNumberInput<FormState> name="startAdvance" numType="decimal" />
    ),
  },
  {
    label: "Advance Count",
    input: (
      <FormikNumberInput<FormState>
        name="advanceCount"
        disabled
        numType="decimal"
      />
    ),
  },
];

export const Gen2Rng = () => {
  const [results, setResults] = React.useState<RngState[]>([]);

  const onSubmit = React.useCallback<RngToolSubmit<FormState>>(async (opts) => {
    const results = await rngTools.gen2_generate_rng_states(
      opts.div >>> 8,
      opts.div & 0xff,
      opts.adivIndex,
      opts.sdivIndex,
      opts.state,
      opts.startAdvance,
      opts.startAdvance + opts.advanceCount,
    );
    setResults(
      results.map(({ add_div, sub_div, advance, rand }) => ({
        advance,
        rand,
        div: (add_div << 8) | sub_div,
      })),
    );
  }, []);

  return (
    <RngToolForm<FormState, RngState>
      fields={fields}
      columns={columns}
      results={results}
      initialValues={initialValues}
      onSubmit={onSubmit}
      submitTrackerId="generate_gen2_rng"
    />
  );
};
