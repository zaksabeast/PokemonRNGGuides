import styled from "@emotion/styled";
import { type Theme } from "@emotion/react";
import { Button, Flex, Icon, Link, Typography } from "~/components";
import { trackCardClick } from "~/analytics";
import { formatTimerReadout } from "~/rngToolsUi/timer/format";

export const CHOOSE_YOUR_GAME_ID = "choose-your-game";

// Gaps and directions change by container size, so they're set here instead of as Flex props
const HeroLayout = styled(Flex)(({ theme }) => ({
  "&&": {
    alignItems: "center",
    gap: 48,
    [theme.containerQueries.medium]: {
      flexDirection: "column",
      alignItems: "stretch",
      gap: 32,
    },
    [theme.containerQueries.mobile]: {
      flexDirection: "column",
      alignItems: "stretch",
      gap: 16,
    },
  },
}));

const HeroCopy = styled(Flex)(({ theme }) => ({
  "&&": {
    flex: 1,
    minWidth: 0,
    flexDirection: "column",
    gap: 12,
    [theme.containerQueries.mobile]: {
      // Lets the text, gauge, and buttons be reordered on mobile
      display: "contents",
    },
  },
}));

const HeroText = styled(Flex)(({ theme }) => ({
  "&&": {
    flexDirection: "column",
    gap: 12,
    [theme.containerQueries.mobile]: {
      gap: 6,
      marginBottom: 12,
    },
  },
}));

const Title = styled(Typography.Title)(({ theme }) => ({
  "&&": {
    margin: 0,
    color: theme.token.colorText,
    fontSize: 57,
    fontWeight: 400,
    lineHeight: "64px",
    letterSpacing: -0.25,
    textWrapStyle: "balance",
    [theme.containerQueries.mobile]: {
      fontSize: 36,
      lineHeight: "44px",
      letterSpacing: 0,
    },
  },
}));

const Subtitle = styled(Typography.Paragraph)(({ theme }) => ({
  "&&": {
    margin: 0,
    color: theme.token.colorTextSecondary,
    fontSize: 22,
    lineHeight: "30px",
    [theme.containerQueries.mobile]: {
      fontSize: 16,
      lineHeight: "24px",
    },
  },
}));

const Actions = styled(Flex)(({ theme }) => ({
  "&&": {
    flexWrap: "wrap",
    gap: 12,
    marginTop: 20,
    [theme.containerQueries.mobile]: {
      order: 2,
      flexDirection: "column",
      gap: 16,
      marginTop: 0,
      "& > *": {
        width: "100%",
      },
    },
  },
}));

const heroButtonStyles = (theme: Theme) => ({
  height: 56,
  paddingLeft: 24,
  paddingRight: 28,
  borderRadius: 28,
  fontSize: 16,
  fontWeight: 500,
  lineHeight: "24px",
  letterSpacing: 0.15,
  gap: 8,
  [theme.containerQueries.mobile]: {
    width: "100%",
    height: 48,
    borderRadius: 24,
  },
});

const PrimaryHeroButton = styled(Button)(({ theme }) => ({
  "&&&&.ant-btn-primary": heroButtonStyles(theme),
  [theme.containerQueries.mobile]: {
    "&& .ant-btn-icon": {
      display: "none",
    },
  },
}));

const TrailingIcon = styled.span(({ theme }) => ({
  display: "none",
  [theme.containerQueries.mobile]: {
    display: "flex",
  },
}));

const OutlinedHeroButton = styled(Button)(({ theme }) => ({
  "&&&&.ant-btn-default": {
    ...heroButtonStyles(theme),
    color: theme.token.colorText,
    backgroundColor: "transparent",
    borderColor: theme.token.colorBorder,
    ":hover": {
      backgroundColor: theme.token.colorStateLayerHover,
    },
    ":active": {
      backgroundColor: theme.token.colorStateLayerPressed,
    },
  },
}));

const HeroLink = styled(Link)(({ theme }) => ({
  display: "flex",
  [theme.containerQueries.mobile]: {
    width: "100%",
  },
}));

