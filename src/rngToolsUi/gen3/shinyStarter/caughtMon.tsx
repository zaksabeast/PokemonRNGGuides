import React from "react";
import { useFormikContext } from "formik";
import { RngToolForm, Field, Flex, ResultColumn } from "~/components";
import { FormikRadio, RadioGroup } from "~/components/radio";
import { Ivs, Nature } from "~/rngTools";
import { RngToolSubmit } from "~/components/rngToolForm";
import { noop } from "lodash-es";
import { match } from "ts-pattern";
import {natures} from "../../../types/nature";
import * as tst from "ts-toolbelt";
import { RadioChangeEvent } from "antd";
import {Starter} from "./index";
import {Select} from "~/components";

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
  increasedStat: NatureStat | ""; 
  decreasedStat: NatureStat | ""; 
  natureDropdown:Nature | "";
  //NO_PROD add back neutral nature support
};

type NatureStatRadioProps = {
  stat: NatureStat;
};

const natureStatOptions = toOptions(["+", "=", "-"]);

const NatureStatRadio = ({ stat }: NatureStatRadioProps) => {
  const { setFieldValue, values, setValues } = useFormikContext<FormState>();
  const isIncreased = stat === values.increasedStat;
  const isDecreased = stat === values.decreasedStat;
  const value = isIncreased ? "+" : isDecreased ? "-" : "=";

  const onChange = React.useCallback(
    (event: RadioChangeEvent) => {
      const newValue = event.target.value;
      match({ newValue, isIncreased, isDecreased })
        // We don't allow a stat to be both + and -,
        // so we make sure to only set a stat when
        // it's not already set to the opposite value
        .with({ newValue: "=", isDecreased: true }, () => {
          setFieldValue("decreasedStat", "");
        })
        .with({ newValue: "=", isIncreased: true }, () => {
          setFieldValue("increasedStat", "");
        })
        .with({ newValue: "+", isDecreased: false }, () => {
          setFieldValue("increasedStat", stat);
        })
        .with({ newValue: "+", isDecreased: true }, () => {
          setValues({
            ...values,
            increasedStat:stat,
            decreasedStat:"",
          });
        })
        .with({ newValue: "-", isIncreased: false }, () => {
          setFieldValue("decreasedStat", stat);
        })
        .with({ newValue: "-", isIncreased: true }, () => {
          setValues({
            ...values,
            increasedStat:"",
            decreasedStat:stat,
          });
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
      options={natureStatOptions}
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
const sortedNatures = natures.slice(0).sort();

const initialValues: FormState = {
  hpStat: 0,
  atkStat: 0,
  defStat: 0,
  spaStat: 0,
  spdStat: 0,
  speStat: 0,
  increasedStat: "",
  decreasedStat: "",
  natureDropdown: "",
};

type Props = {
  pokemonSpecies:Starter,
  targetAdvance: number;
  onClickCaughtMon: (result: CaughtMonResult) => void;
};

export const CaughtMon = ({ pokemonSpecies, targetAdvance, onClickCaughtMon }: Props) => { 
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

  //NO_PROD adapt stat values based on species
  const getFields = (formik:FormState) : Field[] => {
    return [
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
      /*{
        label: "Nature",
        input: (<Select style={{minWidth:'120px'}}
          value={formik.natureDropdown}
          onChange={e => {
            //const { setFieldValue, values, setValues } = useFormikContext<FormState>();
            //setFieldValue("natureDropdown", e);
          }}
          options={sortedNatures.map(nature => ({label:nature, value:nature}))}
        />)
      }*/
    ];
  };

  return (
    <RngToolForm<FormState, CaughtMonResult>
      getFields={getFields}
      columns={columns}
      results={results}
      initialValues={initialValues}
      onSubmit={onSubmit}
      submitTrackerId="generate_gen3_caught_starter"
      submitButtonLabel={"Find advances matching caught " + pokemonSpecies}
      rowKey="advance"
      allowReset={true}
      resetTrackerId="caughtMon_reset"
      onClickResultRow={onClickCaughtMon}
    />
  );
};
