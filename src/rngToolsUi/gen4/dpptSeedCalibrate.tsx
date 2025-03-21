import React from "react";
import {
  FormikInput,
  ResultColumn,
  RngToolForm,
  RngToolSubmit,
  Field,
  Typography,
} from "~/components";
import { rngTools, SeedTime4, SeedTime4Calibrate } from "~/rngTools";
import {
  DecimalString,
  fromDecimalString,
  toDecimalString,
} from "~/utils/number";
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
    render: (coinFlips) => (
      <Typography.Text whiteSpace="nowrap">
        {coinFlips.map((flip) => (flip === "Heads" ? "H" : "T")).join(", ")}
      </Typography.Text>
    ),
  },
];

type FormState = {
  date: Dayjs;
  time: Dayjs;
  delay: DecimalString;
  delayCalibration: DecimalString;
  secondCalibration: DecimalString;
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
    input: <FormikInput<FormState> name="delay" disabled />,
  },
  {
    label: "Delay Calibration +/-",
    input: <FormikInput<FormState> name="delayCalibration" />,
  },
  {
    label: "Second Calibration +/-",
    input: <FormikInput<FormState> name="secondCalibration" />,
  },
];

type Props = {
  selectedSeedTime?: SeedTime4 | null;
};

export const DpptSeedCalibrate = ({ selectedSeedTime }: Props) => {
  const [results, setResults] = React.useState<SeedTime4Calibrate[]>([]);

  const initialValues: FormState = React.useMemo(() => {
    const delayCalibration = toDecimalString(0);
    const secondCalibration = toDecimalString(0);

    if (selectedSeedTime == null) {
      return {
        date: dayjs(),
        time: dayjs(),
        delay: toDecimalString(0),
        delayCalibration,
        secondCalibration,
      };
    }

    return {
      date: fromRngDateTime(selectedSeedTime.datetime),
      time: fromRngDateTime(selectedSeedTime.datetime),
      delay: toDecimalString(selectedSeedTime.delay),
      delayCalibration,
      secondCalibration,
    };
  }, [selectedSeedTime]);

  const onSubmit = React.useCallback<RngToolSubmit<FormState>>(async (opts) => {
    const delay = fromDecimalString(opts.delay);
    const delayCalibration = fromDecimalString(opts.delayCalibration);
    const secondCalibration = fromDecimalString(opts.secondCalibration);

    if (
      delay == null ||
      delayCalibration == null ||
      secondCalibration == null
    ) {
      return;
    }

    const datetime = dayjs(opts.date)
      .set("hour", opts.time.hour())
      .set("minute", opts.time.minute())
      .set("second", opts.time.second());
    const rngDateTime = toRngDateTime(datetime);

    const results = await rngTools.dppt_calibrate_seedtime(
      {
        datetime: rngDateTime,
        delay,
        coin_flips: [],
      },
      {
        delay_calibration: delayCalibration,
        second_calibration: secondCalibration,
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
