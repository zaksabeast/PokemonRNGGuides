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
import {Input} from "antd";
import {
  DecimalString,
  fromDecimalString,
  toDecimalString,
} from "~/utils/number";
import { RadioGroup } from "../../components/radio";
import React from "react";

type Game = "emerald" | "rs";

interface ResultColumnData {
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

class EarliestAdvCalculator {
  constructor(private initialSeed: number) {}

  /** 
   * earliestAdvanceByPidPattern[PidPattern] = earliestMethod1Advance.
   * null until the first getEarliestAdvanceCount call
  */
  private earliestAdvanceByPidPattern: Uint32Array | null = null; 

  private generateEarliestAdvanceCount() {
    const EARLIEST_VALID_ADVANCE = 1000; // Earliest advance for Kecleon with turbo fire A is ~816
    const earliestAdvByPidPattern = new Uint32Array(0x10000);

    let unmatchedCount = 0x10000;
    let pidRng = BigInt(this.initialSeed);
    for (let pidRngAdv = 0; pidRngAdv < 1_000_000; pidRngAdv++) { // 1_000_000 to avoid infinite loop in case of bug
      pidRng = advancePidRng(pidRng);

      if (pidRngAdv < EARLIEST_VALID_ADVANCE) continue;

      const pidPattern = Number(getHighPidFromRng(pidRng));
      const oldValue = earliestAdvByPidPattern[pidPattern];
      if (oldValue !== 0) continue; // another earlier advance exists

      earliestAdvByPidPattern[pidPattern] = pidRngAdv;
      unmatchedCount--;
      if (unmatchedCount === 0) break; // all were matched
    }

    if (unmatchedCount !== 0)
      console.error("Error: earliestAdvByPidPattern are missing some values. This means some PID pattern won't have a earliest advance.");

    return earliestAdvByPidPattern;
  }
  getEarliestAdvanceCount(pidPattern: number) {
    if (this.earliestAdvanceByPidPattern === null)
      this.earliestAdvanceByPidPattern = this.generateEarliestAdvanceCount();
    return this.earliestAdvanceByPidPattern[pidPattern];
  }
}

const emeraldEarliestAdvCalc = new EarliestAdvCalculator(0x0);
const rsEarliestAdvCalc = new EarliestAdvCalculator(0x5A0);

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
      render: (pidPattern) => `0x${pidPattern.toString(16).toUpperCase().padStart(4, "0")}****`,
      monospace: true,
    }
  );

  const fixedInitialSeedForMethod1 = game === "emerald" || values.battery === "Dead";
  if (fixedInitialSeedForMethod1)
    columns.push(
      {
        title: "Method-1 Earliest RNG Advance matching PID Pattern",
        dataIndex: "earliestAdv",
        key: "earliestAdv",
        render: (earliestAdv) => formatLargeInteger(earliestAdv),
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

type Props = {
  game?: Game;
};

export const Gen3MirageIsland = ({ game = "emerald" }: Props) => {
  const calc = game === "emerald" ? emeraldEarliestAdvCalc : rsEarliestAdvCalc;

  const initialValues = getInitialValues(game);

  const generateResults = function(values:FormState) : ResultColumnData[] {
    if (values.battery === "Dead") {
      return [
        {
          day: 0,
          dayDiff: 0,
          pidPattern: 0,
          earliestAdv: calc.getEarliestAdvanceCount(0),
        },
      ];
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
        earliestAdv: calc.getEarliestAdvanceCount(pidPattern),
      });
      mirageIslandRng = advanceMirageIslandRng(mirageIslandRng);
    }
    return res;
  };
  const [results, setResults] = React.useState<ResultColumnData[]>(generateResults(initialValues));

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
    >{(formik) => {
      const fields:Field[] = [
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
          input: <Input
            name="rocketLaunchedCount"
            onChange={(e) => {
              formik.handleChange(e);
              formik.submitForm();
            }}
            value={formik.values.rocketLaunchedCount}
          />
        });

      return (<Flex vertical gap={16}>
        <Form>
          <Flex vertical gap={8}>
            <FormFieldTable fields={fields} />
          </Flex>
        </Form>

        <ResultTable<ResultColumnData> columns={getColumns(game, formik.values)} dataSource={results} />
      </Flex>);    
    }}</Formik>
  );
};
