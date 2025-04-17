import React from "react";
import { Flex, MultiTimer } from "~/components";
import { FindTargetAdvance } from "./findTarget";
import { CaughtMon, CaughtMonResult } from "./caughtMon";

export type Game = "emerald" | "rs";
export type Starter = "Mudkip" | "Torchic" | "Treecko";

const calculateMillis = (
  targetAdvance: number,
  hitAdvance: number,
): number[] => {
  //NO_PROD hitAdvance
  const milliseconds = Math.round((targetAdvance * 1000) / 59.7275);          
  return [5000, milliseconds];
};

type Props = {
  game:Game;
};

export const ShinyStarter = ({game}:Props) => {
  const [pokemonSpecies, setPokemonSpecies] = React.useState<Starter>("Mudkip");
  const [targetAdvance, setTargetAdvance] = React.useState(0);
  const [hitAdvance, setHitAdvance] = React.useState(0);

  const onClickCaughtMon = React.useCallback((caughtMon: CaughtMonResult) => {
    setHitAdvance(caughtMon.advance);
  }, []);

  const milliseconds = React.useMemo(() => {
    return calculateMillis(targetAdvance, hitAdvance);
  }, [targetAdvance, hitAdvance]);

  const minutesBeforeTarget = Math.floor(milliseconds[1] / 60000);

  return (
    <Flex gap={16} vertical>
      <FindTargetAdvance {...{game,setTargetAdvance,pokemonSpecies,setPokemonSpecies}} />
      <MultiTimer
        {...{minutesBeforeTarget, milliseconds}}
        startButtonTrackerId="start_gen3_shiny_starter_timer"
        stopButtonTrackerId="stop_gen3_shiny_starter_timer"
      />
      <CaughtMon
        {...{pokemonSpecies, targetAdvance, onClickCaughtMon}}
      />
    </Flex>
  );
};
