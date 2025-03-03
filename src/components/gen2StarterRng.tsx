import React from "react";
import { Flex } from "./flex";
import { Icon } from "./icons";
import { Button } from "./button";
import { Table, TableProps, Radio } from "antd";
import { Input } from "./input";
import {
  Gen2PokeFilter,
  crystal_generate_celebi,
  crystal_generate_starters,
  type Gen2Spread,
} from "rng_tools";
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

const StyledTable = styled(Table<Gen2Spread>)({
  "&&&": {
    width: "100%",
  },
});

const YesIcon = () => <Icon name="CheckCircle" color="Success" size={20} />;

const columns: TableProps<Gen2Spread>["columns"] = [
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
  filter: Gen2PokeFilter;
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
          options={
            [
              { label: "Shiny", value: "Shiny" },
              { label: "Max DV", value: "MaxDv" },
              { label: "Any", value: "Any" },
            ] satisfies { label: string; value: Gen2PokeFilter }[]
          }
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
  filter: "Shiny",
};

type Props = {
  type: "starter" | "celebi";
};

export const Gen2StarterRng = ({ type }: Props) => {
  const [results, setResults] = React.useState<Gen2Spread[]>([]);

  return (
    <Flex vertical gap={16}>
      <Formik
        initialValues={initialState}
        onSubmit={(opts) => {
          const div = fromHexString(opts.div) ?? 0;
          const startAdvance = fromDecimalString(opts.startAdvance) ?? 0;
          const advanceCount = fromDecimalString(opts.advanceCount) ?? 0;

          const generator =
            type === "starter"
              ? crystal_generate_starters
              : crystal_generate_celebi;

          const results = generator(
            div >>> 8,
            div & 0xff,
            fromDecimalString(opts.adivIndex) ?? 0,
            fromDecimalString(opts.sdivIndex) ?? 0,
            fromHexString(opts.state) ?? 0,
            fromDecimalString(opts.startAdvance) ?? 0,
            startAdvance + advanceCount,
            opts.filter,
          );
          setResults(results);
        }}
      >
        <OptionsForm />
      </Formik>
      <StyledTable columns={columns} dataSource={results} />
    </Flex>
  );
};