const GaugeLink = styled(Link)(({ theme }) => ({
  ...theme.interactive,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  alignSelf: "center",
  gap: 16,
  borderRadius: 20,
  color: "inherit",
  fontWeight: 400,
  [theme.containerQueries.wide]: {
    flex: "none",
    width: 440,
  },
  [theme.containerQueries.mobile]: {
    order: 1,
    gap: 12,
  },
}));

const GaugeCaption = styled(Typography.Text)(({ theme }) => ({
  "&&": {
    color: theme.token.colorTextTertiary,
    fontSize: 14,
    lineHeight: "20px",
    letterSpacing: 0.25,
  },
}));

const GaugeSvg = styled.svg(({ theme }) => ({
  display: "block",
  width: 400,
  maxWidth: "100%",
  height: "auto",
  [theme.containerQueries.mobile]: {
    width: 280,
  },
}));

const GaugeTrack = styled.path(({ theme }) => ({
  fill: "none",
  stroke: theme.token.colorFillTertiary,
  strokeWidth: 8,
  strokeLinecap: "round",
}));

const GaugeProgress = styled(GaugeTrack)(({ theme }) => ({
  stroke: theme.token.colorPrimary,
}));

const GaugeReadout = styled.text(({ theme }) => ({
  fill: theme.token.colorText,
  fontFamily: "'Roboto Mono', monospace",
  fontSize: 34,
  fontWeight: 500,
  letterSpacing: -0.5,
}));

// About a 224 degree arc of radius 80 centered at (100, 100)
const GAUGE_ARC_PATH = "M174.07 130.2 A80 80 0 1 0 25.93 130.2";

const PREVIEW_TOTAL_MS = 5000;
const PREVIEW_REMAINING_MS = 3141;
const PREVIEW_PROGRESS = (PREVIEW_REMAINING_MS / PREVIEW_TOTAL_MS) * 100;

const TimerPreview = () => (
  <GaugeSvg viewBox="15 15 170 122" width={400} height={287} aria-hidden>
    <GaugeTrack d={GAUGE_ARC_PATH} />
    <GaugeProgress
      d={GAUGE_ARC_PATH}
      pathLength={100}
      strokeDasharray={`${PREVIEW_PROGRESS} 100`}
    />
    <GaugeReadout x={100} y={88} textAnchor="middle" dominantBaseline="middle">
      {formatTimerReadout(PREVIEW_REMAINING_MS)}
    </GaugeReadout>
  </GaugeSvg>
);

const scrollToGames = () => {
  document
    .getElementById(CHOOSE_YOUR_GAME_ID)
    ?.scrollIntoView({ behavior: "smooth", block: "start" });
};

export const Hero = () => {
  return (
    <HeroLayout>
      <HeroCopy>
        <HeroText>
          <Title level={1}>Become the Very Best</Title>
          <Subtitle>Train Smarter, Shine Brighter — Together.</Subtitle>
        </HeroText>
        <Actions>
          <HeroLink href="/mystic-timer/">
            <PrimaryHeroButton
              trackerId="home_open_mystic_timer"
              type="primary"
              size="large"
              icon={<Icon name="Timer" size={20} />}
            >
              Open Mystic Timer
              <TrailingIcon>
                <Icon name="OpenInNew" size={20} />
              </TrailingIcon>
            </PrimaryHeroButton>
          </HeroLink>
          <OutlinedHeroButton
            trackerId="home_find_your_game"
            type="default"
            size="large"
            icon={<Icon name="ArrowDownward" size={20} />}
            onClick={scrollToGames}
          >
            Find your game
          </OutlinedHeroButton>
        </Actions>
      </HeroCopy>

      <GaugeLink
        href="/mystic-timer/"
        onClick={() => trackCardClick({ id: "home-welcome-card" })}
      >
        <TimerPreview />
        <GaugeCaption>Mystic Timer · Web-based · Frame-accurate</GaugeCaption>
      </GaugeLink>
    </HeroLayout>
  );
};
