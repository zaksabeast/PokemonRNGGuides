import React from "react";
import {
  FormikNumberInput,
  ResultColumn,
  RngToolForm,
  RngToolSubmit,
  Field,
} from "~/components";
import { RngDate, rngTools, SeedTime4 } from "~/rngTools";
import { fromRngDateTime, rngDate } from "~/utils/time";
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
    render: (coinFlips) =>
      coinFlips.map((flip) => (flip === "Heads" ? "H" : "T")).join(", "),
  },
];

type FormState = {
  seed: number;
  date: RngDate;
  forced_second: number | undefined;
};

const initialValues: FormState = {
  seed: 0,
  date: rngDate(),
  forced_second: undefined,
};

const fields: Field[] = [
  {
    label: "Seed",
    input: <FormikNumberInput<FormState> name="seed" numType="hex" />,
  },
  {
    label: "Year/Month",
    input: <FormikDatePicker<FormState> name="date" picker="month" />,
  },
  {
    label: "Forced Second",
    input: (
      <FormikNumberInput<FormState> name="forced_second" numType="decimal" />
    ),
  },
];

type Props = {
  onClickResultRow: (record: SeedTime4) => void;
};

export const DpptSeedSearch = ({ onClickResultRow }: Props) => {
  const [results, setResults] = React.useState<GeneratorResult[]>([]);

  const onSubmit = React.useCallback<RngToolSubmit<FormState>>(async (opts) => {
    const results = await rngTools.dppt_calculate_seedtime({
      ...opts,
      year: opts.date.year,
      month: opts.date.month,
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
