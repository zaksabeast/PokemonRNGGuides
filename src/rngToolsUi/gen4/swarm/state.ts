import { atom, useAtom } from "jotai";
import { Gen4GameVersion } from "~/types/games";
import { gameRoutes, SwarmRoute } from "./constants";

type GameRoute<Game extends Gen4GameVersion> =
  (typeof gameRoutes)[Game][number];

// Each game keeps its own target so the selected route always belongs to the game
type TargetRoutes = {
  [Game in Gen4GameVersion]: GameRoute<Game>;
};

export const swarmAtom = atom<TargetRoutes>({
  Diamond: "Route201",
  Pearl: "Route201",
  Platinum: "Route201",
  HeartGold: "Route1",
  SoulSilver: "Route1",
});

export const useSwarmState = () => useAtom(swarmAtom);

export const isGameRoute = <Game extends Gen4GameVersion>(
  game: Game,
  route: SwarmRoute,
): route is GameRoute<Game> => {
  const routes: readonly SwarmRoute[] = gameRoutes[game];
  return routes.includes(route);
};
