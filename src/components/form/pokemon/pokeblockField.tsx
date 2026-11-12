import React from "react";
import styled from "@emotion/styled";
import clamp from "lodash-es/clamp";
import { match, P } from "ts-pattern";
import { useField } from "~/hooks/form";
import { GenericForm } from "~/types/form";
import { Paths } from "~/types";
import {
  berryNames,
  defaultPokeblock,
  pokeblockCreationInfos,
  pokeblockFlavorNames,
  type Pokeblock,
} from "~/types/pokeblock";
import { TooltipWithIcon } from "~/components/tooltipWithIcon";
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

const getPokeblockCreationInfoText = (pokeblock: Pokeblock) => {
  const key = pokeblock.join("");
  const info = pokeblockCreationInfos.get(key);
  if (info == null) {
    return "";
  }

  const exists = P.not(P.nullish);
  const formattedInfo = match(info)
    .with({ Npc: exists }, ({ Npc }) => ({ type: "Npc" as const, ...Npc }))
    .with({ Grey: exists }, ({ Grey }) => ({ type: "Grey" as const, ...Grey }))
    .with({ Multiplayer: exists }, ({ Multiplayer }) => ({
      type: "Multiplayer" as const,
      ...Multiplayer,
    }))
    .exhaustive();

  if (formattedInfo.type === "Npc") {
    const { npcs, player_berry_idx } = formattedInfo;
    const withWho = match(npcs)
      .with("Npc0", () => "solo")
      .with("Npc1", () => "with 1 NPC")
      .with("Npc2", () => "with 2 NPCs")
      .with("Npc3", () => "with 3 NPCs")
      .with("BlendMaster", () => "with Blend Master")
      .exhaustive();
    return `Created by playing Berry Blender ${withWho}, and blending a ${berryNames[player_berry_idx]} berry.`;
  }

  if (formattedInfo.type === "Grey") {
    return "1/10 chance to be created by playing Berry Blender with another player, when both players provide the same berry.";
  }

  if (formattedInfo.type === "Multiplayer") {
    const { berries } = formattedInfo;
    const berryToBlendNames = berries
      .filter((berry) => berry < berryNames.length)
      .map((berry) => berryNames[berry]);

    return `Created by playing Berry Blender with ${berryToBlendNames.length - 1} other players, and blending the berries: ${berryToBlendNames.join(", ")}.`;
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
