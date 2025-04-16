import React from "react";
import {
  FormikNumberInput,
  ResultColumn,
  RngToolForm,
  RngToolSubmit,
  Field,
} from "~/components";
import { rngTools, SeedTime4, SeedTime4Calibrate } from "~/rngTools";
import dayjs, { Dayjs } from "dayjs";
import {
  formatRngDateTime,
  fromRngDateTime,
  toRngDateTime,
} from "~/utils/time";
import { FormikDatePicker, FormikTimePicker } from "~/components/datePicker";

const columns: ResultColumn<SeedTime4Calibrate>[] = [
  {
    title: "Seed",
    dataIndex: "seed",
    key: "seed",
    monospace: true,
    render: (seed) => seed.toString(16).toUpperCase().padStart(8, "0"),
  },
  {
    title: "Date/Time",
    dataIndex: "datetime",
    key: "datetime",
    render: (date) => formatRngDateTime(date, { seconds: true }),
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
  date: Dayjs;
  time: Dayjs;
  delay: number;
  delay_calibration: number;
  second_calibration: number;
};

const fields: Field[] = [
  {
    label: "Searcher Result Date",
    input: <FormikDatePicker<FormState> name="date" disabled />,
  },
  {
    label: "Searcher Result Time",
    input: <FormikTimePicker<FormState> name="time" showSecond disabled />,
  },
  {
    label: "Searcher Result Delay",
    input: (
      <FormikNumberInput<FormState> name="delay" disabled numType="decimal" />
    ),
  },
  {
    label: "Delay Calibration +/-",
    input: (
      <FormikNumberInput<FormState>
        name="delay_calibration"
        numType="decimal"
      />
    ),
  },
  {
    label: "Second Calibration +/-",
    input: (
      <FormikNumberInput<FormState>
        name="second_calibration"
        numType="decimal"
      />
    ),
  },
];

type Props = {
  selectedSeedTime?: SeedTime4 | null;
};

export const DpptSeedCalibrate = ({ selectedSeedTime }: Props) => {
  const [results, setResults] = React.useState<SeedTime4Calibrate[]>([]);

  const initialValues = React.useMemo((): FormState => {
    if (selectedSeedTime == null) {
      return {
        date: dayjs(),
        time: dayjs(),
        delay: 0,
        delay_calibration: 0,
        second_calibration: 0,
      };
    }

    return {
      date: fromRngDateTime(selectedSeedTime.datetime),
      time: fromRngDateTime(selectedSeedTime.datetime),
      delay: selectedSeedTime.delay,
      delay_calibration: 0,
      second_calibration: 0,
    };
  }, [selectedSeedTime]);

  const onSubmit = React.useCallback<RngToolSubmit<FormState>>(async (opts) => {
    const datetime = dayjs(opts.date)
      .set("hour", opts.time.hour())
      .set("minute", opts.time.minute())
      .set("second", opts.time.second());
    const rngDateTime = toRngDateTime(datetime);

    const results = await rngTools.dppt_calibrate_seedtime(
      {
        datetime: rngDateTime,
        delay: opts.delay,
        coin_flips: [],
      },
      {
        delay_calibration: opts.delay_calibration,
        second_calibration: opts.second_calibration,
        entei_route: undefined,
        lati_route: undefined,
        raikou_route: undefined,
      },
    );

    setResults(results);
  }, []);

  return (
    <RngToolForm<FormState, SeedTime4Calibrate>
      fields={fields}
      columns={columns}
      results={results}
      initialValues={initialValues}
      onSubmit={onSubmit}
      submitTrackerId="generate_dppt_seed_search"
    />
  );
};
