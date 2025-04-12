import { Field, RngToolForm, ResultColumn, RngToolSubmit } from "~/components";
import {
  DecimalString,
  fromDecimalString,
  toDecimalString,
} from "~/utils/number";
import { FormikRadio,RadioGroup } from "../../components/radio";
import { FormikInput } from "../../components/input";

import { withCss } from "../../components/withCss";
import { Button, BaseButton } from "../../components/button";
import { Gender, Nature, rngTools } from "~/rngTools";
import React from "react";
import {MultiTimer} from "../../components/multiTimer";
import {
  capPrecision,
} from "~/utils/number";

type Game = "emerald" | "rs";

const formatLargeInteger = function (number: number) {
  return number.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export interface Result {
  adv: number;
  diffWithTarget: number;
  stats: string;
  nature:Nature;
  gender:Gender;
}

type StarterSpecies = "Mudkip" | "Torchic" | "Treecko";
type NatureStatState = "more" | "less" | "nochange";
type StatLabel = "HP" | "ATK" | "DEF" | "SPD" | "SPA" | "SPE";

type CaughtStatProps = {
  statLabel:StatLabel;
  min: number;
  max: number;
  value: number | null;
  nature: NatureStatState;
  onNatureChanged?: (nature: NatureStatState) => void;
  onValueChanged?: (selected: number) => void;
};

type FormState = {
  pokemonSpecies: StarterSpecies;
  tid: string;
  sid: string;
};

const getInitialValues = (): FormState => {
  return {
    pokemonSpecies: "Mudkip",
    tid: "0",
    sid: "0",
  };
};

const generateResults = async function (values: FormState): Promise<Result[]> {
  return [];
};

type Props = {
  game?: Game;
};

export const CaughtStatInput = ({statLabel,min,max,value:value_props,nature:nature_props,onNatureChanged,onValueChanged}: CaughtStatProps) => {
  const [value, setValue] = React.useState<number | null>(value_props);
  const [nature, setNature] = React.useState<NatureStatState>(nature_props);
  onNatureChanged = onNatureChanged || (() => {});
  onValueChanged = onValueChanged || (() => {});

  let value_opts:{label:string,value:number}[] = [];
  for(let val = min; val <= max; val++)
    value_opts.push({label: '' + val, value:val});

  const natureBtn:React.ReactNode = (() => {
    if (statLabel === "HP")
      return <></>
    return <RadioGroup
      optionType="button"
      value={nature}
      onChange={e => {
        setNature(e.target.value);
        onNatureChanged(e.target.value);
      }}
      options={[
        {label: "+", value:"more"},
        {label: "=", value:"nochange"},
        {label: "-", value:"less"}
      ]}
    />
  })();
  
  return (
    <tr>
      <td style={{paddingRight:'20px'}}>{statLabel}</td>
      <td style={{paddingRight:'30px'}}>{natureBtn}</td>
      
      <td><RadioGroup
        optionType="button"
        value={value}
        onChange={e => {
          setValue(e.target.value);
          onValueChanged(e.target.value);
        }}
        options={value_opts}
      /></td>
    </tr>
  )
};

export const Gen3ShinyStarter = ({ game = "emerald" }: Props) => {
  const initialValues = getInitialValues();
  
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
    hp:  { statLabel:"HP", min: 17, max: 19, value: null, nature: "nochange" },
    atk: { statLabel:"ATK", min: 11, max: 12, value: null, nature: "nochange" },
    def: { statLabel:"DEF", min: 9, max: 10, value: null, nature: "nochange" },
    spa: { statLabel:"SPA", min: 8, max: 9, value: null, nature: "nochange" },
    spd: { statLabel:"SPD", min: 9, max: 10, value: null, nature: "nochange" },
    spe: { statLabel:"SPE", min: 8, max: 9, value: null, nature: "nochange" },
  });

  const onSubmitFindTarget = React.useCallback<RngToolSubmit<FormState>>(
    async (values) => {
      setTargetAdv((+values.sid) + (+values.tid) + 1503);
    },
    [game],
  );
  
  const onSubmitFindMatchingCaught = React.useCallback<RngToolSubmit<{}>>(
    async (values) => {
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
        label: "Target Advance for Shiny Pokémon",
        input: (
          <>{targetAdv}</>
        ),
      },
      {
        label: "Latest Hit Advance (Calibration)",
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
    
    const onNatureChanged = (key:keyof typeof caughtStats) => {
      return (nature: NatureStatState) => {
        setCaughtStats({
          ...caughtStats,
          [key]:{...caughtStats[key], nature}
        });
      };
    };
    
    const onValueChanged = (key:keyof typeof caughtStats) => {
      return (value: number) => {
        setCaughtStats({
          ...caughtStats,
          [key]:{...caughtStats[key], value}
        });
      };
    };

    fields.push({
      label: "Caught Pokémon",
      direction:"column",
      input: (
        <table>
          <tbody>
            <CaughtStatInput {...caughtStats.hp}  onValueChanged={onValueChanged('hp')} onNatureChanged={onNatureChanged('hp')} />
            <CaughtStatInput {...caughtStats.atk} onValueChanged={onValueChanged('atk')} onNatureChanged={onNatureChanged('atk')} />
            <CaughtStatInput {...caughtStats.def} onValueChanged={onValueChanged('def')} onNatureChanged={onNatureChanged('def')} />
            <CaughtStatInput {...caughtStats.spa} onValueChanged={onValueChanged('spa')} onNatureChanged={onNatureChanged('spa')} />
            <CaughtStatInput {...caughtStats.spd} onValueChanged={onValueChanged('spd')} onNatureChanged={onNatureChanged('spd')} />
            <CaughtStatInput {...caughtStats.spe} onValueChanged={onValueChanged('spe')} onNatureChanged={onNatureChanged('spe')} />              
            <tr><td></td><td>Nature: Adamant</td></tr>            
          </tbody>
        </table>
      ),
    });

  return fields;
  };

  return (
    <div>
      <RngToolForm<FormState, Result>
        fields={[
          {
            label: "Starter",
            input: (
              <FormikRadio<FormState, "pokemonSpecies">
              name="pokemonSpecies"
              options={["Mudkip", "Torchic", "Treecko"]}
              />
            ),
          },
          {
            label: "TID",
            input: <FormikInput<FormState> name="tid" />,
          },
          {
            label: "SID",
            input: <FormikInput<FormState> name="sid" />,
          }
        ]}
        initialValues={initialValues}
        submitButtonLabel="Find Target Advance for Shiny Pokémon"
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
