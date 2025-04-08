import { Formik } from "formik";
import {
  Field,
  Flex,
  FormFieldTable,
  Form,
  ResultTable,
  ResultColumn,
  RngToolSubmit,
} from "~/components";
import { Input } from "antd";
import {
  DecimalString,
  fromDecimalString,
  toDecimalString,
} from "~/utils/number";
import { RadioGroup } from "../../components/radio";
import React from "react";

type Game = "emerald" | "rs";

type ResultColumnData = {
  day: number;
  dayDiff: number;
  pidPattern: number;
  earliestAdv: number;
}

const advancePidRng = function (oldValue: bigint) {
  return (BigInt(oldValue) * 0x41c64e6dn + 24691n) % 0x100000000n;
};

const advanceMirageIslandRng = function (oldValue: bigint) {
  return (BigInt(oldValue) * 0x41c64e6dn + 0x3039n) % 0x100000000n;
};

const advanceMirageIslandRngMulti = function (oldValue: bigint, n: number) {
  let newValue = oldValue;
  for (let i = 0; i < n; i++) newValue = advanceMirageIslandRng(newValue);
  return newValue;
};

const getHighPidFromRng = function (rng: bigint) {
  rng = advancePidRng(rng);
  return rng >> 16n;
};

const formatLargeInteger = function (number: number) {
  return number.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const getColumns = (
  game: Game,
  values: FormState,
): ResultColumn<ResultColumnData>[] => {
  const columns: ResultColumn<ResultColumnData>[] = [];
  if (values.battery === "Live") {
    columns.push(
      { title: "Day", dataIndex: "day", key: "day" },
      {
        title: "Time To Wait",
        dataIndex: "dayDiff",
        key: "dayDiff",
        render: (dayDiff) => `${dayDiff} day${dayDiff === 1 ? "" : "s"}`,
      },
    );
  }
  columns.push({
    title: "PID Pattern",
    dataIndex: "pidPattern",
    key: "pidPattern",
    render: (pidPattern) =>
      `0x${pidPattern.toString(16).toUpperCase().padStart(4, "0")}****`,
    monospace: true,
  });

  const fixedInitialSeedForMethod1 =
    game === "emerald" || values.battery === "Dead";
  if (fixedInitialSeedForMethod1)
    columns.push({
      title: "Method-1 Earliest RNG Advance matching PID Pattern",
      dataIndex: "earliestAdv",
      key: "earliestAdv",
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

type Props = {
  game?: Game;
};

export const Gen3MirageIsland = ({ game = "emerald" }: Props) => {
  const calc = game === "emerald" ? emeraldEarliestAdvCalc : rsEarliestAdvCalc;
  const emeraldEarliestAdvCalc = new EarliestAdvCalculator(0x0);
const rsEarliestAdvCalc = new EarliestAdvCalculator(0x5a0);

  const initialSeed = game === "emerald" ? 0 : 0x5A0;
  const initialValues = getInitialValues(game);

  const generateResults = function (values: FormState): ResultColumnData[] {
    if (values.battery === "Dead")
      return calculate(initialSeed, 0, 0);

    const RESULT_COUNT = 50;
    const clamp = function(val:number, min:number, max:number){
      if (val < min)
        return min;
      if (val > max)
        return max;
      return val;
    };
    const rocketLaunchedCount =
      fromDecimalString(values.rocketLaunchedCount) ?? 0;

    let currentDay = clamp(rocketLaunchedCount * 7, 0, 0xFFFF);
    let lastDay = clamp(currentDay + RESULT_COUNT, 0, 0xFFFF);

    //NO_PROD

    return res;
  };
  const [results, setResults] = React.useState<ResultColumnData[]>(
    generateResults(initialValues),
  );

  const onSubmit = React.useCallback<RngToolSubmit<FormState>>(
    async (values) => {
      setResults(generateResults(values));
    },
    [game],
  );

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      onSubmit={onSubmit}
    >
      {(formik) => {
        const fields: Field[] = [
          {
            label: "Battery",
            input: (
              <RadioGroup
                optionType="button"
                name="battery"
                onChange={(e) => {
                  formik.handleChange(e);
                  formik.submitForm();
                }}
                value={formik.values.battery}
                options={["Live", "Dead"]}
              />
            ),
          },
        ];
        if (formik.values.battery === "Live")
          fields.push({
            label: "Rocket Launched",
            input: (
              <Input
                name="rocketLaunchedCount"
                onChange={(e) => {
                  formik.handleChange(e);
                  formik.submitForm();
                }}
                value={formik.values.rocketLaunchedCount}
              />
            ),
          });

        return (
          <Flex vertical gap={16}>
            <Form>
              <Flex vertical gap={8}>
                <FormFieldTable fields={fields} />
              </Flex>
            </Form>

            <ResultTable<ResultColumnData>
              columns={getColumns(game, formik.values)}
              dataSource={results}
            />
          </Flex>
        );
      }}
    </Formik>
  );
};
