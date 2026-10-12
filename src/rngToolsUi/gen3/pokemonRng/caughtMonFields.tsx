import React from "react";
import styled from "@emotion/styled";
import {
  AbilityFilterField,
  FormNumberField,
  FormRadioField,
  FormSection,
  NatureField,
  OutlinedButton,
  StatRadioFields,
} from "~/components/form";
import { getGenderFilterOptions } from "~/types";
import { Species } from "~/rngTools";
import { MinMaxStats } from "~/types/stat";
import { FormState } from "./calibCaughtMon";

// Buttons sit on the field's line, not its label's
const RareCandyRow = styled.div({
  display: "grid",
  gridTemplateColumns: "minmax(0, 1fr) auto auto",
  gap: 12,
  alignItems: "end",
});

type CaughtMonFieldsProps = {
  species: Species;
  minMaxStats: MinMaxStats;
  rareCandy: number;
  setRareCandyCount: (count: number) => void;
  children?: React.ReactNode;
};

export const CaughtMonFields = ({
  species,
  minMaxStats,
  rareCandy,
  setRareCandyCount,
  children,
}: CaughtMonFieldsProps) => {
  const genderOptions = getGenderFilterOptions(species, false).flatMap(
    (option) =>
      option.value == null
        ? []
        : [{ label: option.label, value: option.value }],
  );

  return (
    <>
      <FormSection title="Caught Pokémon">
        {children}
        <FormRadioField<FormState>
          name="gender"
          label="Gender"
          cellSize="word"
          options={genderOptions}
        />
        <AbilityFilterField<FormState>
          name="ability"
          species={species}
          permitAny={false}
          displayHiddenAbility={false}
          mergeFirstSecondIfSameAbility
        />
        <NatureField<FormState> name="nature" />
      </FormSection>

      <FormSection title="Stats">
        <StatRadioFields<FormState> minMaxStats={minMaxStats} />
        <RareCandyRow>
          <FormNumberField<FormState>
            name="rareCandy"
            label="Rare Candy"
            numType="decimal"
          />
          <OutlinedButton
            trackerId="calib_set_rare_candy_to_1"
            onClick={() => {
              setRareCandyCount(1);
            }}
          >
            =1
          </OutlinedButton>
          <OutlinedButton
            trackerId="calib_add_rare_candy"
            onClick={() => {
              setRareCandyCount(Math.min(rareCandy + 1, 99));
            }}
          >
            +1
          </OutlinedButton>
        </RareCandyRow>
      </FormSection>
    </>
  );
};
