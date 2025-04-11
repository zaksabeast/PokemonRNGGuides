import { Field, RngToolForm, ResultColumn, RngToolSubmit } from "~/components";
import {
  DecimalString,
  fromDecimalString,
  toDecimalString,
} from "~/utils/number";
import { FormikRadio } from "../../components/radio";
import { FormikInput } from "../../components/input";

import { rngTools, MirageIslandResult } from "~/rngTools";
import React from "react";
import { clamp } from 'lodash-es';

type Game = "emerald" | "rs";

const formatLargeInteger = function (number: number) {
  return number.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const getColumns = (
  game: Game,
  resultsBattery: Battery,
): ResultColumn<MirageIslandResult>[] => {
  const columns: ResultColumn<MirageIslandResult>[] = [];
  if (resultsBattery === "Live") {
    columns.push(
      {
        title: "Day",
        dataIndex: "day",
        key: "day",
        render: (dayDiff) => `${dayDiff + 1}`,
      },
      {
        title: "Time To Wait",
        dataIndex: "day_diff",
        key: "day_diff",
        render: (dayDiff) => `${dayDiff} day${dayDiff === 1 ? "" : "s"}`,
      },
    );
  }
  columns.push({
    title: "PID Pattern",
    dataIndex: "pid_pattern",
    key: "pid_pattern",
    render: (pid_pattern) =>
      `****${pid_pattern.toString(16).toUpperCase().padStart(4, "0")}`,
    monospace: true,
  });

  const fixedInitialSeedForMethod1 =
    game === "emerald" || resultsBattery === "Dead";
  if (fixedInitialSeedForMethod1)
    columns.push({
      title: "Method-1 Earliest RNG Advance matching PID Pattern",
      dataIndex: "earliest_adv",
      key: "earliest_adv",
      render: (earliestAdv) => formatLargeInteger(earliestAdv),
    });
  return columns;
};

type Battery = "Dead" | "Live";

type FormState = {
  battery: Battery;
  rocketLaunchedCount: DecimalString;
  game: Game;
};

const getInitialValues = (game: Game): FormState => {
  return {
    battery: "Live",
    rocketLaunchedCount: toDecimalString(0),
    game,
  };
};

const generateResults = function (
  game: Game,
  values: FormState,
): Promise<MirageIslandResult[]> {
  const initialSeed = game === "emerald" ? 0 : 0x5a0;
  if (values.battery === "Dead")
    return rngTools.mirage_island_calculate(initialSeed, 0, 0);

  const rocketLaunchedCount =
    fromDecimalString(values.rocketLaunchedCount) ?? 0;

  const RESULT_COUNT = 100;
  const currentDay = clamp(rocketLaunchedCount * 7, 0, 0xffff);
  const lastDay = clamp(currentDay + RESULT_COUNT - 1, 0, 0xffff);

  return rngTools.mirage_island_calculate(initialSeed, currentDay, lastDay);
};

type Props = {
  game?: Game;
};

const getFields = (values: FormState) => {
  const fields: Field[] = [
    {
      label: "Battery",
      input: (
        <FormikRadio<FormState, "battery">
          name="battery"
          options={["Live", "Dead"]}
        />
      ),
    },
  ];
  if (values.battery === "Live") {
    fields.push({
      label: "Rocket Launched",
      input: <FormikInput<FormState> name="rocketLaunchedCount" />,
    });
  }
  return fields;
};

export const Gen3MirageIsland = ({ game = "emerald" }: Props) => {
  const initialValues = getInitialValues(game);

  const [results, setResults] = React.useState<MirageIslandResult[]>([]);
  const [resultsBattery, setResultsBattery] = React.useState<Battery>("Live");

  const onSubmit = React.useCallback<RngToolSubmit<FormState>>(
    async (values) => {
      const { battery } = values;
      const res = await generateResults(game, values);
      setResults(res);
      setResultsBattery(battery);
    },
    [game],
  );

  const columns = React.useMemo(
    () => getColumns(game, resultsBattery),
    [game, resultsBattery],
  );

  return (
    <RngToolForm<FormState, MirageIslandResult>
      getFields={getFields}
      columns={columns}
      results={results}
      initialValues={initialValues}
      onSubmit={onSubmit}
      rowKey="day"
      submitTrackerId="mirage_island"
    />
  );
};
