import { Select, AtomSelect, Field, FormFieldTable } from "~/components";
import { swarmAtom } from "./state";
import { gameRoutes, gameMons, SwarmRoute } from "./constants";
import { Gen4GameVersion, Gen4GameVersions } from "../gen4types";
import type { Species } from "~/rngTools";
import { formatSpeciesLabel } from "~/types";
import { useActiveRouteTranslations } from "~/hooks/useActiveRoute";
import { type Translations } from "~/translations";
import { useAtom } from "jotai";
import { gen4StateAtom } from "../shared/state";
import { toOptions } from "~/utils/options";

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
  const [state, setState] = useAtom(gen4StateAtom);

  const fields: Field[] = [
    {
      label: "Game",
      input: (
        <Select<Gen4GameVersion>
          options={toOptions(Gen4GameVersions, (game) => t[game])}
          value={state.config.game}
          onChange={(game) => setState({ config: { game } })}
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
          options={gameRoutes[state.config.game]}
          format={(route) => formatRouteLabel(t, route, state.config.game)}
        />
      ),
    },
  ];

  return <FormFieldTable fields={fields} />;
};
