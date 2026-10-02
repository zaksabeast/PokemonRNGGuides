import React from "react";
import styled from "@emotion/styled";
import clamp from "lodash-es/clamp";
import { useField } from "~/hooks/form";
import { GenericForm } from "~/types/form";
import { Paths } from "~/types";
import {
  defaultPokeblock,
  pokeblockFlavorNames,
  type Pokeblock,
} from "~/types/pokeblock";
import { NumberField } from "~/components/form/base/numberField";
import { SwitchField } from "~/components/form/base/switchField";

const MAX_FLAVOR = 255;

const Flavors = styled.div(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  gap: 12,
  [theme.mediaQueries.up("tablet")]: {
    gridTemplateColumns: "repeat(5, minmax(0, 1fr))",
  },
}));

const ErrorText = styled.div(({ theme }) => ({
  ...theme.typography.bodySmall,
  color: theme.token.colorError,
}));

type Props<FormState extends GenericForm> = {
  name: Paths<FormState, Pokeblock | null>;
  label: React.ReactNode;
};

export const PokeblockField = <FormState extends GenericForm>({
  name,
  label,
}: Props<FormState>) => {
  const [, { error }, { setValue }] = useField<Pokeblock | null>(name);
  const [pokeblock, setPokeblock] = React.useState(defaultPokeblock());
  const [isUsingPokeblock, setIsUsingPokeblock] = React.useState(false);

  const updateFlavor = (flavorIndex: number, updatedValue: number | null) => {
    const flavor = clamp(updatedValue ?? 0, 0, MAX_FLAVOR);
    const [spicy, dry, sweet, bitter, sour] = pokeblock.map(
      (previous, index) => (index === flavorIndex ? flavor : previous),
    );
    setPokeblock([spicy, dry, sweet, bitter, sour]);
  };

  React.useEffect(() => {
    setValue(isUsingPokeblock ? pokeblock : null);
  }, [setValue, pokeblock, isUsingPokeblock]);

  return (
    <SwitchField
      name={name}
      label={label}
      value={isUsingPokeblock}
      onChange={setIsUsingPokeblock}
    >
      <Flavors>
        {pokeblockFlavorNames.map((flavorName, flavorIndex) => (
          <NumberField
            key={flavorName}
            label={flavorName}
            numType="decimal"
            value={pokeblock[flavorIndex]}
            onChange={(updatedValue) => updateFlavor(flavorIndex, updatedValue)}
          />
        ))}
      </Flavors>
      {error != null && <ErrorText role="alert">{error}</ErrorText>}
    </SwitchField>
  );
};
