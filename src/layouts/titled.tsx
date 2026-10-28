import { MainLayout } from "~/layouts/main";
import { GuideMeta } from "~/guides";
import { Flex, NavBreadcrumbs, PokemonIcon, Typography } from "~/components";
import { platforms } from "~/games";

type Props = {
  guideMeta: GuideMeta;
  children: React.ReactNode;
};

export const TitledLayout = ({ guideMeta, children }: Props) => {
  const game = platforms
    .flatMap((platform) => platform.games)
    .find((game) => game.slug === guideMeta.slug);

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
