import React from "react";
import { Flex } from "./flex";
import { Icon } from "./icons";
import { Button } from "./button";
import { Table, TableProps, Radio } from "antd";
import { Input } from "./input";
import {
  generate_starters,
  Options as WasmOptions,
  Filter,
  Starter,
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

const StyledTable = styled(Table<Starter>)({
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
  filter: Filter;
};

const generateStarters = (opts: Options) => {
  return generate_starters(
    WasmOptions.new(
      opts.adiv,
      opts.sdiv,
      opts.adivIndex,
      opts.sdivIndex,
      opts.state,
      opts.startAdvance,
      opts.endAdvance,
      opts.filter,
    ),
  );
};

const YesIcon = () => <Icon name="CheckCircle" color="Success" size={20} />;

const columns: TableProps<Starter>["columns"] = [
  {
    title: "Advance",
    dataIndex: "advance",
    key: "advance",
  },
  {
    title: "State",
    dataIndex: "state",
    key: "state",
    render: (state) => state.toString(16),
  },
  {
    title: "Shiny",
    dataIndex: "shiny",
    key: "shiny",
    render: (shiny) => (shiny ? <YesIcon /> : null),
  },
  {
    title: "Max DV",
    dataIndex: "max_dv",
    key: "max_dv",
    render: (max_dv) => (max_dv ? <YesIcon /> : null),
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
  filter: Filter;
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
    {
      label: "Filter",
      input: (
        <Radio.Group
          onChange={formik.handleChange}
          defaultValue={formik.values.filter}
          optionType="button"
          name="filter"
          buttonStyle="solid"
          block
          options={[
            { label: "Shiny", value: Filter.Shiny },
            { label: "Max DV", value: Filter.MaxDv },
            { label: "Any", value: Filter.Any },
          ]}
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
  filter: Filter.Shiny,
};

export const Gen2Rng = () => {
  const [results, setResults] = React.useState<Starter[]>([]);

  return (
    <Flex vertical gap={16}>
      <Formik
        initialValues={initialState}
        onSubmit={(opts) => {
          const div = fromHexString(opts.div) ?? 0;
          const startAdvance = fromDecimalString(opts.startAdvance) ?? 0;
          const advanceCount = fromDecimalString(opts.advanceCount) ?? 0;
          setResults(
            generateStarters({
              adiv: div >>> 8,
              sdiv: div & 0xff,
              adivIndex: fromDecimalString(opts.adivIndex) ?? 0,
              sdivIndex: fromDecimalString(opts.sdivIndex) ?? 0,
              state: fromHexString(opts.state) ?? 0,
              startAdvance: fromDecimalString(opts.startAdvance) ?? 0,
              endAdvance: startAdvance + advanceCount,
              filter: opts.filter,
            }),
          );
        }}
      >
        <OptionsForm />
      </Formik>
      <StyledTable columns={columns} dataSource={results} />
    </Flex>
  );
};
