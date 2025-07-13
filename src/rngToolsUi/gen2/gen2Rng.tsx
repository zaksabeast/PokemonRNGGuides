import React from "react";
import {
  FormikNumberInput,
  ResultColumn,
  RngToolForm,
  RngToolSubmit,
  Field,
} from "~/components";
import { rngTools } from "~/rngTools";
import { HexSchema } from "~/utils/number";
import { z } from "zod";
import { Translations } from "~/translations";

type Result = {
  advance: number;
  rand: number;
  div: number;
};

const getColumns = (t: Translations): ResultColumn<Result>[] => [
  {
    title: t["Advance"],
    dataIndex: "advance",
  },
  {
    title: t["State"],
    dataIndex: "rand",
    monospace: true,
    render: (rand) => rand.toString(16).padStart(4, "0"),
  },
  {
    title: t["Div"],
    dataIndex: "div",
    monospace: true,
    render: (div) => div.toString(16).padStart(4, "0"),
  },
];

const Validator = z.object({
  div: HexSchema(0xffff),
  adivIndex: z.number().int().min(0).max(0x4000),
  sdivIndex: z.number().int().min(0).max(0x4000),
  state: HexSchema(0xffff),
  startAdvance: z.number().int().min(0),
  advanceCount: z.number().int().min(0),
});

type FormState = z.infer<typeof Validator>;

const initialValues: FormState = {
  div: 0,
  adivIndex: 0,
  sdivIndex: 0,
  state: 0,
  startAdvance: 0,
  advanceCount: 10000,
};

const getFields = (t: Translations): Field[] => [
  {
    label: t["ADiv Index"],
    input: <FormikNumberInput<FormState> name="adivIndex" numType="decimal" />,
  },
  {
    label: t["SDiv Index"],
    input: <FormikNumberInput<FormState> name="sdivIndex" numType="decimal" />,
  },
  {
    label: t["Div"],
    input: <FormikNumberInput<FormState> name="div" numType="hex" />,
  },
  {
    label: t["State"],
    input: <FormikNumberInput<FormState> name="state" numType="hex" />,
  },
  {
    label: t["Start Advance"],
    input: (
      <FormikNumberInput<FormState> name="startAdvance" numType="decimal" />
    ),
  },
  {
    label: t["Advance Count"],
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
  const [results, setResults] = React.useState<Result[]>([]);

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
    <RngToolForm<FormState, Result>
      getFields={getFields}
      getColumns={getColumns}
      results={results}
      initialValues={initialValues}
      validationSchema={Validator}
      onSubmit={onSubmit}
      submitTrackerId="generate_gen2_rng"
    />
  );
};
