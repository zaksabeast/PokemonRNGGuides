import { Field, RngToolForm, ResultColumn, RngToolSubmit } from "~/components";
import { FormikRadio,RadioGroup } from "../../../components/radio";
import { FormikInput } from "../../../components/input";

import { Button } from "../../../components/button";
import {CaughtStatInput,CaughtStatInputs, NatureStatState,CaughtStatProps, StatLabel} from "./caughtStatInput";
import { Gender, Nature,Static3Result, Species, Ivs, rngTools } from "~/rngTools";
import React from "react";
import {MultiTimer} from "../../../components/multiTimer";

type Game = "emerald" | "rs";

export interface Result {
  adv: number;
  diffWithTarget: number;
  stats: string;
  nature:Nature;
  gender:Gender;
}

type StarterSpecies = "Mudkip" | "Torchic" | "Treecko";

type FormStateFindShiny = {
  pokemonSpecies: StarterSpecies;
  tid: string;
  sid: string;
};

const getInitialValuesFindShiny = (): FormStateFindShiny => {
  return {
    pokemonSpecies: "Mudkip",
    tid: "0",
    sid: "0",
  };
};

const generateResults = async function (values: FormStateFindShiny): Promise<Result[]> {
  return [];
};

const findTargetAdvanceForShinyPokemon = async function (game:Game, values: FormStateFindShiny): Promise<number | null> {
  const MINIMAL_ADV = 600;

  for (let i = 0; i < 100; i++){
    const seed = game === "emerald" ? 0 : 0x5a0;
    const initial_advances = Math.max(i * 100_000, MINIMAL_ADV);
    
    const results = await rngTools.gen3_static_states({
      species:values.pokemonSpecies,
      method4:false,
      initial_advances,
      max_advances: 100_000,
      seed,
      offset:0,
      tid:(+values.tid) || 0,
      sid:(+values.sid) || 0,
      bugged_roamer: false,
      filter: {
        shiny: true,
        nature:undefined,
        gender:undefined,
        ability:undefined,
        ivs: {
          min_ivs: {hp:0, atk:0,def:0, spa: 0,spd: 0,spe: 0},
          max_ivs: {hp:31, atk:31,def:31, spa: 31,spd: 31,spe: 31},
        },
      },
    });
    if (results.length)
        return results[0].advance;
  }

  return null;
};

type Props = {
  game?: Game;
};


const getStatRangeForStarter = (starter:StarterSpecies) => {
  if (starter === "Mudkip")
    return {
      hp:  { min: 20, max: 21},
      atk: { min: 10, max: 14},
      def: { min: 9, max: 12},
      spa: { min: 9, max: 12},
      spd: { min: 9, max: 12},
      spe: { min: 8, max: 11},
    };
  if (starter === "Treecko")
    return {
      hp:  { min: 19, max: 20},
      atk: { min: 8, max: 12},
      def: { min: 7, max: 11},
      spa: { min: 9, max: 14},
      spd: { min: 9, max: 13},
      spe: { min: 10, max: 14},
    };
  if (starter === "Torchic")
    return {
      hp:  { min: 19, max: 21},
      atk: { min: 9, max: 13},
      def: { min: 8, max: 11},
      spa: { min: 10, max: 14},
      spd: { min: 9, max: 12},
      spe: { min: 8, max: 12},
    };
  throw new Error('invalid starter: ' + starter);
};

