import React from "react";
import { Flex } from "./flex";
import { Button } from "./button";
import { Table, TableProps } from "antd";
import { Input } from "./input";
import {
  emerald_sid_from_feebas_seed,
  rs_sid_from_feebas_seed,
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

type GeneratorResult = { sid: number };

const StyledTable = styled(Table<GeneratorResult>)({
  "&&&": {
    width: "100%",
  },
});

const columns: TableProps<GeneratorResult>["columns"] = [
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
  minAdvances: DecimalString;
  maxAdvances: DecimalString;
};

const OptionsForm = () => {
  const formik = useFormikContext<FormState>();
  const fields: Field[] = [
    {
      label: "TID",
      input: (
        <Input
          autoComplete="off"
          name="tid"
          placeholder="1234"
          onChange={formik.handleChange}
        />
      ),
    },
    {
      label: "Feebas Seed",
      input: (
        <Input
          autoComplete="off"
          name="feebasSeed"
          placeholder="abcd"
          onChange={formik.handleChange}
        />
      ),
    },
    {
      label: "Min Advances",
      input: (
        <Input
          autoComplete="off"
          name="minAdvances"
          placeholder="0"
          onChange={formik.handleChange}
        />
      ),
    },

    {
      label: "Max Advances",
      input: (
        <Input
          autoComplete="off"
          name="maxAdvances"
          placeholder="10000"
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
        <Button trackerId="generate_gen3_sid" htmlType="submit">
          Generate
        </Button>
      </Flex>
    </Form>
  );
};

const initialState: FormState = {
  tid: toDecimalString(1234),
  feebasSeed: toHexString(0xabcd),
  minAdvances: toDecimalString(0),
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
          const minAdvances = fromDecimalString(opts.minAdvances);
          const maxAdvances = fromDecimalString(opts.maxAdvances);

          if (
            tid === null ||
            feebasSeed === null ||
            minAdvances === null ||
            maxAdvances === null
          ) {
            return;
          }

          const generate =
            game === "rs"
              ? rs_sid_from_feebas_seed
              : emerald_sid_from_feebas_seed;

          const results = generate(tid, feebasSeed, minAdvances, maxAdvances);

          setResults([...results].map((sid) => ({ sid })));
        }}
      >
        <OptionsForm />
      </Formik>
      <StyledTable columns={columns} dataSource={results} />
    </Flex>
  );
};
