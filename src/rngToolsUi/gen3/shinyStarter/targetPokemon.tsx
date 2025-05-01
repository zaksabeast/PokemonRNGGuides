import React from "react";
import {
  Flex,
  Typography,
  Field,
  FormFieldTable,
  RadioGroup,
} from "~/components";
import { getStatRangeForStarter, getTargetPokemonDesc } from "./calc";
import type { Game, TargetStarter } from "./index";
import { toOptions } from "~/utils/options";

type Props = {
  game: Game;
  targetAdvance: number;
  targetStarter: TargetStarter;
  setTargetStarter: (target: TargetStarter) => void;
};

export const TargetPokemon = ({
  game,
  targetAdvance,
  targetStarter,
  setTargetStarter,
}: Props) => {
  const [targetPokemonDesc, setTargetPokemonDesc] = React.useState<string>("");

  const fields: Field[] = React.useMemo(() => {
    return [
      {
        label: "Starter",
        input: (
          <RadioGroup
            optionType="button"
            onChange={async ({ target }) => {
              setTargetStarter({
                species: target.value,
                minMaxStats: await getStatRangeForStarter(target.value),
              });

              const desc = await getTargetPokemonDesc(
                game,
                targetAdvance,
                targetStarter.species,
              );
              setTargetPokemonDesc(desc);
            }}
            options={toOptions(["Mudkip", "Torchic", "Treecko"])}
          />
        ),
      },
      { label: "Info", input: targetPokemonDesc },
    ];
  }, [game, targetAdvance, targetStarter, targetPokemonDesc, setTargetStarter]);

  return (
    <Flex vertical gap={8} flex={1}>
      <Typography.Title level={5} p={0} m={0}>
        Target Pokemon
      </Typography.Title>
      <FormFieldTable fields={fields} />
    </Flex>
  );
};
