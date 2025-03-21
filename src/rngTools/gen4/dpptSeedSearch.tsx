import React from "react";
import {
  FormikInput,
  ResultColumn,
  RngToolForm,
  RngToolSubmit,
  Field,
  Typography,
} from "~/components";
import { dppt_calculate_seedtime, SeedTime4 } from "rng_tools";
import {
  DecimalString,
  fromDecimalString,
  fromHexString,
  HexString,
  toHexString,
} from "~/utils/number";
import dayjs, { Dayjs } from "dayjs";
import { fromRngDateTime, toRngDateTime } from "~/utils/time";
import { FormikDatePicker } from "~/components/datePicker";
import { uniqueId } from "lodash-es";

type GeneratorResult = SeedTime4 & { id: string };

const columns: ResultColumn<GeneratorResult>[] = [
  {
    title: "Date",
    dataIndex: "datetime",
    key: "datetime",
    render: (date) => fromRngDateTime(date).toDate().toLocaleString(),
  },
  {
    title: "Delay",
    dataIndex: "delay",
    key: "delay",
  },
  {
    title: "Coin Flips",
    dataIndex: "coin_flips",
    key: "coin_flips",
    render: (coinFlips) => (
      <Typography.Text whiteSpace="nowrap">
        {coinFlips.map((flip) => (flip === "Heads" ? "H" : "T")).join(", ")}
      </Typography.Text>
    ),
  },
];

type FormState = {
  seed: HexString;
  date: Dayjs;
  forcedSecond: DecimalString | "";
};

const initialValues: FormState = {
  seed: toHexString(0),
  date: dayjs(),
  forcedSecond: "",
};

const fields: Field[] = [
  {
    label: "Seed",
    input: <FormikInput<FormState> name="seed" />,
  },
  {
    label: "Year/Month",
    input: <FormikDatePicker<FormState> name="date" picker="month" />,
  },
  {
    label: "Forced Second",
    input: <FormikInput<FormState> name="forcedSecond" />,
  },
];

type Props = {
  onClickResultRow: (record: SeedTime4) => void;
};

export const DpptSeedSearch = ({ onClickResultRow }: Props) => {
  const [results, setResults] = React.useState<GeneratorResult[]>([]);

  const onSubmit = React.useCallback<RngToolSubmit<FormState>>((opts) => {
    const seed = fromHexString(opts.seed);
    const forcedSecond =
      opts.forcedSecond === "" ? null : fromDecimalString(opts.forcedSecond);

    if (seed == null) {
      return;
    }

    const rngDate = toRngDateTime(opts.date);

    const results = dppt_calculate_seedtime({
      seed,
      year: rngDate.year,
      month: rngDate.month,
      forced_second: forcedSecond ?? undefined,
    });

    setResults(results.map((result) => ({ ...result, id: uniqueId() })));
  }, []);

  return (
    <RngToolForm<FormState, GeneratorResult>
      fields={fields}
      columns={columns}
      results={results}
      initialValues={initialValues}
      onSubmit={onSubmit}
      onClickResultRow={onClickResultRow}
      rowKey="id"
      submitTrackerId="generate_dppt_seed_search"
    />
  );
};
