

import { Field, RngToolForm, ResultColumn, RngToolSubmit } from "~/components";
import { FormikRadio, RadioGroup } from "../../../components/radio";
import { FormikInput } from "../../../components/input";
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

type FindTargetAdvState = {
  pokemonSpecies: StarterSpecies;
  tid: string;
  sid: string;
};

type FindTargetAdvProps = {
  setTargetAdv:(adv:number) => void;
}

type Result = {};

export const FindTargetAdv = ({
  setTargetAdv
} : FindTargetAdvProps) => {
  const { values, setFieldValue } = useFormikContext<FindTargetAdvState>();
  
  return (
    <RngToolForm<FindTargetAdvState, Result>
      fields={[
        {
          label: "Starter",
          input: (
            <FormikRadio<FindTargetAdvState, "pokemonSpecies">
              name="pokemonSpecies"
              options={["Mudkip", "Torchic", "Treecko"]}
            />
          ),
        },
        {
          label: "TID",
          input: <FormikInput<FindTargetAdvState> name="tid" />,
        },
        {
          label: "SID",
          input: <FormikInput<FindTargetAdvState> name="sid" />,
        },
      ]}
      initialValues={values}
      submitButtonLabel="Find target advance for shiny Pokémon"
      onSubmit={() => {
        setTargetAdv(1000);
      }}
      submitTrackerId="shinyStarter_findTarget"
    />
  );
};
