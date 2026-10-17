import { getSpeciesOptions } from "~/components/pkmFilter";
import React from "react";
import {
  FormCard,
  FormSection,
  FormSummary,
  RadioField,
} from "~/components/form";
import { getTargetPokemonDesc } from "./calc";
import type { Game, TargetStarter } from "./index";
import { getStatRange } from "~/types/statRange";

const starters = ["Mudkip", "Torchic", "Treecko"] as const;

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
  const [species, setSpecies] =
    React.useState<TargetStarter["species"]>("Mudkip");
  const [targetPokemonDesc, setTargetPokemonDesc] = React.useState<string>("");

  React.useEffect(() => {
    let cancelled = false;

    void Promise.all([
      getStatRange({ species }),
      getTargetPokemonDesc(game, targetAdvance, species),
    ]).then(([minMaxStats, desc]) => {
      if (!cancelled) {
        setTargetStarter({ species, minMaxStats });
        setTargetPokemonDesc(desc);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [game, species, setTargetStarter, targetAdvance]);

  return (
    <FormCard>
      <FormSection title="Target Pokemon">
        <RadioField<TargetStarter["species"]>
          name="targetStarter"
          label="Starter"
          cellSize="word"
          value={species}
          onChange={setSpecies}
          options={getSpeciesOptions([...starters])}
        />
        <FormSummary rows={[{ label: "Info", value: targetPokemonDesc }]} />
      </FormSection>
    </FormCard>
  );
};
