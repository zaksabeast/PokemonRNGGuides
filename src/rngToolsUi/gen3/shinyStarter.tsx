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
      dataIndex: "gender",
      key: "gender",
      render() {
        return <Button trackerId="dummy">Select</Button>
      },
    }
  ];
  return columns;
};

type StarterSpecies = "Mudkip" | "Torchic" | "Treecko";
type NatureStatState = "more" | "less" | "nochange";
type StatLabel = "HP" | "ATK" | "DEF" | "SPD" | "SPA" | "SPE";

type CaughtStatProps = {
  statLabel:StatLabel;
  min: number;
  max: number;
  selected: number | null;
  nature: NatureStatState;
  onchange?: (selected:number | null, nature: NatureStatState) => void;
};

type FormState = {
  pokemonSpecies: StarterSpecies;
  tid: string;
  sid: string;
  targetAdv: number;
  caughtStats: {
    hp: CaughtStatProps;
    atk: CaughtStatProps;
    def: CaughtStatProps;
    spa: CaughtStatProps;
    spd: CaughtStatProps;
    spe: CaughtStatProps;
  };
};

const getInitialValues = (): FormState => {
  return {
    pokemonSpecies: "Mudkip",
    tid: "0",
    sid: "0",
    targetAdv: 1500,
    caughtStats: {
      hp:  { statLabel:"HP", min: 8, max: 10, selected: null, nature: "nochange" },
      atk: { statLabel:"ATK", min: 2, max: 3, selected: null, nature: "nochange" },
      def: { statLabel:"DEF", min: 4, max: 4, selected: null, nature: "nochange" },
      spa: { statLabel:"SPA", min: 4, max: 5, selected: null, nature: "nochange" },
      spd: { statLabel:"SPD", min: 7, max: 8, selected: null, nature: "nochange" },
      spe: { statLabel:"SPE", min: 3, max: 4, selected: null, nature: "nochange" },
    },
  };
};

const generateResults = async function (values: FormState): Promise<Result[]> {
  return [];
};

type Props = {
  game?: Game;
};

export const CaughtStatInput = ({statLabel,min,max,selected:selected_props,nature:nature_props,onchange}: CaughtStatProps) => {
  const [selected, setSelected] = React.useState<number | null>(selected_props);
  const [nature, setNature] = React.useState<NatureStatState>(nature_props);
  onchange = onchange || (() => {});

  let value_opts:string[] = [];
  for(let val = min; val <= max; val++)
    value_opts.push('' + val);
   

    /*statValBtns.push(<Button 
      trackerId="CaughtStatInput"
      className={selected === val ? "selected" : ""} 
      onClick={onclick}>
        {val}
    </Button>);*/

    /*const onclick_value = () => {
      if (selected === val){
        setSelected(null);
        if (onchange)
            onchange(null, nature);
      }
      else {
        setSelected(val);
        if (onchange)
            onchange(val, nature);
      }
    };
    
    
    const onclick = () => {
      if (nature === natureBtnId){
        setNature("nochange");
        if (onchange)
            onchange(selected, "nochange");
      }
      else {
        setNature(natureBtnId);
        if (onchange)
          onchange(selected, natureBtnId);
      }
    };
    const label = natureBtnId === "more" ? "+" : "-";

    return (<td><Button 
      trackerId="CaughtStatInput-nature"
      className={nature === natureBtnId ? "selected" : ""} 
      onClick={onclick}>
        {label}
    </Button></td>);      
    */

  const natureBtn:React.ReactNode = (() => {
    if (statLabel === "HP")
      return <></>
    return <RadioGroup
      optionType="button"
      onChange={(e) => {
        console.log(nature, e.target.value);
        //onchange(null, e.target.value === "+/");
      }}
      options={["+","-"]}
    />
  })();
  
  return (
    <tr>
      <td>{statLabel}</td>
      <td>{natureBtn}</td>
      
      <td><RadioGroup
        optionType="button"
        onChange={() => {}}
        options={value_opts}
      /></td>
    </tr>
  )
};

export const Gen3ShinyStarter = ({ game = "emerald" }: Props) => {
  const initialValues = getInitialValues();
  
  const [results, setResults] = React.useState<Result[]>([
    {adv: 1510, diffWithTarget:10, stats: '5/6/1/5/4/6', nature:"Adamant", gender:"Male"},
    {adv: 1484, diffWithTarget:-16, stats: '1/6/1/3/4/6', nature:"Quirky", gender:"Female"},
  ]);
  
  const onSubmit = React.useCallback<RngToolSubmit<FormState>>(
    async (values) => {
      const res = await generateResults(values);
      setResults(res);
    },
    [game],
  );
  
  const columns = React.useMemo(() => getColumns(), []);
  
  const getFields = (values: FormState) => {
    const fields: Field[] = [
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
      },
      {
        label: "Target advance for shiny",
        input: (
          <>{values.targetAdv}</>
        ),
      },
      {
        label: "Timer",
        direction:"column",
        input: (
          <MultiTimer minutesBeforeTarget={0} milliseconds={[5000,10000]} startButtonTrackerId={"shinyStarter-startTimer"} stopButtonTrackerId={"shinyStarter-stopTimer"}/>
        ),
      },
    ];
    
    const onchange = () => {
      return (selected:number | null, nature: NatureStatState) => {
        console.log(selected, nature);
      };
    };
    fields.push(
    {
      label: "Caught Pokémon",
      direction:"column",
      input: (
        <table>
          <tbody>
            <CaughtStatInput {...values.caughtStats.hp} onchange={onchange()} />
            <CaughtStatInput {...values.caughtStats.atk} onchange={onchange()} />
            <CaughtStatInput {...values.caughtStats.def} onchange={onchange()} />
            <CaughtStatInput {...values.caughtStats.spa} onchange={onchange()} />
            <CaughtStatInput {...values.caughtStats.spd} onchange={onchange()} />
            <CaughtStatInput {...values.caughtStats.spe} onchange={onchange()} />
            <td>Nature:</td><td>Adamant</td>
          </tbody>
        </table>
      ),
    });

  return fields;
  };

  return (
    <div>
      <RngToolForm<FormState, Result>
        getFields={getFields}
        columns={columns}
        results={results}
        initialValues={initialValues}
        submitButtonLabel="Find advances matching caught Pokémon"
        onSubmit={onSubmit}
        rowKey="adv"
        submitTrackerId="mirage_island"
        />
    </div>
  );
};
