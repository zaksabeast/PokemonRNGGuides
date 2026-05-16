import { AtomSelect, Field, FormFieldTable } from "~/components";
import { swarmAtom, useSwarmState } from "./state";
import { gameRoutes, gameMons } from "./constants";
import { Gen4GameVersion, Gen4GameVersions } from "../gen4types";
import type { Species, SwarmRoute } from "~/rngTools";
import { formatSpeciesLabel } from "~/types";
import { useActiveRouteTranslations } from "~/hooks/useActiveRoute";
import { type Translations } from "~/translations";

const formatRouteLabel = (
  t: Translations,
  route: SwarmRoute,
  game: Gen4GameVersion,
) => {
  const mons: Partial<Record<SwarmRoute, Species>> = gameMons[game];
  const species = mons[route];
  const formatted = species == null ? "Unknown" : formatSpeciesLabel(species);
  return `${t[route]} (${formatted})`;
};

export const SelectSwarm4Target = () => {
  const t = useActiveRouteTranslations();
  const [swarmState] = useSwarmState();

  const fields: Field[] = [
    {
      label: "Game",
      input: (
        <AtomSelect
          atom={swarmAtom}
          getValue={(atom) => atom.game}
          nextState={(state, game) => ({ ...state, game })}
          options={Gen4GameVersions}
        />
      ),
    },
    {
      label: "Target Pokémon",
      input: (
        <AtomSelect
          atom={swarmAtom}
          getValue={(atom) => atom.targetRoute}
          nextState={(state, targetRoute) => ({ ...state, targetRoute })}
          options={gameRoutes[swarmState.game]}
          format={(route) => formatRouteLabel(t, route, swarmState.game)}
        />
      ),
    },
  ];

  return <FormFieldTable fields={fields} />;
};
