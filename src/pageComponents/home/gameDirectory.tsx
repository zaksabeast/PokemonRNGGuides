import styled from "@emotion/styled";
import { Icon, ListRow, ListSurface, Typography } from "~/components";
import { consoleIcons } from "~/components/consoleIcons";
import { trackCardClick } from "~/analytics";
import { platforms } from "./data";
import { CHOOSE_YOUR_GAME_ID } from "./hero";

const GameSection = styled.section(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: 20,
  scrollMarginTop: 16,
  [theme.containerQueries.mobile]: {
    gap: 14,
  },
}));

const PlatformGrid = styled.div(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
  alignItems: "start",
  gap: 16,
  [theme.containerQueries.medium]: {
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  },
  [theme.containerQueries.mobile]: {
    gridTemplateColumns: "minmax(0, 1fr)",
    gap: 14,
  },
}));

const PlatformHeader = styled(Typography.Title)(({ theme }) => ({
  "&&": {
    display: "flex",
    alignItems: "center",
    gap: 10,
    margin: 0,
    padding: "12px var(--list-inset) 8px",
    color: theme.token.colorPrimary,
    fontSize: 14,
    fontWeight: 500,
    lineHeight: "20px",
    letterSpacing: 0.1,
    [theme.containerQueries.mobile]: {
      paddingBottom: 4,
    },
  },
}));

const GameName = styled(Typography.Text)({
  "&&": {
    lineHeight: "24px",
  },
});

export const GameDirectory = () => {
  return (
    <GameSection id={CHOOSE_YOUR_GAME_ID}>
      <Typography.SectionHeading level={2}>
        Choose your game
      </Typography.SectionHeading>

      <PlatformGrid>
        {platforms.map((platform) => (
          <ListSurface key={platform.console}>
            <PlatformHeader level={3}>
              <Icon name={consoleIcons[platform.console]} size={20} />
              {platform.label}
            </PlatformHeader>
            {platform.games.map((game) => (
              <ListRow
                key={game.name}
                href={game.slug}
                onClick={() => trackCardClick({ id: `home-game-${game.name}` })}
              >
                <GameName flex={1} fontSize={16}>
                  {game.name}
                </GameName>
                <Icon name="ChevronRight" size={20} color="TextTertiary" />
              </ListRow>
            ))}
          </ListSurface>
        ))}
      </PlatformGrid>
    </GameSection>
  );
};
