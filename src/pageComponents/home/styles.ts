import styled from "@emotion/styled";
import { type Theme } from "@emotion/react";
import { Typography } from "~/components";

const HOME_CONTAINER = "home";

// The nav drawer takes space on desktop, so sizes are based on the home container instead of the viewport
const MOBILE_MAX_WIDTH = 840;
const WIDE_MIN_WIDTH = 1040;

export const homeQueries = {
  mobile: `@container ${HOME_CONTAINER} (max-width: ${MOBILE_MAX_WIDTH - 1}px)`,
  medium: `@container ${HOME_CONTAINER} (min-width: ${MOBILE_MAX_WIDTH}px) and (max-width: ${WIDE_MIN_WIDTH - 1}px)`,
  wide: `@container ${HOME_CONTAINER} (min-width: ${WIDE_MIN_WIDTH}px)`,
};

export const homeContainerStyles = {
  containerType: "inline-size",
  containerName: HOME_CONTAINER,
} as const;

export const stateLayer = (opacity: number) => {
  return `rgb(from var(--ant-color-text) r g b / ${opacity})`;
};

export const interactiveStyles = (theme: Theme) => ({
  cursor: "pointer",
  transition: "background-color 150ms ease, border-color 150ms ease",
  ":focus-visible": {
    outline: `2px solid ${theme.token.colorPrimary}`,
    outlineOffset: 2,
  },
});

export const DesktopOnly = styled.div({
  [homeQueries.mobile]: {
    display: "none",
  },
});

export const MobileOnly = styled.div({
  display: "none",
  [homeQueries.mobile]: {
    display: "block",
  },
});

// Doubled selectors override antd Typography's heading and text defaults
export const SectionHeading = styled(Typography.Title)(({ theme }) => ({
  "&&": {
    margin: 0,
    color: theme.token.colorText,
    fontSize: 28,
    fontWeight: 400,
    lineHeight: "36px",
    [homeQueries.mobile]: {
      fontSize: 22,
      lineHeight: "28px",
    },
  },
}));

export const TitleText = styled(Typography.Text)({
  "&&": {
    fontSize: 16,
    fontWeight: 500,
    lineHeight: "24px",
    letterSpacing: 0.15,
  },
});

export const MetaText = styled(Typography.Text)(({ theme }) => ({
  "&&": {
    color: theme.token.colorTextTertiary,
    fontSize: 13,
    lineHeight: "18px",
    letterSpacing: 0.2,
  },
}));

export const Section = styled.section({
  display: "flex",
  flexDirection: "column",
  gap: 16,
  [homeQueries.mobile]: {
    gap: 12,
  },
});
