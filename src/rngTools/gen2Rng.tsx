import React from "react";
import {
  Flex,
  Button,
  FormikInput,
  Form,
  ResultTable,
  ResultColumn,
  FormFieldTable,
} from "~/components";
import { gen2_generate_rng_states } from "rng_tools";
import { Formik } from "formik";
import {
  DecimalString,
  fromDecimalString,
  fromHexString,
  HexString,
  toDecimalString,
  toHexString,
} from "~/utils/number";

type RngState = {
  advance: number;
  rand: number;
  div: number;
};

const columns: ResultColumn<RngState>[] = [
  {
    title: "Advance",
    dataIndex: "advance",
    key: "advance",
  },
  {
    title: "State",
    dataIndex: "rand",
    key: "rand",
    render: (rand) => rand.toString(16).padStart(4, "0"),
  },
  {
    title: "Div",
    dataIndex: "div",
    key: "div",
    render: (div) => div.toString(16).padStart(4, "0"),
  },
];

type Field = {
  label: string;
  input: React.ReactNode;
};

type FormState = {
  div: HexString;
  adivIndex: DecimalString;
  sdivIndex: DecimalString;
  state: HexString;
  startAdvance: DecimalString;
  advanceCount: DecimalString;
};

const OptionsForm = () => {
  const fields: Field[] = [
    {
      label: "ADiv Index",
      input: <FormikInput<FormState> name="adivIndex" />,
    },
    {
      label: "SDiv Index",
      input: <FormikInput<FormState> name="sdivIndex" />,
    },
    {
      label: "Div",
      input: <FormikInput<FormState> name="div" />,
    },

    {
      label: "State",
      input: <FormikInput<FormState> name="state" />,
    },
    {
      label: "Start Advance",
      input: <FormikInput<FormState> name="startAdvance" />,
    },
    {
      label: "Advance Count",
      input: <FormikInput<FormState> name="advanceCount" disabled />,
    },
  ];

  return (
    <Form>
      <Flex vertical gap={8}>
        <FormFieldTable fields={fields} />
        <Button trackerId="generate_gen2_starters" htmlType="submit">
          Generate
        </Button>
      </Flex>
    </Form>
  );
};

const initialState: FormState = {
  div: toHexString(0),
  adivIndex: toDecimalString(0),
  sdivIndex: toDecimalString(0),
  state: toHexString(0),
  startAdvance: toDecimalString(0),
  advanceCount: toDecimalString(10000),
};

export const Gen2Rng = () => {
  const [results, setResults] = React.useState<RngState[]>([]);

  return (
    <Flex vertical gap={16}>
      <Formik
        initialValues={initialState}
        onSubmit={(opts) => {
          const div = fromHexString(opts.div) ?? 0;
          const startAdvance = fromDecimalString(opts.startAdvance) ?? 0;
          const advanceCount = fromDecimalString(opts.advanceCount) ?? 0;
          const results = gen2_generate_rng_states(
            div >>> 8,
            div & 0xff,
            fromDecimalString(opts.adivIndex) ?? 0,
            fromDecimalString(opts.sdivIndex) ?? 0,
            fromHexString(opts.state) ?? 0,
            startAdvance,
            startAdvance + advanceCount,
          );
          setResults(
            results.map(({ add_div, sub_div, advance, rand }) => ({
              advance,
              rand,
              div: (add_div << 8) | sub_div,
            })),
          );
        }}
      >
        <OptionsForm />
      </Formik>
      <ResultTable columns={columns} dataSource={results} />
    </Flex>
  );
};
