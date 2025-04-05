import { Formik, FormikConfig } from "formik";
import {
  Field,
  FormikInput,
  FormikSelect,
  FormikSwitch,
  Flex,
  FormFieldTable,
  Form,
  ResultTable,
  Button,
  IvInput,
  ResultColumn,
  RngToolForm,
  RngToolSubmit,
} from "~/components";

import {
  DecimalString,
  fromDecimalString,
  fromHexString,
  HexString,
  toDecimalString,
  toHexString,
} from "~/utils/number";
import { RadioGroup } from "../../components/radio";
import React from "react";

type Game = "emerald" | "rs";


interface ResultColumnInfo {
  day: number;
  dayDiff: number;
  pidPattern: number;
  earliestFrame: number;
}

const advanceRng = function(oldValue:number){
  return Number((BigInt(oldValue) * 0x41C64E6Dn + 0x3039n) % 0x100000000n);
};
const advanceRngMulti = function(value:number,n:number){
  for(let i = 0; i < n; i++)
    value = advanceRng(value);
  return value;
};
const shift16 = function(value:number){
  return Number(BigInt(value) >> 16n)
};
const getHighPidFromRng = function(rng:number){
  rng = advanceRng(rng);
  return shift16(rng);
};


class EarliestFrameCalculator {
  constructor(private initialSeed:number){}

  private earliestFrameByPidPattern:Uint32Array | null = null; // null until the first getEarliestAdvanceCount call

  private generateEarliestAdvanceCount(){
    const EARLIEST_VALID_FRAME = 300; //NO_PROD
    const earliestFrameByPidPattern = new Uint32Array(0x10000);

    let unmatchedCount = 0x10000;
    let rng = this.initialSeed;
    for(let i = 0; i < 10_000_000; i++, rng = advanceRng(rng)){ // 10_000_000 to avoid infinite loop in case of error.
      //console.log(i, initialSeed.toString(16));

      if (i < EARLIEST_VALID_FRAME)
        continue;
      
      const pidPattern = getHighPidFromRng(rng);
      const oldValue = earliestFrameByPidPattern[pidPattern];
      if (oldValue !== 0)
        continue; // another earlier frame exists

      earliestFrameByPidPattern[pidPattern] = i;
      unmatchedCount--;
      if (unmatchedCount === 0){
        console.log(i);
        break; // all were matched
      }
    }
    if (unmatchedCount !== 0){
      console.error('earliestFrameByPidPattern are missing some values');
    }
    return earliestFrameByPidPattern;
  }
  getEarliestAdvanceCount(pidPattern:number){
    if(this.earliestFrameByPidPattern === null)
      this.earliestFrameByPidPattern = this.generateEarliestAdvanceCount();
    console.log(this.earliestFrameByPidPattern);
    return this.earliestFrameByPidPattern[pidPattern];
  } 
}

const emeraldEarliestFrameCalc = new EarliestFrameCalculator(0x0);
const rsEarliestFrameCalc = new EarliestFrameCalculator(0x5A0);

const columns: ResultColumn<ResultColumnInfo>[] = [
  { title: "Day", dataIndex: "day", key: "day" },
  { title: "Days From Now",dataIndex: "dayDiff",key: "dayDiff",
    render: (dayDiff) => `+${dayDiff}`,
  },
  { title: "PID Pattern", dataIndex: "pidPattern", key: "pidPattern",
    render: (pidPattern) => {
      console.log(pidPattern);
      return `0x${pidPattern.toString(16).toUpperCase().padStart(4,'0')}****`
    }, 
    monospace:true,
  },
  { title: "Method 1 Earliest Frame matching PID Pattern", dataIndex: "earliestFrame", key: "earliestFrame" },
];

type FormState = {
  isBatteryDead: boolean;
  rocketLaunchedCount:DecimalString;
  game:Game;
};


const getInitialValues = (game: Game): FormState => {
  return {
    isBatteryDead: false,
    rocketLaunchedCount: toDecimalString(0),
    game,
  };
};

const getFields = (game: Game): Field[] => {
  const [isBatteryDead, setIsBatteryDead] = React.useState(false);
  return [
    {
      label: "Battery",
      input: (
        <RadioGroup
          optionType="button"
          value={isBatteryDead}
          onChange={({ target }) => {
            setIsBatteryDead(target.value);
          }}
          options={[
            { label: "Live", value: false },
            { label: "Dead", value: true },
          ]}
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

export const Gen3MirageIsland = ({ game = "emerald" }: Props) => {
  const [results, setResults] = React.useState<ResultColumnInfo[]>([]);

  const onSubmit = React.useCallback<RngToolSubmit<FormState>>(
    async (opts) => {
      if (opts.isBatteryDead){
        if(game === "emerald"){
          setResults([{day:0, dayDiff:0, pidPattern:0, earliestFrame:0}]); //NO_PROD earliestFrame
        } else {
          setResults([{day:0, dayDiff:0, pidPattern:0, earliestFrame:0}]);  //NO_PROD
        }
        return;
      }
      const calc = game === "emerald" ? emeraldEarliestFrameCalc : rsEarliestFrameCalc;
      const rocketLaunchedCount = fromDecimalString(opts.rocketLaunchedCount) ?? 0;
      const currentDay = rocketLaunchedCount * 7;
      const ROW_COUNT = 50;
      let mirageIslandRng = advanceRngMulti(0, currentDay);

      const res:ResultColumnInfo[] = [];
      for(let dayDiff = 0; dayDiff < ROW_COUNT; dayDiff++){
        const day = currentDay + dayDiff;
        const pidPattern = shift16(mirageIslandRng);
        console.log(mirageIslandRng, pidPattern);
        res.push({
          day, 
          dayDiff, 
          pidPattern, 
          earliestFrame:calc.getEarliestAdvanceCount(pidPattern),
        });
        mirageIslandRng = advanceRng(mirageIslandRng);
      }
      console.log(res);
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
            <FormFieldTable fields={getFields(game)} />
            <Button trackerId="mirage-island" htmlType="submit">
              {"Generate"}
            </Button>
          </Flex>
        </Form>

        <ResultTable<ResultColumnInfo>
          columns={columns}
          dataSource={results}
        />
      </Flex>
    </Formik>
  );
};
