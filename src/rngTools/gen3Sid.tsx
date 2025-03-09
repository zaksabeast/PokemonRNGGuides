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
import {
  emerald_sid_from_feebas_seed,
  rs_sid_from_feebas_seed,
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

type GeneratorResult = { sid: number };

const columns: ResultColumn<GeneratorResult>[] = [
  {
    title: "Sid",
    dataIndex: "sid",
    key: "sid",
  },
];

type Field = {
  label: string;
  input: React.ReactNode;
};

type FormState = {
  tid: DecimalString;
  feebasSeed: HexString;
  initialAdvances: DecimalString;
  maxAdvances: DecimalString;
};

const OptionsForm = () => {
  const fields: Field[] = [
    {
      label: "TID",
      input: <FormikInput<FormState> name="tid" />,
    },
    {
      label: "Feebas Seed",
      input: <FormikInput<FormState> name="feebasSeed" />,
    },
    {
      label: "Initial Advances",
      input: <FormikInput<FormState> name="initialAdvances" />,
    },

    {
      label: "Max Advances",
      input: <FormikInput<FormState> name="maxAdvances" />,
    },
  ];

  return (
    <Form>
      <Flex vertical gap={8}>
        <FormFieldTable fields={fields} />
        <Button trackerId="generate_gen3_sid" htmlType="submit">
          Generate
        </Button>
      </Flex>
    </Form>
  );
};

const initialState: FormState = {
  tid: toDecimalString(14223),
  feebasSeed: toHexString(0xa4fd),
  initialAdvances: toDecimalString(0),
  maxAdvances: toDecimalString(10000),
};

type Props = {
  game: "rs" | "emerald";
};

export const Gen3Sid = ({ game }: Props) => {
  const [results, setResults] = React.useState<GeneratorResult[]>([]);

  return (
    <Flex vertical gap={16}>
      <Formik
        initialValues={initialState}
        onSubmit={(opts) => {
          const tid = fromDecimalString(opts.tid);
          const feebasSeed = fromHexString(opts.feebasSeed);
          const initialAdvances = fromDecimalString(opts.initialAdvances);
          const maxAdvances = fromDecimalString(opts.maxAdvances);

          if (
            tid === null ||
            feebasSeed === null ||
            initialAdvances === null ||
            maxAdvances === null
          ) {
            return;
          }

          const generate =
            game === "rs"
              ? rs_sid_from_feebas_seed
              : emerald_sid_from_feebas_seed;

          const results = generate(
            tid,
            feebasSeed,
            initialAdvances,
            maxAdvances,
          );

          setResults([...results].map(({ sid }) => ({ sid })));
        }}
      >
        <OptionsForm />
      </Formik>
      <ResultTable columns={columns} dataSource={results} />
    </Flex>
  );
};
