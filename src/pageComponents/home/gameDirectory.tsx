import styled from "@emotion/styled";
import { Flex, Icon, Link, Typography } from "~/components";
import { consoleIcons } from "~/components/consoleIcons";
import { track } from "~/analytics";
import { platforms } from "./data";
import { CHOOSE_YOUR_GAME_ID } from "./hero";
import {
  SectionHeading,
  homeQueries,
  interactiveStyles,
  stateLayer,
} from "./styles";

const GameSection = styled.section({
  display: "flex",
  flexDirection: "column",
  gap: 20,
  scrollMarginTop: 16,
  [homeQueries.mobile]: {
    gap: 14,
  },
});

const PlatformGrid = styled.div({
  display: "grid",
  gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
  alignItems: "start",
  gap: 16,
  [homeQueries.medium]: {
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  },
  [homeQueries.mobile]: {
    gridTemplateColumns: "minmax(0, 1fr)",
    gap: 14,
  },
});

const PlatformCard = styled(Flex)(({ theme }) => ({
  "&&": {
    flexDirection: "column",
    padding: "8px 0",
    borderRadius: 20,
    backgroundColor: theme.token.colorBgLayout,
    [homeQueries.mobile]: {
      padding: "4px 0",
    },
  },
}));

const PlatformHeader = styled(Typography.Title)(({ theme }) => ({
  "&&": {
    display: "flex",
    alignItems: "center",
    gap: 10,
    margin: 0,
    padding: "12px 20px 8px",
    color: theme.token.colorPrimary,
    fontSize: 14,
    fontWeight: 500,
    lineHeight: "20px",
    letterSpacing: 0.1,
    [homeQueries.mobile]: {
      padding: "12px 16px 4px",
    },
  },
}));

const GameRow = styled(Link)(({ theme }) => ({
  ...interactiveStyles(theme),
  display: "flex",
  alignItems: "center",
  gap: 14,
  minHeight: 48,
  padding: "6px 12px 6px 20px",
  color: theme.token.colorText,
  fontWeight: 400,
  ":hover": {
    color: theme.token.colorText,
    backgroundColor: stateLayer(0.08),
  },
  ":active": {
    backgroundColor: stateLayer(0.12),
  },
  [homeQueries.mobile]: {
    padding: "6px 8px 6px 16px",
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
      <SectionHeading level={2}>Choose your game</SectionHeading>

      <PlatformGrid>
        {platforms.map((platform) => (
          <PlatformCard key={platform.console}>
            <PlatformHeader level={3}>
              <Icon name={consoleIcons[platform.console]} size={20} />
              {platform.label}
            </PlatformHeader>
            {platform.games.map((game) => (
              <GameRow
                key={game.name}
                href={game.slug}
                onClick={() =>
                  track("Card Clicked", { id: `home-game-${game.name}` })
                }
              >
                <GameName flex={1} fontSize={16}>
                  {game.name}
                </GameName>
                <Icon name="ChevronRight" size={20} color="TextTertiary" />
              </GameRow>
            ))}
          </PlatformCard>
        ))}
      </PlatformGrid>
    </GameSection>
  );
};
