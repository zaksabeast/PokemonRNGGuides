import { Formik } from "formik";
import {
  Field,
  FormikInput,
  Flex,
  FormFieldTable,
  Form,
  ResultTable,
  Button,
  ResultColumn,
  RngToolSubmit,
} from "~/components";
import {
  DecimalString,
  fromDecimalString,
  toDecimalString,
} from "~/utils/number";
import { FormikRadio } from "../../components/radio";
import React from "react";

type Game = "emerald" | "rs";

interface ResultColumnData {
  day: number;
  dayDiff: number;
  pidPattern: number;
  earliestFrame: number;
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

const formatLargeInteger = function (x: number) {
  return x.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

class EarliestFrameCalculator {
  constructor(private initialSeed: number) {}

  private earliestFrameByPidPattern: Uint32Array | null = null; // null until the first getEarliestAdvanceCount call

  private generateEarliestAdvanceCount() {
    const EARLIEST_VALID_FRAME = 1000; // Earliest frame for Kecleon with turbo fire A is ~816
    const earliestFrameByPidPattern = new Uint32Array(0x10000);

    let unmatchedCount = 0x10000;
    let pidRng = BigInt(this.initialSeed);
    for (let pidRngFrame = 0; pidRngFrame < 1_000_000; pidRngFrame++) {
      // avoid infinite loop in case of bug
      pidRng = advancePidRng(pidRng);

      if (pidRngFrame < EARLIEST_VALID_FRAME) continue;

      const pidPattern = Number(getHighPidFromRng(pidRng));
      const oldValue = earliestFrameByPidPattern[pidPattern];
      if (oldValue !== 0) continue; // another earlier frame exists

      earliestFrameByPidPattern[pidPattern] = pidRngFrame;
      unmatchedCount--;
      if (unmatchedCount === 0) break; // all were matched
    }

    if (unmatchedCount !== 0)
      console.error("earliestFrameByPidPattern are missing some values");

    return earliestFrameByPidPattern;
  }
  getEarliestAdvanceCount(pidPattern: number) {
    if (this.earliestFrameByPidPattern === null)
      this.earliestFrameByPidPattern = this.generateEarliestAdvanceCount();
    return this.earliestFrameByPidPattern[pidPattern];
  }
}

const emeraldEarliestFrameCalc = new EarliestFrameCalculator(0x0);
const rsEarliestFrameCalc = new EarliestFrameCalculator(0x5a0);

const getColumns = (game:Game, values:FormState) : ResultColumn<ResultColumnData>[] => {
  const columns:ResultColumn<ResultColumnData>[] = [];
  if (values.battery === "Live"){
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
  columns.push(
    {
      title: "PID Pattern",
      dataIndex: "pidPattern",
      key: "pidPattern",
      render: (pidPattern) =>
        `0x${pidPattern.toString(16).toUpperCase().padStart(4, "0")}****`,
      monospace: true,
    }
  );

  const fixedInitialSeedForMethod1 = game === "emerald" || values.battery === "Dead";
  if (fixedInitialSeedForMethod1)
    columns.push(
      {
        title: "Method-1 Earliest Frame matching PID Pattern",
        dataIndex: "earliestFrame",
        key: "earliestFrame",
        render: (earliestFrame) => formatLargeInteger(earliestFrame),
      },
    );
  return columns;
}

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

const getFields = (values:FormState): Field[] => {
  const fields:Field[] = [
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
  if (values.battery === "Live")
    fields.push({
      label: "Rocket Launched",
      input: <FormikInput<FormState> name="rocketLaunchedCount" />,
    });
  return fields;
};

type Props = {
  game?: Game;
};

export const Gen3MirageIsland = ({ game = "emerald" }: Props) => {
  const [results, setResults] = React.useState<ResultColumnData[]>([]);

  const onSubmit = React.useCallback<RngToolSubmit<FormState>>(
    async (values) => {
      const calc =
        game === "emerald" ? emeraldEarliestFrameCalc : rsEarliestFrameCalc;

      if (values.battery === "Dead") {
        setResults([
          {
            day: 0,
            dayDiff: 0,
            pidPattern: 0,
            earliestFrame: calc.getEarliestAdvanceCount(0),
          },
        ]);
        return;
      }

      const rocketLaunchedCount =
        fromDecimalString(values.rocketLaunchedCount) ?? 0;
      const currentDay = rocketLaunchedCount * 7;
      const ROW_COUNT = 50;
      let mirageIslandRng = advanceMirageIslandRngMulti(0n, currentDay);

      const res: ResultColumnData[] = [];
      for (let dayDiff = 0; dayDiff < ROW_COUNT; dayDiff++) {
        const day = currentDay + dayDiff;
        const pidPattern = Number(mirageIslandRng >> 16n);
        res.push({
          day,
          dayDiff,
          pidPattern,
          earliestFrame: calc.getEarliestAdvanceCount(pidPattern),
        });
        mirageIslandRng = advanceMirageIslandRng(mirageIslandRng);
      }
      setResults(res);
    },
    [game],
  );

  return (
    <Formik
      enableReinitialize
      initialValues={getInitialValues(game)}
      onSubmit={onSubmit}
    >{({
      values,
    }) => (
      <Flex vertical gap={16}>
        <Form>
          <Flex vertical gap={8}>
            <FormFieldTable fields={getFields(values)} />
            <Button trackerId="mirage-island" htmlType="submit">
              {"Generate"}
            </Button>
          </Flex>
        </Form>

        <ResultTable<ResultColumnData> columns={getColumns(game, values)} dataSource={results} />
      </Flex>
    )}</Formik>
  );
};
