import React from "react";
import {
  FormikInput,
  ResultColumn,
  RngToolForm,
  RngToolSubmit,
  Field,
} from "~/components";
import { rngTools } from "~/rngTools";
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
    title: "SID",
    dataIndex: "sid",
    key: "sid",
  },
];

export type FormState = {
  tid: DecimalString;
  feebasSeed: HexString;
  initialAdvances: DecimalString;
  maxAdvances: DecimalString;
};

const initialValues: FormState = {
  tid: toDecimalString(14223),
  feebasSeed: toHexString(0xa4fd),
  initialAdvances: toDecimalString(0),
  maxAdvances: toDecimalString(10000),
};

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

type Props = {
  game: "rs" | "emerald";
};

export const Gen3Sid = ({ game }: Props) => {
  const [results, setResults] = React.useState<GeneratorResult[]>([]);

  const onSubmit = React.useCallback<RngToolSubmit<FormState>>(
    async (opts) => {
      const tid = fromDecimalString(opts.tid);
      const feebasSeed = fromHexString(opts.feebasSeed);
      const initialAdvances = fromDecimalString(opts.initialAdvances);
      const maxAdvances = fromDecimalString(opts.maxAdvances);

      if (
        tid == null ||
        feebasSeed == null ||
        initialAdvances == null ||
        maxAdvances == null
      ) {
        return;
      }

      const generate =
        game === "rs"
          ? rngTools.rs_sid_from_feebas_seed
          : rngTools.emerald_sid_from_feebas_seed;

      const results = await generate(
        tid,
        feebasSeed,
        initialAdvances,
        maxAdvances,
      );

      setResults([...results].map(({ sid }) => ({ sid })));
    },
    [game],
  );

  return (
    <RngToolForm<FormState, GeneratorResult>
      fields={fields}
      columns={columns}
      results={results}
      initialValues={initialValues}
      onSubmit={onSubmit}
      submitTrackerId="generate_gen3_sid"
    />
  );
};
