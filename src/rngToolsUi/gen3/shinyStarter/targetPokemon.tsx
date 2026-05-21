import React from "react";
import {
  Flex,
  Typography,
  Field,
  FormFieldTable,
  RadioGroup,
} from "~/components";
import { getTargetPokemonDesc } from "./calc";
import type { Game, TargetStarter } from "./index";
import { toOptions } from "~/utils/options";
import { getStatRange } from "~/types/statRange";

type Props = {
  game: Game;
  targetAdvance: number;
  setTargetStarter: (target: TargetStarter) => void;
};

export const TargetPokemon = ({
  game,
  targetAdvance,
  setTargetStarter,
}: Props) => {
  const [targetPokemonDesc, setTargetPokemonDesc] = React.useState<string>("");

  const fields: Field[] = [
    {
      label: "Starter",
      input: (
        <RadioGroup
          name="targetStarter"
          optionType="button"
          onChange={async ({ target }) => {
            // RadioGroup is not able to infer the value type, so we have to cast it
            const species = target.value as TargetStarter["species"];
            setTargetStarter({
              species,
              minMaxStats: await getStatRange({ species }),
            });

            const desc = await getTargetPokemonDesc(
              game,
              targetAdvance,
              species,
            );
            setTargetPokemonDesc(desc);
          }}
          options={toOptions(["Mudkip", "Torchic", "Treecko"])}
        />
      ),
    },
    { label: "Info", input: targetPokemonDesc },
  ];

  return (
    <Flex id="target-pokemon-container" vertical gap={8} flex={1}>
      <Typography.Title level={5} p={0} m={0}>
        Target Pokemon
      </Typography.Title>
      <FormFieldTable fields={fields} />
    </Flex>
  );
};
