import { FormCard, FormSection, SelectField } from "~/components/form";
import { isGameRoute, useSwarmState } from "./state";
import { gameRoutes, gameMons, SwarmRoute } from "./constants";
import { Gen4GameVersion, Gen4GameVersions } from "~/types/games";
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
  const [targetRoutes, setTargetRoutes] = useSwarmState();
  const game = state.config.game;

  const setTargetRoute = (route: SwarmRoute) => {
    if (isGameRoute(game, route)) {
      setTargetRoutes((prev) => ({ ...prev, [game]: route }));
    }
  };

  return (
    <FormCard>
      <FormSection>
        <SelectField<Gen4GameVersion>
          label={t["Game"]}
          value={game}
          options={toOptions(Gen4GameVersions, (game) => t[game])}
          onChange={(game) => setState({ config: { game } })}
        />
        <SelectField<SwarmRoute>
          label={t["Target Pokémon"]}
          value={targetRoutes[game]}
          options={toOptions(gameRoutes[game], (route) =>
            formatRouteLabel(t, route, game),
          )}
          onChange={setTargetRoute}
        />
      </FormSection>
    </FormCard>
  );
};
