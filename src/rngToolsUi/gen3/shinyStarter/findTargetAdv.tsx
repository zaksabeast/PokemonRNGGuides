

import { Field, RngToolForm, ResultColumn, RngToolSubmit } from "~/components";
import { FormikRadio, RadioGroup } from "../../../components/radio";
import { FormikInput } from "../../../components/input";

import { Button } from "../../../components/button";
import {
  CaughtStatInput,
  StatMinMaxValue,
  CaughtMon,
  NatureStatState,
  CaughtStatProps,
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

export type FindTargetAdvProps {
  pokemonSpecies: StarterSpecies;
  tid: string;
  sid: string;
}

export const FindTargetAdv = function({}){

  return (
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
          },
        ]}
        initialValues={initialValues}
        submitButtonLabel="Find target advance for shiny Pokémon"
        onSubmit={onSubmitFindTarget}
        submitTrackerId="shinyStarter_findTarget"
      />
  );
};
