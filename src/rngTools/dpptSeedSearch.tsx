import React from "react";
import {
  FormikInput,
  ResultColumn,
  RngToolForm,
  RngToolSubmit,
  Field,
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

const columns: ResultColumn<SeedTime4>[] = [
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
    render: (coinFlips) =>
      coinFlips.map((flip) => (flip === "Heads" ? "H" : "T")).join(", "),
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
    input: <FormikDatePicker<FormState> name="date" />,
  },
  {
    label: "Forced Second",
    input: <FormikInput<FormState> name="forcedSecond" />,
  },
];

export const DpptSeedSearch = () => {
  const [results, setResults] = React.useState<SeedTime4[]>([]);

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

    setResults(results);
  }, []);

  return (
    <RngToolForm<FormState, SeedTime4>
      fields={fields}
      columns={columns}
      results={results}
      initialValues={initialValues}
      onSubmit={onSubmit}
      submitTrackerId="generate_dppt_seed_search"
    />
  );
};
