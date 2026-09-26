import styled from "@emotion/styled";

export const DesktopOnly = styled.div(({ theme }) => ({
  [theme.containerQueries.mobile]: {
    display: "none",
  },
}));

export const MobileOnly = styled.div(({ theme }) => ({
  display: "none",
  [theme.containerQueries.mobile]: {
    display: "block",
  },
}));

export const Section = styled.section(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: 16,
  [theme.containerQueries.mobile]: {
    gap: 12,
  },
}));
