import { FormCard, FormSection, SelectField } from "~/components/form";
import { isGameRoute, useSwarmState } from "./state";
import { gameRoutes, gameMons, SwarmRoute } from "./constants";
import { Gen4GameVersion } from "~/types/games";
import type { Species } from "~/rngTools";
import { formatSpeciesLabel } from "~/types";
import { useActiveRouteTranslations } from "~/hooks/useActiveRoute";
import { type Translations } from "~/translations";
import { useAtomValue, useSetAtom } from "jotai";
import {
  gen4GuideGamesAtom,
  gen4SetupAtom,
  setGen4GameAtom,
} from "../shared/state/setup";
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
  const { game } = useAtomValue(gen4SetupAtom);
  const guideGames = useAtomValue(gen4GuideGamesAtom);
  const setGame = useSetAtom(setGen4GameAtom);
  const [targetRoutes, setTargetRoutes] = useSwarmState();

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
          options={toOptions(guideGames, (game) => t[game])}
          onChange={setGame}
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
