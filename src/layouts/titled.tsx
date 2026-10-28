import { keyBy } from "lodash-es";
import { MainLayout } from "~/layouts/main";
import { GuideMeta } from "~/guides";
import { Flex, NavBreadcrumbs, PokemonIcon, Typography } from "~/components";
import { platforms, type HomeGame } from "~/games";
import { type Route } from "~/routes/defs";

// Reversed so the first game listed for a shared slug wins
const gameBySlug: Partial<Record<Route, HomeGame>> = keyBy(
  platforms.flatMap((platform) => platform.games).toReversed(),
  (game) => game.slug,
);

type Props = {
  guideMeta: GuideMeta;
  children: React.ReactNode;
};

export const TitledLayout = ({ guideMeta, children }: Props) => {
  const game = gameBySlug[guideMeta.slug];

  return (
    <MainLayout>
      <Flex vertical gap={12}>
        <NavBreadcrumbs route={guideMeta.slug} />
        <Flex align="center" gap={12}>
          {game != null && <PokemonIcon species={game.species} size={50} />}
          <Typography.H1>{guideMeta.navDrawerTitle}</Typography.H1>
        </Flex>
      </Flex>
      {children}
    </MainLayout>
  );
};
