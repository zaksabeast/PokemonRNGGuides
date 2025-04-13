import { RadioGroup } from "../../../components/radio";
import { Button } from "../../../components/button";
import { AutoComplete } from "antd";
import React from "react";
import {FormikSelect} from "~/components";

import {Stat} from "../../../types/stat";

export type NatureStatState = "more" | "less" | "nochange";
import { Nature } from "~/rngTools";
import { getNatureFromStatMoreLess } from "~/types/nature";

export type CaughtStatProps = {
  statLabel: Stat;
  min: number;
  max: number;
  value: number | null;
  nature: NatureStatState;
  onValueChanged?: (stat: Stat, value: number) => void;
  onNatureChanged?: (stat: Stat, nature: NatureStatState) => void;
};

export const CaughtStatInput = ({
  statLabel,
  min,
  max,
  value,
  nature,
  onNatureChanged,
  onValueChanged,
}: CaughtStatProps) => {
  onNatureChanged = onNatureChanged || (() => {});
  onValueChanged = onValueChanged || (() => {});

  let value_opts: { label: string; value: number }[] = [];
  for (let val = min; val <= max; val++)
    value_opts.push({ label: "" + val, value: val });

  const natureBtn: React.ReactNode = (() => {
    if (statLabel === "hp") return <></>;
    return (
      <RadioGroup
        optionType="button"
        value={nature}
        onChange={(e) => {
          onNatureChanged(statLabel, e.target.value);
        }}
        options={[
          { label: "+", value: "more" },
          { label: "=", value: "nochange" },
          { label: "-", value: "less" },
        ]}
      />
    );
  })();

  return (
    <tr>
      <td style={{ paddingRight: "20px" }}>{statLabel}</td>
      <td style={{ paddingRight: "30px" }}>{natureBtn}</td>

      <td>
        <RadioGroup
          optionType="button"
          value={value}
          onChange={(e) => {
            onValueChanged(statLabel, e.target.value);
          }}
          options={value_opts}
        />
      </td>
    </tr>
  );
};

export type StatMinMaxValue = {
  min: number;
  max: number;
  value: number | null;
};

export type CaughtStatsProps = {
  natureStatMore: Stat | null;
  natureStatLess: Stat | null;
  hp: StatMinMaxValue;
  atk: StatMinMaxValue;
  def: StatMinMaxValue;
  spa: StatMinMaxValue;
  spd: StatMinMaxValue;
  spe: StatMinMaxValue;
  natureInput:string;
  natureSearchValue:string;
  onValueChanged: (stat: Stat, val: number) => void;
  onNatureBtnChanged: (stat: Stat, nature: NatureStatState) => void;
  onNatureInputChanged: (inp:string) => void;
  clear: () => void;
};

export const calculateNature = (natureStatMore:Stat | null, natureStatLess:Stat | null, currentNature:Nature | null) : Nature | null => {
  if (natureStatMore === null && natureStatLess === null){
    if (currentNature !== null && ["Hardy", "Docile","Bashful","Quirky","Serious"].includes(currentNature))
      return currentNature;
    return null;
  }

  if (natureStatMore === null) return null;

  if (natureStatLess === null) return null;

  return getNatureFromStatMoreLess(natureStatMore, natureStatLess);
};

export const CaughtStatInputs = ({
  hp,
  atk,
  def,
  spa,
  spd,
  spe,
  natureStatMore,
  natureStatLess,
  natureInput,
  onNatureInputChanged,
  onNatureBtnChanged,
  onValueChanged,
  clear,
}: CaughtStatsProps) => {
  const getNatureState = (stat: Stat) => {
    if (stat === natureStatMore) return "more";
    if (stat === natureStatLess) return "less";
    return "nochange";
  };

  const props = { onValueChanged, onNatureChanged: onNatureBtnChanged };
/*
  const selectedValues = React.useMemo(
    () => allValues.filter((v) => v.selected),
    [allValues],
  );
*/

  return (
    <>
      <table>
        <tbody>
          <CaughtStatInput
            {...props}
            {...hp}
            nature={getNatureState("hp")}
            statLabel="hp"
          />
          <CaughtStatInput
            {...props}
            {...atk}
            nature={getNatureState("atk")}
            statLabel="atk"
          />
          <CaughtStatInput
            {...props}
            {...def}
            nature={getNatureState("def")}
            statLabel="def"
          />
          <CaughtStatInput
            {...props}
            {...spa}
            nature={getNatureState("spa")}
            statLabel="spa"
          />
          <CaughtStatInput
            {...props}
            {...spd}
            nature={getNatureState("spd")}
            statLabel="spd"
          />
          <CaughtStatInput
            {...props}
            {...spe}
            nature={getNatureState("spe")}
            statLabel="spe"
          />
          <tr>
            <td></td>
            <td colSpan={3}>Nature: 
              
              
            <AutoComplete style={{width:'100px'}} 
             backfill={true} 
             value={natureInput}
             onChange={onNatureInputChanged} 
             options={natures.map(nature => ({label:nature, value:nature}))}
            ></AutoComplete></td>
          </tr>
        </tbody>
      </table>
      <Button trackerId="CaughtStatInputs_clear" onClick={clear}>
        Clear
      </Button>
    </>
  );
};
