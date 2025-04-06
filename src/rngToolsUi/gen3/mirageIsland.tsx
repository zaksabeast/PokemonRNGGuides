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
import { RadioGroup, FormikRadio } from "../../components/radio";
import React from "react";

//NO_PROD: hide Rocket Launched 

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

const columns: ResultColumn<ResultColumnData>[] = [
  { title: "Day", dataIndex: "day", key: "day" },
  {
    title: "Time To Wait",
    dataIndex: "dayDiff",
    key: "dayDiff",
    render: (dayDiff) => `${dayDiff} day${dayDiff === 1 ? "" : "s"}`,
  },
  {
    title: "PID Pattern",
    dataIndex: "pidPattern",
    key: "pidPattern",
    render: (pidPattern) =>
      `0x${pidPattern.toString(16).toUpperCase().padStart(4, "0")}****`,
    monospace: true,
  },
  {
    title: "Method-1 Earliest Frame matching PID Pattern",
    dataIndex: "earliestFrame",
    key: "earliestFrame",
    render: (earliestFrame) => formatLargeInteger(earliestFrame),
  },
];

type FormState = {
  battery: "Dead" | "Live";
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

const getFields = (): Field[] => {
  return [
    {
      label: "Battery",
      input: (
        <FormikRadio<FormState, "battery">
          name="battery"
          options={["Live", "Dead"]}
        />
      ),
    },
    {
      label: "Rocket Launched",
      input: <FormikInput<FormState> name="rocketLaunchedCount" />,
    },
  ];
};

type Props = {
  game?: Game;
};

export const Gen3MirageIsland = ({ game = "rs" }: Props) => {
  const [results, setResults] = React.useState<ResultColumnData[]>([]);

  const onSubmit = React.useCallback<RngToolSubmit<FormState>>(
    async (opts) => {
      const calc =
        game === "emerald" ? emeraldEarliestFrameCalc : rsEarliestFrameCalc;

      if (opts.battery === "Dead") {
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
        fromDecimalString(opts.rocketLaunchedCount) ?? 0;
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
    >
      <Flex vertical gap={16}>
        <Form>
          <Flex vertical gap={8}>
            <FormFieldTable fields={getFields()} />
            <Button trackerId="mirage-island" htmlType="submit">
              {"Generate"}
            </Button>
          </Flex>
        </Form>

        <ResultTable<ResultColumnData> columns={columns} dataSource={results} />
      </Flex>
    </Formik>
  );
};
