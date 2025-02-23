import React from "react";
import { Flex } from "./flex";
import { Button } from "./button";
import { Table, TableProps } from "antd";
import { Input } from "./input";
import {
  generate_rng_states,
  RandOptions as WasmOptions,
  RngState as WasmRngState,
} from "vc_rng";
import styled from "@emotion/styled";
import { Formik, Form, useFormikContext } from "formik";
import { Typography } from "./typography";
import {
  DecimalString,
  fromDecimalString,
  fromHexString,
  HexString,
  toDecimalString,
  toHexString,
} from "~/utils/number";
import * as tst from "ts-toolbelt";

type RngState = tst.O.Merge<
  tst.O.Omit<WasmRngState, "free" | "add_div" | "sub_div">,
  { div: number }
>;

const StyledTable = styled(Table<RngState>)({
  "&&&": {
    width: "100%",
  },
});

type Options = {
  adiv: number;
  sdiv: number;
  adivIndex: number;
  sdivIndex: number;
  state: number;
  startAdvance: number;
  endAdvance: number;
};

const generateRngStates = (opts: Options) => {
  return generate_rng_states(
    WasmOptions.new(
      opts.adiv,
      opts.sdiv,
      opts.adivIndex,
      opts.sdivIndex,
      opts.state,
      opts.startAdvance,
      opts.endAdvance,
    ),
  );
};

const columns: TableProps<RngState>["columns"] = [
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
  const formik = useFormikContext<FormState>();
  const fields: Field[] = [
    {
      label: "ADiv Index",
      input: (
        <Input
          autoComplete="off"
          name="adivIndex"
          placeholder="100"
          onChange={formik.handleChange}
        />
      ),
    },
    {
      label: "SDiv Index",
      input: (
        <Input
          autoComplete="off"
          name="sdivIndex"
          placeholder="100"
          onChange={formik.handleChange}
        />
      ),
    },
    {
      label: "Div",
      input: (
        <Input
          autoComplete="off"
          name="div"
          placeholder="ab"
          onChange={formik.handleChange}
        />
      ),
    },

    {
      label: "State",
      input: (
        <Input
          autoComplete="off"
          name="state"
          placeholder="cdef"
          onChange={formik.handleChange}
        />
      ),
    },
    {
      label: "Start Advance",
      input: (
        <Input
          autoComplete="off"
          name="startAdvance"
          placeholder="100"
          onChange={formik.handleChange}
        />
      ),
    },
    {
      label: "Advance Count",
      input: (
        <Input
          autoComplete="off"
          name="advanceCount"
          value={formik.values.advanceCount}
          disabled
          onChange={formik.handleChange}
        />
      ),
    },
  ];

  return (
    <Form>
      <Flex vertical gap={8}>
        <table>
          <tbody>
            {fields.map(({ label, input }) => (
              <tr key={label}>
                <td>
                  <Typography.Text strong>{label}</Typography.Text>
                </td>
                <td>{input}</td>
              </tr>
            ))}
          </tbody>
        </table>
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
          setResults(
            generateRngStates({
              adiv: div >>> 8,
              sdiv: div & 0xff,
              adivIndex: fromDecimalString(opts.adivIndex) ?? 0,
              sdivIndex: fromDecimalString(opts.sdivIndex) ?? 0,
              state: fromHexString(opts.state) ?? 0,
              startAdvance: fromDecimalString(opts.startAdvance) ?? 0,
              endAdvance: startAdvance + advanceCount,
            }).map(({ add_div, sub_div, advance, rand }) => ({
              advance,
              rand,
              div: (add_div << 8) | sub_div,
            })),
          );
        }}
      >
        <OptionsForm />
      </Formik>
      <StyledTable columns={columns} dataSource={results} />
    </Flex>
  );
};
