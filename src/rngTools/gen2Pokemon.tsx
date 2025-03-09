import React from "react";
import {
  Flex,
  Button,
  FormikInput,
  Form,
  ResultTable,
  ResultColumn,
  FormFieldTable,
  Icon,
  FormikSelect,
} from "~/components";
import {
  Gen2PokeFilter,
  crystal_generate_celebi,
  crystal_generate_starters,
  type Gen2Spread,
} from "rng_tools";
import { Formik } from "formik";
import {
  DecimalString,
  fromDecimalString,
  fromHexString,
  HexString,
  toDecimalString,
  toHexString,
} from "~/utils/number";

const YesIcon = () => <Icon name="CheckCircle" color="Success" size={20} />;

const columns: ResultColumn<Gen2Spread>[] = [
  {
    title: "Advance",
    dataIndex: "advance",
    key: "advance",
  },
  {
    title: "State",
    dataIndex: "state",
    key: "state",
    render: (state) => state.toString(16).padStart(4, "0"),
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
    {
      label: "Filter",
      input: (
        <FormikSelect<FormState, "filter">
          name="filter"
          options={["Any", "Shiny", "MaxDv"].map((filter) => ({
            label: filter,
            value: filter,
          }))}
        />
      ),
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
  filter: "Shiny",
};

type Props = {
  type: "starter" | "celebi";
};

export const Gen2PokemonRng = ({ type }: Props) => {
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
      <ResultTable columns={columns} dataSource={results} />
    </Flex>
  );
};