export const Gen3ShinyStarter = ({ game = "emerald" }: Props) => {
  const initialValues = getInitialValuesFindShiny();
  
  const [results, setResults] = React.useState<Result[]>([]);
  
  const [targetAdv, setTargetAdv] = React.useState<number>(0);
  const [latestHitAdv, setLatestHitAdv] = React.useState<number | null>(null);

  const [caughtStats, setCaughtStats] = React.useState<{
    hp: CaughtStatProps;
    atk: CaughtStatProps;
    def: CaughtStatProps;
    spa: CaughtStatProps;
    spd: CaughtStatProps;
    spe: CaughtStatProps;
  }>({
    hp:  { statLabel:"HP",  min: 19, max: 20, value: null, nature: "nochange" },
    atk: { statLabel:"ATK", min: 8, max: 12, value: null, nature: "nochange" },
    def: { statLabel:"DEF", min: 7, max: 11, value: null, nature: "nochange" },
    spa: { statLabel:"SPA", min: 9, max: 14, value: null, nature: "nochange" },
    spd: { statLabel:"SPD", min: 9, max: 13, value: null, nature: "nochange" },
    spe: { statLabel:"SPE", min: 10, max: 14, value: null, nature: "nochange" },
  });

  const onSubmitFindTarget = React.useCallback<RngToolSubmit<FormStateFindShiny>>(
    async (values) => {
      const adv = await findTargetAdvanceForShinyPokemon(game, values);
      if (adv !== null)
        setTargetAdv(adv);
    },
    [game],
  );
  
  const onSubmitFindMatchingCaught = React.useCallback<RngToolSubmit<{}>>(
    async (values) => {
      //NO_PROD
      setResults([
        {adv: 1510, diffWithTarget:10, stats: '5/6/1/5/4/6', nature:"Adamant", gender:"Male"},
        {adv: 1484, diffWithTarget:-16, stats: '1/6/1/3/4/6', nature:"Quirky", gender:"Female"},
      ]);
    },
    [game],
  );

  const getColumns = (): ResultColumn<Result>[] => {
    const columns: ResultColumn<Result>[] = [
      {
        title: "Advance",
        dataIndex: "adv",
        key: "adv",
      },
      {
        title: "Difference w/ Target",
        dataIndex: "diffWithTarget",
        key: "diffWithTarget",
        render:(val) => {
          if (val > 0) return `+${val}`;
          return '' + val;
        }
      },
      {
        title: "Stats",
        dataIndex: "stats",
        key: "stats",
      },
      {
        title: "Nature",
        dataIndex: "nature",
        key: "nature",
      },
      {
        title: "Gender",
        dataIndex: "gender",
        key: "gender",
      },
      {
        title: "",
        dataIndex: "adv",
        key: "adv",
        render(adv) {
          return (<Button trackerId="NO_PROD" onClick={e => {
            setLatestHitAdv(adv);
          }}>Update Calibration</Button>)
        },
      }
    ];
    return columns;
  };

  const columns = React.useMemo(() => getColumns(), []);
    
  const getFields = () => {
    const milliseconds = Math.round(targetAdv * 1000 / 59.7275); //NO_PROD
    const minutesBeforeTarget = Math.floor(milliseconds / 60000);
    const fields: Field[] = [
      {
        label: "Target advance for shiny Pokémon",
        input: (
          <>{targetAdv}</>
        ),
      },
      {
        label: "Latest hit advance (calibration)",
        input: (
          <>{latestHitAdv === null ? "-" : latestHitAdv}</>
        ),
      },
      {
        label: "Timer",
        direction:"column",
        input: (
          <MultiTimer minutesBeforeTarget={minutesBeforeTarget} milliseconds={[5000,milliseconds]} startButtonTrackerId={"shinyStarter-startTimer"} stopButtonTrackerId={"shinyStarter-stopTimer"}/>
        ),
      },
    ];
    
    const onNatureChanged = (stat:StatLabel, nature:NatureStatState) => {
      const key = 'hp'; //NO_PROD
      setCaughtStats({
        ...caughtStats,
        [key]:{...caughtStats[key], nature}
      });
    };

    
    const onValueChanged = (stat:StatLabel, value:number) => {
      const key = 'hp'; //NO_PROD
      setCaughtStats({
        ...caughtStats,
        [key]:{...caughtStats[key], value}
      });
    };

    const clear = () => {
      setCaughtStats({
        hp:{...caughtStats.hp,value:null,nature:"nochange"},
        atk:{...caughtStats.atk,value:null,nature:"nochange"},
        def:{...caughtStats.def,value:null,nature:"nochange"},
        spa:{...caughtStats.spa,value:null,nature:"nochange"},
        spd:{...caughtStats.spd,value:null,nature:"nochange"},
        spe:{...caughtStats.spe,value:null,nature:"nochange"},
      });
    };

    fields.push({
      label: "Caught Pokémon",
      direction:"column",
      input: <CaughtStatInputs clear={clear} {...caughtStats} onNatureChanged={onNatureChanged} onValueChanged={onValueChanged} />,
    });

  return fields;
  };

  return (
    <div>
      <RngToolForm<FormStateFindShiny, Result>
        fields={[
          {
            label: "Starter",
            input: (
              <FormikRadio<FormStateFindShiny, "pokemonSpecies">
              name="pokemonSpecies"
              options={["Mudkip", "Torchic", "Treecko"]}
              />
            ),
          },
          {
            label: "TID",
            input: <FormikInput<FormStateFindShiny> name="tid" />,
          },
          {
            label: "SID",
            input: <FormikInput<FormStateFindShiny> name="sid" />,
          }
        ]}
        initialValues={initialValues}
        submitButtonLabel="Find target advance for shiny Pokémon"
        onSubmit={onSubmitFindTarget}
        submitTrackerId="shinyStarter_findTarget"
      />

      {targetAdv !== 0 && <RngToolForm<{}, Result>
        getFields={getFields}
        columns={columns}
        results={results}
        initialValues={initialValues}
        submitButtonLabel="Find advances matching caught Pokémon"
        onSubmit={onSubmitFindMatchingCaught}
        rowKey="adv"
        submitTrackerId="shinyStarter_findMatchingCaught"
        />}
    </div>
  );
};
