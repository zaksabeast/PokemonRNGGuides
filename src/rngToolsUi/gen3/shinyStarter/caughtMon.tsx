import { RadioGroup } from "../../../components/radio";
import { Button } from "../../../components/button";
import { AutoComplete } from "antd";
import React from "react";
import {Select} from "~/components";
import { FormFieldTable } from "../../../components/formFieldTable";

import {Stat} from "../../../types/stat";
import {natures} from "../../../types/nature";

export type NatureStatState = "more" | "less" | "nochange";
import { Nature } from "~/rngTools";
import { getNatureFromStatMoreLess } from "~/types/nature";

export type CaughtMonStatProps = {
  statLabel: Stat;
  min: number;
  max: number;
  value: number | null;
  nature: NatureStatState;
  onValueChanged?: (stat: Stat, value: number) => void;
  onNatureChanged?: (stat: Stat, nature: NatureStatState) => void;
};

const statToName = (stat:Stat) => {
  if (stat === "hp") return "HP";
  if (stat === "atk") return "ATK";
  if (stat === "def") return "DEF";
  if (stat === "spa") return "SPA";
  if (stat === "spd") return "SPD";
  if (stat === "spe") return "SPE";
  throw new Error(`invalid stat (${stat})`);
};

export const CaughtMonStatInput = ({
  statLabel,
  min,
  max,
  value,
  nature,
  onNatureChanged,
  onValueChanged,
}: CaughtMonStatProps) => {
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
      <td style={{ paddingRight: "20px" }}>{statToName(statLabel)}</td>
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
  canBeMaleOrFemale: boolean;
  gender:Gender | null;
  nature:string;
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

const sortedNatures = natures.slice(0).sort();

export const CaughtMon = ({
  hp,
  atk,
  def,
  spa,
  spd,
  spe,
  canBeMaleOrFemale,
  gender,
  natureStatMore,
  natureStatLess,
  nature,
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

  return (
    <>
      <table>
        <tbody>
          <CaughtMonStatInput
            {...props}
            {...hp}
            nature={getNatureState("hp")}
            statLabel="hp"
          />
          <CaughtMonStatInput
            {...props}
            {...atk}
            nature={getNatureState("atk")}
            statLabel="atk"
          />
          <CaughtMonStatInput
            {...props}
            {...def}
            nature={getNatureState("def")}
            statLabel="def"
          />
          <CaughtMonStatInput
            {...props}
            {...spa}
            nature={getNatureState("spa")}
            statLabel="spa"
          />
          <CaughtMonStatInput
            {...props}
            {...spd}
            nature={getNatureState("spd")}
            statLabel="spd"
          />
          <CaughtMonStatInput
            {...props}
            {...spe}
            nature={getNatureState("spe")}
            statLabel="spe"
          />
        </tbody>
      </table>

      const fields:Field[] = [
        {
          label: "Nature",
          input: (<Select style={{minWidth:'120px'}}
            value={nature}
            onChange={onNatureInputChanged}
            options={sortedNatures.map(nature => ({label:nature, value:nature}))}
          />)
        }
      ];

      if (canBeMaleOrFemale){
        fields.push({
          label: "Gender",
          input: (<RadioGroup
            optionType="button"
            onChange={e => onGenderChanged(e.target.value)}
            value={gender}
            options={[
              {label:"Male", value:"Male" as Gender}
              {label:"Female", value:"Female" as Gender}
            ]}
          />)
        });
      }

      <FormFieldTable fields={fields} />

      <Button trackerId="CaughtStatInputs_clear" onClick={clear}>
        Clear
      </Button>
    </>
  );
};
