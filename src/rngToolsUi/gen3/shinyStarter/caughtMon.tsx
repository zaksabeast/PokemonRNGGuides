import React from "react";
import { useFormikContext } from "formik";
import { RngToolForm, Field, Flex, ResultColumn, Icon } from "~/components";
import { FormikRadio, RadioGroup } from "~/components/radio";
import { Ivs, Nature, Gender, rngTools} from "~/rngTools";
import { RngToolSubmit } from "~/components/rngToolForm";
import { noop } from "lodash-es";
import { match } from "ts-pattern";
import { Typography } from "~/components/typography";
import {natures,NatureStat,getNaturesFromStatMoreLess,getStatMoreLessFromNature} from "../../../types/nature";
import * as tst from "ts-toolbelt";
import { RadioChangeEvent } from "antd";
import {Starter} from "./index";
import {Select} from "~/components";
import { Formik, FormikProps, FormikConfig } from "formik";
import {getStatRangeForStarter, CaughtMonResult, generateCaughtMonResults} from "./calc";
import { Button } from "../../../components/button";
import type {Game} from "./index";

const sortedNatures = natures.slice(0).sort();

const toOptions = <T,>(options: T[]) => {
  return options.map((option) => ({
    value: option,
    label: String(option),
  }));
};

const toStatOptions = ({min,max}:{min:number,max:number}) => {
  const opts:{label:string,value:number}[] = [];
  for(let i = min; i <= max; i++)
    opts.push({value:i, label: String(i)});
  return opts;
};

export type FormState = {
  pokemonSpecies: Starter;
  hpStat: number;
  atkStat: number;
  defStat: number;
  spaStat: number;
  spdStat: number;
  speStat: number;
  nature : Nature | "";
  gender : Gender | "";
  minMaxStats:{
    hp:  {min:number, max:number},
    atk: {min:number, max:number},
    def: {min:number, max:number},
    spa: {min:number, max:number},
    spd: {min:number, max:number},
    spe: {min:number, max:number},
  }
};

const StatInput = ({
  stat,
  options,
}: {
  stat: NatureStat;
  options: {min:number,max:number};
}) => {
  return (
    <Flex gap={8}>
      <FormikRadio<FormState, `${typeof stat}Stat`>
        name={`${stat}Stat`}
        options={toStatOptions(options)}
      />
    </Flex>
  );
};

const initialValues: FormState = {
  pokemonSpecies: "Mudkip",
  hpStat: 0,
  atkStat: 0,
  defStat: 0,
  spaStat: 0,
  spdStat: 0,
  speStat: 0,
  nature:"",
  gender:"",
  minMaxStats: {
    hp:  {min:20,max:21},
    atk: {min:10,max:14},
    def: {min:9,max:12},
    spa: {min:9,max:12},
    spd: {min:9,max:12},
    spe: {min:8,max:11},
  }
};

type Props = {
  game:Game;
  targetAdvance: number;
  setLatestHitAdv: (hitAdv: number) => void;
};

export const CaughtMon = ({ game, targetAdvance, setLatestHitAdv }: Props) => { 
  const [results, setResults] = React.useState<CaughtMonResult[]>([]);
  const onSubmit = React.useCallback<RngToolSubmit<FormState>>(
    async (opts) => {
      setResults(await generateCaughtMonResults(game, targetAdvance, opts));
    },
    [targetAdvance, setResults],
  );

  const getColumns = (): ResultColumn<CaughtMonResult>[] => {
    const columns: ResultColumn<CaughtMonResult>[] = [
      { title: "Target", dataIndex: "targetAdvance"},
      { title: "Advance", dataIndex: "advance",
        render: (val, values) => {
          const diffWithTarget = val - values.targetAdvance; 
          if (diffWithTarget === 0) 
            return `${val}`;
          if (diffWithTarget > 0) 
            return `${val} (+${diffWithTarget})`;
          return `${val} (${diffWithTarget})`;
        },
      },
      {
        title: "",
        dataIndex: "advance",
        render(advance, values) {
          if (values.advance === values.targetAdvance)
            return "Shiny if correct SID";
          
          return (
            <Button type="text" color="PrimaryText"
              trackerId="shinyStarter_adv"
              onClick={() => {
                setLatestHitAdv(advance);
                setResults([]);
              }}
            >
              <Icon name="Update" size={20} /> Update Calibration
            </Button>
          );
        },
      },
    ];
    return columns;
  };

  const getFields = (formik:FormikProps<FormState>) : Field[] => {
    const {minMaxStats} = formik.values;

    return [
      {
        label: "Starter",
        input: (
          <RadioGroup
            optionType="button"
            value={formik.values.pokemonSpecies}
            onChange={async ({ target }) => {
              formik.setValues({
                ...formik.values,
                pokemonSpecies: target.value,
                minMaxStats: await getStatRangeForStarter(target.value),
              });
            }}
            options={toOptions(["Mudkip", "Torchic", "Treecko"])}
          />
        ),
      },
      {
        label: "Gender",
        input: (
          <FormikRadio<FormState, "gender">
            name="gender"
            options={toOptions(["Male","Female"])}
          />
        )
      },
      {
        label: "Nature",
        input: (<Select style={{minWidth:'120px'}}
          value={formik.values.nature}
          onChange={e => {
            if (!e)
              return;
            formik.setFieldValue("nature", e);
          }}
          options={sortedNatures.map(nature => ({label:nature, value:nature}))}
        />)
      },
      {
        label: "HP",
        input: (
          <FormikRadio<FormState, "hpStat">
            name="hpStat"
            options={toStatOptions(minMaxStats.hp)}
          />
        ),
      },
      {
        label: "ATK",
        input: <StatInput stat="atk" options={minMaxStats.atk} />,
      },
      {
        label: "DEF",
        input: <StatInput stat="def" options={minMaxStats.def} />,
      },
      {
        label: "SPA",
        input: <StatInput stat="spa" options={minMaxStats.spa} />,
      },
      {
        label: "SPD",
        input: <StatInput stat="spd" options={minMaxStats.spd} />,
      },
      {
        label: "SPE",
        input: <StatInput stat="spe" options={minMaxStats.spe} />,
      },
    ];
  };

  return (
    <>
      <Typography.Title level={5} p={0} m={0}>Caught Pokémon</Typography.Title>
      <RngToolForm<FormState, CaughtMonResult>
        getFields={getFields}
        columns={getColumns()}
        results={results}
        initialValues={initialValues}
        onSubmit={onSubmit}
        submitTrackerId="generate_gen3_caught_starter"
        submitButtonLabel={"Find advances matching caught starter Pokémon"}
        rowKey="advance"
        allowReset={true}
        resetTrackerId="caughtMon_reset"
      />
    </>
  );
};
