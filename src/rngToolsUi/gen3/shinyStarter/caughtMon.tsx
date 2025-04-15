import React from "react";
import { useFormikContext } from "formik";
import { RngToolForm, Field, Flex, ResultColumn } from "~/components";
import { FormikRadio, RadioGroup } from "~/components/radio";
import { Ivs } from "~/rngTools";
import { RngToolSubmit } from "~/components/rngToolForm";
import { noop } from "lodash-es";
import { match } from "ts-pattern";
import * as tst from "ts-toolbelt";
import { RadioChangeEvent } from "antd";

export type CaughtMonResult = {
  advance: number;
  targetAdvance: number;
  otherData: string;
};

const columns: ResultColumn<CaughtMonResult>[] = [
  { title: "Advance", dataIndex: "advance", key: "advance" },
  { title: "Target Advance", dataIndex: "targetAdvance", key: "targetAdvance" },
  { title: "Other Data", dataIndex: "otherData", key: "otherData" },
];

const toOptions = <T,>(options: T[]) => {
  return options.map((option) => ({
    value: option,
    label: String(option),
  }));
};

type NatureStat = tst.U.Exclude<keyof Ivs, "hp">;

type FormState = {
  hpStat: number;
  atkStat: number;
  defStat: number;
  spaStat: number;
  spdStat: number;
  speStat: number;
  increasedStat: NatureStat;
  decreasedStat: NatureStat;
};

type StatIndicatorProps = {
  stat: NatureStat;
};

const naturStatOptions = toOptions(["+", "-"]);

const NatureStatRadio = ({ stat }: StatIndicatorProps) => {
  const { setFieldValue, values } = useFormikContext<FormState>();
  const isIncreased = stat === values.increasedStat;
  const isDecreased = stat === values.decreasedStat;
  const value = isIncreased ? "+" : isDecreased ? "-" : null;

  const onChange = React.useCallback(
    (event: RadioChangeEvent) => {
      const newValue = event.target.value;
      match({ newValue, isIncreased, isDecreased })
        // We don't allow a stat to be both + and -,
        // so we make sure to only set a stat when
        // it's not already set to the opposite value
        .with({ newValue: "+", isDecreased: false }, () => {
          setFieldValue("increasedStat", stat);
        })
        .with({ newValue: "-", isIncreased: false }, () => {
          setFieldValue("decreasedStat", stat);
        })
        .otherwise(noop);
    },
    [isIncreased, isDecreased, setFieldValue, stat],
  );

  return (
    <RadioGroup
      optionType="button"
      value={value}
      onChange={onChange}
      options={naturStatOptions}
    />
  );
};

const StatInput = ({
  stat,
  options,
}: {
  stat: NatureStat;
  options: number[];
}) => {
  return (
    <Flex gap={8}>
      <NatureStatRadio stat={stat} />
      <FormikRadio<FormState, `${typeof stat}Stat`>
        name={`${stat}Stat`}
        options={toOptions(options)}
      />
    </Flex>
  );
};

const initialValues: FormState = {
  hpStat: 0,
  atkStat: 0,
  defStat: 0,
  spaStat: 0,
  spdStat: 0,
  speStat: 0,
  increasedStat: "atk",
  decreasedStat: "atk",
};

const fields: Field[] = [
  {
    label: "HP",
    input: (
      <FormikRadio<FormState, "hpStat">
        name="hpStat"
        options={toOptions([8, 9, 10])}
      />
    ),
  },
  {
    label: "ATK",
    input: <StatInput stat="atk" options={[2, 3]} />,
  },
  {
    label: "DEF",
    input: <StatInput stat="def" options={[4, 5]} />,
  },
  {
    label: "SPA",
    input: <StatInput stat="spa" options={[6, 7]} />,
  },
  {
    label: "SPD",
    input: <StatInput stat="spd" options={[8, 9]} />,
  },
  {
    label: "SPE",
    input: <StatInput stat="spe" options={[3, 4]} />,
  },
];

type Props = {
  targetAdvance: number;
  onClickCaughtMon: (result: CaughtMonResult) => void;
};

export const CaughtMon = ({ targetAdvance, onClickCaughtMon }: Props) => {
  const [results, setResults] = React.useState<CaughtMonResult[]>([]);
  const onSubmit = React.useCallback<RngToolSubmit<FormState>>(
    async (opts) => {
      const otherData = JSON.stringify(opts);
      const fakeResults = new Array(10)
        .fill(0)
        .map((_, i) => ({ advance: i, targetAdvance, otherData }));
      setResults(fakeResults);
    },
    [targetAdvance],
  );

  return (
    <RngToolForm<FormState, CaughtMonResult>
      fields={fields}
      columns={columns}
      results={results}
      initialValues={initialValues}
      onSubmit={onSubmit}
      submitTrackerId="generate_gen3_caught_starter"
      rowKey="advance"
      onClickResultRow={onClickCaughtMon}
    />
  );
};
