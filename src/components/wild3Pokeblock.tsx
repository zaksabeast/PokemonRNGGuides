import React from "react";

import { useField } from "~/hooks/form";
import { GenericForm, GuaranteeFormNameType } from "~/types";

import { FormFieldTable } from "./formFieldTable";
import { NumberInput } from "./numberInput";
import { Switch } from "./switch";
import clamp from "lodash-es/clamp";
import {
  defaultPokeblock,
  Pokeblock,
  pokeblockFlavorNames,
} from "~/types/pokeblock";
import { match } from "ts-pattern";
import { Flex } from "./flex";

export const FormikWild3Pokeblock = <FormState extends GenericForm>({
  name,
}: {
  name: GuaranteeFormNameType<FormState, Pokeblock | null>;
}) => {
  const [, { error }, { setValue }] = useField<Pokeblock | null>(name);
  const [pokeblock, setPokeblock] = React.useState(defaultPokeblock());

  const [isUsingPokeblock, setIsUsingPokeblock] = React.useState(false);

  const updateFlavor = (flavorIdx: number, updatedValue: number | null) => {
    const newVal = clamp(updatedValue ?? 0, 0, 255);
    const newArr = pokeblock.map((oldVal, i) =>
      i === flavorIdx ? newVal : oldVal,
    ) as Pokeblock;
    setPokeblock(newArr);
  };

  React.useEffect(() => {
    if (isUsingPokeblock) {
      setValue(pokeblock);
    } else {
      setValue(null);
    }
  }, [setValue, pokeblock, isUsingPokeblock]);

  const fields = [
    {
      key: "pokeblock-switch",
      label: <Switch value={isUsingPokeblock} onChange={setIsUsingPokeblock} />,
      input: null,
    },
    ...pokeblockFlavorNames.map((flavorName, flavorIdx) => ({
      label: `${flavorName} flavor value`,
      input: (
        <NumberInput
          numType="decimal"
          value={pokeblock[flavorIdx]}
          onChange={(updatedValue) => updateFlavor(flavorIdx, updatedValue)}
        />
      ),
      show: isUsingPokeblock,
    })),
  ];

  return (
    <Flex vertical>
      <FormFieldTable fields={fields} />
      {error}
    </Flex>
  );
};

export const Wild3PokeblockDescription = ({
  pokeblock,
}: {
  pokeblock: Pokeblock | null;
}) => {
  if (pokeblock == null) {
    return "None";
  }

  const flavorsWithIdx = pokeblock
    .map((flavorValue, flavorIdx) => ({
      value: flavorValue,
      flavorName: pokeblockFlavorNames[flavorIdx],
    }))
    .filter((info) => info.value > 0)
    .sort((info1, info2) => info2.value - info1.value);

  // TODO: Add info about how to generate such pokeblock.
  return match(flavorsWithIdx.length)
    .with(0, () => "")
    .with(1, () => flavorsWithIdx[0].flavorName)
    .otherwise(() => {
      return flavorsWithIdx
        .slice(1)
        .map((flavorNext, i) => {
          const flavorPrev = flavorsWithIdx[i];
          const sign = flavorPrev.value === flavorNext.value ? "=" : ">";
          return `${flavorPrev.flavorName} ${sign} ${flavorNext.flavorName}`;
        })
        .join(", ");
    });
};
