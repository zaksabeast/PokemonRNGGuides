import React from "react";

import { useField } from "~/hooks/form";
import { GenericForm, GuaranteeFormNameType } from "~/types";

import { FormFieldTable } from "./formFieldTable";
import { NumberInput } from "./numberInput";
import { Switch } from "./switch";
import clamp from "lodash-es/clamp";
import {
  berryNames,
  defaultPokeblock,
  Pokeblock,
  pokeblockCreationInfos,
  pokeblockFlavorNames,
} from "~/types/pokeblock";
import { match } from "ts-pattern";
import { Flex } from "./flex";
import { TooltipWithIcon } from "./tooltipWithIcon";

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

const getPokeblockCreationInfoText = (pokeblock: Pokeblock) => {
  const key = pokeblock.join("");
  const info = pokeblockCreationInfos.get(key);
  if (info == null) {
    return "";
  }
  if ("Npc" in info) {
    const { npcs, player_berry_idx } = info["Npc"];
    const withWho = match(npcs)
      .with("Npc0", () => "solo")
      .with("Npc1", () => "with 1 NPC")
      .with("Npc2", () => "with 2 NPCs")
      .with("Npc3", () => "with 3 NPCs")
      .with("BlendMaster", () => "with Blend Master")
      .exhaustive();
    return `Created by playing Berry Blender ${withWho}, and blending a ${berryNames[player_berry_idx]} berry.`;
  }
  if ("Grey" in info) {
    return "1/10 chance to be created by playing Berry Blender with another player, when both players provide a Cheri Berry.";
  }
  if ("Multiplayer" in info) {
    const { berries } = info["Multiplayer"];
    const berryToBlendNames = berries
      .filter((berry) => berry < berryNames.length)
      .map((berry) => berryNames[berry]);

    return `Created by playing Berry Blender with ${berryToBlendNames.length} other players, and blending the berries: ${berryToBlendNames.join(", ")}.`;
  }
  return "";
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

  const text = match(flavorsWithIdx.length)
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

  const popupText = getPokeblockCreationInfoText(pokeblock);
  if (popupText === "") {
    return text;
  }
  return <TooltipWithIcon title={popupText}>{text}</TooltipWithIcon>;
};
