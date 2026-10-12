import React from "react";
import styled from "@emotion/styled";
import { type Ivs } from "~/rngTools";
import { type NullableIvs } from "~/components/ivInput";
import { useActiveRouteTranslations } from "~/hooks/useActiveRoute";
import { GenericForm } from "~/types/form";
import { Paths } from "~/types";
import { StatGrid } from "./statGrid";

const IV_MAX_LENGTH = 2;

type IvFieldsProps<FormState extends GenericForm> = {
  name: Paths<FormState, Ivs>;
  title: React.ReactNode;
};

export const IvFields = <FormState extends GenericForm>({
  name,
  title,
}: IvFieldsProps<FormState>) => (
  <StatGrid<FormState, Ivs>
    name={name}
    title={title}
    maxLength={IV_MAX_LENGTH}
  />
);

type NullableIvFieldsProps<FormState extends GenericForm> = {
  name: Paths<FormState, NullableIvs>;
  title: React.ReactNode;
};

export const NullableIvFields = <FormState extends GenericForm>({
  name,
  title,
}: NullableIvFieldsProps<FormState>) => {
  const t = useActiveRouteTranslations();

  return (
    <StatGrid<FormState, NullableIvs>
      name={name}
      title={title}
      description={t["Leave a stat blank if you don't know it."]}
      placeholder="?"
      maxLength={IV_MAX_LENGTH}
    />
  );
};

const RangeBlocks = styled.div({
  display: "flex",
  flexDirection: "column",
  gap: 24,
});

type IvRangeFieldsProps<FormState extends GenericForm> = {
  minName: Paths<FormState, Ivs>;
  maxName: Paths<FormState, Ivs>;
};

export const IvRangeFields = <FormState extends GenericForm>({
  minName,
  maxName,
}: IvRangeFieldsProps<FormState>) => {
  const t = useActiveRouteTranslations();

  return (
    <RangeBlocks>
      <IvFields<FormState> name={minName} title={t["Min IVs"]} />
      <IvFields<FormState> name={maxName} title={t["Max IVs"]} />
    </RangeBlocks>
  );
};
