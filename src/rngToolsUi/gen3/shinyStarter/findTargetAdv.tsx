

import { Field, RngToolForm, ResultColumn, RngToolSubmit } from "~/components";
import { FormikRadio, RadioGroup } from "../../../components/radio";
import { FormikInput, Input } from "../../../components/input";
import * as tst from "ts-toolbelt";

import { Button } from "../../../components/button";
import {
  StatMinMaxValue,
  CaughtMon,
  NatureStatState,
  calculateNature,
} from "./caughtMon";
import {
  Gender,
  Nature,
  Species,
  Ivs,
  rngTools,
} from "~/rngTools";
import React from "react";
import { MultiTimer } from "../../../components/multiTimer";
import {Stat} from "../../../types/stat";
import { getStatMoreLessFromNature } from "~/types/nature";
import { GenericForm } from "~/types/form";

import { GuaranteeFormNameType } from "~/types/form";
import { useFormikContext } from "formik";


export type StarterSpecies = "Mudkip" | "Torchic" | "Treecko";

type FindTargetAdvProps = {
  pokemonSpecies: StarterSpecies;
  setPokemonSpecies: (v:StarterSpecies) => void;
  tid: string;
  setTid: (v:string) => void;
  sid: string;
  setSid: (v:string) => void;

  onTargetAdvCalculated: (adv:number) => void;
}

type Result = {};

export const FindTargetAdv = ({
  pokemonSpecies,
  setPokemonSpecies,
  tid,
  setTid,
  sid,
  setSid,
  onTargetAdvCalculated,
} : FindTargetAdvProps) => {  
  return (
    <RngToolForm<{}, Result>
      fields={[
        {
          label: "Starter",
          input: (
            <RadioGroup
              optionType="button"
              onChange={e => setPokemonSpecies(e.target.value)}
              options={["Mudkip", "Torchic", "Treecko"]}
              value={pokemonSpecies}
            />
          ),
        },
        {
          label: "TID",
          input: <Input onChange={e => setTid(e.target.value)} value={tid} />
        },
        {
          label: "SID",
          input: <Input onChange={e => setSid(e.target.value)} value={sid} />          
        },
      ]}
      initialValues={{}}
      submitButtonLabel="Find target advance for shiny Pokémon"
      onSubmit={(values) => {
        onTargetAdvCalculated(+sid);
      }}
      submitTrackerId="shinyStarter_findTarget"
    />
  );
};
